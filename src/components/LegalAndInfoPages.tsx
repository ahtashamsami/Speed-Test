import { ArrowLeft, CheckCircle2, Copy, Check, Mail, MapPin, Phone } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { LegalSectionBlock } from '../i18n/types';
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsentPreference,
  setConsentPreference,
  type ConsentChoice,
} from '../utils/consentManager';
import { formatDateLong } from '../utils/formatters';
import type { AppPage, KnownAppPage } from './TopBar';

interface LegalAndInfoPagesProps {
  page: Exclude<KnownAppPage, 'home' | 'news' | 'blog'>;
  onBackHome: () => void;
  onNavigate: (page: AppPage) => void;
}

function PageShell({
  title,
  subtitle,
  lastUpdated,
  backLabel,
  effectiveDatePrefix,
  operatorLabel,
  onBackHome,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  backLabel: string;
  effectiveDatePrefix: string;
  operatorLabel: string;
  onBackHome: () => void;
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-4xl mx-auto space-y-6">
      <div>
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 min-h-[38px] px-2.5 py-1.5 -ml-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{backLabel}</span>
        </button>

        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          {subtitle}
        </p>
        {lastUpdated && (
          <p className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
            {effectiveDatePrefix} {lastUpdated} · {operatorLabel}
          </p>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 sm:p-8 space-y-6 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </article>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 pt-2">
      {children}
    </h2>
  );
}

function LegalSectionContent({ block }: { block: LegalSectionBlock }) {
  return (
    <>
      <SectionHeading>{block.heading}</SectionHeading>
      {block.paragraphs?.map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
      {block.bullets && block.bullets.length > 0 && (
        <ul className="list-disc list-inside space-y-2">
          {block.bullets.map((bullet, idx) => (
            <li key={idx}>
              {bullet.strong && (
                <>
                  <strong className="text-slate-900 dark:text-slate-100">{bullet.strong}</strong>{' '}
                </>
              )}
              {bullet.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function LegalAndInfoPages({
  page,
  onBackHome,
  onNavigate,
}: LegalAndInfoPagesProps) {
  const { t } = useI18n();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'address' | null>(null);

  const [cookiePref, setCookiePref] = useState<ConsentChoice | null>(getStoredConsentPreference);
  const [cookieSaved, setCookieSaved] = useState(false);

  const formattedLastUpdated = formatDateLong(
    t.legal.lastUpdatedDateIso,
    t.meta.intlLocale
  );

  useEffect(() => {
    const onConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      if (detail === 'all' || detail === 'essential') {
        setCookiePref(detail);
      }
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  const copyContactDetail = async (text: string, field: 'phone' | 'address') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1600);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError(t.legal.contact.errMissing);
      return;
    }
    if (!contactEmail.includes('@')) {
      setContactError(t.legal.contact.errInvalidEmail);
      return;
    }
    setContactError(null);
    setContactSent(true);
  };

  const saveCookiePreference = (choice: ConsentChoice) => {
    setCookiePref(choice);
    setConsentPreference(choice);
    setCookieSaved(true);
    window.setTimeout(() => setCookieSaved(false), 2000);
  };

  if (page === 'about') {
    const { about } = t.legal;
    return (
      <PageShell
        title={about.title}
        subtitle={about.subtitle}
        lastUpdated={formattedLastUpdated}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        {about.sections.map((block, idx) => (
          <LegalSectionContent key={idx} block={block} />
        ))}

        <SectionHeading>{about.closingTitle}</SectionHeading>
        <p>
          {about.closingIntro}{' '}
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            {about.closingGuidesLink}
          </button>{' '}
          {about.closingMid}{' '}
          <button
            type="button"
            onClick={() => onNavigate('news')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            {about.closingNewsLink}
          </button>
          {about.closingOutro}{' '}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            {about.closingContactLink}
          </button>
          .
        </p>
      </PageShell>
    );
  }

  if (page === 'contact') {
    const { contact } = t.legal;
    const confirmationBody = `${contact.sentBodyPrefix.replace('{name}', contactName)}${
      contact.sentBodySuffix ? ` ${contact.sentBodySuffix}` : ''
    }`;

    return (
      <PageShell
        title={contact.title}
        subtitle={contact.subtitle}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>{contact.telephone}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <a
                dir="ltr"
                href="tel:+16464276802"
                className="font-mono text-base font-semibold text-slate-900 dark:text-slate-100 hover:underline"
              >
                +1 646 427 6802
              </a>
              <button
                type="button"
                onClick={() => copyContactDetail('+1 646 427 6802', 'phone')}
                className="inline-flex items-center justify-center gap-1.5 min-h-[38px] min-w-[38px] px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                {copiedField === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                    <span>{contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{contact.copy}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>{contact.addressLabel}</span>
            </div>
            <div className="flex items-start justify-between gap-2.5">
              <address dir="ltr" className="not-italic text-sm font-medium text-slate-900 dark:text-slate-100">
                ECORZO LLC
                <br />
                224 W 35th St STE 500
                <br />
                New York NY, 10001
              </address>
              <button
                type="button"
                onClick={() =>
                  copyContactDetail('224 W 35th St STE 500, New York NY, 10001', 'address')
                }
                className="inline-flex items-center justify-center gap-1.5 min-h-[38px] min-w-[38px] px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                {copiedField === 'address' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                    <span>{contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{contact.copy}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <SectionHeading>{contact.formHeading}</SectionHeading>
        {contactSent ? (
          <div className="p-5 rounded-lg border border-teal-200 dark:border-teal-800/70 bg-teal-50/70 dark:bg-teal-950/30 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-teal-800 dark:text-teal-300">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>{contact.sentTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {confirmationBody}
            </p>
            <button
              type="button"
              onClick={() => {
                setContactSent(false);
                setContactName('');
                setContactEmail('');
                setContactMessage('');
              }}
              className="mt-1.5 inline-flex items-center min-h-[38px] px-2.5 py-1.5 -ml-2.5 rounded-lg text-xs font-medium text-sky-700 dark:text-sky-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:underline cursor-pointer"
            >
              {contact.sendAnother}
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {contact.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={contact.namePlaceholder}
                  className="w-full min-h-[40px] px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {contact.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder={contact.emailPlaceholder}
                  className="w-full min-h-[40px] px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-msg"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                {contact.messageLabel}
              </label>
              <textarea
                id="contact-msg"
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder={contact.messagePlaceholder}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {contactError && (
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {contactError}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-sm font-medium rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{contact.submitBtn}</span>
            </button>
          </form>
        )}
      </PageShell>
    );
  }

  if (page === 'privacy') {
    const { privacy } = t.legal;
    return (
      <PageShell
        title={privacy.title}
        subtitle={privacy.subtitle}
        lastUpdated={formattedLastUpdated}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        {privacy.sections.map((block, idx) => (
          <Fragment key={idx}>
            <LegalSectionContent block={block} />
            {idx === 2 && (
              <p>
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 dark:text-sky-400 hover:underline font-medium"
                >
                  {privacy.googlePolicyLinkText}
                </a>
              </p>
            )}
          </Fragment>
        ))}

        <p>
          {privacy.rightsPrefix}{' '}
          <button
            type="button"
            onClick={() => onNavigate('gdpr')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            {privacy.gdprLinkText}
          </button>{' '}
          {privacy.rightsSuffix}
        </p>
      </PageShell>
    );
  }

  if (page === 'disclaimer') {
    const { disclaimer } = t.legal;
    return (
      <PageShell
        title={disclaimer.title}
        subtitle={disclaimer.subtitle}
        lastUpdated={formattedLastUpdated}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        {disclaimer.sections.map((block, idx) => (
          <LegalSectionContent key={idx} block={block} />
        ))}
      </PageShell>
    );
  }

  if (page === 'terms') {
    const { terms } = t.legal;
    return (
      <PageShell
        title={terms.title}
        subtitle={terms.subtitle}
        lastUpdated={formattedLastUpdated}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        {terms.sections.map((block, idx) => (
          <LegalSectionContent key={idx} block={block} />
        ))}
      </PageShell>
    );
  }

  if (page === 'cookies-policy') {
    const { cookiesPolicy } = t.legal;
    return (
      <PageShell
        title={cookiesPolicy.title}
        subtitle={cookiesPolicy.subtitle}
        lastUpdated={formattedLastUpdated}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        <SectionHeading>{cookiesPolicy.sec1Title}</SectionHeading>
        <p>{cookiesPolicy.sec1Body}</p>

        <SectionHeading>{cookiesPolicy.sec2Title}</SectionHeading>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2 pr-4 font-semibold">{cookiesPolicy.colKey}</th>
                <th className="py-2 px-4 font-semibold">{cookiesPolicy.colCategory}</th>
                <th className="py-2 pl-4 font-semibold">{cookiesPolicy.colPurpose}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {cookiesPolicy.rows.map((row) => (
                <tr key={row.key}>
                  <td dir="ltr" className="py-2.5 pr-4 font-mono">
                    {row.key}
                  </td>
                  <td className="py-2.5 px-4">{row.category}</td>
                  <td className="py-2.5 pl-4">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeading>{cookiesPolicy.sec3Title}</SectionHeading>
        <p>
          {cookiesPolicy.sec3Prefix}{' '}
          <a
            href="/ads.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sky-700 dark:text-sky-400 hover:underline"
          >
            /ads.txt
          </a>
          {cookiesPolicy.sec3Mid}{' '}
          <button
            type="button"
            onClick={() => onNavigate('cookies-notice')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            {cookiesPolicy.cookiesNoticeLinkText}
          </button>{' '}
          {cookiesPolicy.sec3OrVia}{' '}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 dark:text-sky-400 hover:underline"
          >
            {cookiesPolicy.googleAdSettingsText}
          </a>
          .
        </p>
      </PageShell>
    );
  }

  if (page === 'cookies-notice') {
    const { cookiesNotice } = t.legal;
    return (
      <PageShell
        title={cookiesNotice.title}
        subtitle={cookiesNotice.subtitle}
        lastUpdated={formattedLastUpdated}
        backLabel={t.legal.backToSpeedTest}
        effectiveDatePrefix={t.legal.effectiveDatePrefix}
        operatorLabel={t.legal.operatorLabel}
        onBackHome={onBackHome}
      >
        <SectionHeading>{cookiesNotice.sec1Title}</SectionHeading>
        <p>{cookiesNotice.sec1Body}</p>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                {cookiesNotice.activeTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {cookiesNotice.currentSettingLabel}{' '}
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                  {cookiePref === 'all'
                    ? cookiesNotice.statusAll
                    : cookiePref === 'essential'
                    ? cookiesNotice.statusEssential
                    : cookiesNotice.statusUnset}
                </span>
              </p>
            </div>

            {cookieSaved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 dark:text-teal-400">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{cookiesNotice.savedBadge}</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => saveCookiePreference('all')}
              aria-pressed={cookiePref === 'all'}
              className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg bg-black text-white hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                cookiePref === 'all'
                  ? 'border-2 border-sky-500 ring-2 ring-sky-500/30'
                  : 'border border-black dark:border-zinc-700'
              }`}
            >
              {cookiePref === 'all' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />}
              <span>{cookiesNotice.acceptAllBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => saveCookiePreference('essential')}
              aria-pressed={cookiePref === 'essential'}
              className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium rounded-lg bg-black text-white hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                cookiePref === 'essential'
                  ? 'border-2 border-sky-500 ring-2 ring-sky-500/30'
                  : 'border border-black dark:border-zinc-700'
              }`}
            >
              {cookiePref === 'essential' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />}
              <span>{cookiesNotice.essentialOnlyBtn}</span>
            </button>
          </div>
        </div>

        <SectionHeading>{cookiesNotice.sec2Title}</SectionHeading>
        <p>{cookiesNotice.sec2Body}</p>
      </PageShell>
    );
  }

  // GDPR & Data Collection Policy
  const { gdpr } = t.legal;
  return (
    <PageShell
      title={gdpr.title}
      subtitle={gdpr.subtitle}
      lastUpdated={formattedLastUpdated}
      backLabel={t.legal.backToSpeedTest}
      effectiveDatePrefix={t.legal.effectiveDatePrefix}
      operatorLabel={t.legal.operatorLabel}
      onBackHome={onBackHome}
    >
      {gdpr.sections.map((block, idx) => (
        <LegalSectionContent key={idx} block={block} />
      ))}
    </PageShell>
  );
}
