import type { SpeedUnit } from '../types/network';

export function convertThroughput(mbps: number | null, unit: SpeedUnit): number | null {
  if (mbps === null || !Number.isFinite(mbps)) return null;
  return unit === 'MB/s' ? mbps / 8 : mbps;
}

export function formatThroughput(mbps: number | null, unit: SpeedUnit): string {
  const val = convertThroughput(mbps, unit);
  if (val === null) return '—';
  if (val >= 100) return val.toFixed(1);
  if (val >= 10) return val.toFixed(1);
  return val.toFixed(2);
}

export function formatLatency(ms: number | null): string {
  if (ms === null || !Number.isFinite(ms)) return '—';
  if (ms >= 100) return ms.toFixed(0);
  return ms.toFixed(1);
}

export function formatTimeShort(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp));
}
