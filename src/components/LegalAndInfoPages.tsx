import { ArrowLeft, CheckCircle2, Copy, Check, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsentPreference,
  setConsentPreference,
  type ConsentChoice,
} from '../utils/consentManager';
import type { AppPage } from './TopBar';

interface LegalAndInfoPagesProps {
  page: Exclude<AppPage, 'home'>;
  onBackHome: () => void;
  onNavigate: (page: AppPage) => void;
}

function PageShell({
  title,
  subtitle,
  lastUpdated,
  onBackHome,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated?: string;
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
          <span>Back to Speed Test</span>
        </button>

        <h1 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
          {subtitle}
        </p>
        {lastUpdated && (
          <p className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
            Effective Date: {lastUpdated} · Operator: ECORZO LLC
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

export function LegalAndInfoPages({
  page,
  onBackHome,
  onNavigate,
}: LegalAndInfoPagesProps) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSent, setContactSent] = useState(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'address' | null>(null);

  const [cookiePref, setCookiePref] = useState<ConsentChoice | null>(getStoredConsentPreference);
  const [cookieSaved, setCookieSaved] = useState(false);

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
      setContactError('Please enter your name, email address, and message.');
      return;
    }
    if (!contactEmail.includes('@')) {
      setContactError('Please enter a valid email address.');
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
    return (
      <PageShell
        title="About TestLine"
        subtitle="Built by ECORZO LLC to deliver transparent internet speed testing and public IPv4/IPv6 diagnostics in one fast, privacy-respecting web app."
        lastUpdated="November 15, 2026"
        onBackHome={onBackHome}
      >
        <SectionHeading>What TestLine Measures</SectionHeading>
        <p>
          TestLine is a free, ad-light browser internet speed test and &ldquo;what is my IP&rdquo;
          diagnostic tool operated by{' '}
          <strong className="text-slate-900 dark:text-slate-100">ECORZO LLC</strong>.
          When you click <strong className="text-slate-900 dark:text-slate-100">Start Speed Test</strong>,
          the application runs live throughput, latency, IP geolocation, and VPN detection checks
          directly between your browser and global edge endpoints without plugins or sign-ups.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-slate-900 dark:text-slate-100">Download &amp; Upload Speed (Mbps / MB/s):</strong>{' '}
            Executes parallel HTTP streams against Cloudflare&apos;s public speed edge to measure
            real-world ISP download and upload capacity in Auto, Mbps, or MB/s units.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">Ping, Jitter &amp; Latency Health:</strong>{' '}
            Measures sequential uncached round-trip time (RTT) probes to report average ping,
            minimum ping, and packet-to-packet jitter variance affecting calls and gaming.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">What Is My IPv4/IPv6, Location, ISP &amp; ASN:</strong>{' '}
            Resolves your public IPv4 and IPv6 addresses side by side, city/country IP geolocation,
            Internet Service Provider (ISP), Autonomous System Number (ASN), reverse DNS (PTR)
            hostname, and encrypted Cloudflare DoH DNS latency.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">VPN, Proxy &amp; Datacenter Detection:</strong>{' '}
            Evaluates forwarding headers, hosting/datacenter ASN flags, relay PTR patterns, and
            timezone alignment to surface active VPN, proxy, or relay routing.
          </li>
        </ul>

        <SectionHeading>Knowledge Base, Live News &amp; Company Details</SectionHeading>
        <p>
          Explore our{' '}
          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            10 Speed, IP, Scam &amp; VPN Guides
          </button>{' '}
          or read real-time cybersecurity and network headlines in the{' '}
          <button
            type="button"
            onClick={() => onNavigate('news')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            TestLine News RSS Feed
          </button>
          . TestLine is developed and maintained by{' '}
          <strong className="text-slate-900 dark:text-slate-100">ECORZO LLC</strong>, headquartered
          at 224 W 35th St STE 500, New York, NY 10001, United States. For support or compliance
          inquiries, visit our{' '}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            Contact page
          </button>
          .
        </p>
      </PageShell>
    );
  }

  if (page === 'contact') {
    return (
      <PageShell
        title="Contact ECORZO LLC"
        subtitle="Reach our team regarding TestLine diagnostics, privacy requests, GDPR data inquiries, or legal compliance."
        onBackHome={onBackHome}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>Telephone</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <a
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
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>Registered Office Address</span>
            </div>
            <div className="flex items-start justify-between gap-2.5">
              <address className="not-italic text-sm font-medium text-slate-900 dark:text-slate-100">
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
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <SectionHeading>Send an Inquiry</SectionHeading>
        {contactSent ? (
          <div className="p-5 rounded-lg border border-teal-200 dark:border-teal-800/70 bg-teal-50/70 dark:bg-teal-950/30 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-teal-800 dark:text-teal-300">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Inquiry Prepared</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Thank you, {contactName}. Your message details have been recorded for review. For
              time-sensitive legal or GDPR matters, please call{' '}
              <span className="font-mono font-medium">+1 646 427 6802</span> or write to ECORZO LLC
              at 224 W 35th St STE 500, New York NY, 10001.
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
              Send another inquiry
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
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full min-h-[40px] px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full min-h-[40px] px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-msg"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-msg"
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="How can ECORZO LLC help you?"
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
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </PageShell>
    );
  }

  if (page === 'privacy') {
    return (
      <PageShell
        title="Privacy Policy"
        subtitle="How TestLine by ECORZO LLC collects, uses, and safeguards diagnostic information in accordance with Google policies and applicable privacy law."
        lastUpdated="November 15, 2026"
        onBackHome={onBackHome}
      >
        <SectionHeading>1. Data Controller &amp; Scope</SectionHeading>
        <p>
          This Privacy Policy governs your use of <strong className="text-slate-900 dark:text-slate-100">TestLine</strong>, operated by{' '}
          <strong className="text-slate-900 dark:text-slate-100">ECORZO LLC</strong> (224 W 35th St
          STE 500, New York, NY 10001; Phone: +1 646 427 6802). It is drafted to satisfy Google
          Publisher &amp; User Consent transparency requirements, the EU/UK General Data Protection
          Regulation (GDPR), and the California Consumer Privacy Act (CCPA/CPRA).
        </p>

        <SectionHeading>2. Information Processed During Diagnostics</SectionHeading>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-slate-900 dark:text-slate-100">Network &amp; IP Telemetry:</strong>{' '}
            Your public IPv4/IPv6 address, ISP, ASN, approximate city/region/country, reverse DNS
            (PTR), and HTTP request headers (such as <code className="font-mono">Via</code> or{' '}
            <code className="font-mono">X-Forwarded-For</code>) are processed ephemerally in memory
            to display your network diagnostics and proxy/VPN check results.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">Speed Measurements:</strong>{' '}
            Download, upload, ping, and jitter results are computed in your browser and saved solely
            in your browser&apos;s local storage (<code className="font-mono">testline_history_v1</code>
            ) so you can review recent runs. You may clear this history at any time.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-slate-100">Browser Preferences:</strong>{' '}
            Theme mode (<code className="font-mono">testline_theme</code>) and cookie preference (
            <code className="font-mono">testline_cookie_consent</code>) are stored locally in your
            browser.
          </li>
        </ul>

        <SectionHeading>3. Third-Party Services &amp; Google Policy Disclosure</SectionHeading>
        <p>
          To perform live speed and IP resolution tests, your browser communicates directly with
          reputable infrastructure providers, including Cloudflare Speed Endpoints (
          <code className="font-mono">speed.cloudflare.com</code>), Cloudflare DNS-over-HTTPS (
          <code className="font-mono">cloudflare-dns.com</code>), IPWhois (<code className="font-mono">ipwho.is</code>),
          GeoJS (<code className="font-mono">get.geojs.io</code>), and Ipify (<code className="font-mono">api.ipify.org</code>).
          When Google services (such as Google Fonts, Google Analytics, or Google AdSense, if
          enabled) are loaded, Google may use cookies or device identifiers in accordance with{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 dark:text-sky-400 hover:underline"
          >
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>

        <SectionHeading>4. No Sale of Personal Information &amp; Retention</SectionHeading>
        <p>
          ECORZO LLC does not sell, rent, or trade your personal information or IP address to data
          brokers. Diagnostic lookups processed by our server are transient and are not written to
          persistent user profiles. PDF reports exported via the &ldquo;Export PDF&rdquo; action are
          generated entirely inside your browser and are never uploaded to our servers.
        </p>

        <SectionHeading>5. Your Privacy Rights &amp; Contact</SectionHeading>
        <p>
          Depending on your jurisdiction, you have rights to access, correct, delete, or restrict
          processing of your personal data, and to withdraw consent at any time. Review our{' '}
          <button
            type="button"
            onClick={() => onNavigate('gdpr')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            GDPR &amp; Data Collection Policy
          </button>{' '}
          or contact ECORZO LLC at +1 646 427 6802 or 224 W 35th St STE 500, New York NY, 10001.
        </p>
      </PageShell>
    );
  }

  if (page === 'disclaimer') {
    return (
      <PageShell
        title="Disclaimer"
        subtitle="Important limitations regarding internet speed measurements, IP geolocation accuracy, and proxy/VPN detection signals."
        lastUpdated="November 15, 2026"
        onBackHome={onBackHome}
      >
        <SectionHeading>1. Informational &amp; Diagnostic Purpose Only</SectionHeading>
        <p>
          TestLine by ECORZO LLC is provided strictly on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis for informational and general network diagnostic purposes. Speed
          readings represent the throughput observed between your browser and test edge servers at
          the moment of testing and do not constitute a legally binding certification of ISP line
          capacity or service-level compliance.
        </p>

        <SectionHeading>2. Variables Affecting Speed Results</SectionHeading>
        <p>
          Measured download, upload, ping, and jitter values can vary based on Wi-Fi signal strength,
          router hardware, background downloads, browser throttling, VPN/proxy encryption overhead,
          ISP traffic shaping, and peering congestion between your network and Cloudflare edge nodes.
        </p>

        <SectionHeading>3. IP Geolocation &amp; Proxy Detection Accuracy</SectionHeading>
        <p>
          Approximate city, region, and ISP metadata are derived from third-party IP databases and
          represent the registered location of the IP block rather than your exact physical street
          address. Proxy, VPN, and datacenter flags reflect heuristic indicators (such as ASN type,
          forwarding headers, and timezone alignment) and may occasionally produce false positives or
          false negatives for mobile carriers, corporate gateways, or CGNAT networks.
        </p>

        <SectionHeading>4. Limitation of Liability</SectionHeading>
        <p>
          To the fullest extent permitted by applicable law, ECORZO LLC disclaims all warranties,
          express or implied, and shall not be liable for any direct, indirect, incidental, or
          consequential damages arising from your reliance on diagnostic figures, exported PDF
          reports, or temporary unavailability of third-party measurement endpoints.
        </p>
      </PageShell>
    );
  }

  if (page === 'terms') {
    return (
      <PageShell
        title="Terms & Conditions"
        subtitle="Governing rules for accessing and using TestLine by ECORZO LLC."
        lastUpdated="November 15, 2026"
        onBackHome={onBackHome}
      >
        <SectionHeading>1. Acceptance of Terms</SectionHeading>
        <p>
          By accessing or using TestLine, you agree to be bound by these Terms &amp; Conditions and
          all applicable laws and regulations, including Google&apos;s acceptable use and publisher
          compliance standards. If you do not agree with these terms, please discontinue use of the
          site immediately.
        </p>

        <SectionHeading>2. Permitted &amp; Prohibited Use</SectionHeading>
        <ul className="list-disc list-inside space-y-2">
          <li>
            You may use TestLine for personal, educational, or legitimate enterprise network
            troubleshooting and generate PDF diagnostic reports for your own records.
          </li>
          <li>
            You must not deploy automated bots, stress-testing scripts, DDoS tools, or high-frequency
            scrapers against TestLine or its underlying Cloudflare and IP lookup endpoints.
          </li>
          <li>
            You must not attempt to bypass rate limits, reverse-engineer server infrastructure, or
            misrepresent TestLine reports as official regulatory certifications.
          </li>
        </ul>

        <SectionHeading>3. Intellectual Property</SectionHeading>
        <p>
          The TestLine name, interface design, source code, and documentation are owned by or
          licensed to <strong className="text-slate-900 dark:text-slate-100">ECORZO LLC</strong>.
          Third-party trademarks, including Cloudflare and Google Fonts, remain the property of their
          respective owners.
        </p>

        <SectionHeading>4. Governing Law &amp; Jurisdiction</SectionHeading>
        <p>
          These Terms &amp; Conditions are governed by the laws of the State of New York and the
          United States, without regard to conflict-of-law principles. Any disputes shall be
          resolved in the state or federal courts located in New York County, New York.
        </p>
      </PageShell>
    );
  }

  if (page === 'cookies-policy') {
    return (
      <PageShell
        title="Cookies Policy"
        subtitle="Detailed breakdown of cookies, browser storage keys, and third-party technologies used by TestLine."
        lastUpdated="November 15, 2026"
        onBackHome={onBackHome}
      >
        <SectionHeading>1. What Are Cookies &amp; Local Storage?</SectionHeading>
        <p>
          Cookies are small text files placed on your device by websites you visit. Modern web
          applications also use browser <code className="font-mono">localStorage</code> to retain
          user interface preferences locally without transmitting unnecessary data across every
          network request.
        </p>

        <SectionHeading>2. Storage Keys Used by TestLine</SectionHeading>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2 pr-4 font-semibold">Key / Identifier</th>
                <th className="py-2 px-4 font-semibold">Category</th>
                <th className="py-2 pl-4 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2.5 pr-4 font-mono">testline_theme</td>
                <td className="py-2.5 px-4">Essential Preference</td>
                <td className="py-2.5 pl-4">Remembers Light or Dark mode selection across visits.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono">testline_unit_v1</td>
                <td className="py-2.5 px-4">Essential Preference</td>
                <td className="py-2.5 pl-4">Stores your selected display unit mode (Auto, Mbps, or MB/s).</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono">testline_history_v1</td>
                <td className="py-2.5 px-4">Functional Local</td>
                <td className="py-2.5 pl-4">Stores up to 15 recent speed test results locally in your browser.</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono">testline_cookie_consent</td>
                <td className="py-2.5 px-4">Essential Consent</td>
                <td className="py-2.5 pl-4">Records your Google Consent Mode v2 cookie and storage preference.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionHeading>3. Third-Party &amp; Google Policy Disclosures</SectionHeading>
        <p>
          In accordance with Google EU User Consent Policy, Google Consent Mode v2, and ePrivacy
          regulations, advertising and analytics storage remain denied by default until you opt in.
          Authorized digital sellers are published at{' '}
          <a
            href="/ads.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sky-700 dark:text-sky-400 hover:underline"
          >
            /ads.txt
          </a>
          . You can update or withdraw consent anytime on our{' '}
          <button
            type="button"
            onClick={() => onNavigate('cookies-notice')}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
          >
            Cookies Notice
          </button>{' '}
          page or via{' '}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 dark:text-sky-400 hover:underline"
          >
            Google Ad Settings
          </a>
          .
        </p>
      </PageShell>
    );
  }

  if (page === 'cookies-notice') {
    return (
      <PageShell
        title="Cookies Notice &amp; Consent Preferences"
        subtitle="Manage your cookie and browser storage consent settings for TestLine by ECORZO LLC."
        lastUpdated="November 15, 2026"
        onBackHome={onBackHome}
      >
        <SectionHeading>Notice to Visitors (EEA, UK, Switzerland &amp; Global)</SectionHeading>
        <p>
          TestLine uses strictly necessary browser storage to preserve your Light/Dark display theme,
          remember your preferred speed units and local benchmark history, and record your consent
          choices. In accordance with Google Consent Mode v2 and EU ePrivacy rules, advertising and
          analytics storage default to denied until you grant consent, and can be withdrawn anytime
          without blocking speed testing.
        </p>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                Active Consent Selection
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Current setting:{' '}
                <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                  {cookiePref === 'all'
                    ? 'All Granted (Analytics & Ads Consent Mode)'
                    : cookiePref === 'essential'
                    ? 'Strictly Essential Only'
                    : 'Not Yet Selected (Non-Essential Denied by Default)'}
                </span>
              </p>
            </div>

            {cookieSaved && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 dark:text-teal-400">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Preferences Saved</span>
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
              <span>Accept All Functional Storage</span>
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
              <span>Strictly Essential Only</span>
            </button>
          </div>
        </div>

        <SectionHeading>Browser-Level Cookie Controls</SectionHeading>
        <p>
          You may also block or clear cookies and site storage directly through your browser privacy
          settings (Chrome, Safari, Firefox, Edge). Doing so will reset your locally saved session
          history and theme preference.
        </p>
      </PageShell>
    );
  }

  // GDPR & Data Collection Policy
  return (
    <PageShell
      title="GDPR &amp; Data Collection Policy"
      subtitle="Lawful basis, data minimization, international transfers, and statutory rights under EU/UK GDPR and Google compliance standards."
      lastUpdated="November 15, 2026"
      onBackHome={onBackHome}
    >
      <SectionHeading>1. Data Controller Identity</SectionHeading>
      <p>
        For the purposes of the EU General Data Protection Regulation (Regulation (EU) 2016/679) and
        UK GDPR, the Data Controller is{' '}
        <strong className="text-slate-900 dark:text-slate-100">ECORZO LLC</strong>, located at 224
        W 35th St STE 500, New York, NY 10001, United States (Telephone: +1 646 427 6802).
      </p>

      <SectionHeading>2. Lawful Bases for Processing (GDPR Article 6)</SectionHeading>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Contract / Requested Service (Art. 6(1)(b)):</strong>{' '}
          Processing your IP address and bandwidth test streams is strictly necessary to deliver the
          internet speed and IP diagnostic functionality you requested by visiting TestLine.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Legitimate Interests (Art. 6(1)(f)):</strong>{' '}
          Protecting the platform against abuse, DDoS attacks, and ensuring edge network reliability.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Explicit Consent (Art. 6(1)(a)):</strong>{' '}
          Any non-essential cookies, analytics, or advertising identifiers governed by Google&apos;s
          EU User Consent Policy are processed only with your consent.
        </li>
      </ul>

      <SectionHeading>3. Data Collection Minimization &amp; Retention</SectionHeading>
      <p>
        ECORZO LLC adheres strictly to GDPR Article 5 data minimization. We do not require account
        registration, passwords, names, or payment cards to run speed diagnostics. IP metadata and
        reverse DNS queries are processed transiently in real time and are not stored in permanent
        user logs. Contact form submissions and telephone inquiries are retained only as long as
        necessary to resolve your request or satisfy legal obligations.
      </p>

      <SectionHeading>4. International Data Transfers</SectionHeading>
      <p>
        Diagnostic requests may route through edge servers operated by Cloudflare or Google Cloud in
        North America, Europe, or Asia-Pacific to reach the closest benchmark node. Where personal
        data leaves the EEA/UK, transfers rely on Standard Contractual Clauses (SCCs) or recognized
        adequacy frameworks.
      </p>

      <SectionHeading>5. Your Statutory Rights (GDPR Articles 15–22 &amp; CCPA/CPRA)</SectionHeading>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Right of Access &amp; Portability:</strong>{' '}
          Request confirmation of whether personal data is processed and obtain a structured copy.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Right to Rectification &amp; Erasure:</strong>{' '}
          Request correction of inaccurate information or deletion of personal data (&ldquo;Right to
          be Forgotten&rdquo;).
        </li>
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Right to Object &amp; Restrict:</strong>{' '}
          Object to processing based on legitimate interests or withdraw consent at any time.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-slate-100">Right to Lodge a Complaint:</strong>{' '}
          You have the right to file a complaint with your local EU/UK Data Protection Supervisory
          Authority.
        </li>
      </ul>

      <SectionHeading>6. Children&apos;s Privacy</SectionHeading>
      <p>
        TestLine is a general-audience utility and does not knowingly collect personal data from
        children under 13 (or under 16 in the EEA). To exercise any data protection right, contact{' '}
        <strong className="text-slate-900 dark:text-slate-100">ECORZO LLC</strong> at +1 646 427
        6802 or write to 224 W 35th St STE 500, New York NY, 10001.
      </p>
    </PageShell>
  );
}
