import { Play, Square } from 'lucide-react';
import type { SpeedPhase } from '../types/network';

export type AppPage =
  | 'home'
  | 'about'
  | 'privacy'
  | 'contact'
  | 'disclaimer'
  | 'terms'
  | 'cookies-policy'
  | 'cookies-notice'
  | 'gdpr';

interface TopBarProps {
  phase: SpeedPhase;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onStartTest: () => void;
  onStopTest: () => void;
}

export function TopBar({
  phase,
  activePage,
  onNavigate,
  onStartTest,
  onStopTest,
}: TopBarProps) {
  const isRunning = phase === 'ping' || phase === 'download' || phase === 'upload';

  const navItems: Array<{ id: AppPage; label: string }> = [
    { id: 'home', label: 'Speed Test' },
    { id: 'about', label: 'About' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'contact', label: 'Contact' },
  ];

  const handlePrimaryAction = () => {
    if (isRunning) {
      onStopTest();
    } else {
      if (activePage !== 'home') {
        onNavigate('home');
      }
      onStartTest();
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070B12]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#speed-test"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="inline-flex items-baseline gap-1.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        >
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            TestLine
          </span>
          <span className="text-[11px] font-normal tracking-wide text-slate-500 dark:text-slate-400">
            by ECORZO LLC
          </span>
        </a>

        <nav
          aria-label="Primary pages"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400"
        >
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id === 'home' ? 'speed-test' : item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                aria-current={active ? 'page' : undefined}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-slate-900 dark:text-slate-100 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="shrink-0">
          {isRunning ? (
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Stop Test</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>{phase === 'idle' ? 'Run Test' : 'Run Again'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Compact mobile sub-nav so all header pages remain reachable on small screens */}
      <nav
        aria-label="Mobile pages"
        className="flex md:hidden items-center gap-5 px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto text-xs font-medium text-slate-600 dark:text-slate-400"
      >
        {navItems.map((item) => {
          const active = activePage === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id === 'home' ? 'speed-test' : item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
              }}
              aria-current={active ? 'page' : undefined}
              className={`whitespace-nowrap shrink-0 ${
                active
                  ? 'text-slate-900 dark:text-slate-100 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
