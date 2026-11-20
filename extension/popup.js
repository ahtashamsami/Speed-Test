(function () {
  'use strict';

  var THEME_KEY = 'testline_ext_theme';
  var UNIT_KEY = 'testline_ext_unit';
  var LINE_MODE_KEY = 'testline_ext_line_mode';
  var LINE_MODES = ['fiber', 'wave', 'helix', 'blocks'];
  var LINE_MODE_LABELS = {
    fiber: 'Fiber',
    wave: 'Wave',
    helix: 'Helix',
    blocks: 'Blocks'
  };
  var DOWNLOAD_ENDPOINT = 'https://speed.cloudflare.com/__down';
  var UPLOAD_ENDPOINT = 'https://speed.cloudflare.com/__up';
  var DOH_ENDPOINT = 'https://cloudflare-dns.com/dns-query?name=cloudflare.com&type=A';

  var shell = document.getElementById('popupShell');
  var lineModeBtn = document.getElementById('lineModeBtn');
  var lineModeLabel = document.getElementById('lineModeLabel');
  var themeToggle = document.getElementById('themeToggle');
  var unitMbpsBtn = document.getElementById('unitMbpsBtn');
  var unitMBsBtn = document.getElementById('unitMBsBtn');
  var startBtn = document.getElementById('startBtn');
  var startBtnLabel = document.getElementById('startBtnLabel');
  var btnProgressRing = document.getElementById('btnProgressRing');
  var btnRingFill = document.getElementById('btnRingFill');
  var RING_CIRCUMFERENCE = 59.69;
  var readyMetrics = document.getElementById('readyMetrics');
  var readyDownloadLabel = document.getElementById('readyDownloadLabel');
  var readyUploadLabel = document.getElementById('readyUploadLabel');
  var activeValues = document.getElementById('activeValues');
  var downloadValueEl = document.getElementById('downloadValue');
  var uploadValueEl = document.getElementById('uploadValue');
  var line3dFrame = document.getElementById('line3dFrame');
  var line3dCanvas = document.getElementById('line3dCanvas');
  var exportRow = document.getElementById('exportRow');
  var exportPdfBtn = document.getElementById('exportPdfBtn');

  var state = {
    phase: 'ready', // 'ready' | 'testing' | 'complete'
    theme: 'light',
    unit: 'Mbps', // 'Mbps' | 'MB/s'
    lineMode: 'fiber', // 'fiber' | 'wave' | 'helix' | 'blocks'
    downloadMbps: null,
    uploadMbps: null,
    liveDownloadMbps: null,
    liveUploadMbps: null,
    downloadRatio: 0,
    uploadRatio: 0,
    pingMs: null,
    usedFallback: false,
    completedAt: null,
    runId: 0,
    network: {
      primaryIp: null,
      ipv4: null,
      ipv6: null,
      isp: null,
      asn: null,
      location: null,
      timezone: null,
      proxyStatus: null,
      dohLatencyMs: null
    }
  };

  var cachedPdfLogos = null;
  var sceneController = null;
  var lineResizeObserver = null;

  function syncScene3D(partial) {
    if (sceneController && typeof sceneController.updateState === 'function') {
      sceneController.updateState(partial);
    }
  }

  function resizeLine3D() {
    if (!sceneController || typeof sceneController.resize !== 'function' || !line3dFrame) {
      return;
    }
    var w = Math.max(80, Math.round(line3dFrame.clientWidth || 265));
    var h = Math.max(32, Math.round(line3dFrame.clientHeight || 44));
    sceneController.resize(w, h);
  }

  /* ---------------------------------------------------------
     Theme Persistence (chrome.storage.local + preview fallback)
     --------------------------------------------------------- */
  function applyTheme(theme) {
    var safeTheme = theme === 'dark' ? 'dark' : 'light';
    state.theme = safeTheme;
    document.body.setAttribute('data-theme', safeTheme);
    themeToggle.setAttribute('aria-pressed', safeTheme === 'dark' ? 'true' : 'false');
    themeToggle.setAttribute(
      'title',
      safeTheme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'
    );
    syncScene3D({ theme: safeTheme });
  }

  function loadSavedTheme() {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      typeof chrome.storage.local.get === 'function'
    ) {
      try {
        chrome.storage.local.get([THEME_KEY], function (result) {
          if (chrome.runtime && chrome.runtime.lastError) {
            applyTheme('light');
            return;
          }
          if (result && (result[THEME_KEY] === 'light' || result[THEME_KEY] === 'dark')) {
            applyTheme(result[THEME_KEY]);
          } else {
            applyTheme('light');
          }
        });
        return;
      } catch (_err) {
        // Fall through to localStorage fallback
      }
    }

    try {
      var saved = window.localStorage.getItem(THEME_KEY);
      applyTheme(saved === 'dark' ? 'dark' : 'light');
    } catch (_err) {
      applyTheme('light');
    }
  }

  function saveTheme(theme) {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      typeof chrome.storage.local.set === 'function'
    ) {
      try {
        var payload = {};
        payload[THEME_KEY] = theme;
        chrome.storage.local.set(payload);
        return;
      } catch (_err) {
        // Fall through to localStorage fallback
      }
    }

    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (_err) {
      // Ignore storage restrictions
    }
  }

  themeToggle.addEventListener('click', function () {
    var nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  /* ---------------------------------------------------------
     Speed Unit Persistence (Mbps / MB/s)
     --------------------------------------------------------- */
  function formatSpeed(mbpsValue) {
    if (typeof mbpsValue !== 'number' || !isFinite(mbpsValue) || mbpsValue < 0) {
      return '-- ' + state.unit;
    }
    var converted = state.unit === 'MB/s' ? mbpsValue / 8 : mbpsValue;
    var formatted = converted >= 10 ? converted.toFixed(1) : converted.toFixed(2);
    return formatted + ' ' + state.unit;
  }

  function refreshSpeedReadouts() {
    if (readyDownloadLabel) {
      readyDownloadLabel.textContent = 'Download -- ' + state.unit;
    }
    if (readyUploadLabel) {
      readyUploadLabel.textContent = 'Upload -- ' + state.unit;
    }

    if (state.phase === 'ready') {
      downloadValueEl.textContent = '-- ' + state.unit;
      uploadValueEl.textContent = '-- ' + state.unit;
    } else if (state.phase === 'testing') {
      downloadValueEl.textContent =
        typeof state.liveDownloadMbps === 'number'
          ? formatSpeed(state.liveDownloadMbps)
          : (state.unit === 'MB/s' ? '0.00 MB/s' : '0.00 Mbps');
      uploadValueEl.textContent =
        typeof state.liveUploadMbps === 'number'
          ? formatSpeed(state.liveUploadMbps)
          : '-- ' + state.unit;
    } else if (state.phase === 'complete') {
      downloadValueEl.textContent = formatSpeed(state.downloadMbps);
      uploadValueEl.textContent = formatSpeed(state.uploadMbps);
    }
  }

  function applyUnit(unit) {
    var safeUnit = unit === 'MB/s' ? 'MB/s' : 'Mbps';
    state.unit = safeUnit;
    if (unitMbpsBtn && unitMBsBtn) {
      var isMbps = safeUnit === 'Mbps';
      unitMbpsBtn.classList.toggle('is-active', isMbps);
      unitMbpsBtn.setAttribute('aria-pressed', isMbps ? 'true' : 'false');
      unitMBsBtn.classList.toggle('is-active', !isMbps);
      unitMBsBtn.setAttribute('aria-pressed', !isMbps ? 'true' : 'false');
    }
    refreshSpeedReadouts();
  }

  function loadSavedUnit() {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      typeof chrome.storage.local.get === 'function'
    ) {
      try {
        chrome.storage.local.get([UNIT_KEY], function (result) {
          if (chrome.runtime && chrome.runtime.lastError) {
            applyUnit('Mbps');
            return;
          }
          if (result && (result[UNIT_KEY] === 'Mbps' || result[UNIT_KEY] === 'MB/s')) {
            applyUnit(result[UNIT_KEY]);
          } else {
            applyUnit('Mbps');
          }
        });
        return;
      } catch (_err) {
        // Fall through to localStorage fallback
      }
    }

    try {
      var saved = window.localStorage.getItem(UNIT_KEY);
      applyUnit(saved === 'MB/s' ? 'MB/s' : 'Mbps');
    } catch (_err) {
      applyUnit('Mbps');
    }
  }

  function saveUnit(unit) {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      typeof chrome.storage.local.set === 'function'
    ) {
      try {
        var payload = {};
        payload[UNIT_KEY] = unit;
        chrome.storage.local.set(payload);
        return;
      } catch (_err) {
        // Fall through to localStorage fallback
      }
    }

    try {
      window.localStorage.setItem(UNIT_KEY, unit);
    } catch (_err) {
      // Ignore storage restrictions
    }
  }

  if (unitMbpsBtn) {
    unitMbpsBtn.addEventListener('click', function () {
      if (state.unit === 'Mbps') return;
      applyUnit('Mbps');
      saveUnit('Mbps');
    });
  }

  if (unitMBsBtn) {
    unitMBsBtn.addEventListener('click', function () {
      if (state.unit === 'MB/s') return;
      applyUnit('MB/s');
      saveUnit('MB/s');
    });
  }

  /* ---------------------------------------------------------
     3D Speed Line Animation Mode Persistence (4 Options)
     --------------------------------------------------------- */
  function isValidLineMode(mode) {
    return LINE_MODES.indexOf(mode) !== -1;
  }

  function applyLineMode(mode) {
    var safeMode = isValidLineMode(mode) ? mode : 'fiber';
    state.lineMode = safeMode;
    var label = LINE_MODE_LABELS[safeMode] || 'Fiber';
    if (lineModeLabel) {
      lineModeLabel.textContent = label;
    }
    if (lineModeBtn) {
      lineModeBtn.setAttribute('data-mode', safeMode);
      lineModeBtn.setAttribute(
        'title',
        '3D speed line: ' + label + ' (click to switch between Fiber, Wave, Helix, Blocks)'
      );
    }
    syncScene3D({ mode: safeMode });
  }

  function loadSavedLineMode() {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      typeof chrome.storage.local.get === 'function'
    ) {
      try {
        chrome.storage.local.get([LINE_MODE_KEY], function (result) {
          if (chrome.runtime && chrome.runtime.lastError) {
            applyLineMode('fiber');
            return;
          }
          if (result && isValidLineMode(result[LINE_MODE_KEY])) {
            applyLineMode(result[LINE_MODE_KEY]);
          } else {
            applyLineMode('fiber');
          }
        });
        return;
      } catch (_err) {
        // Fall through to localStorage fallback
      }
    }

    try {
      var saved = window.localStorage.getItem(LINE_MODE_KEY);
      applyLineMode(isValidLineMode(saved) ? saved : 'fiber');
    } catch (_err) {
      applyLineMode('fiber');
    }
  }

  function saveLineMode(mode) {
    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      typeof chrome.storage.local.set === 'function'
    ) {
      try {
        var payload = {};
        payload[LINE_MODE_KEY] = mode;
        chrome.storage.local.set(payload);
        return;
      } catch (_err) {
        // Fall through to localStorage fallback
      }
    }

    try {
      window.localStorage.setItem(LINE_MODE_KEY, mode);
    } catch (_err) {
      // Ignore storage restrictions
    }
  }

  if (lineModeBtn) {
    lineModeBtn.addEventListener('click', function () {
      var idx = LINE_MODES.indexOf(state.lineMode);
      var nextMode = LINE_MODES[(idx + 1) % LINE_MODES.length];
      applyLineMode(nextMode);
      saveLineMode(nextMode);
    });
  }

  /* ---------------------------------------------------------
     UI State Helpers
     --------------------------------------------------------- */
  function setStartBtnText(text) {
    if (startBtnLabel) {
      startBtnLabel.textContent = text;
    } else {
      startBtn.textContent = text;
    }
  }

  function setRingProgress(pct, subPhase) {
    if (btnRingFill) {
      var clamped = Math.max(0, Math.min(100, pct));
      btnRingFill.style.strokeDashoffset = (RING_CIRCUMFERENCE * (1 - clamped / 100)).toFixed(2);
    }
    if (subPhase) {
      startBtn.setAttribute('data-subphase', subPhase);
    } else if (subPhase === '') {
      startBtn.removeAttribute('data-subphase');
    }
  }

  function setPhase(phase) {
    state.phase = phase;
    shell.setAttribute('data-state', phase);

    if (phase === 'ready') {
      startBtn.hidden = false;
      startBtn.disabled = false;
      startBtn.classList.remove('is-testing');
      if (btnProgressRing) btnProgressRing.hidden = true;
      setRingProgress(0, '');
      setStartBtnText('Start Speed Test');
      readyMetrics.hidden = false;
      if (activeValues) activeValues.hidden = true;
      exportRow.hidden = true;
      state.downloadRatio = 0;
      state.uploadRatio = 0;
      refreshSpeedReadouts();
      syncScene3D({
        phase: 'ready',
        subPhase: 'idle',
        downloadRatio: 0,
        uploadRatio: 0,
        downloadMbps: 0,
        uploadMbps: 0
      });
    } else if (phase === 'testing') {
      startBtn.hidden = false;
      startBtn.disabled = true;
      startBtn.classList.add('is-testing');
      if (btnProgressRing) btnProgressRing.hidden = false;
      setRingProgress(0, 'download');
      setStartBtnText('Testing 0%');
      readyMetrics.hidden = true;
      if (activeValues) activeValues.hidden = false;
      exportRow.hidden = true;
      state.downloadRatio = 0;
      state.uploadRatio = 0;
      refreshSpeedReadouts();
      syncScene3D({
        phase: 'testing',
        subPhase: 'download',
        downloadRatio: 0,
        uploadRatio: 0,
        downloadMbps: 0,
        uploadMbps: 0
      });
    } else if (phase === 'complete') {
      startBtn.hidden = false;
      startBtn.disabled = false;
      startBtn.classList.remove('is-testing');
      if (btnProgressRing) btnProgressRing.hidden = true;
      setRingProgress(100, '');
      setStartBtnText('Start Speed Test');
      readyMetrics.hidden = true;
      if (activeValues) activeValues.hidden = false;
      exportRow.hidden = false;
      state.downloadRatio = 1;
      state.uploadRatio = 1;
      refreshSpeedReadouts();
      syncScene3D({
        phase: 'complete',
        subPhase: 'complete',
        downloadRatio: 1,
        uploadRatio: 1,
        downloadMbps: state.downloadMbps || 0,
        uploadMbps: state.uploadMbps || 0
      });
    }

    window.requestAnimationFrame(resizeLine3D);
  }

  function setOverallProgress(pct) {
    var clamped = Math.max(0, Math.min(100, Math.round(pct)));
    if (state.phase === 'testing') {
      setStartBtnText('Testing ' + clamped + '%');
      setRingProgress(clamped, clamped >= 50 ? 'upload' : 'download');
    }
  }

  function speedToLineRatio(mbps, phaseRatio) {
    var ratioFill = Math.max(0.05, Math.min(1, phaseRatio));
    var speedBonus = Math.min(0.16, Math.log10(Math.max(1, mbps) + 1) * 0.075);
    return Math.min(1, Math.max(ratioFill, Math.min(0.96, ratioFill * 0.88 + speedBonus)));
  }

  /* ---------------------------------------------------------
     IP, ISP, Location & DNS Diagnostics (Matches Site Report)
     --------------------------------------------------------- */
  function fetchJsonWithTimeout(url, timeoutMs, extraHeaders) {
    var controller = new AbortController();
    var timer = window.setTimeout(function () {
      controller.abort();
    }, timeoutMs);

    return fetch(url, {
      method: 'GET',
      cache: 'no-store',
      mode: 'cors',
      headers: extraHeaders || { Accept: 'application/json' },
      signal: controller.signal
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .finally(function () {
        window.clearTimeout(timer);
      });
  }

  async function measurePingMs() {
    var samples = [];
    for (var i = 0; i < 3; i += 1) {
      var controller = new AbortController();
      var timer = window.setTimeout(function () {
        controller.abort();
      }, 2000);
      var t0 = performance.now();
      try {
        var res = await fetch(DOWNLOAD_ENDPOINT + '?bytes=0&cb=' + Date.now() + '_' + i, {
          method: 'GET',
          cache: 'no-store',
          mode: 'cors',
          signal: controller.signal
        });
        if (res.ok) {
          samples.push(Math.max(1, performance.now() - t0));
        }
      } catch (_err) {
        // Ignore single probe failure
      } finally {
        window.clearTimeout(timer);
      }
    }
    if (samples.length === 0) return null;
    var sum = 0;
    for (var j = 0; j < samples.length; j += 1) {
      sum += samples[j];
    }
    return Math.round(sum / samples.length);
  }

  async function fetchIpDiagnostics() {
    var result = {
      primaryIp: null,
      ipv4: null,
      ipv6: null,
      isp: null,
      asn: null,
      location: null,
      timezone: null,
      proxyStatus: 'Direct Connection (None detected)',
      dohLatencyMs: null
    };

    var browserTz = null;
    try {
      browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch (_err) {
      browserTz = null;
    }

    var tasks = await Promise.allSettled([
      fetchJsonWithTimeout('https://api.ipify.org?format=json', 3200),
      fetchJsonWithTimeout('https://api64.ipify.org?format=json', 3200),
      fetchJsonWithTimeout('https://ipwho.is/', 3600),
      fetchJsonWithTimeout('https://get.geojs.io/v1/ip/geo.json', 3600),
      (async function () {
        var t0 = performance.now();
        await fetchJsonWithTimeout(DOH_ENDPOINT, 3000, { Accept: 'application/dns-json' });
        return Math.max(1, Math.round(performance.now() - t0));
      })()
    ]);

    if (tasks[0].status === 'fulfilled' && tasks[0].value && tasks[0].value.ip) {
      var ip4 = String(tasks[0].value.ip).trim();
      if (ip4.indexOf('.') !== -1) {
        result.ipv4 = ip4;
      }
    }

    if (tasks[1].status === 'fulfilled' && tasks[1].value && tasks[1].value.ip) {
      var ip64 = String(tasks[1].value.ip).trim();
      if (ip64.indexOf(':') !== -1) {
        result.ipv6 = ip64;
      } else if (!result.ipv4 && ip64.indexOf('.') !== -1) {
        result.ipv4 = ip64;
      }
    }

    var ipwho = tasks[2].status === 'fulfilled' ? tasks[2].value : null;
    var geojs = tasks[3].status === 'fulfilled' ? tasks[3].value : null;

    if (ipwho && ipwho.success !== false && ipwho.ip) {
      var whoIp = String(ipwho.ip).trim();
      result.primaryIp = whoIp;
      if (whoIp.indexOf(':') !== -1 && !result.ipv6) result.ipv6 = whoIp;
      if (whoIp.indexOf('.') !== -1 && !result.ipv4) result.ipv4 = whoIp;

      if (ipwho.connection) {
        result.isp = ipwho.connection.isp || ipwho.connection.org || null;
        if (ipwho.connection.asn) {
          result.asn = 'AS' + String(ipwho.connection.asn);
        }
      }
      var locParts = [ipwho.city, ipwho.region, ipwho.country].filter(Boolean);
      if (locParts.length > 0) {
        result.location = locParts.join(', ');
      }
      if (ipwho.timezone && ipwho.timezone.id) {
        result.timezone = String(ipwho.timezone.id);
      }
      if (ipwho.security && (ipwho.security.vpn || ipwho.security.proxy || ipwho.security.tor)) {
        result.proxyStatus = 'VPN / Proxy Detected';
      } else if (ipwho.security && ipwho.security.hosting) {
        result.proxyStatus = 'Datacenter / Hosting Network';
      }
    }

    if (geojs && geojs.ip) {
      var gIp = String(geojs.ip).trim();
      if (!result.primaryIp) result.primaryIp = gIp;
      if (gIp.indexOf(':') !== -1 && !result.ipv6) result.ipv6 = gIp;
      if (gIp.indexOf('.') !== -1 && !result.ipv4) result.ipv4 = gIp;
      if (!result.isp && geojs.organization_name) {
        result.isp = String(geojs.organization_name);
      }
      if (!result.asn && geojs.asn) {
        result.asn = 'AS' + String(geojs.asn);
      }
      if (!result.location) {
        var gLoc = [geojs.city, geojs.region, geojs.country].filter(Boolean);
        if (gLoc.length > 0) result.location = gLoc.join(', ');
      }
      if (!result.timezone && geojs.timezone) {
        result.timezone = String(geojs.timezone);
      }
    }

    if (!result.primaryIp) {
      result.primaryIp = result.ipv4 || result.ipv6 || null;
    }

    if (
      result.proxyStatus === 'Direct Connection (None detected)' &&
      browserTz &&
      result.timezone &&
      browserTz !== result.timezone
    ) {
      result.proxyStatus = 'Timezone Mismatch (Possible VPN)';
    }

    if (tasks[4].status === 'fulfilled' && typeof tasks[4].value === 'number') {
      result.dohLatencyMs = tasks[4].value;
    }

    return result;
  }

  /* ---------------------------------------------------------
     Live Speed Test Engine (Cloudflare + Offline Fallback)
     --------------------------------------------------------- */
  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  async function measureLiveDownload(runId) {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      throw new Error('Offline');
    }

    var controller = new AbortController();
    var timeoutId = window.setTimeout(function () {
      controller.abort();
    }, 6500);

    var targetBytes = 6 * 1024 * 1024; // 6 MB live download sample
    var startTime = performance.now();
    var loadedBytes = 0;

    try {
      var url = DOWNLOAD_ENDPOINT + '?bytes=' + targetBytes + '&cachebust=' + Date.now();
      var response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        mode: 'cors',
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error('Download HTTP ' + response.status);
      }

      if (response.body && typeof response.body.getReader === 'function') {
        var reader = response.body.getReader();
        var lastUiUpdate = 0;

        while (true) {
          var chunk = await reader.read();
          if (state.runId !== runId) {
            try {
              reader.cancel();
            } catch (_e) {
              // ignore
            }
            return 0;
          }
          if (chunk.done) break;
          if (chunk.value) {
            loadedBytes += chunk.value.byteLength;
          }

          var now = performance.now();
          var elapsedSec = Math.max(0.05, (now - startTime) / 1000);
          if (now - lastUiUpdate >= 60) {
            lastUiUpdate = now;
            var currentMbps = (loadedBytes * 8) / (elapsedSec * 1e6);
            var ratio = Math.min(1, loadedBytes / targetBytes);
            state.liveDownloadMbps = currentMbps;
            state.downloadRatio = speedToLineRatio(currentMbps, ratio);
            downloadValueEl.textContent = formatSpeed(currentMbps);
            syncScene3D({
              subPhase: 'download',
              downloadRatio: state.downloadRatio,
              downloadMbps: currentMbps
            });
            setOverallProgress(Math.round(ratio * 50));
          }
        }
      } else {
        var buf = await response.arrayBuffer();
        loadedBytes = buf.byteLength;
      }

      var totalSec = Math.max(0.05, (performance.now() - startTime) / 1000);
      var finalMbps = (loadedBytes * 8) / (totalSec * 1e6);
      if (!isFinite(finalMbps) || finalMbps <= 0) {
        throw new Error('Invalid download rate');
      }

      state.liveDownloadMbps = finalMbps;
      state.downloadRatio = 1;
      downloadValueEl.textContent = formatSpeed(finalMbps);
      syncScene3D({
        subPhase: 'download',
        downloadRatio: 1,
        downloadMbps: finalMbps
      });
      setOverallProgress(50);
      return finalMbps;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  function createRandomPayload(sizeBytes) {
    var payload = new Uint8Array(sizeBytes);
    var step = 65536;
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      for (var offset = 0; offset < sizeBytes; offset += step) {
        var sliceLen = Math.min(step, sizeBytes - offset);
        crypto.getRandomValues(payload.subarray(offset, offset + sliceLen));
      }
    } else {
      for (var i = 0; i < sizeBytes; i += 1) {
        payload[i] = (i * 31) & 255;
      }
    }
    return payload;
  }

  function measureLiveUpload(runId) {
    return new Promise(function (resolve, reject) {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        reject(new Error('Offline'));
        return;
      }

      var payloadBytes = 2 * 1024 * 1024; // 2 MB upload payload
      var payload = createRandomPayload(payloadBytes);
      var xhr = new XMLHttpRequest();
      var startTime = performance.now();
      var settled = false;

      var timer = window.setTimeout(function () {
        if (!settled) {
          settled = true;
          xhr.abort();
          reject(new Error('Upload timeout'));
        }
      }, 6500);

      xhr.open('POST', UPLOAD_ENDPOINT + '?cachebust=' + Date.now(), true);
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');

      xhr.upload.onprogress = function (evt) {
        if (settled || state.runId !== runId) return;
        var sent = evt.loaded || 0;
        var total = evt.total || payloadBytes;
        var elapsedSec = Math.max(0.05, (performance.now() - startTime) / 1000);
        var currentMbps = (sent * 8) / (elapsedSec * 1e6);
        var ratio = Math.min(1, sent / total);

        state.liveUploadMbps = currentMbps;
        state.uploadRatio = speedToLineRatio(currentMbps, ratio);
        uploadValueEl.textContent = formatSpeed(currentMbps);
        syncScene3D({
          subPhase: 'upload',
          downloadRatio: 1,
          uploadRatio: state.uploadRatio,
          uploadMbps: currentMbps
        });
        setOverallProgress(50 + Math.round(ratio * 49));
      };

      xhr.onload = function () {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        if (xhr.status >= 200 && xhr.status < 400) {
          var totalSec = Math.max(0.05, (performance.now() - startTime) / 1000);
          var finalMbps = (payloadBytes * 8) / (totalSec * 1e6);
          state.liveUploadMbps = finalMbps;
          state.uploadRatio = 1;
          uploadValueEl.textContent = formatSpeed(finalMbps);
          syncScene3D({
            subPhase: 'upload',
            downloadRatio: 1,
            uploadRatio: 1,
            uploadMbps: finalMbps
          });
          setOverallProgress(100);
          resolve(finalMbps);
        } else {
          reject(new Error('Upload HTTP ' + xhr.status));
        }
      };

      xhr.onerror = function () {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        reject(new Error('Upload network error'));
      };

      xhr.onabort = function () {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        reject(new Error('Upload aborted'));
      };

      try {
        xhr.send(payload);
      } catch (err) {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          reject(err);
        }
      }
    });
  }

  async function runSimulatedPhase(runId, kind) {
    var isDownload = kind === 'download';
    var targetMbps = isDownload
      ? 110 + Math.random() * 145
      : 38 + Math.random() * 62;
    var steps = 22;
    var finalValue = targetMbps;

    for (var step = 1; step <= steps; step += 1) {
      if (state.runId !== runId) return 0;
      var ratio = step / steps;
      var ease = 1 - Math.pow(1 - ratio, 2.2);
      var jitter = (Math.random() - 0.5) * (isDownload ? 8 : 3.5);
      var sample = Math.max(2, targetMbps * (0.55 + 0.45 * ease) + jitter);
      finalValue = sample;

      if (isDownload) {
        state.liveDownloadMbps = sample;
        state.downloadRatio = Math.min(1, ratio);
        downloadValueEl.textContent = formatSpeed(sample);
        syncScene3D({
          subPhase: 'download',
          downloadRatio: state.downloadRatio,
          downloadMbps: sample
        });
        setOverallProgress(Math.round(ratio * 50));
      } else {
        state.liveUploadMbps = sample;
        state.uploadRatio = Math.min(1, ratio);
        uploadValueEl.textContent = formatSpeed(sample);
        syncScene3D({
          subPhase: 'upload',
          downloadRatio: 1,
          uploadRatio: state.uploadRatio,
          uploadMbps: sample
        });
        setOverallProgress(50 + Math.round(ratio * 50));
      }
      await wait(65);
    }

    return finalValue;
  }

  async function runSpeedTest() {
    if (state.phase === 'testing') return;

    state.runId += 1;
    var currentRunId = state.runId;
    state.usedFallback = false;
    state.downloadMbps = null;
    state.uploadMbps = null;
    state.liveDownloadMbps = 0;
    state.liveUploadMbps = null;
    state.pingMs = null;
    state.completedAt = null;
    setPhase('testing');

    // Run IP diagnostics & ping concurrently so the PDF report has full network details
    var networkPromise = fetchIpDiagnostics().catch(function () {
      return state.network;
    });
    var pingPromise = measurePingMs().catch(function () {
      return null;
    });

    var dlMbps = 0;
    try {
      dlMbps = await measureLiveDownload(currentRunId);
      if (state.runId !== currentRunId) return;
    } catch (_err) {
      state.usedFallback = true;
      dlMbps = await runSimulatedPhase(currentRunId, 'download');
      if (state.runId !== currentRunId) return;
    }

    var ulMbps = 0;
    try {
      ulMbps = await measureLiveUpload(currentRunId);
      if (state.runId !== currentRunId) return;
    } catch (_err) {
      state.usedFallback = true;
      ulMbps = await runSimulatedPhase(currentRunId, 'upload');
      if (state.runId !== currentRunId) return;
    }

    var netAndPing = await Promise.all([networkPromise, pingPromise]);
    if (state.runId !== currentRunId) return;

    state.network = netAndPing[0] || state.network;
    state.pingMs = netAndPing[1];
    state.downloadMbps = dlMbps;
    state.uploadMbps = ulMbps;
    state.completedAt = new Date();
    setOverallProgress(100);
    setPhase('complete');
  }

  startBtn.addEventListener('click', function () {
    runSpeedTest();
  });

  /* ---------------------------------------------------------
     Native Vanilla JS PDF 1.4 Generator with Site Logo & Watermark
     (Zero External Libraries — Strict Manifest V3 CSP Compliant)
     --------------------------------------------------------- */
  function escapePdfText(str) {
    return String(str)
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  function detectBrowserSummary() {
    var ua = navigator.userAgent || 'Unknown Browser';
    var match =
      ua.match(/(Edg|OPR|Chrome|Firefox|Safari)\/([0-9.]+)/) ||
      ['', 'Browser', ''];
    var name = match[1] === 'Edg' ? 'Microsoft Edge' : match[1] === 'OPR' ? 'Opera' : match[1];
    var ver = match[2] ? ' ' + match[2] : '';
    var platform =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      'Desktop';
    return (name + ver + ' (' + platform + ')').slice(0, 68);
  }

  function dataUrlToBytes(dataUrl) {
    var commaIdx = dataUrl.indexOf(',');
    if (commaIdx === -1) return new Uint8Array(0);
    var bin = window.atob(dataUrl.slice(commaIdx + 1));
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i += 1) {
      out[i] = bin.charCodeAt(i);
    }
    return out;
  }

  function preparePdfLogos() {
    if (cachedPdfLogos) {
      return Promise.resolve(cachedPdfLogos);
    }

    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        try {
          var natW = img.naturalWidth;
          var natH = img.naturalHeight;
          if (!natW || !natH) {
            resolve(null);
            return;
          }

          // Inspect image pixels and trim transparent outer padding cleanly
          var srcCanvas = document.createElement('canvas');
          srcCanvas.width = natW;
          srcCanvas.height = natH;
          var srcCtx = srcCanvas.getContext('2d');
          if (!srcCtx) {
            resolve(null);
            return;
          }
          srcCtx.drawImage(img, 0, 0);

          var minX = natW;
          var minY = natH;
          var maxX = 0;
          var maxY = 0;
          try {
            var px = srcCtx.getImageData(0, 0, natW, natH).data;
            for (var y = 0; y < natH; y += 1) {
              for (var x = 0; x < natW; x += 1) {
                if (px[(y * natW + x) * 4 + 3] > 12) {
                  if (x < minX) minX = x;
                  if (y < minY) minY = y;
                  if (x > maxX) maxX = x;
                  if (y > maxY) maxY = y;
                }
              }
            }
          } catch (_e) {
            minX = 0;
            minY = 0;
            maxX = natW - 1;
            maxY = natH - 1;
          }

          if (maxX <= minX || maxY <= minY) {
            minX = 0;
            minY = 0;
            maxX = natW - 1;
            maxY = natH - 1;
          }

          var cropW = maxX - minX + 1;
          var cropH = maxY - minY + 1;
          var aspectRatio = cropW / cropH;

          // 1. Crisp Header Logo composited onto white report background
          var hdrCanvas = document.createElement('canvas');
          hdrCanvas.width = cropW;
          hdrCanvas.height = cropH;
          var hdrCtx = hdrCanvas.getContext('2d');
          hdrCtx.fillStyle = '#ffffff';
          hdrCtx.fillRect(0, 0, cropW, cropH);
          hdrCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
          var headerBytes = dataUrlToBytes(hdrCanvas.toDataURL('image/jpeg', 0.94));

          // 2. Soft Centered Page Watermark composited at 9% opacity onto white
          var wmCanvas = document.createElement('canvas');
          wmCanvas.width = cropW;
          wmCanvas.height = cropH;
          var wmCtx = wmCanvas.getContext('2d');
          wmCtx.fillStyle = '#ffffff';
          wmCtx.fillRect(0, 0, cropW, cropH);
          wmCtx.globalAlpha = 0.09;
          wmCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
          var watermarkBytes = dataUrlToBytes(wmCanvas.toDataURL('image/jpeg', 0.9));

          cachedPdfLogos = {
            width: cropW,
            height: cropH,
            aspectRatio: aspectRatio,
            headerBytes: headerBytes,
            watermarkBytes: watermarkBytes
          };
          resolve(cachedPdfLogos);
        } catch (_err) {
          resolve(null);
        }
      };
      img.onerror = function () {
        resolve(null);
      };
      img.src = 'icons/logo-light.png';
    });
  }

  function buildNativePdfBlob(logoAssets) {
    var now = state.completedAt || new Date();
    var dateStr = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    var dlText = formatSpeed(state.downloadMbps);
    var ulText = formatSpeed(state.uploadMbps);
    var pingText = typeof state.pingMs === 'number' ? state.pingMs + ' ms' : '-- ms';
    var sourceLabel = state.usedFallback
      ? 'Offline Fallback Simulation'
      : 'Cloudflare Speed Edge (speed.cloudflare.com)';
    var browserLabel = detectBrowserSummary();
    var net = state.network || {};

    var hasImages = Boolean(
      logoAssets &&
      logoAssets.headerBytes &&
      logoAssets.headerBytes.length > 0 &&
      logoAssets.watermarkBytes &&
      logoAssets.watermarkBytes.length > 0
    );

    var streamLines = [];

    // 1. Centered Site Logo Watermark right in the middle of the page (drawn behind all content)
    if (hasImages) {
      var wmW = 340;
      var wmH = Math.round(wmW / logoAssets.aspectRatio);
      var wmX = Math.round((612 - wmW) / 2);
      var wmY = Math.round((792 - wmH) / 2);
      streamLines.push('q');
      streamLines.push(wmW + ' 0 0 ' + wmH + ' ' + wmX + ' ' + wmY + ' cm');
      streamLines.push('/Im2 Do');
      streamLines.push('Q');
    }

    // 2. Clean White Header with Site Logo on the Right (matching site test report)
    if (hasImages) {
      var logoH = 54;
      var logoW = Math.min(130, Math.round(logoH * logoAssets.aspectRatio));
      var logoX = 564 - logoW;
      var logoY = 706;
      streamLines.push('q');
      streamLines.push(logoW + ' 0 0 ' + logoH + ' ' + logoX + ' ' + logoY + ' cm');
      streamLines.push('/Im1 Do');
      streamLines.push('Q');
    }

    streamLines.push(
      'BT /F2 17 Tf 0.059 0.090 0.165 rg 48 738 Td (TestLine Network & Speed Report) Tj ET',
      'BT /F1 9.5 Tf 0.392 0.455 0.545 rg 48 718 Td (' +
        escapePdfText('Generated: ' + dateStr + '  |  Chrome Extension v1.0.0  |  ECORZO LLC') +
        ') Tj ET',
      // Header separator line
      '0.796 0.835 0.882 RG 0.9 w',
      '48 696 m 564 696 l S'
    );

    // 3. Section 1: Speed Benchmark Summary (3 clean outlined cards)
    streamLines.push(
      'BT /F2 12 Tf 0.059 0.090 0.165 rg 48 670 Td (1. Speed Benchmark Summary) Tj ET',
      // Card 1: Download
      '0.820 0.855 0.902 RG 0.9 w 48 584 164 72 re S',
      'BT /F2 9 Tf 0.392 0.455 0.545 rg 62 638 Td (DOWNLOAD SPEED) Tj ET',
      'BT /F2 20 Tf 0.000 0.400 0.800 rg 62 610 Td (' + escapePdfText(dlText) + ') Tj ET',
      'BT /F1 8.5 Tf 0.450 0.510 0.590 rg 62 595 Td (Sustained stream) Tj ET',
      // Card 2: Upload
      '0.820 0.855 0.902 RG 0.9 w 224 584 164 72 re S',
      'BT /F2 9 Tf 0.392 0.455 0.545 rg 238 638 Td (UPLOAD SPEED) Tj ET',
      'BT /F2 20 Tf 0.086 0.639 0.290 rg 238 610 Td (' + escapePdfText(ulText) + ') Tj ET',
      'BT /F1 8.5 Tf 0.450 0.510 0.590 rg 238 595 Td (Sustained stream) Tj ET',
      // Card 3: Ping
      '0.820 0.855 0.902 RG 0.9 w 400 584 164 72 re S',
      'BT /F2 9 Tf 0.392 0.455 0.545 rg 414 638 Td (AVERAGE PING) Tj ET',
      'BT /F2 20 Tf 0.059 0.090 0.165 rg 414 610 Td (' + escapePdfText(pingText) + ') Tj ET',
      'BT /F1 8.5 Tf 0.450 0.510 0.590 rg 414 595 Td (Cloudflare RTT probes) Tj ET'
    );

    // 4. Section 2: Network, IP & DNS Diagnostics (mirrors site PDF report)
    streamLines.push(
      'BT /F2 12 Tf 0.059 0.090 0.165 rg 48 548 Td (2. Network, IP & DNS Diagnostics) Tj ET',
      '0.796 0.835 0.882 RG 0.8 w 48 538 m 564 538 l S'
    );

    var ipRows = [
      ['Primary Public IP', net.primaryIp || 'Unavailable'],
      ['IPv4 Address', net.ipv4 || 'Not detected'],
      ['IPv6 Address', net.ipv6 || 'Not detected (IPv4-only route)'],
      ['ISP / Carrier', net.isp || 'Unavailable'],
      ['Autonomous System (ASN)', net.asn || 'Unavailable'],
      ['Approximate Location', net.location || 'Unavailable'],
      ['Timezone', net.timezone || 'Unavailable'],
      ['Proxy / VPN Check', net.proxyStatus || 'Direct Connection (None detected)'],
      [
        'DoH DNS Latency (1.1.1.1)',
        typeof net.dohLatencyMs === 'number' ? net.dohLatencyMs + ' ms' : 'Unavailable'
      ]
    ];

    var rowY = 516;
    for (var r = 0; r < ipRows.length; r += 1) {
      var label = ipRows[r][0];
      var val = String(ipRows[r][1]).slice(0, 62);
      streamLines.push(
        'BT /F2 9.5 Tf 0.310 0.376 0.467 rg 48 ' + rowY + ' Td (' + escapePdfText(label) + ') Tj ET',
        'BT /F1 9.5 Tf 0.059 0.090 0.165 rg 215 ' + rowY + ' Td (' + escapePdfText(val) + ') Tj ET',
        '0.895 0.918 0.945 RG 0.5 w 48 ' + (rowY - 8) + ' m 564 ' + (rowY - 8) + ' l S'
      );
      rowY -= 25;
    }

    // 5. Section 3: Session & Environment Details
    var sec3Y = rowY - 14;
    streamLines.push(
      'BT /F2 12 Tf 0.059 0.090 0.165 rg 48 ' + sec3Y + ' Td (3. Session & Client Details) Tj ET',
      '0.796 0.835 0.882 RG 0.8 w 48 ' + (sec3Y - 10) + ' m 564 ' + (sec3Y - 10) + ' l S'
    );

    var sessionRows = [
      ['Date & Time', dateStr],
      ['Measurement Endpoint', sourceLabel],
      ['Browser & Platform', browserLabel],
      ['Client', 'Testline Speed Test Chrome Extension v1.0.0']
    ];

    var sY = sec3Y - 30;
    for (var s = 0; s < sessionRows.length; s += 1) {
      streamLines.push(
        'BT /F2 9.5 Tf 0.310 0.376 0.467 rg 48 ' + sY + ' Td (' + escapePdfText(sessionRows[s][0]) + ') Tj ET',
        'BT /F1 9.5 Tf 0.059 0.090 0.165 rg 215 ' + sY + ' Td (' + escapePdfText(sessionRows[s][1]) + ') Tj ET'
      );
      sY -= 21;
    }

    // 6. Footer
    streamLines.push(
      '0.820 0.855 0.902 RG 0.8 w 48 64 m 564 64 l S',
      'BT /F1 8.5 Tf 0.420 0.486 0.576 rg 48 46 Td (' +
        escapePdfText('TestLine by ECORZO LLC (https://testline.net) - Generated locally in your browser') +
        ') Tj ET',
      'BT /F1 8.5 Tf 0.420 0.486 0.576 rg 512 46 Td (Page 1 of 1) Tj ET'
    );

    var contentStream = streamLines.join('\n') + '\n';
    var encoder = new TextEncoder();
    var contentBytes = encoder.encode(contentStream);

    function toBytes(str) {
      return encoder.encode(str);
    }

    function concatChunks(arr) {
      var total = 0;
      for (var i = 0; i < arr.length; i += 1) {
        total += arr[i].byteLength;
      }
      var merged = new Uint8Array(total);
      var pos = 0;
      for (var j = 0; j < arr.length; j += 1) {
        merged.set(arr[j], pos);
        pos += arr[j].byteLength;
      }
      return merged;
    }

    var xObjectRes = hasImages ? ' /XObject << /Im1 7 0 R /Im2 8 0 R >>' : '';

    var pdfObjects = [
      toBytes('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'),
      toBytes('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n'),
      toBytes(
        '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >>' +
          xObjectRes +
          ' >> /Contents 6 0 R >>\nendobj\n'
      ),
      toBytes('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'),
      toBytes('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n'),
      concatChunks([
        toBytes('6 0 obj\n<< /Length ' + contentBytes.byteLength + ' >>\nstream\n'),
        contentBytes,
        toBytes('endstream\nendobj\n')
      ])
    ];

    if (hasImages) {
      pdfObjects.push(
        concatChunks([
          toBytes(
            '7 0 obj\n<< /Type /XObject /Subtype /Image /Width ' +
              logoAssets.width +
              ' /Height ' +
              logoAssets.height +
              ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' +
              logoAssets.headerBytes.byteLength +
              ' >>\nstream\n'
          ),
          logoAssets.headerBytes,
          toBytes('\nendstream\nendobj\n')
        ])
      );
      pdfObjects.push(
        concatChunks([
          toBytes(
            '8 0 obj\n<< /Type /XObject /Subtype /Image /Width ' +
              logoAssets.width +
              ' /Height ' +
              logoAssets.height +
              ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' +
              logoAssets.watermarkBytes.byteLength +
              ' >>\nstream\n'
          ),
          logoAssets.watermarkBytes,
          toBytes('\nendstream\nendobj\n')
        ])
      );
    }

    var headerBytes = new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a,
      0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a
    ]);
    var finalParts = [headerBytes];
    var offsets = [0];
    var runningBytes = headerBytes.byteLength;

    for (var idx = 0; idx < pdfObjects.length; idx += 1) {
      offsets.push(runningBytes);
      finalParts.push(pdfObjects[idx]);
      runningBytes += pdfObjects[idx].byteLength;
    }

    var xrefOffset = runningBytes;
    var xref = 'xref\n0 ' + (pdfObjects.length + 1) + '\n';
    xref += '0000000000 65535 f \n';
    for (var k = 1; k < offsets.length; k += 1) {
      xref += String(offsets[k]).padStart(10, '0') + ' 00000 n \n';
    }

    var trailer =
      'trailer\n<< /Size ' +
      (pdfObjects.length + 1) +
      ' /Root 1 0 R >>\nstartxref\n' +
      xrefOffset +
      '\n%%EOF\n';

    finalParts.push(toBytes(xref), toBytes(trailer));
    return new Blob(finalParts, { type: 'application/pdf' });
  }

  async function exportPdfReport() {
    if (state.phase !== 'complete') return;

    var prevText = exportPdfBtn.textContent;
    exportPdfBtn.disabled = true;
    exportPdfBtn.textContent = 'Generating PDF...';

    try {
      var logoAssets = await preparePdfLogos();
      var pdfBlob = buildNativePdfBlob(logoAssets);
      var blobUrl = URL.createObjectURL(pdfBlob);
      var now = state.completedAt || new Date();
      var yyyy = now.getFullYear();
      var mm = String(now.getMonth() + 1).padStart(2, '0');
      var dd = String(now.getDate()).padStart(2, '0');
      var filename = 'Testline-Speed-Report-' + yyyy + '-' + mm + '-' + dd + '.pdf';

      if (
        typeof chrome !== 'undefined' &&
        chrome.downloads &&
        typeof chrome.downloads.download === 'function'
      ) {
        try {
          chrome.downloads.download(
            {
              url: blobUrl,
              filename: filename,
              saveAs: false
            },
            function () {
              window.setTimeout(function () {
                URL.revokeObjectURL(blobUrl);
              }, 10000);
            }
          );
          return;
        } catch (_err) {
          // Fall through to anchor download
        }
      }

      // Fallback when running inside the web preview iframe
      var link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(function () {
        URL.revokeObjectURL(blobUrl);
      }, 10000);
    } finally {
      exportPdfBtn.disabled = false;
      exportPdfBtn.textContent = prevText;
    }
  }

  exportPdfBtn.addEventListener('click', function () {
    exportPdfReport();
  });

  // Global keyboard shortcut: press 'S' to immediately trigger Start Speed Test
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
    if (e.key !== 's' && e.key !== 'S') return;
    var target = e.target;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable)
    ) {
      return;
    }
    e.preventDefault();
    runSpeedTest();
  });

  /* ---------------------------------------------------------
     Initialize 3D Download & Upload Speed Test Line
     --------------------------------------------------------- */
  if (
    line3dCanvas &&
    typeof window !== 'undefined' &&
    window.TestlinePopupScene &&
    typeof window.TestlinePopupScene.createPopupLineScene === 'function'
  ) {
    try {
      sceneController = window.TestlinePopupScene.createPopupLineScene(line3dCanvas, {
        mode: state.lineMode,
        phase: 'ready',
        subPhase: 'idle',
        theme: state.theme,
        downloadRatio: 0,
        uploadRatio: 0,
        downloadMbps: 0,
        uploadMbps: 0
      });
      if (typeof ResizeObserver === 'function' && line3dFrame) {
        lineResizeObserver = new ResizeObserver(function () {
          resizeLine3D();
        });
        lineResizeObserver.observe(line3dFrame);
      }
      window.requestAnimationFrame(resizeLine3D);
    } catch (_err) {
      sceneController = null;
    }
  }

  window.addEventListener('unload', function () {
    if (lineResizeObserver && typeof lineResizeObserver.disconnect === 'function') {
      lineResizeObserver.disconnect();
    }
    if (sceneController && typeof sceneController.dispose === 'function') {
      sceneController.dispose();
    }
  });

  loadSavedTheme();
  loadSavedUnit();
  loadSavedLineMode();
  setPhase('ready');
})();
