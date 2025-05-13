const cacheName = "Realinspirer-Miner's Fury-1.0";
const contentToCache = [
    "Build/5f9a818a309900368692f886af4e0300.loader.js",
    "Build/3cf5a741f802c6bb473f9fd8dc9c23ee.framework.js",
    "Build/8395375b2ac60568f1d9c37389da0351.data",
    "Build/a345520c4b4041b358c7c187059f736a.wasm",
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
