const CACHE="ascendant-v3";
const CORE=[
  "./","./index.html","./manifest.webmanifest",
  "./art/title.svg","./art/prologue.svg","./art/world-map.svg","./art/ship-interior.svg",
  "./art/spark-chamber.svg","./art/battle-arena.svg","./art/amber-highlands.svg",
  "./art/kaia.svg","./art/milo.svg","./art/seren.svg","./art/wraith.svg"
];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener("activate",event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  event.respondWith(
    fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match("./index.html")))
  );
});
