import { memo } from 'react';
import type { AppPage } from './TopBar';

interface FaqAndAeoSectionProps {
  onNavigate: (page: AppPage) => void;
}

const FAQ_ITEMS: Array<{ question: string; answer: string }> = [
  {
    question: 'How does TestLine measure internet download and upload speed?',
    answer:
      'Click the Start Speed Test play button to launch real-time browser-to-edge transfers against Cloudflare public speed endpoints. Download speed uses 3 parallel 25 MB fetch streams over a 10-second window, while upload speed measures 2 parallel 10 MB binary POST streams using XMLHttpRequest upload progress events. Auto mode switches between Mbps and MB/s at 100 Mbps.',
  },
  {
    question: 'What are good ping and jitter values for video calls and gaming?',
    answer:
      'For smooth video conferencing and online gaming, an average ping under 30 ms and jitter below 10 ms are considered optimal. Ping between 30 ms and 75 ms remains responsive for general browsing, while jitter above 25 ms can cause voice stutter or packet delay.',
  },
  {
    question: 'How do I check my public IPv4 and IPv6 address?',
    answer:
      'Click the Start Speed Test button to trigger both your speed benchmark and dual-stack IP diagnostics. TestLine probes dual-stack client endpoints and edge headers to display your IPv4 and IPv6 addresses side by side with one-click copy buttons.',
  },
  {
    question: 'How does TestLine detect a VPN, proxy, or datacenter relay?',
    answer:
      'TestLine evaluates proxy forwarding headers, hosting and datacenter Autonomous System Numbers (ASNs), known relay PTR hostnames, and browser-versus-IP timezone mismatches. When any signal triggers, a dedicated Proxy & VPN Detection card lists every matched indicator.',
  },
  {
    question: 'What is DNS-over-HTTPS (DoH) latency and Reverse DNS (PTR)?',
    answer:
      'DNS-over-HTTPS (DoH) latency measures how quickly your connection resolves domain queries over encrypted HTTPS via Cloudflare 1.1.1.1. Reverse DNS (PTR) reveals the canonical hostname mapped back to your public IP address by your internet carrier.',
  },
  {
    question: 'Does ECORZO LLC store my IP address or speed test data?',
    answer:
      'No. Speed tests and IP lookups run only when you initiate a test, are processed ephemerally in memory, and are never sold or stored in permanent user profiles. Recent run history is saved strictly inside your own browser storage, and exported PDF reports are generated locally on your device.',
  },
];

const BENCHMARK_STANDARDS: Array<{
  metric: string;
  method: string;
  optimal: string;
  standardUse: string;
}> = [
  {
    metric: 'Download Throughput',
    method: '3 parallel 25 MB streams (10s window)',
    optimal: '25+ Mbps (4K) · 100+ Mbps (Multi-user)',
    standardUse: 'Streaming, cloud sync, large downloads',
  },
  {
    metric: 'Upload Throughput',
    method: '2 parallel 10 MB XHR POST streams',
    optimal: '10+ Mbps (HD calls) · 25+ Mbps (Creator)',
    standardUse: 'Video calls, backups, remote work',
  },
  {
    metric: 'Average Ping (RTT)',
    method: '5 sequential 0-byte Cloudflare probes',
    optimal: '< 30 ms (Low) · 30–60 ms (Normal)',
    standardUse: 'Gaming, VoIP, interactive apps',
  },
  {
    metric: 'Jitter (Variance)',
    method: 'Mean consecutive RTT delta across probes',
    optimal: '< 10 ms (Stable) · > 25 ms (Unstable)',
    standardUse: 'Voice clarity & real-time sync',
  },
  {
    metric: 'DoH DNS Latency',
    method: 'HTTPS JSON query to 1.1.1.1 resolver',
    optimal: '< 40 ms (Fast resolution)',
    standardUse: 'Initial page & domain lookup speed',
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
        <h2
          id="guide-heading"
          className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
        >
          Network Benchmark Reference &amp; Methodology
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          TestLine by ECORZO LLC measures live transport performance using standardized browser
          streams and encrypted DNS probes. Use the thresholds below to evaluate connection health.
        </p>

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
              Direct answers about internet speed testing, IPv4/IPv6 diagnostics, and privacy
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="text-sky-700 dark:text-sky-400 hover:underline whitespace-nowrap"
            >
              Full Methodology
            </a>
            <a
              href="/gdpr"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('gdpr');
              }}
              className="text-sky-700 dark:text-sky-400 hover:underline whitespace-nowrap"
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
