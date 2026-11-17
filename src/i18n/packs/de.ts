import type { TranslationPack } from '../types';

export const dePack: TranslationPack = {
  meta: {
    lang: 'de',
    intlLocale: 'de-DE',
    dir: 'ltr',
    nativeName: 'Deutsch',
  },
  seo: {
    home: {
      title: 'TestLine — Internet-Speedtest & Öffentliche IP-Abfrage',
      description:
        'Testen Sie Ihre Download- & Upload-Geschwindigkeit, Ping und Jitter und prüfen Sie Ihre öffentliche IPv4/IPv6-Adresse, Ihren ISP-Standort, DNS-Latenz und VPN-Status.',
      keywords:
        'internet speedtest, geschwindigkeitstest, wie ist meine ip, öffentliche ip adresse, download geschwindigkeit, upload geschwindigkeit, ping test, latenz, jitter, bufferbloat, ipv4, ipv6, ip standort, isp abfrage, vpn erkennung',
      breadcrumbLabel: 'Speedtest',
    },
    news: {
      title: 'Cybersicherheit, Netzwerk & Tech-Nachrichten | TestLine',
      description:
        'Aktuelle RSS-Nachrichten zu Cybersicherheit, Breitband, DNS, BGP und Technik von Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch und Ars Technica.',
      keywords: 'cybersicherheit news, netzwerksicherheit rss, internet störungen, cloudflare blog',
      breadcrumbLabel: 'Nachrichten',
    },
    blog: {
      title: 'Leitfäden zu Internet-Speed, IP-Abfrage & VPN | TestLine',
      description:
        'Entdecken Sie 10 Experten-Leitfäden zu Internetgeschwindigkeit, Mbps vs. MB/s, IPv4 & IPv6, IP-Betrug, Standortgenauigkeit, Bufferbloat und VPN-Erkennung.',
      keywords: 'internet speed ratgeber, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, vpn erkennung',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'Über TestLine — Speedtest & IP-Diagnose-Tool',
      description:
        'Erfahren Sie, wie TestLine von ECORZO LLC Download-/Upload-Bandbreite, Ping, Jitter, Dual-Stack-IPv4/IPv6-Routing, DoH-DNS-Latenz und VPN/Proxy-Signale misst.',
      keywords: 'über testline, ecorzo llc, speedtest methodik, ip diagnose',
      breadcrumbLabel: 'Über uns',
    },
    privacy: {
      title: 'Datenschutzerklärung — Flüchtige IP & Speedtest | TestLine',
      description:
        'Lesen Sie die Datenschutzerklärung von TestLine (ECORZO LLC) über flüchtige IP-Abfragen, keine dauerhafte Speicherung von Testergebnissen, DSGVO-Konformität und Cookies.',
      keywords: 'testline datenschutz, ecorzo llc dsgvo, kein ip logging, speedtest datenschutz',
      breadcrumbLabel: 'Datenschutz',
    },
    contact: {
      title: 'Kontakt TestLine & ECORZO LLC — Netzwerk-Support',
      description:
        'Kontaktieren Sie ECORZO LLC bei Fragen zum TestLine Speedtest, zur IP-Abfrage, zum Datenschutz oder zur DSGVO.',
      keywords: 'kontakt testline, ecorzo llc new york, support, dsgvo anfrage',
      breadcrumbLabel: 'Kontakt',
    },
    disclaimer: {
      title: 'Haftungsausschluss — Messbereich & IP-Abfrage | TestLine',
      description:
        'Informationen zu Einflussfaktoren bei Speedtests, Grenzen der IP-Geolokalisierung und zur Erkennung von VPNs/Proxys bei TestLine.',
      keywords: 'speedtest haftungsausschluss, ip standort genauigkeit, vpn erkennung',
      breadcrumbLabel: 'Haftungsausschluss',
    },
    terms: {
      title: 'Nutzungsbedingungen — TestLine von ECORZO LLC',
      description:
        'Lesen Sie die Nutzungsbedingungen für den TestLine Internet-Speedtest und die öffentliche IP-Diagnose von ECORZO LLC.',
      keywords: 'testline agb, nutzungsbedingungen, ecorzo llc',
      breadcrumbLabel: 'Nutzungsbedingungen',
    },
    'cookies-policy': {
      title: 'Cookie-Richtlinie & Lokaler Speicher — TestLine',
      description:
        'Übersicht der von TestLine (ECORZO LLC) verwendeten Local-Storage-Schlüssel und Cookie-Hinweise gemäß DSGVO und Google EU-Nutzereinwilligung.',
      keywords: 'testline cookie richtlinie, local storage, google consent mode v2',
      breadcrumbLabel: 'Cookie-Richtlinie',
    },
    'cookies-notice': {
      title: 'Cookie-Hinweis & Einwilligungseinstellungen — TestLine',
      description:
        'Verwalten Sie jederzeit Ihre Cookie-, Analyse- und Browserspeicher-Einstellungen für TestLine von ECORZO LLC.',
      keywords: 'cookie einstellungen, einwilligung verwalten, testline',
      breadcrumbLabel: 'Cookie-Hinweis',
    },
    gdpr: {
      title: 'DSGVO & Datenerhebungsrichtlinie — TestLine',
      description:
        'Rechtsgrundlagen nach Art. 6 DSGVO, Datenminimierung, internationale Datentransfers und Betroffenenrechte bei TestLine (ECORZO LLC).',
      keywords: 'testline dsgvo, datenminimierung, artikel 6 dsgvo',
      breadcrumbLabel: 'DSGVO & Datenschutz',
    },
  },
  nav: {
    speedTest: 'Speedtest',
    news: 'Nachrichten',
    blog: 'Blog',
    about: 'Über uns',
    contact: 'Kontakt',
    privacy: 'Datenschutz',
    stopTest: 'Test stoppen',
    newBadgeSuffix: 'neu',
    homeAria: 'TestLine Startseite',
    primaryNavAria: 'Hauptnavigation',
    mobileNavAria: 'Mobile Navigation',
    companyMenuAria: 'TestLine-Menü: Über uns, Kontakt und Datenschutz',
  },
  pwa: {
    installApp: 'App installieren',
    installAria: 'TestLine-App installieren',
    installIosAria: 'TestLine auf iPhone oder iPad installieren',
    iosTitle: 'TestLine auf iPhone / iPad installieren',
    closeDialog: 'Dialog schließen',
    iosStep1Prefix: 'Tippen Sie auf die Schaltfläche',
    iosStep1Strong: 'Teilen',
    iosStep1Suffix: 'in der Safari-Symbolleiste.',
    iosStep2Prefix: 'Scrollen Sie nach unten und tippen Sie auf',
    iosStep2Strong: 'Zum Home-Bildschirm',
    iosStep2Suffix: '.',
    iosStep3:
      'Öffnen Sie TestLine jederzeit — selbst offline startet das Spiel Signal Runner automatisch.',
    gotIt: 'Verstanden',
  },
  hero: {
    title: 'Internet-Speedtest & Öffentliche IP-Abfrage',
    subtitle:
      'Messen Sie Download- & Upload-Geschwindigkeit, Ping und Jitter – plus IPv4/IPv6-Adresse, ISP-Standort, DNS-Latenz und VPN-Status.',
    speedUnitAria: 'Geschwindigkeitseinheit',
    autoTooltip: 'Verwendet automatisch Mbps unter 100 Mbps und MB/s ab 100 Mbps',
    auto: 'Auto',
    lightMode: 'Hellmodus',
    darkMode: 'Dunkelmodus',
    switchToLight: 'Zum Hellmodus wechseln',
    switchToDark: 'Zum Dunkelmodus wechseln',
    exportPdf: 'PDF exportieren',
    exportingPdf: 'Exportiere...',
    exportDisabledTitle: 'Starten Sie zuerst einen Speedtest, um einen PDF-Bericht zu exportieren',
    exportEnabledTitle: 'Speed- & Netzwerkdiagnose als PDF-Bericht exportieren',
  },
  duplicateModal: {
    title: 'Bericht bereits heruntergeladen',
    closeDialog: 'Dialog schließen',
    body: 'Sie haben den Bericht für diesen Testlauf bereits heruntergeladen. Möchten Sie ihn erneut herunterladen?',
    notePrefix: 'Erneut exportierte Kopien werden auf dem Bericht deutlich als',
    secondCopy: 'Zweitausfertigung',
    noteSuffix: 'gekennzeichnet.',
    cancel: 'Nein, abbrechen',
    confirm: 'Ja, erneut herunterladen',
  },
  speedStage: {
    startSpeedTest: 'Speedtest starten',
    yourSpeedIs: 'Ihre Internetgeschwindigkeit beträgt',
    stopAria: 'Speedtest stoppen',
    startAria: 'Speedtest starten',
    retry: 'Wiederholen',
    statusIdle: 'Auf Start klicken, um Speedtest zu beginnen',
    statusPing: 'Messe Ping & Jitter...',
    statusDownload: 'Teste Download-Geschwindigkeit...',
    statusUpload: 'Teste Upload-Geschwindigkeit...',
    statusComplete: 'Speedtest abgeschlossen',
    statusStopped: 'Test gestoppt',
    statusError: 'Test unterbrochen',
    uploadSpeed: 'Upload-Geschwindigkeit',
    peakPrefix: 'Spitze',
    twoStreams: '2 parallele Streams',
    latencyAvgPing: 'Latenz (Durchschn. Ping)',
    minPrefix: 'Min.',
    probesSuffix: 'Messungen',
    fiveProbes: '5 Cloudflare-RTT-Proben',
    jitter: 'Jitter',
    consecutiveVariance: 'Aufeinanderfolgende RTT-Varianz',
    waitingRtt: 'Warte auf RTT-Messwerte',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Hinweis zur Proxy- oder VPN-Erkennung',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy erkannt',
      'Datacenter / Relay Network': 'Rechenzentrum / Relay-Netzwerk',
      'Timezone Mismatch (Possible VPN)': 'Zeitzonen-Abweichung (Mögliches VPN)',
      'Direct Connection': 'Direkte Verbindung',
    },
    confidence: {
      High: 'Hoch',
      Moderate: 'Mittel',
      Low: 'Niedrig',
    },
    confidenceWord: 'Konfidenz',
    signalSingular: 'Signal',
    signalPlural: 'Signale',
    noticeDesc:
      'Ihre Verbindung weist Merkmale eines Proxys, VPNs oder Rechenzentrum-Relays auf. Die Messwerte spiegeln den aktiven Tunnel oder Exit-Knoten wider.',
    observedExitIp: 'Beobachtete Exit-IP',
    relayOperator: 'Relay- / Netzbetreiber',
    exitLocationTz: 'Exit-Standort & Zeitzone',
    detectedIndicators: 'Erkannte Indikatoren',
    unavailable: 'Nicht verfügbar',
    signalTemplates: {
      proxy_flag: 'Die IP-Adresse ist als aktiver Proxy, VPN- oder Tor-Exit-Knoten markiert',
      hosting_flag:
        'Der Datenverkehr stammt aus einem Rechenzentrum-/Hosting-ASN statt von einem privaten ISP',
      provider_keyword: 'Netzbetreiber / PTR stimmt mit Relay-Schlüsselwort überein ({1})',
      via_header: 'Proxy-Weiterleitungs-Header erkannt ({1})',
      multi_hop: 'Mehrere Weiterleitungs-Hops beobachtet ({1} Hops)',
      ip_mismatch: 'Direkte Browser-IP weicht von der Edge-IP ab (Split-Tunnel oder Proxy-Routing)',
      timezone_mismatch: 'Browser-Zeitzone ({1}) weicht von der IP-Geolokalisierungs-Zeitzone ({2}) ab',
    },
  },
  diagnostics: {
    publicIpTitle: 'Öffentliche IP-Adresse',
    resolvingRoute: 'Route wird aufgelöst',
    routeSuffix: 'Route',
    updatedPrefix: 'Aktualisiert',
    unavailable: 'Nicht verfügbar',
    metadataUnavailable: 'Netzwerk-Metadaten nicht verfügbar',
    copyIp: 'IP kopieren',
    copiedIp: 'IP kopiert',
    refresh: 'Aktualisieren',
    ipv46CardTitle: 'IPv4, IPv6 & Anbieter-Routing',
    ipv46CardSubtitle: 'Dual-Stack-Client-Proben kombiniert mit Edge-IP-Geolokalisierung',
    ipv4Label: 'IPv4-Adresse',
    ipv6Label: 'IPv6-Adresse',
    notDetected: 'Nicht erkannt',
    ipv6NotDetected: 'Nicht erkannt (nur IPv4-Route)',
    ispLabel: 'ISP / Anbieter',
    asnLabel: 'Autonomes System (ASN)',
    locationLabel: 'Ungefährer Standort',
    proxyCheckLabel: 'Proxy- / VPN-Prüfung',
    resolving: 'Wird aufgelöst...',
    inspecting: 'Wird geprüft...',
    directConnectionNone: 'Direkte Verbindung (Keine erkannt)',
    dnsCardTitle: 'DNS-Hinweise & Verbindungsdiagnose',
    dnsCardSubtitle: 'Reverse-PTR-Eintrag, DoH-Resolver-Erreichbarkeit und Transportsignale',
    ptrLabel: 'Reverse DNS (PTR)',
    noPtr: 'Kein PTR-Eintrag veröffentlicht',
    dohProbeLabel: 'DoH-Resolver-Probe',
    probing: 'Prüfe...',
    reachable: 'Erreichbar',
    blockedOrUnreachable: 'Blockiert oder nicht erreichbar',
    dnsLatencyLabel: 'DNS-Abfragelatenz',
    protocolLabel: 'Transportprotokoll',
    checking: 'Prüfe...',
    linkHintLabel: 'Browser-Verbindungshinweis',
    exposedNoMetrics: 'Ohne Messwerte gemeldet',
    notExposed: 'Vom Browser nicht bereitgestellt',
    timezoneLabel: 'Zeitzone',
    copy: 'Kopieren',
    copied: 'Kopiert',
    capSuffix: 'Mbps Limit',
    rttSuffix: 'ms RTT',
    fetchError: 'IP-Diagnose-Endpunkte derzeit nicht erreichbar.',
  },
  history: {
    title: 'Sitzungsverlauf',
    subtitle: 'Letzte Messungen lokal in Ihrem Browser gespeichert',
    clearHistory: 'Verlauf löschen',
    emptyText:
      'Abgeschlossene Speedtests erscheinen hier, damit Sie aufeinanderfolgende Läufe vergleichen können.',
    colTime: 'Zeit',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Öffentliche IP',
  },
  consent: {
    title: 'Cookie- & Datenschutzhinweis',
    description:
      'TestLine nutzt notwendigen lokalen Speicher für Design, Einheiten und Verlauf. Optionale Analyse- und Werbe-Cookies bleiben deaktiviert, sofern Sie nicht zustimmen.',
    acceptAll: 'Alle akzeptieren',
    essentialOnly: 'Nur notwendige',
    cookieSettings: 'Cookie-Einstellungen',
  },
  footer: {
    byEcorzo: 'von ECORZO LLC',
    tagline:
      'Echtzeit-Internet-Speedtest und Dual-Stack-IP-Netzwerkdiagnose, betrieben von ECORZO LLC.',
    companyHeading: 'Unternehmen',
    legalHeading: 'Rechtliches & Compliance',
    disclaimer: 'Haftungsausschluss',
    terms: 'Nutzungsbedingungen',
    cookiesPolicy: 'Cookie-Richtlinie',
    cookiesNotice: 'Cookie-Hinweis',
    gdpr: 'DSGVO & Datenschutzrichtlinie',
    privacy: 'Datenschutzerklärung',
    copyrightSuffix: 'ECORZO LLC. Alle Rechte vorbehalten.',
    poweredBy:
      'Messungen über Cloudflare-Speed-Endpunkte · DSGVO- & Google-Richtlinien-konform',
    languageLabel: 'Sprache',
    autoOption: 'Auto (Region)',
  },
  news: {
    eyebrow: 'Live-Cybersicherheits- & Tech-RSS-Aggregator',
    updatedPrefix: 'Aktualisiert',
    title: 'Netzwerk-, Sicherheits- & Tech-News',
    filterPlaceholder: 'Schlagzeilen filtern...',
    filterAria: 'Nachrichten-Schlagzeilen filtern',
    refreshFeeds: 'Feeds aktualisieren',
    refreshing: 'Aktualisiere...',
    cachedBannerPrefix:
      'Live-RSS-Feeds sind derzeit nicht erreichbar. Es werden zuletzt auf diesem Gerät zwischengespeicherte Meldungen angezeigt',
    retryLive: 'Live-Feeds erneut laden',
    retrying: 'Versuche erneut...',
    allSources: 'Alle Quellen',
    errorFallback:
      'Live-RSS-Feeds können derzeit nicht geladen werden. Prüfen Sie Ihre Verbindung und aktualisieren Sie.',
    tryAgain: 'Erneut versuchen',
    emptyText: 'Keine passenden Meldungen in den aktuellen RSS-Feeds gefunden.',
    showAll: 'Alle Feeds anzeigen',
    newTag: 'Neu',
    readFullStory: 'Ganzen Artikel lesen',
    recent: 'Kürzlich',
    minutesAgo: 'vor {n} Min.',
    hoursAgo: 'vor {n} Std.',
  },
  blog: {
    eyebrow: 'TestLine-Ratgeber & Tägliche Top-News',
    articlesCountSuffix: 'Artikel',
    title: 'Internet-Speed, IP-Diagnose & Tägliche Briefings',
    subtitle:
      'Ausführliche Ratgeber zu Internetgeschwindigkeit, IPv4/IPv6, IP-Betrug, Standortbestimmung und VPN-Erkennung – plus täglich 2 automatisch kuratierte Top-News aus unseren RSS-Feeds.',
    searchPlaceholder: '{n} Artikel durchsuchen...',
    searchAria: 'Blog-Artikel durchsuchen',
    allLabel: 'Alle',
    hotNewsLabel: 'Top-News',
    dailyHotNewsBadge: 'Tägliche Top-News',
    emptyText: 'Keine Artikel entsprechen Ihrem aktuellen Filter.',
    resetFilters: 'Filter zurücksetzen',
    newTag: 'Neu',
    readArticle: 'Artikel lesen',
    backToAllPrefix: 'Zurück zu allen',
    backToAllSuffix: 'Artikeln',
    originalSourcePrefix: 'Originalquelle',
    testConnectionNow: 'Verbindung jetzt testen',
    keyTakeaways: 'Wichtigste Erkenntnisse',
    dailyReadTime: '3 Min. Lesezeit',
    dailyAuthorPrefix: 'TestLine Tages-Briefing · via',
    dailyTakeawayFeatured:
      'Ausgewählt im täglichen Top-News-Briefing von TestLine ({source}) unter {topic}.',
    dailyTakeawaySummaryPrefix: 'Zusammenfassung der Meldung:',
    dailyTakeawayTip:
      'Überprüfen Sie bei unerwarteten Verbindungs- oder Sicherheitswarnungen stets Ihre aktive öffentliche IPv4/IPv6-Adresse, DNS-Latenz und Ihren VPN-/Proxy-Status.',
    dailySectionBriefingPrefix: 'Tages-Briefing:',
    dailyBriefingPara2:
      'Automatisch für den TestLine Top-News-Digest vom {date} anhand von Aktualität und Relevanz für Netzwerke und Cybersicherheit ausgewählt. Den vollständigen technischen Originalbericht erreichen Sie über den Quellenlink oben.',
    dailySectionActionTitle: 'Netzwerkdiagnose & Praktische Maßnahmen',
    dailyActionPara1:
      'Vorfälle rund um {topic} wirken sich häufig auf ISP-DNS-Resolver, Carrier-Routing-Tabellen, VPN-Exit-Gateways und Endgeräteverbindungen aus. Ein Speedtest mit Dual-Stack-IP-Prüfung zeigt sofort, ob erhöhte Jitter-Werte oder unerwartete Relay-Hops auftreten.',
    dailyActionPara2:
      'Bleiben Sie über aktuelle Schwachstellen und Breitband-Meldungen im Tab Nachrichten auf dem Laufenden und nutzen Sie unsere praxisnahen Leitfäden im Blog-Bereich.',
    categories: {
      'Hot News': 'Top-News',
      'Internet Speed': 'Internet-Speed',
      'IP Addresses': 'IP-Adressen',
      'IP Scams': 'IP-Betrug',
      'IP Location': 'IP-Standort',
      'VPN IP Status': 'VPN-IP-Status',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Warum Ihre reale Download-Geschwindigkeit vom Tarif Ihres Anbieters abweicht',
        readTime: '5 Min. Lesezeit',
        author: 'TestLine Engineering',
        summary:
          'Erfahren Sie, warum ein 500-Mbps-Anschluss Dateien oft mit 50–60 MB/s lädt, wie TCP/TLS-Overhead wirkt und warum Multi-Stream-Tests genauer sind.',
        keyTakeaways: [
          'Internetanbieter werben in Megabit pro Sekunde (Mbps), während Browser Megabyte pro Sekunde (MB/s) im Verhältnis 8:1 anzeigen.',
          'WLAN-Entfernung, 2,4-GHz-Auslastung und ältere Router bremsen Gigabit-Anschlüsse oft noch vor dem Anbieter-Netz aus.',
          'Parallele HTTP-Streams messen Ihre tatsächliche Gesamtbandbreite genauer als ein einzelner Download.',
        ],
        sections: [
          {
            heading: 'Megabit (Mbps) vs. Megabyte (MB/s)',
            paragraphs: [
              'Die häufigste Verwirrung beim Speedtest entsteht durch den Unterschied zwischen Megabit (Mbps) und Megabyte pro Sekunde (MB/s). Da 1 Byte aus 8 Bit besteht, erreicht ein 400-Mbps-Glasfaseranschluss theoretisch maximal 50 MB/s beim Dateidownload.',
              'Nach Abzug von Ethernet-, IP- und TLS-Protokoll-Overhead liegt der reale Nutzdatendurchsatz meist bei 90–94 % der gebuchten Leitungsrate. Auf TestLine können Sie jederzeit zwischen Auto, Mbps und MB/s umschalten.',
            ],
          },
          {
            heading: 'Warum Multi-Stream-Benchmarks entscheidend sind',
            paragraphs: [
              'Einzelverbindungen werden leicht durch TCP-Fensterskalierung und Paketlaufzeiten ausgebremst. Drei parallele Download-Streams lasten die Leitung sauber aus und zeigen die echte Kapazität von Modem, Router und Carrier.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter erklärt: Was Video-Calls und Gaming wirklich stört',
        readTime: '5 Min. Lesezeit',
        author: 'TestLine Engineering',
        summary:
          'Hohe Download-Raten helfen bei Videokonferenzen oder Online-Spielen wenig, wenn die Latenz stark schwankt. So wirken Ping, Jitter und Bufferbloat.',
        keyTakeaways: [
          'Der Ping misst die durchschnittliche Umlaufzeit (RTT) in Millisekunden; unter 30 ms reagiert die Verbindung nahezu verzögerungsfrei.',
          'Jitter misst die Schwankung zwischen aufeinanderfolgenden Paketen – Werte über 20–25 ms führen zu Aussetzern.',
          'Gleichzeitige Uploads verursachen oft Bufferbloat-Spitzen, sofern im Router kein SQM/QoS aktiv ist.',
        ],
        sections: [
          {
            heading: 'Latenz als Reaktionsgeschwindigkeit',
            paragraphs: [
              'Bandbreite beschreibt die Breite der Datenautobahn, während der Ping angibt, wie schnell ein Paket zum Edge-Server und zurück gelangt. Live-Telefonie und Spiele reagieren empfindlich auf jede Millisekunde Verzögerung.',
            ],
          },
          {
            heading: 'Warum Jitter Audio-Ruckler auslöst',
            paragraphs: [
              'Wenn fünf RTT-Proben stark schwanken (z. B. 14 ms, 92 ms, 15 ms, 68 ms), müssen Echtzeit-Codecs Pakete verwerfen. Smart Queue Management (SQM) im Router verhindert, dass Hintergrund-Uploads Sprachpakete blockieren.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6 erklärt: Warum Dual-Stack-Netze heute so wichtig sind',
        readTime: '6 Min. Lesezeit',
        author: 'TestLine Netzwerkforschung',
        summary:
          'Da weltweite IPv4-Blöcke erschöpft sind und Mobilfunkanbieter CGNAT einsetzen, wird das Verständnis von Dual-Stack-Routing immer wichtiger.',
        keyTakeaways: [
          'IPv4 nutzt 32-Bit-Adressen (~4,3 Mrd. gesamt), weshalb viele ISPs Adressen per CGNAT teilen.',
          'IPv6 bietet 128-Bit-Adressen für direktes Ende-zu-Ende-Routing ohne mehrstufiges NAT.',
          'Dual-Stack-Tests prüfen gleichzeitig Ihre öffentliche IPv4- und IPv6-Erreichbarkeit.',
        ],
        sections: [
          {
            heading: 'IPv4-Knappheit und Carrier-Grade NAT (CGNAT)',
            paragraphs: [
              'Viele Glasfaser- und 5G-Anbieter teilen eine öffentliche IPv4-Adresse über CGNAT auf zahlreiche Haushalte auf.',
            ],
          },
          {
            heading: 'Wie Dual-Stack-Routing die Leistung verbessert',
            paragraphs: [
              'Moderne Systeme bevorzugen IPv6 per Happy Eyeballs, vermeiden zusätzliche NAT-Tabellen und verringern das Risiko fremder Rate-Limits.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Öffentliche vs. private IP & wie Reverse DNS (PTR) Anbieter identifiziert',
        readTime: '4 Min. Lesezeit',
        author: 'TestLine Netzwerkforschung',
        summary:
          'Warum in Ihren WLAN-Einstellungen 192.168.1.45 steht, Websites aber eine völlig andere IP sehen – und was der PTR-Hostname verrät.',
        keyTakeaways: [
          'Private RFC-1918-Bereiche (10.x, 172.16–31.x, 192.168.x) existieren nur im lokalen LAN.',
          'Ihr Router übersetzt private Adressen per NAT auf Ihre öffentliche WAN-IP.',
          'Reverse DNS (PTR) verknüpft eine IP mit einem sprechenden Hostnamen des Netzbetreibers.',
        ],
        sections: [
          {
            heading: 'Im Heimnetz vs. im öffentlichen Internet',
            paragraphs: [
              'Bei ausgehenden Verbindungen ersetzt Ihr Router Ihre lokale Adresse per NAT durch die vom Anbieter zugewiesene öffentliche IP.',
            ],
          },
          {
            heading: 'Reverse-DNS-(PTR)-Hinweise lesen',
            paragraphs: [
              'PTR-Einträge enthalten oft Regions- und Anschlusskürzel des Providers und helfen bei der Unterscheidung von Privatanschlüssen und Servern.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Gefälschte „Ihre IP wurde gehackt“-Warnungen & Support-Scams erkennen',
        readTime: '5 Min. Lesezeit',
        author: 'TestLine Sicherheitsdesk',
        summary:
          'Betrugs-Popups blenden gern Ihre echte IP und Stadt ein, um Panik auszulösen. Erfahren Sie, warum jede Website Ihre IP sieht und was Betrüger nicht können.',
        keyTakeaways: [
          'Jede besuchte Website erhält Ihre öffentliche IP automatisch für das HTTP-Routing – das Anzeigen beweist keinen Hack.',
          'Gefälschte Warnmeldungen drängen Opfer zu kostenpflichtigen Hotlines oder Fernwartungs-Tools.',
          'Eine IP allein verrät weder Namen, genaue Wohnadresse noch Bankdaten.',
        ],
        sections: [
          {
            heading: 'Warum die IP-Anzeige ein psychologischer Trick ist',
            paragraphs: [
              'Aggressive Werbeweiterleitungen nutzen Ihre öffentliche IP und Region als scheinbaren Beweis für einen Sicherheitsvorfall. Schließen Sie einfach den Tab.',
            ],
          },
          {
            heading: 'Was eine IP verrät – und was nicht',
            paragraphs: [
              'Rufen Sie niemals Telefonnummern aus Browser-Popups an und gewähren Sie Unbekannten keinen Fernzugriff.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP-Spoofing, Header-Fälschung & Missbrauch von Residential-Proxys',
        readTime: '6 Min. Lesezeit',
        author: 'TestLine Sicherheitsdesk',
        summary:
          'Von gefälschten Weiterleitungs-Headern bis zu kostenlosen VPN-Apps, die Heimanschlüsse als Proxy-Ausgang nutzen.',
        keyTakeaways: [
          'Rohes TCP-IP-Spoofing kann keinen normalen HTTPS-Handshake abschließen, daher nutzen Angreifer oft dubiose Proxy-SDKs.',
          'Manche kostenlosen Apps leiten fremden Datenverkehr unbemerkt über Ihren Heimanschluss.',
          'Die Prüfung von PTR, ASN und Proxy-Headern deckt unerwartete Relays auf.',
        ],
        sections: [
          {
            heading: 'Der versteckte Preis kostenloser Proxy-Apps',
            paragraphs: [
              'Da Wohnanschluss-IPs hohes Vertrauen genießen, bündeln manche Gratis-Erweiterungen oder APKs heimlich Proxy-SDKs.',
            ],
          },
          {
            heading: 'Sauberes Routing prüfen',
            paragraphs: [
              'Kontrollieren Sie regelmäßig unbekannte Browser-Erweiterungen und prüfen Sie auf TestLine, ob unerwartete Proxy-Header erscheinen.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Wie IP-Geolokalisierung funktioniert – und warum der angezeigte Ort oft abweicht',
        readTime: '5 Min. Lesezeit',
        author: 'TestLine Netzwerkforschung',
        summary:
          'IP-Adressen enthalten keine GPS-Daten. Erfahren Sie, wie GeoIP-Datenbanken Präfixe zuordnen und warum Mobilfunknetze oft andere Städte anzeigen.',
        keyTakeaways: [
          'IP-Ortung basiert auf RIR-Registern, BGP-Routing und Carrier-Daten, nicht auf GPS.',
          'Mobilfunknetze leiten Datenverkehr oft über zentrale regionale Gateways.',
          'Auf Länderebene liegt die Genauigkeit über 98 %, eine Hausnummer lässt sich über die IP nie bestimmen.',
        ],
        sections: [
          {
            heading: 'Kein GPS in IP-Paketen',
            paragraphs: [
              'Websites schätzen Stadt und Region anhand von WHOIS- und GeoIP-Zuordnungstabellen Ihres Anbieters.',
            ],
          },
          {
            heading: 'Warum Mobilfunk- und Glasfaser-IPs den Ort wechseln',
            paragraphs: [
              'Wird ein Subnetz zwischen Regionen verschoben oder über ein zentrales Core-Gateway geroutet, zeigen Abfragen diesen Knotenpunkt an.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Zeitzonen-Abweichung & Carrier-Routing erklärt',
        readTime: '4 Min. Lesezeit',
        author: 'TestLine Netzwerkforschung',
        summary:
          'Warum Sicherheitsfilter Ihre Browser-Zeitzone mit der IP-Zeitzone vergleichen und wann harmloses Carrier-Routing Abweichungen auslöst.',
        keyTakeaways: [
          'Systeme vergleichen die Browser-Zeitzone mit der registrierten IP-Zeitzone.',
          'Grenzregionen, Roaming-SIMs oder Firmen-VPNs können Abweichungen verursachen.',
          'TestLine stellt Browser- und IP-Zeitzone transparent nebeneinander dar.',
        ],
        sections: [
          {
            heading: 'So funktioniert der Zeitzonen-Vergleich',
            paragraphs: [
              'Stimmt die Systemzeitzone nicht mit dem Standort des Exit-Knotens überein, schlagen viele Dienste einen VPN-Hinweis an.',
            ],
          },
          {
            heading: 'Fehlalarme bei Roaming und Grenzgebieten',
            paragraphs: [
              'Auf TestLine erkennen Sie sofort, ob ein echter Tunnel oder normales Carrier-Routing vorliegt.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Wie Websites ein VPN, einen Proxy oder eine Rechenzentrums-IP erkennen',
        readTime: '6 Min. Lesezeit',
        author: 'TestLine Sicherheitsdesk',
        summary:
          'Diese technischen Signale nutzen Dienste, um kommerzielle VPN-Tunnel, Cloud-Server und Weiterleitungs-Proxys zu identifizieren.',
        keyTakeaways: [
          'ASNs unterscheiden Cloud-Hoster (z. B. Hetzner, AWS, OVH) sofort von Privatkunden-ISPs.',
          'Header wie Via, Forwarded oder mehrfache X-Forwarded-For verraten Proxys.',
          'PTR-Muster und Zeitzonen-Abweichungen ergänzen die Bewertung.',
        ],
        sections: [
          {
            heading: 'ASN-Klassifizierung als stärkstes Signal',
            paragraphs: [
              'Kommerzielle VPN-Anbieter mieten meist Serverblöcke in Hosting-Rechenzentren, deren ASNs sofort als Datacenter eingestuft werden.',
            ],
          },
          {
            heading: 'PTR-Hostnamen und Header-Analyse',
            paragraphs: [
              'Diagnose-Engines kombinieren PTR-Muster, HTTP-Header und Zeitzonen, um den Verbindungsweg transparent einzustufen.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS-Leaks, IPv6-Leaks & Split-Tunneling: Ihren VPN-Status testen',
        readTime: '5 Min. Lesezeit',
        author: 'TestLine Sicherheitsdesk',
        summary:
          'Selbst bei aktivem VPN können unverschlüsselte DNS-Anfragen oder ungetunneltes IPv6 Ihren wahren Standort verraten.',
        keyTakeaways: [
          'Ein IPv6-Leak entsteht, wenn ein VPN nur IPv4 tunnelt, der Browser aber direkt über IPv6 sendet.',
          'Ein DNS-Leak leitet Domain-Abfragen am verschlüsselten Tunnel vorbei an Ihren lokalen ISP.',
          'Die gleichzeitige Prüfung von IPv4, IPv6 und DoH 1.1.1.1 bestätigt einen sauberen Tunnel.',
        ],
        sections: [
          {
            heading: 'Die Dual-Stack-IPv6-Leak-Falle',
            paragraphs: [
              'Schützt der VPN-Client nur IPv4, öffnen Browser auf modernen Anschlüssen dennoch direkte IPv6-Verbindungen über den Heimanschluss.',
            ],
          },
          {
            heading: 'Tunnel-Integrität in Sekunden prüfen',
            paragraphs: [
              'Starten Sie bei aktiviertem VPN einen Check auf TestLine und prüfen Sie, ob sowohl IPv4 als auch IPv6 sowie der ASN zum gewünschten Exit-Knoten gehören.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet wiederhergestellt',
    offlineMode: 'Offline-Modus — Internet getrennt',
    connectionActive: 'Verbindung wieder aktiv',
    playWhileWaiting: 'Spielen Sie Signal Runner bis zur Wiederverbindung',
    score: 'Punkte',
    best: 'Rekord',
    muteAria: 'Spielton stummschalten',
    unmuteAria: 'Spielton aktivieren',
    pauseAria: 'Spiel pausieren',
    resumeAria: 'Spiel fortsetzen',
    returnToSpeedTest: 'Zurück zum Speedtest',
    checking: 'Prüfe...',
    checkConnection: 'Verbindung prüfen',
    canvasAria: 'Offline Signal Runner Jump-and-Run-Spielfläche',
    title: 'Signal Runner',
    subtitle:
      'Springen Sie über Türme, Spitzen und Drohnen, bis Ihr Internet zurückkehrt. Doppelsprung aktiviert.',
    startGame: 'Spiel starten',
    tapHint: 'Bildschirm antippen oder Leertaste / Pfeil hoch drücken',
    paused: 'Spiel pausiert',
    resume: 'Fortsetzen',
    gameOver: 'Signal unterbrochen',
    cleared: 'Überwunden:',
    newBest: 'Neuer Rekord!',
    playAgain: 'Nochmal spielen',
    backToSpeedTest: 'Zurück zum Speedtest',
    jump: 'Springen',
    fastDrop: 'Schnell fallen',
    desktopHintPrefix: 'Tastatur:',
    desktopJump: 'Springen',
    desktopDrop: 'Fallen',
    desktopPause: 'Pause',
  },
  faq: {
    tableTitle: 'Internet-Speedtest & IP-Abfrage — Referenzwerte',
    tableSubtitle:
      'TestLine von ECORZO LLC misst Download-/Upload-Bandbreite, Ping, Jitter, öffentliche IPv4/IPv6-Adressen, IP-Geolokalisierung, DNS-Tempo und VPN-/Proxy-Signale.',
    readGuidesLink: '10 Speed- & IP-Ratgeber lesen',
    colMetric: 'Messwert',
    colMethod: 'Messmethode',
    colThreshold: 'Zielwert',
    colImpact: 'Bedeutung',
    benchmarks: [
      {
        metric: 'Download-Geschwindigkeit (Mbps / MB/s)',
        method: '3 parallele 25-MB-HTTP-Streams (10s-Fenster)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Mehrere Nutzer)',
        standardUse: 'Streaming, Downloads, Cloud-Sync',
      },
      {
        metric: 'Upload-Geschwindigkeit (Mbps / MB/s)',
        method: '2 parallele 10-MB-XHR-POST-Streams',
        optimal: '10+ Mbps (HD-Calls) · 25+ Mbps (Creator)',
        standardUse: 'Videocalls, Backups, Livestreams',
      },
      {
        metric: 'Ping & unbelastete Latenz',
        method: '5 sequenzielle 0-Byte-Cloudflare-RTT-Proben',
        optimal: '< 30 ms (Niedrig) · 30–60 ms (Normal)',
        standardUse: 'Gaming, VoIP, Reaktionszeit',
      },
      {
        metric: 'Jitter & Bufferbloat-Empfindlichkeit',
        method: 'Mittlere RTT-Varianz aufeinanderfolgender Proben',
        optimal: '< 10 ms (Stabil) · > 25 ms (Ausgelastet)',
        standardUse: 'Audio-/Videostabilität unter Last',
      },
      {
        metric: 'DoH-DNS-Latenz & PTR-Abfrage',
        method: 'Verschlüsselte 1.1.1.1-Abfrage + Reverse-DNS-PTR',
        optimal: '< 40 ms DNS-Auflösung',
        standardUse: 'Domain-Auflösung & Anbieterprüfung',
      },
      {
        metric: 'Dual-Stack-IP, Geo & VPN-Status',
        method: 'IPv4/IPv6 + ISP/ASN + Header-/Zeitzonen-Audit',
        optimal: 'Direkte ISP-IP oder geprüfter VPN-Knoten',
        standardUse: 'Öffentliche IP, Standort, Proxy-/VPN-Check',
      },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle:
      'Direkte Antworten zu Internet-Speedtest, öffentlicher IP, Standortbestimmung, VPN-Status und Datenschutz',
    newsLink: 'Sicherheits- & Netz-News',
    methodologyLink: 'Vollständige Methodik',
    gdprLink: 'DSGVO & Datenschutz',
    items: [
      {
        question: 'Wie schnell ist mein Download und Upload im Internet?',
        answer:
          'Klicken Sie auf „Speedtest starten“, um Ihre aktuelle Download- und Upload-Geschwindigkeit in Mbps oder MB/s zu messen. TestLine nutzt 3 parallele Download-Streams und 2 Upload-Streams über Cloudflare-Edge-Server.',
      },
      {
        question: 'Wie lautet meine öffentliche IPv4- und IPv6-Adresse?',
        answer:
          'Beim Start eines Tests erkennt die Dual-Stack-Abfrage sowohl Ihre öffentliche IPv4- als auch Ihre IPv6-Adresse nebeneinander mit Kopierfunktion sowie Stadt, Region, Land, ISP und ASN.',
      },
      {
        question: 'Welche Werte für Ping, Jitter und Bufferbloat sind gut?',
        answer:
          'Ein unbelasteter Ping unter 30 ms und ein Jitter unter 10 ms sorgen für flüssige Videocalls und Gaming. Starke Anstiege unter Last weisen auf Bufferbloat im Router hin.',
      },
      {
        question: 'Wie genau ist die IP-Geolokalisierung?',
        answer:
          'Die IP-Abfrage ordnet Ihren IP-Adressblock den registrierten Region- und Stadtdaten des Providers zu. Sie zeigt niemals Ihre genaue Straßenadresse.',
      },
      {
        question: 'Wie erkennt TestLine ein VPN, einen Proxy oder ein Rechenzentrum?',
        answer:
          'TestLine prüft HTTP-Weiterleitungs-Header, Hosting-ASNs, PTR-Hostnamen und Zeitzonen-Abweichungen zwischen Browser und IP.',
      },
      {
        question: 'Was bedeuten DoH-Latenz und Reverse DNS (PTR)?',
        answer:
          'Die DoH-Latenz misst die Domain-Auflösungszeit über verschlüsseltes HTTPS via Cloudflare 1.1.1.1, während PTR den vom Anbieter vergebenen Hostnamen anzeigt.',
      },
      {
        question: 'Speichert ECORZO LLC meine IP-Adresse oder Testergebnisse?',
        answer:
          'Nein. Tests starten erst auf Ihren Klick, werden flüchtig im Arbeitsspeicher verarbeitet und niemals verkauft oder dauerhaft in Nutzerprofilen gespeichert.',
      },
      {
        question: 'Kann ich TestLine als App nutzen oder offline spielen?',
        answer:
          'Ja. TestLine ist eine installierbare PWA für Mobilgeräte und Desktop. Fällt Ihre Verbindung aus, startet automatisch das Offline-Spiel Signal Runner.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Zurück zum Speedtest',
    effectiveDatePrefix: 'Gültig ab:',
    operatorLabel: 'Betreiber: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Über TestLine',
      subtitle:
        'Entwickelt von ECORZO LLC für transparente Internet-Speedtests und öffentliche IPv4/IPv6-Diagnosen in einer schnellen, datensparsamen Web-App.',
      sections: [
        {
          heading: 'Was TestLine misst',
          paragraphs: [
            'TestLine ist ein kostenloser Browser-Speedtest und ein „Wie ist meine IP“-Diagnosetool von ECORZO LLC. Erst mit Klick auf „Speedtest starten“ laufen Live-Messungen direkt zwischen Ihrem Browser und globalen Edge-Endpunkten.',
          ],
          bullets: [
            {
              strong: 'Download- & Upload-Geschwindigkeit (Mbps / MB/s):',
              text: 'Führt parallele HTTP-Streams gegen Cloudflare-Edge-Knoten aus, wahlweise in Auto, Mbps oder MB/s.',
            },
            {
              strong: 'Ping, Jitter & Latenzqualität:',
              text: 'Misst sequenzielle uncached RTT-Proben für Durchschnitts-Ping, Minimal-Ping und Paket-Jitter.',
            },
            {
              strong: 'IPv4/IPv6, Standort, ISP, ASN & DNS:',
              text: 'Ermittelt Ihre IPv4- und IPv6-Adresse, den ungefähren Standort, ISP, ASN, PTR-Hostname und Cloudflare-DoH-Latenz.',
            },
            {
              strong: 'VPN-, Proxy- & Rechenzentrums-Erkennung:',
              text: 'Wertet Weiterleitungs-Header, Hosting-ASNs, PTR-Muster und Zeitzonen aus.',
            },
          ],
        },
      ],
      closingTitle: 'Wissensdatenbank, Live-News & Unternehmensdaten',
      closingIntro: 'Entdecken Sie unsere',
      closingGuidesLink: '10 Speed-, IP-, Betrugs- & VPN-Ratgeber',
      closingMid: 'oder lesen Sie aktuelle Meldungen im',
      closingNewsLink: 'TestLine News RSS-Feed',
      closingOutro:
        '. TestLine wird von ECORZO LLC betrieben (224 W 35th St STE 500, New York, NY 10001, USA). Für Support besuchen Sie unsere',
      closingContactLink: 'Kontaktseite',
    },
    contact: {
      title: 'Kontakt zu ECORZO LLC',
      subtitle:
        'Erreichen Sie unser Team zu TestLine-Diagnosen, Datenschutzanfragen, DSGVO-Auskünften oder rechtlichen Fragen.',
      telephone: 'Telefon',
      addressLabel: 'Eingetragene Geschäftsadresse',
      copy: 'Kopieren',
      copied: 'Kopiert',
      formHeading: 'Anfrage senden',
      sentTitle: 'Anfrage vorbereitet',
      sentBodyPrefix:
        'Vielen Dank, {name}. Ihre Nachricht wurde zur Prüfung vorgemerkt. Für zeitkritische rechtliche oder DSGVO-Anliegen erreichen Sie ECORZO LLC telefonisch unter +1 646 427 6802 oder postalisch unter 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Weitere Anfrage senden',
      nameLabel: 'Vollständiger Name',
      namePlaceholder: 'Max Mustermann',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'sie@beispiel.de',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Wie kann ECORZO LLC Ihnen helfen?',
      submitBtn: 'Nachricht senden',
      errMissing: 'Bitte geben Sie Namen, E-Mail-Adresse und Nachricht ein.',
      errInvalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    },
    privacy: {
      title: 'Datenschutzerklärung',
      subtitle:
        'Wie TestLine (ECORZO LLC) Diagnoseinformationen gemäß DSGVO, CCPA und Google-Richtlinien verarbeitet und schützt.',
      sections: [
        {
          heading: '1. Verantwortlicher & Geltungsbereich',
          paragraphs: [
            'Diese Datenschutzerklärung gilt für TestLine, betrieben von ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel.: +1 646 427 6802) gemäß EU-/UK-DSGVO und CCPA/CPRA.',
          ],
        },
        {
          heading: '2. Verarbeitete Diagnosedaten',
          bullets: [
            {
              strong: 'Netzwerk- & IP-Telemetrie:',
              text: 'Öffentliche IPv4/IPv6-Adresse, ISP, ASN, ungefähre Region, PTR und HTTP-Header werden ausschließlich flüchtig im Arbeitsspeicher verarbeitet.',
            },
            {
              strong: 'Geschwindigkeitsmessungen:',
              text: 'Ergebnisse bleiben lokal in Ihrem Browser unter testline_history_v1 gespeichert und können jederzeit gelöscht werden.',
            },
            {
              strong: 'Browsereinstellungen:',
              text: 'Design (testline_theme), Spracheinstellung und Cookie-Auswahl (testline_cookie_consent) werden lokal gespeichert.',
            },
          ],
        },
        {
          heading: '3. Drittanbieter & Google-Hinweise',
          paragraphs: [
            'Für Live-Messungen kommuniziert Ihr Browser direkt mit Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois, GeoJS und Ipify. Sofern Google-Dienste geladen werden, gelten die Hinweise von Google:',
          ],
        },
        {
          heading: '4. Kein Datenverkauf & lokale PDFs',
          paragraphs: [
            'ECORZO LLC verkauft oder vermietet keine personenbezogenen Daten oder IP-Adressen. Exportierte PDF-Berichte werden vollständig lokal in Ihrem Browser erzeugt.',
          ],
        },
      ],
      googlePolicyLinkText: 'Wie Google Daten von Websites oder Apps verwendet, die unsere Dienste nutzen',
      rightsPrefix: 'Informationen zu Ihren Betroffenenrechten finden Sie in unserer',
      gdprLinkText: 'DSGVO- & Datenerhebungsrichtlinie',
      rightsSuffix: 'oder kontaktieren Sie ECORZO LLC unter +1 646 427 6802.',
    },
    disclaimer: {
      title: 'Haftungsausschluss',
      subtitle:
        'Wichtige Hinweise zu Speedtest-Einflussfaktoren, IP-Standortgenauigkeit und Proxy-/VPN-Signalen.',
      sections: [
        {
          heading: '1. Nur zu Informations- und Diagnosezwecken',
          paragraphs: [
            'TestLine wird ohne Mängelgewähr bereitgestellt. Messwerte spiegeln die zum Testzeitpunkt beobachtete Bandbreite wider und stellen keine rechtsverbindliche ISP-Zertifizierung dar.',
          ],
        },
        {
          heading: '2. Einflussfaktoren auf Geschwindigkeitswerte',
          paragraphs: [
            'WLAN-Qualität, Router-Hardware, Hintergrund-Downloads, VPN-Verschlüsselung und Peering können die Messwerte beeinflussen.',
          ],
        },
        {
          heading: '3. IP-Geolokalisierung & Proxy-Erkennung',
          paragraphs: [
            'Standortdaten stammen aus IP-Registern und zeigen den Netz-Knoten, niemals die genaue Hausanschrift.',
          ],
        },
        {
          heading: '4. Haftungsbeschränkung',
          paragraphs: [
            'Soweit gesetzlich zulässig, haftet ECORZO LLC nicht für mittelbare oder unmittelbare Schäden aus der Nutzung der Diagnosewerte.',
          ],
        },
      ],
    },
    terms: {
      title: 'Nutzungsbedingungen',
      subtitle: 'Regeln für den Zugang und die Nutzung von TestLine durch ECORZO LLC.',
      sections: [
        {
          heading: '1. Annahme der Bedingungen',
          paragraphs: [
            'Durch die Nutzung von TestLine erklären Sie sich mit diesen Nutzungsbedingungen und geltendem Recht einverstanden.',
          ],
        },
        {
          heading: '2. Zulässige & unzulässige Nutzung',
          bullets: [
            { text: 'Sie dürfen TestLine für private, schulische oder geschäftliche Netzwerkdiagnosen nutzen und PDF-Berichte exportieren.' },
            { text: 'Automatisierte Bots, DDoS-Tools oder hochfrequente Scraper gegen TestLine oder Endpunkte sind untersagt.' },
            { text: 'Das Umgehen von Ratenbegrenzungen ist nicht gestattet.' },
          ],
        },
        {
          heading: '3. Geistiges Eigentum',
          paragraphs: ['Name, Design und Quellcode von TestLine gehören ECORZO LLC.'],
        },
        {
          heading: '4. Anwendbares Recht',
          paragraphs: ['Es gilt das Recht des Bundesstaates New York, USA, soweit zwingendes Verbraucherrecht nichts anderes vorschreibt.'],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookie-Richtlinie',
      subtitle: 'Übersicht der von TestLine verwendeten Cookies und Local-Storage-Schlüssel.',
      sec1Title: '1. Was sind Cookies & Local Storage?',
      sec1Body:
        'Cookies sind kleine Textdateien im Browser. Moderne Web-Apps nutzen zudem localStorage, um Einstellungen lokal ohne unnötige Serverübertragung zu sichern.',
      sec2Title: '2. Von TestLine verwendete Speicherschlüssel',
      colKey: 'Schlüssel',
      colCategory: 'Kategorie',
      colPurpose: 'Zweck',
      rows: [
        { key: 'testline_theme', category: 'Notwendige Präferenz', purpose: 'Speichert Ihre Hell-/Dunkelmodus-Wahl.' },
        { key: 'testline_unit_v1', category: 'Notwendige Präferenz', purpose: 'Speichert Ihre gewählte Einheit (Auto, Mbps, MB/s).' },
        { key: 'testline_history_v1', category: 'Funktional Lokal', purpose: 'Speichert bis zu 15 letzte Testergebnisse lokal.' },
        { key: 'testline_cookie_consent', category: 'Notwendige Einwilligung', purpose: 'Speichert Ihre Google-Consent-Mode-v2-Auswahl.' },
      ],
      sec3Title: '3. Drittanbieter- & Google-Offenlegung',
      sec3Prefix:
        'Gemäß Google Consent Mode v2 und EU-ePrivacy bleiben Werbe- und Analyse-Speicher standardmäßig deaktiviert. Autorisierte Verkäufer sind gelistet unter',
      sec3Mid: '. Sie können Ihre Wahl jederzeit über',
      cookiesNoticeLinkText: 'Cookie-Hinweis',
      sec3OrVia: 'oder über',
      googleAdSettingsText: 'Google-Anzeigeneinstellungen',
    },
    cookiesNotice: {
      title: 'Cookie-Hinweis & Einwilligungseinstellungen',
      subtitle: 'Verwalten Sie Ihre Cookie- und Speichereinstellungen für TestLine.',
      sec1Title: 'Hinweis für Besucher (EWR, UK, Schweiz & Global)',
      sec1Body:
        'TestLine nutzt notwendigen Browserspeicher für Design, Einheiten, Verlauf und Ihre Einwilligungswahl. Analyse- und Werbespeicher bleiben ohne Ihre Zustimmung deaktiviert.',
      activeTitle: 'Aktive Auswahl',
      currentSettingLabel: 'Aktuelle Einstellung:',
      statusAll: 'Alle akzeptiert (Analyse & Anzeigen)',
      statusEssential: 'Nur technisch notwendige',
      statusUnset: 'Noch nicht gewählt (Standardmäßig abgelehnt)',
      savedBadge: 'Gespeichert',
      acceptAllBtn: 'Alle funktionalen Speicher akzeptieren',
      essentialOnlyBtn: 'Nur notwendige',
      sec2Title: 'Browser-Kontrollen',
      sec2Body:
        'Sie können Cookies und Websitedaten jederzeit direkt in Ihren Browsereinstellungen löschen oder blockieren.',
    },
    gdpr: {
      title: 'DSGVO & Datenerhebungsrichtlinie',
      subtitle: 'Rechtsgrundlagen, Datenminimierung und Betroffenenrechte nach DSGVO.',
      sections: [
        {
          heading: '1. Verantwortliche Stelle',
          paragraphs: [
            'Verantwortlicher im Sinne der DSGVO ist ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Tel.: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Rechtsgrundlagen (Art. 6 DSGVO)',
          bullets: [
            { strong: 'Vertrag / Angeforderter Dienst (Art. 6 Abs. 1 lit. b):', text: 'Verarbeitung von IP und Teststreams zur Durchführung der von Ihnen gestarteten Diagnose.' },
            { strong: 'Berechtigtes Interesse (Art. 6 Abs. 1 lit. f):', text: 'Schutz vor Missbrauch, DDoS-Angriffen und Sicherstellung der Netzstabilität.' },
            { strong: 'Einwilligung (Art. 6 Abs. 1 lit. a):', text: 'Nicht notwendige Analyse- oder Werbe-Cookies werden nur nach aktiver Zustimmung gesetzt.' },
          ],
        },
        {
          heading: '3. Datenminimierung',
          paragraphs: ['Keine Registrierung, keine Passwörter, kein dauerhaftes IP-Logging.'],
        },
        {
          heading: '4. Internationale Übermittlungen',
          paragraphs: ['Übermittlungen außerhalb des EWR stützen sich auf Standardvertragsklauseln (SCCs).'],
        },
        {
          heading: '5. Ihre gesetzlichen Rechte (Art. 15–22 DSGVO)',
          bullets: [
            { strong: 'Auskunft & Datenübertragbarkeit:', text: 'Recht auf Auskunft über verarbeitete Daten.' },
            { strong: 'Berichtigung & Löschung:', text: 'Recht auf Korrektur oder Löschung.' },
            { strong: 'Widerspruch & Beschwerde:', text: 'Recht auf Widerruf der Einwilligung und Beschwerde bei einer Aufsichtsbehörde.' },
          ],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Netzwerk- & Speed-Bericht',
    generated: 'Erstellt',
    unit: 'Einheit',
    secondCopyBanner: 'ZWEITAUSFERTIGUNG  —  Erneuter Bericht-Download',
    sec1Title: '1. Speedtest-Zusammenfassung',
    downloadSpeed: 'Download-Geschw.',
    uploadSpeed: 'Upload-Geschw.',
    avgPing: 'Durchschn. Ping',
    jitter: 'Jitter',
    peak: 'Spitze',
    sustained: 'Dauerhafter Stream',
    min: 'Min.',
    probes: 'Proben',
    rttProbes: 'RTT-Proben',
    sec2Title: '2. Proxy- & VPN-Erkennung',
    directClean: 'Direkte Verbindung — Keine Proxy- oder VPN-Signale erkannt',
    sec3Title: '3. Netzwerk-, IP- & DNS-Diagnose',
    sec4Title: '4. Letzte Sitzungs-Messungen',
    confidenceWord: 'Konfidenz',
    pageOf: 'Seite {p} von {total}',
    secondCopyShort: 'Zweitausfertigung',
    rowPrimaryIp: 'Primäre öffentliche IP',
    rowIpv4: 'IPv4-Adresse',
    rowIpv6: 'IPv6-Adresse',
    rowIsp: 'ISP / Netzbetreiber',
    rowAsn: 'Autonomes System (ASN)',
    rowLocation: 'Ungefährer Standort',
    rowTimezone: 'Zeitzone',
    rowPtr: 'Reverse DNS (PTR)',
    rowDoh: 'DoH-Resolver-Probe',
    rowProtocol: 'Transportprotokoll',
    rowLinkHint: 'Browser-Verbindungshinweis',
    notDetected: 'Nicht erkannt',
    noPtr: 'Kein PTR-Eintrag veröffentlicht',
    reachable: 'Erreichbar',
    unreachable: 'Nicht erreichbar',
    notExposed: 'Vom Browser nicht bereitgestellt',
    available: 'Verfügbar',
    colTime: 'Zeit',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Öffentliche IP',
  },
};
