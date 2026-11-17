import type { ResolvedSpeedUnit, SpeedUnit } from '../types/network';

export const AUTO_MBPS_THRESHOLD = 100;

export function resolveSpeedUnit(
  unit: SpeedUnit,
  measuredMbps: number | null
): ResolvedSpeedUnit {
  if (unit === 'Mbps' || unit === 'MB/s') {
    return unit;
  }
  if (
    measuredMbps !== null &&
    Number.isFinite(measuredMbps) &&
    measuredMbps >= AUTO_MBPS_THRESHOLD
  ) {
    return 'MB/s';
  }
  return 'Mbps';
}

export function convertThroughput(
  mbps: number | null,
  unit: SpeedUnit,
  referenceMbps?: number | null
): number | null {
  if (mbps === null || !Number.isFinite(mbps)) return null;
  const resolved = resolveSpeedUnit(
    unit,
    referenceMbps !== undefined ? referenceMbps : mbps
  );
  return resolved === 'MB/s' ? mbps / 8 : mbps;
}

export function formatThroughput(
  mbps: number | null,
  unit: SpeedUnit,
  referenceMbps?: number | null
): string {
  const val = convertThroughput(mbps, unit, referenceMbps);
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

export function formatTimeShort(timestamp: number, locale?: string): string {
  try {
    return new Intl.DateTimeFormat(locale || undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(timestamp));
  } catch {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(timestamp));
  }
}

export function formatDateLong(dateInput: string | number, locale?: string): string {
  try {
    let date: Date;
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput.trim())) {
      const [y, m, d] = dateInput.trim().split('-').map(Number);
      date = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
      return new Intl.DateTimeFormat(locale || undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      }).format(date);
    }
    date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return String(dateInput);
    return new Intl.DateTimeFormat(locale || undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return String(dateInput);
  }
}
