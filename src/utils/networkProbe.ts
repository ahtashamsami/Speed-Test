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

interface IpWhoIsResponse {
  ip?: string;
  success?: boolean;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  isp?: string;
  org?: string;
  connection?: {
    asn?: number;
    org?: string;
    isp?: string;
    domain?: string;
  };
  timezone?: {
    id?: string;
  };
}

interface GeoJsResponse {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  organization_name?: string;
  organization?: string;
  asn?: number;
  timezone?: string;
}

interface ClientGeoResult {
  ip: string | null;
  isp: string | null;
  org: string | null;
  asn: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
}

interface NetworkInformationLike {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

const DIAGNOSTICS_CACHE_TTL_MS = 60_000;
let cachedDiagnostics: { data: NetworkDiagnostics; expiresAt: number } | null = null;
let inFlightDiagnosticsPromise: Promise<NetworkDiagnostics> | null = null;

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

async function fetchClientGeoMetadata(): Promise<ClientGeoResult> {
  const ipWho = await fetchJsonWithTimeout<IpWhoIsResponse>('https://ipwho.is/', 3500);
  if (ipWho && ipWho.success !== false) {
    const ispValue = ipWho.connection?.isp || ipWho.isp || ipWho.connection?.org || ipWho.org || null;
    const orgValue = ipWho.connection?.org || ipWho.org || ispValue;
    const asnValue =
      typeof ipWho.connection?.asn === 'number' && ipWho.connection.asn > 0
        ? `AS${ipWho.connection.asn}`
        : null;

    return {
      ip: ipWho.ip || null,
      isp: ispValue,
      org: orgValue,
      asn: asnValue,
      city: ipWho.city || null,
      region: ipWho.region || null,
      country: ipWho.country || null,
      countryCode: ipWho.country_code || null,
      timezone: ipWho.timezone?.id || null,
    };
  }

  const geoJs = await fetchJsonWithTimeout<GeoJsResponse>(
    'https://get.geojs.io/v1/ip/geo.json',
    3500
  );
  if (geoJs) {
    const ispValue = geoJs.organization_name || geoJs.organization || null;
    const asnValue =
      typeof geoJs.asn === 'number' && geoJs.asn > 0 ? `AS${geoJs.asn}` : null;

    return {
      ip: geoJs.ip || null,
      isp: ispValue,
      org: geoJs.organization_name || null,
      asn: asnValue,
      city: geoJs.city || null,
      region: geoJs.region || null,
      country: geoJs.country || null,
      countryCode: geoJs.country_code || null,
      timezone: geoJs.timezone || null,
    };
  }

  return {
    ip: null,
    isp: null,
    org: null,
    asn: null,
    city: null,
    region: null,
    country: null,
    countryCode: null,
    timezone: null,
  };
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
  apiTimezone: string | null,
  ipv4Candidate: string | null,
  ipv6Candidate: string | null
): ProxyDetectionResult {
  const browserTimezone = getBrowserTimezone();
  const serverProxy = serverInfo?.proxyDetection;

  const timezoneMismatch = Boolean(
    browserTimezone &&
      apiTimezone &&
      browserTimezone.toLowerCase() !== apiTimezone.toLowerCase()
  );

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
      `Browser timezone (${browserTimezone}) differs from IP geolocation timezone (${apiTimezone})`
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
    ipTimezone: apiTimezone,
    viaHeader: serverProxy?.viaHeader ?? null,
    forwardedHopCount: serverProxy?.forwardedHopCount ?? 0,
    matchedProviderSignal: serverProxy?.matchedProviderSignal ?? null,
    signals,
  };
}

async function executeDiagnosticsFetch(): Promise<NetworkDiagnostics> {
  const [clientGeo, serverInfo, ipv4Probe, ipv6Probe, dohProbe] = await Promise.all([
    fetchClientGeoMetadata(),
    fetchJsonWithTimeout<ServerNetworkResponse>('/api/network-info', 4500),
    fetchJsonWithTimeout<{ ip?: string }>('https://api.ipify.org?format=json', 3000),
    fetchJsonWithTimeout<{ ip?: string }>('https://api6.ipify.org?format=json', 2500),
    probeDohResolver(),
  ]);

  const geoIp = clientGeo.ip;
  const geoIsV4 = Boolean(geoIp && !geoIp.includes(':'));
  const geoIsV6 = Boolean(geoIp && geoIp.includes(':'));

  const ipv4Candidate =
    (ipv4Probe?.ip && !ipv4Probe.ip.includes(':') ? ipv4Probe.ip : null) ||
    (geoIsV4 ? geoIp : null) ||
    (serverInfo?.ipVersion === 4 ? serverInfo.observedIp : null);

  const ipv6Candidate =
    (ipv6Probe?.ip && ipv6Probe.ip.includes(':') ? ipv6Probe.ip : null) ||
    (geoIsV6 ? geoIp : null) ||
    (serverInfo?.ipVersion === 6 ? serverInfo.observedIp : null);

  const primaryIp =
    geoIp || serverInfo?.observedIp || ipv4Candidate || ipv6Candidate || null;
  const ipVersion = primaryIp
    ? primaryIp.includes(':')
      ? 6
      : 4
    : serverInfo?.ipVersion ?? null;

  const isp = clientGeo.isp || serverInfo?.isp || null;
  const org = clientGeo.org || serverInfo?.org || null;
  const asn = clientGeo.asn || serverInfo?.asn || null;
  const city = clientGeo.city || serverInfo?.city || null;
  const region = clientGeo.region || serverInfo?.region || null;
  const country = clientGeo.country || serverInfo?.country || null;
  const countryCode = clientGeo.countryCode || serverInfo?.countryCode || null;

  const apiTimezone = clientGeo.timezone || serverInfo?.timezone || null;
  const timezone = apiTimezone || getBrowserTimezone();

  const hasError =
    !primaryIp && !isp && !asn && !city && !country && !serverInfo;

  const proxyDetection = buildProxyDetection(
    serverInfo,
    apiTimezone,
    ipv4Candidate,
    ipv6Candidate
  );

  return {
    primaryIp,
    ipVersion,
    ipv4: ipv4Candidate,
    ipv6: ipv6Candidate,
    isp,
    org,
    asn,
    city,
    region,
    country,
    countryCode,
    timezone,
    ptrHostname: serverInfo?.ptrHostname ?? null,
    dohReachable: dohProbe.reachable,
    dohLatencyMs: dohProbe.latencyMs,
    dohResolver: 'Cloudflare DoH (1.1.1.1)',
    protocol: serverInfo?.protocol ?? window.location.protocol.replace(':', ''),
    httpVersion: serverInfo?.httpVersion ?? null,
    serverService: serverInfo?.serverService ?? null,
    connectionHint: readBrowserConnectionHint(),
    proxyDetection,
    loading: false,
    error: hasError ? 'Unable to reach IP diagnostics endpoints.' : null,
    lastUpdatedAt: Date.now(),
  };
}

/**
 * Memoized + deduplicated network diagnostic fetcher.
 * Reuses in-flight promises and a 60-second TTL cache unless forceRefresh is true.
 */
export async function fetchNetworkDiagnostics(
  options: { forceRefresh?: boolean } = {}
): Promise<NetworkDiagnostics> {
  const { forceRefresh = false } = options;

  if (!forceRefresh && cachedDiagnostics && Date.now() < cachedDiagnostics.expiresAt) {
    return cachedDiagnostics.data;
  }

  if (!forceRefresh && inFlightDiagnosticsPromise) {
    return inFlightDiagnosticsPromise;
  }

  const promise = executeDiagnosticsFetch()
    .then((result) => {
      if (!result.error) {
        cachedDiagnostics = {
          data: result,
          expiresAt: Date.now() + DIAGNOSTICS_CACHE_TTL_MS,
        };
      }
      return result;
    })
    .finally(() => {
      if (inFlightDiagnosticsPromise === promise) {
        inFlightDiagnosticsPromise = null;
      }
    });

  inFlightDiagnosticsPromise = promise;
  return promise;
}
