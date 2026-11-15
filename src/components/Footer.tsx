import type { AppPage } from './TopBar';

interface FooterProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function Footer({ activePage, onNavigate }: FooterProps) {
  const legalLinks: Array<{ id: AppPage; label: string }> = [
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'cookies-policy', label: 'Cookies Policy' },
    { id: 'cookies-notice', label: 'Cookies Notice' },
    { id: 'gdpr', label: 'GDPR & Data Collection Policy' },
    { id: 'privacy', label: 'Privacy Policy' },
  ];

  const companyLinks: Array<{ id: AppPage; label: string }> = [
    { id: 'home', label: 'Speed Test' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B111C] mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                TestLine
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                by ECORZO LLC
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Real-time internet speed benchmark and dual-stack IP network diagnostics operated by ECORZO LLC.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              224 W 35th St STE 500, New York NY, 10001 · +1 646 427 6802
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-xs">
            <div className="space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Company
              </div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                {companyLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id === 'home' ? 'speed-test' : link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.id);
                      }}
                      className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap ${
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

            <div className="space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Legal &amp; Compliance
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-slate-600 dark:text-slate-400">
                {legalLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.id);
                      }}
                      className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap ${
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
            &copy; {new Date().getFullYear()} ECORZO LLC. All rights reserved.
          </span>
          <span>
            Measurements powered by Cloudflare speed endpoints · Compliant with GDPR &amp; Google policies
          </span>
        </div>
      </div>
    </footer>
  );
}
