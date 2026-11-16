import { Check, Copy, RefreshCw } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import type { NetworkDiagnostics } from '../types/network';
import { formatTimeShort } from '../utils/formatters';

interface NetworkDiagnosticsSectionProps {
  network: NetworkDiagnostics;
  onRefresh: () => void;
}

function CopyableValue({ value, fallback }: { value: string | null; fallback: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked in restricted context
    }
  };

  if (!value) {
    return (
      <span className="font-mono text-sm text-slate-400 dark:text-slate-500">
        {fallback}
      </span>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 min-w-0">
      <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
        {value}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${value}`}
        className="inline-flex items-center justify-center gap-1 min-h-[36px] min-w-[36px] px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" aria-hidden="true" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

function DiagnosticRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0">
      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
        {label}
      </dt>
      <dd className="min-w-0 sm:text-right">{children}</dd>
    </div>
  );
}

export const NetworkDiagnosticsSection = memo(function NetworkDiagnosticsSection({
  network,
  onRefresh,
}: NetworkDiagnosticsSectionProps) {
  const [heroCopied, setHeroCopied] = useState(false);

  const locationSummary = useMemo(
    () => [network.city, network.region, network.country].filter(Boolean).join(', '),
    [network.city, network.region, network.country]
  );

  const copyPrimaryIp = async () => {
    if (!network.primaryIp) return;
    try {
      await navigator.clipboard.writeText(network.primaryIp);
      setHeroCopied(true);
      window.setTimeout(() => setHeroCopied(false), 1600);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <section id="network-ip" className="scroll-mt-20 space-y-6">
      {/* Primary Public IP Panel */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Public IP Address
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {network.ipVersion ? `IPv${network.ipVersion} route` : 'Resolving route'}
              </span>
              {network.lastUpdatedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">Updated {formatTimeShort(network.lastUpdatedAt)}</span>
                </>
              )}
            </div>

            {network.loading ? (
              <div className="mt-2.5 h-9 w-64 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <p className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 break-all">
                  {network.primaryIp ?? 'Unavailable'}
                </p>
              </div>
            )}

            {!network.loading && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {[network.isp, network.asn, locationSummary || null]
                  .filter(Boolean)
                  .join(' · ') || 'Network metadata unavailable'}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={copyPrimaryIp}
              disabled={!network.primaryIp || network.loading}
              className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {heroCopied ? (
                <>
                  <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                  <span>Copied IP</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Copy IP</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onRefresh}
              disabled={network.loading}
              className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <RefreshCw
                className={`w-4 h-4 ${network.loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {network.error && (
          <p className="mt-4 text-xs font-medium text-amber-700 dark:text-amber-400">
            {network.error}
          </p>
        )}
      </div>

      {/* Dual-Stack IPv4/IPv6 + Routing & DNS Hints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: IPv4 / IPv6 & Provider Details */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
            IPv4, IPv6 &amp; Carrier Routing
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Dual-stack client probes combined with edge IP geolocation
          </p>

          <dl className="mt-4">
            <DiagnosticRow label="IPv4 Address">
              {network.loading ? (
                <div className="h-5 w-36 rounded bg-slate-100 dark:bg-slate-800 animate-pulse ml-auto" />
              ) : (
                <CopyableValue value={network.ipv4} fallback="Not detected" />
              )}
            </DiagnosticRow>

            <DiagnosticRow label="IPv6 Address">
              {network.loading ? (
                <div className="h-5 w-48 rounded bg-slate-100 dark:bg-slate-800 animate-pulse ml-auto" />
              ) : (
                <CopyableValue
                  value={network.ipv6}
                  fallback="Not detected (IPv4-only route)"
                />
              )}
            </DiagnosticRow>

            <DiagnosticRow label="ISP / Carrier">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {network.loading ? 'Resolving...' : network.isp ?? 'Unavailable'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="Autonomous System (ASN)">
              <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? 'Resolving...'
                  : [network.asn, network.org].filter(Boolean).join(' · ') || 'Unavailable'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="Approximate Location">
              <span className="text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? 'Resolving...'
                  : locationSummary || 'Unavailable'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="Proxy / VPN Check">
              <span
                className={`text-sm font-medium ${
                  network.loading
                    ? 'text-slate-500 dark:text-slate-400'
                    : network.proxyDetection.detected
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-teal-700 dark:text-teal-400'
                }`}
              >
                {network.loading
                  ? 'Inspecting...'
                  : network.proxyDetection.detected
                  ? network.proxyDetection.category
                  : 'Direct connection (None detected)'}
              </span>
            </DiagnosticRow>
          </dl>
        </div>

        {/* Column 2: DNS Hints & Browser Connection Telemetry */}
        <div
          id="dns-hints"
          className="scroll-mt-20 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6"
        >
          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
            DNS Hints &amp; Link Diagnostics
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Reverse PTR record, DoH resolver reachability, and browser transport signals
          </p>

          <dl className="mt-4">
            <DiagnosticRow label="Reverse DNS (PTR)">
              {network.loading ? (
                <div className="h-5 w-44 rounded bg-slate-100 dark:bg-slate-800 animate-pulse ml-auto" />
              ) : (
                <CopyableValue
                  value={network.ptrHostname}
                  fallback="No PTR record published"
                />
              )}
            </DiagnosticRow>

            <DiagnosticRow label="DoH Resolver Probe">
              <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? 'Probing...'
                  : network.dohReachable
                  ? `${network.dohResolver} · Reachable`
                  : `${network.dohResolver} · Blocked or unreachable`}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="DNS Query Latency">
              <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? 'Probing...'
                  : network.dohLatencyMs !== null
                  ? `${network.dohLatencyMs.toFixed(1)} ms`
                  : 'Unavailable'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="Transport Protocol">
              <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? 'Checking...'
                  : [
                      network.protocol?.toUpperCase(),
                      network.httpVersion ? `HTTP/${network.httpVersion}` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || 'HTTPS'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="Browser Link Hint">
              <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.connectionHint
                  ? [
                      network.connectionHint.effectiveType?.toUpperCase(),
                      network.connectionHint.downlinkMbps !== undefined
                        ? `~${network.connectionHint.downlinkMbps} Mbps cap`
                        : null,
                      network.connectionHint.rttMs !== undefined
                        ? `${network.connectionHint.rttMs} ms RTT`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || 'Exposed without metrics'
                  : 'Not exposed by browser'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label="Timezone">
              <span className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading ? 'Resolving...' : network.timezone ?? 'Unavailable'}
              </span>
            </DiagnosticRow>
          </dl>
        </div>
      </div>
    </section>
  );
});
