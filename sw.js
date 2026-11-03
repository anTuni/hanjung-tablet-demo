// 오프라인 실행용: 첫 접속 때 앱 파일을 기기에 저장하고, 이후에는 네트워크 없이도 연다
const C='hj-tablet-v1';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{ if(res.ok&&(new URL(e.request.url).origin===location.origin||e.request.url.includes('fonts.g'))){ const cp=res.clone(); caches.open(C).then(c=>c.put(e.request,cp)); } return res; }).catch(()=>caches.match('index.html'))));
});
