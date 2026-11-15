export type ThemeMode = 'light' | 'dark';

export type SpeedUnit = 'Mbps' | 'MB/s';

export type SpeedPhase =
  | 'idle'
  | 'ping'
  | 'download'
  | 'upload'
  | 'complete'
  | 'stopped'
  | 'error';

export interface SpeedSample {
  elapsedSec: number;
  phase: 'download' | 'upload';
  mbps: number;
}

export interface PingSample {
  index: number;
  rttMs: number;
}

export interface SpeedMetrics {
  phase: SpeedPhase;
  progressPct: number;
  pingMs: number | null;
  minPingMs: number | null;
  jitterMs: number | null;
  downloadMbps: number | null;
  peakDownloadMbps: number | null;
  uploadMbps: number | null;
  peakUploadMbps: number | null;
  pingSamples: PingSample[];
  samples: SpeedSample[];
  errorMessage: string | null;
}

export interface BrowserConnectionHint {
  effectiveType?: string;
  downlinkMbps?: number;
  rttMs?: number;
  saveData?: boolean;
}

export interface ProxyDetectionResult {
  detected: boolean;
  category:
    | 'VPN / Proxy Detected'
    | 'Datacenter / Relay Network'
    | 'Timezone Mismatch (Possible VPN)'
    | 'Direct Connection';
  confidence: 'High' | 'Moderate' | 'Low';
  isProxyOrVpn: boolean;
  isHosting: boolean;
  timezoneMismatch: boolean;
  ipMismatch: boolean;
  browserTimezone: string | null;
  ipTimezone: string | null;
  viaHeader: string | null;
  forwardedHopCount: number;
  matchedProviderSignal: string | null;
  signals: string[];
}

export interface NetworkDiagnostics {
  primaryIp: string | null;
  ipVersion: 4 | 6 | null;
  ipv4: string | null;
  ipv6: string | null;
  isp: string | null;
  org: string | null;
  asn: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
  ptrHostname: string | null;
  dohReachable: boolean | null;
  dohLatencyMs: number | null;
  dohResolver: string;
  protocol: string | null;
  httpVersion: string | null;
  serverService: string | null;
  connectionHint: BrowserConnectionHint | null;
  proxyDetection: ProxyDetectionResult;
  loading: boolean;
  error: string | null;
  lastUpdatedAt: number | null;
}

export interface TestRunRecord {
  id: string;
  timestamp: number;
  downloadMbps: number | null;
  uploadMbps: number | null;
  pingMs: number | null;
  jitterMs: number | null;
  ip: string | null;
}
