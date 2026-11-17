import type { BlogPost } from '../data/blogPosts';
import {
  PAGE_PATHS,
  resolveBlogOgImagePath,
  resolvePageOgImagePath,
  type AppPage,
} from '../data/seoRoutes';
import { EXTRA_UI_STRINGS } from '../i18n/extraStrings';
import type { SupportedLang } from '../i18n/localeDetection';
import { enPack } from '../i18n/packs/en';
import type { TranslationPack } from '../i18n/types';

const CANONICAL_ORIGIN = 'https://testline.net';

function upsertMetaTag(
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertScriptJsonLd(id: string, data: unknown): void {
  let scriptEl = document.getElementById(id) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = id;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(data);
}

function removeElementById(id: string): void {
  const existing = document.getElementById(id);
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }
}

export function applyRouteSeo(
  page: AppPage,
  t: TranslationPack = enPack,
  activeBlogPost: BlogPost | null = null,
  lang: SupportedLang = 'en'
): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const ogLocale = t.meta.intlLocale.replace('-', '_');

  if (page === 'not-found') {
    const nf = EXTRA_UI_STRINGS[lang]?.notFound ?? EXTRA_UI_STRINGS.en.notFound;
    const ogImageUrl = `${CANONICAL_ORIGIN}/assets/og/testline-home.png`;
    document.title = nf.seoTitle;
    upsertMetaTag('name', 'robots', 'noindex, nofollow');
    upsertMetaTag('name', 'description', nf.seoDescription);
    upsertMetaTag('property', 'og:title', nf.seoTitle);
    upsertMetaTag('property', 'og:description', nf.seoDescription);
    upsertMetaTag('property', 'og:locale', ogLocale);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:image', ogImageUrl);
    upsertMetaTag('property', 'og:image:width', '1200');
    upsertMetaTag('property', 'og:image:height', '630');
    upsertMetaTag('name', 'twitter:title', nf.seoTitle);
    upsertMetaTag('name', 'twitter:description', nf.seoDescription);
    upsertMetaTag('name', 'twitter:image', ogImageUrl);
    removeElementById('testline-article-ld');
    upsertScriptJsonLd('testline-breadcrumb-ld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'TestLine',
          item: `${CANONICAL_ORIGIN}/`,
        },
      ],
    });
    return;
  }

  upsertMetaTag(
    'name',
    'robots',
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  );

  if (page === 'blog' && activeBlogPost) {
    const localizedPost = !activeBlogPost.isDailyHotNews ? t.blog.posts[activeBlogPost.id] : undefined;
    const articleTitle = localizedPost?.title ?? activeBlogPost.title;
    const articleSummary = localizedPost?.summary ?? activeBlogPost.summary;
    const articleAuthor = localizedPost?.author ?? activeBlogPost.author;
    const pageTitle = `${articleTitle} | TestLine`;
    const canonicalUrl = `${CANONICAL_ORIGIN}/blog/${encodeURIComponent(activeBlogPost.slug)}`;
    const ogImageUrl = `${CANONICAL_ORIGIN}${resolveBlogOgImagePath(activeBlogPost.category)}`;
    const publishedIso =
      activeBlogPost.publishedDateIso || activeBlogPost.dailyDateKey || '2026-11-17';

    document.title = pageTitle;
    upsertMetaTag('name', 'description', articleSummary);
    upsertMetaTag(
      'name',
      'keywords',
      `${activeBlogPost.category}, internet speed, public ip, network diagnostics, TestLine`
    );
    upsertMetaTag('property', 'og:type', 'article');
    upsertMetaTag('property', 'og:title', pageTitle);
    upsertMetaTag('property', 'og:description', articleSummary);
    upsertMetaTag('property', 'og:locale', ogLocale);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', ogImageUrl);
    upsertMetaTag('property', 'og:image:width', '1200');
    upsertMetaTag('property', 'og:image:height', '630');
    upsertMetaTag('name', 'twitter:title', pageTitle);
    upsertMetaTag('name', 'twitter:description', articleSummary);
    upsertMetaTag('name', 'twitter:image', ogImageUrl);
    upsertLinkTag('canonical', canonicalUrl);

    upsertScriptJsonLd('testline-breadcrumb-ld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'TestLine',
          item: `${CANONICAL_ORIGIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t.seo.blog.breadcrumbLabel,
          item: `${CANONICAL_ORIGIN}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: articleTitle,
          item: canonicalUrl,
        },
      ],
    });

    upsertScriptJsonLd('testline-article-ld', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articleTitle,
      description: articleSummary,
      image: [ogImageUrl],
      datePublished: publishedIso,
      dateModified: publishedIso,
      inLanguage: t.meta.intlLocale,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      author: {
        '@type': 'Organization',
        name: articleAuthor,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${CANONICAL_ORIGIN}/#organization`,
        name: 'ECORZO LLC',
        logo: {
          '@type': 'ImageObject',
          url: `${CANONICAL_ORIGIN}/assets/aistudio/test_logo_header_dark.png`,
        },
      },
    });
    return;
  }

  removeElementById('testline-article-ld');

  const meta = t.seo[page] ?? enPack.seo[page] ?? enPack.seo.home;
  const canonicalUrl = `${CANONICAL_ORIGIN}${PAGE_PATHS[page]}`;
  const ogImageUrl = `${CANONICAL_ORIGIN}${resolvePageOgImagePath(page)}`;

  document.title = meta.title;
  upsertMetaTag('name', 'description', meta.description);
  upsertMetaTag('name', 'keywords', meta.keywords);
  upsertMetaTag('property', 'og:type', 'website');
  upsertMetaTag('property', 'og:title', meta.title);
  upsertMetaTag('property', 'og:description', meta.description);
  upsertMetaTag('property', 'og:locale', ogLocale);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('property', 'og:image', ogImageUrl);
  upsertMetaTag('property', 'og:image:width', '1200');
  upsertMetaTag('property', 'og:image:height', '630');
  upsertMetaTag('name', 'twitter:title', meta.title);
  upsertMetaTag('name', 'twitter:description', meta.description);
  upsertMetaTag('name', 'twitter:image', ogImageUrl);
  upsertLinkTag('canonical', canonicalUrl);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'TestLine',
      item: `${CANONICAL_ORIGIN}/`,
    },
  ];
  if (page !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.breadcrumbLabel,
      item: canonicalUrl,
    });
  }

  upsertScriptJsonLd('testline-breadcrumb-ld', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  });
}
