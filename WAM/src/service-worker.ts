// Service Worker implementation in TypeScript
const CACHE_NAME = 'wam-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/opengraph.jpg',
  '/manifest.json'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
export {};
