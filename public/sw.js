// Barbets Duet service worker — minimal offline support for rural/low-connectivity.
// Strategy: network-first for page navigations (online users always get fresh
// content; cached copies are an offline fallback), cache-first for same-origin
// static assets. Visited learning-site pages become available offline.
// ponytail: deliberately tiny — no Workbox/framework. Bump CACHE to invalidate.

const CACHE = 'barbets-v1';
const PRECACHE = ['/', '/learning-sites'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  // Page navigations: network-first, fall back to cache (then '/') when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Same-origin static assets: cache-first.
  event.respondWith(caches.match(request).then((r) => r || fetch(request)));
});
