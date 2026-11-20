import { ChevronDown, Languages, Square } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import { LANG_METADATA } from '../i18n/localeDetection';
import {
  PAGE_PATHS,
  type AppPage,
  type KnownAppPage,
} from '../data/seoRoutes';
import { PWAInstallButton } from './PWAInstallButton';

export { PAGE_PATHS, type AppPage, type KnownAppPage };

interface TopBarProps {
  isRunning: boolean;
  activePage: AppPage;
  newsNotificationCount?: number;
  blogNotificationCount?: number;
  onNavigate: (page: AppPage) => void;
  onStopTest: () => void;
}

export const TopBar = memo(function TopBar({
  isRunning,
  activePage,
  newsNotificationCount = 0,
  blogNotificationCount = 0,
  onNavigate,
  onStopTest,
}: TopBarProps) {
  const { t, lang, geoLang, setManualLang } = useI18n();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);
  const [tabWordIndex, setTabWordIndex] = useState(0);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopAppMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileAppMenuRef = useRef<HTMLDivElement | null>(null);

  const rotatingTabWords = ['TestLine', t.nav.about, t.nav.privacy] as const;

  const primaryTabs: Array<{ id: KnownAppPage; label: string }> = [
    { id: 'home', label: t.nav.speedTest },
    { id: 'news', label: t.nav.news },
    { id: 'blog', label: t.nav.blog },
  ];

  const appMenuItems: Array<{ id: KnownAppPage; label: string }> = [
    { id: 'chrome-extension', label: 'Extension' },
  ];

  const companyMenuItems: Array<{ id: KnownAppPage; label: string }> = [
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
    { id: 'privacy', label: t.nav.privacy },
  ];

  const isAppPageActive = activePage === 'chrome-extension';

  const isCompanyPageActive =
    activePage === 'about' || activePage === 'contact' || activePage === 'privacy';

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTabWordIndex((prev) => (prev + 1) % rotatingTabWords.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setAppDropdownOpen(false);
  }, [activePage]);

  useEffect(() => {
    if (!dropdownOpen && !appDropdownOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const inCompanyDesktop = desktopMenuRef.current?.contains(target ?? null) ?? false;
      const inCompanyMobile = mobileMenuRef.current?.contains(target ?? null) ?? false;
      const inAppDesktop = desktopAppMenuRef.current?.contains(target ?? null) ?? false;
      const inAppMobile = mobileAppMenuRef.current?.contains(target ?? null) ?? false;

      if (!inCompanyDesktop && !inCompanyMobile) {
        setDropdownOpen(false);
      }
      if (!inAppDesktop && !inAppMobile) {
        setAppDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setAppDropdownOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen, appDropdownOpen]);

  const handleSelectDropdownPage = (page: KnownAppPage) => {
    setDropdownOpen(false);
    setAppDropdownOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070B12]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 min-h-[68px] sm:min-h-[88px] flex items-center justify-between gap-2.5 sm:gap-6">
        <a
          href={PAGE_PATHS.home}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          aria-label={t.nav.homeAria}
          className="inline-flex items-center min-h-[38px] py-0.5 px-1 -mx-1 whitespace-nowrap shrink-0 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <img
            src="/assets/aistudio/test_logo_header_light.png"
            alt="TestLine logo"
            width={289}
            height={192}
            fetchPriority="high"
            decoding="sync"
            referrerPolicy="no-referrer"
            className="block dark:hidden h-14 sm:h-[72px] w-auto object-contain select-none"
          />
          <img
            src="/assets/aistudio/test_logo_header_dark.png"
            alt="TestLine logo"
            width={289}
            height={192}
            fetchPriority="high"
            decoding="sync"
            referrerPolicy="no-referrer"
            className="hidden dark:block h-14 sm:h-[72px] w-auto object-contain select-none"
          />
        </a>

        {/* Desktop Primary Tabs + Company Dropdown */}
        <nav
          aria-label={t.nav.primaryNavAria}
          className="hidden md:flex items-center gap-3.5 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-400"
        >
          {primaryTabs.map((item) => {
            const active = activePage === item.id;
            const badgeCount =
              item.id === 'news'
                ? newsNotificationCount
                : item.id === 'blog'
                ? blogNotificationCount
                : 0;
            return (
              <a
                key={item.id}
                href={PAGE_PATHS[item.id]}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                aria-current={active ? 'page' : undefined}
                aria-label={
                  badgeCount > 0 ? `${item.label} (${badgeCount} ${t.nav.newBadgeSuffix})` : undefined
                }
                className={`inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-slate-900 dark:text-slate-100 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{item.label}</span>
                {badgeCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-mono font-bold leading-none rounded-full bg-rose-600 text-white"
                  >
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </span>
                )}
              </a>
            );
          })}

          {/* Desktop App Dropdown */}
          <div ref={desktopAppMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                setAppDropdownOpen((open) => !open);
              }}
              aria-expanded={appDropdownOpen}
              aria-haspopup="menu"
              aria-label="App menu"
              className={`inline-flex items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isAppPageActive || appDropdownOpen
                  ? 'text-slate-900 dark:text-slate-100 font-semibold bg-slate-100/80 dark:bg-slate-800/70'
                  : 'hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>App</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  appDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {appDropdownOpen && (
              <div
                role="menu"
                aria-label="App menu"
                className="absolute left-0 mt-2 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-lg py-1.5 z-50"
              >
                {appMenuItems.map((item) => {
                  const active = activePage === item.id;
                  return (
                    <a
                      key={item.id}
                      role="menuitem"
                      href={PAGE_PATHS[item.id]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectDropdownPage(item.id);
                      }}
                      className={`flex items-center min-h-[40px] px-4 py-2 text-sm transition-colors ${
                        active
                          ? 'text-sky-700 dark:text-sky-400 font-semibold bg-slate-50 dark:bg-slate-800/60'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div ref={desktopMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setAppDropdownOpen(false);
                setDropdownOpen((open) => !open);
              }}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              aria-label={t.nav.companyMenuAria}
              className={`inline-flex items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isCompanyPageActive || dropdownOpen
                  ? 'text-slate-900 dark:text-slate-100 font-semibold bg-slate-100/80 dark:bg-slate-800/70'
                  : 'hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="inline-grid items-center justify-items-center" aria-hidden="true">
                {rotatingTabWords.map((word, idx) => (
                  <span
                    key={`${idx}-${word}`}
                    className={`col-start-1 row-start-1 transition-all duration-300 ${
                      idx === tabWordIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-1 pointer-events-none select-none'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <div
                role="menu"
                aria-label={t.nav.companyMenuAria}
                className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-lg py-1.5 z-50"
              >
                {companyMenuItems.map((item) => {
                  const active = activePage === item.id;
                  return (
                    <a
                      key={item.id}
                      role="menuitem"
                      href={PAGE_PATHS[item.id]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectDropdownPage(item.id);
                      }}
                      className={`flex items-center min-h-[40px] px-4 py-2 text-sm transition-colors ${
                        active
                          ? 'text-sky-700 dark:text-sky-400 font-semibold bg-slate-50 dark:bg-slate-800/60'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-[2px]">
          {lang !== 'en' ? (
            <button
              type="button"
              onClick={() => setManualLang('en')}
              aria-label="Translate site to English"
              title="Translate to English"
              className="inline-flex items-center gap-1.5 min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Languages
                className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0"
                aria-hidden="true"
              />
              <span dir="ltr">English</span>
            </button>
          ) : geoLang !== 'en' ? (
            <button
              type="button"
              onClick={() => setManualLang('auto')}
              aria-label={`Switch back to ${LANG_METADATA[geoLang].englishName}`}
              title={LANG_METADATA[geoLang].nativeName}
              className="inline-flex items-center gap-1.5 min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Languages
                className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0"
                aria-hidden="true"
              />
              <span dir={LANG_METADATA[geoLang].dir}>{LANG_METADATA[geoLang].nativeName}</span>
            </button>
          ) : null}

          {isRunning ? (
            <button
              type="button"
              onClick={onStopTest}
              className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>{t.nav.stopTest}</span>
            </button>
          ) : (
            <PWAInstallButton />
          )}
        </div>
      </div>

      {/* Mobile & Small Tablet Sub-Nav: Speed Test, News, Blog + Company Dropdown */}
      <nav
        aria-label={t.nav.mobileNavAria}
        className="flex md:hidden items-center justify-between gap-1 px-4 py-1 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-400"
      >
        <div className="flex items-center gap-1.5">
          {primaryTabs.map((item) => {
            const active = activePage === item.id;
            const badgeCount =
              item.id === 'news'
                ? newsNotificationCount
                : item.id === 'blog'
                ? blogNotificationCount
                : 0;
            return (
              <a
                key={item.id}
                href={PAGE_PATHS[item.id]}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                aria-current={active ? 'page' : undefined}
                aria-label={
                  badgeCount > 0 ? `${item.label} (${badgeCount} ${t.nav.newBadgeSuffix})` : undefined
                }
                className={`inline-flex items-center min-h-[38px] px-2 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'text-slate-900 dark:text-slate-100 font-semibold bg-slate-100/80 dark:bg-slate-800/60'
                    : 'hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {badgeCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-mono font-bold leading-none rounded-full bg-rose-600 text-white"
                  >
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </span>
                )}
              </a>
            );
          })}
          {/* Mobile App Dropdown */}
          <div ref={mobileAppMenuRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                setAppDropdownOpen((open) => !open);
              }}
              aria-expanded={appDropdownOpen}
              aria-haspopup="menu"
              aria-label="App menu"
              className={`inline-flex items-center gap-1 min-h-[38px] px-2 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isAppPageActive || appDropdownOpen
                  ? 'text-slate-900 dark:text-slate-100 font-semibold bg-slate-100/80 dark:bg-slate-800/60'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <span>App</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  appDropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {appDropdownOpen && (
              <div
                role="menu"
                aria-label="App menu"
                className="absolute left-0 mt-1.5 w-40 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-lg py-1.5 z-50"
              >
                {appMenuItems.map((item) => {
                  const active = activePage === item.id;
                  return (
                    <a
                      key={item.id}
                      role="menuitem"
                      href={PAGE_PATHS[item.id]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectDropdownPage(item.id);
                      }}
                      className={`flex items-center min-h-[42px] px-3.5 py-2 text-xs transition-colors ${
                        active
                          ? 'text-sky-700 dark:text-sky-400 font-semibold bg-slate-50 dark:bg-slate-800/60'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div ref={mobileMenuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setAppDropdownOpen(false);
              setDropdownOpen((open) => !open);
            }}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label={t.nav.companyMenuAria}
            className={`inline-flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isCompanyPageActive || dropdownOpen
                ? 'text-slate-900 dark:text-slate-100 font-semibold bg-slate-100/80 dark:bg-slate-800/60'
                : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <span className="inline-grid items-center justify-items-center" aria-hidden="true">
              {rotatingTabWords.map((word, idx) => (
                <span
                  key={`${idx}-${word}`}
                  className={`col-start-1 row-start-1 transition-all duration-300 ${
                    idx === tabWordIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-1 pointer-events-none select-none'
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {dropdownOpen && (
            <div
              role="menu"
              aria-label={t.nav.mobileNavAria}
              className="absolute right-0 mt-1.5 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-lg py-1.5 z-50"
            >
              {companyMenuItems.map((item) => {
                const active = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    role="menuitem"
                    href={PAGE_PATHS[item.id]}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectDropdownPage(item.id);
                    }}
                    className={`flex items-center min-h-[42px] px-3.5 py-2 text-xs transition-colors ${
                      active
                        ? 'text-sky-700 dark:text-sky-400 font-semibold bg-slate-50 dark:bg-slate-800/60'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
});
