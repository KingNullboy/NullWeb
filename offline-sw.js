const CACHE_NAME = 'offline-cache-v2';
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

  // Ignore non-GET or chrome-extension:// or extension resources
  if (
    request.method !== 'GET' ||
    url.protocol === 'chrome-extension:' ||
    url.href.includes('extension') // extra safety for other browser schemes
  ) {
    return;
  }

  // If the request is for CSS, we need to fetch and parse the CSS to find additional resource requests
  if (request.headers.get('Accept') && request.headers.get('Accept').includes('text/css')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();

          // Fetch and cache any external resources referenced in CSS files (like images, fonts, etc.)
          response.text().then((cssText) => {
            // Match all URL references, including background images, font files, etc.
            const urlMatches = cssText.match(/url\(['"]?(https?:\/\/[^'")]+)['"]?\)/g);
            if (urlMatches) {
              const resourceUrls = urlMatches.map((match) => match.match(/(https?:\/\/[^'")]+)/)[0]);
              caches.open(CACHE_NAME).then((cache) => {
                resourceUrls.forEach((resourceUrl) => {
                  if (!resourceUrl.startsWith(EXCLUDED_PATH)) {
                    cache.add(resourceUrl).catch(() => {});
                  }
                });
              });
            }
          });

          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    );
  } else {
    // Handle all other requests (non-CSS)
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 206) {
            throw new Error('Partial content not cacheable');
          }

          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (!url.pathname.startsWith(EXCLUDED_PATH)) {
              cache.put(request, clone).catch(() => {});
            }
          });

          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
  }
});