import type {
  BrowserConnectionHint,
  NetworkDiagnostics,
  ProxyDetectionResult,
} from '../types/network';

interface ServerProxyDetection {
  isProxyOrVpn: boolean;
  isHosting: boolean;
  proxyFlag: boolean;
  hostingFlag: boolean;
  viaHeader: string | null;
  forwardedHopCount: number;
  matchedProviderSignal: string | null;
}

interface ServerNetworkResponse {
  observedIp: string | null;
  ipVersion: 4 | 6 | null;
  ptrHostname: string | null;
  isp: string | null;
  org: string | null;
  asn: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
  protocol: string | null;
  httpVersion: string | null;
  serverService: string | null;
  proxyDetection?: ServerProxyDetection;
}

interface NetworkInformationLike {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

async function fetchJsonWithTimeout<T>(
  url: string,
  timeoutMs: number,
  init?: RequestInit
): Promise<T | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

function readBrowserConnectionHint(): BrowserConnectionHint | null {
  const nav = navigator as Navigator & {
    connection?: NetworkInformationLike;
    mozConnection?: NetworkInformationLike;
    webkitConnection?: NetworkInformationLike;
  };
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return null;
  return {
    effectiveType: conn.effectiveType,
    downlinkMbps: typeof conn.downlink === 'number' ? conn.downlink : undefined,
    rttMs: typeof conn.rtt === 'number' ? conn.rtt : undefined,
    saveData: typeof conn.saveData === 'boolean' ? conn.saveData : undefined,
  };
}

async function probeDohResolver(): Promise<{ reachable: boolean; latencyMs: number | null }> {
  const started = performance.now();
  const res = await fetchJsonWithTimeout<{ Status?: number }>(
    'https://cloudflare-dns.com/dns-query?name=example.com&type=A',
    2800,
    {
      headers: {
        Accept: 'application/dns-json',
      },
    }
  );
  if (!res) {
    return { reachable: false, latencyMs: null };
  }
  const latencyMs = Number((performance.now() - started).toFixed(1));
  return { reachable: res.Status === 0, latencyMs };
}

function getBrowserTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

function buildProxyDetection(
  serverInfo: ServerNetworkResponse | null,
  ipv4Candidate: string | null,
  ipv6Candidate: string | null
): ProxyDetectionResult {
  const browserTimezone = getBrowserTimezone();
  const ipTimezone = serverInfo?.timezone ?? null;
  const serverProxy = serverInfo?.proxyDetection;

  const timezoneMismatch = Boolean(
    browserTimezone &&
      ipTimezone &&
      browserTimezone.toLowerCase() !== ipTimezone.toLowerCase()
  );

  // Check if direct browser IPv4/IPv6 differs from edge-observed IP of the same version
  const ipMismatch = Boolean(
    serverInfo?.observedIp &&
      ((serverInfo.ipVersion === 4 && ipv4Candidate && ipv4Candidate !== serverInfo.observedIp) ||
        (serverInfo.ipVersion === 6 && ipv6Candidate && ipv6Candidate !== serverInfo.observedIp))
  );

  const signals: string[] = [];

  if (serverProxy?.proxyFlag) {
    signals.push('IP address is flagged as an active proxy, VPN, or Tor exit');
  }
  if (serverProxy?.hostingFlag) {
    signals.push('Traffic originates from a datacenter / hosting ASN rather than a residential ISP');
  }
  if (serverProxy?.matchedProviderSignal) {
    signals.push(`Network operator / PTR matches relay keyword (${serverProxy.matchedProviderSignal})`);
  }
  if (serverProxy?.viaHeader) {
    signals.push(`Proxy forwarding header detected (${serverProxy.viaHeader})`);
  }
  if ((serverProxy?.forwardedHopCount ?? 0) > 2) {
    signals.push(`Multiple forwarding hops observed (${serverProxy?.forwardedHopCount} hops)`);
  }
  if (ipMismatch) {
    signals.push('Direct browser IP differs from edge-observed IP (split-tunnel or proxy routing)');
  }
  if (timezoneMismatch) {
    signals.push(
      `Browser timezone (${browserTimezone}) differs from IP geolocation timezone (${ipTimezone})`
    );
  }

  const isProxyOrVpn = Boolean(serverProxy?.isProxyOrVpn || ipMismatch);
  const isHosting = Boolean(serverProxy?.isHosting);
  const detected = signals.length > 0;

  let category: ProxyDetectionResult['category'] = 'Direct Connection';
  let confidence: ProxyDetectionResult['confidence'] = 'Low';

  if (serverProxy?.proxyFlag || serverProxy?.viaHeader || ipMismatch) {
    category = 'VPN / Proxy Detected';
    confidence = 'High';
  } else if (isHosting || serverProxy?.matchedProviderSignal) {
    category = isProxyOrVpn ? 'VPN / Proxy Detected' : 'Datacenter / Relay Network';
    confidence = signals.length >= 2 ? 'High' : 'Moderate';
  } else if (timezoneMismatch) {
    category = 'Timezone Mismatch (Possible VPN)';
    confidence = 'Low';
  }

  return {
    detected,
    category,
    confidence,
    isProxyOrVpn,
    isHosting,
    timezoneMismatch,
    ipMismatch,
    browserTimezone,
    ipTimezone,
    viaHeader: serverProxy?.viaHeader ?? null,
    forwardedHopCount: serverProxy?.forwardedHopCount ?? 0,
    matchedProviderSignal: serverProxy?.matchedProviderSignal ?? null,
    signals,
  };
}

export async function fetchNetworkDiagnostics(): Promise<NetworkDiagnostics> {
  const [serverInfo, ipv4Probe, ipv6Probe, dohProbe] = await Promise.all([
    fetchJsonWithTimeout<ServerNetworkResponse>('/api/network-info', 4500),
    fetchJsonWithTimeout<{ ip?: string }>('https://api.ipify.org?format=json', 3000),
    fetchJsonWithTimeout<{ ip?: string }>('https://api6.ipify.org?format=json', 2500),
    probeDohResolver(),
  ]);

  const ipv4Candidate =
    ipv4Probe?.ip && !ipv4Probe.ip.includes(':')
      ? ipv4Probe.ip
      : serverInfo?.ipVersion === 4
      ? serverInfo.observedIp
      : null;

  const ipv6Candidate =
    ipv6Probe?.ip && ipv6Probe.ip.includes(':')
      ? ipv6Probe.ip
      : serverInfo?.ipVersion === 6
      ? serverInfo.observedIp
      : null;

  const primaryIp = serverInfo?.observedIp || ipv4Candidate || ipv6Candidate || null;
  const ipVersion = primaryIp
    ? primaryIp.includes(':')
      ? 6
      : 4
    : serverInfo?.ipVersion ?? null;

  const hasError = !serverInfo && !ipv4Candidate && !ipv6Candidate;
  const proxyDetection = buildProxyDetection(serverInfo, ipv4Candidate, ipv6Candidate);

  return {
    primaryIp,
    ipVersion,
    ipv4: ipv4Candidate,
    ipv6: ipv6Candidate,
    isp: serverInfo?.isp ?? null,
    org: serverInfo?.org ?? null,
    asn: serverInfo?.asn ?? null,
    city: serverInfo?.city ?? null,
    region: serverInfo?.region ?? null,
    country: serverInfo?.country ?? null,
    countryCode: serverInfo?.countryCode ?? null,
    timezone: serverInfo?.timezone ?? null,
    ptrHostname: serverInfo?.ptrHostname ?? null,
    dohReachable: dohProbe.reachable,
    dohLatencyMs: dohProbe.latencyMs,
    dohResolver: 'Cloudflare DoH (1.1.1.1)',
    protocol: serverInfo?.protocol ?? null,
    httpVersion: serverInfo?.httpVersion ?? null,
    serverService: serverInfo?.serverService ?? null,
    connectionHint: readBrowserConnectionHint(),
    proxyDetection,
    loading: false,
    error: hasError ? 'Unable to reach IP diagnostics endpoints.' : null,
    lastUpdatedAt: Date.now(),
  };
}
