// Fitness Log service worker (vibrant v2) - cache bust
const CACHE="fitness-log-vibrant-v2-20260204";
const ASSETS=["./","./index.html","./manifest.webmanifest","./sw.js","./icon-192.png","./icon-512.png"];
self.addEventListener("install",(e)=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",(e)=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",(e)=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
