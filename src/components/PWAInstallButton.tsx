import { Download, Share, X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useI18n } from '../i18n/LanguageContext';

export const PWAInstallButton = memo(function PWAInstallButton() {
  const { t } = useI18n();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (!showIOSGuide) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowIOSGuide(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showIOSGuide]);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        aria-label={t.pwa.installAria}
        className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t.pwa.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label={t.pwa.installIosAria}
          className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Share className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.pwa.installApp}</span>
        </button>

        {showIOSGuide && (
          <div
            onClick={() => setShowIOSGuide(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[2px]"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="ios-install-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <h2
                  id="ios-install-title"
                  className="font-display text-base font-semibold text-slate-900 dark:text-slate-100"
                >
                  {t.pwa.iosTitle}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label={t.pwa.closeDialog}
                  className="min-w-[40px] min-h-[40px] -mr-1.5 -mt-1.5 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <ol className="mt-3.5 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                <li>
                  {t.pwa.iosStep1Prefix}{' '}
                  <strong className="text-slate-900 dark:text-slate-100">{t.pwa.iosStep1Strong}</strong>{' '}
                  {t.pwa.iosStep1Suffix}
                </li>
                <li>
                  {t.pwa.iosStep2Prefix}{' '}
                  <strong className="text-slate-900 dark:text-slate-100">{t.pwa.iosStep2Strong}</strong>
                  {t.pwa.iosStep2Suffix}
                </li>
                <li>{t.pwa.iosStep3}</li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors cursor-pointer"
              >
                {t.pwa.gotIt}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
});
