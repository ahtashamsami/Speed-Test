import type { PingSample, SpeedMetrics, SpeedSample } from '../types/network';

export const INITIAL_SPEED_METRICS: SpeedMetrics = {
  phase: 'idle',
  progressPct: 0,
  pingMs: null,
  minPingMs: null,
  jitterMs: null,
  downloadMbps: null,
  peakDownloadMbps: null,
  uploadMbps: null,
  peakUploadMbps: null,
  pingSamples: [],
  samples: [],
  errorMessage: null,
};

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function calculateJitter(values: number[]): number {
  if (values.length < 2) return 0;
  let diffSum = 0;
  for (let i = 1; i < values.length; i++) {
    diffSum += Math.abs(values[i] - values[i - 1]);
  }
  return diffSum / (values.length - 1);
}

function createRandomPayload(sizeBytes: number): Uint8Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(sizeBytes);
  const view = new Uint8Array(buffer);
  const maxStep = 65536;
  for (let offset = 0; offset < sizeBytes; offset += maxStep) {
    const end = Math.min(offset + maxStep, sizeBytes);
    crypto.getRandomValues(view.subarray(offset, end));
  }
  return view;
}

export async function runSpeedBenchmark(
  signal: AbortSignal,
  onUpdate: (metrics: SpeedMetrics) => void
): Promise<SpeedMetrics> {
  const testStartMs = performance.now();
  let state: SpeedMetrics = {
    ...INITIAL_SPEED_METRICS,
    phase: 'ping',
    progressPct: 2,
  };
  onUpdate(state);

  const emit = (patch: Partial<SpeedMetrics>) => {
    state = { ...state, ...patch };
    onUpdate(state);
  };

  try {
    // -----------------------------------------------------------------------
    // PHASE 1: Ping & Jitter (5 sequential requests to Cloudflare __down?bytes=0)
    // -----------------------------------------------------------------------
    const pingCount = 5;
    const pingValues: number[] = [];
    const pingSamples: PingSample[] = [];

    for (let i = 0; i < pingCount; i++) {
      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      const t0 = performance.now();
      const res = await fetch(
        `https://speed.cloudflare.com/__down?bytes=0&t=${Date.now()}`,
        {
          cache: 'no-store',
          signal,
        }
      );
      if (!res.ok) throw new Error(`Cloudflare ping probe returned HTTP ${res.status}`);
      await res.arrayBuffer();
      const rtt = Math.max(performance.now() - t0, 0.2);
      pingValues.push(rtt);
      pingSamples.push({ index: i + 1, rttMs: Number(rtt.toFixed(1)) });

      emit({
        pingSamples: [...pingSamples],
        pingMs: Number(average(pingValues).toFixed(1)),
        minPingMs: Number(Math.min(...pingValues).toFixed(1)),
        jitterMs: Number(calculateJitter(pingValues).toFixed(1)),
        progressPct: Math.round(((i + 1) / pingCount) * 18),
      });
    }

    // -----------------------------------------------------------------------
    // PHASE 2: Download Speed (3 parallel fetch streams, 25MB chunks, 10s window)
    // -----------------------------------------------------------------------
    emit({ phase: 'download', progressPct: 20 });

    const downloadDurationMs = 10_000;
    const downloadChunkBytes = 25_000_000;
    const downloadStartMs = performance.now();
    const downloadSamples: SpeedSample[] = [];
    const byteTimeline: Array<{ t: number; bytes: number }> = [
      { t: downloadStartMs, bytes: 0 },
    ];
    let totalDownloadedBytes = 0;
    let peakDownload = 0;

    const dlController = new AbortController();
    const abortListener = () => dlController.abort();
    signal.addEventListener('abort', abortListener, { once: true });

    const dlTimer = window.setTimeout(() => dlController.abort(), downloadDurationMs);

    const sampleInterval = window.setInterval(() => {
      const now = performance.now();
      byteTimeline.push({ t: now, bytes: totalDownloadedBytes });

      // 500ms sliding window for smooth real-time speedometer updates
      const windowCutoff = now - 500;
      let baseline = byteTimeline[0];
      for (let idx = byteTimeline.length - 1; idx >= 0; idx--) {
        if (byteTimeline[idx].t <= windowCutoff) {
          baseline = byteTimeline[idx];
          break;
        }
      }

      const dtSec = Math.max((now - baseline.t) / 1000, 0.05);
      const dBytes = Math.max(totalDownloadedBytes - baseline.bytes, 0);
      const instMbps = (dBytes * 8) / (dtSec * 1_000_000);

      if (instMbps > peakDownload) peakDownload = instMbps;

      const elapsedSec = Number(((now - testStartMs) / 1000).toFixed(2));
      downloadSamples.push({
        elapsedSec,
        phase: 'download',
        mbps: Number(instMbps.toFixed(2)),
      });

      const phaseRatio = Math.min((now - downloadStartMs) / downloadDurationMs, 1);
      emit({
        downloadMbps: Number(instMbps.toFixed(2)),
        peakDownloadMbps: Number(peakDownload.toFixed(2)),
        samples: [...downloadSamples],
        progressPct: 20 + Math.round(phaseRatio * 45),
      });
    }, 100);

    const streamWorker = async () => {
      while (!dlController.signal.aborted && !signal.aborted) {
        try {
          const res = await fetch(
            `https://speed.cloudflare.com/__down?bytes=${downloadChunkBytes}&t=${Date.now()}`,
            { cache: 'no-store', signal: dlController.signal }
          );
          if (!res.ok || !res.body) {
            throw new Error(`Cloudflare download returned HTTP ${res.status}`);
          }
          const reader = res.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) totalDownloadedBytes += value.byteLength;
          }
        } catch (err) {
          if (dlController.signal.aborted || signal.aborted) break;
          throw err;
        }
      }
    };

    try {
      await Promise.all([streamWorker(), streamWorker(), streamWorker()]);
    } finally {
      window.clearTimeout(dlTimer);
      window.clearInterval(sampleInterval);
      signal.removeEventListener('abort', abortListener);
    }

    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

    const dlElapsedSec = Math.max((performance.now() - downloadStartMs) / 1000, 0.1);
    const dlMeasurements = downloadSamples.map((s) => s.mbps).filter((v) => v > 0);
    const dlTrimStart = Math.floor(dlMeasurements.length * 0.15);
    const dlSustainedSlice = dlMeasurements.slice(dlTrimStart);
    const finalDownloadMbps =
      dlSustainedSlice.length > 0
        ? average(dlSustainedSlice)
        : (totalDownloadedBytes * 8) / (dlElapsedSec * 1_000_000);

    emit({
      downloadMbps: Number(finalDownloadMbps.toFixed(2)),
      peakDownloadMbps: Number(Math.max(peakDownload, finalDownloadMbps).toFixed(2)),
      progressPct: 65,
    });

    // -----------------------------------------------------------------------
    // PHASE 3: Upload Speed (2 parallel XHR POSTs of 10MB random Uint8Array)
    // -----------------------------------------------------------------------
    emit({ phase: 'upload', progressPct: 67 });

    const uploadChunkBytes = 10_000_000; // 10MB random payload
    const uploadPayload = createRandomPayload(uploadChunkBytes);
    const uploadMaxDurationMs = 15_000;
    const uploadStartMs = performance.now();
    const uploadSamples: SpeedSample[] = [];
    const ulTimeline: Array<{ t: number; bytes: number }> = [
      { t: uploadStartMs, bytes: 0 },
    ];
    const workerLoaded = [0, 0];
    let peakUpload = 0;
    let ulStopped = false;

    const activeXhrs = new Set<XMLHttpRequest>();

    const abortUpload = () => {
      ulStopped = true;
      activeXhrs.forEach((xhr) => {
        try {
          xhr.abort();
        } catch {
          // ignore
        }
      });
    };

    signal.addEventListener('abort', abortUpload, { once: true });
    const ulTimeout = window.setTimeout(abortUpload, uploadMaxDurationMs);

    const getTotalUploaded = () => workerLoaded[0] + workerLoaded[1];

    const ulInterval = window.setInterval(() => {
      const now = performance.now();
      const totalBytes = getTotalUploaded();
      ulTimeline.push({ t: now, bytes: totalBytes });

      const cutoff = now - 500;
      let baseline = ulTimeline[0];
      for (let idx = ulTimeline.length - 1; idx >= 0; idx--) {
        if (ulTimeline[idx].t <= cutoff) {
          baseline = ulTimeline[idx];
          break;
        }
      }

      const dtSec = Math.max((now - baseline.t) / 1000, 0.05);
      const dBytes = Math.max(totalBytes - baseline.bytes, 0);
      const instMbps = (dBytes * 8) / (dtSec * 1_000_000);
      if (instMbps > peakUpload) peakUpload = instMbps;

      const elapsedSec = Number(((now - testStartMs) / 1000).toFixed(2));
      uploadSamples.push({
        elapsedSec,
        phase: 'upload',
        mbps: Number(instMbps.toFixed(2)),
      });

      const byteRatio = Math.min(totalBytes / (uploadChunkBytes * 2), 1);
      emit({
        uploadMbps: Number(instMbps.toFixed(2)),
        peakUploadMbps: Number(Math.max(peakUpload, instMbps).toFixed(2)),
        samples: [...downloadSamples, ...uploadSamples],
        progressPct: 67 + Math.round(byteRatio * 31),
      });
    }, 100);

    const runUploadRequest = (workerIdx: number) =>
      new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        activeXhrs.add(xhr);
        xhr.open('POST', `https://speed.cloudflare.com/__up?t=${Date.now()}&w=${workerIdx}`, true);

        xhr.upload.onprogress = (evt) => {
          if (evt.lengthComputable) {
            workerLoaded[workerIdx] = evt.loaded;
          }
        };

        xhr.onload = () => {
          activeXhrs.delete(xhr);
          if (xhr.status >= 200 && xhr.status < 300) {
            workerLoaded[workerIdx] = uploadChunkBytes;
            resolve();
          } else {
            reject(new Error(`Cloudflare upload returned HTTP ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          activeXhrs.delete(xhr);
          if (ulStopped || signal.aborted) resolve();
          else reject(new Error('Upload network error reaching Cloudflare endpoint'));
        };

        xhr.onabort = () => {
          activeXhrs.delete(xhr);
          resolve();
        };

        xhr.send(uploadPayload);
      });

    try {
      await Promise.all([runUploadRequest(0), runUploadRequest(1)]);
    } finally {
      window.clearTimeout(ulTimeout);
      window.clearInterval(ulInterval);
      signal.removeEventListener('abort', abortUpload);
    }

    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

    const totalUploadSec = Math.max((performance.now() - uploadStartMs) / 1000, 0.05);
    const totalUploadedBytes = getTotalUploaded();
    const overallUploadMbps = (totalUploadedBytes * 8) / (totalUploadSec * 1_000_000);
    const ulMeasurements = uploadSamples.map((s) => s.mbps).filter((v) => v > 0);
    const ulTrimStart = Math.floor(ulMeasurements.length * 0.15);
    const ulSustainedSlice = ulMeasurements.slice(ulTrimStart);
    const finalUploadMbps =
      ulSustainedSlice.length > 0 ? average(ulSustainedSlice) : overallUploadMbps;

    const completed: SpeedMetrics = {
      ...state,
      phase: 'complete',
      progressPct: 100,
      uploadMbps: Number(finalUploadMbps.toFixed(2)),
      peakUploadMbps: Number(Math.max(peakUpload, finalUploadMbps).toFixed(2)),
      samples: [...downloadSamples, ...uploadSamples],
      errorMessage: null,
    };
    onUpdate(completed);
    return completed;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      const stopped: SpeedMetrics = {
        ...state,
        phase: 'stopped',
      };
      onUpdate(stopped);
      return stopped;
    }

    const message =
      err instanceof Error ? err.message : 'Speed benchmark interrupted unexpectedly.';
    const errored: SpeedMetrics = {
      ...state,
      phase: 'error',
      errorMessage: message,
    };
    onUpdate(errored);
    return errored;
  }
}
