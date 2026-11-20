import type { BlogPost } from '../data/blogPosts';

export interface DailyNewsCandidate {
  id: string;
  sourceId: string;
  sourceName: string;
  title: string;
  link: string;
  summary: string;
  fullSummary?: string;
  author: string | null;
  publishedAt: string | null;
  publishedTs: number;
}

const HOT_NEWS_KEYWORDS = [
  'zero-day',
  'vulnerability',
  'ransomware',
  'breach',
  'backdoor',
  'exploit',
  'malware',
  'phishing',
  'vpn',
  'proxy',
  'ip',
  'ipv4',
  'ipv6',
  'dns',
  'bgp',
  'cloudflare',
  'outage',
  'botnet',
  'router',
  'patch',
  'cve',
  'leak',
  'cyber',
  'broadband',
  'fiber',
  '5g',
  'bandwidth',
  'data',
];

export function getUtcDateKey(nowMs = Date.now()): string {
  return new Date(nowMs).toISOString().slice(0, 10);
}

export function formatUtcHumanDate(dateKey: string): string {
  const parsed = Date.parse(`${dateKey}T12:00:00Z`);
  if (!Number.isFinite(parsed)) return dateKey;
  return new Date(parsed).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function fnv1aHex(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function slugifyTitle(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function cleanSentenceSummary(raw: string, maxLength = 340): string {
  const compact = raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (compact.length <= maxLength) return compact;

  const sliced = compact.slice(0, maxLength);
  const lastPeriod = Math.max(
    sliced.lastIndexOf('. '),
    sliced.lastIndexOf('! '),
    sliced.lastIndexOf('? ')
  );
  if (lastPeriod >= Math.floor(maxLength * 0.55)) {
    return sliced.slice(0, lastPeriod + 1).trim();
  }

  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > 60 ? sliced.slice(0, lastSpace) : sliced;
  return `${trimmed.replace(/[,;:\-]+$/, '').trimEnd()}…`;
}

export function inferHotNewsTopic(text: string): string {
  const lower = text.toLowerCase();
  if (/\b(vpn|proxy|tor|tunnel|wireguard|relay)\b/.test(lower)) return 'VPN IP Status';
  if (/\b(phish|scam|fraud|spoof|ransom|breach|backdoor|malware|exploit|cve|zero-day|flaw)\b/.test(lower)) {
    return 'IP Scams';
  }
  if (/\b(ipv4|ipv6|bgp|asn|dns|routing|cloudflare)\b/.test(lower)) return 'IP Addresses';
  if (/\b(bandwidth|fiber|broadband|5g|latency|outage|speed|throughput|wi-fi|wifi)\b/.test(lower)) {
    return 'Internet Speed';
  }
  if (/\b(geo|location|tracking|surveillance)\b/.test(lower)) return 'IP Location';
  return 'Network & Security';
}

export function scoreHotNewsItem(item: DailyNewsCandidate, nowMs = Date.now()): number {
  const ageHours = item.publishedTs > 0 ? Math.max(0, (nowMs - item.publishedTs) / 3600000) : 72;
  const recencyScore = Math.max(0, 120 - ageHours * 2.5);
  const haystack = `${item.title} ${item.fullSummary || item.summary}`.toLowerCase();
  let keywordScore = 0;
  for (const kw of HOT_NEWS_KEYWORDS) {
    if (haystack.includes(kw)) {
      keywordScore += 8;
    }
  }
  return recencyScore + Math.min(keywordScore, 48);
}

function getTopicDiagnosticGuidance(topicTag: string): {
  takeaway: string;
  impactParagraph: string;
  actionParagraph: string;
} {
  switch (topicTag) {
    case 'VPN IP Status':
      return {
        takeaway:
          'Confirm your VPN exit ASN, IPv4/IPv6 leak status, and browser-vs-IP timezone alignment on TestLine after switching servers or patching VPN clients.',
        impactParagraph:
          'Changes affecting commercial VPN gateways, residential proxies, and encrypted relays often shift outbound ASN classification and trigger unexpected website verification prompts or silent IPv6 leaks outside the tunnel.',
        actionParagraph:
          'Run an on-demand TestLine speed and IP diagnostic check with your tunnel active to verify your observed public IPv4/IPv6 exit address, PTR hostname, and Cloudflare DoH resolver latency.',
      };
    case 'IP Scams':
      return {
        takeaway:
          'Keep browsers, messaging apps, and router firmware patched, and verify your PTR hostname and proxy headers on TestLine if you notice unexpected network alerts.',
        impactParagraph:
          'Security flaws, phishing campaigns, and credential-harvesting operations frequently target unmanaged home routers, hijacked DNS settings, or deceptive warnings claiming a user’s public IP address has been compromised.',
        actionParagraph:
          'Verify on TestLine that your connection still reports your expected residential ISP and ASN with no unexpected Via/Forwarded proxy hops, then confirm DNS-over-HTTPS (1.1.1.1) latency remains low and stable.',
      };
    case 'IP Addresses':
      return {
        takeaway:
          'Compare your dual-stack IPv4/IPv6 reachability and Cloudflare 1.1.1.1 DoH latency against unloaded ping to spot DNS or BGP routing anomalies early.',
        impactParagraph:
          'Routing incidents across BGP peering, carrier-grade NAT (CGNAT), or authoritative DNS resolvers can introduce erratic packet jitter and slow initial connection handshakes even before headline bandwidth drops.',
        actionParagraph:
          'Use TestLine’s dual-stack IPv4/IPv6 readout and DoH latency probe to verify whether your ISP’s routing path and reverse DNS (PTR) record remain healthy during transit updates.',
      };
    case 'Internet Speed':
      return {
        takeaway:
          'Benchmark multi-stream download/upload throughput alongside ping and jitter variance on TestLine to separate local Wi-Fi limits from ISP transit congestion.',
        impactParagraph:
          'Broadband infrastructure changes, carrier outages, fiber upgrades, and wireless spectrum shifts directly affect sustained multi-stream throughput and loaded latency (bufferbloat) during video calls and cloud uploads.',
        actionParagraph:
          'Run a baseline speed benchmark in TestLine and compare download speed, upload speed, and jitter across peak and off-peak hours, exporting a PDF report if you need evidence for your ISP.',
      };
    default:
      return {
        takeaway:
          'Run a quick TestLine benchmark and dual-stack IP check to confirm clean direct ISP routing, healthy DoH DNS response times, and stable jitter.',
        impactParagraph:
          'Industry developments across cloud infrastructure, endpoint software, and telecom networks frequently ripple into resolver response times, routing hops, and outbound IP reputation for everyday users.',
        actionParagraph:
          'Keep endpoints updated, monitor live RSS feeds in the TestLine News hub, and verify your public IPv4/IPv6, ISP ASN, and throughput metrics whenever connectivity feels degraded.',
      };
  }
}

export function buildDailyBlogPost(
  item: DailyNewsCandidate,
  dateKey: string,
  slotIndex: number
): BlogPost {
  const rawBody = item.fullSummary && item.fullSummary.length > item.summary.length
    ? item.fullSummary
    : item.summary;
  const cleanedLongSummary = cleanSentenceSummary(rawBody || '', 340);
  const cardSummary =
    cleanedLongSummary.length > 35
      ? cleanSentenceSummary(cleanedLongSummary, 240)
      : `Daily cybersecurity and network briefing summarizing ${item.title}, originally reported by ${item.sourceName}.`;
  const narrativeSummary =
    cleanedLongSummary.length > 35 ? cleanedLongSummary : cardSummary;

  const topicTag = inferHotNewsTopic(`${item.title} ${narrativeSummary}`);
  const guidance = getTopicDiagnosticGuidance(topicTag);
  const idHash = fnv1aHex(`${dateKey}:${item.link}`);
  const humanDate = formatUtcHumanDate(dateKey);

  return {
    id: `daily-hot-${dateKey}-${slotIndex + 1}-${idHash}`,
    slug: `daily-hot-news-${dateKey}-${slugifyTitle(item.title)}`,
    title: item.title,
    category: 'Hot News',
    publishedDate: humanDate,
    publishedDateIso: dateKey,
    readTime: '3 min read',
    author: `TestLine Daily Digest · via ${item.sourceName}`,
    summary: cardSummary,
    keyTakeaways: [
      `Daily News Summary (${item.sourceName} · ${topicTag}): ${cardSummary}`,
      `Selected as Pick #${slotIndex + 1} of 2 in TestLine's ${humanDate} automated news-to-blog digest based on publication recency and network impact.`,
      guidance.takeaway,
    ],
    sections: [
      {
        heading: `Executive Summary: ${item.sourceName} Report`,
        paragraphs: [
          narrativeSummary,
          `This summary was automatically selected and published for ${humanDate} as part of TestLine's daily 2-story Hot News digest. To read the full original coverage and technical indicators, use the primary source link above.`,
        ],
      },
      {
        heading: `What This Means for ${topicTag}`,
        paragraphs: [guidance.impactParagraph, guidance.actionParagraph],
      },
    ],
    isDailyHotNews: true,
    dailyDateKey: dateKey,
    sourceName: item.sourceName,
    sourceUrl: item.link,
    topicTag,
  };
}

export function pickAndMergeDailyBlogs(
  newsItems: DailyNewsCandidate[],
  existingBlogs: BlogPost[],
  options?: {
    dateKey?: string;
    forceRefreshToday?: boolean;
    nowMs?: number;
    maxRetainedPosts?: number;
  }
): { dateKey: string; blogs: BlogPost[]; generatedToday: boolean } {
  const nowMs = options?.nowMs ?? Date.now();
  const todayKey = options?.dateKey ?? getUtcDateKey(nowMs);
  const forceRefreshToday = options?.forceRefreshToday ?? false;
  const maxRetained = options?.maxRetainedPosts ?? 30;

  const validExisting = existingBlogs.filter((p) => p && p.isDailyHotNews && p.slug);
  const existingToday = validExisting.filter((p) => p.dailyDateKey === todayKey);

  if (!forceRefreshToday && existingToday.length >= 2) {
    return {
      dateKey: todayKey,
      blogs: validExisting.slice(0, maxRetained),
      generatedToday: false,
    };
  }

  if (newsItems.length === 0) {
    return {
      dateKey: todayKey,
      blogs: validExisting.slice(0, maxRetained),
      generatedToday: false,
    };
  }

  const previousDays = validExisting.filter((p) => p.dailyDateKey !== todayKey);
  const usedUrls = new Set(previousDays.map((p) => p.sourceUrl).filter(Boolean));

  const ranked = [...newsItems].sort(
    (a, b) => scoreHotNewsItem(b, nowMs) - scoreHotNewsItem(a, nowMs)
  );

  const freshPool = ranked.filter((item) => !usedUrls.has(item.link));
  const candidatePool = freshPool.length >= 2 ? freshPool : ranked;

  const picked: DailyNewsCandidate[] = [];
  if (candidatePool.length > 0) {
    picked.push(candidatePool[0]);
    const diverseSecond = candidatePool.find(
      (item, idx) =>
        idx > 0 &&
        item.link !== candidatePool[0].link &&
        item.sourceId !== candidatePool[0].sourceId
    );
    if (diverseSecond) {
      picked.push(diverseSecond);
    } else {
      const nextDistinct = candidatePool.find(
        (item, idx) => idx > 0 && item.link !== candidatePool[0].link
      );
      if (nextDistinct) {
        picked.push(nextDistinct);
      }
    }
  }

  const todayBlogs = picked
    .slice(0, 2)
    .map((item, idx) => buildDailyBlogPost(item, todayKey, idx));

  const combined = [...todayBlogs, ...previousDays].slice(0, maxRetained);

  return {
    dateKey: todayKey,
    blogs: combined,
    generatedToday: todayBlogs.length > 0,
  };
}
