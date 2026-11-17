# testline.net SEO audit

Date: 17 Nov 2026 · Method: claude-seo v2.6.2 audit checklist, run against the live site (read only). All 11 sitemap URLs plus one made-up URL were rendered in headless Chromium and compared with the raw HTML.

**SEO health score: about 55 / 100** (estimate using the plugin's weights)

|Category|Weight|Score|
|-|-|-|
|Technical SEO|22%|45|
|Content quality|23%|45|
|On-page SEO|20%|70|
|Schema|10%|60|
|Performance (lab only)|10%|70|
|AI search readiness|10%|40|
|Images|5%|70|

Business type: free web tool (speed test + "what is my IP"), with a blog and a news feed. Operator ECORZO LLC, New York.

\---

## Critical

### 1\. Every page ships the homepage's title and canonical in the raw HTML

The site is a client-side React app. The HTML the server sends for every URL is the same file: an empty `<div id="root"></div>`, about 9 words of text, the homepage `<title>`, and `<link rel="canonical" href="https://testline.net/">`. The correct title, description, canonical and content only appear after JavaScript runs.

* Checked: `curl https://testline.net/about` returns the homepage title and canonical `/`, with no `<h1>`.
* Effect: Google has to render each page to see it, and its first pass sees every page saying "I am a copy of the homepage". This can keep inner pages out of the index. Bing is weaker at rendering. GPTBot, ClaudeBot, PerplexityBot and most AI crawlers do not run JavaScript, so they see an empty page on every URL, even though robots.txt welcomes them.
* Fix: pre-render or server-render each route (Vite SSG such as `vite-react-ssg`, or move to Next.js/Astro), or at least have the server emit the correct `<title>`, description, canonical and main text per URL.

### 2\. Blog articles have no URLs of their own

`/blog` lists 10 guides, but "Read Article" is a button. Clicking it swaps the content in place: the URL stays `/blog` and the canonical stays `/blog`. None of the 10 articles is in the sitemap or linked anywhere.

* Effect: these 10 articles (the site's main content asset) cannot be indexed or ranked one by one, and cannot earn links.
* Fix: give each article its own URL (e.g. `/blog/real-world-download-speed`) with a real `<a href>`, its own title/description/canonical, `Article` schema with author and date, and add them to the sitemap.

### 3\. www.testline.net is down (Cloudflare 522)

`https://www.testline.net/` returned Cloudflare error 522 (origin not reachable), same as the earlier audit today. Anyone who types or links the www version gets an error, and links pointing to www pass no value.

* Fix: in Cloudflare, add a redirect rule 301 `www.testline.net/\*` to `https://testline.net/$1` (the DNS record must be proxied, orange cloud).

## High

### 4\. Unknown URLs return 200 with the homepage (soft 404)

`https://testline.net/nonexistent-page-xyz` returns HTTP 200 and the full homepage. Google treats this as soft 404s, and it wastes crawl on junk URLs.

* Fix: return a real 404 status for unknown routes (Cloudflare Pages: add a `404.html`; or a Worker/route list), and show a "page not found" view.

### 5\. Thin and borrowed content on /news

`/news` has about 150 words of its own and lists third-party RSS headlines (Bleeping Computer, The Hacker News, TechCrunch...). Aggregated content adds little value and can drag site quality down.

* Fix: either add original commentary per item, or set `/news` to `noindex, follow` and drop it from the sitemap (it is currently priority 0.9, "hourly").

### 6\. Missing security headers

No `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors` or `Referrer-Policy` on any response. Not a direct ranking factor, but a trust signal and an easy fix.

* Fix: add them through Cloudflare (Transform Rules or a `\_headers` file on Pages). Turn on HSTS.

## Medium

* **Schema clean-up.** The JSON-LD graph has WebSite, WebApplication, Organization, FAQPage and HowTo. The Organization `@id` is the relative `#ecorzo-organization`; make it absolute (`https://testline.net/#organization`). HowTo rich results were retired by Google and FAQ rich results are limited to government and health sites, so these will not show as rich results (keep FAQ only if the questions are visible on the page). Add `Article` schema per blog post once posts have URLs.
* **Same social image everywhere.** Every page uses the header logo PNG as `og:image`. Make a 1200x630 share image, and one per article.
* **Full-screen cookie modal.** A modal covers the page on first visit and blocks clicks until the visitor chooses. Consent dialogs are allowed, but a smaller bottom banner is better for users and engagement.
* **Google Tag Manager is loaded twice** (`GTM-M8FJDLRW` appears twice in the HTML). Remove the duplicate to avoid double-counted analytics and extra script work.
* **Sitemap has no `<lastmod>`.** `changefreq` and `priority` are ignored by Google; add accurate `lastmod` dates instead.
* **Thin legal/utility pages** (190 to 550 words) are fine as they are, but they hold 8 of 11 sitemap slots. Consider lower priority or a single "Legal" hub.

## Low

* Three Google Fonts families are loaded from fonts.googleapis.com; self-host or trim to two to cut render-blocking requests.
* Contact page is short (190 words); add a map/opening hours if local trust matters.

## What already works

* Clean, unique, keyword-focused titles and descriptions on every page (after rendering), one H1 per page, correct rendered canonicals, `lang="en"`, mobile viewport with no horizontal scroll, `index, follow, max-image-preview:large`.
* robots.txt is sensible (only `/api/` blocked, AI crawlers allowed) and points to the sitemap.
* `llms.txt` exists and is detailed.
* BreadcrumbList on every page; Open Graph and Twitter tags present.
* Homepage has real depth (about 890 words, FAQ, reference section). Clear operator details (company, address, phone) support E-E-A-T.
* Lab timings from the audit machine: first contentful paint about 0.9 to 1.6 s, page weight about 460 KB, 24 requests. No field Core Web Vitals were available (no Google API access).

## Limits of this audit

* Run from a cloud sandbox: third-party scripts (Google Analytics, GTM, ipwho.is, speed.cloudflare.com) were blocked by the sandbox network, so the speed-test widget itself and analytics were not exercised. Plain `http://` could not be tested.
* No Search Console, GA4, backlink or SERP data was used (no credentials were requested).
* The plugin's own fetch scripts refuse to run here because the sandbox has no local DNS, so its checks were reproduced with the same bundled Playwright/Chromium. Pages were rendered without Chromium's sandbox inside the container.
* Screenshots: `screenshots/home-desktop.png`, `screenshots/home-mobile.png`.

\---

# Action plan

**(critical)**

1. Give each of the 10 blog articles its own URL, linked with real `<a href>`, and add them to the sitemap.
2. Pre-render or server-render every route so raw HTML has the right title, description, canonical, H1 and text.

&#x20;**(high)**
4. Return real 404s for unknown URLs.
5. Decide on /news: add original commentary or `noindex` it.
6. Add security headers and HSTS in Cloudflare.

**(medium)**
7. Fix Organization `@id`, add Article schema, drop HowTo.
8. Create proper 1200x630 social images.
9. Remove duplicate GTM tag; add `lastmod` to the sitemap; switch cookie modal to a banner.



