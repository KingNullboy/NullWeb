const CACHE_NAME = 'nullweb-cache-v1';

self.addEventListener('install', event => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', event => {
  clients.claim(); // Control all open pages
});

// Pages under /socialmedia/ should be skipped
function shouldCache(request) {
  const url = new URL(request.url);
  return !url.pathname.startsWith('/socialmedia/');
}

self.addEventListener('fetch', event => {
  const request = event.request;

  // Skip non-GET or cross-origin
  if (request.method !== 'GET' || !request.url.startsWith(location.origin)) return;

  if (!shouldCache(request)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cachedResponse = await cache.match(request);
      const networkResponsePromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      });

      // If cache exists, serve it and update in background
      return cachedResponse || networkResponsePromise;
    })
  );
});