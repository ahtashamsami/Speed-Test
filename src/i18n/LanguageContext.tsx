import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  guessInitialLangClient,
  isAsianCountryOrContinent,
  isSupportedLang,
  resolveLangFromGeo,
  type SupportedLang,
} from './localeDetection';
import { enPack } from './packs/en';
import type { TranslationPack } from './types';

const MANUAL_LANG_STORAGE_KEY = 'testline_lang_override_v1';
const GEO_LANG_CACHE_KEY = 'testline_geo_lang_v1';

const PACK_LOADERS: Record<Exclude<SupportedLang, 'en'>, () => Promise<TranslationPack>> = {
  de: () => import('./packs/de').then((m) => m.dePack),
  fr: () => import('./packs/fr').then((m) => m.frPack),
  es: () => import('./packs/es').then((m) => m.esPack),
  pt: () => import('./packs/pt').then((m) => m.ptPack),
  it: () => import('./packs/it').then((m) => m.itPack),
  nl: () => import('./packs/nl').then((m) => m.nlPack),
  pl: () => import('./packs/pl').then((m) => m.plPack),
  ru: () => import('./packs/ru').then((m) => m.ruPack),
  uk: () => import('./packs/uk').then((m) => m.ukPack),
  sv: () => import('./packs/sv').then((m) => m.svPack),
  no: () => import('./packs/no').then((m) => m.noPack),
  da: () => import('./packs/da').then((m) => m.daPack),
  fi: () => import('./packs/fi').then((m) => m.fiPack),
  cs: () => import('./packs/cs').then((m) => m.csPack),
  ro: () => import('./packs/ro').then((m) => m.roPack),
  hu: () => import('./packs/hu').then((m) => m.huPack),
  el: () => import('./packs/el').then((m) => m.elPack),
  ar: () => import('./packs/ar').then((m) => m.arPack),
};

interface LanguageContextValue {
  lang: SupportedLang;
  geoLang: SupportedLang;
  manualOverride: SupportedLang | null;
  resolvedCountryCode: string | null;
  isAsia: boolean;
  t: TranslationPack;
  setManualLang: (next: SupportedLang | 'auto') => void;
  applyGeoFromDiagnostics: (
    countryCode?: string | null,
    continentCode?: string | null
  ) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  geoLang: 'en',
  manualOverride: null,
  resolvedCountryCode: null,
  isAsia: false,
  t: enPack,
  setManualLang: () => undefined,
  applyGeoFromDiagnostics: () => undefined,
});

function readUrlLangParam(): SupportedLang | 'auto' | null {
  if (typeof window === 'undefined') return null;
  try {
    const param = new URLSearchParams(window.location.search).get('lang')?.trim().toLowerCase();
    if (!param) return null;
    if (param === 'auto') return 'auto';
    if (isSupportedLang(param)) return param;
  } catch {
    // Ignore restricted URL access
  }
  return null;
}

function readStoredManualOverride(): SupportedLang | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(MANUAL_LANG_STORAGE_KEY);
    if (stored && stored !== 'auto' && isSupportedLang(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

function readCachedGeoLang(): SupportedLang | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(GEO_LANG_CACHE_KEY);
    if (stored && isSupportedLang(stored)) {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

interface GeoLocaleResponse {
  source?: string;
  countryCode?: string | null;
  continentCode?: string | null;
  lang?: string | null;
}

interface IpWhoIsResponse {
  success?: boolean;
  country_code?: string;
  continent_code?: string;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialUrlParam = readUrlLangParam();
  const initialManual =
    initialUrlParam && initialUrlParam !== 'auto'
      ? initialUrlParam
      : initialUrlParam === 'auto'
      ? null
      : readStoredManualOverride();

  const [manualOverride, setManualOverride] = useState<SupportedLang | null>(initialManual);
  const [geoLang, setGeoLang] = useState<SupportedLang>(() => {
    const cached = readCachedGeoLang();
    return cached || guessInitialLangClient();
  });
  const [resolvedCountryCode, setResolvedCountryCode] = useState<string | null>(null);
  const [isAsia, setIsAsia] = useState<boolean>(false);
  const [packs, setPacks] = useState<Partial<Record<SupportedLang, TranslationPack>>>({
    en: enPack,
  });

  const activeLang: SupportedLang = manualOverride ?? geoLang;
  const activePack = packs[activeLang] || enPack;
  const manualOverrideRef = useRef(manualOverride);
  manualOverrideRef.current = manualOverride;

  // Load requested language pack asynchronously if not yet cached in memory
  useEffect(() => {
    if (activeLang === 'en' || packs[activeLang]) return;
    let cancelled = false;
    const loader = PACK_LOADERS[activeLang];
    if (!loader) return;

    loader()
      .then((loadedPack) => {
        if (!cancelled) {
          setPacks((prev) => ({ ...prev, [activeLang]: loadedPack }));
        }
      })
      .catch(() => {
        // Fallback to English if chunk fails offline
      });

    return () => {
      cancelled = true;
    };
  }, [activeLang, packs]);

  // Sync <html lang="..." dir="...">
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = activePack.meta.lang;
    document.documentElement.dir = activePack.meta.dir;
  }, [activePack.meta.lang, activePack.meta.dir]);

  const applyResolvedGeo = useCallback(
    (countryCode?: string | null, continentCode?: string | null) => {
      const cc = countryCode?.trim().toUpperCase() || null;
      const cont = continentCode?.trim().toUpperCase() || null;
      if (cc) setResolvedCountryCode(cc);
      const asian = isAsianCountryOrContinent(cc, cont);
      setIsAsia(asian);

      const navHint = typeof navigator !== 'undefined' ? navigator.language : null;
      const nextLang = resolveLangFromGeo(cc, cont, navHint);

      try {
        window.localStorage.setItem(GEO_LANG_CACHE_KEY, nextLang);
      } catch {
        // Ignore storage restrictions
      }

      if (!manualOverrideRef.current) {
        setGeoLang(nextLang);
      }
    },
    []
  );

  // Sync URL ?lang=auto reset cleanly if requested
  useEffect(() => {
    if (initialUrlParam === 'auto') {
      try {
        window.localStorage.removeItem(MANUAL_LANG_STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
  }, [initialUrlParam]);

  // Background Geo-IP locale resolution (skips override mutation if manual override is active)
  useEffect(() => {
    let cancelled = false;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 5000);

    Promise.allSettled([
      fetch('/api/geo-locale', { signal: controller.signal, cache: 'no-store' }).then((r) =>
        r.ok ? (r.json() as Promise<GeoLocaleResponse>) : null
      ),
      fetch('https://ipwho.is/', { signal: controller.signal }).then((r) =>
        r.ok ? (r.json() as Promise<IpWhoIsResponse>) : null
      ),
    ])
      .then(([serverRes, clientRes]) => {
        window.clearTimeout(timeoutId);
        if (cancelled) return;

        const serverData = serverRes.status === 'fulfilled' ? serverRes.value : null;
        const clientData =
          clientRes.status === 'fulfilled' && clientRes.value?.success !== false
            ? clientRes.value
            : null;

        // Prefer edge-header / client-ip from server, else direct browser ipwho.is, else server fallback
        if (
          serverData &&
          (serverData.source === 'edge-header' || serverData.source === 'client-ip') &&
          serverData.countryCode
        ) {
          applyResolvedGeo(serverData.countryCode, serverData.continentCode);
        } else if (clientData?.country_code) {
          applyResolvedGeo(clientData.country_code, clientData.continent_code);
        } else if (serverData?.countryCode) {
          applyResolvedGeo(serverData.countryCode, serverData.continentCode);
        }
      })
      .catch(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [applyResolvedGeo]);

  const setManualLang = useCallback((next: SupportedLang | 'auto') => {
    if (next === 'auto') {
      setManualOverride(null);
      try {
        window.localStorage.removeItem(MANUAL_LANG_STORAGE_KEY);
      } catch {
        // Ignore
      }
      const cached = readCachedGeoLang();
      setGeoLang(cached || guessInitialLangClient());
      return;
    }

    setManualOverride(next);
    try {
      window.localStorage.setItem(MANUAL_LANG_STORAGE_KEY, next);
    } catch {
      // Ignore
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang: activeLang,
      geoLang,
      manualOverride,
      resolvedCountryCode,
      isAsia,
      t: activePack,
      setManualLang,
      applyGeoFromDiagnostics: applyResolvedGeo,
    }),
    [
      activeLang,
      geoLang,
      manualOverride,
      resolvedCountryCode,
      isAsia,
      activePack,
      setManualLang,
      applyResolvedGeo,
    ]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useI18n(): LanguageContextValue {
  return useContext(LanguageContext);
}
