import { Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FastSpeedStage } from './components/FastSpeedStage';
import { NetworkDiagnosticsSection } from './components/NetworkDiagnosticsSection';
import { ProxyVpnCard } from './components/ProxyVpnCard';
import { SessionHistory } from './components/SessionHistory';
import { TopBar } from './components/TopBar';
import type {
  NetworkDiagnostics,
  SpeedMetrics,
  SpeedUnit,
  TestRunRecord,
  ThemeMode,
} from './types/network';
import { fetchNetworkDiagnostics } from './utils/networkProbe';
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

  const applyTheme = useCallback((nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage failures
    }
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
      const entry: TestRunRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070B12] dark:text-slate-100">
      <TopBar phase={metrics.phase} onStartTest={startTest} onStopTest={stopTest} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
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

              <div
                role="group"
                aria-label="Color theme"
                className="inline-flex items-center p-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
              >
                <button
                  type="button"
                  onClick={() => applyTheme('light')}
                  aria-pressed={theme === 'light'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyTheme('dark')}
                  aria-pressed={theme === 'dark'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>

          <FastSpeedStage
            metrics={metrics}
            unit={unit}
            onStartTest={startTest}
            onStopTest={stopTest}
          />
        </section>

        {/* Proxy / VPN Detection Card Box (shown whenever proxy/VPN/relay signals are detected) */}
        <ProxyVpnCard network={network} />

        {/* Full IPv4/IPv6, ISP & DNS Diagnostics */}
        <NetworkDiagnosticsSection network={network} onRefresh={refreshNetwork} />

        {/* Session Run History */}
        <SessionHistory records={history} unit={unit} onClear={clearHistory} />
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>TestLine · Single-page network speed and IP diagnostics</span>
          <span>Measurements reflect live browser-to-edge transport throughput</span>
        </div>
      </footer>
    </div>
  );
}
