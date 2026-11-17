import { memo } from 'react';
import type { AppPage } from './TopBar';

interface FaqAndAeoSectionProps {
  onNavigate: (page: AppPage) => void;
}

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'How fast is my internet download and upload speed?',
    answer:
      'Click the Start Speed Test play button to measure your real-time ISP download speed and upload speed in Mbps or MB/s. TestLine runs 3 parallel 25 MB download streams over 10 seconds and 2 parallel 10 MB upload streams against Cloudflare edge servers to verify streaming, gaming, and file transfer speeds.',
  },
  {
    question: 'What is my public IPv4 and IPv6 address?',
    answer:
      'When you start a test on TestLine, dual-stack network probing detects both your public IPv4 address and IPv6 address side by side with one-click copy buttons, along with your IP location (city, region, country), Internet Service Provider (ISP), and Autonomous System Number (ASN).',
  },
  {
    question: 'What are good ping, jitter, and unloaded vs. loaded latency (bufferbloat) scores?',
    answer:
      'Unloaded ping under 30 ms and jitter below 10 ms deliver smooth video calls and online gaming. When latency spikes sharply during heavy downloads or uploads (loaded latency), that difference indicates bufferbloat, which causes voice stutter and lag even on high-Mbps fiber plans.',
  },
  {
    question: 'How accurate is IP geolocation for checking my IP location?',
    answer:
      'IP location lookup maps your public IP block to its registered country, region, and city using ISP and regional registry records. City-level IP geolocation is generally accurate for routing and regional diagnostics, though it never reveals your exact street address.',
  },
  {
    question: 'How does TestLine detect a VPN, proxy, or datacenter IP?',
    answer:
      'TestLine checks HTTP forwarding headers, hosting and datacenter ASNs, relay reverse DNS (PTR) hostnames, and browser-versus-IP timezone mismatches. When any VPN, proxy, or relay indicator matches, the Proxy & VPN Detection card highlights every triggered signal.',
  },
  {
    question: 'What is DNS-over-HTTPS (DoH) latency and Reverse DNS (PTR) lookup?',
    answer:
      'DNS-over-HTTPS (DoH) latency measures how quickly your network resolves domain names over encrypted HTTPS via Cloudflare 1.1.1.1, while Reverse DNS (PTR) lookup displays the canonical carrier or server hostname assigned to your public IP address.',
  },
  {
    question: 'Does ECORZO LLC log or store my IP address or speed test results?',
    answer:
      'No. Speed tests and IP lookups run only when you initiate a test, are processed ephemerally in memory, and are never sold or stored in permanent user profiles. Recent run history stays strictly inside your own browser storage, and exported PDF reports are generated locally on your device.',
  },
  {
    question: 'Can I use TestLine as a mobile app or play offline if my internet drops?',
    answer:
      'Yes. TestLine is an installable Progressive Web App (PWA) for Android, iOS, and desktop. Whenever your device loses internet connectivity, TestLine automatically launches the Signal Runner jump-and-run game so you can play until your connection comes back online.',
  },
];

const BENCHMARK_STANDARDS: Array<{
  metric: string;
  method: string;
  optimal: string;
  standardUse: string;
}> = [
  {
    metric: 'Download Speed (Mbps / MB/s)',
    method: '3 parallel 25 MB HTTP streams (10s window)',
    optimal: '25+ Mbps (4K) · 100+ Mbps (Multi-user)',
    standardUse: 'Streaming, downloads, cloud sync',
  },
  {
    metric: 'Upload Speed (Mbps / MB/s)',
    method: '2 parallel 10 MB XHR POST streams',
    optimal: '10+ Mbps (HD calls) · 25+ Mbps (Creator)',
    standardUse: 'Video calls, backups, live streaming',
  },
  {
    metric: 'Ping & Unloaded Latency',
    method: '5 sequential 0-byte Cloudflare RTT probes',
    optimal: '< 30 ms (Low) · 30–60 ms (Normal)',
    standardUse: 'Online gaming, VoIP, web responsiveness',
  },
  {
    metric: 'Jitter & Bufferbloat Sensitivity',
    method: 'Mean consecutive RTT variance across probes',
    optimal: '< 10 ms (Stable) · > 25 ms (Congested)',
    standardUse: 'Audio/video stability under load',
  },
  {
    metric: 'DoH DNS Latency & PTR Lookup',
    method: 'Encrypted 1.1.1.1 query + Reverse DNS PTR',
    optimal: '< 40 ms DNS resolution',
    standardUse: 'Domain lookup speed & carrier verification',
  },
  {
    metric: 'Dual-Stack IP, Geo & VPN Status',
    method: 'IPv4/IPv6 + ISP/ASN + Header/Timezone audit',
    optimal: 'Direct ISP IP or verified VPN exit node',
    standardUse: 'What is my IP, IP location, proxy/VPN check',
  },
];

export const FaqAndAeoSection = memo(function FaqAndAeoSection({
  onNavigate,
}: FaqAndAeoSectionProps) {
  return (
    <section
      id="diagnostics-guide"
      aria-labelledby="guide-heading"
      className="scroll-mt-20 space-y-6"
    >
      {/* GEO: Structured Technical Benchmark Reference Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2
              id="guide-heading"
              className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              Internet Speed Test &amp; IP Lookup Reference
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              TestLine by ECORZO LLC measures live ISP download/upload bandwidth, ping latency,
              jitter, public IPv4/IPv6 addresses, IP geolocation, DNS speed, and VPN or proxy flags.
            </p>
          </div>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('blog');
            }}
            className="inline-flex items-center min-h-[36px] px-2.5 py-1 rounded-lg text-xs font-medium text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
          >
            Read 10 Speed &amp; IP Guides
          </a>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4">Metric</th>
                <th className="py-2.5 px-4">Measurement Method</th>
                <th className="py-2.5 px-4">Target Threshold</th>
                <th className="py-2.5 pl-4">Primary Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {BENCHMARK_STANDARDS.map((row) => (
                <tr key={row.metric}>
                  <td className="py-2.5 pr-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                    {row.method}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs text-sky-700 dark:text-sky-300">
                    {row.optimal}
                  </td>
                  <td className="py-2.5 pl-4 text-slate-600 dark:text-slate-400">
                    {row.standardUse}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AEO: Direct-Answer FAQ Section */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Direct answers on internet speed testing, what is my IP, IP location, VPN status, and privacy
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <a
              href="/news"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('news');
              }}
              className="inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
            >
              Security &amp; Network News
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
            >
              Full Methodology
            </a>
            <a
              href="/gdpr"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('gdpr');
              }}
              className="inline-flex items-center min-h-[38px] px-2.5 py-1.5 rounded-lg text-sky-700 dark:text-sky-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:underline whitespace-nowrap transition-colors"
            >
              GDPR &amp; Data Policy
            </a>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="space-y-1.5">
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                {item.question}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
