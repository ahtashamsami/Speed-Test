import type { TranslationPack } from '../types';

export const roPack: TranslationPack = {
  meta: {
    lang: 'ro',
    intlLocale: 'ro-RO',
    dir: 'ltr',
    nativeName: 'Română',
  },
  seo: {
    home: {
      title: 'TestLine — Test de viteză internet & Verificare IP public',
      description:
        'Testează viteza de download și upload, ping-ul și jitter-ul, și verifică adresa ta publică IPv4/IPv6, locația ISP, latența DNS și statusul VPN.',
      keywords:
        'test viteza internet, care este ip-ul meu, adresa ip publica, viteza download, viteza upload, test ping, jitter, ipv4, ipv6, verificare vpn',
      breadcrumbLabel: 'Test viteză',
    },
    news: {
      title: 'Știri Securitate Cibernetică, Rețele & Tech | TestLine',
      description:
        'Citește fluxuri RSS live despre securitate cibernetică, internet, DNS, BGP și tehnologie de la Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch și Ars Technica.',
      keywords: 'stiri securitate cibernetica, stiri retelistica rss, stiri tech',
      breadcrumbLabel: 'Știri',
    },
    blog: {
      title: 'Ghiduri Viteză Internet, Adrese IP & VPN | TestLine',
      description:
        'Explorează 10 ghiduri de specialitate despre viteza internetului, Mbps vs MB/s, IPv4 & IPv6, fraude IP, geolocalizare, bufferbloat și detecția VPN.',
      keywords: 'ghid viteza internet, mbps vs mbs, ping si jitter, ipv4 vs ipv6, cgnat, fraude ip',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'Despre TestLine — Test de viteză & Diagnostic IP',
      description:
        'Află cum măsoară TestLine de la ECORZO LLC viteza de download/upload, ping, jitter, rutarea dual-stack IPv4/IPv6, latența DNS DoH și semnalele VPN.',
      keywords: 'despre testline, ecorzo llc, metodologie test viteza, diagnostic ip',
      breadcrumbLabel: 'Despre noi',
    },
    privacy: {
      title: 'Politica de Confidențialitate — TestLine',
      description:
        'Citește Politica de Confidențialitate TestLine de la ECORZO LLC privind procesarea efemeră a IP-ului, zero stocare de loguri, GDPR și cookies.',
      keywords: 'politica confidentialitate testline, ecorzo llc, gdpr test viteza',
      breadcrumbLabel: 'Confidențialitate',
    },
    contact: {
      title: 'Contact TestLine & ECORZO LLC — Suport Rețea',
      description:
        'Contactează ECORZO LLC pentru întrebări privind testul de viteză TestLine, adresa IP, confidențialitate sau GDPR la +1 646 427 6802.',
      keywords: 'contact testline, ecorzo llc new york, suport retea',
      breadcrumbLabel: 'Contact',
    },
    disclaimer: {
      title: 'Declinare de Responsabilitate — TestLine',
      description:
        'Înțelege variabilele testelor de viteză, limitările Wi-Fi, acuratețea geolocalizării IP și detecția VPN/proxy pe TestLine.',
      keywords: 'declinare responsabilitate test viteza, acuratete geolocalizare ip',
      breadcrumbLabel: 'Disclaimer',
    },
    terms: {
      title: 'Termeni și Condiții — TestLine de la ECORZO LLC',
      description:
        'Consultă Termenii și Condițiile care guvernează utilizarea testului de viteză și a diagnosticului IP TestLine operat de ECORZO LLC.',
      keywords: 'termeni si conditii testline, ecorzo llc',
      breadcrumbLabel: 'Termeni',
    },
    'cookies-policy': {
      title: 'Politica de Cookies & Stocare Locală — TestLine',
      description:
        'Verifică cheile exacte de stocare locală în browser și informațiile despre cookie-uri utilizate de TestLine conform GDPR.',
      keywords: 'politica cookies testline, localstorage, google consent mode v2',
      breadcrumbLabel: 'Politica Cookies',
    },
    'cookies-notice': {
      title: 'Notificare Cookies & Preferințe Consimțământ — TestLine',
      description:
        'Gestionează oricând preferințele tale de consimțământ pentru cookie-uri și stocare locală pe TestLine.',
      keywords: 'notificare cookies, preferinte confidentialitate testline',
      breadcrumbLabel: 'Setări Cookies',
    },
    gdpr: {
      title: 'Politica GDPR & Colectarea Datelor — TestLine',
      description:
        'Consultă temeiurile legale ECORZO LLC conform Articolului 6 GDPR, minimizarea datelor, transferurile internaționale și drepturile tale.',
      keywords: 'politica gdpr testline, protectia datelor ecorzo llc',
      breadcrumbLabel: 'GDPR & Date',
    },
  },
  nav: {
    speedTest: 'Test Viteză',
    news: 'Știri',
    blog: 'Blog',
    about: 'Despre noi',
    contact: 'Contact',
    privacy: 'Confidențialitate',
    stopTest: 'Oprește testul',
    newBadgeSuffix: 'noi',
    homeAria: 'Acasă TestLine',
    primaryNavAria: 'Navigare principală',
    mobileNavAria: 'Navigare mobilă',
    companyMenuAria: 'Meniu TestLine: Despre noi, Contact și Confidențialitate',
  },
  pwa: {
    installApp: 'Instalează aplicația',
    installAria: 'Instalează aplicația TestLine',
    installIosAria: 'Instalează TestLine pe iPhone sau iPad',
    iosTitle: 'Instalează TestLine pe iPhone / iPad',
    closeDialog: 'Închide fereastra',
    iosStep1Prefix: 'Apasă butonul',
    iosStep1Strong: 'Partajare',
    iosStep1Suffix: 'din bara Safari.',
    iosStep2Prefix: 'Derulează în jos și apasă',
    iosStep2Strong: 'Adaugă pe ecranul principal',
    iosStep2Suffix: '.',
    iosStep3:
      'Deschide TestLine oricând — chiar și offline, jocul Signal Runner pornește automat.',
    gotIt: 'Am înțeles',
  },
  hero: {
    title: 'Test Viteză Internet & Verificare IP Public',
    subtitle:
      'Verifică viteza de download și upload, ping-ul și jitter-ul — plus adresa ta IPv4/IPv6, locația ISP, latența DNS și statusul VPN.',
    speedUnitAria: 'Unitate de viteză',
    autoTooltip: 'Folosește automat Mbps sub 100 Mbps și MB/s de la 100 Mbps în sus',
    auto: 'Auto',
    lightMode: 'Mod luminos',
    darkMode: 'Mod întunecat',
    switchToLight: 'Comută la modul luminos',
    switchToDark: 'Comută la modul întunecat',
    exportPdf: 'Exportă PDF',
    exportingPdf: 'Se exportă...',
    exportDisabledTitle: 'Pornește mai întâi un test de viteză pentru a exporta raportul PDF',
    exportEnabledTitle: 'Exportă raportul PDF cu viteza și diagnosticul de rețea',
  },
  duplicateModal: {
    title: 'Raport deja descărcat',
    closeDialog: 'Închide fereastra',
    body: 'Ai descărcat deja raportul pentru acest test. Dorești să îl descarci din nou?',
    notePrefix: 'Copiile re-exportate sunt marcate clar cu',
    secondCopy: 'A doua copie',
    noteSuffix: 'pe document.',
    cancel: 'Nu, anulează',
    confirm: 'Da, descarcă din nou',
  },
  speedStage: {
    startSpeedTest: 'Pornește testul',
    yourSpeedIs: 'Viteza ta de internet este',
    stopAria: 'Oprește testul de viteză',
    startAria: 'Pornește testul de viteză',
    retry: 'Reîncearcă',
    statusIdle: 'Apasă Redare pentru a începe testul',
    statusPing: 'Se măsoară ping și jitter...',
    statusDownload: 'Se testează viteza de download...',
    statusUpload: 'Se testează viteza de upload...',
    statusComplete: 'Test de viteză finalizat',
    statusStopped: 'Test oprit',
    statusError: 'Test întrerupt',
    uploadSpeed: 'Viteză Upload',
    peakPrefix: 'Vârf',
    twoStreams: '2 fluxuri paralele',
    latencyAvgPing: 'Latență (Ping mediu)',
    minPrefix: 'Min',
    probesSuffix: 'sonde',
    fiveProbes: '5 sonde RTT Cloudflare',
    jitter: 'Jitter',
    consecutiveVariance: 'Variația RTT consecutivă',
    waitingRtt: 'Se așteaptă probele RTT',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Notificare detecție Proxy sau VPN',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy detectat',
      'Datacenter / Relay Network': 'Centru de date / Rețea releu',
      'Timezone Mismatch (Possible VPN)': 'Neconcordanță fus orar (Posibil VPN)',
      'Direct Connection': 'Conexiune directă',
    },
    confidence: {
      High: 'Ridicată',
      Moderate: 'Moderată',
      Low: 'Scăzută',
    },
    confidenceWord: 'încredere',
    signalSingular: 'semnal',
    signalPlural: 'semnale',
    noticeDesc:
      'Conexiunea ta prezintă caracteristici de proxy, VPN sau releu de centru de date. Măsurătorile reflectă tunelul activ sau nodul de ieșire.',
    observedExitIp: 'IP de ieșire observat',
    relayOperator: 'Operator releu / rețea',
    exitLocationTz: 'Locație ieșire & fus orar',
    detectedIndicators: 'Indicatori detectați',
    unavailable: 'Indisponibil',
    signalTemplates: {
      proxy_flag: 'Adresa IP este marcată ca nod activ proxy, VPN sau Tor',
      hosting_flag:
        'Traficul provine dintr-un ASN de centru de date sau găzduire, nu de la un ISP rezidențial',
      provider_keyword: 'Operatorul de rețea / PTR corespunde cuvântului cheie ({1})',
      via_header: 'Antet de redirecționare proxy detectat ({1})',
      multi_hop: 'Multiple salturi de redirecționare observate ({1} salturi)',
      ip_mismatch: 'IP-ul direct al browserului diferă de IP-ul văzut la marginea rețelei (split-tunnel sau proxy)',
      timezone_mismatch:
        'Fusul orar al browserului ({1}) diferă de fusul orar al geolocalizării IP ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Adresă IP Publică',
    resolvingRoute: 'Se rezolvă ruta',
    routeSuffix: 'rută',
    updatedPrefix: 'Actualizat',
    unavailable: 'Indisponibil',
    metadataUnavailable: 'Metadatele rețelei sunt indisponibile',
    copyIp: 'Copiază IP',
    copiedIp: 'IP copiat',
    refresh: 'Reîmprospătează',
    ipv46CardTitle: 'IPv4, IPv6 & Rutare Operator',
    ipv46CardSubtitle: 'Sonde client dual-stack combinate cu geolocalizarea IP',
    ipv4Label: 'Adresă IPv4',
    ipv6Label: 'Adresă IPv6',
    notDetected: 'Nedetectat',
    ipv6NotDetected: 'Nedetectat (doar rută IPv4)',
    ispLabel: 'Furnizor internet (ISP)',
    asnLabel: 'Sistem Autonom (ASN)',
    locationLabel: 'Locație aproximativă',
    proxyCheckLabel: 'Verificare Proxy / VPN',
    resolving: 'Se rezolvă...',
    inspecting: 'Se inspectează...',
    directConnectionNone: 'Conexiune directă (Nimic detectat)',
    dnsCardTitle: 'Indicii DNS & Diagnostic Legătură',
    dnsCardSubtitle: 'Înregistrare PTR inversă, accesibilitate DoH și semnale browser',
    ptrLabel: 'DNS Invers (PTR)',
    noPtr: 'Nicio înregistrare PTR publicată',
    dohProbeLabel: 'Sondă Resolver DoH',
    probing: 'Se sondează...',
    reachable: 'Accesibil',
    blockedOrUnreachable: 'Blocat sau inaccesibil',
    dnsLatencyLabel: 'Latență interogare DNS',
    protocolLabel: 'Protocol transport',
    checking: 'Se verifică...',
    linkHintLabel: 'Indiciu conexiune browser',
    exposedNoMetrics: 'Expus fără metrici',
    notExposed: 'Neexpus de browser',
    timezoneLabel: 'Fus orar',
    copy: 'Copiază',
    copied: 'Copiat',
    capSuffix: 'Mbps limită',
    rttSuffix: 'ms RTT',
    fetchError: 'Nu se pot accesa punctele de diagnostic IP.',
  },
  history: {
    title: 'Istoric Sesiune',
    subtitle: 'Măsurători recente salvate local în browserul tău',
    clearHistory: 'Șterge istoricul',
    emptyText: 'Testele finalizate vor apărea aici pentru a putea compara rezultatele.',
    colTime: 'Ora',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'IP Public',
  },
  consent: {
    title: 'Notificare Cookies & Confidențialitate',
    description:
      'TestLine folosește stocare locală esențială pentru temă, unități și istoric. Cookie-urile opționale de analiză și publicitate rămân dezactivate dacă nu accepți.',
    acceptAll: 'Acceptă toate',
    essentialOnly: 'Doar esențiale',
    cookieSettings: 'Setări Cookies',
  },
  footer: {
    byEcorzo: 'de ECORZO LLC',
    tagline:
      'Test de viteză internet în timp real și diagnostic de rețea IP dual-stack operat de ECORZO LLC.',
    companyHeading: 'Companie',
    legalHeading: 'Legal & Conformitate',
    disclaimer: 'Disclaimer',
    terms: 'Termeni și Condiții',
    cookiesPolicy: 'Politica Cookies',
    cookiesNotice: 'Notificare Cookies',
    gdpr: 'GDPR & Politica de Date',
    privacy: 'Politica de Confidențialitate',
    copyrightSuffix: 'ECORZO LLC. Toate drepturile rezervate.',
    poweredBy:
      'Măsurători prin nodurile Cloudflare · Conform GDPR și politicilor Google',
    languageLabel: 'Limbă',
    autoOption: 'Auto (Regiune)',
  },
  news: {
    eyebrow: 'Agregator RSS Live Securitate Cibernetică & Tech',
    updatedPrefix: 'Actualizat',
    title: 'Știri Rețele, Securitate & Tehnologie',
    filterPlaceholder: 'Filtrează titlurile...',
    filterAria: 'Filtrează titlurile de știri',
    refreshFeeds: 'Reîncarcă fluxurile',
    refreshing: 'Se reîncarcă...',
    cachedBannerPrefix:
      'Fluxurile RSS live nu sunt disponibile momentan. Se afișează știrile salvate recent în cache pe acest dispozitiv',
    retryLive: 'Reîncearcă fluxul live',
    retrying: 'Se reîncearcă...',
    allSources: 'Toate sursele',
    errorFallback:
      'Nu se pot încărca fluxurile RSS live acum. Verifică conexiunea și reîmprospătează.',
    tryAgain: 'Încearcă din nou',
    emptyText: 'Nu s-au găsit articole potrivite în fluxurile RSS curente.',
    showAll: 'Arată toate fluxurile',
    newTag: 'Nou',
    readFullStory: 'Citește articolul complet',
    recent: 'Recent',
    minutesAgo: 'acum {n}m',
    hoursAgo: 'acum {n}h',
  },
  blog: {
    eyebrow: 'Ghiduri TestLine & Rezumatul Zilnic al Știrilor',
    articlesCountSuffix: 'Articole',
    title: 'Viteză Internet, Diagnostic IP & Buletine Zilnice',
    subtitle:
      'Ghiduri detaliate despre viteza internetului, IPv4/IPv6, fraude IP, locație IP și detecție VPN — plus 2 știri fierbinți zilnice selectate automat din fluxurile noastre RSS.',
    searchPlaceholder: 'Caută în {n} articole...',
    searchAria: 'Caută articole pe blog',
    allLabel: 'Toate',
    hotNewsLabel: 'Știri de top',
    dailyHotNewsBadge: 'Știrea zilei',
    emptyText: 'Niciun articol nu corespunde filtrului curent.',
    resetFilters: 'Resetează filtrele',
    newTag: 'Nou',
    readArticle: 'Citește articolul',
    backToAllPrefix: 'Înapoi la toate cele',
    backToAllSuffix: 'articole',
    originalSourcePrefix: 'Sursa originală',
    testConnectionNow: 'Testează conexiunea acum',
    keyTakeaways: 'Idei principale',
    dailyReadTime: '3 min lectură',
    dailyAuthorPrefix: 'TestLine Rezumat Zilnic · via',
    dailyTakeawayFeatured: 'Inclus în buletinul zilnic TestLine ({source}) la secțiunea {topic}.',
    dailyTakeawaySummaryPrefix: 'Rezumat principal:',
    dailyTakeawayTip:
      'Verifică întotdeauna adresa IPv4/IPv6 activă, latența DNS și statusul VPN/proxy înainte de a investiga alerte neașteptate de conexiune.',
    dailySectionBriefingPrefix: 'Buletin zilnic:',
    dailyBriefingPara2:
      'Selectat automat pentru rezumatul TestLine din {date} pe baza actualității și impactului în securitate cibernetică. Poți accesa sursa tehnică originală folosind linkul de mai sus.',
    dailySectionActionTitle: 'Diagnostic de Rețea & Acțiune Practică',
    dailyActionPara1:
      'Evenimentele legate de {topic} afectează adesea resolverele DNS ale operatorilor, tabelele de rutare și gateway-urile VPN. Un test rapid de viteză și o verificare dual-stack confirmă imediat dacă conexiunea ta are jitter crescut sau schimbări de releu.',
    dailyActionPara2:
      'Rămâi informat cu privire la vulnerabilitățile noi urmărind secțiunea Știri și ghidurile permanente din Blog.',
    categories: {
      'Hot News': 'Știri de top',
      'Internet Speed': 'Viteză Internet',
      'IP Addresses': 'Adrese IP',
      'IP Scams': 'Fraude IP',
      'IP Location': 'Locație IP',
      'VPN IP Status': 'Status IP VPN',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'De ce viteza reală de descărcare diferă de abonamentul tău',
        readTime: '5 min lectură',
        author: 'Inginerie TestLine',
        summary:
          'Află de ce un abonament de 500 Mbps descarcă fișiere cu 50–60 MB/s, cum influențează overhead-ul TCP/TLS și de ce fluxurile paralele sunt mai exacte.',
        keyTakeaways: [
          'Furnizorii promovează viteze în megabiți pe secundă (Mbps), iar browserele afișează megabytes pe secundă (MB/s) într-un raport 8:1.',
          'Distanța Wi-Fi, aglomerația pe 2,4 GHz și routerele vechi limitează fibra gigabit înainte de rețeaua ISP.',
          'Fluxurile HTTP paralele măsoară lățimea de bandă reală mult mai precis decât o singură descărcare.',
        ],
        sections: [
          {
            heading: 'Megabiți (Mbps) vs. Megabytes (MB/s)',
            paragraphs: [
              'Cea mai mare confuzie la testele de viteză este diferența dintre biți și octeți. Deoarece 1 byte are 8 biți, o conexiune de 400 Mbps are un maxim teoretic de 50 MB/s.',
              'După scăderea antetelor Ethernet, IP și a criptării TLS, viteza utilă ajunge de regulă la 90–94% din rata abonamentului.',
            ],
          },
          {
            heading: 'De ce contează testele cu fluxuri multiple',
            paragraphs: [
              'O singură conexiune TCP poate fi limitată de fereastra de congestie și latență. Trei fluxuri paralele saturează curat legătura.',
              'Dacă observi diferențe mari între Wi-Fi și cablu, testează aproape de routerul 5/6 GHz sau printr-un cablu Cat6.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter explicat: Ce strică apelurile video și jocurile online',
        readTime: '5 min lectură',
        author: 'Inginerie TestLine',
        summary:
          'Viteza mare de download nu salvează un apel Zoom sau un joc dacă latența oscilează neuniform. Vezi cum afectează ping-ul, jitter-ul și bufferbloat-ul.',
        keyTakeaways: [
          'Ping-ul măsoară timpul mediu dus-întors (RTT) în milisecunde; sub 30 ms pare instantaneu.',
          'Jitter-ul măsoară variația între pachete — peste 20–25 ms produce întreruperi audio.',
          'Upload-urile mari în timpul apelurilor provoacă bufferbloat fără SQM/QoS pe router.',
        ],
        sections: [
          {
            heading: 'Latența este reactivitatea dus-întors',
            paragraphs: [
              'Lățimea de bandă arată cât de lată este autostrada, iar ping-ul arată cât de repede călătorește un pachet. Streamingul 4K are buffer, dar apelurile simt fiecare milisecundă.',
            ],
          },
          {
            heading: 'De ce jitter-ul întrerupe vocea',
            paragraphs: [
              'Dacă cinci măsurători dau 14, 16, 92, 15 și 68 ms, media pare bună, dar codecurile audio trebuie să arunce cadre.',
              'Activarea Smart Queue Management (SQM) împiedică backup-urile să sufoce apelurile video.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6 explicat: De ce contează rețelele dual-stack astăzi',
        readTime: '6 min lectură',
        author: 'Cercetare Rețele TestLine',
        summary:
          'Cu adresele IPv4 epuizate și operatorii mobili pe CGNAT, înțelegerea rutării IPv4 și IPv6 devine esențială.',
        keyTakeaways: [
          'IPv4 folosește adrese pe 32 de biți (~4,3 miliarde), forțând operatorii să partajeze adrese prin CGNAT.',
          'IPv6 folosește adrese hexazecimale pe 128 de biți, restabilind rutarea directă fără NAT multiplu.',
          'Testarea dual-stack verifică dacă deții simultan rute IPv4 și IPv6.',
        ],
        sections: [
          {
            heading: 'Realitatea epuizării IPv4 și CGNAT',
            paragraphs: [
              'Deoarece blocurile IPv4 s-au terminat, mulți furnizori pun clienții în spatele CGNAT, unde zeci de locuințe împart un singur IPv4 public.',
            ],
          },
          {
            heading: 'Cum îmbunătățește dual-stack viteza',
            paragraphs: [
              'Sistemele moderne preferă IPv6 prin Happy Eyeballs, evitând tabelele suplimentare CGNAT și blocările provocate de alți utilizatori.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'IP Public vs. IP Privat & Cum identifică DNS-ul Invers (PTR) operatorii',
        readTime: '4 min lectură',
        author: 'Cercetare Rețele TestLine',
        summary:
          'De ce telefonul arată 192.168.1.45 pe Wi-Fi în timp ce site-urile văd un IP public diferit — și ce dezvăluie PTR despre ISP.',
        keyTakeaways: [
          'Intervalele private RFC 1918 (10.x, 172.16–31.x, 192.168.x) există doar în rețeaua locală.',
          'Routerul înlocuiește adresa privată cu IP-ul public folosind NAT.',
          'DNS-ul invers (PTR) asociază IP-ul public cu un nume de gazdă ce indică regiunea și tipul liniei.',
        ],
        sections: [
          {
            heading: 'În interiorul routerului vs. pe internetul public',
            paragraphs: [
              'Adresa internă 192.168.1.24 nu este rutabilă pe internet. Când traficul iese din router, NAT pune IP-ul tău WAN public.',
            ],
          },
          {
            heading: 'Citirea indiciilor din DNS invers (PTR)',
            paragraphs: [
              'Furnizorii publică nume PTR descriptive pe care sistemele de diagnostic le analizează alături de ASN.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Cum recunoști alertele false „IP-ul tău a fost spart” și escrocheriile',
        readTime: '5 min lectură',
        author: 'Securitate TestLine',
        summary:
          'Ferestrele false îți afișează IP-ul și orașul real ca să provoace panică. Află de ce orice site vede IP-ul tău automat.',
        keyTakeaways: [
          'Orice site vizitat primește automat IP-ul tău public prin rutarea HTTP standard — afișarea lui nu dovedește un atac.',
          'Alertele false de virus pun presiune să suni la numere false sau să instalezi control la distanță.',
          'Doar adresa IP nu dezvăluie numele, strada, datele bancare sau fișierele tale.',
        ],
        sections: [
          {
            heading: 'De ce afișarea IP-ului este un truc psihologic',
            paragraphs: [
              'Reclamele malițioase afișează bannere roșii cu orașul și IP-ul tău, însă orice server web are nevoie de IP doar pentru a-ți trimite pagina.',
            ],
          },
          {
            heading: 'Ce expune — și ce nu expune — o adresă IP',
            paragraphs: [
              'IP-ul public arată doar nodul ISP și zona metropolitană. Închide fila și nu acorda acces prin AnyDesk sau TeamViewer.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP Spoofing, falsificarea antetelor & abuzul de proxy rezidențial',
        readTime: '6 min lectură',
        author: 'Securitate TestLine',
        summary:
          'De la antete X-Forwarded-For falsificate până la aplicații „VPN gratuit” care transformă conexiunea de acasă într-un nod proxy.',
        keyTakeaways: [
          'Falsificarea IP-ului sursă TCP nu poate finaliza HTTPS, așa că atacatorii folosesc SDK-uri ascunse în aplicații gratuite.',
          'Unele extensii gratuite închiriază pe ascuns IP-ul tău rezidențial către terți.',
          'Verificarea PTR, ASN și a antetelor confirmă lipsa releelor neașteptate.',
        ],
        sections: [
          {
            heading: 'Costul ascuns al aplicațiilor proxy „gratuite”',
            paragraphs: [
              'IP-urile rezidențiale au încredere ridicată. Unele extensii sau APK-uri suspecte direcționează trafic comercial prin conexiunea ta de acasă.',
            ],
          },
          {
            heading: 'Verificarea unei rutări curate',
            paragraphs: [
              'Auditează periodic extensiile instalate, dezactivează UPnP inutil și rulează o verificare IP & proxy.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Cum funcționează geolocalizarea IP — și de ce orașul este adesea greșit',
        readTime: '5 min lectură',
        author: 'Cercetare Rețele TestLine',
        summary:
          'Adresele IP nu conțin coordonate GPS. Descoperă cum mapează bazele GeoIP blocurile de adrese și de ce datele mobile apar în alt oraș.',
        keyTakeaways: [
          'Geolocalizarea IP se bazează pe registre RIR, anunțuri BGP și date ISP, nu pe GPS.',
          'Operatorii mobili concentrează traficul LTE/5G în porți regionale aflate la sute de kilometri.',
          'Acuratețea la nivel de țară depășește 98%, dar localizarea pe stradă prin IP este un mit.',
        ],
        sections: [
          {
            heading: 'Nu există GPS în pachetele IP',
            paragraphs: [
              'Site-urile consultă tabele bazate pe înregistrări WHOIS și măsurători ale operatorilor.',
            ],
          },
          {
            heading: 'De ce IP-urile mobile își schimbă orașul',
            paragraphs: [
              'Dacă un operator 5G trece traficul prin București în timp ce ești în Cluj, uneltele IP vor raporta București până la actualizarea bazelor.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Neconcordanța fusului orar & Rutarea ISP: De ce site-urile te plasează greșit',
        readTime: '4 min lectură',
        author: 'Cercetare Rețele TestLine',
        summary:
          'De ce filtrele antifraudă compară ceasul browserului cu fusul orar al IP-ului — și când rutarea legitimă produce diferențe.',
        keyTakeaways: [
          'Procesatorii de plăți compară fusul orar Intl al browserului cu cel al adresei IP.',
          'VPN-urile de companie sau roamingul pot cauza diferențe inofensive.',
          'TestLine afișează ambele fusuri orare față în față pentru claritate.',
        ],
        sections: [
          {
            heading: 'Cum funcționează verificarea fusului orar',
            paragraphs: [
              'Un semnal pasiv verifică dacă ora sistemului corespunde cu zona geografică a IP-ului public.',
            ],
          },
          {
            heading: 'Alarme false la graniță și în roaming',
            paragraphs: [
              'Călătorii cu SIM în roaming păstrează adesea gateway-ul țării de origine și fusul orar aferent.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Cum detectează site-urile un IP de VPN, proxy sau centru de date',
        readTime: '6 min lectură',
        author: 'Securitate TestLine',
        summary:
          'Te întrebi cum știu băncile sau platformele de streaming când folosești VPN? Iată cele patru semnale tehnice folosite.',
        keyTakeaways: [
          'Numerele ASN disting imediat furnizorii cloud (M247, DigitalOcean, Hetzner, AWS) de ISP-urile rezidențiale.',
          'Antetele Via și X-Forwarded-For cu mai multe salturi expun proxy-urile.',
          'Modelele PTR și diferențele de fus orar întăresc scorul de încredere.',
        ],
        sections: [
          {
            heading: 'Clasificarea ASN: Cel mai puternic semnal',
            paragraphs: [
              'Fiecare IP aparține unui ASN. Furnizorii VPN închiriază servere în centre de date, astfel că traficul este recunoscut în milisecunde.',
            ],
          },
          {
            heading: 'Nume PTR, antete și comportament',
            paragraphs: [
              'Combinarea ASN, PTR, antete HTTP și fus orar îți arată transparent ce semnalează tunelul tău.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'Scurgeri DNS, scurgeri IPv6 & Split Tunneling: Testarea statusului real VPN',
        readTime: '5 min lectură',
        author: 'Securitate TestLine',
        summary:
          'Chiar și cu VPN activat, interogările DNS necriptate sau IPv6 netunelat pot dezvălui locația reală. Învață să verifici tunelul.',
        keyTakeaways: [
          'O scurgere IPv6 apare când VPN-ul tunelează doar IPv4, iar ISP-ul trimite IPv6 direct.',
          'O scurgere DNS trimite rezolvarea domeniilor către ISP-ul local în afara tunelului.',
          'Testarea IPv4/IPv6 și a accesibilității DoH confirmă integritatea tunelului.',
        ],
        sections: [
          {
            heading: 'Capcana dual-stack a scurgerilor IPv6',
            paragraphs: [
              'Clienții VPN mai vechi creează doar o interfață IPv4, permițând browserelor să iasă direct prin IPv6.',
            ],
          },
          {
            heading: 'Verificarea tunelului în câteva secunde',
            paragraphs: [
              'Rulează un test pe TestLine cu VPN pornit și confirmă că ambele adrese IP aparțin ieșirii VPN și că DoH funcționează.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet restabilit',
    offlineMode: 'Mod Offline — Internet deconectat',
    connectionActive: 'Conexiunea este din nou activă',
    playWhileWaiting: 'Joacă Signal Runner cât timp aștepți reconectarea',
    score: 'Scor',
    best: 'Record',
    muteAria: 'Dezactivează sunetul jocului',
    unmuteAria: 'Activează sunetul jocului',
    pauseAria: 'Pune jocul pe pauză',
    resumeAria: 'Reia jocul',
    returnToSpeedTest: 'Înapoi la testul de viteză',
    checking: 'Se verifică...',
    checkConnection: 'Verifică conexiunea',
    canvasAria: 'Zona de joc offline Signal Runner',
    title: 'Signal Runner',
    subtitle:
      'Sari peste turnuri, țepi și drone până revine internetul. Săritura dublă este activată.',
    startGame: 'Pornește jocul',
    tapHint: 'Atinge ecranul sau apasă Spațiu / Săgeată Sus pentru a sări',
    paused: 'Joc în pauză',
    resume: 'Continuă',
    gameOver: 'Semnal întrerupt',
    cleared: 'Depășite:',
    newBest: 'Nou record!',
    playAgain: 'Joacă din nou',
    backToSpeedTest: 'Înapoi la testul de viteză',
    jump: 'Sari',
    fastDrop: 'Coborâre rapidă',
    desktopHintPrefix: 'Tastatură:',
    desktopJump: 'Sari',
    desktopDrop: 'Coboară',
    desktopPause: 'Pauză',
  },
  faq: {
    tableTitle: 'Referință Test Viteză & Verificare IP',
    tableSubtitle:
      'TestLine de la ECORZO LLC măsoară lățimea de bandă live, latența ping, jitter-ul, adresele publice IPv4/IPv6, geolocalizarea IP, viteza DNS și indicatorii VPN sau proxy.',
    readGuidesLink: 'Citește 10 ghiduri viteză & IP',
    colMetric: 'Indicator',
    colMethod: 'Metodă de măsurare',
    colThreshold: 'Prag optim',
    colImpact: 'Impact principal',
    benchmarks: [
      {
        metric: 'Viteză Download (Mbps / MB/s)',
        method: '3 fluxuri HTTP paralele de 25 MB (10 s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Multi-utilizator)',
        standardUse: 'Streaming, descărcări, sincronizare cloud',
      },
      {
        metric: 'Viteză Upload (Mbps / MB/s)',
        method: '2 fluxuri XHR POST paralele de 10 MB',
        optimal: '10+ Mbps (Apeluri HD) · 25+ Mbps (Creatori)',
        standardUse: 'Apeluri video, backup, live streaming',
      },
      {
        metric: 'Ping & Latență fără sarcină',
        method: '5 sonde secvențiale RTT Cloudflare de 0 biți',
        optimal: '< 30 ms (Mică) · 30–60 ms (Normală)',
        standardUse: 'Gaming online, VoIP, răspuns web',
      },
      {
        metric: 'Jitter & Sensibilitate Bufferbloat',
        method: 'Variația medie RTT între sonde consecutive',
        optimal: '< 10 ms (Stabil) · > 25 ms (Congestionat)',
        standardUse: 'Stabilitate audio/video sub sarcină',
      },
      {
        metric: 'Latență DNS DoH & Interogare PTR',
        method: 'Interogare criptată 1.1.1.1 + DNS invers PTR',
        optimal: '< 40 ms rezolvare DNS',
        standardUse: 'Viteză domenii & verificare operator',
      },
      {
        metric: 'IP Dual-Stack, Geo & Status VPN',
        method: 'IPv4/IPv6 + ISP/ASN + Audit antete/fus orar',
        optimal: 'IP direct ISP sau nod VPN verificat',
        standardUse: 'Care e IP-ul meu, locație, verificare VPN',
      },
    ],
    faqTitle: 'Întrebări Frecvente',
    faqSubtitle:
      'Răspunsuri directe despre testarea vitezei, IP-ul tău, geolocalizare, status VPN și confidențialitate',
    newsLink: 'Știri Securitate & Rețele',
    methodologyLink: 'Metodologia completă',
    gdprLink: 'GDPR & Politica de Date',
    items: [
      {
        question: 'Cât de rapidă este viteza mea de download și upload?',
        answer:
          'Apasă Pornește testul pentru a măsura viteza în timp real în Mbps sau MB/s folosind fluxuri paralele către serverele Cloudflare.',
      },
      {
        question: 'Care este adresa mea publică IPv4 și IPv6?',
        answer:
          'Testarea dual-stack detectează simultan IPv4 și IPv6 cu butoane de copiere, alături de oraș, regiune, țară, ISP și ASN.',
      },
      {
        question: 'Care sunt valori bune pentru ping, jitter și bufferbloat?',
        answer:
          'Un ping sub 30 ms și jitter sub 10 ms oferă apeluri și jocuri fluide. Creșterile bruște sub sarcină indică bufferbloat.',
      },
      {
        question: 'Cât de precisă este geolocalizarea IP?',
        answer:
          'Geolocalizarea asociază blocul IP cu orașul și țara înregistrate la operator, fără a dezvălui adresa exactă a străzii.',
      },
      {
        question: 'Cum detectează TestLine un VPN, proxy sau IP de datacenter?',
        answer:
          'Verifică antetele HTTP de redirecționare, ASN-urile de hosting, numele PTR și diferențele de fus orar între browser și IP.',
      },
      {
        question: 'Ce reprezintă latența DoH și DNS-ul invers (PTR)?',
        answer:
          'Latența DoH măsoară rezolvarea criptată prin Cloudflare 1.1.1.1, iar PTR afișează numele de gazdă asociat IP-ului tău.',
      },
      {
        question: 'Stochează sau vinde ECORZO LLC adresa mea IP ori rezultatele?',
        answer:
          'Nu. Măsurătorile sunt procesate efemer în memorie și nu sunt stocate pe server. Istoricul rămâne strict în browserul tău.',
      },
      {
        question: 'Pot instala TestLine ca aplicație sau juca offline?',
        answer:
          'Da. TestLine este o aplicație PWA instalabilă. Când conexiunea cade, jocul Signal Runner pornește automat.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Înapoi la testul de viteză',
    effectiveDatePrefix: 'Data intrării în vigoare:',
    operatorLabel: 'Operator: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Despre TestLine',
      subtitle:
        'Construit de ECORZO LLC pentru a oferi teste de viteză transparente și diagnostic public IPv4/IPv6 într-o aplicație rapidă care respectă confidențialitatea.',
      sections: [
        {
          heading: 'Ce măsoară TestLine',
          paragraphs: [
            'TestLine este un instrument gratuit operat de ECORZO LLC fără conturi sau extensii.',
          ],
          bullets: [
            { strong: 'Download & Upload (Mbps / MB/s):', text: 'Fluxuri HTTP paralele către nodurile Cloudflare în Auto, Mbps sau MB/s.' },
            { strong: 'Ping, Jitter & Sănătatea latenței:', text: 'Sonde RTT secvențiale pentru ping mediu, minim și variație.' },
            { strong: 'IPv4/IPv6, Locație, ISP & ASN:', text: 'Rezoluție dual-stack, PTR și latență criptată DoH.' },
            { strong: 'Detecție VPN, Proxy & Datacenter:', text: 'Verificarea antetelor, ASN, PTR și fusului orar.' },
          ],
        },
      ],
      closingTitle: 'Baza de cunoștințe, știri & detalii companie',
      closingIntro: 'Explorează cele',
      closingGuidesLink: '10 ghiduri despre viteză, IP, fraude & VPN',
      closingMid: 'sau citește știrile de securitate în timp real în',
      closingNewsLink: 'Fluxul RSS TestLine News',
      closingOutro:
        '. TestLine este dezvoltat de ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, SUA. Vizitează pagina de',
      closingContactLink: 'Contact',
    },
    contact: {
      title: 'Contactează ECORZO LLC',
      subtitle: 'Contactează echipa noastră pentru diagnostic TestLine, confidențialitate, GDPR sau conformitate.',
      telephone: 'Telefon',
      addressLabel: 'Sediu înregistrat',
      copy: 'Copiază',
      copied: 'Copiat',
      formHeading: 'Trimite o solicitare',
      sentTitle: 'Solicitare pregătită',
      sentBodyPrefix:
        'Mulțumim, {name}. Detaliile mesajului tău au fost înregistrate. Pentru probleme urgente sau GDPR, sună la +1 646 427 6802 sau scrie la ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Trimite altă solicitare',
      nameLabel: 'Nume complet',
      namePlaceholder: 'Ion Popescu',
      emailLabel: 'Adresă de email',
      emailPlaceholder: 'tu@exemplu.ro',
      messageLabel: 'Mesaj',
      messagePlaceholder: 'Cum te poate ajuta ECORZO LLC?',
      submitBtn: 'Trimite mesajul',
      errMissing: 'Te rugăm să introduci numele, emailul și mesajul.',
      errInvalidEmail: 'Te rugăm să introduci o adresă de email validă.',
    },
    privacy: {
      title: 'Politica de Confidențialitate',
      subtitle:
        'Cum colectează, utilizează și protejează TestLine de la ECORZO LLC informațiile de diagnostic conform politicilor Google și legislației.',
      sections: [
        {
          heading: '1. Operatorul de date & Domeniu',
          paragraphs: [
            'Această politică guvernează utilizarea TestLine, operat de ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel: +1 646 427 6802), în acord cu GDPR, CCPA și politicile Google.',
          ],
        },
        {
          heading: '2. Informații procesate în timpul diagnosticului',
          bullets: [
            { strong: 'Telemetrie Rețea & IP:', text: 'IPv4/IPv6, ISP, ASN, locația aproximativă, PTR și antetele HTTP sunt procesate efemer în memorie.' },
            { strong: 'Măsurători de viteză:', text: 'Rezultatele sunt stocate exclusiv local în browserul tău (testline_history_v1).' },
            { strong: 'Preferințe browser:', text: 'Tema (testline_theme), limba și consimțământul (testline_cookie_consent) sunt stocate local.' },
          ],
        },
        {
          heading: '3. Servicii terțe & Informare Google',
          paragraphs: [
            'Pentru teste live, browserul comunică cu Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io) și Ipify (api.ipify.org). Pentru serviciile Google se aplică:',
          ],
        },
        {
          heading: '4. Fără vânzare de date & Păstrare',
          paragraphs: [
            'ECORZO LLC nu vinde și nu închiriază datele tale personale sau adresa IP. Rapoartele PDF sunt generate exclusiv local pe dispozitivul tău.',
          ],
        },
      ],
      googlePolicyLinkText: 'Cum utilizează Google informațiile de pe site-urile sau aplicațiile care folosesc serviciile noastre',
      rightsPrefix: 'Ai dreptul de acces, rectificare, ștergere sau retragere a consimțământului. Consultă',
      gdprLinkText: 'GDPR & Politica de Date',
      rightsSuffix: 'sau contactează ECORZO LLC la +1 646 427 6802 ori 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Declinare de Responsabilitate',
      subtitle: 'Limitări importante privind măsurătorile de viteză, geolocalizarea IP și detecția VPN.',
      sections: [
        { heading: '1. Doar în scop informativ și de diagnostic', paragraphs: ['TestLine este oferit „ca atare” și nu constituie o certificare legală a capacității liniei.'] },
        { heading: '2. Variabile ce afectează rezultatele', paragraphs: ['Valorile depind de semnalul Wi-Fi, router, descărcări în fundal, VPN și rutarea operatorului.'] },
        { heading: '3. Acuratețea geolocalizării & proxy', paragraphs: ['Orașul și ISP provin din baze de date terțe și indică blocul înregistrat al IP-ului, nu adresa exactă.'] },
        { heading: '4. Limitarea răspunderii', paragraphs: ['În limita legii, ECORZO LLC nu răspunde pentru daune indirecte rezultate din utilizarea datelor de diagnostic.'] },
      ],
    },
    terms: {
      title: 'Termeni și Condiții',
      subtitle: 'Reguli privind accesarea și utilizarea TestLine de la ECORZO LLC.',
      sections: [
        { heading: '1. Acceptarea termenilor', paragraphs: ['Utilizând TestLine, accepți acești Termeni și Condiții.'] },
        {
          heading: '2. Utilizare permisă & interzisă',
          bullets: [
            { text: 'Poți folosi TestLine pentru diagnostic personal, educațional sau legitim de companie.' },
            { text: 'Este interzisă folosirea boților automatizați, atacurilor DDoS sau extragerii masive de date.' },
            { text: 'Este interzisă ocolirea limitărilor sau prezentarea rapoartelor drept certificate oficiale.' },
          ],
        },
        { heading: '3. Proprietate intelectuală', paragraphs: ['Numele TestLine, designul și codul sursă aparțin ECORZO LLC.'] },
        { heading: '4. Legea aplicabilă', paragraphs: ['Guvernat de legile statului New York și ale Statelor Unite.'] },
      ],
    },
    cookiesPolicy: {
      title: 'Politica de Cookies',
      subtitle: 'Detalierea cookie-urilor și cheilor de stocare locală folosite de TestLine.',
      sec1Title: '1. Ce sunt cookie-urile și stocarea locală?',
      sec1Body:
        'Cookie-urile sunt fișiere text mici. Aplicațiile moderne folosesc și localStorage pentru a păstra preferințele local în browser.',
      sec2Title: '2. Chei de stocare folosite de TestLine',
      colKey: 'Cheie / Identificator',
      colCategory: 'Categorie',
      colPurpose: 'Scop',
      rows: [
        { key: 'testline_theme', category: 'Preferință esențială', purpose: 'Memorează modul luminos sau întunecat.' },
        { key: 'testline_unit_v1', category: 'Preferință esențială', purpose: 'Păstrează unitatea aleasă (Auto, Mbps, MB/s).' },
        { key: 'testline_history_v1', category: 'Local funcțional', purpose: 'Salvează local ultimele 15 teste de viteză.' },
        { key: 'testline_cookie_consent', category: 'Consimțământ esențial', purpose: 'Înregistrează alegerea conform Google Consent Mode v2.' },
      ],
      sec3Title: '3. Terți & Politici Google',
      sec3Prefix:
        'Conform Google EU User Consent Policy și Consent Mode v2, stocarea pentru reclame și analiză rămâne blocată până la acordul tău. Vânzătorii autorizați sunt publicați la',
      sec3Mid: '. Poți modifica opțiunea oricând pe pagina',
      cookiesNoticeLinkText: 'Notificare Cookies',
      sec3OrVia: 'sau prin',
      googleAdSettingsText: 'Setări anunțuri Google',
    },
    cookiesNotice: {
      title: 'Notificare Cookies & Preferințe Consimțământ',
      subtitle: 'Gestionează preferințele pentru cookies și stocare locală pe TestLine.',
      sec1Title: 'Notificare pentru vizitatori (SEE, Marea Britanie, Elveția & Global)',
      sec1Body:
        'TestLine folosește stocare strict necesară pentru temă, unități, istoric local și consimțământ. Stocarea pentru reclame și analiză este dezactivată implicit.',
      activeTitle: 'Selecție activă de consimțământ',
      currentSettingLabel: 'Setare curentă:',
      statusAll: 'Toate permise (Analiză & Reclame)',
      statusEssential: 'Doar strict esențiale',
      statusUnset: 'Neselectat încă (Opționale refuzate)',
      savedBadge: 'Preferințe salvate',
      acceptAllBtn: 'Acceptă toată stocarea funcțională',
      essentialOnlyBtn: 'Doar esențiale',
      sec2Title: 'Controale din browser',
      sec2Body: 'Poți bloca sau șterge stocarea site-ului direct din setările de confidențialitate ale browserului.',
    },
    gdpr: {
      title: 'GDPR & Politica de Colectare a Datelor',
      subtitle: 'Temei legal, minimizarea datelor, transferuri internaționale și drepturi sub GDPR.',
      sections: [
        { heading: '1. Operatorul de date', paragraphs: ['Operatorul conform GDPR este ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, SUA (Tel: +1 646 427 6802).'] },
        {
          heading: '2. Temeiuri legale (Articolul 6)',
          bullets: [
            { strong: 'Contract / Serviciu solicitat (Art. 6(1)(b)):', text: 'Procesarea IP-ului și a fluxurilor este necesară pentru a rula testul cerut.' },
            { strong: 'Interes legitim (Art. 6(1)(f)):', text: 'Protecție împotriva abuzurilor, DDoS și menținerea fiabilității.' },
            { strong: 'Consimțământ explicit (Art. 6(1)(a)):', text: 'Cookie-urile opționale sunt procesate doar cu acordul tău.' },
          ],
        },
        { heading: '3. Minimizarea datelor & Păstrare', paragraphs: ['Respectăm Art. 5 GDPR fără conturi de utilizator sau loguri permanente IP.'] },
        { heading: '4. Transferuri internaționale', paragraphs: ['Cererile sunt rutate prin cel mai apropiat nod Cloudflare sau Google Cloud sub clauze SCC.'] },
        {
          heading: '5. Drepturile tale (Art. 15–22)',
          bullets: [
            { strong: 'Acces & portabilitate:', text: 'Solicită confirmarea și copia datelor.' },
            { strong: 'Rectificare & ștergere:', text: 'Solicită corectarea sau ștergerea datelor.' },
            { strong: 'Opoziție & restricționare:', text: 'Retrage consimțământul oricând.' },
            { strong: 'Plângere:', text: 'Poți depune plângere la autoritatea locală de protecție a datelor.' },
          ],
        },
        { heading: '6. Confidențialitatea copiilor', paragraphs: ['TestLine nu colectează cu bună știință date ale copiilor sub 13 ani (16 în SEE).'] },
      ],
    },
  },
  pdf: {
    reportTitle: 'Raport Rețea & Viteză TestLine',
    generated: 'Generat',
    unit: 'Unitate',
    secondCopyBanner: 'A DOUA COPIE  —  Descărcare duplicat raport',
    sec1Title: '1. Sumar Test de Viteză',
    downloadSpeed: 'Viteză Download',
    uploadSpeed: 'Viteză Upload',
    avgPing: 'Ping Mediu',
    jitter: 'Jitter',
    peak: 'Vârf',
    sustained: 'Flux susținut',
    min: 'Min',
    probes: 'sonde',
    rttProbes: 'sonde RTT',
    sec2Title: '2. Detecție Proxy & VPN',
    directClean: 'Conexiune directă — Niciun semnal proxy sau VPN detectat',
    sec3Title: '3. Diagnostic Rețea, IP & DNS',
    sec4Title: '4. Rulări recente ale sesiunii',
    confidenceWord: 'încredere',
    pageOf: 'Pagina {p} din {total}',
    secondCopyShort: 'A doua copie',
    rowPrimaryIp: 'IP Public Principal',
    rowIpv4: 'Adresă IPv4',
    rowIpv6: 'Adresă IPv6',
    rowIsp: 'Furnizor (ISP)',
    rowAsn: 'Sistem Autonom (ASN)',
    rowLocation: 'Locație aproximativă',
    rowTimezone: 'Fus orar',
    rowPtr: 'DNS Invers (PTR)',
    rowDoh: 'Sondă Resolver DoH',
    rowProtocol: 'Protocol transport',
    rowLinkHint: 'Indiciu conexiune browser',
    notDetected: 'Nedetectat',
    noPtr: 'Fără înregistrare PTR',
    reachable: 'Accesibil',
    unreachable: 'Inaccesibil',
    notExposed: 'Neexpus de browser',
    available: 'Disponibil',
    colTime: 'Ora',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'IP Public',
  },
};
