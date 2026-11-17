import { Activity, AlertTriangle, CheckCircle2, Square } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { ResolvedSpeedUnit, SpeedMetrics, SpeedUnit } from '../types/network';
import { formatLatency, formatThroughput } from '../utils/formatters';

interface FastSpeedStageProps {
  metrics: SpeedMetrics;
  unit: SpeedUnit;
  resolvedUnit: ResolvedSpeedUnit;
  onStartTest: () => void;
  onStopTest: () => void;
}

export const FastSpeedStage = memo(function FastSpeedStage({
  metrics,
  unit,
  resolvedUnit,
  onStartTest,
  onStopTest,
}: FastSpeedStageProps) {
  const { t } = useI18n();
  const isRunning =
    metrics.phase === 'ping' || metrics.phase === 'download' || metrics.phase === 'upload';

  const heroSpeed = useMemo(
    () =>
      metrics.downloadMbps !== null
        ? formatThroughput(metrics.downloadMbps, resolvedUnit)
        : '0.0',
    [metrics.downloadMbps, resolvedUnit]
  );

  const uploadFormatted = useMemo(
    () => formatThroughput(metrics.uploadMbps, resolvedUnit),
    [metrics.uploadMbps, resolvedUnit]
  );

  const peakUploadFormatted = useMemo(
    () =>
      metrics.peakUploadMbps !== null
        ? `${t.speedStage.peakPrefix} ${formatThroughput(metrics.peakUploadMbps, resolvedUnit)} ${resolvedUnit}`
        : t.speedStage.twoStreams,
    [metrics.peakUploadMbps, resolvedUnit, t.speedStage.peakPrefix, t.speedStage.twoStreams]
  );

  const pingFormatted = useMemo(() => formatLatency(metrics.pingMs), [metrics.pingMs]);

  const pingSubLabel = useMemo(
    () =>
      metrics.minPingMs !== null
        ? `${t.speedStage.minPrefix} ${formatLatency(metrics.minPingMs)} ms · ${metrics.pingSamples.length} ${t.speedStage.probesSuffix}`
        : t.speedStage.fiveProbes,
    [metrics.minPingMs, metrics.pingSamples.length, t.speedStage.minPrefix, t.speedStage.probesSuffix, t.speedStage.fiveProbes]
  );

  const jitterFormatted = useMemo(() => formatLatency(metrics.jitterMs), [metrics.jitterMs]);

  const isHeroMuted =
    metrics.downloadMbps === null &&
    (metrics.phase === 'idle' || metrics.phase === 'ping');

  const statusText = useMemo(() => {
    switch (metrics.phase) {
      case 'ping':
        return t.speedStage.statusPing;
      case 'download':
        return t.speedStage.statusDownload;
      case 'upload':
        return t.speedStage.statusUpload;
      case 'complete':
        return t.speedStage.statusComplete;
      case 'stopped':
        return t.speedStage.statusStopped;
      case 'error':
        return t.speedStage.statusError;
      default:
        return t.speedStage.statusIdle;
    }
  }, [metrics.phase, t.speedStage]);

  const isIdle = metrics.phase === 'idle';

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-4 py-8 sm:px-10 sm:py-12">
      <div className="max-w-3xl mx-auto text-center">
        {isIdle ? (
          <div className="py-6 sm:py-9 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={onStartTest}
              aria-label={t.speedStage.startAria}
              className="group relative inline-flex flex-col items-center gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#0F172A] rounded-2xl p-3 [--play-depth-a:#18181B] [--play-depth-b:#000000] [--play-depth-mid:#09090B] [--play-face-a:#3F3F46] [--play-face-b:#18181B] [--play-face-c:#000000] [--play-rim-a:#71717A] [--play-rim-b:#000000] dark:[--play-depth-a:#0369A1] dark:[--play-depth-b:#082F49] dark:[--play-depth-mid:#075985] dark:[--play-face-a:#7DD3FC] dark:[--play-face-b:#0EA5E9] dark:[--play-face-c:#0284C7] dark:[--play-rim-a:#E0F2FE] dark:[--play-rim-b:#0369A1]"
            >
              <svg
                viewBox="0 0 140 148"
                aria-hidden="true"
                className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-[0_14px_24px_rgba(0,0,0,0.28)] group-hover:drop-shadow-[0_18px_28px_rgba(0,0,0,0.42)] dark:drop-shadow-[0_14px_24px_rgba(2,132,199,0.28)] dark:group-hover:drop-shadow-[0_18px_28px_rgba(2,132,199,0.42)] transition-all duration-200"
              >
                <defs>
                  <linearGradient id="play3dDepth" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--play-depth-a)" />
                    <stop offset="100%" stopColor="var(--play-depth-b)" />
                  </linearGradient>
                  <linearGradient id="play3dFace" x1="15%" y1="5%" x2="85%" y2="95%">
                    <stop offset="0%" stopColor="var(--play-face-a)" />
                    <stop offset="42%" stopColor="var(--play-face-b)" />
                    <stop offset="100%" stopColor="var(--play-face-c)" />
                  </linearGradient>
                  <linearGradient id="play3dSheen" x1="20%" y1="0%" x2="70%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
                    <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="play3dRim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--play-rim-a)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--play-rim-b)" stopOpacity="0.45" />
                  </linearGradient>
                </defs>

                {/* 3D extruded depth base */}
                <path
                  d="M 28 30 Q 28 16 40.1 23 L 109.9 63 Q 122 70 109.9 77 L 40.1 117 Q 28 124 28 110 Z"
                  transform="translate(0, 10)"
                  fill="url(#play3dDepth)"
                />
                <path
                  d="M 28 30 Q 28 16 40.1 23 L 109.9 63 Q 122 70 109.9 77 L 40.1 117 Q 28 124 28 110 Z"
                  transform="translate(0, 5)"
                  fill="var(--play-depth-mid)"
                />

                {/* Interactive sculpted 3D front triangular face */}
                <g className="transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:translate-y-1.5">
                  <path
                    d="M 28 30 Q 28 16 40.1 23 L 109.9 63 Q 122 70 109.9 77 L 40.1 117 Q 28 124 28 110 Z"
                    fill="url(#play3dFace)"
                    stroke="url(#play3dRim)"
                    strokeWidth="2"
                  />
                  {/* Upper specular bevel highlight */}
                  <path
                    d="M 30 31 Q 30 19 40.6 25.1 L 104 61.5 Q 72 67 30 78 Z"
                    fill="url(#play3dSheen)"
                  />
                </g>
              </svg>

              <span className="font-display text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-black dark:group-hover:text-sky-300 transition-colors">
                {t.speedStage.startSpeedTest}
              </span>
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
              {t.speedStage.yourSpeedIs}
            </p>

            {/* Fast.com-style Giant Centered Hero Readout */}
            <div dir="ltr" className="mt-4 flex items-center justify-center gap-3 sm:gap-6">
              <span
                className={`font-mono tabular-nums text-5xl sm:text-8xl lg:text-[6.75rem] font-bold leading-none tracking-tight transition-colors ${
                  isHeroMuted
                    ? 'text-slate-300 dark:text-slate-700'
                    : metrics.phase === 'download'
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-slate-900 dark:text-slate-100'
                }`}
              >
                {heroSpeed}
              </span>

              <div className="flex flex-col items-start gap-2.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-slate-600 dark:text-slate-300 leading-none">
                    {resolvedUnit}
                  </span>
                  {unit === 'Auto' && (
                    <span className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
                      {t.speedStage.autoTag}
                    </span>
                  )}
                </div>

                {isRunning ? (
                  <button
                    type="button"
                    onClick={onStopTest}
                    aria-label={t.speedStage.stopAria}
                    title={t.speedStage.stopAria}
                    className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onStartTest}
                    aria-label={t.speedStage.startAria}
                    title={t.speedStage.startAria}
                    className="group min-w-[44px] min-h-[44px] w-11 h-11 inline-flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg [--play-mini-depth-a:#18181B] [--play-mini-depth-b:#000000] [--play-mini-face-a:#3F3F46] [--play-mini-face-b:#18181B] [--play-mini-face-c:#000000] [--play-mini-rim:#71717A] dark:[--play-mini-depth-a:#0369A1] dark:[--play-mini-depth-b:#082F49] dark:[--play-mini-face-a:#7DD3FC] dark:[--play-mini-face-b:#0EA5E9] dark:[--play-mini-face-c:#0284C7] dark:[--play-mini-rim:#E0F2FE]"
                  >
                    <svg
                      viewBox="0 0 140 148"
                      aria-hidden="true"
                      className="w-11 h-11 drop-shadow-[0_4px_8px_rgba(0,0,0,0.28)] dark:drop-shadow-[0_4px_8px_rgba(2,132,199,0.28)]"
                    >
                      <defs>
                        <linearGradient id="play3dMiniDepth" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--play-mini-depth-a)" />
                          <stop offset="100%" stopColor="var(--play-mini-depth-b)" />
                        </linearGradient>
                        <linearGradient id="play3dMiniFace" x1="15%" y1="5%" x2="85%" y2="95%">
                          <stop offset="0%" stopColor="var(--play-mini-face-a)" />
                          <stop offset="45%" stopColor="var(--play-mini-face-b)" />
                          <stop offset="100%" stopColor="var(--play-mini-face-c)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 28 30 Q 28 16 40.1 23 L 109.9 63 Q 122 70 109.9 77 L 40.1 117 Q 28 124 28 110 Z"
                        transform="translate(0, 10)"
                        fill="url(#play3dMiniDepth)"
                      />
                      <g className="transition-transform duration-150 group-hover:-translate-y-0.5 group-active:translate-y-1.5">
                        <path
                          d="M 28 30 Q 28 16 40.1 23 L 109.9 63 Q 122 70 109.9 77 L 40.1 117 Q 28 124 28 110 Z"
                          fill="url(#play3dMiniFace)"
                          stroke="var(--play-mini-rim)"
                          strokeOpacity="0.65"
                          strokeWidth="2"
                        />
                      </g>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Minimal Phase Status & Progress Track */}
            <div className="mt-7 max-w-md mx-auto">
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  {metrics.phase === 'error' ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  ) : metrics.phase === 'complete' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                  ) : (
                    <Activity
                      className={`w-3.5 h-3.5 ${
                        isRunning ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{statusText}</span>
                </span>

                <span className="font-mono">{metrics.progressPct}%</span>
              </div>

              <div className="mt-2 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${metrics.progressPct}%` }}
                  className={`h-full transition-all duration-150 ease-out ${
                    metrics.phase === 'error'
                      ? 'bg-amber-500'
                      : metrics.phase === 'upload'
                      ? 'bg-teal-600 dark:bg-teal-400'
                      : metrics.phase === 'complete'
                      ? 'bg-teal-600 dark:bg-teal-400'
                      : 'bg-sky-600 dark:bg-sky-400'
                  }`}
                />
              </div>

              {metrics.phase === 'error' && metrics.errorMessage && (
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 text-xs">
                  <span className="text-amber-700 dark:text-amber-400">{metrics.errorMessage}</span>
                  <button
                    type="button"
                    onClick={onStartTest}
                    className="min-h-[38px] px-3.5 py-1.5 font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-sky-700 dark:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    {t.speedStage.retry}
                  </button>
                </div>
              )}
            </div>

            {/* Fast.com-style Secondary Telemetry Strip (Upload, Ping, Jitter) */}
            <div className="mt-9 pt-7 border-t border-slate-100 dark:border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 text-left sm:text-center">
              <div className="py-3 sm:py-0 sm:px-6">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.speedStage.uploadSpeed}
                </div>
                <div dir="ltr" className="mt-1.5 flex items-baseline sm:justify-center gap-1.5">
                  <span
                    className={`font-mono tabular-nums text-2xl sm:text-3xl font-semibold ${
                      metrics.uploadMbps === null
                        ? 'text-slate-300 dark:text-slate-700'
                        : metrics.phase === 'upload'
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {uploadFormatted}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {resolvedUnit}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {peakUploadFormatted}
                </p>
              </div>

              <div className="py-3 sm:py-0 sm:px-6">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.speedStage.latencyAvgPing}
                </div>
                <div dir="ltr" className="mt-1.5 flex items-baseline sm:justify-center gap-1.5">
                  <span
                    className={`font-mono tabular-nums text-2xl sm:text-3xl font-semibold ${
                      metrics.pingMs === null
                        ? 'text-slate-300 dark:text-slate-700'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {pingFormatted}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    ms
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {pingSubLabel}
                </p>
              </div>

              <div className="py-3 sm:py-0 sm:px-6">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {t.speedStage.jitter}
                </div>
                <div dir="ltr" className="mt-1.5 flex items-baseline sm:justify-center gap-1.5">
                  <span
                    className={`font-mono tabular-nums text-2xl sm:text-3xl font-semibold ${
                      metrics.jitterMs === null
                        ? 'text-slate-300 dark:text-slate-700'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {jitterFormatted}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    ms
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {metrics.pingSamples.length > 1
                    ? t.speedStage.consecutiveVariance
                    : t.speedStage.waitingRtt}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
