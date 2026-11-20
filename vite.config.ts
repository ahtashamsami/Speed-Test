import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { prerenderDistDirectory } from './scripts/prerender';

function testlinePrerenderPlugin(): Plugin {
  let outDir = 'dist';
  let rootDir = process.cwd();
  return {
    name: 'testline-prerender-routes',
    apply: 'build',
    configResolved(config) {
      rootDir = config.root;
      outDir = config.build.outDir;
    },
    writeBundle: {
      order: 'post',
      sequential: true,
      async handler() {
        const resolvedDist = path.resolve(rootDir, outDir);
        const { routeCount, rssCount, dailyBlogCount } = await prerenderDistDirectory(resolvedDist);
        console.log(
          `[testline-prerender] Pre-rendered ${routeCount} routes + 404.html into ${outDir}/ (${rssCount} live RSS stories, ${dailyBlogCount} daily news blogs).`
        );
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      testlinePrerenderPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        manifestFilename: 'manifest.webmanifest',
        includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
        manifest: {
          id: '/',
          name: 'TestLine — Internet Speed Test & IP Diagnostics',
          short_name: 'TestLine',
          description:
            'Real-time internet speed benchmark (download, upload, ping, jitter), dual-stack IPv4/IPv6 diagnostics, and offline Signal Runner game by ECORZO LLC.',
          theme_color: '#070B12',
          background_color: '#070B12',
          display: 'standalone',
          orientation: 'any',
          start_url: '/',
          scope: '/',
          lang: 'en',
          categories: ['utilities', 'productivity'],
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallback: null,
          navigateFallbackDenylist: [
            /^\/api\//,
            /^\/\.well-known\//,
            /^\/chrome-extension\//,
            /^\/downloads\//,
            /^\/manifest\.(?:webmanifest|json)$/,
            /^\/(?:sitemap\.xml|robots\.txt|ads\.txt|llms(?:-full)?\.txt)$/,
          ],
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: process.env.DISABLE_HMR !== 'true',
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
