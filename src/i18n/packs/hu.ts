import type { TranslationPack } from '../types';

export const huPack: TranslationPack = {
  meta: {
    lang: 'hu',
    intlLocale: 'hu-HU',
    dir: 'ltr',
    nativeName: 'Magyar',
  },
  seo: {
    home: {
      title: 'TestLine — Internet sebességmérés & Nyilvános IP-lekérdezés',
      description:
        'Mérd meg a letöltési és feltöltési sebességedet, a pinget és a jittert, valamint ellenőrizd a nyilvános IPv4/IPv6-címedet, az internetszolgáltatód helyét, a DNS-késleltetést és a VPN-státuszt.',
      keywords:
        'internet sebességmérés, mi az ip címem, nyilvános ip cím, letöltési sebesség, feltöltési sebesség, ping teszt, jitter, ipv4, ipv6, vpn ellenőrzés',
      breadcrumbLabel: 'Sebességmérés',
    },
    news: {
      title: 'Kiberbiztonsági, Hálózati & Tech Hírek | TestLine',
      description:
        'Olvass élő RSS kiberbiztonsági, hálózati, DNS, BGP és technológiai híreket a Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch és Ars Technica forrásaiból.',
      keywords: 'kiberbiztonsági hírek, hálózatbiztonság rss, tech hírek',
      breadcrumbLabel: 'Hírek',
    },
    blog: {
      title: 'Internetsebesség, IP-cím & VPN Útmutatók | TestLine',
      description:
        'Fedezd fel 10 szakértői cikkünket az internetsebességről, az Mbps és MB/s különbségéről, az IPv4 és IPv6 címekről, az IP-csalásokról, a geolokációról, a bufferbloatról és a VPN-észlelésről.',
      keywords: 'internet sebesség útmutató, mbps vs mbs, ping és jitter, ipv4 vs ipv6, cgnat, ip csalás',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'A TestLine-ról — Sebességmérés & IP-diagnosztika',
      description:
        'Ismerd meg, hogyan méri az ECORZO LLC által üzemeltetett TestLine a sávszélességet, a pinget, a jittert, a dual-stack IPv4/IPv6-ot, a DoH DNS-késleltetést és a VPN-jelzőket.',
      keywords: 'testline bemutatkozó, ecorzo llc, sebességmérés módszertan, ip diagnosztika',
      breadcrumbLabel: 'Rólunk',
    },
    privacy: {
      title: 'Adatvédelmi Irányelvek — TestLine',
      description:
        'Olvasd el az ECORZO LLC TestLine adatvédelmi tájékoztatóját az ideiglenes IP-kezelésről, a naplózásmentességről, a GDPR-ról és a sütikről.',
      keywords: 'testline adatvédelem, ecorzo llc adatkezelés, gdpr sebességmérő',
      breadcrumbLabel: 'Adatvédelem',
    },
    contact: {
      title: 'Kapcsolat: TestLine & ECORZO LLC — Hálózati Támogatás',
      description:
        'Lépj kapcsolatba az ECORZO LLC-vel TestLine sebességmérés, IP-lekérdezés, adatvédelem vagy GDPR kapcsán a +1 646 427 6802 telefonszámon.',
      keywords: 'testline kapcsolat, ecorzo llc new york, hálózati támogatás',
      breadcrumbLabel: 'Kapcsolat',
    },
    disclaimer: {
      title: 'Jogi Nyilatkozat — TestLine',
      description:
        'Ismerd meg a sebességmérés változóit, a Wi-Fi korlátait, az IP-geolokáció pontosságát és a VPN/proxy-észlelés határait a TestLine oldalon.',
      keywords: 'jogi nyilatkozat sebességmérő, ip geolokáció pontossága',
      breadcrumbLabel: 'Nyilatkozat',
    },
    terms: {
      title: 'Felhasználási Feltételek — TestLine (ECORZO LLC)',
      description:
        'Tekintsd át az ECORZO LLC által üzemeltetett TestLine internetsebesség-mérő és nyilvános IP-diagnosztika használati feltételeit.',
      keywords: 'testline felhasználási feltételek, ecorzo llc feltételek',
      breadcrumbLabel: 'Feltételek',
    },
    'cookies-policy': {
      title: 'Süti Szabályzat & Helyi Tárolás — TestLine',
      description:
        'Tekintsd meg a TestLine által a GDPR-nak megfelelően használt pontos böngészőbeli helyi tárolási kulcsokat és sütitájékoztatást.',
      keywords: 'testline süti szabályzat, localstorage, google consent mode v2',
      breadcrumbLabel: 'Süti szabályzat',
    },
    'cookies-notice': {
      title: 'Süti Értesítés & Hozzájárulási Beállítások — TestLine',
      description:
        'Kezeld bármikor a TestLine süti-, analitikai és helyi tárolási hozzájárulási beállításaidat.',
      keywords: 'süti beállítások, hozzájárulás kezelése testline',
      breadcrumbLabel: 'Süti beállítások',
    },
    gdpr: {
      title: 'GDPR & Adatgyűjtési Irányelvek — TestLine',
      description:
        'Ismerd meg az ECORZO LLC GDPR 6. cikk szerinti jogalapjait, az adattakarékosságot, a nemzetközi adattovábbítást és a jogaidat.',
      keywords: 'testline gdpr szabályzat, ecorzo llc adatvédelem',
      breadcrumbLabel: 'GDPR & Adatok',
    },
  },
  nav: {
    speedTest: 'Sebességmérés',
    news: 'Hírek',
    blog: 'Blog',
    about: 'Rólunk',
    contact: 'Kapcsolat',
    privacy: 'Adatvédelem',
    stopTest: 'Teszt leállítása',
    newBadgeSuffix: 'új',
    homeAria: 'TestLine Kezdőlap',
    primaryNavAria: 'Fő navigáció',
    mobileNavAria: 'Mobil navigáció',
    companyMenuAria: 'TestLine menü: Rólunk, Kapcsolat és Adatvédelem',
  },
  pwa: {
    installApp: 'Alkalmazás telepítése',
    installAria: 'TestLine alkalmazás telepítése',
    installIosAria: 'TestLine telepítése iPhone-ra vagy iPadre',
    iosTitle: 'TestLine telepítése iPhone / iPad eszközre',
    closeDialog: 'Párbeszédpanel bezárása',
    iosStep1Prefix: 'Koppints a',
    iosStep1Strong: 'Megosztás',
    iosStep1Suffix: 'gombra a Safari eszköztárán.',
    iosStep2Prefix: 'Görgess lefelé, és koppints a',
    iosStep2Strong: 'Főképernyőhöz adás',
    iosStep2Suffix: 'lehetőségre.',
    iosStep3:
      'Nyisd meg a TestLine-t bármikor — internetkapcsolat nélkül is automatikusan elindul a Signal Runner játék.',
    gotIt: 'Értem',
  },
  hero: {
    title: 'Internet Sebességmérés & Nyilvános IP-lekérdezés',
    subtitle:
      'Ellenőrizd a letöltési és feltöltési sebességet, a pinget és a jittert — valamint IPv4/IPv6-címedet, az ISP helyét, a DNS-késleltetést és a VPN-státuszt.',
    speedUnitAria: 'Sebesség mértékegysége',
    autoTooltip: 'Automatikusan Mbps-t használ 100 Mbps alatt, és MB/s-ot 100 Mbps felett',
    auto: 'Auto',
    lightMode: 'Világos mód',
    darkMode: 'Sötét mód',
    switchToLight: 'Váltás világos módra',
    switchToDark: 'Váltás sötét módra',
    exportPdf: 'PDF exportálása',
    exportingPdf: 'Exportálás...',
    exportDisabledTitle: 'Előbb indíts el egy sebességmérést a PDF-jelentéshez',
    exportEnabledTitle: 'Sebesség- és hálózati diagnosztikai PDF-jelentés exportálása',
  },
  duplicateModal: {
    title: 'A jelentés már le lett töltve',
    closeDialog: 'Párbeszédpanel bezárása',
    body: 'Már letöltötted a jelentést ehhez a méréshez. Szeretnéd újra letölteni?',
    notePrefix: 'Az újboli exportálások egyértelműen',
    secondCopy: 'Második példány',
    noteSuffix: 'jelöléssel jelennek meg.',
    cancel: 'Nem, mégse',
    confirm: 'Igen, letöltöm újra',
  },
  speedStage: {
    startSpeedTest: 'Sebességmérés indítása',
    yourSpeedIs: 'Az interneted sebessége',
    stopAria: 'Sebességmérés leállítása',
    startAria: 'Sebességmérés indítása',
    retry: 'Újra',
    statusIdle: 'Kattints a Lejátszásra a teszt indításához',
    statusPing: 'Ping és jitter mérése...',
    statusDownload: 'Letöltési sebesség tesztelése...',
    statusUpload: 'Feltöltési sebesség tesztelése...',
    statusComplete: 'Sebességmérés kész',
    statusStopped: 'Teszt leállítva',
    statusError: 'Teszt megszakítva',
    uploadSpeed: 'Feltöltési sebesség',
    peakPrefix: 'Csúcs',
    twoStreams: '2 párhuzamos adatfolyam',
    latencyAvgPing: 'Késleltetés (Átlagos ping)',
    minPrefix: 'Min',
    probesSuffix: 'mérés',
    fiveProbes: '5 Cloudflare RTT mérés',
    jitter: 'Jitter',
    consecutiveVariance: 'Csomagok közti ingadozás',
    waitingRtt: 'Várakozás RTT mintákra',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Proxy vagy VPN észlelési értesítés',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy észlelve',
      'Datacenter / Relay Network': 'Adatközpont / Továbbító hálózat',
      'Timezone Mismatch (Possible VPN)': 'Időzóna-eltérés (Lehetséges VPN)',
      'Direct Connection': 'Közvetlen kapcsolat',
    },
    confidence: {
      High: 'Magas',
      Moderate: 'Mérsékelt',
      Low: 'Alacsony',
    },
    confidenceWord: 'bizonyosság',
    signalSingular: 'jelzés',
    signalPlural: 'jelzés',
    noticeDesc:
      'A kapcsolatod proxy, VPN vagy adatközponti relé jellemzőit mutatja. A mért sebesség az aktív alagutat vagy kilépési csomópontot tükrözi.',
    observedExitIp: 'Észlelt kilépési IP',
    relayOperator: 'Relé / Hálózati szolgáltató',
    exitLocationTz: 'Kilépési hely & időzóna',
    detectedIndicators: 'Észlelt jelzések',
    unavailable: 'Nem elérhető',
    signalTemplates: {
      proxy_flag: 'Az IP-cím aktív proxy-, VPN- vagy Tor-kilépőként van megjelölve',
      hosting_flag:
        'A forgalom lakossági internetszolgáltató helyett adatközponti / tárhely-ASN-ből érkezik',
      provider_keyword: 'A hálózatüzemeltető / PTR egyezik a relé kulcsszóval ({1})',
      via_header: 'Proxy továbbítási fejléc észlelve ({1})',
      multi_hop: 'Több továbbítási ugrás észlelve ({1} ugrás)',
      ip_mismatch: 'A böngésző közvetlen IP-címe eltér a peremhálózati IP-től (osztályozott alagút vagy proxy)',
      timezone_mismatch:
        'A böngésző időzónája ({1}) eltér az IP-geolokáció időzónájától ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Nyilvános IP-cím',
    resolvingRoute: 'Útvonal feloldása',
    routeSuffix: 'útvonal',
    updatedPrefix: 'Frissítve',
    unavailable: 'Nem elérhető',
    metadataUnavailable: 'Hálózati metaadatok nem érhetők el',
    copyIp: 'IP másolása',
    copiedIp: 'IP másolva',
    refresh: 'Frissítés',
    ipv46CardTitle: 'IPv4, IPv6 & Szolgáltatói útvonal',
    ipv46CardSubtitle: 'Kettős veremű kliensmérések IP-geolokációval kombinálva',
    ipv4Label: 'IPv4-cím',
    ipv6Label: 'IPv6-cím',
    notDetected: 'Nem észlelhető',
    ipv6NotDetected: 'Nem észlelhető (csak IPv4 útvonal)',
    ispLabel: 'Internetszolgáltató (ISP)',
    asnLabel: 'Autonóm Rendszer (ASN)',
    locationLabel: 'Körülbelüli hely',
    proxyCheckLabel: 'Proxy / VPN ellenőrzés',
    resolving: 'Feloldás...',
    inspecting: 'Vizsgálat...',
    directConnectionNone: 'Közvetlen kapcsolat (Nem észlelhető)',
    dnsCardTitle: 'DNS-adatok & Kapcsolati diagnosztika',
    dnsCardSubtitle: 'Fordított PTR-rekord, DoH-elérhetőség és böngésző-átviteli jelzések',
    ptrLabel: 'Fordított DNS (PTR)',
    noPtr: 'Nincs publikált PTR-rekord',
    dohProbeLabel: 'DoH-feloldó próba',
    probing: 'Tesztelés...',
    reachable: 'Elérhető',
    blockedOrUnreachable: 'Blokkolva vagy elérhetetlen',
    dnsLatencyLabel: 'DNS-lekérdezési késleltetés',
    protocolLabel: 'Átviteli protokoll',
    checking: 'Ellenőrzés...',
    linkHintLabel: 'Böngésző kapcsolatjelző',
    exposedNoMetrics: 'Metrikák nélkül elérhető',
    notExposed: 'A böngésző nem teszi közzé',
    timezoneLabel: 'Időzóna',
    copy: 'Másolás',
    copied: 'Másolva',
    capSuffix: 'Mbps korlát',
    rttSuffix: 'ms RTT',
    fetchError: 'Nem sikerült elérni az IP-diagnosztikai végpontokat.',
  },
  history: {
    title: 'Munkamenet mérési előzményei',
    subtitle: 'Legutóbbi mérések helyben mentve a böngésződben',
    clearHistory: 'Előzmények törlése',
    emptyText: 'A befejezett sebességmérések itt jelennek meg az eredmények összehasonlításához.',
    colTime: 'Idő',
    colDownload: 'Letöltés',
    colUpload: 'Feltöltés',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Nyilvános IP',
  },
  consent: {
    title: 'Süti & Adatvédelmi tájékoztató',
    description:
      'A TestLine alapvető helyi tárolást használ a téma, a mértékegységek és az előzmények mentéséhez. Az opcionális analitikai és hirdetési sütik kikapcsolva maradnak, hacsak el nem fogadod őket.',
    acceptAll: 'Összes elfogadása',
    essentialOnly: 'Csak szükségesek',
    cookieSettings: 'Süti beállítások',
  },
  footer: {
    byEcorzo: 'üzemeltető: ECORZO LLC',
    tagline:
      'Valós idejű internetsebesség-mérés és dual-stack IP hálózati diagnosztika az ECORZO LLC-től.',
    companyHeading: 'Vállalat',
    legalHeading: 'Jogi információk & Megfelelés',
    disclaimer: 'Jogi nyilatkozat',
    terms: 'Felhasználási feltételek',
    cookiesPolicy: 'Süti szabályzat',
    cookiesNotice: 'Süti tájékoztató',
    gdpr: 'GDPR & Adatkezelés',
    privacy: 'Adatvédelmi irányelvek',
    copyrightSuffix: 'ECORZO LLC. Minden jog fenntartva.',
    poweredBy:
      'Mérések a Cloudflare csomópontjain keresztül · GDPR és Google-irányelveknek megfelelően',
    languageLabel: 'Nyelv',
    autoOption: 'Auto (Régió)',
  },
  news: {
    eyebrow: 'Élő Kiberbiztonsági & Tech RSS Hírgyűjtő',
    updatedPrefix: 'Frissítve',
    title: 'Hálózati, biztonsági & technológiai hírek',
    filterPlaceholder: 'Címek szűrése...',
    filterAria: 'Hírcímek szűrése',
    refreshFeeds: 'Hírfolyamok frissítése',
    refreshing: 'Frissítés...',
    cachedBannerPrefix:
      'Az élő RSS-csatornák jelenleg nem érhetők el. Az eszközre mentett korábbi hírek jelennek meg',
    retryLive: 'Élő újrapróbálása',
    retrying: 'Próbálkozás...',
    allSources: 'Minden forrás',
    errorFallback:
      'Az élő RSS-hírfolyamok jelenleg nem tölthetők be. Ellenőrizd a kapcsolatot, és próbáld újra.',
    tryAgain: 'Újra',
    emptyText: 'Nincs találat a jelenlegi RSS-csatornákban.',
    showAll: 'Összes forrás mutatása',
    newTag: 'Új',
    readFullStory: 'Teljes cikk elolvasása',
    recent: 'Friss',
    minutesAgo: '{n} p',
    hoursAgo: '{n} ó',
  },
  blog: {
    eyebrow: 'TestLine Útmutatók & Napi Kiemelt Hírek',
    articlesCountSuffix: 'Cikk',
    title: 'Internetsebesség, IP-diagnosztika & Napi Összefoglalók',
    subtitle:
      'Részletes útmutatók az internetsebességről, IPv4/IPv6-ról, IP-csalásokról, IP-helymeghatározásról és VPN-észlelésről — plusz naponta 2 kiemelt hír élő RSS-forrásainkból.',
    searchPlaceholder: 'Keresés {n} cikk között...',
    searchAria: 'Blogcikkek keresése',
    allLabel: 'Összes',
    hotNewsLabel: 'Kiemelt hírek',
    dailyHotNewsBadge: 'Napi kiemelt hír',
    emptyText: 'Nincs a szűrőnek megfelelő cikk.',
    resetFilters: 'Szűrők törlése',
    newTag: 'Új',
    readArticle: 'Cikk olvasása',
    backToAllPrefix: 'Vissza mind a(z)',
    backToAllSuffix: 'cikkhez',
    originalSourcePrefix: 'Eredeti forrás',
    testConnectionNow: 'Teszteld a kapcsolatot most',
    keyTakeaways: 'Főbb megállapítások',
    dailyReadTime: '3 perc olvasás',
    dailyAuthorPrefix: 'TestLine Napi Összefoglaló · forrás:',
    dailyTakeawayFeatured: 'Kiemelve a TestLine napi hírösszefoglalójában ({source}) a(z) {topic} témában.',
    dailyTakeawaySummaryPrefix: 'Lényegi összefoglaló:',
    dailyTakeawayTip:
      'Váratlan kapcsolati figyelmeztetések esetén mindig ellenőrizd az aktív nyilvános IPv4/IPv6-címedet, a DNS-késleltetést és a VPN/proxy állapotot.',
    dailySectionBriefingPrefix: 'Napi összefoglaló:',
    dailyBriefingPara2:
      'Automatikusan kiválasztva a(z) {date} napi TestLine összefoglalóba a frissesség és a hálózatbiztonsági jelentőség alapján. Az eredeti technikai beszámolót a fenti forráslinken olvashatod el.',
    dailySectionActionTitle: 'Hálózati diagnosztika & Gyakorlati lépések',
    dailyActionPara1:
      'A(z) {topic} témát érintő fejlemények gyakran kihatnak a szolgáltatói DNS-szerverekre, útválasztási táblákra és vállalati VPN-átjárókra. Egy azonnali sebességmérés és dual-stack IP-ellenőrzés megmutatja, nőtt-e a jitter vagy módosult-e a relé.',
    dailyActionPara2:
      'Kövesd az új sebezhetőségeket a Hírek fül élő RSS-hírfolyamaiban és a Blog állandó szakmai anyagaiban.',
    categories: {
      'Hot News': 'Kiemelt hírek',
      'Internet Speed': 'Internetsebesség',
      'IP Addresses': 'IP-címek',
      'IP Scams': 'IP-csalások',
      'IP Location': 'IP-helyzet',
      'VPN IP Status': 'VPN IP-státusz',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Miért tér el a valós letöltési sebességed a szolgáltatói csomagtól',
        readTime: '5 perc olvasás',
        author: 'TestLine Mérnökség',
        summary:
          'Tudd meg, miért tölt le egy 500 Mbps-os csomag 50–60 MB/s-mal, hogyan hat a TCP/TLS többletterhelés, és miért pontosabb a többszálas teszt.',
        keyTakeaways: [
          'A szolgáltatók megabit/másodpercben (Mbps) hirdetnek, míg a böngészők megabájt/másodpercet (MB/s) mutatnak 8:1 arányban.',
          'A Wi-Fi távolság, a 2,4 GHz-es zsúfoltság és a régi routerek gyakran visszafogják a gigabites netet.',
          'A párhuzamos HTTP-folyamok pontosabban mérik a teljes sávszélességet egyetlen átvitelnél.',
        ],
        sections: [
          {
            heading: 'Megabit (Mbps) vs. Megabájt (MB/s)',
            paragraphs: [
              'A legnagyobb félreértés a bitek és bájtok különbsége. Mivel 1 bájt 8 bitből áll, a 400 Mbps elméleti maximuma 50 MB/s.',
              'Az Ethernet-, IP- és TLS-fejlécek levonása után a hasznos sebesség jellemzően a névleges vonali sávszélesség 90–94%-a.',
            ],
          },
          {
            heading: 'Miért számítanak a többszálas tesztek',
            paragraphs: [
              'Egyetlen TCP-kapcsolatot korlátozhat a késleltetés. Három párhuzamos szál egyenletesen terheli a kapcsolatot.',
              'Nagy eltérésnél tesztelj 5/6 GHz-es Wi-Fi közelében vagy Cat6 kábelen.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter: Mi teszi tönkre valójában a videohívásokat és a játékokat',
        readTime: '5 perc olvasás',
        author: 'TestLine Mérnökség',
        summary:
          'A nagy sávszélesség sem menti meg a Zoom-hívást vagy a játékot, ha a késleltetés ingadozik. Íme a ping, a jitter és a bufferbloat hatása.',
        keyTakeaways: [
          'A ping az átlagos oda-vissza időt (RTT) méri ezredmásodpercben; 30 ms alatt szinte azonnali.',
          'A jitter az egymást követő csomagok időeltérését méri — 20–25 ms felett szaggat a hang.',
          'Hívás közbeni nagy feltöltés bufferbloatot okoz SQM/QoS nélkül.',
        ],
        sections: [
          {
            heading: 'A késleltetés a kétirányú válaszidő',
            paragraphs: [
              'A sávszélesség az út szélessége, a ping pedig egy csomag menetideje. A 4K videó előre pufferel, de a hanghívás minden ezredmásodpercet megérez.',
            ],
          },
          {
            heading: 'Miért okoz hangakadozást a jitter',
            paragraphs: [
              'Ha öt mérés értéke 14, 16, 92, 15 és 68 ms, az átlag jónak tűnik, mégis csomagot kell dobnia a kodeknek.',
              'Az SQM megakadályozza, hogy a háttérfeltöltések elnyomják a valós idejű forgalmat.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6: Miért fontosak ma a dual-stack hálózatok',
        readTime: '6 perc olvasás',
        author: 'TestLine Hálózatkutatás',
        summary:
          'Az IPv4-címek elfogyásával és a mobilhálózatok CGNAT-használatával kulcsfontosságú érteni az IPv4 és IPv6 útválasztást.',
        keyTakeaways: [
          'Az IPv4 32 bites címeket használ (~4,3 milliárd), ezért a szolgáltatók CGNAT-tal osztják meg a címeket.',
          'Az IPv6 128 bites címekkel visszaállítja a közvetlen végponttól végpontig tartó kapcsolatot.',
          'A dual-stack ellenőrzés megmutatja, van-e egyszerre IPv4 és IPv6 útvonalad.',
        ],
        sections: [
          {
            heading: 'Az IPv4-hiány és a CGNAT valósága',
            paragraphs: [
              'Mivel elfogytak a szabad IPv4-blokkok, sok szolgáltató Carrier-Grade NAT mögé teszi az ügyfeleket, ahol egy nyilvános IP-n többen osztoznak.',
            ],
          },
          {
            heading: 'Hogyan gyorsít a dual-stack',
            paragraphs: [
              'A modern rendszerek a Happy Eyeballs révén az IPv6-ot részesítik előnyben, elkerülve a CGNAT-fordítást.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Nyilvános vs. Privát IP & Hogyan azonosít a fordított DNS (PTR)',
        readTime: '4 perc olvasás',
        author: 'TestLine Hálózatkutatás',
        summary:
          'Miért mutat a telefon 192.168.1.45-öt Wi-Fin, míg a webhelyek más nyilvános IP-t látnak — és mit árul el a PTR.',
        keyTakeaways: [
          'Az RFC 1918 privát tartományok (10.x, 172.16–31.x, 192.168.x) csak a helyi hálózaton belül léteznek.',
          'A router NAT segítségével cseréli le a belső címet a szolgáltatótól kapott nyilvános IP-re.',
          'A fordított DNS (PTR) gépnevet rendel az IP-hez, amely gyakran jelzi a régiót és a vonaltípust.',
        ],
        sections: [
          {
            heading: 'Routeren belül vs. a nyilvános interneten',
            paragraphs: [
              'A belső 192.168.1.24 cím nem irányítható az interneten; kifelé menet a NAT átírja a nyilvános WAN IP-címre.',
            ],
          },
          {
            heading: 'A fordított DNS (PTR) olvasása',
            paragraphs: [
              'A szolgáltatók gyakran leíró PTR-rekordokat adnak meg, amelyek az ASN-nel együtt elkülönítik az otthoni vonalat a felhőszerverektől.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Így szűrd ki a hamis „Feltörték az IP-címedet” felugró átveréseket',
        readTime: '5 perc olvasás',
        author: 'TestLine Biztonság',
        summary:
          'Az átverő ablakok pánikkeltésre mutatják a valódi IP-címedet és városodat. Tudd meg, miért látja minden weboldal az IP-det automatikusan.',
        keyTakeaways: [
          'Minden meglátogatott webhely megkapja a nyilvános IP-det a normál HTTP működéshez — ez nem jelent betörést.',
          'A hamis vírusriasztások hamis ügyfélszolgálat hívására vagy távelérés telepítésére próbálnak rávenni.',
          'Önmagában az IP-cím nem fedi fel a nevedet, lakcímedet, banki belépésedet vagy fájljaidat.',
        ],
        sections: [
          {
            heading: 'Miért pszichológiai trükk az IP megjelenítése',
            paragraphs: [
              'A kártékony hirdetések piros figyelmeztetést mutatnak a városoddal, pedig minden webszervernek tudnia kell az IP-det a válaszadáshoz.',
            ],
          },
          {
            heading: 'Mit árul el — és mit nem — az IP-cím',
            paragraphs: [
              'A nyilvános IP csak a szolgáltatói csomópontot és a tágabb várost jelzi. Zárd be a lapot, és ne adj távelérést AnyDesk/TeamViewer segítségével.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP-hamisítás, fejléchamisítás & lakossági proxy visszaélések',
        readTime: '6 perc olvasás',
        author: 'TestLine Biztonság',
        summary:
          'A hamis X-Forwarded-For fejlécektől az „ingyenes VPN” appokig, amelyek észrevétlenül proxy kilépőponttá teszik az otthoni routeredet.',
        keyTakeaways: [
          'Hamisított TCP forrás-IP-vel nem jön létre HTTPS kézfogás, ezért a támadók ingyenes proxy SDK-kkal élnek vissza.',
          'Egyes ingyenes bővítmények titokban bérbe adják az otthoni IP-címedet harmadik feleknek.',
          'A PTR, ASN és fejlécek ellenőrzése megmutatja a váratlan közvetítőket.',
        ],
        sections: [
          {
            heading: 'Az „ingyenes” proxy appok rejtett ára',
            paragraphs: [
              'A lakossági IP-címek magas bizalmúak, ezért kétes appok néha mások forgalmát vezetik át az otthoni hálózaton.',
            ],
          },
          {
            heading: 'Tiszta kimenő útvonal ellenőrzése',
            paragraphs: [
              'Vizsgáld át a böngészőbővítményeket, kapcsold ki a felesleges UPnP-t, és futtass IP- és proxyellenőrzést.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Hogyan működik az IP-geolokáció — és miért téved gyakran a város',
        readTime: '5 perc olvasás',
        author: 'TestLine Hálózatkutatás',
        summary:
          'Az IP-címek nem tartalmaznak GPS-koordinátákat. Nézd meg, hogyan térképezik fel a GeoIP-adatbázisok a régiókat, és miért mutat más várost a mobilnet.',
        keyTakeaways: [
          'Az IP-helymeghatározás RIR-bejegyzésekre, BGP-útvonalakra és ISP-adatokra épül GPS helyett.',
          'A mobilszolgáltatók központi átjárókon keresztül irányítják az LTE/5G forgalmat.',
          'Országszinten 98% feletti a pontosság, utcai pontosság viszont nem létezik IP-ből.',
        ],
        sections: [
          {
            heading: 'Nincs GPS az IP-csomagokban',
            paragraphs: [
              'A webhelyek WHOIS-adatbázisokból és útválasztási táblázatokból következtetnek a regisztrált városra.',
            ],
          },
          {
            heading: 'Miért ugrik más városba a mobil és az üvegszál',
            paragraphs: [
              'Ha az 5G-forgalom budapesti központon megy át, vidékről is Budapestet jeleznek az IP-eszközök az adatbázis frissítéséig.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Időzóna-eltérés & Szolgáltatói útválasztás: Miért helyeznek rossz helyre',
        readTime: '4 perc olvasás',
        author: 'TestLine Hálózatkutatás',
        summary:
          'Miért vetik össze a csalásszűrők a böngésző óráját az IP időzónájával — és mikor okoz ártalmatlan eltérést a hálózati útvonal.',
        keyTakeaways: [
          'A fizetési rendszerek összevetik a böngésző Intl időzónáját az IP-cím időzónájával.',
          'Vállalati VPN vagy külföldi roaming okozhat természetes eltérést.',
          'A TestLine egymás mellett mutatja mindkét időzónát az átláthatóságért.',
        ],
        sections: [
          {
            heading: 'Hogyan működik az időzóna-összehasonlítás',
            paragraphs: [
              'Egy gyors passzív ellenőrzés megnézi, egyezik-e a rendszeridőzóna a nyilvános IP régiójával.',
            ],
          },
          {
            heading: 'Téves riasztások határoknál és utazáskor',
            paragraphs: [
              'Roaming közben a SIM gyakran a hazai átjárón keresztül lép ki az internetre, megtartva az otthoni időzónát.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Hogyan ismerik fel a weboldalak a VPN-, proxy- és adatközponti IP-ket',
        readTime: '6 perc olvasás',
        author: 'TestLine Biztonság',
        summary:
          'Kíváncsi vagy, miért veszik észre a bankok és streaming oldalak a VPN-t? Íme a négy legfőbb technikai jel.',
        keyTakeaways: [
          'Az ASN-számok azonnal megkülönböztetik a felhőszolgáltatókat (M247, DigitalOcean, Hetzner, AWS) a lakossági ISP-ktől.',
          'A Via és többugrásos X-Forwarded-For fejlécek leleplezik a nyílt proxykat.',
          'A PTR-minták és időzóna-eltérések megerősítik a besorolást.',
        ],
        sections: [
          {
            heading: 'ASN-osztályozás: A legerősebb jel',
            paragraphs: [
              'Minden IP egy ASN-hez tartozik. Mivel a VPN-cégek adatközpontokban bérelnek szervereket, ez milliszekundumok alatt látható.',
            ],
          },
          {
            heading: 'PTR-nevek, fejlécek és viselkedés',
            paragraphs: [
              'Az ASN, PTR kulcsszavak, HTTP fejlécek és időzóna együttesen pontos képet adnak a használt alagútról.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS-szivárgás, IPv6-szivárgás & Split Tunneling: A valódi VPN tesztelése',
        readTime: '5 perc olvasás',
        author: 'TestLine Biztonság',
        summary:
          'Még bekapcsolt VPN mellett is felfedheti a helyedet a titkosítatlan DNS vagy az alagúton kívüli IPv6. Így ellenőrizheted.',
        keyTakeaways: [
          'IPv6-szivárgás akkor történik, ha a VPN csak IPv4-et titkosít, az IPv6 pedig közvetlenül megy ki.',
          'DNS-szivárgásnál a tartománynevek feloldása az alagúton kívül, a helyi ISP-nél történik.',
          'Az IPv4/IPv6 és a Cloudflare DoH tesztje igazolja az alagút zártságát.',
        ],
        sections: [
          {
            heading: 'A dual-stack IPv6-szivárgás csapdája',
            paragraphs: [
              'Régi VPN-kliensek csak IPv4-adaptert hoznak létre, így a böngésző a natív IPv6-on kikerülheti az alagutat.',
            ],
          },
          {
            heading: 'Az alagút ellenőrzése másodpercek alatt',
            paragraphs: [
              'Futtass új ellenőrzést a TestLine-on VPN-nel, és győződj meg róla, hogy az IP és a DoH is az elvárt módon működik.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet helyreállt',
    offlineMode: 'Offline mód — Internet megszakadt',
    connectionActive: 'A kapcsolat újra aktív',
    playWhileWaiting: 'Játssz a Signal Runnerrel, amíg visszatér a kapcsolat',
    score: 'Pont',
    best: 'Rekord',
    muteAria: 'Játék hangjának némítása',
    unmuteAria: 'Játék hangjának bekapcsolása',
    pauseAria: 'Játék szüneteltetése',
    resumeAria: 'Játék folytatása',
    returnToSpeedTest: 'Vissza a sebességméréshez',
    checking: 'Ellenőrzés...',
    checkConnection: 'Kapcsolat ellenőrzése',
    canvasAria: 'Signal Runner offline játékfelület',
    title: 'Signal Runner',
    subtitle:
      'Ugorj át a tornyok, tüskék és drónok felett, amíg visszatér az internet. A duplaugrás engedélyezve van.',
    startGame: 'Játék indítása',
    tapHint: 'Érintsd meg a képernyőt vagy nyomd meg a Szóköz / Fel nyilat az ugráshoz',
    paused: 'Játék szüneteltetve',
    resume: 'Folytatás',
    gameOver: 'Jel megszakadt',
    cleared: 'Teljesítve:',
    newBest: 'Új rekord!',
    playAgain: 'Újra játszom',
    backToSpeedTest: 'Vissza a sebességméréshez',
    jump: 'Ugrás',
    fastDrop: 'Gyors esés',
    desktopHintPrefix: 'Billentyűzet:',
    desktopJump: 'Ugrás',
    desktopDrop: 'Esés',
    desktopPause: 'Szünet',
  },
  faq: {
    tableTitle: 'Sebességmérés & IP-lekérdezési Segédlet',
    tableSubtitle:
      'Az ECORZO LLC TestLine élőben méri a letöltési/feltöltési sávszélességet, a pinget, a jittert, a nyilvános IPv4/IPv6-címeket, az IP-geolokációt, a DNS-sebességet és a VPN/proxy jeleket.',
    readGuidesLink: '10 sebesség- & IP-útmutató olvasása',
    colMetric: 'Mérőszám',
    colMethod: 'Mérési módszer',
    colThreshold: 'Célérték',
    colImpact: 'Fő hatás',
    benchmarks: [
      {
        metric: 'Letöltési sebesség (Mbps / MB/s)',
        method: '3 párhuzamos 25 MB HTTP adatfolyam (10 mp)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Többfelhasználós)',
        standardUse: 'Streaming, letöltések, felhőszinkron',
      },
      {
        metric: 'Feltöltési sebesség (Mbps / MB/s)',
        method: '2 párhuzamos 10 MB XHR POST folyam',
        optimal: '10+ Mbps (HD hívások) · 25+ Mbps (Alkotói)',
        standardUse: 'Videohívások, mentések, élő adás',
      },
      {
        metric: 'Ping & terheletlen késleltetés',
        method: '5 egymást követő 0 bájtos Cloudflare RTT mérés',
        optimal: '< 30 ms (Alacsony) · 30–60 ms (Normál)',
        standardUse: 'Online játék, VoIP, gyors böngészés',
      },
      {
        metric: 'Jitter & bufferbloat-érzékenység',
        method: 'Egymást követő RTT-mérések átlagos szórása',
        optimal: '< 10 ms (Stabil) · > 25 ms (Terhelt)',
        standardUse: 'Hang- és képstabilitás terhelés alatt',
      },
      {
        metric: 'DoH DNS-késleltetés & PTR lekérdezés',
        method: 'Titkosított 1.1.1.1 lekérdezés + Fordított DNS PTR',
        optimal: '< 40 ms DNS-feloldás',
        standardUse: 'Tartományfeloldás & szolgáltatói ellenőrzés',
      },
      {
        metric: 'Dual-Stack IP, Geo & VPN-státusz',
        method: 'IPv4/IPv6 + ISP/ASN + Fejléc/időzóna vizsgálat',
        optimal: 'Közvetlen ISP IP vagy hitelesített VPN-kilépő',
        standardUse: 'Mi az IP-m, helymeghatározás, VPN-ellenőrzés',
      },
    ],
    faqTitle: 'Gyakran Ismételt Kérdések',
    faqSubtitle:
      'Közvetlen válaszok a sebességmérésről, a nyilvános IP-ről, a helymeghatározásról, a VPN-státuszról és az adatvédelemről',
    newsLink: 'Biztonsági & Hálózati Hírek',
    methodologyLink: 'Teljes módszertan',
    gdprLink: 'GDPR & Adatkezelés',
    items: [
      {
        question: 'Milyen gyors az internetes letöltési és feltöltési sebességem?',
        answer:
          'Kattints a Sebességmérés indítása gombra a valós idejű sebesség Mbps vagy MB/s alapú méréséhez a Cloudflare peremszerverein keresztül.',
      },
      {
        question: 'Mi a nyilvános IPv4- és IPv6-címem?',
        answer:
          'A dual-stack mérés egymás mellett mutatja a nyilvános IPv4 és IPv6 címedet másolási gombokkal, valamint a várost, országot, ISP-t és ASN-t.',
      },
      {
        question: 'Mik a jó értékek pingre, jitterre és bufferbloatra?',
        answer:
          'A 30 ms alatti ping és 10 ms alatti jitter sima videohívást és játékot ad. Terhelés közbeni kiugró késleltetés bufferbloatra utal.',
      },
      {
        question: 'Mennyire pontos az IP-geolokáció?',
        answer:
          'Az IP-blokkot a szolgáltató által regisztrált városhoz és országhoz köti, de soha nem fedi fel a pontos utcacimet.',
      },
      {
        question: 'Hogyan észleli a TestLine a VPN-t, proxyt vagy adatközponti IP-t?',
        answer:
          'Ellenőrzi a továbbítási HTTP fejléceket, tárhely-ASN-eket, fordított PTR neveket és a böngésző-IP időzóna eltéréseit.',
      },
      {
        question: 'Mi a DoH DNS-késleltetés és a fordított DNS (PTR)?',
        answer:
          'A DoH a titkosított Cloudflare 1.1.1.1 feloldási sebességét méri, a PTR pedig a szolgáltató által az IP-hez rendelt gépnevet mutatja.',
      },
      {
        question: 'Naplózza vagy tárolja az ECORZO LLC az IP-címemet vagy az eredményeimet?',
        answer:
          'Nem. A mérések ideiglenesen a memóriában zajlanak, nem kerülnek értékesítésre, az előzmények pedig kizárólag a böngésződben maradnak.',
      },
      {
        question: 'Használhatom a TestLine-t alkalmazásként vagy offline módban?',
        answer:
          'Igen. A TestLine telepíthető PWA. Internetkimaradáskor automatikusan elindul a Signal Runner játék.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Vissza a sebességméréshez',
    effectiveDatePrefix: 'Hatálybalépés dátuma:',
    operatorLabel: 'Üzemeltető: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'A TestLine-ról',
      subtitle:
        'Az ECORZO LLC fejlesztése az átlátható internetsebesség-méréshez és nyilvános IPv4/IPv6-diagnosztikához egy gyors, adatvédelem-barát webalkalmazásban.',
      sections: [
        {
          heading: 'Mit mér a TestLine',
          paragraphs: [
            'A TestLine az ECORZO LLC által üzemeltetett ingyenes böngészős sebességmérő és IP-diagnosztikai eszköz regisztráció nélkül.',
          ],
          bullets: [
            { strong: 'Letöltés & Feltöltés (Mbps / MB/s):', text: 'Párhuzamos HTTP-adatfolyamok a Cloudflare hálózatával Auto, Mbps vagy MB/s módban.' },
            { strong: 'Ping, Jitter & Késleltetés:', text: 'Szekvenciális RTT-mérések az átlagos és minimális pinghez valamint a szóráshoz.' },
            { strong: 'IPv4/IPv6, Hely, ISP & ASN:', text: 'Dual-stack IP-lekérdezés, PTR-név és titkosított DoH-késleltetés.' },
            { strong: 'VPN, Proxy & Adatközpont észlelése:', text: 'Fejlécek, tárhely-ASN, PTR és időzóna vizsgálata.' },
          ],
        },
      ],
      closingTitle: 'Tudásbázis, hírek & céginformáció',
      closingIntro: 'Fedezd fel a',
      closingGuidesLink: '10 sebesség-, IP-, csalás- & VPN-útmutatónkat',
      closingMid: 'vagy olvass élő kiberbiztonsági híreket a',
      closingNewsLink: 'TestLine News RSS-csatornában',
      closingOutro:
        '. A TestLine fejlesztője és üzemeltetője az ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA. Látogass el a',
      closingContactLink: 'Kapcsolat oldalra',
    },
    contact: {
      title: 'Kapcsolatfelvétel: ECORZO LLC',
      subtitle: 'Keresd csapatunkat TestLine diagnosztika, adatvédelem, GDPR vagy megfelelőség ügyében.',
      telephone: 'Telefon',
      addressLabel: 'Bejegyzett székhely',
      copy: 'Másolás',
      copied: 'Másolva',
      formHeading: 'Üzenet küldése',
      sentTitle: 'Megkeresés előkészítve',
      sentBodyPrefix:
        'Köszönjük, {name}. Üzeneted adatait rögzítettük áttekintésre. Sürgős jogi vagy GDPR-ügyben hívd a +1 646 427 6802 számot vagy írj az ECORZO LLC címére: 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Újabb megkeresés küldése',
      nameLabel: 'Teljes név',
      namePlaceholder: 'Kovács János',
      emailLabel: 'E-mail cím',
      emailPlaceholder: 'te@pelda.hu',
      messageLabel: 'Üzenet',
      messagePlaceholder: 'Miben segíthet az ECORZO LLC?',
      submitBtn: 'Üzenet küldése',
      errMissing: 'Kérjük, add meg a nevedet, e-mail címedet és az üzenetet.',
      errInvalidEmail: 'Kérjük, érvényes e-mail címet adj meg.',
    },
    privacy: {
      title: 'Adatvédelmi Irányelvek',
      subtitle:
        'Hogyan kezeli és védi az ECORZO LLC TestLine a diagnosztikai adatokat a Google irányelveivel és az adatvédelmi jogszabályokkal összhangban.',
      sections: [
        {
          heading: '1. Adatkezelő & Hatály',
          paragraphs: [
            'Jelen tájékoztató az ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel.: +1 646 427 6802) által üzemeltetett TestLine használatára vonatkozik a GDPR, CCPA és Google követelmények alapján.',
          ],
        },
        {
          heading: '2. Diagnosztika során kezelt adatok',
          bullets: [
            { strong: 'Hálózati & IP telemetria:', text: 'A nyilvános IPv4/IPv6, ISP, ASN, közelítő hely, PTR és HTTP-fejlécek csak ideiglenesen a memóriában kerülnek feldolgozásra.' },
            { strong: 'Sebességmérések:', text: 'Az eredmények kizárólag helyben, a böngésződben tárolódnak (testline_history_v1).' },
            { strong: 'Böngésző-beállítások:', text: 'A téma (testline_theme), nyelv és hozzájárulás (testline_cookie_consent) helyben kerül mentésre.' },
          ],
        },
        {
          heading: '3. Harmadik felek & Google tájékoztató',
          paragraphs: [
            'Az élő mérésekhez a böngésző közvetlenül kommunikál a Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io) és Ipify (api.ipify.org) szolgáltatásokkal. Google-szolgáltatások esetén érvényes:',
          ],
        },
        {
          heading: '4. Adatértékesítés tilalma & Megőrzés',
          paragraphs: [
            'Az ECORZO LLC nem értékesíti és nem adja bérbe személyes adataidat vagy IP-címedet. A PDF-jelentések teljes egészében az eszközödön készülnek.',
          ],
        },
      ],
      googlePolicyLinkText: 'Hogyan használja fel a Google a szolgáltatásait használó webhelyekről vagy alkalmazásokból származó adatokat',
      rightsPrefix: 'Jogosult vagy hozzáférésre, helyesbítésre, törlésre és a hozzájárulás visszavonására. Tekintsd meg a',
      gdprLinkText: 'GDPR & Adatkezelési Szabályzatot',
      rightsSuffix: 'vagy keresd az ECORZO LLC-t a +1 646 427 6802 számon.',
    },
    disclaimer: {
      title: 'Jogi Nyilatkozat',
      subtitle: 'Fontos korlátok a sebességmérések, az IP-geolokáció és a VPN/proxy-észlelés kapcsán.',
      sections: [
        { heading: '1. Kizárólag tájékoztató és diagnosztikai célra', paragraphs: ['A TestLine „adott állapotban” érhető el, és nem minősül jogilag kötelező vonalkapacitás-tanúsítványnak.'] },
        { heading: '2. Eredményeket befolyásoló tényezők', paragraphs: ['A mért értékeket befolyásolja a Wi-Fi-jel, a router, a háttérforgalom, a VPN-titkosítás és a szolgáltatói peering.'] },
        { heading: '3. IP-geolokáció & proxy-pontosság', paragraphs: ['A város és ISP külső adatbázisokból származik, az IP-blokk bejegyzett helyét jelzi, nem a pontos utcacimet.'] },
        { heading: '4. Felelősség korlátozása', paragraphs: ['A törvény által megengedett mértékig az ECORZO LLC kizárja felelősségét a közvetett károkért.'] },
      ],
    },
    terms: {
      title: 'Felhasználási Feltételek',
      subtitle: 'Az ECORZO LLC TestLine elérésére és használatára vonatkozó szabályok.',
      sections: [
        { heading: '1. Feltételek elfogadása', paragraphs: ['A TestLine használatával elfogadod jelen feltételeket.'] },
        {
          heading: '2. Megengedett & tiltott használat',
          bullets: [
            { text: 'Személyes, oktatási vagy jogszerű vállalati hibaelhárításra használható.' },
            { text: 'Automatizált botok, terheléses támadások, DDoS vagy tömeges adatgyűjtés tilos.' },
            { text: 'Tilos a korlátok megkerülése vagy a jelentések hatósági tanúsítványként való feltüntetése.' },
          ],
        },
        { heading: '3. Szellemi tulajdon', paragraphs: ['A TestLine név, felület és forráskód az ECORZO LLC tulajdona.'] },
        { heading: '4. Irányadó jog', paragraphs: ['New York állam és az Egyesült Államok joga az irányadó.'] },
      ],
    },
    cookiesPolicy: {
      title: 'Süti Szabályzat',
      subtitle: 'A TestLine által használt sütik és böngészőbeli tárolási kulcsok részletes leírása.',
      sec1Title: '1. Mik azok a sütik és a helyi tárolás?',
      sec1Body:
        'A sütik kisméretű szöveges fájlok. A modern webalkalmazások a localStorage-ot is használják a beállítások helyi megőrzésére.',
      sec2Title: '2. A TestLine által használt tárolási kulcsok',
      colKey: 'Kulcs / Azonosító',
      colCategory: 'Kategória',
      colPurpose: 'Cél',
      rows: [
        { key: 'testline_theme', category: 'Alapvető beállítás', purpose: 'Megőrzi a világos vagy sötét módot.' },
        { key: 'testline_unit_v1', category: 'Alapvető beállítás', purpose: 'Tárolja a választott mértékegységet (Auto, Mbps, MB/s).' },
        { key: 'testline_history_v1', category: 'Funkcionális helyi', purpose: 'Helyben tárolja az utolsó 15 sebességmérési eredményt.' },
        { key: 'testline_cookie_consent', category: 'Alapvető hozzájárulás', purpose: 'Rögzíti a Google Consent Mode v2 beállításodat.' },
      ],
      sec3Title: '3. Harmadik felek & Google tájékoztatás',
      sec3Prefix:
        'A Google EU User Consent Policy és Consent Mode v2 értelmében a hirdetési és analitikai tárolás tiltva marad a hozzájárulásodig. A hivatalos eladók listája:',
      sec3Mid: '. A beállításokat bármikor módosíthatod a',
      cookiesNoticeLinkText: 'Süti Értesítés',
      sec3OrVia: 'oldalon vagy a',
      googleAdSettingsText: 'Google Hirdetésbeállításoknál',
    },
    cookiesNotice: {
      title: 'Süti Értesítés & Hozzájárulási Beállítások',
      subtitle: 'Kezeld a TestLine süti- és helyi tárolási beállításaidat.',
      sec1Title: 'Tájékoztató látogatóknak (EGT, Egyesült Királyság, Svájc & Világ)',
      sec1Body:
        'A TestLine szigorúan szükséges tárolást használ a téma, mértékegységek, helyi előzmények és hozzájárulás kezeléséhez. A hirdetési és analitikai sütik alapértelmezésben tiltottak.',
      activeTitle: 'Aktív hozzájárulási választás',
      currentSettingLabel: 'Jelenlegi beállítás:',
      statusAll: 'Minden engedélyezve (Analitika & Hirdetések)',
      statusEssential: 'Csak szigorúan szükségesek',
      statusUnset: 'Még nincs kiválasztva (Opcionálisak tiltva)',
      savedBadge: 'Beállítások mentve',
      acceptAllBtn: 'Összes funkcionális tárolás elfogadása',
      essentialOnlyBtn: 'Csak szükségesek',
      sec2Title: 'Böngésző szintű vezérlők',
      sec2Body: 'A böngésződ adatvédelmi beállításaiban is bármikor letilthatod vagy törölheted a helyi adatokat.',
    },
    gdpr: {
      title: 'GDPR & Adatgyűjtési Irányelvek',
      subtitle: 'Jogalapok, adattakarékosság, nemzetközi adattovábbítás és jogok a GDPR szerint.',
      sections: [
        { heading: '1. Adatkezelő', paragraphs: ['A GDPR szerinti adatkezelő az ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Tel.: +1 646 427 6802).'] },
        {
          heading: '2. Az adatkezelés jogalapjai (6. cikk)',
          bullets: [
            { strong: 'Szerződés / Kért szolgáltatás (6. cikk (1) b)):', text: 'Az IP-cím és az adatfolyam kezelése szükséges a kért mérés teljesítéséhez.' },
            { strong: 'Jogos érdek (6. cikk (1) f)):', text: 'Visszaélések, DDoS elleni védelem és a hálózat megbízhatósága.' },
            { strong: 'Kifejezett hozzájárulás (6. cikk (1) a)):', text: 'A nem alapvető sütik csak a hozzájárulásoddal működnek.' },
          ],
        },
        { heading: '3. Adattakarékosság & Megőrzés', paragraphs: ['Az 5. cikk szerint fiókregisztráció és tartós IP-naplózás nélkül működünk.'] },
        { heading: '4. Nemzetközi adattovábbítás', paragraphs: ['A kérések a legközelebbi Cloudflare vagy Google Cloud csomópontra jutnak SCC garanciákkal.'] },
        {
          heading: '5. Jogaid (15–22. cikk)',
          bullets: [
            { strong: 'Hozzáférés & hordozhatóság:', text: 'Igazolás és másolat kérése.' },
            { strong: 'Helyesbítés & törlés:', text: 'Adatok javítása vagy törlése.' },
            { strong: 'Tiltakozás & korlátozás:', text: 'Hozzájárulás bármikori visszavonása.' },
            { strong: 'Panasztétel:', text: 'Panasz benyújtása az adatvédelmi hatóságnál.' },
          ],
        },
        { heading: '6. Gyermekek adatvédelme', paragraphs: ['A TestLine tudatosan nem gyűjt adatokat 13 év (EGT-ben 16 év) alattiaktól.'] },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Hálózati & Sebességjelentés',
    generated: 'Létrehozva',
    unit: 'Mértékegység',
    secondCopyBanner: 'MÁSODIK PÉLDÁNY  —  Ismételt jelentésletöltés',
    sec1Title: '1. Sebességmérés összefoglaló',
    downloadSpeed: 'Letöltési sebesség',
    uploadSpeed: 'Feltöltési sebesség',
    avgPing: 'Átlagos ping',
    jitter: 'Jitter',
    peak: 'Csúcs',
    sustained: 'Tartós adatfolyam',
    min: 'Min',
    probes: 'mérés',
    rttProbes: 'RTT mérés',
    sec2Title: '2. Proxy & VPN észlelés',
    directClean: 'Közvetlen kapcsolat — Nem észlelhető proxy- vagy VPN-jelzés',
    sec3Title: '3. Hálózati, IP & DNS diagnosztika',
    sec4Title: '4. Munkamenet legutóbbi mérései',
    confidenceWord: 'bizonyosság',
    pageOf: '{p} / {total} oldal',
    secondCopyShort: 'Második példány',
    rowPrimaryIp: 'Elsődleges nyilvános IP',
    rowIpv4: 'IPv4-cím',
    rowIpv6: 'IPv6-cím',
    rowIsp: 'Szolgáltató (ISP)',
    rowAsn: 'Autonóm Rendszer (ASN)',
    rowLocation: 'Körülbelüli hely',
    rowTimezone: 'Időzóna',
    rowPtr: 'Fordított DNS (PTR)',
    rowDoh: 'DoH-feloldó próba',
    rowProtocol: 'Átviteli protokoll',
    rowLinkHint: 'Böngésző kapcsolatjelző',
    notDetected: 'Nem észlelhető',
    noPtr: 'Nincs PTR-rekord',
    reachable: 'Elérhető',
    unreachable: 'Elérhetetlen',
    notExposed: 'A böngésző nem teszi közzé',
    available: 'Elérhető',
    colTime: 'Idő',
    colDownload: 'Letöltés',
    colUpload: 'Feltöltés',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Nyilvános IP',
  },
};
