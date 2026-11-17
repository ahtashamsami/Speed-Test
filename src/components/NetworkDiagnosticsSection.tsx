import { Check, Copy, RefreshCw } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { NetworkDiagnostics } from '../types/network';
import { formatTimeShort } from '../utils/formatters';

interface NetworkDiagnosticsSectionProps {
  network: NetworkDiagnostics;
  onRefresh: () => void;
}

function CopyableValue({
  value,
  fallback,
  copyLabel,
  copiedLabel,
}: {
  value: string | null;
  fallback: string;
  copyLabel: string;
  copiedLabel: string;
}) {
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
      <span
        dir="ltr"
        className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100 truncate"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`${copyLabel} ${value}`}
        className="inline-flex items-center justify-center gap-1 min-h-[36px] min-w-[36px] px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" aria-hidden="true" />
            <span>{copiedLabel}</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" aria-hidden="true" />
            <span>{copyLabel}</span>
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
  const { t } = useI18n();
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

  const localizedProxyCategory =
    t.proxy.categories[network.proxyDetection.category] ?? network.proxyDetection.category;

  return (
    <section id="network-ip" className="scroll-mt-20 space-y-6">
      {/* Primary Public IP Panel */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {t.diagnostics.publicIpTitle}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {network.ipVersion
                  ? `IPv${network.ipVersion} ${t.diagnostics.routeSuffix}`
                  : t.diagnostics.resolvingRoute}
              </span>
              {network.lastUpdatedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">
                    {t.diagnostics.updatedPrefix}{' '}
                    {formatTimeShort(network.lastUpdatedAt, t.meta.intlLocale)}
                  </span>
                </>
              )}
            </div>

            {network.loading ? (
              <div className="mt-2.5 h-9 w-64 rounded-md bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <p
                  dir="ltr"
                  className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 break-all"
                >
                  {network.primaryIp ?? t.diagnostics.unavailable}
                </p>
              </div>
            )}

            {!network.loading && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {[network.isp, network.asn, locationSummary || null]
                  .filter(Boolean)
                  .join(' · ') || t.diagnostics.metadataUnavailable}
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
                  <span>{t.diagnostics.copiedIp}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>{t.diagnostics.copyIp}</span>
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
              <span>{t.diagnostics.refresh}</span>
            </button>
          </div>
        </div>

        {network.error && (
          <p className="mt-4 text-xs font-medium text-amber-700 dark:text-amber-400">
            {t.diagnostics.fetchError}
          </p>
        )}
      </div>

      {/* Dual-Stack IPv4/IPv6 + Routing & DNS Hints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: IPv4 / IPv6 & Provider Details */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6">
          <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.diagnostics.ipv46CardTitle}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t.diagnostics.ipv46CardSubtitle}
          </p>

          <dl className="mt-4">
            <DiagnosticRow label={t.diagnostics.ipv4Label}>
              {network.loading ? (
                <div className="h-5 w-36 rounded bg-slate-100 dark:bg-slate-800 animate-pulse ml-auto" />
              ) : (
                <CopyableValue
                  value={network.ipv4}
                  fallback={t.diagnostics.notDetected}
                  copyLabel={t.diagnostics.copy}
                  copiedLabel={t.diagnostics.copied}
                />
              )}
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.ipv6Label}>
              {network.loading ? (
                <div className="h-5 w-48 rounded bg-slate-100 dark:bg-slate-800 animate-pulse ml-auto" />
              ) : (
                <CopyableValue
                  value={network.ipv6}
                  fallback={t.diagnostics.ipv6NotDetected}
                  copyLabel={t.diagnostics.copy}
                  copiedLabel={t.diagnostics.copied}
                />
              )}
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.ispLabel}>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.resolving
                  : network.isp ?? t.diagnostics.unavailable}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.asnLabel}>
              <span dir="ltr" className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.resolving
                  : [network.asn, network.org].filter(Boolean).join(' · ') ||
                    t.diagnostics.unavailable}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.locationLabel}>
              <span className="text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.resolving
                  : locationSummary || t.diagnostics.unavailable}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.proxyCheckLabel}>
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
                  ? t.diagnostics.inspecting
                  : network.proxyDetection.detected
                  ? localizedProxyCategory
                  : t.diagnostics.directConnectionNone}
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
            {t.diagnostics.dnsCardTitle}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {t.diagnostics.dnsCardSubtitle}
          </p>

          <dl className="mt-4">
            <DiagnosticRow label={t.diagnostics.ptrLabel}>
              {network.loading ? (
                <div className="h-5 w-44 rounded bg-slate-100 dark:bg-slate-800 animate-pulse ml-auto" />
              ) : (
                <CopyableValue
                  value={network.ptrHostname}
                  fallback={t.diagnostics.noPtr}
                  copyLabel={t.diagnostics.copy}
                  copiedLabel={t.diagnostics.copied}
                />
              )}
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.dohProbeLabel}>
              <span dir="ltr" className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.probing
                  : network.dohReachable
                  ? `${network.dohResolver} · ${t.diagnostics.reachable}`
                  : `${network.dohResolver} · ${t.diagnostics.blockedOrUnreachable}`}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.dnsLatencyLabel}>
              <span dir="ltr" className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.probing
                  : network.dohLatencyMs !== null
                  ? `${network.dohLatencyMs.toFixed(1)} ms`
                  : t.diagnostics.unavailable}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.protocolLabel}>
              <span dir="ltr" className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.checking
                  : [
                      network.protocol?.toUpperCase(),
                      network.httpVersion ? `HTTP/${network.httpVersion}` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || 'HTTPS'}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.linkHintLabel}>
              <span dir="ltr" className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.connectionHint
                  ? [
                      network.connectionHint.effectiveType?.toUpperCase(),
                      network.connectionHint.downlinkMbps !== undefined
                        ? `~${network.connectionHint.downlinkMbps} ${t.diagnostics.capSuffix}`
                        : null,
                      network.connectionHint.rttMs !== undefined
                        ? `${network.connectionHint.rttMs} ${t.diagnostics.rttSuffix}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' · ') || t.diagnostics.exposedNoMetrics
                  : t.diagnostics.notExposed}
              </span>
            </DiagnosticRow>

            <DiagnosticRow label={t.diagnostics.timezoneLabel}>
              <span dir="ltr" className="font-mono text-sm text-slate-900 dark:text-slate-100">
                {network.loading
                  ? t.diagnostics.resolving
                  : network.timezone ?? t.diagnostics.unavailable}
              </span>
            </DiagnosticRow>
          </dl>
        </div>
      </div>
    </section>
  );
});
