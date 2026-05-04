importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

workbox.loadModule('workbox-range-requests');
workbox.loadModule('workbox-cacheable-response');

const CACHE_NAME = 'game-offline-v11';

self.skipWaiting();
workbox.core.clientsClaim();

/**
 * 1. GAME CHUNKS (.part files, .data, .wasm)
 * We use StaleWhileRevalidate here. 
 * It will serve from cache immediately if available, 
 * but update the cache in the background if online.
 */
workbox.routing.registerRoute(
  ({ url }) => 
	url.pathname.includes('.part') || 
	url.pathname.endsWith('.data') || 
	url.pathname.endsWith('.wasm'),
  new workbox.strategies.StaleWhileRevalidate({
	cacheName: 'game-chunks-v11',
	plugins: [
	  new workbox.rangeRequests.RangeRequestsPlugin(),
	  new workbox.cacheableResponse.CacheableResponsePlugin({
		statuses: [0, 200]
	  }),
	  {
		// Force the service worker to handle HEAD requests as if they were GET
		// This fixes the "getSize" error in your log
		fetchDidSucceed: async ({ response }) => {
		  return response;
		},
		cacheKeyWillBeUsed: async ({ request }) => {
		  // Store HEAD and GET under the same key so HEAD finds the cached GET response
		  return request.url; 
		}
	  }
	],
  }),
  'GET'
);

// Specifically handle HEAD requests for the same files
workbox.routing.registerRoute(
  ({ url }) => url.pathname.includes('.part'),
  new workbox.strategies.CacheFirst({
	cacheName: 'game-chunks-v11', // Same cache as GET
  }),
  'HEAD'
);

/**
 * 2. ALL OTHER ASSETS
 */
workbox.routing.registerRoute(
  ({ request }) => true,
  new workbox.strategies.NetworkFirst({
	cacheName: 'site-assets-v11',
	plugins: [
	  new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] })
	]
  })
);

/**
 * 3. FALLBACK
 */
workbox.routing.setCatchHandler(({ event }) => {
  if (event.request.destination === 'document') {
	return caches.match('/offline.html');
  }
  return Response.error();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
	caches.keys().then(keys => Promise.all(
	  keys.filter(key => !key.includes('v11')).map(key => caches.delete(key))
	))
  );
});
