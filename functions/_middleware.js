const STATIC_KNOWN_PATHS = new Set([
  '/',
  '/news',
  '/blog',
  '/about',
  '/privacy-policy',
  '/contact',
  '/disclaimer',
  '/terms',
  '/cookies-policy',
  '/cookies-notice',
  '/gdpr',
  '/404',
  '/404.html',
]);

const KNOWN_BLOG_SLUGS = new Set([
  'why-real-world-download-speed-differs-from-advertised-plan',
  'ping-vs-jitter-what-ruins-video-calls-and-gaming',
  'ipv4-vs-ipv6-why-dual-stack-networks-matter',
  'public-ip-vs-private-ip-and-reverse-dns-ptr',
  'spot-fake-your-ip-has-been-compromised-scams',
  'ip-spoofing-header-fraud-and-residential-proxy-scams',
  'how-ip-geolocation-works-and-why-city-is-wrong',
  'timezone-mismatch-and-isp-routing-explained',
  'how-websites-detect-vpn-proxy-and-datacenter-ips',
  'vpn-dns-leaks-ipv6-leaks-and-split-tunneling-check',
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const rawHost = url.hostname.toLowerCase();

  if (rawHost === 'www.testline.net') {
    const redirectUrl = new URL(context.request.url);
    redirectUrl.hostname = 'testline.net';
    redirectUrl.protocol = 'https:';
    return Response.redirect(redirectUrl.toString(), 301);
  }

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    const redirectUrl = new URL(context.request.url);
    redirectUrl.pathname = url.pathname.replace(/\/+$/, '') || '/';
    return Response.redirect(redirectUrl.toString(), 301);
  }

  const normalizedPath = url.pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (normalizedPath === '/privacy') {
    const redirectUrl = new URL(context.request.url);
    redirectUrl.pathname = '/privacy-policy';
    return Response.redirect(redirectUrl.toString(), 301);
  }

  const isAssetOrSystemPath =
    normalizedPath.startsWith('/assets/') ||
    normalizedPath.startsWith('/.well-known/') ||
    normalizedPath.startsWith('/cdn-cgi/') ||
    /\.[a-z0-9]+$/i.test(normalizedPath);

  if (isAssetOrSystemPath) {
    const response = await context.next();
    // Guard against SPA fallback returning index.html for unknown .json/.xml/.txt files
    if (
      /\.(?:json|webmanifest|xml|txt|png|jpe?g|svg|webp|ico|js|css|woff2?)$/i.test(normalizedPath) &&
      response.headers.get('content-type')?.includes('text/html')
    ) {
      return renderNotFoundResponse(context, url);
    }
    return response;
  }

  const isKnownStaticRoute = STATIC_KNOWN_PATHS.has(normalizedPath);
  let isKnownBlogArticle = false;
  if (normalizedPath.startsWith('/blog/')) {
    const slug = decodeURIComponent(normalizedPath.slice('/blog/'.length));
    isKnownBlogArticle =
      KNOWN_BLOG_SLUGS.has(slug) || (slug.startsWith('daily-hot-news-') && !slug.includes('/'));
  }

  if (!isKnownStaticRoute && !isKnownBlogArticle) {
    return renderNotFoundResponse(context, url);
  }

  return context.next();
}

async function renderNotFoundResponse(context, url) {
  const notFoundUrl = new URL('/404.html', url.origin);
  const assetRes = await context.env.ASSETS.fetch(new Request(notFoundUrl.toString()));
  const headers = new Headers(assetRes.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  headers.set('Cache-Control', 'no-store');
  return new Response(assetRes.body, {
    status: 404,
    headers,
  });
}
