import { FileDown, Moon, Sun } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { DeferredSection } from './components/DeferredSection';
import { FastSpeedStage } from './components/FastSpeedStage';
import { Footer } from './components/Footer';
import { NetworkDiagnosticsSection } from './components/NetworkDiagnosticsSection';
import { ProxyVpnCard } from './components/ProxyVpnCard';
import { PAGE_PATHS, TopBar, type AppPage } from './components/TopBar';
import type {
  NetworkDiagnostics,
  SpeedMetrics,
  SpeedUnit,
  TestRunRecord,
  ThemeMode,
} from './types/network';
import { fetchNetworkDiagnostics } from './utils/networkProbe';
import { applyRouteSeo } from './utils/seoManager';
import { INITIAL_SPEED_METRICS, runSpeedBenchmark } from './utils/speedEngine';

// Lazy-loaded non-critical chunks to shrink initial critical JS bundle and improve LCP
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

function parsePageFromLocation(): AppPage {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();
  const slug = path !== '/' ? path.replace(/^\//, '') : hash;

  switch (slug) {
    case 'about':
      return 'about';
    case 'privacy':
    case 'privacy-policy':
      return 'privacy';
    case 'contact':
      return 'contact';
    case 'disclaimer':
      return 'disclaimer';
    case 'terms':
      return 'terms';
    case 'cookies-policy':
      return 'cookies-policy';
    case 'cookies-notice':
      return 'cookies-notice';
    case 'gdpr':
      return 'gdpr';
    default:
      return 'home';
  }
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
  },
  loading: true,
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
  const [activePage, setActivePage] = useState<AppPage>(parsePageFromLocation);
  const [theme, setTheme] = useState<ThemeMode>(loadInitialTheme);
  const [unit, setUnit] = useState<SpeedUnit>('Mbps');
  const [metrics, setMetrics] = useState<SpeedMetrics>(INITIAL_SPEED_METRICS);
  const [network, setNetwork] = useState<NetworkDiagnostics>(INITIAL_NETWORK);
  const [history, setHistory] = useState<TestRunRecord[]>(loadHistory);
  const [exportingPdf, setExportingPdf] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const latestIpRef = useRef<string | null>(null);
  const metricsRef = useRef<SpeedMetrics>(metrics);
  const networkRef = useRef<NetworkDiagnostics>(network);
  const unitRef = useRef<SpeedUnit>(unit);
  const historyRef = useRef<TestRunRecord[]>(history);

  metricsRef.current = metrics;
  networkRef.current = network;
  unitRef.current = unit;
  historyRef.current = history;

  useEffect(() => {
    latestIpRef.current = network.primaryIp;
  }, [network.primaryIp]);

  // Synchronize per-route On-Page & Technical SEO metadata
  useEffect(() => {
    applyRouteSeo(activePage);
  }, [activePage]);

  useEffect(() => {
    const syncRoute = () => {
      setActivePage(parsePageFromLocation());
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
    const nextPath = PAGE_PATHS[page];
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const setUnitMbps = useCallback(() => setUnit('Mbps'), []);
  const setUnitMBs = useCallback(() => setUnit('MB/s'), []);

  const loadNetwork = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      setNetwork((prev) => ({ ...prev, loading: true, error: null }));
    }
    const info = await fetchNetworkDiagnostics({ forceRefresh });
    setNetwork(info);
  }, []);

  const handleManualRefreshNetwork = useCallback(() => {
    void loadNetwork(true);
  }, [loadNetwork]);

  const stopTest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const startTest = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    const finalResult = await runSpeedBenchmark(controller.signal, (next) => {
      setMetrics(next);
    });

    if (abortRef.current === controller) {
      abortRef.current = null;
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
  }, []);

  useEffect(() => {
    void loadNetwork(false);
    void startTest();

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [loadNetwork, startTest]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Dynamically import jsPDF chunk only when user clicks Export PDF
  const handleExportPdf = useCallback(async () => {
    setExportingPdf(true);
    try {
      const { exportNetworkReportPdf } = await import('./utils/pdfReport');
      await exportNetworkReportPdf({
        metrics: metricsRef.current,
        network: networkRef.current,
        unit: unitRef.current,
        history: historyRef.current,
      });
    } finally {
      setExportingPdf(false);
    }
  }, []);

  const isRunning =
    metrics.phase === 'ping' || metrics.phase === 'download' || metrics.phase === 'upload';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070B12] dark:text-slate-100">
      <TopBar
        isRunning={isRunning}
        activePage={activePage}
        onNavigate={navigateTo}
        onStopTest={stopTest}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {activePage === 'home' ? (
          <>
            {/* Above-the-fold Critical LCP Path: Workspace Control Bar + Speed Stage */}
            <section id="speed-test" className="scroll-mt-20 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1
                  style={{ textWrap: 'balance' }}
                  className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Internet Speed Test &amp; IP Diagnostics
                </h1>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {/* Unit Toggle */}
                  <div
                    role="group"
                    aria-label="Speed unit"
                    className="inline-flex items-center p-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
                  >
                    <button
                      type="button"
                      onClick={setUnitMbps}
                      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
                      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        unit === 'MB/s'
                          ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      MB/s
                    </button>
                  </div>

                  {/* Single-Click Light / Dark Mode Toggle */}
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>

                  {/* On-demand Branded PDF Report Export */}
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    disabled={exportingPdf}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <FileDown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    <span>{exportingPdf ? 'Exporting...' : 'Export PDF'}</span>
                  </button>
                </div>
              </div>

              <FastSpeedStage
                metrics={metrics}
                unit={unit}
                onStartTest={startTest}
                onStopTest={stopTest}
              />
            </section>

            {/* Proxy / VPN Detection Card Box */}
            <ProxyVpnCard network={network} />

            {/* Full IPv4/IPv6, ISP & DNS Diagnostics */}
            <NetworkDiagnosticsSection
              network={network}
              onRefresh={handleManualRefreshNetwork}
            />

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
    </div>
  );
}
