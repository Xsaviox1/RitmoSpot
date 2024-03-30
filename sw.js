const CACHE_NAME = 'cool-cache';

const PRECACHE_ASSETS = [
    './assets/icon/48.png',
    './assets/icon/72.png',
    './assets/icon/96.png',
    './assets/icon/144.png',
    './assets/icon/192.png'
    
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_ASSETS))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
