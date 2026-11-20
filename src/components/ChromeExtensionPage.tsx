import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { memo, useState } from 'react';
import { downloadVerifiedExtensionZip } from '../utils/extensionZipBuilder';

interface ChromeExtensionPageProps {
  onBackHome: () => void;
}

export const ChromeExtensionPage = memo(function ChromeExtensionPage({
  onBackHome,
}: ChromeExtensionPageProps) {
  const [iframeKey, setIframeKey] = useState(0);
  const [copiedChromeUrl, setCopiedChromeUrl] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done' | 'error'>(
    'idle'
  );
  const [downloadNote, setDownloadNote] = useState<string | null>(null);

  const handleCopyExtensionsUrl = async () => {
    try {
      await navigator.clipboard.writeText('chrome://extensions/');
      setCopiedChromeUrl(true);
      window.setTimeout(() => setCopiedChromeUrl(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleDownloadZip = async (forceFreshBuild = false) => {
    if (downloadState === 'downloading') return;
    setDownloadState('downloading');
    setDownloadNote(null);
    try {
      const result = await downloadVerifiedExtensionZip({ forceFreshBuild });
      setDownloadState('done');
      const kb = (result.sizeBytes / 1024).toFixed(1);
      setDownloadNote(`Verified ZIP downloaded (${kb} KB).`);
      window.setTimeout(() => {
        setDownloadState('idle');
      }, 3500);
    } catch {
      setDownloadState('error');
      setDownloadNote('Download blocked by browser. Try opening the app in a new tab and retrying.');
    }
  };

  return (
    <article className="w-full space-y-7">
      {/* Page Header */}
      <header className="space-y-4">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 min-h-[38px] px-2.5 py-1.5 -ml-2.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Speed Test</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2">
            <h1
              style={{ textWrap: 'balance' }}
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
              Testline Speed Test for Chrome
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Run instant download and upload speed benchmarks directly from your Chrome toolbar in
              a compact 3D horizontal popup, switch Dark or Light mode, and export a native PDF
              report with zero external scripts.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                void handleDownloadZip(false);
              }}
              disabled={downloadState === 'downloading'}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-lg bg-black text-white border border-neutral-900 hover:bg-neutral-800 dark:bg-black dark:text-white dark:border-slate-700 dark:hover:bg-neutral-900 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {downloadState === 'done' ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Download className="w-4 h-4" aria-hidden="true" />
              )}
              <span>
                {downloadState === 'downloading'
                  ? 'Verifying ZIP...'
                  : downloadState === 'done'
                  ? 'Downloaded (.zip)'
                  : 'Download Extension (.zip)'}
              </span>
            </button>
            {downloadNote && (
              <p
                role="status"
                className={`text-xs ${
                  downloadState === 'error'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {downloadNote}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Interactive Live 500x170 Extension Preview */}
      <section
        aria-labelledby="live-preview-heading"
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] overflow-hidden"
      >
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="live-preview-heading"
              className="font-display text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100"
            >
              Live Interactive Popup Preview (500 × 170 px)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try switching the Sun/Moon toggle to see the TestLine logo adapt, then click Start
              Speed Test and Export PDF Report below.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIframeKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Preview</span>
            </button>
            <a
              href="/chrome-extension/popup.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <span>Open Standalone</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-10 bg-slate-100/80 dark:bg-[#090D16] overflow-x-auto">
          <div className="mx-auto w-[500px]">
            {/* Rounded 16px Chrome popup shadow bezel */}
            <div className="w-[500px] h-[170px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/10 dark:ring-white/10">
              <iframe
                key={iframeKey}
                src="/chrome-extension/popup.html"
                title="Testline Speed Test Chrome Extension Popup Preview"
                width={500}
                height={170}
                scrolling="no"
                className="block w-[500px] h-[170px] border-0 overflow-hidden rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section
        aria-labelledby="install-steps-heading"
        className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 space-y-4"
      >
          <h2
            id="install-steps-heading"
            className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
          >
            How to Install in Google Chrome
          </h2>

          <ol className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <li className="flex gap-3">
              <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400 pt-0.5 shrink-0">
                01.
              </span>
              <span>
                Click <strong className="text-slate-900 dark:text-slate-100">Download Extension (.zip)</strong> above and extract the{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  testline-speed-test-extension
                </code>{' '}
                folder on your computer.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400 pt-0.5 shrink-0">
                02.
              </span>
              <div className="space-y-2 min-w-0">
                <p>Open Chrome and navigate to the Extensions manager:</p>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 select-all">
                    chrome://extensions/
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyExtensionsUrl}
                    className="inline-flex items-center gap-1.5 min-h-[34px] px-2.5 py-1 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedChromeUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400 pt-0.5 shrink-0">
                03.
              </span>
              <span>
                Toggle <strong className="text-slate-900 dark:text-slate-100">Developer mode</strong> on in the top-right corner, click{' '}
                <strong className="text-slate-900 dark:text-slate-100">Load unpacked</strong>, and select the extracted folder (or the root{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  extension/
                </code>{' '}
                folder) that directly contains{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  manifest.json
                </code>
                . Pin Testline Speed Test to your toolbar.
              </span>
            </li>
          </ol>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-200">Deployment tip:</strong> When
            re-zipping{' '}
            <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              extension/
            </code>{' '}
            for Chrome Web Store upload, open the folder first and zip only its inner files (
            <code className="font-mono text-[11px]">manifest.json</code>,{' '}
            <code className="font-mono text-[11px]">popup.*</code>, and{' '}
            <code className="font-mono text-[11px]">icons/</code>)—not the parent{' '}
            <code className="font-mono text-[11px]">extension/</code> directory itself.
          </div>
      </section>
    </article>
  );
});
