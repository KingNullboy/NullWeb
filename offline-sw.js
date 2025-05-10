const CACHE_NAME = 'offline-cache-v5';
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
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            // Delete old caches
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Exclude non-GET requests and certain types (like extensions)
  if (
    request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.href.includes('extension')
  ) return;

  // If the request is for an HTML page or script, handle it separately
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Handle partial responses
          if (networkResponse.status === 206) throw new Error('Partial content');

          // Cache the response for future requests
          const cloneForCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, cloneForCache).catch(() => {});
          });

          return networkResponse;
        })
        .catch(() => 
          caches.match(request).then((cachedResponse) =>
            cachedResponse || caches.match(OFFLINE_URL)
          )
        )
    );
  } else {
    // For non-HTML and non-script requests (like CSS or images)
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Clone the network response and handle caching
          const cloneForCache = networkResponse.clone();
          const cloneForCSS = networkResponse.clone();

          // If it's a CSS file, parse and cache its linked resources
          if (
            request.headers.get('Accept') &&
            request.headers.get('Accept').includes('text/css')
          ) {
            cloneForCSS.text().then((cssText) => {
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

          // Cache the response if it's not from the excluded path
          caches.open(CACHE_NAME).then((cache) => {
            if (!url.pathname.startsWith(EXCLUDED_PATH)) {
              cache.put(request, cloneForCache).catch(() => {});
            }
          });

          return networkResponse;
        })
        .catch(() => 
          caches.match(request).then((cachedResponse) =>
            cachedResponse || caches.match(OFFLINE_URL)
          )
        )
    );
  }
});