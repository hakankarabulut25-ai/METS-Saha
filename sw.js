const C='mets-saha-v03-20260914';
const A=['./','index.html','app.css','app.js','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x&&x.ok){const y=x.clone();caches.open(C).then(c=>c.put(e.request,y))}return x}).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Promise.reject())))});
