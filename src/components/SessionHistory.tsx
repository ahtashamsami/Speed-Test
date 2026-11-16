import { Trash2 } from 'lucide-react';
import { memo } from 'react';
import type { SpeedUnit, TestRunRecord } from '../types/network';
import { formatLatency, formatThroughput, formatTimeShort } from '../utils/formatters';

interface SessionHistoryProps {
  records: TestRunRecord[];
  unit: SpeedUnit;
  onClear: () => void;
}

export const SessionHistory = memo(function SessionHistory({
  records,
  unit,
  onClear,
}: SessionHistoryProps) {
  return (
    <section
      id="history"
      className="scroll-mt-20 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
            Session Benchmark History
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Recent measurements saved locally in your browser
          </p>
        </div>

        {records.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Completed speed tests will appear here so you can compare consecutive runs.
          </p>
        </div>
      ) : (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4">Time</th>
                <th className="py-2.5 px-4 text-right">Download ({unit})</th>
                <th className="py-2.5 px-4 text-right">Upload ({unit})</th>
                <th className="py-2.5 px-4 text-right">Ping (ms)</th>
                <th className="py-2.5 px-4 text-right">Jitter (ms)</th>
                <th className="py-2.5 pl-4 text-right">Public IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
              {records.map((rec) => (
                <tr
                  key={rec.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-2.5 pr-4 font-mono text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {formatTimeShort(rec.timestamp)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-medium text-sky-700 dark:text-sky-300 whitespace-nowrap">
                    {formatThroughput(rec.downloadMbps, unit)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-medium text-teal-700 dark:text-teal-300 whitespace-nowrap">
                    {formatThroughput(rec.uploadMbps, unit)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {formatLatency(rec.pingMs)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {formatLatency(rec.jitterMs)}
                  </td>
                  <td className="py-2.5 pl-4 text-right font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {rec.ip ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
});
