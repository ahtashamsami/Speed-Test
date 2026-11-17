import { ShieldCheck } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import {
  CONSENT_CHANGE_EVENT,
  initConsentState,
  setConsentPreference,
  type ConsentChoice,
} from '../utils/consentManager';

interface ConsentBannerProps {
  onOpenPreferences: () => void;
  suppressed?: boolean;
}

export const ConsentBanner = memo(function ConsentBanner({
  onOpenPreferences,
  suppressed = false,
}: ConsentBannerProps) {
  const { t } = useI18n();
  const [choice, setChoice] = useState<ConsentChoice | null>(() => initConsentState());

  useEffect(() => {
    const syncChoice = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      if (detail === 'all' || detail === 'essential') {
        setChoice(detail);
      }
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, syncChoice);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, syncChoice);
  }, []);

  if (choice !== null || suppressed) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 sm:px-6 pb-3 sm:pb-4 pointer-events-none">
      <section
        role="region"
        aria-labelledby="consent-banner-title"
        className="pointer-events-auto max-w-6xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md px-4 py-3.5 sm:px-5 sm:py-4 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-3.5"
      >
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2
              id="consent-banner-title"
              className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              {t.consent.title}
            </h2>
            <p className="mt-0.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.consent.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setConsentPreference('all')}
            className="min-h-[38px] px-3.5 py-2 text-xs font-semibold rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-600 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {t.consent.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => setConsentPreference('essential')}
            className="min-h-[38px] px-3.5 py-2 text-xs font-medium rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-700 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {t.consent.essentialOnly}
          </button>
          <button
            type="button"
            onClick={onOpenPreferences}
            className="min-h-[38px] px-3.5 py-2 text-xs font-medium rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-700 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {t.consent.cookieSettings}
          </button>
        </div>
      </section>
    </div>
  );
});
