import { FileDown, Moon, Sun, X } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AdSlot } from './components/AdSlot';
import { ConsentBanner } from './components/ConsentBanner';
import { DeferredSection } from './components/DeferredSection';
import { FastSpeedStage } from './components/FastSpeedStage';
import { Footer } from './components/Footer';
import { NetworkDiagnosticsSection } from './components/NetworkDiagnosticsSection';
import { OfflineRunnerGame } from './components/OfflineRunnerGame';
import { ProxyVpnCard } from './components/ProxyVpnCard';
import { PAGE_PATHS, TopBar, type AppPage } from './components/TopBar';
import { parseRouteState } from './data/seoRoutes';
import { useFeedNotifications } from './hooks/useFeedNotifications';
import { useInternetStatus } from './hooks/useInternetStatus';
import { EXTRA_UI_STRINGS } from './i18n/extraStrings';
import { useI18n } from './i18n/LanguageContext';
import type {
  NetworkDiagnostics,
  SpeedMetrics,
  SpeedUnit,
  TestRunRecord,
  ThemeMode,
} from './types/network';
import { resolveSpeedUnit } from './utils/formatters';
import { fetchNetworkDiagnostics } from './utils/networkProbe';
import { applyRouteSeo } from './utils/seoManager';
import { INITIAL_SPEED_METRICS, runSpeedBenchmark } from './utils/speedEngine';

// Lazy-loaded non-critical chunks to shrink initial critical JS bundle and improve LCP
const NewsPage = lazy(() =>
  import('./components/NewsPage').then((m) => ({ default: m.NewsPage }))
);
const BlogPage = lazy(() =>
  import('./components/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const SessionHistory = lazy(() =>
  import('./components/SessionHistory').then((m) => ({ default: m.SessionHistory }))
);
const FaqAndAeoSection = lazy(() =>
  import('./components/FaqAndAeoSection').then((m) => ({ default: m.FaqAndAeoSection }))
);
const LegalAndInfoPages = lazy(() =>
  import('./components/LegalAndInfoPages').then((m) => ({ default: m.LegalAndInfoPages }))
);

const HISTORY_STORAGE_KEY = 'testline_history_v1';
const THEME_STORAGE_KEY = 'testline_theme';
const UNIT_STORAGE_KEY = 'testline_unit_v1';

function loadInitialUnit(): SpeedUnit {
  try {
    const saved = localStorage.getItem(UNIT_STORAGE_KEY);
    if (saved === 'Auto' || saved === 'Mbps' || saved === 'MB/s') {
      return saved;
    }
  } catch {
    // Ignore storage failures
  }
  return 'Auto';
}

function loadInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'light';
}

function loadHistory(): TestRunRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 15) : [];
  } catch {
    return [];
  }
}

function readInitialRouteState() {
  if (typeof window === 'undefined') {
    return { page: 'home' as AppPage, blogSlug: null as string | null };
  }
  return parseRouteState(window.location.pathname, window.location.hash);
}

const INITIAL_NETWORK: NetworkDiagnostics = {
  primaryIp: null,
  ipVersion: null,
  ipv4: null,
  ipv6: null,
  isp: null,
  org: null,
  asn: null,
  city: null,
  region: null,
  country: null,
  countryCode: null,
  continentCode: null,
  timezone: null,
  ptrHostname: null,
  dohReachable: null,
  dohLatencyMs: null,
  dohResolver: 'Cloudflare DoH (1.1.1.1)',
  protocol: null,
  httpVersion: null,
  serverService: null,
  connectionHint: null,
  proxyDetection: {
    detected: false,
    category: 'Direct Connection',
    confidence: 'Low',
    isProxyOrVpn: false,
    isHosting: false,
    timezoneMismatch: false,
    ipMismatch: false,
    browserTimezone: null,
    ipTimezone: null,
    viaHeader: null,
    forwardedHopCount: 0,
    matchedProviderSignal: null,
    signals: [],
    signalEntries: [],
  },
  loading: false,
  error: null,
  lastUpdatedAt: null,
};

function DeferredPanelSkeleton({ minHeightClass }: { minHeightClass: string }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 ${minHeightClass}`}
    >
      <div className="h-5 w-48 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
      <div className="mt-2 h-3.5 w-72 max-w-full rounded bg-slate-100 dark:bg-slate-800/70 animate-pulse" />
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
      </div>
    </div>
  );
}

export default function App() {
  const { t, lang, applyGeoFromDiagnostics } = useI18n();
  const [initialRoute] = useState(readInitialRouteState);
  const [activePage, setActivePage] = useState<AppPage>(initialRoute.page);
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(initialRoute.blogSlug);
  const [theme, setTheme] = useState<ThemeMode>(loadInitialTheme);
  const [unit, setUnit] = useState<SpeedUnit>(loadInitialUnit);
  const [metrics, setMetrics] = useState<SpeedMetrics>(INITIAL_SPEED_METRICS);
  const [network, setNetwork] = useState<NetworkDiagnostics>(INITIAL_NETWORK);
  const [history, setHistory] = useState<TestRunRecord[]>(loadHistory);
  const {
    isOnline,
    checking: checkingConnection,
    checkConnection,
    markOffline,
  } = useInternetStatus();
  const {
    newsData,
    newsLoading,
    newsRefreshing,
    newsError,
    isShowingCachedNews,
    cachedNewsSavedAt,
    refreshNews,
    allBlogPosts,
    newsNotificationCount,
    blogNotificationCount,
    highlightedNewsSet,
    highlightedBlogSet,
  } = useFeedNotifications(activePage, isOnline);
  const [showOfflineGame, setShowOfflineGame] = useState<boolean>(() => !isOnline);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [showDuplicatePdfModal, setShowDuplicatePdfModal] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const latestIpRef = useRef<string | null>(null);
  const metricsRef = useRef<SpeedMetrics>(metrics);
  const networkRef = useRef<NetworkDiagnostics>(network);
  const unitRef = useRef<SpeedUnit>(unit);
  const historyRef = useRef<TestRunRecord[]>(history);
  const tRef = useRef(t);
  const pdfDownloadedForRunRef = useRef(false);

  metricsRef.current = metrics;
  networkRef.current = network;
  unitRef.current = unit;
  historyRef.current = history;
  tRef.current = t;

  useEffect(() => {
    latestIpRef.current = network.primaryIp;
  }, [network.primaryIp]);

  const activeBlogPost = useMemo(() => {
    if (activePage !== 'blog' || !activeBlogSlug) return null;
    return (
      allBlogPosts.find(
        (p) => p.slug.toLowerCase() === activeBlogSlug.toLowerCase() || p.id === activeBlogSlug
      ) ?? null
    );
  }, [activePage, activeBlogSlug, allBlogPosts]);

  // Synchronize per-route and localized On-Page & Technical SEO metadata
  useEffect(() => {
    const effectivePage: AppPage =
      activePage === 'blog' && activeBlogSlug && !activeBlogPost ? 'not-found' : activePage;
    applyRouteSeo(effectivePage, t, activeBlogPost, lang);
  }, [activePage, activeBlogSlug, activeBlogPost, t, lang]);

  useEffect(() => {
    const syncRoute = () => {
      const next = parseRouteState(window.location.pathname, window.location.hash);
      setActivePage(next.page);
      setActiveBlogSlug(next.blogSlug);
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const navigateTo = useCallback((page: AppPage) => {
    setActivePage(page);
    setActiveBlogSlug(null);
    if (page !== 'not-found') {
      const nextPath = PAGE_PATHS[page];
      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, '', nextPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const selectBlogPost = useCallback((slug: string | null) => {
    setActivePage('blog');
    setActiveBlogSlug(slug);
    const nextPath = slug ? `/blog/${encodeURIComponent(slug)}` : '/blog';
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
  }, []);

  const navigateHome = useCallback(() => {
    navigateTo('home');
  }, [navigateTo]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme: ThemeMode = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // Ignore storage failures
      }
      return nextTheme;
    });
  }, []);

  const selectUnit = useCallback((nextUnit: SpeedUnit) => {
    setUnit(nextUnit);
    try {
      localStorage.setItem(UNIT_STORAGE_KEY, nextUnit);
    } catch {
      // Ignore storage failures
    }
  }, []);

  const setUnitAuto = useCallback(() => selectUnit('Auto'), [selectUnit]);
  const setUnitMbps = useCallback(() => selectUnit('Mbps'), [selectUnit]);
  const setUnitMBs = useCallback(() => selectUnit('MB/s'), [selectUnit]);

  const resolvedUnit = useMemo(
    () => resolveSpeedUnit(unit, metrics.downloadMbps ?? metrics.uploadMbps),
    [unit, metrics.downloadMbps, metrics.uploadMbps]
  );

  const loadNetwork = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh || networkRef.current.lastUpdatedAt === null) {
        setNetwork((prev) => ({ ...prev, loading: true, error: null }));
      }
      const info = await fetchNetworkDiagnostics({ forceRefresh });
      setNetwork(info);
      if (info.countryCode || info.continentCode) {
        applyGeoFromDiagnostics(info.countryCode, info.continentCode);
      }
    },
    [applyGeoFromDiagnostics]
  );

  const handleManualRefreshNetwork = useCallback(() => {
    void loadNetwork(true);
  }, [loadNetwork]);

  const stopTest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineGame(true);
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    }
  }, [isOnline]);

  const handleReturnToSpeedTest = useCallback(() => {
    if (isOnline) {
      setShowOfflineGame(false);
    }
  }, [isOnline]);

  const startTest = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      markOffline();
      setShowOfflineGame(true);
      return;
    }
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;
    pdfDownloadedForRunRef.current = false;
    setShowDuplicatePdfModal(false);

    void loadNetwork(false);

    const finalResult = await runSpeedBenchmark(controller.signal, (next) => {
      setMetrics(next);
    });

    if (abortRef.current === controller) {
      abortRef.current = null;
    }

    if (finalResult.phase === 'error') {
      const reachable = await checkConnection();
      if (!reachable) {
        setShowOfflineGame(true);
      }
      return;
    }

    if (finalResult.phase === 'complete') {
      const entryId =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : String(Date.now());
      const entry: TestRunRecord = {
        id: entryId,
        timestamp: Date.now(),
        downloadMbps: finalResult.downloadMbps,
        uploadMbps: finalResult.uploadMbps,
        pingMs: finalResult.pingMs,
        jitterMs: finalResult.jitterMs,
        ip: latestIpRef.current,
      };
      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, 15);
        try {
          localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore storage failures
        }
        return updated;
      });
    }
  }, [checkConnection, loadNetwork, markOffline]);

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Dynamically import jsPDF chunk only when user clicks Export PDF
  const performPdfExport = useCallback(async (isSecondCopy: boolean) => {
    setExportingPdf(true);
    try {
      const { exportNetworkReportPdf } = await import('./utils/pdfReport');
      await exportNetworkReportPdf({
        metrics: metricsRef.current,
        network: networkRef.current,
        unit: unitRef.current,
        history: historyRef.current,
        isSecondCopy,
        t: tRef.current,
      });
      pdfDownloadedForRunRef.current = true;
    } finally {
      setExportingPdf(false);
    }
  }, []);

  const handleExportPdf = useCallback(() => {
    if (metricsRef.current.phase === 'idle') return;
    if (pdfDownloadedForRunRef.current) {
      setShowDuplicatePdfModal(true);
      return;
    }
    void performPdfExport(false);
  }, [performPdfExport]);

  const handleConfirmDuplicatePdf = useCallback(() => {
    setShowDuplicatePdfModal(false);
    void performPdfExport(true);
  }, [performPdfExport]);

  const handleCancelDuplicatePdf = useCallback(() => {
    setShowDuplicatePdfModal(false);
  }, []);

  useEffect(() => {
    if (!showDuplicatePdfModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDuplicatePdfModal(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showDuplicatePdfModal]);

  const isTestInitiated = metrics.phase !== 'idle';
  const isRunning =
    metrics.phase === 'ping' || metrics.phase === 'download' || metrics.phase === 'upload';

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip bg-slate-50 text-slate-900 dark:bg-[#070B12] dark:text-slate-100">
      <TopBar
        isRunning={isRunning}
        activePage={activePage}
        newsNotificationCount={newsNotificationCount}
        blogNotificationCount={blogNotificationCount}
        onNavigate={navigateTo}
        onStopTest={stopTest}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-7 space-y-7">
        {activePage === 'home' ? (
          <>
            {/* Above-the-fold Critical LCP Path: Workspace Control Bar + Speed Stage */}
            <section id="speed-test" className="scroll-mt-20 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3.5 sm:gap-4">
                <div className="space-y-1">
                  <h1
                    style={{ textWrap: 'balance' }}
                    className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                  >
                    {t.hero.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {t.hero.subtitle}
                  </p>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2 sm:gap-3 min-w-0">
                  {/* Unit Toggle */}
                  <div
                    role="group"
                    aria-label={t.hero.speedUnitAria}
                    className="inline-flex items-center gap-0.5 sm:gap-1 p-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] min-w-0"
                  >
                    <button
                      type="button"
                      onClick={setUnitAuto}
                      aria-pressed={unit === 'Auto'}
                      title={t.hero.autoTooltip}
                      className={`min-h-[40px] sm:min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        unit === 'Auto'
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      {unit === 'Auto' ? `${t.hero.auto} (${resolvedUnit})` : t.hero.auto}
                    </button>
                    <button
                      type="button"
                      onClick={setUnitMbps}
                      aria-pressed={unit === 'Mbps'}
                      className={`min-h-[40px] sm:min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        unit === 'Mbps'
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      Mbps
                    </button>
                    <button
                      type="button"
                      onClick={setUnitMBs}
                      aria-pressed={unit === 'MB/s'}
                      className={`min-h-[40px] sm:min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        unit === 'MB/s'
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      MB/s
                    </button>
                  </div>

                  {/* Theme & PDF Actions: icon-only on mobile (<sm), full labeled buttons on sm+ */}
                  <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      aria-label={theme === 'dark' ? t.hero.switchToLight : t.hero.switchToDark}
                      title={theme === 'dark' ? t.hero.switchToLight : t.hero.switchToDark}
                      className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-[40px] p-2 sm:px-3.5 sm:py-2 text-xs font-medium rounded-lg border-0 bg-transparent sm:border sm:border-slate-200 sm:dark:border-slate-800 sm:bg-white sm:dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-amber-400" aria-hidden="true" />
                          <span className="hidden sm:inline">{t.hero.lightMode}</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-slate-700" aria-hidden="true" />
                          <span className="hidden sm:inline">{t.hero.darkMode}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleExportPdf}
                      disabled={!isTestInitiated || exportingPdf}
                      aria-label={exportingPdf ? t.hero.exportingPdf : t.hero.exportPdf}
                      title={
                        !isTestInitiated ? t.hero.exportDisabledTitle : t.hero.exportEnabledTitle
                      }
                      className="inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-[40px] p-2 sm:px-3.5 sm:py-2 text-xs font-medium rounded-lg border-0 bg-transparent sm:border sm:border-slate-200 sm:dark:border-slate-800 sm:bg-white sm:dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:bg-transparent sm:disabled:hover:bg-white sm:dark:disabled:hover:bg-[#0F172A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      <FileDown className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                      <span className="hidden sm:inline">
                        {exportingPdf ? t.hero.exportingPdf : t.hero.exportPdf}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {showOfflineGame ? (
                <OfflineRunnerGame
                  theme={theme}
                  isOnline={isOnline}
                  checkingConnection={checkingConnection}
                  onCheckConnection={() => {
                    void checkConnection();
                  }}
                  onReturnToSpeedTest={handleReturnToSpeedTest}
                />
              ) : (
                <FastSpeedStage
                  metrics={metrics}
                  unit={unit}
                  resolvedUnit={resolvedUnit}
                  onStartTest={startTest}
                  onStopTest={stopTest}
                />
              )}
            </section>

            {isTestInitiated && (
              <>
                {/* Proxy / VPN Detection Card Box */}
                <ProxyVpnCard network={network} />

                {/* Full IPv4/IPv6, ISP & DNS Diagnostics */}
                <NetworkDiagnosticsSection
                  network={network}
                  onRefresh={handleManualRefreshNetwork}
                />
              </>
            )}

            {/* Policy-compliant zero-CLS AdSense container (renders only when AdSense env vars are configured) */}
            <AdSlot />

            {/* Deferred Non-Critical Below-the-Fold Sections (React.lazy + Suspense) */}
            <DeferredSection
              fallback={<DeferredPanelSkeleton minHeightClass="min-h-[168px]" />}
              idleTimeoutMs={900}
            >
              <Suspense fallback={<DeferredPanelSkeleton minHeightClass="min-h-[168px]" />}>
                <SessionHistory records={history} unit={unit} onClear={clearHistory} />
              </Suspense>
            </DeferredSection>

            <DeferredSection
              fallback={<DeferredPanelSkeleton minHeightClass="min-h-[320px]" />}
              idleTimeoutMs={1300}
            >
              <Suspense fallback={<DeferredPanelSkeleton minHeightClass="min-h-[320px]" />}>
                <FaqAndAeoSection onNavigate={navigateTo} />
              </Suspense>
            </DeferredSection>
          </>
        ) : activePage === 'news' ? (
          <Suspense fallback={<DeferredPanelSkeleton minHeightClass="min-h-[420px]" />}>
            <NewsPage
              data={newsData}
              loading={newsLoading}
              refreshing={newsRefreshing}
              error={newsError}
              usingCachedFallback={isShowingCachedNews}
              cachedSavedAt={cachedNewsSavedAt}
              highlightedIds={highlightedNewsSet}
              onRefresh={() => {
                void refreshNews();
              }}
            />
          </Suspense>
        ) : activePage === 'blog' ? (
          <Suspense fallback={<DeferredPanelSkeleton minHeightClass="min-h-[420px]" />}>
            <BlogPage
              posts={allBlogPosts}
              activePostSlug={activeBlogSlug}
              highlightedIds={highlightedBlogSet}
              onSelectPost={selectBlogPost}
              onRunSpeedTest={navigateHome}
            />
          </Suspense>
        ) : activePage === 'not-found' ? (
          (() => {
            const nf = EXTRA_UI_STRINGS[lang]?.notFound ?? EXTRA_UI_STRINGS.en.notFound;
            return (
              <section className="max-w-2xl mx-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-8 space-y-4">
                <div className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400">
                  {nf.code}
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {nf.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {nf.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={PAGE_PATHS.home}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('home');
                    }}
                    className="inline-flex items-center min-h-[42px] px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 hover:opacity-90 transition-colors"
                  >
                    {nf.runSpeedTest}
                  </a>
                  <a
                    href={PAGE_PATHS.blog}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('blog');
                    }}
                    className="inline-flex items-center min-h-[42px] px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {nf.readBlogGuides}
                  </a>
                  <a
                    href={PAGE_PATHS.news}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo('news');
                    }}
                    className="inline-flex items-center min-h-[42px] px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {nf.readNews}
                  </a>
                </div>
              </section>
            );
          })()
        ) : (
          <Suspense fallback={<DeferredPanelSkeleton minHeightClass="min-h-[420px]" />}>
            <LegalAndInfoPages
              page={activePage}
              onBackHome={navigateHome}
              onNavigate={navigateTo}
            />
          </Suspense>
        )}
      </main>

      <Footer activePage={activePage} onNavigate={navigateTo} />

      <ConsentBanner
        onOpenPreferences={() => navigateTo('cookies-notice')}
        suppressed={activePage === 'cookies-notice' || activePage === 'cookies-policy'}
      />

      {showDuplicatePdfModal && (
        <div
          onClick={handleCancelDuplicatePdf}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[2px]"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="duplicate-pdf-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 shrink-0">
                  <FileDown className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2
                  id="duplicate-pdf-title"
                  className="font-display text-base font-semibold text-slate-900 dark:text-slate-100"
                >
                  {t.duplicateModal.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCancelDuplicatePdf}
                aria-label={t.duplicateModal.closeDialog}
                className="min-w-[40px] min-h-[40px] -mr-1.5 -mt-1.5 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.duplicateModal.body}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.duplicateModal.notePrefix}{' '}
              <strong className="font-semibold text-slate-700 dark:text-slate-300">
                {t.duplicateModal.secondCopy}
              </strong>{' '}
              {t.duplicateModal.noteSuffix}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelDuplicatePdf}
                className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {t.duplicateModal.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmDuplicatePdf}
                className="min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {t.duplicateModal.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
