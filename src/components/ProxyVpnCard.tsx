import { ShieldAlert } from 'lucide-react';
import type { NetworkDiagnostics } from '../types/network';

interface ProxyVpnCardProps {
  network: NetworkDiagnostics;
}

export function ProxyVpnCard({ network }: ProxyVpnCardProps) {
  const { proxyDetection } = network;

  if (network.loading || !proxyDetection.detected) {
    return null;
  }

  const locationLabel = [network.city, network.region, network.country]
    .filter(Boolean)
    .join(', ');

  return (
    <section
      aria-label="Proxy or VPN detection notice"
      className="rounded-xl border border-amber-300 dark:border-amber-700/70 bg-amber-50/70 dark:bg-amber-950/25 p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 p-2 rounded-lg border border-amber-200 dark:border-amber-800/80 bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" aria-hidden="true" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                {proxyDetection.category}
              </h2>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                ·
              </span>
              <span className="font-mono text-xs font-medium text-amber-800 dark:text-amber-300">
                {proxyDetection.confidence} confidence ({proxyDetection.signals.length}{' '}
                {proxyDetection.signals.length === 1 ? 'signal' : 'signals'})
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              Your connection exhibits proxy, VPN, or datacenter relay characteristics. Speed measurements reflect the active tunnel or exit node.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-amber-200/80 dark:border-amber-800/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Observed Exit IP
          </div>
          <div className="mt-1 font-mono font-medium text-slate-900 dark:text-slate-100 break-all">
            {network.primaryIp ?? 'Unavailable'}
            {network.ipVersion ? ` (IPv${network.ipVersion})` : ''}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Relay / Carrier Operator
          </div>
          <div className="mt-1 font-medium text-slate-900 dark:text-slate-100">
            {[network.isp, network.asn].filter(Boolean).join(' · ') || 'Unavailable'}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Exit Location &amp; Timezone
          </div>
          <div className="mt-1 text-slate-900 dark:text-slate-100">
            {locationLabel || 'Unavailable'}
            {proxyDetection.ipTimezone ? ` · ${proxyDetection.ipTimezone}` : ''}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-amber-800/50">
        <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Detected Indicators
        </div>
        <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside">
          {proxyDetection.signals.map((signalText, idx) => (
            <li key={idx}>{signalText}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
