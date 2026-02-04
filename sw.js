const CACHE="fitness-log-fresh-v1-20260204";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",(e)=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener("activate",(e)=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k)));await self.clients.claim();})());});
self.addEventListener("fetch",(e)=>{
  const req=e.request;
  const url=new URL(req.url);
  if(url.origin!==location.origin) return;
  e.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(req,{ignoreSearch:true});
    if(cached) return cached;
    try{
      const fresh=await fetch(req);
      if(req.method==="GET" && fresh.status===200) cache.put(req,fresh.clone());
      return fresh;
    }catch(err){
      return cached || new Response("Offline",{status:200,headers:{"Content-Type":"text/plain"}});
    }
  })());
});
