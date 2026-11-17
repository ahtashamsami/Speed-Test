import type { TranslationPack } from '../types';

export const csPack: TranslationPack = {
  meta: {
    lang: 'cs',
    intlLocale: 'cs-CZ',
    dir: 'ltr',
    nativeName: 'Čeština',
  },
  seo: {
    home: {
      title: 'TestLine — Test rychlosti internetu & Vyhledání veřejné IP',
      description:
        'Změřte rychlost stahování a nahrávání, ping a jitter a zkontrolujte svou veřejnou IPv4/IPv6 adresu, polohu ISP, latenci DNS a stav VPN.',
      keywords:
        'test rychlosti internetu, jaká je moje ip, veřejná ip adresa, rychlost stahování, rychlost nahrávání, ping test, jitter, ipv4, ipv6, kontrola vpn',
      breadcrumbLabel: 'Test rychlosti',
    },
    news: {
      title: 'Kyberbezpečnost, Sítě & Tech novinky | TestLine',
      description:
        'Čtěte živé RSS zprávy o kyberbezpečnosti, internetu, DNS, BGP a technologiích ze zdrojů Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch a Ars Technica.',
      keywords: 'kyberbezpečnost zprávy, síťová bezpečnost rss, technické novinky',
      breadcrumbLabel: 'Zprávy',
    },
    blog: {
      title: 'Průvodce rychlostí internetu, IP adresami & VPN | TestLine',
      description:
        'Prozkoumejte 10 odborných článků o rychlosti internetu, rozdílu Mbps vs. MB/s, IPv4 a IPv6, IP podvodech, geolokaci, bufferbloatu a detekci VPN.',
      keywords: 'průvodce rychlostí internetu, mbps vs mbs, ping a jitter, ipv4 vs ipv6, cgnat, ip podvody',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'O službě TestLine — Test rychlosti & IP diagnostika',
      description:
        'Zjistěte, jak TestLine od ECORZO LLC měří šířku pásma, ping, jitter, dual-stack IPv4/IPv6, latenci DoH DNS a příznaky VPN nebo proxy.',
      keywords: 'o testline, ecorzo llc, metodika testu rychlosti, ip diagnostika, doh latence',
      breadcrumbLabel: 'O nás',
    },
    privacy: {
      title: 'Zásady ochrany osobních údajů — TestLine',
      description:
        'Přečtěte si zásady ochrany osobních údajů TestLine od ECORZO LLC týkající se dočasného zpracování IP, nulového ukládání logů, GDPR a cookies.',
      keywords: 'testline ochrana soukromí, ecorzo llc soukromí, gdpr test rychlosti',
      breadcrumbLabel: 'Soukromí',
    },
    contact: {
      title: 'Kontaktujte TestLine & ECORZO LLC — Podpora sítě',
      description:
        'Kontaktujte ECORZO LLC ohledně testu rychlosti TestLine, zjištění IP, soukromí nebo GDPR. Volejte +1 646 427 6802 nebo napište do naší kanceláře v New Yorku.',
      keywords: 'kontakt testline, ecorzo llc new york, podpora síťové diagnostiky',
      breadcrumbLabel: 'Kontakt',
    },
    disclaimer: {
      title: 'Právní upozornění — Test rychlosti & IP vyhledání | TestLine',
      description:
        'Seznamte se s proměnnými testu rychlosti, omezeními Wi-Fi, přesností geolokace IP a detekcí VPN/proxy na TestLine od ECORZO LLC.',
      keywords: 'vyloučení odpovědnosti test rychlosti, geolokace ip, testline ecorzo llc',
      breadcrumbLabel: 'Upozornění',
    },
    terms: {
      title: 'Obchodní podmínky — TestLine od ECORZO LLC',
      description:
        'Přečtěte si podmínky upravující používání testu rychlosti internetu TestLine a veřejné IP diagnostiky provozované společností ECORZO LLC.',
      keywords: 'testline podmínky používání, ecorzo llc podmínky',
      breadcrumbLabel: 'Podmínky',
    },
    'cookies-policy': {
      title: 'Zásady používání cookies & Lokální úložiště — TestLine',
      description:
        'Prohlédněte si přesné klíče lokálního úložiště prohlížeče a informace o cookies používané službou TestLine od ECORZO LLC podle GDPR.',
      keywords: 'testline cookies politika, localstorage, google consent mode v2',
      breadcrumbLabel: 'Cookies',
    },
    'cookies-notice': {
      title: 'Oznámení o cookies & Nastavení souhlasu — TestLine',
      description:
        'Spravujte kdykoli své předvolby cookies, analytiky a lokálního úložiště pro TestLine od ECORZO LLC.',
      keywords: 'nastavení cookies, správa souhlasu testline',
      breadcrumbLabel: 'Nastavení cookies',
    },
    gdpr: {
      title: 'GDPR & Zásady shromažďování údajů — TestLine',
      description:
        'Prozkoumejte právní základy ECORZO LLC podle čl. 6 GDPR, minimalizaci údajů, mezinárodní přenosy a práva uživatelů.',
      keywords: 'testline gdpr politika, ecorzo llc ochrana údajů, článek 6 gdpr',
      breadcrumbLabel: 'GDPR & Údaje',
    },
  },
  nav: {
    speedTest: 'Test rychlosti',
    news: 'Zprávy',
    blog: 'Blog',
    about: 'O nás',
    contact: 'Kontakt',
    privacy: 'Soukromí',
    stopTest: 'Zastavit test',
    newBadgeSuffix: 'nové',
    homeAria: 'Domovská stránka TestLine',
    primaryNavAria: 'Hlavní navigace',
    mobileNavAria: 'Mobilní navigace',
    companyMenuAria: 'Nabídka TestLine: O nás, Kontakt a Soukromí',
  },
  pwa: {
    installApp: 'Nainstalovat aplikaci',
    installAria: 'Nainstalovat aplikaci TestLine',
    installIosAria: 'Nainstalovat TestLine na iPhone nebo iPad',
    iosTitle: 'Instalace TestLine na iPhone / iPad',
    closeDialog: 'Zavřít okno',
    iosStep1Prefix: 'Klepněte na tlačítko',
    iosStep1Strong: 'Sdílet',
    iosStep1Suffix: 'na liště prohlížeče Safari.',
    iosStep2Prefix: 'Posuňte dolů a klepněte na',
    iosStep2Strong: 'Přidat na plochu',
    iosStep2Suffix: '.',
    iosStep3:
      'Otevřete TestLine kdykoli — i bez internetu se automaticky spustí hra Signal Runner.',
    gotIt: 'Rozumím',
  },
  hero: {
    title: 'Test rychlosti internetu & Veřejná IP adresa',
    subtitle:
      'Zkontrolujte rychlost stahování i nahrávání, ping a jitter — plus svou IPv4/IPv6 adresu, polohu ISP, latenci DNS a stav VPN.',
    speedUnitAria: 'Jednotka rychlosti',
    autoTooltip: 'Automaticky používá Mbps pod 100 Mbps a MB/s od 100 Mbps výše',
    auto: 'Auto',
    lightMode: 'Světlý režim',
    darkMode: 'Tmavý režim',
    switchToLight: 'Přepnout na světlý režim',
    switchToDark: 'Přepnout na tmavý režim',
    exportPdf: 'Exportovat PDF',
    exportingPdf: 'Exportuji...',
    exportDisabledTitle: 'Nejprve spusťte test rychlosti pro export PDF zprávy',
    exportEnabledTitle: 'Exportovat PDF zprávu o rychlosti a diagnostice sítě',
  },
  duplicateModal: {
    title: 'Zpráva již byla stažena',
    closeDialog: 'Zavřít okno',
    body: 'Zprávu pro tento test jste již stáhli. Chcete ji stáhnout znovu?',
    notePrefix: 'Opakovaně stažené kopie jsou zřetelně označeny jako',
    secondCopy: 'Druhá kopie',
    noteSuffix: 'v dokumentu.',
    cancel: 'Ne, zrušit',
    confirm: 'Ano, stáhnout znovu',
  },
  speedStage: {
    startSpeedTest: 'Spustit test rychlosti',
    yourSpeedIs: 'Vaše rychlost internetu je',
    stopAria: 'Zastavit test rychlosti',
    startAria: 'Spustit test rychlosti',
    retry: 'Opakovat',
    statusIdle: 'Klikněte na Přehrát pro spuštění testu',
    statusPing: 'Měření pingu & jitteru...',
    statusDownload: 'Testování rychlosti stahování...',
    statusUpload: 'Testování rychlosti nahrávání...',
    statusComplete: 'Test rychlosti dokončen',
    statusStopped: 'Test zastaven',
    statusError: 'Test přerušen',
    uploadSpeed: 'Rychlost nahrávání',
    peakPrefix: 'Špička',
    twoStreams: '2 paralelní proudy',
    latencyAvgPing: 'Odezva (Průměrný ping)',
    minPrefix: 'Min',
    probesSuffix: 'měření',
    fiveProbes: '5 RTT sond Cloudflare',
    jitter: 'Jitter',
    consecutiveVariance: 'Kolísání mezi pakety',
    waitingRtt: 'Čekání na RTT vzorky',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Upozornění na detekci proxy nebo VPN',
    categories: {
      'VPN / Proxy Detected': 'Detekována VPN / Proxy',
      'Datacenter / Relay Network': 'Datacentrum / Přenosová síť',
      'Timezone Mismatch (Possible VPN)': 'Neshoda časového pásma (Možná VPN)',
      'Direct Connection': 'Přímé připojení',
    },
    confidence: {
      High: 'Vysoká',
      Moderate: 'Střední',
      Low: 'Nízká',
    },
    confidenceWord: 'spolehlivost',
    signalSingular: 'signál',
    signalPlural: 'signály',
    noticeDesc:
      'Vaše připojení vykazuje znaky proxy, VPN nebo datacentra. Naměřené rychlosti odrážejí aktivní tunel nebo výstupní uzel.',
    observedExitIp: 'Zjištěná výstupní IP',
    relayOperator: 'Operátor sítě / přenosu',
    exitLocationTz: 'Výstupní poloha & časové pásmo',
    detectedIndicators: 'Zjištěné indikátory',
    unavailable: 'Nedostupné',
    signalTemplates: {
      proxy_flag: 'IP adresa je označena jako aktivní výstup proxy, VPN nebo Tor',
      hosting_flag:
        'Provoz pochází z ASN datacentra nebo hostingu namísto běžného poskytovatele internetu',
      provider_keyword: 'Operátor sítě / PTR odpovídá klíčovému slovu přenosu ({1})',
      via_header: 'Zjištěna hlavička předání proxy ({1})',
      multi_hop: 'Zjištěno více přenosových skoků ({1} skoků)',
      ip_mismatch: 'Přímá IP prohlížeče se liší od IP zjištěné na okraji sítě (split-tunnel nebo proxy)',
      timezone_mismatch:
        'Časové pásmo prohlížeče ({1}) se liší od časového pásma IP geolokace ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Veřejná IP adresa',
    resolvingRoute: 'Zjišťuji trasu',
    routeSuffix: 'trasa',
    updatedPrefix: 'Aktualizováno',
    unavailable: 'Nedostupné',
    metadataUnavailable: 'Metadata sítě nejsou dostupná',
    copyIp: 'Kopírovat IP',
    copiedIp: 'IP zkopírována',
    refresh: 'Obnovit',
    ipv46CardTitle: 'IPv4, IPv6 & Směrování operátora',
    ipv46CardSubtitle: 'Klientské dual-stack testy v kombinaci s geolokací IP',
    ipv4Label: 'IPv4 adresa',
    ipv6Label: 'IPv6 adresa',
    notDetected: 'Nezjištěno',
    ipv6NotDetected: 'Nezjištěno (pouze IPv4 trasa)',
    ispLabel: 'Poskytovatel (ISP)',
    asnLabel: 'Autonomní systém (ASN)',
    locationLabel: 'Přibližná poloha',
    proxyCheckLabel: 'Kontrola Proxy / VPN',
    resolving: 'Zjišťování...',
    inspecting: 'Analyzování...',
    directConnectionNone: 'Přímé připojení (Nic nezjištěno)',
    dnsCardTitle: 'DNS tipy & Diagnostika linky',
    dnsCardSubtitle: 'Reverzní záznam PTR, dostupnost DoH a signály přenosu v prohlížeči',
    ptrLabel: 'Reverzní DNS (PTR)',
    noPtr: 'Žádný záznam PTR není publikován',
    dohProbeLabel: 'Test DoH resolveru',
    probing: 'Testuji...',
    reachable: 'Dostupný',
    blockedOrUnreachable: 'Blokovaný nebo nedostupný',
    dnsLatencyLabel: 'Latence DNS dotazu',
    protocolLabel: 'Přenosový protokol',
    checking: 'Kontroluji...',
    linkHintLabel: 'Indikátor linky prohlížeče',
    exposedNoMetrics: 'Vystaveno bez metrik',
    notExposed: 'Prohlížeč údaj nesdílí',
    timezoneLabel: 'Časové pásmo',
    copy: 'Kopírovat',
    copied: 'Zkopírováno',
    capSuffix: 'Mbps limit',
    rttSuffix: 'ms RTT',
    fetchError: 'Nelze se spojit s body IP diagnostiky.',
  },
  history: {
    title: 'Historie měření relace',
    subtitle: 'Nedávná měření uložená lokálně ve vašem prohlížeči',
    clearHistory: 'Vymazat historii',
    emptyText: 'Dokončené testy rychlosti se zobrazí zde, abyste mohli porovnávat výsledky.',
    colTime: 'Čas',
    colDownload: 'Stahování',
    colUpload: 'Nahrávání',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Veřejná IP',
  },
  consent: {
    title: 'Oznámení o cookies & soukromí',
    description:
      'TestLine používá nezbytné lokální úložiště pro motiv, jednotky a historii. Volitelné analytické a reklamní cookies zůstávají vypnuté, dokud je nepřijmete.',
    acceptAll: 'Přijmout vše',
    essentialOnly: 'Pouze nezbytné',
    cookieSettings: 'Nastavení cookies',
  },
  footer: {
    byEcorzo: 'od ECORZO LLC',
    tagline:
      'Měření rychlosti internetu v reálném čase a dual-stack IP síťová diagnostika provozovaná společností ECORZO LLC.',
    companyHeading: 'Společnost',
    legalHeading: 'Právní informace & Soulad',
    disclaimer: 'Právní upozornění',
    terms: 'Obchodní podmínky',
    cookiesPolicy: 'Zásady cookies',
    cookiesNotice: 'Oznámení o cookies',
    gdpr: 'GDPR & Zásady údajů',
    privacy: 'Zásady ochrany soukromí',
    copyrightSuffix: 'ECORZO LLC. Všechna práva vyhrazena.',
    poweredBy:
      'Měření využívá uzly Cloudflare · V souladu s GDPR a zásadami Google',
    languageLabel: 'Jazyk',
    autoOption: 'Auto (Region)',
  },
  news: {
    eyebrow: 'Živý RSS agregátor kyberbezpečnosti & technologií',
    updatedPrefix: 'Aktualizováno',
    title: 'Síťové, bezpečnostní & tech novinky',
    filterPlaceholder: 'Filtrovat titulky...',
    filterAria: 'Filtrovat novinové titulky',
    refreshFeeds: 'Obnovit kanály',
    refreshing: 'Obnovuji...',
    cachedBannerPrefix:
      'Živé RSS kanály jsou momentálně nedostupné. Zobrazují se nedávné zprávy uložené v tomto zařízení',
    retryLive: 'Zkusit živé znovu',
    retrying: 'Zkouším...',
    allSources: 'Všechny zdroje',
    errorFallback:
      'Živé RSS kanály se právě nepodařilo načíst. Zkontrolujte připojení a zkuste obnovit.',
    tryAgain: 'Zkusit znovu',
    emptyText: 'V aktuálních RSS kanálech nebyly nalezeny žádné odpovídající články.',
    showAll: 'Zobrazit všechny zdroje',
    newTag: 'Nové',
    readFullStory: 'Přečíst celý článek',
    recent: 'Nedávno',
    minutesAgo: 'před {n} m',
    hoursAgo: 'před {n} h',
  },
  blog: {
    eyebrow: 'Průvodce TestLine & Denní přehled horkých zpráv',
    articlesCountSuffix: 'Článků',
    title: 'Rychlost internetu, IP diagnostika & Denní přehledy',
    subtitle:
      'Podrobné články o rychlosti internetu, IPv4/IPv6, IP podvodech, geolokaci IP a detekci VPN — plus 2 denní horké zprávy automaticky vybrané z našich RSS kanálů.',
    searchPlaceholder: 'Hledat v {n} článcích...',
    searchAria: 'Hledat články na blogu',
    allLabel: 'Vše',
    hotNewsLabel: 'Horké zprávy',
    dailyHotNewsBadge: 'Denní horká zpráva',
    emptyText: 'Žádný článek neodpovídá aktuálnímu filtru.',
    resetFilters: 'Resetovat filtry',
    newTag: 'Nové',
    readArticle: 'Číst článek',
    backToAllPrefix: 'Zpět na všechny',
    backToAllSuffix: 'články',
    originalSourcePrefix: 'Původní zdroj',
    testConnectionNow: 'Otestovat připojení nyní',
    keyTakeaways: 'Hlavní poznatky',
    dailyReadTime: '3 min čtení',
    dailyAuthorPrefix: 'TestLine Denní Přehled · přes',
    dailyTakeawayFeatured: 'Zařazeno do denního přehledu TestLine ({source}) v kategorii {topic}.',
    dailyTakeawaySummaryPrefix: 'Hlavní shrnutí:',
    dailyTakeawayTip:
      'Před řešením neočekávaných síťových upozornění si vždy ověřte svou veřejnou IPv4/IPv6 adresu, latenci DNS a stav VPN/proxy.',
    dailySectionBriefingPrefix: 'Denní přehled:',
    dailyBriefingPara2:
      'Automaticky vybráno pro denní souhrn TestLine ke dni {date} na základě aktuálnosti a dopadu na sítě a kyberbezpečnost. Původní technickou zprávu si můžete otevřít přes odkaz na zdroj výše.',
    dailySectionActionTitle: 'Síťová diagnostika & Praktický postup',
    dailyActionPara1:
      'Události týkající se {topic} často ovlivňují DNS resolvery poskytovatelů, směrovací tabulky, firemní VPN brány i koncová zařízení. Okamžitý test rychlosti a dual-stack IP kontrola potvrdí, zda na lince dochází k vyššímu jitteru nebo změně proxy.',
    dailyActionPara2:
      'Sledujte nové zranitelnosti a výpadky internetu v živých RSS kanálech na kartě Zprávy i v našich stálých průvodcích na blogu.',
    categories: {
      'Hot News': 'Horké zprávy',
      'Internet Speed': 'Rychlost internetu',
      'IP Addresses': 'IP adresy',
      'IP Scams': 'IP podvody',
      'IP Location': 'IP poloha',
      'VPN IP Status': 'Stav VPN IP',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Proč se vaše skutečná rychlost stahování liší od tarifu poskytovatele',
        readTime: '5 min čtení',
        author: 'TestLine Inženýring',
        summary:
          'Zjistěte, proč 500 Mbps linka stahuje soubory rychlostí 50–60 MB/s, jak režie TCP/TLS ovlivňuje přenos a proč jsou vícevláknové testy přesnější.',
        keyTakeaways: [
          'Poskytovatelé inzerují v megabitech za sekundu (Mbps), zatímco prohlížeče ukazují megabajty za sekundu (MB/s) v poměru 8:1.',
          'Vzdálenost od Wi-Fi, rušení 2,4 GHz a starší router často omezí gigabitové vlákno ještě před sítí ISP.',
          'Paralelní HTTP proudy ukážou skutečnou šířku pásma mnohem lépe než jediný TCP přenos.',
        ],
        sections: [
          {
            heading: 'Megabity (Mbps) vs. Megabajty (MB/s)',
            paragraphs: [
              'Největší zdroj nedorozumění při měření rychlosti je rozdíl mezi bity a bajty. Protože 1 bajt má 8 bitů, 400 Mbps připojení dosahuje teoretického maxima 50 MB/s.',
              'Po započtení ethernetových rámců, IP hlaviček a TLS šifrování činí reálná propustnost zhruba 90–94 % linkové rychlosti.',
            ],
          },
          {
            heading: 'Proč záleží na vícevláknovém testu',
            paragraphs: [
              'Jedno TCP spojení bývá brzděno velikostí okna a odezvou serveru. Tři paralelní proudy linku rovnoměrně vytíží a ukážou skutečnou kapacitu.',
              'Pokud se Wi-Fi výrazně liší od kabelu, zkuste test blízko 5/6 GHz routeru nebo přes kabel Cat6.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter vysvětlen: Co skutečně kazí videohovory a online hry',
        readTime: '5 min čtení',
        author: 'TestLine Inženýring',
        summary:
          'Vysoká rychlost stahování nezachrání hovor na Zoomu ani hru, pokud odezva nepravidelně skáče. Podívejte se na vliv pingu, jitteru a bufferbloatu.',
        keyTakeaways: [
          'Ping měří průměrnou dobu odezvy (RTT) v milisekundách; pod 30 ms působí téměř okamžitě.',
          'Jitter měří rozptyl mezi po sobě jdoucími pakety — nad 20–25 ms způsobuje sekání zvuku.',
          'Velké nahrávání během hovoru vyvolává bufferbloat, pokud router nepoužívá SQM/QoS.',
        ],
        sections: [
          {
            heading: 'Latence je obousměrná odezva',
            paragraphs: [
              'Šířka pásma udává šířku dálnice, zatímco ping měří čas cesty jednoho paketu tam a zpět. Streaming si přednačte vyrovnávací paměť, ale hovory a hry reagují na každou milisekundu.',
            ],
          },
          {
            heading: 'Proč jitter způsobuje výpadky zvuku',
            paragraphs: [
              'Pokud pět měření vrátí 14, 16, 92, 15 a 68 ms, průměr vypadá přijatelně, avšak hlasové kodeky musejí zahazovat pakety.',
              'Smart Queue Management (SQM) brání zálohám na pozadí ucpat interaktivní provoz.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6 vysvětleno: Proč dnes záleží na dual-stack sítích',
        readTime: '6 min čtení',
        author: 'TestLine Síťový výzkum',
        summary:
          'Po vyčerpání globálních adres IPv4 a rozšíření CGNAT u mobilních operátorů je důležité vědět, jak zařízení směruje IPv4 a IPv6.',
        keyTakeaways: [
          'IPv4 využívá 32bitové adresy (~4,3 miliardy), což operátory nutí sdílet adresy přes CGNAT.',
          'IPv6 používá 128bitové hexadecimální adresy pro přímé směrování bez vícevrstvého NAT.',
          'Dual-stack test ověří současnou dostupnost veřejné IPv4 i IPv6 cesty.',
        ],
        sections: [
          {
            heading: 'Realita vyčerpání IPv4 a CGNAT',
            paragraphs: [
              'Vzhledem k nedostatku volných bloků IPv4 umisťují poskytovatelé zákazníky za Carrier-Grade NAT (CGNAT), kde jednu veřejnou IPv4 sdílí desítky domácností.',
            ],
          },
          {
            heading: 'Jak dual-stack zrychluje spojení',
            paragraphs: [
              'Moderní systémy preferují IPv6 pomocí Happy Eyeballs, čímž obcházejí překladové tabulky CGNAT a riziko cizího zablokování sdílené IP.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Veřejná IP vs. Soukromá IP & Jak reverzní DNS (PTR) určuje operátory',
        readTime: '4 min čtení',
        author: 'TestLine Síťový výzkum',
        summary:
          'Proč telefon na Wi-Fi ukazuje 192.168.1.45, zatímco weby vidí zcela jinou veřejnou IP — a co odhalí PTR záznam o vašem ISP.',
        keyTakeaways: [
          'Soukromé rozsahy RFC 1918 (10.x, 172.16–31.x, 192.168.x) existují jen uvnitř domácí nebo firemní sítě.',
          'Router nahrazuje lokální adresu veřejnou IP adresou operátora pomocí překladu NAT.',
          'Reverzní DNS (PTR) převádí veřejnou IP zpět na název hostitele s informací o oblasti a typu přípojky.',
        ],
        sections: [
          {
            heading: 'Uvnitř routeru vs. na veřejném internetu',
            paragraphs: [
              'Vnitřní adresa 192.168.1.24 není na internetu směrovatelná. Při odchozí komunikaci NAT přepíše hlavičku na vaši veřejnou WAN IP.',
            ],
          },
          {
            heading: 'Čtení vodítek z reverzního DNS (PTR)',
            paragraphs: [
              'Operátoři publikují popisné PTR názvy, které spolu s ASN odlišují rezidenční optiku od cloudových serverů.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Jak poznat falešná okna „Vaše IP byla napadena“ a podvodnou podporu',
        readTime: '5 min čtení',
        author: 'TestLine Bezpečnostní tým',
        summary:
          'Podvodná vyskakovací okna zobrazují vaši skutečnou IP a město k vyvolání paniky. Zjistěte, proč každý web vaši IP automaticky vidí.',
        keyTakeaways: [
          'Každý navštívený web dostává vaši veřejnou IP v rámci běžného HTTP přenosu — její zobrazení není důkazem napadení.',
          'Falešná varování před viry tlačí oběti k telefonátu na falešnou podporu nebo instalaci vzdálené správy.',
          'Samotná IP adresa neprozradí vaše jméno, ulici, bankovní údaje ani soubory.',
        ],
        sections: [
          {
            heading: 'Proč je zobrazení IP psychologický trik',
            paragraphs: [
              'Škodlivé reklamy zobrazují červené bannery s vaším městem a IP. Webový server však vaši IP potřebuje jen proto, aby vám mohl poslat stránku.',
            ],
          },
          {
            heading: 'Co IP adresa prozradí — a co nikoli',
            paragraphs: [
              'Veřejná IP ukazuje jen uzel operátora a širší město. Kartu zavřete a nikdy cizím osobám nesdělujte přístup přes AnyDesk či TeamViewer.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP spoofing, padělání hlaviček & zneužití rezidenčních proxy vysvětleno',
        readTime: '6 min čtení',
        author: 'TestLine Bezpečnostní tým',
        summary:
          'Od falešných hlaviček X-Forwarded-For po „bezplatné VPN“ aplikace, které potichu mění domácí přípojku v proxy výstupní uzel.',
        keyTakeaways: [
          'Padělaná TCP adresa nedokáže navázat HTTPS spojení, takže útočníci zneužívají napadená zařízení a pochybná SDK v aplikacích.',
          'Některá bezplatná rozšíření nebo APK tajně pronajímají vaši domácí IP jinému provozu.',
          'Kontrola PTR, ASN a hlaviček ověří čistotu odchozího směrování.',
        ],
        sections: [
          {
            heading: 'Skrytá cena bezplatných proxy aplikací',
            paragraphs: [
              'Domácí IP adresy mají vysokou důvěryhodnost. Nedůvěryhodné doplňky někdy posílají cizí provoz přes router nic netušícího uživatele.',
            ],
          },
          {
            heading: 'Ověření čistého odchozího směrování',
            paragraphs: [
              'Pravidelně kontrolujte doplňky prohlížeče, vypínejte nepotřebné UPnP a spusťte test IP a proxy.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Jak funguje IP geolokace — a proč bývá město často o desítky km vedle',
        readTime: '5 min čtení',
        author: 'TestLine Síťový výzkum',
        summary:
          'IP adresy neobsahují souřadnice GPS. Zjistěte, jak databáze GeoIP mapují rozsahy a proč mobilní připojení často ukazuje jiný kraj.',
        keyTakeaways: [
          'IP geolokace vychází z registrů RIR, BGP směrování a dat operátorů nikoli z GPS.',
          'Mobilní sítě vedou LTE a 5G provoz přes centrální brány daleko od uživatele.',
          'Přesnost na úrovni státu přesahuje 98 %, zatímco přesnost na ulici je mýtus.',
        ],
        sections: [
          {
            heading: 'V IP paketech žádné GPS není',
            paragraphs: [
              'Weby určují polohu IP ze záznamů WHOIS a směrovacích tabulek operátorů.',
            ],
          },
          {
            heading: 'Proč mobilní a optické IP mění město',
            paragraphs: [
              'Pokud operátor směruje 5G přes bránu v Praze, i uživatel v Brně uvidí v IP nástrojích Prahu, dokud se databáze neobnoví.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Neshoda časových pásem & Směrování ISP: Proč vás weby řadí jinam',
        readTime: '4 min čtení',
        author: 'TestLine Síťový výzkum',
        summary:
          'Proč bezpečnostní filtry porovnávají hodiny prohlížeče s časovým pásmem IP — a kdy běžné směrování způsobí falešnou shodu.',
        keyTakeaways: [
          'Platební brány srovnávají časové pásmo Intl prohlížeče s pásmem IP geolokace.',
          'Firemní VPN nebo roamingové SIM mohou způsobit neškodné odchylky.',
          'TestLine přehledně zobrazuje obě časová pásma vedle sebe.',
        ],
        sections: [
          {
            heading: 'Jak funguje srovnání časových pásem',
            paragraphs: [
              'Pasivní kontrola porovnává systémové pásmo prohlížeče s oblastí přiřazenou vaší veřejné IP adrese.',
            ],
          },
          {
            heading: 'Falešné poplachy u hranic a při roamingu',
            paragraphs: [
              'Cestující na roamingu si často ponechávají domovskou bránu operátora včetně domovského časového pásma.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Jak webové stránky poznají VPN, proxy nebo IP adresu datacentra',
        readTime: '6 min čtení',
        author: 'TestLine Bezpečnostní tým',
        summary:
          'Zajímá vás, proč banky a streamovací služby poznají zapnutou VPN? Toto jsou čtyři hlavní technické signály.',
        keyTakeaways: [
          'Čísla ASN okamžitě odliší cloudové poskytovatele (M247, DigitalOcean, Hetzner, AWS) od domácích ISP.',
          'Hlavičky Via a víceúrovňové X-Forwarded-For odhalují proxy servery.',
          'Vzory PTR a časová pásma zpřesňují hodnocení spolehlivosti.',
        ],
        sections: [
          {
            heading: 'Klasifikace ASN: Nejsilnější signál',
            paragraphs: [
              'Každá IP spadá pod konkrétní ASN. Protože komerční VPN pronajímají servery v datacentrech, jsou rozpoznány během milisekund.',
            ],
          },
          {
            heading: 'PTR názvy, hlavičky a chování',
            paragraphs: [
              'Kombinace ASN, klíčových slov PTR, HTTP hlaviček a časových pásem přesně ukazuje, co tunel odhaluje.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'Úniky DNS, úniky IPv6 & Split Tunneling: Test skutečného stavu VPN',
        readTime: '5 min čtení',
        author: 'TestLine Bezpečnostní tým',
        summary:
          'I se zapnutou VPN mohou nešifrované DNS dotazy nebo netunelovaná IPv6 potichu odhalit vaši polohu. Naučte se tunel ověřit.',
        keyTakeaways: [
          'Únik IPv6 nastává, když VPN šifruje jen IPv4, ale operátor posílá IPv6 napřímo.',
          'Únik DNS posílá překlad domén místnímu ISP mimo VPN tunel.',
          'Test IPv4/IPv6 cest i Cloudflare DoH ověří celistvost tunelu.',
        ],
        sections: [
          {
            heading: 'Past dual-stack úniku přes IPv6',
            paragraphs: [
              'Starší VPN klienti vytvářejí jen IPv4 rozhraní. V moderních sítích pak prohlížeč obejde tunel přes nativní IPv6.',
            ],
          },
          {
            heading: 'Kontrola stavu tunelu za pár sekund',
            paragraphs: [
              'Spusťte test na TestLine se zapnutou VPN a ověřte, že obě IP patří VPN výstupu a šifrované DoH funguje správně.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet obnoven',
    offlineMode: 'Offline režim — Internet odpojen',
    connectionActive: 'Připojení je opět aktivní',
    playWhileWaiting: 'Zahrajte si Signal Runner během čekání na připojení',
    score: 'Skóre',
    best: 'Rekord',
    muteAria: 'Ztlumit zvuk hry',
    unmuteAria: 'Zapnout zvuk hry',
    pauseAria: 'Pozastavit hru',
    resumeAria: 'Pokračovat ve hře',
    returnToSpeedTest: 'Zpět na test rychlosti',
    checking: 'Kontroluji...',
    checkConnection: 'Zkontrolovat připojení',
    canvasAria: 'Herní plocha offline hry Signal Runner',
    title: 'Signal Runner',
    subtitle:
      'Přeskakujte věže, hroty a drony, dokud se neobnoví internet. Dvojitý skok je povolen.',
    startGame: 'Spustit hru',
    tapHint: 'Klepněte na obrazovku nebo stiskněte Mezerník / Šipku nahoru pro skok',
    paused: 'Hra pozastavena',
    resume: 'Pokračovat',
    gameOver: 'Signál přerušen',
    cleared: 'Překonáno:',
    newBest: 'Nový rekord!',
    playAgain: 'Hrát znovu',
    backToSpeedTest: 'Zpět na test rychlosti',
    jump: 'Skok',
    fastDrop: 'Rychlý pád',
    desktopHintPrefix: 'Klávesnice:',
    desktopJump: 'Skok',
    desktopDrop: 'Pád',
    desktopPause: 'Pauza',
  },
  faq: {
    tableTitle: 'Přehled parametrů testu rychlosti & IP vyhledání',
    tableSubtitle:
      'TestLine od ECORZO LLC měří živou rychlost stahování/nahrávání, latenci ping, jitter, veřejné IPv4/IPv6 adresy, geolokaci IP, rychlost DNS a indikátory VPN nebo proxy.',
    readGuidesLink: 'Přečíst 10 průvodců rychlostí & IP',
    colMetric: 'Metrika',
    colMethod: 'Metoda měření',
    colThreshold: 'Cílová hodnota',
    colImpact: 'Hlavní dopad',
    benchmarks: [
      {
        metric: 'Rychlost stahování (Mbps / MB/s)',
        method: '3 paralelní 25 MB HTTP proudy (10 s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Více uživatelů)',
        standardUse: 'Streamování, stahování, cloudová synchronizace',
      },
      {
        metric: 'Rychlost nahrávání (Mbps / MB/s)',
        method: '2 paralelní 10 MB XHR POST proudy',
        optimal: '10+ Mbps (HD hovory) · 25+ Mbps (Tvůrci)',
        standardUse: 'Videohovory, zálohy, živé vysílání',
      },
      {
        metric: 'Ping & nezatížená odezva',
        method: '5 po sobě jdoucích 0B RTT sond Cloudflare',
        optimal: '< 30 ms (Nízká) · 30–60 ms (Běžná)',
        standardUse: 'Online hraní, VoIP, svižnost webu',
      },
      {
        metric: 'Jitter & náchylnost k bufferbloatu',
        method: 'Průměrný rozptyl RTT mezi po sobě jdoucími sondami',
        optimal: '< 10 ms (Stabilní) · > 25 ms (Přetížená)',
        standardUse: 'Stabilita zvuku a videa při zátěži',
      },
      {
        metric: 'Latence DoH DNS & PTR vyhledání',
        method: 'Šifrovaný dotaz 1.1.1.1 + Reverzní DNS PTR',
        optimal: '< 40 ms rozlišení DNS',
        standardUse: 'Rychlost překladu domén & ověření ISP',
      },
      {
        metric: 'Dual-Stack IP, Poloha & Stav VPN',
        method: 'IPv4/IPv6 + ISP/ASN + Kontrola hlaviček a času',
        optimal: 'Přímá IP ISP nebo ověřený uzel VPN',
        standardUse: 'Jaká je moje IP, geolokace, kontrola VPN/proxy',
      },
    ],
    faqTitle: 'Často kladené otázky',
    faqSubtitle:
      'Přímé odpovědi k měření rychlosti, veřejné IP, geolokaci, stavu VPN a soukromí',
    newsLink: 'Zprávy o bezpečnosti & sítích',
    methodologyLink: 'Kompletní metodika',
    gdprLink: 'GDPR & Zásady údajů',
    items: [
      {
        question: 'Jaká je má rychlost stahování a nahrávání internetu?',
        answer:
          'Klikněte na Spustit test rychlosti pro změření skutečné rychlosti v Mbps nebo MB/s proti serverům Cloudflare.',
      },
      {
        question: 'Jaká je má veřejná IPv4 a IPv6 adresa?',
        answer:
          'Dual-stack test zjistí obě adresy vedle sebe včetně kopírování, přibližného města, země, ISP a čísla ASN.',
      },
      {
        question: 'Jaké jsou dobré hodnoty pingu, jitteru a bufferbloatu?',
        answer:
          'Nezatížený ping pod 30 ms a jitter pod 10 ms zajišťují plynulé hovory i hraní. Prudké skoky při zátěži značí bufferbloat.',
      },
      {
        question: 'Jak přesná je IP geolokace při zjišťování polohy?',
        answer:
          'Geolokace mapuje blok IP adres k registrovanému městu a státu, nikdy však neukáže přesnou ulici.',
      },
      {
        question: 'Jak TestLine rozpozná VPN, proxy nebo IP datacentra?',
        answer:
          'Kontroluje předávací HTTP hlavičky, hostingové ASN, reverzní záznamy PTR a rozdíly časových pásem.',
      },
      {
        question: 'Co je latence DoH a reverzní DNS (PTR)?',
        answer:
          'DoH latence měří rychlost šifrovaného překladu domén přes Cloudflare 1.1.1.1, zatímco PTR ukazuje název hostitele přiřazený vaší IP.',
      },
      {
        question: 'Ukládá nebo prodává ECORZO LLC mou IP adresu či výsledky?',
        answer:
          'Ne. Měření běží dočasně v paměti a neukládají se na serveru. Historie zůstává pouze ve vašem prohlížeči.',
      },
      {
        question: 'Mohu TestLine nainstalovat jako aplikaci nebo hrát offline?',
        answer:
          'Ano. TestLine je instalovatelná PWA. Při výpadku připojení se automaticky spustí hra Signal Runner.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Zpět na test rychlosti',
    effectiveDatePrefix: 'Datum účinnosti:',
    operatorLabel: 'Provozovatel: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'O službě TestLine',
      subtitle:
        'Vytvořeno společností ECORZO LLC pro transparentní měření rychlosti internetu a veřejnou diagnostiku IPv4/IPv6 bez nutnosti přihlášení.',
      sections: [
        {
          heading: 'Co TestLine měří',
          paragraphs: [
            'TestLine je bezplatný nástroj pro měření rychlosti a zjištění veřejné IP provozovaný společností ECORZO LLC přímo ve vašem prohlížeči.',
          ],
          bullets: [
            { strong: 'Stahování & nahrávání (Mbps / MB/s):', text: 'Paralelní HTTP proudy proti okrajové síti Cloudflare v Auto, Mbps nebo MB/s.' },
            { strong: 'Ping, jitter & zdraví odezvy:', text: 'Sekvenční sondy RTT pro průměrný i minimální ping a rozptyl.' },
            { strong: 'IPv4/IPv6, Poloha, ISP & ASN:', text: 'Současné zjištění IPv4 i IPv6, PTR a šifrované DoH latence.' },
            { strong: 'Detekce VPN, proxy & datacenter:', text: 'Analýza hlaviček, hostingových ASN, PTR a časového pásma.' },
          ],
        },
      ],
      closingTitle: 'Znalostní báze, zprávy & údaje o společnosti',
      closingIntro: 'Prozkoumejte našich',
      closingGuidesLink: '10 průvodců rychlostí, IP, podvody & VPN',
      closingMid: 'nebo sledujte aktuální zprávy z oblasti kyberbezpečnosti v',
      closingNewsLink: 'RSS kanálu TestLine News',
      closingOutro:
        '. TestLine vyvíjí a spravuje ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA. Navštivte naši',
      closingContactLink: 'Kontaktní stránku',
    },
    contact: {
      title: 'Kontaktujte ECORZO LLC',
      subtitle: 'Spojte se s naším týmem ohledně diagnostiky TestLine, soukromí, GDPR nebo právních dotazů.',
      telephone: 'Telefon',
      addressLabel: 'Registrovaná adresa kanceláře',
      copy: 'Kopírovat',
      copied: 'Zkopírováno',
      formHeading: 'Odeslat dotaz',
      sentTitle: 'Dotaz připraven',
      sentBodyPrefix:
        'Děkujeme, {name}. Údaje vaší zprávy byly zaznamenány. Pro naléhavé právní nebo GDPR dotazy volejte +1 646 427 6802 nebo pište na ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Poslat další dotaz',
      nameLabel: 'Celé jméno',
      namePlaceholder: 'Jan Novák',
      emailLabel: 'E-mailová adresa',
      emailPlaceholder: 'vy@priklad.cz',
      messageLabel: 'Zpráva',
      messagePlaceholder: 'Jak vám může ECORZO LLC pomoci?',
      submitBtn: 'Odeslat zprávu',
      errMissing: 'Vyplňte prosím jméno, e-mail a zprávu.',
      errInvalidEmail: 'Zadejte prosím platnou e-mailovou adresu.',
    },
    privacy: {
      title: 'Zásady ochrany osobních údajů',
      subtitle:
        'Jak TestLine od ECORZO LLC zpracovává a chrání diagnostické údaje v souladu se zásadami Google a právními předpisy.',
      sections: [
        {
          heading: '1. Správce údajů & Rozsah',
          paragraphs: [
            'Tyto zásady upravují používání TestLine provozovaného společností ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel.: +1 646 427 6802) v souladu s GDPR, CCPA a požadavky Google.',
          ],
        },
        {
          heading: '2. Údaje zpracovávané při diagnostice',
          bullets: [
            { strong: 'Síťová & IP telemetrie:', text: 'Veřejná IPv4/IPv6, ISP, ASN, přibližná poloha, PTR a HTTP hlavičky se zpracovávají pouze dočasně v paměti.' },
            { strong: 'Měření rychlosti:', text: 'Výsledky se ukládají výhradně lokálně ve vašem prohlížeči (testline_history_v1).' },
            { strong: 'Předvolby prohlížeče:', text: 'Motiv (testline_theme), jazyk a souhlas (testline_cookie_consent) se ukládají lokálně.' },
          ],
        },
        {
          heading: '3. Služby třetích stran & Informace Google',
          paragraphs: [
            'Pro živé testy prohlížeč komunikuje s partnery Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io) a Ipify (api.ipify.org). Při načtení služeb Google platí:',
          ],
        },
        {
          heading: '4. Žádný prodej údajů & Uchovávání',
          paragraphs: [
            'ECORZO LLC osobní údaje ani IP adresy neprodává ani nepronajímá. PDF zprávy vznikají výhradně lokálně v prohlížeči.',
          ],
        },
      ],
      googlePolicyLinkText: 'Jak Google využívá data z webů nebo aplikací používajících naše služby',
      rightsPrefix: 'Podle své jurisdikce máte právo na přístup, opravu, výmaz nebo odvolání souhlasu. Přečtěte si naše',
      gdprLinkText: 'GDPR & Zásady údajů',
      rightsSuffix: 'nebo kontaktujte ECORZO LLC na +1 646 427 6802 či 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Právní upozornění',
      subtitle: 'Důležitá omezení týkající se měření rychlosti, geolokace IP a detekce proxy/VPN.',
      sections: [
        { heading: '1. Pouze pro informační a diagnostické účely', paragraphs: ['TestLine je poskytován „tak jak je“ a nepředstavuje úřední certifikaci kapacity linky.'] },
        { heading: '2. Faktory ovlivňující výsledky', paragraphs: ['Naměřené hodnoty ovlivňuje kvalita Wi-Fi, router, přenosy na pozadí, šifrování VPN i peering operátora.'] },
        { heading: '3. Přesnost geolokace IP & proxy', paragraphs: ['Město a ISP pocházejí z databází třetích stran a vyjadřují registraci bloku IP, nikoli vaši ulici.'] },
        { heading: '4. Omezení odpovědnosti', paragraphs: ['V rozsahu povoleném zákonem nenese ECORZO LLC odpovědnost za nepřímé škody vzniklé použitím naměřených dat.'] },
      ],
    },
    terms: {
      title: 'Obchodní podmínky',
      subtitle: 'Pravidla přístupu a používání TestLine od ECORZO LLC.',
      sections: [
        { heading: '1. Přijetí podmínek', paragraphs: ['Používáním TestLine souhlasíte s těmito podmínkami a platnými předpisy.'] },
        {
          heading: '2. Povolené & zakázané užití',
          bullets: [
            { text: 'TestLine můžete používat pro osobní, vzdělávací či legitimní firemní diagnostiku.' },
            { text: 'Automatizovaní boti, zátěžové útoky, DDoS či hromadné stahování dat jsou zakázány.' },
            { text: 'Je zakázáno obcházet limity nebo vydávat PDF výstupy za úřední certifikáty.' },
          ],
        },
        { heading: '3. Duševní vlastnictví', paragraphs: ['Název TestLine, rozhraní a zdrojový kód patří společnosti ECORZO LLC.'] },
        { heading: '4. Rozhodné právo', paragraphs: ['Řídí se zákony státu New York a USA.'] },
      ],
    },
    cookiesPolicy: {
      title: 'Zásady používání cookies',
      subtitle: 'Přehled cookies a klíčů lokálního úložiště používaných v TestLine.',
      sec1Title: '1. Co jsou cookies a lokální úložiště?',
      sec1Body:
        'Cookies jsou malé textové soubory. Moderní webové aplikace využívají také localStorage k uložení předvoleb přímo v prohlížeči.',
      sec2Title: '2. Klíče úložiště používané v TestLine',
      colKey: 'Klíč / Identifikátor',
      colCategory: 'Kategorie',
      colPurpose: 'Účel',
      rows: [
        { key: 'testline_theme', category: 'Nezbytná předvolba', purpose: 'Uchovává světlý nebo tmavý režim.' },
        { key: 'testline_unit_v1', category: 'Nezbytná předvolba', purpose: 'Ukládá zvolenou jednotku (Auto, Mbps, MB/s).' },
        { key: 'testline_history_v1', category: 'Funkční lokální', purpose: 'Ukládá až 15 posledních výsledků testů lokálně.' },
        { key: 'testline_cookie_consent', category: 'Nezbytný souhlas', purpose: 'Zaznamenává vaši volbu podle Google Consent Mode v2.' },
      ],
      sec3Title: '3. Zásady třetích stran & Google',
      sec3Prefix:
        'Podle zásad Google EU User Consent a Consent Mode v2 zůstává ukládání pro reklamu a analytiku zamítnuto, dokud jej nepovolíte. Autorizovaní prodejci jsou uvedeni na',
      sec3Mid: '. Souhlas můžete kdykoli upravit na stránce',
      cookiesNoticeLinkText: 'Oznámení o cookies',
      sec3OrVia: 'nebo přes',
      googleAdSettingsText: 'Nastavení reklam Google',
    },
    cookiesNotice: {
      title: 'Oznámení o cookies & Předvolby souhlasu',
      subtitle: 'Spravujte předvolby cookies a lokálního úložiště pro TestLine od ECORZO LLC.',
      sec1Title: 'Oznámení návštěvníkům (EHP, Spojené království, Švýcarsko & svět)',
      sec1Body:
        'TestLine používá nezbytné úložiště pro motiv, jednotky, historii a volbu souhlasu. Reklamní a analytické úložiště je ve výchozím nastavení odmítnuto.',
      activeTitle: 'Aktivní volba souhlasu',
      currentSettingLabel: 'Aktuální nastavení:',
      statusAll: 'Vše povoleno (Analytika & Reklamy)',
      statusEssential: 'Pouze nezbytné',
      statusUnset: 'Zatím nevybráno (Nepovinné zamítnuto)',
      savedBadge: 'Předvolby uloženy',
      acceptAllBtn: 'Povolit veškeré funkční úložiště',
      essentialOnlyBtn: 'Pouze nezbytné',
      sec2Title: 'Ovládání v prohlížeči',
      sec2Body: 'Ukládání můžete také kdykoli zablokovat nebo vymazat přímo v nastavení soukromí prohlížeče.',
    },
    gdpr: {
      title: 'GDPR & Zásady shromažďování údajů',
      subtitle: 'Právní základy, minimalizace údajů, mezinárodní přenosy a práva podle GDPR.',
      sections: [
        { heading: '1. Správce údajů', paragraphs: ['Správcem podle GDPR je ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Tel.: +1 646 427 6802).'] },
        {
          heading: '2. Právní základy zpracování (Čl. 6)',
          bullets: [
            { strong: 'Smlouva / Vyžádaná služba (čl. 6 odst. 1 písm. b)):', text: 'Zpracování IP a přenosu je nutné k provedení vyžádaného testu.' },
            { strong: 'Oprávněný zájem (čl. 6 odst. 1 písm. f)):', text: 'Ochrana proti zneužití, DDoS a spolehlivost sítě.' },
            { strong: 'Výslovný souhlas (čl. 6 odst. 1 písm. a)):', text: 'Nepovinné cookies se zpracovávají pouze s vaším souhlasem.' },
          ],
        },
        { heading: '3. Minimalizace údajů & Uchovávání', paragraphs: ['Dodržujeme čl. 5 GDPR bez uživatelských účtů nebo trvalého logování IP.'] },
        { heading: '4. Mezinárodní přenosy', paragraphs: ['Požadavky jsou směrovány k nejbližšímu uzlu Cloudflare nebo Google Cloud na základě SCC.'] },
        {
          heading: '5. Vaše práva (čl. 15–22)',
          bullets: [
            { strong: 'Přístup & přenositelnost:', text: 'Vyžádejte si potvrzení a kopii údajů.' },
            { strong: 'Oprava & výmaz:', text: 'Požádejte o opravu nebo vymazání.' },
            { strong: 'Námitka & omezení:', text: 'Odvolejte souhlas kdykoli.' },
            { strong: 'Stížnost:', text: 'Máte právo obrátit se na Úřad pro ochranu osobních údajů.' },
          ],
        },
        { heading: '6. Soukromí dětí', paragraphs: ['TestLine vědomě neshromažďuje údaje dětí mladších 13 let (16 let v EHP).'] },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Zpráva o síti & rychlosti',
    generated: 'Vygenerováno',
    unit: 'Jednotka',
    secondCopyBanner: 'DRUHÁ KOPIE  —  Opakované stažení zprávy',
    sec1Title: '1. Souhrn měření rychlosti',
    downloadSpeed: 'Rychlost stahování',
    uploadSpeed: 'Rychlost nahrávání',
    avgPing: 'Průměrný ping',
    jitter: 'Jitter',
    peak: 'Špička',
    sustained: 'Trvalý tok',
    min: 'Min',
    probes: 'sond',
    rttProbes: 'RTT sond',
    sec2Title: '2. Detekce Proxy & VPN',
    directClean: 'Přímé připojení — Nezjištěny žádné signály proxy ani VPN',
    sec3Title: '3. Diagnostika sítě, IP & DNS',
    sec4Title: '4. Nedávné testy v relaci',
    confidenceWord: 'spolehlivost',
    pageOf: 'Strana {p} z {total}',
    secondCopyShort: 'Druhá kopie',
    rowPrimaryIp: 'Primární veřejná IP',
    rowIpv4: 'IPv4 adresa',
    rowIpv6: 'IPv6 adresa',
    rowIsp: 'Poskytovatel (ISP)',
    rowAsn: 'Autonomní systém (ASN)',
    rowLocation: 'Přibližná poloha',
    rowTimezone: 'Časové pásmo',
    rowPtr: 'Reverzní DNS (PTR)',
    rowDoh: 'Test DoH resolveru',
    rowProtocol: 'Přenosový protokol',
    rowLinkHint: 'Indikátor linky prohlížeče',
    notDetected: 'Nezjištěno',
    noPtr: 'Žádný PTR záznam',
    reachable: 'Dostupný',
    unreachable: 'Nedostupný',
    notExposed: 'Prohlížečem nesdíleno',
    available: 'Dostupný',
    colTime: 'Čas',
    colDownload: 'Stahování',
    colUpload: 'Nahrávání',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Veřejná IP',
  },
};
