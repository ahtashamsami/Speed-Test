import { PAGE_PATHS, type AppPage } from '../components/TopBar';

interface RouteSeoMeta {
  title: string;
  description: string;
  breadcrumbLabel: string;
}

export const ROUTE_SEO_META: Record<AppPage, RouteSeoMeta> = {
  home: {
    title: 'TestLine — Internet Speed Test & IP Diagnostics',
    description:
      'Test live internet download, upload, ping, and jitter with TestLine by ECORZO LLC. Check public IPv4/IPv6, ISP, ASN, DNS latency, and VPN or proxy status.',
    breadcrumbLabel: 'Speed Test',
  },
  about: {
    title: 'About TestLine — Speed & IP Diagnostics | ECORZO LLC',
    description:
      'Learn how TestLine by ECORZO LLC measures real-time bandwidth, latency, jitter, dual-stack IPv4/IPv6 routing, DoH DNS speed, and proxy/VPN signals.',
    breadcrumbLabel: 'About',
  },
  privacy: {
    title: 'Privacy Policy — TestLine by ECORZO LLC',
    description:
      'Read the TestLine Privacy Policy by ECORZO LLC covering ephemeral IP processing, Cloudflare diagnostics, GDPR compliance, and Google policy disclosures.',
    breadcrumbLabel: 'Privacy Policy',
  },
  contact: {
    title: 'Contact ECORZO LLC — TestLine Support & Inquiries',
    description:
      'Contact ECORZO LLC for TestLine network diagnostics, privacy, or compliance inquiries. Phone: +1 646 427 6802. Address: 224 W 35th St STE 500, New York, NY 10001.',
    breadcrumbLabel: 'Contact',
  },
  disclaimer: {
    title: 'Disclaimer — TestLine by ECORZO LLC',
    description:
      'Understand measurement scope, network variables, IP geolocation limits, and proxy detection accuracy on TestLine by ECORZO LLC.',
    breadcrumbLabel: 'Disclaimer',
  },
  terms: {
    title: 'Terms & Conditions — TestLine by ECORZO LLC',
    description:
      'Review the Terms and Conditions governing acceptable use of TestLine speed benchmark and IP diagnostic services operated by ECORZO LLC.',
    breadcrumbLabel: 'Terms & Conditions',
  },
  'cookies-policy': {
    title: 'Cookies Policy — TestLine by ECORZO LLC',
    description:
      'See the exact browser local storage keys and cookie disclosures used by TestLine by ECORZO LLC under GDPR and Google EU User Consent Policy.',
    breadcrumbLabel: 'Cookies Policy',
  },
  'cookies-notice': {
    title: 'Cookies Notice & Preferences — TestLine by ECORZO LLC',
    description:
      'Manage your cookie and browser storage consent preferences for TestLine by ECORZO LLC.',
    breadcrumbLabel: 'Cookies Notice',
  },
  gdpr: {
    title: 'GDPR & Data Collection Policy — TestLine by ECORZO LLC',
    description:
      'Explore ECORZO LLC GDPR Article 6 lawful bases, data minimization standards, international transfers, and user data rights for TestLine.',
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

export function applyRouteSeo(page: AppPage): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const meta = ROUTE_SEO_META[page] ?? ROUTE_SEO_META.home;
  const origin = window.location.origin;
  const canonicalUrl = `${origin}${PAGE_PATHS[page]}`;
  const ogImageUrl = `${origin}/assets/aistudio/test_logo_09a7dcd9.png`;

  document.title = meta.title;
  upsertMetaTag('name', 'description', meta.description);
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
      item: `${origin}/`,
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
