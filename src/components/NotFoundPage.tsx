import { ArrowLeft, BookOpen, Newspaper, WifiOff } from 'lucide-react';
import { memo } from 'react';
import { PAGE_PATHS, type AppPage } from '../data/seoRoutes';
import { EXTRA_UI_STRINGS } from '../i18n/extraStrings';
import { useI18n } from '../i18n/LanguageContext';

interface NotFoundPageProps {
  onBackHome: () => void;
  onNavigate: (page: AppPage) => void;
}

export const NotFoundPage = memo(function NotFoundPage({
  onBackHome,
  onNavigate,
}: NotFoundPageProps) {
  const { lang } = useI18n();
  const nf = EXTRA_UI_STRINGS[lang]?.notFound ?? EXTRA_UI_STRINGS.en.notFound;
  const requestedPath =
    typeof window !== 'undefined' && window.location.pathname
      ? window.location.pathname
      : null;

  return (
    <section
      aria-labelledby="not-found-heading"
      className="max-w-2xl mx-auto my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-7 sm:p-10 shadow-sm space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
          <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{nf.code}</span>
        </span>

        {requestedPath && requestedPath !== '/404' && requestedPath !== '/404.html' && (
          <code className="max-w-full truncate rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 px-2.5 py-1 font-mono text-xs text-slate-600 dark:text-slate-400">
            {requestedPath}
          </code>
        )}
      </div>

      <div className="space-y-2.5">
        <h1
          id="not-found-heading"
          className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          {nf.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {nf.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href={PAGE_PATHS.home}
          onClick={(e) => {
            e.preventDefault();
            onBackHome();
          }}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{nf.backToHome}</span>
        </a>

        <a
          href={PAGE_PATHS.blog}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('blog');
          }}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <span>{nf.readBlogGuides}</span>
        </a>

        <a
          href={PAGE_PATHS.news}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('news');
          }}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Newspaper className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <span>{nf.readNews}</span>
        </a>
      </div>
    </section>
  );
});
