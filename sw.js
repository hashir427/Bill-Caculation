const CACHE_NAME = 'bill-calc-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Live Server ke WebSocket aur non-http requests ko ignore karein
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});