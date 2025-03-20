const cacheName = "Realinspirer-BlockLegend!-1.0";
const contentToCache = [
    "Build/e1a5d4ab330d5cabd8f9699ab98662ae.loader.js",
    "Build/7bffbcff39e856a0ccb41716320c3835.framework.js",
    "Build/87048967ee240e782b2ce30587f39320.data",
    "Build/aa8e6887a088c34895e33d4d321bd3a7.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
