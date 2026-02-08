const CACHE_NAME = "catatanku-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/assets/style.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-192x192-A.png",
  "/icons/icon-512x512-A.png"
];

// Install service worker & simpan file ke cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktifkan service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Ambil file dari cache saat offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match("/offline.html");
      });
    })
  );
});