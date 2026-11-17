import type { TranslationPack } from '../types';

export const nlPack: TranslationPack = {
  meta: {
    lang: 'nl',
    intlLocale: 'nl-NL',
    dir: 'ltr',
    nativeName: 'Nederlands',
  },
  seo: {
    home: {
      title: 'TestLine — Internetsnelheidstest & Publiek IP Opzoeken',
      description:
        'Test je download- en uploadsnelheid, ping en jitter en bekijk je publieke IP-adres (IPv4/IPv6), ISP-locatie, DNS-latentie en VPN-status.',
      keywords:
        'internetsnelheidstest, speedtest, wat is mijn ip, publiek ip adres, downloadsnelheid, uploadsnelheid, ping test, jitter, ipv4, ipv6, ip locatie, vpn detectie',
      breadcrumbLabel: 'Snelheidstest',
    },
    news: {
      title: 'Cybersecurity-, Netwerk- & Technieuws | TestLine',
      description:
        'Lees live RSS-nieuws over cybersecurity, breedband, DNS, BGP en technologie van Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch en Ars Technica.',
      keywords: 'cybersecurity nieuws, netwerkbeveiliging rss, cloudflare blog, internetstoringen',
      breadcrumbLabel: 'Nieuws',
    },
    blog: {
      title: 'Gidsen voor Internetsnelheid, IP & VPN | TestLine',
      description:
        'Ontdek 10 deskundige gidsen over internetsnelheid, Mbps vs MB/s, IPv4 & IPv6, IP-fraude, geolocatie, bufferbloat en VPN-detectie.',
      keywords: 'internetsnelheid gids, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, vpn check',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'Over TestLine — Snelheidstest & IP-Diagnostiek',
      description:
        'Lees hoe TestLine van ECORZO LLC download-/uploadsnelheid, ping, jitter, dual-stack IPv4/IPv6-routing, DoH-DNS-latentie en VPN/proxy-signalen test.',
      keywords: 'over testline, ecorzo llc, speedtest methodologie, ip diagnostiek',
      breadcrumbLabel: 'Over ons',
    },
    privacy: {
      title: 'Privacybeleid — Tijdelijke IP-Lookup & Snelheidstest | TestLine',
      description:
        'Lees het Privacybeleid van TestLine (ECORZO LLC) over vluchtige IP-verwerking, geen permanente opslag van resultaten, AVG/GDPR en cookies.',
      keywords: 'testline privacybeleid, ecorzo llc, avg gdpr, geen ip logging',
      breadcrumbLabel: 'Privacybeleid',
    },
    contact: {
      title: 'Contact TestLine & ECORZO LLC — Netwerkondersteuning',
      description:
        'Neem contact op met ECORZO LLC over de TestLine snelheidstest, IP-diagnostiek, privacy of AVG-verzoeken.',
      keywords: 'contact testline, ecorzo llc new york, ondersteuning, privacy',
      breadcrumbLabel: 'Contact',
    },
    disclaimer: {
      title: 'Disclaimer — Meetbereik & IP-Nauwkeurigheid | TestLine',
      description:
        'Lees over factoren die snelheidstests beïnvloeden, Wi-Fi-beperkingen, IP-geolocatienauwkeurigheid en VPN/proxy-detectie op TestLine.',
      keywords: 'testline disclaimer, ip locatie nauwkeurigheid, vpn detectie',
      breadcrumbLabel: 'Disclaimer',
    },
    terms: {
      title: 'Algemene Voorwaarden — TestLine door ECORZO LLC',
      description:
        'Bekijk de Algemene Voorwaarden voor toegestaan gebruik van de TestLine internetsnelheidstest en IP-tools door ECORZO LLC.',
      keywords: 'testline voorwaarden, ecorzo llc, gebruiksvoorwaarden',
      breadcrumbLabel: 'Voorwaarden',
    },
    'cookies-policy': {
      title: 'Cookiebeleid & Lokale Opslag — TestLine',
      description:
        'Bekijk de exacte localStorage-sleutels en cookieverklaringen die door TestLine van ECORZO LLC worden gebruikt.',
      keywords: 'testline cookiebeleid, local storage, consent mode v2',
      breadcrumbLabel: 'Cookiebeleid',
    },
    'cookies-notice': {
      title: 'Cookieverklaring & Toestemmingsinstellingen — TestLine',
      description:
        'Beheer op elk moment je cookie-, analyse- en lokale opslagvoorkeuren voor TestLine van ECORZO LLC.',
      keywords: 'cookieverklaring, toestemming beheren, privacy instellingen',
      breadcrumbLabel: 'Cookieverklaring',
    },
    gdpr: {
      title: 'AVG/GDPR & Gegevensbescherming — TestLine',
      description:
        'Lees de wettelijke grondslagen van ECORZO LLC onder AVG Artikel 6, dataminimalisatie, internationale doorgiften en gebruikersrechten.',
      keywords: 'testline avg gdpr, ecorzo llc gegevensbescherming, artikel 6 avg',
      breadcrumbLabel: 'AVG / GDPR',
    },
  },
  nav: {
    speedTest: 'Snelheidstest',
    news: 'Nieuws',
    blog: 'Blog',
    about: 'Over ons',
    contact: 'Contact',
    privacy: 'Privacybeleid',
    stopTest: 'Stop Test',
    newBadgeSuffix: 'nieuw',
    homeAria: 'TestLine Startpagina',
    primaryNavAria: 'Hoofdpagina’s',
    mobileNavAria: 'Mobiele navigatie',
    companyMenuAria: 'TestLine-menu: Over ons, Contact en Privacybeleid',
  },
  pwa: {
    installApp: 'App Installeren',
    installAria: 'TestLine app installeren',
    installIosAria: 'TestLine installeren op iPhone of iPad',
    iosTitle: 'TestLine installeren op iPhone / iPad',
    closeDialog: 'Venster sluiten',
    iosStep1Prefix: 'Tik op de',
    iosStep1Strong: 'Deel',
    iosStep1Suffix: '-knop in Safari.',
    iosStep2Prefix: 'Scrol omlaag en tik op',
    iosStep2Strong: 'Zet op beginscherm',
    iosStep2Suffix: '.',
    iosStep3:
      'Open TestLine altijd—ook offline start het Signal Runner-spel automatisch.',
    gotIt: 'Begrepen',
  },
  hero: {
    title: 'Internetsnelheidstest & Publiek IP Opzoeken',
    subtitle:
      'Meet download- en uploadsnelheid, ping en jitter—plus je IPv4/IPv6-adres, ISP-locatie, DNS-latentie en VPN-status.',
    speedUnitAria: 'Snelheidseenheid',
    autoTooltip: 'Gebruikt automatisch Mbps onder 100 Mbps en MB/s vanaf 100 Mbps',
    auto: 'Auto',
    lightMode: 'Lichte Modus',
    darkMode: 'Donkere Modus',
    switchToLight: 'Schakel naar lichte modus',
    switchToDark: 'Schakel naar donkere modus',
    exportPdf: 'Exporteer PDF',
    exportingPdf: 'Exporteren...',
    exportDisabledTitle: 'Start eerst een snelheidstest om een PDF-rapport te exporteren',
    exportEnabledTitle: 'Exporteer PDF-rapport met snelheids- en netwerkdiagnostiek',
  },
  duplicateModal: {
    title: 'Rapport Al Gedownload',
    closeDialog: 'Venster sluiten',
    body: 'Je hebt het rapport voor deze test al gedownload. Wil je het opnieuw downloaden?',
    notePrefix: 'Opnieuw geëxporteerde kopieën worden duidelijk gemarkeerd als',
    secondCopy: 'Tweede Kopie',
    noteSuffix: 'op het rapport.',
    cancel: 'Nee, Annuleren',
    confirm: 'Ja, Opnieuw Downloaden',
  },
  speedStage: {
    startSpeedTest: 'Start Snelheidstest',
    yourSpeedIs: 'Je internetsnelheid is',
    stopAria: 'Stop snelheidstest',
    startAria: 'Start snelheidstest',
    retry: 'Opnieuw Proberen',
    statusIdle: 'Klik op Play om de snelheidstest te starten',
    statusPing: 'Ping en jitter meten...',
    statusDownload: 'Downloadsnelheid testen...',
    statusUpload: 'Uploadsnelheid testen...',
    statusComplete: 'Snelheidstest voltooid',
    statusStopped: 'Test gestopt',
    statusError: 'Test onderbroken',
    uploadSpeed: 'Uploadsnelheid',
    peakPrefix: 'Piek',
    twoStreams: '2 parallelle streams',
    latencyAvgPing: 'Latentie (Gem. Ping)',
    minPrefix: 'Min',
    probesSuffix: 'metingen',
    fiveProbes: '5 Cloudflare RTT-metingen',
    jitter: 'Jitter',
    consecutiveVariance: 'Opeenvolgende RTT-variatie',
    waitingRtt: 'Wachten op RTT-metingen',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Melding voor proxy- of VPN-detectie',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy Gedetecteerd',
      'Datacenter / Relay Network': 'Datacenter- / Relaynetwerk',
      'Timezone Mismatch (Possible VPN)': 'Tijdzone-afwijking (Mogelijke VPN)',
      'Direct Connection': 'Directe Verbinding',
    },
    confidence: {
      High: 'Hoog',
      Moderate: 'Gemiddeld',
      Low: 'Laag',
    },
    confidenceWord: 'betrouwbaarheid',
    signalSingular: 'signaal',
    signalPlural: 'signalen',
    noticeDesc:
      'Je verbinding vertoont kenmerken van een proxy, VPN of datacenterrelay. Metingen weerspiegelen de actieve tunnel of exit-node.',
    observedExitIp: 'Waargenomen Exit-IP',
    relayOperator: 'Relay / Provider',
    exitLocationTz: 'Exit-Locatie & Tijdzone',
    detectedIndicators: 'Gedetecteerde Indicatoren',
    unavailable: 'Niet beschikbaar',
    signalTemplates: {
      proxy_flag: 'IP-adres is gemarkeerd als actieve proxy, VPN of Tor-exit',
      hosting_flag:
        'Verkeer is afkomstig van een datacenter-/hosting-ASN in plaats van een consumenten-ISP',
      provider_keyword: 'Netwerkbeheerder / PTR bevat relay-trefwoord ({1})',
      via_header: 'Proxy-doorstuurheader gedetecteerd ({1})',
      multi_hop: 'Meerdere doorstuur-hops waargenomen ({1} hops)',
      ip_mismatch: 'Direct browser-IP wijkt af van edge-IP (split-tunnel of proxy)',
      timezone_mismatch:
        'Browsertijdzone ({1}) wijkt af van IP-geolocatietijdzone ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Publiek IP-adres',
    resolvingRoute: 'Route bepalen',
    routeSuffix: 'route',
    updatedPrefix: 'Bijgewerkt',
    unavailable: 'Niet beschikbaar',
    metadataUnavailable: 'Netwerkmetadata niet beschikbaar',
    copyIp: 'Kopieer IP',
    copiedIp: 'IP Gekopieerd',
    refresh: 'Vernieuwen',
    ipv46CardTitle: 'IPv4, IPv6 & Provider-routing',
    ipv46CardSubtitle: 'Dual-stack metingen gecombineerd met edge IP-geolocatie',
    ipv4Label: 'IPv4-adres',
    ipv6Label: 'IPv6-adres',
    notDetected: 'Niet gedetecteerd',
    ipv6NotDetected: 'Niet gedetecteerd (alleen IPv4-route)',
    ispLabel: 'ISP / Provider',
    asnLabel: 'Autonoom Systeem (ASN)',
    locationLabel: 'Geschatte Locatie',
    proxyCheckLabel: 'Proxy- / VPN-controle',
    resolving: 'Oplossen...',
    inspecting: 'Controleren...',
    directConnectionNone: 'Directe verbinding (Geen gedetecteerd)',
    dnsCardTitle: 'DNS-hints & Verbindingsdiagnostiek',
    dnsCardSubtitle: 'Reverse PTR-record, DoH-resolver en transport-signalen van de browser',
    ptrLabel: 'Reverse DNS (PTR)',
    noPtr: 'Geen PTR-record gepubliceerd',
    dohProbeLabel: 'DoH Resolver-test',
    probing: 'Testen...',
    reachable: 'Bereikbaar',
    blockedOrUnreachable: 'Geblokkeerd of onbereikbaar',
    dnsLatencyLabel: 'DNS-querylatentie',
    protocolLabel: 'Transportprotocol',
    checking: 'Controleren...',
    linkHintLabel: 'Browser Link-hint',
    exposedNoMetrics: 'Blootgesteld zonder statistieken',
    notExposed: 'Niet gedeeld door browser',
    timezoneLabel: 'Tijdzone',
    copy: 'Kopieer',
    copied: 'Gekopieerd',
    capSuffix: 'Mbps max',
    rttSuffix: 'ms RTT',
    fetchError: 'Kan IP-diagnostiek-eindpunten niet bereiken.',
  },
  history: {
    title: 'Sessie-meetgeschiedenis',
    subtitle: 'Recente metingen lokaal opgeslagen in je browser',
    clearHistory: 'Geschiedenis Wissen',
    emptyText: 'Voltooide snelheidstests verschijnen hier zodat je resultaten kunt vergelijken.',
    colTime: 'Tijd',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Publiek IP',
  },
  consent: {
    title: 'Cookie- & Privacyverklaring',
    description:
      'TestLine gebruikt essentiële lokale opslag voor thema, eenheden en geschiedenis. Optionele analyse- en advertentiecookies blijven uit totdat je accepteert.',
    acceptAll: 'Alles Accepteren',
    essentialOnly: 'Alleen Essentieel',
    cookieSettings: 'Cookie-instellingen',
  },
  footer: {
    byEcorzo: 'door ECORZO LLC',
    tagline:
      'Realtime internetsnelheidstest en dual-stack IP-netwerkdiagnostiek beheerd door ECORZO LLC.',
    companyHeading: 'Bedrijf',
    legalHeading: 'Juridisch & Compliance',
    disclaimer: 'Disclaimer',
    terms: 'Algemene Voorwaarden',
    cookiesPolicy: 'Cookiebeleid',
    cookiesNotice: 'Cookieverklaring',
    gdpr: 'AVG / GDPR-beleid',
    privacy: 'Privacybeleid',
    copyrightSuffix: 'ECORZO LLC. Alle rechten voorbehouden.',
    poweredBy:
      'Metingen via Cloudflare-snelheidseindpunten · Conform AVG/GDPR en Google-beleid',
    languageLabel: 'Taal',
    autoOption: 'Auto (Regio)',
  },
  news: {
    eyebrow: 'Live Cybersecurity- & Tech-RSS-aggregator',
    updatedPrefix: 'Bijgewerkt',
    title: 'Netwerk-, Beveiligings- & Technieuws',
    filterPlaceholder: 'Filter koppen...',
    filterAria: 'Filter nieuwskoppen',
    refreshFeeds: 'Feeds Vernieuwen',
    refreshing: 'Vernieuwen...',
    cachedBannerPrefix:
      'Live RSS-feeds zijn momenteel onbereikbaar. Recente berichten uit lokale cache worden getoond',
    retryLive: 'Live Feeds Opnieuw Proberen',
    retrying: 'Opnieuw proberen...',
    allSources: 'Alle Bronnen',
    errorFallback:
      'Kan live RSS-feeds momenteel niet laden. Controleer je verbinding en probeer opnieuw.',
    tryAgain: 'Opnieuw Proberen',
    emptyText: 'Geen overeenkomende artikelen gevonden in de huidige RSS-feeds.',
    showAll: 'Alle Feeds Tonen',
    newTag: 'Nieuw',
    readFullStory: 'Volledig Artikel Lezen',
    recent: 'Recent',
    minutesAgo: '{n}m geleden',
    hoursAgo: '{n}u geleden',
  },
  blog: {
    eyebrow: 'TestLine Gidsen & Dagelijks Nieuwsoverzicht',
    articlesCountSuffix: 'Artikelen',
    title: 'Internetsnelheid, IP-Diagnostiek & Dagelijkse Updates',
    subtitle:
      'Diepgaande gidsen over internetsnelheid, IPv4/IPv6, IP-fraude, IP-locatie en VPN-detectie—plus dagelijks 2 actuele nieuwsartikelen uit onze live RSS-feeds.',
    searchPlaceholder: 'Zoek in {n} artikelen...',
    searchAria: 'Zoek blogartikelen',
    allLabel: 'Alle',
    hotNewsLabel: 'Actueel Nieuws',
    dailyHotNewsBadge: 'Dagelijks Topnieuws',
    emptyText: 'Geen artikelen komen overeen met het huidige filter.',
    resetFilters: 'Filters Wissen',
    newTag: 'Nieuw',
    readArticle: 'Lees Artikel',
    backToAllPrefix: 'Terug naar Alle',
    backToAllSuffix: 'Artikelen',
    originalSourcePrefix: 'Originele Bron',
    testConnectionNow: 'Test Verbinding Nu',
    keyTakeaways: 'Belangrijkste Punten',
    dailyReadTime: '3 min leestijd',
    dailyAuthorPrefix: 'TestLine Dagoverzicht · via',
    dailyTakeawayFeatured:
      'Uitgelicht in het dagelijkse nieuwsoverzicht van TestLine ({source}) onder {topic}.',
    dailyTakeawaySummaryPrefix: 'Kernsamenvatting:',
    dailyTakeawayTip:
      'Controleer altijd je actieve publieke IPv4/IPv6-adres, DNS-latentie en VPN/proxy-status voordat je onverwachte netwerkmeldingen onderzoekt.',
    dailySectionBriefingPrefix: 'Dagelijkse Briefing:',
    dailyBriefingPara2:
      'Automatisch geselecteerd voor het TestLine-overzicht van {date} op basis van actualiteit en netwerkimpact. Volg de bronlink hierboven voor de oorspronkelijke technische berichtgeving.',
    dailySectionActionTitle: 'Netwerkdiagnostiek & Praktische Stappen',
    dailyActionPara1:
      'Ontwikkelingen rond {topic} kunnen doorwerken in DNS-resolvers van providers, routeringstabellen en VPN-gateways. Een directe snelheidstest en dual-stack IP-controle bevestigen of je lijn verhoogde jitter of omleidingen ervaart.',
    dailyActionPara2:
      'Blijf op de hoogte via het tabblad Nieuws en onze vaste beveiligingsgidsen in de Blog-sectie.',
    categories: {
      'Hot News': 'Actueel Nieuws',
      'Internet Speed': 'Internetsnelheid',
      'IP Addresses': 'IP-adressen',
      'IP Scams': 'IP-fraude',
      'IP Location': 'IP-locatie',
      'VPN IP Status': 'VPN IP-status',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Waarom Je Werkelijke Downloadsnelheid Verschilt van Je Abonnement',
        readTime: '5 min leestijd',
        author: 'TestLine Engineering',
        summary:
          'Ontdek waarom een 500 Mbps-abonnement bestanden met 50–60 MB/s downloadt en waarom parallelle metingen betrouwbaarder zijn.',
        keyTakeaways: [
          'Providers adverteren in megabits per seconde (Mbps), terwijl browsers megabytes per seconde (MB/s) tonen in een 8:1-verhouding.',
          'Wi-Fi-afstand en oudere routers beperken glasvezelsnelheden vaak binnenshuis.',
          'Parallelle HTTP-streams tonen de werkelijke bandbreedte nauwkeuriger dan één enkele overdracht.',
        ],
        sections: [
          {
            heading: 'Megabits (Mbps) vs. Megabytes (MB/s)',
            paragraphs: [
              'Omdat er 8 bits in 1 byte gaan, levert een 400 Mbps-lijn maximaal 50 MB/s aan bestandsoverdracht. Na aftrek van TCP/TLS-overhead bereik je doorgaans 90–94%.',
            ],
          },
          {
            heading: 'Waarom Multi-Stream Metingen Belangrijk Zijn',
            paragraphs: [
              'Drie parallelle streams benutten de capaciteit volledig en tonen eventuele verschillen tussen Wi-Fi en bekabeld ethernet.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter Uitgelegd: Wat Videogesprekken en Gaming Echt Verstoort',
        readTime: '5 min leestijd',
        author: 'TestLine Engineering',
        summary:
          'Hoge downloadsnelheid redt geen videogesprek als de latentie schommelt. Zo werken ping, jitter en bufferbloat.',
        keyTakeaways: [
          'Ping meet de gemiddelde round-trip tijd (RTT) in milliseconden; onder 30 ms voelt direct.',
          'Jitter meet variatie tussen opeenvolgende pakketten; boven 20–25 ms hapert audio.',
          'SQM/QoS op je router voorkomt bufferbloat tijdens uploads.',
        ],
        sections: [
          {
            heading: 'Latentie Is Responsiviteit',
            paragraphs: [
              'Video streaming gebruikt een buffer, maar live spraak en games merken elke milliseconde vertraging.',
            ],
          },
          {
            heading: 'Waarom Jitter Audio Haperingen Geeft',
            paragraphs: [
              'Grote sprongen tussen opeenvolgende pingmetingen dwingen audiocodecs om frames over te slaan.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6: Waarom Dual-Stack Netwerken Vandaag Belangrijk Zijn',
        readTime: '6 min leestijd',
        author: 'TestLine Netwerkonderzoek',
        summary:
          'Nu IPv4-adressen op zijn en providers CGNAT inzetten, is inzicht in dual-stack routing essentieel.',
        keyTakeaways: [
          'IPv4 gebruikt 32-bit adressen (~4,3 miljard), waardoor providers adressen delen via CGNAT.',
          'IPv6 gebruikt 128-bit adressen voor directe routing zonder meervoudige NAT.',
          'Dual-stack controleert of je zowel IPv4 als IPv6 hebt.',
        ],
        sections: [
          {
            heading: 'IPv4-Schaarste en CGNAT',
            paragraphs: [
              'Veel huishoudens en mobiele lijnen delen één publiek IPv4-adres achter Carrier-Grade NAT.',
            ],
          },
          {
            heading: 'Sneller Verkeer Met Dual-Stack',
            paragraphs: [
              'Moderne systemen kiezen automatisch IPv6 via Happy Eyeballs wanneer beschikbaar.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Publiek IP vs. Privé-IP & Hoe Reverse DNS (PTR) Providers Herkent',
        readTime: '4 min leestijd',
        author: 'TestLine Netwerkonderzoek',
        summary:
          'Waarom je telefoon 192.168.1.45 toont terwijl websites een ander publiek IP zien.',
        keyTakeaways: [
          'RFC 1918 privé-reeksen (10.x, 192.168.x) bestaan alleen op je lokale netwerk.',
          'Je router vertaalt via NAT naar je publieke WAN-IP.',
          'PTR-records tonen vaak de providernaam en regio.',
        ],
        sections: [
          {
            heading: 'Binnen Je Router vs. Publiek Internet',
            paragraphs: [
              'Uitgaand verkeer krijgt door NAT het publieke IP-adres van de router toegewezen.',
            ],
          },
          {
            heading: 'Reverse DNS (PTR) Uitlezen',
            paragraphs: [
              'Beveiligings- en diagnosetools gebruiken PTR om consumentenlijnen van cloudservers te onderscheiden.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Nepwaarschuwingen Herkennen: "Uw IP Is Gehackt"-Pop-ups',
        readTime: '5 min leestijd',
        author: 'TestLine Security Desk',
        summary:
          'Pop-up oplichters tonen je echte IP en stad om paniek te zaaien. Leer waarom elke website je IP standaard ontvangt.',
        keyTakeaways: [
          'Elke bezochte website ontvangt je publieke IP via standaard HTTP-routing.',
          'Nepmeldingen proberen je een nep-helpdesknummer te laten bellen.',
          'Een publiek IP onthult nooit je naam, straatadres of bankgegevens.',
        ],
        sections: [
          {
            heading: 'Een Psychologische Truc',
            paragraphs: [
              'Malafide advertenties tonen je publieke IP om een echte systeemmelding te imiteren. Sluit gewoon het tabblad.',
            ],
          },
          {
            heading: 'Wat Een IP Wel en Niet Toont',
            paragraphs: [
              'Alleen de provider-gateway en globale regio worden zichtbaar.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP-Spoofing, Header-Fraude & Misbruik van Residentiële Proxies',
        readTime: '6 min leestijd',
        author: 'TestLine Security Desk',
        summary:
          'Van vervalste X-Forwarded-For headers tot gratis VPN-apps die jouw thuisverbinding als exit-node gebruiken.',
        keyTakeaways: [
          'Gratis browserextensies of vage apps verhuren soms ongemerkt je residentiële IP.',
          'Controleer PTR, ASN en doorstuurheaders op onverwachte relays.',
        ],
        sections: [
          {
            heading: 'De Verborgen Prijs van Gratis Proxy-Apps',
            paragraphs: [
              'Residentiële IP’s hebben hoog vertrouwen, waardoor malafide SDK’s verkeer van derden via thuisverbindingen leiden.',
            ],
          },
          {
            heading: 'Schone Routing Controleren',
            paragraphs: [
              'Controleer periodiek je extensies en test op TestLine of je IP netjes aan je eigen ISP gekoppeld is.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Hoe IP-Geolocatie Werkt en Waarom de Stad Vaak Afwijkt',
        readTime: '5 min leestijd',
        author: 'TestLine Netwerkonderzoek',
        summary:
          'IP-adressen bevatten geen GPS-coördinaten. Lees hoe GeoIP-databases regio’s bepalen.',
        keyTakeaways: [
          'GeoIP gebruikt RIR-registraties en BGP-routing in plaats van GPS.',
          'Mobiele netwerken routeren vaak via centrale knooppunten in andere steden.',
        ],
        sections: [
          {
            heading: 'Geen GPS in IP-Pakketten',
            paragraphs: [
              'Landennauwkeurigheid ligt boven 98%, maar straatniveau is onmogelijk vanuit alleen een IP.',
            ],
          },
          {
            heading: 'Mobiele Gateways',
            paragraphs: [
              'Een 5G-knooppunt in een andere regio bepaalt welke stad IP-tools tonen.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Tijdzone-Verschil & Carrier-Routing: Waarom Sites Je Verkeerd Plaatsen',
        readTime: '4 min leestijd',
        author: 'TestLine Netwerkonderzoek',
        summary:
          'Waarom systemen de browsertijdzone vergelijken met het IP-adres en wanneer dat onterecht afwijkt.',
        keyTakeaways: [
          'Beveiligingsfilters vergelijken je systeemtijdzone met de IP-tijdzone.',
          'Roaming of grensregio’s kunnen onschuldige verschillen geven.',
        ],
        sections: [
          {
            heading: 'Browser- vs. IP-Tijdzone',
            paragraphs: [
              'TestLine toont beide tijdzones zodat je direct ziet of een VPN of provider-routing actief is.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Hoe Websites een VPN, Proxy of Datacenter-IP Herkennen',
        readTime: '6 min leestijd',
        author: 'TestLine Security Desk',
        summary:
          'Benieuwd hoe banken en diensten een VPN herkennen? Dit zijn de vier belangrijkste technische signalen.',
        keyTakeaways: [
          'ASN-nummers onderscheiden hostingproviders (AWS, Hetzner, DigitalOcean) van consumenten-ISP’s.',
          'Proxy-headers en PTR-patronen versterken de detectiescore.',
        ],
        sections: [
          {
            heading: 'ASN-Classificatie als Sterkste Signaal',
            paragraphs: [
              'Commerciële VPN’s draaien op datacenter-ASN’s die websites binnen milliseconden herkennen.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS-Lekken, IPv6-Lekken & Split Tunneling: Je VPN Testen',
        readTime: '5 min leestijd',
        author: 'TestLine Security Desk',
        summary:
          'Zelfs met een actieve VPN kunnen onversleutelde DNS-queries of IPv6-verkeer je echte locatie onthullen.',
        keyTakeaways: [
          'Een IPv6-lek ontstaat als de VPN alleen IPv4 tunnelt en IPv6 direct via je ISP verloopt.',
          'Controleer zowel IPv4/IPv6 als DoH-bereikbaarheid na het verbinden.',
        ],
        sections: [
          {
            heading: 'De Dual-Stack IPv6-Valkuil',
            paragraphs: [
              'Controleer op TestLine of zowel je IPv4- als IPv6-adres naar de gekozen VPN-uitgang wijst.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet Hersteld',
    offlineMode: 'Offline Modus — Verbinding Verbroken',
    connectionActive: 'Verbinding is weer actief',
    playWhileWaiting: 'Speel Signal Runner terwijl je wacht op verbinding',
    score: 'Score',
    best: 'Record',
    muteAria: 'Spelgeluid dempen',
    unmuteAria: 'Spelgeluid inschakelen',
    pauseAria: 'Spel pauzeren',
    resumeAria: 'Spel hervatten',
    returnToSpeedTest: 'Terug naar Snelheidstest',
    checking: 'Controleren...',
    checkConnection: 'Verbinding Controleren',
    canvasAria: 'Offline Signal Runner spelcanvas',
    title: 'Signal Runner',
    subtitle:
      'Spring over torens, pieken en drones tot je internet terug is. Dubbelsprong is actief.',
    startGame: 'Start Spel',
    tapHint: 'Tik op het scherm of druk op Spatie / Pijl Omhoog om te springen',
    paused: 'Gepauzeerd',
    resume: 'Hervatten',
    gameOver: 'Signaal Onderbroken',
    cleared: 'Ontweken:',
    newBest: 'Nieuw Record!',
    playAgain: 'Opnieuw Spelen',
    backToSpeedTest: 'Terug naar Snelheidstest',
    jump: 'Springen',
    fastDrop: 'Snel Dalen',
    desktopHintPrefix: 'Toetsenbord:',
    desktopJump: 'Springen',
    desktopDrop: 'Dalen',
    desktopPause: 'Pauze',
  },
  faq: {
    tableTitle: 'Referentie Internetsnelheid & IP-Lookup',
    tableSubtitle:
      'TestLine door ECORZO LLC meet live download-/uploadbandbreedte, ping, jitter, IPv4/IPv6-adressen, geolocatie, DNS-snelheid en VPN- of proxysignalen.',
    readGuidesLink: 'Lees 10 Snelheids- & IP-Gidsen',
    colMetric: 'Statistiek',
    colMethod: 'Meetmethode',
    colThreshold: 'Streefwaarde',
    colImpact: 'Belangrijkste Impact',
    benchmarks: [
      {
        metric: 'Download (Mbps / MB/s)',
        method: '3 parallelle 25 MB HTTP-streams (10s venster)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Meerdere gebruikers)',
        standardUse: 'Streaming, downloads, cloudsync',
      },
      {
        metric: 'Upload (Mbps / MB/s)',
        method: '2 parallelle 10 MB XHR POST-streams',
        optimal: '10+ Mbps (HD-gesprekken) · 25+ Mbps (Creators)',
        standardUse: 'Videobellen, back-ups, livestreamen',
      },
      {
        metric: 'Ping & Onbelaste Latentie',
        method: '5 opeenvolgende 0-byte Cloudflare RTT-metingen',
        optimal: '< 30 ms (Laag) · 30–60 ms (Normaal)',
        standardUse: 'Online gamen, VoIP, webresponsiviteit',
      },
      {
        metric: 'Jitter & Bufferbloat',
        method: 'Gemiddelde opeenvolgende RTT-variatie',
        optimal: '< 10 ms (Stabiel) · > 25 ms (Overbelast)',
        standardUse: 'Audio-/videostabiliteit onder belasting',
      },
      {
        metric: 'DoH DNS-Latentie & PTR',
        method: 'Versleutelde 1.1.1.1-query + Reverse DNS PTR',
        optimal: '< 40 ms DNS-resolutie',
        standardUse: 'Domeinopzoeksnelheid & ISP-verificatie',
      },
      {
        metric: 'Dual-Stack IP, Geo & VPN',
        method: 'IPv4/IPv6 + ISP/ASN + Header-/tijdzonecontrole',
        optimal: 'Direct ISP-IP of geverifieerde VPN-exitnode',
        standardUse: 'Wat is mijn IP, IP-locatie, proxy/VPN check',
      },
    ],
    faqTitle: 'Veelgestelde Vragen',
    faqSubtitle:
      'Directe antwoorden over internetsnelheidstests, wat is mijn IP, IP-locatie, VPN-status en privacy',
    newsLink: 'Beveiligings- & Netwerknieuws',
    methodologyLink: 'Volledige Methodologie',
    gdprLink: 'AVG / GDPR-beleid',
    items: [
      {
        question: 'Hoe snel is mijn download- en uploadsnelheid?',
        answer:
          'Klik op Start Snelheidstest om in realtime je download- en uploadsnelheid in Mbps of MB/s te meten tegen Cloudflare edge-servers.',
      },
      {
        question: 'Wat is mijn publieke IPv4- en IPv6-adres?',
        answer:
          'Dual-stack probing detecteert zowel je publieke IPv4- als IPv6-adres naast elkaar met kopieerknoppen, locatie, ISP en ASN.',
      },
      {
        question: 'Wat zijn goede waarden voor ping, jitter en bufferbloat?',
        answer:
          'Ping onder 30 ms en jitter onder 10 ms zorgen voor vloeiende videogesprekken en online gaming.',
      },
      {
        question: 'Hoe nauwkeurig is IP-geolocatie?',
        answer:
          'Het koppelt je IP-blok aan land en stad op basis van ISP-registraties; het onthult nooit je exacte huisadres.',
      },
      {
        question: 'Hoe detecteert TestLine een VPN, proxy of datacenter-IP?',
        answer:
          'TestLine controleert HTTP-doorstuurheaders, hosting-ASN’s, PTR-hostnamen en tijdzone-afwijkingen.',
      },
      {
        question: 'Wat is DNS-over-HTTPS (DoH) latentie en Reverse DNS (PTR)?',
        answer:
          'DoH meet de snelheid via versleutelde Cloudflare 1.1.1.1-resolutie; PTR toont de geregistreerde hostnaam van het IP.',
      },
      {
        question: 'Logt ECORZO LLC mijn IP-adres of snelheidsresultaten?',
        answer:
          'Nee. Alle lookups zijn vluchtig in het geheugen en je geschiedenis blijft lokaal in je eigen browser.',
      },
      {
        question: 'Kan ik TestLine installeren als app of offline spelen?',
        answer:
          'Ja, TestLine is een installeerbare PWA en start automatisch Signal Runner zodra je offline bent.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Terug naar Snelheidstest',
    effectiveDatePrefix: 'Ingangsdatum:',
    operatorLabel: 'Beheerder: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Over TestLine',
      subtitle:
        'Gebouwd door ECORZO LLC voor transparante internetsnelheidstests en publieke IPv4/IPv6-diagnostiek in één snelle webapp.',
      sections: [
        {
          heading: 'Wat TestLine Meet',
          paragraphs: [
            'TestLine is een gratis browsertool beheerd door ECORZO LLC die zonder registratie doorvoer, latentie, IP-locatie en VPN-signalen meet.',
          ],
          bullets: [
            { strong: 'Download & Upload (Mbps / MB/s):', text: 'Parallelle HTTP-streams via Cloudflare edge.' },
            { strong: 'Ping, Jitter & Latentie:', text: 'Sequentiële RTT-metingen voor gemiddelde ping en variatie.' },
            { strong: 'IPv4/IPv6, Locatie, ISP & ASN:', text: 'Publieke adressen, geschatte locatie, provider, ASN, PTR en DoH.' },
            { strong: 'VPN, Proxy & Datacenter:', text: 'Analyseert headers, ASN-type, PTR en tijdzones.' },
          ],
        },
      ],
      closingTitle: 'Kennisbank, Nieuws & Bedrijfsgegevens',
      closingIntro: 'Bekijk onze',
      closingGuidesLink: '10 Snelheids-, IP- & VPN-Gidsen',
      closingMid: 'of lees live tech-nieuws in de',
      closingNewsLink: 'TestLine Nieuws RSS-feed',
      closingOutro:
        '. Beheerd door ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, VS. Bezoek onze',
      closingContactLink: 'Contactpagina',
    },
    contact: {
      title: 'Contact ECORZO LLC',
      subtitle:
        'Neem contact op over TestLine-diagnostiek, privacyverzoeken, AVG/GDPR of naleving.',
      telephone: 'Telefoon',
      addressLabel: 'Geregistreerd Kantooradres',
      copy: 'Kopieer',
      copied: 'Gekopieerd',
      formHeading: 'Stuur een Bericht',
      sentTitle: 'Bericht Voorbereid',
      sentBodyPrefix:
        'Bedankt, {name}. Je berichtgegevens zijn geregistreerd. Bel voor spoedzaken +1 646 427 6802 of schrijf naar ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Nog een bericht sturen',
      nameLabel: 'Volledige Naam',
      namePlaceholder: 'Jan de Vries',
      emailLabel: 'E-mailadres',
      emailPlaceholder: 'jij@voorbeeld.nl',
      messageLabel: 'Bericht',
      messagePlaceholder: 'Hoe kan ECORZO LLC helpen?',
      submitBtn: 'Verstuur Bericht',
      errMissing: 'Vul je naam, e-mailadres en bericht in.',
      errInvalidEmail: 'Vul een geldig e-mailadres in.',
    },
    privacy: {
      title: 'Privacybeleid',
      subtitle:
        'Hoe TestLine door ECORZO LLC diagnostische gegevens verwerkt conform AVG/GDPR en Google-beleid.',
      sections: [
        {
          heading: '1. Verwerkingsverantwoordelijke',
          paragraphs: [
            'ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel: +1 646 427 6802) is verantwoordelijk volgens de AVG/GDPR en CCPA/CPRA.',
          ],
        },
        {
          heading: '2. Verwerkte Gegevens Tijdens Diagnostiek',
          bullets: [
            { strong: 'Netwerk- & IP-telemetrie:', text: 'IP, ISP, ASN en headers worden uitsluitend vluchtig in geheugen verwerkt.' },
            { strong: 'Snelheidsmetingen:', text: 'Worden lokaal opgeslagen in testline_history_v1 en zijn elk moment wisbaar.' },
            { strong: 'Voorkeuren:', text: 'Thema (testline_theme), taal en toestemming (testline_cookie_consent) blijven lokaal.' },
          ],
        },
        {
          heading: '3. Derde Partijen & Google',
          paragraphs: [
            'Voor live metingen communiceert je browser met Cloudflare, IPWhois, GeoJS en Ipify. Google-diensten volgen:',
          ],
        },
        {
          heading: '4. Geen Verkoop van Gegevens',
          paragraphs: [
            'ECORZO LLC verkoopt nooit IP-adressen. PDF-rapporten worden volledig lokaal in je browser aangemaakt.',
          ],
        },
      ],
      googlePolicyLinkText: 'Hoe Google informatie gebruikt van sites of apps die onze services gebruiken',
      rightsPrefix: 'Je hebt recht op inzage, correctie en verwijdering. Bekijk ons',
      gdprLinkText: 'AVG / GDPR-beleid',
      rightsSuffix: 'of neem contact op met ECORZO LLC via +1 646 427 6802.',
    },
    disclaimer: {
      title: 'Disclaimer',
      subtitle:
        'Belangrijke beperkingen rondom snelheidsmetingen, IP-geolocatie en VPN/proxy-detectie.',
      sections: [
        {
          heading: '1. Alleen Informatief Doel',
          paragraphs: [
            'TestLine wordt "zoals het is" aangeboden en vormt geen juridische certificering van je internetsnelheid.',
          ],
        },
        {
          heading: '2. Beïnvloedende Factoren',
          paragraphs: [
            'Resultaten hangen af van Wi-Fi, routerhardware, VPN-encryptie en netwerkdrukte.',
          ],
        },
        {
          heading: '3. Nauwkeurigheid Geolocatie & Proxy',
          paragraphs: [
            'Locaties zijn schattingen op basis van IP-registratie; VPN-signalen zijn heuristisch.',
          ],
        },
        {
          heading: '4. Beperking van Aansprakelijkheid',
          paragraphs: [
            'ECORZO LLC aanvaardt geen aansprakelijkheid voor directe of indirecte schade uit het gebruik van metingen.',
          ],
        },
      ],
    },
    terms: {
      title: 'Algemene Voorwaarden',
      subtitle: 'Regels voor het gebruik van TestLine door ECORZO LLC.',
      sections: [
        {
          heading: '1. Aanvaarding',
          paragraphs: ['Door TestLine te gebruiken ga je akkoord met deze voorwaarden.'],
        },
        {
          heading: '2. Toegestaan Gebruik',
          bullets: [
            { text: 'Geschikt voor persoonlijke en zakelijke diagnostiek inclusief PDF-export.' },
            { text: 'Geautomatiseerde bots, DDoS-tools of scrapers zijn verboden.' },
            { text: 'Omzeilen van limieten is niet toegestaan.' },
          ],
        },
        {
          heading: '3. Intellectueel Eigendom',
          paragraphs: ['De naam TestLine, het ontwerp en de broncode zijn eigendom van ECORZO LLC.'],
        },
        {
          heading: '4. Toepasselijk Recht',
          paragraphs: ['Beheerst door de wetten van de staat New York en de Verenigde Staten.'],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookiebeleid',
      subtitle: 'Overzicht van cookies en browseropslag gebruikt door TestLine.',
      sec1Title: '1. Wat Zijn Cookies & Local Storage?',
      sec1Body:
        'Cookies zijn kleine tekstbestanden en localStorage bewaart voorkeuren lokaal zonder onnodige verzending.',
      sec2Title: '2. Opslagsleutels van TestLine',
      colKey: 'Sleutel',
      colCategory: 'Categorie',
      colPurpose: 'Doel',
      rows: [
        { key: 'testline_theme', category: 'Essentiële Voorkeur', purpose: 'Onthoudt Licht of Donker thema.' },
        { key: 'testline_unit_v1', category: 'Essentiële Voorkeur', purpose: 'Bewaart eenheid (Auto, Mbps of MB/s).' },
        { key: 'testline_history_v1', category: 'Functioneel Lokaal', purpose: 'Bewaart tot 15 testresultaten lokaal.' },
        { key: 'testline_cookie_consent', category: 'Essentiële Toestemming', purpose: 'Legt Google Consent Mode v2 voorkeur vast.' },
      ],
      sec3Title: '3. Derde Partijen & Google',
      sec3Prefix: 'Advertenties en analytics blijven geweigerd tot toestemming. Verkopers:',
      sec3Mid: '. Wijzig voorkeuren op',
      cookiesNoticeLinkText: 'Cookieverklaring',
      sec3OrVia: 'of via',
      googleAdSettingsText: 'Google Advertentie-instellingen',
    },
    cookiesNotice: {
      title: 'Cookieverklaring & Toestemming',
      subtitle: 'Beheer je cookie- en opslagvoorkeuren voor TestLine van ECORZO LLC.',
      sec1Title: 'Kennisgeving aan Bezoekers (EER, VK, Zwitserland & Wereldwijd)',
      sec1Body:
        'TestLine gebruikt strikt noodzakelijke opslag voor thema, eenheden, geschiedenis en toestemming. Analyses en advertenties staan standaard uit.',
      activeTitle: 'Actieve Toestemmingskeuze',
      currentSettingLabel: 'Huidige instelling:',
      statusAll: 'Alles Toegestaan (Analytics & Ads Consent Mode)',
      statusEssential: 'Alleen Strikt Noodzakelijk',
      statusUnset: 'Nog Niet Gekozen (Standaard Geweigerd)',
      savedBadge: 'Voorkeuren Opgeslagen',
      acceptAllBtn: 'Alles Accepteren',
      essentialOnlyBtn: 'Alleen Strikt Noodzakelijk',
      sec2Title: 'Browserinstellingen',
      sec2Body: 'Je kunt cookies ook blokkeren of wissen via je eigen browserinstellingen.',
    },
    gdpr: {
      title: 'AVG / GDPR & Gegevensbeleid',
      subtitle: 'Wettelijke grondslagen, dataminimalisatie en rechten onder de AVG.',
      sections: [
        {
          heading: '1. Verwerkingsverantwoordelijke',
          paragraphs: ['ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001 (+1 646 427 6802).'],
        },
        {
          heading: '2. Grondslagen (AVG Art. 6)',
          bullets: [
            { strong: 'Dienstverlening (Art. 6(1)(b)):', text: 'Noodzakelijk voor gevraagde snelheids- en IP-tests.' },
            { strong: 'Gerechtvaardigd Belang (Art. 6(1)(f)):', text: 'Bescherming tegen misbruik en DDoS.' },
            { strong: 'Toestemming (Art. 6(1)(a)):', text: 'Alleen bij expliciete goedkeuring voor optionele cookies.' },
          ],
        },
        {
          heading: '3. Minimalisatie',
          paragraphs: ['Geen account nodig; IP-data wordt niet opgeslagen in gebruikersprofielen.'],
        },
        {
          heading: '4. Internationale Doorgiften',
          paragraphs: ['Edge-servers vertrouwen op Standaard Contractuele Clausules (SCC).'],
        },
        {
          heading: '5. Rechten',
          bullets: [
            { strong: 'Inzage & Overdraagbaarheid:', text: 'Kopie opvragen.' },
            { strong: 'Rectificatie & Wissing:', text: 'Correctie of verwijdering aanvragen.' },
            { strong: 'Bezwaar & Intrekking:', text: 'Toestemming intrekken.' },
            { strong: 'Klacht:', text: 'Klacht indienen bij toezichthouder.' },
          ],
        },
        {
          heading: '6. Kinderen',
          paragraphs: ['TestLine verzamelt geen gegevens van kinderen onder 13/16 jaar.'],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Netwerk- & Snelheidsrapport',
    generated: 'Gegenereerd',
    unit: 'Eenheid',
    secondCopyBanner: 'TWEEDE KOPIE  —  Dubbele Rapportdownload',
    sec1Title: '1. Snelheidsoverzicht',
    downloadSpeed: 'Downloadsnelheid',
    uploadSpeed: 'Uploadsnelheid',
    avgPing: 'Gemiddelde Ping',
    jitter: 'Jitter',
    peak: 'Piek',
    sustained: 'Doorlopende stream',
    min: 'Min',
    probes: 'metingen',
    rttProbes: 'RTT-metingen',
    sec2Title: '2. Proxy- & VPN-detectie',
    directClean: 'Directe Verbinding — Geen proxy- of VPN-signalen gedetecteerd',
    sec3Title: '3. Netwerk-, IP- & DNS-diagnostiek',
    sec4Title: '4. Recente Sessietests',
    confidenceWord: 'betrouwbaarheid',
    pageOf: 'Pagina {p} van {total}',
    secondCopyShort: 'Tweede Kopie',
    rowPrimaryIp: 'Primair Publiek IP',
    rowIpv4: 'IPv4-adres',
    rowIpv6: 'IPv6-adres',
    rowIsp: 'ISP / Provider',
    rowAsn: 'Autonoom Systeem (ASN)',
    rowLocation: 'Geschatte Locatie',
    rowTimezone: 'Tijdzone',
    rowPtr: 'Reverse DNS (PTR)',
    rowDoh: 'DoH Resolver-test',
    rowProtocol: 'Transportprotocol',
    rowLinkHint: 'Browser Link-hint',
    notDetected: 'Niet gedetecteerd',
    noPtr: 'Geen PTR-record gepubliceerd',
    reachable: 'Bereikbaar',
    unreachable: 'Onbereikbaar',
    notExposed: 'Niet gedeeld door browser',
    available: 'Beschikbaar',
    colTime: 'Tijd',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Publiek IP',
  },
};
