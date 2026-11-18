import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BLOG_POSTS } from '../src/data/blogPosts';
import { PAGE_PATHS, type KnownAppPage } from '../src/data/seoRoutes';
import { renderRouteHtmlSnapshot, type SsrNewsItem } from '../src/utils/ssrRenderer';

const ORIGIN = 'https://testline.net';

const PRERENDER_RSS_SOURCES = [
  { id: 'bleepingcomputer', name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/' },
  { id: 'thehackernews', name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
  { id: 'cloudflare', name: 'Cloudflare Blog', url: 'https://blog.cloudflare.com/rss/' },
  { id: 'krebs', name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/' },
];

function stripHtmlTags(raw: string, maxLen: number): string {
  const plain = raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trim()}…`;
}

async function fetchBuildTimeNewsPreview(): Promise<SsrNewsItem[]> {
  if (process.env.SKIP_PRERENDER_NEWS_FETCH === 'true') return [];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  try {
    const settled = await Promise.allSettled(
      PRERENDER_RSS_SOURCES.map(async (src) => {
        const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(src.url)}`;
        const res = await fetch(endpoint, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return [];
        const data = (await res.json()) as {
          status?: string;
          items?: Array<{
            title?: string;
            link?: string;
            description?: string;
            author?: string;
            pubDate?: string;
          }>;
        };
        if (data.status !== 'ok' || !Array.isArray(data.items)) return [];
        return data.items
          .slice(0, 4)
          .filter((i) => i.title && i.link && /^https?:\/\//i.test(i.link))
          .map((item, idx) => {
            const parsedTs = item.pubDate ? Date.parse(item.pubDate) : NaN;
            const ts = Number.isFinite(parsedTs) ? parsedTs : 0;
            return {
              id: `${src.id}:${idx}`,
              sourceId: src.id,
              sourceName: src.name,
              title: stripHtmlTags(item.title || '', 180),
              link: item.link!.trim(),
              summary: stripHtmlTags(item.description || '', 220),
              author: item.author ? stripHtmlTags(item.author, 60) : null,
              publishedAt: ts > 0 ? new Date(ts).toISOString() : null,
              publishedTs: ts,
            } satisfies SsrNewsItem;
          });
      })
    );

    const items = settled
      .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
      .sort((a, b) => b.publishedTs - a.publishedTs);
    return items.slice(0, 12);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function prerenderDistDirectory(
  distDir: string
): Promise<{ routeCount: number; rssCount: number }> {
  const indexHtmlPath = path.join(distDir, 'index.html');
  const templateHtml = await fs.readFile(indexHtmlPath, 'utf-8');
  const adSenseClientId =
    process.env.VITE_ADSENSE_CLIENT_ID?.trim() || process.env.ADSENSE_PUBLISHER_ID?.trim() || '';

  const latestNewsItems = await fetchBuildTimeNewsPreview();

  const routePaths: string[] = [
    ...(Object.keys(PAGE_PATHS) as KnownAppPage[]).map((k) => PAGE_PATHS[k]),
    ...BLOG_POSTS.map((post) => `/blog/${encodeURIComponent(post.slug)}`),
  ];

  for (const routePath of routePaths) {
    const { html } = renderRouteHtmlSnapshot({
      htmlTemplate: templateHtml,
      origin: ORIGIN,
      reqPath: routePath,
      allBlogPosts: BLOG_POSTS,
      latestNewsItems,
      adSenseClientId,
    });

    if (routePath === '/') {
      await fs.writeFile(indexHtmlPath, html, 'utf-8');
    } else {
      const cleanRel = routePath.replace(/^\/+|\/+$/g, '');
      const targetHtmlPath = path.join(distDir, `${cleanRel}.html`);
      await fs.mkdir(path.dirname(targetHtmlPath), { recursive: true });
      await fs.writeFile(targetHtmlPath, html, 'utf-8');
    }
  }

  const { html: notFoundHtml } = renderRouteHtmlSnapshot({
    htmlTemplate: templateHtml,
    origin: ORIGIN,
    reqPath: '/__not_found__',
    allBlogPosts: BLOG_POSTS,
    latestNewsItems: [],
    adSenseClientId,
  });
  await fs.writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  return {
    routeCount: routePaths.length,
    rssCount: latestNewsItems.length,
  };
}

const isDirectCli =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectCli) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distDir = path.resolve(__dirname, '..', 'dist');
  prerenderDistDirectory(distDir)
    .then(({ routeCount, rssCount }) => {
      console.log(
        `Pre-rendered ${routeCount} routes + 404.html into dist/ (${rssCount} build-time RSS stories included).`
      );
    })
    .catch((err) => {
      console.error('Prerender failed:', err);
      process.exit(1);
    });
}
