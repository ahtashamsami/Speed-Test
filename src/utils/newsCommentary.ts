import { EXTRA_UI_STRINGS, type NewsCommentaryTopic } from '../i18n/extraStrings';
import type { SupportedLang } from '../i18n/localeDetection';

export function classifyNewsTopic(title: string, summary: string): NewsCommentaryTopic {
  const haystack = `${title} ${summary}`.toLowerCase();
  if (/\b(vpn|proxy|tor|wireguard|tunnel|zerotier|tailscale)\b/.test(haystack)) {
    return 'vpn';
  }
  if (/\b(phish|scam|malware|ransomware|exploit|cve|zero-day|botnet|backdoor|breach|trojan)\b/.test(haystack)) {
    return 'scam';
  }
  if (/\b(dns|bgp|ipv4|ipv6|asn|routing|cloudflare|outage|certificate|tls|ssl)\b/.test(haystack)) {
    return 'routing';
  }
  if (/\b(fiber|broadband|5g|6g|wifi|wi-fi|latency|bandwidth|speed|throughput|isp|starlink)\b/.test(haystack)) {
    return 'speed';
  }
  return 'general';
}

export function getNewsEditorialNote(
  title: string,
  summary: string,
  lang: SupportedLang = 'en'
): string {
  const topic = classifyNewsTopic(title, summary);
  const strings = EXTRA_UI_STRINGS[lang] ?? EXTRA_UI_STRINGS.en;
  return strings.newsEditorial.commentaryByTopic[topic];
}
