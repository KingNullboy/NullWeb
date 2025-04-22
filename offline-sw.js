const CACHE_NAME = 'nullweb-cache-v1';
const OFFLINE_URL = '/offline.html';
const OFFLINE_EXCLUDE = /^\/socialmedia\//;

const FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap';

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        OFFLINE_URL,
        '/styles.css',
        FONT_STYLESHEET
      ]);
      // Fetch and cache the font files referenced in the stylesheet
      fetch(FONT_STYLESHEET).then(async res => {
        const cssText = await res.text();
        const fontUrls = Array.from(cssText.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g), m => m[1]);
        const fontCache = await caches.open(CACHE_NAME);
        fontUrls.forEach(url => fontCache.add(url));
      });
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;

        const pathname = new URL(request.url).pathname;
        if (
          request.destination === 'document' &&
          !OFFLINE_EXCLUDE.test(pathname)
        ) {
          return await cache.match(OFFLINE_URL);
        }

        return Response.error();
      }
    })()
  );
});