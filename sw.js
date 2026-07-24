const CACHE = "monetag-sw";
const ASSETS = ["/"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  if (e.request.url.includes("monetag") || e.request.url.includes("pro-sterra") || e.request.url.includes("dolohen")) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
