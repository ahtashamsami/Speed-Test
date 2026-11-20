/**
 * Verified Chrome Extension ZIP downloader with native PKZIP 2.0 fallback builder.
 * Prevents browsers/proxies from silently saving an HTML redirect/error page as a corrupted .zip.
 */

export interface ZipInputEntry {
  name: string;
  data: Uint8Array;
  isDirectory?: boolean;
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

export function computeCrc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function isValidZipBytes(bytes: Uint8Array): boolean {
  if (bytes.length < 100) return false;
  // Must begin with PKZIP Local File Header signature: PK\x03\x04
  if (
    bytes[0] !== 0x50 ||
    bytes[1] !== 0x4b ||
    bytes[2] !== 0x03 ||
    bytes[3] !== 0x04
  ) {
    return false;
  }
  // Must contain End of Central Directory signature: PK\x05\x06 near the tail
  const searchStart = Math.max(0, bytes.length - 65558);
  for (let i = bytes.length - 22; i >= searchStart; i -= 1) {
    if (
      bytes[i] === 0x50 &&
      bytes[i + 1] === 0x4b &&
      bytes[i + 2] === 0x05 &&
      bytes[i + 3] === 0x06
    ) {
      return true;
    }
  }
  return false;
}

export function buildStandardZipBytes(entries: ZipInputEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  // Safe fixed DOS timestamp: 2025-11-20 12:00:00 (compatible with every OS & extractor)
  const dosTime = (12 << 11) | (0 << 5) | 0;
  const dosDate = ((2025 - 1980) << 9) | (11 << 5) | 20;

  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const isDir = Boolean(entry.isDirectory || entry.name.endsWith('/'));
    const normalizedName = isDir
      ? entry.name.endsWith('/')
        ? entry.name
        : `${entry.name}/`
      : entry.name;
    const nameBytes = encoder.encode(normalizedName);
    const data = isDir ? new Uint8Array(0) : entry.data;
    const crc = isDir ? 0 : computeCrc32(data);
    const size = data.length;

    // Local File Header (30 bytes + filename)
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(localHeader.buffer);
    lv.setUint32(0, 0x04034b50, true); // Local file header signature
    lv.setUint16(4, 20, true); // Version needed to extract (2.0)
    lv.setUint16(6, 0x0800, true); // General purpose bit flag (UTF-8)
    lv.setUint16(8, 0, true); // Compression method: 0 = STORE (universal)
    lv.setUint16(10, dosTime, true);
    lv.setUint16(12, dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true); // Extra field length
    localHeader.set(nameBytes, 30);

    // Central Directory Header (46 bytes + filename)
    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(centralHeader.buffer);
    cv.setUint32(0, 0x02014b50, true); // Central file header signature
    cv.setUint16(4, 20, true); // Version made by: MS-DOS / 2.0
    cv.setUint16(6, 20, true); // Version needed: 2.0
    cv.setUint16(8, 0x0800, true); // UTF-8 filename flag
    cv.setUint16(10, 0, true); // Compression method: STORE
    cv.setUint16(12, dosTime, true);
    cv.setUint16(14, dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true); // Extra field length
    cv.setUint16(32, 0, true); // File comment length
    cv.setUint16(34, 0, true); // Disk number start
    cv.setUint16(36, 0, true); // Internal file attributes
    cv.setUint32(38, isDir ? 0x10 : 0x20, true); // DOS dir / archive attribute
    cv.setUint32(42, offset, true); // Relative offset of local header
    centralHeader.set(nameBytes, 46);

    localParts.push(localHeader, data);
    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  }

  let centralSize = 0;
  for (const part of centralParts) {
    centralSize += part.length;
  }

  // End of Central Directory Record (22 bytes)
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true); // EOCD signature
  ev.setUint16(4, 0, true); // Number of this disk
  ev.setUint16(6, 0, true); // Disk where central directory starts
  ev.setUint16(8, entries.length, true); // Entries on this disk
  ev.setUint16(10, entries.length, true); // Total entries
  ev.setUint32(12, centralSize, true); // Size of central directory
  ev.setUint32(16, offset, true); // Offset of start of central directory
  ev.setUint16(20, 0, true); // Comment length

  const totalLength = offset + centralSize + eocd.length;
  const output = new Uint8Array(totalLength);
  let cursor = 0;
  for (const part of localParts) {
    output.set(part, cursor);
    cursor += part.length;
  }
  for (const part of centralParts) {
    output.set(part, cursor);
    cursor += part.length;
  }
  output.set(eocd, cursor);
  return output;
}

const EXTENSION_SOURCE_FILES: Array<{
  url: string;
  archivePath: string;
  kind: 'json' | 'text' | 'png';
}> = [
  {
    url: '/chrome-extension/manifest.json',
    archivePath: 'manifest.json',
    kind: 'json',
  },
  {
    url: '/chrome-extension/popup.html',
    archivePath: 'popup.html',
    kind: 'text',
  },
  {
    url: '/chrome-extension/popup.css',
    archivePath: 'popup.css',
    kind: 'text',
  },
  {
    url: '/chrome-extension/popup.js',
    archivePath: 'popup.js',
    kind: 'text',
  },
  {
    url: '/chrome-extension/popup-scene3d.js',
    archivePath: 'popup-scene3d.js',
    kind: 'text',
  },
  {
    url: '/chrome-extension/icons/icon16.png',
    archivePath: 'icons/icon16.png',
    kind: 'png',
  },
  {
    url: '/chrome-extension/icons/icon48.png',
    archivePath: 'icons/icon48.png',
    kind: 'png',
  },
  {
    url: '/chrome-extension/icons/icon128.png',
    archivePath: 'icons/icon128.png',
    kind: 'png',
  },
  {
    url: '/chrome-extension/icons/logo-light.png',
    archivePath: 'icons/logo-light.png',
    kind: 'png',
  },
  {
    url: '/chrome-extension/icons/logo-dark.png',
    archivePath: 'icons/logo-dark.png',
    kind: 'png',
  },
];

function validateFetchedAsset(bytes: Uint8Array, kind: 'json' | 'text' | 'png'): boolean {
  if (bytes.length === 0) return false;
  if (kind === 'png') {
    return (
      bytes.length > 24 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47
    );
  }
  const text = new TextDecoder().decode(bytes);
  if (kind === 'json') {
    try {
      const parsed = JSON.parse(text) as { manifest_version?: number };
      return parsed.manifest_version === 3;
    } catch {
      return false;
    }
  }
  // Ensure text files are not accidentally the React app shell
  return !text.includes('<div id="root">');
}

async function assembleZipFromSourceFiles(): Promise<Uint8Array> {
  const entries: ZipInputEntry[] = [
    { name: 'icons/', data: new Uint8Array(0), isDirectory: true },
  ];

  for (const file of EXTENSION_SOURCE_FILES) {
    const res = await fetch(file.url, { credentials: 'same-origin', cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Could not fetch ${file.url} (HTTP ${res.status})`);
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (!validateFetchedAsset(bytes, file.kind)) {
      throw new Error(`Asset verification failed for ${file.url}`);
    }
    entries.push({ name: file.archivePath, data: bytes });
  }

  return buildStandardZipBytes(entries);
}

function triggerBlobDownload(bytes: Uint8Array, filename: string): void {
  const safeCopy = new Uint8Array(bytes.byteLength);
  safeCopy.set(bytes);
  const blob = new Blob([safeCopy.buffer], { type: 'application/zip' });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 15000);
}

export async function downloadVerifiedExtensionZip(options?: {
  forceFreshBuild?: boolean;
}): Promise<{ sizeBytes: number; source: 'server' | 'client-built' }> {
  const filename = 'testline-speed-test-extension.zip';

  if (!options?.forceFreshBuild) {
    const endpoints = [
      '/api/chrome-extension.zip',
      '/downloads/testline-speed-test-extension.zip',
    ];
    for (const url of endpoints) {
      try {
        const res = await fetch(url, { credentials: 'same-origin', cache: 'no-store' });
        if (!res.ok) continue;
        const bytes = new Uint8Array(await res.arrayBuffer());
        if (isValidZipBytes(bytes)) {
          triggerBlobDownload(bytes, filename);
          return { sizeBytes: bytes.length, source: 'server' };
        }
      } catch {
        // Try next endpoint or fall back to client-side ZIP assembly
      }
    }
  }

  const builtBytes = await assembleZipFromSourceFiles();
  if (!isValidZipBytes(builtBytes)) {
    throw new Error('Generated ZIP failed integrity verification');
  }
  triggerBlobDownload(builtBytes, filename);
  return { sizeBytes: builtBytes.length, source: 'client-built' };
}
