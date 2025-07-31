const CACHE_NAME = 'carenet-v1';
const OFFLINE_URL = 'offline.html';
const ASSETS_TO_CACHE = [
  '/',
  './index.html',
  './CSS/style.css',
  './dist/css/bootstrap.min.css',
  './app.js',
  './dist/js/bootstrap.min.js',
  '../img/IMG-20250616-WA0077.jpg',
  './img/images (3).jpg',
  './img/download (3).jpg',
  './img/images (3).jpg',
  './img/images (4).jpg',
  './img/download (6).jpg',
  './img/images (6).jpg',
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});