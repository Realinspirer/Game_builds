const cacheName = "Realinspirer-Miner's Fury-1.0";
const contentToCache = [
    "Build/805c94d496bc3da6798445c587a7444b.loader.js",
    "Build/17498bd8abe7b4c1a74fcaf9b281748a.framework.js",
    "Build/95c34f8adae39d92a1bc449b23117d30.data",
    "Build/adf42b2d1c7247b2117973a7efec7adf.wasm",
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
