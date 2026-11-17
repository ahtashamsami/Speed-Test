import type { TranslationPack } from '../types';

export const itPack: TranslationPack = {
  meta: {
    lang: 'it',
    intlLocale: 'it-IT',
    dir: 'ltr',
    nativeName: 'Italiano',
  },
  seo: {
    home: {
      title: 'TestLine — Speed Test Internet & Verifica IP Pubblico',
      description:
        'Misura la velocità di download e upload, ping e jitter e controlla il tuo indirizzo IP pubblico (IPv4/IPv6), posizione ISP, latenza DNS e stato VPN.',
      keywords:
        'speed test internet, qual è il mio ip, ip pubblico, velocità download, velocità upload, test ping, latenza, jitter, bufferbloat, ipv4, ipv6, posizione ip, ricerca asn, dns inverso, rilevamento vpn',
      breadcrumbLabel: 'Speed Test',
    },
    news: {
      title: 'Notizie di Cybersicurezza, Reti & Tech | TestLine',
      description:
        'Leggi notizie RSS in tempo reale su cybersicurezza, banda larga, DNS, BGP e tecnologia da Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch e Ars Technica.',
      keywords: 'notizie cybersicurezza, sicurezza rete rss, cloudflare blog, interruzioni internet',
      breadcrumbLabel: 'Notizie',
    },
    blog: {
      title: 'Guide su Velocità Internet, IP Pubblico e VPN | TestLine',
      description:
        'Scopri 10 guide esperte su velocità internet, Mbps vs MB/s, indirizzi IPv4 e IPv6, truffe IP, geolocalizzazione, bufferbloat e rilevamento VPN.',
      keywords: 'guida velocità internet, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, rilevamento vpn',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'Chi Siamo — Speed Test & Diagnostica IP | TestLine',
      description:
        'Scopri come TestLine di ECORZO LLC misura banda, ping, jitter, routing dual-stack IPv4/IPv6, latenza DoH e segnali VPN o proxy.',
      keywords: 'chi siamo testline, ecorzo llc, metodologia speed test, diagnostica ip',
      breadcrumbLabel: 'Chi siamo',
    },
    privacy: {
      title: 'Informativa sulla Privacy — IP Effimero & Speed Test | TestLine',
      description:
        'Leggi la Privacy Policy di TestLine (ECORZO LLC) su analisi IP effimere, zero archiviazione permanente dei risultati, GDPR e cookie.',
      keywords: 'privacy policy testline, ecorzo llc, gdpr, nessun log ip',
      breadcrumbLabel: 'Privacy Policy',
    },
    contact: {
      title: 'Contatta TestLine & ECORZO LLC — Supporto di Rete',
      description:
        'Contatta ECORZO LLC per domande su TestLine speed test, verifica IP, privacy o richieste GDPR.',
      keywords: 'contatti testline, ecorzo llc new york, supporto rete, privacy',
      breadcrumbLabel: 'Contatti',
    },
    disclaimer: {
      title: 'Disclaimer — Limiti di Misura & Verifica IP | TestLine',
      description:
        'Comprendi le variabili dello speed test, i colli di bottiglia Wi-Fi, i limiti di geolocalizzazione IP e il rilevamento VPN/proxy su TestLine.',
      keywords: 'disclaimer testline, precisione geolocalizzazione ip, rilevamento vpn',
      breadcrumbLabel: 'Disclaimer',
    },
    terms: {
      title: 'Termini e Condizioni — TestLine di ECORZO LLC',
      description:
        'Consulta i Termini e Condizioni che regolano l’uso corretto degli strumenti di speed test e verifica IP su TestLine.',
      keywords: 'termini e condizioni testline, ecorzo llc, uso consentito',
      breadcrumbLabel: 'Termini e Condizioni',
    },
    'cookies-policy': {
      title: 'Cookie Policy e Archiviazione Locale — TestLine',
      description:
        'Verifica le chiavi esatte di archiviazione locale e le informative sui cookie utilizzate da TestLine di ECORZO LLC.',
      keywords: 'cookie policy testline, local storage, consent mode v2',
      breadcrumbLabel: 'Cookie Policy',
    },
    'cookies-notice': {
      title: 'Informativa Cookie e Preferenze di Consenso — TestLine',
      description:
        'Gestisci in qualsiasi momento le preferenze di consenso per cookie, analisi e archiviazione locale su TestLine.',
      keywords: 'informativa cookie, gestisci consenso, impostazioni privacy',
      breadcrumbLabel: 'Avviso Cookie',
    },
    gdpr: {
      title: 'GDPR e Politica di Raccolta Dati — TestLine',
      description:
        'Esplora le basi giuridiche GDPR Articolo 6 di ECORZO LLC, minimizzazione dei dati, trasferimenti internazionali e diritti degli utenti.',
      keywords: 'gdpr testline, protezione dati ecorzo llc, articolo 6 gdpr',
      breadcrumbLabel: 'GDPR & Dati',
    },
  },
  nav: {
    speedTest: 'Speed Test',
    news: 'Notizie',
    blog: 'Blog',
    about: 'Chi siamo',
    contact: 'Contatti',
    privacy: 'Privacy Policy',
    stopTest: 'Ferma Test',
    newBadgeSuffix: 'nuovo',
    homeAria: 'Home TestLine',
    primaryNavAria: 'Pagine principali',
    mobileNavAria: 'Menu mobile',
    companyMenuAria: 'Menu TestLine: Chi siamo, Contatti e Privacy Policy',
  },
  pwa: {
    installApp: 'Installa App',
    installAria: 'Installa app TestLine',
    installIosAria: 'Installa TestLine su iPhone o iPad',
    iosTitle: 'Installa TestLine su iPhone / iPad',
    closeDialog: 'Chiudi finestra',
    iosStep1Prefix: 'Tocca il pulsante',
    iosStep1Strong: 'Condividi',
    iosStep1Suffix: 'nella barra di Safari.',
    iosStep2Prefix: 'Scorri verso il basso e tocca',
    iosStep2Strong: 'Aggiungi alla schermata Home',
    iosStep2Suffix: '.',
    iosStep3:
      'Apri TestLine quando vuoi—anche offline, il gioco Signal Runner si avvia automaticamente.',
    gotIt: 'Ho capito',
  },
  hero: {
    title: 'Speed Test Internet & Verifica IP Pubblico',
    subtitle:
      'Controlla velocità di download e upload, ping e jitter—oltre al tuo indirizzo IPv4/IPv6, posizione ISP, latenza DNS e stato VPN.',
    speedUnitAria: 'Unità di velocità',
    autoTooltip: 'Usa automaticamente Mbps sotto i 100 Mbps e MB/s da 100 Mbps in su',
    auto: 'Auto',
    lightMode: 'Modalità Chiara',
    darkMode: 'Modalità Scura',
    switchToLight: 'Passa alla modalità chiara',
    switchToDark: 'Passa alla modalità scura',
    exportPdf: 'Esporta PDF',
    exportingPdf: 'Esportazione...',
    exportDisabledTitle: 'Avvia prima uno speed test per esportare il report PDF',
    exportEnabledTitle: 'Esporta report PDF con velocità e diagnostica di rete',
  },
  duplicateModal: {
    title: 'Report Già Scaricato',
    closeDialog: 'Chiudi finestra',
    body: 'Hai già scaricato il report per questo test. Vuoi scaricarlo nuovamente?',
    notePrefix: 'Le copie riesportate sono etichettate chiaramente come',
    secondCopy: 'Seconda Copia',
    noteSuffix: 'sul documento.',
    cancel: 'No, Annulla',
    confirm: 'Sì, Scarica di Nuovo',
  },
  speedStage: {
    startSpeedTest: 'Avvia Speed Test',
    yourSpeedIs: 'La velocità della tua rete è',
    stopAria: 'Ferma speed test',
    startAria: 'Avvia speed test',
    retry: 'Riprova',
    statusIdle: 'Premi Play per avviare il test',
    statusPing: 'Misurazione ping e jitter...',
    statusDownload: 'Test velocità di download...',
    statusUpload: 'Test velocità di upload...',
    statusComplete: 'Speed test completato',
    statusStopped: 'Test interrotto',
    statusError: 'Test interrotto per errore',
    uploadSpeed: 'Velocità di Upload',
    peakPrefix: 'Picco',
    twoStreams: '2 flussi paralleli',
    latencyAvgPing: 'Latenza (Ping Medio)',
    minPrefix: 'Min',
    probesSuffix: 'sonde',
    fiveProbes: '5 sonde RTT Cloudflare',
    jitter: 'Jitter',
    consecutiveVariance: 'Varianza RTT consecutiva',
    waitingRtt: 'In attesa dei campioni RTT',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Avviso rilevamento Proxy o VPN',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy Rilevato',
      'Datacenter / Relay Network': 'Rete Datacenter / Relay',
      'Timezone Mismatch (Possible VPN)': 'Fuso Orario Discordante (Possibile VPN)',
      'Direct Connection': 'Connessione Diretta',
    },
    confidence: {
      High: 'Alta',
      Moderate: 'Moderata',
      Low: 'Bassa',
    },
    confidenceWord: 'affidabilità',
    signalSingular: 'segnale',
    signalPlural: 'segnali',
    noticeDesc:
      'La tua connessione mostra caratteristiche di proxy, VPN o datacenter. Le misurazioni riflettono il tunnel attivo o il nodo di uscita.',
    observedExitIp: 'IP di Uscita Osservato',
    relayOperator: 'Operatore / Rete di Uscita',
    exitLocationTz: 'Posizione di Uscita & Fuso',
    detectedIndicators: 'Indicatori Rilevati',
    unavailable: 'Non disponibile',
    signalTemplates: {
      proxy_flag: 'L’indirizzo IP è segnalato come proxy attivo, VPN o nodo di uscita Tor',
      hosting_flag:
        'Il traffico proviene da un ASN datacenter / hosting anziché da un ISP residenziale',
      provider_keyword: 'Operatore o PTR corrisponde a parola chiave relay ({1})',
      via_header: 'Rilevato header di inoltro proxy ({1})',
      multi_hop: 'Rilevati più salti di inoltro ({1} hop)',
      ip_mismatch: 'IP diretto del browser diverso dall’IP osservato al edge (split-tunnel o proxy)',
      timezone_mismatch:
        'Il fuso orario del browser ({1}) differisce dal fuso di geolocalizzazione IP ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Indirizzo IP Pubblico',
    resolvingRoute: 'Risoluzione percorso',
    routeSuffix: 'percorso',
    updatedPrefix: 'Aggiornato',
    unavailable: 'Non disponibile',
    metadataUnavailable: 'Metadati di rete non disponibili',
    copyIp: 'Copia IP',
    copiedIp: 'IP Copiato',
    refresh: 'Aggiorna',
    ipv46CardTitle: 'IPv4, IPv6 & Instradamento ISP',
    ipv46CardSubtitle: 'Sonde client dual-stack combinate con geolocalizzazione IP edge',
    ipv4Label: 'Indirizzo IPv4',
    ipv6Label: 'Indirizzo IPv6',
    notDetected: 'Non rilevato',
    ipv6NotDetected: 'Non rilevato (solo percorso IPv4)',
    ispLabel: 'ISP / Operatore',
    asnLabel: 'Sistema Autonomo (ASN)',
    locationLabel: 'Posizione Approssimativa',
    proxyCheckLabel: 'Controllo Proxy / VPN',
    resolving: 'Risoluzione...',
    inspecting: 'Analisi...',
    directConnectionNone: 'Connessione diretta (Nessuno rilevato)',
    dnsCardTitle: 'Suggerimenti DNS & Diagnostica Link',
    dnsCardSubtitle: 'Record PTR inverso, raggiungibilità DoH e segnali di trasporto del browser',
    ptrLabel: 'DNS Inverso (PTR)',
    noPtr: 'Nessun record PTR pubblicato',
    dohProbeLabel: 'Sonda Resolver DoH',
    probing: 'Test in corso...',
    reachable: 'Raggiungibile',
    blockedOrUnreachable: 'Bloccato o irraggiungibile',
    dnsLatencyLabel: 'Latenza Query DNS',
    protocolLabel: 'Protocollo di Trasporto',
    checking: 'Verifica...',
    linkHintLabel: 'Indicatore Link Browser',
    exposedNoMetrics: 'Esposto senza metriche',
    notExposed: 'Non esposto dal browser',
    timezoneLabel: 'Fuso Orario',
    copy: 'Copia',
    copied: 'Copiato',
    capSuffix: 'Mbps max',
    rttSuffix: 'ms RTT',
    fetchError: 'Impossibile raggiungere gli endpoint di diagnostica IP.',
  },
  history: {
    title: 'Cronologia Sessione',
    subtitle: 'Misurazioni recenti salvate localmente nel browser',
    clearHistory: 'Cancella Cronologia',
    emptyText: 'I test completati appariranno qui per confrontare le esecuzioni.',
    colTime: 'Ora',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'IP Pubblico',
  },
  consent: {
    title: 'Avviso Cookie & Privacy',
    description:
      'TestLine usa archiviazione locale essenziale per tema, unità e cronologia. Cookie opzionali di analisi e pubblicità restano disattivati salvo tua accettazione.',
    acceptAll: 'Accetta Tutto',
    essentialOnly: 'Solo Essenziali',
    cookieSettings: 'Impostazioni Cookie',
  },
  footer: {
    byEcorzo: 'di ECORZO LLC',
    tagline:
      'Speed test internet in tempo reale e diagnostica di rete IP dual-stack gestita da ECORZO LLC.',
    companyHeading: 'Azienda',
    legalHeading: 'Note Legali & Conformità',
    disclaimer: 'Disclaimer',
    terms: 'Termini e Condizioni',
    cookiesPolicy: 'Cookie Policy',
    cookiesNotice: 'Avviso Cookie',
    gdpr: 'GDPR e Raccolta Dati',
    privacy: 'Privacy Policy',
    copyrightSuffix: 'ECORZO LLC. Tutti i diritti riservati.',
    poweredBy:
      'Misurazioni tramite endpoint Cloudflare · Conforme a GDPR e policy Google',
    languageLabel: 'Lingua',
    autoOption: 'Auto (Regione)',
  },
  news: {
    eyebrow: 'Aggregatore RSS Live di Cybersicurezza & Tech',
    updatedPrefix: 'Aggiornato',
    title: 'Notizie di Rete, Sicurezza & Tecnologia',
    filterPlaceholder: 'Filtra titoli...',
    filterAria: 'Filtra notizie',
    refreshFeeds: 'Aggiorna Feed',
    refreshing: 'Aggiornamento...',
    cachedBannerPrefix:
      'I feed RSS live non sono al momento raggiungibili. Visualizzazione delle notizie recenti salvate in cache su questo dispositivo',
    retryLive: 'Riprova Feed Live',
    retrying: 'Nuovo tentativo...',
    allSources: 'Tutte le Fonti',
    errorFallback:
      'Impossibile caricare i feed RSS in questo momento. Controlla la connessione e riprova.',
    tryAgain: 'Riprova',
    emptyText: 'Nessuna notizia corrispondente trovata nei feed RSS correnti.',
    showAll: 'Mostra Tutti i Feed',
    newTag: 'Nuovo',
    readFullStory: 'Leggi Articolo Completo',
    recent: 'Recente',
    minutesAgo: '{n}m fa',
    hoursAgo: '{n}h fa',
  },
  blog: {
    eyebrow: 'Guide TestLine & Rassegna Quotidiana',
    articlesCountSuffix: 'Articoli',
    title: 'Velocità Internet, Diagnostica IP & Bollettini Giornalieri',
    subtitle:
      'Guide approfondite su velocità di rete, IPv4/IPv6, truffe IP, posizione IP e rilevamento VPN—oltre a 2 notizie calde al giorno selezionate automaticamente dai nostri feed RSS.',
    searchPlaceholder: 'Cerca tra {n} articoli...',
    searchAria: 'Cerca articoli del blog',
    allLabel: 'Tutti',
    hotNewsLabel: 'Notizie Calde',
    dailyHotNewsBadge: 'Notizia del Giorno',
    emptyText: 'Nessun articolo corrisponde ai filtri selezionati.',
    resetFilters: 'Reimposta Filtri',
    newTag: 'Nuovo',
    readArticle: 'Leggi Articolo',
    backToAllPrefix: 'Torna a Tutti i',
    backToAllSuffix: 'Articoli',
    originalSourcePrefix: 'Fonte Originale',
    testConnectionNow: 'Testa Connessione Ora',
    keyTakeaways: 'Punti Chiave',
    dailyReadTime: '3 min di lettura',
    dailyAuthorPrefix: 'Rassegna Quotidiana TestLine · via',
    dailyTakeawayFeatured:
      'Selezionato nel bollettino quotidiano TestLine ({source}) per {topic}.',
    dailyTakeawaySummaryPrefix: 'Sintesi principale:',
    dailyTakeawayTip:
      'Verifica sempre indirizzo IPv4/IPv6 pubblico attivo, latenza DNS e stato VPN/proxy prima di diagnosticare avvisi imprevisti.',
    dailySectionBriefingPrefix: 'Bollettino del Giorno:',
    dailyBriefingPara2:
      'Selezionato automaticamente per la rassegna TestLine del {date} in base alla rilevanza per reti e sicurezza informatica. Consulta il link della fonte primaria in alto per l’articolo originale.',
    dailySectionActionTitle: 'Diagnostica di Rete e Azioni Pratiche',
    dailyActionPara1:
      'Gli eventi legati a {topic} possono influire sui resolver DNS ISP, tabelle di instradamento e gateway VPN aziendali. Eseguire uno speed test e una verifica IP dual-stack conferma subito l’eventuale presenza di jitter elevato o variazioni di instradamento.',
    dailyActionPara2:
      'Resta aggiornato su vulnerabilità emergenti e avvisi di rete nella scheda Notizie e nelle guide del Blog TestLine.',
    categories: {
      'Hot News': 'Notizie Calde',
      'Internet Speed': 'Velocità Internet',
      'IP Addresses': 'Indirizzi IP',
      'IP Scams': 'Truffe IP',
      'IP Location': 'Posizione IP',
      'VPN IP Status': 'Stato IP VPN',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Perché la Velocità Reale di Download Differisce dal Piano ISP',
        readTime: '5 min di lettura',
        author: 'Ingegneria TestLine',
        summary:
          'Scopri perché una linea da 500 Mbps scarica a 50–60 MB/s, come l’overhead TCP/TLS influisce sul throughput e perché i test multi-stream sono più affidabili.',
        keyTakeaways: [
          'Gli operatori esprimono le offerte in megabit al secondo (Mbps), mentre i browser mostrano megabyte al secondo (MB/s) con rapporto 8:1.',
          'Distanza Wi-Fi, congestione 2,4 GHz e router datati limitano spesso le linee in fibra.',
          'Flussi HTTP paralleli misurano la banda reale meglio di un singolo trasferimento TCP.',
        ],
        sections: [
          {
            heading: 'Megabit (Mbps) vs. Megabyte (MB/s)',
            paragraphs: [
              'Poiché 1 byte contiene 8 bit, una fibra da 400 Mbps garantisce un massimo teorico di 50 MB/s. Considerando header IP e cifratura TLS, il rendimento effettivo si attesta al 90–94%.',
            ],
          },
          {
            heading: 'Perché Contano i Test Multi-Flusso',
            paragraphs: [
              'Eseguire 3 flussi paralleli satura la connessione evitando i limiti di finestra di un singolo socket TCP.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter: Cosa Rovina Davvero Videochiamate e Gaming',
        readTime: '5 min di lettura',
        author: 'Ingegneria TestLine',
        summary:
          'Una banda elevata non basta se la latenza oscilla. Ecco come ping, jitter e bufferbloat impattano le applicazioni in tempo reale.',
        keyTakeaways: [
          'Il ping misura il tempo medio di andata e ritorno (RTT) in ms; sotto 30 ms è quasi istantaneo.',
          'Il jitter misura la variabilità tra pacchetti consecutivi; oltre 20–25 ms provoca scatti audio.',
          'Attivare SQM/QoS sul router previene picchi di bufferbloat durante gli upload.',
        ],
        sections: [
          {
            heading: 'La Latenza È Reattività',
            paragraphs: [
              'Lo streaming 4K usa il buffer, mentre chiamate VoIP e giochi competitivi reagiscono a ogni millisecondo di ritardo.',
            ],
          },
          {
            heading: 'Perché il Jitter Causa Scatti Audio',
            paragraphs: [
              'Se le sonde oscillano tra 14 ms e 92 ms, i codec audio devono scartare pacchetti per compensare l’irregolarità.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6: Perché le Reti Dual-Stack Contano Oggi',
        readTime: '6 min di lettura',
        author: 'Ricerca Reti TestLine',
        summary:
          'Con l’esaurimento degli IPv4 e l’uso di CGNAT sugli operatori mobili e fibra, capire il routing dual-stack è fondamentale.',
        keyTakeaways: [
          'IPv4 utilizza indirizzi a 32 bit (~4,3 miliardi), spingendo molti ISP a condividere gli IP tramite CGNAT.',
          'IPv6 utilizza indirizzi a 128 bit ripristinando connettività diretta senza NAT a più livelli.',
          'Il test dual-stack verifica la presenza simultanea di rotte pubbliche IPv4 e IPv6.',
        ],
        sections: [
          {
            heading: 'Esaurimento IPv4 e CGNAT',
            paragraphs: [
              'Molti operatori assegnano un unico IPv4 pubblico condiviso da decine di famiglie dietro Carrier-Grade NAT.',
            ],
          },
          {
            heading: 'I Vantaggi del Dual-Stack',
            paragraphs: [
              'I sistemi operativi preferiscono IPv6 tramite Happy Eyeballs riducendo la latenza di traduzione NAT.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'IP Pubblico vs. IP Privato & Come il DNS Inverso (PTR) Identifica gli ISP',
        readTime: '4 min di lettura',
        author: 'Ricerca Reti TestLine',
        summary:
          'Perché il telefono mostra 192.168.1.45 mentre i siti vedono un altro IP pubblico—e cosa svela il record PTR.',
        keyTakeaways: [
          'Le reti private RFC 1918 (10.x, 172.16–31.x, 192.168.x) esistono solo nella LAN locale.',
          'Il router traduce gli indirizzi privati nell’IP pubblico WAN tramite NAT.',
          'Il DNS inverso (PTR) associa l’IP pubblico al nome host dell’operatore.',
        ],
        sections: [
          {
            heading: 'Dentro il Router vs. Internet Pubblico',
            paragraphs: [
              'Quando il traffico esce verso il web, il NAT sostituisce l’indirizzo locale con l’IP pubblico assegnato dall’ISP.',
            ],
          },
          {
            heading: 'Interpretare il Record PTR',
            paragraphs: [
              'I nomi PTR aiutano gli strumenti diagnostici a distinguere utenze residenziali da server cloud.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Come Riconoscere i Falsi Avvisi "Il Tuo IP È Stato Hackerato"',
        readTime: '5 min di lettura',
        author: 'Desk Sicurezza TestLine',
        summary:
          'I pop-up truffa mostrano il tuo vero IP e città per spaventarti. Scopri perché ogni sito vede il tuo IP e cosa i truffatori non possono fare.',
        keyTakeaways: [
          'Ogni sito visitato riceve automaticamente il tuo IP pubblico via HTTP: mostrarlo non prova alcuna violazione.',
          'I falsi avvisi spingono le vittime a chiamare numeri fittizi o concedere accesso remoto.',
          'Un IP pubblico da solo non rivela nome, indirizzo stradale o dati bancari.',
        ],
        sections: [
          {
            heading: 'Perché Mostrare l’IP È un Trucco Psicologico',
            paragraphs: [
              'I banner fraudolenti sfruttano dati pubblici del protocollo HTTP per sembrare allarmi reali. Basta chiudere la scheda del browser.',
            ],
          },
          {
            heading: 'Cosa Espone Davvero un Indirizzo IP',
            paragraphs: [
              'Indica solo la rete del provider e l’area cittadina approssimativa, mai il numero civico o file privati.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP Spoofing, Falsificazione Header & Truffe Proxy Residenziali',
        readTime: '6 min di lettura',
        author: 'Desk Sicurezza TestLine',
        summary:
          'Dalla falsificazione degli header X-Forwarded-For alle app gratuite che trasformano la connessione di casa in un nodo di uscita proxy.',
        keyTakeaways: [
          'Falsificare l’IP sorgente TCP non completa una stretta di mano HTTPS; perciò si sfruttano SDK in app gratuite.',
          'Alcune "VPN gratuite" rivendono silenziosamente la tua banda residenziale.',
          'Verificare PTR, ASN e header aiuta a individuare relay inattesi.',
        ],
        sections: [
          {
            heading: 'Il Costo Nascosto dei Proxy Gratuiti',
            paragraphs: [
              'Poiché gli IP domestici godono di alta reputazione, estensioni o app poco trasparenti instradano traffico altrui dalla tua linea.',
            ],
          },
          {
            heading: 'Verificare l’Uscita Pulita',
            paragraphs: [
              'Controlla periodicamente le estensioni del browser e verifica su TestLine che il tuo IP corrisponda al tuo ISP.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Come Funziona la Geolocalizzazione IP & Perché la Città È Spesso Imprecisa',
        readTime: '5 min di lettura',
        author: 'Ricerca Reti TestLine',
        summary:
          'Gli indirizzi IP non contengono coordinate GPS. Scopri come i database GeoIP associano i prefissi alle regioni.',
        keyTakeaways: [
          'La geolocalizzazione IP si basa su registri RIR e annunci BGP, non sul GPS.',
          'Le reti mobili instradano il traffico attraverso gateway centrali distanti.',
          'La precisione nazionale supera il 98%, mentre l’indirizzo civico è impossibile da ricavare dal solo IP.',
        ],
        sections: [
          {
            heading: 'Nessun GPS nei Pacchetti IP',
            paragraphs: [
              'I provider GeoIP stimano la città incrociando dati WHOIS e misurazioni di latenza.',
            ],
          },
          {
            heading: 'Perché gli IP Mobili Cambiano Città',
            paragraphs: [
              'Il traffico 4G/5G viene spesso concentrato in poche città snodo a centinaia di chilometri di distanza.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Discordanza di Fuso Orario & Routing ISP: Perché i Siti Sbagliano Regione',
        readTime: '4 min di lettura',
        author: 'Ricerca Reti TestLine',
        summary:
          'Perché i filtri antifrode confrontano il fuso orario del browser con quello dell’IP—e quando il routing legittimo genera falsi allarmi.',
        keyTakeaways: [
          'I sistemi di sicurezza confrontano il fuso Intl del browser con quello associato all’IP.',
          'Roaming mobile o instradamento interregionale possono causare differenze innocue.',
          'TestLine mostra entrambi i fusi orari per chiarire subito l’origine.',
        ],
        sections: [
          {
            heading: 'Il Controllo Browser vs. Fuso IP',
            paragraphs: [
              'Quando l’orologio di sistema indica un fuso diverso dal nodo di uscita IP, emerge un segnale di possibile VPN.',
            ],
          },
          {
            heading: 'Falsi Positivi su Mobile',
            paragraphs: [
              'Chi viaggia in roaming mantiene spesso un gateway IP del proprio paese di origine.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Come i Siti Rilevano una VPN, un Proxy o un IP Datacenter',
        readTime: '6 min di lettura',
        author: 'Desk Sicurezza TestLine',
        summary:
          'Curioso di sapere come banche e piattaforme riconoscono una VPN attiva? Ecco i quattro segnali tecnici usati.',
        keyTakeaways: [
          'Gli ASN distinguono immediatamente provider cloud (AWS, Hetzner, DigitalOcean) dagli ISP residenziali.',
          'Header come Via e X-Forwarded-For rivelano proxy trasparenti.',
          'Pattern PTR e fuso orario rafforzano la confidenza di rilevamento.',
        ],
        sections: [
          {
            heading: 'Classificazione ASN: Il Segnale Principale',
            paragraphs: [
              'Le VPN commerciali noleggiano server in ASN di hosting, rendendo immediato il riconoscimento come relay datacenter.',
            ],
          },
          {
            heading: 'Hostname PTR, Header e Comportamento',
            paragraphs: [
              'Combinando PTR, header proxy e fuso orario è possibile verificare se la VPN maschera efficacemente l’origine.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS Leak, IPv6 Leak & Split Tunneling: Testare la Tua VPN',
        readTime: '5 min di lettura',
        author: 'Desk Sicurezza TestLine',
        summary:
          'Anche con VPN attiva, query DNS non cifrate o traffico IPv6 fuori tunnel possono svelare la tua posizione reale.',
        keyTakeaways: [
          'Un IPv6 leak avviene quando la VPN incapsula solo IPv4 mentre l’ISP usa IPv6 diretto.',
          'Un DNS leak invia le risoluzioni di dominio al resolver locale dell’operatore.',
          'Verificare IPv4/IPv6 e DoH conferma la tenuta completa del tunnel.',
        ],
        sections: [
          {
            heading: 'La Trappola Dual-Stack IPv6',
            paragraphs: [
              'Sulle reti moderne con IPv6 nativo, client VPN datati possono lasciare uscire connessioni IPv6 fuori dal tunnel.',
            ],
          },
          {
            heading: 'Controllo Rapido del Tunnel',
            paragraphs: [
              'Dopo aver attivato la VPN, avvia TestLine per verificare che sia IPv4 sia IPv6 puntino al nodo di uscita VPN.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet Ripristinato',
    offlineMode: 'Modalità Offline — Connessione Assente',
    connectionActive: 'La connessione è nuovamente attiva',
    playWhileWaiting: 'Gioca a Signal Runner nell’attesa di riconnetterti',
    score: 'Punteggio',
    best: 'Record',
    muteAria: 'Disattiva audio gioco',
    unmuteAria: 'Attiva audio gioco',
    pauseAria: 'Metti in pausa',
    resumeAria: 'Riprendi gioco',
    returnToSpeedTest: 'Torna allo Speed Test',
    checking: 'Controllo...',
    checkConnection: 'Verifica Connessione',
    canvasAria: 'Area di gioco offline Signal Runner',
    title: 'Signal Runner',
    subtitle:
      'Salta torri, ostacoli e droni finché non torna la rete. Il doppio salto è attivo.',
    startGame: 'Inizia Gioco',
    tapHint: 'Tocca lo schermo o premi Spazio / Freccia Su per saltare',
    paused: 'Gioco in Pausa',
    resume: 'Riprendi',
    gameOver: 'Segnale Interrotto',
    cleared: 'Superati:',
    newBest: 'Nuovo Record!',
    playAgain: 'Gioca Ancora',
    backToSpeedTest: 'Torna allo Speed Test',
    jump: 'Salta',
    fastDrop: 'Discesa Rapida',
    desktopHintPrefix: 'Tastiera:',
    desktopJump: 'Salta',
    desktopDrop: 'Scendi',
    desktopPause: 'Pausa',
  },
  faq: {
    tableTitle: 'Riferimento Speed Test & Verifica IP',
    tableSubtitle:
      'TestLine di ECORZO LLC misura banda download/upload, latenza ping, jitter, indirizzi IPv4/IPv6, geolocalizzazione IP, velocità DNS e indicatori VPN o proxy.',
    readGuidesLink: 'Leggi 10 Guide su Rete e IP',
    colMetric: 'Metrica',
    colMethod: 'Metodo di Misura',
    colThreshold: 'Soglia Ottimale',
    colImpact: 'Impatto Principale',
    benchmarks: [
      {
        metric: 'Download (Mbps / MB/s)',
        method: '3 flussi HTTP paralleli da 25 MB (finestra 10s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Multiutente)',
        standardUse: 'Streaming, download, sync cloud',
      },
      {
        metric: 'Upload (Mbps / MB/s)',
        method: '2 flussi XHR POST paralleli da 10 MB',
        optimal: '10+ Mbps (Chiamate HD) · 25+ Mbps (Creator)',
        standardUse: 'Videochiamate, backup, dirette',
      },
      {
        metric: 'Ping & Latenza Libera',
        method: '5 sonde RTT sequenziali Cloudflare 0 byte',
        optimal: '< 30 ms (Basso) · 30–60 ms (Normale)',
        standardUse: 'Gaming online, VoIP, reattività web',
      },
      {
        metric: 'Jitter & Bufferbloat',
        method: 'Varianza media RTT tra sonde consecutive',
        optimal: '< 10 ms (Stabile) · > 25 ms (Congestionato)',
        standardUse: 'Stabilità audio/video sotto carico',
      },
      {
        metric: 'Latenza DoH DNS & PTR',
        method: 'Query cifrata 1.1.1.1 + DNS inverso PTR',
        optimal: '< 40 ms risoluzione DNS',
        standardUse: 'Velocità risoluzione domini & verifica ISP',
      },
      {
        metric: 'IP Dual-Stack, Geo & VPN',
        method: 'IPv4/IPv6 + ISP/ASN + Audit header/fuso',
        optimal: 'IP diretto ISP o nodo uscita VPN verificato',
        standardUse: 'Qual è il mio IP, posizione IP, controllo VPN',
      },
    ],
    faqTitle: 'Domande Frequenti',
    faqSubtitle:
      'Risposte dirette su speed test, verifica IP, geolocalizzazione, stato VPN e privacy',
    newsLink: 'Notizie Sicurezza & Reti',
    methodologyLink: 'Metodologia Completa',
    gdprLink: 'GDPR & Dati',
    items: [
      {
        question: 'Quanto è veloce la mia connessione in download e upload?',
        answer:
          'Premi Avvia Speed Test per misurare in tempo reale download e upload in Mbps o MB/s verso i server edge Cloudflare.',
      },
      {
        question: 'Qual è il mio indirizzo IPv4 e IPv6 pubblico?',
        answer:
          'Il probing dual-stack rileva sia IPv4 che IPv6 pubblici affiancati con copia in un clic, posizione approssimativa, ISP e ASN.',
      },
      {
        question: 'Quali sono buoni valori di ping, jitter e bufferbloat?',
        answer:
          'Ping sotto i 30 ms e jitter sotto i 10 ms assicurano videochiamate e gaming fluidi senza scatti.',
      },
      {
        question: 'Quanto è precisa la geolocalizzazione IP?',
        answer:
          'Associa il blocco IP alla città e al paese registrati dall’ISP: è precisa a livello regionale ma non rivela mai l’indirizzo civico.',
      },
      {
        question: 'Come rileva TestLine una VPN, proxy o IP datacenter?',
        answer:
          'Controlla header di inoltro HTTP, ASN di hosting/datacenter, hostname PTR e discrepanze di fuso orario.',
      },
      {
        question: 'Cos’è la latenza DNS-over-HTTPS (DoH) e la ricerca PTR?',
        answer:
          'La latenza DoH misura la rapidità di risoluzione tramite Cloudflare 1.1.1.1 cifrato, mentre PTR mostra l’hostname assegnato all’IP.',
      },
      {
        question: 'ECORZO LLC registra o conserva il mio IP o i risultati?',
        answer:
          'No. Le verifiche avvengono in memoria in modo effimero e la cronologia resta esclusivamente nello storage locale del browser.',
      },
      {
        question: 'Posso installare TestLine o giocare offline?',
        answer:
          'Sì, TestLine è una PWA installabile e avvia automaticamente Signal Runner quando perdi la connessione.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Torna allo Speed Test',
    effectiveDatePrefix: 'Data di Entrata in Vigore:',
    operatorLabel: 'Gestore: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Chi è TestLine',
      subtitle:
        'Sviluppato da ECORZO LLC per offrire speed test trasparenti e diagnostica IPv4/IPv6 pubblica in un’unica web app veloce e rispettosa della privacy.',
      sections: [
        {
          heading: 'Cosa Misura TestLine',
          paragraphs: [
            'TestLine è uno strumento gratuito gestito da ECORZO LLC per testare banda, latenza, geolocalizzazione IP e stato VPN direttamente dal browser senza registrazione.',
          ],
          bullets: [
            {
              strong: 'Velocità Download & Upload (Mbps / MB/s):',
              text: 'Esegue flussi HTTP paralleli verso i nodi edge Cloudflare.',
            },
            {
              strong: 'Ping, Jitter & Salute Latenza:',
              text: 'Misura sonde RTT sequenziali per ping medio, minimo e jitter.',
            },
            {
              strong: 'IPv4/IPv6, Posizione, ISP & ASN:',
              text: 'Mostra indirizzi pubblici, posizione approssimativa, ISP, ASN, PTR e latenza DoH.',
            },
            {
              strong: 'Rilevamento VPN, Proxy & Datacenter:',
              text: 'Analizza header HTTP, ASN datacenter, PTR e allineamento del fuso orario.',
            },
          ],
        },
      ],
      closingTitle: 'Guide, Notizie Live e Dettagli Aziendali',
      closingIntro: 'Esplora le nostre',
      closingGuidesLink: '10 Guide su Velocità, IP e VPN',
      closingMid: 'oppure leggi le notizie live nel',
      closingNewsLink: 'Feed RSS Notizie TestLine',
      closingOutro:
        '. TestLine è gestito da ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA. Visita la nostra',
      closingContactLink: 'Pagina Contatti',
    },
    contact: {
      title: 'Contatta ECORZO LLC',
      subtitle:
        'Contatta il nostro team per supporto TestLine, richieste sulla privacy, GDPR o conformità legale.',
      telephone: 'Telefono',
      addressLabel: 'Sede Legale Registrata',
      copy: 'Copia',
      copied: 'Copiato',
      formHeading: 'Invia una Richiesta',
      sentTitle: 'Richiesta Preparata',
      sentBodyPrefix:
        'Grazie, {name}. I dettagli del messaggio sono stati registrati. Per questioni urgenti o GDPR chiama il numero +1 646 427 6802 o scrivi a ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Invia un’altra richiesta',
      nameLabel: 'Nome Completo',
      namePlaceholder: 'Mario Rossi',
      emailLabel: 'Indirizzo Email',
      emailPlaceholder: 'tu@esempio.com',
      messageLabel: 'Messaggio',
      messagePlaceholder: 'Come può aiutarti ECORZO LLC?',
      submitBtn: 'Invia Messaggio',
      errMissing: 'Inserisci nome, indirizzo email e messaggio.',
      errInvalidEmail: 'Inserisci un indirizzo email valido.',
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle:
        'Come TestLine di ECORZO LLC tratta e protegge i dati diagnostici in conformità al GDPR e alle policy Google.',
      sections: [
        {
          heading: '1. Titolare del Trattamento',
          paragraphs: [
            'Il Titolare del Trattamento è ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel: +1 646 427 6802), conforme al GDPR UE/UK e CCPA/CPRA.',
          ],
        },
        {
          heading: '2. Dati Trattati Durante la Diagnostica',
          bullets: [
            {
              strong: 'Telemetria di Rete & IP:',
              text: 'IPv4/IPv6, ISP, ASN, città/paese approssimativi, PTR e header HTTP vengono elaborati in modo effimero solo in memoria.',
            },
            {
              strong: 'Misurazioni di Velocità:',
              text: 'I risultati restano salvati esclusivamente nel localStorage del browser (testline_history_v1).',
            },
            {
              strong: 'Preferenze Browser:',
              text: 'Tema (testline_theme), lingua e consenso cookie (testline_cookie_consent) sono salvati localmente.',
            },
          ],
        },
        {
          heading: '3. Servizi di Terze Parti & Google',
          paragraphs: [
            'Per eseguire test live il browser comunica con Cloudflare, IPWhois, GeoJS e Ipify. I servizi Google operano secondo:',
          ],
        },
        {
          heading: '4. Nessuna Vendita di Dati & Conservazione',
          paragraphs: [
            'ECORZO LLC non vende né cede indirizzi IP. I report PDF vengono generati esclusivamente nel tuo browser.',
          ],
        },
      ],
      googlePolicyLinkText:
        'Come Google utilizza le informazioni dai siti o app che usano i nostri servizi',
      rightsPrefix:
        'Hai diritto di accesso, rettifica, cancellazione e revoca del consenso. Consulta la nostra',
      gdprLinkText: 'Politica GDPR e Raccolta Dati',
      rightsSuffix:
        'o contatta ECORZO LLC al +1 646 427 6802 o 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Disclaimer',
      subtitle:
        'Limitazioni importanti riguardanti test di velocità, geolocalizzazione IP e segnali VPN/proxy.',
      sections: [
        {
          heading: '1. Solo Scopo Informativo',
          paragraphs: [
            'TestLine è fornito "così com’è" per diagnostica informativa e non costituisce certificazione legale del servizio ISP.',
          ],
        },
        {
          heading: '2. Variabili che Influenzano i Risultati',
          paragraphs: [
            'I valori variano per segnale Wi-Fi, hardware del router, cifratura VPN e congestione della rete.',
          ],
        },
        {
          heading: '3. Precisione Geolocalizzazione & Proxy',
          paragraphs: [
            'La posizione indica la registrazione del blocco IP, non l’indirizzo civico; i flag VPN sono euristici.',
          ],
        },
        {
          heading: '4. Limitazione di Responsabilità',
          paragraphs: [
            'Nei limiti consentiti dalla legge, ECORZO LLC esclude responsabilità per danni derivanti dall’uso delle misure o dei PDF esportati.',
          ],
        },
      ],
    },
    terms: {
      title: 'Termini e Condizioni',
      subtitle: 'Regole d’uso per l’accesso a TestLine di ECORZO LLC.',
      sections: [
        {
          heading: '1. Accettazione dei Termini',
          paragraphs: [
            'Utilizzando TestLine accetti i presenti Termini e Condizioni e tutte le normative applicabili.',
          ],
        },
        {
          heading: '2. Uso Consentito e Vietato',
          bullets: [
            { text: 'È consentito usare TestLine per diagnostica personale o aziendale ed esportare PDF.' },
            { text: 'È vietato usare bot automatici, script di stress test o scraper ad alta frequenza.' },
            { text: 'È vietato aggirare i limiti di richieste o presentare i report come certificati ufficiali.' },
          ],
        },
        {
          heading: '3. Proprietà Intellettuale',
          paragraphs: [
            'Il marchio TestLine, il design e il codice sorgente appartengono a ECORZO LLC.',
          ],
        },
        {
          heading: '4. Legge Applicabile',
          paragraphs: [
            'I presenti Termini sono regolati dalle leggi dello Stato di New York e degli Stati Uniti.',
          ],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookie Policy',
      subtitle: 'Elenco dettagliato di cookie e chiavi localStorage utilizzate da TestLine.',
      sec1Title: '1. Cosa Sono Cookie e Local Storage?',
      sec1Body:
        'I cookie sono file di testo e il localStorage salva le preferenze localmente sul dispositivo senza inviare dati superflui.',
      sec2Title: '2. Chiavi Utilizzate da TestLine',
      colKey: 'Chiave / Identificatore',
      colCategory: 'Categoria',
      colPurpose: 'Scopo',
      rows: [
        {
          key: 'testline_theme',
          category: 'Preferenza Essenziale',
          purpose: 'Ricorda la selezione tema Chiaro o Scuro.',
        },
        {
          key: 'testline_unit_v1',
          category: 'Preferenza Essenziale',
          purpose: 'Salva l’unità di misura scelta (Auto, Mbps o MB/s).',
        },
        {
          key: 'testline_history_v1',
          category: 'Funzionale Locale',
          purpose: 'Conserva fino a 15 test recenti nel browser.',
        },
        {
          key: 'testline_cookie_consent',
          category: 'Consenso Essenziale',
          purpose: 'Registra la preferenza per Google Consent Mode v2.',
        },
      ],
      sec3Title: '3. Informative Terze Parti & Google',
      sec3Prefix:
        'Secondo Google Consent Mode v2, analisi e annunci restano negati fino al consenso esplicito. Venditori autorizzati su',
      sec3Mid: '. Puoi modificare il consenso su',
      cookiesNoticeLinkText: 'Avviso Cookie',
      sec3OrVia: 'o su',
      googleAdSettingsText: 'Impostazioni Annunci Google',
    },
    cookiesNotice: {
      title: 'Avviso Cookie & Preferenze di Consenso',
      subtitle: 'Gestisci il consenso per cookie e archiviazione locale su TestLine di ECORZO LLC.',
      sec1Title: 'Avviso ai Visitatori (SEE, Regno Unito, Svizzera e Globale)',
      sec1Body:
        'TestLine usa storage strettamente necessario per tema, unità, cronologia locale e scelte di consenso. Analisi e annunci restano disattivati fino al tuo consenso.',
      activeTitle: 'Selezione Consenso Attiva',
      currentSettingLabel: 'Impostazione attuale:',
      statusAll: 'Tutto Consentito (Consent Mode Analisi & Annunci)',
      statusEssential: 'Solo Strettamente Essenziali',
      statusUnset: 'Non Ancora Selezionato (Non Essenziali Negati di Default)',
      savedBadge: 'Preferenze Salvate',
      acceptAllBtn: 'Accetta Tutto lo Storage Funzionale',
      essentialOnlyBtn: 'Solo Strettamente Essenziali',
      sec2Title: 'Controlli dal Browser',
      sec2Body:
        'Puoi bloccare o cancellare i cookie direttamente dalle impostazioni del tuo browser (Chrome, Safari, Firefox, Edge).',
    },
    gdpr: {
      title: 'GDPR & Politica di Raccolta Dati',
      subtitle: 'Basi giuridiche, minimizzazione e diritti secondo il GDPR e le norme Google.',
      sections: [
        {
          heading: '1. Identità del Titolare',
          paragraphs: [
            'Il Titolare è ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Tel: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Basi Giuridiche (Articolo 6 GDPR)',
          bullets: [
            {
              strong: 'Servizio Richiesto (Art. 6(1)(b)):',
              text: 'L’elaborazione dell’IP e dei flussi di banda è necessaria per erogare il servizio richiesto.',
            },
            {
              strong: 'Legittimo Interesse (Art. 6(1)(f)):',
              text: 'Protezione da abusi, DDoS e stabilità della rete.',
            },
            {
              strong: 'Consenso Esplicito (Art. 6(1)(a)):',
              text: 'Eventuali cookie non essenziali vengono attivati solo previo consenso.',
            },
          ],
        },
        {
          heading: '3. Minimizzazione e Conservazione',
          paragraphs: [
            'Nessun account o password richiesta; le verifiche IP avvengono in memoria senza profilazione.',
          ],
        },
        {
          heading: '4. Trasferimenti Internazionali',
          paragraphs: [
            'Le misurazioni raggiungono i nodi più vicini Cloudflare o Google Cloud protetti da Clausole Contrattuali Standard (SCC).',
          ],
        },
        {
          heading: '5. Diritti dell’Interessato',
          bullets: [
            { strong: 'Accesso e Portabilità:', text: 'Ottenere conferma e copia dei dati.' },
            { strong: 'Rettifica e Cancellazione:', text: 'Richiedere correzione o oblio.' },
            { strong: 'Opposizione e Revoca:', text: 'Opporsi o revocare il consenso in ogni momento.' },
            { strong: 'Reclamo:', text: 'Presentare reclamo all’autorità Garante locale.' },
          ],
        },
        {
          heading: '6. Minori',
          paragraphs: [
            'TestLine non raccoglie intenzionalmente dati di minori di 13 anni (o 16 nel SEE). Contatto: +1 646 427 6802.',
          ],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'Report Velocità e Rete TestLine',
    generated: 'Generato il',
    unit: 'Unità',
    secondCopyBanner: 'SECONDA COPIA  —  Download Duplicato del Report',
    sec1Title: '1. Riepilogo Speed Test',
    downloadSpeed: 'Velocità Download',
    uploadSpeed: 'Velocità Upload',
    avgPing: 'Ping Medio',
    jitter: 'Jitter',
    peak: 'Picco',
    sustained: 'Flusso continuo',
    min: 'Min',
    probes: 'sonde',
    rttProbes: 'sonde RTT',
    sec2Title: '2. Rilevamento Proxy & VPN',
    directClean: 'Connessione Diretta — Nessun segnale proxy o VPN rilevato',
    sec3Title: '3. Diagnostica Rete, IP & DNS',
    sec4Title: '4. Esecuzioni Recenti della Sessione',
    confidenceWord: 'affidabilità',
    pageOf: 'Pagina {p} di {total}',
    secondCopyShort: 'Seconda Copia',
    rowPrimaryIp: 'IP Pubblico Principale',
    rowIpv4: 'Indirizzo IPv4',
    rowIpv6: 'Indirizzo IPv6',
    rowIsp: 'ISP / Operatore',
    rowAsn: 'Sistema Autonomo (ASN)',
    rowLocation: 'Posizione Approssimativa',
    rowTimezone: 'Fuso Orario',
    rowPtr: 'DNS Inverso (PTR)',
    rowDoh: 'Sonda Resolver DoH',
    rowProtocol: 'Protocollo di Trasporto',
    rowLinkHint: 'Indicatore Link Browser',
    notDetected: 'Non rilevato',
    noPtr: 'Nessun record PTR pubblicato',
    reachable: 'Raggiungibile',
    unreachable: 'Irraggiungibile',
    notExposed: 'Non esposto dal browser',
    available: 'Disponibile',
    colTime: 'Ora',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'IP Pubblico',
  },
};
