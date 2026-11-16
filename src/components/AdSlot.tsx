import { memo, useEffect, useRef, useState } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  getAdSenseClientId,
  getStoredConsentPreference,
  type ConsentChoice,
} from '../utils/consentManager';

interface AdSlotProps {
  slotId?: string;
  label?: string;
}

export const AdSlot = memo(function AdSlot({
  slotId,
  label = 'Advertisement',
}: AdSlotProps) {
  const clientId = getAdSenseClientId();
  const resolvedSlot =
    slotId ||
    (typeof import.meta.env.VITE_ADSENSE_SLOT_MAIN === 'string'
      ? import.meta.env.VITE_ADSENSE_SLOT_MAIN.trim()
      : '');

  const [consent, setConsent] = useState<ConsentChoice | null>(getStoredConsentPreference);
  const pushedRef = useRef(false);

  useEffect(() => {
    const syncConsent = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      if (detail === 'all' || detail === 'essential') {
        setConsent(detail);
      }
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    if (!clientId || !resolvedSlot || consent === null || pushedRef.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // Ignore AdSense push errors before external script hydration
    }
  }, [clientId, resolvedSlot, consent]);

  // Collapse cleanly when publisher/slot IDs are not configured yet (zero empty placeholder boxes)
  if (!clientId || !resolvedSlot || consent === null) {
    return null;
  }

  return (
    <aside
      aria-label={label}
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-4 min-h-[116px] flex flex-col items-center justify-center"
    >
      <span className="mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <ins
        className="adsbygoogle block w-full min-h-[90px]"
        data-ad-client={clientId}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
});
