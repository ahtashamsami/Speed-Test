import { BLOG_POSTS, type BlogPost } from '../data/blogPosts';
import {
  PAGE_PATHS,
  parseRouteState,
  resolveBlogOgImagePath,
  resolvePageOgImagePath,
  type KnownAppPage,
} from '../data/seoRoutes';
import { EXTRA_UI_STRINGS } from '../i18n/extraStrings';
import { enPack } from '../i18n/packs/en';
import { classifyNewsTopic, getNewsEditorialNote } from './newsCommentary';

export interface SsrNewsItem {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  link: string;
  summary: string;
  author: string | null;
  publishedAt: string | null;
  publishedTs: number;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSsrShell(mainMarkup: string): string {
  return `<div class="min-h-screen flex flex-col">
  <header>
    <nav aria-label="Primary pages">
      <a href="/">TestLine</a>
      <a href="/news">News</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </nav>
  </header>
  <main>${mainMarkup}</main>
  <footer>
    <p>TestLine by ECORZO LLC — 224 W 35th St STE 500, New York, NY 10001 — Tel: +1 646 427 6802</p>
    <nav aria-label="Legal and compliance">
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/gdpr">GDPR &amp; Data Collection Policy</a>
      <a href="/terms">Terms &amp; Conditions</a>
      <a href="/disclaimer">Disclaimer</a>
      <a href="/cookies-policy">Cookies Policy</a>
      <a href="/cookies-notice">Cookies Notice</a>
    </nav>
  </footer>
</div>`;
}

function buildSsrLegalSectionMarkup(section: {
  heading: string;
  paragraphs?: string[];
  bullets?: Array<{ strong?: string; text: string }>;
}): string {
  const paragraphs = (section.paragraphs ?? [])
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('');
  const bullets =
    section.bullets && section.bullets.length > 0
      ? `<ul>${section.bullets
          .map(
            (b) =>
              `<li>${b.strong ? `<strong>${escapeHtml(b.strong)}</strong> ` : ''}${escapeHtml(b.text)}</li>`
          )
          .join('')}</ul>`
      : '';
  return `<section><h2>${escapeHtml(section.heading)}</h2>${paragraphs}${bullets}</section>`;
}

const NEWS_EDITORIAL_DEEP_SECTIONS: Array<{
  heading: string;
  body: string;
  guideSlug: string;
  guideLabel: string;
}> = [
  {
    heading: 'VPN, Proxy & Datacenter Relay Advisories',
    body: 'Security incidents targeting commercial VPN gateways, residential proxy networks, and cloud relays frequently alter ASN reputation and outbound routing latency. After updating VPN software or switching exit servers, verify your observed public IPv4/IPv6 exit address, PTR hostname, and timezone alignment using the TestLine diagnostic dashboard.',
    guideSlug: 'how-websites-detect-vpn-proxy-and-datacenter-ips',
    guideLabel: 'Read: How Websites Detect VPN & Datacenter IPs',
  },
  {
    heading: 'DNS-over-HTTPS, BGP Routing & Peering Stability',
    body: 'Carrier BGP route leaks, DNS resolver outages, and subsea cable maintenance can spike packet jitter and slow initial page loads even when headline Mbps speed looks normal. Comparing Cloudflare 1.1.1.1 DoH query latency against unloaded ping helps isolate DNS bottlenecks from physical last-mile congestion.',
    guideSlug: 'ipv4-vs-ipv6-why-dual-stack-networks-matter',
    guideLabel: 'Read: IPv4 vs IPv6 — Why Dual-Stack Networks Matter',
  },
  {
    heading: 'IP Address Scams, DDoS & Phishing Defense',
    body: 'Modern threat actors exploit leaked router WAN IPs, spoofed support portals, and credential-harvesting links. Knowing the strict difference between approximate ISP-level IP geolocation and physical home street addresses helps teams ignore extortion scams while locking down router UPnP and remote admin ports.',
    guideSlug: 'spot-fake-your-ip-has-been-compromised-scams',
    guideLabel: 'Read: Spot Fake Your IP Has Been Compromised Scams',
  },
  {
    heading: 'ISP Bandwidth, Fiber Upgrades & Bufferbloat Testing',
    body: 'Major broadband upgrades, DOCSIS high-split rollouts, and Wi-Fi 7 router firmware updates impact real-world throughput and loaded latency. Running parallel multi-stream download/upload tests alongside jitter variance reveals whether your ISP link handles 4K streaming, backups, and real-time calls simultaneously.',
    guideSlug: 'why-real-world-download-speed-differs-from-advertised-plan',
    guideLabel: 'Read: Why Real-World Download Speed Differs from Your Plan',
  },
];

export function buildSsrRootMarkup(
  page: KnownAppPage | 'not-found',
  activeBlogPost: BlogPost | null,
  allBlogPosts: BlogPost[],
  latestNewsItems: SsrNewsItem[]
): string {
  if (page === 'not-found') {
    const nf = EXTRA_UI_STRINGS.en.notFound;
    return buildSsrShell(
      `<section><h1>${escapeHtml(nf.title)}</h1><p>${escapeHtml(nf.description)}</p><p><a href="/">${escapeHtml(nf.runSpeedTest)}</a> · <a href="/blog">${escapeHtml(nf.readBlogGuides)}</a></p></section>`
    );
  }

  if (page === 'home') {
    const benchmarkRows = enPack.faq.benchmarks
      .map(
        (b) =>
          `<tr><td>${escapeHtml(b.metric)}</td><td>${escapeHtml(b.method)}</td><td>${escapeHtml(b.optimal)}</td><td>${escapeHtml(b.standardUse)}</td></tr>`
      )
      .join('');
    const faqHtml = enPack.faq.items
      .map(
        (item) =>
          `<article><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></article>`
      )
      .join('');

    return buildSsrShell(`
      <section>
        <h1>TestLine — ${escapeHtml(enPack.hero.title)}</h1>
        <p>${escapeHtml(enPack.hero.subtitle)}</p>
        <p>Metrics measured on demand: Download Speed (Mbps / MB/s), Upload Speed, Unloaded Ping, Jitter, Bufferbloat, Dual-Stack Public IPv4 &amp; IPv6, Reverse DNS (PTR), Cloudflare DoH DNS Latency, and VPN/Proxy Detection.</p>
      </section>
      <section>
        <h2>${escapeHtml(enPack.faq.tableTitle)}</h2>
        <p>${escapeHtml(enPack.faq.tableSubtitle)}</p>
        <table><thead><tr><th>${escapeHtml(enPack.faq.colMetric)}</th><th>${escapeHtml(enPack.faq.colMethod)}</th><th>${escapeHtml(enPack.faq.colThreshold)}</th><th>${escapeHtml(enPack.faq.colImpact)}</th></tr></thead><tbody>${benchmarkRows}</tbody></table>
      </section>
      <section>
        <h2>${escapeHtml(enPack.faq.faqTitle)}</h2>
        <p>${escapeHtml(enPack.faq.faqSubtitle)}</p>
        ${faqHtml}
      </section>
    `);
  }

  if (page === 'news') {
    const ed = EXTRA_UI_STRINGS.en.newsEditorial;
    const storiesHtml = latestNewsItems
      .slice(0, 15)
      .map((item) => {
        const note = getNewsEditorialNote(item.title, item.summary, 'en');
        const topic = classifyNewsTopic(item.title, item.summary);
        return `<article>
          <h2><a href="${escapeHtml(item.link)}" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2>
          <p>${escapeHtml(item.sourceName)} · ${escapeHtml(topic)}</p>
          ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ''}
          <p><strong>${escapeHtml(ed.noteLabel)}:</strong> ${escapeHtml(note)}</p>
        </article>`;
      })
      .join('');

    const editorialTopicsHtml = NEWS_EDITORIAL_DEEP_SECTIONS.map(
      (sec) => `<article>
        <h3>${escapeHtml(sec.heading)}</h3>
        <p>${escapeHtml(sec.body)}</p>
        <p><a href="/blog/${escapeHtml(sec.guideSlug)}">${escapeHtml(sec.guideLabel)}</a></p>
      </article>`
    ).join('');

    return buildSsrShell(`
      <section>
        <h1>${escapeHtml(enPack.news.title)}</h1>
        <section>
          <h2>${escapeHtml(ed.overviewTitle)}</h2>
          <p>${escapeHtml(ed.overviewBody)}</p>
          <p>Sources monitored: Bleeping Computer, The Hacker News, Cloudflare Blog, Krebs on Security, Ars Technica, and TechCrunch. Every briefing below maps live security and broadband incidents to actionable TestLine checks for IPv4/IPv6 routing, DoH DNS latency, jitter, and proxy/VPN detection.</p>
        </section>
        ${storiesHtml}
        <section>
          <h2>Network Intelligence Focus Areas &amp; Diagnostic Playbooks</h2>
          ${editorialTopicsHtml}
        </section>
      </section>
    `);
  }

  if (page === 'blog') {
    if (activeBlogPost) {
      const takeawaysHtml = activeBlogPost.keyTakeaways
        .map((k) => `<li>${escapeHtml(k)}</li>`)
        .join('');
      const sectionsHtml = activeBlogPost.sections
        .map(
          (s) =>
            `<section><h2>${escapeHtml(s.heading)}</h2>${s.paragraphs
              .map((p) => `<p>${escapeHtml(p)}</p>`)
              .join('')}</section>`
        )
        .join('');

      return buildSsrShell(`
        <article>
          <p><a href="/blog">Back to All Articles</a> · ${escapeHtml(activeBlogPost.category)}</p>
          <h1>${escapeHtml(activeBlogPost.title)}</h1>
          <p>${escapeHtml(activeBlogPost.author)} · ${escapeHtml(activeBlogPost.publishedDate)} · ${escapeHtml(activeBlogPost.readTime)}</p>
          <p>${escapeHtml(activeBlogPost.summary)}</p>
          <section><h2>${escapeHtml(enPack.blog.keyTakeaways)}</h2><ul>${takeawaysHtml}</ul></section>
          ${sectionsHtml}
        </article>
      `);
    }

    const listHtml = allBlogPosts
      .map(
        (post) => `<article>
          <h2><a href="/blog/${escapeHtml(encodeURIComponent(post.slug))}">${escapeHtml(post.title)}</a></h2>
          <p>${escapeHtml(post.category)} · ${escapeHtml(post.publishedDate)} · ${escapeHtml(post.readTime)}</p>
          <p>${escapeHtml(post.summary)}</p>
        </article>`
      )
      .join('');

    return buildSsrShell(`
      <section>
        <h1>${escapeHtml(enPack.blog.title)}</h1>
        <p>${escapeHtml(enPack.blog.subtitle)}</p>
        ${listHtml}
      </section>
    `);
  }

  if (page === 'about') {
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(enPack.legal.about.title)}</h1>
        <p>${escapeHtml(enPack.legal.about.subtitle)}</p>
        ${enPack.legal.about.sections.map(buildSsrLegalSectionMarkup).join('')}
        <section>
          <h2>${escapeHtml(enPack.legal.about.closingTitle)}</h2>
          <p>${escapeHtml(enPack.legal.about.closingIntro)} <a href="/blog">${escapeHtml(enPack.legal.about.closingGuidesLink)}</a> ${escapeHtml(enPack.legal.about.closingMid)} <a href="/news">${escapeHtml(enPack.legal.about.closingNewsLink)}</a>${escapeHtml(enPack.legal.about.closingOutro)} <a href="/contact">${escapeHtml(enPack.legal.about.closingContactLink)}</a>.</p>
        </section>
      </article>
    `);
  }

  if (page === 'contact') {
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(enPack.legal.contact.title)}</h1>
        <p>${escapeHtml(enPack.legal.contact.subtitle)}</p>
        <p><strong>${escapeHtml(enPack.legal.contact.telephone)}:</strong> +1 646 427 6802</p>
        <p><strong>${escapeHtml(enPack.legal.contact.addressLabel)}:</strong> 224 W 35th St STE 500, New York, NY 10001, United States</p>
      </article>
    `);
  }

  if (page === 'privacy') {
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(enPack.legal.privacy.title)}</h1>
        <p>${escapeHtml(enPack.legal.privacy.subtitle)}</p>
        ${enPack.legal.privacy.sections.map(buildSsrLegalSectionMarkup).join('')}
      </article>
    `);
  }

  if (page === 'disclaimer') {
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(enPack.legal.disclaimer.title)}</h1>
        <p>${escapeHtml(enPack.legal.disclaimer.subtitle)}</p>
        ${enPack.legal.disclaimer.sections.map(buildSsrLegalSectionMarkup).join('')}
      </article>
    `);
  }

  if (page === 'terms') {
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(enPack.legal.terms.title)}</h1>
        <p>${escapeHtml(enPack.legal.terms.subtitle)}</p>
        ${enPack.legal.terms.sections.map(buildSsrLegalSectionMarkup).join('')}
      </article>
    `);
  }

  if (page === 'cookies-policy') {
    const cp = enPack.legal.cookiesPolicy;
    const rows = cp.rows
      .map(
        (r) =>
          `<tr><td><code>${escapeHtml(r.key)}</code></td><td>${escapeHtml(r.category)}</td><td>${escapeHtml(r.purpose)}</td></tr>`
      )
      .join('');
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(cp.title)}</h1>
        <p>${escapeHtml(cp.subtitle)}</p>
        <section><h2>${escapeHtml(cp.sec1Title)}</h2><p>${escapeHtml(cp.sec1Body)}</p></section>
        <section><h2>${escapeHtml(cp.sec2Title)}</h2><table><thead><tr><th>${escapeHtml(cp.colKey)}</th><th>${escapeHtml(cp.colCategory)}</th><th>${escapeHtml(cp.colPurpose)}</th></tr></thead><tbody>${rows}</tbody></table></section>
        <section><h2>${escapeHtml(cp.sec3Title)}</h2><p>${escapeHtml(cp.sec3Prefix)} /ads.txt${escapeHtml(cp.sec3Mid)} <a href="/cookies-notice">${escapeHtml(cp.cookiesNoticeLinkText)}</a>.</p></section>
      </article>
    `);
  }

  if (page === 'cookies-notice') {
    const cn = enPack.legal.cookiesNotice;
    return buildSsrShell(`
      <article>
        <h1>${escapeHtml(cn.title)}</h1>
        <p>${escapeHtml(cn.subtitle)}</p>
        <section><h2>${escapeHtml(cn.sec1Title)}</h2><p>${escapeHtml(cn.sec1Body)}</p></section>
        <section><h2>${escapeHtml(cn.sec2Title)}</h2><p>${escapeHtml(cn.sec2Body)}</p></section>
      </article>
    `);
  }

  return buildSsrShell(`
    <article>
      <h1>${escapeHtml(enPack.legal.gdpr.title)}</h1>
      <p>${escapeHtml(enPack.legal.gdpr.subtitle)}</p>
      ${enPack.legal.gdpr.sections.map(buildSsrLegalSectionMarkup).join('')}
    </article>
  `);
}

function buildRouteSchemaGraph(origin: string, includeHomeAppsAndFaq: boolean): unknown {
  const organizationNode = {
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'ECORZO LLC',
    brand: 'TestLine',
    url: `${origin}/`,
    logo: `${origin}/assets/aistudio/test_logo_header_dark.png`,
    telephone: '+1-646-427-6802',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '224 W 35th St STE 500',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: 'TestLine',
    alternateName: ['TestLine Internet Speed Test', 'TestLine What Is My IP Lookup'],
    url: `${origin}/`,
    inLanguage: 'en-US',
    publisher: { '@id': `${origin}/#organization` },
  };

  if (!includeHomeAppsAndFaq) {
    return {
      '@context': 'https://schema.org',
      '@graph': [websiteNode, organizationNode],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode,
      {
        '@type': 'WebApplication',
        name: 'TestLine',
        alternateName: 'TestLine Speed Test & IP Lookup',
        url: `${origin}/`,
        image: `${origin}/assets/og/testline-home.png`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        keywords: enPack.seo.home.keywords,
        description: enPack.seo.home.description,
        publisher: { '@id': `${origin}/#organization` },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      organizationNode,
      {
        '@type': 'FAQPage',
        mainEntity: enPack.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function renderRouteHtmlSnapshot(options: {
  htmlTemplate: string;
  origin: string;
  reqPath: string;
  allBlogPosts?: BlogPost[];
  latestNewsItems?: SsrNewsItem[];
  adSenseClientId?: string;
}): { html: string; statusCode: number; robotsHeader: string } {
  const {
    htmlTemplate,
    origin,
    reqPath,
    allBlogPosts = BLOG_POSTS,
    latestNewsItems = [],
    adSenseClientId = '',
  } = options;

  const parsed = parseRouteState(reqPath);

  let activeBlogPost: BlogPost | null = null;
  let effectivePage: KnownAppPage | 'not-found' = parsed.page;

  if (parsed.page === 'blog' && parsed.blogSlug) {
    activeBlogPost = allBlogPosts.find((p) => p.slug.toLowerCase() === parsed.blogSlug) ?? null;
    if (!activeBlogPost) {
      effectivePage = 'not-found';
    }
  }

  const statusCode = effectivePage === 'not-found' ? 404 : 200;
  const robotsContent =
    statusCode === 404
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  let title = EXTRA_UI_STRINGS.en.notFound.seoTitle;
  let description = EXTRA_UI_STRINGS.en.notFound.seoDescription;
  let keywords = 'internet speed test, what is my ip, network diagnostics, TestLine';
  let canonicalUrl: string | null = null;
  let ogType = 'website';
  let ogImageUrl = `${origin}/assets/og/testline-home.png`;

  const breadcrumbItems: Array<{ '@type': string; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'TestLine',
      item: `${origin}/`,
    },
  ];

  let articleLdScript = '';

  if (effectivePage === 'blog' && activeBlogPost) {
    title = `${activeBlogPost.title} | TestLine`;
    description = activeBlogPost.summary;
    keywords = `${activeBlogPost.category}, internet speed, public ip, network diagnostics, TestLine`;
    canonicalUrl = `${origin}/blog/${encodeURIComponent(activeBlogPost.slug)}`;
    ogType = 'article';
    ogImageUrl = `${origin}${resolveBlogOgImagePath(activeBlogPost.category)}`;
    const publishedIso =
      activeBlogPost.publishedDateIso || activeBlogPost.dailyDateKey || '2026-11-17';

    breadcrumbItems.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: enPack.seo.blog.breadcrumbLabel,
        item: `${origin}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: activeBlogPost.title,
        item: canonicalUrl,
      }
    );

    const articleLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: activeBlogPost.title,
      description: activeBlogPost.summary,
      image: [ogImageUrl],
      datePublished: publishedIso,
      dateModified: publishedIso,
      inLanguage: 'en-US',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      author: {
        '@type': 'Organization',
        name: activeBlogPost.author,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'ECORZO LLC',
        logo: {
          '@type': 'ImageObject',
          url: `${origin}/assets/aistudio/test_logo_header_dark.png`,
        },
      },
    }).replace(/</g, '\\u003c');
    articleLdScript = `<script id="testline-article-ld" type="application/ld+json">${articleLd}</script>`;
  } else if (effectivePage !== 'not-found') {
    const seo = enPack.seo[effectivePage];
    title = seo.title;
    description = seo.description;
    keywords = seo.keywords;
    canonicalUrl = `${origin}${PAGE_PATHS[effectivePage]}`;
    ogImageUrl = `${origin}${resolvePageOgImagePath(effectivePage)}`;
    if (effectivePage !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: seo.breadcrumbLabel,
        item: canonicalUrl,
      });
    }
  }

  let output = htmlTemplate
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?>/i,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    .replace(/\s*<meta\s+name="robots"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+name="keywords"[\s\S]*?>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[\s\S]*?>/gi, '')
    .replace(
      /\s*<meta\s+property="og:(?:type|url|title|description|image|image:width|image:height)"[\s\S]*?>/gi,
      ''
    )
    .replace(/\s*<meta\s+name="twitter:(?:title|description|image)"[\s\S]*?>/gi, '')
    .replace(/\s*<meta\s+name="google-adsense-account"[\s\S]*?>/gi, '')
    .replace(/\s*<script[^>]*id="testline-schema-ld"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\s*<script[^>]*id="testline-breadcrumb-ld"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/\s*<script[^>]*id="testline-article-ld"[^>]*>[\s\S]*?<\/script>/gi, '');

  const normalizedClientId = adSenseClientId
    ? adSenseClientId.startsWith('ca-')
      ? adSenseClientId
      : `ca-${adSenseClientId}`
    : '';

  const schemaLd = JSON.stringify(buildRouteSchemaGraph(origin, effectivePage === 'home')).replace(
    /</g,
    '\\u003c'
  );
  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }).replace(/</g, '\\u003c');

  const dynamicTags = [
    `<meta name="robots" content="${escapeHtml(robotsContent)}" />`,
    `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    ...(canonicalUrl ? [`<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`] : []),
    `<meta property="og:type" content="${ogType}" />`,
    ...(canonicalUrl ? [`<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`] : []),
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<script id="testline-schema-ld" type="application/ld+json">${schemaLd}</script>`,
    `<script id="testline-breadcrumb-ld" type="application/ld+json">${breadcrumbJson}</script>`,
    ...(articleLdScript ? [articleLdScript] : []),
    ...(normalizedClientId && /^ca-pub-\d{10,20}$/.test(normalizedClientId)
      ? [`<meta name="google-adsense-account" content="${escapeHtml(normalizedClientId)}" />`]
      : []),
  ].join('\n    ');

  output = output.replace('</head>', `    ${dynamicTags}\n  </head>`);

  const ssrRootMarkup = buildSsrRootMarkup(
    effectivePage,
    activeBlogPost,
    allBlogPosts,
    latestNewsItems
  );
  const wrappedRoot = `<div id="root"><!--ssr-root-start-->${ssrRootMarkup}<!--ssr-root-end--></div>`;
  const markerPattern =
    /<div\s+id="root"\s*><!--ssr-root-start-->[\s\S]*?<!--ssr-root-end--><\/div>/i;
  if (markerPattern.test(output)) {
    output = output.replace(markerPattern, wrappedRoot);
  } else {
    output = output.replace(/<div\s+id="root"\s*><\/div>/i, wrappedRoot);
  }

  return { html: output, statusCode, robotsHeader: robotsContent };
}
