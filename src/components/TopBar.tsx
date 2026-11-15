import { Play, Square } from 'lucide-react';
import type { SpeedPhase } from '../types/network';

interface TopBarProps {
  phase: SpeedPhase;
  onStartTest: () => void;
  onStopTest: () => void;
}

export function TopBar({ phase, onStartTest, onStopTest }: TopBarProps) {
  const isRunning = phase === 'ping' || phase === 'download' || phase === 'upload';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070B12]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#speed-test"
          className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        >
          LineRate
        </a>

        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400"
        >
          <a
            href="#speed-test"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Speed Test
          </a>
          <a
            href="#network-ip"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            Network &amp; IP
          </a>
          <a
            href="#dns-hints"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            DNS Hints
          </a>
          <a
            href="#history"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            History
          </a>
        </nav>

        <div className="shrink-0">
          {isRunning ? (
            <button
              type="button"
              onClick={onStopTest}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Stop Test</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartTest}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>{phase === 'idle' ? 'Run Test' : 'Run Again'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
