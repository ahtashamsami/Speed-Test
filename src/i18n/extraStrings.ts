import type { SupportedLang } from './localeDetection';

export type NewsCommentaryTopic = 'vpn' | 'scam' | 'routing' | 'speed' | 'general';

export interface ExtraUiStrings {
  notFound: {
    code: string;
    title: string;
    description: string;
    backToHome: string;
    runSpeedTest: string;
    readBlogGuides: string;
    readNews: string;
    seoTitle: string;
    seoDescription: string;
  };
  newsEditorial: {
    overviewTitle: string;
    overviewBody: string;
    noteLabel: string;
    commentaryByTopic: Record<NewsCommentaryTopic, string>;
  };
}

export const EXTRA_UI_STRINGS: Record<SupportedLang, ExtraUiStrings> = {
  en: {
    notFound: {
      code: 'HTTP 404',
      title: 'Page Not Found',
      description:
        'The URL you requested does not match an active TestLine route. Return home to run a live internet speed test, inspect your public IPv4/IPv6 diagnostics, or open our guides.',
      backToHome: 'Back to Home',
      runSpeedTest: 'Run Speed Test',
      readBlogGuides: 'Browse Blog Guides',
      readNews: 'Security & Network News',
      seoTitle: '404 — Page Not Found | TestLine',
      seoDescription: 'The requested TestLine page could not be found.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine Network Impact Analysis',
      overviewBody:
        'Each briefing below pairs live industry reporting with TestLine operational context—highlighting how carrier outages, DNS/BGP events, VPN CVEs, and malware campaigns affect throughput, routing latency, and public IP reputation.',
      noteLabel: 'TestLine Note',
      commentaryByTopic: {
        vpn: 'Verify your tunnel endpoint with a quick TestLine check to confirm IPv6/DoH leaks are blocked and your exit ASN reflects expected privacy routing.',
        scam: 'Threat campaigns targeting browsers and routers often alter DNS or proxy paths—audit your PTR hostname, proxy headers, and DNS resolver latency.',
        routing: 'DNS, BGP, and cloud edge incidents frequently spike round-trip jitter before affecting headline download Mbps; monitor DoH response times closely.',
        speed: 'Compare multi-stream Mbps throughput and loaded latency during carrier congestion or wireless rollouts to separate local Wi-Fi limits from ISP transit.',
        general: 'Keep endpoints patched and run periodic TestLine diagnostics to confirm clean direct ISP routing without unexpected relay indicators.',
      },
    },
  },
  de: {
    notFound: {
      code: 'HTTP 404',
      title: 'Seite nicht gefunden',
      description:
        'Die angeforderte URL existiert auf TestLine nicht. Starten Sie einen Live-Speedtest, prüfen Sie Ihre öffentliche IPv4/IPv6-Diagnose oder lesen Sie unsere Ratgeber.',
      runSpeedTest: 'Speedtest starten',
      backToHome: 'Zur Startseite',
      readBlogGuides: 'Blog-Ratgeber öffnen',
      readNews: 'Netzwerk-Nachrichten',
      seoTitle: '404 — Seite nicht gefunden | TestLine',
      seoDescription: 'Die angeforderte TestLine-Seite wurde nicht gefunden.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine Netzwerkanalyse',
      overviewBody:
        'Jede Meldung unten kombiniert aktuelle Fachberichte mit technischer TestLine-Einordnung zu DNS-/BGP-Vorfällen, VPN-Sicherheitslücken, Bandbreitenschwankungen und IP-Reputation.',
      noteLabel: 'TestLine-Hinweis',
      commentaryByTopic: {
        vpn: 'Prüfen Sie Ihren Tunnel-Endpunkt mit TestLine, um IPv6-/DoH-Lecks auszuschließen und den aktiven Exit-ASN zu kontrollieren.',
        scam: 'Angriffe auf Browser oder Router verändern oft DNS- oder Proxy-Pfade — überprüfen Sie PTR-Hostname, Proxy-Header und DoH-Latenz.',
        routing: 'DNS-, BGP- und Edge-Störungen erhöhen oft zuerst den Jitter, bevor die Download-Rate sinkt; behalten Sie die DoH-Antwortzeiten im Blick.',
        speed: 'Vergleichen Sie Multi-Stream-Bandbreite und Latenz, um lokales WLAN sauber von Engpässen im ISP-Backbone zu trennen.',
        general: 'Halten Sie Systeme aktuell und prüfen Sie regelmäßig mit TestLine auf sauberes direktes ISP-Routing ohne unerwartete Relay-Signale.',
      },
    },
  },
  fr: {
    notFound: {
      code: 'HTTP 404',
      title: 'Page introuvable',
      description:
        'L’URL demandée ne correspond à aucune page active sur TestLine. Lancez un test de débit, vérifiez votre IPv4/IPv6 ou consultez nos guides.',
      runSpeedTest: 'Lancer le test de débit',
      backToHome: 'Retour à l’accueil',
      readBlogGuides: 'Consulter les guides',
      readNews: 'Actualités réseau',
      seoTitle: '404 — Page introuvable | TestLine',
      seoDescription: 'La page TestLine demandée est introuvable.',
    },
    newsEditorial: {
      overviewTitle: 'Analyse d’impact réseau TestLine',
      overviewBody:
        'Chaque brève associe l’actualité technique à un éclairage TestLine sur l’impact réel pour le routage DNS/BGP, la latence, les tunnels VPN et la réputation IP.',
      noteLabel: 'Note TestLine',
      commentaryByTopic: {
        vpn: 'Vérifiez votre sortie VPN sur TestLine pour confirmer l’absence de fuite IPv6 ou DNS et valider l’ASN affiché.',
        scam: 'Les campagnes ciblant navigateurs et routeurs modifient souvent les proxys ou DNS — contrôlez votre hôte PTR et la latence DoH.',
        routing: 'Les incidents BGP et DNS augmentent d’abord la gigue avant de réduire le débit ; surveillez la latence de résolution DoH.',
        speed: 'Comparez le débit multi-flux et le ping en charge afin de distinguer une limite Wi-Fi locale d’une congestion opérateur.',
        general: 'Maintenez vos appareils à jour et contrôlez périodiquement votre routage ISP direct via TestLine.',
      },
    },
  },
  es: {
    notFound: {
      code: 'HTTP 404',
      title: 'Página no encontrada',
      description:
        'La URL solicitada no existe en TestLine. Ejecuta una prueba de velocidad en vivo, revisa tu diagnóstico IPv4/IPv6 o explora nuestras guías.',
      runSpeedTest: 'Ejecutar test de velocidad',
      backToHome: 'Volver al inicio',
      readBlogGuides: 'Ver guías del blog',
      readNews: 'Noticias de red',
      seoTitle: '404 — Página no encontrada | TestLine',
      seoDescription: 'No se encontró la página solicitada en TestLine.',
    },
    newsEditorial: {
      overviewTitle: 'Análisis de impacto de red de TestLine',
      overviewBody:
        'Cada titular combina la cobertura técnica con contexto operativo de TestLine sobre incidentes DNS/BGP, vulnerabilidades VPN, congestión de ancho de banda y reputación IP.',
      noteLabel: 'Nota TestLine',
      commentaryByTopic: {
        vpn: 'Comprueba tu nodo de salida en TestLine para verificar que no haya fugas IPv6 ni DNS y validar el ASN activo.',
        scam: 'Las amenazas en navegadores o routers suelen alterar rutas proxy o DNS; revisa tu registro PTR y latencia DoH.',
        routing: 'Los fallos de DNS y BGP suelen disparar el jitter antes de reducir los Mbps; vigila los tiempos de respuesta DoH.',
        speed: 'Compara el rendimiento multiflujo y la latencia para distinguir cuellos de botella Wi-Fi de la saturación del ISP.',
        general: 'Mantén tus equipos actualizados y ejecuta diagnósticos periódicos para confirmar un enrutamiento directo y limpio.',
      },
    },
  },
  pt: {
    notFound: {
      code: 'HTTP 404',
      title: 'Página não encontrada',
      description:
        'O endereço solicitado não corresponde a nenhuma rota ativa do TestLine. Execute um teste de velocidade, verifique seu IP público ou leia nossos guias.',
      runSpeedTest: 'Iniciar teste de velocidade',
      backToHome: 'Voltar ao início',
      readBlogGuides: 'Ver guias do blog',
      readNews: 'Notícias de rede',
      seoTitle: '404 — Página não encontrada | TestLine',
      seoDescription: 'A página solicitada no TestLine não foi encontrada.',
    },
    newsEditorial: {
      overviewTitle: 'Análise de impacto de rede TestLine',
      overviewBody:
        'Cada resumo combina reportagens do setor com o contexto técnico da TestLine sobre rotas DNS/BGP, segurança VPN, latência e integridade de IP.',
      noteLabel: 'Nota TestLine',
      commentaryByTopic: {
        vpn: 'Confira seu nó de saída no TestLine para garantir bloqueio de vazamentos IPv6/DoH e ASN esperado.',
        scam: 'Ameaças em roteadores e navegadores podem alterar DNS ou proxies; audite seu PTR e cabeçalhos de encaminhamento.',
        routing: 'Incidentes de DNS e BGP costumam elevar o jitter antes de afetar o download; acompanhe a latência DoH.',
        speed: 'Compare transferências paralelas e latência para separar limitações do Wi-Fi local de congestionamentos do provedor.',
        general: 'Mantenha seus sistemas atualizados e use diagnósticos TestLine periodicamente para validar rotas diretas.',
      },
    },
  },
  it: {
    notFound: {
      code: 'HTTP 404',
      title: 'Pagina non trovata',
      description:
        'L’URL richiesto non esiste su TestLine. Avvia un test di velocità, controlla la diagnostica IPv4/IPv6 o esplora le nostre guide.',
      runSpeedTest: 'Avvia Speed Test',
      backToHome: 'Torna alla home',
      readBlogGuides: 'Esplora le guide',
      readNews: 'Notizie di rete',
      seoTitle: '404 — Pagina non trovata | TestLine',
      seoDescription: 'La pagina TestLine richiesta non è stata trovata.',
    },
    newsEditorial: {
      overviewTitle: 'Analisi di impatto di rete TestLine',
      overviewBody:
        'Ogni aggiornamento abbina le notizie del settore al contesto tecnico TestLine su instradamento DNS/BGP, vulnerabilità VPN, banda e reputazione IP.',
      noteLabel: 'Nota TestLine',
      commentaryByTopic: {
        vpn: 'Verifica il nodo di uscita su TestLine per escludere leak IPv6 o DNS e confermare l’ASN del tunnel.',
        scam: 'Campagne malware su browser e router possono alterare DNS o proxy: controlla PTR e latenza DoH.',
        routing: 'Guasti DNS e BGP aumentano prima il jitter e poi riducono i Mbps: monitora i tempi di risposta DoH.',
        speed: 'Confronta i flussi paralleli e la latenza per distinguere limiti Wi-Fi locali da congestione ISP.',
        general: 'Mantieni aggiornati i dispositivi ed esegui verifiche periodiche su TestLine per confermare rotte dirette.',
      },
    },
  },
  nl: {
    notFound: {
      code: 'HTTP 404',
      title: 'Pagina niet gevonden',
      description:
        'De opgevraagde URL bestaat niet op TestLine. Start een snelheidstest, bekijk uw publieke IPv4/IPv6-diagnose of lees onze handleidingen.',
      runSpeedTest: 'Snelheidstest starten',
      backToHome: 'Terug naar home',
      readBlogGuides: 'Bloggidsen bekijken',
      readNews: 'Netwerknieuws',
      seoTitle: '404 — Pagina niet gevonden | TestLine',
      seoDescription: 'De opgevraagde TestLine-pagina kon niet worden gevonden.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine Netwerkanalyse',
      overviewBody:
        'Elk bericht combineert actueel sectornieuws met technische TestLine-duiding voor DNS/BGP-routing, VPN-beveiliging, jitter en IP-reputatie.',
      noteLabel: 'TestLine-notitie',
      commentaryByTopic: {
        vpn: 'Controleer uw tunneluitgang met TestLine om IPv6- en DoH-lekken uit te sluiten en uw actieve ASN te verifiëren.',
        scam: 'Aanvallen op browsers en routers wijzigen vaak DNS- of proxyroutes; controleer uw PTR-hostnaam en DoH-latentie.',
        routing: 'DNS- en BGP-storingen verhogen vaak eerst de jitter voordat downloadsnelheid daalt; volg de DoH-responstijd.',
        speed: 'Vergelijk multi-stream doorvoer en latentie om lokale wifi-limieten van ISP-congestie te scheiden.',
        general: 'Houd systemen up-to-date en voer regelmatig een TestLine-check uit voor schone directe ISP-routing.',
      },
    },
  },
  pl: {
    notFound: {
      code: 'HTTP 404',
      title: 'Nie znaleziono strony',
      description:
        'Podany adres URL nie istnieje w TestLine. Uruchom test prędkości, sprawdź diagnostykę IPv4/IPv6 lub otwórz nasze poradniki.',
      runSpeedTest: 'Uruchom test prędkości',
      backToHome: 'Wróć na stronę główną',
      readBlogGuides: 'Zobacz poradniki',
      readNews: 'Wiadomości sieciowe',
      seoTitle: '404 — Nie znaleziono strony | TestLine',
      seoDescription: 'Żądana strona TestLine nie została znaleziona.',
    },
    newsEditorial: {
      overviewTitle: 'Analiza wpływu na sieć TestLine',
      overviewBody:
        'Każdy wpis łączy bieżące raporty branżowe z komentarzem technicznym TestLine dotyczącym trasowania DNS/BGP, luk VPN, opóźnień i reputacji IP.',
      noteLabel: 'Komentarz TestLine',
      commentaryByTopic: {
        vpn: 'Sprawdź swój punkt wyjścia VPN w TestLine, aby wykluczyć wycieki IPv6/DoH i potwierdzić numer ASN.',
        scam: 'Zagrożenia przeglądarek i routerów często zmieniają ścieżki proxy lub DNS — skontroluj rekord PTR i opóźnienie DoH.',
        routing: 'Awarie DNS i BGP zwykle najpierw podnoszą jitter, zanim spadnie prędkość pobierania; obserwuj czas odpowiedzi DoH.',
        speed: 'Porównaj przepustowość wielostrumieniową i opóźnienia, aby odróżnić ograniczenia Wi-Fi od przeciążenia ISP.',
        general: 'Aktualizuj oprogramowanie i okresowo sprawdzaj bezpośrednie trasowanie w TestLine.',
      },
    },
  },
  ru: {
    notFound: {
      code: 'HTTP 404',
      title: 'Страница не найдена',
      description:
        'Запрошенный URL не найден на TestLine. Запустите тест скорости интернета, проверьте публичный IPv4/IPv6 или откройте наши руководства.',
      runSpeedTest: 'Запустить тест скорости',
      backToHome: 'На главную',
      readBlogGuides: 'Открыть руководства',
      readNews: 'Новости сети',
      seoTitle: '404 — Страница не найдена | TestLine',
      seoDescription: 'Запрошенная страница TestLine не найдена.',
    },
    newsEditorial: {
      overviewTitle: 'Аналитика влияния на сеть от TestLine',
      overviewBody:
        'Каждая сводка сочетает актуальные новости индустрии с техническим комментарием TestLine о маршрутизации DNS/BGP, уязвимостях VPN и стабильности канала.',
      noteLabel: 'Комментарий TestLine',
      commentaryByTopic: {
        vpn: 'Проверьте выходной узел VPN в TestLine, чтобы исключить утечки IPv6 и DoH и убедиться в корректности ASN.',
        scam: 'Атаки на браузеры и роутеры нередко подменяют DNS или прокси — контролируйте PTR-запись и задержку DoH.',
        routing: 'Сбои DNS и BGP сначала увеличивают джиттер, а затем снижают скорость; следите за временем отклика DoH.',
        speed: 'Сравнивайте многопоточную скорость и задержку под нагрузкой, чтобы отличать ограничения Wi-Fi от перегрузки провайдера.',
        general: 'Регулярно обновляйте ПО и проверяйте прямое подключение через диагностику TestLine.',
      },
    },
  },
  uk: {
    notFound: {
      code: 'HTTP 404',
      title: 'Сторінку не знайдено',
      description:
        'Запитана URL-адреса не існує на TestLine. Запустіть тест швидкості інтернету, перевірте публічний IPv4/IPv6 або перегляньте наші посібники.',
      runSpeedTest: 'Запустити тест швидкості',
      backToHome: 'На головну',
      readBlogGuides: 'Переглянути посібники',
      readNews: 'Новини мережі',
      seoTitle: '404 — Сторінку не знайдено | TestLine',
      seoDescription: 'Запитану сторінку TestLine не знайдено.',
    },
    newsEditorial: {
      overviewTitle: 'Аналітика мережевого впливу TestLine',
      overviewBody:
        'Кожне зведення поєднує актуальні новини галузі з технічним коментарем TestLine щодо маршрутизації DNS/BGP, вразливостей VPN та якості з’єднання.',
      noteLabel: 'Нотатка TestLine',
      commentaryByTopic: {
        vpn: 'Перевірте вихідний вузол VPN у TestLine, щоб унеможливити витоки IPv6/DoH і перевірити активний ASN.',
        scam: 'Загрози для браузерів і роутерів часто змінюють DNS або проксі — перевіряйте PTR-запис та затримку DoH.',
        routing: 'Збої DNS і BGP зазвичай спочатку підвищують джитер, перш ніж падає швидкість; відстежуйте час відповіді DoH.',
        speed: 'Порівнюйте багатопотокову пропускну здатність і пінг під навантаженням, щоб відокремити межі Wi-Fi від заторів провайдера.',
        general: 'Оновлюйте пристрої та періодично перевіряйте пряме з’єднання через TestLine.',
      },
    },
  },
  sv: {
    notFound: {
      code: 'HTTP 404',
      title: 'Sidan hittades inte',
      description:
        'Den begärda webbadressen finns inte på TestLine. Starta ett hastighetstest, kontrollera IPv4/IPv6-diagnostik eller läs våra guider.',
      runSpeedTest: 'Starta hastighetstest',
      backToHome: 'Tillbaka till startsidan',
      readBlogGuides: 'Läs blogg-guider',
      readNews: 'Nätverksnyheter',
      seoTitle: '404 — Sidan hittades inte | TestLine',
      seoDescription: 'Den begärda sidan på TestLine kunde inte hittas.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine Nätverksanalys',
      overviewBody:
        'Varje uppdatering kombinerar branschrapportering med teknisk kontext från TestLine om DNS/BGP-incidenter, VPN-sårbarheter och bandbreddspåverkan.',
      noteLabel: 'TestLine-notering',
      commentaryByTopic: {
        vpn: 'Kontrollera din tunnelutgång i TestLine för att verifiera att IPv6/DoH-läckor är blockerade och att ASN stämmer.',
        scam: 'Hot mot webbläsare och routrar ändrar ofta proxy- eller DNS-vägar; granska PTR-värdnamn och DoH-latens.',
        routing: 'DNS- och BGP-störningar höjer ofta jitter innan nedladdningshastigheten sjunker; bevaka DoH-svarstider.',
        speed: 'Jämför flertrådad bandbredd och latens för att skilja lokala Wi-Fi-gränser från ISP-flaskhalsar.',
        general: 'Håll system uppdaterade och kör regelbundna TestLine-kontroller för att bekräfta ren direktrouting.',
      },
    },
  },
  no: {
    notFound: {
      code: 'HTTP 404',
      title: 'Siden ble ikke funnet',
      description:
        'Nettadressen finnes ikke på TestLine. Kjør en hastighetstest, sjekk din offentlige IPv4/IPv6-diagnostikk eller les våre veiledninger.',
      runSpeedTest: 'Start hastighetstest',
      backToHome: 'Tilbake til forsiden',
      readBlogGuides: 'Les blogguider',
      readNews: 'Nettverksnyheter',
      seoTitle: '404 — Siden ble ikke funnet | TestLine',
      seoDescription: 'Den forespurte TestLine-siden ble ikke funnet.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine Nettverksanalyse',
      overviewBody:
        'Hver nyhet kombinerer bransjerapporter med teknisk TestLine-vurdering av hvordan DNS/BGP-hendelser, VPN-feil og flaskehalser påvirker forbindelsen.',
      noteLabel: 'TestLine-notat',
      commentaryByTopic: {
        vpn: 'Test utgangsnoden din i TestLine for å bekrefte at IPv6/DoH-lekkasjer er blokkert og at riktig ASN vises.',
        scam: 'Angrep mot nettlesere og rutere endrer ofte proxy eller DNS; sjekk PTR-vertsnavn og DoH-responstid.',
        routing: 'DNS- og BGP-feil gir ofte høyere jitter før nedlastingshastigheten faller; følg med på DoH-forsinkelse.',
        speed: 'Sammenlign flerstrøms Mbps og belastet ping for å skille lokal Wi-Fi fra ISP-kapasitet.',
        general: 'Hold enheter oppdatert og kjør jevnlige TestLine-tester for å bekrefte ren direkte ruting.',
      },
    },
  },
  da: {
    notFound: {
      code: 'HTTP 404',
      title: 'Siden blev ikke fundet',
      description:
        'Den ønskede URL findes ikke på TestLine. Kør en hastighedstest, tjek din IPv4/IPv6-diagnostik eller læs vores guider.',
      runSpeedTest: 'Start hastighedstest',
      backToHome: 'Tilbage til forsiden',
      readBlogGuides: 'Læs blogguider',
      readNews: 'Netværksnyheder',
      seoTitle: '404 — Siden blev ikke fundet | TestLine',
      seoDescription: 'Den ønskede TestLine-side blev ikke fundet.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine Netværksanalyse',
      overviewBody:
        'Hvert opslag kombinerer branchenyheder med teknisk TestLine-kontekst om DNS/BGP-hændelser, VPN-sårbarheder, latenstid og IP-omdømme.',
      noteLabel: 'TestLine-note',
      commentaryByTopic: {
        vpn: 'Kontrollér dit tunneludgangspunkt i TestLine for at udelukke IPv6/DoH-lækager og bekræfte dit ASN.',
        scam: 'Trusler mod browsere og routere ændrer ofte DNS eller proxyer; tjek PTR-værtsnavn og DoH-latenstid.',
        routing: 'DNS- og BGP-udfald øger typisk jitter før downloadhastigheden falder; hold øje med DoH-svartider.',
        speed: 'Sammenlign multistream-båndbredde og ping for at adskille lokal Wi-Fi fra udbyderens belastning.',
        general: 'Hold enheder opdateret og kør løbende TestLine-tjek for at sikre ren direkte ISP-routing.',
      },
    },
  },
  fi: {
    notFound: {
      code: 'HTTP 404',
      title: 'Sivua ei löytynyt',
      description:
        'Pyydettyä osoitetta ei löydy TestLinesta. Tee nopeustesti, tarkista IPv4/IPv6-diagnostiikka tai lue oppaitamme.',
      runSpeedTest: 'Käynnistä nopeustesti',
      backToHome: 'Takaisin etusivulle',
      readBlogGuides: 'Selaa oppaita',
      readNews: 'Verkkouutiset',
      seoTitle: '404 — Sivua ei löytynyt | TestLine',
      seoDescription: 'Pyydettyä TestLine-sivua ei löytynyt.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine-verkkovaikutusanalyysi',
      overviewBody:
        'Jokainen uutinen yhdistää alan raportoinnin TestLinen tekniseen näkemykseen DNS/BGP-häiriöistä, VPN-haavoittuvuuksista ja kaistanleveyden vakaudesta.',
      noteLabel: 'TestLine-huomio',
      commentaryByTopic: {
        vpn: 'Tarkista tunnelisi ulostulo TestLinella varmistaaksesi, ettei IPv6- tai DoH-vuotoja esiinny.',
        scam: 'Selaimiin ja reitittimiin kohdistuvat uhat muuttavat usein DNS- tai välityspalvelinreittejä; tarkista PTR ja DoH-viive.',
        routing: 'DNS- ja BGP-häiriöt nostavat yleensä ensin jitteriä ennen latausnopeuden laskua; seuraa DoH-vasteaikoja.',
        speed: 'Vertaa monisäikeistä nopeutta ja kuormitettua viivettä erottaaksesi Wi-Fi-rajoitteet operaattoriruuhkasta.',
        general: 'Pidä laitteet päivitettyinä ja varmista säännöllisesti suora operaattorireititys TestLinella.',
      },
    },
  },
  cs: {
    notFound: {
      code: 'HTTP 404',
      title: 'Stránka nenalezena',
      description:
        'Požadovaná adresa na webu TestLine neexistuje. Spusťte test rychlosti internetu, ověřte diagnostiku IPv4/IPv6 nebo si přečtěte naše průvodce.',
      runSpeedTest: 'Spustit test rychlosti',
      backToHome: 'Zpět na úvodní stránku',
      readBlogGuides: 'Zobrazit průvodce',
      readNews: 'Síťové zprávy',
      seoTitle: '404 — Stránka nenalezena | TestLine',
      seoDescription: 'Požadovaná stránka TestLine nebyla nalezena.',
    },
    newsEditorial: {
      overviewTitle: 'Analýza dopadu na síť od TestLine',
      overviewBody:
        'Každá zpráva propojuje aktuální oborové reporty s technickým komentářem TestLine k událostem DNS/BGP, zranitelnostem VPN a reputaci IP.',
      noteLabel: 'Poznámka TestLine',
      commentaryByTopic: {
        vpn: 'Ověřte svůj výstupní uzel VPN v TestLine, aby byly zablokovány úniky IPv6/DoH a souhlasilo ASN.',
        scam: 'Hrozby v prohlížečích a routerech často mění DNS nebo proxy trasy; zkontrolujte PTR záznam a latenci DoH.',
        routing: 'Výpadky DNS a BGP obvykle nejprve zvýší jitter a teprve poté klesá rychlost stahování; sledujte odezvu DoH.',
        speed: 'Porovnejte vícevláknovou propustnost a odezvu pro oddělení limitů Wi-Fi od vytížení sítě ISP.',
        general: 'Udržujte zařízení aktualizovaná a pravidelně kontrolujte čisté přímé směrování v TestLine.',
      },
    },
  },
  ro: {
    notFound: {
      code: 'HTTP 404',
      title: 'Pagina nu a fost găsită',
      description:
        'Adresa URL solicitată nu există pe TestLine. Rulează un test de viteză, verifică diagnosticul IPv4/IPv6 sau consultă ghidurile noastre.',
      runSpeedTest: 'Pornește testul de viteză',
      backToHome: 'Înapoi la pagina principală',
      readBlogGuides: 'Explorează ghidurile',
      readNews: 'Știri de rețea',
      seoTitle: '404 — Pagina nu a fost găsită | TestLine',
      seoDescription: 'Pagina TestLine solicitată nu a fost găsită.',
    },
    newsEditorial: {
      overviewTitle: 'Analiză de impact în rețea TestLine',
      overviewBody:
        'Fiecare rezumat combină știrile din industrie cu contextul tehnic TestLine privind incidentele DNS/BGP, vulnerabilitățile VPN și stabilitatea conexiunii.',
      noteLabel: 'Notă TestLine',
      commentaryByTopic: {
        vpn: 'Verifică nodul de ieșire VPN în TestLine pentru a confirma absența scurgerilor IPv6/DoH și ASN-ul activ.',
        scam: 'Campaniile periculoase modifică adesea rutele DNS sau proxy; verifică numele PTR și latența DoH.',
        routing: 'Incidentele DNS și BGP cresc de obicei jitter-ul înainte de scăderea vitezei; urmărește timpii de răspuns DoH.',
        speed: 'Compară debitul multi-flux și latența sub sarcină pentru a separa limitele Wi-Fi de congestia ISP.',
        general: 'Menține dispozitivele actualizate și verifică periodic rutarea directă în TestLine.',
      },
    },
  },
  hu: {
    notFound: {
      code: 'HTTP 404',
      title: 'Az oldal nem található',
      description:
        'A kért URL-cím nem található a TestLine oldalán. Indítson sebességtesztet, ellenőrizze IPv4/IPv6 adatait, vagy olvassa el útmutatóinkat.',
      runSpeedTest: 'Sebességteszt indítása',
      backToHome: 'Vissza a főoldalra',
      readBlogGuides: 'Útmutatók megnyitása',
      readNews: 'Hálózati hírek',
      seoTitle: '404 — Az oldal nem található | TestLine',
      seoDescription: 'A kért TestLine oldal nem található.',
    },
    newsEditorial: {
      overviewTitle: 'TestLine hálózati hatáselemzés',
      overviewBody:
        'Minden hír összekapcsolja az iparági jelentéseket a TestLine műszaki elemzésével a DNS/BGP-események, VPN-rések és sávszélesség-ingadozások kapcsán.',
      noteLabel: 'TestLine-megjegyzés',
      commentaryByTopic: {
        vpn: 'Ellenőrizze VPN-kilépőpontját a TestLine segítségével az IPv6/DoH-szivárgások kizárásához és az ASN ellenőrzéséhez.',
        scam: 'A böngészőket és routereket célzó támadások gyakran módosítják a DNS- vagy proxy-útvonalakat; vizsgálja meg a PTR-rekordot.',
        routing: 'A DNS- és BGP-zavarok először a jittert növelik, mielőtt a letöltési sebesség csökkenne; figyelje a DoH-válaszidőt.',
        speed: 'Hasonlítsa össze a többszálú átvitelt és a terhelt késleltetést a Wi-Fi és az ISP-korlátok elkülönítéséhez.',
        general: 'Tartsa naprakészen eszközeit, és ellenőrizze rendszeresen a tiszta közvetlen útválasztást a TestLine-on.',
      },
    },
  },
  el: {
    notFound: {
      code: 'HTTP 404',
      title: 'Η σελίδα δεν βρέθηκε',
      description:
        'Η διεύθυνση URL που ζητήσατε δεν υπάρχει στο TestLine. Εκτελέστε μια δοκιμή ταχύτητας, ελέγξτε τη διάγνωση IPv4/IPv6 ή διαβάστε τους οδηγούς μας.',
      runSpeedTest: 'Έναρξη δοκιμής ταχύτητας',
      backToHome: 'Επιστροφή στην αρχική',
      readBlogGuides: 'Προβολή οδηγών',
      readNews: 'Νέα δικτύου',
      seoTitle: '404 — Η σελίδα δεν βρέθηκε | TestLine',
      seoDescription: 'Η σελίδα TestLine που ζητήθηκε δεν βρέθηκε.',
    },
    newsEditorial: {
      overviewTitle: 'Ανάλυση δικτυακών επιπτώσεων TestLine',
      overviewBody:
        'Κάθε ενημέρωση συνδυάζει την ειδησεογραφία με τεχνικό σχολιασμό TestLine για συμβάντα DNS/BGP, ευπάθειες VPN, καθυστέρηση και φήμη IP.',
      noteLabel: 'Σημείωση TestLine',
      commentaryByTopic: {
        vpn: 'Ελέγξτε τον κόμβο εξόδου VPN στο TestLine για να επιβεβαιώσετε την απουσία διαρροών IPv6/DoH και το σωστό ASN.',
        scam: 'Απειλές σε περιηγητές και δρομολογητές συχνά αλλοιώνουν διαδρομές DNS ή proxy· ελέγξτε PTR και καθυστέρηση DoH.',
        routing: 'Βλάβες DNS και BGP αυξάνουν πρώτα το jitter προτού επηρεαστεί το download· παρακολουθήστε τους χρόνους DoH.',
        speed: 'Συγκρίνετε τη διακίνηση πολλαπλών ροών και την καθυστέρηση για να ξεχωρίσετε όρια Wi-Fi από συμφόρηση παρόχου.',
        general: 'Διατηρείτε ενημερωμένες τις συσκευές σας και εκτελείτε περιοδικούς ελέγχους δρομολόγησης στο TestLine.',
      },
    },
  },
  ar: {
    notFound: {
      code: 'HTTP 404',
      title: 'الصفحة غير موجودة',
      description:
        'الرابط الذي طلبته غير موجود على TestLine. شغّل اختبار سرعة الإنترنت، أو افحص عنوان IPv4/IPv6، أو تصفح الأدلة الهندسية.',
      runSpeedTest: 'تشغيل اختبار السرعة',
      backToHome: 'العودة إلى الرئيسية',
      readBlogGuides: 'تصفح أدلة المدونة',
      readNews: 'أخبار الشبكات والأمن',
      seoTitle: '404 — الصفحة غير موجودة | TestLine',
      seoDescription: 'تعذر العثور على صفحة TestLine المطلوبة.',
    },
    newsEditorial: {
      overviewTitle: 'تحليل TestLine لتأثير الشبكة',
      overviewBody:
        'يربط كل موجز بين التغطية التقنية المباشرة وسياق TestLine التشغيلي حول أعطال DNS وBGP وثغرات VPN وجودة الاتصال وسمعة عناوين IP.',
      noteLabel: 'ملاحظة TestLine',
      commentaryByTopic: {
        vpn: 'افحص عقدة خروج VPN عبر TestLine للتأكد من حجب تسريبات IPv6 وDoH والتحقق من رقم ASN النشط.',
        scam: 'غالبًا ما تعدل الهجمات على المتصفحات والموجهات مسارات DNS أو البروكسي؛ راجع سجل PTR وزمن استجابة DoH.',
        routing: 'تؤدي أعطال DNS وBGP عادة إلى ارتفاع التذبذب قبل انخفاض سرعة التنزيل؛ راقب زمن استجابة DoH عن كثب.',
        speed: 'قارن التدفق متعدد المسارات وزمن الاستجابة تحت الحمل لفصل حدود Wi-Fi المحلية عن ازدحام مزود الخدمة.',
        general: 'حافظ على تحديث الأجهزة وشغّل فحص TestLine دوريًا للتأكد من نظافة التوجيه المباشر.',
      },
    },
  },
};
