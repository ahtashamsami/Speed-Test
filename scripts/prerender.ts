import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BLOG_POSTS, type BlogPost } from '../src/data/blogPosts';
import { PAGE_PATHS, type KnownAppPage } from '../src/data/seoRoutes';
import {
  pickAndMergeDailyBlogs,
  type DailyNewsCandidate,
} from '../src/utils/dailyBlogGenerator';
import { renderRouteHtmlSnapshot, type SsrNewsItem } from '../src/utils/ssrRenderer';

const ORIGIN = 'https://testline.net';

const PRERENDER_RSS_SOURCES = [
  { id: 'bleepingcomputer', name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/' },
  { id: 'thehackernews', name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
  { id: 'cloudflare', name: 'Cloudflare Blog', url: 'https://blog.cloudflare.com/rss/' },
  { id: 'krebs', name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { id: 'arstechnica', name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },
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

async function fetchBuildTimeNewsPreview(): Promise<DailyNewsCandidate[]> {
  if (process.env.SKIP_PRERENDER_NEWS_FETCH === 'true') return [];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
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
            content?: string;
            author?: string;
            pubDate?: string;
          }>;
        };
        if (data.status !== 'ok' || !Array.isArray(data.items)) return [];
        return data.items
          .slice(0, 6)
          .filter((i) => i.title && i.link && /^https?:\/\//i.test(i.link))
          .map((item, idx) => {
            const parsedTs = item.pubDate ? Date.parse(item.pubDate) : NaN;
            const ts = Number.isFinite(parsedTs) ? parsedTs : 0;
            const rawBody = item.description || item.content || '';
            return {
              id: `${src.id}:${idx}`,
              sourceId: src.id,
              sourceName: src.name,
              title: stripHtmlTags(item.title || '', 180),
              link: item.link!.trim(),
              summary: stripHtmlTags(rawBody, 220),
              fullSummary: stripHtmlTags(rawBody, 460),
              author: item.author ? stripHtmlTags(item.author, 60) : null,
              publishedAt: ts > 0 ? new Date(ts).toISOString() : null,
              publishedTs: ts,
            } satisfies DailyNewsCandidate;
          });
      })
    );

    const items = settled
      .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
      .sort((a, b) => b.publishedTs - a.publishedTs);
    return items.slice(0, 24);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function prerenderDistDirectory(
  distDir: string
): Promise<{ routeCount: number; rssCount: number; dailyBlogCount: number }> {
  const indexHtmlPath = path.join(distDir, 'index.html');
  const templateHtml = await fs.readFile(indexHtmlPath, 'utf-8');
  const adSenseClientId =
    process.env.VITE_ADSENSE_CLIENT_ID?.trim() || process.env.ADSENSE_PUBLISHER_ID?.trim() || '';

  const latestNewsItems = await fetchBuildTimeNewsPreview();
  const ssrNewsItems: SsrNewsItem[] = latestNewsItems.slice(0, 12);

  const dailyResult = pickAndMergeDailyBlogs(latestNewsItems, []);
  const dailyBlogs: BlogPost[] = dailyResult.blogs;
  const allBlogPosts: BlogPost[] = [...dailyBlogs, ...BLOG_POSTS];

  if (dailyBlogs.length > 0) {
    await fs.writeFile(
      path.join(distDir, 'daily-blogs.json'),
      JSON.stringify(
        {
          dateKey: dailyResult.dateKey,
          updatedAt: new Date().toISOString(),
          blogs: dailyBlogs,
        },
        null,
        2
      ),
      'utf-8'
    );
  }

  const routePaths: string[] = [
    ...(Object.keys(PAGE_PATHS) as KnownAppPage[]).map((k) => PAGE_PATHS[k]),
    ...allBlogPosts.map((post) => `/blog/${encodeURIComponent(post.slug)}`),
  ];

  for (const routePath of routePaths) {
    const { html } = renderRouteHtmlSnapshot({
      htmlTemplate: templateHtml,
      origin: ORIGIN,
      reqPath: routePath,
      allBlogPosts,
      latestNewsItems: ssrNewsItems,
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
    allBlogPosts,
    latestNewsItems: [],
    adSenseClientId,
  });
  await fs.writeFile(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  return {
    routeCount: routePaths.length,
    rssCount: ssrNewsItems.length,
    dailyBlogCount: dailyBlogs.length,
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
    .then(({ routeCount, rssCount, dailyBlogCount }) => {
      console.log(
        `Pre-rendered ${routeCount} routes + 404.html into dist/ (${rssCount} RSS stories, ${dailyBlogCount} daily news blog posts).`
      );
    })
    .catch((err) => {
      console.error('Prerender failed:', err);
      process.exit(1);
    });
}
