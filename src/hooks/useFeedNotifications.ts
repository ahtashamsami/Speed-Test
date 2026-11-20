import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AppPage } from '../components/TopBar';
import { BLOG_POSTS, type BlogPost } from '../data/blogPosts';
import { getUtcDateKey, pickAndMergeDailyBlogs } from '../utils/dailyBlogGenerator';

export interface NewsItem {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  link: string;
  summary: string;
  fullSummary?: string;
  author: string | null;
  publishedAt: string | null;
  publishedTs: number;
}

export interface NewsSourceInfo {
  id: string;
  name: string;
  ok: boolean;
  count: number;
}

export interface NewsApiResponse {
  updatedAt: string;
  sources: NewsSourceInfo[];
  items: NewsItem[];
}

interface DailyBlogsApiResponse {
  dateKey: string;
  updatedAt: string;
  blogs: BlogPost[];
}

const SEEN_NEWS_STORAGE_KEY = 'testline_seen_news_ids_v1';
const SEEN_BLOG_STORAGE_KEY = 'testline_seen_blog_ids_v1';
const CACHED_NEWS_STORAGE_KEY = 'testline_cached_news_v1';
const CACHED_DAILY_BLOGS_STORAGE_KEY = 'testline_cached_daily_blogs_v1';
const FEED_POLL_INTERVAL_MS = 3 * 60 * 1000;

const CLIENT_RSS_FALLBACK_FEEDS = [
  { id: 'bleepingcomputer', name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/' },
  { id: 'thehackernews', name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
  { id: 'cloudflare', name: 'Cloudflare Blog', url: 'https://blog.cloudflare.com/rss/' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { id: 'krebs', name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/' },
  { id: 'arstechnica', name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },
] as const;

function readStoredIds(key: string): string[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return null;
  }
}

function writeStoredIds(key: string, ids: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(ids.slice(0, 250)));
  } catch {
    // Ignore storage quota/privacy mode failures
  }
}

interface CachedNewsRecord {
  savedAt: string;
  payload: NewsApiResponse;
}

function readCachedNews(): CachedNewsRecord | null {
  try {
    const raw = localStorage.getItem(CACHED_NEWS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedNewsRecord> & Partial<NewsApiResponse>;

    if (
      parsed &&
      parsed.payload &&
      Array.isArray(parsed.payload.items) &&
      parsed.payload.items.length > 0
    ) {
      return {
        savedAt:
          typeof parsed.savedAt === 'string'
            ? parsed.savedAt
            : parsed.payload.updatedAt || new Date().toISOString(),
        payload: parsed.payload,
      };
    }

    // Backward compatibility with plain NewsApiResponse stored previously
    if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
      const payload = parsed as NewsApiResponse;
      return {
        savedAt: payload.updatedAt || new Date().toISOString(),
        payload,
      };
    }

    return null;
  } catch {
    return null;
  }
}

function writeCachedNews(payload: NewsApiResponse): string {
  const savedAt = new Date().toISOString();
  try {
    const record: CachedNewsRecord = { savedAt, payload };
    localStorage.setItem(CACHED_NEWS_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage quota/privacy mode failures
  }
  return savedAt;
}

function readCachedDailyBlogs(): BlogPost[] {
  try {
    const raw = localStorage.getItem(CACHED_DAILY_BLOGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

function writeCachedDailyBlogs(blogs: BlogPost[]): void {
  try {
    localStorage.setItem(CACHED_DAILY_BLOGS_STORAGE_KEY, JSON.stringify(blogs));
  } catch {
    // Ignore storage quota/privacy mode failures
  }
}

function stripHtmlClient(raw: string, maxLen = 220): string {
  const cleaned = raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= maxLen) return cleaned;
  return `${cleaned.slice(0, maxLen - 1).trimEnd()}…`;
}

function stableClientId(sourceId: string, link: string): string {
  let hash = 2166136261;
  for (let i = 0; i < link.length; i++) {
    hash ^= link.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `${sourceId}:${(hash >>> 0).toString(16)}`;
}

async function fetchNewsFromApi(forceRefresh: boolean): Promise<NewsApiResponse | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 11000);
  try {
    const res = await fetch(forceRefresh ? '/api/news?refresh=1' : '/api/news', {
      cache: 'no-store',
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('json')) return null;
    const parsed = (await res.json()) as NewsApiResponse;
    if (!parsed || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

async function fetchNewsViaClientFallback(): Promise<NewsApiResponse | null> {
  const results = await Promise.allSettled(
    CLIENT_RSS_FALLBACK_FEEDS.map(async (feed) => {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 7000);
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
        if (data?.status !== 'ok' || !Array.isArray(data.items)) {
          throw new Error('Invalid feed payload');
        }
        const items: NewsItem[] = [];
        for (const raw of data.items.slice(0, 12)) {
          const title = stripHtmlClient(raw.title || '', 180);
          const link = typeof raw.link === 'string' ? raw.link.trim() : '';
          if (!title || !/^https?:\/\//i.test(link)) continue;
          const rawBody = raw.description || raw.content || '';
          const summary = stripHtmlClient(rawBody, 220);
          const fullSummary = stripHtmlClient(rawBody, 460);
          const author = raw.author ? stripHtmlClient(raw.author, 60) || null : null;
          const utcTs = raw.pubDate ? Date.parse(raw.pubDate.replace(' ', 'T') + 'Z') : NaN;
          const rawTs = raw.pubDate ? Date.parse(raw.pubDate) : NaN;
          const publishedTs = Number.isFinite(utcTs)
            ? utcTs
            : Number.isFinite(rawTs)
            ? rawTs
            : 0;
          items.push({
            id: stableClientId(feed.id, link),
            sourceId: feed.id,
            sourceName: feed.name,
            title,
            link,
            summary,
            fullSummary,
            author,
            publishedAt: publishedTs > 0 ? new Date(publishedTs).toISOString() : null,
            publishedTs,
          });
        }
        return { feed, items };
      } finally {
        window.clearTimeout(timer);
      }
    })
  );

  const sources: NewsSourceInfo[] = [];
  const allItems: NewsItem[] = [];
  results.forEach((result, idx) => {
    const feed = CLIENT_RSS_FALLBACK_FEEDS[idx];
    if (result.status === 'fulfilled' && result.value.items.length > 0) {
      sources.push({ id: feed.id, name: feed.name, ok: true, count: result.value.items.length });
      allItems.push(...result.value.items);
    } else {
      sources.push({ id: feed.id, name: feed.name, ok: false, count: 0 });
    }
  });

  if (allItems.length === 0) return null;
  allItems.sort((a, b) => b.publishedTs - a.publishedTs);
  return {
    updatedAt: new Date().toISOString(),
    sources,
    items: allItems,
  };
}

export function useFeedNotifications(activePage: AppPage, isOnline: boolean) {
  const initialCachedRecord = useMemo(() => readCachedNews(), []);
  const [newsData, setNewsData] = useState<NewsApiResponse | null>(
    () => initialCachedRecord?.payload ?? null
  );
  const [newsLoading, setNewsLoading] = useState<boolean>(() => !initialCachedRecord);
  const [newsRefreshing, setNewsRefreshing] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [isShowingCachedNews, setIsShowingCachedNews] = useState(false);
  const [cachedNewsSavedAt, setCachedNewsSavedAt] = useState<string | null>(
    () => initialCachedRecord?.savedAt ?? null
  );

  const [dailyBlogs, setDailyBlogs] = useState<BlogPost[]>(() => readCachedDailyBlogs());
  const [dailyBlogsDateKey, setDailyBlogsDateKey] = useState<string | null>(null);

  const [seenNewsIds, setSeenNewsIds] = useState<string[] | null>(() =>
    readStoredIds(SEEN_NEWS_STORAGE_KEY)
  );
  const [seenBlogIds, setSeenBlogIds] = useState<string[] | null>(() =>
    readStoredIds(SEEN_BLOG_STORAGE_KEY)
  );

  const [highlightNewsIds, setHighlightNewsIds] = useState<string[]>([]);
  const [highlightBlogIds, setHighlightBlogIds] = useState<string[]>([]);

  const newsDataRef = useRef<NewsApiResponse | null>(newsData);
  newsDataRef.current = newsData;
  const inFlightRef = useRef(false);

  const applyCachedNewsFallback = useCallback(() => {
    const cachedFromStorage = readCachedNews();
    if (cachedFromStorage && cachedFromStorage.payload.items.length > 0) {
      setNewsData(cachedFromStorage.payload);
      setCachedNewsSavedAt(cachedFromStorage.savedAt);
      setIsShowingCachedNews(true);
      setNewsError(null);
      return true;
    }
    if (newsDataRef.current && newsDataRef.current.items.length > 0) {
      setIsShowingCachedNews(true);
      setNewsError(null);
      return true;
    }
    return false;
  }, []);

  const fetchFeedsAndDailyBlogs = useCallback(async (forceRefresh = false) => {
    if (inFlightRef.current && !forceRefresh) return;
    inFlightRef.current = true;

    if (forceRefresh) {
      setNewsRefreshing(true);
    } else if (!newsDataRef.current) {
      setNewsLoading(true);
    }
    setNewsError(null);

    try {
      const [apiNewsSettled, blogsSettled] = await Promise.allSettled([
        fetchNewsFromApi(forceRefresh),
        fetch(forceRefresh ? '/api/daily-blogs?refresh=1' : '/api/daily-blogs', {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        }),
      ]);

      let serverDailyBlogsLoaded = false;
      let baselineDailyBlogs: BlogPost[] = readCachedDailyBlogs();

      if (blogsSettled.status === 'fulfilled' && blogsSettled.value.ok) {
        const contentType = blogsSettled.value.headers.get('content-type') || '';
        if (contentType.includes('json')) {
          const parsedDaily = (await blogsSettled.value.json()) as DailyBlogsApiResponse;
          if (Array.isArray(parsedDaily.blogs) && parsedDaily.blogs.length > 0) {
            serverDailyBlogsLoaded = true;
            baselineDailyBlogs = parsedDaily.blogs;
            setDailyBlogs(parsedDaily.blogs);
            setDailyBlogsDateKey(parsedDaily.dateKey ?? getUtcDateKey());
            writeCachedDailyBlogs(parsedDaily.blogs);
          }
        }
      }

      // On static hosting (e.g. Cloudflare), try the build-time daily-blogs.json snapshot as seed
      if (!serverDailyBlogsLoaded) {
        try {
          const staticRes = await fetch('/daily-blogs.json', {
            cache: 'no-cache',
            headers: { Accept: 'application/json' },
          });
          if (staticRes.ok && (staticRes.headers.get('content-type') || '').includes('json')) {
            const staticDaily = (await staticRes.json()) as DailyBlogsApiResponse;
            if (Array.isArray(staticDaily.blogs) && staticDaily.blogs.length > 0) {
              const seenIds = new Set(baselineDailyBlogs.map((b) => b.id));
              const mergedSeed = [
                ...baselineDailyBlogs,
                ...staticDaily.blogs.filter((b) => !seenIds.has(b.id)),
              ]
                .sort((a, b) => (b.dailyDateKey || '').localeCompare(a.dailyDateKey || ''))
                .slice(0, 30);
              baselineDailyBlogs = mergedSeed;
              setDailyBlogs(mergedSeed);
              setDailyBlogsDateKey(staticDaily.dateKey ?? getUtcDateKey());
              writeCachedDailyBlogs(mergedSeed);
            }
          }
        } catch {
          // Static snapshot optional; client-side generator below will still pick today's 2 stories
        }
      }

      let resolvedNews =
        apiNewsSettled.status === 'fulfilled' ? apiNewsSettled.value : null;

      if (!resolvedNews) {
        await new Promise((resolve) => window.setTimeout(resolve, 1000));
        resolvedNews = await fetchNewsFromApi(forceRefresh);
      }

      if (!resolvedNews) {
        resolvedNews = await fetchNewsViaClientFallback();
      }

      if (resolvedNews && resolvedNews.items.length > 0) {
        const savedAt = writeCachedNews(resolvedNews);
        setNewsData(resolvedNews);
        setCachedNewsSavedAt(savedAt);
        setIsShowingCachedNews(false);
        setNewsError(null);

        // If /api/daily-blogs wasn't available (static host), automatically pick today's 2 top
        // news stories, convert them into structured summaries, and publish them into the Blog
        if (!serverDailyBlogsLoaded) {
          const generated = pickAndMergeDailyBlogs(resolvedNews.items, baselineDailyBlogs, {
            forceRefreshToday: forceRefresh,
          });
          if (generated.blogs.length > 0) {
            setDailyBlogs(generated.blogs);
            setDailyBlogsDateKey(generated.dateKey);
            writeCachedDailyBlogs(generated.blogs);
          }
        }
      } else if (!applyCachedNewsFallback()) {
        setNewsError(
          'Unable to load live RSS feeds right now. Check your connection and try refreshing.'
        );
      } else if (!serverDailyBlogsLoaded && newsDataRef.current?.items.length) {
        const generated = pickAndMergeDailyBlogs(newsDataRef.current.items, baselineDailyBlogs, {
          forceRefreshToday: false,
        });
        if (generated.blogs.length > 0) {
          setDailyBlogs(generated.blogs);
          setDailyBlogsDateKey(generated.dateKey);
          writeCachedDailyBlogs(generated.blogs);
        }
      }
    } catch {
      if (!applyCachedNewsFallback()) {
        setNewsError(
          'Unable to load live RSS feeds right now. Check your connection and try refreshing.'
        );
      }
    } finally {
      inFlightRef.current = false;
      setNewsLoading(false);
      setNewsRefreshing(false);
    }
  }, [applyCachedNewsFallback]);

  useEffect(() => {
    if (!isOnline) return;
    void fetchFeedsAndDailyBlogs(false);

    const timer = window.setInterval(() => {
      void fetchFeedsAndDailyBlogs(false);
    }, FEED_POLL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isOnline, fetchFeedsAndDailyBlogs]);

  const blogRetryDateRef = useRef<string | null>(null);

  // If the user switches to News or Blog while fresh items/daily posts are missing, retry immediately
  useEffect(() => {
    if (!isOnline) return;
    if (activePage === 'news' && (!newsData || newsData.items.length === 0 || newsError)) {
      void fetchFeedsAndDailyBlogs(false);
      return;
    }
    if (activePage === 'blog') {
      const todayKey = getUtcDateKey();
      const todayCount = dailyBlogs.filter((p) => p.dailyDateKey === todayKey).length;
      if (todayCount < 2 && blogRetryDateRef.current !== todayKey) {
        blogRetryDateRef.current = todayKey;
        void fetchFeedsAndDailyBlogs(false);
      }
    }
  }, [activePage, isOnline, newsData, newsError, dailyBlogs, fetchFeedsAndDailyBlogs]);

  const allBlogPosts = useMemo(() => {
    const merged = [...dailyBlogs, ...BLOG_POSTS];
    const seen = new Set<string>();
    return merged.filter((post) => {
      if (seen.has(post.id)) return false;
      seen.add(post.id);
      return true;
    });
  }, [dailyBlogs]);

  const unseenNewsIds = useMemo(() => {
    const items = newsData?.items ?? [];
    if (items.length === 0) return [];

    if (seenNewsIds !== null) {
      const seenSet = new Set(seenNewsIds);
      return items.filter((item) => !seenSet.has(item.id)).map((item) => item.id);
    }

    // First visit: count latest news published within the last 24h (or top 8 newest)
    const cutoffTs = Date.now() - 24 * 60 * 60 * 1000;
    const recentIds = items
      .filter((item) => item.publishedTs >= cutoffTs)
      .map((item) => item.id);
    return recentIds.length > 0 ? recentIds : items.slice(0, 8).map((item) => item.id);
  }, [newsData?.items, seenNewsIds]);

  const unseenBlogIds = useMemo(() => {
    if (allBlogPosts.length === 0) return [];

    if (seenBlogIds !== null) {
      const seenSet = new Set(seenBlogIds);
      return allBlogPosts.filter((post) => !seenSet.has(post.id)).map((post) => post.id);
    }

    // First visit: treat newly added daily hot-news blogs as unread
    return dailyBlogs.map((post) => post.id);
  }, [allBlogPosts, dailyBlogs, seenBlogIds]);

  // Clear News badge and remember which items were new when user opens News tab
  useEffect(() => {
    if (activePage !== 'news') return;
    const items = newsData?.items ?? [];
    if (items.length === 0) return;

    if (unseenNewsIds.length > 0) {
      setHighlightNewsIds((prev) => Array.from(new Set([...unseenNewsIds, ...prev])));
    }

    const allIds = items.map((item) => item.id);
    const prevSet = new Set(seenNewsIds ?? []);
    const hasMissing = allIds.some((id) => !prevSet.has(id));
    if (seenNewsIds === null || hasMissing) {
      const nextSeen = Array.from(new Set([...allIds, ...(seenNewsIds ?? [])])).slice(0, 250);
      setSeenNewsIds(nextSeen);
      writeStoredIds(SEEN_NEWS_STORAGE_KEY, nextSeen);
    }
  }, [activePage, newsData?.items, seenNewsIds, unseenNewsIds]);

  // Clear Blog badge and remember which posts were new when user opens Blog tab
  useEffect(() => {
    if (activePage !== 'blog') return;
    if (allBlogPosts.length === 0) return;

    if (unseenBlogIds.length > 0) {
      setHighlightBlogIds((prev) => Array.from(new Set([...unseenBlogIds, ...prev])));
    }

    const allIds = allBlogPosts.map((post) => post.id);
    const prevSet = new Set(seenBlogIds ?? []);
    const hasMissing = allIds.some((id) => !prevSet.has(id));
    if (seenBlogIds === null || hasMissing) {
      const nextSeen = Array.from(new Set([...allIds, ...(seenBlogIds ?? [])])).slice(0, 250);
      setSeenBlogIds(nextSeen);
      writeStoredIds(SEEN_BLOG_STORAGE_KEY, nextSeen);
    }
  }, [activePage, allBlogPosts, seenBlogIds, unseenBlogIds]);

  return {
    newsData,
    newsLoading,
    newsRefreshing,
    newsError,
    isShowingCachedNews,
    cachedNewsSavedAt,
    refreshNews: () => fetchFeedsAndDailyBlogs(true),
    allBlogPosts,
    dailyBlogsDateKey,
    newsNotificationCount: activePage === 'news' ? 0 : unseenNewsIds.length,
    blogNotificationCount: activePage === 'blog' ? 0 : unseenBlogIds.length,
    highlightedNewsSet: useMemo(
      () => new Set(activePage === 'news' ? highlightNewsIds : unseenNewsIds),
      [activePage, highlightNewsIds, unseenNewsIds]
    ),
    highlightedBlogSet: useMemo(
      () => new Set(activePage === 'blog' ? highlightBlogIds : unseenBlogIds),
      [activePage, highlightBlogIds, unseenBlogIds]
    ),
  };
}
