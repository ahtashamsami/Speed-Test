import type { TranslationPack } from '../types';

export const fiPack: TranslationPack = {
  meta: {
    lang: 'fi',
    intlLocale: 'fi-FI',
    dir: 'ltr',
    nativeName: 'Suomi',
  },
  seo: {
    home: {
      title: 'TestLine — Internetin nopeustesti & Julkinen IP-haku',
      description:
        'Testaa lataus- ja lähetysnopeutesi, ping ja jitter sekä tarkista julkinen IPv4/IPv6-osoitteesi, operaattorisi sijainti, DNS-viive ja VPN-tila.',
      keywords:
        'nopeustesti, mikä on ip-osoitteeni, julkinen ip-osoite, latausnopeus, lähetysnopeus, ping-testi, viive, jitter, ipv4, ipv6, vpn-tarkistus',
      breadcrumbLabel: 'Nopeustesti',
    },
    news: {
      title: 'Kyberturvallisuus-, Verkko- & Tekniikkauutiset | TestLine',
      description:
        'Lue reaaliaikaisia RSS-uutisia kyberturvallisuudesta, laajakaistoista, DNS:stä, BGP:stä ja teknologiasta lähteistä Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch ja Ars Technica.',
      keywords: 'kyberturvallisuus uutiset, verkkoturva rss, tekniikkauutiset',
      breadcrumbLabel: 'Uutiset',
    },
    blog: {
      title: 'Oppaat internetin nopeudesta, IP-osoitteista & VPN:stä | TestLine',
      description:
        'Tutustu 10 asiantuntijaoppaaseen internetin nopeudesta, Mbps vs. MB/s -erosta, IPv4- ja IPv6-osoitteista, IP-huijauksista, sijainnista, bufferbloatista ja VPN-tunnistuksesta.',
      keywords: 'internetin nopeus opas, mbps vs mbs, ping ja jitter, ipv4 vs ipv6, cgnat, ip-huijaus',
      breadcrumbLabel: 'Blogi',
    },
    about: {
      title: 'Tietoja TestLinesta — Nopeustesti & IP-diagnostiikka',
      description:
        'Opi, miten ECORZO LLC:n TestLine mittaa lataus- ja lähetyskaistan, pingin, jitterin, dual-stack IPv4/IPv6-reitityksen, DoH DNS-viiveen sekä VPN- ja välityspalvelinsignaalit.',
      keywords: 'tietoja testlinesta, ecorzo llc, nopeustestin menetelmä, ip-diagnostiikka',
      breadcrumbLabel: 'Tietoja',
    },
    privacy: {
      title: 'Tietosuojakäytäntö — Kertaluonteinen IP & Nopeustesti | TestLine',
      description:
        'Lue ECORZO LLC:n TestLine-tietosuojakäytäntö väliaikaisesta IP-käsittelystä, nopeuslokien tallentamattomuudesta, GDPR:stä ja evästeistä.',
      keywords: 'testline tietosuoja, ecorzo llc tietosuojakäytäntö, gdpr nopeustesti',
      breadcrumbLabel: 'Tietosuoja',
    },
    contact: {
      title: 'Ota yhteyttä TestLineen & ECORZO LLC:hen — Verkkotuki',
      description:
        'Ota yhteyttä ECORZO LLC:hen TestLine-nopeustestiä, IP-hakua, tietosuojaa tai GDPR:ää koskevissa asioissa. Soita +1 646 427 6802 tai kirjoita New Yorkin toimistoomme.',
      keywords: 'ota yhteyttä testline, ecorzo llc new york, verkkodiagnostiikka tuki',
      breadcrumbLabel: 'Yhteystiedot',
    },
    disclaimer: {
      title: 'Vastuuvapauslauseke — Nopeustesti & IP-haku | TestLine',
      description:
        'Ymmärrä nopeustestin muuttujat, Wi-Fi-pullonkaulat, IP-paikannuksen tarkkuusrajat ja VPN/välityspalvelintunnistus TestLinessa.',
      keywords: 'nopeustesti vastuuvapaus, ip paikannus tarkkuus, testline ecorzo llc',
      breadcrumbLabel: 'Vastuuvapaus',
    },
    terms: {
      title: 'Käyttöehdot — TestLine / ECORZO LLC',
      description:
        'Lue käyttöehdot, jotka koskevat ECORZO LLC:n tarjoaman TestLine-nopeustestin ja julkisen IP-diagnostiikan käyttöä.',
      keywords: 'testline käyttöehdot, ecorzo llc ehdot, hyväksyttävä käyttö',
      breadcrumbLabel: 'Käyttöehdot',
    },
    'cookies-policy': {
      title: 'Evästekäytäntö & Paikallinen tallennus — TestLine',
      description:
        'Tarkastele tarkat selaimen paikallisen tallennuksen avaimet ja evästetiedot, joita ECORZO LLC:n TestLine käyttää GDPR:n mukaisesti.',
      keywords: 'testline evästekäytäntö, localstorage, google consent mode v2',
      breadcrumbLabel: 'Evästekäytäntö',
    },
    'cookies-notice': {
      title: 'Evästeilmoitus & Suostumusasetukset — TestLine',
      description:
        'Hallitse ECORZO LLC:n TestLinen eväste-, analytiikka- ja paikallisen tallennuksen suostumusasetuksia milloin tahansa.',
      keywords: 'evästeilmoitus, hallitse evästeitä, testline tietosuoja-asetukset',
      breadcrumbLabel: 'Evästeasetukset',
    },
    gdpr: {
      title: 'GDPR & Tiedonkeruukäytäntö — TestLine',
      description:
        'Tutustu ECORZO LLC:n GDPR 6 artiklan mukaisiin käsittelyperusteisiin, tietojen minimointiin, kansainvälisiin siirtoihin ja oikeuksiin.',
      keywords: 'testline gdpr käytäntö, ecorzo llc tietosuoja, artikla 6',
      breadcrumbLabel: 'GDPR & Tietosuoja',
    },
  },
  nav: {
    speedTest: 'Nopeustesti',
    news: 'Uutiset',
    blog: 'Blogi',
    about: 'Tietoja',
    contact: 'Yhteystiedot',
    privacy: 'Tietosuoja',
    stopTest: 'Pysäytä testi',
    newBadgeSuffix: 'uutta',
    homeAria: 'TestLine Etusivu',
    primaryNavAria: 'Päävalikko',
    mobileNavAria: 'Mobiilivalikko',
    companyMenuAria: 'TestLine-valikko: Tietoja, Yhteystiedot ja Tietosuoja',
  },
  pwa: {
    installApp: 'Asenna sovellus',
    installAria: 'Asenna TestLine-sovellus',
    installIosAria: 'Asenna TestLine iPhonelle tai iPadille',
    iosTitle: 'Asenna TestLine iPhonelle / iPadille',
    closeDialog: 'Sulje valintaikkuna',
    iosStep1Prefix: 'Napauta',
    iosStep1Strong: 'Jaa',
    iosStep1Suffix: '-painiketta Safarin työkalupalkissa.',
    iosStep2Prefix: 'Vieritä alas ja napauta',
    iosStep2Strong: 'Lisää Koti-valikkoon',
    iosStep2Suffix: '.',
    iosStep3:
      'Avaa TestLine milloin tahansa — myös ilman nettiä Signal Runner -peli käynnistyy automaattisesti.',
    gotIt: 'Selvä',
  },
  hero: {
    title: 'Internetin nopeustesti & Julkinen IP-haku',
    subtitle:
      'Tarkista lataus- ja lähetysnopeus, ping ja jitter — sekä IPv4/IPv6-osoitteesi, operaattorin sijainti, DNS-viive ja VPN-tila.',
    speedUnitAria: 'Nopeusyksikkö',
    autoTooltip: 'Käyttää automaattisesti yksikköä Mbps alle 100 Mbps nopeuksissa ja MB/s siitä ylöspäin',
    auto: 'Auto',
    lightMode: 'Vaalea tila',
    darkMode: 'Tumma tila',
    switchToLight: 'Vaihda vaaleaan tilaan',
    switchToDark: 'Vaihda tummaan tilaan',
    exportPdf: 'Vie PDF',
    exportingPdf: 'Viedään...',
    exportDisabledTitle: 'Käynnistä nopeustesti ensin viedäksesi PDF-raportin',
    exportEnabledTitle: 'Vie nopeus- ja verkkodiagnostiikan PDF-raportti',
  },
  duplicateModal: {
    title: 'Raportti on jo ladattu',
    closeDialog: 'Sulje valintaikkuna',
    body: 'Olet jo ladannut raportin tästä testiajosta. Haluatko ladata sen uudelleen?',
    notePrefix: 'Uudelleen viedyt kopiot merkitään selkeästi tekstillä',
    secondCopy: 'Toinen kopio',
    noteSuffix: 'raporttiin.',
    cancel: 'Ei, peruuta',
    confirm: 'Kyllä, lataa uudelleen',
  },
  speedStage: {
    startSpeedTest: 'Aloita nopeustesti',
    yourSpeedIs: 'Internet-nopeutesi on',
    stopAria: 'Pysäytä nopeustesti',
    startAria: 'Aloita nopeustesti',
    retry: 'Yritä uudelleen',
    statusIdle: 'Napsauta Toista aloittaaksesi testin',
    statusPing: 'Mitataan pingiä & jitteriä...',
    statusDownload: 'Testataan latausnopeutta...',
    statusUpload: 'Testataan lähetysnopeutta...',
    statusComplete: 'Nopeustesti valmis',
    statusStopped: 'Testi pysäytetty',
    statusError: 'Testi keskeytyi',
    uploadSpeed: 'Lähetysnopeus',
    peakPrefix: 'Huippu',
    twoStreams: '2 rinnakkaista virtaa',
    latencyAvgPing: 'Viive (Keskim. ping)',
    minPrefix: 'Min',
    probesSuffix: 'mittausta',
    fiveProbes: '5 Cloudflaren RTT-mittausta',
    jitter: 'Jitter',
    consecutiveVariance: 'Pakettien välinen vaihtelu',
    waitingRtt: 'Odotetaan RTT-näytteitä',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Ilmoitus välityspalvelimen tai VPN:n tunnistuksesta',
    categories: {
      'VPN / Proxy Detected': 'VPN / Välityspalvelin havaittu',
      'Datacenter / Relay Network': 'Konesali / Välitysverkko',
      'Timezone Mismatch (Possible VPN)': 'Aikavyöhyke-ero (Mahdollinen VPN)',
      'Direct Connection': 'Suora yhteys',
    },
    confidence: {
      High: 'Korkea',
      Moderate: 'Kohtalainen',
      Low: 'Matala',
    },
    confidenceWord: 'varmuus',
    signalSingular: 'signaali',
    signalPlural: 'signaalia',
    noticeDesc:
      'Yhteytesi osoittaa välityspalvelimen, VPN:n tai konesalireleen piirteitä. Nopeusmittaukset kuvaavat aktiivista tunnelia tai poistumissolmua.',
    observedExitIp: 'Havaittu ulostulo-IP',
    relayOperator: 'Välittäjä / Operaattori',
    exitLocationTz: 'Ulostulopaikka & aikavyöhyke',
    detectedIndicators: 'Havaitut indikaattorit',
    unavailable: 'Ei saatavilla',
    signalTemplates: {
      proxy_flag: 'IP-osoite on merkitty aktiiviseksi välityspalvelin-, VPN- tai Tor-solmuksi',
      hosting_flag:
        'Liikenne tulee konesali- tai palvelin-ASN:stä kuluttajaoperaattorin sijaan',
      provider_keyword: 'Verkko-operaattori / PTR vastaa välitysavainsanaa ({1})',
      via_header: 'Välityspalvelimen edelleenlähetysotsikko havaittu ({1})',
      multi_hop: 'Useita välityshyppyjä havaittu ({1} hyppyä)',
      ip_mismatch: 'Suora selaimen IP poikkeaa reunapalvelimen näkemästä IP:stä (jaettu tunneli tai välityspalvelin)',
      timezone_mismatch:
        'Selaimen aikavyöhyke ({1}) poikkeaa IP-paikannuksen aikavyöhykkeestä ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Julkinen IP-osoite',
    resolvingRoute: 'Selvitetään reittiä',
    routeSuffix: 'reitti',
    updatedPrefix: 'Päivitetty',
    unavailable: 'Ei saatavilla',
    metadataUnavailable: 'Verkon metatiedot eivät ole saatavilla',
    copyIp: 'Kopioi IP',
    copiedIp: 'IP kopioitu',
    refresh: 'Päivitä',
    ipv46CardTitle: 'IPv4, IPv6 & Operaattorireititys',
    ipv46CardSubtitle: 'Dual-stack-asiakasmittaukset yhdistettynä IP-paikannukseen',
    ipv4Label: 'IPv4-osoite',
    ipv6Label: 'IPv6-osoite',
    notDetected: 'Ei havaittu',
    ipv6NotDetected: 'Ei havaittu (vain IPv4-reitti)',
    ispLabel: 'Internet-operaattori (ISP)',
    asnLabel: 'Autonominen järjestelmä (ASN)',
    locationLabel: 'Arvioitu sijainti',
    proxyCheckLabel: 'Välityspalvelin / VPN -tarkistus',
    resolving: 'Selvitetään...',
    inspecting: 'Tarkistetaan...',
    directConnectionNone: 'Suora yhteys (Ei havaittu)',
    dnsCardTitle: 'DNS-vihjeet & Yhteysdiagnostiikka',
    dnsCardSubtitle: 'Käänteinen PTR-tietue, DoH-tavoitettavuus ja siirtoprotokollasignaalit',
    ptrLabel: 'Käänteinen DNS (PTR)',
    noPtr: 'Ei julkaistua PTR-tietuetta',
    dohProbeLabel: 'DoH-nimipalvelintesti',
    probing: 'Testataan...',
    reachable: 'Tavoitettavissa',
    blockedOrUnreachable: 'Estetty tai tavoittamattomissa',
    dnsLatencyLabel: 'DNS-kyselyviive',
    protocolLabel: 'Siirtoprotokolla',
    checking: 'Tarkistetaan...',
    linkHintLabel: 'Selaimen yhteysvihje',
    exposedNoMetrics: 'Saatavilla ilman mittareita',
    notExposed: 'Selain ei jaa tietoa',
    timezoneLabel: 'Aikavyöhyke',
    copy: 'Kopioi',
    copied: 'Kopioitu',
    capSuffix: 'Mbps enimmäisarvo',
    rttSuffix: 'ms RTT',
    fetchError: 'IP-diagnostiikkapisteisiin ei saada yhteyttä.',
  },
  history: {
    title: 'Istunnon mittaushistoria',
    subtitle: 'Viimeisimmät tulokset tallennettu paikallisesti selaimeesi',
    clearHistory: 'Tyhjennä historia',
    emptyText: 'Valmiit nopeustestit näkyvät tässä, jotta voit vertailla peräkkäisiä tuloksia.',
    colTime: 'Aika',
    colDownload: 'Lataus',
    colUpload: 'Lähetys',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Julkinen IP',
  },
  consent: {
    title: 'Eväste- & Tietosuojailmoitus',
    description:
      'TestLine käyttää välttämätöntä paikallista tallennusta teemaa, yksiköitä ja historiaa varten. Valinnaiset analytiikka- ja mainosevästeet pysyvät pois päältä, ellet hyväksy niitä.',
    acceptAll: 'Hyväksy kaikki',
    essentialOnly: 'Vain välttämättömät',
    cookieSettings: 'Evästeasetukset',
  },
  footer: {
    byEcorzo: 'by ECORZO LLC',
    tagline:
      'Reaaliaikainen internetin nopeustesti ja dual-stack IP-verkkodiagnostiikka, operaattorina ECORZO LLC.',
    companyHeading: 'Yritys',
    legalHeading: 'Ehdot & Vaatimustenmukaisuus',
    disclaimer: 'Vastuuvapauslauseke',
    terms: 'Käyttöehdot',
    cookiesPolicy: 'Evästekäytäntö',
    cookiesNotice: 'Evästeilmoitus',
    gdpr: 'GDPR & Tiedonkeruu',
    privacy: 'Tietosuojakäytäntö',
    copyrightSuffix: 'ECORZO LLC. Kaikki oikeudet pidätetään.',
    poweredBy:
      'Mittaukset tarjoaa Cloudflare · GDPR- ja Google-käytäntöjen mukainen',
    languageLabel: 'Kieli',
    autoOption: 'Auto (Alue)',
  },
  news: {
    eyebrow: 'Reaaliaikainen kyberturva- & tekniikka-RSS-syöte',
    updatedPrefix: 'Päivitetty',
    title: 'Verkko-, tietoturva- & tekniikkauutiset',
    filterPlaceholder: 'Suodata otsikoita...',
    filterAria: 'Suodata uutisotsikoita',
    refreshFeeds: 'Päivitä syötteet',
    refreshing: 'Päivitetään...',
    cachedBannerPrefix:
      'Live RSS-syötteet eivät ole tällä hetkellä tavoitettavissa. Näytetään tälle laitteelle tallennettuja välimuistiuutisia',
    retryLive: 'Yritä live-syötteitä',
    retrying: 'Yritetään...',
    allSources: 'Kaikki lähteet',
    errorFallback:
      'Live RSS-syötteiden lataaminen ei onnistu juuri nyt. Tarkista verkkoyhteytesi ja yritä päivittää.',
    tryAgain: 'Yritä uudelleen',
    emptyText: 'Nykyisistä RSS-syötteistä ei löytynyt vastaavia uutisia.',
    showAll: 'Näytä kaikki syötteet',
    newTag: 'Uusi',
    readFullStory: 'Lue koko juttu',
    recent: 'Äskettäin',
    minutesAgo: '{n} min sitten',
    hoursAgo: '{n} t sitten',
  },
  blog: {
    eyebrow: 'TestLine-oppaat & Päivän kuumat uutiset',
    articlesCountSuffix: 'Artikkelia',
    title: 'Internetin nopeus, IP-diagnostiikka & Päivän katsaukset',
    subtitle:
      'Syvällisiä oppaita internetin nopeudesta, IPv4/IPv6-osoitteista, IP-huijauksista, IP-paikannuksesta ja VPN-tunnistuksesta — sekä 2 päivittäin kuratoitua huippu-uutista live RSS-syötteistämme.',
    searchPlaceholder: 'Hae {n} artikkelista...',
    searchAria: 'Hae blogiartikkeleita',
    allLabel: 'Kaikki',
    hotNewsLabel: 'Kuumat uutiset',
    dailyHotNewsBadge: 'Päivän kuuma uutinen',
    emptyText: 'Nykyisellä suodattimella ei löytynyt artikkeleita.',
    resetFilters: 'Nollaa suodattimet',
    newTag: 'Uusi',
    readArticle: 'Lue artikkeli',
    backToAllPrefix: 'Takaisin kaikkiin',
    backToAllSuffix: 'artikkeliin',
    originalSourcePrefix: 'Alkuperäinen lähde',
    testConnectionNow: 'Testaa yhteytesi nyt',
    keyTakeaways: 'Keskeiset kohdat',
    dailyReadTime: '3 min lukuaika',
    dailyAuthorPrefix: 'TestLine Päiväkatsaus · lähde',
    dailyTakeawayFeatured: 'Mukana TestLinen päivittäisessä uutiskatsauksessa ({source}), aiheena {topic}.',
    dailyTakeawaySummaryPrefix: 'Päätiivistelmä:',
    dailyTakeawayTip:
      'Tarkista aina aktiivinen julkinen IPv4/IPv6-osoitteesi, DNS-viive ja VPN/välityspalvelintila ennen odottamattomien yhteyshälytysten selvittämistä.',
    dailySectionBriefingPrefix: 'Päiväkatsaus:',
    dailyBriefingPara2:
      'Valittu automaattisesti päivämäärän {date} TestLine-katsaukseen ajankohtaisuuden ja verkko-/tietoturvavaikutuksen perusteella. Alkuperäinen tekninen raportti on luettavissa yllä olevasta lähdelinkistä.',
    dailySectionActionTitle: 'Verkkodiagnostiikka & Käytännön toimet',
    dailyActionPara1:
      'Aiheeseen {topic} liittyvät tapahtumat heijastuvat usein operaattorien DNS-palvelimiin, reititystauluihin, yritys-VPN-yhdyskäytäviin ja päätelaitteisiin. Nopeustesti ja dual-stack IP-tarkistus vahvistavat nopeasti, esiintyykö linjassasi kohonnutta jitteriä tai poikkeavia reittejä.',
    dailyActionPara2:
      'Pysy ajan tasalla uusista haavoittuvuuksista ja laajakaistatiedotteista seuraamalla Uutiset-välilehden syötteitä ja blogin oppaita.',
    categories: {
      'Hot News': 'Kuumat uutiset',
      'Internet Speed': 'Internetin nopeus',
      'IP Addresses': 'IP-osoitteet',
      'IP Scams': 'IP-huijaukset',
      'IP Location': 'IP-sijainti',
      'VPN IP Status': 'VPN IP -tila',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Miksi todellinen latausnopeutesi eroaa operaattorin liittymälupauksesta',
        readTime: '5 min lukuaika',
        author: 'TestLine Tekniikka',
        summary:
          'Opi miksi 500 Mbps -liittymä lataa tiedostoja usein 50–60 MB/s nopeudella, miten TCP/TLS-kehykset vaikuttavat ja miksi rinnakkaisvirrat voittavat yksittäisen siirron.',
        keyTakeaways: [
          'Operaattorit ilmoittavat nopeudet megabitteinä sekunnissa (Mbps), kun taas selaimet näyttävät megatavuja sekunnissa (MB/s) suhteessa 8:1.',
          'Wi-Fi-etäisyys, 2,4 GHz ruuhka ja vanhemmat reitittimet rajoittavat gigabitin valokuitua usein ennen operaattoria.',
          'Rinnakkaiset HTTP-virrat paljastavat todellisen kokonaiskaistan yksittäistä TCP-latausta tarkemmin.',
        ],
        sections: [
          {
            heading: 'Megabitti (Mbps) vs. Megatavu (MB/s)',
            paragraphs: [
              'Suurin hämmennyksen aihe nopeutta testattaessa on bittien ja tavujen ero. Koska 1 tavussa on 8 bittiä, 400 Mbps -kuituliittymän teoreettinen maksimisiirtonopeus on 50 MB/s.',
              'Kun Ethernet-, IP- ja TLS-salausotsikot vähennetään, todellinen hyötykuorma on tyypillisesti 90–94 % liittymän nimellisnopeudesta.',
            ],
          },
          {
            heading: 'Miksi monivirtainen testi on tärkeä',
            paragraphs: [
              'Yksittäistä latausyhteyttä rajoittaa helposti TCP-ikkunointi ja viive kaukaiselle palvelimelle. Kolme rinnakkaista latausvirtaa kuormittaa linjaa tasaisesti.',
              'Jos Wi-Fi- ja kaapelitulos eroavat suuresti, testaa lähellä 5/6 GHz tukiasemaa tai Cat6-kaapelilla.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter selitettynä: Mikä oikeasti pilaa videopuhelut ja pelit',
        readTime: '5 min lukuaika',
        author: 'TestLine Tekniikka',
        summary:
          'Suuri latauskaista ei pelasta Zoom-puhelua tai verkkopeliä, jos viive heittelee epätasaisesti. Katso miten ping, jitter ja bufferbloat vaikuttavat.',
        keyTakeaways: [
          'Ping mittaa edestakaisen viiveen (RTT) millisekunteina; alle 30 ms tuntuu välittömältä.',
          'Jitter mittaa peräkkäisten pakettien saapumisvaihtelua — yli 20–25 ms jitter pätkii äänen.',
          'Suuret lähetykset puhelun aikana aiheuttavat bufferbloatia ilman reitittimen SQM/QoS-hallintaa.',
        ],
        sections: [
          {
            heading: 'Viive on edestakainen vasteaika',
            paragraphs: [
              'Kaistanleveys kertoo tien leveyden, kun taas ping mittaa yksittäisen paketin matka-ajan palvelimelle ja takaisin. 4K-video puskuroi sekunteja etukäteen, mutta puhelut reagoivat joka millisekuntiin.',
            ],
          },
          {
            heading: 'Miksi jitter saa äänen pätkimään',
            paragraphs: [
              'Jos viisi peräkkäistä mittausta ovat 14, 16, 92, 15 ja 68 ms, keskiarvo näyttää hyvältä, mutta reaaliaikainen puhekoodekki joutuu pudottamaan paketteja.',
              'Smart Queue Management (SQM) estää taustavarmuuskopioita tukkimasta reaaliaikaliikennettä.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6 selitettynä: Miksi dual-stack-verkot ovat tärkeitä tänään',
        readTime: '6 min lukuaika',
        author: 'TestLine Verkkotutkimus',
        summary:
          'IPv4-osoitteiden loputtua ja mobiilioperaattorien siirryttyä CGNATiin on tärkeää ymmärtää, miten laitteesi reitittää IPv4- ja IPv6-liikenteen.',
        keyTakeaways: [
          'IPv4 käyttää 32-bittisiä osoitteita (~4,3 miljardia), minkä vuoksi operaattorit jakavat osoitteita CGNATin kautta.',
          'IPv6 käyttää 128-bittisiä osoitteita, palauttaen suoran päästä-päähän-reitityksen ilman monikerroksista NATia.',
          'Dual-stack-testi tarkistaa, onko laitteellasi sekä IPv4- että IPv6-reitti samanaikaisesti.',
        ],
        sections: [
          {
            heading: 'IPv4-pula ja CGNAT käytännössä',
            paragraphs: [
              'Koska vapaat IPv4-lohkot ovat loppuneet, monet kuitu- ja 5G-operaattorit sijoittavat asiakkaat CGNATin taakse, jossa sadat käyttäjät jakavat yhden ulkoisen IPv4-osoitteen.',
            ],
          },
          {
            heading: 'Miten dual-stack nopeuttaa yhteyksiä',
            paragraphs: [
              'Dual-stack-verkossa modernit käyttöjärjestelmät suosivat IPv6:tta Happy Eyeballs -menetelmällä, välttäen ylimääräisiä CGNAT-käännöksiä.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'Julkinen IP vs. Yksityinen IP & Miten käänteinen DNS (PTR) tunnistaa operaattorin',
        readTime: '4 min lukuaika',
        author: 'TestLine Verkkotutkimus',
        summary:
          'Miksi puhelimen Wi-Fi näyttää osoitetta 192.168.1.45, vaikka sivustot näkevät täysin eri julkisen IP:n — ja mitä PTR paljastaa operaattoristasi.',
        keyTakeaways: [
          'Yksityiset RFC 1918 -alueet (10.x, 172.16–31.x, 192.168.x) toimivat vain koti- tai toimistoverkossa.',
          'Reititin vaihtaa yksityisen osoitteen operaattorin julkiseen IP:hen NAT-muunnoksella.',
          'Käänteinen DNS (PTR) liittää julkisen IP:n palvelinnimeen, joka kuvaa usein aluetta ja liittymätyyppiä.',
        ],
        sections: [
          {
            heading: 'Reitittimen sisällä vs. julkisessa internetissä',
            paragraphs: [
              'Sisäverkko-osoite 192.168.1.24 ei reitity internetiin. Liikenteen lähtiessä reititin korvaa lähdeosoitteen julkisella WAN-IP:lläsi.',
            ],
          },
          {
            heading: 'Käänteisen DNS:n (PTR) vihjeet',
            paragraphs: [
              'Operaattorit julkaisevat IP-osoitealueilleen kuvaavia PTR-nimiä, joita käytetään yhdessä ASN-tietojen kanssa erottamaan kotikuitu pilvipalvelimista.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Näin tunnistat valheelliset "IP-osoitteesi on hakkeroitu" -ponnahdusikkunat',
        readTime: '5 min lukuaika',
        author: 'TestLine Tietoturva',
        summary:
          'Huijausikkunat väläyttävät oikeaa IP-osoitettasi ja kaupunkiasi paniikin luomiseksi. Opi miksi jokainen sivusto näkee IP:si automaattisesti.',
        keyTakeaways: [
          'Jokainen avaamaasi verkkosivu saa julkisen IP:si HTTP-reitityksen mukana — sen näyttäminen ei todista murtoa.',
          'Tekevirushälytykset yrittävät saada uhrin soittamaan huijausnumeroon tai asentamaan etähallinnan.',
          'Pelkkä IP ei paljasta nimeäsi, katuosoitettasi, pankkitunnuksia tai tiedostoja.',
        ],
        sections: [
          {
            heading: 'Miksi IP:n näyttäminen on psykologinen temppu',
            paragraphs: [
              'Haitalliset mainosohjaukset näyttävät punaisia varoituksia kaupungillasi ja IP:lläsi. Palvelin tarvitsee IP-osoitteesi pelkästään sivun lähettämiseen.',
            ],
          },
          {
            heading: 'Mitä IP-osoite todella paljastaa — ja mitä ei',
            paragraphs: [
              'Julkinen IP osoittaa vain operaattorin solmupisteen ja laajan kaupunkialueen. Sulje välilehti äläkä anna AnyDesk- tai TeamViewer-etäyhteyttä tuntemattomille.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP-väärennös, otsikkoväärennökset & kotiosoitteiden välityspalvelinhuijaukset',
        readTime: '6 min lukuaika',
        author: 'TestLine Tietoturva',
        summary:
          'Väärennetyistä X-Forwarded-For-otsikoista aina haittaohjelmiin ja "ilmaisiin VPN-sovelluksiin", jotka vuokraavat kotiyhteyttäsi eteenpäin.',
        keyTakeaways: [
          'Raaka IP-lähettäjäväärennös ei läpäise HTTPS-kättelyä, joten hyökkääjät hyödyntävät kaapattuja laitteita ja ilmaisia välitys-SDK:ita.',
          'Jotkin ilmaiset laajennukset ja APK-tiedostot ohjaavat muiden liikennettä koti-IP:si kautta.',
          'PTR-, ASN- ja edelleenlähetysotsikoiden tarkistus varmistaa puhtaan reitityksen.',
        ],
        sections: [
          {
            heading: '"Ilmaisten" välityssovellusten piilokustannus',
            paragraphs: [
              'Koti-IP-osoitteilla on korkea luottamus. Epäilyttävät ilmaissovellukset saattavat salaa käyttää yhteyttäsi mainos- tai kaavintaliikenteen ulostulosolmuna.',
            ],
          },
          {
            heading: 'Puhtaan ulosmenevän reitin varmistaminen',
            paragraphs: [
              'Tarkista säännöllisesti selainlaajennukset, reitittimen UPnP-asetukset ja aja IP- sekä välityspalvelindiagnostiikka.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Miten IP-paikannus toimii — ja miksi kaupunki on usein väärä',
        readTime: '5 min lukuaika',
        author: 'TestLine Verkkotutkimus',
        summary:
          'IP-osoitteet eivät sisällä GPS-koordinaatteja. Katso miten GeoIP-tietokannat kartoittavat IP-alueita ja miksi mobiiliyhteys näkyy toisessa kaupungissa.',
        keyTakeaways: [
          'IP-paikannus perustuu RIR-rekistereihin, BGP-reititykseen ja operaattoritietoihin GPS:n sijaan.',
          'Mobiilioperaattorit ohjaavat LTE- ja 5G-liikenteen keskitettyjen yhdyskäytävien kautta satojen kilometrien päähän.',
          'Maatason tarkkuus on yli 98 %, mutta katutason tarkkuus IP:stä on myytti.',
        ],
        sections: [
          {
            heading: 'IP-paketeissa ei ole GPS:ää',
            paragraphs: [
              'Toisin kuin älypuhelimen GPS, verkkosivut päättelevät IP-sijainnin WHOIS-tietueista ja operaattorien reititystaulukoista.',
            ],
          },
          {
            heading: 'Miksi mobiili- ja kuitu-IP:n kaupunki vaihtuu',
            paragraphs: [
              'Jos 5G-liikenne kulkee Helsingin runkokeskuksen kautta käyttäessäsi nettiä Tampereella, työkalut raportoivat Helsingin kunnes GeoIP päivittyy.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Aikavyöhyke-ero & Operaattorireititys: Miksi sivustot sijoittavat sinut väärin',
        readTime: '4 min lukuaika',
        author: 'TestLine Verkkotutkimus',
        summary:
          'Miksi petossuodattimet vertaavat selaimesi kelloa IP-osoitteen aikavyöhykkeeseen — ja milloin tavallinen reititys aiheuttaa vääriä hälytyksiä.',
        keyTakeaways: [
          'Maksujärjestelmät vertaavat selaimen Intl-aikavyöhykettä IP-sijainnin aikavyöhykkeeseen.',
          'Yritys-VPN tai verkkovierailu (roaming) aiheuttaa harmittomia aikavyöhyke-eroja.',
          'TestLine näyttää sekä selaimen että IP:n aikavyöhykkeen rinnakkain.',
        ],
        sections: [
          {
            heading: 'Miten selain vs. IP -aikavyöhyketarkistus toimii',
            paragraphs: [
              'Passiivinen vertailu tarkistaa, täsmääkö laitteen järjestelmäaika IP-osoitteen maantieteellisen vyöhykkeen kanssa.',
            ],
          },
          {
            heading: 'Väärät hälytykset rajoilla ja matkoilla',
            paragraphs: [
              'Matkustajien roaming-yhteys kulkee usein kotimaan yhdyskäytävän kautta, säilyttäen kotimaan IP-aikavyöhykkeen.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Miten verkkosivustot tunnistavat VPN-, välityspalvelin- ja konesali-IP:t',
        readTime: '6 min lukuaika',
        author: 'TestLine Tietoturva',
        summary:
          'Mietitkö, miksi pankit ja suoratoistopalvelut huomaavat VPN:n päälläolon? Tässä neljä teknistä merkkiä.',
        keyTakeaways: [
          'ASN erottaa pilvipalveluntarjoajat (M247, DigitalOcean, Hetzner, AWS) heti kuluttajaoperaattoreista.',
          'Via- ja monihyppyiset X-Forwarded-For-otsikot paljastavat läpinäkyvät välityspalvelimet.',
          'PTR-mallit ja aikavyöhyke-erot vahvistavat tunnistusta.',
        ],
        sections: [
          {
            heading: 'ASN-luokittelu: Vahvin signaali',
            paragraphs: [
              'Jokainen IP kuuluu ASN-verkkoon. Koska VPN-palvelut vuokraavat palvelimia konesaleista, liikenne tunnistetaan konesaliverkoksi millisekunneissa.',
            ],
          },
          {
            heading: 'PTR-nimet, otsikot ja käytös',
            paragraphs: [
              'Yhdistämällä ASN:n, PTR-avainsanat, välitysotsikot ja aikavyöhykkeet näet selkeästi, mitä tunnelisi paljastaa.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'DNS-vuodot, IPv6-vuodot & Jaettu tunnelointi: Todellisen VPN-tilan testaus',
        readTime: '5 min lukuaika',
        author: 'TestLine Tietoturva',
        summary:
          'Vaikka VPN olisi kytkettynä, salaamaton DNS tai tunneloimaton IPv6 voi paljastaa sijaintisi. Opi tarkistamaan tunneli.',
        keyTakeaways: [
          'IPv6-vuoto tapahtuu, kun VPN tunneloi vain IPv4:n ja operaattori reitittää IPv6:n suoraan.',
          'DNS-vuoto lähettää verkkotunnuskyselyt paikalliselle operaattorille tunnelin ohi.',
          'IPv4/IPv6-reittien ja Cloudflare DoH:n testaus varmistaa tunnelin tiiviyden.',
        ],
        sections: [
          {
            heading: 'Dual-stackin IPv6-vuotoloukku',
            paragraphs: [
              'Monet vanhemmat VPN-ohjelmat luovat vain IPv4-liittymän. Nykyaikaisessa verkossa selain käyttää tällöin IPv6-yhteyttä suoraan operaattorin kautta.',
            ],
          },
          {
            heading: 'Tunnelin kunnon tarkistaminen sekunneissa',
            paragraphs: [
              'Aja uusi testi TestLinessa VPN päällä ja varmista, että molemmat IP-osoitteet kuuluvat VPN-ulostuloon ja DoH toimii puhtaasti.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet-yhteys palautui',
    offlineMode: 'Offline-tila — Internet katkaistu',
    connectionActive: 'Yhteys on jälleen aktiivinen',
    playWhileWaiting: 'Pelaa Signal Runneria odottaessasi yhteyden palautumista',
    score: 'Pisteet',
    best: 'Ennätys',
    muteAria: 'Mykistä pelin äänet',
    unmuteAria: 'Ota pelin äänet käyttöön',
    pauseAria: 'Keskeytä peli',
    resumeAria: 'Jatka peliä',
    returnToSpeedTest: 'Palaa nopeustestiin',
    checking: 'Tarkistetaan...',
    checkConnection: 'Tarkista yhteys',
    canvasAria: 'Signal Runner -offline-pelin pelialue',
    title: 'Signal Runner',
    subtitle:
      'Hyppää tornien, piikkien ja droonien yli, kunnes nettiyhteys palaa. Kaksoishyppy on käytössä.',
    startGame: 'Aloita peli',
    tapHint: 'Napauta näyttöä tai paina Välilyönti / Nuoli ylös hypätäksesi',
    paused: 'Peli keskeytetty',
    resume: 'Jatka',
    gameOver: 'Signaali katkesi',
    cleared: 'Ohitettu:',
    newBest: 'Uusi ennätys!',
    playAgain: 'Pelaa uudelleen',
    backToSpeedTest: 'Takaisin nopeustestiin',
    jump: 'Hyppy',
    fastDrop: 'Nopea pudotus',
    desktopHintPrefix: 'Näppäimistö:',
    desktopJump: 'Hyppy',
    desktopDrop: 'Pudotus',
    desktopPause: 'Tauko',
  },
  faq: {
    tableTitle: 'Nopeustestin & IP-haun viitetaulukko',
    tableSubtitle:
      'ECORZO LLC:n TestLine mittaa reaaliaikaisen lataus- ja lähetyskaistan, ping-viiveen, jitterin, julkiset IPv4/IPv6-osoitteet, IP-paikannuksen, DNS-nopeuden sekä VPN- tai välityspalvelintiedot.',
    readGuidesLink: 'Lue 10 nopeus- & IP-opasta',
    colMetric: 'Mittari',
    colMethod: 'Mittausmenetelmä',
    colThreshold: 'Tavoitearvo',
    colImpact: 'Keskeinen vaikutus',
    benchmarks: [
      {
        metric: 'Latausnopeus (Mbps / MB/s)',
        method: '3 rinnakkaista 25 MB HTTP-virtaa (10 s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Useita käyttäjiä)',
        standardUse: 'Suoratoisto, lataukset, pilvisynkronointi',
      },
      {
        metric: 'Lähetysnopeus (Mbps / MB/s)',
        method: '2 rinnakkaista 10 MB XHR POST -virtaa',
        optimal: '10+ Mbps (HD-puhelut) · 25+ Mbps (Tekijä)',
        standardUse: 'Videopuhelut, varmuuskopiot, livelähetykset',
      },
      {
        metric: 'Ping & kuormittamaton viive',
        method: '5 peräkkäistä 0-tavuista Cloudflaren RTT-mittausta',
        optimal: '< 30 ms (Matala) · 30–60 ms (Normaali)',
        standardUse: 'Verkkopelaaminen, VoIP, verkkovaste',
      },
      {
        metric: 'Jitter & bufferbloat-herkkyys',
        method: 'Peräkkäisten RTT-näytteiden keskivaihtelu',
        optimal: '< 10 ms (Vakaa) · > 25 ms (Ruuhkainen)',
        standardUse: 'Äänen ja videon vakaus kuormituksessa',
      },
      {
        metric: 'DoH DNS-viive & PTR-haku',
        method: 'Salattu 1.1.1.1-kysely + Käänteinen DNS PTR',
        optimal: '< 40 ms DNS-nimenselvitys',
        standardUse: 'Verkkotunnusten haku & operaattoritarkistus',
      },
      {
        metric: 'Dual-Stack IP, Sijainti & VPN-tila',
        method: 'IPv4/IPv6 + ISP/ASN + Otsikko-/aikavyöhyketarkastus',
        optimal: 'Suora ISP-IP tai vahvistettu VPN-solmu',
        standardUse: 'Mikä on IP:ni, sijainti, VPN/proxy-tarkistus',
      },
    ],
    faqTitle: 'Usein kysytyt kysymykset',
    faqSubtitle:
      'Suorat vastaukset nopeustestistä, IP-osoitteesta, IP-paikannuksesta, VPN-tilasta ja tietosuojasta',
    newsLink: 'Tietoturva- & verkkouutiset',
    methodologyLink: 'Täydellinen menetelmä',
    gdprLink: 'GDPR & Tietokäytäntö',
    items: [
      {
        question: 'Kuinka nopea internetin lataus- ja lähetysnopeuteni on?',
        answer:
          'Napsauta Aloita nopeustesti mitataksesi reaaliaikaisen lataus- ja lähetysnopeuden Mbps- tai MB/s-yksikössä Cloudflaren reunapalvelimia vasten.',
      },
      {
        question: 'Mikä on julkinen IPv4- ja IPv6-osoitteeni?',
        answer:
          'Testi tunnistaa sekä julkisen IPv4- että IPv6-osoitteesi rinnakkain kopiointipainikkeineen sekä kaupungin, alueen, maan, operaattorin ja ASN:n.',
      },
      {
        question: 'Mitkä ovat hyvät arvot pingille, jitterille ja bufferbloatille?',
        answer:
          'Alle 30 ms ping ja alle 10 ms jitter takaavat sujuvat videopuhelut ja verkkopelit. Voimakas viiveen nousu kuormituksessa viittaa bufferbloatiin.',
      },
      {
        question: 'Kuinka tarkka IP-paikannus on sijaintini määrittämisessä?',
        answer:
          'IP-paikannus yhdistää IP-lohkon rekisteröityyn kaupunkiin ja maahan, mutta ei koskaan paljasta tarkkaa katuosoitettasi.',
      },
      {
        question: 'Miten TestLine tunnistaa VPN:n, välityspalvelimen tai konesali-IP:n?',
        answer:
          'TestLine tutkii HTTP-edelleenlähetysotsikot, konesali-ASN-tunnukset, PTR-nimet ja selaimen sekä IP:n aikavyöhyke-erot.',
      },
      {
        question: 'Mitä ovat DNS-over-HTTPS (DoH) -viive ja käänteinen DNS (PTR)?',
        answer:
          'DoH-viive mittaa salatun nimenselvityksen nopeutta Cloudflaren 1.1.1.1-palvelimelta, ja PTR näyttää IP:llesi annetun palvelinnimen.',
      },
      {
        question: 'Tallentaako ECORZO LLC IP-osoitettani tai testituloksiani?',
        answer:
          'Ei. Mittaukset käsitellään väliaikaisesti muistissa eikä niitä myydä tai tallenneta käyttäjäprofiileihin. Historia säilyy vain selaimesi paikallisessa muistissa.',
      },
      {
        question: 'Voinko asentaa TestLinen sovelluksena tai pelata ilman nettiä?',
        answer:
          'Kyllä. TestLine on asennettava PWA. Nettiyhteyden katketessa Signal Runner -peli käynnistyy automaattisesti.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Takaisin nopeustestiin',
    effectiveDatePrefix: 'Voimaantulopäivä:',
    operatorLabel: 'Operaattori: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Tietoja TestLinesta',
      subtitle:
        'ECORZO LLC:n rakentama nopea ja tietosuojaa kunnioittava verkkosovellus läpinäkyvään nopeustestaukseen ja julkiseen IPv4/IPv6-diagnostiikkaan.',
      sections: [
        {
          heading: 'Mitä TestLine mittaa',
          paragraphs: [
            'TestLine on ECORZO LLC:n ylläpitämä ilmainen nopeustesti ja IP-diagnostiikkatyökalu ilman kirjautumista tai liitännäisiä.',
          ],
          bullets: [
            { strong: 'Lataus- & lähetysnopeus (Mbps / MB/s):', text: 'Rinnakkaiset HTTP-virrat Cloudflaren palvelimille yksiköissä Auto, Mbps tai MB/s.' },
            { strong: 'Ping, jitter & viive:', text: 'Peräkkäiset RTT-mittaukset keskimääräisen ja pienimmän pingin sekä vaihtelun selvittämiseksi.' },
            { strong: 'IPv4/IPv6, Sijainti, ISP & ASN:', text: 'Dual-stack IP-haku, PTR-palvelinnimi ja salattu DoH-viive.' },
            { strong: 'VPN-, välityspalvelin- & konesalitunnistus:', text: 'Otsikoiden, hosting-ASN:n, PTR:n ja aikavyöhykkeiden tarkastus.' },
          ],
        },
      ],
      closingTitle: 'Tietopankki, live-uutiset & yritystiedot',
      closingIntro: 'Tutustu',
      closingGuidesLink: '10 nopeus-, IP-, huijaus- & VPN-oppaaseemme',
      closingMid: 'tai lue reaaliaikaisia tietoturvaotsikoita osiossa',
      closingNewsLink: 'TestLine Uutiset RSS-syöte',
      closingOutro:
        '. TestLinea kehittää ja ylläpitää ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA. Tukea ja tiedusteluja varten käy sivulla',
      closingContactLink: 'Yhteystiedot',
    },
    contact: {
      title: 'Ota yhteyttä ECORZO LLC:hen',
      subtitle: 'Tavoita tiimimme TestLine-diagnostiikkaan, tietosuojaan, GDPR:ään tai ehtoihin liittyvissä kysymyksissä.',
      telephone: 'Puhelin',
      addressLabel: 'Rekisteröity toimipaikka',
      copy: 'Kopioi',
      copied: 'Kopioitu',
      formHeading: 'Lähetä tiedustelu',
      sentTitle: 'Tiedustelu valmisteltu',
      sentBodyPrefix:
        'Kiitos, {name}. Tietosi on kirjattu tarkistettavaksi. Kiireellisissä lakiasioissa tai GDPR-pyynnöissä soita +1 646 427 6802 tai kirjoita osoitteeseen ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Lähetä uusi tiedustelu',
      nameLabel: 'Koko nimi',
      namePlaceholder: 'Matti Meikäläinen',
      emailLabel: 'Sähköpostiosoite',
      emailPlaceholder: 'sina@esimerkki.fi',
      messageLabel: 'Viesti',
      messagePlaceholder: 'Kuinka ECORZO LLC voi auttaa sinua?',
      submitBtn: 'Lähetä viesti',
      errMissing: 'Syötä nimesi, sähköpostiosoitteesi ja viestisi.',
      errInvalidEmail: 'Syötä kelvollinen sähköpostiosoite.',
    },
    privacy: {
      title: 'Tietosuojakäytäntö',
      subtitle:
        'Miten ECORZO LLC:n TestLine käsittelee ja suojaa diagnostiikkatietoja Googlen käytäntöjen ja tietosuojalainsäädännön mukaisesti.',
      sections: [
        {
          heading: '1. Rekisterinpitäjä & Soveltamisala',
          paragraphs: [
            'Tämä käytäntö koskee TestLinea, jota ylläpitää ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Puh: +1 646 427 6802), EU/UK GDPR:n, CCPA/CPRA:n ja Googles suostumusvaatimusten mukaisesti.',
          ],
        },
        {
          heading: '2. Diagnostiikan aikana käsiteltävät tiedot',
          bullets: [
            { strong: 'Verkko- & IP-telemetria:', text: 'Julkinen IPv4/IPv6, ISP, ASN, arvioitu sijainti, PTR ja HTTP-otsikot käsitellään väliaikaisesti muistissa.' },
            { strong: 'Nopeusmittaukset:', text: 'Tulokset lasketaan selaimessa ja tallennetaan vain paikallisesti (testline_history_v1).' },
            { strong: 'Selaimen asetukset:', text: 'Teema (testline_theme), kielivalinta ja suostumus (testline_cookie_consent) tallennetaan paikallisesti.' },
          ],
        },
        {
          heading: '3. Kolmannen osapuolen palvelut & Google-ilmoitus',
          paragraphs: [
            'Mittausten suorittamiseksi selain ottaa yhteyttä palveluntarjoajiin Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io) ja Ipify (api.ipify.org). Googlen palveluiden osalta pätee:',
          ],
        },
        {
          heading: '4. Ei tietojen myyntiä & Säilytys',
          paragraphs: [
            'ECORZO LLC ei koskaan myy tai vuokraa henkilötietoja tai IP-osoitteita. PDF-raportit luodaan kokonaan omalla laitteellasi.',
          ],
        },
      ],
      googlePolicyLinkText: 'Miten Google käyttää palveluitamme käyttäviltä sivustoilta ja sovelluksista saatuja tietoja',
      rightsPrefix: 'Sinulla on oikeus tarkastaa, oikaista tai poistaa tietojasi sekä peruuttaa suostumus milloin tahansa. Lue',
      gdprLinkText: 'GDPR & Tiedonkeruukäytäntö',
      rightsSuffix: 'tai ota yhteyttä ECORZO LLC:hen numeroon +1 646 427 6802 tai 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Vastuuvapauslauseke',
      subtitle: 'Tärkeät rajoitukset nopeusmittauksiin, IP-paikannukseen ja VPN-signaaleihin liittyen.',
      sections: [
        {
          heading: '1. Vain tiedotus- ja diagnostiikkakäyttöön',
          paragraphs: [
            'TestLine tarjotaan "sellaisena kuin se on" yleiseen verkkodiagnostiikkaan ilman oikeudellista takuuta liittymäkapasiteetista.',
          ],
        },
        {
          heading: '2. Tuloksiin vaikuttavat tekijät',
          paragraphs: [
            'Tuloksiin vaikuttavat Wi-Fi-signaali, reititin, taustaliikenne, VPN-salaus ja operaattorin reititys.',
          ],
        },
        {
          heading: '3. IP-paikannuksen & välityspalvelintunnistuksen tarkkuus',
          paragraphs: [
            'Kaupunki ja operaattori perustuvat kolmannen osapuolen rekistereihin eivätkä kerro katuosoitettasi. Välityspalvelinliput perustuvat heuristiikkaan.',
          ],
        },
        {
          heading: '4. Vastuunrajoitus',
          paragraphs: [
            'Lain sallimissa rajoissa ECORZO LLC ei vastaa välillisistä vahingoista, jotka johtuvat mittaustuloksista tai raporteista.',
          ],
        },
      ],
    },
    terms: {
      title: 'Käyttöehdot',
      subtitle: 'ECORZO LLC:n TestLinen käyttöä koskevat säännöt.',
      sections: [
        { heading: '1. Ehtojen hyväksyminen', paragraphs: ['Käyttämällä TestLinea hyväksyt nämä käyttöehdot ja sovellettavan lain.'] },
        {
          heading: '2. Sallittu & kielletty käyttö',
          bullets: [
            { text: 'Voit käyttää TestLinea henkilökohtaiseen, opetukselliseen tai lailliseen yrityksen vianmääritykseen.' },
            { text: 'Automaattiset botit, kuormitustestit, DDoS tai tiedonharavointi on kielletty.' },
            { text: 'Nopeusrajoitusten kiertäminen tai raporttien esittäminen viranomaissertifikaatteina on kielletty.' },
          ],
        },
        { heading: '3. Immateriaalioikeudet', paragraphs: ['TestLine-nimi, ulkoasu ja lähdekoodi kuuluvat ECORZO LLC:lle.'] },
        { heading: '4. Sovellettava laki', paragraphs: ['Näihin ehtoihin sovelletaan New Yorkin osavaltion ja Yhdysvaltain lakeja.'] },
      ],
    },
    cookiesPolicy: {
      title: 'Evästekäytäntö',
      subtitle: 'Erittely TestLinen käyttämistä evästeistä ja selaimen paikallisesta tallennuksesta.',
      sec1Title: '1. Mitä ovat evästeet ja paikallinen tallennus?',
      sec1Body:
        'Evästeet ovat pieniä tekstitiedostoja. Nykyaikaiset verkkosovellukset käyttävät myös localStorage-muistia asetusten tallentamiseen paikallisesti.',
      sec2Title: '2. TestLinen käyttämät tallennusavaimet',
      colKey: 'Avain / Tunniste',
      colCategory: 'Kategoria',
      colPurpose: 'Tarkoitus',
      rows: [
        { key: 'testline_theme', category: 'Välttämätön asetus', purpose: 'Muistaa vaalean tai tumman teeman.' },
        { key: 'testline_unit_v1', category: 'Välttämätön asetus', purpose: 'Tallentaa valitun nopeusyksikön (Auto, Mbps, MB/s).' },
        { key: 'testline_history_v1', category: 'Toiminnallinen paikallinen', purpose: 'Tallentaa enintään 15 viimeistä mittaustulosta paikallisesti.' },
        { key: 'testline_cookie_consent', category: 'Välttämätön suostumus', purpose: 'Tallentaa Google Consent Mode v2 -valintasi.' },
      ],
      sec3Title: '3. Kolmannen osapuolen & Googlen tiedonannot',
      sec3Prefix:
        'Googlen EU-käyttäjäsuostumuskäytännön ja Consent Mode v2:n mukaisesti mainos- ja analytiikkatallennus pysyy estettynä, kunnes suostut. Valtuutetut myyjät julkaistaan osoitteessa',
      sec3Mid: '. Voit muuttaa valintaa milloin tahansa sivulla',
      cookiesNoticeLinkText: 'Evästeilmoitus',
      sec3OrVia: 'tai palvelussa',
      googleAdSettingsText: 'Googlen mainosasetukset',
    },
    cookiesNotice: {
      title: 'Evästeilmoitus & Suostumusvalinnat',
      subtitle: 'Hallitse ECORZO LLC:n TestLinen eväste- ja tallennussuostumuksia.',
      sec1Title: 'Ilmoitus kävijöille (ETA, Iso-Britannia, Sveitsi & muu maailma)',
      sec1Body:
        'TestLine käyttää välttämätöntä tallennusta teemaa, yksiköitä, paikallista historiaa ja suostumusta varten. Mainos- ja analytiikkatallennus on oletusarvoisesti estetty.',
      activeTitle: 'Aktiivinen suostumusvalinta',
      currentSettingLabel: 'Nykyinen asetus:',
      statusAll: 'Kaikki sallittu (Analytiikka & Mainokset)',
      statusEssential: 'Vain välttämättömät',
      statusUnset: 'Ei valittu vielä (Valinnaiset estetty)',
      savedBadge: 'Asetukset tallennettu',
      acceptAllBtn: 'Hyväksy kaikki toiminnallinen tallennus',
      essentialOnlyBtn: 'Vain välttämättömät',
      sec2Title: 'Selaimen hallintatoimet',
      sec2Body: 'Voit myös estää tai tyhjentää sivustotiedot suoraan selaimesi tietosuoja-asetuksista.',
    },
    gdpr: {
      title: 'GDPR & Tiedonkeruukäytäntö',
      subtitle: 'Laillinen käsittelyperuste, tietojen minimointi, kansainväliset siirrot ja GDPR-oikeudet.',
      sections: [
        {
          heading: '1. Rekisterinpitäjä',
          paragraphs: [
            'GDPR:n mukainen rekisterinpitäjä on ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, USA (Puh: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Käsittelyperusteet (Artikla 6)',
          bullets: [
            { strong: 'Sopimus / Pyydetty palvelu (6(1)(b)):', text: 'IP:n ja kaistamittauksen käsittely on välttämätöntä pyytämäsi testin suorittamiseksi.' },
            { strong: 'Oikeutettu etu (6(1)(f)):', text: 'Suojaaminen väärinkäytöksiltä, DDoS-hyökkäyksiltä ja toimintavarmuuden takaaminen.' },
            { strong: 'Nimenomainen suostumus (6(1)(a)):', text: 'Valinnaisia evästeitä käsitellään vain suostumuksellasi.' },
          ],
        },
        {
          heading: '3. Tietojen minimointi & Säilytys',
          paragraphs: ['ECORZO LLC noudattaa 5 artiklan minimointiperiaatetta ilman rekisteröitymistä tai pysyviä IP-profiileja.'],
        },
        {
          heading: '4. Kansainväliset siirrot',
          paragraphs: ['Pyynnöt ohjataan lähimmälle Cloudflare- tai Google Cloud -solmulle vakiosopimuslausekkeiden (SCC) mukaisesti.'],
        },
        {
          heading: '5. Lakisääteiset oikeutesi (Art. 15–22)',
          bullets: [
            { strong: 'Pääsy & siirto-oikeus:', text: 'Pyydä vahvistus ja kopio tiedoista.' },
            { strong: 'Oikaisu & poisto:', text: 'Pyydä virheellisten tietojen korjaamista tai poistamista.' },
            { strong: 'Vastustaminen & rajoittaminen:', text: 'Peruuta suostumus milloin tahansa.' },
            { strong: 'Valitusoikeus:', text: 'Tee valitus kansalliselle tietosuojaviranomaiselle.' },
          ],
        },
        {
          heading: '6. Lasten tietosuoja',
          paragraphs: ['TestLine ei tietoisesti kerää tietoja alle 13-vuotiailta (tai alle 16-vuotiailta ETA-alueella).'],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Verkko- & Nopeusraportti',
    generated: 'Luotu',
    unit: 'Yksikkö',
    secondCopyBanner: 'TOINEN KOPIO  —  Raportin uusintalataus',
    sec1Title: '1. Nopeustestin yhteenveto',
    downloadSpeed: 'Latausnopeus',
    uploadSpeed: 'Lähetysnopeus',
    avgPing: 'Keskim. ping',
    jitter: 'Jitter',
    peak: 'Huippu',
    sustained: 'Jatkuva virta',
    min: 'Min',
    probes: 'mittausta',
    rttProbes: 'RTT-mittausta',
    sec2Title: '2. Välityspalvelin- & VPN-tunnistus',
    directClean: 'Suora yhteys — Välityspalvelin- tai VPN-signaaleja ei havaittu',
    sec3Title: '3. Verkko-, IP- & DNS-diagnostiikka',
    sec4Title: '4. Istunnon viimeisimmät ajot',
    confidenceWord: 'varmuus',
    pageOf: 'Sivu {p} / {total}',
    secondCopyShort: 'Toinen kopio',
    rowPrimaryIp: 'Ensisijainen julkinen IP',
    rowIpv4: 'IPv4-osoite',
    rowIpv6: 'IPv6-osoite',
    rowIsp: 'Operaattori (ISP)',
    rowAsn: 'Autonominen järjestelmä (ASN)',
    rowLocation: 'Arvioitu sijainti',
    rowTimezone: 'Aikavyöhyke',
    rowPtr: 'Käänteinen DNS (PTR)',
    rowDoh: 'DoH-nimipalvelintesti',
    rowProtocol: 'Siirtoprotokolla',
    rowLinkHint: 'Selaimen yhteysvihje',
    notDetected: 'Ei havaittu',
    noPtr: 'Ei julkaistua PTR-tietuetta',
    reachable: 'Tavoitettavissa',
    unreachable: 'Tavoittamattomissa',
    notExposed: 'Selain ei jaa tietoa',
    available: 'Saatavilla',
    colTime: 'Aika',
    colDownload: 'Lataus',
    colUpload: 'Lähetys',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Julkinen IP',
  },
};
