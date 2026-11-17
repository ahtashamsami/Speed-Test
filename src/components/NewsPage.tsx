import { AlertCircle, ExternalLink, Newspaper, RefreshCw, Search } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import type { NewsApiResponse } from '../hooks/useFeedNotifications';
import { useI18n } from '../i18n/LanguageContext';

interface NewsPageProps {
  data: NewsApiResponse | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  usingCachedFallback?: boolean;
  cachedSavedAt?: string | null;
  highlightedIds: Set<string>;
  onRefresh: () => void;
}

export const NewsPage = memo(function NewsPage({
  data,
  loading,
  refreshing,
  error,
  usingCachedFallback = false,
  cachedSavedAt = null,
  highlightedIds,
  onRefresh,
}: NewsPageProps) {
  const { t } = useI18n();
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const formatPublishedDate = useCallback(
    (iso: string | null): string => {
      if (!iso) return t.news.recent;
      const ts = Date.parse(iso);
      if (!Number.isFinite(ts)) return t.news.recent;
      const diffMin = Math.floor((Date.now() - ts) / 60000);
      if (diffMin >= 0 && diffMin < 60) {
        return t.news.minutesAgo.replace('{n}', String(Math.max(1, diffMin)));
      }
      const diffHr = Math.floor(diffMin / 60);
      if (diffHr >= 1 && diffHr < 24) {
        return t.news.hoursAgo.replace('{n}', String(diffHr));
      }
      return new Date(ts).toLocaleDateString(t.meta.intlLocale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    },
    [t.meta.intlLocale, t.news.hoursAgo, t.news.minutesAgo, t.news.recent]
  );

  const filteredItems = useMemo(() => {
    const items = data?.items ?? [];
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const sourceMatch = selectedSource === 'all' || item.sourceId === selectedSource;
      if (!sourceMatch) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.sourceName.toLowerCase().includes(q)
      );
    });
  }, [data?.items, selectedSource, searchQuery]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Newspaper className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <span>{t.news.eyebrow}</span>
            {data?.updatedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono">
                  {t.news.updatedPrefix} {formatPublishedDate(data.updatedAt)}
                </span>
              </>
            )}
          </div>
          <h1
            style={{ textWrap: 'balance' }}
            className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {t.news.title}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <div className="relative w-full sm:w-64">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.news.filterPlaceholder}
              aria-label={t.news.filterAria}
              className="w-full min-h-[42px] pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
            <span>{refreshing ? t.news.refreshing : t.news.refreshFeeds}</span>
          </button>
        </div>
      </div>

      {/* Cached Fallback Notice Banner */}
      {usingCachedFallback && data && data.items.length > 0 && (
        <div
          role="status"
          className="rounded-xl border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/70 dark:bg-amber-950/25 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start sm:items-center gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            <AlertCircle
              className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
            />
            <span>
              {t.news.cachedBannerPrefix}
              {cachedSavedAt ? ` (${formatPublishedDate(cachedSavedAt)})` : ''}.
            </span>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-1.5 min-h-[34px] px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 hover:opacity-90 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{refreshing ? t.news.retrying : t.news.retryLive}</span>
          </button>
        </div>
      )}

      {/* Source Tabs */}
      {data?.sources && data.sources.length > 0 && (
        <div
          role="tablist"
          aria-label={t.news.allSources}
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedSource === 'all'}
            onClick={() => setSelectedSource('all')}
            className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedSource === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
            }`}
          >
            {t.news.allSources} ({data.items.length})
          </button>

          {data.sources.map((src) => {
            const active = selectedSource === src.id;
            return (
              <button
                key={src.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedSource(src.id)}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {src.name} ({src.count})
              </button>
            );
          })}
        </div>
      )}

      {loading && !data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-busy="true">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 space-y-3"
            >
              <div className="h-3.5 w-40 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-5 w-full rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-800/70 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800/70 animate-pulse" />
            </div>
          ))}
        </div>
      ) : error && !data ? (
        <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/25 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-sm text-slate-800 dark:text-slate-200">{t.news.errorFallback}</p>
          </div>
          <button
            type="button"
            onClick={onRefresh}
            className="min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.news.tryAgain}
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-8 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.news.emptyText}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSource('all');
              setSearchQuery('');
            }}
            className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 cursor-pointer"
          >
            {t.news.showAll}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => {
            const isNew = highlightedIds.has(item.id);
            return (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 flex flex-col justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {isNew && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide bg-rose-600 text-white">
                        {t.news.newTag}
                      </span>
                    )}
                    <span className="font-semibold text-sky-700 dark:text-sky-400">
                      {item.sourceName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{formatPublishedDate(item.publishedAt)}</span>
                    {item.author && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="truncate max-w-[180px]">{item.author}</span>
                      </>
                    )}
                  </div>

                  <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {item.title}
                    </a>
                  </h2>

                  {item.summary && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-lg text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.news.readFullStory}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
});
