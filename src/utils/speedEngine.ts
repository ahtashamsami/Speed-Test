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

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
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
    // PHASE 1: Latency & Jitter (1 warmup + 12 samples)
    // -----------------------------------------------------------------------
    await fetch(`/api/speed/ping?warmup=${Date.now()}`, {
      cache: 'no-store',
      signal,
    });

    const pingCount = 12;
    const pingValues: number[] = [];
    const pingSamples: PingSample[] = [];

    for (let i = 0; i < pingCount; i++) {
      if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
      const t0 = performance.now();
      const res = await fetch(`/api/speed/ping?i=${i}&t=${Date.now()}`, {
        cache: 'no-store',
        signal,
      });
      if (!res.ok) throw new Error(`Ping probe returned HTTP ${res.status}`);
      await res.text();
      const rtt = Math.max(performance.now() - t0, 0.2);
      pingValues.push(rtt);
      pingSamples.push({ index: i + 1, rttMs: Number(rtt.toFixed(1)) });

      emit({
        pingSamples: [...pingSamples],
        pingMs: Number(median(pingValues).toFixed(1)),
        minPingMs: Number(Math.min(...pingValues).toFixed(1)),
        jitterMs: Number(calculateJitter(pingValues).toFixed(1)),
        progressPct: Math.round(((i + 1) / pingCount) * 18),
      });
    }

    // -----------------------------------------------------------------------
    // PHASE 2: Download Throughput (3 concurrent streams, ~5.5s window)
    // -----------------------------------------------------------------------
    emit({ phase: 'download', progressPct: 20 });

    const downloadDurationMs = 5500;
    const downloadStartMs = performance.now();
    const downloadSamples: SpeedSample[] = [];
    const byteTimeline: Array<{ t: number; bytes: number }> = [{ t: downloadStartMs, bytes: 0 }];
    let totalDownloadedBytes = 0;
    let peakDownload = 0;

    const dlController = new AbortController();
    const abortListener = () => dlController.abort();
    signal.addEventListener('abort', abortListener, { once: true });

    const dlTimer = window.setTimeout(() => dlController.abort(), downloadDurationMs);

    const sampleInterval = window.setInterval(() => {
      const now = performance.now();
      byteTimeline.push({ t: now, bytes: totalDownloadedBytes });

      // 400ms sliding window for smooth instantaneous telemetry
      const windowCutoff = now - 400;
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
      const sample: SpeedSample = {
        elapsedSec,
        phase: 'download',
        mbps: Number(instMbps.toFixed(2)),
      };
      downloadSamples.push(sample);

      const phaseRatio = Math.min((now - downloadStartMs) / downloadDurationMs, 1);
      emit({
        downloadMbps: Number(instMbps.toFixed(2)),
        peakDownloadMbps: Number(peakDownload.toFixed(2)),
        samples: [...downloadSamples],
        progressPct: 20 + Math.round(phaseRatio * 40),
      });
    }, 110);

    const streamWorker = async (workerId: number) => {
      let chunkIter = 0;
      while (!dlController.signal.aborted && !signal.aborted) {
        try {
          const res = await fetch(
            `/api/speed/download?bytes=${10 * 1024 * 1024}&w=${workerId}&c=${chunkIter++}&t=${Date.now()}`,
            { cache: 'no-store', signal: dlController.signal }
          );
          if (!res.ok || !res.body) break;
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
      await Promise.all([streamWorker(0), streamWorker(1), streamWorker(2)]);
    } finally {
      window.clearTimeout(dlTimer);
      window.clearInterval(sampleInterval);
      signal.removeEventListener('abort', abortListener);
    }

    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

    // Compute sustained download speed discarding first 20% slow-start samples
    const dlMeasurements = downloadSamples.map((s) => s.mbps).filter((v) => v > 0);
    const dlTrimStart = Math.floor(dlMeasurements.length * 0.2);
    const dlSustainedSlice = dlMeasurements.slice(dlTrimStart);
    const finalDownloadMbps =
      dlSustainedSlice.length > 0
        ? dlSustainedSlice.reduce((a, b) => a + b, 0) / dlSustainedSlice.length
        : (totalDownloadedBytes * 8) /
          (Math.max((performance.now() - downloadStartMs) / 1000, 0.1) * 1_000_000);

    emit({
      downloadMbps: Number(finalDownloadMbps.toFixed(2)),
      peakDownloadMbps: Number(Math.max(peakDownload, finalDownloadMbps).toFixed(2)),
      progressPct: 60,
    });

    // -----------------------------------------------------------------------
    // PHASE 3: Upload Throughput (2 concurrent XHR streams, ~5s window)
    // -----------------------------------------------------------------------
    emit({ phase: 'upload', progressPct: 62 });

    const uploadPayload = createRandomPayload(1024 * 1024 * 2); // 2 MiB uncompressible blob
    const uploadDurationMs = 5000;
    const uploadStartMs = performance.now();
    const uploadSamples: SpeedSample[] = [];
    const ulTimeline: Array<{ t: number; bytes: number }> = [{ t: uploadStartMs, bytes: 0 }];
    const activeWorkerLoaded = [0, 0];
    let completedUploadBytes = 0;
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

    const ulEndTimer = window.setTimeout(() => {
      abortUpload();
    }, uploadDurationMs);

    const getTotalUploaded = () =>
      completedUploadBytes + activeWorkerLoaded[0] + activeWorkerLoaded[1];

    const ulInterval = window.setInterval(() => {
      const now = performance.now();
      const totalBytes = getTotalUploaded();
      ulTimeline.push({ t: now, bytes: totalBytes });

      const cutoff = now - 450;
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

      const phaseRatio = Math.min((now - uploadStartMs) / uploadDurationMs, 1);
      emit({
        uploadMbps: Number(instMbps.toFixed(2)),
        peakUploadMbps: Number(peakUpload.toFixed(2)),
        samples: [...downloadSamples, ...uploadSamples],
        progressPct: 62 + Math.round(phaseRatio * 36),
      });
    }, 110);

    const uploadWorker = async (workerIdx: number) => {
      while (!ulStopped && !signal.aborted) {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          activeXhrs.add(xhr);
          xhr.open('POST', `/api/speed/upload?w=${workerIdx}&t=${Date.now()}`, true);
          xhr.setRequestHeader('Content-Type', 'application/octet-stream');

          xhr.upload.onprogress = (evt) => {
            if (evt.lengthComputable) {
              activeWorkerLoaded[workerIdx] = evt.loaded;
            }
          };

          xhr.onload = () => {
            activeXhrs.delete(xhr);
            completedUploadBytes += uploadPayload.byteLength;
            activeWorkerLoaded[workerIdx] = 0;
            resolve();
          };

          xhr.onerror = () => {
            activeXhrs.delete(xhr);
            activeWorkerLoaded[workerIdx] = 0;
            if (ulStopped || signal.aborted) resolve();
            else reject(new Error('Upload network error'));
          };

          xhr.onabort = () => {
            activeXhrs.delete(xhr);
            completedUploadBytes += activeWorkerLoaded[workerIdx];
            activeWorkerLoaded[workerIdx] = 0;
            resolve();
          };

          xhr.send(uploadPayload);
        });
      }
    };

    try {
      await Promise.all([uploadWorker(0), uploadWorker(1)]);
    } finally {
      window.clearTimeout(ulEndTimer);
      window.clearInterval(ulInterval);
      signal.removeEventListener('abort', abortUpload);
    }

    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');

    const ulMeasurements = uploadSamples.map((s) => s.mbps).filter((v) => v > 0);
    const ulTrimStart = Math.floor(ulMeasurements.length * 0.2);
    const ulSustainedSlice = ulMeasurements.slice(ulTrimStart);
    const finalUploadMbps =
      ulSustainedSlice.length > 0
        ? ulSustainedSlice.reduce((a, b) => a + b, 0) / ulSustainedSlice.length
        : (getTotalUploaded() * 8) /
          (Math.max((performance.now() - uploadStartMs) / 1000, 0.1) * 1_000_000);

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
