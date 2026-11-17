import { Globe } from 'lucide-react';
import { memo } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import { LANG_METADATA, SUPPORTED_LANGS, type SupportedLang } from '../i18n/localeDetection';
import { PAGE_PATHS, type AppPage, type KnownAppPage } from './TopBar';

interface FooterProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Footer = memo(function Footer({ activePage, onNavigate }: FooterProps) {
  const { t, manualOverride, setManualLang } = useI18n();

  const legalLinks: Array<{ id: KnownAppPage; label: string }> = [
    { id: 'disclaimer', label: t.footer.disclaimer },
    { id: 'terms', label: t.footer.terms },
    { id: 'cookies-policy', label: t.footer.cookiesPolicy },
    { id: 'cookies-notice', label: t.footer.cookiesNotice },
    { id: 'gdpr', label: t.footer.gdpr },
    { id: 'privacy', label: t.footer.privacy },
  ];

  const companyLinks: Array<{ id: KnownAppPage; label: string }> = [
    { id: 'home', label: t.nav.speedTest },
    { id: 'news', label: t.nav.news },
    { id: 'blog', label: t.nav.blog },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B111C] mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                TestLine
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {t.footer.byEcorzo}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <p dir="ltr" className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              224 W 35th St STE 500, New York NY, 10001 · +1 646 427 6802
            </p>

            <div className="pt-2">
              <label
                htmlFor="footer-language-select"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                <span>{t.footer.languageLabel}</span>
              </label>
              <select
                id="footer-language-select"
                value={manualOverride ?? 'auto'}
                onChange={(e) => setManualLang(e.target.value as SupportedLang | 'auto')}
                className="mt-1 block min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="auto">{t.footer.autoOption}</option>
                {SUPPORTED_LANGS.map((code) => (
                  <option key={code} value={code}>
                    {LANG_METADATA[code].nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-12 text-xs">
            <div className="space-y-1.5">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {t.footer.companyHeading}
              </div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                {companyLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={PAGE_PATHS[link.id]}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.id);
                      }}
                      className={`inline-flex items-center min-h-[34px] py-1.5 px-1.5 -mx-1.5 rounded-md hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap ${
                        activePage === link.id
                          ? 'text-sky-700 dark:text-sky-400 font-medium'
                          : ''
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {t.footer.legalHeading}
              </div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                {legalLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={PAGE_PATHS[link.id]}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.id);
                      }}
                      className={`inline-flex items-center min-h-[34px] py-1.5 px-1.5 -mx-1.5 rounded-md hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap ${
                        activePage === link.id
                          ? 'text-sky-700 dark:text-sky-400 font-medium'
                          : ''
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>
            &copy; {new Date().getFullYear()} {t.footer.copyrightSuffix}
          </span>
          <span>{t.footer.poweredBy}</span>
        </div>
      </div>
    </footer>
  );
});
