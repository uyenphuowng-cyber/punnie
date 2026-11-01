/* Sổ Học Điện Tử — service worker: chạy offline
   - Bản trang (HTML/JS/CSS/biểu tượng) lưu sẵn khi cài; có mạng thì lấy bản mới, mất mạng dùng bản đã lưu.
   - Thư viện ngoài (3D, PDF, Word, công thức, zip) và phông chữ được tải sẵn vào bộ nhớ riêng, giữ qua các lần cập nhật.
   - Dữ liệu môn học / bài học / ghi chú nằm trong IndexedDB của trình duyệt nên vốn đã dùng được offline. */
const V="sohoc-c899a02035",LIBS_C="sohoc-libs-v1";
const CORE=["./","index.html","app.js","app-plus.js","app-plus.css","platform.js","config.js","manifest.webmanifest","icon-192.png","icon-512.png"];
const LIBS=["https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js","https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js","https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js"];
const CDN=/(^|\.)(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;
async function precacheLibs(){const c=await caches.open(LIBS_C);let ok=0;await Promise.allSettled(LIBS.map(async u=>{if(await c.match(u)){ok++;return}const r=await fetch(u,{mode:"cors",credentials:"omit"});if(r.ok){await c.put(u,r);ok++}}));return ok}
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));precacheLibs().catch(()=>{})});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==LIBS_C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* có mạng → bản mới (chờ tối đa 4 giây); mất mạng / mạng quá chậm → bản đã lưu */
function netFirst(r){return new Promise(res=>{let done=false;const fall=()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):null));
  const t=setTimeout(()=>fall().then(m=>{if(m&&!done){done=true;res(m)}}),4000);
  fetch(r).then(x=>{if(x.ok){const cp=x.clone();caches.open(V).then(c=>c.put(r,cp))}clearTimeout(t);if(!done){done=true;res(x)}})
    .catch(()=>{clearTimeout(t);fall().then(m=>{if(!done){done=true;res(m||Response.error())}})})})}
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===self.location.origin){e.respondWith(netFirst(r));return}
  if(CDN.test(u.hostname))e.respondWith(caches.open(LIBS_C).then(c=>c.match(r).then(m=>{const net=fetch(r).then(x=>{if(x.ok||x.type==="opaque")c.put(r,x.clone());return x}).catch(()=>m||Response.error());return m||net})));
});
/* trang gọi: tải sẵn thư viện, hỏi trạng thái */
self.addEventListener("message",e=>{const d=e.data||{};const port=e.ports&&e.ports[0];
  if(d.t==="precache")precacheLibs().then(n=>port&&port.postMessage({ok:true,libs:n,total:LIBS.length})).catch(err=>port&&port.postMessage({ok:false,err:String(err)}));
  if(d.t==="status")Promise.all([caches.open(V).then(c=>c.keys()),caches.open(LIBS_C).then(c=>c.keys())]).then(([a,b])=>port&&port.postMessage({core:a.length,libs:b.filter(x=>LIBS.includes(x.url)).length,total:LIBS.length,ver:V}))});
