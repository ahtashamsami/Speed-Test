import { jsPDF } from 'jspdf';
import type {
  NetworkDiagnostics,
  SpeedMetrics,
  SpeedUnit,
  TestRunRecord,
} from '../types/network';
import {
  formatLatency,
  formatThroughput,
  formatTimeShort,
  resolveSpeedUnit,
} from './formatters';

interface PdfReportInput {
  metrics: SpeedMetrics;
  network: NetworkDiagnostics;
  unit: SpeedUnit;
  history: TestRunRecord[];
  isSecondCopy?: boolean;
}

const BRAND_LOGO_PATH = '/assets/aistudio/test_logo_light.png';

async function loadTrimmedLogoDataUrl(
  src: string,
  withWatermark = false
): Promise<{
  dataUrl: string;
  watermarkDataUrl: string | null;
  aspectRatio: number;
} | null> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Logo load failed'));
      image.src = src;
    });

    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return null;

    const srcCanvas = document.createElement('canvas');
    srcCanvas.width = w;
    srcCanvas.height = h;
    const srcCtx = srcCanvas.getContext('2d');
    if (!srcCtx) return null;
    srcCtx.drawImage(img, 0, 0);

    // Crop outer transparent padding so logo renders crisply inside PDF header badge
    const pixels = srcCtx.getImageData(0, 0, w, h).data;
    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const alpha = pixels[(y * w + x) * 4 + 3];
        if (alpha > 12) {
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX <= minX || maxY <= minY) {
      let watermarkDataUrl: string | null = null;
      if (withWatermark) {
        const wmCanvas = document.createElement('canvas');
        wmCanvas.width = w;
        wmCanvas.height = h;
        const wmCtx = wmCanvas.getContext('2d');
        if (wmCtx) {
          wmCtx.globalAlpha = 0.09;
          wmCtx.drawImage(srcCanvas, 0, 0);
          watermarkDataUrl = wmCanvas.toDataURL('image/png');
        }
      }
      return {
        dataUrl: srcCanvas.toDataURL('image/png'),
        watermarkDataUrl,
        aspectRatio: w / h,
      };
    }

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const outCanvas = document.createElement('canvas');
    outCanvas.width = cropW;
    outCanvas.height = cropH;
    const outCtx = outCanvas.getContext('2d');
    if (!outCtx) return null;
    outCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

    let watermarkDataUrl: string | null = null;
    if (withWatermark) {
      const wmCanvas = document.createElement('canvas');
      wmCanvas.width = cropW;
      wmCanvas.height = cropH;
      const wmCtx = wmCanvas.getContext('2d');
      if (wmCtx) {
        wmCtx.globalAlpha = 0.09;
        wmCtx.drawImage(outCanvas, 0, 0);
        watermarkDataUrl = wmCanvas.toDataURL('image/png');
      }
    }

    return {
      dataUrl: outCanvas.toDataURL('image/png'),
      watermarkDataUrl,
      aspectRatio: cropW / cropH,
    };
  } catch {
    return null;
  }
}

export async function exportNetworkReportPdf({
  metrics,
  network,
  unit,
  history,
  isSecondCopy = false,
}: PdfReportInput): Promise<void> {
  const resolvedUnit = resolveSpeedUnit(
    unit,
    metrics.downloadMbps ?? metrics.uploadMbps
  );
  const unitLabel = unit === 'Auto' ? `Auto (${resolvedUnit})` : unit;
  const logoAsset = await loadTrimmedLogoDataUrl(BRAND_LOGO_PATH, true);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  let cursorY = 16;

  const drawCenterWatermark = () => {
    if (!logoAsset?.watermarkDataUrl) return;
    const wmWidth = 120;
    const wmHeight = wmWidth / logoAsset.aspectRatio;
    const wmX = (pageWidth - wmWidth) / 2;
    const wmY = (pageHeight - wmHeight) / 2;
    doc.addImage(logoAsset.watermarkDataUrl, 'PNG', wmX, wmY, wmWidth, wmHeight);
  };

  drawCenterWatermark();

  const ensureSpace = (neededMm: number) => {
    if (cursorY + neededMm > pageHeight - 18) {
      doc.addPage();
      drawCenterWatermark();
      cursorY = 18;
    }
  };

  // Header with embedded transparent brand logo on the right
  let headerBottomY = cursorY;
  if (logoAsset) {
    const logoH = 18;
    const logoW = Math.min(logoH * logoAsset.aspectRatio, 48);
    const logoX = pageWidth - marginX - logoW;
    const logoY = cursorY - 4;

    doc.addImage(logoAsset.dataUrl, 'PNG', logoX, logoY, logoW, logoH);
    headerBottomY = logoY + logoH + 2.5;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(15, 23, 42);
  doc.text('TestLine Network & Speed Report', marginX, cursorY + 2);
  cursorY += 7.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(100, 116, 139);
  const generatedStr = new Date().toLocaleString();
  doc.text(`Generated: ${generatedStr}  ·  Unit: ${unitLabel}  ·  ECORZO LLC`, marginX, cursorY);
  cursorY += 5.5;

  if (isSecondCopy) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(180, 83, 9);
    doc.text('SECOND COPY  —  Duplicate Report Download', marginX, cursorY);
    cursorY += 5;
  }

  cursorY = Math.max(cursorY, headerBottomY);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.35);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 9;

  // Section 1: Speed Test Results
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Speed Benchmark Summary', marginX, cursorY);
  cursorY += 6;

  const speedCards = [
    {
      label: 'Download Speed',
      value: `${formatThroughput(metrics.downloadMbps, resolvedUnit)} ${resolvedUnit}`,
      sub:
        metrics.peakDownloadMbps !== null
          ? `Peak ${formatThroughput(metrics.peakDownloadMbps, resolvedUnit)} ${resolvedUnit}`
          : 'Sustained stream',
    },
    {
      label: 'Upload Speed',
      value: `${formatThroughput(metrics.uploadMbps, resolvedUnit)} ${resolvedUnit}`,
      sub:
        metrics.peakUploadMbps !== null
          ? `Peak ${formatThroughput(metrics.peakUploadMbps, resolvedUnit)} ${resolvedUnit}`
          : 'Sustained stream',
    },
    {
      label: 'Average Ping',
      value: `${formatLatency(metrics.pingMs)} ms`,
      sub:
        metrics.minPingMs !== null
          ? `Min ${formatLatency(metrics.minPingMs)} ms`
          : 'RTT probes',
    },
    {
      label: 'Jitter',
      value: `${formatLatency(metrics.jitterMs)} ms`,
      sub: `${metrics.pingSamples.length} probes`,
    },
  ];

  const cardGap = 4;
  const cardW = (contentWidth - cardGap * 3) / 4;
  const cardH = 22;

  speedCards.forEach((card, idx) => {
    const x = marginX + idx * (cardW + cardGap);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cursorY, cardW, cardH, 2, 2, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(card.label, x + 3, cursorY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(15, 23, 42);
    doc.text(card.value, x + 3, cursorY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(card.sub, x + 3, cursorY + 18.5);
  });

  cursorY += cardH + 10;

  // Section 2: Proxy / VPN Detection
  ensureSpace(34);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Proxy & VPN Detection', marginX, cursorY);
  cursorY += 5.5;

  const { proxyDetection } = network;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  if (proxyDetection.detected) {
    doc.setTextColor(180, 83, 9);
    doc.text(
      `${proxyDetection.category} (${proxyDetection.confidence} confidence)`,
      marginX,
      cursorY
    );
  } else {
    doc.setTextColor(15, 118, 110);
    doc.text('Direct Connection — No proxy or VPN signals detected', marginX, cursorY);
  }
  cursorY += 5.5;

  if (proxyDetection.signals.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    for (const signal of proxyDetection.signals) {
      const wrapped = doc.splitTextToSize(`• ${signal}`, contentWidth - 4);
      ensureSpace(wrapped.length * 4.5 + 2);
      doc.text(wrapped, marginX + 2, cursorY);
      cursorY += wrapped.length * 4.5;
    }
  }
  cursorY += 6;

  // Section 3: Network, IP & DNS Diagnostics
  ensureSpace(65);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('3. Network, IP & DNS Diagnostics', marginX, cursorY);
  cursorY += 6;

  const locationStr =
    [network.city, network.region, network.country].filter(Boolean).join(', ') ||
    'Unavailable';

  const rows: Array<[string, string]> = [
    ['Primary Public IP', network.primaryIp ?? 'Unavailable'],
    ['IPv4 Address', network.ipv4 ?? 'Not detected'],
    ['IPv6 Address', network.ipv6 ?? 'Not detected'],
    ['ISP / Carrier', network.isp ?? 'Unavailable'],
    [
      'Autonomous System (ASN)',
      [network.asn, network.org].filter(Boolean).join(' · ') || 'Unavailable',
    ],
    ['Approximate Location', locationStr],
    ['Timezone', network.timezone ?? 'Unavailable'],
    ['Reverse DNS (PTR)', network.ptrHostname ?? 'No PTR record published'],
    [
      'DoH Resolver Probe',
      network.dohReachable
        ? `${network.dohResolver} · Reachable (${network.dohLatencyMs?.toFixed(1) ?? '—'} ms)`
        : `${network.dohResolver} · Unreachable`,
    ],
    [
      'Transport Protocol',
      [
        network.protocol?.toUpperCase(),
        network.httpVersion ? `HTTP/${network.httpVersion}` : null,
      ]
        .filter(Boolean)
        .join(' · ') || 'HTTPS',
    ],
    [
      'Browser Link Hint',
      network.connectionHint
        ? [
            network.connectionHint.effectiveType?.toUpperCase(),
            network.connectionHint.downlinkMbps !== undefined
              ? `~${network.connectionHint.downlinkMbps} Mbps cap`
              : null,
            network.connectionHint.rttMs !== undefined
              ? `${network.connectionHint.rttMs} ms RTT`
              : null,
          ]
            .filter(Boolean)
            .join(' · ') || 'Available'
        : 'Not exposed by browser',
    ],
  ];

  rows.forEach(([label, val], idx) => {
    ensureSpace(8);
    if (idx > 0) {
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(marginX, cursorY - 3.5, pageWidth - marginX, cursorY - 3.5);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(label, marginX, cursorY);

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    const valLines = doc.splitTextToSize(val, contentWidth - 58);
    doc.text(valLines, marginX + 56, cursorY);
    cursorY += Math.max(valLines.length * 4.5, 6.2);
  });

  // Section 4: Session History (if present)
  if (history.length > 0) {
    cursorY += 5;
    ensureSpace(26);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('4. Recent Session Runs', marginX, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text('Time', marginX, cursorY);
    doc.text(`Download (${unit})`, marginX + 34, cursorY);
    doc.text(`Upload (${unit})`, marginX + 68, cursorY);
    doc.text('Ping (ms)', marginX + 100, cursorY);
    doc.text('Jitter (ms)', marginX + 125, cursorY);
    doc.text('Public IP', marginX + 150, cursorY);
    cursorY += 2.5;

    doc.setDrawColor(203, 213, 225);
    doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
    cursorY += 4.5;

    doc.setFont('courier', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);

    for (const rec of history.slice(0, 8)) {
      ensureSpace(6.5);
      const dlUnit = resolveSpeedUnit(unit, rec.downloadMbps);
      const ulUnit = resolveSpeedUnit(unit, rec.uploadMbps);
      const dlText =
        rec.downloadMbps === null
          ? '—'
          : unit === 'Auto'
          ? `${formatThroughput(rec.downloadMbps, dlUnit)} ${dlUnit}`
          : formatThroughput(rec.downloadMbps, dlUnit);
      const ulText =
        rec.uploadMbps === null
          ? '—'
          : unit === 'Auto'
          ? `${formatThroughput(rec.uploadMbps, ulUnit)} ${ulUnit}`
          : formatThroughput(rec.uploadMbps, ulUnit);

      doc.text(formatTimeShort(rec.timestamp), marginX, cursorY);
      doc.text(dlText, marginX + 34, cursorY);
      doc.text(ulText, marginX + 68, cursorY);
      doc.text(formatLatency(rec.pingMs), marginX + 100, cursorY);
      doc.text(formatLatency(rec.jitterMs), marginX + 125, cursorY);
      const ipText = (rec.ip ?? '—').slice(0, 22);
      doc.text(ipText, marginX + 150, cursorY);
      cursorY += 5.5;
    }
  }

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `TestLine by ECORZO LLC  ·  ${isSecondCopy ? 'Second Copy  ·  ' : ''}Page ${p} of ${pageCount}`,
      marginX,
      pageHeight - 10
    );
  }

  const stamp = new Date()
    .toISOString()
    .replace(/[:T]/g, '-')
    .slice(0, 19);
  const copySuffix = isSecondCopy ? '-second-copy' : '';
  doc.save(`testline-report${copySuffix}-${stamp}.pdf`);
}
