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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-popup-title"
        className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shrink-0">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2
            id="consent-popup-title"
            className="font-display text-base font-semibold text-slate-900 dark:text-slate-100"
          >
            {t.consent.title}
          </h2>
        </div>

        <p className="mt-3.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.consent.description}
        </p>

        <div className="mt-5 flex flex-col gap-2.5 w-full">
          <button
            type="button"
            onClick={() => setConsentPreference('all')}
            className="w-full min-h-[44px] px-4 py-2.5 text-xs font-semibold rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-600 dark:hover:bg-zinc-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {t.consent.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => setConsentPreference('essential')}
            className="w-full min-h-[44px] px-4 py-2.5 text-xs font-medium rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-700 dark:hover:bg-zinc-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {t.consent.essentialOnly}
          </button>
          <button
            type="button"
            onClick={onOpenPreferences}
            className="w-full min-h-[44px] px-4 py-2.5 text-xs font-medium rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-700 dark:hover:bg-zinc-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {t.consent.cookieSettings}
          </button>
        </div>
      </div>
    </div>
  );
});
