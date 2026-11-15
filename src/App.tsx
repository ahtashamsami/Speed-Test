import { FileDown, Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FastSpeedStage } from './components/FastSpeedStage';
import { Footer } from './components/Footer';
import { LegalAndInfoPages } from './components/LegalAndInfoPages';
import { NetworkDiagnosticsSection } from './components/NetworkDiagnosticsSection';
import { ProxyVpnCard } from './components/ProxyVpnCard';
import { SessionHistory } from './components/SessionHistory';
import { TopBar, type AppPage } from './components/TopBar';
import type {
  NetworkDiagnostics,
  SpeedMetrics,
  SpeedUnit,
  TestRunRecord,
  ThemeMode,
} from './types/network';
import { fetchNetworkDiagnostics } from './utils/networkProbe';
import { exportNetworkReportPdf } from './utils/pdfReport';
import { INITIAL_SPEED_METRICS, runSpeedBenchmark } from './utils/speedEngine';

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

function parsePageFromHash(): AppPage {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();
  switch (hash) {
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

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>(parsePageFromHash);
  const [theme, setTheme] = useState<ThemeMode>(loadInitialTheme);
  const [unit, setUnit] = useState<SpeedUnit>('Mbps');
  const [metrics, setMetrics] = useState<SpeedMetrics>(INITIAL_SPEED_METRICS);
  const [network, setNetwork] = useState<NetworkDiagnostics>(INITIAL_NETWORK);
  const [history, setHistory] = useState<TestRunRecord[]>(loadHistory);

  const abortRef = useRef<AbortController | null>(null);
  const latestIpRef = useRef<string | null>(null);

  useEffect(() => {
    latestIpRef.current = network.primaryIp;
  }, [network.primaryIp]);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(parsePageFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((page: AppPage) => {
    setActivePage(page);
    const nextHash = page === 'home' ? '#speed-test' : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const refreshNetwork = useCallback(async () => {
    setNetwork((prev) => ({ ...prev, loading: true, error: null }));
    const info = await fetchNetworkDiagnostics();
    setNetwork(info);
  }, []);

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
    void refreshNetwork();
    void startTest();

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };
  }, [refreshNetwork, startTest]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const handleExportPdf = useCallback(() => {
    exportNetworkReportPdf({
      metrics,
      network,
      unit,
      history,
    });
  }, [metrics, network, unit, history]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070B12] dark:text-slate-100">
      <TopBar
        phase={metrics.phase}
        activePage={activePage}
        onNavigate={navigateTo}
        onStartTest={startTest}
        onStopTest={stopTest}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {activePage === 'home' ? (
          <>
            {/* Workspace Control Bar + Fast.com-style Speed Stage */}
            <section id="speed-test" className="scroll-mt-20 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1
                  style={{ textWrap: 'balance' }}
                  className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
                >
                  Speed &amp; Network Check
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
                      onClick={() => setUnit('Mbps')}
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
                      onClick={() => setUnit('MB/s')}
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

                  {/* Clean PDF Report Export */}
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <FileDown className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                    <span>Export PDF</span>
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
            <NetworkDiagnosticsSection network={network} onRefresh={refreshNetwork} />

            {/* Session Run History */}
            <SessionHistory records={history} unit={unit} onClear={clearHistory} />
          </>
        ) : (
          <LegalAndInfoPages
            page={activePage}
            onBackHome={() => navigateTo('home')}
            onNavigate={navigateTo}
          />
        )}
      </main>

      <Footer activePage={activePage} onNavigate={navigateTo} />
    </div>
  );
}
