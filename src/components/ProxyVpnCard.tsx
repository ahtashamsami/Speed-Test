import { ShieldAlert } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import type { NetworkDiagnostics } from '../types/network';

interface ProxyVpnCardProps {
  network: NetworkDiagnostics;
}

export const ProxyVpnCard = memo(function ProxyVpnCard({ network }: ProxyVpnCardProps) {
  const { t } = useI18n();
  const { proxyDetection } = network;

  const locationLabel = useMemo(
    () => [network.city, network.region, network.country].filter(Boolean).join(', '),
    [network.city, network.region, network.country]
  );

  const translatedSignals = useMemo(() => {
    if (proxyDetection.signalEntries && proxyDetection.signalEntries.length > 0) {
      return proxyDetection.signalEntries.map((entry) => {
        const tpl = t.proxy.signalTemplates[entry.code] ?? entry.code;
        return tpl
          .replace('{1}', entry.arg1 ?? '')
          .replace('{2}', entry.arg2 ?? '');
      });
    }
    return proxyDetection.signals;
  }, [proxyDetection.signalEntries, proxyDetection.signals, t.proxy.signalTemplates]);

  if (network.loading || !proxyDetection.detected) {
    return null;
  }

  const localizedCategory =
    t.proxy.categories[proxyDetection.category] ?? proxyDetection.category;
  const localizedConfidence =
    t.proxy.confidence[proxyDetection.confidence] ?? proxyDetection.confidence;
  const signalCount = translatedSignals.length;

  return (
    <section
      aria-label={t.proxy.ariaLabel}
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
                {localizedCategory}
              </h2>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">
                ·
              </span>
              <span className="font-mono text-xs font-medium text-amber-800 dark:text-amber-300">
                {localizedConfidence} {t.proxy.confidenceWord} ({signalCount}{' '}
                {signalCount === 1 ? t.proxy.signalSingular : t.proxy.signalPlural})
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {t.proxy.noticeDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-amber-200/80 dark:border-amber-800/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.proxy.observedExitIp}
          </div>
          <div
            dir="ltr"
            className="mt-1 font-mono font-medium text-slate-900 dark:text-slate-100 break-all"
          >
            {network.primaryIp ?? t.proxy.unavailable}
            {network.ipVersion ? ` (IPv${network.ipVersion})` : ''}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.proxy.relayOperator}
          </div>
          <div className="mt-1 font-medium text-slate-900 dark:text-slate-100">
            {[network.isp, network.asn].filter(Boolean).join(' · ') || t.proxy.unavailable}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t.proxy.exitLocationTz}
          </div>
          <div className="mt-1 text-slate-900 dark:text-slate-100">
            {locationLabel || t.proxy.unavailable}
            {proxyDetection.ipTimezone ? ` · ${proxyDetection.ipTimezone}` : ''}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-amber-800/50">
        <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {t.proxy.detectedIndicators}
        </div>
        <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside">
          {translatedSignals.map((signalText, idx) => (
            <li key={idx}>{signalText}</li>
          ))}
        </ul>
      </div>
    </section>
  );
});
