import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AppPage } from '../components/TopBar';
import { BLOG_POSTS, type BlogPost } from '../data/blogPosts';

export interface NewsItem {
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
const FEED_POLL_INTERVAL_MS = 3 * 60 * 1000;

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

export function useFeedNotifications(activePage: AppPage, isOnline: boolean) {
  const [newsData, setNewsData] = useState<NewsApiResponse | null>(null);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsRefreshing, setNewsRefreshing] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  const [dailyBlogs, setDailyBlogs] = useState<BlogPost[]>([]);
  const [dailyBlogsDateKey, setDailyBlogsDateKey] = useState<string | null>(null);

  const [seenNewsIds, setSeenNewsIds] = useState<string[] | null>(() =>
    readStoredIds(SEEN_NEWS_STORAGE_KEY)
  );
  const [seenBlogIds, setSeenBlogIds] = useState<string[] | null>(() =>
    readStoredIds(SEEN_BLOG_STORAGE_KEY)
  );

  const [highlightNewsIds, setHighlightNewsIds] = useState<string[]>([]);
  const [highlightBlogIds, setHighlightBlogIds] = useState<string[]>([]);

  const fetchFeedsAndDailyBlogs = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      setNewsRefreshing(true);
    } else if (!newsData) {
      setNewsLoading(true);
    }
    setNewsError(null);

    try {
      const [newsRes, blogsRes] = await Promise.all([
        fetch(forceRefresh ? '/api/news?refresh=1' : '/api/news', { cache: 'no-store' }),
        fetch(forceRefresh ? '/api/daily-blogs?refresh=1' : '/api/daily-blogs', {
          cache: 'no-store',
        }),
      ]);

      if (!newsRes.ok) {
        throw new Error(`Feed API returned status ${newsRes.status}`);
      }
      const parsedNews = (await newsRes.json()) as NewsApiResponse;
      setNewsData(parsedNews);

      if (blogsRes.ok) {
        const parsedDaily = (await blogsRes.json()) as DailyBlogsApiResponse;
        if (Array.isArray(parsedDaily.blogs)) {
          setDailyBlogs(parsedDaily.blogs);
          setDailyBlogsDateKey(parsedDaily.dateKey ?? null);
        }
      }
    } catch {
      setNewsError(
        'Unable to load live RSS feeds right now. Check your connection and try refreshing.'
      );
    } finally {
      setNewsLoading(false);
      setNewsRefreshing(false);
    }
  }, [newsData]);

  useEffect(() => {
    if (!isOnline) return;
    void fetchFeedsAndDailyBlogs(false);

    const timer = window.setInterval(() => {
      void fetchFeedsAndDailyBlogs(false);
    }, FEED_POLL_INTERVAL_MS);

    return () => window.clearInterval(timer);
    // Run on mount and online recovery / periodic refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

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
