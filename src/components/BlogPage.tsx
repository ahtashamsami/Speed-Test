import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, Flame, Search } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogPost,
} from '../data/blogPosts';
import { useI18n } from '../i18n/LanguageContext';
import { formatDateLong } from '../utils/formatters';

interface BlogPageProps {
  posts: BlogPost[];
  highlightedIds: Set<string>;
  onRunSpeedTest: () => void;
}

interface ResolvedBlogPost extends BlogPost {
  displayCategory: string;
  displayDate: string;
}

export const BlogPage = memo(function BlogPage({
  posts,
  highlightedIds,
  onRunSpeedTest,
}: BlogPageProps) {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostId, setActivePostId] = useState<string | null>(null);

  const localizedPosts = useMemo<ResolvedBlogPost[]>(() => {
    return posts.map((post) => {
      const displayCategory = t.blog.categories[post.category] ?? post.category;
      const rawDate = post.dailyDateKey || post.publishedDateIso || post.publishedDate;
      const displayDate = formatDateLong(rawDate, t.meta.intlLocale) || post.publishedDate;

      if (post.isDailyHotNews) {
        const topicDisplay = post.topicTag ?? displayCategory;
        const sourceLabel = post.sourceName ?? 'RSS';
        return {
          ...post,
          displayCategory,
          displayDate,
          readTime: t.blog.dailyReadTime,
          author: `${t.blog.dailyAuthorPrefix} ${sourceLabel}`,
          keyTakeaways: [
            t.blog.dailyTakeawayFeatured
              .replace('{source}', sourceLabel)
              .replace('{topic}', topicDisplay),
            `${t.blog.dailyTakeawaySummaryPrefix} ${post.summary}`,
            t.blog.dailyTakeawayTip,
          ],
          sections: [
            {
              heading: `${t.blog.dailySectionBriefingPrefix} ${post.title}`,
              paragraphs: [
                post.summary,
                t.blog.dailyBriefingPara2.replace('{date}', displayDate),
              ],
            },
            {
              heading: t.blog.dailySectionActionTitle,
              paragraphs: [
                t.blog.dailyActionPara1.replace('{topic}', topicDisplay),
                t.blog.dailyActionPara2,
              ],
            },
          ],
        };
      }

      const loc = t.blog.posts[post.id];
      return {
        ...post,
        title: loc?.title ?? post.title,
        readTime: loc?.readTime ?? post.readTime,
        author: loc?.author ?? post.author,
        summary: loc?.summary ?? post.summary,
        keyTakeaways: loc?.keyTakeaways ?? post.keyTakeaways,
        sections: loc?.sections ?? post.sections,
        displayCategory,
        displayDate,
      };
    });
  }, [posts, t.blog, t.meta.intlLocale]);

  const hotNewsCount = useMemo(
    () => localizedPosts.filter((p) => p.category === 'Hot News').length,
    [localizedPosts]
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return localizedPosts.filter((post) => {
      const catMatch = selectedCategory === 'All' || post.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.displayCategory.toLowerCase().includes(q) ||
        (post.sourceName?.toLowerCase().includes(q) ?? false) ||
        (post.topicTag?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [localizedPosts, selectedCategory, searchQuery]);

  const activePostIndex = useMemo(
    () => (activePostId ? localizedPosts.findIndex((p) => p.id === activePostId) : -1),
    [localizedPosts, activePostId]
  );
  const activePost: ResolvedBlogPost | null =
    activePostIndex >= 0 ? localizedPosts[activePostIndex] : null;

  const openPost = (id: string) => {
    setActivePostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activePost) {
    const prevPost = activePostIndex > 0 ? localizedPosts[activePostIndex - 1] : null;
    const nextPost =
      activePostIndex < localizedPosts.length - 1 ? localizedPosts[activePostIndex + 1] : null;

    return (
      <article className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActivePostId(null)}
            className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {t.blog.backToAllPrefix} {localizedPosts.length} {t.blog.backToAllSuffix}
            </span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            {activePost.sourceUrl && (
              <a
                href={activePost.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-sky-700 dark:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>
                  {t.blog.originalSourcePrefix} ({activePost.sourceName})
                </span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            <button
              type="button"
              onClick={onRunSpeedTest}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors cursor-pointer"
            >
              <span>{t.blog.testConnectionNow}</span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 sm:p-8 space-y-6">
          <header className="space-y-3 border-b border-slate-100 dark:border-slate-800/80 pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {activePost.isDailyHotNews && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                  <Flame className="w-3 h-3" aria-hidden="true" />
                  <span>{t.blog.dailyHotNewsBadge}</span>
                </span>
              )}
              <span className="font-semibold text-sky-700 dark:text-sky-400">
                {activePost.topicTag
                  ? `${activePost.displayCategory} · ${activePost.topicTag}`
                  : activePost.displayCategory}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activePost.displayDate}</span>
              <span aria-hidden="true">·</span>
              <span>{activePost.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{activePost.author}</span>
            </div>

            <h1
              style={{ textWrap: 'balance' }}
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
              {activePost.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {activePost.summary}
            </p>
          </header>

          <section className="space-y-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800">
            <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t.blog.keyTakeaways}
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
              {activePost.keyTakeaways.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="space-y-6 max-w-3xl">
            {activePost.sections.map((section) => (
              <section key={section.heading} className="space-y-2.5">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <footer className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {prevPost ? (
              <button
                type="button"
                onClick={() => openPost(prevPost.id)}
                className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[260px]">{prevPost.title}</span>
              </button>
            ) : (
              <span />
            )}

            {nextPost && (
              <button
                type="button"
                onClick={() => openPost(nextPost.id)}
                className="inline-flex items-center justify-end gap-2 min-h-[42px] px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-right transition-colors cursor-pointer"
              >
                <span className="truncate max-w-[260px]">{nextPost.title}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </button>
            )}
          </footer>
        </div>
      </article>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <span>{t.blog.eyebrow}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">
              {localizedPosts.length} {t.blog.articlesCountSuffix}
            </span>
          </div>
          <h1
            style={{ textWrap: 'balance' }}
            className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {t.blog.title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.blog.searchPlaceholder.replace('{n}', String(localizedPosts.length))}
            aria-label={t.blog.searchAria}
            className="w-full min-h-[42px] pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label={t.blog.eyebrow}
        className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
      >
        {(['All', ...BLOG_CATEGORIES] as const).map((cat) => {
          if (cat === 'Hot News' && hotNewsCount === 0) return null;
          const active = selectedCategory === cat;
          const label =
            cat === 'All'
              ? `${t.blog.allLabel} (${localizedPosts.length})`
              : cat === 'Hot News'
              ? `${t.blog.hotNewsLabel} (${hotNewsCount})`
              : t.blog.categories[cat] ?? cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                active
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-8 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.blog.emptyText}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 cursor-pointer"
          >
            {t.blog.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post, idx) => {
            const isNew = highlightedIds.has(post.id);
            return (
              <article
                key={post.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 flex flex-col justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {isNew && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide bg-rose-600 text-white">
                        {t.blog.newTag}
                      </span>
                    )}
                    {post.isDailyHotNews && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                        <Flame className="w-3 h-3" aria-hidden="true" />
                        <span>{t.blog.dailyHotNewsBadge}</span>
                      </span>
                    )}
                    <span className="font-mono text-slate-400 dark:text-slate-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-sky-700 dark:text-sky-400">
                      {post.topicTag
                        ? `${post.displayCategory} · ${post.topicTag}`
                        : post.displayCategory}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.displayDate}</span>
                  </div>

                  <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    <button
                      type="button"
                      onClick={() => openPost(post.id)}
                      className="text-left hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                    >
                      {post.title}
                    </button>
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {post.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => openPost(post.id)}
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{t.blog.readArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
});
