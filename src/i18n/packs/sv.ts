import type { TranslationPack } from '../types';

export const svPack: TranslationPack = {
  meta: {
    lang: 'sv',
    intlLocale: 'sv-SE',
    dir: 'ltr',
    nativeName: 'Svenska',
  },
  seo: {
    home: {
      title: 'TestLine — Internethastighetstest & Publik IP-sökning',
      description:
        'Testa din nedladdnings- och uppladdningshastighet, ping och jitter samt kontrollera din publika IPv4/IPv6-adress, operatörsplats, DNS-latens och VPN-status.',
      keywords:
        'hastighetstest internet, vad är min ip, publik ip-adress, nedladdningshastighet, uppladdningshastighet, pingtest, latens, jitter, ipv4, ipv6, ip-plats, vpn-kontroll',
      breadcrumbLabel: 'Hastighetstest',
    },
    news: {
      title: 'Cybersäkerhet, Nätverk & Tekniknyheter | TestLine',
      description:
        'Läs live RSS-nyheter om cybersäkerhet, bredband, DNS, BGP och teknik från Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch och Ars Technica.',
      keywords: 'cybersäkerhetsnyheter, nätverkssäkerhet rss, tekniknyheter, driftstörningar internet',
      breadcrumbLabel: 'Nyheter',
    },
    blog: {
      title: 'Guider om Internethastighet, IP-adress & VPN | TestLine',
      description:
        'Utforska 10 expertguider om internethastighet, Mbps mot MB/s, IPv4 och IPv6, IP-bedrägerier, geolokalisering, bufferbloat och VPN-detektering.',
      keywords: 'internethastighet guide, mbps mot mbs, ping och jitter, ipv4 vs ipv6, cgnat, ip-bedrägeri, vpn ip',
      breadcrumbLabel: 'Blogg',
    },
    about: {
      title: 'Om TestLine — Hastighetstest & IP-diagnostik',
      description:
        'Lär dig hur TestLine från ECORZO LLC mäter bandbredd, ping, jitter, dual-stack IPv4/IPv6, DoH DNS-latens samt VPN- eller proxyindikatorer.',
      keywords: 'om testline, ecorzo llc, metodik hastighetstest, ip-diagnostik, doh latens, ptr omvänd dns',
      breadcrumbLabel: 'Om oss',
    },
    privacy: {
      title: 'Integritetspolicy — Ephemer IP & Hastighetstest | TestLine',
      description:
        'Läs integritetspolicyn för TestLine av ECORZO LLC om flyktig IP-hantering, ingen lagring av hastighetsloggar, GDPR-efterlevnad och cookies.',
      keywords: 'testline integritetspolicy, ecorzo llc integritet, gdpr hastighetstest',
      breadcrumbLabel: 'Integritetspolicy',
    },
    contact: {
      title: 'Kontakta TestLine & ECORZO LLC — Nätverkssupport',
      description:
        'Kontakta ECORZO LLC för frågor om TestLine hastighetstest, IP-sökning, integritet eller GDPR. Ring +1 646 427 6802 eller skriv till vårt kontor i New York.',
      keywords: 'kontakta testline, ecorzo llc new york, support nätverksdiagnostik',
      breadcrumbLabel: 'Kontakt',
    },
    disclaimer: {
      title: 'Ansvarsfriskrivning — Hastighetstest & IP-sökning | TestLine',
      description:
        'Förstå variabler i hastighetstest, Wi-Fi-begränsningar, noggrannhet vid IP-geolokalisering och VPN/proxy-detektering på TestLine från ECORZO LLC.',
      keywords: 'ansvarsfriskrivning hastighetstest, ip geolokalisering noggrannhet, testline ecorzo llc',
      breadcrumbLabel: 'Ansvarsfriskrivning',
    },
    terms: {
      title: 'Användarvillkor — TestLine av ECORZO LLC',
      description:
        'Läs användarvillkoren som styr tillåten användning av TestLines internethastighetstest och publika IP-diagnostik som drivs av ECORZO LLC.',
      keywords: 'testline användarvillkor, ecorzo llc villkor, godtagbar användning',
      breadcrumbLabel: 'Användarvillkor',
    },
    'cookies-policy': {
      title: 'Cookiepolicy & Lokal Lagring — TestLine',
      description:
        'Se exakta nycklar för lokal webbläsarlagring och cookieupplysningar som används av TestLine av ECORZO LLC enligt GDPR och Googles policy.',
      keywords: 'testline cookiepolicy, localstorage, google consent mode v2',
      breadcrumbLabel: 'Cookiepolicy',
    },
    'cookies-notice': {
      title: 'Cookiemeddelande & Samtyckesinställningar — TestLine',
      description:
        'Hantera dina inställningar för cookies, analys och webbläsarens lokala lagring för TestLine av ECORZO LLC när som helst.',
      keywords: 'cookiemeddelande, hantera cookies, integritetsinställningar testline',
      breadcrumbLabel: 'Cookiemeddelande',
    },
    gdpr: {
      title: 'GDPR & Datainsamlingspolicy — TestLine',
      description:
        'Utforska ECORZO LLC:s rättsliga grunder enligt GDPR artikel 6, dataminimering, internationella överföringar och användarrättigheter.',
      keywords: 'testline gdpr policy, ecorzo llc dataskydd, artikel 6 rättslig grund',
      breadcrumbLabel: 'GDPR & Dataskydd',
    },
  },
  nav: {
    speedTest: 'Hastighetstest',
    news: 'Nyheter',
    blog: 'Blogg',
    about: 'Om oss',
    contact: 'Kontakt',
    privacy: 'Integritet',
    stopTest: 'Stoppa test',
    newBadgeSuffix: 'nya',
    homeAria: 'TestLine Startsida',
    primaryNavAria: 'Huvudnavigering',
    mobileNavAria: 'Mobilnavigering',
    companyMenuAria: 'TestLine-meny: Om oss, Kontakt och Integritet',
  },
  pwa: {
    installApp: 'Installera app',
    installAria: 'Installera TestLine-appen',
    installIosAria: 'Installera TestLine på iPhone eller iPad',
    iosTitle: 'Installera TestLine på iPhone / iPad',
    closeDialog: 'Stäng dialogruta',
    iosStep1Prefix: 'Tryck på',
    iosStep1Strong: 'Dela',
    iosStep1Suffix: '-knappen i Safaris verktygsfält.',
    iosStep2Prefix: 'Skrolla ner och tryck på',
    iosStep2Strong: 'Lägg till på hemskärmen',
    iosStep2Suffix: '.',
    iosStep3:
      'Öppna TestLine när som helst — även offline startar spelet Signal Runner automatiskt.',
    gotIt: 'Jag förstår',
  },
  hero: {
    title: 'Internethastighetstest & Publik IP-sökning',
    subtitle:
      'Kontrollera nedladdnings- och uppladdningshastighet, ping och jitter — plus din IPv4/IPv6-adress, operatörsplats, DNS-latens och VPN-status.',
    speedUnitAria: 'Hastighetsenhet',
    autoTooltip: 'Använder automatiskt Mbps under 100 Mbps och MB/s vid 100 Mbps eller högre',
    auto: 'Auto',
    lightMode: 'Ljust läge',
    darkMode: 'Mörkt läge',
    switchToLight: 'Byt till ljust läge',
    switchToDark: 'Byt till mörkt läge',
    exportPdf: 'Exportera PDF',
    exportingPdf: 'Exporterar...',
    exportDisabledTitle: 'Starta ett hastighetstest först för att exportera en PDF-rapport',
    exportEnabledTitle: 'Exportera PDF-rapport för hastighet och nätverksdiagnostik',
  },
  duplicateModal: {
    title: 'Rapporten har redan laddats ner',
    closeDialog: 'Stäng dialogruta',
    body: 'Du har redan laddat ner rapporten för denna testkörning. Vill du ladda ner den igen?',
    notePrefix: 'Omdownloads markeras tydligt som',
    secondCopy: 'Andra kopian',
    noteSuffix: 'i rapporten.',
    cancel: 'Nej, avbryt',
    confirm: 'Ja, ladda ner igen',
  },
  speedStage: {
    startSpeedTest: 'Starta hastighetstest',
    yourSpeedIs: 'Din internethastighet är',
    stopAria: 'Stoppa hastighetstest',
    startAria: 'Starta hastighetstest',
    retry: 'Försök igen',
    statusIdle: 'Klicka på Spela för att starta testet',
    statusPing: 'Mäter ping och jitter...',
    statusDownload: 'Testar nedladdningshastighet...',
    statusUpload: 'Testar uppladdningshastighet...',
    statusComplete: 'Hastighetstest slutfört',
    statusStopped: 'Test stoppat',
    statusError: 'Test avbrutet',
    uploadSpeed: 'Uppladdningshastighet',
    peakPrefix: 'Topp',
    twoStreams: '2 parallella strömmar',
    latencyAvgPing: 'Latens (Genomsnittlig ping)',
    minPrefix: 'Min',
    probesSuffix: 'mätningar',
    fiveProbes: '5 Cloudflare RTT-mätningar',
    jitter: 'Jitter',
    consecutiveVariance: 'Variation mellan paket',
    waitingRtt: 'Väntar på RTT-prover',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Meddelande om proxy- eller VPN-detektering',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy upptäckt',
      'Datacenter / Relay Network': 'Datacenter / Relänätverk',
      'Timezone Mismatch (Possible VPN)': 'Tidszonsavvikelse (Möjlig VPN)',
      'Direct Connection': 'Direkt anslutning',
    },
    confidence: {
      High: 'Hög',
      Moderate: 'Måttlig',
      Low: 'Låg',
    },
    confidenceWord: 'tillförlitlighet',
    signalSingular: 'signal',
    signalPlural: 'signaler',
    noticeDesc:
      'Din anslutning visar tecken på proxy, VPN eller datacenterrelä. Hastighetsmätningarna speglar den aktiva tunneln eller utgångsnoden.',
    observedExitIp: 'Observerad utgångs-IP',
    relayOperator: 'Relä- / Operatörsnät',
    exitLocationTz: 'Utgångsplats & tidszon',
    detectedIndicators: 'Upptäckta indikatorer',
    unavailable: 'Ej tillgänglig',
    signalTemplates: {
      proxy_flag: 'IP-adressen är flaggad som en aktiv proxy-, VPN- eller Tor-utgångsnod',
      hosting_flag:
        'Trafiken kommer från ett datacenter- eller värd-ASN snarare än en privat internetleverantör',
      provider_keyword: 'Nätverksoperatör / PTR matchar relänyckelord ({1})',
      via_header: 'Proxyvidarebefordringshuvud upptäckt ({1})',
      multi_hop: 'Flera vidarebefordringshopp observerade ({1} hopp)',
      ip_mismatch: 'Direkt webbläsar-IP skiljer sig från kantobserverad IP (split-tunnel eller proxy)',
      timezone_mismatch:
        'Webbläsarens tidszon ({1}) skiljer sig från IP-geolokaliseringens tidszon ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Publik IP-adress',
    resolvingRoute: 'Identifierar rutt',
    routeSuffix: 'rutt',
    updatedPrefix: 'Uppdaterad',
    unavailable: 'Ej tillgänglig',
    metadataUnavailable: 'Nätverksmetadata ej tillgänglig',
    copyIp: 'Kopiera IP',
    copiedIp: 'IP kopierad',
    refresh: 'Uppdatera',
    ipv46CardTitle: 'IPv4, IPv6 & Operatörsrutt',
    ipv46CardSubtitle: 'Klientprober för dual-stack kombinerat med edge IP-geolokalisering',
    ipv4Label: 'IPv4-adress',
    ipv6Label: 'IPv6-adress',
    notDetected: 'Ej upptäckt',
    ipv6NotDetected: 'Ej upptäckt (endast IPv4)',
    ispLabel: 'Internetleverantör (ISP)',
    asnLabel: 'Autonomt system (ASN)',
    locationLabel: 'Ungefärlig plats',
    proxyCheckLabel: 'Proxy- / VPN-kontroll',
    resolving: 'Slår upp...',
    inspecting: 'Analyserar...',
    directConnectionNone: 'Direkt anslutning (Ingen upptäckt)',
    dnsCardTitle: 'DNS-tips & Länkdiagnostik',
    dnsCardSubtitle: 'Omvänd PTR-post, DoH-resolvbarhet och webbläsarens transportsignaler',
    ptrLabel: 'Omvänd DNS (PTR)',
    noPtr: 'Ingen PTR-post publicerad',
    dohProbeLabel: 'DoH-resolvertest',
    probing: 'Testar...',
    reachable: 'Nåbar',
    blockedOrUnreachable: 'Blockerad eller onåbar',
    dnsLatencyLabel: 'DNS-frågelatens',
    protocolLabel: 'Transportprotokoll',
    checking: 'Kontrollerar...',
    linkHintLabel: 'Webbläsarens länkinfo',
    exposedNoMetrics: 'Exponerad utan mätvärden',
    notExposed: 'Exponeras ej av webbläsaren',
    timezoneLabel: 'Tidszon',
    copy: 'Kopiera',
    copied: 'Kopierad',
    capSuffix: 'Mbps tak',
    rttSuffix: 'ms RTT',
    fetchError: 'Kunde inte nå slutpunkter för IP-diagnostik.',
  },
  history: {
    title: 'Sessionshistorik',
    subtitle: 'Senaste mätningarna sparade lokalt i din webbläsare',
    clearHistory: 'Rensa historik',
    emptyText: 'Slutförda hastighetstester visas här så att du kan jämföra körningar.',
    colTime: 'Tid',
    colDownload: 'Nedladdning',
    colUpload: 'Uppladdning',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Publik IP',
  },
  consent: {
    title: 'Cookie- & Integritetsmeddelande',
    description:
      'TestLine använder nödvändig lokal lagring för tema, enheter och historik. Valfria analys- och annonscookies förblir avstängda om du inte accepterar.',
    acceptAll: 'Acceptera alla',
    essentialOnly: 'Endast nödvändiga',
    cookieSettings: 'Cookieinställningar',
  },
  footer: {
    byEcorzo: 'av ECORZO LLC',
    tagline:
      'Internethastighetstest i realtid och dual-stack IP-nätverksdiagnostik som drivs av ECORZO LLC.',
    companyHeading: 'Företag',
    legalHeading: 'Juridik & Efterlevnad',
    disclaimer: 'Ansvarsfriskrivning',
    terms: 'Användarvillkor',
    cookiesPolicy: 'Cookiepolicy',
    cookiesNotice: 'Cookiemeddelande',
    gdpr: 'GDPR & Datainsamlingspolicy',
    privacy: 'Integritetspolicy',
    copyrightSuffix: 'ECORZO LLC. Alla rättigheter förbehållna.',
    poweredBy:
      'Mätningar drivs av Cloudflares hastighetsnoder · Uppfyller GDPR & Googles policyer',
    languageLabel: 'Språk',
    autoOption: 'Auto (Region)',
  },
  news: {
    eyebrow: 'Live RSS-aggregator för cybersäkerhet & teknik',
    updatedPrefix: 'Uppdaterad',
    title: 'Nätverks-, säkerhets- & tekniknyheter',
    filterPlaceholder: 'Filtrera rubriker...',
    filterAria: 'Filtrera nyhetsrubriker',
    refreshFeeds: 'Uppdatera flöden',
    refreshing: 'Uppdaterar...',
    cachedBannerPrefix:
      'Live RSS-flöden kan inte nås just nu. Visar nyligen cachade artiklar sparade på enheten',
    retryLive: 'Försök med live igen',
    retrying: 'Försöker...',
    allSources: 'Alla källor',
    errorFallback:
      'Det gick inte att hämta live RSS-flöden just nu. Kontrollera din anslutning och försök uppdatera.',
    tryAgain: 'Försök igen',
    emptyText: 'Inga matchande artiklar hittades i de aktuella RSS-flödena.',
    showAll: 'Visa alla flöden',
    newTag: 'Ny',
    readFullStory: 'Läs hela artikeln',
    recent: 'Nyligen',
    minutesAgo: '{n} min sedan',
    hoursAgo: '{n} tim sedan',
  },
  blog: {
    eyebrow: 'TestLine-guider & Daglig nyhetssammanfattning',
    articlesCountSuffix: 'Artiklar',
    title: 'Internethastighet, IP-diagnostik & Dagliga rapporter',
    subtitle:
      'Fördjupade guider om internethastighet, IPv4/IPv6, IP-bedrägerier, IP-plats och VPN-detektering — plus 2 dagliga toppnyheter utvalda automatiskt från våra live RSS-flöden.',
    searchPlaceholder: 'Sök bland {n} artiklar...',
    searchAria: 'Sök bloggartiklar',
    allLabel: 'Alla',
    hotNewsLabel: 'Heta nyheter',
    dailyHotNewsBadge: 'Dagens toppnyhet',
    emptyText: 'Inga artiklar matchar ditt nuvarande filter.',
    resetFilters: 'Återställ filter',
    newTag: 'Ny',
    readArticle: 'Läs artikel',
    backToAllPrefix: 'Tillbaka till alla',
    backToAllSuffix: 'artiklar',
    originalSourcePrefix: 'Ursprunglig källa',
    testConnectionNow: 'Testa din anslutning nu',
    keyTakeaways: 'Viktiga slutsatser',
    dailyReadTime: '3 min läsning',
    dailyAuthorPrefix: 'TestLine Daglig Sammanfattning · via',
    dailyTakeawayFeatured: 'Utvald i TestLines dagliga nyhetsgenomgång ({source}) under {topic}.',
    dailyTakeawaySummaryPrefix: 'Kärnsammanfattning:',
    dailyTakeawayTip:
      'Kontrollera alltid din aktiva publika IPv4/IPv6-adress, DNS-latens och VPN/proxy-status innan du felsöker oväntade anslutningsvarningar.',
    dailySectionBriefingPrefix: 'Daglig genomgång:',
    dailyBriefingPara2:
      'Automatiskt utvald för TestLines nyhetssammanfattning den {date} baserat på aktualitet och påverkan på nätverk och cybersäkerhet. Läsare som vill granska den tekniska originalrapporten kan följa källänken ovan.',
    dailySectionActionTitle: 'Nätverksdiagnostik & Praktisk åtgärd',
    dailyActionPara1:
      'Händelser kring {topic} påverkar ofta operatörers DNS-resolvrar, routingtabeller, företags-VPN:er och klientanslutningar. Att köra ett hastighetstest och en dual-stack IP-kontroll visar direkt om din lina har förhöjt jitter, oväntade rutter eller proxybyten.',
    dailyActionPara2:
      'Håll dig uppdaterad om nya sårbarheter och bredbandsvarningar genom att följa live RSS-flöden under fliken Nyheter och våra guider i bloggen.',
    categories: {
      'Hot News': 'Heta nyheter',
      'Internet Speed': 'Internethastighet',
      'IP Addresses': 'IP-adresser',
      'IP Scams': 'IP-bedrägerier',
      'IP Location': 'IP-plats',
      'VPN IP Status': 'VPN IP-status',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Varför din verkliga nedladdningshastighet skiljer sig från operatörens plan',
        readTime: '5 min läsning',
        author: 'TestLine Teknikteam',
        summary:
          'Lär dig varför ett 500 Mbps-abonnemang ofta laddar ner filer i 50–60 MB/s, hur TCP/TLS-overhead påverkar genomströmningen och varför flera parallella strömmar slår enstaka filhämtningar.',
        keyTakeaways: [
          'Internetleverantörer marknadsför i megabit per sekund (Mbps), medan webbläsare visar megabyte per sekund (MB/s) i förhållandet 8:1.',
          'Wi-Fi-avstånd, 2,4 GHz-störningar och äldre routrar begränsar ofta gigabitfiber innan trafiken ens når operatören.',
          'Parallella HTTP-strömmar avslöjar din verkliga totala bandbredd bättre än en enda TCP-överföring.',
        ],
        sections: [
          {
            heading: 'Megabit (Mbps) mot Megabyte (MB/s)',
            paragraphs: [
              'Den största källan till förvirring vid hastighetstester är skillnaden mellan megabit per sekund (Mbps) och megabyte per sekund (MB/s). Eftersom det går 8 bitar på 1 byte ger en 400 Mbps fiberuppkoppling en teoretisk maxhastighet på 50 MB/s.',
              'När Ethernet-ramar, IP-huvuden och TLS-kryptering räknats bort hamnar verklig filöverföring oftast runt 90–94 % av abonnemangets hastighet. Med TestLine kan du växla mellan Auto, Mbps och MB/s direkt.',
            ],
          },
          {
            heading: 'Därför spelar flertrådiga tester roll',
            paragraphs: [
              'Enskilda anslutningar begränsas lätt av TCP-fönsterskalning och fördröjning till avlägsna servrar. Genom att köra tre parallella nedladdningsströmmar mättas länken jämnt och visar den faktiska kapaciteten.',
              'Om Wi-Fi och nätverkskabel ger mycket olika resultat, testa nära en 5 GHz- eller 6 GHz-router eller via Cat6-kabel för att skilja trådlösa störningar från operatörsproblem.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping mot Jitter förklarat: Det som verkligen förstör videosamtal och spel',
        readTime: '5 min läsning',
        author: 'TestLine Teknikteam',
        summary:
          'Hög nedladdningshastighet räddar inte ett Zoom-möte eller onlinespel om latensen hoppar ojämnt. Här är hur ping, jitter och bufferbloat påverkar realtidstrafik.',
        keyTakeaways: [
          'Ping mäter genomsnittlig svarstid (RTT) i millisekunder; under 30 ms upplevs som nästintill omedelbart.',
          'Jitter mäter hur mycket påföljande pingpaket varierar — även låg ping känns hackig om jittret överstiger 20–25 ms.',
          'Stora uppladdningar under samtal orsakar ofta bufferbloat om inte routerns SQM/QoS är aktiverat.',
        ],
        sections: [
          {
            heading: 'Latens är svarstid fram och tillbaka',
            paragraphs: [
              'Bandbredd avgör hur bred motorvägen är, medan ping mäter hur snabbt ett enskilt paket reser till servern och tillbaka. 4K-video buffrar flera sekunder i förväg, men röstsamtal och spel reagerar på varje millisekund.',
            ],
          },
          {
            heading: 'Varför jitter ger ljudhack',
            paragraphs: [
              'Jitter visar skillnaden i ankomsttid mellan på varandra följande paket. Om fem mätningar visar 14 ms, 16 ms, 92 ms, 15 ms och 68 ms ser snittet bra ut, men ljudströmmar tvingas tappa eller sträcka ut ramar.',
              'Smart Queue Management (SQM) på moderna routrar hindrar bakgrundsuppladdningar från att kväva röst- och spelpaket.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 mot IPv6 förklarat: Varför dual-stack-nätverk är avgörande idag',
        readTime: '6 min läsning',
        author: 'TestLine Nätverksforskning',
        summary:
          'När globala IPv4-adresser är slut och mobiloperatörer använder CGNAT blir det viktigt att förstå hur din enhet routar IPv4 och IPv6.',
        keyTakeaways: [
          'IPv4 använder 32-bitarsadresser (~4,3 miljarder totalt), vilket tvingar många operatörer att dela publika adresser via CGNAT.',
          'IPv6 använder 128-bitars hexadecimala adresser och återställer direkt routing utan NAT i flera lager.',
          'Dual-stack-testning kontrollerar om din enhet har både IPv4- och IPv6-väg samtidigt.',
        ],
        sections: [
          {
            heading: 'Verkligheten bakom IPv4-brist och CGNAT',
            paragraphs: [
              'Varje IPv4-adress består av fyra oktetter som 203.0.113.42. Eftersom lediga IPv4-block tagit slut placerar många fiber- och 5G-operatörer kunder bakom Carrier-Grade NAT (CGNAT) där många hushåll delar samma publika IPv4.',
            ],
          },
          {
            heading: 'Hur dual-stack förbättrar hastigheten',
            paragraphs: [
              'På ett dual-stack-nätverk föredrar moderna system IPv6 via Happy Eyeballs när målet stöder det. Att slippa CGNAT-översättning minskar uppkopplingstiden och risken att någon annans IP-blockering drabbar dig.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Publik IP mot Privat IP & Hur omvänd DNS (PTR) identifierar operatörer',
        readTime: '4 min läsning',
        author: 'TestLine Nätverksforskning',
        summary:
          'Varför telefonens Wi-Fi-inställningar visar 192.168.1.45 medan webbplatser ser en helt annan publik IP — och vad PTR avslöjar om din operatör.',
        keyTakeaways: [
          'Privata RFC 1918-intervall (10.x, 172.16–31.x, 192.168.x) finns endast i ditt lokala hem- eller kontorsnät.',
          'Din router byter ut privata adresser mot operatörens publika IP via Network Address Translation (NAT).',
          'Omvänd DNS (PTR) kopplar en publik IP till ett värdnamn som ofta anger region och anslutningstyp.',
        ],
        sections: [
          {
            heading: 'Innanför routern mot det publika internet',
            paragraphs: [
              'I Wi-Fi-inställningarna ser du oftast en intern adress som 192.168.1.24. Den kan inte routas på internet och återanvänds i miljontals lokala nätverk.',
              'När trafik lämnar routern skriver NAT om avsändaren till din publika WAN-IP så att externa servrar kan svara.',
            ],
          },
          {
            heading: 'Läsa ledtrådar i omvänd DNS (PTR)',
            paragraphs: [
              'Internetleverantörer publicerar ofta beskrivande PTR-poster för sina IP-pooler. Säkerhetsteam och diagnostikverktyg läser PTR tillsammans med ASN för att skilja privatfiber från molnservrar.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Så avslöjar du falska "Din IP har hackats"-varningar och supportbedrägerier',
        readTime: '5 min läsning',
        author: 'TestLine Säkerhetsdesk',
        summary:
          'Bluff-popups visar gärna din riktiga IP-adress och stad för att skapa panik. Lär dig varför alla sajter ser din IP automatiskt — och vad bedragare inte kan göra med den.',
        keyTakeaways: [
          'Varje webbplats du besöker får din publika IP och ungefärliga stad via standardiserad HTTP-routing — att visa den bevisar inget intrång.',
          'Falska virusvarningar försöker skrämma dig att ringa bluffnummer eller installera fjärrstyrningsprogram.',
          'En publik IP ensam avslöjar aldrig ditt namn, gatuadress, bankinloggning eller filer.',
        ],
        sections: [
          {
            heading: 'Varför att visa din IP är ett psykologiskt knep',
            paragraphs: [
              'Skadliga annonsomdirigeringar visar ibland röda varningar med din riktiga IP och stad. Eftersom webbservrar måste veta vart webbsidor ska skickas får varje sajt din IP — helt normalt och inget tecken på hackning.',
            ],
          },
          {
            heading: 'Vad en IP-adress faktiskt avslöjar — och inte avslöjar',
            paragraphs: [
              'Din publika IP pekar ut operatörens kantnod och ett större stadsområde, inte din lägenhet eller dina filer. Ring aldrig nummer i webbläsarvarningar och ge aldrig fjärråtkomst via AnyDesk eller TeamViewer.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP-spoofing, förfalskade headers & missbruk av hushållsproxys förklarat',
        readTime: '6 min läsning',
        author: 'TestLine Säkerhetsdesk',
        summary:
          'Från manipulerade X-Forwarded-For-huvuden till skadlig kod som gör hemroutrar och "gratis VPN"-appar till utgångsnoder för andras trafik.',
        keyTakeaways: [
          'Att förfalska en rå TCP-käll-IP klarar inte en vanlig HTTPS-handskakning, så angripare utnyttjar i stället kapade enheter och tvivelaktiga gratisproxys.',
          'Vissa gratis VPN-appar eller okända webbläsartillägg hyr i tysthet ut din hem-IP till trafikmäklare.',
          'Kontroll av PTR, ASN och vidarebefordringshuvuden visar om ett oväntat relä fångar upp din trafik.',
        ],
        sections: [
          {
            heading: 'Den dolda kostnaden med "gratis" proxyappar',
            paragraphs: [
              'Till skillnad från datacenter-IP:er har vanliga hushållsadresser högt förtroende. Oseriösa tillägg och APK-filer bakar ibland in proxy-SDK:er som skickar skrapning eller bedrägeritrafik genom ditt hemnätverk.',
            ],
          },
          {
            heading: 'Kontrollera ren utgående routing',
            paragraphs: [
              'Rensa okända tillägg regelbundet, stäng onödig UPnP och kör ett IP- och proxytest för att bekräfta att din trafik går rakt via din egen internetleverantör.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Hur IP-geolokalisering fungerar — och varför staden ofta är fel',
        readTime: '5 min läsning',
        author: 'TestLine Nätverksforskning',
        summary:
          'IP-adresser innehåller inga GPS-koordinater. Se hur GeoIP-databaser kopplar IP-block till regioner och varför mobilnät ofta hamnar i en annan stad.',
        keyTakeaways: [
          'IP-geolokalisering bygger på RIR-tilldelningar, BGP-annonseringar och operatörsdata snarare än GPS.',
          'Mobiloperatörer samlar LTE- och 5G-trafik till centrala gateways hundratals kilometer bort.',
          'Landsträffsäkerheten överstiger 98 %, medan gatuadress via IP är en myt.',
        ],
        sections: [
          {
            heading: 'Ingen GPS i IP-paket',
            paragraphs: [
              'Till skillnad från mobilens GPS eller Wi-Fi-triangulering bygger webbens IP-platser på WHOIS-block och peeringtabeller som anger var ett IP-intervall är registrerat.',
            ],
          },
          {
            heading: 'Varför mobil- och fiber-IP flyttar stad',
            paragraphs: [
              'När en operatör flyttar ett subnät mellan städer eller dirigerar 5G-trafik genom Stockholm trots att du sitter i Uppsala visar alla IP-verktyg Stockholm tills databaserna uppdaterats.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Tidszonsavvikelse & Operatörsrouting: Varför sajter placerar dig fel',
        readTime: '4 min läsning',
        author: 'TestLine Nätverksforskning',
        summary:
          'Varför bedrägerifilter jämför din webbläsarklocka med IP-adressens tidszon — och när vanlig operatörsrouting ger falska utslag.',
        keyTakeaways: [
          'Betalnings- och säkerhetssystem jämför webbläsarens Intl-tidszon med IP-adressens tidszon.',
          'Gränsöverskridande backhaul, företags-VPN eller roaming-SIM kan ge harmlösa avvikelser.',
          'TestLine visar både webbläsarens och IP-adressens tidszon sida vid sida.',
        ],
        sections: [
          {
            heading: 'Hur tidszonsjämförelser fungerar',
            paragraphs: [
              'En snabb passiv signal jämför operativsystemets tidszon med IP-geolokaliseringens tidszon. Om trafiken ser ut att komma från ett annat land reagerar filtret direkt.',
            ],
          },
          {
            heading: 'Falska utslag vid gränser och roaming',
            paragraphs: [
              'Resenärer med roaming-SIM behåller ofta hemoperatörens gateway i hemlandets tidszon. Genomskinlig diagnostik visar direkt om avvikelsen kommer från VPN eller mobilrouting.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Hur webbplatser upptäcker en VPN-, proxy- eller datacenter-IP',
        readTime: '6 min läsning',
        author: 'TestLine Säkerhetsdesk',
        summary:
          'Undrar du varför banker och streamingtjänster ändå märker när ett VPN är igång? Här är de fyra tekniska signalerna bakom VPN-detektering.',
        keyTakeaways: [
          'ASN-nummer skiljer direkt molnleverantörer (M247, DigitalOcean, Hetzner, AWS) från vanliga internetleverantörer.',
          'Vidarebefordringshuvuden som Via och multi-hop X-Forwarded-For avslöjar transparenta proxys.',
          'PTR-mönster och tidszonsavvikelser förstärker tillförlitlighetsbedömningen.',
        ],
        sections: [
          {
            heading: 'ASN-klassificering: Den starkaste signalen',
            paragraphs: [
              'Varje publik IP tillhör ett ASN som drivs av antingen en konsument-ISP, ett universitet, ett företag eller ett datacenter. Eftersom VPN-tjänster hyr servrar i datacenter-ASN syns det på millisekunder.',
            ],
          },
          {
            heading: 'PTR-namn, headers och tidszoner',
            paragraphs: [
              'Diagnostikmotorer kombinerar ASN, PTR-nyckelord, HTTP-huvuden och tidszonskontroll så att du tydligt ser vad din aktiva tunnel exponerar.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS-läckor, IPv6-läckor & Split Tunneling: Testa din riktiga VPN-status',
        readTime: '5 min läsning',
        author: 'TestLine Säkerhetsdesk',
        summary:
          'Även med VPN påslaget kan okrypterade DNS-anrop eller otunnlad IPv6 tyst avslöja din verkliga plats. Lär dig kontrollera tunneln.',
        keyTakeaways: [
          'En IPv6-läcka uppstår när VPN bara tunnlar IPv4 medan din dual-stack-operatör skickar IPv6 direkt.',
          'En DNS-läcka skickar domänuppslagningar till din lokala operatör utanför den krypterade tunneln.',
          'Att testa både IPv4/IPv6 och Cloudflare DoH verifierar hela tunnelns integritet.',
        ],
        sections: [
          {
            heading: 'Dual-stack-fällan med IPv6-läckor',
            paragraphs: [
              'Många äldre VPN-klienter skapar bara ett virtuellt IPv4-nätkort. På moderna fiber- och mobilnät väljer webbläsaren annars IPv6 direkt förbi tunneln om inte VPN blockerar eller tunnlar IPv6.',
            ],
          },
          {
            heading: 'Kontrollera tunneln på några sekunder',
            paragraphs: [
              'Kör ett nytt test på TestLine efter att VPN anslutits och bekräfta att både IPv4 och IPv6 pekar på VPN-utgången, att ASN visar reläoperatören och att krypterad DoH fungerar.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet återställt',
    offlineMode: 'Offlineläge — Internet frånkopplat',
    connectionActive: 'Anslutningen är aktiv igen',
    playWhileWaiting: 'Spela Signal Runner medan du väntar på återanslutning',
    score: 'Poäng',
    best: 'Bästa',
    muteAria: 'Stäng av spelljud',
    unmuteAria: 'Slå på spelljud',
    pauseAria: 'Pausa spel',
    resumeAria: 'Återuppta spel',
    returnToSpeedTest: 'Tillbaka till hastighetstest',
    checking: 'Kontrollerar...',
    checkConnection: 'Kontrollera anslutning',
    canvasAria: 'Spelyta för offline-spelet Signal Runner',
    title: 'Signal Runner',
    subtitle:
      'Hoppa över torn, spikar och drönare tills internet kommer tillbaka. Dubbelhopp är aktiverat.',
    startGame: 'Starta spel',
    tapHint: 'Tryck på skärmen eller tryck Mellanslag / Uppåtpil för att hoppa',
    paused: 'Spel pausat',
    resume: 'Fortsätt',
    gameOver: 'Signalen bröts',
    cleared: 'Passerade:',
    newBest: 'Nytt rekord!',
    playAgain: 'Spela igen',
    backToSpeedTest: 'Tillbaka till hastighetstest',
    jump: 'Hoppa',
    fastDrop: 'Snabbdyk',
    desktopHintPrefix: 'Tangentbord:',
    desktopJump: 'Hoppa',
    desktopDrop: 'Dyk',
    desktopPause: 'Paus',
  },
  faq: {
    tableTitle: 'Referens för Internethastighetstest & IP-sökning',
    tableSubtitle:
      'TestLine av ECORZO LLC mäter nedladdnings- och uppladdningshastighet i realtid, pinglatens, jitter, publika IPv4/IPv6-adresser, IP-geolokalisering, DNS-hastighet samt VPN- eller proxyindikatorer.',
    readGuidesLink: 'Läs 10 guider om hastighet & IP',
    colMetric: 'Mätvärde',
    colMethod: 'Mätmetod',
    colThreshold: 'Målvärde',
    colImpact: 'Huvudsaklig påverkan',
    benchmarks: [
      {
        metric: 'Nedladdningshastighet (Mbps / MB/s)',
        method: '3 parallella 25 MB HTTP-strömmar (10 s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Flera användare)',
        standardUse: 'Streaming, nedladdningar, molnsynk',
      },
      {
        metric: 'Uppladdningshastighet (Mbps / MB/s)',
        method: '2 parallella 10 MB XHR POST-strömmar',
        optimal: '10+ Mbps (HD-samtal) · 25+ Mbps (Skapare)',
        standardUse: 'Videosamtal, säkerhetskopior, livesändning',
      },
      {
        metric: 'Ping & obelastad latens',
        method: '5 sekventiella 0-byte Cloudflare RTT-prover',
        optimal: '< 30 ms (Låg) · 30–60 ms (Normal)',
        standardUse: 'Onlinespel, VoIP, snabb surfning',
      },
      {
        metric: 'Jitter & känslighet för bufferbloat',
        method: 'Genomsnittlig RTT-variation mellan påföljande prover',
        optimal: '< 10 ms (Stabil) · > 25 ms (Överbelastad)',
        standardUse: 'Stabilt ljud och video under belastning',
      },
      {
        metric: 'DoH DNS-latens & PTR-uppslag',
        method: 'Krypterad 1.1.1.1-fråga + omvänd DNS PTR',
        optimal: '< 40 ms DNS-uppslagning',
        standardUse: 'Snabb domänuppslagning & operatörskontroll',
      },
      {
        metric: 'Dual-Stack IP, Plats & VPN-status',
        method: 'IPv4/IPv6 + ISP/ASN + Header-/tidszonskontroll',
        optimal: 'Direkt ISP-IP eller verifierad VPN-utgång',
        standardUse: 'Vad är min IP, IP-plats, VPN/proxykontroll',
      },
    ],
    faqTitle: 'Vanliga frågor',
    faqSubtitle:
      'Direkta svar om internethastighetstest, vad är min IP, IP-plats, VPN-status och integritet',
    newsLink: 'Säkerhets- & nätverksnyheter',
    methodologyLink: 'Fullständig metodik',
    gdprLink: 'GDPR & Datapolicy',
    items: [
      {
        question: 'Hur snabb är min nedladdnings- och uppladdningshastighet?',
        answer:
          'Klicka på Starta hastighetstest för att mäta din verkliga nedladdnings- och uppladdningshastighet i Mbps eller MB/s. TestLine kör 3 parallella 25 MB-strömmar i 10 sekunder för nedladdning och 2 parallella 10 MB-strömmar för uppladdning mot Cloudflares kantservrar.',
      },
      {
        question: 'Vad är min publika IPv4- och IPv6-adress?',
        answer:
          'När du startar ett test på TestLine identifierar dual-stack-diagnostiken både din publika IPv4- och IPv6-adress sida vid sida med kopieringsknappar, tillsammans med stad, region, land, ISP och ASN.',
      },
      {
        question: 'Vad är bra värden för ping, jitter och bufferbloat?',
        answer:
          'Obelastad ping under 30 ms och jitter under 10 ms ger smidiga videosamtal och onlinespel. När latensen spikar kraftigt under tunga överföringar tyder det på bufferbloat i routern.',
      },
      {
        question: 'Hur exakt är IP-geolokalisering för att kontrollera min plats?',
        answer:
          'IP-geolokalisering kopplar ditt publika IP-block till registrerat land, region och stad via operatörsdatabaser. Stadsnivå stämmer väl för nätverksdiagnostik, men avslöjar aldrig din exakta gatuadress.',
      },
      {
        question: 'Hur upptäcker TestLine VPN, proxy eller datacenter-IP?',
        answer:
          'TestLine granskar HTTP-vidarebefordringshuvuden, hosting-/datacenter-ASN, omvända DNS-värdnamn (PTR) och avvikelser mellan webbläsarens och IP-adressens tidszon.',
      },
      {
        question: 'Vad är DNS-over-HTTPS (DoH)-latens och omvänd DNS (PTR)?',
        answer:
          'DoH-latens mäter hur snabbt ditt nätverk löser domännamn krypterat via Cloudflare 1.1.1.1, medan omvänd DNS (PTR) visar värdnamnet som operatören tilldelat din IP-adress.',
      },
      {
        question: 'Loggar eller lagrar ECORZO LLC min IP-adress eller mina testresultat?',
        answer:
          'Nej. Hastighetstester och IP-uppslag körs endast på begäran, behandlas flyktigt i minnet och säljs eller lagras aldrig i användarprofiler. Din historik stannar lokalt i webbläsaren och PDF-rapporter skapas lokalt på enheten.',
      },
      {
        question: 'Kan jag installera TestLine som app eller spela offline om internet försvinner?',
        answer:
          'Ja. TestLine är en installerbar PWA för Android, iOS och dator. När enheten tappar internetanslutning startar spelet Signal Runner automatiskt tills anslutningen är tillbaka.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Tillbaka till hastighetstest',
    effectiveDatePrefix: 'Gäller från:',
    operatorLabel: 'Operatör: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Om TestLine',
      subtitle:
        'Skapad av ECORZO LLC för att erbjuda transparenta hastighetstester och publik IPv4/IPv6-diagnostik i en snabb och integritetsvänlig webbapp.',
      sections: [
        {
          heading: 'Vad TestLine mäter',
          paragraphs: [
            'TestLine är ett kostnadsfritt verktyg för internethastighetstest och publik IP-diagnostik som drivs av ECORZO LLC. När du klickar på Starta hastighetstest körs mätningar av genomströmning, latens, IP-geolokalisering och VPN-status direkt mellan din webbläsare och globala kantnoder utan tillägg eller registrering.',
          ],
          bullets: [
            {
              strong: 'Nedladdnings- & uppladdningshastighet (Mbps / MB/s):',
              text: 'Kör parallella HTTP-strömmar mot Cloudflares publika hastighetsnoder i Auto, Mbps eller MB/s.',
            },
            {
              strong: 'Ping, jitter & latenstillstånd:',
              text: 'Mäter okachade RTT-prover för genomsnittlig ping, lägsta ping och jittervariation.',
            },
            {
              strong: 'Publik IPv4/IPv6, Plats, ISP & ASN:',
              text: 'Visar IPv4 och IPv6 sida vid sida, ungefärlig stad/land, operatör, ASN, omvänd DNS (PTR) och krypterad DoH-latens.',
            },
            {
              strong: 'VPN-, proxy- & datacenterkontroll:',
              text: 'Analyserar HTTP-huvuden, hosting-ASN, PTR-mönster och tidszonsöverensstämmelse.',
            },
          ],
        },
      ],
      closingTitle: 'Kunskapsbas, nyheter & företagsuppgifter',
      closingIntro: 'Utforska våra',
      closingGuidesLink: '10 guider om hastighet, IP, bedrägerier & VPN',
      closingMid: 'eller läs aktuella cybersäkerhets- och nätverksrubriker i',
      closingNewsLink: 'TestLine News RSS-flöde',
      closingOutro:
        '. TestLine utvecklas och drivs av ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA. För support eller frågor, besök vår',
      closingContactLink: 'Kontaktsida',
    },
    contact: {
      title: 'Kontakta ECORZO LLC',
      subtitle:
        'Nå vårt team gällande TestLine-diagnostik, integritetsbegäranden, GDPR-frågor eller juridisk efterlevnad.',
      telephone: 'Telefon',
      addressLabel: 'Registrerad företagsadress',
      copy: 'Kopiera',
      copied: 'Kopierad',
      formHeading: 'Skicka en förfrågan',
      sentTitle: 'Förfrågan förberedd',
      sentBodyPrefix:
        'Tack, {name}. Dina uppgifter har noterats för granskning. För brådskande juridiska eller GDPR-ärenden, ring +1 646 427 6802 eller skriv till ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Skicka en ny förfrågan',
      nameLabel: 'Fullständigt namn',
      namePlaceholder: 'Anna Andersson',
      emailLabel: 'E-postadress',
      emailPlaceholder: 'du@exempel.se',
      messageLabel: 'Meddelande',
      messagePlaceholder: 'Hur kan ECORZO LLC hjälpa dig?',
      submitBtn: 'Skicka meddelande',
      errMissing: 'Ange ditt namn, din e-postadress och ett meddelande.',
      errInvalidEmail: 'Ange en giltig e-postadress.',
    },
    privacy: {
      title: 'Integritetspolicy',
      subtitle:
        'Hur TestLine av ECORZO LLC behandlar och skyddar diagnostisk information i enlighet med Googles policyer och gällande integritetslagstiftning.',
      sections: [
        {
          heading: '1. Personuppgiftsansvarig & Omfattning',
          paragraphs: [
            'Denna integritetspolicy gäller din användning av TestLine, som drivs av ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; telefon: +1 646 427 6802). Den är utformad för att uppfylla EU/UK GDPR, CCPA/CPRA och Googles krav på användarsamtycke.',
          ],
        },
        {
          heading: '2. Information som behandlas vid diagnostik',
          bullets: [
            {
              strong: 'Nätverks- & IP-telemetri:',
              text: 'Din publika IPv4/IPv6-adress, ISP, ASN, ungefärliga plats, omvänd DNS (PTR) och HTTP-huvuden behandlas flyktigt i minnet för att visa din nätverksdiagnostik.',
            },
            {
              strong: 'Hastighetsmätningar:',
              text: 'Resultat beräknas i din webbläsare och sparas endast i lokal webbläsarlagring (testline_history_v1). Du kan rensa historiken när som helst.',
            },
            {
              strong: 'Webbläsarinställningar:',
              text: 'Tema (testline_theme), språkval och cookiesamtycke (testline_cookie_consent) sparas lokalt på enheten.',
            },
          ],
        },
        {
          heading: '3. Tredjepartstjänster & Google-upplysning',
          paragraphs: [
            'För att utföra mätningar kommunicerar webbläsaren direkt med etablerade infrastrukturtjänster såsom Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io) och Ipify (api.ipify.org). När Googles tjänster laddas kan cookies eller enhetsidentifierare användas enligt:',
          ],
        },
        {
          heading: '4. Ingen försäljning av personuppgifter & Lagring',
          paragraphs: [
            'ECORZO LLC säljer eller hyr aldrig ut dina personuppgifter eller din IP-adress. Diagnostik på servern är tillfällig och sparas inte i användarprofiler. PDF-rapporter skapas helt i din webbläsare.',
          ],
        },
      ],
      googlePolicyLinkText: 'Hur Google använder information från webbplatser och appar som använder våra tjänster',
      rightsPrefix:
        'Beroende på din jurisdiktion har du rätt till tillgång, rättelse, radering eller begränsning samt att återkalla samtycke. Läs vår',
      gdprLinkText: 'GDPR & Datainsamlingspolicy',
      rightsSuffix:
        'eller kontakta ECORZO LLC på +1 646 427 6802 eller 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Ansvarsfriskrivning',
      subtitle:
        'Viktiga begränsningar gällande hastighetsmätningar, IP-geolokalisering och proxy/VPN-indikatorer.',
      sections: [
        {
          heading: '1. Endast för information och diagnostik',
          paragraphs: [
            'TestLine av ECORZO LLC tillhandahålls i befintligt skick för allmän nätverksdiagnostik. Uppmätta värden speglar den aktuella genomströmningen vid testtillfället och utgör ingen bindande operatörscertifiering.',
          ],
        },
        {
          heading: '2. Faktorer som påverkar hastigheten',
          paragraphs: [
            'Uppmätt hastighet, ping och jitter påverkas av Wi-Fi-signal, routerprestanda, bakgrundstrafik, VPN-kryptering, trafikformning hos ISP och peeringbelastning.',
          ],
        },
        {
          heading: '3. Noggrannhet vid IP-plats och proxykontroll',
          paragraphs: [
            'Stad, region och ISP hämtas från tredjepartsdatabaser och anger var IP-blocket är registrerat, inte din gatuadress. Proxy- och VPN-flaggor bygger på tekniska heuristiker.',
          ],
        },
        {
          heading: '4. Ansvarsbegränsning',
          paragraphs: [
            'I den utsträckning lagen medger frånsäger sig ECORZO LLC alla garantier och ansvarar inte för indirekta skador eller följdskador till följd av diagnostikdata eller exporterade rapporter.',
          ],
        },
      ],
    },
    terms: {
      title: 'Användarvillkor',
      subtitle: 'Regler för åtkomst till och användning av TestLine av ECORZO LLC.',
      sections: [
        {
          heading: '1. Godkännande av villkor',
          paragraphs: [
            'Genom att använda TestLine godkänner du dessa användarvillkor och gällande lagstiftning. Om du inte samtycker ska du sluta använda tjänsten.',
          ],
        },
        {
          heading: '2. Tillåten & förbjuden användning',
          bullets: [
            {
              text: 'Du får använda TestLine för privat, utbildningsmässig eller legitim företagsfelsökning och exportera PDF-rapporter för eget bruk.',
            },
            {
              text: 'Automatiserade bottar, belastningsangrepp, DDoS-verktyg eller högfrekvent skrapning mot TestLine eller underliggande noder är förbjudet.',
            },
            {
              text: 'Du får inte försöka kringgå hastighetsbegränsningar eller utge TestLine-rapporter för myndighetscertifikat.',
            },
          ],
        },
        {
          heading: '3. Immateriella rättigheter',
          paragraphs: [
            'Namnet TestLine, gränssnittet och källkoden tillhör ECORZO LLC. Tredjepartsvarumärken tillhör respektive ägare.',
          ],
        },
        {
          heading: '4. Tillämplig lag',
          paragraphs: [
            'Dessa villkor styrs av lagarna i delstaten New York och USA.',
          ],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookiepolicy',
      subtitle: 'Detaljerad översikt över cookies och lokal lagring i TestLine.',
      sec1Title: '1. Vad är cookies och lokal lagring?',
      sec1Body:
        'Cookies är små textfiler som sparas på din enhet. Moderna webbappar använder även localStorage för att minnas inställningar lokalt utan att skicka dem med varje nätverksanrop.',
      sec2Title: '2. Lagringsnycklar som används av TestLine',
      colKey: 'Nyckel / Identifierare',
      colCategory: 'Kategori',
      colPurpose: 'Syfte',
      rows: [
        {
          key: 'testline_theme',
          category: 'Nödvändig inställning',
          purpose: 'Sparar valt ljust eller mörkt tema mellan besök.',
        },
        {
          key: 'testline_unit_v1',
          category: 'Nödvändig inställning',
          purpose: 'Sparar vald hastighetsenhet (Auto, Mbps eller MB/s).',
        },
        {
          key: 'testline_history_v1',
          category: 'Funktionell lokal',
          purpose: 'Sparar upp till 15 senaste hastighetsmätningar lokalt i webbläsaren.',
        },
        {
          key: 'testline_cookie_consent',
          category: 'Nödvändigt samtycke',
          purpose: 'Sparar ditt samtyckesval enligt Google Consent Mode v2.',
        },
      ],
      sec3Title: '3. Tredjeparts- och Google-upplysningar',
      sec3Prefix:
        'Enligt Googles EU-samtyckespolicy och Google Consent Mode v2 är lagring för annonser och analys nekad som standard tills du väljer att godkänna. Auktoriserade säljare finns på',
      sec3Mid: '. Du kan ändra ditt val när som helst på sidan',
      cookiesNoticeLinkText: 'Cookiemeddelande',
      sec3OrVia: 'eller via',
      googleAdSettingsText: 'Googles annonsinställningar',
    },
    cookiesNotice: {
      title: 'Cookiemeddelande & Samtyckesval',
      subtitle: 'Hantera dina samtyckesinställningar för TestLine av ECORZO LLC.',
      sec1Title: 'Information till besökare (EES, Storbritannien, Schweiz & globalt)',
      sec1Body:
        'TestLine använder strikt nödvändig lagring för tema, enheter, lokal testhistorik och samtyckesstatus. Annons- och analyslagring är avslagen tills du samtycker och kan alltid återkallas.',
      activeTitle: 'Aktivt samtyckesval',
      currentSettingLabel: 'Nuvarande inställning:',
      statusAll: 'Alla godkända (Analys & Annonsläge)',
      statusEssential: 'Endast strikt nödvändiga',
      statusUnset: 'Ej valt ännu (Icke-nödvändiga nekade)',
      savedBadge: 'Inställningar sparade',
      acceptAllBtn: 'Acceptera all funktionell lagring',
      essentialOnlyBtn: 'Endast nödvändiga',
      sec2Title: 'Kontroller i webbläsaren',
      sec2Body:
        'Du kan också blockera eller rensa webbplatslagring i din webbläsares sekretessinställningar.',
    },
    gdpr: {
      title: 'GDPR & Datainsamlingspolicy',
      subtitle:
        'Rättslig grund, dataminimering, internationella överföringar och rättigheter enligt EU/UK GDPR.',
      sections: [
        {
          heading: '1. Personuppgiftsansvarig',
          paragraphs: [
            'Personuppgiftsansvarig enligt GDPR är ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Telefon: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Rättsliga grunder (Artikel 6)',
          bullets: [
            {
              strong: 'Avtal / Begärd tjänst (Art. 6.1 b):',
              text: 'Behandling av IP-adress och bandbreddsströmmar krävs för att leverera det hastighetstest du begärt.',
            },
            {
              strong: 'Berättigat intresse (Art. 6.1 f):',
              text: 'Skydd mot missbruk, DDoS och säkerställande av nätverksstabilitet.',
            },
            {
              strong: 'Uttryckligt samtycke (Art. 6.1 a):',
              text: 'Icke-nödvändiga cookies eller analysidentifierare behandlas endast med ditt samtycke.',
            },
          ],
        },
        {
          heading: '3. Dataminimering & Lagringstid',
          paragraphs: [
            'ECORZO LLC tillämpar strikt dataminimering enligt artikel 5. Inga konton eller lösenord krävs. IP-metadata behandlas tillfälligt i realtid utan permanenta profiler.',
          ],
        },
        {
          heading: '4. Internationella överföringar',
          paragraphs: [
            'Mätförfrågningar kan dirigeras via Cloudflare- eller Google Cloud-noder närmast dig med stöd av standardavtalsklausuler (SCC).',
          ],
        },
        {
          heading: '5. Dina lagstadgade rättigheter (Art. 15–22)',
          bullets: [
            { strong: 'Tillgång & dataportabilitet:', text: 'Begär bekräftelse och kopia av eventuella personuppgifter.' },
            { strong: 'Rättelse & radering:', text: 'Begär korrigering eller radering.' },
            { strong: 'Invändning & begränsning:', text: 'Invänd mot behandling eller återkalla samtycke när som helst.' },
            { strong: 'Klagomål:', text: 'Du har rätt att klaga hos din lokala dataskyddsmyndighet.' },
          ],
        },
        {
          heading: '6. Barns integritet',
          paragraphs: [
            'TestLine samlar inte medvetet in personuppgifter från barn under 13 år (eller under 16 i EES). Kontakta ECORZO LLC på +1 646 427 6802 vid frågor.',
          ],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Nätverks- & Hastighetsrapport',
    generated: 'Skapad',
    unit: 'Enhet',
    secondCopyBanner: 'ANDRA KOPIAN  —  Duplicerad nedladdning av rapport',
    sec1Title: '1. Sammanfattning av hastighetstest',
    downloadSpeed: 'Nedladdning',
    uploadSpeed: 'Uppladdning',
    avgPing: 'Genomsnittlig ping',
    jitter: 'Jitter',
    peak: 'Topp',
    sustained: 'Uthållig ström',
    min: 'Min',
    probes: 'prover',
    rttProbes: 'RTT-prover',
    sec2Title: '2. Proxy- & VPN-detektering',
    directClean: 'Direkt anslutning — Inga proxy- eller VPN-signaler upptäckta',
    sec3Title: '3. Nätverks-, IP- & DNS-diagnostik',
    sec4Title: '4. Senaste mätningarna i sessionen',
    confidenceWord: 'tillförlitlighet',
    pageOf: 'Sida {p} av {total}',
    secondCopyShort: 'Andra kopian',
    rowPrimaryIp: 'Primär publik IP',
    rowIpv4: 'IPv4-adress',
    rowIpv6: 'IPv6-adress',
    rowIsp: 'Operatör (ISP)',
    rowAsn: 'Autonomt system (ASN)',
    rowLocation: 'Ungefärlig plats',
    rowTimezone: 'Tidszon',
    rowPtr: 'Omvänd DNS (PTR)',
    rowDoh: 'DoH-resolvertest',
    rowProtocol: 'Transportprotokoll',
    rowLinkHint: 'Webbläsarens länkinfo',
    notDetected: 'Ej upptäckt',
    noPtr: 'Ingen PTR-post publicerad',
    reachable: 'Nåbar',
    unreachable: 'Onåbar',
    notExposed: 'Exponeras ej av webbläsaren',
    available: 'Tillgänglig',
    colTime: 'Tid',
    colDownload: 'Nedladdning',
    colUpload: 'Uppladdning',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Publik IP',
  },
};
