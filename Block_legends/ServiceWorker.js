const cacheName = "Realinspirer-BlockLegend!-1.0";
const contentToCache = [
    "Build/ec7a456ddc145494732c30a39568b711.loader.js",
    "Build/939e9949c2a42ea3d49fd04d63c61efe.framework.js",
    "Build/7a17275bc1b28a9cbdb0c4275aa3f6a1.data",
    "Build/36c70ccff476b451ee7308220ac48912.wasm",
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
