import { PAGE_PATHS, type AppPage } from '../components/TopBar';

interface RouteSeoMeta {
  title: string;
  description: string;
  keywords: string;
  breadcrumbLabel: string;
}

export const ROUTE_SEO_META: Record<AppPage, RouteSeoMeta> = {
  home: {
    title: 'TestLine — Internet Speed Test & Public IP Lookup',
    description:
      'Test your internet download & upload speed, ping, and jitter, and check what is my IP address (IPv4/IPv6), ISP location, DNS latency, and VPN status.',
    keywords:
      'internet speed test, what is my ip, what is my ip address, public ip address, download speed, upload speed, ping test, latency, jitter, bufferbloat, ipv4, ipv6, ip location, isp lookup, asn lookup, reverse dns, vpn detection, proxy check',
    breadcrumbLabel: 'Speed Test',
  },
  news: {
    title: 'Cybersecurity, Network & Internet News | TestLine',
    description:
      'Read live RSS cybersecurity, broadband, DNS, BGP, and tech news from Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch, and Ars Technica.',
    keywords:
      'cybersecurity news, network security rss, bleeping computer, the hacker news, cloudflare blog, techcrunch, krebs on security, ars technica, internet outages',
    breadcrumbLabel: 'News',
  },
  blog: {
    title: 'Internet Speed, IP Lookup & VPN Guides | TestLine',
    description:
      'Explore 10 expert guides on internet speed, Mbps vs MB/s, IPv4 & IPv6 addresses, IP scams, geolocation accuracy, bufferbloat, and VPN IP detection.',
    keywords:
      'internet speed guide, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, cgnat, ip scams, ip address spoofing, ip geolocation accuracy, vpn ip detection, datacenter ip',
    breadcrumbLabel: 'Blog',
  },
  about: {
    title: 'About TestLine — Speed Test & IP Diagnostics Tool',
    description:
      'Learn how TestLine by ECORZO LLC tests download/upload bandwidth, ping, jitter, dual-stack IPv4/IPv6 routing, DoH DNS latency, and VPN or proxy flags.',
    keywords:
      'about testline, ecorzo llc, speed test methodology, ip lookup architecture, doh latency, ptr reverse dns, vpn detection tool',
    breadcrumbLabel: 'About',
  },
  privacy: {
    title: 'Privacy Policy — Ephemeral IP & Speed Test | TestLine',
    description:
      "Read TestLine's Privacy Policy by ECORZO LLC covering ephemeral IP lookups, zero speed-log storage, GDPR compliance, and browser cookie disclosures.",
    keywords:
      'testline privacy policy, ecorzo llc privacy, ephemeral ip lookup, zero ip logging, gdpr speed test',
    breadcrumbLabel: 'Privacy Policy',
  },
  contact: {
    title: 'Contact TestLine & ECORZO LLC — Network Support',
    description:
      'Contact ECORZO LLC for TestLine internet speed test, IP lookup, privacy, or GDPR questions. Call +1 646 427 6802 or write our New York office.',
    keywords:
      'contact testline, ecorzo llc new york, network diagnostics support, privacy inquiry',
    breadcrumbLabel: 'Contact',
  },
  disclaimer: {
    title: 'Disclaimer — Speed & IP Lookup Scope | TestLine',
    description:
      'Understand internet speed test variables, Wi-Fi bottlenecks, IP geolocation accuracy limits, and VPN/proxy detection scope on TestLine by ECORZO LLC.',
    keywords:
      'speed test disclaimer, ip geolocation accuracy, vpn detection disclaimer, testline ecorzo llc',
    breadcrumbLabel: 'Disclaimer',
  },
  terms: {
    title: 'Terms & Conditions — TestLine by ECORZO LLC',
    description:
      'Review the Terms and Conditions governing acceptable use of the TestLine internet speed test and public IP lookup tools operated by ECORZO LLC.',
    keywords:
      'testline terms and conditions, ecorzo llc terms, acceptable use speed test, ip lookup terms',
    breadcrumbLabel: 'Terms & Conditions',
  },
  'cookies-policy': {
    title: 'Cookies Policy & Local Storage — TestLine',
    description:
      'Inspect the exact browser local storage keys and cookie disclosures used by TestLine by ECORZO LLC under GDPR and Google EU User Consent Policy.',
    keywords:
      'testline cookies policy, local storage speed test, google consent mode v2, ecorzo llc',
    breadcrumbLabel: 'Cookies Policy',
  },
  'cookies-notice': {
    title: 'Cookies Notice & Consent Settings — TestLine',
    description:
      'Manage your cookie, analytics, and browser local storage consent preferences for TestLine by ECORZO LLC at any time.',
    keywords:
      'cookies notice, manage cookie preferences, google consent mode, testline privacy settings',
    breadcrumbLabel: 'Cookies Notice',
  },
  gdpr: {
    title: 'GDPR & Data Collection Policy — TestLine',
    description:
      'Explore ECORZO LLC GDPR Article 6 lawful bases, data minimization standards, international transfers, and user data rights for TestLine.',
    keywords:
      'testline gdpr policy, ecorzo llc data protection, article 6 lawful basis, ephemeral ip processing',
    breadcrumbLabel: 'GDPR & Data Collection Policy',
  },
};

function upsertMetaTag(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const CANONICAL_ORIGIN = 'https://testline.net';

export function applyRouteSeo(page: AppPage): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const meta = ROUTE_SEO_META[page] ?? ROUTE_SEO_META.home;
  const canonicalUrl = `${CANONICAL_ORIGIN}${PAGE_PATHS[page]}`;
  const ogImageUrl = `${CANONICAL_ORIGIN}/assets/aistudio/test_logo_header_dark.png`;

  document.title = meta.title;
  upsertMetaTag('name', 'description', meta.description);
  upsertMetaTag('name', 'keywords', meta.keywords);
  upsertMetaTag('property', 'og:title', meta.title);
  upsertMetaTag('property', 'og:description', meta.description);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('property', 'og:image', ogImageUrl);
  upsertMetaTag('name', 'twitter:title', meta.title);
  upsertMetaTag('name', 'twitter:description', meta.description);
  upsertMetaTag('name', 'twitter:image', ogImageUrl);
  upsertLinkTag('canonical', canonicalUrl);

  // Update dynamic BreadcrumbList JSON-LD for active route
  const breadcrumbId = 'testline-breadcrumb-ld';
  let scriptEl = document.getElementById(breadcrumbId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = breadcrumbId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'TestLine',
      item: `${CANONICAL_ORIGIN}/`,
    },
  ];
  if (page !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.breadcrumbLabel,
      item: canonicalUrl,
    });
  }

  scriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  });
}
