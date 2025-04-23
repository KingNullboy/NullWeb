const CACHE_NAME = 'offline-cache-v4';
const OFFLINE_URL = '/offline.html';
const EXCLUDED_PATH = '/socialmedia/';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const freshOfflineHtml = await fetch(OFFLINE_URL, { cache: 'reload' });
        await cache.put(OFFLINE_URL, freshOfflineHtml);
      } catch (e) {
        console.warn('Failed to fetch updated offline.html:', e);
      }
      return cache.addAll([
        '/styles.css',
        'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
        'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXiWtFCc.woff2',
      ]);
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ).then(() => self.clients.claim())
    )
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET or extension protocol requests
  if (
    request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.href.includes('extension')
  ) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse.status === 206) throw new Error('Partial content');

          const clone = networkResponse.clone();

          // If CSS, scan for embedded resources
          if (
            request.headers.get('Accept')?.includes('text/css')
          ) {
            clone.text().then((cssText) => {
              const urlMatches = cssText.match(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g);
              if (urlMatches) {
                const resourceUrls = urlMatches.map((match) =>
                  match.match(/(https?:\/\/[^'")]+)/)[0]
                );
                caches.open(CACHE_NAME).then((cache) => {
                  resourceUrls.forEach((resUrl) => {
                    if (!resUrl.startsWith(EXCLUDED_PATH)) {
                      cache.add(resUrl).catch(() => {});
                    }
                  });
                });
              }
            });
          }

          caches.open(CACHE_NAME).then((cache) => {
            if (!url.pathname.startsWith(EXCLUDED_PATH)) {
              cache.put(request, networkResponse.clone()).catch(() => {});
            }
          });

          return networkResponse;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});