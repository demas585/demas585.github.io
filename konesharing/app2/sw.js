/* Конешеринг (Material): офлайн-кэш. Страница, скрипты и стили из сети, без сети из кэша; картинки и шрифты из кэша. Видео камер не кэшируются. */
const V='kn2-v1';
const CORE=['./','./index.html','./app.js','./app.css','./manifest.webmanifest','./kit/beer.min.css','./kit/beer.min.js','./kit/material-dynamic-colors.min.js','./kit/material-symbols-rounded.woff2','./fonts/roboto-flex-cyrillic-standard-normal.woff2','./fonts/roboto-flex-latin-standard-normal.woff2','./icons/icon-192.png',
 '../media/grom.jpg','../media/buran.jpg','../media/laska.jpg','../media/shaman.jpg','../media/aina.jpg','../media/kedr.jpg','../media/alexey.jpg','../media/marina.jpg','../media/pasture.jpg','../media/stall.jpg','../media/arena.jpg','../media/pov.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kn2-')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const put=(k,res)=>{if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(V).then(x=>x.put(k,c))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(/\.(mp4|webm)$/i.test(u.pathname))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>put('./index.html',res)).catch(()=>caches.match('./index.html',{ignoreSearch:true})));return}
 if(/\.(js|css|webmanifest)$/i.test(u.pathname)){e.respondWith(fetch(r).then(res=>put(u.pathname,res)).catch(()=>caches.match(r,{ignoreSearch:true})));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>put(r,res))))});
self.addEventListener('notificationclick',e=>{e.notification.close();const hash=(e.notification.data&&e.notification.data.hash)||'#/home';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs[0];if(c){c.postMessage({go:hash});return c.focus()}return self.clients.openWindow(new URL('./'+hash,self.registration.scope).href)}))});
