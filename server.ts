import crypto from 'node:crypto';
import dns from 'node:dns/promises';
import fs from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import {
  isAsianCountryOrContinent,
  resolveLangFromGeo,
} from './src/i18n/localeDetection';

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

const SERVER_ROUTE_SEO: Record<
  string,
  { title: string; description: string; keywords: string; breadcrumbLabel: string }
> = {
  '/': {
    title: 'TestLine — Internet Speed Test & Public IP Lookup',
    description:
      'Test your internet download & upload speed, ping, and jitter, and check what is my IP address (IPv4/IPv6), ISP location, DNS latency, and VPN status.',
    keywords:
      'internet speed test, what is my ip, what is my ip address, public ip address, download speed, upload speed, ping test, latency, jitter, bufferbloat, ipv4, ipv6, ip location, isp lookup, asn lookup, reverse dns, vpn detection, proxy check',
    breadcrumbLabel: 'Speed Test',
  },
  '/news': {
    title: 'Cybersecurity, Network & Internet News | TestLine',
    description:
      'Read live RSS cybersecurity, broadband, DNS, BGP, and tech news from Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch, and Ars Technica.',
    keywords:
      'cybersecurity news, network security rss, bleeping computer, the hacker news, cloudflare blog, techcrunch, krebs on security, ars technica, internet outages',
    breadcrumbLabel: 'News',
  },
  '/blog': {
    title: 'Internet Speed, IP Lookup & VPN Guides | TestLine',
    description:
      'Explore 10 expert guides on internet speed, Mbps vs MB/s, IPv4 & IPv6 addresses, IP scams, geolocation accuracy, bufferbloat, and VPN IP detection.',
    keywords:
      'internet speed guide, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, cgnat, ip scams, ip address spoofing, ip geolocation accuracy, vpn ip detection, datacenter ip',
    breadcrumbLabel: 'Blog',
  },
  '/about': {
    title: 'About TestLine — Speed Test & IP Diagnostics Tool',
    description:
      'Learn how TestLine by ECORZO LLC tests download/upload bandwidth, ping, jitter, dual-stack IPv4/IPv6 routing, DoH DNS latency, and VPN or proxy flags.',
    keywords:
      'about testline, ecorzo llc, speed test methodology, ip lookup architecture, doh latency, ptr reverse dns, vpn detection tool',
    breadcrumbLabel: 'About',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Ephemeral IP & Speed Test | TestLine',
    description:
      "Read TestLine's Privacy Policy by ECORZO LLC covering ephemeral IP lookups, zero speed-log storage, GDPR compliance, and browser cookie disclosures.",
    keywords:
      'testline privacy policy, ecorzo llc privacy, ephemeral ip lookup, zero ip logging, gdpr speed test',
    breadcrumbLabel: 'Privacy Policy',
  },
  '/contact': {
    title: 'Contact TestLine & ECORZO LLC — Network Support',
    description:
      'Contact ECORZO LLC for TestLine internet speed test, IP lookup, privacy, or GDPR questions. Call +1 646 427 6802 or write our New York office.',
    keywords:
      'contact testline, ecorzo llc new york, network diagnostics support, privacy inquiry',
    breadcrumbLabel: 'Contact',
  },
  '/disclaimer': {
    title: 'Disclaimer — Speed & IP Lookup Scope | TestLine',
    description:
      'Understand internet speed test variables, Wi-Fi bottlenecks, IP geolocation accuracy limits, and VPN/proxy detection scope on TestLine by ECORZO LLC.',
    keywords:
      'speed test disclaimer, ip geolocation accuracy, vpn detection disclaimer, testline ecorzo llc',
    breadcrumbLabel: 'Disclaimer',
  },
  '/terms': {
    title: 'Terms & Conditions — TestLine by ECORZO LLC',
    description:
      'Review the Terms and Conditions governing acceptable use of the TestLine internet speed test and public IP lookup tools operated by ECORZO LLC.',
    keywords:
      'testline terms and conditions, ecorzo llc terms, acceptable use speed test, ip lookup terms',
    breadcrumbLabel: 'Terms & Conditions',
  },
  '/cookies-policy': {
    title: 'Cookies Policy & Local Storage — TestLine',
    description:
      'Inspect the exact browser local storage keys and cookie disclosures used by TestLine by ECORZO LLC under GDPR and Google EU User Consent Policy.',
    keywords:
      'testline cookies policy, local storage speed test, google consent mode v2, ecorzo llc',
    breadcrumbLabel: 'Cookies Policy',
  },
  '/cookies-notice': {
    title: 'Cookies Notice & Consent Settings — TestLine',
    description:
      'Manage your cookie, analytics, and browser local storage consent preferences for TestLine by ECORZO LLC at any time.',
    keywords:
      'cookies notice, manage cookie preferences, google consent mode, testline privacy settings',
    breadcrumbLabel: 'Cookies Notice',
  },
  '/gdpr': {
    title: 'GDPR & Data Collection Policy — TestLine',
    description:
      'Explore ECORZO LLC GDPR Article 6 lawful bases, data minimization standards, international transfers, and user data rights for TestLine.',
    keywords:
      'testline gdpr policy, ecorzo llc data protection, article 6 lawful basis, ephemeral ip processing',
    breadcrumbLabel: 'GDPR & Data Collection Policy',
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
    .replace(/\s*<meta\s+name="keywords"[\s\S]*?>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+property="og:(?:url|title|description|image)"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+name="twitter:(?:title|description|image)"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+name="google-adsense-account"[\s\S]*?>/gi, '')
    .replace(/\s*<script[^>]*id="testline-breadcrumb-ld"[^>]*>[\s\S]*?<\/script>/gi, '');

  const rawAdSenseClient =
    process.env.VITE_ADSENSE_CLIENT_ID?.trim() || process.env.ADSENSE_PUBLISHER_ID?.trim() || '';
  const normalizedClientId = rawAdSenseClient
    ? rawAdSenseClient.startsWith('ca-')
      ? rawAdSenseClient
      : `ca-${rawAdSenseClient}`
    : '';

  const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'TestLine',
      item: `${origin}/`,
    },
  ];
  if (normalizedPath !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.breadcrumbLabel,
      item: canonicalUrl,
    });
  }

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }).replace(/</g, '\\u003c');

  const dynamicTags = [
    `<meta name="keywords" content="${escapeHtmlAttr(meta.keywords)}" />`,
    `<link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    `<script id="testline-breadcrumb-ld" type="application/ld+json">${breadcrumbJson}</script>`,
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
    { path: '/news', changefreq: 'hourly', priority: '0.9' },
    { path: '/blog', changefreq: 'weekly', priority: '0.9' },
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

User-agent: Bingbot
Allow: /
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /
Disallow: /api/

User-agent: GPTBot
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

User-agent: anthropic-ai
Allow: /
Disallow: /api/

User-agent: Google-Extended
Allow: /
Disallow: /api/

User-agent: Applebot-Extended
Allow: /
Disallow: /api/

User-agent: CCBot
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

> Free real-time internet speed test (download speed, upload speed, ping, jitter, latency) and public IPv4/IPv6 lookup ("what is my IP", IP geolocation, ISP, ASN, reverse DNS PTR, DoH latency, and VPN/proxy detection) operated by ECORZO LLC at ${origin}.

## Canonical Facts & Authority
- Product Name: TestLine
- Canonical Domain: ${origin}
- Operator: ECORZO LLC
- Office Address: 224 W 35th St STE 500, New York, NY 10001, USA
- Telephone: +1 646 427 6802
- Pricing: Free ($0 USD, no sign-up required)

## Core Capabilities (Speed Test + What Is My IP)
- User-Initiated Start: Clicking Start Speed Test initiates live throughput measurements alongside dual-stack IP and proxy diagnostics; no bandwidth or IP probes run before user action.
- Download & Upload Speed Test: 3 parallel 25 MB download streams (10s window) and 2 parallel 10 MB cryptographically random upload streams to Cloudflare speed endpoints (\`speed.cloudflare.com\`), measuring real ISP bandwidth in Auto, Mbps, and MB/s.
- Ping, Jitter & Latency Health: 5 sequential 0-byte RTT probes timed via \`performance.now()\` measuring average ping, minimum ping, and consecutive packet jitter variance (bufferbloat indicator).
- Dual-Stack Public IP Lookup: Probes public IPv4 and IPv6 addresses side by side with one-click copy buttons.
- IP Geolocation, ISP & ASN Lookup: Resolves city, region, country, timezone, Internet Service Provider (ISP), and Autonomous System Number (ASN) via \`ipwho.is\`, \`ip-api\`, and \`geojs\` fallbacks.
- DNS & Reverse DNS Diagnostics: Reverse DNS (PTR) hostname resolution and encrypted Cloudflare DNS-over-HTTPS (\`1.1.1.1\`) query latency probe.
- VPN, Proxy & Datacenter Detection: Inspects forwarding headers (\`Via\`, \`Forwarded\`, \`X-Forwarded-For\`), ASN hosting/proxy flags, relay PTR hostnames, and browser-vs-IP timezone mismatches.
- Offline PWA Mode: Installable Progressive Web App featuring the Signal Runner jump-and-run game when internet connectivity drops.
- PDF Diagnostic Reports: Client-side A4 PDF export featuring the TestLine logo watermark; duplicate downloads during a run are marked \`Second Copy\`.

## Key Routes & Agentic Endpoints
- [Internet Speed Test & Public IP Lookup](${origin}/): On-demand speed test, Auto/Mbps/MB/s readout, IPv4/IPv6, DNS latency, VPN check, and PDF export.
- [Live Cybersecurity & Network News](${origin}/news): Aggregated RSS feed from Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch, Krebs on Security, and Ars Technica.
- [Speed, IP, Scam & VPN Blog (10 Guides)](${origin}/blog): In-depth guides on download speed, ping/jitter, IPv4/IPv6, CGNAT, IP scams, geolocation accuracy, and VPN detection.
- [About TestLine](${origin}/about): Measurement methodology and ECORZO LLC operator details.
- [Contact ECORZO LLC](${origin}/contact): Support phone (+1 646 427 6802) and New York office address.
- [Privacy Policy](${origin}/privacy-policy) & [GDPR Policy](${origin}/gdpr): Ephemeral IP processing, zero permanent IP logging, and user rights.
- [Terms](${origin}/terms), [Disclaimer](${origin}/disclaimer), [Cookies Policy](${origin}/cookies-policy), & [Cookies Notice](${origin}/cookies-notice).

## Machine-Readable & Agentic Discovery
- [Agentic Resource Discovery (ARD)](${origin}/.well-known/ard.json)
- [Capabilities JSON](${origin}/api/capabilities)
- [Ephemeral IP Lookup API](${origin}/api/network-info)
- [Live Security & Tech News RSS API](${origin}/api/news)
- [Full Specification (GEO)](${origin}/llms-full.txt)
- [XML Sitemap](${origin}/sitemap.xml)
- [Robots Policy](${origin}/robots.txt)
`;
}

function buildLlmsFullTxt(origin: string): string {
  return `# TestLine by ECORZO LLC — Full Technical, AEO & GEO Specification

> Authoritative machine-readable reference for generative engines, AI search systems, and agentic browsers describing TestLine (${origin}/), operated by ECORZO LLC.

## 1. Entity & Provenance
- Application: TestLine (${origin}/)
- Legal Operator: ECORZO LLC
- Registered Address: 224 W 35th St STE 500, New York, NY 10001, United States
- Contact Telephone: +1 646 427 6802
- Category: Network Utilities / Internet Speed Test & Public IP Address Lookup Web Application

## 2. Measurement Benchmarks, IP Lookup & Optimal Thresholds
| Metric / Diagnostic | Method | Optimal Threshold / Output | Use Case |
| --- | --- | --- | --- |
| Download Speed | 3 parallel 25 MB HTTP streams (10s window) | 25+ Mbps (4K) / 100+ Mbps (Multi-user) | Streaming, downloads, cloud sync |
| Upload Speed | 2 parallel 10 MB XHR POST streams | 10+ Mbps (HD calls) / 25+ Mbps (Creator) | Video calls, backups, live streaming |
| Ping & Unloaded Latency | 5 sequential 0-byte Cloudflare RTT probes | < 30 ms (Low) / 30–60 ms (Normal) | Online gaming, VoIP, web apps |
| Jitter & Bufferbloat | Mean consecutive RTT variance across probes | < 10 ms (Stable) / > 25 ms (Congested) | Audio/video stability under load |
| DoH DNS Latency | Encrypted HTTPS JSON query to 1.1.1.1 | < 40 ms | Fast domain name resolution |
| Public IPv4 & IPv6 | Dual-stack client & edge probing | IPv4 + IPv6 + Reverse DNS (PTR) | What is my IP, CGNAT & routing audit |
| IP Location, ISP & ASN | Registry & multi-provider IP lookup | City, Region, Country, ISP, ASN | Network troubleshooting & routing |
| VPN, Proxy & Relay Check | Header, ASN hosting & timezone audit | Direct ISP vs. VPN / Proxy / Datacenter | Privacy verification & fraud defense |

## 3. Content Hubs: News & 10 Diagnostic Guides
- Live News Hub (\`${origin}/news\`, API \`${origin}/api/news\`): Aggregates live RSS/Atom feeds from Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch, Krebs on Security, and Ars Technica.
- Knowledge Base Blog (\`${origin}/blog\`): Contains 10 structured articles across 5 categories:
  1. Internet Speed: Real-World Download Speed (Mbps vs MB/s); Ping vs. Jitter & Bufferbloat.
  2. IP Addresses: IPv4 vs. IPv6 & CGNAT; Dynamic vs. Static & Public vs. Private IPs.
  3. IP Scams: IP Address Scams & Spoofing Myths; DDoS & IP-Based Phishing Protection.
  4. IP Location: IP Geolocation Accuracy Limits; How ISPs, CDNs & Registries Route IP Location.
  5. VPN IP Status: How Websites Detect VPN & Datacenter IPs; Residential vs. Datacenter VPN IPs & Leaks.

## 4. Interactive Behavior, Offline PWA & Privacy
- User-Triggered Probes: Neither bandwidth transfers nor public IP lookups run until the user clicks Start Speed Test.
- Adaptive Unit Mode (\`Auto\`): Automatically displays \`Mbps\` below 100 Mbps and switches to \`MB/s\` at 100 Mbps or higher, with manual \`Mbps\` and \`MB/s\` overrides.
- Offline Signal Runner PWA: Pre-cached via Workbox; if the device loses internet connectivity, TestLine switches seamlessly to an interactive Signal Runner jump-and-run game across mobile, tablet, and desktop.
- PDF Export Controls: Client-side jsPDF reports include the TestLine logo header and centered watermark; duplicate exports during the same test run prompt confirmation and are labeled \`Second Copy\`.
- Zero Permanent IP Logging: Server IP, PTR, and forwarding header inspections run ephemerally in memory; local history (\`testline_history_v1\`, max 15 runs), unit (\`testline_unit_v1\`), theme (\`testline_theme\`), and cookie choice (\`testline_cookie_consent\`) remain strictly on-device.
- Compliance: EU/UK GDPR (Articles 5, 6, 15-22), Google Consent Mode v2, CCPA/CPRA, and Google Publisher Policies.
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
  continentCode: string | null;
  timezone: string | null;
  proxyFlag: boolean;
  hostingFlag: boolean;
}

const IP_METADATA_CACHE = new Map<string, { expiresAt: number; meta: IpMetadata }>();

async function enrichIpMetadata(ip: string): Promise<IpMetadata> {
  const empty: IpMetadata = {
    isp: null,
    org: null,
    asn: null,
    city: null,
    region: null,
    country: null,
    countryCode: null,
    continentCode: null,
    timezone: null,
    proxyFlag: false,
    hostingFlag: false,
  };

  if (!ip || isPrivateOrLoopbackIp(ip)) return empty;

  const cached = IP_METADATA_CACHE.get(ip);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.meta;
  }

  const [ipWhoResult, ipApiResult] = await Promise.allSettled([
    fetchWithTimeout(`https://ipwho.is/${encodeURIComponent(ip)}`, 2800).then((r) =>
      r.ok ? r.json() : null
    ),
    fetchWithTimeout(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,continentCode,country,countryCode,regionName,city,isp,org,as,timezone,proxy,hosting`,
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
          continent_code?: string;
          connection?: { asn?: number; org?: string; isp?: string };
          timezone?: { id?: string };
        } | null)
      : null;

  const ipApi =
    ipApiResult.status === 'fulfilled'
      ? (ipApiResult.value as {
          status?: string;
          continentCode?: string;
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

  const meta: IpMetadata = {
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
    continentCode:
      (whoOk ? ipWho?.continent_code : null) || (apiOk ? ipApi?.continentCode : null) || null,
    timezone: (whoOk ? ipWho?.timezone?.id : null) || (apiOk ? ipApi?.timezone : null) || null,
    proxyFlag: apiOk ? Boolean(ipApi?.proxy) : false,
    hostingFlag: apiOk ? Boolean(ipApi?.hosting) : false,
  };

  if (meta.countryCode) {
    if (IP_METADATA_CACHE.size >= 500) {
      const oldest = IP_METADATA_CACHE.keys().next().value;
      if (oldest) IP_METADATA_CACHE.delete(oldest);
    }
    IP_METADATA_CACHE.set(ip, { expiresAt: Date.now() + 30 * 60 * 1000, meta });
  }

  return meta;
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

interface RssFeedDefinition {
  id: string;
  name: string;
  url: string;
}

interface ParsedNewsItem {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  link: string;
  summary: string;
  author: string | null;
  publishedAt: string | null;
  publishedTs: number;
}

const NEWS_RSS_FEEDS: RssFeedDefinition[] = [
  {
    id: 'bleepingcomputer',
    name: 'Bleeping Computer',
    url: 'https://www.bleepingcomputer.com/feed/',
  },
  {
    id: 'thehackernews',
    name: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Blog',
    url: 'https://blog.cloudflare.com/rss/',
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
  },
  {
    id: 'krebs',
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
  },
  {
    id: 'arstechnica',
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
  },
];

type NewsPayload = {
  updatedAt: string;
  sources: Array<{ id: string; name: string; ok: boolean; count: number }>;
  items: ParsedNewsItem[];
};

const NEWS_CACHE_FILE = path.join(os.tmpdir(), 'testline-rss-cache.json');

let cachedNewsPayload: {
  expiresAt: number;
  payload: NewsPayload;
} | null = null;

let inFlightNewsPromise: Promise<NewsPayload> | null = null;

function decodeXmlEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    })
    .replace(/&#(\d+);/g, (_m, dec) => {
      const code = Number.parseInt(dec, 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : '';
    })
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function cleanPlainText(raw: string, maxLength = 240): string {
  const withoutTags = decodeXmlEntities(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (withoutTags.length <= maxLength) return withoutTags;
  return `${withoutTags.slice(0, maxLength - 1).trimEnd()}…`;
}

function extractXmlTag(block: string, tagNames: string[]): string | null {
  for (const tag of tagNames) {
    const escaped = tag.replace(/[:]/g, '\\:');
    const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

function extractAtomOrRssLink(block: string): string | null {
  const rssLink = extractXmlTag(block, ['link']);
  if (rssLink) {
    const cleaned = decodeXmlEntities(rssLink).trim();
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
  }
  const attrMatch =
    block.match(/<link[^>]*\srel=["']alternate["'][^>]*\shref=["']([^"']+)["'][^>]*\/?>/i) ||
    block.match(/<link[^>]*\shref=["']([^"']+)["'][^>]*\/?>/i);
  if (attrMatch && attrMatch[1] && /^https?:\/\//i.test(attrMatch[1].trim())) {
    return decodeXmlEntities(attrMatch[1].trim());
  }
  return null;
}

function parseFeedXml(xml: string, feed: RssFeedDefinition): ParsedNewsItem[] {
  const itemMatches = xml.match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) ?? [];
  const items: ParsedNewsItem[] = [];

  for (const rawBlock of itemMatches.slice(0, 12)) {
    const rawTitle = extractXmlTag(rawBlock, ['title']);
    const link = extractAtomOrRssLink(rawBlock);
    if (!rawTitle || !link) continue;

    const title = cleanPlainText(rawTitle, 180);
    if (!title) continue;

    const rawDesc =
      extractXmlTag(rawBlock, ['description', 'summary', 'content:encoded', 'content']) || '';
    const summary = cleanPlainText(rawDesc, 220);

    const rawAuthor = extractXmlTag(rawBlock, ['dc:creator', 'author', 'name']);
    const author = rawAuthor ? cleanPlainText(rawAuthor, 60) || null : null;

    const rawDate = extractXmlTag(rawBlock, ['pubDate', 'published', 'updated', 'dc:date']);
    const parsedTs = rawDate ? Date.parse(decodeXmlEntities(rawDate).trim()) : NaN;
    const publishedTs = Number.isFinite(parsedTs) ? parsedTs : 0;
    const publishedAt = Number.isFinite(parsedTs) ? new Date(parsedTs).toISOString() : null;

    items.push({
      id: `${feed.id}:${crypto.createHash('sha1').update(link).digest('hex').slice(0, 12)}`,
      sourceId: feed.id,
      sourceName: feed.name,
      title,
      link,
      summary,
      author,
      publishedAt,
      publishedTs,
    });
  }

  return items;
}

async function fetchFeedViaRss2Json(feed: RssFeedDefinition): Promise<ParsedNewsItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; TestLineRSS/1.0; +https://testline.net)',
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      status?: string;
      items?: Array<{
        title?: string;
        link?: string;
        description?: string;
        content?: string;
        author?: string;
        pubDate?: string;
      }>;
    };
    if (data?.status !== 'ok' || !Array.isArray(data.items)) return [];

    const mapped: ParsedNewsItem[] = [];
    for (const raw of data.items.slice(0, 12)) {
      const title = cleanPlainText(raw.title || '', 180);
      const link = typeof raw.link === 'string' ? raw.link.trim() : '';
      if (!title || !/^https?:\/\//i.test(link)) continue;
      const summary = cleanPlainText(raw.description || raw.content || '', 220);
      const author = raw.author ? cleanPlainText(raw.author, 60) || null : null;
      const parsedTs = raw.pubDate ? Date.parse(raw.pubDate.replace(' ', 'T') + 'Z') : NaN;
      const fallbackTs = raw.pubDate ? Date.parse(raw.pubDate) : NaN;
      const finalTs = Number.isFinite(parsedTs)
        ? parsedTs
        : Number.isFinite(fallbackTs)
        ? fallbackTs
        : 0;

      mapped.push({
        id: `${feed.id}:${crypto.createHash('sha1').update(link).digest('hex').slice(0, 12)}`,
        sourceId: feed.id,
        sourceName: feed.name,
        title,
        link,
        summary,
        author,
        publishedAt: finalTs > 0 ? new Date(finalTs).toISOString() : null,
        publishedTs: finalTs,
      });
    }
    return mapped;
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function fetchSingleFeed(feed: RssFeedDefinition): Promise<{ feed: RssFeedDefinition; items: ParsedNewsItem[] }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 TestLineRSS/1.0',
        Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (res.ok) {
      const xml = await res.text();
      const items = parseFeedXml(xml, feed);
      if (items.length > 0) {
        return { feed, items };
      }
    }
  } catch {
    // Direct RSS request failed or timed out; try fallback below
  } finally {
    clearTimeout(timer);
  }

  const fallbackItems = await fetchFeedViaRss2Json(feed);
  if (fallbackItems.length > 0) {
    return { feed, items: fallbackItems };
  }

  throw new Error(`Unable to fetch RSS items for ${feed.name}`);
}

async function readNewsCacheFromDisk(): Promise<NewsPayload | null> {
  try {
    const raw = await fs.readFile(NEWS_CACHE_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as NewsPayload;
    if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
      return parsed;
    }
  } catch {
    // Cache file may not exist yet
  }
  return null;
}

async function writeNewsCacheToDisk(payload: NewsPayload): Promise<void> {
  try {
    await fs.writeFile(NEWS_CACHE_FILE, JSON.stringify(payload), 'utf-8');
  } catch {
    // Ignore read-only tmpfs issues cleanly
  }
}

async function fetchAggregatedNews(forceRefresh: boolean): Promise<NewsPayload> {
  if (!forceRefresh && cachedNewsPayload && Date.now() < cachedNewsPayload.expiresAt) {
    return cachedNewsPayload.payload;
  }

  if (inFlightNewsPromise) {
    return inFlightNewsPromise;
  }

  inFlightNewsPromise = (async () => {
    const results = await Promise.allSettled(NEWS_RSS_FEEDS.map((feed) => fetchSingleFeed(feed)));

    const sources: Array<{ id: string; name: string; ok: boolean; count: number }> = [];
    const allItems: ParsedNewsItem[] = [];

    results.forEach((result, index) => {
      const feed = NEWS_RSS_FEEDS[index];
      if (result.status === 'fulfilled') {
        sources.push({
          id: feed.id,
          name: feed.name,
          ok: true,
          count: result.value.items.length,
        });
        allItems.push(...result.value.items);
      } else {
        sources.push({
          id: feed.id,
          name: feed.name,
          ok: false,
          count: 0,
        });
      }
    });

    allItems.sort((a, b) => b.publishedTs - a.publishedTs);

    if (allItems.length > 0) {
      const payload: NewsPayload = {
        updatedAt: new Date().toISOString(),
        sources,
        items: allItems,
      };
      cachedNewsPayload = {
        expiresAt: Date.now() + 10 * 60 * 1000,
        payload,
      };
      void writeNewsCacheToDisk(payload);
      return payload;
    }

    if (cachedNewsPayload?.payload.items.length) {
      return cachedNewsPayload.payload;
    }

    const diskPayload = await readNewsCacheFromDisk();
    if (diskPayload) {
      cachedNewsPayload = {
        expiresAt: Date.now() + 2 * 60 * 1000,
        payload: diskPayload,
      };
      return diskPayload;
    }

    return {
      updatedAt: new Date().toISOString(),
      sources,
      items: [],
    };
  })();

  try {
    return await inFlightNewsPromise;
  } finally {
    inFlightNewsPromise = null;
  }
}

interface DailyBlogSection {
  heading: string;
  paragraphs: string[];
}

interface DailyBlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Hot News';
  publishedDate: string;
  readTime: string;
  author: string;
  summary: string;
  keyTakeaways: string[];
  sections: DailyBlogSection[];
  isDailyHotNews: true;
  dailyDateKey: string;
  sourceName: string;
  sourceUrl: string;
  topicTag: string;
}

const DAILY_BLOGS_CACHE_FILE = path.join(os.tmpdir(), 'testline-daily-hot-news-blogs.json');
const HOT_NEWS_KEYWORDS = [
  'zero-day',
  'vulnerability',
  'ransomware',
  'breach',
  'backdoor',
  'exploit',
  'malware',
  'phishing',
  'vpn',
  'proxy',
  'ip',
  'ipv4',
  'ipv6',
  'dns',
  'bgp',
  'cloudflare',
  'outage',
  'botnet',
  'router',
  'patch',
  'cve',
  'leak',
  'cyber',
  'data',
];

let cachedDailyBlogs: DailyBlogPost[] | null = null;

function getTodayDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatHumanDate(dateKey: string): string {
  const parsed = Date.parse(`${dateKey}T12:00:00Z`);
  if (!Number.isFinite(parsed)) return dateKey;
  return new Date(parsed).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function slugifyTitle(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function inferHotNewsTopic(text: string): string {
  const lower = text.toLowerCase();
  if (/\b(vpn|proxy|tor|tunnel|wireguard|relay)\b/.test(lower)) return 'VPN IP Status';
  if (/\b(phish|scam|fraud|spoof|ransom|breach|backdoor|malware|exploit)\b/.test(lower)) {
    return 'IP Scams';
  }
  if (/\b(ipv4|ipv6|bgp|asn|dns|routing)\b/.test(lower)) return 'IP Addresses';
  if (/\b(bandwidth|fiber|broadband|5g|latency|outage|speed|throughput)\b/.test(lower)) {
    return 'Internet Speed';
  }
  if (/\b(geo|location|tracking|surveillance)\b/.test(lower)) return 'IP Location';
  return 'Network & Security';
}

function scoreHotNewsItem(item: ParsedNewsItem, nowMs: number): number {
  const ageHours = item.publishedTs > 0 ? Math.max(0, (nowMs - item.publishedTs) / 3600000) : 72;
  const recencyScore = Math.max(0, 120 - ageHours * 2.5);
  const haystack = `${item.title} ${item.summary}`.toLowerCase();
  let keywordScore = 0;
  for (const kw of HOT_NEWS_KEYWORDS) {
    if (haystack.includes(kw)) {
      keywordScore += 8;
    }
  }
  return recencyScore + Math.min(keywordScore, 48);
}

function buildBlogFromNewsItem(
  item: ParsedNewsItem,
  dateKey: string,
  slotIndex: number
): DailyBlogPost {
  const cleanSummary =
    item.summary && item.summary.length > 35
      ? item.summary
      : `Daily cybersecurity and network briefing covering ${item.title}, reported by ${item.sourceName}.`;
  const topicTag = inferHotNewsTopic(`${item.title} ${item.summary}`);
  const idHash = crypto
    .createHash('sha1')
    .update(`${dateKey}:${item.link}`)
    .digest('hex')
    .slice(0, 8);

  return {
    id: `daily-hot-${dateKey}-${slotIndex + 1}-${idHash}`,
    slug: `daily-hot-news-${dateKey}-${slugifyTitle(item.title)}`,
    title: item.title,
    category: 'Hot News',
    publishedDate: formatHumanDate(dateKey),
    readTime: '3 min read',
    author: `TestLine Daily Digest · via ${item.sourceName}`,
    summary: cleanSummary,
    keyTakeaways: [
      `Featured in TestLine's daily hot news briefing (${item.sourceName}) under ${topicTag}.`,
      item.summary
        ? `Core report summary: ${item.summary}`
        : `Covers critical operational developments around ${item.title}.`,
      'Always verify your active public IPv4/IPv6 address, DNS resolver latency, and VPN/proxy status before troubleshooting unexpected connection alerts.',
    ],
    sections: [
      {
        heading: `Daily Briefing: ${item.sourceName} Report`,
        paragraphs: [
          cleanSummary,
          `Selected automatically for ${formatHumanDate(dateKey)}'s TestLine Hot News digest based on publication recency and network/cybersecurity impact. Readers looking to inspect the original technical reporting can follow the primary source link at the bottom of this article.`,
        ],
      },
      {
        heading: 'Network Diagnostics & Practical Action',
        paragraphs: [
          `Developments involving ${topicTag.toLowerCase()} often ripple across ISP DNS resolvers, carrier routing tables, enterprise VPN exit gateways, and endpoint connectivity. Running an on-demand speed benchmark and dual-stack IP check confirms whether your connection is experiencing elevated jitter, unexpected routing hops, or proxy relay changes.`,
          'Stay ahead of emerging vulnerabilities and broadband advisories by monitoring live RSS updates in the TestLine News tab and reviewing our evergreen security guides in the Blog section.',
        ],
      },
    ],
    isDailyHotNews: true,
    dailyDateKey: dateKey,
    sourceName: item.sourceName,
    sourceUrl: item.link,
    topicTag,
  };
}

async function loadDailyBlogsFromDisk(): Promise<DailyBlogPost[]> {
  if (cachedDailyBlogs !== null) return cachedDailyBlogs;
  try {
    const raw = await fs.readFile(DAILY_BLOGS_CACHE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedDailyBlogs = parsed as DailyBlogPost[];
      return cachedDailyBlogs;
    }
  } catch {
    // Cache file may not exist yet
  }
  cachedDailyBlogs = [];
  return cachedDailyBlogs;
}

async function saveDailyBlogsToDisk(posts: DailyBlogPost[]): Promise<void> {
  const trimmed = posts.slice(0, 30); // Keep up to 15 days of 2 daily posts
  cachedDailyBlogs = trimmed;
  try {
    await fs.writeFile(DAILY_BLOGS_CACHE_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch {
    // Ignore read-only tmpfs issues cleanly
  }
}

let inFlightDailyBlogsPromise: Promise<{
  dateKey: string;
  updatedAt: string;
  blogs: DailyBlogPost[];
}> | null = null;

async function ensureDailyHotNewsBlogs(forceRefreshToday = false): Promise<{
  dateKey: string;
  updatedAt: string;
  blogs: DailyBlogPost[];
}> {
  const todayKey = getTodayDateKey();
  const existing = await loadDailyBlogsFromDisk();
  const existingToday = existing.filter((p) => p.dailyDateKey === todayKey);

  if (!forceRefreshToday && existingToday.length >= 2) {
    return {
      dateKey: todayKey,
      updatedAt: new Date().toISOString(),
      blogs: existing,
    };
  }

  if (inFlightDailyBlogsPromise) {
    return inFlightDailyBlogsPromise;
  }

  inFlightDailyBlogsPromise = (async () => {
    const newsPayload = await fetchAggregatedNews(forceRefreshToday);
    const previousDays = existing.filter((p) => p.dailyDateKey !== todayKey);
    const usedUrls = new Set(previousDays.map((p) => p.sourceUrl));

    const nowMs = Date.now();
    const ranked = [...newsPayload.items].sort(
      (a, b) => scoreHotNewsItem(b, nowMs) - scoreHotNewsItem(a, nowMs)
    );

    const freshPool = ranked.filter((item) => !usedUrls.has(item.link));
    const candidatePool = freshPool.length >= 2 ? freshPool : ranked;

    const picked: ParsedNewsItem[] = [];
    if (candidatePool.length > 0) {
      picked.push(candidatePool[0]);
      const diverseSecond = candidatePool.find(
        (item, idx) => idx > 0 && item.sourceId !== candidatePool[0].sourceId
      );
      if (diverseSecond) {
        picked.push(diverseSecond);
      } else if (candidatePool.length > 1) {
        picked.push(candidatePool[1]);
      }
    }

    const todayBlogs = picked
      .slice(0, 2)
      .map((item, idx) => buildBlogFromNewsItem(item, todayKey, idx));

    const combined = [...todayBlogs, ...previousDays];
    if (todayBlogs.length > 0) {
      await saveDailyBlogsToDisk(combined);
    }

    return {
      dateKey: todayKey,
      updatedAt: new Date().toISOString(),
      blogs: combined,
    };
  })();

  try {
    return await inFlightDailyBlogsPromise;
  } finally {
    inFlightDailyBlogsPromise = null;
  }
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.disable('etag');

  // Technical SEO, Agentic Discovery & Security baseline headers
  app.use((req: Request, res: Response, next) => {
    const origin = resolveBaseOrigin(req);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Link',
      `<${origin}/.well-known/ard.json>; rel="ard"; type="application/json", <${origin}/llms.txt>; rel="alternate"; type="text/plain"`
    );
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

  app.get('/api/capabilities', (req: Request, res: Response) => {
    const origin = resolveBaseOrigin(req);
    res.set({
      'Cache-Control': 'public, max-age=3600',
    });
    res.status(200).json({
      name: 'TestLine',
      operator: 'ECORZO LLC',
      canonicalUrl: origin,
      keywords: [
        'internet speed test',
        'what is my ip',
        'what is my ip address',
        'download speed',
        'upload speed',
        'ping',
        'jitter',
        'bufferbloat',
        'ipv4',
        'ipv6',
        'ip location',
        'isp lookup',
        'asn lookup',
        'reverse dns ptr',
        'doh dns latency',
        'vpn detection',
        'proxy check',
      ],
      discovery: {
        ard: `${origin}/.well-known/ard.json`,
        llmsTxt: `${origin}/llms.txt`,
        llmsFullTxt: `${origin}/llms-full.txt`,
        sitemapXml: `${origin}/sitemap.xml`,
        robotsTxt: `${origin}/robots.txt`,
      },
      endpoints: {
        geoLocale: { method: 'GET', url: `${origin}/api/geo-locale` },
        networkInfo: { method: 'GET', url: `${origin}/api/network-info` },
        newsFeed: { method: 'GET', url: `${origin}/api/news` },
        dailyBlogs: { method: 'GET', url: `${origin}/api/daily-blogs` },
        speedPing: { method: 'GET', url: `${origin}/api/speed/ping` },
        speedDownload: { method: 'GET', url: `${origin}/api/speed/download` },
        speedUpload: { method: 'POST', url: `${origin}/api/speed/upload` },
      },
      pages: Object.keys(SERVER_ROUTE_SEO).map((routePath) => ({
        path: routePath,
        url: `${origin}${routePath}`,
        title: SERVER_ROUTE_SEO[routePath].title,
        description: SERVER_ROUTE_SEO[routePath].description,
      })),
      privacy: {
        ephemeralIpProcessing: true,
        permanentIpLogging: false,
        requiresAccount: false,
      },
    });
  });

  app.get('/api/news', async (req: Request, res: Response) => {
    const forceRefresh = req.query.refresh === '1';
    try {
      const payload = await fetchAggregatedNews(forceRefresh);
      res.set({
        'Cache-Control': 'public, max-age=300',
      });
      res.status(200).json(payload);
    } catch {
      res.status(502).json({ error: 'Failed to fetch RSS feeds' });
    }
  });

  app.get('/api/daily-blogs', async (req: Request, res: Response) => {
    const forceRefresh = req.query.refresh === '1';
    try {
      const result = await ensureDailyHotNewsBlogs(forceRefresh);
      res.set({
        'Cache-Control': 'public, max-age=300',
      });
      res.status(200).json(result);
    } catch {
      res.status(502).json({ error: 'Failed to generate daily hot-news blogs' });
    }
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

  app.get('/api/geo-locale', async (req: Request, res: Response) => {
    res.set({
      'Cache-Control': 'no-store, no-cache',
    });

    const headerCountry = [
      req.headers['cf-ipcountry'],
      req.headers['x-appengine-country'],
      req.headers['x-vercel-ip-country'],
      req.headers['x-country-code'],
      req.headers['x-geo-country'],
    ]
      .find((h) => typeof h === 'string' && /^[a-z]{2}$/i.test(h.trim()) && h.trim().toUpperCase() !== 'XX' && h.trim().toUpperCase() !== 'T1')
      ?.toString()
      .trim()
      .toUpperCase() ?? null;

    const acceptLangHeader =
      typeof req.headers['accept-language'] === 'string' ? req.headers['accept-language'] : null;

    if (headerCountry) {
      const isAsia = isAsianCountryOrContinent(headerCountry, null);
      const lang = resolveLangFromGeo(headerCountry, null, acceptLangHeader);
      res.status(200).json({
        countryCode: headerCountry,
        continentCode: isAsia ? 'AS' : null,
        isAsia,
        lang,
        source: 'edge-header',
      });
      return;
    }

    const extracted = extractClientIpInfo(req);
    let observedIp = extracted.ip;
    let source = 'client-ip';

    if (!observedIp || isPrivateOrLoopbackIp(observedIp)) {
      source = 'outbound-fallback';
      try {
        const ipRes = await fetchWithTimeout('https://api64.ipify.org?format=json', 2200);
        if (ipRes.ok) {
          const parsed = (await ipRes.json()) as { ip?: string };
          if (parsed.ip && !isPrivateOrLoopbackIp(parsed.ip)) {
            observedIp = parsed.ip;
          }
        }
      } catch {
        // Ignore IP fallback failures
      }
    }

    if (observedIp && !isPrivateOrLoopbackIp(observedIp)) {
      const meta = await enrichIpMetadata(observedIp);
      if (meta.countryCode || meta.continentCode) {
        const isAsia = isAsianCountryOrContinent(meta.countryCode, meta.continentCode);
        const lang = resolveLangFromGeo(meta.countryCode, meta.continentCode, acceptLangHeader);
        res.status(200).json({
          countryCode: meta.countryCode,
          continentCode: meta.continentCode,
          country: meta.country,
          isAsia,
          lang,
          source,
        });
        return;
      }
    }

    res.status(200).json({
      countryCode: null,
      continentCode: null,
      isAsia: false,
      lang: null,
      source: 'unresolved',
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
      continentCode: geo.continentCode,
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
    const hmrDisabled = process.env.DISABLE_HMR === 'true';
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: hmrDisabled ? false : { server: httpServer },
        hmr: hmrDisabled ? false : { server: httpServer },
      },
      appType: 'spa',
    });

    if (hmrDisabled) {
      app.get('/@vite/client', async (req: Request, res: Response, next) => {
        try {
          const transformed = await vite.transformRequest(req.originalUrl || '/@vite/client');
          if (transformed?.code) {
            const safeCode = transformed.code
              .replace(
                /transport\.connect\s*\(\s*createHMRHandler\s*\(\s*handleMessage\s*\)\s*\)\s*;?/,
                '/* HMR disabled (DISABLE_HMR=true): WebSocket connection skipped */'
              )
              .replace(
                /else throw new SendBeforeConnectError\("send was called before connect"\);/,
                'else return;'
              )
              .replace(
                /else throw new SendBeforeConnectError\("invoke was called before connect"\);/,
                'else return;'
              );
            res.set({
              'Content-Type': 'application/javascript; charset=utf-8',
              'Cache-Control': 'no-store',
            });
            res.status(200).send(safeCode);
            return;
          }
        } catch {
          // Fall through to Vite middlewares
        }
        next();
      });
    }

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
      res.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      res.status(200).send(html);
    });
  }

  httpServer.listen(PORT, HOST, () => {
    console.log(`TestLine server listening on http://${HOST}:${PORT}`);
    // Pre-generate today's 2 hot-news blog articles on startup
    void ensureDailyHotNewsBlogs(false).catch(() => {});
    const dailyTimer = setInterval(() => {
      void ensureDailyHotNewsBlogs(false).catch(() => {});
    }, 6 * 60 * 60 * 1000);
    dailyTimer.unref();
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
