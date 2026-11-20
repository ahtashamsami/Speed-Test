import type { BlogCategory } from './blogPosts';

export type KnownAppPage =
  | 'home'
  | 'news'
  | 'blog'
  | 'chrome-extension'
  | 'about'
  | 'privacy'
  | 'contact'
  | 'disclaimer'
  | 'terms'
  | 'cookies-policy'
  | 'cookies-notice'
  | 'gdpr';

export type AppPage = KnownAppPage | 'not-found';

export const PAGE_PATHS: Record<KnownAppPage, string> = {
  home: '/',
  news: '/news',
  blog: '/blog',
  'chrome-extension': '/chrome-extension',
  about: '/about',
  privacy: '/privacy-policy',
  contact: '/contact',
  disclaimer: '/disclaimer',
  terms: '/terms',
  'cookies-policy': '/cookies-policy',
  'cookies-notice': '/cookies-notice',
  gdpr: '/gdpr',
};

export interface ParsedRouteState {
  page: AppPage;
  blogSlug: string | null;
}

export function parseRouteState(pathname: string, hash = ''): ParsedRouteState {
  let normalizedPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (normalizedPath === '/404' || normalizedPath === '/404.html') {
    return { page: 'not-found', blogSlug: null };
  }

  if (normalizedPath === '/index.html') {
    normalizedPath = '/';
  } else if (normalizedPath.endsWith('.html')) {
    normalizedPath = normalizedPath.slice(0, -'.html'.length) || '/';
  }

  if (normalizedPath === '/') {
    const cleanHash = hash.replace(/^#/, '').toLowerCase();
    if (cleanHash === 'speed-test' || cleanHash === '') {
      return { page: 'home', blogSlug: null };
    }
    if (cleanHash === 'news') return { page: 'news', blogSlug: null };
    if (cleanHash === 'blog') return { page: 'blog', blogSlug: null };
    if (cleanHash === 'chrome-extension' || cleanHash === 'extension') {
      return { page: 'chrome-extension', blogSlug: null };
    }
    if (cleanHash === 'about') return { page: 'about', blogSlug: null };
    if (cleanHash === 'privacy' || cleanHash === 'privacy-policy') {
      return { page: 'privacy', blogSlug: null };
    }
    if (cleanHash === 'contact') return { page: 'contact', blogSlug: null };
    if (cleanHash === 'disclaimer') return { page: 'disclaimer', blogSlug: null };
    if (cleanHash === 'terms') return { page: 'terms', blogSlug: null };
    if (cleanHash === 'cookies-policy') return { page: 'cookies-policy', blogSlug: null };
    if (cleanHash === 'cookies-notice') return { page: 'cookies-notice', blogSlug: null };
    if (cleanHash === 'gdpr') return { page: 'gdpr', blogSlug: null };
    return { page: 'home', blogSlug: null };
  }

  if (normalizedPath === '/news') return { page: 'news', blogSlug: null };
  if (normalizedPath === '/blog') return { page: 'blog', blogSlug: null };
  if (normalizedPath === '/chrome-extension') {
    return { page: 'chrome-extension', blogSlug: null };
  }

  if (normalizedPath.startsWith('/blog/')) {
    let rawSlug = pathname.slice('/blog/'.length).replace(/\/+$/, '');
    if (rawSlug.toLowerCase().endsWith('.html')) {
      rawSlug = rawSlug.slice(0, -'.html'.length);
    }
    if (rawSlug && !rawSlug.includes('/')) {
      return { page: 'blog', blogSlug: decodeURIComponent(rawSlug).toLowerCase() };
    }
    return { page: 'not-found', blogSlug: null };
  }

  switch (normalizedPath) {
    case '/about':
      return { page: 'about', blogSlug: null };
    case '/privacy':
    case '/privacy-policy':
      return { page: 'privacy', blogSlug: null };
    case '/contact':
      return { page: 'contact', blogSlug: null };
    case '/disclaimer':
      return { page: 'disclaimer', blogSlug: null };
    case '/terms':
      return { page: 'terms', blogSlug: null };
    case '/cookies-policy':
      return { page: 'cookies-policy', blogSlug: null };
    case '/cookies-notice':
      return { page: 'cookies-notice', blogSlug: null };
    case '/gdpr':
      return { page: 'gdpr', blogSlug: null };
    default:
      return { page: 'not-found', blogSlug: null };
  }
}

export function resolvePageOgImagePath(page: AppPage): string {
  switch (page) {
    case 'news':
      return '/assets/og/testline-news.png';
    case 'blog':
      return '/assets/og/testline-blog.png';
    default:
      return '/assets/og/testline-home.png';
  }
}

export function resolveBlogOgImagePath(category: BlogCategory): string {
  switch (category) {
    case 'Internet Speed':
      return '/assets/og/testline-article-speed.png';
    case 'IP Addresses':
    case 'IP Location':
      return '/assets/og/testline-article-ip.png';
    case 'IP Scams':
    case 'VPN IP Status':
    case 'Hot News':
    default:
      return '/assets/og/testline-article-security.png';
  }
}
