import { ShieldCheck } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  initConsentState,
  setConsentPreference,
  type ConsentChoice,
} from '../utils/consentManager';

interface ConsentBannerProps {
  onOpenPreferences: () => void;
}

export const ConsentBanner = memo(function ConsentBanner({
  onOpenPreferences,
}: ConsentBannerProps) {
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

  if (choice !== null) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Cookie and privacy consent"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-md shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-5">
        <div className="flex items-start sm:items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-snug">
          <ShieldCheck
            className="w-4 h-4 text-slate-900 dark:text-slate-100 shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <p>
            TestLine uses essential local storage for theme, units, and history. Optional analytics
            &amp; ad cookies stay off until you accept.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenPreferences}
            className="min-h-[38px] px-3.5 py-2 text-xs font-medium rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-700 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Cookie Settings
          </button>
          <button
            type="button"
            onClick={() => setConsentPreference('essential')}
            className="min-h-[38px] px-3.5 py-2 text-xs font-medium rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-700 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => setConsentPreference('all')}
            className="min-h-[38px] px-4 py-2 text-xs font-semibold rounded-lg bg-black text-white border border-black hover:bg-zinc-900 dark:border-slate-600 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
});
