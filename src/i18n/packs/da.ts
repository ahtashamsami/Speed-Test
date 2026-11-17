import type { TranslationPack } from '../types';

export const daPack: TranslationPack = {
  meta: {
    lang: 'da',
    intlLocale: 'da-DK',
    dir: 'ltr',
    nativeName: 'Dansk',
  },
  seo: {
    home: {
      title: 'TestLine — Internethastighedstest & Offentlig IP-opslag',
      description:
        'Test din download- og uploadhastighed, ping og jitter, og tjek din offentlige IPv4/IPv6-adresse, internetudbyder, DNS-latens og VPN-status.',
      keywords:
        'hastighedstest internet, hvad er min ip, offentlig ip-adresse, downloadhastighed, uploadhastighed, pingtest, jitter, ipv4, ipv6, vpn-tjek',
      breadcrumbLabel: 'Hastighedstest',
    },
    news: {
      title: 'Cybersikkerhed, Netværk & Teknologinyheder | TestLine',
      description:
        'Læs live RSS-nyheder om cybersikkerhed, bredbånd, DNS, BGP og teknologi fra Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch og Ars Technica.',
      keywords: 'cybersikkerhed nyheder, netværkssikkerhed rss, teknologinyheder',
      breadcrumbLabel: 'Nyheder',
    },
    blog: {
      title: 'Guides om internethastighed, IP-adresser & VPN | TestLine',
      description:
        'Udforsk 10 ekspertguides om internethastighed, Mbps vs. MB/s, IPv4 & IPv6, IP-svindel, geolokalisering, bufferbloat og VPN-detektion.',
      keywords: 'internethastighed guide, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, cgnat, ip-svindel',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'Om TestLine — Hastighedstest & IP-diagnostik',
      description:
        'Lær hvordan TestLine fra ECORZO LLC måler båndbredde, ping, jitter, dual-stack IPv4/IPv6, DoH DNS-latens samt VPN- eller proxyindikatorer.',
      keywords: 'om testline, ecorzo llc, metode hastighedstest, ip-opslag, doh latens',
      breadcrumbLabel: 'Om os',
    },
    privacy: {
      title: 'Privatlivspolitik — Flygtig IP & Hastighedstest | TestLine',
      description:
        'Læs TestLines privatlivspolitik fra ECORZO LLC om midlertidig IP-behandling, ingen logning af hastighedstests, GDPR og cookies.',
      keywords: 'testline privatlivspolitik, ecorzo llc privatliv, gdpr hastighedstest',
      breadcrumbLabel: 'Privatliv',
    },
    contact: {
      title: 'Kontakt TestLine & ECORZO LLC — Netværkssupport',
      description:
        'Kontakt ECORZO LLC vedrørende TestLine hastighedstest, IP-opslag, privatliv eller GDPR. Ring +1 646 427 6802 eller skriv til vores kontor i New York.',
      keywords: 'kontakt testline, ecorzo llc new york, support netværk',
      breadcrumbLabel: 'Kontakt',
    },
    disclaimer: {
      title: 'Ansvarsfraskrivelse — Hastighedstest & IP-opslag | TestLine',
      description:
        'Forstå variabler ved hastighedsmålinger, Wi-Fi-flaskehalse, nøjagtighed af IP-geolokalisering og VPN/proxy-detektion på TestLine fra ECORZO LLC.',
      keywords: 'ansvarsfraskrivelse hastighedstest, ip geolokalisering, testline ecorzo llc',
      breadcrumbLabel: 'Ansvarsfraskrivelse',
    },
    terms: {
      title: 'Vilkår og betingelser — TestLine af ECORZO LLC',
      description:
        'Gennemgå vilkårene for brug af TestLines internethastighedstest og offentlige IP-opslag drevet af ECORZO LLC.',
      keywords: 'testline vilkår, ecorzo llc brugerbetingelser, acceptabel brug',
      breadcrumbLabel: 'Vilkår',
    },
    'cookies-policy': {
      title: 'Cookiepolitik & Lokal Lagring — TestLine',
      description:
        'Se præcise nøgler for lokal browserlagring og cookieoplysninger brugt af TestLine af ECORZO LLC under GDPR.',
      keywords: 'testline cookiepolitik, lokal lagring, google consent mode v2',
      breadcrumbLabel: 'Cookiepolitik',
    },
    'cookies-notice': {
      title: 'Cookiemeddelelse & Samtykkeindstillinger — TestLine',
      description:
        'Administrer dine samtykkeindstillinger for cookies, analyse og lokal lagring for TestLine af ECORZO LLC når som helst.',
      keywords: 'cookiemeddelelse, administrer cookies, testline samtykke',
      breadcrumbLabel: 'Cookieindstillinger',
    },
    gdpr: {
      title: 'GDPR & Dataindsamlingspolitik — TestLine',
      description:
        'Læs om ECORZO LLCs retsgrundlag under GDPR artikel 6, dataminimering, internationale overførsler og brugerrettigheder.',
      keywords: 'testline gdpr politik, ecorzo llc databeskyttelse, artikel 6',
      breadcrumbLabel: 'GDPR & Datapolitik',
    },
  },
  nav: {
    speedTest: 'Hastighedstest',
    news: 'Nyheder',
    blog: 'Blog',
    about: 'Om os',
    contact: 'Kontakt',
    privacy: 'Privatliv',
    stopTest: 'Stop test',
    newBadgeSuffix: 'nye',
    homeAria: 'TestLine Forside',
    primaryNavAria: 'Hovednavigation',
    mobileNavAria: 'Mobilnavigation',
    companyMenuAria: 'TestLine-menu: Om os, Kontakt og Privatliv',
  },
  pwa: {
    installApp: 'Installer app',
    installAria: 'Installer TestLine-appen',
    installIosAria: 'Installer TestLine på iPhone eller iPad',
    iosTitle: 'Installer TestLine på iPhone / iPad',
    closeDialog: 'Luk dialog',
    iosStep1Prefix: 'Tryk på knappen',
    iosStep1Strong: 'Del',
    iosStep1Suffix: 'i Safaris værktøjslinje.',
    iosStep2Prefix: 'Rul ned og tryk på',
    iosStep2Strong: 'Føj til hjemmeskærm',
    iosStep2Suffix: '.',
    iosStep3:
      'Åbn TestLine når som helst — selv offline starter spillet Signal Runner automatisk.',
    gotIt: 'Forstået',
  },
  hero: {
    title: 'Internethastighedstest & Offentlig IP-opslag',
    subtitle:
      'Tjek download- og uploadhastighed, ping og jitter — samt din IPv4/IPv6-adresse, udbyderlokation, DNS-latens og VPN-status.',
    speedUnitAria: 'Hastighedsenhed',
    autoTooltip: 'Bruger automatisk Mbps under 100 Mbps og MB/s ved 100 Mbps eller højere',
    auto: 'Auto',
    lightMode: 'Lys tilstand',
    darkMode: 'Mørk tilstand',
    switchToLight: 'Skift til lys tilstand',
    switchToDark: 'Skift til mørk tilstand',
    exportPdf: 'Eksporter PDF',
    exportingPdf: 'Eksporterer...',
    exportDisabledTitle: 'Start en hastighedstest først for at eksportere en PDF-rapport',
    exportEnabledTitle: 'Eksporter PDF-rapport med hastighed og netværksdiagnostik',
  },
  duplicateModal: {
    title: 'Rapport allerede downloadet',
    closeDialog: 'Luk dialog',
    body: 'Du har allerede downloadet rapporten for denne testkørsel. Vil du downloade den igen?',
    notePrefix: 'Gen-eksporterede kopier markeres tydeligt som',
    secondCopy: 'Anden kopi',
    noteSuffix: 'på rapporten.',
    cancel: 'Nej, annuller',
    confirm: 'Ja, download igen',
  },
  speedStage: {
    startSpeedTest: 'Start hastighedstest',
    yourSpeedIs: 'Din internethastighed er',
    stopAria: 'Stop hastighedstest',
    startAria: 'Start hastighedstest',
    retry: 'Prøv igen',
    statusIdle: 'Klik Afspil for at starte testen',
    statusPing: 'Måler ping & jitter...',
    statusDownload: 'Tester downloadhastighed...',
    statusUpload: 'Tester uploadhastighed...',
    statusComplete: 'Hastighedstest fuldført',
    statusStopped: 'Test stoppet',
    statusError: 'Test afbrudt',
    uploadSpeed: 'Uploadhastighed',
    peakPrefix: 'Spids',
    twoStreams: '2 parallelle strømme',
    latencyAvgPing: 'Latens (Gns. ping)',
    minPrefix: 'Min',
    probesSuffix: 'målinger',
    fiveProbes: '5 Cloudflare RTT-målinger',
    jitter: 'Jitter',
    consecutiveVariance: 'Variation mellem pakker',
    waitingRtt: 'Venter på RTT-prøver',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Meddelelse om proxy- eller VPN-detektion',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy opdaget',
      'Datacenter / Relay Network': 'Datacenter / Relænetværk',
      'Timezone Mismatch (Possible VPN)': 'Tidszoneafvigelse (Mulig VPN)',
      'Direct Connection': 'Direkte forbindelse',
    },
    confidence: {
      High: 'Høj',
      Moderate: 'Moderat',
      Low: 'Lav',
    },
    confidenceWord: 'sikkerhed',
    signalSingular: 'signal',
    signalPlural: 'signaler',
    noticeDesc:
      'Din forbindelse udviser tegn på proxy, VPN eller datacenterrelæ. Hastighedsmålingerne afspejler den aktive tunnel eller udgangsknude.',
    observedExitIp: 'Observeret udgangs-IP',
    relayOperator: 'Relæ- / Netværksoperatør',
    exitLocationTz: 'Udgangssted & tidszone',
    detectedIndicators: 'Registrerede indikatorer',
    unavailable: 'Utilgængelig',
    signalTemplates: {
      proxy_flag: 'IP-adressen er markeret som en aktiv proxy-, VPN- eller Tor-udgang',
      hosting_flag:
        'Trafikken stammer fra et datacenter- eller hosting-ASN frem for en almindelig udbyder',
      provider_keyword: 'Netværksoperatør / PTR matcher relænøgleord ({1})',
      via_header: 'Proxy-videresendelsesheader opdaget ({1})',
      multi_hop: 'Flere videresendelseshop observeret ({1} hop)',
      ip_mismatch: 'Direkte browser-IP afviger fra edge-observeret IP (delt tunnel eller proxy)',
      timezone_mismatch:
        'Browserens tidszone ({1}) afviger fra IP-geolokaliseringens tidszone ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Offentlig IP-adresse',
    resolvingRoute: 'Finder rute',
    routeSuffix: 'rute',
    updatedPrefix: 'Opdateret',
    unavailable: 'Utilgængelig',
    metadataUnavailable: 'Netværksmetadata utilgængelig',
    copyIp: 'Kopiér IP',
    copiedIp: 'IP kopieret',
    refresh: 'Opdater',
    ipv46CardTitle: 'IPv4, IPv6 & Udbyderruting',
    ipv46CardSubtitle: 'Dual-stack klienttests kombineret med edge IP-geolokalisering',
    ipv4Label: 'IPv4-adresse',
    ipv6Label: 'IPv6-adresse',
    notDetected: 'Ikke opdaget',
    ipv6NotDetected: 'Ikke opdaget (kun IPv4-rute)',
    ispLabel: 'Internetudbyder (ISP)',
    asnLabel: 'Autonomt system (ASN)',
    locationLabel: 'Omtrentlig placering',
    proxyCheckLabel: 'Proxy- / VPN-tjek',
    resolving: 'Slår op...',
    inspecting: 'Analyserer...',
    directConnectionNone: 'Direkte forbindelse (Ingen opdaget)',
    dnsCardTitle: 'DNS-hints & Forbindelsesdiagnostik',
    dnsCardSubtitle: 'Omvendt PTR-post, DoH-tilgængelighed og browserens transportsignaler',
    ptrLabel: 'Omvendt DNS (PTR)',
    noPtr: 'Ingen PTR-post offentliggjort',
    dohProbeLabel: 'DoH-opslagstest',
    probing: 'Tester...',
    reachable: 'Tilgængelig',
    blockedOrUnreachable: 'Blokeret eller utilgængelig',
    dnsLatencyLabel: 'DNS-forespørgselslatens',
    protocolLabel: 'Transportprotokol',
    checking: 'Tjekker...',
    linkHintLabel: 'Browserens linkhint',
    exposedNoMetrics: 'Eksponeret uden målinger',
    notExposed: 'Ikke eksponeret af browser',
    timezoneLabel: 'Tidszone',
    copy: 'Kopiér',
    copied: 'Kopieret',
    capSuffix: 'Mbps grænse',
    rttSuffix: 'ms RTT',
    fetchError: 'Kunne ikke nå slutpunkter til IP-diagnostik.',
  },
  history: {
    title: 'Sessionshistorik',
    subtitle: 'Seneste målinger gemt lokalt i din browser',
    clearHistory: 'Ryd historik',
    emptyText: 'Afsluttede hastighedstests vises her, så du kan sammenligne målinger.',
    colTime: 'Tid',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Offentlig IP',
  },
  consent: {
    title: 'Cookie- & Privatlivsmeddelelse',
    description:
      'TestLine bruger nødvendig lokal lagring til tema, enheder og historik. Valgfrie analyse- og annoncecookies forbliver slået fra, medmindre du accepterer.',
    acceptAll: 'Acceptér alle',
    essentialOnly: 'Kun nødvendige',
    cookieSettings: 'Cookieindstillinger',
  },
  footer: {
    byEcorzo: 'af ECORZO LLC',
    tagline:
      'Realtids hastighedstest af internet og dual-stack IP-netværksdiagnostik drevet af ECORZO LLC.',
    companyHeading: 'Virksomhed',
    legalHeading: 'Juridisk & Overholdelse',
    disclaimer: 'Ansvarsfraskrivelse',
    terms: 'Vilkår og betingelser',
    cookiesPolicy: 'Cookiepolitik',
    cookiesNotice: 'Cookiemeddelelse',
    gdpr: 'GDPR & Datapolitik',
    privacy: 'Privatlivspolitik',
    copyrightSuffix: 'ECORZO LLC. Alle rettigheder forbeholdes.',
    poweredBy:
      'Målinger drevet af Cloudflare-hastighedsnoder · Overholder GDPR & Googles politikker',
    languageLabel: 'Sprog',
    autoOption: 'Auto (Region)',
  },
  news: {
    eyebrow: 'Live RSS-aggregator til cybersikkerhed & teknologi',
    updatedPrefix: 'Opdateret',
    title: 'Netværks-, sikkerheds- & teknologinyheder',
    filterPlaceholder: 'Filtrér overskrifter...',
    filterAria: 'Filtrér nyhedsoverskrifter',
    refreshFeeds: 'Opdater feeds',
    refreshing: 'Opdaterer...',
    cachedBannerPrefix:
      'Live RSS-feeds er utilgængelige lige nu. Viser nyligt cachelagrede nyheder gemt på denne enhed',
    retryLive: 'Prøv live igen',
    retrying: 'Prøver...',
    allSources: 'Alle kilder',
    errorFallback:
      'Kunne ikke indlæse live RSS-feeds lige nu. Tjek din forbindelse og prøv at opdatere.',
    tryAgain: 'Prøv igen',
    emptyText: 'Ingen matchende historier fundet i de aktuelle RSS-feeds.',
    showAll: 'Vis alle feeds',
    newTag: 'Ny',
    readFullStory: 'Læs hele artiklen',
    recent: 'Nylig',
    minutesAgo: '{n}m siden',
    hoursAgo: '{n}t siden',
  },
  blog: {
    eyebrow: 'TestLine-guides & Dagligt nyhedsoverblik',
    articlesCountSuffix: 'Artikler',
    title: 'Internethastighed, IP-diagnostik & Daglige briefinger',
    subtitle:
      'Dybdegående guides om internethastighed, IPv4/IPv6, IP-svindel, IP-lokation og VPN-detektion — plus 2 daglige tophistorier udvalgt automatisk fra vores live RSS-feeds.',
    searchPlaceholder: 'Søg blandt {n} artikler...',
    searchAria: 'Søg blogartikler',
    allLabel: 'Alle',
    hotNewsLabel: 'Topnyheder',
    dailyHotNewsBadge: 'Dagens topnyhed',
    emptyText: 'Ingen artikler matcher dit nuværende filter.',
    resetFilters: 'Nulstil filtre',
    newTag: 'Ny',
    readArticle: 'Læs artikel',
    backToAllPrefix: 'Tilbage til alle',
    backToAllSuffix: 'artikler',
    originalSourcePrefix: 'Oprindelig kilde',
    testConnectionNow: 'Test din forbindelse nu',
    keyTakeaways: 'Hovedpunkter',
    dailyReadTime: '3 min læsning',
    dailyAuthorPrefix: 'TestLine Daglig Briefing · via',
    dailyTakeawayFeatured: 'Fremhævet i TestLines daglige nyhedsoverblik ({source}) under {topic}.',
    dailyTakeawaySummaryPrefix: 'Kerneoversigt:',
    dailyTakeawayTip:
      'Bekræft altid din aktive offentlige IPv4/IPv6-adresse, DNS-latens og VPN/proxy-status, før du fejlfinder uventede forbindelsesadvarsler.',
    dailySectionBriefingPrefix: 'Daglig briefing:',
    dailyBriefingPara2:
      'Automatisk udvalgt til TestLines nyhedsoverblik for {date} baseret på aktualitet og betydning for netværk og cybersikkerhed. Læsere kan følge kildelinket ovenfor for at læse den oprindelige tekniske rapport.',
    dailySectionActionTitle: 'Netværksdiagnostik & Praktisk handling',
    dailyActionPara1:
      'Udviklinger inden for {topic} påvirker ofte udbydernes DNS-servere, routingtabeller, erhvervs-VPN og slutpunkter. En hurtig hastighedstest og dual-stack IP-kontrol bekræfter straks, om din forbindelse oplever øget jitter eller uventede relæskift.',
    dailyActionPara2:
      'Hold dig opdateret om nye sårbarheder ved at følge live RSS-nyhederne og vores faste guides i bloggen.',
    categories: {
      'Hot News': 'Topnyheder',
      'Internet Speed': 'Internethastighed',
      'IP Addresses': 'IP-adresser',
      'IP Scams': 'IP-svindel',
      'IP Location': 'IP-lokation',
      'VPN IP Status': 'VPN IP-status',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Hvorfor din faktiske downloadhastighed afviger fra dit abonnement',
        readTime: '5 min læsning',
        author: 'TestLine Teknik',
        summary:
          'Lær hvorfor en 500 Mbps-forbindelse ofte henter filer med 50–60 MB/s, hvordan TCP/TLS påvirker farten, og hvorfor flere strømme måler mest præcist.',
        keyTakeaways: [
          'Internetudbydere opgiver hastigheder i megabit pr. sekund (Mbps), mens browsere viser megabyte pr. sekund (MB/s) i forholdet 8:1.',
          'Wi-Fi-afstand, 2,4 GHz-støj og ældre routere bremser ofte gigabit-fiber, før trafikken når udbyderen.',
          'Parallelle HTTP-strømme viser den reelle samlede båndbredde langt bedre end én enkelt filoverførsel.',
        ],
        sections: [
          {
            heading: 'Megabit (Mbps) vs. Megabyte (MB/s)',
            paragraphs: [
              'Den største kilde til forvirring er forskellen mellem Mbps og MB/s. Fordi der går 8 bit på 1 byte, giver 400 Mbps en teoretisk maksrate på 50 MB/s.',
              'Når Ethernet-, IP- og TLS-overhead trækkes fra, ligger reel filhentning typisk på 90–94 % af linjehastigheden. På TestLine kan du skifte frit mellem Auto, Mbps og MB/s.',
            ],
          },
          {
            heading: 'Derfor er multi-stream tests vigtige',
            paragraphs: [
              'En enkelt forbindelse bremses let af TCP-vinduer og afstand til serveren. Tre parallelle strømme mætter linjen rent og viser den fulde kapacitet.',
              'Er der stor forskel på Wi-Fi og kabel, så test tæt på en 5/6 GHz-router eller via Cat6-kabel.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter forklaret: Hvad ødelægger videoopkald og gaming',
        readTime: '5 min læsning',
        author: 'TestLine Teknik',
        summary:
          'Høj downloadhastighed redder ikke et videoopkald eller spil, hvis latensen svinger ujævnt. Her er hvordan ping, jitter og bufferbloat påvirker trafik.',
        keyTakeaways: [
          'Ping måler gennemsnitlig svartid (RTT) i millisekunder; under 30 ms føles øjeblikkeligt.',
          'Jitter måler udsving mellem på hinanden følgende pakker — over 20–25 ms giver hakkende lyd.',
          'Store uploads under opkald giver bufferbloat uden SQM/QoS på routeren.',
        ],
        sections: [
          {
            heading: 'Latens er responstid frem og tilbage',
            paragraphs: [
              'Båndbredde er vejbredden, mens ping måler rejsetiden for én pakke. Streaming bruger buffer, mens opkald og spil mærker hvert millisekund.',
            ],
          },
          {
            heading: 'Hvorfor jitter giver lydudfald',
            paragraphs: [
              'Hvis fem målinger returnerer 14, 16, 92, 15 og 68 ms, ser snittet fint ud, men lydcodecs må droppe rammer for at følge med.',
              'Aktivering af Smart Queue Management (SQM) forhindrer tunge uploads i at blokere opkaldspakker.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6 forklaret: Hvorfor dual-stack netværk er vigtige i dag',
        readTime: '6 min læsning',
        author: 'TestLine Netværksforskning',
        summary:
          'Med udtømte IPv4-lagre og mobiludbydere på CGNAT er det vigtigt at forstå, hvordan din enhed ruter IPv4 og IPv6.',
        keyTakeaways: [
          'IPv4 bruger 32-bit adresser (~4,3 mia.), hvilket tvinger udbydere til at dele IPv4 via CGNAT.',
          'IPv6 bruger 128-bit hexadecimale adresser og genskaber direkte ruting uden flerlags-NAT.',
          'Dual-stack tests tjekker, om du har både IPv4- og IPv6-rute samtidigt.',
        ],
        sections: [
          {
            heading: 'Virkeligheden med IPv4-mangel og CGNAT',
            paragraphs: [
              'Da ledige IPv4-blokke er opbrugt, placerer mange fiber- og 5G-udbydere kunder bag CGNAT, hvor mange husstande deler samme udadgående IPv4.',
            ],
          },
          {
            heading: 'Hvordan dual-stack øger hastigheden',
            paragraphs: [
              'Moderne systemer vælger IPv6 via Happy Eyeballs, når målet støtter det, hvilket sparer NAT-oversættelser og mindsker delte blokeringer.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Offentlig IP vs. Privat IP & Hvordan omvendt DNS (PTR) identificerer udbydere',
        readTime: '4 min læsning',
        author: 'TestLine Netværksforskning',
        summary:
          'Hvorfor telefonen viser 192.168.1.45 på Wi-Fi, mens hjemmesider ser en anden offentlig IP — og hvad PTR afslører om din udbyder.',
        keyTakeaways: [
          'Private RFC 1918-adresser (10.x, 172.16–31.x, 192.168.x) eksisterer kun på dit lokale netværk.',
          'Routeren oversætter lokaladressen til udbyderens offentlige IP med NAT.',
          'Omvendt DNS (PTR) kobler IP-adressen til et værtsnavn med oplysninger om region og linjetype.',
        ],
        sections: [
          {
            heading: 'Inde i routeren kontra på internettet',
            paragraphs: [
              'Lokaladressen kan ikke rutes på nettet og genbruges i millioner af hjem. NAT omskriver pakkehovedet til din offentlige IP ved udgangen.',
            ],
          },
          {
            heading: 'Aflæsning af omvendt DNS (PTR)',
            paragraphs: [
              'Udbydere udgiver ofte beskrivende PTR-navne, som bruges sammen med ASN til at kende forskel på privatfiber og cloudservere.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Sådan gennemskuer du falske "Din IP er hacket"-popups og supportsvindel',
        readTime: '5 min læsning',
        author: 'TestLine Sikkerhedsdesk',
        summary:
          'Svindel-popups viser din rigtige IP og by for at skabe panik. Lær hvorfor enhver hjemmeside ser din IP automatisk — og hvad svindlere ikke kan.',
        keyTakeaways: [
          'Alle besøgte hjemmesider modtager din offentlige IP og by via almindelig HTTP-ruting — det beviser intet indbrud.',
          'Falske virusadvarsler presser folk til at ringe til fupnumre eller give fjernadgang.',
          'En offentlig IP afslører aldrig dit navn, gadeadresse, banklogin eller filer.',
        ],
        sections: [
          {
            heading: 'Hvorfor det er et psykologisk trick at vise din IP',
            paragraphs: [
              'Skadelige reklamer viser røde advarsler med din by og IP. Enhver webserver skal kende din IP for at sende websiden retur — det er helt normalt.',
            ],
          },
          {
            heading: 'Hvad en IP afslører — og ikke afslører',
            paragraphs: [
              'Din offentlige IP viser kun udbyderens knudepunkt og byområde. Luk fanen og giv aldrig fremmede adgang via AnyDesk eller TeamViewer.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP-spoofing, header-forfalskning & misbrug af bolig-proxys forklaret',
        readTime: '6 min læsning',
        author: 'TestLine Sikkerhedsdesk',
        summary:
          'Fra forfalskede X-Forwarded-For headere til "gratis VPN"-apps, der i al hemmelighed gør dit hjemmenetværk til en proxy-udgang.',
        keyTakeaways: [
          'Forfalskede TCP-adresser kan ikke gennemføre HTTPS, så angribere misbruger kompromitterede enheder og gratis proxy-SDK’er.',
          'Visse gratis udvidelser eller APK’er udlejer i stilhed din bolig-IP til fremmed trafik.',
          'Tjek af PTR, ASN og videresendelsesheadere afslører uventede relæer.',
        ],
        sections: [
          {
            heading: 'Den skjulte pris ved "gratis" proxyapps',
            paragraphs: [
              'Bolig-IP’er har høj tillid. Useriøse gratis udvidelser videresender nogle gange andres trafik gennem intetanende brugeres hjemmeroutere.',
            ],
          },
          {
            heading: 'Sikring af ren udgående ruting',
            paragraphs: [
              'Gennemgå jævnligt udvidelser, slå unødvendig UPnP fra og kør et IP- og proxytjek.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Hvordan IP-geolokalisering virker — og hvorfor byen ofte er forkert',
        readTime: '5 min læsning',
        author: 'TestLine Netværksforskning',
        summary:
          'IP-adresser indeholder ingen GPS-koordinater. Se hvordan GeoIP-databaser kobler IP-blokke til regioner, og hvorfor mobildata ofte vises i en anden by.',
        keyTakeaways: [
          'IP-geolokalisering bygger på RIR-tildelinger, BGP-annonceringer og udbyderdata fremfor GPS.',
          'Mobiludbydere samler LTE- og 5G-trafik i centrale gateways langt fra brugeren.',
          'Landenøjagtigheden er over 98 %, mens gadeadresse via IP er en myte.',
        ],
        sections: [
          {
            heading: 'Ingen GPS i IP-pakker',
            paragraphs: [
              'Hjemmesider slår din IP op i databaser baseret på WHOIS-registreringer og rutingtabeller.',
            ],
          },
          {
            heading: 'Hvorfor mobil- og fiber-IP flytter by',
            paragraphs: [
              'Når en 5G-udbyder fører trafik gennem København, mens du er i Aarhus, viser IP-opslag København, indtil GeoIP-databasen opdateres.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Tidszoneafvigelse & Udbyderruting: Hvorfor sider placerer dig forkert',
        readTime: '4 min læsning',
        author: 'TestLine Netværksforskning',
        summary:
          'Hvorfor svindelfiltre sammenligner browserens ur med IP-adressens tidszone — og hvornår almindelig ruting giver falske udslag.',
        keyTakeaways: [
          'Betalingssystemer sammenligner browserens Intl-tidszone med IP-tidszonen.',
          'Virksomheds-VPN eller roaming på rejser kan give harmløse afvigelser.',
          'TestLine viser begge tidszoner side om side for fuld gennemsigtighed.',
        ],
        sections: [
          {
            heading: 'Sådan virker browser vs. IP tidszonetjek',
            paragraphs: [
              'Et passivt signal sammenligner operativsystemets tidszone med den registrerede IP-tidszone for at spotte fjerne udgange.',
            ],
          },
          {
            heading: 'Falske positive ved roaming og grænser',
            paragraphs: [
              'Rejsende på roaming beholder ofte hjemlandets IP-gateway og dermed en anden tidszone end den lokale.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Hvordan hjemmesider opdager en VPN-, proxy- eller datacenter-IP',
        readTime: '6 min læsning',
        author: 'TestLine Sikkerhedsdesk',
        summary:
          'Nysgerrig efter hvordan banker og streamingtjenester opdager aktiv VPN? Her er de fire tekniske signaler bag detektionen.',
        keyTakeaways: [
          'ASN skelner straks cloud-udbydere (M247, DigitalOcean, Hetzner, AWS) fra almindelige internetudbydere.',
          'Headere som Via og flerhops X-Forwarded-For afslører transparente proxys.',
          'PTR-mønstre og tidszoneafvigelser styrker vurderingen.',
        ],
        sections: [
          {
            heading: 'ASN-klassificering: Det stærkeste signal',
            paragraphs: [
              'Enhver offentlig IP tilhører et ASN. Da VPN-udbydere lejer servere i datacenter-ASN’er, kan tjenester opdage datacentertrafik på få millisekunder.',
            ],
          },
          {
            heading: 'PTR-værtsnavne, headere og adfærd',
            paragraphs: [
              'Samspillet mellem ASN, PTR-nøgleord, proxyheadere og tidszoner viser tydeligt, hvad din tunnel signalerer udadtil.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS-lækager, IPv6-lækager & Split Tunneling: Test din reelle VPN-status',
        readTime: '5 min læsning',
        author: 'TestLine Sikkerhedsdesk',
        summary:
          'Selv med VPN slået til kan ukrypterede DNS-opslag eller utunnelet IPv6 afsløre din placering. Lær at teste tunnelen.',
        keyTakeaways: [
          'En IPv6-lækage sker, når VPN kun tunneler IPv4, mens din dual-stack udbyder sender IPv6 direkte.',
          'En DNS-lækage sender domæneopslag til din lokale udbyder uden om VPN-tunnelen.',
          'Test af både IPv4/IPv6 og Cloudflare DoH bekræfter tunnelens integritet.',
        ],
        sections: [
          {
            heading: 'Dual-stack fælden med IPv6-lækager',
            paragraphs: [
              'Ældre VPN-klienter opretter kun et virtuelt IPv4-kort. På moderne netværk vælger browsere ellers IPv6 direkte uden om tunnelen.',
            ],
          },
          {
            heading: 'Tjek tunnelens tilstand på sekunder',
            paragraphs: [
              'Kør et nyt tjek på TestLine med VPN aktiv og bekræft, at både IPv4 og IPv6 tilhører VPN-udgangen, samt at krypteret DoH virker.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet genoprettet',
    offlineMode: 'Offlinetilstand — Internet afbrudt',
    connectionActive: 'Forbindelsen er aktiv igen',
    playWhileWaiting: 'Spil Signal Runner mens du venter på forbindelse',
    score: 'Point',
    best: 'Bedst',
    muteAria: 'Slå spillyd fra',
    unmuteAria: 'Slå spillyd til',
    pauseAria: 'Sæt spil på pause',
    resumeAria: 'Genoptag spil',
    returnToSpeedTest: 'Tilbage til hastighedstest',
    checking: 'Tjekker...',
    checkConnection: 'Tjek forbindelse',
    canvasAria: 'Spilområde til Signal Runner offline-spil',
    title: 'Signal Runner',
    subtitle:
      'Hop over tårne, pigge og droner, indtil dit internet vender tilbage. Dobbelt-hop er aktiveret.',
    startGame: 'Start spil',
    tapHint: 'Tryk på skærmen eller tryk Mellemrum / Pil op for at hoppe',
    paused: 'Spil sat på pause',
    resume: 'Genoptag',
    gameOver: 'Signal afbrudt',
    cleared: 'Passeret:',
    newBest: 'Ny rekord!',
    playAgain: 'Spil igen',
    backToSpeedTest: 'Tilbage til hastighedstest',
    jump: 'Hop',
    fastDrop: 'Hurtigt fald',
    desktopHintPrefix: 'Tastatur:',
    desktopJump: 'Hop',
    desktopDrop: 'Fald',
    desktopPause: 'Pause',
  },
  faq: {
    tableTitle: 'Reference for internethastighedstest & IP-opslag',
    tableSubtitle:
      'TestLine af ECORZO LLC måler live download/upload-båndbredde, pinglatens, jitter, offentlige IPv4/IPv6-adresser, IP-geolokalisering, DNS-hastighed og VPN/proxy-flag.',
    readGuidesLink: 'Læs 10 guides om hastighed & IP',
    colMetric: 'Målepunkt',
    colMethod: 'Målemetode',
    colThreshold: 'Målværdi',
    colImpact: 'Primær effekt',
    benchmarks: [
      {
        metric: 'Downloadhastighed (Mbps / MB/s)',
        method: '3 parallelle 25 MB HTTP-strømme (10 s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Flere brugere)',
        standardUse: 'Streaming, downloads, skysynkronisering',
      },
      {
        metric: 'Uploadhastighed (Mbps / MB/s)',
        method: '2 parallelle 10 MB XHR POST-strømme',
        optimal: '10+ Mbps (HD-opkald) · 25+ Mbps (Skaber)',
        standardUse: 'Videoopkald, backups, livestreaming',
      },
      {
        metric: 'Ping & ubelastet latens',
        method: '5 sekventielle 0-byte Cloudflare RTT-prober',
        optimal: '< 30 ms (Lav) · 30–60 ms (Normal)',
        standardUse: 'Onlinespil, VoIP, hurtig webrespons',
      },
      {
        metric: 'Jitter & bufferbloat-følsomhed',
        method: 'Gennemsnitlig RTT-variation mellem prøver',
        optimal: '< 10 ms (Stabil) · > 25 ms (Overbelastet)',
        standardUse: 'Lyd- og videostabilitet under last',
      },
      {
        metric: 'DoH DNS-latens & PTR-opslag',
        method: 'Krypteret 1.1.1.1-forespørgsel + Omvendt DNS PTR',
        optimal: '< 40 ms DNS-opslag',
        standardUse: 'Hurtigt domæneopslag & udbyderkontrol',
      },
      {
        metric: 'Dual-Stack IP, Sted & VPN-status',
        method: 'IPv4/IPv6 + ISP/ASN + Header-/tidszoneaudit',
        optimal: 'Direkte ISP-IP eller verificeret VPN-udgang',
        standardUse: 'Hvad er min IP, IP-lokation, VPN/proxy',
      },
    ],
    faqTitle: 'Ofte stillede spørgsmål',
    faqSubtitle:
      'Direkte svar om hastighedstest, hvad er min IP, IP-lokation, VPN-status og privatliv',
    newsLink: 'Sikkerheds- & netværksnyheder',
    methodologyLink: 'Fuld metode',
    gdprLink: 'GDPR & Datapolitik',
    items: [
      {
        question: 'Hvor hurtig er min download- og uploadhastighed?',
        answer:
          'Klik på Start hastighedstest for at måle din realtids download- og uploadhastighed i Mbps eller MB/s via parallelle strømme mod Cloudflares edge-servere.',
      },
      {
        question: 'Hvad er min offentlige IPv4- og IPv6-adresse?',
        answer:
          'Dual-stack netværksprobing finder både offentlig IPv4 og IPv6 side om side med kopiknapper samt by, region, land, ISP og ASN.',
      },
      {
        question: 'Hvad er gode scorer for ping, jitter og bufferbloat?',
        answer:
          'Ping under 30 ms og jitter under 10 ms sikrer glatte videoopkald og gaming. Kraftige udsving under belastning indikerer bufferbloat.',
      },
      {
        question: 'Hvor nøjagtig er IP-geolokalisering til at tjekke min placering?',
        answer:
          'IP-geolokalisering knytter din IP-blok til registreret by og land hos internetudbyderen, men afslører aldrig din nøjagtige gadeadresse.',
      },
      {
        question: 'Hvordan opdager TestLine en VPN, proxy eller datacenter-IP?',
        answer:
          'TestLine tjekker HTTP-videresendelsesheadere, datacenter-ASN, omvendt DNS (PTR) og forskelle mellem browserens og IP-adressens tidszone.',
      },
      {
        question: 'Hvad er DNS-over-HTTPS (DoH)-latens og omvendt DNS (PTR)?',
        answer:
          'DoH-latens måler krypteret domæneopslag via Cloudflare 1.1.1.1, mens omvendt DNS (PTR) viser udbyderens værtsnavn for din IP.',
      },
      {
        question: 'Logger eller gemmer ECORZO LLC min IP-adresse eller testresultater?',
        answer:
          'Nej. Tests kører kun når du starter dem, behandles flygtigt i hukommelsen og sælges aldrig. Historikken bliver i din browser, og PDF’er dannes lokalt.',
      },
      {
        question: 'Kan jeg bruge TestLine som mobilapp eller spille offline?',
        answer:
          'Ja. TestLine er en installerbar PWA til Android, iOS og desktop. Mister du forbindelsen, starter spillet Signal Runner automatisk.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Tilbage til hastighedstest',
    effectiveDatePrefix: 'Ikrafttrædelsesdato:',
    operatorLabel: 'Operatør: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Om TestLine',
      subtitle:
        'Udviklet af ECORZO LLC til at levere gennemsigtige hastighedstests og offentlig IPv4/IPv6-diagnostik i én hurtig og privatlivsvenlig webapp.',
      sections: [
        {
          heading: 'Hvad TestLine måler',
          paragraphs: [
            'TestLine er et gratis værktøj til hastighedstest og "hvad er min IP"-diagnostik drevet af ECORZO LLC uden login eller plugins.',
          ],
          bullets: [
            { strong: 'Download & upload (Mbps / MB/s):', text: 'Parallelle HTTP-strømme mod Cloudflare i Auto, Mbps eller MB/s.' },
            { strong: 'Ping, jitter & latens:', text: 'Sekventielle RTT-målinger for snit-ping, min ping og pakkevariation.' },
            { strong: 'IPv4/IPv6, Sted, ISP & ASN:', text: 'Dual-stack IP-opslag, PTR og kryptert Cloudflare DoH-latens.' },
            { strong: 'VPN-, proxy- & datacenterdetektion:', text: 'Kontrol af headere, hosting-ASN, PTR og tidszone.' },
          ],
        },
      ],
      closingTitle: 'Vidensbase, live nyheder & virksomhedsdata',
      closingIntro: 'Udforsk vores',
      closingGuidesLink: '10 guides om hastighed, IP, svindel & VPN',
      closingMid: 'eller læs aktuelle cybersikkerhedsoverskrifter i',
      closingNewsLink: 'TestLine News RSS-feed',
      closingOutro:
        '. TestLine drives af ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA. Besøg vores',
      closingContactLink: 'Kontaktside',
    },
    contact: {
      title: 'Kontakt ECORZO LLC',
      subtitle: 'Kontakt vores team om TestLine-diagnostik, privatliv, GDPR eller overholdelse.',
      telephone: 'Telefon',
      addressLabel: 'Registreret firmaadresse',
      copy: 'Kopiér',
      copied: 'Kopieret',
      formHeading: 'Send en forespørgsel',
      sentTitle: 'Forespørgsel klar',
      sentBodyPrefix:
        'Tak, {name}. Dine oplysninger er noteret til gennemgang. Ved hastesager eller GDPR-henvendelser, ring +1 646 427 6802 eller skriv til ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Send en ny forespørgsel',
      nameLabel: 'Fulde navn',
      namePlaceholder: 'Anders Jensen',
      emailLabel: 'E-mailadresse',
      emailPlaceholder: 'dig@eksempel.dk',
      messageLabel: 'Besked',
      messagePlaceholder: 'Hvordan kan ECORZO LLC hjælpe dig?',
      submitBtn: 'Send besked',
      errMissing: 'Indtast venligst navn, e-mailadresse og besked.',
      errInvalidEmail: 'Indtast venligst en gyldig e-mailadresse.',
    },
    privacy: {
      title: 'Privatlivspolitik',
      subtitle:
        'Hvordan TestLine af ECORZO LLC behandler og beskytter diagnostiske oplysninger i overensstemmelse med Googles politikker og gældende ret.',
      sections: [
        {
          heading: '1. Dataansvarlig & Omfang',
          paragraphs: [
            'Denne privatlivspolitik gælder TestLine, drevet af ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tlf: +1 646 427 6802) i overensstemmelse med EU/UK GDPR, CCPA/CPRA og Googles samtykkeregler.',
          ],
        },
        {
          heading: '2. Oplysninger behandlet under diagnostik',
          bullets: [
            { strong: 'Netværks- & IP-telemetri:', text: 'Offentlig IPv4/IPv6, ISP, ASN, omtrentlig placering, PTR og HTTP-headere behandles midlertidigt i hukommelsen.' },
            { strong: 'Hastighedsmålinger:', text: 'Resultater beregnes i browseren og gemmes udelukkende lokalt (testline_history_v1).' },
            { strong: 'Browserpræferencer:', text: 'Tema (testline_theme), sprogvalg og samtykke (testline_cookie_consent) gemmes lokalt.' },
          ],
        },
        {
          heading: '3. Tredjepartstjenester & Google-oplysning',
          paragraphs: [
            'Browseren kommunikerer direkte med infrastrukturpartnere som Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io) og Ipify (api.ipify.org). Ved Google-tjenester gælder:',
          ],
        },
        {
          heading: '4. Intet salg af data & Opbevaring',
          paragraphs: [
            'ECORZO LLC sælger aldrig personoplysninger eller IP-adresser. PDF-rapporter dannes udelukkende lokalt på din enhed.',
          ],
        },
      ],
      googlePolicyLinkText: 'Hvordan Google bruger oplysninger fra websites eller apps, der anvender vores tjenester',
      rightsPrefix: 'Afhængigt af din jurisdiktion har du ret til indsigt, berigtigelse, sletning eller at trække samtykke tilbage. Læs vores',
      gdprLinkText: 'GDPR & Datapolitik',
      rightsSuffix: 'eller kontakt ECORZO LLC på +1 646 427 6802 eller 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Ansvarsfraskrivelse',
      subtitle: 'Vigtige begrænsninger ved hastighedsmålinger, IP-geolokalisering og proxy/VPN-signaler.',
      sections: [
        {
          heading: '1. Kun til information og diagnostik',
          paragraphs: [
            'TestLine stilles til rådighed "som beset" til netværksdiagnostik og udgør ingen juridisk certificering af linjekapacitet.',
          ],
        },
        {
          heading: '2. Variabler der påvirker hastigheden',
          paragraphs: [
            'Målinger påvirkes af Wi-Fi-signal, router, baggrundstrafik, VPN-kryptering og udbyder-peering.',
          ],
        },
        {
          heading: '3. Nøjagtighed af IP-lokation & proxy',
          paragraphs: [
            'Placering og ISP stammer fra tredjepartsdatabaser og viser registreret IP-blok, ikke din gadeadresse.',
          ],
        },
        {
          heading: '4. Ansvarsbegrænsning',
          paragraphs: [
            'I det omfang loven tillader det, fraskriver ECORZO LLC sig ansvar for indirekte tab som følge af diagnostikdata eller rapporter.',
          ],
        },
      ],
    },
    terms: {
      title: 'Vilkår og betingelser',
      subtitle: 'Regler for adgang til og brug af TestLine af ECORZO LLC.',
      sections: [
        {
          heading: '1. Accept af vilkår',
          paragraphs: ['Ved at bruge TestLine accepterer du disse vilkår og gældende regler.'],
        },
        {
          heading: '2. Tilladt & forbudt brug',
          bullets: [
            { text: 'Du må bruge TestLine til privat, uddannelsesmæssig eller legitim virksomhedsfejlfinding.' },
            { text: 'Automatiserede bots, belastningstests, DDoS eller scraping er forbudt.' },
            { text: 'Du må ikke omgå grænser eller udgive rapporter for officielle myndighedscertifikater.' },
          ],
        },
        {
          heading: '3. Immaterielle rettigheder',
          paragraphs: ['Navnet TestLine, design og kode tilhører ECORZO LLC.'],
        },
        {
          heading: '4. Lovvalg',
          paragraphs: ['Underlagt lovene i staten New York og USA.'],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookiepolitik',
      subtitle: 'Detaljeret oversigt over cookies og lokal lagring i TestLine.',
      sec1Title: '1. Hvad er cookies og lokal lagring?',
      sec1Body:
        'Cookies er små tekstfiler. Moderne webapps bruger også localStorage til at huske præferencer lokalt uden unødig datatransmission.',
      sec2Title: '2. Lagringsnøgler brugt af TestLine',
      colKey: 'Nøgle / ID',
      colCategory: 'Kategori',
      colPurpose: 'Formål',
      rows: [
        { key: 'testline_theme', category: 'Nødvendig præference', purpose: 'Husker lyst eller mørkt tema.' },
        { key: 'testline_unit_v1', category: 'Nødvendig præference', purpose: 'Gemmer valgt hastighedsenhed (Auto, Mbps, MB/s).' },
        { key: 'testline_history_v1', category: 'Funktionel lokal', purpose: 'Gemmer op til 15 seneste målinger lokalt.' },
        { key: 'testline_cookie_consent', category: 'Nødvendigt samtykke', purpose: 'Gemmer dit valg under Google Consent Mode v2.' },
      ],
      sec3Title: '3. Tredjeparts- & Google-oplysninger',
      sec3Prefix:
        'I henhold til Googles EU-samtykkepolitik og Consent Mode v2 forbliver annonce- og analyselagring afvist, indtil du samtykker. Autoriserede sælgere findes på',
      sec3Mid: '. Du kan ændre dit valg på',
      cookiesNoticeLinkText: 'Cookiemeddelelse',
      sec3OrVia: 'eller via',
      googleAdSettingsText: 'Googles annonceindstillinger',
    },
    cookiesNotice: {
      title: 'Cookiemeddelelse & Samtykkeindstillinger',
      subtitle: 'Administrer dine cookie- og lagringsvalg for TestLine af ECORZO LLC.',
      sec1Title: 'Meddelelse til besøgende (EØS, Storbritannien, Schweiz & globalt)',
      sec1Body:
        'TestLine bruger strengt nødvendig lagring til tema, enheder, lokal testhistorik og samtykkevalg. Annonce- og analyselagring er deaktiveret som standard.',
      activeTitle: 'Aktivt samtykkevalg',
      currentSettingLabel: 'Aktuel indstilling:',
      statusAll: 'Alle godkendt (Analyse & Annonser)',
      statusEssential: 'Kun strengt nødvendige',
      statusUnset: 'Ikke valgt endnu (Valgfrie afvist)',
      savedBadge: 'Indstillinger gemt',
      acceptAllBtn: 'Acceptér al funktionel lagring',
      essentialOnlyBtn: 'Kun nødvendige',
      sec2Title: 'Browserkontroller',
      sec2Body: 'Du kan også blokere eller rydde lagring i din browsers privatlivsindstillinger.',
    },
    gdpr: {
      title: 'GDPR & Dataindsamlingspolitik',
      subtitle: 'Retsgrundlag, dataminimering, internationale overførsler og rettigheder under GDPR.',
      sections: [
        {
          heading: '1. Dataansvarlig',
          paragraphs: [
            'Dataansvarlig under GDPR er ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Tlf: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Retsgrundlag (Artikel 6)',
          bullets: [
            { strong: 'Kontrakt / Anmodet tjeneste (Art. 6(1)(b)):', text: 'Behandling af IP og båndbredde er nødvendig for at levere den test, du anmoder om.' },
            { strong: 'Legitim interesse (Art. 6(1)(f)):', text: 'Beskyttelse mod misbrug, DDoS og stabil drift.' },
            { strong: 'Udtrykkeligt samtykke (Art. 6(1)(a)):', text: 'Ikke-nødvendige cookies behandles kun med dit samtykke.' },
          ],
        },
        {
          heading: '3. Dataminimering & Opbevaring',
          paragraphs: [
            'ECORZO LLC følger artikel 5 om dataminimering uden brugerkonti eller permanente IP-profiler.',
          ],
        },
        {
          heading: '4. Internationale overførsler',
          paragraphs: [
            'Målinger rutes via nærmeste Cloudflare- eller Google Cloud-node under standardkontraktbestemmelser (SCC).',
          ],
        },
        {
          heading: '5. Dine lovbestemte rettigheder (Art. 15–22)',
          bullets: [
            { strong: 'Indsigt & portabilitet:', text: 'Anmod om bekræftelse og kopi af eventuelle persondata.' },
            { strong: 'Berigtigelse & sletning:', text: 'Anmod om rettelse eller sletning.' },
            { strong: 'Indsigelse & begrænsning:', text: 'Træk samtykke tilbage når som helst.' },
            { strong: 'Klage:', text: 'Indgiv klage til din lokale databeskyttelsesmyndighed.' },
          ],
        },
        {
          heading: '6. Børns privatliv',
          paragraphs: [
            'TestLine indsamler ikke bevidst data fra børn under 13 år (eller 16 i EØS). Kontakt ECORZO LLC på +1 646 427 6802.',
          ],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Netværks- & Hastighedsrapport',
    generated: 'Genereret',
    unit: 'Enhed',
    secondCopyBanner: 'ANDEN KOPI  —  Duplikeret rapportdownload',
    sec1Title: '1. Oversigt over hastighedstest',
    downloadSpeed: 'Downloadhastighed',
    uploadSpeed: 'Uploadhastighed',
    avgPing: 'Gns. ping',
    jitter: 'Jitter',
    peak: 'Spids',
    sustained: 'Vedvarende strøm',
    min: 'Min',
    probes: 'målinger',
    rttProbes: 'RTT-målinger',
    sec2Title: '2. Proxy- & VPN-detektion',
    directClean: 'Direkte forbindelse — Ingen proxy- eller VPN-signaler opdaget',
    sec3Title: '3. Netværks-, IP- & DNS-diagnostik',
    sec4Title: '4. Seneste testkørsler i sessionen',
    confidenceWord: 'sikkerhed',
    pageOf: 'Side {p} af {total}',
    secondCopyShort: 'Anden kopi',
    rowPrimaryIp: 'Primær offentlig IP',
    rowIpv4: 'IPv4-adresse',
    rowIpv6: 'IPv6-adresse',
    rowIsp: 'Internetudbyder (ISP)',
    rowAsn: 'Autonomt system (ASN)',
    rowLocation: 'Omtrentlig placering',
    rowTimezone: 'Tidszone',
    rowPtr: 'Omvendt DNS (PTR)',
    rowDoh: 'DoH-opslagstest',
    rowProtocol: 'Transportprotokol',
    rowLinkHint: 'Browserens linkhint',
    notDetected: 'Ikke opdaget',
    noPtr: 'Ingen PTR-post offentliggjort',
    reachable: 'Tilgængelig',
    unreachable: 'Utilgængelig',
    notExposed: 'Ikke eksponeret af browser',
    available: 'Tilgængelig',
    colTime: 'Tid',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Offentlig IP',
  },
};
