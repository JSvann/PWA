
const CACHE_NAME = 'pwa-sederhana-cache-v1';


const URLS_TO_CACHE = [
    '/',
    'index.html'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache berhasil dibuka');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
         
                if (response) {
                    return response;
                }
               
                return fetch(event.request);
            })
    );
});