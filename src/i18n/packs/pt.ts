import type { TranslationPack } from '../types';

export const ptPack: TranslationPack = {
  meta: {
    lang: 'pt',
    intlLocale: 'pt-BR',
    dir: 'ltr',
    nativeName: 'Português',
  },
  seo: {
    home: {
      title: 'TestLine — Teste de Velocidade da Internet & Consulta de IP Público',
      description:
        'Teste sua velocidade de download e upload, ping e jitter e consulte seu endereço IP público (IPv4/IPv6), localização do provedor, latência DNS e status de VPN.',
      keywords:
        'teste de velocidade, meu ip, ip público, velocidade download, velocidade upload, teste ping, latência, jitter, bufferbloat, ipv4, ipv6, localização ip, consulta asn, dns reverso, detecção vpn',
      breadcrumbLabel: 'Teste de Velocidade',
    },
    news: {
      title: 'Notícias de Cibersegurança, Redes e Tecnologia | TestLine',
      description:
        'Leia notícias RSS ao vivo sobre cibersegurança, banda larga, DNS, BGP e tecnologia de Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch e Ars Technica.',
      keywords: 'notícias cibersegurança, segurança de rede rss, cloudflare blog, quedas internet',
      breadcrumbLabel: 'Notícias',
    },
    blog: {
      title: 'Guias de Velocidade, IP Público e VPN | TestLine',
      description:
        'Explore 10 guias especializados sobre velocidade da internet, Mbps vs MB/s, endereços IPv4 e IPv6, golpes de IP, geolocalização, bufferbloat e detecção de VPN.',
      keywords: 'guia velocidade internet, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, detecção vpn',
      breadcrumbLabel: 'Blog',
    },
    about: {
      title: 'Sobre o TestLine — Ferramenta de Velocidade e Diagnóstico IP',
      description:
        'Saiba como o TestLine da ECORZO LLC mede largura de banda, ping, jitter, roteamento dual-stack IPv4/IPv6, latência DoH e sinais de VPN ou proxy.',
      keywords: 'sobre testline, ecorzo llc, metodologia teste velocidade, diagnóstico ip',
      breadcrumbLabel: 'Sobre',
    },
    privacy: {
      title: 'Política de Privacidade — IP Efêmero & Teste de Velocidade | TestLine',
      description:
        'Leia a Política de Privacidade do TestLine (ECORZO LLC) sobre consultas efêmeras de IP, zero armazenamento permanente, conformidade com o GDPR e cookies.',
      keywords: 'política privacidade testline, ecorzo llc, gdpr, sem registro de ip',
      breadcrumbLabel: 'Privacidade',
    },
    contact: {
      title: 'Contato TestLine & ECORZO LLC — Suporte de Rede',
      description:
        'Entre em contato com a ECORZO LLC sobre o teste de velocidade TestLine, consulta de IP, privacidade ou solicitações GDPR.',
      keywords: 'contato testline, ecorzo llc nova york, suporte rede, privacidade',
      breadcrumbLabel: 'Contato',
    },
    disclaimer: {
      title: 'Aviso Legal — Escopo de Medição e Consulta IP | TestLine',
      description:
        'Entenda as variáveis do teste de velocidade, gargalos de Wi-Fi, limites de geolocalização IP e escopo de detecção de VPN/proxy no TestLine.',
      keywords: 'aviso legal testline, precisão geolocalização ip, detecção vpn',
      breadcrumbLabel: 'Aviso Legal',
    },
    terms: {
      title: 'Termos e Condições — TestLine por ECORZO LLC',
      description:
        'Consulte os Termos e Condições que regem o uso aceitável das ferramentas de velocidade e consulta de IP do TestLine por ECORZO LLC.',
      keywords: 'termos e condições testline, ecorzo llc, uso aceitável',
      breadcrumbLabel: 'Termos e Condições',
    },
    'cookies-policy': {
      title: 'Política de Cookies e Armazenamento Local — TestLine',
      description:
        'Inspecione as chaves exatas de armazenamento local e divulgações de cookies utilizadas pelo TestLine da ECORZO LLC.',
      keywords: 'política cookies testline, local storage, consent mode v2',
      breadcrumbLabel: 'Política de Cookies',
    },
    'cookies-notice': {
      title: 'Aviso de Cookies e Preferências de Consentimento — TestLine',
      description:
        'Gerencie a qualquer momento suas preferências de cookies, análises e armazenamento local no TestLine da ECORZO LLC.',
      keywords: 'aviso de cookies, gerenciar consentimento, configurações privacidade',
      breadcrumbLabel: 'Aviso de Cookies',
    },
    gdpr: {
      title: 'GDPR e Política de Coleta de Dados — TestLine',
      description:
        'Conheça as bases legais do Artigo 6 do GDPR da ECORZO LLC, minimização de dados, transferências internacionais e direitos dos usuários.',
      keywords: 'política gdpr testline, proteção dados ecorzo llc, artigo 6 gdpr',
      breadcrumbLabel: 'GDPR e Dados',
    },
  },
  nav: {
    speedTest: 'Teste de Velocidade',
    news: 'Notícias',
    blog: 'Blog',
    about: 'Sobre',
    contact: 'Contato',
    privacy: 'Privacidade',
    stopTest: 'Parar Teste',
    newBadgeSuffix: 'novo',
    homeAria: 'Página inicial TestLine',
    primaryNavAria: 'Páginas principais',
    mobileNavAria: 'Páginas móveis',
    companyMenuAria: 'Menu TestLine: Sobre, Contato e Política de Privacidade',
  },
  pwa: {
    installApp: 'Instalar App',
    installAria: 'Instalar aplicativo TestLine',
    installIosAria: 'Instalar TestLine no iPhone ou iPad',
    iosTitle: 'Instalar TestLine no iPhone / iPad',
    closeDialog: 'Fechar janela',
    iosStep1Prefix: 'Toque no botão',
    iosStep1Strong: 'Compartilhar',
    iosStep1Suffix: 'na barra do Safari.',
    iosStep2Prefix: 'Role para baixo e toque em',
    iosStep2Strong: 'Adicionar à Tela de Início',
    iosStep2Suffix: '.',
    iosStep3:
      'Abra o TestLine a qualquer hora—mesmo offline, o jogo Signal Runner inicia automaticamente.',
    gotIt: 'Entendi',
  },
  hero: {
    title: 'Teste de Velocidade da Internet & Consulta de IP Público',
    subtitle:
      'Verifique velocidade de download e upload, ping e jitter—além do endereço IPv4/IPv6, localização do provedor, latência DNS e status de VPN.',
    speedUnitAria: 'Unidade de velocidade',
    autoTooltip: 'Usa Mbps automaticamente abaixo de 100 Mbps e MB/s a partir de 100 Mbps',
    auto: 'Auto',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Escuro',
    switchToLight: 'Mudar para modo claro',
    switchToDark: 'Mudar para modo escuro',
    exportPdf: 'Exportar PDF',
    exportingPdf: 'Exportando...',
    exportDisabledTitle: 'Inicie um teste de velocidade antes de exportar um relatório PDF',
    exportEnabledTitle: 'Exportar relatório PDF de velocidade e diagnóstico de rede',
  },
  duplicateModal: {
    title: 'Relatório Já Baixado',
    closeDialog: 'Fechar janela',
    body: 'Você já baixou o relatório para esta execução de teste. Deseja baixá-lo novamente?',
    notePrefix: 'Cópias reexportadas são claramente identificadas como',
    secondCopy: 'Segunda Cópia',
    noteSuffix: 'no relatório.',
    cancel: 'Não, Cancelar',
    confirm: 'Sim, Baixar Novamente',
  },
  speedStage: {
    startSpeedTest: 'Iniciar Teste',
    yourSpeedIs: 'A velocidade da sua internet é',
    stopAria: 'Parar teste de velocidade',
    startAria: 'Iniciar teste de velocidade',
    retry: 'Tentar Novamente',
    statusIdle: 'Clique em Play para iniciar o teste de velocidade',
    statusPing: 'Medindo ping e jitter...',
    statusDownload: 'Testando velocidade de download...',
    statusUpload: 'Testando velocidade de upload...',
    statusComplete: 'Teste de velocidade concluído',
    statusStopped: 'Teste interrompido',
    statusError: 'Teste interrompido por erro',
    uploadSpeed: 'Velocidade de Upload',
    peakPrefix: 'Pico',
    twoStreams: '2 fluxos paralelos',
    latencyAvgPing: 'Latência (Ping Médio)',
    minPrefix: 'Mín',
    probesSuffix: 'sondas',
    fiveProbes: '5 sondas RTT Cloudflare',
    jitter: 'Jitter',
    consecutiveVariance: 'Variação RTT consecutiva',
    waitingRtt: 'Aguardando amostras RTT',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Aviso de detecção de Proxy ou VPN',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy Detectado',
      'Datacenter / Relay Network': 'Rede de Datacenter / Retransmissão',
      'Timezone Mismatch (Possible VPN)': 'Incompatibilidade de Fuso Horário (Possível VPN)',
      'Direct Connection': 'Conexão Direta',
    },
    confidence: {
      High: 'Alta',
      Moderate: 'Moderada',
      Low: 'Baixa',
    },
    confidenceWord: 'confiança',
    signalSingular: 'sinal',
    signalPlural: 'sinais',
    noticeDesc:
      'Sua conexão apresenta características de proxy, VPN ou datacenter. As medições refletem o túnel ativo ou nó de saída.',
    observedExitIp: 'IP de Saída Observado',
    relayOperator: 'Operadora / Rede de Saída',
    exitLocationTz: 'Localização de Saída e Fuso',
    detectedIndicators: 'Indicadores Detectados',
    unavailable: 'Indisponível',
    signalTemplates: {
      proxy_flag: 'O endereço IP está sinalizado como proxy ativo, VPN ou saída Tor',
      hosting_flag:
        'O tráfego origina-se de um ASN de datacenter / hospedagem e não de um provedor residencial',
      provider_keyword: 'Operadora ou PTR corresponde a palavra-chave de retransmissão ({1})',
      via_header: 'Cabeçalho de encaminhamento proxy detectado ({1})',
      multi_hop: 'Múltiplos saltos de encaminhamento observados ({1} saltos)',
      ip_mismatch: 'IP direto do navegador difere do IP observado na borda (split-tunnel ou proxy)',
      timezone_mismatch:
        'O fuso horário do navegador ({1}) difere do fuso de geolocalização IP ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Endereço IP Público',
    resolvingRoute: 'Resolvendo rota',
    routeSuffix: 'rota',
    updatedPrefix: 'Atualizado',
    unavailable: 'Indisponível',
    metadataUnavailable: 'Metadados de rede indisponíveis',
    copyIp: 'Copiar IP',
    copiedIp: 'IP Copiado',
    refresh: 'Atualizar',
    ipv46CardTitle: 'IPv4, IPv6 e Roteamento do Provedor',
    ipv46CardSubtitle: 'Sondas dual-stack no cliente combinadas com geolocalização IP na borda',
    ipv4Label: 'Endereço IPv4',
    ipv6Label: 'Endereço IPv6',
    notDetected: 'Não detectado',
    ipv6NotDetected: 'Não detectado (rota apenas IPv4)',
    ispLabel: 'Provedor / Operadora (ISP)',
    asnLabel: 'Sistema Autônomo (ASN)',
    locationLabel: 'Localização Aproximada',
    proxyCheckLabel: 'Verificação Proxy / VPN',
    resolving: 'Resolvendo...',
    inspecting: 'Inspecionando...',
    directConnectionNone: 'Conexão direta (Nenhum detectado)',
    dnsCardTitle: 'Dicas de DNS e Diagnóstico do Link',
    dnsCardSubtitle: 'Registro PTR reverso, acessibilidade DoH e sinais de transporte do navegador',
    ptrLabel: 'DNS Reverso (PTR)',
    noPtr: 'Nenhum registro PTR publicado',
    dohProbeLabel: 'Sonda de Resolvedor DoH',
    probing: 'Testando...',
    reachable: 'Acessível',
    blockedOrUnreachable: 'Bloqueado ou inacessível',
    dnsLatencyLabel: 'Latência de Consulta DNS',
    protocolLabel: 'Protocolo de Transporte',
    checking: 'Verificando...',
    linkHintLabel: 'Dica de Conexão do Navegador',
    exposedNoMetrics: 'Exposto sem métricas',
    notExposed: 'Não exposto pelo navegador',
    timezoneLabel: 'Fuso Horário',
    copy: 'Copiar',
    copied: 'Copiado',
    capSuffix: 'Mbps máx.',
    rttSuffix: 'ms RTT',
    fetchError: 'Não foi possível alcançar os endpoints de diagnóstico IP.',
  },
  history: {
    title: 'Histórico de Medições da Sessão',
    subtitle: 'Medições recentes salvas localmente no seu navegador',
    clearHistory: 'Limpar Histórico',
    emptyText: 'Os testes concluídos aparecerão aqui para comparar execuções consecutivas.',
    colTime: 'Hora',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'IP Público',
  },
  consent: {
    title: 'Aviso de Cookies e Privacidade',
    description:
      'O TestLine usa armazenamento local essencial para tema, unidades e histórico. Cookies opcionais de análise e anúncios ficam desativados até você aceitar.',
    acceptAll: 'Aceitar Tudo',
    essentialOnly: 'Apenas Essenciais',
    cookieSettings: 'Configurações de Cookies',
  },
  footer: {
    byEcorzo: 'por ECORZO LLC',
    tagline:
      'Teste de velocidade da internet em tempo real e diagnóstico IP dual-stack operado pela ECORZO LLC.',
    companyHeading: 'Empresa',
    legalHeading: 'Legal e Conformidade',
    disclaimer: 'Aviso Legal',
    terms: 'Termos e Condições',
    cookiesPolicy: 'Política de Cookies',
    cookiesNotice: 'Aviso de Cookies',
    gdpr: 'Política GDPR e Dados',
    privacy: 'Política de Privacidade',
    copyrightSuffix: 'ECORZO LLC. Todos os direitos reservados.',
    poweredBy:
      'Medições com endpoints Cloudflare · Em conformidade com GDPR e políticas do Google',
    languageLabel: 'Idioma',
    autoOption: 'Auto (Região)',
  },
  news: {
    eyebrow: 'Agregador RSS Ao Vivo de Cibersegurança e Tecnologia',
    updatedPrefix: 'Atualizado',
    title: 'Notícias de Rede, Segurança e Tecnologia',
    filterPlaceholder: 'Filtrar manchetes...',
    filterAria: 'Filtrar manchetes de notícias',
    refreshFeeds: 'Atualizar Feeds',
    refreshing: 'Atualizando...',
    cachedBannerPrefix:
      'Os feeds RSS ao vivo estão inacessíveis no momento. Exibindo notícias em cache salvas neste dispositivo',
    retryLive: 'Tentar Feeds Ao Vivo',
    retrying: 'Tentando...',
    allSources: 'Todas as Fontes',
    errorFallback:
      'Não foi possível carregar os feeds RSS ao vivo agora. Verifique sua conexão e atualize.',
    tryAgain: 'Tentar Novamente',
    emptyText: 'Nenhuma notícia correspondente encontrada nos feeds RSS atuais.',
    showAll: 'Mostrar Todos os Feeds',
    newTag: 'Novo',
    readFullStory: 'Ler Matéria Completa',
    recent: 'Recente',
    minutesAgo: 'há {n}m',
    hoursAgo: 'há {n}h',
  },
  blog: {
    eyebrow: 'Guias TestLine & Resumo Diário de Notícias',
    articlesCountSuffix: 'Artigos',
    title: 'Velocidade da Internet, Diagnóstico IP e Boletins Diários',
    subtitle:
      'Guias completos sobre velocidade de internet, IPv4/IPv6, golpes de IP, localização IP e detecção de VPN—além de 2 notícias diárias curadas automaticamente dos nossos feeds RSS.',
    searchPlaceholder: 'Pesquisar {n} artigos...',
    searchAria: 'Pesquisar artigos do blog',
    allLabel: 'Todos',
    hotNewsLabel: 'Em Alta',
    dailyHotNewsBadge: 'Destaque Diário',
    emptyText: 'Nenhum artigo corresponde ao filtro atual.',
    resetFilters: 'Redefinir Filtros',
    newTag: 'Novo',
    readArticle: 'Ler Artigo',
    backToAllPrefix: 'Voltar para Todos os',
    backToAllSuffix: 'Artigos',
    originalSourcePrefix: 'Fonte Original',
    testConnectionNow: 'Testar Conexão Agora',
    keyTakeaways: 'Pontos-Chave',
    dailyReadTime: '3 min de leitura',
    dailyAuthorPrefix: 'Resumo Diário TestLine · via',
    dailyTakeawayFeatured:
      'Destaque do boletim diário de notícias quentes do TestLine ({source}) em {topic}.',
    dailyTakeawaySummaryPrefix: 'Resumo principal:',
    dailyTakeawayTip:
      'Sempre confirme seu endereço IPv4/IPv6 público ativo, latência DNS e status de VPN/proxy antes de investigar alertas inesperados de conexão.',
    dailySectionBriefingPrefix: 'Boletim Diário:',
    dailyBriefingPara2:
      'Selecionado automaticamente para o resumo diário TestLine de {date} com base na atualidade e impacto em redes e cibersegurança. Acesse o link da fonte primária acima para ler o relatório técnico original.',
    dailySectionActionTitle: 'Diagnóstico de Rede e Ação Prática',
    dailyActionPara1:
      'Eventos envolvendo {topic} frequentemente afetam resolvedores DNS de provedores, tabelas de roteamento, gateways VPN corporativos e conectividade de dispositivos. Executar um teste de velocidade e verificação IP dual-stack confirma rapidamente se sua linha apresenta jitter elevado ou alterações de rota.',
    dailyActionPara2:
      'Acompanhe vulnerabilidades emergentes e avisos de banda larga na aba Notícias do TestLine e consulte nossos guias de segurança no Blog.',
    categories: {
      'Hot News': 'Em Alta',
      'Internet Speed': 'Velocidade',
      'IP Addresses': 'Endereços IP',
      'IP Scams': 'Golpes IP',
      'IP Location': 'Localização IP',
      'VPN IP Status': 'Status IP VPN',
    },
    posts: {
      'real-world-download-speed-mbps-vs-mbs': {
        title: 'Por Que Sua Velocidade Real de Download Difere do Plano Contratado',
        readTime: '5 min de leitura',
        author: 'Engenharia TestLine',
        summary:
          'Entenda por que um plano de 500 Mbps baixa arquivos a 50–60 MB/s, como a sobrecarga TCP/TLS afeta a taxa real e por que múltiplos fluxos são mais precisos.',
        keyTakeaways: [
          'Provedores anunciam em megabits por segundo (Mbps), enquanto navegadores mostram megabytes por segundo (MB/s) na proporção de 8 para 1.',
          'Distância do Wi-Fi, interferência em 2,4 GHz e roteadores antigos frequentemente limitam planos de fibra antes mesmo da rede do provedor.',
          'Fluxos HTTP paralelos revelam a largura de banda agregada real com muito mais precisão que um único download.',
        ],
        sections: [
          {
            heading: 'Megabits (Mbps) vs. Megabytes (MB/s)',
            paragraphs: [
              'A maior fonte de dúvida ao medir a internet é a diferença entre megabits por segundo (Mbps) e megabytes por segundo (MB/s). Como 1 byte equivale a 8 bits, uma conexão de fibra de 400 Mbps entrega no máximo teórico 50 MB/s.',
              'Considerando cabeçalhos IP, Ethernet e criptografia TLS, a taxa útil real fica entre 90% e 94% da velocidade contratada. O TestLine permite alternar entre Auto, Mbps e MB/s.',
            ],
          },
          {
            heading: 'Por Que Medições Multi-Fluxo Importam',
            paragraphs: [
              'Transferências únicas sofrem limitação da janela TCP e da latência de ida e volta. Executar 3 fluxos paralelos satura o link corretamente e revela a capacidade real do modem e da operadora.',
            ],
          },
        ],
      },
      'ping-vs-jitter-video-calls-and-gaming': {
        title: 'Ping vs. Jitter Explicado: O Que Realmente Estraga Videochamadas e Jogos',
        readTime: '5 min de leitura',
        author: 'Engenharia TestLine',
        summary:
          'Alta banda de download não salva uma chamada ou partida online se a latência oscila. Veja como ping, jitter e bufferbloat impactam o tráfego em tempo real.',
        keyTakeaways: [
          'Ping mede o tempo médio de ida e volta (RTT) em milissegundos; abaixo de 30 ms a resposta é quase instantânea.',
          'Jitter mede a variação entre pacotes consecutivos—acima de 20–25 ms causa travamentos de áudio mesmo com ping médio baixo.',
          'Uploads pesados durante chamadas causam picos de bufferbloat se o roteador não utilizar SQM/QoS.',
        ],
        sections: [
          {
            heading: 'Latência É Agilidade de Resposta',
            paragraphs: [
              'A banda larga define a largura da via; o ping mede quão rápido um pacote vai e volta ao servidor. Streaming 4K usa buffer antecipado, enquanto jogos e chamadas de voz sentem cada milissegundo de atraso.',
            ],
          },
          {
            heading: 'Por Que o Jitter Causa Cortes no Áudio',
            paragraphs: [
              'Quando sondas consecutivas retornam 14 ms, 92 ms e 16 ms, os codecs de áudio precisam descartar ou esticar quadros. Ativar SQM no roteador evita que uploads em segundo plano prejudiquem chamadas.',
            ],
          },
        ],
      },
      'ipv4-vs-ipv6-dual-stack-explained': {
        title: 'IPv4 vs. IPv6: Por Que Redes Dual-Stack São Essenciais Hoje',
        readTime: '6 min de leitura',
        author: 'Pesquisa de Rede TestLine',
        summary:
          'Com o esgotamento dos endereços IPv4 e o uso de CGNAT nas operadoras, entender como seu dispositivo roteia IPv4 e IPv6 é essencial para diagnósticos.',
        keyTakeaways: [
          'O IPv4 usa endereços de 32 bits (~4,3 bilhões), levando provedores a compartilhar um IP entre vários clientes via CGNAT.',
          'O IPv6 usa endereços hexadecimais de 128 bits, restaurando roteamento direto ponta a ponta sem NAT múltiplo.',
          'Testes dual-stack verificam se o dispositivo possui rotas públicas IPv4 e IPv6 simultaneamente.',
        ],
        sections: [
          {
            heading: 'Esgotamento do IPv4 e CGNAT',
            paragraphs: [
              'Como blocos IPv4 não alocados acabaram, operadoras de fibra e 5G colocam assinantes atrás de Carrier-Grade NAT (CGNAT), compartilhando o mesmo IP público entre dezenas de residências.',
            ],
          },
          {
            heading: 'Como o Dual-Stack Melhora a Conexão',
            paragraphs: [
              'Sistemas modernos preferem IPv6 via Happy Eyeballs quando disponível, reduzindo saltos de tradução NAT e evitando bloqueios causados por outros usuários do mesmo IP compartilhado.',
            ],
          },
        ],
      },
      'public-vs-private-ip-and-reverse-dns': {
        title: 'IP Público vs. IP Privado e Como o DNS Reverso (PTR) Identifica Operadoras',
        readTime: '4 min de leitura',
        author: 'Pesquisa de Rede TestLine',
        summary:
          'Por que seu celular mostra 192.168.1.45 nas configurações de Wi-Fi enquanto os sites veem outro IP público—e o que o registro PTR revela.',
        keyTakeaways: [
          'Faixas privadas RFC 1918 (10.x, 172.16–31.x, 192.168.x) existem apenas dentro da sua rede local.',
          'O roteador troca seu endereço interno pelo IP público da operadora usando NAT.',
          'O DNS reverso (PTR) associa o IP público a um nome de host que indica operadora e região.',
        ],
        sections: [
          {
            heading: 'Dentro do Roteador vs. Internet Pública',
            paragraphs: [
              'Endereços internos como 192.168.1.24 não são roteáveis na internet pública. Sempre que o tráfego sai para a web, o NAT substitui o endereço de origem pelo IP WAN público.',
            ],
          },
          {
            heading: 'Lendo Pistas de DNS Reverso (PTR)',
            paragraphs: [
              'Provedores publicam registros PTR descritivos que ajudam ferramentas de diagnóstico a distinguir conexões residenciais de servidores em nuvem.',
            ],
          },
        ],
      },
      'ip-scams-your-ip-was-hacked-popups': {
        title: 'Como Identificar Golpes Falsos de "Seu IP Foi Hackeado"',
        readTime: '5 min de leitura',
        author: 'Segurança TestLine',
        summary:
          'Pop-ups maliciosos exibem seu IP real e sua cidade para causar pânico. Saiba por que todo site recebe seu IP automaticamente e o que golpistas não conseguem fazer.',
        keyTakeaways: [
          'Qualquer site visitado recebe seu IP público via roteamento HTTP padrão—exibi-lo não indica invasão.',
          'Alertas falsos pressionam vítimas a ligar para suportes falsos ou instalar acesso remoto.',
          'Um IP público sozinho não revela nome completo, endereço residencial ou senhas bancárias.',
        ],
        sections: [
          {
            heading: 'Por Que Mostrar Seu IP É Um Truque Psicológico',
            paragraphs: [
              'Anúncios enganosos exibem banners vermelhos com seu IP real para parecerem legítimos. Como qualquer servidor web precisa do IP para entregar a página, o alerta é apenas teatro digital.',
            ],
          },
          {
            heading: 'O Que Um Endereço IP Expõe — e Não Expõe',
            paragraphs: [
              'O IP aponta apenas o gateway do provedor e a área metropolitana aproximada. Nunca ligue para telefones em pop-ups nem conceda acesso remoto.',
            ],
          },
        ],
      },
      'ip-spoofing-and-residential-proxy-abuse': {
        title: 'IP Spoofing, Falsificação de Cabeçalhos e Golpes de Proxy Residencial',
        readTime: '6 min de leitura',
        author: 'Segurança TestLine',
        summary:
          'De cabeçalhos X-Forwarded-For forjados a aplicativos gratuitos que transformam conexões domésticas em nós de proxy residencial.',
        keyTakeaways: [
          'Forjar um IP TCP bruto não completa um handshake HTTPS normal; por isso invasores exploram SDKs em apps gratuitos.',
          'Alguns apps de "VPN grátis" alugam silenciosamente seu IP residencial para terceiros.',
          'Verificar PTR, ASN e cabeçalhos de encaminhamento garante que não haja retransmissão oculta.',
        ],
        sections: [
          {
            heading: 'O Custo Oculto de Apps de Proxy Gratuitos',
            paragraphs: [
              'Como IPs residenciais têm alta reputação, extensões suspeitas e APKs gratuitos às vezes incorporam SDKs de proxy que roteiam tráfego de terceiros pela sua internet.',
            ],
          },
          {
            heading: 'Verificando Roteamento Limpo',
            paragraphs: [
              'Auditar extensões instaladas e rodar verificações periódicas de proxy no TestLine confirma que seu IP público mapeia diretamente ao seu provedor.',
            ],
          },
        ],
      },
      'how-ip-geolocation-works-accuracy-limits': {
        title: 'Como Funciona a Geolocalização IP e Por Que a Cidade Pode Estar Errada',
        readTime: '5 min de leitura',
        author: 'Pesquisa de Rede TestLine',
        summary:
          'Endereços IP não contêm coordenadas GPS. Entenda como bancos GeoIP estimam regiões e por que conexões 4G/5G aparecem em outros estados.',
        keyTakeaways: [
          'A geolocalização IP usa registros RIR, anúncios BGP e dados das operadoras, não GPS.',
          'Operadoras móveis concentram o tráfego em gateways regionais distantes.',
          'A precisão por país passa de 98%, enquanto localização exata por rua via IP é mito.',
        ],
        sections: [
          {
            heading: 'Sem GPS Dentro dos Pacotes IP',
            paragraphs: [
              'Sites que consultam seu IP dependem de tabelas GeoIP compiladas a partir de blocos WHOIS e medições de roteamento.',
            ],
          },
          {
            heading: 'Por Que IPs Móveis Mudam de Cidade',
            paragraphs: [
              'Se sua operadora 5G roteia o tráfego por um núcleo em outra metrópole, todas as ferramentas de IP exibirão aquela cidade.',
            ],
          },
        ],
      },
      'timezone-mismatch-and-isp-anycast-routing': {
        title: 'Diferença de Fuso Horário e Roteamento do Provedor: Por Que Sites Erram Sua Região',
        readTime: '4 min de leitura',
        author: 'Pesquisa de Rede TestLine',
        summary:
          'Por que sistemas antifraude comparam o fuso horário do navegador com o do IP—e quando conexões legítimas disparam alertas.',
        keyTakeaways: [
          'Mecanismos de segurança comparam o fuso horário Intl do navegador com o fuso registrado do IP.',
          'Backhaul interestadual ou roaming móvel podem gerar diferenças inofensivas.',
          'O TestLine exibe ambos os fusos lado a lado para transparência.',
        ],
        sections: [
          {
            heading: 'Como Funciona a Comparação de Fuso',
            paragraphs: [
              'Quando o relógio do sistema indica um continente e o IP aponta para outro, filtros detectam imediatamente um possível túnel VPN.',
            ],
          },
          {
            heading: 'Falsos Positivos em Redes Móveis',
            paragraphs: [
              'Usuários em fronteiras de fuso horário ou roaming móvel podem ver discrepâncias legítimas no roteamento.',
            ],
          },
        ],
      },
      'how-websites-detect-vpn-and-datacenter-ips': {
        title: 'Como os Sites Detectam VPN, Proxy ou IP de Datacenter',
        readTime: '6 min de leitura',
        author: 'Segurança TestLine',
        summary:
          'Quer saber como bancos e serviços identificam uma VPN ativa? Conheça os quatro principais sinais técnicos usados.',
        keyTakeaways: [
          'ASNs diferenciam rapidamente provedores em nuvem (DigitalOcean, Hetzner, AWS) de provedores residenciais.',
          'Cabeçalhos Via e X-Forwarded-For expõem proxies transparentes ou mal configurados.',
          'Padrões PTR e discrepâncias de fuso reforçam a pontuação de confiança.',
        ],
        sections: [
          {
            heading: 'Classificação por ASN: O Sinal Mais Forte',
            paragraphs: [
              'Todo IP pertence a um ASN. Como VPNs comerciais alugam servidores em datacenters, sites reconhecem imediatamente a faixa como hospedagem.',
            ],
          },
          {
            heading: 'Hostnames PTR, Cabeçalhos e Comportamento',
            paragraphs: [
              'Ferramentas de diagnóstico combinam PTR, cabeçalhos HTTP e fuso horário para confirmar se o túnel mascara sua origem.',
            ],
          },
        ],
      },
      'vpn-dns-leaks-ipv6-leaks-and-split-tunneling': {
        title: 'Vazamento DNS, Vazamento IPv6 e Split Tunneling: Testando Sua VPN',
        readTime: '5 min de leitura',
        author: 'Segurança TestLine',
        summary:
          'Mesmo com a VPN conectada, consultas DNS sem criptografia ou rotas IPv6 fora do túnel podem revelar sua localização real.',
        keyTakeaways: [
          'Um vazamento IPv6 ocorre quando a VPN encapsula apenas IPv4 e o sistema usa IPv6 nativo.',
          'Um vazamento DNS envia consultas de domínio ao provedor local fora do túnel.',
          'Verificar rotas IPv4/IPv6 e acessibilidade DoH garante a integridade do túnel.',
        ],
        sections: [
          {
            heading: 'A Armadilha do Vazamento IPv6 em Dual-Stack',
            paragraphs: [
              'Em conexões modernas com IPv6 nativo, clientes VPN antigos podem deixar tráfego IPv6 sair diretamente pelo provedor.',
            ],
          },
          {
            heading: 'Conferindo o Túnel em Segundos',
            paragraphs: [
              'Após ativar sua VPN, rode um teste no TestLine e confirme se o ISP e os endereços IPv4/IPv6 pertencem ao nó de saída esperado.',
            ],
          },
        ],
      },
    },
  },
  game: {
    internetRestored: 'Internet Restaurada',
    offlineMode: 'Modo Offline — Internet Desconectada',
    connectionActive: 'A conexão está ativa novamente',
    playWhileWaiting: 'Jogue Signal Runner enquanto aguarda a reconexão',
    score: 'Pontos',
    best: 'Recorde',
    muteAria: 'Silenciar som do jogo',
    unmuteAria: 'Ativar som do jogo',
    pauseAria: 'Pausar jogo',
    resumeAria: 'Retomar jogo',
    returnToSpeedTest: 'Voltar ao Teste de Velocidade',
    checking: 'Verificando...',
    checkConnection: 'Verificar Conexão',
    canvasAria: 'Tela do jogo offline Signal Runner',
    title: 'Signal Runner',
    subtitle:
      'Pule torres, espinhos e drones até sua internet voltar. O salto duplo está ativado.',
    startGame: 'Iniciar Jogo',
    tapHint: 'Toque na tela ou pressione Espaço / Seta para Cima para pular',
    paused: 'Jogo Pausado',
    resume: 'Continuar',
    gameOver: 'Sinal Interrompido',
    cleared: 'Superados:',
    newBest: 'Novo Recorde!',
    playAgain: 'Jogar Novamente',
    backToSpeedTest: 'Voltar ao Teste',
    jump: 'Pular',
    fastDrop: 'Queda Rápida',
    desktopHintPrefix: 'Teclado:',
    desktopJump: 'Pular',
    desktopDrop: 'Descer',
    desktopPause: 'Pausar',
  },
  faq: {
    tableTitle: 'Referência de Teste de Velocidade e Consulta IP',
    tableSubtitle:
      'O TestLine da ECORZO LLC mede banda de download/upload, ping, jitter, endereços IPv4/IPv6, geolocalização IP, velocidade DNS e sinais de VPN ou proxy.',
    readGuidesLink: 'Ler 10 Guias de Velocidade e IP',
    colMetric: 'Métrica',
    colMethod: 'Método de Medição',
    colThreshold: 'Meta Ideal',
    colImpact: 'Impacto Principal',
    benchmarks: [
      {
        metric: 'Download (Mbps / MB/s)',
        method: '3 fluxos HTTP paralelos de 25 MB (janela de 10s)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Multiusuário)',
        standardUse: 'Streaming, downloads, sincronização em nuvem',
      },
      {
        metric: 'Upload (Mbps / MB/s)',
        method: '2 fluxos XHR POST paralelos de 10 MB',
        optimal: '10+ Mbps (Chamadas HD) · 25+ Mbps (Criadores)',
        standardUse: 'Videochamadas, backups, transmissões ao vivo',
      },
      {
        metric: 'Ping e Latência Livre',
        method: '5 sondas RTT sequenciais Cloudflare de 0 byte',
        optimal: '< 30 ms (Baixo) · 30–60 ms (Normal)',
        standardUse: 'Jogos online, VoIP, agilidade na web',
      },
      {
        metric: 'Jitter e Bufferbloat',
        method: 'Variação média entre RTTs consecutivos',
        optimal: '< 10 ms (Estável) · > 25 ms (Congestionado)',
        standardUse: 'Estabilidade de áudio e vídeo sob carga',
      },
      {
        metric: 'Latência DNS DoH e PTR',
        method: 'Consulta criptografada 1.1.1.1 + DNS reverso PTR',
        optimal: '< 40 ms na resolução DNS',
        standardUse: 'Velocidade de nomes e verificação da operadora',
      },
      {
        metric: 'IP Dual-Stack, Geo e VPN',
        method: 'IPv4/IPv6 + ISP/ASN + Auditoria de cabeçalho/fuso',
        optimal: 'IP direto do provedor ou nó VPN verificado',
        standardUse: 'Qual é meu IP, localização IP e checagem VPN',
      },
    ],
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle:
      'Respostas diretas sobre teste de velocidade, meu IP, localização IP, status de VPN e privacidade',
    newsLink: 'Notícias de Segurança e Rede',
    methodologyLink: 'Metodologia Completa',
    gdprLink: 'GDPR e Dados',
    items: [
      {
        question: 'Quão rápida é a minha velocidade de download e upload?',
        answer:
          'Clique no botão Iniciar Teste para medir em tempo real sua velocidade de download e upload em Mbps ou MB/s utilizando múltiplos fluxos HTTP paralelos na borda da Cloudflare.',
      },
      {
        question: 'Qual é o meu endereço IPv4 e IPv6 público?',
        answer:
          'Ao iniciar um teste no TestLine, a sonda dual-stack detecta seu IPv4 e IPv6 públicos lado a lado com botões de cópia rápida, além da cidade, país, provedor (ISP) e ASN.',
      },
      {
        question: 'O que são bons valores de ping, jitter e bufferbloat?',
        answer:
          'Ping abaixo de 30 ms e jitter inferior a 10 ms garantem chamadas e jogos fluidos. Picos altos de latência durante uploads indicam bufferbloat.',
      },
      {
        question: 'Qual a precisão da geolocalização IP para verificar minha localização?',
        answer:
          'A consulta associa o bloco IP ao país, estado e cidade registrados pelo provedor. A precisão é regional e nunca revela seu endereço residencial exato.',
      },
      {
        question: 'Como o TestLine detecta VPN, proxy ou IP de datacenter?',
        answer:
          'Analisamos cabeçalhos HTTP de encaminhamento, ASNs de hospedagem/datacenter, nomes reversos (PTR) e incompatibilidade entre o fuso horário do navegador e o do IP.',
      },
      {
        question: 'O que é latência DNS-over-HTTPS (DoH) e DNS reverso (PTR)?',
        answer:
          'A latência DoH mede o tempo de resolução de domínios via HTTPS criptografado no Cloudflare 1.1.1.1, enquanto o PTR exibe o nome de host canônico atribuído ao seu IP.',
      },
      {
        question: 'A ECORZO LLC registra ou armazena meu IP ou resultados?',
        answer:
          'Não. Os diagnósticos são processados de forma efêmera em memória e o histórico recente permanece apenas no navegador do usuário.',
      },
      {
        question: 'Posso usar o TestLine como app ou jogar offline se a internet cair?',
        answer:
          'Sim. O TestLine é um PWA instalável e abre automaticamente o jogo Signal Runner sempre que o dispositivo fica offline.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Voltar ao Teste de Velocidade',
    effectiveDatePrefix: 'Data de Vigência:',
    operatorLabel: 'Operadora: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'Sobre o TestLine',
      subtitle:
        'Criado pela ECORZO LLC para oferecer teste de velocidade transparente e diagnóstico público IPv4/IPv6 em um aplicativo web rápido e privado.',
      sections: [
        {
          heading: 'O Que o TestLine Mede',
          paragraphs: [
            'O TestLine é uma ferramenta gratuita de teste de velocidade e diagnóstico IP operada pela ECORZO LLC. Ao clicar em Iniciar Teste, o navegador executa medições em tempo real sem necessidade de cadastro.',
          ],
          bullets: [
            {
              strong: 'Velocidade de Download e Upload (Mbps / MB/s):',
              text: 'Executa fluxos HTTP paralelos contra a rede de borda da Cloudflare em unidades Auto, Mbps ou MB/s.',
            },
            {
              strong: 'Ping, Jitter e Saúde de Latência:',
              text: 'Mede sondas RTT sequenciais para calcular ping médio, mínimo e variação de jitter.',
            },
            {
              strong: 'IPv4/IPv6, Localização, ISP e ASN:',
              text: 'Identifica endereços IPv4 e IPv6, localização aproximada, operadora, ASN, PTR e latência DoH.',
            },
            {
              strong: 'Detecção de VPN, Proxy e Datacenter:',
              text: 'Avalia cabeçalhos proxy, ASNs de hospedagem, padrões PTR e alinhamento de fuso horário.',
            },
          ],
        },
      ],
      closingTitle: 'Base de Conhecimento, Notícias e Dados da Empresa',
      closingIntro: 'Explore nossos',
      closingGuidesLink: '10 Guias de Velocidade, IP e VPN',
      closingMid: 'ou leia manchetes ao vivo no',
      closingNewsLink: 'Feed RSS de Notícias TestLine',
      closingOutro:
        '. O TestLine é mantido pela ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, EUA. Visite nossa',
      closingContactLink: 'Página de Contato',
    },
    contact: {
      title: 'Contato ECORZO LLC',
      subtitle:
        'Fale com nossa equipe sobre diagnósticos do TestLine, solicitações de privacidade, GDPR ou conformidade legal.',
      telephone: 'Telefone',
      addressLabel: 'Endereço Comercial Registrado',
      copy: 'Copiar',
      copied: 'Copiado',
      formHeading: 'Enviar uma Mensagem',
      sentTitle: 'Mensagem Preparada',
      sentBodyPrefix:
        'Obrigado, {name}. Sua mensagem foi registrada para análise. Para assuntos urgentes de GDPR ou privacidade, ligue para +1 646 427 6802 ou escreva para ECORZO LLC, 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Enviar outra mensagem',
      nameLabel: 'Nome Completo',
      namePlaceholder: 'Maria Silva',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@exemplo.com',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Como a ECORZO LLC pode ajudar?',
      submitBtn: 'Enviar Mensagem',
      errMissing: 'Por favor, informe seu nome, e-mail e mensagem.',
      errInvalidEmail: 'Por favor, insira um endereço de e-mail válido.',
    },
    privacy: {
      title: 'Política de Privacidade',
      subtitle:
        'Como o TestLine da ECORZO LLC processa e protege informações diagnósticas de acordo com o GDPR e políticas do Google.',
      sections: [
        {
          heading: '1. Controlador de Dados e Escopo',
          paragraphs: [
            'Esta Política de Privacidade rege o uso do TestLine, operado pela ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Tel: +1 646 427 6802), em conformidade com o GDPR e a CCPA/CPRA.',
          ],
        },
        {
          heading: '2. Dados Processados Durante o Diagnóstico',
          bullets: [
            {
              strong: 'Telemetria de Rede e IP:',
              text: 'Seu IPv4/IPv6 público, ISP, ASN, cidade/país aproximados, PTR e cabeçalhos HTTP são processados apenas em memória de forma efêmera.',
            },
            {
              strong: 'Medições de Velocidade:',
              text: 'Resultados ficam armazenados exclusivamente no localStorage do navegador (testline_history_v1) e podem ser apagados a qualquer momento.',
            },
            {
              strong: 'Preferências do Navegador:',
              text: 'Tema (testline_theme), idioma e preferência de cookies (testline_cookie_consent) são salvos localmente.',
            },
          ],
        },
        {
          heading: '3. Serviços de Terceiros e Google',
          paragraphs: [
            'Para testes ao vivo, o navegador comunica-se com Cloudflare (speed.cloudflare.com, cloudflare-dns.com), IPWhois, GeoJS e Ipify. Serviços do Google seguem:',
          ],
        },
        {
          heading: '4. Sem Venda de Dados e Retenção',
          paragraphs: [
            'A ECORZO LLC não vende nem negocia seu endereço IP. Relatórios PDF são gerados inteiramente no navegador e nunca são enviados aos nossos servidores.',
          ],
        },
      ],
      googlePolicyLinkText:
        'Como o Google utiliza informações de sites ou apps que usam nossos serviços',
      rightsPrefix:
        'Você tem direito de acesso, retificação, exclusão e retirada de consentimento. Consulte nossa',
      gdprLinkText: 'Política GDPR e Coleta de Dados',
      rightsSuffix:
        'ou contate a ECORZO LLC pelo telefone +1 646 427 6802 ou em 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Aviso Legal',
      subtitle:
        'Limitações importantes sobre medições de velocidade, precisão de geolocalização IP e sinais de detecção VPN/proxy.',
      sections: [
        {
          heading: '1. Finalidade Apenas Informativa',
          paragraphs: [
            'O TestLine da ECORZO LLC é fornecido "como está" para diagnósticos gerais e não constitui certificação contratual da capacidade do provedor.',
          ],
        },
        {
          heading: '2. Variáveis que Afetam a Velocidade',
          paragraphs: [
            'Resultados variam conforme sinal Wi-Fi, hardware do roteador, downloads paralelos, criptografia VPN e congestionamento de rotas.',
          ],
        },
        {
          heading: '3. Precisão de Geolocalização e Proxy',
          paragraphs: [
            'Localizações representam o registro do bloco IP e nunca o endereço físico exato; sinais de VPN são heurísticos e podem variar em redes móveis ou CGNAT.',
          ],
        },
        {
          heading: '4. Limitação de Responsabilidade',
          paragraphs: [
            'Na máxima extensão permitida por lei, a ECORZO LLC não se responsabiliza por danos decorrentes do uso das medições ou relatórios exportados.',
          ],
        },
      ],
    },
    terms: {
      title: 'Termos e Condições',
      subtitle: 'Regras aplicáveis ao acesso e uso do TestLine por ECORZO LLC.',
      sections: [
        {
          heading: '1. Aceitação dos Termos',
          paragraphs: [
            'Ao acessar o TestLine, você concorda com estes Termos e Condições e com todas as leis aplicáveis.',
          ],
        },
        {
          heading: '2. Uso Permitido e Proibido',
          bullets: [
            {
              text: 'Você pode utilizar o TestLine para diagnósticos pessoais ou corporativos legítimos e gerar relatórios em PDF.',
            },
            {
              text: 'É proibido utilizar bots automatizados, scripts de estresse ou raspadores de alta frequência contra o TestLine ou endpoints parceiros.',
            },
            {
              text: 'É proibido tentar contornar limites de taxa ou apresentar relatórios como certificações regulatórias oficiais.',
            },
          ],
        },
        {
          heading: '3. Propriedade Intelectual',
          paragraphs: [
            'A marca TestLine, interface e código-fonte pertencem à ECORZO LLC.',
          ],
        },
        {
          heading: '4. Lei Aplicável e Foro',
          paragraphs: [
            'Estes Termos são regidos pelas leis do Estado de Nova York e dos Estados Unidos.',
          ],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Política de Cookies',
      subtitle: 'Detalhamento dos cookies e chaves de armazenamento local usados pelo TestLine.',
      sec1Title: '1. O Que São Cookies e Local Storage?',
      sec1Body:
        'Cookies são pequenos arquivos de texto e o localStorage guarda preferências de interface localmente no navegador sem enviar dados a cada requisição.',
      sec2Title: '2. Chaves Utilizadas pelo TestLine',
      colKey: 'Chave / Identificador',
      colCategory: 'Categoria',
      colPurpose: 'Finalidade',
      rows: [
        {
          key: 'testline_theme',
          category: 'Preferência Essencial',
          purpose: 'Lembra a escolha do modo Claro ou Escuro entre visitas.',
        },
        {
          key: 'testline_unit_v1',
          category: 'Preferência Essencial',
          purpose: 'Salva a unidade exibida (Auto, Mbps ou MB/s).',
        },
        {
          key: 'testline_history_v1',
          category: 'Funcional Local',
          purpose: 'Guarda até 15 resultados recentes de velocidade no navegador.',
        },
        {
          key: 'testline_cookie_consent',
          category: 'Consentimento Essencial',
          purpose: 'Registra sua escolha do Google Consent Mode v2.',
        },
      ],
      sec3Title: '3. Divulgações de Terceiros e Google',
      sec3Prefix:
        'De acordo com o Google Consent Mode v2, o armazenamento de anúncios e análises permanece negado até sua permissão. Vendedores autorizados em',
      sec3Mid: '. Você pode ajustar suas preferências na página',
      cookiesNoticeLinkText: 'Aviso de Cookies',
      sec3OrVia: 'ou em',
      googleAdSettingsText: 'Configurações de Anúncios do Google',
    },
    cookiesNotice: {
      title: 'Aviso de Cookies e Preferências de Consentimento',
      subtitle: 'Gerencie suas opções de cookies e armazenamento para o TestLine da ECORZO LLC.',
      sec1Title: 'Aviso aos Visitantes (EEE, Reino Unido, Suíça e Global)',
      sec1Body:
        'O TestLine utiliza armazenamento estritamente necessário para tema, unidades, histórico local e registro de consentimento. Conforme o Google Consent Mode v2, análises e anúncios começam desativados até sua escolha.',
      activeTitle: 'Seleção de Consentimento Ativa',
      currentSettingLabel: 'Configuração atual:',
      statusAll: 'Tudo Permitido (Modo Consentimento Análises e Anúncios)',
      statusEssential: 'Apenas Estritamente Essenciais',
      statusUnset: 'Ainda Não Selecionado (Não Essenciais Negados por Padrão)',
      savedBadge: 'Preferências Salvas',
      acceptAllBtn: 'Aceitar Todo Armazenamento Funcional',
      essentialOnlyBtn: 'Apenas Estritamente Essenciais',
      sec2Title: 'Controles no Navegador',
      sec2Body:
        'Você também pode limpar ou bloquear cookies diretamente nas configurações do navegador (Chrome, Safari, Firefox, Edge).',
    },
    gdpr: {
      title: 'GDPR e Política de Coleta de Dados',
      subtitle: 'Bases legais, minimização de dados e direitos sob o GDPR e padrões do Google.',
      sections: [
        {
          heading: '1. Controlador de Dados',
          paragraphs: [
            'Para efeitos do GDPR, o controlador de dados é a ECORZO LLC, 224 W 35th St STE 500, New York, NY 10001, EUA (Tel: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Bases Legais (Artigo 6 do GDPR)',
          bullets: [
            {
              strong: 'Execução do Serviço (Art. 6(1)(b)):',
              text: 'Processar seu IP e fluxos de banda é necessário para entregar o teste de velocidade e diagnóstico solicitados.',
            },
            {
              strong: 'Interesse Legítimo (Art. 6(1)(f)):',
              text: 'Proteger a plataforma contra abusos, ataques DDoS e garantir disponibilidade.',
            },
            {
              strong: 'Consentimento Explícito (Art. 6(1)(a)):',
              text: 'Cookies não essenciais são ativados somente após o seu consentimento explícito.',
            },
          ],
        },
        {
          heading: '3. Minimização e Retenção',
          paragraphs: [
            'Não exigimos cadastro, senha ou cartões. Consultas de IP são transitórias e nunca gravadas em perfis permanentes.',
          ],
        },
        {
          heading: '4. Transferências Internacionais',
          paragraphs: [
            'As medições utilizam nós de borda próximos da Cloudflare ou Google Cloud protegidos por Cláusulas Contratuais Padrão (SCCs).',
          ],
        },
        {
          heading: '5. Seus Direitos Legais',
          bullets: [
            { strong: 'Acesso e Portabilidade:', text: 'Solicitar confirmação e cópia estruturada dos dados.' },
            { strong: 'Retificação e Exclusão:', text: 'Solicitar correção ou remoção de dados pessoais.' },
            { strong: 'Oposição e Restrição:', text: 'Opor-se ou retirar o consentimento a qualquer momento.' },
            { strong: 'Reclamação:', text: 'Apresentar queixa à autoridade de proteção de dados.' },
          ],
        },
        {
          heading: '6. Privacidade de Menores',
          paragraphs: [
            'O TestLine não coleta intencionalmente dados de menores de 13 anos (ou 16 no EEE). Contato: +1 646 427 6802.',
          ],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'Relatório de Rede e Velocidade TestLine',
    generated: 'Gerado em',
    unit: 'Unidade',
    secondCopyBanner: 'SEGUNDA CÓPIA  —  Download Duplicado de Relatório',
    sec1Title: '1. Resumo de Velocidade',
    downloadSpeed: 'Velocidade Download',
    uploadSpeed: 'Velocidade Upload',
    avgPing: 'Ping Médio',
    jitter: 'Jitter',
    peak: 'Pico',
    sustained: 'Fluxo contínuo',
    min: 'Mín',
    probes: 'sondas',
    rttProbes: 'sondas RTT',
    sec2Title: '2. Detecção de Proxy e VPN',
    directClean: 'Conexão Direta — Nenhum sinal de proxy ou VPN detectado',
    sec3Title: '3. Diagnóstico de Rede, IP e DNS',
    sec4Title: '4. Execuções Recentes da Sessão',
    confidenceWord: 'confiança',
    pageOf: 'Página {p} de {total}',
    secondCopyShort: 'Segunda Cópia',
    rowPrimaryIp: 'IP Público Principal',
    rowIpv4: 'Endereço IPv4',
    rowIpv6: 'Endereço IPv6',
    rowIsp: 'Provedor / Operadora',
    rowAsn: 'Sistema Autônomo (ASN)',
    rowLocation: 'Localização Aproximada',
    rowTimezone: 'Fuso Horário',
    rowPtr: 'DNS Reverso (PTR)',
    rowDoh: 'Sonda Resolvedor DoH',
    rowProtocol: 'Protocolo de Transporte',
    rowLinkHint: 'Dica de Link do Navegador',
    notDetected: 'Não detectado',
    noPtr: 'Nenhum registro PTR publicado',
    reachable: 'Acessível',
    unreachable: 'Inacessível',
    notExposed: 'Não exposto pelo navegador',
    available: 'Disponível',
    colTime: 'Hora',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'IP Público',
  },
};
