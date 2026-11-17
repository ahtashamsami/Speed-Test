import { memo } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { AppPage } from './TopBar';

interface FaqAndAeoSectionProps {
  onNavigate: (page: AppPage) => void;
}

export const FaqAndAeoSection = memo(function FaqAndAeoSection({
  onNavigate,
}: FaqAndAeoSectionProps) {
  const { t } = useI18n();

  return (
    <section
      id="diagnostics-guide"
      aria-labelledby="guide-heading"
      className="scroll-mt-20 space-y-6"
    >
      {/* GEO: Structured Technical Benchmark Reference Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2
              id="guide-heading"
              className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              {t.faq.tableTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              {t.faq.tableSubtitle}
            </p>
          </div>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('blog');
            }}
            className="inline-flex items-center min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-medium text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
          >
            {t.faq.readGuidesLink}
          </a>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4">{t.faq.colMetric}</th>
                <th className="py-2.5 px-4">{t.faq.colMethod}</th>
                <th className="py-2.5 px-4">{t.faq.colThreshold}</th>
                <th className="py-2.5 pl-4">{t.faq.colImpact}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {t.faq.benchmarks.map((row) => (
                <tr key={row.metric}>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                    {row.method}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs text-sky-700 dark:text-sky-300">
                    {row.optimal}
                  </td>
                  <td className="py-2.5 pl-4 text-slate-600 dark:text-slate-400">
                    {row.standardUse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AEO: Direct-Answer FAQ Section */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t.faq.faqTitle}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.faq.faqSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <a
              href="/news"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('news');
              }}
              className="inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
            >
              {t.faq.newsLink}
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
            >
              {t.faq.methodologyLink}
            </a>
            <a
              href="/gdpr"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('gdpr');
              }}
              className="inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
            >
              {t.faq.gdprLink}
            </a>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {t.faq.items.map((item) => (
            <div key={item.question} className="space-y-1.5">
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                {item.question}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
