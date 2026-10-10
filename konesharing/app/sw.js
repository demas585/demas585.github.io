/* Конешеринг: офлайн-кэш. Страница берётся из сети, при отсутствии сети из кэша; фото, иконки и шрифты из кэша. Видео камер не кэшируются: без сети приложение показывает «Нет соединения». */
const V='kn-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png',
 '../media/grom.jpg','../media/buran.jpg','../media/laska.jpg','../media/shaman.jpg','../media/aina.jpg','../media/kedr.jpg',
 '../media/alexey.jpg','../media/marina.jpg','../media/pasture.jpg','../media/stall.jpg','../media/arena.jpg','../media/pov.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(/\.(mp4|webm)$/i.test(u.pathname))return;
 if(r.mode==='navigate'||u.pathname.endsWith('/index.html')){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put('./index.html',c));return res}).catch(()=>caches.match('./index.html',{ignoreSearch:true})));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res}).catch(()=>hit);return hit||net}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const hash=(e.notification.data&&e.notification.data.hash)||'#/home';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs[0];if(c){c.postMessage({go:hash});return c.focus()}return self.clients.openWindow(new URL('./'+hash,self.registration.scope).href)}))});
