import { Activity, AlertTriangle, CheckCircle2, RotateCw, Square } from 'lucide-react';
import type { SpeedMetrics, SpeedUnit } from '../types/network';
import { formatLatency, formatThroughput } from '../utils/formatters';

interface FastSpeedStageProps {
  metrics: SpeedMetrics;
  unit: SpeedUnit;
  onStartTest: () => void;
  onStopTest: () => void;
}

export function FastSpeedStage({
  metrics,
  unit,
  onStartTest,
  onStopTest,
}: FastSpeedStageProps) {
  const isRunning =
    metrics.phase === 'ping' || metrics.phase === 'download' || metrics.phase === 'upload';

  const heroSpeed =
    metrics.downloadMbps !== null ? formatThroughput(metrics.downloadMbps, unit) : '0.0';

  const isHeroMuted =
    metrics.downloadMbps === null &&
    (metrics.phase === 'idle' || metrics.phase === 'ping');

  const statusText = (() => {
    switch (metrics.phase) {
      case 'ping':
        return 'Measuring ping & jitter...';
      case 'download':
        return 'Testing download speed...';
      case 'upload':
        return 'Testing upload speed...';
      case 'complete':
        return 'Speed test complete';
      case 'stopped':
        return 'Test stopped';
      case 'error':
        return 'Test interrupted';
      default:
        return 'Preparing test...';
    }
  })();

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-6 py-10 sm:px-10 sm:py-12">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
          Your Internet speed is
        </p>

        {/* Fast.com-style Giant Centered Hero Readout */}
        <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6">
          <span
            className={`font-mono text-6xl sm:text-8xl lg:text-[6.75rem] font-bold leading-none tracking-tight transition-colors ${
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
            <span className="font-display text-2xl sm:text-3xl font-semibold text-slate-600 dark:text-slate-300 leading-none">
              {unit}
            </span>

            {isRunning ? (
              <button
                type="button"
                onClick={onStopTest}
                aria-label="Stop speed test"
                title="Stop speed test"
                className="w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onStartTest}
                aria-label="Restart speed test"
                title="Restart speed test"
                className="w-10 h-10 rounded-full border-2 border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <RotateCw className="w-4 h-4" aria-hidden="true" />
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
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <span className="text-amber-700 dark:text-amber-400">{metrics.errorMessage}</span>
              <button
                type="button"
                onClick={onStartTest}
                className="font-medium text-sky-700 dark:text-sky-400 hover:underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {/* Fast.com-style Secondary Telemetry Strip (Upload, Ping, Jitter) */}
        <div className="mt-9 pt-7 border-t border-slate-100 dark:border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 text-left sm:text-center">
          <div className="py-3 sm:py-0 sm:px-6">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Upload Speed
            </div>
            <div className="mt-1.5 flex items-baseline sm:justify-center gap-1.5">
              <span
                className={`font-mono text-2xl sm:text-3xl font-semibold ${
                  metrics.uploadMbps === null
                    ? 'text-slate-300 dark:text-slate-700'
                    : metrics.phase === 'upload'
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-slate-900 dark:text-slate-100'
                }`}
              >
                {formatThroughput(metrics.uploadMbps, unit)}
              </span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {unit}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
              {metrics.peakUploadMbps !== null
                ? `Peak ${formatThroughput(metrics.peakUploadMbps, unit)} ${unit}`
                : '2 parallel streams'}
            </p>
          </div>

          <div className="py-3 sm:py-0 sm:px-6">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Latency (Ping)
            </div>
            <div className="mt-1.5 flex items-baseline sm:justify-center gap-1.5">
              <span
                className={`font-mono text-2xl sm:text-3xl font-semibold ${
                  metrics.pingMs === null
                    ? 'text-slate-300 dark:text-slate-700'
                    : 'text-slate-900 dark:text-slate-100'
                }`}
              >
                {formatLatency(metrics.pingMs)}
              </span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                ms
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
              {metrics.minPingMs !== null
                ? `Min ${formatLatency(metrics.minPingMs)} ms · ${metrics.pingSamples.length} probes`
                : '12 uncached probes'}
            </p>
          </div>

          <div className="py-3 sm:py-0 sm:px-6">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Jitter
            </div>
            <div className="mt-1.5 flex items-baseline sm:justify-center gap-1.5">
              <span
                className={`font-mono text-2xl sm:text-3xl font-semibold ${
                  metrics.jitterMs === null
                    ? 'text-slate-300 dark:text-slate-700'
                    : 'text-slate-900 dark:text-slate-100'
                }`}
              >
                {formatLatency(metrics.jitterMs)}
              </span>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                ms
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
              {metrics.pingSamples.length > 1
                ? 'Consecutive RTT variance'
                : 'Waiting for RTT samples'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
