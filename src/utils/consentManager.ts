export type ConsentChoice = 'all' | 'essential';

export const COOKIE_CONSENT_KEY = 'testline_cookie_consent';
export const CONSENT_CHANGE_EVENT = 'testline-consent-change';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

let adSenseLoaded = false;

export function getAdSenseClientId(): string {
  const raw = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  return typeof raw === 'string' ? raw.trim() : '';
}

export function getStoredConsentPreference(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (val === 'all' || val === 'essential') {
      return val;
    }
  } catch {
    // Ignore storage read failures
  }
  return null;
}

function ensureGtag(): (...args: unknown[]) => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
  return window.gtag;
}

export function applyGoogleConsentMode(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  const gtag = ensureGtag();
  const granted = choice === 'all' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
}

export function loadAdSenseScriptIfConfigured(): void {
  if (typeof document === 'undefined' || adSenseLoaded) return;
  const clientId = getAdSenseClientId();
  if (!clientId || !/^ca-pub-\d{10,20}$/.test(clientId)) return;

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );
  if (existing) {
    adSenseLoaded = true;
    return;
  }

  adSenseLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
  document.head.appendChild(script);
}

export function setConsentPreference(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch {
    // Ignore storage write failures
  }
  applyGoogleConsentMode(choice);
  loadAdSenseScriptIfConfigured();
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
}

export function initConsentState(): ConsentChoice | null {
  const stored = getStoredConsentPreference();
  if (stored) {
    applyGoogleConsentMode(stored);
    loadAdSenseScriptIfConfigured();
  }
  return stored;
}
