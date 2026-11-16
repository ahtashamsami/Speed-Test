import { Square } from 'lucide-react';
import { memo } from 'react';

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

export const PAGE_PATHS: Record<AppPage, string> = {
  home: '/',
  about: '/about',
  privacy: '/privacy-policy',
  contact: '/contact',
  disclaimer: '/disclaimer',
  terms: '/terms',
  'cookies-policy': '/cookies-policy',
  'cookies-notice': '/cookies-notice',
  gdpr: '/gdpr',
};

interface TopBarProps {
  isRunning: boolean;
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onStopTest: () => void;
}

export const TopBar = memo(function TopBar({
  isRunning,
  activePage,
  onNavigate,
  onStopTest,
}: TopBarProps) {
  const navItems: Array<{ id: AppPage; label: string }> = [
    { id: 'home', label: 'Speed Test' },
    { id: 'about', label: 'About' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070B12]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 min-h-24 flex items-center justify-between gap-8">
        <a
          href={PAGE_PATHS.home}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          aria-label="TestLine Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 rounded-lg bg-slate-900 dark:bg-transparent px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <img
            src="/assets/aistudio/test_logo_09a7dcd9.png"
            alt="TestLine logo"
            referrerPolicy="no-referrer"
            className="h-[72px] sm:h-20 w-auto object-contain select-none"
          />
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
                href={PAGE_PATHS[item.id]}
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

        <div className="shrink-0 min-w-[2px]">
          {isRunning && (
            <button
              type="button"
              onClick={onStopTest}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Stop Test</span>
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
              href={PAGE_PATHS[item.id]}
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
});
