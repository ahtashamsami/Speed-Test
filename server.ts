import crypto from 'node:crypto';
import dns from 'node:dns/promises';
import fs from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveListenOptions(): { port: number; host: string } {
  const args = process.argv.slice(2);
  let cliPort: number | null = null;
  let cliHost: string | null = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--port' && args[i + 1]) {
      const parsed = Number(args[i + 1]);
      if (Number.isFinite(parsed) && parsed > 0) cliPort = parsed;
      i++;
    } else if (arg.startsWith('--port=')) {
      const parsed = Number(arg.slice('--port='.length));
      if (Number.isFinite(parsed) && parsed > 0) cliPort = parsed;
    } else if (arg === '--host' && args[i + 1]) {
      cliHost = args[i + 1];
      i++;
    } else if (arg.startsWith('--host=')) {
      cliHost = arg.slice('--host='.length);
    }
  }

  const envPort = Number(process.env.PORT);
  const port = cliPort ?? (Number.isFinite(envPort) && envPort > 0 ? envPort : 3000);
  const host = cliHost || process.env.HOST || '0.0.0.0';
  return { port, host };
}

const { port: PORT, host: HOST } = resolveListenOptions();
const CHUNK_SIZE = 1024 * 1024; // 1 MiB high-entropy uncompressible chunk
const RANDOM_CHUNK = crypto.randomBytes(CHUNK_SIZE);

const KNOWN_VPN_OR_RELAY_KEYWORDS = [
  'vpn',
  'proxy',
  'tor ',
  'exit node',
  'mullvad',
  'nordvpn',
  'protonvpn',
  'proton ag',
  'expressvpn',
  'surfshark',
  'private internet access',
  'windscribe',
  'cyberghost',
  'ipvanish',
  'vyprvpn',
  'tailscale',
  'wireguard',
  'cloudflare warp',
  'm247',
  'datacamp',
  'tzulo',
  'digitalocean',
  'hetzner',
  'ovh',
  'linode',
  'akamai connected cloud',
  'vultr',
  'amazon',
  'aws',
  'google cloud',
  'microsoft azure',
];

const SERVER_ROUTE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'TestLine — Internet Speed Test & IP Diagnostics',
    description:
      'Test live internet download, upload, ping, and jitter with TestLine by ECORZO LLC. Check public IPv4/IPv6, ISP, ASN, DNS latency, and VPN or proxy status.',
  },
  '/about': {
    title: 'About TestLine — Speed & IP Diagnostics | ECORZO LLC',
    description:
      'Learn how TestLine by ECORZO LLC measures real-time bandwidth, latency, jitter, dual-stack IPv4/IPv6 routing, DoH DNS speed, and proxy/VPN signals.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — TestLine by ECORZO LLC',
    description:
      'Read the TestLine Privacy Policy by ECORZO LLC covering ephemeral IP processing, Cloudflare diagnostics, GDPR compliance, and Google policy disclosures.',
  },
  '/contact': {
    title: 'Contact ECORZO LLC — TestLine Support & Inquiries',
    description:
      'Contact ECORZO LLC for TestLine network diagnostics, privacy, or compliance inquiries. Phone: +1 646 427 6802. Address: 224 W 35th St STE 500, New York, NY 10001.',
  },
  '/disclaimer': {
    title: 'Disclaimer — TestLine by ECORZO LLC',
    description:
      'Understand measurement scope, network variables, IP geolocation limits, and proxy detection accuracy on TestLine by ECORZO LLC.',
  },
  '/terms': {
    title: 'Terms & Conditions — TestLine by ECORZO LLC',
    description:
      'Review the Terms and Conditions governing acceptable use of TestLine speed benchmark and IP diagnostic services operated by ECORZO LLC.',
  },
  '/cookies-policy': {
    title: 'Cookies Policy — TestLine by ECORZO LLC',
    description:
      'See the exact browser local storage keys and cookie disclosures used by TestLine by ECORZO LLC under GDPR and Google EU User Consent Policy.',
  },
  '/cookies-notice': {
    title: 'Cookies Notice & Preferences — TestLine by ECORZO LLC',
    description:
      'Manage your cookie and browser storage consent preferences for TestLine by ECORZO LLC.',
  },
  '/gdpr': {
    title: 'GDPR & Data Collection Policy — TestLine by ECORZO LLC',
    description:
      'Explore ECORZO LLC GDPR Article 6 lawful bases, data minimization standards, international transfers, and user data rights for TestLine.',
  },
};

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectSeoIntoHtml(html: string, origin: string, reqPath: string): string {
  const normalizedPath = reqPath.toLowerCase().replace(/\/+$/, '') || '/';
  const meta = SERVER_ROUTE_SEO[normalizedPath] ?? SERVER_ROUTE_SEO['/'];
  const canonicalUrl = `${origin}${normalizedPath}`;
  const ogImageUrl = `${origin}/assets/aistudio/test_logo_header_dark.png`;

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtmlAttr(meta.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?>/i,
      `<meta name="description" content="${escapeHtmlAttr(meta.description)}" />`
    )
    .replace(/\s*<link\s+rel="canonical"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+property="og:(?:url|title|description|image)"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+name="twitter:(?:title|description|image)"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+name="google-adsense-account"[\s\S]*?>/gi, '');

  const rawAdSenseClient =
    process.env.VITE_ADSENSE_CLIENT_ID?.trim() || process.env.ADSENSE_PUBLISHER_ID?.trim() || '';
  const normalizedClientId = rawAdSenseClient
    ? rawAdSenseClient.startsWith('ca-')
      ? rawAdSenseClient
      : `ca-${rawAdSenseClient}`
    : '';

  const dynamicTags = [
    `<link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    ...(normalizedClientId && /^ca-pub-\d{10,20}$/.test(normalizedClientId)
      ? [`<meta name="google-adsense-account" content="${escapeHtmlAttr(normalizedClientId)}" />`]
      : []),
  ].join('\n    ');

  output = output.replace('</head>', `    ${dynamicTags}\n  </head>`);
  return output;
}

function resolveBaseOrigin(_req: Request): string {
  const configured = process.env.APP_URL?.trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.replace(/\/+$/, '');
  }
  return 'https://testline.net';
}

function buildAdsTxtContent(): string {
  const rawPub =
    process.env.ADSENSE_PUBLISHER_ID?.trim() || process.env.VITE_ADSENSE_CLIENT_ID?.trim() || '';
  const pubId = rawPub.replace(/^ca-/i, '');
  if (pubId && /^pub-\d{10,20}$/.test(pubId)) {
    return `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  }
  return `# TestLine (https://testline.net) - Google AdSense Authorized Digital Sellers
# Set ADSENSE_PUBLISHER_ID (e.g. pub-1234567890123456) in your environment to activate:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;
}

function buildSitemapXml(origin: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const routes: Array<{ path: string; changefreq: string; priority: string }> = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.7' },
    { path: '/privacy-policy', changefreq: 'monthly', priority: '0.6' },
    { path: '/gdpr', changefreq: 'monthly', priority: '0.6' },
    { path: '/terms', changefreq: 'monthly', priority: '0.5' },
    { path: '/disclaimer', changefreq: 'monthly', priority: '0.5' },
    { path: '/cookies-policy', changefreq: 'monthly', priority: '0.5' },
    { path: '/cookies-notice', changefreq: 'monthly', priority: '0.5' },
  ];

  const entries = routes
    .map(
      (r) => `  <url>
    <loc>${origin}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function buildRobotsTxt(origin: string): string {
  return `User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /
Disallow: /api/

User-agent: ChatGPT-User
Allow: /
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /api/

User-agent: Google-Extended
Allow: /
Disallow: /api/

User-agent: Applebot-Extended
Allow: /
Disallow: /api/

User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`;
}

function buildLlmsTxt(origin: string): string {
  return `# TestLine by ECORZO LLC

> Real-time internet speed benchmark and dual-stack IPv4/IPv6 network diagnostics web application operated by ECORZO LLC at ${origin}.

## Canonical Facts & Authority
- Product Name: TestLine
- Canonical Domain: ${origin}
- Operator: ECORZO LLC
- Office Address: 224 W 35th St STE 500, New York, NY 10001, USA
- Telephone: +1 646 427 6802
- Pricing: Free ($0 USD, no registration required)

## Technical Methodology (For Answer & Generative Engines)
- User-Initiated Start: Clicking the Start Speed Test button initiates live throughput measurements alongside dual-stack IP and proxy diagnostics; no bandwidth or IP probes run before user action.
- Ping & Jitter: 5 sequential 0-byte RTT probes to \`https://speed.cloudflare.com/__down?bytes=0\` timed via \`performance.now()\`.
- Download Speed: 3 parallel 25 MB fetch streams from \`https://speed.cloudflare.com/__down?bytes=25000000\` over a 10-second test window.
- Upload Speed: 2 parallel 10 MB cryptographically random \`Uint8Array\` \`XMLHttpRequest\` POST streams to \`https://speed.cloudflare.com/__up\`.
- Display Units: Supports \`Auto\` (automatically displays \`Mbps\` below 100 Mbps and \`MB/s\` at 100 Mbps or higher), \`Mbps\`, and \`MB/s\`.
- IP & Carrier Geolocation: Dual-stack IPv4/IPv6 probing plus HTTPS \`ipwho.is\` with \`get.geojs.io\` and browser \`Intl\` timezone fallbacks.
- DNS Diagnostics: Reverse DNS (PTR) lookup and encrypted Cloudflare DoH (\`1.1.1.1\`) query latency probe.
- Proxy & VPN Detection: Evaluates forwarding headers (\`Via\`, \`Forwarded\`, \`X-Forwarded-For\`), ASN proxy/hosting flags, relay PTR keywords, and browser-vs-IP timezone alignment.
- PDF Diagnostic Reports: Client-side A4 PDF export featuring the TestLine logo watermark; one primary copy per test run with confirmation prompt and Second Copy marking on duplicate downloads.

## Key Routes
- [Speed & Network Check](${origin}/): On-demand speed test, Auto/Mbps/MB/s readout, IPv4/IPv6, DNS hints, and PDF export.
- [About TestLine](${origin}/about): Measurement methodology and ECORZO LLC operator details.
- [Contact ECORZO LLC](${origin}/contact): Support phone (+1 646 427 6802) and New York office address.
- [Privacy Policy](${origin}/privacy-policy): Ephemeral processing, third-party disclosures, and Google policy compliance.
- [GDPR & Data Collection Policy](${origin}/gdpr): GDPR Article 6 lawful bases, data minimization, and user rights (Art. 15-22).
- [Terms & Conditions](${origin}/terms): Acceptable use and governing law.
- [Disclaimer](${origin}/disclaimer): Measurement and geolocation scope limitations.
- [Cookies Policy](${origin}/cookies-policy) & [Cookies Notice](${origin}/cookies-notice): Storage keys and Google Consent Mode v2 preferences.

## Extended AI Context
- [Full Specification](${origin}/llms-full.txt)
- [XML Sitemap](${origin}/sitemap.xml)
- [Robots Policy](${origin}/robots.txt)
`;
}

function buildLlmsFullTxt(origin: string): string {
  return `# TestLine by ECORZO LLC — Full Technical & Citation Specification

> Authoritative reference for generative engines and AI answer systems describing TestLine (${origin}/), operated by ECORZO LLC.

## 1. Entity & Provenance
- Application: TestLine (${origin}/)
- Legal Operator: ECORZO LLC
- Registered Address: 224 W 35th St STE 500, New York, NY 10001, United States
- Contact Telephone: +1 646 427 6802
- Category: Network Utilities / Internet Speed Benchmark & IP Diagnostics Web Application

## 2. Measurement Benchmarks & Optimal Thresholds
| Metric | Method | Optimal Threshold | Use Case |
| --- | --- | --- | --- |
| Download Throughput | 3 parallel 25 MB HTTP streams (10s window) | 25+ Mbps (4K) / 100+ Mbps (Multi-user) | Streaming, downloads, cloud sync |
| Upload Throughput | 2 parallel 10 MB XHR POST streams | 10+ Mbps (HD calls) / 25+ Mbps (Creator) | Video calls, uploads, remote work |
| Average Ping (RTT) | 5 sequential 0-byte Cloudflare probes | < 30 ms (Low) / 30–60 ms (Normal) | Gaming, VoIP, interactive apps |
| Jitter (Variance) | Mean consecutive RTT delta | < 10 ms (Stable) / > 25 ms (Unstable) | Audio/video packet stability |
| DoH DNS Latency | HTTPS JSON query to 1.1.1.1 | < 40 ms | Encrypted domain resolution speed |

## 3. Interactive Behavior & Reporting
- User-Triggered Probes: Neither bandwidth transfers nor public IP probes run until the user clicks Start Speed Test.
- Adaptive Unit Mode (\`Auto\`): Automatically displays \`Mbps\` for connections under 100 Mbps and switches to \`MB/s\` at 100 Mbps or higher, with manual \`Mbps\` and \`MB/s\` overrides.
- PDF Export Controls: Client-side jsPDF reports include the TestLine brand logo header and centered watermark; duplicate exports during the same test run require explicit confirmation and are labeled \`Second Copy\`.

## 4. Privacy & Data Handling Commitments
- Zero account registration, zero passwords, and zero sale of personal data or IP addresses.
- Ephemeral server processing for IP lookup, PTR resolution, and forwarding header inspection.
- Client-side local storage keys: \`testline_theme\`, \`testline_unit_v1\`, \`testline_history_v1\` (max 15 runs), \`testline_cookie_consent\`.
- Compliant with EU/UK GDPR (Articles 5, 6, 15-22), Google Consent Mode v2, CCPA/CPRA, and Google Publisher Policies.
`;
}

function extractClientIpInfo(req: Request): { ip: string; hopCount: number } {
  const forwarded = req.headers['x-forwarded-for'];
  let rawIp = '';
  let hopCount = 0;

  if (typeof forwarded === 'string' && forwarded.trim().length > 0) {
    const hops = forwarded
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    hopCount = hops.length;
    rawIp = hops[0] || '';
  } else if (Array.isArray(forwarded) && forwarded.length > 0) {
    const hops = forwarded
      .flatMap((item) => item.split(','))
      .map((s) => s.trim())
      .filter(Boolean);
    hopCount = hops.length;
    rawIp = hops[0] || '';
  } else if (typeof req.headers['x-real-ip'] === 'string') {
    rawIp = req.headers['x-real-ip'].trim();
    hopCount = 1;
  } else {
    rawIp = req.ip || req.socket.remoteAddress || '';
  }

  if (rawIp.startsWith('::ffff:')) {
    rawIp = rawIp.slice(7);
  }
  return { ip: rawIp, hopCount };
}

function isPrivateOrLoopbackIp(ip: string): boolean {
  if (!ip) return true;
  if (ip === '::1' || ip === '127.0.0.1' || ip === 'localhost') return true;
  if (net.isIPv4(ip)) {
    const parts = ip.split('.').map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) return true;
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80')) {
      return true;
    }
  }
  return false;
}

async function fetchWithTimeout(url: string, timeoutMs = 2500): Promise<globalThis.Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function lookupPtrHostname(ip: string): Promise<string | null> {
  if (!ip || net.isIP(ip) === 0) return null;
  try {
    const result = await Promise.race([
      dns.reverse(ip),
      new Promise<string[]>((_, reject) => setTimeout(() => reject(new Error('PTR timeout')), 1500)),
    ]);
    return result && result.length > 0 ? result[0] : null;
  } catch {
    return null;
  }
}

interface IpMetadata {
  isp: string | null;
  org: string | null;
  asn: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
  proxyFlag: boolean;
  hostingFlag: boolean;
}

async function enrichIpMetadata(ip: string): Promise<IpMetadata> {
  const empty: IpMetadata = {
    isp: null,
    org: null,
    asn: null,
    city: null,
    region: null,
    country: null,
    countryCode: null,
    timezone: null,
    proxyFlag: false,
    hostingFlag: false,
  };

  if (!ip || isPrivateOrLoopbackIp(ip)) return empty;

  const [ipWhoResult, ipApiResult] = await Promise.allSettled([
    fetchWithTimeout(`https://ipwho.is/${encodeURIComponent(ip)}`, 2800).then((r) =>
      r.ok ? r.json() : null
    ),
    fetchWithTimeout(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city,isp,org,as,timezone,proxy,hosting`,
      2800
    ).then((r) => (r.ok ? r.json() : null)),
  ]);

  const ipWho =
    ipWhoResult.status === 'fulfilled'
      ? (ipWhoResult.value as {
          success?: boolean;
          city?: string;
          region?: string;
          country?: string;
          country_code?: string;
          connection?: { asn?: number; org?: string; isp?: string };
          timezone?: { id?: string };
        } | null)
      : null;

  const ipApi =
    ipApiResult.status === 'fulfilled'
      ? (ipApiResult.value as {
          status?: string;
          country?: string;
          countryCode?: string;
          regionName?: string;
          city?: string;
          isp?: string;
          org?: string;
          as?: string;
          timezone?: string;
          proxy?: boolean;
          hosting?: boolean;
        } | null)
      : null;

  const whoOk = Boolean(ipWho && ipWho.success !== false);
  const apiOk = Boolean(ipApi && ipApi.status === 'success');

  const asnMatch = apiOk && ipApi?.as ? ipApi.as.match(/^(AS\d+)/i) : null;

  return {
    isp:
      (whoOk ? ipWho?.connection?.isp || ipWho?.connection?.org : null) ||
      (apiOk ? ipApi?.isp || ipApi?.org : null) ||
      null,
    org: (whoOk ? ipWho?.connection?.org : null) || (apiOk ? ipApi?.org : null) || null,
    asn:
      (whoOk && ipWho?.connection?.asn ? `AS${ipWho.connection.asn}` : null) ||
      (asnMatch ? asnMatch[1] : apiOk ? ipApi?.as || null : null) ||
      null,
    city: (whoOk ? ipWho?.city : null) || (apiOk ? ipApi?.city : null) || null,
    region: (whoOk ? ipWho?.region : null) || (apiOk ? ipApi?.regionName : null) || null,
    country: (whoOk ? ipWho?.country : null) || (apiOk ? ipApi?.country : null) || null,
    countryCode:
      (whoOk ? ipWho?.country_code : null) || (apiOk ? ipApi?.countryCode : null) || null,
    timezone: (whoOk ? ipWho?.timezone?.id : null) || (apiOk ? ipApi?.timezone : null) || null,
    proxyFlag: apiOk ? Boolean(ipApi?.proxy) : false,
    hostingFlag: apiOk ? Boolean(ipApi?.hosting) : false,
  };
}

function findProviderKeywordMatch(fields: Array<string | null>): string | null {
  const haystack = fields.filter(Boolean).join(' ').toLowerCase();
  if (!haystack) return null;
  for (const kw of KNOWN_VPN_OR_RELAY_KEYWORDS) {
    if (haystack.includes(kw)) {
      return kw.trim();
    }
  }
  return null;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.disable('etag');

  // Technical SEO & Security baseline headers
  app.use((req: Request, res: Response, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (req.path.startsWith('/api/')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
  });

  // Dynamic SEO & GEO/LLM crawler files (supports ?download=1 for direct browser download)
  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const origin = resolveBaseOrigin(req);
    const xml = buildSitemapXml(origin);
    res.set('Content-Type', 'application/xml; charset=utf-8');
    if (req.query.download === '1') {
      res.set('Content-Disposition', 'attachment; filename="sitemap.xml"');
    } else {
      res.set('Cache-Control', 'public, max-age=3600');
    }
    res.status(200).send(xml);
  });

  app.get('/robots.txt', (req: Request, res: Response) => {
    const origin = resolveBaseOrigin(req);
    const txt = buildRobotsTxt(origin);
    res.set('Content-Type', 'text/plain; charset=utf-8');
    if (req.query.download === '1') {
      res.set('Content-Disposition', 'attachment; filename="robots.txt"');
    } else {
      res.set('Cache-Control', 'public, max-age=3600');
    }
    res.status(200).send(txt);
  });

  app.get('/llms.txt', (req: Request, res: Response) => {
    const origin = resolveBaseOrigin(req);
    const txt = buildLlmsTxt(origin);
    res.set('Content-Type', 'text/plain; charset=utf-8');
    if (req.query.download === '1') {
      res.set('Content-Disposition', 'attachment; filename="llms.txt"');
    } else {
      res.set('Cache-Control', 'public, max-age=3600');
    }
    res.status(200).send(txt);
  });

  app.get('/llms-full.txt', (req: Request, res: Response) => {
    const origin = resolveBaseOrigin(req);
    const txt = buildLlmsFullTxt(origin);
    res.set('Content-Type', 'text/plain; charset=utf-8');
    if (req.query.download === '1') {
      res.set('Content-Disposition', 'attachment; filename="llms-full.txt"');
    } else {
      res.set('Cache-Control', 'public, max-age=3600');
    }
    res.status(200).send(txt);
  });

  const WEB_MANIFEST_JSON = JSON.stringify(
    {
      name: 'TestLine — Internet Speed Test & IP Diagnostics',
      short_name: 'TestLine',
      description:
        'Real-time internet speed benchmark (download, upload, ping, jitter) and full IPv4/IPv6, reverse DNS, DoH latency, and proxy/VPN diagnostics by ECORZO LLC.',
      id: '/',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'any',
      background_color: '#070B12',
      theme_color: '#070B12',
      lang: 'en',
      categories: ['utilities', 'productivity'],
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
    },
    null,
    2
  );

  app.get(['/manifest.webmanifest', '/manifest.json'], (_req: Request, res: Response) => {
    res.set({
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    });
    res.status(200).send(WEB_MANIFEST_JSON);
  });

  app.get('/.well-known/ard.json', async (_req: Request, res: Response) => {
    const candidates = [
      path.join(__dirname, '.well-known', 'ard.json'),
      path.join(__dirname, 'public', '.well-known', 'ard.json'),
      path.join(__dirname, 'dist', '.well-known', 'ard.json'),
    ];
    for (const filePath of candidates) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        res.set({
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        });
        res.status(200).send(content);
        return;
      } catch {
        // Try next candidate
      }
    }
    res.status(404).json({ error: 'ard.json not found' });
  });

  app.get('/ads.txt', (_req: Request, res: Response) => {
    res.set({
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    });
    res.status(200).send(buildAdsTxtContent());
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.set({
      'Cache-Control': 'no-store, no-cache',
    });
    res.status(200).json({
      ok: true,
      service: 'testline',
      timestamp: Date.now(),
    });
  });

  app.get('/api/speed/ping', (_req: Request, res: Response) => {
    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'Surrogate-Control': 'no-store',
    });
    res.status(200).json({ ok: true, serverTs: Date.now() });
  });

  app.get('/api/speed/download', (req: Request, res: Response) => {
    const requested = Number(req.query.bytes);
    const totalBytes = Number.isFinite(requested)
      ? Math.min(Math.max(Math.floor(requested), 65536), 16 * 1024 * 1024)
      : 8 * 1024 * 1024;

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(totalBytes),
      'Cache-Control': 'no-store, no-cache, no-transform',
    });

    let sent = 0;
    let aborted = false;

    req.on('close', () => {
      aborted = true;
    });

    function pump() {
      if (aborted) return;
      while (sent < totalBytes) {
        const remaining = totalBytes - sent;
        const slice = remaining >= CHUNK_SIZE ? RANDOM_CHUNK : RANDOM_CHUNK.subarray(0, remaining);
        sent += slice.length;
        const canContinue = res.write(slice);
        if (!canContinue) {
          res.once('drain', pump);
          return;
        }
      }
      res.end();
    }

    pump();
  });

  app.post('/api/speed/upload', (req: Request, res: Response) => {
    const startedAt = performance.now();
    let receivedBytes = 0;

    req.on('data', (chunk: Buffer) => {
      receivedBytes += chunk.length;
    });

    req.on('end', () => {
      const durationMs = Math.max(performance.now() - startedAt, 0.1);
      res.set({
        'Cache-Control': 'no-store, no-cache',
      });
      res.status(200).json({
        receivedBytes,
        durationMs: Number(durationMs.toFixed(2)),
      });
    });

    req.on('error', () => {
      if (!res.headersSent) {
        res.status(400).json({ error: 'Upload stream interrupted' });
      }
    });
  });

  app.get('/api/network-info', async (req: Request, res: Response) => {
    res.set({
      'Cache-Control': 'no-store, no-cache',
    });

    const extracted = extractClientIpInfo(req);
    let observedIp = extracted.ip;
    let ipSource: 'forwarded-header' | 'outbound-fallback' = 'forwarded-header';

    if (!observedIp || isPrivateOrLoopbackIp(observedIp)) {
      try {
        const ipRes = await fetchWithTimeout('https://api64.ipify.org?format=json', 2200);
        if (ipRes.ok) {
          const parsed = (await ipRes.json()) as { ip?: string };
          if (parsed.ip) {
            observedIp = parsed.ip;
            ipSource = 'outbound-fallback';
          }
        }
      } catch {
        // Keep detected IP
      }
    }

    const ipVersion = net.isIPv6(observedIp) ? 6 : net.isIPv4(observedIp) ? 4 : null;

    const [ptrHostname, geo] = await Promise.all([
      lookupPtrHostname(observedIp),
      enrichIpMetadata(observedIp),
    ]);

    const viaHeader =
      typeof req.headers['via'] === 'string'
        ? req.headers['via']
        : typeof req.headers['forwarded'] === 'string'
        ? req.headers['forwarded']
        : null;

    const matchedProviderSignal = findProviderKeywordMatch([
      geo.isp,
      geo.org,
      geo.asn,
      ptrHostname,
    ]);

    const isProxyOrVpn = Boolean(geo.proxyFlag || viaHeader || matchedProviderSignal);

    res.json({
      observedIp: observedIp || null,
      ipVersion,
      ipSource,
      ptrHostname,
      isp: geo.isp,
      org: geo.org,
      asn: geo.asn,
      city: geo.city,
      region: geo.region,
      country: geo.country,
      countryCode: geo.countryCode,
      timezone: geo.timezone,
      protocol: req.headers['x-forwarded-proto'] || req.protocol || 'http',
      httpVersion: req.httpVersion,
      serverService: process.env.K_SERVICE ? 'Cloud Run Edge' : 'Local Benchmark Node',
      proxyDetection: {
        isProxyOrVpn,
        isHosting: geo.hostingFlag,
        proxyFlag: geo.proxyFlag,
        hostingFlag: geo.hostingFlag,
        viaHeader,
        forwardedHopCount: extracted.hopCount,
        matchedProviderSignal,
      },
    });
  });

  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    const templateHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf-8');
    app.use(
      express.static(distDir, {
        index: false,
        setHeaders(res, filePath) {
          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            if (/[-\.][a-f0-9]{8,}\./i.test(path.basename(filePath))) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else {
              res.setHeader('Cache-Control', 'public, max-age=86400');
            }
          } else {
            res.setHeader('Cache-Control', 'public, max-age=3600');
          }
        },
      })
    );
    app.get('*', (req: Request, res: Response) => {
      if (
        req.path.startsWith('/api/') ||
        req.path.startsWith('/.well-known/') ||
        /\.(?:json|webmanifest|xml|txt|map|js|mjs|css|png|jpe?g|svg|ico|webp|woff2?)$/i.test(
          req.path
        )
      ) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      const origin = resolveBaseOrigin(req);
      const html = injectSeoIntoHtml(templateHtml, origin, req.path);
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('Cache-Control', 'public, max-age=300');
      res.set('X-Robots-Tag', 'index, follow');
      res.status(200).send(html);
    });
  }

  httpServer.listen(PORT, HOST, () => {
    console.log(`TestLine server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
