const CACHE_NAME = 'offline-cache-v3';
const OFFLINE_URL = '/offline.html';
const EXCLUDED_PATH = '/socialmedia/';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        OFFLINE_URL,
        '/styles.css',
        'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
        'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXiWtFCc.woff2',
      ])
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET and extension URLs
  if (
    request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.href.includes('extension')
  ) return;

  // Try cache first, then network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse.status === 206) throw new Error('Partial content');

          const clone = networkResponse.clone();

          // If it's a CSS file, scan for url(...) resources and cache them too
          if (
            request.headers.get('Accept') &&
            request.headers.get('Accept').includes('text/css')
          ) {
            clone.text().then((cssText) => {
              const urlMatches = cssText.match(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g);
              if (urlMatches) {
                const resourceUrls = urlMatches.map((match) => match.match(/(https?:\/\/[^'")]+)/)[0]);
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