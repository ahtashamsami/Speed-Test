import { BLOG_POSTS } from '../../data/blogPosts';
import type { LocalizedBlogContent, TranslationPack } from '../types';

const EN_BLOG_POSTS: Record<string, LocalizedBlogContent> = Object.fromEntries(
  BLOG_POSTS.map((post) => [
    post.id,
    {
      title: post.title,
      readTime: post.readTime,
      author: post.author,
      summary: post.summary,
      keyTakeaways: post.keyTakeaways,
      sections: post.sections,
    },
  ])
);

export const enPack: TranslationPack = {
  meta: {
    lang: 'en',
    intlLocale: 'en-US',
    dir: 'ltr',
    nativeName: 'English',
  },
  seo: {
    home: {
      title: 'TestLine — Internet Speed Test & Public IP Lookup',
      description:
        'Test your internet download & upload speed, ping, and jitter, and check what is my IP address (IPv4/IPv6), ISP location, DNS latency, and VPN status.',
      keywords:
        'internet speed test, what is my ip, what is my ip address, public ip address, download speed, upload speed, ping test, latency, jitter, bufferbloat, ipv4, ipv6, ip location, isp lookup, asn lookup, reverse dns, vpn detection, proxy check',
      breadcrumbLabel: 'Speed Test',
    },
    news: {
      title: 'Cybersecurity, Network & Internet News | TestLine',
      description:
        'Read live RSS cybersecurity, broadband, DNS, BGP, and tech news from Bleeping Computer, The Hacker News, Cloudflare Blog, TechCrunch, and Ars Technica.',
      keywords:
        'cybersecurity news, network security rss, bleeping computer, the hacker news, cloudflare blog, techcrunch, krebs on security, ars technica, internet outages',
      breadcrumbLabel: 'News',
    },
    blog: {
      title: 'Internet Speed, IP Lookup & VPN Guides | TestLine',
      description:
        'Explore 10 expert guides on internet speed, Mbps vs MB/s, IPv4 & IPv6 addresses, IP scams, geolocation accuracy, bufferbloat, and VPN IP detection.',
      keywords:
        'internet speed guide, mbps vs mbs, ping vs jitter, ipv4 vs ipv6, cgnat, ip scams, ip address spoofing, ip geolocation accuracy, vpn ip detection, datacenter ip',
      breadcrumbLabel: 'Blog',
    },
    'chrome-extension': {
      title: 'Testline Speed Test Chrome Extension (Manifest V3) | TestLine',
      description:
        'Preview and download the Testline Speed Test Chrome Extension (Manifest V3): a 500×170 3D horizontal popup with live Cloudflare download/upload tests, Light/Dark toggle, and native PDF export.',
      keywords:
        'testline chrome extension, speed test chrome extension, manifest v3 speed test, download upload speed extension, pdf speed report extension',
      breadcrumbLabel: 'Chrome Extension',
    },
    about: {
      title: 'About TestLine — Speed Test & IP Diagnostics Tool',
      description:
        'Learn how TestLine by ECORZO LLC tests download/upload bandwidth, ping, jitter, dual-stack IPv4/IPv6 routing, DoH DNS latency, and VPN or proxy flags.',
      keywords:
        'about testline, ecorzo llc, speed test methodology, ip lookup architecture, doh latency, ptr reverse dns, vpn detection tool',
      breadcrumbLabel: 'About',
    },
    privacy: {
      title: 'Privacy Policy — Ephemeral IP & Speed Test | TestLine',
      description:
        "Read TestLine's Privacy Policy by ECORZO LLC covering ephemeral IP lookups, zero speed-log storage, GDPR compliance, and browser cookie disclosures.",
      keywords:
        'testline privacy policy, ecorzo llc privacy, ephemeral ip lookup, zero ip logging, gdpr speed test',
      breadcrumbLabel: 'Privacy Policy',
    },
    contact: {
      title: 'Contact TestLine & ECORZO LLC — Network Support',
      description:
        'Contact ECORZO LLC for TestLine internet speed test, IP lookup, privacy, or GDPR questions. Call +1 646 427 6802 or write our New York office.',
      keywords:
        'contact testline, ecorzo llc new york, network diagnostics support, privacy inquiry',
      breadcrumbLabel: 'Contact',
    },
    disclaimer: {
      title: 'Disclaimer — Speed & IP Lookup Scope | TestLine',
      description:
        'Understand internet speed test variables, Wi-Fi bottlenecks, IP geolocation accuracy limits, and VPN/proxy detection scope on TestLine by ECORZO LLC.',
      keywords:
        'speed test disclaimer, ip geolocation accuracy, vpn detection disclaimer, testline ecorzo llc',
      breadcrumbLabel: 'Disclaimer',
    },
    terms: {
      title: 'Terms & Conditions — TestLine by ECORZO LLC',
      description:
        'Review the Terms and Conditions governing acceptable use of the TestLine internet speed test and public IP lookup tools operated by ECORZO LLC.',
      keywords:
        'testline terms and conditions, ecorzo llc terms, acceptable use speed test, ip lookup terms',
      breadcrumbLabel: 'Terms & Conditions',
    },
    'cookies-policy': {
      title: 'Cookies Policy & Local Storage — TestLine',
      description:
        'Inspect the exact browser local storage keys and cookie disclosures used by TestLine by ECORZO LLC under GDPR and Google EU User Consent Policy.',
      keywords:
        'testline cookies policy, local storage speed test, google consent mode v2, ecorzo llc',
      breadcrumbLabel: 'Cookies Policy',
    },
    'cookies-notice': {
      title: 'Cookies Notice & Consent Settings — TestLine',
      description:
        'Manage your cookie, analytics, and browser local storage consent preferences for TestLine by ECORZO LLC at any time.',
      keywords:
        'cookies notice, manage cookie preferences, google consent mode, testline privacy settings',
      breadcrumbLabel: 'Cookies Notice',
    },
    gdpr: {
      title: 'GDPR & Data Collection Policy — TestLine',
      description:
        'Explore ECORZO LLC GDPR Article 6 lawful bases, data minimization standards, international transfers, and user data rights for TestLine.',
      keywords:
        'testline gdpr policy, ecorzo llc data protection, article 6 lawful basis, ephemeral ip processing',
      breadcrumbLabel: 'GDPR & Data Collection Policy',
    },
  },
  nav: {
    speedTest: 'Speed Test',
    news: 'News',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    stopTest: 'Stop Test',
    newBadgeSuffix: 'new',
    homeAria: 'TestLine Home',
    primaryNavAria: 'Primary pages',
    mobileNavAria: 'Mobile pages',
    companyMenuAria: 'TestLine menu: About, Contact, and Privacy Policy',
  },
  pwa: {
    installApp: 'Install App',
    installAria: 'Install TestLine app',
    installIosAria: 'Install TestLine on iPhone or iPad',
    iosTitle: 'Install TestLine on iPhone / iPad',
    closeDialog: 'Close dialog',
    iosStep1Prefix: 'Tap the',
    iosStep1Strong: 'Share',
    iosStep1Suffix: "button in Safari's toolbar.",
    iosStep2Prefix: 'Scroll down and tap',
    iosStep2Strong: 'Add to Home Screen',
    iosStep2Suffix: '.',
    iosStep3:
      'Open TestLine anytime—even offline, the Signal Runner game launches automatically.',
    gotIt: 'Got It',
  },
  hero: {
    title: 'Internet Speed Test & Public IP Lookup',
    subtitle:
      'Check download & upload speed, ping, and jitter—plus your IPv4/IPv6 address, ISP location, DNS latency, and VPN status.',
    speedUnitAria: 'Speed unit',
    autoTooltip: 'Automatically uses Mbps below 100 Mbps and MB/s at 100 Mbps or higher',
    auto: 'Auto',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    exportPdf: 'Export PDF',
    exportingPdf: 'Exporting...',
    exportDisabledTitle: 'Start a speed test first to export a PDF report',
    exportEnabledTitle: 'Export speed & network diagnostics PDF report',
  },
  duplicateModal: {
    title: 'Report Already Downloaded',
    closeDialog: 'Close dialog',
    body: 'You have already downloaded the report for this test run. Would you like to download it again?',
    notePrefix: 'Re-exported copies are clearly labeled as',
    secondCopy: 'Second Copy',
    noteSuffix: 'on the report.',
    cancel: 'No, Cancel',
    confirm: 'Yes, Download Again',
  },
  speedStage: {
    startSpeedTest: 'Start Speed Test',
    yourSpeedIs: 'Your Internet speed is',
    stopAria: 'Stop speed test',
    startAria: 'Start speed test',
    retry: 'Retry',
    statusIdle: 'Click Play to start speed test',
    statusPing: 'Measuring ping & jitter...',
    statusDownload: 'Testing download speed...',
    statusUpload: 'Testing upload speed...',
    statusComplete: 'Speed test complete',
    statusStopped: 'Test stopped',
    statusError: 'Test interrupted',
    uploadSpeed: 'Upload Speed',
    peakPrefix: 'Peak',
    twoStreams: '2 parallel streams',
    latencyAvgPing: 'Latency (Average Ping)',
    minPrefix: 'Min',
    probesSuffix: 'probes',
    fiveProbes: '5 Cloudflare RTT probes',
    jitter: 'Jitter',
    consecutiveVariance: 'Consecutive RTT variance',
    waitingRtt: 'Waiting for RTT samples',
    autoTag: 'Auto',
  },
  proxy: {
    ariaLabel: 'Proxy or VPN detection notice',
    categories: {
      'VPN / Proxy Detected': 'VPN / Proxy Detected',
      'Datacenter / Relay Network': 'Datacenter / Relay Network',
      'Timezone Mismatch (Possible VPN)': 'Timezone Mismatch (Possible VPN)',
      'Direct Connection': 'Direct Connection',
    },
    confidence: {
      High: 'High',
      Moderate: 'Moderate',
      Low: 'Low',
    },
    confidenceWord: 'confidence',
    signalSingular: 'signal',
    signalPlural: 'signals',
    noticeDesc:
      'Your connection exhibits proxy, VPN, or datacenter relay characteristics. Speed measurements reflect the active tunnel or exit node.',
    observedExitIp: 'Observed Exit IP',
    relayOperator: 'Relay / Carrier Operator',
    exitLocationTz: 'Exit Location & Timezone',
    detectedIndicators: 'Detected Indicators',
    unavailable: 'Unavailable',
    signalTemplates: {
      proxy_flag: 'IP address is flagged as an active proxy, VPN, or Tor exit',
      hosting_flag:
        'Traffic originates from a datacenter / hosting ASN rather than a residential ISP',
      provider_keyword: 'Network operator / PTR matches relay keyword ({1})',
      via_header: 'Proxy forwarding header detected ({1})',
      multi_hop: 'Multiple forwarding hops observed ({1} hops)',
      ip_mismatch: 'Direct browser IP differs from edge-observed IP (split-tunnel or proxy routing)',
      timezone_mismatch:
        'Browser timezone ({1}) differs from IP geolocation timezone ({2})',
    },
  },
  diagnostics: {
    publicIpTitle: 'Public IP Address',
    resolvingRoute: 'Resolving route',
    routeSuffix: 'route',
    updatedPrefix: 'Updated',
    unavailable: 'Unavailable',
    metadataUnavailable: 'Network metadata unavailable',
    copyIp: 'Copy IP',
    copiedIp: 'Copied IP',
    refresh: 'Refresh',
    ipv46CardTitle: 'IPv4, IPv6 & Carrier Routing',
    ipv46CardSubtitle: 'Dual-stack client probes combined with edge IP geolocation',
    ipv4Label: 'IPv4 Address',
    ipv6Label: 'IPv6 Address',
    notDetected: 'Not detected',
    ipv6NotDetected: 'Not detected (IPv4-only route)',
    ispLabel: 'ISP / Carrier',
    asnLabel: 'Autonomous System (ASN)',
    locationLabel: 'Approximate Location',
    proxyCheckLabel: 'Proxy / VPN Check',
    resolving: 'Resolving...',
    inspecting: 'Inspecting...',
    directConnectionNone: 'Direct connection (None detected)',
    dnsCardTitle: 'DNS Hints & Link Diagnostics',
    dnsCardSubtitle: 'Reverse PTR record, DoH resolver reachability, and browser transport signals',
    ptrLabel: 'Reverse DNS (PTR)',
    noPtr: 'No PTR record published',
    dohProbeLabel: 'DoH Resolver Probe',
    probing: 'Probing...',
    reachable: 'Reachable',
    blockedOrUnreachable: 'Blocked or unreachable',
    dnsLatencyLabel: 'DNS Query Latency',
    protocolLabel: 'Transport Protocol',
    checking: 'Checking...',
    linkHintLabel: 'Browser Link Hint',
    exposedNoMetrics: 'Exposed without metrics',
    notExposed: 'Not exposed by browser',
    timezoneLabel: 'Timezone',
    copy: 'Copy',
    copied: 'Copied',
    capSuffix: 'Mbps cap',
    rttSuffix: 'ms RTT',
    fetchError: 'Unable to reach IP diagnostics endpoints.',
  },
  history: {
    title: 'Session Benchmark History',
    subtitle: 'Recent measurements saved locally in your browser',
    clearHistory: 'Clear History',
    emptyText: 'Completed speed tests will appear here so you can compare consecutive runs.',
    colTime: 'Time',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colPublicIp: 'Public IP',
  },
  consent: {
    title: 'Cookie & Privacy Notice',
    description:
      'TestLine uses essential local storage for theme, units, and history. Optional analytics and ad cookies stay off unless you accept.',
    acceptAll: 'Accept All',
    essentialOnly: 'Essential Only',
    cookieSettings: 'Cookie Settings',
  },
  footer: {
    byEcorzo: 'by ECORZO LLC',
    tagline:
      'Real-time internet speed benchmark and dual-stack IP network diagnostics operated by ECORZO LLC.',
    companyHeading: 'Company',
    legalHeading: 'Legal & Compliance',
    disclaimer: 'Disclaimer',
    terms: 'Terms & Conditions',
    cookiesPolicy: 'Cookies Policy',
    cookiesNotice: 'Cookies Notice',
    gdpr: 'GDPR & Data Collection Policy',
    privacy: 'Privacy Policy',
    copyrightSuffix: 'ECORZO LLC. All rights reserved.',
    poweredBy:
      'Measurements powered by Cloudflare speed endpoints · Compliant with GDPR & Google policies',
    languageLabel: 'Language',
    autoOption: 'Auto (Region)',
  },
  news: {
    eyebrow: 'Live Cybersecurity & Tech RSS Aggregator',
    updatedPrefix: 'Updated',
    title: 'Network, Security & Tech News',
    filterPlaceholder: 'Filter headlines...',
    filterAria: 'Filter news headlines',
    refreshFeeds: 'Refresh Feeds',
    refreshing: 'Refreshing...',
    cachedBannerPrefix:
      'Live RSS feeds are currently unreachable. Showing recently cached stories saved on this device',
    retryLive: 'Retry Live Feeds',
    retrying: 'Retrying...',
    allSources: 'All Sources',
    errorFallback:
      'Unable to load live RSS feeds right now. Check your connection and try refreshing.',
    tryAgain: 'Try Again',
    emptyText: 'No matching stories found in the current RSS feeds.',
    showAll: 'Show All Feeds',
    newTag: 'New',
    readFullStory: 'Read Full Story',
    recent: 'Recent',
    minutesAgo: '{n}m ago',
    hoursAgo: '{n}h ago',
  },
  blog: {
    eyebrow: 'TestLine Guides & Daily Hot News Digest',
    articlesCountSuffix: 'Articles',
    title: 'Internet Speed, IP Diagnostics & Daily Briefings',
    subtitle:
      'In-depth guides on internet speed, IPv4/IPv6, IP scams, IP location, and VPN detection—plus 2 daily hot news articles automatically curated from our live RSS feeds.',
    searchPlaceholder: 'Search {n} articles...',
    searchAria: 'Search blog articles',
    allLabel: 'All',
    hotNewsLabel: 'Hot News',
    dailyHotNewsBadge: 'Daily Hot News',
    emptyText: 'No articles match your current filter.',
    resetFilters: 'Reset Filters',
    newTag: 'New',
    readArticle: 'Read Article',
    backToAllPrefix: 'Back to All',
    backToAllSuffix: 'Articles',
    originalSourcePrefix: 'Original Source',
    testConnectionNow: 'Test Your Connection Now',
    keyTakeaways: 'Key Takeaways',
    dailyReadTime: '3 min read',
    dailyAuthorPrefix: 'TestLine Daily Digest · via',
    dailyTakeawayFeatured:
      "Featured in TestLine's daily hot news briefing ({source}) under {topic}.",
    dailyTakeawaySummaryPrefix: 'Core report summary:',
    dailyTakeawayTip:
      'Always verify your active public IPv4/IPv6 address, DNS resolver latency, and VPN/proxy status before troubleshooting unexpected connection alerts.',
    dailySectionBriefingPrefix: 'Daily Briefing:',
    dailyBriefingPara2:
      "Selected automatically for {date}'s TestLine Hot News digest based on publication recency and network/cybersecurity impact. Readers looking to inspect the original technical reporting can follow the primary source link above.",
    dailySectionActionTitle: 'Network Diagnostics & Practical Action',
    dailyActionPara1:
      'Developments involving {topic} often ripple across ISP DNS resolvers, carrier routing tables, enterprise VPN exit gateways, and endpoint connectivity. Running an on-demand speed benchmark and dual-stack IP check confirms whether your connection is experiencing elevated jitter, unexpected routing hops, or proxy relay changes.',
    dailyActionPara2:
      'Stay ahead of emerging vulnerabilities and broadband advisories by monitoring live RSS updates in the TestLine News tab and reviewing our evergreen security guides in the Blog section.',
    categories: {
      'Hot News': 'Hot News',
      'Internet Speed': 'Internet Speed',
      'IP Addresses': 'IP Addresses',
      'IP Scams': 'IP Scams',
      'IP Location': 'IP Location',
      'VPN IP Status': 'VPN IP Status',
    },
    posts: EN_BLOG_POSTS,
  },
  game: {
    internetRestored: 'Internet Restored',
    offlineMode: 'Offline Mode — Internet Disconnected',
    connectionActive: 'Connection is active again',
    playWhileWaiting: 'Play Signal Runner while waiting to reconnect',
    score: 'Score',
    best: 'Best',
    muteAria: 'Mute game sound',
    unmuteAria: 'Unmute game sound',
    pauseAria: 'Pause game',
    resumeAria: 'Resume game',
    returnToSpeedTest: 'Return to Speed Test',
    checking: 'Checking...',
    checkConnection: 'Check Connection',
    canvasAria: 'Offline Signal Runner jump and run game canvas',
    title: 'Signal Runner',
    subtitle:
      'Jump over towers, spikes, and drones until your internet returns. Double-jump is enabled.',
    startGame: 'Start Game',
    tapHint: 'Tap screen or press Space / Up Arrow to jump',
    paused: 'Game Paused',
    resume: 'Resume',
    gameOver: 'Signal Interrupted',
    cleared: 'Cleared:',
    newBest: 'New Best!',
    playAgain: 'Play Again',
    backToSpeedTest: 'Back to Speed Test',
    jump: 'Jump',
    fastDrop: 'Fast Drop',
    desktopHintPrefix: 'Desktop:',
    desktopJump: 'Jump',
    desktopDrop: 'Drop',
    desktopPause: 'Pause',
  },
  faq: {
    tableTitle: 'Internet Speed Test & IP Lookup Reference',
    tableSubtitle:
      'TestLine by ECORZO LLC measures live ISP download/upload bandwidth, ping latency, jitter, public IPv4/IPv6 addresses, IP geolocation, DNS speed, and VPN or proxy flags.',
    readGuidesLink: 'Read 10 Speed & IP Guides',
    colMetric: 'Metric',
    colMethod: 'Measurement Method',
    colThreshold: 'Target Threshold',
    colImpact: 'Primary Impact',
    benchmarks: [
      {
        metric: 'Download Speed (Mbps / MB/s)',
        method: '3 parallel 25 MB HTTP streams (10s window)',
        optimal: '25+ Mbps (4K) · 100+ Mbps (Multi-user)',
        standardUse: 'Streaming, downloads, cloud sync',
      },
      {
        metric: 'Upload Speed (Mbps / MB/s)',
        method: '2 parallel 10 MB XHR POST streams',
        optimal: '10+ Mbps (HD calls) · 25+ Mbps (Creator)',
        standardUse: 'Video calls, backups, live streaming',
      },
      {
        metric: 'Ping & Unloaded Latency',
        method: '5 sequential 0-byte Cloudflare RTT probes',
        optimal: '< 30 ms (Low) · 30–60 ms (Normal)',
        standardUse: 'Online gaming, VoIP, web responsiveness',
      },
      {
        metric: 'Jitter & Bufferbloat Sensitivity',
        method: 'Mean consecutive RTT variance across probes',
        optimal: '< 10 ms (Stable) · > 25 ms (Congested)',
        standardUse: 'Audio/video stability under load',
      },
      {
        metric: 'DoH DNS Latency & PTR Lookup',
        method: 'Encrypted 1.1.1.1 query + Reverse DNS PTR',
        optimal: '< 40 ms DNS resolution',
        standardUse: 'Domain lookup speed & carrier verification',
      },
      {
        metric: 'Dual-Stack IP, Geo & VPN Status',
        method: 'IPv4/IPv6 + ISP/ASN + Header/Timezone audit',
        optimal: 'Direct ISP IP or verified VPN exit node',
        standardUse: 'What is my IP, IP location, proxy/VPN check',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle:
      'Direct answers on internet speed testing, what is my IP, IP location, VPN status, and privacy',
    newsLink: 'Security & Network News',
    methodologyLink: 'Full Methodology',
    gdprLink: 'GDPR & Data Policy',
    items: [
      {
        question: 'How fast is my internet download and upload speed?',
        answer:
          'Click the Start Speed Test play button to measure your real-time ISP download speed and upload speed in Mbps or MB/s. TestLine runs 3 parallel 25 MB download streams over 10 seconds and 2 parallel 10 MB upload streams against Cloudflare edge servers to verify streaming, gaming, and file transfer speeds.',
      },
      {
        question: 'What is my public IPv4 and IPv6 address?',
        answer:
          'When you start a test on TestLine, dual-stack network probing detects both your public IPv4 address and IPv6 address side by side with one-click copy buttons, along with your IP location (city, region, country), Internet Service Provider (ISP), and Autonomous System Number (ASN).',
      },
      {
        question: 'What are good ping, jitter, and unloaded vs. loaded latency (bufferbloat) scores?',
        answer:
          'Unloaded ping under 30 ms and jitter below 10 ms deliver smooth video calls and online gaming. When latency spikes sharply during heavy downloads or uploads (loaded latency), that difference indicates bufferbloat, which causes voice stutter and lag even on high-Mbps fiber plans.',
      },
      {
        question: 'How accurate is IP geolocation for checking my IP location?',
        answer:
          'IP location lookup maps your public IP block to its registered country, region, and city using ISP and regional registry records. City-level IP geolocation is generally accurate for routing and regional diagnostics, though it never reveals your exact street address.',
      },
      {
        question: 'How does TestLine detect a VPN, proxy, or datacenter IP?',
        answer:
          'TestLine checks HTTP forwarding headers, hosting and datacenter ASNs, relay reverse DNS (PTR) hostnames, and browser-versus-IP timezone mismatches. When any VPN, proxy, or relay indicator matches, the Proxy & VPN Detection card highlights every triggered signal.',
      },
      {
        question: 'What is DNS-over-HTTPS (DoH) latency and Reverse DNS (PTR) lookup?',
        answer:
          'DNS-over-HTTPS (DoH) latency measures how quickly your network resolves domain names over encrypted HTTPS via Cloudflare 1.1.1.1, while Reverse DNS (PTR) lookup displays the canonical carrier or server hostname assigned to your public IP address.',
      },
      {
        question: 'Does ECORZO LLC log or store my IP address or speed test results?',
        answer:
          'No. Speed tests and IP lookups run only when you initiate a test, are processed ephemerally in memory, and are never sold or stored in permanent user profiles. Recent run history stays strictly inside your own browser storage, and exported PDF reports are generated locally on your device.',
      },
      {
        question: 'Can I use TestLine as a mobile app or play offline if my internet drops?',
        answer:
          'Yes. TestLine is an installable Progressive Web App (PWA) for Android, iOS, and desktop. Whenever your device loses internet connectivity, TestLine automatically launches the Signal Runner jump-and-run game so you can play until your connection comes back online.',
      },
    ],
  },
  legal: {
    backToSpeedTest: 'Back to Speed Test',
    effectiveDatePrefix: 'Effective Date:',
    operatorLabel: 'Operator: ECORZO LLC',
    lastUpdatedDateIso: '2026-11-15',
    about: {
      title: 'About TestLine',
      subtitle:
        'Built by ECORZO LLC to deliver transparent internet speed testing and public IPv4/IPv6 diagnostics in one fast, privacy-respecting web app.',
      sections: [
        {
          heading: 'What TestLine Measures',
          paragraphs: [
            'TestLine is a free, ad-light browser internet speed test and "what is my IP" diagnostic tool operated by ECORZO LLC. When you click Start Speed Test, the application runs live throughput, latency, IP geolocation, and VPN detection checks directly between your browser and global edge endpoints without plugins or sign-ups.',
          ],
          bullets: [
            {
              strong: 'Download & Upload Speed (Mbps / MB/s):',
              text: "Executes parallel HTTP streams against Cloudflare's public speed edge to measure real-world ISP download and upload capacity in Auto, Mbps, or MB/s units.",
            },
            {
              strong: 'Ping, Jitter & Latency Health:',
              text: 'Measures sequential uncached round-trip time (RTT) probes to report average ping, minimum ping, and packet-to-packet jitter variance affecting calls and gaming.',
            },
            {
              strong: 'What Is My IPv4/IPv6, Location, ISP & ASN:',
              text: 'Resolves your public IPv4 and IPv6 addresses side by side, city/country IP geolocation, Internet Service Provider (ISP), Autonomous System Number (ASN), reverse DNS (PTR) hostname, and encrypted Cloudflare DoH DNS latency.',
            },
            {
              strong: 'VPN, Proxy & Datacenter Detection:',
              text: 'Evaluates forwarding headers, hosting/datacenter ASN flags, relay PTR patterns, and timezone alignment to surface active VPN, proxy, or relay routing.',
            },
          ],
        },
      ],
      closingTitle: 'Knowledge Base, Live News & Company Details',
      closingIntro: 'Explore our',
      closingGuidesLink: '10 Speed, IP, Scam & VPN Guides',
      closingMid: 'or read real-time cybersecurity and network headlines in the',
      closingNewsLink: 'TestLine News RSS Feed',
      closingOutro:
        '. TestLine is developed and maintained by ECORZO LLC, headquartered at 224 W 35th St STE 500, New York, NY 10001, United States. For support or compliance inquiries, visit our',
      closingContactLink: 'Contact page',
    },
    contact: {
      title: 'Contact ECORZO LLC',
      subtitle:
        'Reach our team regarding TestLine diagnostics, privacy requests, GDPR data inquiries, or legal compliance.',
      telephone: 'Telephone',
      addressLabel: 'Registered Office Address',
      copy: 'Copy',
      copied: 'Copied',
      formHeading: 'Send an Inquiry',
      sentTitle: 'Inquiry Prepared',
      sentBodyPrefix:
        'Thank you, {name}. Your message details have been recorded for review. For time-sensitive legal or GDPR matters, please call +1 646 427 6802 or write to ECORZO LLC at 224 W 35th St STE 500, New York NY, 10001.',
      sentBodySuffix: '',
      sendAnother: 'Send another inquiry',
      nameLabel: 'Full Name',
      namePlaceholder: 'Jane Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can ECORZO LLC help you?',
      submitBtn: 'Submit Message',
      errMissing: 'Please enter your name, email address, and message.',
      errInvalidEmail: 'Please enter a valid email address.',
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle:
        'How TestLine by ECORZO LLC collects, uses, and safeguards diagnostic information in accordance with Google policies and applicable privacy law.',
      sections: [
        {
          heading: '1. Data Controller & Scope',
          paragraphs: [
            'This Privacy Policy governs your use of TestLine, operated by ECORZO LLC (224 W 35th St STE 500, New York, NY 10001; Phone: +1 646 427 6802). It is drafted to satisfy Google Publisher & User Consent transparency requirements, the EU/UK General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA/CPRA).',
          ],
        },
        {
          heading: '2. Information Processed During Diagnostics',
          bullets: [
            {
              strong: 'Network & IP Telemetry:',
              text: 'Your public IPv4/IPv6 address, ISP, ASN, approximate city/region/country, reverse DNS (PTR), and HTTP request headers (such as Via or X-Forwarded-For) are processed ephemerally in memory to display your network diagnostics and proxy/VPN check results.',
            },
            {
              strong: 'Speed Measurements:',
              text: "Download, upload, ping, and jitter results are computed in your browser and saved solely in your browser's local storage (testline_history_v1) so you can review recent runs. You may clear this history at any time.",
            },
            {
              strong: 'Browser Preferences:',
              text: 'Theme mode (testline_theme), language preference, and cookie preference (testline_cookie_consent) are stored locally in your browser.',
            },
          ],
        },
        {
          heading: '3. Third-Party Services & Google Policy Disclosure',
          paragraphs: [
            'To perform live speed and IP resolution tests, your browser communicates directly with reputable infrastructure providers, including Cloudflare Speed Endpoints (speed.cloudflare.com), Cloudflare DNS-over-HTTPS (cloudflare-dns.com), IPWhois (ipwho.is), GeoJS (get.geojs.io), and Ipify (api.ipify.org). When Google services (such as Google Fonts, Google Analytics, or Google AdSense, if enabled) are loaded, Google may use cookies or device identifiers in accordance with:',
          ],
        },
        {
          heading: '4. No Sale of Personal Information & Retention',
          paragraphs: [
            'ECORZO LLC does not sell, rent, or trade your personal information or IP address to data brokers. Diagnostic lookups processed by our server are transient and are not written to persistent user profiles. PDF reports exported via the "Export PDF" action are generated entirely inside your browser and are never uploaded to our servers.',
          ],
        },
      ],
      googlePolicyLinkText:
        'How Google uses information from sites or apps that use our services',
      rightsPrefix:
        'Depending on your jurisdiction, you have rights to access, correct, delete, or restrict processing of your personal data, and to withdraw consent at any time. Review our',
      gdprLinkText: 'GDPR & Data Collection Policy',
      rightsSuffix:
        'or contact ECORZO LLC at +1 646 427 6802 or 224 W 35th St STE 500, New York NY, 10001.',
    },
    disclaimer: {
      title: 'Disclaimer',
      subtitle:
        'Important limitations regarding internet speed measurements, IP geolocation accuracy, and proxy/VPN detection signals.',
      sections: [
        {
          heading: '1. Informational & Diagnostic Purpose Only',
          paragraphs: [
            'TestLine by ECORZO LLC is provided strictly on an "as is" and "as available" basis for informational and general network diagnostic purposes. Speed readings represent the throughput observed between your browser and test edge servers at the moment of testing and do not constitute a legally binding certification of ISP line capacity or service-level compliance.',
          ],
        },
        {
          heading: '2. Variables Affecting Speed Results',
          paragraphs: [
            'Measured download, upload, ping, and jitter values can vary based on Wi-Fi signal strength, router hardware, background downloads, browser throttling, VPN/proxy encryption overhead, ISP traffic shaping, and peering congestion between your network and Cloudflare edge nodes.',
          ],
        },
        {
          heading: '3. IP Geolocation & Proxy Detection Accuracy',
          paragraphs: [
            'Approximate city, region, and ISP metadata are derived from third-party IP databases and represent the registered location of the IP block rather than your exact physical street address. Proxy, VPN, and datacenter flags reflect heuristic indicators (such as ASN type, forwarding headers, and timezone alignment) and may occasionally produce false positives or false negatives for mobile carriers, corporate gateways, or CGNAT networks.',
          ],
        },
        {
          heading: '4. Limitation of Liability',
          paragraphs: [
            'To the fullest extent permitted by applicable law, ECORZO LLC disclaims all warranties, express or implied, and shall not be liable for any direct, indirect, incidental, or consequential damages arising from your reliance on diagnostic figures, exported PDF reports, or temporary unavailability of third-party measurement endpoints.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Governing rules for accessing and using TestLine by ECORZO LLC.',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          paragraphs: [
            "By accessing or using TestLine, you agree to be bound by these Terms & Conditions and all applicable laws and regulations, including Google's acceptable use and publisher compliance standards. If you do not agree with these terms, please discontinue use of the site immediately.",
          ],
        },
        {
          heading: '2. Permitted & Prohibited Use',
          bullets: [
            {
              text: 'You may use TestLine for personal, educational, or legitimate enterprise network troubleshooting and generate PDF diagnostic reports for your own records.',
            },
            {
              text: 'You must not deploy automated bots, stress-testing scripts, DDoS tools, or high-frequency scrapers against TestLine or its underlying Cloudflare and IP lookup endpoints.',
            },
            {
              text: 'You must not attempt to bypass rate limits, reverse-engineer server infrastructure, or misrepresent TestLine reports as official regulatory certifications.',
            },
          ],
        },
        {
          heading: '3. Intellectual Property',
          paragraphs: [
            'The TestLine name, interface design, source code, and documentation are owned by or licensed to ECORZO LLC. Third-party trademarks, including Cloudflare and Google Fonts, remain the property of their respective owners.',
          ],
        },
        {
          heading: '4. Governing Law & Jurisdiction',
          paragraphs: [
            'These Terms & Conditions are governed by the laws of the State of New York and the United States, without regard to conflict-of-law principles. Any disputes shall be resolved in the state or federal courts located in New York County, New York.',
          ],
        },
      ],
    },
    cookiesPolicy: {
      title: 'Cookies Policy',
      subtitle:
        'Detailed breakdown of cookies, browser storage keys, and third-party technologies used by TestLine.',
      sec1Title: '1. What Are Cookies & Local Storage?',
      sec1Body:
        'Cookies are small text files placed on your device by websites you visit. Modern web applications also use browser localStorage to retain user interface preferences locally without transmitting unnecessary data across every network request.',
      sec2Title: '2. Storage Keys Used by TestLine',
      colKey: 'Key / Identifier',
      colCategory: 'Category',
      colPurpose: 'Purpose',
      rows: [
        {
          key: 'testline_theme',
          category: 'Essential Preference',
          purpose: 'Remembers Light or Dark mode selection across visits.',
        },
        {
          key: 'testline_unit_v1',
          category: 'Essential Preference',
          purpose: 'Stores your selected display unit mode (Auto, Mbps, or MB/s).',
        },
        {
          key: 'testline_history_v1',
          category: 'Functional Local',
          purpose: 'Stores up to 15 recent speed test results locally in your browser.',
        },
        {
          key: 'testline_cookie_consent',
          category: 'Essential Consent',
          purpose: 'Records your Google Consent Mode v2 cookie and storage preference.',
        },
      ],
      sec3Title: '3. Third-Party & Google Policy Disclosures',
      sec3Prefix:
        'In accordance with Google EU User Consent Policy, Google Consent Mode v2, and ePrivacy regulations, advertising and analytics storage remain denied by default until you opt in. Authorized digital sellers are published at',
      sec3Mid: '. You can update or withdraw consent anytime on our',
      cookiesNoticeLinkText: 'Cookies Notice',
      sec3OrVia: 'page or via',
      googleAdSettingsText: 'Google Ad Settings',
    },
    cookiesNotice: {
      title: 'Cookies Notice & Consent Preferences',
      subtitle: 'Manage your cookie and browser storage consent settings for TestLine by ECORZO LLC.',
      sec1Title: 'Notice to Visitors (EEA, UK, Switzerland & Global)',
      sec1Body:
        'TestLine uses strictly necessary browser storage to preserve your Light/Dark display theme, remember your preferred speed units and local benchmark history, and record your consent choices. In accordance with Google Consent Mode v2 and EU ePrivacy rules, advertising and analytics storage default to denied until you grant consent, and can be withdrawn anytime without blocking speed testing.',
      activeTitle: 'Active Consent Selection',
      currentSettingLabel: 'Current setting:',
      statusAll: 'All Granted (Analytics & Ads Consent Mode)',
      statusEssential: 'Strictly Essential Only',
      statusUnset: 'Not Yet Selected (Non-Essential Denied by Default)',
      savedBadge: 'Preferences Saved',
      acceptAllBtn: 'Accept All Functional Storage',
      essentialOnlyBtn: 'Strictly Essential Only',
      sec2Title: 'Browser-Level Cookie Controls',
      sec2Body:
        'You may also block or clear cookies and site storage directly through your browser privacy settings (Chrome, Safari, Firefox, Edge). Doing so will reset your locally saved session history and theme preference.',
    },
    gdpr: {
      title: 'GDPR & Data Collection Policy',
      subtitle:
        'Lawful basis, data minimization, international transfers, and statutory rights under EU/UK GDPR and Google compliance standards.',
      sections: [
        {
          heading: '1. Data Controller Identity',
          paragraphs: [
            'For the purposes of the EU General Data Protection Regulation (Regulation (EU) 2016/679) and UK GDPR, the Data Controller is ECORZO LLC, located at 224 W 35th St STE 500, New York, NY 10001, United States (Telephone: +1 646 427 6802).',
          ],
        },
        {
          heading: '2. Lawful Bases for Processing (GDPR Article 6)',
          bullets: [
            {
              strong: 'Contract / Requested Service (Art. 6(1)(b)):',
              text: 'Processing your IP address and bandwidth test streams is strictly necessary to deliver the internet speed and IP diagnostic functionality you requested by visiting TestLine.',
            },
            {
              strong: 'Legitimate Interests (Art. 6(1)(f)):',
              text: 'Protecting the platform against abuse, DDoS attacks, and ensuring edge network reliability.',
            },
            {
              strong: 'Explicit Consent (Art. 6(1)(a)):',
              text: "Any non-essential cookies, analytics, or advertising identifiers governed by Google's EU User Consent Policy are processed only with your consent.",
            },
          ],
        },
        {
          heading: '3. Data Collection Minimization & Retention',
          paragraphs: [
            'ECORZO LLC adheres strictly to GDPR Article 5 data minimization. We do not require account registration, passwords, names, or payment cards to run speed diagnostics. IP metadata and reverse DNS queries are processed transiently in real time and are not stored in permanent user logs. Contact form submissions and telephone inquiries are retained only as long as necessary to resolve your request or satisfy legal obligations.',
          ],
        },
        {
          heading: '4. International Data Transfers',
          paragraphs: [
            'Diagnostic requests may route through edge servers operated by Cloudflare or Google Cloud in North America, Europe, or Asia-Pacific to reach the closest benchmark node. Where personal data leaves the EEA/UK, transfers rely on Standard Contractual Clauses (SCCs) or recognized adequacy frameworks.',
          ],
        },
        {
          heading: '5. Your Statutory Rights (GDPR Articles 15–22 & CCPA/CPRA)',
          bullets: [
            {
              strong: 'Right of Access & Portability:',
              text: 'Request confirmation of whether personal data is processed and obtain a structured copy.',
            },
            {
              strong: 'Right to Rectification & Erasure:',
              text: 'Request correction of inaccurate information or deletion of personal data ("Right to be Forgotten").',
            },
            {
              strong: 'Right to Object & Restrict:',
              text: 'Object to processing based on legitimate interests or withdraw consent at any time.',
            },
            {
              strong: 'Right to Lodge a Complaint:',
              text: 'You have the right to file a complaint with your local EU/UK Data Protection Supervisory Authority.',
            },
          ],
        },
        {
          heading: "6. Children's Privacy",
          paragraphs: [
            'TestLine is a general-audience utility and does not knowingly collect personal data from children under 13 (or under 16 in the EEA). To exercise any data protection right, contact ECORZO LLC at +1 646 427 6802 or write to 224 W 35th St STE 500, New York NY, 10001.',
          ],
        },
      ],
    },
  },
  pdf: {
    reportTitle: 'TestLine Network & Speed Report',
    generated: 'Generated',
    unit: 'Unit',
    secondCopyBanner: 'SECOND COPY  —  Duplicate Report Download',
    sec1Title: '1. Speed Benchmark Summary',
    downloadSpeed: 'Download Speed',
    uploadSpeed: 'Upload Speed',
    avgPing: 'Average Ping',
    jitter: 'Jitter',
    peak: 'Peak',
    sustained: 'Sustained stream',
    min: 'Min',
    probes: 'probes',
    rttProbes: 'RTT probes',
    sec2Title: '2. Proxy & VPN Detection',
    directClean: 'Direct Connection — No proxy or VPN signals detected',
    sec3Title: '3. Network, IP & DNS Diagnostics',
    sec4Title: '4. Recent Session Runs',
    confidenceWord: 'confidence',
    pageOf: 'Page {p} of {total}',
    secondCopyShort: 'Second Copy',
    rowPrimaryIp: 'Primary Public IP',
    rowIpv4: 'IPv4 Address',
    rowIpv6: 'IPv6 Address',
    rowIsp: 'ISP / Carrier',
    rowAsn: 'Autonomous System (ASN)',
    rowLocation: 'Approximate Location',
    rowTimezone: 'Timezone',
    rowPtr: 'Reverse DNS (PTR)',
    rowDoh: 'DoH Resolver Probe',
    rowProtocol: 'Transport Protocol',
    rowLinkHint: 'Browser Link Hint',
    notDetected: 'Not detected',
    noPtr: 'No PTR record published',
    reachable: 'Reachable',
    unreachable: 'Unreachable',
    notExposed: 'Not exposed by browser',
    available: 'Available',
    colTime: 'Time',
    colDownload: 'Download',
    colUpload: 'Upload',
    colPing: 'Ping (ms)',
    colJitter: 'Jitter (ms)',
    colIp: 'Public IP',
  },
};
