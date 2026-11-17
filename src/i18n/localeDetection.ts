export type SupportedLang =
  | 'en'
  | 'de'
  | 'fr'
  | 'es'
  | 'pt'
  | 'it'
  | 'nl'
  | 'pl'
  | 'ru'
  | 'uk'
  | 'sv'
  | 'no'
  | 'da'
  | 'fi'
  | 'cs'
  | 'ro'
  | 'hu'
  | 'el'
  | 'ar';

export const SUPPORTED_LANGS: readonly SupportedLang[] = [
  'en',
  'de',
  'fr',
  'es',
  'pt',
  'it',
  'nl',
  'pl',
  'ru',
  'uk',
  'sv',
  'no',
  'da',
  'fi',
  'cs',
  'ro',
  'hu',
  'el',
  'ar',
] as const;

export const LANG_METADATA: Record<
  SupportedLang,
  { intlLocale: string; nativeName: string; englishName: string; dir: 'ltr' | 'rtl' }
> = {
  en: { intlLocale: 'en-US', nativeName: 'English', englishName: 'English', dir: 'ltr' },
  de: { intlLocale: 'de-DE', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr' },
  fr: { intlLocale: 'fr-FR', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  es: { intlLocale: 'es-ES', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  pt: { intlLocale: 'pt-BR', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr' },
  it: { intlLocale: 'it-IT', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr' },
  nl: { intlLocale: 'nl-NL', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr' },
  pl: { intlLocale: 'pl-PL', nativeName: 'Polski', englishName: 'Polish', dir: 'ltr' },
  ru: { intlLocale: 'ru-RU', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr' },
  uk: { intlLocale: 'uk-UA', nativeName: 'Українська', englishName: 'Ukrainian', dir: 'ltr' },
  sv: { intlLocale: 'sv-SE', nativeName: 'Svenska', englishName: 'Swedish', dir: 'ltr' },
  no: { intlLocale: 'nb-NO', nativeName: 'Norsk', englishName: 'Norwegian', dir: 'ltr' },
  da: { intlLocale: 'da-DK', nativeName: 'Dansk', englishName: 'Danish', dir: 'ltr' },
  fi: { intlLocale: 'fi-FI', nativeName: 'Suomi', englishName: 'Finnish', dir: 'ltr' },
  cs: { intlLocale: 'cs-CZ', nativeName: 'Čeština', englishName: 'Czech', dir: 'ltr' },
  ro: { intlLocale: 'ro-RO', nativeName: 'Română', englishName: 'Romanian', dir: 'ltr' },
  hu: { intlLocale: 'hu-HU', nativeName: 'Magyar', englishName: 'Hungarian', dir: 'ltr' },
  el: { intlLocale: 'el-GR', nativeName: 'Ελληνικά', englishName: 'Greek', dir: 'ltr' },
  ar: { intlLocale: 'ar-EG', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
};

/**
 * Complete ISO 3166-1 alpha-2 country/territory codes across Asia
 * (East, South, Southeast, Central, and West Asia / Middle East).
 * Visitors in Asia always receive the English ('en') site experience.
 */
export const ASIAN_COUNTRY_CODES = new Set<string>([
  'AE', // United Arab Emirates
  'AF', // Afghanistan
  'AM', // Armenia
  'AZ', // Azerbaijan
  'BD', // Bangladesh
  'BH', // Bahrain
  'BN', // Brunei
  'BT', // Bhutan
  'CN', // China
  'CY', // Cyprus
  'GE', // Georgia
  'HK', // Hong Kong
  'ID', // Indonesia
  'IL', // Israel
  'IN', // India
  'IQ', // Iraq
  'IR', // Iran
  'JO', // Jordan
  'JP', // Japan
  'KG', // Kyrgyzstan
  'KH', // Cambodia
  'KP', // North Korea
  'KR', // South Korea
  'KW', // Kuwait
  'KZ', // Kazakhstan
  'LA', // Laos
  'LB', // Lebanon
  'LK', // Sri Lanka
  'MM', // Myanmar
  'MN', // Mongolia
  'MO', // Macao
  'MV', // Maldives
  'MY', // Malaysia
  'NP', // Nepal
  'OM', // Oman
  'PH', // Philippines
  'PK', // Pakistan
  'PS', // Palestine
  'QA', // Qatar
  'SA', // Saudi Arabia
  'SG', // Singapore
  'SY', // Syria
  'TH', // Thailand
  'TJ', // Tajikistan
  'TL', // Timor-Leste
  'TM', // Turkmenistan
  'TR', // Turkey
  'TW', // Taiwan
  'UZ', // Uzbekistan
  'VN', // Vietnam
  'YE', // Yemen
]);

/**
 * Maps non-Asian ISO 3166-1 alpha-2 country codes to their official national language.
 */
const COUNTRY_TO_LANG: Record<string, SupportedLang> = {
  // German-speaking Europe
  DE: 'de',
  AT: 'de',
  LI: 'de',
  CH: 'de',
  LU: 'fr',

  // French-speaking Europe, Americas & Africa
  FR: 'fr',
  MC: 'fr',
  HT: 'fr',
  SN: 'fr',
  CI: 'fr',
  CM: 'fr',
  CD: 'fr',
  CG: 'fr',
  BF: 'fr',
  ML: 'fr',
  NE: 'fr',
  TG: 'fr',
  BJ: 'fr',
  GA: 'fr',
  MG: 'fr',
  RE: 'fr',
  GP: 'fr',
  MQ: 'fr',
  GF: 'fr',
  NC: 'fr',
  PF: 'fr',
  PF2: 'fr',
  TD: 'fr',
  CF: 'fr',
  GN: 'fr',
  RW: 'fr',
  BI: 'fr',

  // Spanish-speaking Europe & Latin America
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  PR: 'es',
  GQ: 'es',

  // Portuguese-speaking Europe, Americas & Africa
  BR: 'pt',
  PT: 'pt',
  AO: 'pt',
  MZ: 'pt',
  CV: 'pt',
  GW: 'pt',
  ST: 'pt',

  // Italian
  IT: 'it',
  SM: 'it',
  VA: 'it',

  // Dutch
  NL: 'nl',
  BE: 'nl',
  SR: 'nl',
  CW: 'nl',
  AW: 'nl',

  // Polish
  PL: 'pl',

  // Russian / Ukrainian
  RU: 'ru',
  BY: 'ru',
  UA: 'uk',

  // Nordic
  SE: 'sv',
  AX: 'sv',
  NO: 'no',
  SJ: 'no',
  DK: 'da',
  FO: 'da',
  GL: 'da',
  FI: 'fi',

  // Central / Eastern Europe & Greece
  CZ: 'cs',
  SK: 'cs',
  RO: 'ro',
  MD: 'ro',
  HU: 'hu',
  GR: 'el',

  // Arabic (North & Northeast Africa; Asian Arab nations stay English per Asia exclusion)
  EG: 'ar',
  MA: 'ar',
  DZ: 'ar',
  TN: 'ar',
  LY: 'ar',
  SD: 'ar',
  MR: 'ar',
  SO: 'ar',
  DJ: 'ar',
  KM: 'ar',

  // Explicitly English-speaking regions outside Asia
  US: 'en',
  GB: 'en',
  UK: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ZA: 'en',
  NG: 'en',
  KE: 'en',
  GH: 'en',
  JM: 'en',
  TT: 'en',
  BB: 'en',
  BS: 'en',
  BZ: 'en',
  MT: 'en',
};

export function isSupportedLang(value: string | null | undefined): value is SupportedLang {
  if (!value) return false;
  return (SUPPORTED_LANGS as readonly string[]).includes(value);
}

export function isAsianCountryOrContinent(
  countryCode?: string | null,
  continentCode?: string | null
): boolean {
  const cc = countryCode?.trim().toUpperCase();
  const cont = continentCode?.trim().toUpperCase();
  if (cont === 'AS') return true;
  if (cc && ASIAN_COUNTRY_CODES.has(cc)) return true;
  return false;
}

/**
 * Resolves the visitor's site language based on Geo-IP country and continent.
 * Any location in Asia returns 'en'. Outside Asia, returns the country's
 * official language (falling back to navigator language hints for multilingual countries like CH/BE/CA).
 */
export function resolveLangFromGeo(
  countryCode?: string | null,
  continentCode?: string | null,
  navigatorLanguageHint?: string | null
): SupportedLang {
  if (isAsianCountryOrContinent(countryCode, continentCode)) {
    return 'en';
  }

  const cc = countryCode?.trim().toUpperCase() || '';
  const navBase = navigatorLanguageHint?.trim().toLowerCase().split(/[-_]/)[0] || '';

  // Respect official co-languages in multilingual countries outside Asia when browser matches
  if (cc === 'CH' && (navBase === 'de' || navBase === 'fr' || navBase === 'it')) {
    return navBase;
  }
  if (cc === 'BE' && (navBase === 'nl' || navBase === 'fr' || navBase === 'de')) {
    return navBase;
  }
  if (cc === 'CA' && (navBase === 'en' || navBase === 'fr')) {
    return navBase;
  }
  if (cc === 'LU' && (navBase === 'fr' || navBase === 'de')) {
    return navBase;
  }

  if (cc && COUNTRY_TO_LANG[cc]) {
    return COUNTRY_TO_LANG[cc];
  }

  return 'en';
}

/**
 * Fast initial synchronous guess before Geo-IP resolves so first paint has zero blocking.
 * Strictly honors Asia timezone exclusion.
 */
export function guessInitialLangClient(): SupportedLang {
  if (typeof window === 'undefined') return 'en';

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Asia/')) {
      return 'en';
    }
    // Check common European / Americas timezone hints while Geo-IP confirms
    if (tz === 'Europe/Berlin' || tz === 'Europe/Vienna' || tz === 'Europe/Zurich') return 'de';
    if (tz === 'Europe/Paris' || tz === 'Europe/Monaco') return 'fr';
    if (tz === 'Europe/Madrid' || tz === 'America/Mexico_City' || tz === 'America/Argentina/Buenos_Aires' || tz === 'America/Bogota' || tz === 'America/Santiago' || tz === 'America/Lima') return 'es';
    if (tz === 'America/Sao_Paulo' || tz === 'Europe/Lisbon') return 'pt';
    if (tz === 'Europe/Rome') return 'it';
    if (tz === 'Europe/Amsterdam' || tz === 'Europe/Brussels') return 'nl';
    if (tz === 'Europe/Warsaw') return 'pl';
    if (tz === 'Europe/Moscow') return 'ru';
    if (tz === 'Europe/Kiev' || tz === 'Europe/Kyiv') return 'uk';
    if (tz === 'Europe/Stockholm') return 'sv';
    if (tz === 'Europe/Oslo') return 'no';
    if (tz === 'Europe/Copenhagen') return 'da';
    if (tz === 'Europe/Helsinki') return 'fi';
    if (tz === 'Europe/Prague') return 'cs';
    if (tz === 'Europe/Bucharest') return 'ro';
    if (tz === 'Europe/Budapest') return 'hu';
    if (tz === 'Europe/Athens') return 'el';
    if (tz === 'Africa/Cairo' || tz === 'Africa/Casablanca' || tz === 'Africa/Algiers' || tz === 'Africa/Tunis') return 'ar';

    const navLang = navigator.language?.toLowerCase().split(/[-_]/)[0];
    if (isSupportedLang(navLang) && !tz.startsWith('Asia/')) {
      return navLang;
    }
  } catch {
    // Ignore environment restrictions
  }
  return 'en';
}
