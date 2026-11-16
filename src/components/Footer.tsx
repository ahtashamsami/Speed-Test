import { Download } from 'lucide-react';
import { memo } from 'react';
import { PAGE_PATHS, type AppPage } from './TopBar';

interface FooterProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export const Footer = memo(function Footer({ activePage, onNavigate }: FooterProps) {
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

  const seoFiles = [
    { label: 'sitemap.xml', href: '/sitemap.xml?download=1', filename: 'sitemap.xml' },
    { label: 'robots.txt', href: '/robots.txt?download=1', filename: 'robots.txt' },
    { label: 'llms.txt', href: '/llms.txt?download=1', filename: 'llms.txt' },
    { label: 'llms-full.txt', href: '/llms-full.txt?download=1', filename: 'llms-full.txt' },
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
                by ECORZO LLC
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Real-time internet speed benchmark and dual-stack IP network diagnostics operated by ECORZO LLC.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              224 W 35th St STE 500, New York NY, 10001 · +1 646 427 6802
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Company
              </div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                {companyLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={PAGE_PATHS[link.id]}
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
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                {legalLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={PAGE_PATHS[link.id]}
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
                Search Console &amp; AI Crawlers
              </div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                {seoFiles.map((file) => (
                  <li key={file.filename}>
                    <a
                      href={file.href}
                      download={file.filename}
                      className="inline-flex items-center gap-1.5 font-mono hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
                    >
                      <Download className="w-3 h-3 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                      <span>{file.label}</span>
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
});
