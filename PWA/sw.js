// Nama cache. Ubah nama ini jika ada pembaruan pada file yang di-cache
const CACHE_NAME = 'pwa-sederhana-cache-v1';

// Daftar file yang akan kita simpan di cache untuk akses offline
// Pastikan path-nya benar sesuai dengan struktur folder Anda
const URLS_TO_CACHE = [
    '/',
    'index.html'
];

// Proses Instalasi Service Worker
// Saat service worker di-install, kita buka cache dan tambahkan file kita
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache berhasil dibuka');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Proses Fetch (setiap kali browser meminta resource)
// Ini adalah strategi "Cache First": coba cari di cache dulu, jika tidak ada baru ambil dari internet.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika file ditemukan di cache, kembalikan dari cache
                if (response) {
                    return response;
                }
                // Jika tidak ada di cache, ambil dari jaringan (internet)
                return fetch(event.request);
            })
    );
});