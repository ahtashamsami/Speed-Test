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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6">
        <div className="flex items-start sm:items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-snug">
          <ShieldCheck
            className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5 sm:mt-0"
            aria-hidden="true"
          />
          <p>
            TestLine uses essential local storage for theme, units, and history. Optional analytics
            &amp; ad cookies stay off until you accept.{' '}
            <button
              type="button"
              onClick={onOpenPreferences}
              className="font-medium text-sky-700 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Cookie Settings
            </button>
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setConsentPreference('essential')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => setConsentPreference('all')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
});
