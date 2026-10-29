/* =====================================================================
   SỔ HỌC ĐIỆN TỬ — lõi: tiện ích, nền tảng, lưu trữ, trang chủ, sổ học
   ===================================================================== */
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const mkid=p=>p+"-"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const fmt=(v,u)=>{const a=Math.abs(v);let s,p="";if(a>=1e6){s=v/1e6;p="M"}else if(a>=1e3){s=v/1e3;p="k"}else if(a>=1||a===0){s=v}else if(a>=1e-3){s=v*1e3;p="m"}else if(a>=1e-6){s=v*1e6;p="µ"}else{s=v*1e9;p="n"}return (Math.round(s*100)/100).toLocaleString("vi-VN")+" "+p+u};
const TZ=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"Asia/Ho_Chi_Minh"}catch(e){return "Asia/Ho_Chi_Minh"}})();
const dfmt=t=>new Date(t).toLocaleDateString("vi-VN",{day:"numeric",month:"short",year:"numeric"});
function toast(t,ms=2200){const el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(()=>el.classList.remove("on"),ms)}
const _scripts={};
function loadScript(src){return _scripts[src]||(_scripts[src]=new Promise((res,rej)=>{const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=()=>{delete _scripts[src];rej(new Error("load "+src))};document.head.appendChild(s)}))}
const LPFX="shdt2:"+(window.SOHOC_LP||"");/* bản web: mỗi tài khoản một tiền tố riêng */
const local={get(k,d){try{const v=localStorage.getItem(LPFX+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(LPFX+k,JSON.stringify(v))}catch(e){}}};

/* ---------- icons ---------- */
const IC={
 plus:'<path d="M12 5v14M5 12h14"/>', back:'<path d="M15 18l-6-6 6-6"/>', close:'<path d="M6 6l12 12M18 6L6 18"/>',
 more:'<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>',
 upload:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>', file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
 link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 school:'<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11v5c3 2 7 2 10 0v-5"/>', text:'<path d="M5 6h14M5 12h14M5 18h9"/>',
 audio:'<path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/>', video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
 slides:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>', map:'<circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 11l8-4M8 13l8 4"/>',
 report:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M9 13h6M9 17h4M14 3v5h5"/>', cards:'<rect x="7" y="3" width="13" height="16" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2h9"/>',
 quiz:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01"/>', info:'<path d="M5 20V10M10 20V4M15 20v-7M20 20v-11"/>',
 table:'<path d="M4 6h16M4 12h16M4 18h16M9 6v12"/>', cube:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
 wave:'<path d="M3 12h3l2-6 4 12 2-6h7"/>', yt:'<rect x="3" y="6" width="18" height="12" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
 send:'<path d="M12 19V5M6 11l6-6 6 6"/>', stop:'<rect x="7" y="7" width="10" height="10" rx="1.5"/>', note:'<path d="M5 4h10l4 4v12H5z"/><path d="M9 12h6M9 16h4"/>',
 pin:'<path d="M9 3h6l-1 6 3 3H7l3-3zM12 15v6"/>', copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
 play:'<path d="M7 5l12 7-12 7z"/>', pause:'<path d="M8 5v14M16 5v14"/>', edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>', theme:'<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor"/>',
 panel:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/>', dl:'<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>', full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 spark:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', chat:'<path d="M4 5h16v11H9l-5 4z"/>', ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
 check:'<path d="M5 12l5 5 9-10"/>', min:'<path d="M6 12h12"/>', split:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>', win:'<rect x="4" y="6" width="16" height="13" rx="2"/><path d="M4 10h16"/>', home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>', book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>', flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/>', palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>', star:'<path d="M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.5 6.6 19.4l1.2-6L3.3 9.3l6.1-.7z"/>', widget:'<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="10" width="8" height="11" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/>', expand:'<path d="M4 4h6M4 4v6M20 20h-6M20 20v-6M4 4l6 6M20 20l-6-6"/>', shuffle:'<path d="M4 7h4l8 10h4M16 7h4M4 17h4"/>'
};
const ic=(n,cls="i")=>`<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||""}</svg>`;

/* notebook glyphs (drawn, deterministic by id) */
function glyph(id,size=46){
  const h=[...String(id)].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7),k=h%5;
  const pal=[["#2b6f4f","#7ee0a7"],["#7a3d1c","#f4a26a"],["#244a7a","#8cc0ff"],["#5a2f6e","#d6a4ff"],["#6e5a1c","#f2d36b"]][h%5>>0];
  const bg=pal[0],fg=pal[1];
  const shapes=[
   `<rect x="9" y="12" width="28" height="22" rx="3" fill="${fg}"/><rect x="13" y="16" width="20" height="9" rx="1.5" fill="${bg}"/>${[0,1,2,3,4].map(i=>`<rect x="${11+i*5.3}" y="28" width="3" height="3" rx=".8" fill="${bg}"/>`).join("")}`,
   `<path d="M26 6L14 26h9l-3 14 13-21h-9z" fill="${fg}"/>`,
   `<path d="M6 23h7l3-9 5 18 4-12 3 3h12" stroke="${fg}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
   `<path d="M10 12h12a11 11 0 0 1 0 22H10z" fill="${fg}"/><path d="M4 18h6M4 28h6M33 23h9" stroke="${fg}" stroke-width="3" stroke-linecap="round"/>`,
   `<rect x="12" y="12" width="22" height="22" rx="3" fill="${fg}"/>${[0,1,2,3].map(i=>`<path d="M${15+i*5} 6v6M${15+i*5} 34v6M6 ${15+i*5}h6M34 ${15+i*5}h6" stroke="${fg}" stroke-width="2.2"/>`).join("")}<rect x="17" y="17" width="12" height="12" rx="1.5" fill="${bg}"/>`
  ];
  return `<svg class="glyph" width="${size}" height="${size}" viewBox="0 0 46 46" aria-hidden="true"><rect width="46" height="46" rx="12" fill="${bg}"/>${shapes[k]}</svg>`;
}

/* =====================================================================
   NỀN TẢNG (Claude artifact runtime) — db, user, sample, mcp, assets…
   ===================================================================== */
const P={ready:false,db:null,uid:null,me:null,user:null,sample:null,mcp:null,assets:null,downloads:null,perm:null};
async function initPlatform(){
  const c=window.claude;
  if(!c||!c.use){P.ready=true;return}
  const names=["user","db","sample","mcp","assets","downloads","permissions"];
  const got=await Promise.all(names.map(n=>c.use(n).catch(()=>null)));
  [P.user,P.db,P.sample,P.mcp,P.assets,P.downloads,P.perm]=got;
  if(P.user){try{P.uid=await P.user.id()}catch(e){} try{P.me=await P.user.me()}catch(e){}}
  if(!P.uid)P.db=null;
  P.ready=true;
}

/* ---------- Store: db khi có, bộ nhớ tạm khi không ---------- */
const Store={
  mem:new Map(), subs:new Set(),
  col(){return P.db.collection("data/users/"+P.uid)},
  persistent(){return !!P.db},
  match(spec,d){if(spec.type&&d.type!==spec.type)return false;if(spec.types&&!spec.types.includes(d.type))return false;if(spec.nb&&d.nb!==spec.nb)return false;return true},
  emit(){this.subs.forEach(s=>s.cb([...this.mem.entries()].map(([id,d])=>({id,...d})).filter(d=>this.match(s.spec,d))))},
  async put(id,data){if(P.db)return this.col().doc(id).set(data);this.mem.set(id,data);this.emit()},
  async patch(id,data){if(P.db)return this.col().doc(id).update(data);this.mem.set(id,{...(this.mem.get(id)||{}),...data});this.emit()},
  async del(id){if(P.db)return this.col().doc(id).delete();this.mem.delete(id);this.emit()},
  async get(id){if(P.db){const s=await this.col().doc(id).get();return s.exists?{id,...s.data()}:null}const d=this.mem.get(id);return d?{id,...d}:null},
  async query(spec){
    if(P.db){let q=this.col();if(spec.type)q=q.where("type","==",spec.type);if(spec.types)q=q.where("type","in",spec.types);if(spec.nb)q=q.where("nb","==",spec.nb);const s=await q.get();return s.docs.map(d=>({id:d.id,...d.data()}))}
    return [...this.mem.entries()].map(([id,d])=>({id,...d})).filter(d=>this.match(spec,d));
  },
  watch(spec,cb){
    if(P.db){let q=this.col();if(spec.type)q=q.where("type","==",spec.type);if(spec.types)q=q.where("type","in",spec.types);if(spec.nb)q=q.where("nb","==",spec.nb);
      return q.onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),e=>{console.warn(e);toast("Mất kết nối lưu trữ: "+(e&&e.code||""))})}
    const s={spec,cb};this.subs.add(s);setTimeout(()=>this.emit(),0);return ()=>this.subs.delete(s);
  }
};

/* =====================================================================
   TRẠNG THÁI UI
   ===================================================================== */
const UI={vmode:local.get("vmode","dock"),lay:Object.assign({src:300,studio:380,split:520,coll:{},max:null},local.get("lay",{})),splitOpen:false,vopen:null,vb:null,vroot:null,reopen:null,chatDepth:local.get("chatDepth","std"),view:"home",nbs:[],cur:null,unsub:[],srcs:[],arts:[],notes:[],chat:[],cals:[],busy:new Map(),textCache:new Map(),blobCache:new Map(),pane:"chat",collapse:{l:false,r:false},modalCleanup:null,streaming:null,gcEvents:null};

/* ---------- top bar ---------- */
function renderTop(){
  const t=$("#top");const inNb=UI.view==="nb"&&UI.cur;
  t.innerHTML=`<button class="ghost ic mob-only" id="tMenu" aria-label="Mở thanh tiện ích">${ic("widget")}</button>
    ${inNb?`<button class="ghost ic" id="tBack" aria-label="Về trang chủ">${ic("back")}</button>${glyph(UI.cur.id,32)}<input class="nbtitle" id="tTitle" value="${esc(UI.cur.title)}" aria-label="Tên sổ học"><div class="grow hide-sm"></div><button class="ghost hide-sm" id="tLay">${ic("split")}<span>Bố cục</span></button>`
      :`<b style="font-family:var(--f-display);font-size:19px;font-weight:600;white-space:nowrap">Sổ Học Điện Tử</b><div class="grow"></div>`}
    <button class="ghost" id="tCal">${ic("cal")}<span class="hide-sm">Lịch học</span></button>
    ${inNb?`<button class="ghost hide-sm" id="tNew">${ic("plus")}<span>Sổ học mới</span></button>`:""}`;
  $("#tMenu").onclick=()=>$("#rail").classList.toggle("open");
  if(inNb){$("#tBack").onclick=()=>goHome();
    $("#tTitle").onchange=e=>{const v=e.target.value.trim()||"Sổ học chưa đặt tên";Store.patch(UI.cur.id,{title:v,updated:Date.now()})};
    $("#tNew").onclick=newNotebook;$("#tLay").onclick=e=>layoutMenu(e.currentTarget)}
  $("#tCal").onclick=openCalendarHub;
}
function popMenu(anchor,html){
  closePop();const m=document.createElement("div");m.className="popmenu";m.innerHTML=html;document.body.appendChild(m);
  const r=anchor.getBoundingClientRect();const w=m.offsetWidth,h=m.offsetHeight;
  m.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+"px";m.style.top=Math.min(innerHeight-h-8,r.bottom+6)+"px";
  setTimeout(()=>document.addEventListener("click",closePop,{once:true}),0);return m;
}
function closePop(){$$(".popmenu").forEach(x=>x.remove())}
async function accountMenu(anchor){
  const name=(P.me&&P.me.name)||"Bạn";const gc=await gcStatus();
  const m=popMenu(anchor,`<div class="who"><b style="color:var(--ink)">${esc(name)}</b><br>Đăng nhập bằng tài khoản Claude</div>
    <div class="sep"></div>
    <div class="who">Tài khoản Google · Google Calendar: <b style="color:${gc==="ok"?"var(--ok)":"var(--warn)"}">${gc==="ok"?"đã kết nối":gc==="none"?"chưa thêm":"chưa cấp quyền"}</b></div>
    <button data-a="gc">${ic("cal")}${gc==="ok"?"Xem lịch Google":"Kết nối Google Calendar"}</button>
    <div class="sep"></div>
    <div class="who">${Store.persistent()?"Sổ học được lưu riêng cho tài khoản của bạn.":"Đang chạy ngoài ứng dụng Claude: dữ liệu chỉ tồn tại trong phiên này."}</div>`);
  $("[data-a=gc]",m).onclick=()=>gc==="ok"?openCalendarHub():gcConnect();
}

/* =====================================================================
   TRANG CHỦ
   ===================================================================== */
function goHome(){stopAll();UI.unsub.forEach(u=>u());UI.unsub=[];UI.view="home";UI.cur=null;$("#app").classList.remove("in-nb");$("#mobtabs").hidden=true;renderTop();renderHome()}
function renderHome(){
  if(UI.view!=="home")return;
  const nbs=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0));
  const ups=upcomingSessions().slice(0,6);
  $("#main").innerHTML=`<div class="home"><div class="home-in">
    <div class="home-h"><h2>Sổ học gần đây</h2><button class="pill-btn primary" id="hNew">${ic("plus")} Sổ học mới</button></div>
    <div class="nb-grid">
      ${nbs.map(n=>`<div class="nb-card" role="button" tabindex="0" data-nb="${esc(n.id)}">${glyph(n.id)}${n.sample?`<span class="sample-tag">Sổ mẫu</span>`:""}
        <button class="ghost ic menu" data-menu="${esc(n.id)}" aria-label="Tùy chọn">${ic("more")}</button>
        <h3>${esc(n.title)}</h3><small>${dfmt(n.created||Date.now())} · ${n.srcCount||0} nguồn</small></div>`).join("")}
      <button class="nb-card nb-new" id="hNew2">${ic("plus")}<span>Tạo sổ học mới</span><small>Tải bài giảng, giáo trình hoặc ZIP từ Moodle</small></button>
    </div>
    <div class="split">
      <section class="card"><div class="home-h"><h3 style="flex:1">Lịch ôn tập sắp tới</h3><button class="btn" id="hCal">${ic("cal")} Mở lịch học</button></div>
        ${ups.length?ups.map(evRow).join(""):`<div class="empty">Chưa có buổi ôn tập. Trong một sổ học, mở Studio → <b>Lịch ôn tập</b> để AI chia nội dung thành các buổi học và đưa vào Google Calendar.</div>`}
      </section>
      <section class="card"><h3>Nguồn môn học</h3>
        <div class="how"><b>VGU Moodle</b><ol><li>Mở khóa học trên Moodle VGU, vào thư mục tài liệu.</li><li>Chọn <i>Download folder</i> để tải cả thư mục dạng ZIP (hoặc tải từng tệp PDF).</li><li>Tạo sổ học → <b>Thêm nguồn</b> → thả tệp ZIP. Mỗi tệp bên trong thành một nguồn.</li></ol></div>
        <div class="muted" style="font-size:13px">Hỗ trợ PDF, DOCX, TXT, MD, ảnh (PNG/JPG) và ZIP.</div>
      </section>
    </div>
  </div></div>`;
  $("#hNew").onclick=newNotebook;$("#hNew2").onclick=newNotebook;$("#hCal").onclick=openCalendarHub;
  $$("[data-nb]").forEach(c=>{const go=e=>{if(e.target.closest("[data-menu]"))return;openNotebook(c.dataset.nb)};c.onclick=go;c.onkeydown=e=>{if(e.key==="Enter")go(e)}});
  $$("[data-menu]").forEach(b=>b.onclick=e=>{e.stopPropagation();const id=b.dataset.menu;
    const m=popMenu(b,`<button data-a="open">${ic("ext")}Mở</button><button data-a="ren">${ic("edit")}Đổi tên</button><button data-a="del" style="color:var(--bad)">${ic("trash")}Xóa sổ học</button>`);
    $("[data-a=open]",m).onclick=()=>openNotebook(id);
    $("[data-a=ren]",m).onclick=()=>renameDialog(id);
    $("[data-a=del]",m).onclick=()=>confirmDialog("Xóa sổ học này?","Toàn bộ nguồn, ghi chú và nội dung Studio trong sổ sẽ bị xóa vĩnh viễn.","Xóa",()=>deleteNotebook(id))});
}
function evRow(e){const d=new Date(e.date+"T"+(e.start||"19:00"));return `<div class="ev"><div class="d"><b>${d.getDate()}</b>${d.toLocaleDateString("vi-VN",{month:"short"})}</div><div class="t"><b>${esc(e.title)}</b><small>${esc(e.start||"")} · ${e.minutes||60} phút · ${esc(e.nbTitle||"")}</small></div><a class="btn" href="${esc(gcTemplateUrl(e))}" target="_blank" rel="noopener noreferrer" title="Mở trong Google Calendar">${ic("ext")}</a></div>`}
const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
function upcomingSessions(){const now=ymd(new Date());return UI.cals.flatMap(c=>(c.events||[]).map(e=>({...e,nbTitle:c.nbTitle,nb:c.nb}))).filter(e=>e.date>=now).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start))}

async function newNotebook(){
  const id=mkid("nb");await Store.put(id,{type:"nb",title:"Sổ học chưa đặt tên",created:Date.now(),updated:Date.now(),srcCount:0,summary:"",questions:[]});
  openNotebook(id,{addSources:true});
}
function renameDialog(id){const n=UI.nbs.find(x=>x.id===id);if(!n)return;
  openModal({title:"Đổi tên sổ học",small:true,body:`<div class="form"><input class="input" id="rn" value="${esc(n.title)}"></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="rnOk">Lưu</button>`});
  $("#rnOk").onclick=()=>{Store.patch(id,{title:$("#rn").value.trim()||n.title,updated:Date.now()});closeModal()};$("#rn").focus()}
function confirmDialog(title,text,okLabel,fn){
  openModal({title,small:true,body:`<div class="form"><p style="margin:0">${esc(text)}</p></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="cfOk" style="background:var(--bad);border-color:var(--bad);color:#fff">${esc(okLabel)}</button>`});
  $("#cfOk").onclick=async()=>{closeModal();await fn()};
}
async function deleteNotebook(id){
  toast("Đang xóa…");const all=await Store.query({nb:id});
  for(const d of all){try{if(d.assetId&&P.assets)await P.assets.delete(d.assetId).catch(()=>{});await Store.del(d.id)}catch(e){}}
  await Store.del(id);toast("Đã xóa sổ học");
}

/* =====================================================================
   SỔ HỌC (3 cột)
   ===================================================================== */
function openNotebook(id,opt={}){
  stopAll();UI.unsub.forEach(u=>u());UI.unsub=[];
  const nb=UI.nbs.find(n=>n.id===id);if(!nb){toast("Không tìm thấy sổ học");return}
  UI.view="nb";UI.cur=nb;UI.srcTab="src";UI.srcs=[];UI.arts=[];UI.notes=[];UI.chat=[];UI.pane="chat";
  $("#app").classList.add("in-nb");renderTop();renderNotebookShell();
  UI.unsub.push(Store.watch({nb:id,types:["src","art","note","chat"]},docs=>{
    UI.srcs=docs.filter(d=>d.type==="src").sort((a,b)=>(a.created||0)-(b.created||0));
    UI.arts=docs.filter(d=>d.type==="art").sort((a,b)=>(b.created||0)-(a.created||0));
    UI.notes=docs.filter(d=>d.type==="note").sort((a,b)=>(b.created||0)-(a.created||0));
    const ch=docs.find(d=>d.type==="chat");if(!UI.streaming)UI.chat=ch?ch.turns||[]:[];
    renderSources();renderStudio();renderChat();
  }));
  if(opt.addSources)setTimeout(()=>addSourceDialog(),60);
}
function paneHead(id,title,coll,extra=""){return `<div class="pane-h" data-ph="${id}"><h2>${title}</h2>${extra}<span class="vtitle">${title}</span><div class="pane-tools">${coll?`<button class="ghost ic lay hide-coll" data-coll="${id}" aria-label="Thu nhỏ ${title}" title="Thu nhỏ">${ic("min")}</button>`:""}<button class="ghost ic lay" data-max="${id}" aria-label="Phóng to ${title}" title="Phóng to / thu về">${ic("expand")}</button></div></div>`}
function renderNotebookShell(){
  $("#main").innerHTML=`<div class="nb3" id="nbGrid">
    <section class="pane src" id="paneSrc">${paneHead("paneSrc","Nguồn",true)}<div class="rtab src-tabs" id="srcTabs" role="tablist"></div><div class="pane-b" id="srcBody"></div></section>
    <div class="gutter" data-g="src" id="gSrc" aria-hidden="true"></div>
    <section class="pane chat show" id="paneChat">${paneHead("paneChat","Trò chuyện",false,`<span class="muted hide-sm" style="font-size:12px;white-space:nowrap" id="chatScope"></span>`)}<div class="chat-scroll" id="chatScroll"><div class="chat-in" id="chatIn"></div></div>
      <div class="composer"><div class="depth" id="depthBar"></div><div class="comp-in"><textarea id="ask" rows="1" placeholder="Đặt câu hỏi hoặc yêu cầu tạo nội dung"></textarea><small id="srcN"></small><button class="send" id="sendBtn" aria-label="Gửi">${ic("send")}</button></div><div class="disclaim">AI có thể sai, hãy kiểm tra lại với nguồn được trích dẫn.</div></div></section>
    <div class="gutter" data-g="split" id="gSplit" aria-hidden="true"></div>
    <section class="pane splitp" id="paneSplit"><div class="vhost" id="splitHost"></div></section>
    <div class="gutter" data-g="studio" id="gStudio" aria-hidden="true"></div>
    <section class="pane studio" id="paneStudio">${paneHead("paneStudio","Studio",true)}<div class="pane-b" id="studioBody"></div></section>
  </div>`;
  applyLayout();bindLayout();renderDepth();
  const ask=$("#ask");ask.addEventListener("input",()=>{ask.style.height="auto";ask.style.height=Math.min(160,ask.scrollHeight)+"px"});
  ask.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#sendBtn").click()}});
  $("#sendBtn").onclick=()=>{if(UI.streaming){UI.streaming.abort();return}const t=ask.value.trim();if(!t)return;ask.value="";ask.style.height="auto";chatSend(t)};
  const mt=$("#mobtabs");mt.hidden=false;
  mt.innerHTML=[["paneSrc","Nguồn","file"],["paneChat","Trò chuyện","chat"],["paneStudio","Studio","spark"]].map(([p,l,i])=>`<button data-p="${p}" aria-current="${p==="paneChat"}">${ic(i)}<span>${l}</span></button>`).join("");
  $$("button",mt).forEach(b=>b.onclick=()=>mobPane(b.dataset.p));
}
const DEPTH={sum:{l:"Tóm tắt",d:"Trình bày dạng TÓM TẮT BÀI GIẢNG: cô đọng, chỉ ý chính, công thức chính và một ví dụ ngắn."},std:{l:"Tiêu chuẩn",d:"Trình bày ở mức TIÊU CHUẨN: đủ ý, có giải thích ngắn gọn và ví dụ."},deep:{l:"Giảng chi tiết bản chất",d:"GIẢNG CHI TIẾT, ĐI TỚI BẢN CHẤT: giải thích vì sao (cơ chế vật lý/logic bên dưới), suy ra công thức từ nguyên lý gốc từng bước, ví dụ số có lời giải từng dòng, các lỗi sinh viên hay mắc, liên hệ linh kiện và ứng dụng thực tế. Không bỏ qua bước trung gian."}};
function renderDepth(){const b=$("#depthBar");if(!b)return;b.innerHTML=Object.entries(DEPTH).map(([k,v])=>`<button data-dp="${k}" aria-pressed="${UI.chatDepth===k}">${v.l}</button>`).join("");$$("[data-dp]",b).forEach(x=>x.onclick=()=>{UI.chatDepth=x.dataset.dp;local.set("chatDepth",UI.chatDepth);renderDepth()})}
function saveLay(){local.set("lay",UI.lay)}
function applyLayout(){
  const g=$("#nbGrid");if(!g)return;const L=UI.lay;const desk=innerWidth>1100;
  const ids=["paneSrc","gSrc","paneChat","gSplit","paneSplit","gStudio","paneStudio"];
  if(!desk){ids.forEach(i=>{const e=$("#"+i);if(e)e.style.display=""});g.style.gridTemplateColumns="";return}
  const vis={paneSrc:!L.max||L.max==="paneSrc",paneChat:!L.max||L.max==="paneChat",paneSplit:UI.splitOpen&&(!L.max||L.max==="paneSplit"),paneStudio:!L.max||L.max==="paneStudio"};
  const tight=UI.splitOpen&&innerWidth-(L.src+L.split+L.studio+62)<480;
  const collS=(!!L.coll.paneSrc||tight)&&!L.max,collT=!!L.coll.paneStudio&&!L.max;
  vis.gSrc=vis.paneSrc&&vis.paneChat&&!collS;vis.gSplit=vis.paneChat&&vis.paneSplit;vis.gStudio=vis.paneStudio&&(vis.paneChat||vis.paneSplit)&&!collT;
  $("#paneSrc").classList.toggle("coll",collS);$("#paneStudio").classList.toggle("coll",collT);
  const W={paneSrc:L.max==="paneSrc"?"minmax(0,1fr)":collS?"52px":L.src+"px",gSrc:"10px",paneChat:"minmax(300px,1fr)",gSplit:"10px",paneSplit:L.max==="paneSplit"||!vis.paneChat?"minmax(0,1fr)":L.split+"px",gStudio:"10px",paneStudio:L.max==="paneStudio"?"minmax(0,1fr)":collT?"52px":L.studio+"px"};
  const cols=[];ids.forEach(i=>{const e=$("#"+i);if(!e)return;e.style.display=vis[i]?"":"none";if(vis[i])cols.push(W[i])});
  if(collS&&vis.paneChat)cols.splice(1,0,"10px"),0;
  g.style.gridTemplateColumns=cols.join(" ");
  if(collS){$("#gSrc").style.display="";$("#gSrc").style.visibility="hidden";$("#gSrc").style.pointerEvents="none"}else{$("#gSrc").style.visibility="";$("#gSrc").style.pointerEvents=""}
  $$("[data-max]",g).forEach(b=>{const on=L.max===b.dataset.max;b.setAttribute("aria-pressed",on);b.title=on?"Thu về bố cục chia cột":"Phóng to toàn vùng"});
}
function bindLayout(){
  const g=$("#nbGrid");
  $$("[data-coll]",g).forEach(b=>b.onclick=e=>{e.stopPropagation();UI.lay.coll[b.dataset.coll]=true;saveLay();applyLayout()});
  $$("[data-max]",g).forEach(b=>b.onclick=e=>{e.stopPropagation();UI.lay.max=UI.lay.max===b.dataset.max?null:b.dataset.max;saveLay();applyLayout()});
  $$("[data-ph]",g).forEach(h=>h.addEventListener("click",()=>{const id=h.dataset.ph;if(UI.lay.coll[id]){UI.lay.coll[id]=false;saveLay();applyLayout()}}));
  $$(".gutter",g).forEach(gt=>{gt.addEventListener("pointerdown",e=>{e.preventDefault();gt.setPointerCapture(e.pointerId);gt.classList.add("drag");let x0=e.clientX;const k=gt.dataset.g;
    const mv=ev=>{const dx=ev.clientX-x0;x0=ev.clientX;const L=UI.lay;if(k==="src")L.src=Math.max(220,Math.min(620,L.src+dx));else if(k==="studio")L.studio=Math.max(260,Math.min(innerWidth*.6,L.studio-dx));else L.split=Math.max(280,Math.min(innerWidth*.62,L.split-dx));applyLayout()};
    const up=()=>{gt.classList.remove("drag");gt.removeEventListener("pointermove",mv);gt.removeEventListener("pointerup",up);saveLay()};
    gt.addEventListener("pointermove",mv);gt.addEventListener("pointerup",up)})});
}
addEventListener("resize",()=>applyLayout());
function layoutMenu(anchor){
  const m=popMenu(anchor,`<div class="who">Bố cục sổ học</div>
    <button data-l="3">${ic("split")}Ba cột (mặc định)</button><button data-l="chat">${ic("chat")}Tập trung trò chuyện</button><button data-l="half">${ic("split")}Chia đôi: Trò chuyện | Studio</button><button data-l="studio">${ic("expand")}Studio toàn vùng</button>
    <div class="sep"></div><div class="who">Mở nội dung Studio ở</div>
    ${[["dock","Ghim trong cột Studio","panel"],["split","Cột riêng cạnh trò chuyện","split"],["modal","Cửa sổ nổi","win"],["full","Toàn màn hình","full"]].map(([k,l,i])=>`<button data-vm="${k}">${ic(i)}${l}${UI.vmode===k?" ✓":""}</button>`).join("")}
    <div class="sep"></div><button data-l="fs">${ic("full")}Toàn màn hình trình duyệt</button>`);
  $$("[data-l]",m).forEach(b=>b.onclick=()=>{const L=UI.lay,k=b.dataset.l;
    if(k==="3"){Object.assign(L,{src:300,studio:380,split:520,coll:{},max:null})}
    if(k==="chat"){L.coll={paneSrc:true,paneStudio:true};L.max=null}
    if(k==="half"){L.coll={paneSrc:true};L.max=null;L.studio=Math.round((innerWidth-140)/2)}
    if(k==="studio"){L.max="paneStudio"}
    if(k==="fs"){try{(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).catch(()=>toast("Toàn màn hình không khả dụng ở đây"))}catch(e){toast("Toàn màn hình không khả dụng ở đây")}return}
    saveLay();applyLayout()});
  $$("[data-vm]",m).forEach(b=>b.onclick=()=>{UI.vmode=b.dataset.vm;local.set("vmode",UI.vmode);toast("Nội dung Studio sẽ mở ở chế độ đã chọn")});
}
function mobPane(p){$$("#nbGrid .pane").forEach(x=>x.classList.toggle("show",x.id===p||(p!=="paneSplit"&&false)));$$("#mobtabs button").forEach(b=>b.setAttribute("aria-current",b.dataset.p===p))}

/* ---------- Sources pane ---------- */
function srcIcon(s){const k=s.kind;const map={pdf:["pdf","PDF"],docx:["txt","DOC"],text:["txt","TXT"],paste:["txt","TXT"],image:["img","IMG"],link:["link","URL"]};const [c,t]=map[k]||["txt","TXT"];return `<span class="src-ico ${c}">${t}</span>`}
function renderSourcesList(){
  const b=$("#srcBody");if(!b)return;const on=UI.srcs.filter(s=>s.on!==false).length;
  const busy=[...UI.busy.values()];
  b.innerHTML=`<button class="pill-btn wide" id="addSrc">${ic("plus")} Thêm nguồn</button>
   ${UI.srcs.length?`<div class="selall">Chọn tất cả <input type="checkbox" class="chk" id="selAll" ${on===UI.srcs.length?"checked":""}></div>`:""}
   ${UI.srcs.map(s=>`<div class="src-item">${srcIcon(s)}<button class="name" data-view="${esc(s.id)}" title="${esc(s.name)}">${esc(s.name)}</button><input type="checkbox" class="chk" data-on="${esc(s.id)}" ${s.on!==false?"checked":""} aria-label="Dùng nguồn ${esc(s.name)}"></div>`).join("")}
   ${busy.map(x=>`<div class="src-busy"><span class="spin"></span>${esc(x)}</div>`).join("")}
   ${!UI.srcs.length&&!busy.length?`<div class="pad" style="text-align:center;color:var(--muted);font-size:14px">${ic("file")}<p>Các nguồn đã lưu sẽ xuất hiện ở đây.<br>Bấm <b>Thêm nguồn</b> để tải PDF, ZIP từ Moodle, văn bản hoặc liên kết.</p></div>`:""}`;
  $("#addSrc").onclick=()=>addSourceDialog();
  const sa=$("#selAll");if(sa)sa.onchange=async()=>{for(const s of UI.srcs)if((s.on!==false)!==sa.checked)await Store.patch(s.id,{on:sa.checked})};
  $$("[data-on]",b).forEach(x=>x.onchange=()=>Store.patch(x.dataset.on,{on:x.checked}));
  $$("[data-view]",b).forEach(x=>x.onclick=()=>viewSource(x.dataset.view));
  const n=$("#srcN");if(n)n.textContent=on+" nguồn";
  const sc=$("#chatScope");if(sc)sc.textContent=on?`Trả lời dựa trên ${on} nguồn đã chọn`:"";
}
function addSourceDialog(){
  openModal({title:"Thêm nguồn",small:true,body:`<div class="form">
    <label class="drop" id="dz"><span>${ic("upload")}</span><b>Tải tệp lên</b><span>Kéo thả hoặc bấm để chọn · PDF, DOCX, TXT, MD, PNG/JPG, ZIP (Moodle)</span><input type="file" id="fpick" multiple accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.zip" hidden></label>
    <div class="how"><b>${ic("school")} Nhập từ VGU Moodle</b><ol><li>Trên Moodle, mở thư mục tài liệu của môn → <i>Download folder</i> để tải ZIP.</li><li>Thả tệp ZIP vào ô phía trên. Tên thư mục con được giữ trong tên nguồn.</li></ol><span class="muted" style="font-size:12.5px">Moodle chưa có trình kết nối cho Claude, nên chưa thể đọc khóa học trực tiếp bằng tài khoản Moodle.</span></div>
    <div class="row3">
      <div class="field"><label for="pasteT">Dán văn bản</label><textarea class="input" id="pasteT" placeholder="Dán nội dung bài giảng, ghi chép…"></textarea><input class="input" id="pasteN" placeholder="Tên nguồn (tùy chọn)"><button class="btn" id="pasteOk">${ic("text")} Thêm văn bản</button></div>
      <div class="field"><label for="lnk">Liên kết (YouTube, trang Moodle, bài báo)</label><input class="input" type="url" id="lnk" placeholder="https://…"><input class="input" id="lnkN" placeholder="Mô tả ngắn: video về gì"><button class="btn" id="lnkOk">${ic("link")} Lưu liên kết</button><span class="muted" style="font-size:12px">Sổ Học không tải được nội dung trang web; AI chỉ biết mô tả bạn nhập.</span></div>
    </div></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Xong</button>`});
  const dz=$("#dz"),fp=$("#fpick");
  fp.onchange=()=>{ingestFiles([...fp.files]);closeModal()};
  ["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add("over")}));
  ["dragleave","drop"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove("over")}));
  dz.addEventListener("drop",e=>{ingestFiles([...e.dataTransfer.files]);closeModal()});
  $("#pasteOk").onclick=async()=>{const t=$("#pasteT").value.trim();if(!t){toast("Chưa có văn bản");return}closeModal();await saveSource({name:$("#pasteN").value.trim()||("Văn bản đã dán "+new Date().toLocaleTimeString("vi-VN")),kind:"paste",text:t});afterIngest()};
  $("#lnkOk").onclick=async()=>{const u=$("#lnk").value.trim();if(!/^https?:\/\//.test(u)){toast("Liên kết cần bắt đầu bằng https://");return}const d=$("#lnkN").value.trim();closeModal();await saveSource({name:d||u,kind:"link",url:u,text:"Liên kết người học lưu: "+u+(d?"\nMô tả của người học: "+d:"")});afterIngest()};
}

/* ---------- ingest ---------- */
async function extractPdf(buf){
  if(!window.pdfjsLib){await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js");try{pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"}catch(e){}}
  const pdf=await pdfjsLib.getDocument({data:new Uint8Array(buf)}).promise;let out="";
  for(let p=1;p<=Math.min(pdf.numPages,150);p++){const pg=await pdf.getPage(p);const tc=await pg.getTextContent();let line="",last=null;for(const it of tc.items){const y=it.transform?it.transform[5]:0;if(last!==null&&Math.abs(y-last)>4)line+="\n";line+=it.str+(it.hasEOL?"\n":" ");last=y}out+=`\n[Trang ${p}]\n`+line.replace(/[ \t]+\n/g,"\n")}
  return out.trim();
}
async function extractDocx(buf){await loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js");const r=await mammoth.extractRawText({arrayBuffer:buf});return r.value||""}
const kindOf=n=>/\.pdf$/i.test(n)?"pdf":/\.docx$/i.test(n)?"docx":/\.(png|jpe?g|webp)$/i.test(n)?"image":/\.zip$/i.test(n)?"zip":/\.(txt|md|csv|vhd|vhdl|v|sv|c|h|py)$/i.test(n)?"text":null;
async function ingestFiles(files){
  const nb=UI.cur;if(!nb)return;let added=0;
  for(const f of files){
    const k=kindOf(f.name);if(!k){toast("Bỏ qua "+f.name+": định dạng chưa hỗ trợ");continue}
    if(f.size>40e6){toast(f.name+" lớn hơn 40 MB");continue}
    const key=mkid("busy");UI.busy.set(key,"Đang đọc "+f.name+"…");renderSources();
    try{
      if(k==="zip"){added+=await ingestZip(f,key)}
      else{await ingestOne(f.name,k,await f.arrayBuffer(),f.type);added++}
    }catch(e){console.error(e);toast("Không đọc được "+f.name)}
    UI.busy.delete(key);renderSources();
  }
  if(added)afterIngest();
}
async function ingestZip(f,key){
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
  const zip=await JSZip.loadAsync(await f.arrayBuffer());let n=0;
  const entries=Object.values(zip.files).filter(e=>!e.dir&&kindOf(e.name)&&kindOf(e.name)!=="zip"&&!/(^|\/)(__MACOSX|\.)/.test(e.name));
  for(const e of entries.slice(0,60)){UI.busy.set(key,`Moodle ZIP: ${n+1}/${entries.length} · ${e.name}`);renderSources();
    try{const buf=await e.async("arraybuffer");await ingestOne(e.name.replace(/\//g," › "),kindOf(e.name),buf);n++}catch(err){console.warn(err)}}
  if(entries.length>60)toast("Chỉ nhập 60 tệp đầu tiên trong ZIP");
  return n;
}
async function ingestOne(name,kind,buf,mime){
  let text="",blob=null;
  if(kind==="pdf"){text=await extractPdf(buf);blob=new Blob([buf],{type:"application/pdf"})}
  else if(kind==="docx"){text=await extractDocx(buf)}
  else if(kind==="image"){const ext=name.split(".").pop().toLowerCase();blob=new Blob([buf],{type:mime||("image/"+(ext==="jpg"?"jpeg":ext))});text="(Ảnh — AI xem trực tiếp khi nguồn này được chọn)"}
  else{text=new TextDecoder().decode(buf)}
  if(kind==="pdf"&&text.replace(/\[Trang \d+\]/g,"").trim().length<40)toast(name+": PDF có vẻ là bản scan, không trích được chữ");
  await saveSource({name,kind,text,blob});
}
async function saveSource({name,kind,text,blob,url}){
  const nb=UI.cur;const id=mkid("src");let assetId=null,assetUrl=null;
  if(blob){UI.blobCache.set(id,blob);if(P.assets&&blob.size<20e6){try{const a=await P.assets.upload(blob);assetId=a.id;assetUrl=a.url}catch(e){console.warn("asset",e)}}}
  const CH=60000,chunks=[];for(let i=0;i<text.length&&chunks.length<12;i+=CH)chunks.push(text.slice(i,i+CH));
  for(let i=0;i<chunks.length;i++)await Store.put(`txt-${id}-${i}`,{type:"txt",nb:nb.id,src:id,n:i,text:chunks[i]});
  UI.textCache.set(id,chunks.join(""));
  await Store.put(id,{type:"src",nb:nb.id,name,kind,chars:text.length,chunks:chunks.length,truncated:text.length>CH*12,assetId,assetUrl,url:url||null,on:true,created:Date.now()});
  const cnt=(await Store.query({nb:nb.id,type:"src"})).length;await Store.patch(nb.id,{srcCount:cnt,updated:Date.now()});
}
async function afterIngest(){
  const nb=UI.cur;if(!nb)return;toast("Đã thêm nguồn");
  if(P.sample&&UI.srcs.length)genOverview();
}
async function sourceText(s){
  if(UI.textCache.has(s.id))return UI.textCache.get(s.id);
  let t="";for(let i=0;i<(s.chunks||0);i++){const d=await Store.get(`txt-${s.id}-${i}`);if(d)t+=d.text}
  UI.textCache.set(s.id,t);return t;
}
async function sourceBlob(s){
  if(UI.blobCache.has(s.id))return UI.blobCache.get(s.id);
  if(s.assetUrl){try{const r=await fetch(s.assetUrl);if(r.ok){const b=await r.blob();UI.blobCache.set(s.id,b);return b}}catch(e){}}
  return null;
}
async function viewSource(id){
  const s=UI.srcs.find(x=>x.id===id);if(!s)return;UI.reopen=()=>viewSource(id);
  openModal({title:s.name,body:`<div class="pad"><div class="loading" style="height:auto">Đang tải…</div></div>`,foot:`${s.assetUrl&&s.kind!=="image"?`<a class="pill-btn" href="${esc(s.assetUrl)}" target="_blank" rel="noopener noreferrer">${ic("ext")} Mở tệp gốc</a>`:""}${s.url?`<a class="pill-btn" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${ic("ext")} Mở liên kết</a>`:""}<div class="grow"></div><button class="pill-btn" id="srcDel" style="color:var(--bad)">${ic("trash")} Xóa nguồn</button>`});
  $("#srcDel").onclick=()=>confirmDialog("Xóa nguồn?",s.name,"Xóa",async()=>{for(let i=0;i<(s.chunks||0);i++)await Store.del(`txt-${s.id}-${i}`).catch(()=>{});if(s.assetId&&P.assets)await P.assets.delete(s.assetId).catch(()=>{});await Store.del(s.id);const cnt=(await Store.query({nb:UI.cur.id,type:"src"})).length;Store.patch(UI.cur.id,{srcCount:cnt})});
  const body=UI.vb;
  if(s.kind==="image"){const b=await sourceBlob(s);body.innerHTML=`<div class="pad" style="display:grid;place-items:center">${b?`<img src="${URL.createObjectURL(b)}" alt="${esc(s.name)}" style="max-height:70vh;border-radius:12px">`:`<p class="muted">Ảnh chỉ có trong phiên đã tải lên.</p>`}</div>`;return}
  const t=await sourceText(s);
  body.innerHTML=`<div class="pad"><div class="md" style="max-width:86ch;white-space:pre-wrap;font-size:14.5px">${esc(t.slice(0,200000))}${s.truncated?"\n\n(… tài liệu dài, chỉ phần đầu được lưu làm nguồn)":""}</div></div>`;
}

/* =====================================================================
   NGỮ CẢNH NGUỒN cho AI
   ===================================================================== */
async function sourceContext(ids,budget=170000){
  const list=UI.srcs.filter(s=>ids?ids.includes(s.id):s.on!==false);
  const texts=[],imgs=[];
  for(const s of list){if(s.kind==="image"){const b=await sourceBlob(s);if(b)imgs.push(b)}texts.push(await sourceText(s))}
  const total=texts.reduce((a,t)=>a+t.length,0)||1;
  const parts=list.map((s,i)=>{const share=Math.max(4000,Math.floor(budget*texts[i].length/total));const t=texts[i].length>share?texts[i].slice(0,share)+"\n…(cắt bớt)":texts[i];return `[${i+1}] ${s.name}\n${t}`});
  return {labels:list.map(s=>s.name),ids:list.map(s=>s.id),text:parts.join("\n\n"),images:imgs.slice(0,4)};
}
const RULES=`Bạn là trợ lý học tập cho sinh viên ngành Kỹ thuật Điện tử – Máy tính.
QUY TẮC BẮT BUỘC:
1. Chỉ dùng thông tin có trong các NGUỒN được đánh số bên dưới (và ảnh đính kèm nếu có). Không bịa số liệu, công thức, tên người, tên video hay đường link.
2. Gắn số nguồn dạng [n] ngay sau ý lấy từ nguồn n.
3. Nếu nguồn không đủ, nói rõ "Nguồn hiện có chưa đề cập". Có thể bổ sung kiến thức nền phổ thông nhưng phải ghi "(kiến thức chung, ngoài nguồn)".
4. Viết rõ ràng, chính xác về kỹ thuật.
5. Ký hiệu và công thức viết bằng LaTeX: trong câu dùng $...$, công thức riêng dòng dùng $$...$$. Khi tính toán hoặc biến đổi, viết TỪNG BƯỚC, mỗi bước một dòng $$...$$ liên tiếp (công thức → thế số → kết quả kèm đơn vị); bước cuối là kết quả. Trong JSON nhớ escape dấu \\ thành \\\\.`;
function aiErr(e){const m={not_granted:"Bạn chưa cho phép trang dùng Claude.",rate_limited:"Đã gửi quá nhiều yêu cầu. Thử lại sau ít phút.",prompt_too_large:"Nguồn quá dài. Bỏ chọn bớt nguồn rồi thử lại.",images_unavailable:"Khung xem này chưa gửi được ảnh. Bỏ chọn nguồn ảnh.",invalid_json:"AI trả về sai định dạng. Thử tạo lại.",refused:"Yêu cầu không được thực hiện. Hãy diễn đạt lại.",cancelled:"Đã dừng.",sampling_disabled:"Claude không khả dụng cho tài khoản này."};return m[e&&e.code]||"Kết nối bị gián đoạn. Thử lại."}

/* ---------- overview (summary + suggested questions) ---------- */
async function genOverview(){
  const nb=UI.cur;if(!nb||!P.sample)return;
  UI.overviewBusy=true;renderChat();
  try{
    const ctx=await sourceContext();
    const r=await P.sample.json(`${rulesFor()}\n\nNHIỆM VỤ: Viết một đoạn tóm tắt 4–6 câu (tiếng Việt) giới thiệu các nguồn, in đậm thuật ngữ chính bằng **…**; đề xuất tên ngắn cho sổ học (≤ 8 từ); và 3 câu hỏi gợi ý người học nên hỏi.\nTrả về CHỈ JSON: {"title":"…","summary":"…","questions":["…","…","…"]}\n\nNGUỒN:\n${ctx.text}`,{modelTier:"default",...(ctx.images.length?{images:ctx.images}:{})});
    const patch={summary:String(r.summary||""),questions:(r.questions||[]).slice(0,3).map(String),updated:Date.now()};
    if(/chưa đặt tên/.test(nb.title)&&r.title)patch.title=String(r.title).slice(0,90);
    await Store.patch(nb.id,patch);
  }catch(e){toast("Tóm tắt nguồn: "+aiErr(e))}
  UI.overviewBusy=false;renderChat();
}

/* =====================================================================
   TRÒ CHUYỆN
   ===================================================================== */
function mdText(s,labels){return esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g,(m,g)=>g.split(/\s*[,–-]\s*/).map(n=>`<span class="cite" title="${esc((labels||[])[+n-1]||"Nguồn "+n)}">${n}</span>`).join(""))}
function mdInline(s,labels){return String(s??"").split(/(\$\$[^$]+\$\$|\$[^$\n]+\$|\\\([^\n]+?\\\))/g).map((p,i)=>{if(!(i%2))return mdText(p,labels);const d=p.startsWith("$$");const t=d?p.slice(2,-2):p.startsWith("\\(")?p.slice(2,-2):p.slice(1,-1);return tex(t,d)}).join("")}
function sheet(steps){return `<div class="hw-sheet">${steps.map((t,i)=>`<div class="step ${i===steps.length-1&&steps.length>1?"final":""}" style="--i:${i}"><span class="n">${steps.length>1?i+1:""}</span><span>${tex(t,false,true)}</span></div>`).join("")}</div>`}
function mdBlock(t,labels){
  const lines=String(t||"").split("\n");let out="",list=null,code=null,steps=[],multi=null;
  const flush=()=>{if(list){out+=`<${list.t}>${list.items.map(i=>`<li>${mdInline(i,labels)}</li>`).join("")}</${list.t}>`;list=null}};
  const fsheet=()=>{if(steps.length){out+=sheet(steps);steps=[]}};
  for(const raw of lines){const l=raw.trimEnd();
    if(multi!==null){if(/^\s*(\$\$|\\\])\s*$/.test(l)){steps.push(multi.trim());multi=null}else multi+=" "+l;continue}
    if(/^```/.test(l)){if(code!==null){out+=`<pre>${esc(code)}</pre>`;code=null}else{flush();fsheet();code=""}continue}
    if(code!==null){code+=raw+"\n";continue}
    let m;
    if((m=l.match(/^\s*(?:\$\$|\\\[)(.+?)(?:\$\$|\\\])\s*[.,;]?\s*$/))){flush();steps.push(m[1]);continue}
    if(/^\s*(\$\$|\\\[)\s*$/.test(l)){flush();multi="";continue}
    fsheet();
    if((m=l.match(/^\s*[-*•]\s+(.*)/))){if(!list||list.t!=="ul"){flush();list={t:"ul",items:[]}}list.items.push(m[1]);continue}
    if((m=l.match(/^\s*\d+[.)]\s+(.*)/))){if(!list||list.t!=="ol"){flush();list={t:"ol",items:[]}}list.items.push(m[1]);continue}
    flush();
    if((m=l.match(/^#{1,3}\s+(.*)/))){out+=`<h4>${mdInline(m[1],labels)}</h4>`;continue}
    if(l.trim())out+=`<p>${mdInline(l,labels)}</p>`;
  }
  flush();fsheet();if(multi)out+=sheet([multi]);if(code!==null)out+=`<pre>${esc(code)}</pre>`;return out;
}
function heroCanvas(c,seed){const g=c.getContext("2d"),w=c.width=520,h=c.height=400;let s=[...seed].reduce((a,ch)=>(a*31+ch.charCodeAt(0))>>>0,9);const r=()=>(s=(s*1664525+1013904223)>>>0)/4294967296;g.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--muted");g.lineWidth=14;g.lineCap="round";g.beginPath();g.moveTo(40,h-40);for(let i=0;i<5;i++)g.quadraticCurveTo(80+i*90+r()*30,40+r()*200,120+i*90,h-60-r()*120);g.stroke()}
function renderChat(){
  const box=$("#chatIn");if(!box||!UI.cur)return;const nb=UI.nbs.find(n=>n.id===UI.cur.id)||UI.cur;UI.cur=nb;
  const labels=UI.srcs.filter(s=>s.on!==false).map(s=>s.name);
  const qs=(nb.questions||[]);
  box.innerHTML=`<div class="hero">${glyph(nb.id,52)}<h1>${esc(nb.title)}</h1><small>${nb.srcCount||0} nguồn · ${dfmt(nb.created||Date.now())}</small><canvas aria-hidden="true"></canvas></div>
   ${UI.overviewBusy?`<div class="src-busy" style="padding:0"><span class="spin"></span>Đang đọc và tóm tắt các nguồn…</div>`:""}
   ${nb.summary?`<div class="summary">${mdInline(nb.summary,labels)}</div><div class="acts"><button class="ghost" id="sumNote">${ic("pin")} Lưu vào ghi chú</button><button class="ghost ic" id="sumCopy" aria-label="Sao chép">${ic("copy")}</button><button class="ghost" id="sumRe">${ic("spark")} Tóm tắt lại</button></div>`
     :(!UI.overviewBusy?`<div class="summary muted">${UI.srcs.length?"Chưa có tóm tắt. Bấm để AI đọc các nguồn và tóm tắt.":"Thêm nguồn ở cột bên trái để bắt đầu. AI sẽ tóm tắt và gợi ý câu hỏi."}</div>${UI.srcs.length?`<div><button class="pill-btn" id="sumRe">${ic("spark")} Tóm tắt nguồn</button></div>`:""}`:"")}
   ${qs.length&&!UI.chat.length?`<div class="suggest">${qs.map((q,i)=>`<button data-q="${i}"><span>${esc(q)}</span><span>↳</span></button>`).join("")}</div>`:""}
   ${UI.chat.map((m,i)=>m.role==="user"?`<div class="msg me">${esc(m.content)}</div>`:`<div class="msg ai" data-i="${i}">${m.content?mdBlock(m.content,m.labels||labels):`<span class="src-busy" style="padding:0"><span class="spin"></span>Đang đọc nguồn…</span>`}${m.content&&!m.pending?`<div class="acts"><button class="ghost" data-note="${i}">${ic("pin")} Lưu vào ghi chú</button><button class="ghost ic" data-copy="${i}" aria-label="Sao chép">${ic("copy")}</button></div>`:""}</div>`).join("")}
   ${UI.chat.length?`<div><button class="ghost" id="chatClear" style="color:var(--muted)">${ic("trash")} Xóa cuộc trò chuyện</button></div>`:""}`;
  heroCanvas($(".hero canvas",box),nb.id);
  $$("[data-q]",box).forEach(b=>b.onclick=()=>chatSend(qs[+b.dataset.q]));
  const sn=$("#sumNote");if(sn)sn.onclick=()=>addNote("Tóm tắt nguồn",nb.summary);
  const sc=$("#sumCopy");if(sc)sc.onclick=()=>copyText(nb.summary);
  const sr=$("#sumRe");if(sr)sr.onclick=()=>P.sample?genOverview():toast("Trợ lý AI chưa khả dụng ở khung xem này");
  $$("[data-note]",box).forEach(b=>b.onclick=()=>addNote("Từ trò chuyện",UI.chat[+b.dataset.note].content));
  $$("[data-copy]",box).forEach(b=>b.onclick=()=>copyText(UI.chat[+b.dataset.copy].content));
  const cc=$("#chatClear");if(cc)cc.onclick=()=>{UI.chat=[];Store.put("chat-"+UI.cur.id,{type:"chat",nb:UI.cur.id,turns:[]});renderChat()};
  const sb=$("#sendBtn");if(sb){sb.innerHTML=ic(UI.streaming?"stop":"send");sb.setAttribute("aria-label",UI.streaming?"Dừng":"Gửi")}
}
function copyText(t){try{navigator.clipboard.writeText(t).then(()=>toast("Đã sao chép"),()=>toast("Không sao chép được — hãy chọn và sao chép thủ công"))}catch(e){toast("Không sao chép được")}}
async function chatSend(text){
  if(!UI.cur)return;if(innerWidth<=1100)mobPane("paneChat");
  if(!P.sample){UI.chat.push({role:"user",content:text},{role:"assistant",content:"Trợ lý AI chỉ hoạt động khi mở trang trong ứng dụng Claude và bạn cho phép trang dùng Claude."});renderChat();return}
  const ctx=await sourceContext();
  if(!ctx.labels.length){toast("Chọn ít nhất một nguồn");return}
  UI.chat.push({role:"user",content:text});const ai={role:"assistant",content:"",pending:true,labels:ctx.labels};UI.chat.push(ai);
  const ctl=new AbortController();UI.streaming=ctl;renderChat();scrollChat();
  const turns=[{role:"user",content:`${rulesFor()}\nMỨC ĐỘ: ${DEPTH[UI.chatDepth].d}\nĐịnh dạng: đoạn văn ngắn, gạch đầu dòng khi liệt kê, **in đậm** thuật ngữ, mã nguồn trong \`\`\`.\n\nNGUỒN:\n${ctx.text}`},...UI.chat.slice(0,-1).filter(m=>m.content).slice(-10).map(m=>({role:m.role,content:m.content}))];
  if(turns[turns.length-1].role!=="user")turns.push({role:"user",content:text});
  try{
    const r=await P.sample(turns,{cache:false,signal:ctl.signal,...(ctx.images.length?{images:ctx.images}:{}),onText:({text})=>{ai.content=text;const el=$(`.msg.ai[data-i="${UI.chat.length-1}"]`);if(el){el.innerHTML=mdBlock(text,ctx.labels);scrollChat()}}});
    ai.content=r.text+(r.truncated?"\n\n(Câu trả lời bị cắt ngắn — hãy hỏi hẹp hơn.)":"");
  }catch(e){ai.content=(e&&e.text?e.text+"\n\n":"")+aiErr(e)}
  ai.pending=false;UI.streaming=null;
  try{await Store.put("chat-"+UI.cur.id,{type:"chat",nb:UI.cur.id,turns:UI.chat.slice(-40).map(m=>({role:m.role,content:m.content,labels:m.labels||null}))})}catch(e){}
  renderChat();scrollChat();
}
function scrollChat(){const s=$("#chatScroll");if(s)s.scrollTop=s.scrollHeight}

/* ---------- notes ---------- */
async function addNote(title,body){if(!UI.cur)return;await Store.put(mkid("note"),{type:"note",nb:UI.cur.id,title,body:body||"",created:Date.now()});toast("Đã lưu vào ghi chú")}
function openNote(id){
  const n=UI.notes.find(x=>x.id===id);if(!n)return;
  openModal({title:"Ghi chú",small:true,body:`<div class="form"><input class="input" id="nT" value="${esc(n.title)}"><textarea class="input" id="nB" style="min-height:320px">${esc(n.body)}</textarea></div>`,foot:`<button class="pill-btn" id="nDel" style="color:var(--bad)">${ic("trash")} Xóa</button><button class="pill-btn" id="nAsk">${ic("chat")} Hỏi AI về ghi chú</button><div class="grow"></div><button class="pill-btn primary" id="nSave">Lưu</button>`});
  $("#nSave").onclick=async()=>{await Store.put(id,{...n,id:undefined,title:$("#nT").value,body:$("#nB").value});closeModal();toast("Đã lưu")};
  $("#nDel").onclick=async()=>{await Store.del(id);closeModal()};
  $("#nAsk").onclick=()=>{closeModal();chatSend("Giải thích và kiểm tra giúp tôi ghi chú sau dựa trên nguồn:\n\n"+$("#nB").value.slice(0,4000))};
}

/* =====================================================================
   MODAL
   ===================================================================== */
function effMode(){const m=UI.vmode;if(innerWidth<=720)return "full";if((m==="dock"||m==="split")&&(UI.view!=="nb"||innerWidth<=1100))return "modal";return m}
function openModal(o){
  if(o.small)return openDialog(o);
  closeViewer(true);
  const mode=effMode();UI.vopen=mode;
  const modes=[["dock","Ghim vào cột Studio","panel"],["split","Tách thành cột riêng","split"],["modal","Cửa sổ nổi","win"],["full","Toàn màn hình","full"]].filter(([m])=>(m!=="dock"&&m!=="split")||(UI.view==="nb"&&innerWidth>1100));
  const mb=UI.reopen&&innerWidth>720?`<div class="vmodes">${modes.map(([m,l,i])=>`<button class="ghost ic" data-vm="${m}" aria-pressed="${m===mode}" title="${l}" aria-label="${l}">${ic(i)}</button>`).join("")}</div>`:"";
  const inner=`<div class="mhead">${mode==="dock"?`<div class="crumb"><button class="ghost ic" data-close aria-label="Quay lại Studio">${ic("back")}</button><span>Studio ›</span><b>${esc(o.title)}</b></div>`:`<h2>${esc(o.title)}</h2>`}${o.actions||""}${mb}${mode==="dock"?"":`<button class="ghost ic" data-close aria-label="Đóng">${ic("close")}</button>`}</div><div class="mbody">${o.body}</div>${o.foot?`<div class="mfoot">${o.foot}</div>`:""}`;
  if(mode==="dock"){UI.lay.coll.paneStudio=false;if(UI.lay.max&&UI.lay.max!=="paneStudio")UI.lay.max=null;applyLayout();const ph=$("#paneStudio .pane-h");if(ph)ph.hidden=true;$("#studioBody").innerHTML=`<div class="vhost" id="vh">${inner}</div>`;UI.vroot=$("#vh");if(innerWidth<=1100)mobPane("paneStudio")}
  else if(mode==="split"){UI.splitOpen=true;applyLayout();const h=$("#splitHost");h.innerHTML=inner;UI.vroot=h}
  else{const m=$("#modal"),c=$("#mcard");m.classList.toggle("full",mode==="full");c.className="mcard vhost"+(mode==="full"?" full":"");c.innerHTML=inner;m.hidden=false;UI.vroot=c}
  UI.vb=$(".mbody",UI.vroot);
  $$("[data-close]",UI.vroot).forEach(b=>b.onclick=()=>closeViewer());
  $$("[data-vm]",UI.vroot).forEach(b=>b.onclick=()=>{UI.vmode=b.dataset.vm;local.set("vmode",UI.vmode);const r=UI.reopen;closeViewer(true);if(r)r()});
  return UI.vroot;
}
function openDialog({title,body,foot}){
  const d=$("#dlg"),c=$("#dcard");c.innerHTML=`<div class="mhead"><h2>${esc(title)}</h2><button class="ghost ic" data-dclose aria-label="Đóng">${ic("close")}</button></div><div class="mbody">${body}</div>${foot?`<div class="mfoot">${foot}</div>`:""}`;
  d.hidden=false;$$("[data-dclose],[data-close]",c).forEach(b=>b.onclick=()=>closeDialog());return c;
}
function closeDialog(){$("#dlg").hidden=true;$("#dcard").innerHTML=""}
function closeViewer(silent){
  if(UI.modalCleanup){try{UI.modalCleanup()}catch(e){}UI.modalCleanup=null}
  stopSpeech();const m=UI.vopen;if(!silent)UI.reopen=null;if(!m)return;
  UI.vopen=null;UI.vb=null;UI.vroot=null;
  if(m==="dock"){const ph=$("#paneStudio .pane-h");if(ph)ph.hidden=false;renderStudio()}
  else if(m==="split"){UI.splitOpen=false;const h=$("#splitHost");if(h)h.innerHTML="";applyLayout()}
  else{$("#modal").hidden=true;$("#modal").classList.remove("full");$("#mcard").innerHTML=""}
}
function closeModal(){if(!$("#dlg").hidden)closeDialog();else closeViewer()}
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeViewer()});
$("#dlg").addEventListener("click",e=>{if(e.target.id==="dlg")closeDialog()});
document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;if(!$("#dlg").hidden)closeDialog();else if(UI.vopen)closeViewer()});
function stopAll(){closeDialog();closeViewer();if(UI.streaming){UI.streaming.abort();UI.streaming=null}}

/* ---------- speech ---------- */
let speechToken=0;
function stopSpeech(){speechToken++;try{speechSynthesis.cancel()}catch(e){}}
function voiceFor(lang){try{const vs=speechSynthesis.getVoices();return vs.find(v=>v.lang&&v.lang.toLowerCase().startsWith(lang))||null}catch(e){return null}}
function speak(text,{lang="vi",pitch=1,rate=1}={}){
  return new Promise((res,rej)=>{
    try{const u=new SpeechSynthesisUtterance(text);u.lang=lang==="en"?"en-US":"vi-VN";u.pitch=pitch;u.rate=rate;u.volume=UI.mute?0:Math.max(0,Math.min(1,UI.vol??1));const v=voiceFor(lang);if(v)u.voice=v;
      u.onend=()=>res(true);u.onerror=()=>res(false);speechSynthesis.speak(u)}catch(e){rej(e)}
  });
}
function hasSpeech(){try{return "speechSynthesis" in window}catch(e){return false}}

/* ---------- 3D model metadata ---------- */
const MODELS = {
 resistor:{name:"Điện trở than 1 kΩ ±5 %", parts:[["Thân gốm phủ than","Vật liệu tạo điện trở"],["Vòng nâu – đen – đỏ","1, 0, ×100 → 1 000 Ω"],["Vòng vàng kim","Dung sai ±5 %"],["Chân thép mạ thiếc","Hàn hoặc cắm breadboard"]]},
 capacitor:{name:"Tụ hóa nhôm (electrolytic)", parts:[["Vỏ nhôm bọc nhựa","Chứa lá nhôm và chất điện phân"],["Vạch sọc sáng","Đánh dấu cực âm (−)"],["Chân dài","Cực dương (+)"],["Rãnh chữ thập trên nắp","Van xả an toàn khi quá áp"]]},
 dip8:{name:"IC vỏ DIP-8 (ví dụ op-amp)", label:"OP-AMP", pins:8, parts:[["Khấc định hướng","Chân 1 nằm bên trái khấc"],["8 chân, bước 2,54 mm","Cắm vừa breadboard"],["Thân epoxy đen","Bọc khuôn bán dẫn bên trong"]]},
 dip14:{name:"IC 74HC00 vỏ DIP-14", label:"74HC00", pins:14, parts:[["4 cổng NAND","2 đầu vào mỗi cổng"],["Chân 7 = GND, 14 = VCC","Quy ước họ 74xx"],["Khấc + chấm tròn","Chỉ chân số 1"]]},
 dip16:{name:"IC 74LS283 vỏ DIP-16 (bộ cộng 4 bit)", label:"74LS283", pins:16, parts:[["Bộ cộng 4 bit","A1–A4, B1–B4, C0, C4"],["16 chân DIP","Chân 8 = GND, 16 = VCC"],["Khấc định hướng","Chỉ chân số 1"]]},
 led:{name:"LED 5 mm đỏ", parts:[["Thấu kính epoxy","Khuếch tán ánh sáng"],["Chân dài = Anode (+)","Nối về phía nguồn qua điện trở"],["Mép vát trên đế","Phía Cathode (−)"],["Vf ≈ 1,8–2,2 V (đỏ)","Điện áp rơi thuận điển hình"]]},
 qfp:{name:"Vi xử lý vỏ QFP-64", label:"MCU", parts:[["Vỏ QFP","Chân ở cả 4 cạnh, hàn dán bề mặt"],["Chấm tròn góc","Đánh dấu chân số 1"],["Lõi silicon bên trong","CPU, Flash, RAM, ngoại vi"]]}
};


function labelTex(T,text){const c=document.createElement("canvas");c.width=512;c.height=128;const g=c.getContext("2d");g.fillStyle="#1b1b1d";g.fillRect(0,0,512,128);g.fillStyle="#c9c9c9";g.font="600 64px JetBrains Mono, monospace";g.textAlign="center";g.textBaseline="middle";g.fillText(text,256,64);const t=new T.CanvasTexture(c);return t}
function buildModel(T,key){
  const G=new T.Group();
  const mat=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.55,metalness:.05},o));
  const metal=mat(0xb9bec4,{metalness:.85,roughness:.3});
  const cyl=(r1,r2,h,m,seg=40)=>new T.Mesh(new T.CylinderGeometry(r1,r2,h,seg),m);
  const box=(x,y,z,m)=>new T.Mesh(new T.BoxGeometry(x,y,z),m);
  if(key==="resistor"){
    const body=cyl(.36,.36,1.9,mat(0xd8c49b));body.rotation.z=Math.PI/2;G.add(body);
    [-1,1].forEach(s=>{const e=new T.Mesh(new T.SphereGeometry(.42,32,16),mat(0xd8c49b));e.scale.set(.55,1,1);e.position.x=s*.95;G.add(e);
      const lead=cyl(.035,.035,1.8,metal,12);lead.rotation.z=Math.PI/2;lead.position.x=s*1.95;G.add(lead)});
    [[-.62,0x6b3a1e],[-.32,0x111111],[-.02,0xc0392b],[.6,0xd4a82a]].forEach(([x,c])=>{const b=cyl(.375,.375,.13,mat(c,c===0xd4a82a?{metalness:.7,roughness:.3}:{}));b.rotation.z=Math.PI/2;b.position.x=x;G.add(b)});
  }else if(key==="capacitor"){
    const body=cyl(.62,.62,1.9,mat(0x1d3d82,{roughness:.35}));G.add(body);
    const stripe=new T.Mesh(new T.CylinderGeometry(.625,.625,1.86,40,1,true,-.35,.7),mat(0xc9ccd3,{side:T.DoubleSide}));G.add(stripe);
    const top=cyl(.58,.58,.04,metal);top.position.y=.96;G.add(top);
    [0,Math.PI/2].forEach(a=>{const g=box(1.0,.02,.05,mat(0x777b80));g.position.y=.985;g.rotation.y=a;G.add(g)});
    const l1=cyl(.035,.035,1.6,metal,12);l1.position.set(.25,-1.75,0);G.add(l1);
    const l2=cyl(.035,.035,1.1,metal,12);l2.position.set(-.25,-1.5,0);G.add(l2);
    G.position.y=.4;
  }else if(key==="led"){
    const lens=mat(0xff3b2f,{transparent:true,opacity:.72,roughness:.15,emissive:0x6a0d06});
    const c=cyl(.5,.5,.85,lens);c.position.y=.1;G.add(c);
    const dome=new T.Mesh(new T.SphereGeometry(.5,40,20,0,Math.PI*2,0,Math.PI/2),lens);dome.position.y=.52;G.add(dome);
    const fl=new T.Mesh(new T.CylinderGeometry(.58,.58,.12,40,1,false,.3,Math.PI*2-.6),lens);fl.position.y=-.36;G.add(fl);
    const die=box(.12,.06,.12,mat(0xffe08a,{emissive:0xffa000}));die.position.y=.25;G.add(die);
    const a=cyl(.03,.03,2.4,metal,12);a.position.set(.14,-1.5,0);G.add(a);
    const k=cyl(.03,.03,2.0,metal,12);k.position.set(-.14,-1.3,0);G.add(k);
    G.position.y=.5;
  }else if(key==="qfp"){
    const m=MODELS.qfp;const body=box(2.6,.3,2.6,mat(0x1b1b1d,{roughness:.7}));G.add(body);
    const lab=new T.Mesh(new T.PlaneGeometry(1.6,.4),new T.MeshStandardMaterial({map:labelTex(T,m.label),roughness:.8}));lab.rotation.x=-Math.PI/2;lab.position.y=.155;G.add(lab);
    const dot=cyl(.09,.09,.02,mat(0x333336));dot.position.set(-1.0,.16,-1.0);G.add(dot);
    for(let s=0;s<4;s++)for(let i=0;i<16;i++){const p=box(.07,.04,.36,metal);const off=-1.125+i*.15;
      if(s===0)p.position.set(off,-.08,1.45);if(s===1)p.position.set(off,-.08,-1.45);
      if(s===2){p.rotation.y=Math.PI/2;p.position.set(1.45,-.08,off)}if(s===3){p.rotation.y=Math.PI/2;p.position.set(-1.45,-.08,off)}G.add(p)}
    G.scale.setScalar(1.05);
  }else{ // DIP
    const m=MODELS[key];const n=m.pins/2, pitch=.254*1.6, len=n*pitch+.3;
    const body=box(len,.45,1.15,mat(0x1d1d20,{roughness:.75}));G.add(body);
    const notch=new T.Mesh(new T.CylinderGeometry(.14,.14,.47,24,1,false,0,Math.PI),mat(0x0d0d0e));notch.rotation.z=Math.PI/2;notch.rotation.x=Math.PI/2;notch.position.set(-len/2+.0,.0,0);
    const nc=cyl(.13,.13,.02,mat(0x0b0b0c));nc.position.set(-len/2+.12,.231,0);G.add(nc);
    const pin1=cyl(.07,.07,.02,mat(0x3a3a3e));pin1.position.set(-len/2+.38,.231,.34);G.add(pin1);
    const lab=new T.Mesh(new T.PlaneGeometry(len*.62,.32),new T.MeshStandardMaterial({map:labelTex(T,m.label),roughness:.8}));lab.rotation.x=-Math.PI/2;lab.position.set(.1,.232,0);G.add(lab);
    for(let i=0;i<n;i++)[-1,1].forEach(s=>{const x=-len/2+.3+i*pitch;
      const a=box(.14,.05,.18,metal);a.position.set(x,.05,s*.66);G.add(a);
      const b=box(.07,.75,.04,metal);b.position.set(x,-.32,s*.76);G.add(b)});
  }
  return G;
}


const FIG={
 ohm:()=>`<svg viewBox="0 0 220 150" role="img" aria-label="Nguồn 5V nối điện trở 1 kilô-ôm"><g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M40 30h140v40M180 110v10H40v-30M40 60V30"/><path d="M180 70l-8 4 16 6-16 6 16 6-16 6 8 4" stroke="var(--accent)"/><circle cx="40" cy="75" r="15"/></g><text x="35" y="70" font-size="12" fill="var(--ink)">+</text><text x="36" y="88" font-size="12" fill="var(--ink)">−</text><text x="8" y="80" font-size="12" fill="var(--muted)" font-family="var(--f-mono)">5V</text><text x="192" y="94" font-size="12" fill="var(--muted)" font-family="var(--f-mono)">1kΩ</text><text x="100" y="22" font-size="12" fill="var(--sig)" font-family="var(--f-mono)">I = 5mA →</text></svg>`,
 divider:()=>`<svg viewBox="0 0 220 170" role="img" aria-label="Sơ đồ mạch chia áp"><g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M110 10v15M110 75v20M110 145v15M110 85h50"/><path d="M110 25l-8 4 16 5-16 5 16 5-16 5 16 5-16 5 8 4" stroke="var(--accent)"/><path d="M110 95l-8 4 16 5-16 5 16 5-16 5 16 5-16 5 8 4" stroke="var(--accent)"/><path d="M100 160h20"/></g><circle cx="160" cy="85" r="3.5" fill="var(--sig)"/><text x="118" y="14" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">Vin</text><text x="70" y="55" font-size="12" fill="var(--muted)" font-family="var(--f-mono)">R1</text><text x="70" y="125" font-size="12" fill="var(--muted)" font-family="var(--f-mono)">R2</text><text x="166" y="89" font-size="12" fill="var(--sig)" font-family="var(--f-mono)">Vout</text></svg>`,
 rc:()=>{let d="";for(let i=0;i<=100;i++){const t=i/100*5;d+=(i?"L":"M")+(20+i*1.8)+" "+(130-110*(1-Math.exp(-t)))}return `<svg viewBox="0 0 220 160" role="img" aria-label="Đồ thị nạp tụ"><path d="M20 10v120h185" stroke="var(--muted)" fill="none"/><path d="${d}" stroke="var(--sig)" stroke-width="2.5" fill="none"/><path d="M56 130V60.5H20" stroke="var(--accent)" stroke-dasharray="3 3" fill="none"/><text x="50" y="146" font-size="11" fill="var(--ink)" font-family="var(--f-mono)">1τ</text><text x="22" y="56" font-size="11" fill="var(--accent)" font-family="var(--f-mono)">63%</text><text x="150" y="146" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">5τ</text></svg>`},
 opamp:()=>`<svg viewBox="0 0 230 150" role="img" aria-label="Mạch khuếch đại đảo"><g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M100 40v70l60-35z"/><path d="M20 55h20M40 55l4-8 6 16 6-16 6 16 6-16 4 8h14" stroke="var(--accent)"/><path d="M70 55V20h20"/><path d="M90 20l4-8 6 16 6-16 6 16 6-16 4 8h20v55" stroke="var(--accent)"/><path d="M160 75h40M100 95H80v20M72 115h16"/></g><text x="104" y="60" font-size="13" fill="var(--ink)">−</text><text x="104" y="100" font-size="13" fill="var(--ink)">+</text><text x="4" y="59" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">Vin</text><text x="38" y="78" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">Rin</text><text x="104" y="44" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">Rf</text><text x="186" y="70" font-size="11" fill="var(--sig)" font-family="var(--f-mono)">Vout</text></svg>`,
 inverter:()=>`<svg viewBox="0 0 200 170" role="img" aria-label="Cổng đảo dùng transistor"><g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M110 10v15"/><path d="M110 25l-8 4 16 5-16 5 16 5-16 5 8 4" stroke="var(--accent)"/><path d="M110 63v17M110 80h50M110 80l-18 15v30l18 15v15M92 100v20M60 110h32M100 150h20"/></g><path d="M104 136l6 4-7 1z" fill="var(--ink)"/><circle cx="160" cy="80" r="3.5" fill="var(--sig)"/><text x="118" y="14" font-size="11" fill="var(--ink)" font-family="var(--f-mono)">+5V</text><text x="40" y="114" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">A</text><text x="166" y="84" font-size="12" fill="var(--sig)" font-family="var(--f-mono)">Y=¬A</text></svg>`,
 adder:()=>`<svg viewBox="0 0 260 110" role="img" aria-label="Bộ cộng ripple carry 4 bit">${[0,1,2,3].map(i=>{const x=200-i*60;return `<rect x="${x}" y="30" width="44" height="40" rx="6" fill="var(--sig-soft)" stroke="var(--sig)"/><text x="${x+22}" y="55" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="var(--f-mono)">FA${i}</text><text x="${x+22}" y="20" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">A${i}B${i}</text><text x="${x+22}" y="92" text-anchor="middle" font-size="10" fill="var(--ink)" font-family="var(--f-mono)">S${i}</text>${i<3?`<path d="M${x} 50h-16" stroke="var(--accent)" stroke-width="2" marker-end="url(#ar)"/>`:""}`}).join("")}<defs><marker id="ar" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L6 3 0 6z" fill="var(--accent)"/></marker></defs><text x="2" y="54" font-size="10" fill="var(--accent)" font-family="var(--f-mono)">C4</text></svg>`,
 srlatch:()=>`<svg viewBox="0 0 220 150" role="img" aria-label="SR latch hai cổng NOR"><g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M70 20q30 0 50 20q-20 20-50 20q12-20 0-40z"/><path d="M70 90q30 0 50 20q-20 20-50 20q12-20 0-40z"/><circle cx="124" cy="40" r="4"/><circle cx="124" cy="110" r="4"/><path d="M128 40h40M128 110h40M20 30h54M20 120h54"/><path d="M150 40v20L60 85h14M150 110v-20L60 65v-15h14" stroke="var(--accent)"/></g><text x="6" y="34" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">R</text><text x="6" y="124" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">S</text><text x="172" y="44" font-size="12" fill="var(--sig)" font-family="var(--f-mono)">Q</text><text x="172" y="114" font-size="12" fill="var(--sig)" font-family="var(--f-mono)">Q̅</text></svg>`,
 led:()=>`<svg viewBox="0 0 230 120" role="img" aria-label="GPIO nối điện trở và LED"><g fill="none" stroke="var(--ink)" stroke-width="2"><rect x="10" y="40" width="44" height="40" rx="5"/><path d="M54 60h16"/><path d="M70 60l4-8 6 16 6-16 6 16 6-16 4 8h20" stroke="var(--accent)"/><path d="M128 48v24l20-12z"/><path d="M148 48v24M148 60h30v30M168 90h20"/></g><path d="M150 40l8-8M156 46l8-8" stroke="var(--accent)" stroke-width="1.6"/><text x="16" y="64" font-size="10" fill="var(--ink)" font-family="var(--f-mono)">GPIO</text><text x="84" y="88" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">270Ω</text><text x="126" y="98" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">LED</text></svg>`,
 spi:()=>`<svg viewBox="0 0 230 140" role="img" aria-label="Kết nối SPI master slave"><rect x="10" y="20" width="70" height="100" rx="8" fill="var(--sig-soft)" stroke="var(--sig)"/><rect x="150" y="20" width="70" height="100" rx="8" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="45" y="16" text-anchor="middle" font-size="11" fill="var(--ink)">Master</text><text x="185" y="16" text-anchor="middle" font-size="11" fill="var(--ink)">Slave</text>${[["SCLK","→"],["MOSI","→"],["MISO","←"],["CS̅","→"]].map(([n,d],i)=>`<path d="M80 ${40+i*22}h70" stroke="var(--ink)" stroke-width="1.6"/><text x="115" y="${36+i*22}" text-anchor="middle" font-size="10" fill="var(--ink)" font-family="var(--f-mono)">${n} ${d}</text>`).join("")}</svg>`,
 bus:()=>`<svg viewBox="0 0 240 160" role="img" aria-label="Các khối nối vào bus chung"><rect x="112" y="8" width="16" height="144" rx="3" fill="var(--trace)"/><text x="120" y="158" text-anchor="middle" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">BUS</text>${[["PC",20,"l"],["RAM",62,"l"],["IR",104,"l"],["A",20,"r"],["ALU",62,"r"],["B",104,"r"]].map(([n,y,s])=>{const x=s==="l"?14:150;return `<rect x="${x}" y="${y}" width="76" height="30" rx="5" fill="var(--panel)" stroke="var(--ink)"/><text x="${x+38}" y="${y+19}" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="var(--f-mono)">${n}</text><path d="M${s==="l"?90:150} ${y+15}h${s==="l"?22:-22}" stroke="var(--ink)" stroke-width="2"/>`}).join("")}</svg>`,
 pipe:()=>{const st=["IF","ID","EX","MEM","WB"],col={IF:"#4f8fd9",ID:"#8b6cd1",EX:"#d0743c",MEM:"#3b9b8f",WB:"#5e8a3a"};let o="";for(let i=0;i<4;i++)for(let j=0;j<5;j++){const x=34+(i+j)*26,y=18+i*28;o+=`<rect x="${x}" y="${y}" width="25" height="24" rx="3" fill="${col[st[j]]}"/><text x="${x+12.5}" y="${y+15}" text-anchor="middle" font-size="7.5" fill="#fff" font-family="var(--f-mono)">${st[j]}</text>`}for(let i=0;i<4;i++)o+=`<text x="4" y="${34+i*28}" font-size="9" fill="var(--muted)" font-family="var(--f-mono)">i${i+1}</text>`;return `<svg viewBox="0 0 270 135" role="img" aria-label="Biểu đồ pipeline 4 lệnh">${o}</svg>`},
 cache:()=>`<svg viewBox="0 0 240 90" role="img" aria-label="Chia địa chỉ tag index offset"><rect x="10" y="20" width="120" height="34" fill="var(--accent-soft)" stroke="var(--accent)"/><rect x="130" y="20" width="60" height="34" fill="var(--sig-soft)" stroke="var(--sig)"/><rect x="190" y="20" width="40" height="34" fill="var(--soft)" stroke="var(--muted)"/><text x="70" y="42" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">Tag</text><text x="160" y="42" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">Index</text><text x="210" y="42" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="var(--f-mono)">Off</text><text x="10" y="74" font-size="10" fill="var(--muted)">so khớp</text><text x="132" y="74" font-size="10" fill="var(--muted)">chọn dòng</text><text x="190" y="74" font-size="10" fill="var(--muted)">byte</text></svg>`
};


const range=(id,label,min,max,step,val,unit="")=>`<div class="field"><div class="row"><label for="${id}">${label}</label><output id="${id}o"></output></div><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" data-unit="${unit}"></div>`;
const logR = x=>Math.round(10**x/10)*10; // slider log scale for resistors
const SIM={
 divider(b){
  b.innerHTML=`<h3 style="font-size:16px">Mạch chia áp</h3><div class="sim-grid"><div class="ctl">${range("vin","Vin",0,24,.1,12)}${range("r1","R1",2,5,.01,4)}${range("r2","R2",2,5,.01,4)}</div><div><div class="svgwrap" id="dvSvg"></div><div class="readout" id="dvRo" style="margin-top:10px"></div></div></div>`;
  const up=()=>{const vin=+$("#vin").value, r1=logR(+$("#r1").value), r2=logR(+$("#r2").value);
    const i=vin/(r1+r2), vo=vin*r2/(r1+r2);
    $("#vino").textContent=vin.toFixed(1)+" V";$("#r1o").textContent=fmt(r1,"Ω");$("#r2o").textContent=fmt(r2,"Ω");
    $("#dvRo").innerHTML=[["Vout",fmt(vo,"V")],["Dòng I",fmt(i,"A")],["P(R1)",fmt(i*i*r1,"W")],["P(R2)",fmt(i*i*r2,"W")]].map(([a,c])=>`<div class="ro"><small>${a}</small><b>${c}</b></div>`).join("");
    const h=40+120*(vo/(vin||1));
    $("#dvSvg").innerHTML=`<svg viewBox="0 0 300 200" width="300"><g stroke="var(--ink)" stroke-width="2" fill="none"><path d="M60 20h80v20M140 90v20M140 160v20H60M60 20v60M60 120v60M140 100h70"/><path d="M140 40l-8 4 16 5-16 5 16 5-16 5 16 5-16 5 8 4" stroke="var(--accent)"/><path d="M140 110l-8 4 16 5-16 5 16 5-16 5 16 5-16 5 8 4" stroke="var(--accent)"/><circle cx="60" cy="100" r="18"/></g><text x="54" y="96" fill="var(--ink)">+</text><text x="55" y="112" fill="var(--ink)">−</text><text x="6" y="104" fill="var(--muted)" font-size="12" font-family="var(--f-mono)">${vin.toFixed(1)}V</text><text x="156" y="68" fill="var(--muted)" font-size="12" font-family="var(--f-mono)">R1 ${fmt(r1,"Ω")}</text><text x="156" y="140" fill="var(--muted)" font-size="12" font-family="var(--f-mono)">R2 ${fmt(r2,"Ω")}</text><circle cx="210" cy="100" r="4" fill="var(--sig)"/><text x="218" y="96" fill="var(--sig)" font-size="13" font-weight="600" font-family="var(--f-mono)">${fmt(vo,"V")}</text><rect x="270" y="20" width="14" height="160" rx="3" fill="var(--soft)" stroke="var(--line)"/><rect x="270" y="${180-(h-40)}" width="14" height="${h-40}" rx="3" fill="var(--sig)"/></svg>`};
  $$("input",b).forEach(x=>x.oninput=up);up();
 },
 rc(b){
  b.innerHTML=`<h3 style="font-size:16px">Nạp / xả tụ qua điện trở</h3><div class="sim-grid"><div class="ctl">${range("rr","R",2,6,.01,4)}${range("cc","C (µF)",0,3,.01,2)}${range("vs","Nguồn Vs",1,12,.1,5)}<div style="display:flex;gap:8px"><button class="btn primary" id="chg">▶ Nạp</button><button class="btn" id="dis">Xả</button></div></div><div><canvas class="scope" id="rcC" width="640" height="320"></canvas><div class="readout" id="rcRo" style="margin-top:10px"></div></div></div>`;
  let mode="chg", t=0, raf=0;
  const P=()=>({R:logR(+$("#rr").value),C:10**(+$("#cc").value)*1e-6,V:+$("#vs").value});
  const draw=()=>{const {R,C,V}=P(),tau=R*C,c=$("#rcC");if(!c)return;const g=c.getContext("2d"),w=c.width,h=c.height;
   g.fillStyle="#0b1a1d";g.fillRect(0,0,w,h);g.strokeStyle="rgba(120,200,200,.15)";g.lineWidth=1;
   for(let i=1;i<10;i++){g.beginPath();g.moveTo(i*w/10,0);g.lineTo(i*w/10,h);g.stroke()}for(let i=1;i<8;i++){g.beginPath();g.moveTo(0,i*h/8);g.lineTo(w,i*h/8);g.stroke()}
   const f=x=>mode==="chg"?V*(1-Math.exp(-x)):V*Math.exp(-x);const y=val=>h-20-(h-40)*val/12;
   g.strokeStyle="rgba(255,255,255,.2)";g.setLineDash([6,6]);g.beginPath();g.moveTo(w*.2,0);g.lineTo(w*.2,h);g.stroke();g.setLineDash([]);
   g.strokeStyle="#41c1cb";g.lineWidth=3;g.beginPath();const tt=Math.min(t,5);for(let i=0;i<=200;i++){const x=i/200*5;if(x>tt)break;const px=x/5*w;i?g.lineTo(px,y(f(x))):g.moveTo(px,y(f(x)))}g.stroke();
   g.fillStyle="#d9e6e8";g.font="22px JetBrains Mono, monospace";g.fillText("1τ",w*.2+6,26);g.fillText("t / τ →",w-110,h-28);g.fillText(f(tt).toFixed(2)+" V",14,26);
   $("#rro").textContent=fmt(R,"Ω");$("#cco").textContent=fmt(C,"F");$("#vso").textContent=V.toFixed(1)+" V";
   $("#rcRo").innerHTML=[["τ = RC",fmt(tau,"s")],["5τ",fmt(5*tau,"s")],["v(1τ)",(mode==="chg"?V*.632:V*.368).toFixed(2)+" V"]].map(([a,c])=>`<div class="ro"><small>${a}</small><b>${c}</b></div>`).join("")};
  const run=m=>{mode=m;t=0;cancelAnimationFrame(raf);const st=performance.now();const step=now=>{t=(now-st)/700;draw();if(t<5&&document.body.contains(b))raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)};
  $("#chg").onclick=()=>run("chg");$("#dis").onclick=()=>run("dis");$$("input",b).forEach(x=>x.oninput=()=>{t=5;draw()});t=5;draw();
 },
 opamp(b){
  b.innerHTML=`<h3 style="font-size:16px">Khuếch đại op-amp (lý tưởng, nguồn ±12 V)</h3><div class="sim-grid"><div class="ctl"><div class="field"><label for="om">Cấu hình</label><select id="om"><option value="inv">Khuếch đại đảo</option><option value="non">Không đảo</option><option value="buf">Đệm (buffer)</option></select></div>${range("orf","Rf",3,6,.01,5)}${range("ori","Rin / Rg",3,6,.01,4)}${range("ovi","Vin",-5,5,.05,0.5)}</div><div><canvas class="scope" id="oC" width="640" height="300"></canvas><div class="readout" id="oRo" style="margin-top:10px"></div></div></div>`;
  const up=()=>{const m=$("#om").value,rf=logR(+$("#orf").value),ri=logR(+$("#ori").value),vin=+$("#ovi").value;
   const A=m==="inv"?-rf/ri:m==="non"?1+rf/ri:1;const ideal=A*vin, vo=Math.max(-12,Math.min(12,ideal)),sat=Math.abs(ideal)>12;
   $("#orfo").textContent=fmt(rf,"Ω");$("#orio").textContent=fmt(ri,"Ω");$("#ovio").textContent=vin.toFixed(2)+" V";
   $("#orf").disabled=$("#ori").disabled=m==="buf";
   const c=$("#oC"),g=c.getContext("2d"),w=c.width,h=c.height;g.fillStyle="#0b1a1d";g.fillRect(0,0,w,h);
   const y=v=>h/2-v/13*(h/2-10);g.strokeStyle="rgba(120,200,200,.15)";[12,-12,0].forEach(v=>{g.beginPath();g.moveTo(0,y(v));g.lineTo(w,y(v));g.stroke()});
   const amp=Math.abs(vin)||.001;g.lineWidth=2.5;
   [["#d9b55c",x=>vin*Math.sin(x)],["#41c1cb",x=>Math.max(-12,Math.min(12,A*vin*Math.sin(x)))]].forEach(([col,f])=>{g.strokeStyle=col;g.beginPath();for(let i=0;i<=w;i+=2){const x=i/w*4*Math.PI;i?g.lineTo(i,y(f(x))):g.moveTo(i,y(f(x)))}g.stroke()});
   g.font="20px JetBrains Mono, monospace";g.fillStyle="#d9b55c";g.fillText("Vin (biên độ)",12,24);g.fillStyle="#41c1cb";g.fillText("Vout",200,24);g.fillStyle="#8aa";g.fillText("+12V",w-70,y(12)-6);g.fillText("−12V",w-70,y(-12)+20);
   $("#oRo").innerHTML=`<div class="ro"><small>Hệ số A</small><b>${A.toFixed(2)}</b></div><div class="ro"><small>Vout (đỉnh)</small><b>${vo.toFixed(2)} V</b></div><div class="ro"><small>Trạng thái</small><b>${sat?'<span class="pill bad">Bão hòa</span>':'<span class="pill ok">Tuyến tính</span>'}</b></div>`};
  $$("input,select",b).forEach(x=>x.oninput=up);up();
 },
 gates(b){
  const G={AND:(a,c)=>a&c,OR:(a,c)=>a|c,NAND:(a,c)=>1-(a&c),NOR:(a,c)=>1-(a|c),XOR:(a,c)=>a^c,NOT:a=>1-a};
  let gname="NAND",A=0,B=0;
  b.innerHTML=`<h3 style="font-size:16px">Bàn thử cổng logic</h3><div class="sim-grid"><div class="ctl"><div class="model-pick">${Object.keys(G).map(k=>`<button class="chip" data-g="${k}">${k}</button>`).join("")}</div><div class="bits"><span>A</span><button class="toggle" id="gA" aria-pressed="false">0</button><span id="lblB">B</span><button class="toggle" id="gB" aria-pressed="false">0</button><span style="margin-left:12px">Y</span><span class="lamp" id="gY"></span></div><div class="muted" id="gExpr" style="font-family:var(--f-mono)"></div></div><div class="tbl-wrap" id="gTT"></div></div>`;
  const up=()=>{$$("[data-g]",b).forEach(x=>x.setAttribute("aria-pressed",x.dataset.g===gname));const one=gname==="NOT";$("#gB").hidden=$("#lblB").hidden=one;
   const y=one?G.NOT(A):G[gname](A,B);$("#gA").textContent=A;$("#gA").setAttribute("aria-pressed",!!A);$("#gB").textContent=B;$("#gB").setAttribute("aria-pressed",!!B);$("#gY").classList.toggle("on",!!y);
   $("#gExpr").textContent={AND:"Y = A·B",OR:"Y = A + B",NAND:"Y = ¬(A·B)",NOR:"Y = ¬(A + B)",XOR:"Y = A ⊕ B",NOT:"Y = ¬A"}[gname]+"  →  "+y;
   const rows=one?[[0],[1]]:[[0,0],[0,1],[1,0],[1,1]];
   $("#gTT").innerHTML=`<table class="tt"><tr><th>A</th>${one?"":"<th>B</th>"}<th>Y</th></tr>${rows.map(r=>`<tr class="${r[0]===A&&(one||r[1]===B)?"hl":""}"><td>${r[0]}</td>${one?"":`<td>${r[1]}</td>`}<td>${one?G.NOT(r[0]):G[gname](r[0],r[1])}</td></tr>`).join("")}</table>`};
  $$("[data-g]",b).forEach(x=>x.onclick=()=>{gname=x.dataset.g;up()});$("#gA").onclick=()=>{A^=1;up()};$("#gB").onclick=()=>{B^=1;up()};up();
 },
 adder(b){
  let A=[0,1,0,1],B=[0,0,1,1]; // MSB first
  b.innerHTML=`<h3 style="font-size:16px">Bộ cộng 4 bit ripple-carry</h3><div class="ctl"><div class="bits"><span class="mono" style="width:22px">A</span><span id="aB" class="bits"></span><span class="mono muted" id="aD"></span></div><div class="bits"><span class="mono" style="width:22px">B</span><span id="bB" class="bits"></span><span class="mono muted" id="bD"></span></div><label class="check"><input type="checkbox" id="sub"> Phép trừ A − B (cộng bù 2: ~B và Cin = 1)</label></div><div class="svgwrap" id="adSvg"></div><div class="readout" id="adRo"></div>`;
  const val=a=>a.reduce((s,x)=>s*2+x,0), sgn=v=>v>7?v-16:v;
  const up=()=>{const sub=$("#sub").checked;const Bx=sub?B.map(x=>1-x):B;let c=sub?1:0;const S=[0,0,0,0],C=[];
   for(let i=3;i>=0;i--){const s=A[i]^Bx[i]^c;const co=(A[i]&Bx[i])|(c&(A[i]^Bx[i]));C[i]=c;S[i]=s;c=co}
   ["aB","bB"].forEach((id,k)=>{const arr=k?B:A;$("#"+id).innerHTML=arr.map((x,i)=>`<button class="toggle" data-k="${k}" data-i="${i}" aria-pressed="${!!x}">${x}</button>`).join("")});
   $("#aD").textContent="= "+val(A)+" (có dấu "+sgn(val(A))+")";$("#bD").textContent="= "+val(B)+" (có dấu "+sgn(val(B))+")";
   let o="";for(let i=0;i<4;i++){const x=230-i*70;const bit=3-i;o+=`<rect x="${x}" y="30" width="52" height="44" rx="6" fill="${S[bit]?"var(--sig-soft)":"var(--panel)"}" stroke="var(--sig)"/><text x="${x+26}" y="57" text-anchor="middle" font-size="12" fill="var(--ink)" font-family="var(--f-mono)">FA${i}</text><text x="${x+26}" y="20" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">${A[bit]}${sub?"+~"+B[bit]:"+"+B[bit]}</text><text x="${x+26}" y="98" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" font-family="var(--f-mono)">${S[bit]}</text><path d="M${x+52} 52h18" stroke="${C[bit]?"var(--accent)":"var(--line)"}" stroke-width="${C[bit]?3:2}"/><text x="${x+56}" y="46" font-size="10" fill="var(--accent)" font-family="var(--f-mono)">${C[bit]?"1":""}</text>`}
   o+=`<text x="4" y="56" font-size="12" fill="${c?"var(--accent)":"var(--muted)"}" font-family="var(--f-mono)">C4=${c}</text>`;
   $("#adSvg").innerHTML=`<svg viewBox="0 0 320 110" width="320">${o}</svg>`;
   const sv=val(S);$("#adRo").innerHTML=`<div class="ro"><small>Tổng (nhị phân)</small><b>${c}${S.join("")}</b></div><div class="ro"><small>Không dấu</small><b>${sv}${c&&!sub?" (+16 tràn)":""}</b></div><div class="ro"><small>Có dấu (bù 2)</small><b>${sgn(sv)}</b></div>`;
   $$("[data-k]",b).forEach(x=>x.onclick=()=>{const arr=+x.dataset.k?B:A;arr[+x.dataset.i]^=1;up()})};
  $("#sub").onchange=up;up();
 },
 latch(b){
  let Q=0,mode="sr",D=0,E=0,S_=0,R_=0;
  b.innerHTML=`<h3 style="font-size:16px">Latch</h3><div class="model-pick"><button class="chip" data-lm="sr">SR latch (NOR)</button><button class="chip" data-lm="d">D latch</button></div><div class="sim-grid" style="margin-top:6px"><div class="ctl" id="lCtl"></div><div><div class="bits"><span>Q</span><span class="lamp" id="lQ"></span><span>Q̅</span><span class="lamp" id="lQn"></span></div><p id="lMsg" class="muted" style="margin:10px 0 0"></p></div></div>`;
  const up=()=>{$$("[data-lm]",b).forEach(x=>x.setAttribute("aria-pressed",x.dataset.lm===mode));let Qn,msg;
   if(mode==="sr"){$("#lCtl").innerHTML=`<div class="bits"><span>S</span><button class="toggle" id="ls" aria-pressed="${!!S_}">${S_}</button><span>R</span><button class="toggle" id="lr" aria-pressed="${!!R_}">${R_}</button></div>`;
     if(S_&&R_){Q=0;Qn=0;msg='<span class="pill bad">Trạng thái cấm</span> Q và Q̅ cùng bằng 0.'}else{if(S_)Q=1;if(R_)Q=0;Qn=1-Q;msg=S_?"Set → Q = 1":R_?"Reset → Q = 0":'<span class="pill ok">Giữ</span> Q nhớ giá trị trước: '+Q}
     $("#ls").onclick=()=>{S_^=1;up()};$("#lr").onclick=()=>{R_^=1;up()}}
   else{$("#lCtl").innerHTML=`<div class="bits"><span>D</span><button class="toggle" id="ld" aria-pressed="${!!D}">${D}</button><span>E</span><button class="toggle" id="le" aria-pressed="${!!E}">${E}</button></div>`;
     if(E)Q=D;Qn=1-Q;msg=E?"Enable = 1: Q đi theo D":'<span class="pill ok">Giữ</span> Enable = 0: Q giữ '+Q+" dù D đổi";
     $("#ld").onclick=()=>{D^=1;up()};$("#le").onclick=()=>{E^=1;up()}}
   $("#lQ").classList.toggle("on",!!Q);$("#lQn").classList.toggle("on",!!Qn);$("#lMsg").innerHTML=msg};
  $$("[data-lm]",b).forEach(x=>x.onclick=()=>{mode=x.dataset.lm;up()});up();
 },
 pwm(b){
  b.innerHTML=`<h3 style="font-size:16px">PWM và LED</h3><div class="sim-grid"><div class="ctl">${range("pd","Duty cycle (%)",0,100,1,40)}${range("pv","Vcc (V)",1.8,5,.1,3.3)}${range("pvf","Vf của LED (V)",1.6,3.2,.1,2)}${range("pi","Dòng mong muốn (mA)",1,20,1,5)}</div><div><canvas class="scope" id="pC" width="640" height="220"></canvas><div class="bits" style="margin-top:10px"><span>LED</span><span class="lamp" id="pL" style="width:46px;height:46px"></span></div><div class="readout" id="pRo" style="margin-top:10px"></div></div></div>`;
  const up=()=>{const d=+$("#pd").value/100,vcc=+$("#pv").value,vf=+$("#pvf").value,I=+$("#pi").value/1000;
   $("#pdo").textContent=Math.round(d*100)+" %";$("#pvo").textContent=vcc.toFixed(1)+" V";$("#pvfo").textContent=vf.toFixed(1)+" V";$("#pio").textContent=(I*1000)+" mA";
   const c=$("#pC"),g=c.getContext("2d"),w=c.width,h=c.height;g.fillStyle="#0b1a1d";g.fillRect(0,0,w,h);g.strokeStyle="#41c1cb";g.lineWidth=3;g.beginPath();
   const per=w/4,hi=30,lo=h-30;g.moveTo(0,lo);for(let k=0;k<4;k++){const x=k*per;g.lineTo(x,lo);if(d>0){g.lineTo(x,hi);g.lineTo(x+per*d,hi)}g.lineTo(x+per*d,lo)}g.lineTo(w,lo);g.stroke();
   const avg=lo-(lo-hi)*d;g.strokeStyle="#d9b55c";g.setLineDash([8,6]);g.beginPath();g.moveTo(0,avg);g.lineTo(w,avg);g.stroke();g.setLineDash([]);g.fillStyle="#d9b55c";g.font="20px JetBrains Mono, monospace";g.fillText("Vtb = "+(d*vcc).toFixed(2)+" V",12,avg-8);
   const L=$("#pL");L.classList.toggle("on",d>0);L.style.opacity=.25+.75*d;
   const R=(vcc-vf)/I;$("#pRo").innerHTML=`<div class="ro"><small>Vtb = D·Vcc</small><b>${(d*vcc).toFixed(2)} V</b></div><div class="ro"><small>R hạn dòng</small><b>${R>0?Math.round(R)+" Ω":"Vcc < Vf"}</b></div><div class="ro"><small>Công suất R</small><b>${R>0?fmt(I*I*R,"W"):"—"}</b></div>`};
  $$("input",b).forEach(x=>x.oninput=up);up();
 },
 spi(b){
  b.innerHTML=`<h3 style="font-size:16px">Gửi 1 byte qua SPI (Mode 0, MSB trước)</h3><div class="ctl" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr));display:grid"><div class="field"><label for="sb">Byte gửi (0–255)</label><input type="number" id="sb" min="0" max="255" value="165"></div><div class="field"><label for="sr">Byte slave trả về</label><input type="number" id="sr" min="0" max="255" value="66"></div><div style="display:flex;gap:8px;align-items:end"><button class="btn primary" id="sgo">▶ Truyền</button><button class="btn" id="sstep">Từng nhịp</button></div></div><canvas class="scope" id="sC" width="760" height="300"></canvas><div class="readout" id="sRo"></div>`;
  let k=0,raf=0;
  const draw=()=>{const tx=Math.max(0,Math.min(255,+$("#sb").value|0)),rx=Math.max(0,Math.min(255,+$("#sr").value|0));const c=$("#sC");if(!c)return;const g=c.getContext("2d"),w=c.width,h=c.height;
   g.fillStyle="#0b1a1d";g.fillRect(0,0,w,h);const x0=90,cw=(w-x0-30)/9,rows=[["CS̅",40],["SCLK",110],["MOSI",180],["MISO",250]];
   g.font="18px JetBrains Mono, monospace";rows.forEach(([n,y])=>{g.fillStyle="#9bb";g.fillText(n,10,y+6)});
   const lv=(y,hi)=>hi?y-18:y+18;g.lineWidth=2.5;
   // CS
   g.strokeStyle="#d9b55c";g.beginPath();g.moveTo(x0,lv(40,1));g.lineTo(x0+cw*.4,lv(40,1));g.lineTo(x0+cw*.4,lv(40,0));g.lineTo(x0+cw*8.6,lv(40,0));g.lineTo(x0+cw*8.6,lv(40,1));g.lineTo(w-20,lv(40,1));g.stroke();
   // clock
   g.strokeStyle="#41c1cb";g.beginPath();g.moveTo(x0,lv(110,0));for(let i=0;i<Math.min(k,8);i++){const xr=x0+cw*(i+1);g.lineTo(xr,lv(110,0));g.lineTo(xr,lv(110,1));g.lineTo(xr+cw*.5,lv(110,1));g.lineTo(xr+cw*.5,lv(110,0))}g.lineTo(k>=8?w-20:x0+cw*(Math.min(k,8)+.6),lv(110,0));g.stroke();
   [[tx,180,"#ff8a6c"],[rx,250,"#a7d36b"]].forEach(([byte,y,col])=>{g.strokeStyle=col;g.beginPath();for(let i=0;i<8&&i<k;i++){const bit=(byte>>(7-i))&1;const xa=x0+cw*(i+.5),xb=xa+cw;g.moveTo(xa,lv(y,bit));g.lineTo(xb,lv(y,bit));g.fillStyle=col;g.fillText(bit,xa+cw/2-6,y+7)}g.stroke()});
   for(let i=0;i<k&&i<8;i++){const xs=x0+cw*(i+1);g.strokeStyle="rgba(255,255,255,.18)";g.setLineDash([4,5]);g.beginPath();g.moveTo(xs,70);g.lineTo(xs,280);g.stroke();g.setLineDash([])}
   const got=k>=8, rxb=(v,n)=>v.toString(2).padStart(8,"0").slice(0,n);
   $("#sRo").innerHTML=`<div class="ro"><small>Master đã gửi</small><b>${rxb(tx,Math.min(k,8))||"—"}</b></div><div class="ro"><small>Master đã nhận</small><b>${rxb(rx,Math.min(k,8))||"—"}</b></div><div class="ro"><small>Trạng thái</small><b>${got?'<span class="pill ok">Xong 8 nhịp</span>':k?'Nhịp '+k+'/8':'Chờ CS̅'}</b></div><div class="ro"><small>Hex</small><b>0x${tx.toString(16).toUpperCase().padStart(2,"0")} ⇄ 0x${rx.toString(16).toUpperCase().padStart(2,"0")}</b></div>`};
  $("#sgo").onclick=()=>{cancelAnimationFrame(raf);k=0;let last=performance.now();const st=n=>{if(n-last>300){k++;last=n;draw()}if(k<8&&document.body.contains(b))raf=requestAnimationFrame(st)};draw();raf=requestAnimationFrame(st)};
  $("#sstep").onclick=()=>{cancelAnimationFrame(raf);k=k>=8?0:k+1;draw()};$$("input",b).forEach(x=>x.oninput=()=>{k=8;draw()});k=8;draw();
 },
 rtos(b){
  let tasks=[{n:"Đọc cảm biến",p:3,T:5,C:1},{n:"Điều khiển động cơ",p:2,T:8,C:2},{n:"Ghi log",p:1,T:12,C:4}];
  b.innerHTML=`<h3 style="font-size:16px">Lập lịch ưu tiên có chiếm quyền (40 tick)</h3><div class="tbl-wrap"><table class="tt" id="rT"></table></div><div class="svgwrap" id="rG"></div><div id="rRo" class="readout"></div>`;
  const up=()=>{$("#rT").innerHTML=`<tr><th style="text-align:left">Tác vụ</th><th>Ưu tiên</th><th>Chu kỳ T</th><th>Thời gian chạy C</th></tr>`+tasks.map((t,i)=>`<tr><td style="text-align:left;font-family:var(--f-body)">${esc(t.n)}</td>${["p","T","C"].map(k=>`<td><input type="number" min="1" max="${k==="p"?9:20}" value="${t[k]}" data-i="${i}" data-k="${k}" style="width:56px"></td>`).join("")}</tr>`).join("");
   $$("#rT input").forEach(x=>x.onchange=()=>{tasks[+x.dataset.i][x.dataset.k]=Math.max(1,+x.value||1);up()});
   const N=40,rem=tasks.map(()=>0),dl=tasks.map(()=>0),tl=[];let miss=tasks.map(()=>0),idle=0;
   for(let t=0;t<N;t++){tasks.forEach((k,i)=>{if(t%k.T===0){if(rem[i]>0)miss[i]++;rem[i]=k.C;dl[i]=t+k.T}});
    let best=-1;tasks.forEach((k,i)=>{if(rem[i]>0&&(best<0||k.p>tasks[best].p))best=i});tl.push(best);if(best>=0)rem[best]--;else idle++}
   const cols=["#d0743c","#41c1cb","#8b6cd1"],cw=17,rh=26,W=130+N*cw;
   let o="";tasks.forEach((k,i)=>{const y=10+i*(rh+8);o+=`<text x="0" y="${y+17}" font-size="11.5" fill="var(--ink)">${esc(k.n)}</text>`;for(let t=0;t<N;t++){if(t%k.T===0)o+=`<path d="M${130+t*cw} ${y-3}v${rh+6}" stroke="var(--muted)" stroke-width="1"/>`;if(tl[t]===i)o+=`<rect x="${130+t*cw}" y="${y}" width="${cw-1}" height="${rh}" fill="${cols[i%3]}"/>`}});
   for(let t=0;t<=N;t+=5)o+=`<text x="${130+t*cw}" y="${10+tasks.length*(rh+8)+12}" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">${t}</text>`;
   $("#rG").innerHTML=`<svg viewBox="0 0 ${W} ${tasks.length*(rh+8)+30}" width="${W}">${o}</svg>`;
   const U=tasks.reduce((s,k)=>s+k.C/k.T,0);
   $("#rRo").innerHTML=`<div class="ro"><small>Mức sử dụng CPU U = ΣC/T</small><b>${(U*100).toFixed(1)} %</b></div><div class="ro"><small>Tick rảnh</small><b>${idle}/40</b></div><div class="ro"><small>Lỡ hạn chót</small><b>${miss.some(x=>x)?'<span class="pill bad">'+miss.reduce((a,c)=>a+c,0)+' lần</span>':'<span class="pill ok">Không</span>'}</b></div>`};
  up();
 },
 cpu(b){
  const prog=[["LDA 14","Nạp RAM[14] vào A"],["ADD 15","Nạp RAM[15] vào B, A ← A + B"],["OUT","Đưa A ra màn hình"],["HLT","Dừng"]];
  let st={pc:0,a:0,b:0,out:"—",ir:"—",phase:0,halt:false};const RAM={14:28,15:14};
  b.innerHTML=`<h3 style="font-size:16px">Chạy chương trình trên CPU 8 bit (kiểu Ben Eater)</h3><div class="sim-grid"><div class="ctl"><div class="tbl-wrap"><table class="tt" id="cpT"></table></div><div class="field"><label for="m14">RAM[14]</label><input type="number" id="m14" min="0" max="255" value="28"></div><div class="field"><label for="m15">RAM[15]</label><input type="number" id="m15" min="0" max="255" value="14"></div><div style="display:flex;gap:8px"><button class="btn primary" id="cpS">Bước kế tiếp</button><button class="btn" id="cpR">Đặt lại</button></div></div><div><div class="readout" id="cpRo"></div><p id="cpMsg" class="narr" style="margin-top:12px"></p></div></div>`;
  const ph=["Nạp lệnh (fetch): MAR ← PC, IR ← RAM[PC], PC ← PC + 1","Giải mã & thực thi"];
  const up=msg=>{$("#cpT").innerHTML=`<tr><th>Địa chỉ</th><th>Lệnh</th></tr>`+prog.map((p,i)=>`<tr class="${i===st.pc&&!st.halt?"hl":""}"><td>${i}</td><td style="text-align:left">${p[0]}</td></tr>`).join("");
   $("#cpRo").innerHTML=[["PC",st.pc],["IR",st.ir],["A",st.a],["B",st.b],["OUT",st.out],["Pha",st.halt?"Dừng":st.phase?"Thực thi":"Nạp"]].map(([k,v])=>`<div class="ro"><small>${k}</small><b>${v}</b></div>`).join("");$("#cpMsg").textContent=msg||"Bấm “Bước kế tiếp” để chạy từng pha."};
  $("#cpS").onclick=()=>{if(st.halt)return;RAM[14]=(+$("#m14").value|0)&255;RAM[15]=(+$("#m15").value|0)&255;
   if(st.phase===0){st.ir=prog[st.pc][0];st.pc++;st.phase=1;up(ph[0]+" → IR = "+st.ir);return}
   const ins=st.ir;let m="";if(ins==="LDA 14"){st.a=RAM[14];m="A ← RAM[14] = "+st.a}else if(ins==="ADD 15"){st.b=RAM[15];const s=st.a+st.b;st.a=s&255;m="B ← "+st.b+"; ALU: A ← A + B = "+st.a+(s>255?" (tràn 8 bit)":"")}else if(ins==="OUT"){st.out=st.a;m="OUT ← A = "+st.a}else{st.halt=true;m="HLT: dừng đồng hồ."}st.phase=0;up(m)};
  $("#cpR").onclick=()=>{st={pc:0,a:0,b:0,out:"—",ir:"—",phase:0,halt:false};up()};up();
 },
 pipeline(b){
  b.innerHTML=`<h3 style="font-size:16px">Pipeline 5 tầng</h3><div class="ctl" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">${range("pn","Số lệnh",2,10,1,5)}<label class="check"><input type="checkbox" id="phz"> Lệnh 3 phụ thuộc kết quả lệnh 2 (không forwarding → 2 chu kỳ stall)</label><label class="check"><input type="checkbox" id="pfw"> Bật forwarding (giảm còn 0 stall với ALU→ALU)</label></div><div class="tbl-wrap" id="pG"></div><div class="readout" id="pRo"></div>`;
  const ST=["IF","ID","EX","MEM","WB"];
  const up=()=>{const n=+$("#pn").value;$("#pno").textContent=n;const hz=$("#phz").checked,fw=$("#pfw").checked,stall=hz&&!fw&&n>=3?2:0;
   const rows=[];for(let i=0;i<n;i++){const r={};
     if(i===2&&stall){r[i]="IF";for(let j=0;j<stall;j++)r[i+1+j]="stall";ST.slice(1).forEach((s,j)=>r[i+1+stall+j]=s)}
     else{const s0=i+(i>2?stall:0);ST.forEach((s,j)=>r[s0+j]=s)}
     rows.push(r)}
   const tot=5+n-1+stall;
   $("#pG").innerHTML=`<table class="pgrid"><tr><th></th>${Array.from({length:tot},(_,c)=>`<th>${c+1}</th>`).join("")}</tr>${rows.map((r,i)=>`<tr><th style="width:auto;padding:0 6px">i${i+1}</th>${Array.from({length:tot},(_,c)=>`<td class="${r[c]?"st-"+r[c]:""}">${r[c]?r[c]==="stall"?"·":r[c]:""}</td>`).join("")}</tr>`).join("")}</table>`;
   $("#pRo").innerHTML=`<div class="ro"><small>Chu kỳ có pipeline</small><b>${tot}</b></div><div class="ro"><small>Không pipeline (5·n)</small><b>${5*n}</b></div><div class="ro"><small>Tăng tốc</small><b>${(5*n/tot).toFixed(2)}×</b></div><div class="ro"><small>Stall</small><b>${stall?'<span class="pill warn">'+stall+'</span>':'<span class="pill ok">0</span>'}</b></div>`};
  $$("input",b).forEach(x=>x.oninput=up);up();
 },
 cache(b){
  b.innerHTML=`<h3 style="font-size:16px">Mô phỏng cache (block 4 byte)</h3><div class="ctl" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr))"><div class="field"><label for="cl">Số dòng</label><select id="cl"><option>4</option><option selected>8</option></select></div><div class="field"><label for="cw">Độ kết hợp</label><select id="cw"><option value="1">Direct-mapped</option><option value="2">2-way (LRU)</option></select></div><div class="field" style="grid-column:1/-1"><label for="cs">Chuỗi địa chỉ byte (thập phân)</label><input type="text" id="cs" value="0 4 8 32 0 64 0 32 4 96 0 8"></div><div style="display:flex;gap:8px"><button class="btn primary" id="cgo">Chạy</button></div></div><div class="tbl-wrap" id="cOut"></div><div class="readout" id="cRo"></div>`;
  const run=()=>{const L=+$("#cl").value,W=+$("#cw").value,sets=L/W,addrs=$("#cs").value.split(/[\s,]+/).filter(Boolean).map(x=>Math.max(0,parseInt(x,10)||0));
   const S=Array.from({length:sets},()=>[]);let hits=0;const log=[];
   const ib=Math.log2(sets);
   addrs.forEach(a=>{const blk=a>>2,idx=blk%sets,tag=Math.floor(blk/sets);const set=S[idx];const k=set.findIndex(e=>e.tag===tag);let hit=k>=0;
    if(hit){hits++;const e=set.splice(k,1)[0];set.push(e)}else{if(set.length>=W)set.shift();set.push({tag})}
    log.push({a,tag,idx,off:a&3,hit})});
   $("#cOut").innerHTML=`<table class="tt"><tr><th>Địa chỉ</th><th>Tag</th><th>Index (set)</th><th>Offset</th><th>Kết quả</th></tr>${log.map(r=>`<tr><td>${r.a}</td><td>${r.tag}</td><td>${r.idx}</td><td>${r.off}</td><td>${r.hit?'<span class="pill ok">Hit</span>':'<span class="pill bad">Miss</span>'}</td></tr>`).join("")}</table>`;
   const hr=addrs.length?hits/addrs.length:0;$("#cRo").innerHTML=`<div class="ro"><small>Hit rate</small><b>${(hr*100).toFixed(0)} %</b></div><div class="ro"><small>Bit index</small><b>${ib}</b></div><div class="ro"><small>AMAT (1 + mr×100)</small><b>${(1+(1-hr)*100).toFixed(1)} chu kỳ</b></div>`};
  $("#cgo").onclick=run;$("#cl").onchange=run;$("#cw").onchange=run;run();
 }
};


/* =====================================================================
   STUDIO — các công cụ tạo nội dung từ nguồn
   ===================================================================== */
const STUDIO=[
 {k:"audio",l:"Tổng quan âm thanh",i:"audio",c:"#8cc0ff"},
 {k:"video",l:"Bài giảng video",i:"video",c:"#7ee0a7"},
 {k:"slides",l:"Slide bài giảng",i:"slides",c:"#f4a26a"},
 {k:"mindmap",l:"Sơ đồ tư duy",i:"map",c:"#d6a4ff"},
 {k:"report",l:"Báo cáo",i:"report",c:"#8cc0ff",isNew:true},
 {k:"flash",l:"Thẻ ghi nhớ",i:"cards",c:"#f2d36b"},
 {k:"quiz",l:"Bài kiểm tra",i:"quiz",c:"#7ee0a7"},
 {k:"info",l:"Đồ họa thông tin",i:"info",c:"#f2d36b"},
 {k:"table",l:"Bảng dữ liệu",i:"table",c:"#8cc0ff"},
 {k:"lab",l:"Phòng thí nghiệm 3D",i:"cube",c:"#f4a26a",isNew:true,direct:true},
 {k:"sim",l:"Mô phỏng mạch",i:"wave",c:"#7ee0a7",direct:true},
 {k:"yt",l:"Video YouTube",i:"yt",c:"#ef6b5d"}
];
const KLABEL=Object.fromEntries(STUDIO.map(s=>[s.k,s.l]));
function renderStudio(){
  const b=$("#studioBody");if(!b||UI.vopen==="dock")return;
  const items=[...UI.arts.map(a=>({...a,_t:"art"})),...UI.notes.map(n=>({...n,_t:"note"}))].sort((a,b)=>(b.created||0)-(a.created||0));
  b.innerHTML=`<div class="tiles">${STUDIO.map(s=>`<div class="tile" style="--c:${s.c}" role="button" tabindex="0" data-k="${s.k}">${ic(s.i)}<span style="flex:1">${s.l}</span>${s.isNew?`<span class="new">Mới</span>`:""}${!s.direct?`<button class="edit" data-cfg="${s.k}" aria-label="Tùy chỉnh ${s.l}">${ic("edit")}</button>`:""}</div>`).join("")}</div>
   <div class="items">${items.length?items.map(it=>it._t==="note"?`<div class="item">${ic("note")}<button class="open" data-note-open="${esc(it.id)}"><b>${esc(it.title||"Ghi chú")}</b><small>Ghi chú · ${dfmt(it.created)}</small></button></div>`
     :`<div class="item">${ic(it.kind==="model3d"?"cube":(STUDIO.find(s=>s.k===it.kind)||{}).i||"spark")}<button class="open" data-art="${esc(it.id)}"><b>${esc(it.status==="pending"?"Đang tạo "+(KLABEL[it.kind]||"")+"…":it.title||KLABEL[it.kind])}</b><small>${it.status==="pending"?(Date.now()-(it.created||0)>6e5?"Bị gián đoạn · bấm để tạo lại":"Đang đọc nguồn…"):it.status==="error"?"Lỗi · "+esc(it.err||""):`${KLABEL[it.kind]} · ${(it.srcLabels||[]).length} nguồn · ${dfmt(it.created)}`}</small></button>${it.status==="pending"&&Date.now()-(it.created||0)<6e5?`<span class="spin"></span>`:`<button class="ghost ic" data-artmenu="${esc(it.id)}" aria-label="Tùy chọn">${ic("more")}</button>`}</div>`).join("")
     :`<div class="pad" style="text-align:center;color:var(--muted);font-size:14px">${ic("spark")}<p>Nội dung Studio sẽ được lưu ở đây.<br>Sau khi thêm nguồn, bấm một ô để tạo slide, quiz, sơ đồ tư duy…</p></div>`}</div>
   <div class="note-fab"><button class="pill-btn" id="addNote">${ic("note")} Thêm ghi chú</button></div>`;
  $$(".tile",b).forEach(t=>{const go=e=>{if(e.target.closest(".edit"))return;studioClick(t.dataset.k,t)};t.onclick=go;t.onkeydown=e=>{if(e.key==="Enter")go(e)}});
  $$("[data-cfg]",b).forEach(x=>x.onclick=e=>{e.stopPropagation();customize(x.dataset.cfg)});
  $$("[data-art]",b).forEach(x=>x.onclick=()=>openArt(x.dataset.art));
  $$("[data-note-open]",b).forEach(x=>x.onclick=()=>openNote(x.dataset.noteOpen));
  $$("[data-artmenu]",b).forEach(x=>x.onclick=e=>{e.stopPropagation();const id=x.dataset.artmenu;const a=UI.arts.find(z=>z.id===id);
    const m=popMenu(x,`<button data-a="o">${ic("ext")}Mở</button><button data-a="r">${ic("spark")}Tạo lại</button><button data-a="d" style="color:var(--bad)">${ic("trash")}Xóa</button>`);
    $("[data-a=o]",m).onclick=()=>openArt(id);$("[data-a=r]",m).onclick=()=>generate(a.kind,a.cfg||{});$("[data-a=d]",m).onclick=()=>Store.del(id)});
  $("#addNote").onclick=()=>addNote("Ghi chú mới","").then(()=>{const n=UI.notes[0];if(n)openNote(n.id)});
}
function studioClick(k,anchor){
  if(k==="lab")return openLabCatalog();
  if(k==="sim")return openSimCatalog();
  const deep=["audio","video","slides","report","mindmap","flash","quiz"].includes(k);
  if(!deep||!anchor)return generate(k,{});
  const m=popMenu(anchor,`<div class="chooser"><div class="who">${esc(KLABEL[k])} · chọn mức độ</div>
    <button data-d="sum">${ic("min")}<span><b>Tóm tắt bài giảng</b><br><small>Ý chính, công thức chính, ví dụ ngắn</small></span></button>
    <button data-d="std">${ic("text")}<span><b>Tiêu chuẩn</b><br><small>Đủ ý, giải thích gọn, có ví dụ</small></span></button>
    <button data-d="deep">${ic("spark")}<span><b>Giảng chi tiết bản chất</b><br><small>Vì sao, suy ra từ gốc, lời giải từng bước, lỗi hay gặp</small></span></button>
    <div class="sep"></div><button data-d="cfg">${ic("edit")}<span><b>Tùy chỉnh…</b><br><small>Ngôn ngữ, độ dài, nguồn, mô tả riêng</small></span></button></div>`);
  $$("[data-d]",m).forEach(b=>b.onclick=()=>b.dataset.d==="cfg"?customize(k):generate(k,{depth:b.dataset.d}));
}

/* ---------- customize dialog ---------- */
const REPORT_T=[["brief","Tài liệu tóm tắt","Tổng quan nguồn với các ý chính và trích dẫn"],["study","Hướng dẫn học tập","Câu hỏi ngắn, câu hỏi tự luận gợi ý và bảng thuật ngữ"],["blog","Bài viết dễ đọc","Các ý hay nhất viết thành bài dễ hiểu"],["own","Tự tạo","Bạn mô tả cấu trúc, văn phong, trọng tâm"]];
function customize(k,init={}){
  const cfg=Object.assign({lang:"vi",len:"default",fmt:"detail",tpl:"brief",desc:"",n:10,srcIds:null,depth:"std",aspect:"wide"},init);
  const on=UI.srcs.filter(s=>s.on!==false);
  const fmtBlock=k==="slides"||k==="video"?`<div><h4>Định dạng</h4><div class="opts2">
      <button class="optcard" data-fmt="detail" aria-pressed="${cfg.fmt==="detail"}"><b>Slide chi tiết</b><span>Đầy đủ chữ và giải thích, đọc riêng vẫn hiểu</span></button>
      <button class="optcard" data-fmt="present" aria-pressed="${cfg.fmt==="present"}"><b>Slide thuyết trình</b><span>Gọn, nhiều hình, ý chính để thầy giảng kèm lời</span></button></div></div>`:"";
  const tplBlock=k==="report"?`<div><h4>Mẫu báo cáo</h4><div class="opts2">${REPORT_T.map(([v,t,d])=>`<button class="optcard" data-tpl="${v}" aria-pressed="${cfg.tpl===v}"><b>${t}</b><span>${d}</span></button>`).join("")}</div></div>`:"";
  const nBlock=k==="flash"||k==="quiz"?`<div class="field"><label for="cN">Số lượng</label><input type="number" id="cN" min="3" max="30" value="${cfg.n}"></div>`:"";
  const depthBlock=`<div><h4>Mức độ</h4><div class="opts2">${Object.entries(DEPTH).map(([v,d])=>`<button class="optcard" data-dep="${v}" aria-pressed="${cfg.depth===v}"><b>${d.l}</b><span>${{sum:"Cô đọng ý chính và công thức chính",std:"Đủ ý, giải thích gọn, có ví dụ",deep:"Vì sao, suy ra từ nguyên lý gốc, lời giải từng bước, lỗi hay gặp"}[v]}</span></button>`).join("")}</div></div>`;
  const aspBlock=k==="video"?`<div><h4>Khung hình</h4><div class="seg">${[["wide","Ngang 16:9"],["tall","Dọc 9:16"]].map(([v,t])=>`<button data-asp="${v}" aria-pressed="${cfg.aspect===v}">${t}</button>`).join("")}</div></div>`:"";
  openModal({title:"Tùy chỉnh "+KLABEL[k],small:true,body:`<div class="form">${depthBlock}${fmtBlock}${tplBlock}${aspBlock}
    <div class="row3"><div class="field"><label for="cLang">Ngôn ngữ</label><select id="cLang"><option value="vi" ${cfg.lang==="vi"?"selected":""}>Tiếng Việt</option><option value="en" ${cfg.lang==="en"?"selected":""}>English</option><option value="de" ${cfg.lang==="de"?"selected":""}>Deutsch</option></select></div>
     <div class="field"><span>Độ dài</span><div class="seg">${[["short","Ngắn"],["default","Mặc định"],["long","Chi tiết"]].map(([v,t])=>`<button data-len="${v}" aria-pressed="${cfg.len===v}">${t}</button>`).join("")}</div></div>${nBlock}</div>
    <div class="field"><span>Nguồn (${on.length} đang chọn)</span><div style="display:grid;gap:4px;max-height:150px;overflow:auto">${UI.srcs.map(s=>`<label class="src-item" style="padding:4px 0"><input type="checkbox" class="chk" data-cs="${esc(s.id)}" ${(cfg.srcIds?cfg.srcIds.includes(s.id):s.on!==false)?"checked":""}>${srcIcon(s)}<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(s.name)}</span></label>`).join("")||`<span class="muted">Chưa có nguồn</span>`}</div></div>
    <div class="field"><label for="cDesc">Mô tả nội dung bạn muốn tạo</label><textarea class="input" id="cDesc" placeholder="Ví dụ: “Cho người mới, tập trung từng bước rút gọn biểu thức bằng định lý DeMorgan, có ví dụ VHDL”">${esc(cfg.desc)}</textarea></div></div>`,
    foot:`<div class="grow"></div><button class="pill-btn primary" id="cGo">${ic("spark")} Tạo</button>`});
  $$("[data-fmt]").forEach(b=>b.onclick=()=>{cfg.fmt=b.dataset.fmt;$$("[data-fmt]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $$("[data-tpl]").forEach(b=>b.onclick=()=>{cfg.tpl=b.dataset.tpl;$$("[data-tpl]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $$("[data-dep]").forEach(b=>b.onclick=()=>{cfg.depth=b.dataset.dep;$$("[data-dep]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $$("[data-asp]").forEach(b=>b.onclick=()=>{cfg.aspect=b.dataset.asp;$$("[data-asp]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $$("[data-len]").forEach(b=>b.onclick=()=>{cfg.len=b.dataset.len;$$("[data-len]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $("#cGo").onclick=()=>{cfg.lang=$("#cLang").value;cfg.desc=$("#cDesc").value.trim();const n=$("#cN");if(n)cfg.n=Math.max(3,Math.min(30,+n.value||10));cfg.srcIds=$$("[data-cs]").filter(x=>x.checked).map(x=>x.dataset.cs);closeModal();generate(k,cfg)};
}

/* ---------- prompts per kind ---------- */
const LANG={vi:"tiếng Việt",en:"English",de:"Deutsch"};
const LEN={short:"ngắn gọn",default:"vừa phải",long:"chi tiết, đầy đủ"};
const FIGKEYS="ohm, divider, rc, opamp, inverter, adder, srlatch, led, spi, bus, pipe, cache";
function spec(k,cfg){
  const L=LANG[cfg.lang]||LANG.vi,len=LEN[cfg.len]||LEN.default;
  const nSl=cfg.len==="short"?6:cfg.len==="long"?14:10;
  const S={
   slides:{task:`Soạn bộ slide bài giảng (${cfg.fmt==="present"?"slide thuyết trình: ít chữ, mỗi slide ≤ 4 ý ngắn, lời giảng dài hơn":"slide chi tiết: mỗi slide 3–6 ý đầy đủ"}) khoảng ${nSl} slide, giọng thầy giáo giảng cho sinh viên. Mỗi slide có "notes" là lời giảng 3–6 câu như thầy nói trên lớp. Khi phù hợp, chọn "visual" là một trong: ${FIGKEYS}, hoặc "table" (kèm "table":{"headers":[],"rows":[[]]} ví dụ bảng chân lý), hoặc "math" (kèm "math":["bước 1 LaTeX","bước 2 LaTeX",…] — lời giải/biến đổi viết tay từng dòng), hoặc "formula" (kèm "formula":"…" cho đoạn mã VHDL/Verilog), hoặc "none". Mọi công thức trong bullets/notes viết $...$.`,
     schema:`{"title":"…","slides":[{"title":"…","bullets":["…"],"notes":"…","visual":"none","math":[],"formula":"","table":null,"cite":[1]}]}`},
   video:{task:`Viết kịch bản BÀI GIẢNG VIDEO có hình chuyển động như thầy giáo giảng trên bảng, ${cfg.depth==="sum"?"8–10":cfg.depth==="deep"?"16–22":"11–15"} cảnh. Mỗi cảnh: "say" là lời giảng 2–4 câu nói tự nhiên (đọc thành tiếng, KHÔNG chứa LaTeX, đọc công thức bằng lời), "head" là tiêu đề ngắn hiện trên màn hình (≤ 6 từ), "v" là hình minh họa động chọn ĐÚNG một loại trong danh mục:\n${VSCENES}\nChọn loại hình khớp nội dung (mạch chốt → latch, xung nhịp/flip-flop → timing, bộ đếm → counter, thanh ghi dịch → shift, biến đổi/tính toán → equation, so sánh → compare…). Cảnh đầu là title, cảnh cuối tóm tắt bằng bullets.`,schema:`{"title":"…","scenes":[{"say":"…","head":"…","v":{"type":"title","text":"…","sub":"…"}}]}`},
   audio:{task:`Viết kịch bản "tổng quan âm thanh" dạng hội thoại tự nhiên giữa Thầy (giảng viên) và Trò (sinh viên tò mò hỏi lại, nêu chỗ hay nhầm), ${cfg.len==="short"?"12–16":cfg.len==="long"?"34–44":"22–28"} lượt, mở đầu giới thiệu chủ đề, kết thúc tóm tắt 3 ý cần nhớ.`,schema:`{"title":"…","lines":[{"who":"Thầy","text":"…"}]}`},
   mindmap:{task:`Lập sơ đồ tư duy phân cấp (3–4 cấp) bao quát các khái niệm trong nguồn. Nhãn mỗi nút ≤ 7 từ.`,schema:`{"title":"…","root":{"t":"…","c":[{"t":"…","c":[{"t":"…"}]}]}}`},
   report:{task:{brief:"Viết TÀI LIỆU TÓM TẮT: mở đầu, các chủ đề chính (mỗi chủ đề một mục), các trích dẫn/công thức quan trọng, kết luận.",study:"Viết HƯỚNG DẪN HỌC TẬP: mục tiêu học tập; 8–10 câu hỏi trả lời ngắn kèm đáp án; 4 câu hỏi tự luận gợi ý (không đáp án); bảng thuật ngữ (thuật ngữ – định nghĩa).",blog:"Viết BÀI VIẾT dễ đọc, sinh động, có tiêu đề hấp dẫn, giải thích trực quan bằng ví dụ thực tế có trong nguồn.",own:"Viết báo cáo theo đúng mô tả của người học bên dưới."}[cfg.tpl||"brief"]+` Mỗi mục có tiêu đề "h" và nội dung "body" dạng markdown (gạch đầu dòng "- ", in đậm **…**, mã trong \`\`\`).`,schema:`{"title":"…","sections":[{"h":"…","body":"…"}]}`},
   flash:{task:`Tạo ${cfg.n||12} thẻ ghi nhớ: mặt trước là câu hỏi/thuật ngữ ngắn, mặt sau là câu trả lời chính xác 1–3 câu.`,schema:`{"title":"…","cards":[{"q":"…","a":"…","cite":[1]}]}`},
   quiz:{task:`Tạo ${cfg.n||10} câu hỏi trắc nghiệm 4 lựa chọn, có đúng 1 đáp án, kèm giải thích và gợi ý. Có cả câu tính toán/áp dụng nếu nguồn cho phép.`,schema:`{"title":"…","questions":[{"q":"…","options":["…","…","…","…"],"answer":0,"explain":"…","hint":"…","cite":[1]}]}`},
   info:{task:`Thiết kế nội dung đồ họa thông tin dạng "hệ sinh thái": một khái niệm trung tâm và 5–7 nhánh, mỗi nhánh có nhãn ≤ 4 từ và mô tả ≤ 8 từ; thêm 3 "điểm mấu chốt" ngắn.`,schema:`{"title":"…","subtitle":"…","center":"…","nodes":[{"label":"…","desc":"…"}],"keys":["…"]}`},
   table:{task:`Tạo một bảng dữ liệu tổng hợp hữu ích nhất từ nguồn (ví dụ: linh kiện – thông số – ứng dụng; công thức – ý nghĩa – đơn vị; cổng logic – biểu thức – bảng chân lý). 3–7 cột, tối đa 30 hàng.`,schema:`{"title":"…","columns":["…"],"rows":[["…"]]}`},
   yt:{task:`Xác định 3–6 chủ đề bài giảng chính trong nguồn để người học tìm video. Với mỗi chủ đề: "query_en" (từ khóa tìm kiếm tiếng Anh chính xác, ví dụ "DeMorgan theorem logic gates"), "query_vi", và "lib": danh sách CHỈ SỐ các video trong THƯ VIỆN ĐÃ KIỂM TRA bên dưới thực sự khớp chủ đề (có thể rỗng). Không tự đặt ra video.\nTHƯ VIỆN ĐÃ KIỂM TRA:\n${LIB.map((v,i)=>`${i}. ${v.title} — ${v.ch} [${v.tags.join(", ")}]`).join("\n")}`,schema:`{"title":"…","topics":[{"topic":"…","why":"…","query_en":"…","query_vi":"…","lib":[0]}]}`}
  };
  const s=S[k];
  return {...s,L,len,D:(DEPTH[cfg.depth]||DEPTH.std).d};
}
async function generate(k,cfg){
  if(!UI.cur)return;
  if(!P.sample){toast("Studio cần trợ lý AI: hãy mở trang trong ứng dụng Claude");return}
  const ctx=await sourceContext(cfg.srcIds||null);
  if(!ctx.labels.length){toast("Thêm hoặc chọn ít nhất một nguồn trước");return}
  const sp=spec(k,cfg);const id=mkid("art");const nb=UI.cur.id;
  await Store.put(id,{type:"art",nb,kind:k,title:"",status:"pending",cfg,created:Date.now()});
  if(innerWidth<=1100)mobPane("paneStudio");
  try{
    const prompt=`${rulesFor()}\n\nNGÔN NGỮ ĐẦU RA: ${sp.L}. ĐỘ DÀI: ${sp.len}.\nMỨC ĐỘ: ${sp.D}${cfg.desc?"\nYÊU CẦU CỦA NGƯỜI HỌC: "+cfg.desc:""}\nNHIỆM VỤ: ${sp.task}\nTrường "cite" là mảng số thứ tự nguồn [n] đã dùng.\nTrả về CHỈ một JSON đúng mẫu:\n${sp.schema}\n\nNGUỒN:\n${ctx.text}`;
    const data=await P.sample.json(prompt,{modelTier:"default",...(ctx.images.length?{images:ctx.images}:{})});
    if(!data||typeof data!=="object")throw {code:"invalid_json"};
    const art={type:"art",nb,kind:k,title:String(data.title||KLABEL[k]).slice(0,120),status:"done",cfg,data,srcLabels:ctx.labels,created:Date.now()};
    const sz=JSON.stringify(art).length;if(sz>240000)throw {code:"too_big"};
    await Store.put(id,art);toast("Đã tạo "+KLABEL[k]);
  }catch(e){console.warn(e);await Store.put(id,{type:"art",nb,kind:k,title:KLABEL[k],status:"error",err:e&&e.code==="too_big"?"Nội dung quá lớn, chọn độ dài ngắn hơn":aiErr(e),cfg,created:Date.now()})}
}

/* =====================================================================
   MỞ SẢN PHẨM STUDIO
   ===================================================================== */
function openArt(id){
  const a=UI.arts.find(x=>x.id===id);if(!a)return;
  if(a.status==="error"||(a.status==="pending"&&Date.now()-(a.created||0)>6e5)){Store.del(id);generate(a.kind,a.cfg||{});return}
  if(a.status!=="done"){toast("Đang tạo, chờ chút…");return}
  UI.reopen=()=>openArt(id);
  if(a.kind==="video"&&a.data&&a.data.scenes)return viewVideo(a);
  const V={slides:viewSlides,video:viewSlides,audio:viewAudio,mindmap:viewMind,report:viewReport,flash:viewFlash,quiz:viewQuiz,info:viewInfo,table:viewTable,yt:viewYT,model3d:openModelEditor};
  (V[a.kind]||viewReport)(a);
}
const srcBtn=a=>`<button class="pill-btn" id="srcList">${(a.srcLabels||[]).length} nguồn</button>`;
function bindSrcList(a){const b=$("#srcList");if(b)b.onclick=()=>popMenu(b,(a.srcLabels||[]).map((l,i)=>`<div class="who">[${i+1}] ${esc(l)}</div>`).join("")||`<div class="who">Không rõ</div>`)}
const citeChips=(c,labels)=>Array.isArray(c)&&c.length?c.map(n=>`<span class="cite" title="${esc((labels||[])[n-1]||"Nguồn "+n)}">${+n}</span>`).join(""):"";

/* ---------- slides & video lecture ---------- */
function viewSlides(a){
  const d=a.data,sl=d.slides||[];let i=0,auto=a.kind==="video",playing=false;
  openModal({title:a.title,actions:srcBtn(a)+`<button class="ghost ic" id="dkFull" aria-label="Toàn màn hình">${ic("full")}</button>`,body:`<div class="deck-wrap"><div class="deck" id="deck"></div><div class="narr" id="narr"></div></div>`});
  bindSrcList(a);
  const draw=()=>{const s=sl[i]||{};const vis=s.visual&&FIG[s.visual]?FIG[s.visual]():s.visual==="table"&&s.table&&s.table.headers?`<div class="tbl-wrap"><table class="tt"><tr>${s.table.headers.map(h=>`<th>${esc(h)}</th>`).join("")}</tr>${(s.table.rows||[]).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`:s.visual==="math"&&Array.isArray(s.math)&&s.math.length?sheet(s.math):s.visual==="formula"&&s.formula?`<div class="formula">${esc(s.formula)}</div>`:"";
    $("#deck").innerHTML=`<div class="slide ${vis?"":"nofig"}"><div><div class="eyebrow" style="margin-bottom:8px">${esc(d.title||a.title)}</div><h3>${esc(s.title||"")}</h3><ul>${(s.bullets||[]).map(x=>`<li>${mdInline(x,a.srcLabels)}</li>`).join("")}</ul><div style="margin-top:10px">${citeChips(s.cite,a.srcLabels)}</div></div>${vis?`<div class="fig">${vis}</div>`:""}<span class="no">${i+1} / ${sl.length}</span></div>
      <div class="deck-ctl"><button class="btn" id="pv" ${i?"":"disabled"} aria-label="Slide trước">${ic("back")}</button><div class="pips">${sl.map((_,j)=>`<button class="${j<=i?"on":""}" data-j="${j}" aria-label="Slide ${j+1}"></button>`).join("")}</div><button class="btn" id="nx" ${i<sl.length-1?"":"disabled"} aria-label="Slide sau" style="transform:scaleX(-1)">${ic("back")}</button><div class="grow"></div>
      ${hasSpeech()?`<button class="btn primary" id="play">${ic(playing?"pause":"play")} ${playing?"Dừng giảng":a.kind==="video"?"Phát bài giảng":"Nghe thầy giảng"}</button><label style="display:flex;gap:6px;align-items:center;font-size:13px"><input type="checkbox" class="chk" id="auto" ${auto?"checked":""}> Tự chuyển slide</label>`:""}</div>`;
    $("#narr").innerHTML=`<div class="eyebrow" style="color:var(--accent);margin-bottom:4px">Lời giảng</div>${mdBlock(s.notes||"",a.srcLabels)}`;
    $("#pv").onclick=()=>{stop();i--;draw()};$("#nx").onclick=()=>{stop();i++;draw()};
    $$("[data-j]").forEach(b=>b.onclick=()=>{stop();i=+b.dataset.j;draw()});
    const pl=$("#play");if(pl){pl.onclick=()=>playing?(stop(),draw()):play();$("#auto").onchange=e=>auto=e.target.checked}
  };
  const stop=()=>{playing=false;stopSpeech()};
  const play=async()=>{stopSpeech();playing=true;const tok=speechToken;draw();
    while(playing&&tok===speechToken){const s=sl[i]||{};const ok=await speak(sayable((s.title?s.title+". ":"")+(s.notes||(s.bullets||[]).join(". "))),{lang:(a.cfg&&a.cfg.lang)||"vi"}).catch(()=>false);
      if(!playing||tok!==speechToken)break;if(ok===false){toast("Thiết bị chưa có giọng đọc phù hợp");break}
      if(auto&&i<sl.length-1){i++;draw()}else break}
    playing=false;if(tok===speechToken)draw()};
  draw();
  $("#dkFull").onclick=()=>{const el=$("#deck");try{(el.requestFullscreen?el.requestFullscreen():Promise.reject()).catch(()=>toast("Toàn màn hình không khả dụng ở đây"))}catch(e){}};
  const key=e=>{if(e.key==="ArrowRight"&&i<sl.length-1){stop();i++;draw()}if(e.key==="ArrowLeft"&&i>0){stop();i--;draw()}};
  document.addEventListener("keydown",key);UI.modalCleanup=()=>document.removeEventListener("keydown",key);
  if(a.kind==="video")setTimeout(()=>{if(hasSpeech())play()},300);
}

/* ---------- audio overview ---------- */
function viewAudio(a){
  const lines=a.data.lines||[];let cur=-1,playing=false;const lang=(a.cfg&&a.cfg.lang)||"vi";
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="audio"><div class="wave" id="wv">${Array.from({length:48},()=>"<i></i>").join("")}</div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button class="pill-btn primary" id="apl">${ic("play")} Phát</button><button class="pill-btn" id="ast">${ic("stop")} Dừng</button><label class="field" style="grid-auto-flow:column;align-items:center;gap:8px">Tốc độ <select id="arate"><option value="0.9">0,9×</option><option value="1" selected>1×</option><option value="1.2">1,2×</option><option value="1.4">1,4×</option></select></label>
    <span class="muted" style="font-size:13px">${hasSpeech()?"Giọng đọc của trình duyệt; Thầy giọng trầm, Trò giọng cao.":"Thiết bị không hỗ trợ đọc — hãy đọc kịch bản bên dưới."}</span></div>
    <div id="alines">${lines.map((l,i)=>`<div class="line ${/trò|student/i.test(l.who)?"tro":""}" data-l="${i}"><b>${esc(l.who)}</b><span>${mdInline(l.text,a.srcLabels)}</span></div>`).join("")}</div></div>`});
  bindSrcList(a);
  let wt=0;const anim=()=>{$$("#wv i").forEach(x=>x.style.height=(playing?15+Math.random()*80:10)+"%");wt=setTimeout(anim,140)};anim();
  const mark=()=>$$("[data-l]").forEach(x=>x.classList.toggle("on",+x.dataset.l===cur));
  const run=async(from)=>{stopSpeech();playing=true;const tok=speechToken;
    for(let i=from;i<lines.length;i++){if(tok!==speechToken)break;cur=i;mark();const el=$(`[data-l="${i}"]`);if(el)el.scrollIntoView({block:"nearest",behavior:"smooth"});
      const tro=/trò|student/i.test(lines[i].who);const ok=await speak(sayable(lines[i].text),{lang,pitch:tro?1.3:0.85,rate:+$("#arate").value*(tro?1.05:1)}).catch(()=>false);if(ok===false){toast("Không phát được giọng đọc");break}}
    playing=false};
  $("#apl").onclick=()=>run(Math.max(0,cur));$("#ast").onclick=()=>{playing=false;stopSpeech()};
  $$("[data-l]").forEach(x=>x.onclick=()=>run(+x.dataset.l));
  UI.modalCleanup=()=>clearTimeout(wt);
}

/* ---------- report ---------- */
function viewReport(a){
  const secs=a.data.sections||[];
  openModal({title:a.title,actions:srcBtn(a)+`<button class="ghost ic" id="rDl" aria-label="Tải xuống">${ic("dl")}</button>`,body:`<div class="report"><nav class="toc" aria-label="Mục lục">${secs.map((s,i)=>`<button data-s="${i}" class="${i?"":"on"}"><i>${i+1}.</i><span>${esc(s.h)}</span></button>`).join("")}</nav><article class="md" id="rep">${secs.map((s,i)=>`<section id="sec${i}"><h2>${esc(s.h)}</h2>${mdBlock(s.body,a.srcLabels).replace(/<h4>/g,"<h3>").replace(/<\/h4>/g,"</h3>")}</section>`).join("")}</article></div>`,
    foot:`<button class="pill-btn" id="rNote">${ic("pin")} Lưu vào ghi chú</button>`});
  bindSrcList(a);
  $$(".toc button").forEach(b=>b.onclick=()=>{$$(".toc button").forEach(x=>x.classList.toggle("on",x===b));$("#sec"+b.dataset.s).scrollIntoView({behavior:"smooth",block:"start"})});
  const md=`# ${a.title}\n\n`+secs.map(s=>`## ${s.h}\n\n${s.body}`).join("\n\n");
  $("#rDl").onclick=()=>saveFile(slug(a.title)+".md",md,"text/markdown");
  $("#rNote").onclick=()=>addNote(a.title,md);
}

/* ---------- mindmap ---------- */
function viewMind(a){
  const root=a.data.root||{t:a.title,c:[]};let idc=0;const walk=(n,d)=>{n._id=idc++;n._d=d;(n.c||[]).forEach(c=>walk(c,d+1))};walk(root,0);
  const closed=new Set();(function col(n){if(n._d>=2&&(n.c||[]).length)closed.add(n._id);(n.c||[]).forEach(col)})(root);
  let sel=root,zoom=1;
  openModal({title:a.title,actions:srcBtn(a)+`<button class="pill-btn" id="mmZo" aria-label="Thu nhỏ">−</button><button class="pill-btn" id="mmZr">100%</button><button class="pill-btn" id="mmZi" aria-label="Phóng to">+</button><button class="pill-btn" id="mmAll">Mở rộng tất cả</button>`,body:`<div class="mm-wrap" id="mmw"></div><div class="mm-side" id="mms"></div>`});
  bindSrcList(a);UI.vb.style.position="relative";
  const draw=()=>{
    const nodes=[];let y=0;const W=t=>Math.min(260,Math.max(80,t.length*7.6+30));
    const lay=(n,x)=>{n._x=x;const kids=closed.has(n._id)?[]:(n.c||[]);if(!kids.length){n._y=y;y+=46}else{kids.forEach(k=>lay(k,x+W(n.t)+60));n._y=(kids[0]._y+kids[kids.length-1]._y)/2}nodes.push(n)};
    lay(root,20);const H=y+40,Wd=Math.max(...nodes.map(n=>n._x+W(n.t)))+60;
    let o="";nodes.forEach(n=>{const kids=closed.has(n._id)?[]:(n.c||[]);kids.forEach(k=>{const x1=n._x+W(n.t),y1=n._y+20,x2=k._x,y2=k._y+20;o+=`<path d="M${x1} ${y1}C${x1+30} ${y1} ${x2-30} ${y2} ${x2} ${y2}" stroke="var(--line)" stroke-width="2" fill="none"/>`})});
    nodes.forEach(n=>{const w=W(n.t),has=(n.c||[]).length,isC=closed.has(n._id),s=n===sel;const fill=n._d===0?"var(--accent-soft)":n._d===1?"var(--sig-soft)":"var(--panel)";
      o+=`<g data-n="${n._id}" style="cursor:pointer"><rect x="${n._x}" y="${n._y}" width="${w}" height="40" rx="12" fill="${fill}" stroke="${s?"var(--accent)":"var(--line)"}" stroke-width="${s?2:1}"/><text x="${n._x+14}" y="${n._y+25}" font-size="13.5" fill="var(--ink)" font-family="var(--f-body)">${esc(n.t.length>32?n.t.slice(0,31)+"…":n.t)}</text>${has?`<circle cx="${n._x+w}" cy="${n._y+20}" r="10" fill="var(--panel2)" stroke="var(--line)"/><text x="${n._x+w}" y="${n._y+24.5}" text-anchor="middle" font-size="13" fill="var(--muted)">${isC?"›":"‹"}</text>`:""}</g>`});
    $("#mmw").innerHTML=`<svg width="${Wd*zoom}" height="${H*zoom}" viewBox="0 0 ${Wd} ${H}">${o}</svg>`;$("#mmZr").textContent=Math.round(zoom*100)+"%";
    const all=[];(function f(n){all.push(n);(n.c||[]).forEach(f)})(root);
    $$("[data-n]").forEach(g=>g.onclick=()=>{const n=all.find(z=>z._id===+g.dataset.n);sel=n;if((n.c||[]).length){closed.has(n._id)?closed.delete(n._id):closed.add(n._id)}draw()});
    $("#mms").innerHTML=`<span class="eyebrow">Mục đang chọn</span><b>${esc(sel.t)}</b><button class="btn" id="mmAsk">${ic("chat")} Hỏi trợ lý về mục này</button>`;
    $("#mmAsk").onclick=()=>{closeModal();chatSend(`Giải thích "${sel.t}" dựa trên nguồn, kèm ví dụ.`)};
  };
  $("#mmAll").onclick=()=>{closed.clear();draw()};
  $("#mmZi").onclick=()=>{zoom=Math.min(2.5,zoom*1.2);draw()};$("#mmZo").onclick=()=>{zoom=Math.max(.35,zoom/1.2);draw()};$("#mmZr").onclick=()=>{zoom=1;draw()};
  $("#mmw").addEventListener("wheel",e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();zoom=Math.max(.35,Math.min(2.5,zoom*(e.deltaY<0?1.1:.9)));draw()},{passive:false});draw();
}

/* ---------- flashcards ---------- */
function viewFlash(a){
  let cards=[...(a.data.cards||[])],i=0,known=new Set();
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="quiz" id="fc"></div>`});bindSrcList(a);
  const draw=()=>{const c=cards[i]||{};$("#fc").innerHTML=`<div class="muted" style="text-align:center">Thẻ ${i+1}/${cards.length} · đã nhớ ${known.size}</div>
    <button class="fcard" id="card" aria-label="Lật thẻ"><div class="in"><div class="f">${esc(c.q)}</div><div class="b"><div>${mdInline(c.a||"",a.srcLabels)}<div style="margin-top:8px">${citeChips(c.cite,a.srcLabels)}</div></div></div></div></button>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="pill-btn" id="fp" ${i?"":"disabled"}>${ic("back")} Trước</button><button class="pill-btn" id="fno">Chưa nhớ</button><button class="pill-btn primary" id="fyes">${ic("check")} Đã nhớ</button><button class="pill-btn" id="fsh">${ic("shuffle")} Trộn</button></div>
    <div class="muted" style="text-align:center;font-size:13px">Bấm thẻ hoặc phím cách để lật · ← → để chuyển</div>`;
    $("#card").onclick=()=>$("#card").classList.toggle("flip");
    $("#fp").onclick=()=>{i--;draw()};const nx=()=>{if(i<cards.length-1){i++;draw()}else toast(`Hết thẻ · đã nhớ ${known.size}/${cards.length}`)};
    $("#fyes").onclick=()=>{known.add(i);nx()};$("#fno").onclick=()=>{known.delete(i);nx()};
    $("#fsh").onclick=()=>{cards.sort(()=>Math.random()-.5);i=0;known.clear();draw()}};
  const key=e=>{if(e.key===" "&&$("#card")){e.preventDefault();$("#card").classList.toggle("flip")}if(e.key==="ArrowRight"&&i<cards.length-1){i++;draw()}if(e.key==="ArrowLeft"&&i>0){i--;draw()}};
  document.addEventListener("keydown",key);UI.modalCleanup=()=>document.removeEventListener("keydown",key);draw();
}

/* ---------- quiz ---------- */
function viewQuiz(a){
  const qs=a.data.questions||[];const ans={};
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="quiz"><div class="score" id="qsc" style="display:flex;gap:10px;align-items:center"><b>0/${qs.length}</b><span class="muted">${a.best!=null?"Điểm cao nhất trước đây: "+a.best+"/"+qs.length:""}</span></div>
   ${qs.map((q,i)=>`<div class="q"><p>${i+1}. ${mdInline(q.q,a.srcLabels)}</p><div style="display:grid;gap:6px">${(q.options||[]).map((o,j)=>`<button class="optq" data-q="${i}" data-o="${j}">${String.fromCharCode(65+j)}. ${mdInline(o,a.srcLabels)}</button>`).join("")}</div>${q.hint?`<details class="expl"><summary>Gợi ý</summary>${mdInline(q.hint,a.srcLabels)}</details>`:""}<div class="expl" id="qe${i}" hidden></div></div>`).join("")}
   <div><button class="pill-btn" id="qre">Làm lại</button></div></div>`});
  bindSrcList(a);
  $$(".optq").forEach(b=>b.onclick=async()=>{const qi=+b.dataset.q,oj=+b.dataset.o,q=qs[qi];if(qi in ans)return;ans[qi]=oj===+q.answer;
    $$(`.optq[data-q="${qi}"]`).forEach((x,j)=>{x.disabled=true;if(j===+q.answer)x.classList.add("right");else if(j===oj)x.classList.add("wrong")});
    const ex=$("#qe"+qi);ex.hidden=false;ex.innerHTML=(ans[qi]?"<b style='color:var(--ok)'>Chính xác.</b> ":"<b style='color:var(--bad)'>Chưa đúng.</b> ")+mdInline(q.explain||"",a.srcLabels)+" "+citeChips(q.cite,a.srcLabels)+`<div style="margin-top:8px"><button class="btn" data-qx="${qi}">${ic("chat")} Giải thích kỹ hơn</button></div>`;
    const qx=$(`[data-qx="${qi}"]`);if(qx)qx.onclick=()=>{const txt=`Giải thích chi tiết câu hỏi sau, vì sao đáp án ${String.fromCharCode(65+ +q.answer)} đúng và vì sao các phương án còn lại sai${ans[qi]?"":` (mình đã chọn ${String.fromCharCode(65+oj)})`}:\n${q.q}\n${(q.options||[]).map((o,j)=>String.fromCharCode(65+j)+". "+o).join("\n")}`;closeViewer();chatSend(txt)};
    const sc=Object.values(ans).filter(Boolean).length;$("#qsc b").textContent=sc+"/"+qs.length;
    if(Object.keys(ans).length===qs.length){toast(`Hoàn thành: ${sc}/${qs.length}`);if(a.best==null||sc>a.best){a.best=sc;Store.patch(a.id,{best:sc}).catch(()=>{})}}});
  $("#qre").onclick=()=>viewQuiz(a);
}

/* ---------- infographic ---------- */
function viewInfo(a){
  const d=a.data,nodes=(d.nodes||[]).slice(0,8),W=1000,H=620,cx=W/2,cy=330;
  const pos=nodes.map((n,i)=>{const ang=-Math.PI/2+i*2*Math.PI/nodes.length;return {x:cx+Math.cos(ang)*330,y:cy+Math.sin(ang)*200,n}});
  const wrap=(t,max)=>{const w=String(t).split(" ");const L=[];let cur="";w.forEach(x=>{if((cur+" "+x).trim().length>max){L.push(cur);cur=x}else cur=(cur+" "+x).trim()});if(cur)L.push(cur);return L.slice(0,2)};
  let o=`<defs><pattern id="ig" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#1d2f3a" stroke-width="1"/></pattern><radialGradient id="gl"><stop offset="0" stop-color="#f2c14e" stop-opacity=".55"/><stop offset="1" stop-color="#f2c14e" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="#0f1a22"/><rect width="${W}" height="${H}" fill="url(#ig)"/>`;
  o+=`<text x="40" y="54" font-size="30" font-weight="700" fill="#f4f1e8" font-family="Be Vietnam Pro,sans-serif">${esc(d.title||a.title)}</text><text x="40" y="84" font-size="16" fill="#f2c14e" font-family="IBM Plex Sans,sans-serif">${esc(d.subtitle||"")}</text>`;
  pos.forEach(p=>{o+=`<path d="M${cx} ${cy}L${p.x} ${p.y}" stroke="#f2c14e" stroke-width="2" stroke-dasharray="4 7" opacity=".8"/><circle cx="${(cx+p.x)/2}" cy="${(cy+p.y)/2}" r="4" fill="#f2c14e"/>`});
  o+=`<circle cx="${cx}" cy="${cy}" r="120" fill="url(#gl)"/><circle cx="${cx}" cy="${cy}" r="70" fill="#1c2a33" stroke="#f2c14e" stroke-width="3"/>${wrap(d.center||"",12).map((l,i,arr)=>`<text x="${cx}" y="${cy+6+(i-(arr.length-1)/2)*20}" text-anchor="middle" font-size="16" font-weight="700" fill="#f4f1e8" font-family="Be Vietnam Pro,sans-serif">${esc(l)}</text>`).join("")}`;
  pos.forEach(p=>{o+=`<g><rect x="${p.x-115}" y="${p.y-36}" width="230" height="72" rx="10" fill="#1a2730" stroke="#33505f"/><text x="${p.x-100}" y="${p.y-8}" font-size="15" font-weight="600" fill="#f4f1e8" font-family="Be Vietnam Pro,sans-serif">${esc(p.n.label)}</text>${wrap(p.n.desc||"",30).map((l,i)=>`<text x="${p.x-100}" y="${p.y+14+i*16}" font-size="12" fill="#9fb3bf" font-family="IBM Plex Sans,sans-serif">${esc(l)}</text>`).join("")}</g>`});
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(d.title||a.title)}">${o}</svg>`;
  openModal({title:a.title,actions:srcBtn(a)+`<button class="ghost ic" id="igDl" aria-label="Tải SVG">${ic("dl")}</button>`,body:`<div class="pad" style="display:grid;gap:16px"><div class="info-board">${svg}</div>${(d.keys||[]).length?`<div class="card"><h3>Điểm mấu chốt</h3><ul style="margin:0;padding-left:20px">${d.keys.map(k=>`<li>${mdInline(k,a.srcLabels)}</li>`).join("")}</ul></div>`:""}</div>`});
  bindSrcList(a);$("#igDl").onclick=()=>saveFile(slug(a.title)+".svg",svg,"image/svg+xml");
}

/* ---------- data table ---------- */
function viewTable(a){
  const cols=a.data.columns||[];let rows=[...(a.data.rows||[])],sortC=-1,dir=1;
  openModal({title:a.title,actions:srcBtn(a)+`<button class="ghost ic" id="tDl" aria-label="Tải CSV">${ic("dl")}</button>`,body:`<div class="pad"><div class="tbl-wrap" id="tw"></div></div>`});bindSrcList(a);
  const draw=()=>{$("#tw").innerHTML=`<table class="dt"><thead><tr>${cols.map((c,i)=>`<th data-c="${i}">${esc(c)} ${sortC===i?(dir>0?"↑":"↓"):""}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${mdInline(String(c),a.srcLabels)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    $$("[data-c]").forEach(th=>th.onclick=()=>{const c=+th.dataset.c;dir=sortC===c?-dir:1;sortC=c;rows.sort((x,y)=>String(x[c]).localeCompare(String(y[c]),"vi",{numeric:true})*dir);draw()})};
  draw();const csv=[cols,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  $("#tDl").onclick=()=>saveFile(slug(a.title)+".csv","\ufeff"+csv,"text/csv");
}

/* ---------- YouTube finder ---------- */
const LIB=[
 {title:"Lec 1 | MIT 6.002 Circuits and Electronics — Introduction and Lumped Abstraction",ch:"MIT OpenCourseWare",url:"https://www.youtube.com/watch?v=AfQxyVuLeCs",dur:"41:09",tags:["mạch","KVL","KCL","Ohm","lumped"]},
 {title:"MIT 6.002 Circuits and Electronics (Spring 2007) — trọn bộ",ch:"MIT OpenCourseWare",url:"https://www.youtube.com/playlist?list=PL9F74AFA03AA06A11",tags:["mạch","RC","op-amp","MOSFET","digital abstraction"]},
 {title:"MIT 6.002 Lecture 19: The Operational Amplifier Abstraction",ch:"MIT OpenCourseWare",url:"https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/resources/lecture-19/",dur:"52:32",tags:["op-amp","khuếch đại"]},
 {title:"Making logic gates from transistors",ch:"Ben Eater",url:"https://www.youtube.com/watch?v=sTu3LwpF6XI",dur:"13:02",tags:["cổng logic","transistor","NAND","NOT"]},
 {title:"Learn how computers add numbers and build a 4 bit adder circuit",ch:"Ben Eater",url:"https://www.youtube.com/watch?v=wvJc9CZcvBc",dur:"13:39",tags:["bộ cộng","full adder","nhị phân"]},
 {title:"Số âm trong nhị phân (bù 2)",ch:"Ben Eater",url:"https://www.youtube.com/watch?v=4qH4unVtJkE",tags:["bù 2","số âm","nhị phân"]},
 {title:"SR latch",ch:"Ben Eater",url:"https://www.youtube.com/watch?v=KM0DdEaY5sY",dur:"12:58",tags:["latch","flip-flop","mạch tuần tự"]},
 {title:"Building an 8-bit breadboard computer (44 video)",ch:"Ben Eater",url:"https://www.youtube.com/watch?v=kRlSFm519Bo&list=PLowKtXNTBypGqImE405J2565dvjafglHU",tags:["CPU","bus","thanh ghi","ALU","555","D flip-flop"]},
 {title:"SPI: The serial peripheral interface (bài Hackaday kèm video)",ch:"Ben Eater",url:"https://hackaday.com/2021/09/16/taking-a-deep-dive-into-spi/",dur:"33:00",tags:["SPI","giao tiếp nối tiếp"]},
 {title:"Introduction to RTOS Part 1 — What is a Real-Time Operating System?",ch:"DigiKey",url:"https://www.youtube.com/watch?v=F321087yYy4",dur:"11:34",tags:["RTOS","nhúng"]},
 {title:"Introduction to RTOS Part 3 — Task Scheduling",ch:"DigiKey",url:"https://www.youtube.com/watch?v=95yUbClyf3E",tags:["RTOS","lập lịch"]},
 {title:"Getting Started with STM32 and Nucleo Part 1: STM32CubeIDE and Blinky",ch:"DigiKey",url:"https://www.digikey.be/en/maker/videos/shawn-hymel/getting-started-with-stm32-and-nucleo-part-1-introduction-to-stm32cubeide-and-blinky",dur:"14:47",tags:["STM32","vi điều khiển","GPIO"]},
 {title:"Digital Design and Computer Architecture — Spring 2021 (ETH Zürich)",ch:"Onur Mutlu Lectures",url:"https://www.youtube.com/watch?v=LbC0EZY8yw4&list=PL5Q2soXY2Zi_uej3aY39YB5pfW4SJ7LlN",tags:["thiết kế số","Verilog","pipeline","kiến trúc máy tính","FSM"]},
 {title:"Computer Architecture — Fall 2021 (ETH Zürich)",ch:"Onur Mutlu Lectures",url:"https://www.youtube.com/watch?v=4yfkM_5EFgo&list=PL5Q2soXY2Zi-Mnk1PxjEIG32HAGILkTOF",tags:["cache","bộ nhớ","kiến trúc máy tính"]},
 {title:"MIT 6.004 — Worked Example: Caches",ch:"MIT OpenCourseWare",url:"https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/resources/caches",tags:["cache"]},
 {title:"MIT 6.004 — Worked Example: Pipelining",ch:"MIT OpenCourseWare",url:"https://live.ocw.mit.edu/courses/6-004-computation-structures-spring-2017/resources/pipelining",tags:["pipeline"]}
];
function viewYT(a){
  const tp=a.data.topics||[];
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="pad" style="display:grid;gap:20px;max-width:900px;margin:0 auto">
   <div class="how"><span><span class="tag-ok">✓ Đã kiểm tra</span>: video trong thư viện Sổ Học, đường dẫn lấy từ nguồn gốc (MIT OCW, Ben Eater, DigiKey, ETH Zürich). <span class="tag-warn">Tìm kiếm</span>: mở trang kết quả YouTube theo từ khóa — Sổ Học chưa xem trước các video đó.</span></div>
   ${tp.map(t=>{const lib=(t.lib||[]).map(i=>LIB[+i]).filter(Boolean);return `<section style="display:grid;gap:10px"><h3 style="font-size:18px">${esc(t.topic)}</h3>${t.why?`<div class="muted" style="font-size:14px">${mdInline(t.why,a.srcLabels)}</div>`:""}
     ${lib.map(v=>`<a class="vcard" href="${esc(v.url)}" target="_blank" rel="noopener noreferrer"><div class="vthumb">${ic("play")}${v.dur?`<span>${v.dur}</span>`:""}</div><div><b>${esc(v.title)}</b><small>${esc(v.ch)}</small><div class="tag-ok">✓ Đã kiểm tra</div></div></a>`).join("")}
     <div style="display:flex;gap:8px;flex-wrap:wrap">${[t.query_en,t.query_vi].filter(Boolean).map(q=>`<a class="pill-btn" href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}" target="_blank" rel="noopener noreferrer">${ic("yt")} Tìm “${esc(q)}”</a>`).join("")}</div></section>`}).join("")}
   </div>`});bindSrcList(a);
}

/* ---------- file save ---------- */
const slug=t=>String(t||"so-hoc").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").replace(/[^\w]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"so-hoc";
async function saveFile(name,data,type){
  if(!P.downloads){toast("Tải xuống chỉ khả dụng khi mở trong ứng dụng Claude");return}
  try{await P.downloads.save({filename:name,data:new Blob([data],{type})})}catch(e){if(e&&e.code!=="cancelled"&&e.code!=="declined")toast("Không tải được tệp")}
}

/* =====================================================================
   GOOGLE CALENDAR (qua trình kết nối của người xem)
   ===================================================================== */
const GC="Google Calendar";
async function gcStatus(){
  if(!P.mcp)return "none";
  try{const r=await P.mcp.listTools(GC);const s=(r.servers||[]).find(x=>x.server===GC);if(!s||!s.tools||!s.tools.length)return "none";return s.authStatus==="needs_reauth"?"reauth":"ok"}catch(e){return "none"}
}
function gcErr(e){const c=e&&e.code;return c==="server_not_connected"?"Chưa thêm Google Calendar: vào claude.ai → Cài đặt → Trình kết nối.":c==="needs_reauth"?"Phiên Google hết hạn: kết nối lại Google Calendar trong claude.ai → Cài đặt → Trình kết nối.":c==="not_in_manifest"||c==="approval_required"?"Bạn chưa cho phép trang dùng Google Calendar.":c==="tool_error"?"Google Calendar báo lỗi: "+(e.message||"").slice(0,140):"Không kết nối được Google Calendar lúc này."}
async function gcConnect(){
  if(!P.mcp){toast("Google Calendar chỉ dùng được khi mở trang trong ứng dụng Claude");return}
  try{if(P.perm)await P.perm.request(["mcp:"+GC]).catch(()=>{});await gcList(1);toast("Đã kết nối Google Calendar");openCalendarHub()}catch(e){toast(gcErr(e),4000)}
}
const localISO=d=>{const p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:00`};
async function gcList(days=14){
  const now=new Date(),end=new Date(now.getTime()+days*864e5);
  const r=await P.mcp.callTool(GC,"list_events",{startTime:localISO(now),endTime:localISO(end),orderBy:"startTime",pageSize:50});
  const pl=r.payload||{};return (pl.events||[]).map(e=>({title:e.summary||"(Không tiêu đề)",start:(e.start&&(e.start.dateTime||e.start.date))||"",end:(e.end&&(e.end.dateTime||e.end.date))||"",link:e.htmlLink||""}));
}
async function gcCreate(ev){
  const st=new Date(ev.date+"T"+ev.start+":00"),en=new Date(st.getTime()+(ev.minutes||60)*6e4);
  const r=await P.mcp.callTool(GC,"create_event",{summary:ev.title,startTime:localISO(st),endTime:localISO(en),description:(ev.focus?"Nội dung: "+ev.focus+"\n":"")+"Tạo từ Sổ Học Điện Tử",useDefaultReminders:true});
  const p=r.payload||{};return p.htmlLink||(p.event&&p.event.htmlLink)||"";
}
function gcTemplateUrl(ev){const st=new Date(ev.date+"T"+(ev.start||"19:00")+":00"),en=new Date(st.getTime()+(ev.minutes||60)*6e4);const f=d=>localISO(d).replace(/[-:]/g,"");return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${f(st)}/${f(en)}&ctz=${encodeURIComponent(TZ)}&details=${encodeURIComponent((ev.focus||"")+"\nSổ Học Điện Tử")}`}
function icsOf(events){const f=d=>localISO(d).replace(/[-:]/g,"");const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//So Hoc Dien Tu//VI"];events.forEach((ev,i)=>{const st=new Date(ev.date+"T"+ev.start+":00"),en=new Date(st.getTime()+(ev.minutes||60)*6e4);L.push("BEGIN:VEVENT","UID:"+mkid("ev")+i+"@sohoc","DTSTAMP:"+new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",`DTSTART;TZID=${TZ}:${f(st)}`,`DTEND;TZID=${TZ}:${f(en)}`,"SUMMARY:"+ev.title.replace(/[,;]/g,"\\$&"),"DESCRIPTION:"+(ev.focus||"").replace(/\n/g,"\\n").replace(/[,;]/g,"\\$&"),"END:VEVENT")});L.push("END:VCALENDAR");return L.join("\r\n")}

/* ---------- study plan dialog ---------- */
function planDialogNb(){
  if(!UI.cur)return;const today=ymd(new Date()),exam=ymd(new Date(Date.now()+21*864e5));
  const DOW=["CN","T2","T3","T4","T5","T6","T7"];
  openModal({title:"Lịch ôn tập",small:true,body:`<div class="form">
    <p class="muted" style="margin:0">AI chia nội dung các nguồn đã chọn thành từng buổi ôn. Sổ Học kiểm tra lịch Google của bạn để tránh trùng giờ, rồi bạn chọn đưa buổi nào vào Google Calendar.</p>
    <div class="row3"><div class="field"><label for="pS">Bắt đầu</label><input type="date" id="pS" value="${today}"></div><div class="field"><label for="pE">Ngày thi / hạn chót</label><input type="date" id="pE" value="${exam}"></div><div class="field"><label for="pT">Giờ học</label><input type="time" id="pT" value="20:00"></div><div class="field"><label for="pM">Thời lượng (phút)</label><input type="number" id="pM" min="20" max="240" value="60"></div></div>
    <div class="field"><span>Ngày trong tuần</span><div class="model-pick">${DOW.map((d,i)=>`<button class="chip" data-dow="${i}" aria-pressed="${[1,3,5].includes(i)}">${d}</button>`).join("")}</div></div>
    <div class="field"><label for="pTitle">Tên môn trong lịch</label><input class="input" id="pTitle" value="${esc(UI.cur.title)}"></div></div>`,
    foot:`<div class="grow"></div><button class="pill-btn primary" id="pGo">${ic("spark")} Lập lịch</button>`});
  $$("[data-dow]").forEach(b=>b.onclick=()=>b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true"));
  $("#pGo").onclick=async()=>{
    const dows=$$("[data-dow]").filter(b=>b.getAttribute("aria-pressed")==="true").map(b=>+b.dataset.dow);
    const s=new Date($("#pS").value+"T00:00:00"),e=new Date($("#pE").value+"T00:00:00"),t=$("#pT").value||"20:00",mins=Math.max(20,+$("#pM").value||60),title=$("#pTitle").value.trim()||UI.cur.title;
    if(!dows.length||!(e>s)){toast("Chọn ngày trong tuần và hạn chót sau ngày bắt đầu");return}
    const dates=[];for(let d=new Date(s);d<e&&dates.length<30;d.setDate(d.getDate()+1))if(dows.includes(d.getDay()))dates.push(new Date(d));
    if(!dates.length){toast("Không có buổi nào trong khoảng đã chọn");return}
    $("#pGo").disabled=true;$("#pGo").innerHTML=`<span class="spin"></span> Đang lập lịch…`;
    let focus=[];
    if(P.sample&&UI.srcs.length){try{const ctx=await sourceContext();const r=await P.sample.json(`${rulesFor()}\n\nNHIỆM VỤ: Chia nội dung các nguồn thành đúng ${dates.length} buổi ôn tập theo thứ tự hợp lý (buổi cuối là ôn tổng hợp/làm đề). Mỗi buổi: "title" ≤ 8 từ, "focus" 1–2 câu nêu việc cần làm.\nTrả về CHỈ JSON: {"sessions":[{"title":"…","focus":"…"}]}\n\nNGUỒN:\n${ctx.text.slice(0,120000)}`,{modelTier:"default"});focus=r.sessions||[]}catch(err){toast("AI chưa chia được nội dung: "+aiErr(err))}}
    let busy=[];if(await gcStatus()==="ok"){try{busy=await gcList(Math.ceil((e-new Date())/864e5)+1)}catch(err){}}
    const p=n=>String(n).padStart(2,"0");
    const events=dates.map((d,i)=>{let [hh,mm]=t.split(":").map(Number);let tries=0,moved=false;
      while(tries<4){const st=new Date(d);st.setHours(hh,mm,0,0);const en=new Date(st.getTime()+mins*6e4);
        const clash=busy.some(b=>{const bs=new Date(b.start),be=new Date(b.end||b.start);return b.start.length>10&&bs<en&&be>st});if(!clash)break;hh+=1;tries++;moved=true}
      const f=focus[i]||{};return {date:`${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`,start:`${p(hh)}:${p(mm)}`,minutes:mins,title:`${title}: ${f.title||"Buổi ôn "+(i+1)}`,focus:f.focus||"",moved,added:false}});
    await Store.put("cal-"+UI.cur.id,{type:"cal",nb:UI.cur.id,nbTitle:UI.cur.title,events,created:Date.now()});
    closeModal();openPlan(UI.cur.id);
  };
}
async function openPlan(nbId){
  UI.reopen=()=>openPlan(nbId);
  const c=await Store.get("cal-"+nbId);if(!c){toast("Chưa có lịch ôn tập");return}
  const gc=await gcStatus();
  const draw=()=>{UI.vb.innerHTML=`<div class="pad" style="display:grid;gap:8px;max-width:860px;margin:0 auto">
    <div class="${gc==="ok"?"okbox":"warnbox"}">${gc==="ok"?"Google Calendar đã kết nối. Giờ học đã được dời nếu trùng lịch sẵn có (đánh dấu “đã dời”).":"Chưa kết nối Google Calendar — dùng nút “Mở trong Google” cho từng buổi, hoặc tải tệp .ics để nhập vào lịch."}</div>
    ${c.events.map((e,i)=>`<div class="ev"><div class="d"><b>${new Date(e.date+"T00:00").getDate()}</b>${new Date(e.date+"T00:00").toLocaleDateString("vi-VN",{weekday:"short",month:"short"})}</div><div class="t"><b>${esc(e.title)}</b><small>${e.start} · ${e.minutes} phút${e.moved?" · đã dời để tránh trùng":""}${e.focus?" · "+esc(e.focus):""}</small></div>
      <div style="display:flex;gap:6px">${e.added?`<a class="btn" ${e.link?`href="${esc(e.link)}" target="_blank" rel="noopener noreferrer"`:""}>${ic("check")} Đã thêm</a>`:gc==="ok"?`<button class="btn primary" data-add="${i}">${ic("plus")} Google</button>`:`<a class="btn" href="${esc(gcTemplateUrl(e))}" target="_blank" rel="noopener noreferrer">${ic("ext")} Mở trong Google</a>`}</div></div>`).join("")}</div>`;
    $$("[data-add]").forEach(b=>b.onclick=()=>addOne(+b.dataset.add,b));
  };
  const addOne=async(i,b)=>{if(b){b.disabled=true;b.innerHTML=`<span class="spin"></span>`}
    try{const link=await gcCreate(c.events[i]);c.events[i].added=true;c.events[i].link=link;await Store.patch("cal-"+nbId,{events:c.events});draw();return true}catch(e){toast(gcErr(e),4000);draw();return false}};
  openModal({title:"Lịch ôn tập · "+(c.nbTitle||""),body:"",foot:`<button class="pill-btn" id="icsDl">${ic("dl")} Tải .ics</button>${gc==="ok"?`<button class="pill-btn primary" id="addAll">${ic("cal")} Thêm tất cả vào Google Calendar</button>`:`<button class="pill-btn primary" id="gcCon">${ic("cal")} Kết nối Google Calendar</button>`}<div class="grow"></div><button class="pill-btn" id="pRedo">Lập lại</button>`});
  draw();
  $("#icsDl").onclick=()=>saveFile(slug(c.nbTitle)+"-lich-on-tap.ics",icsOf(c.events),"text/calendar");
  const aa=$("#addAll");if(aa)aa.onclick=async()=>{aa.disabled=true;let n=0;for(let i=0;i<c.events.length;i++){if(c.events[i].added)continue;if(!(await addOne(i)))break;n++}toast(`Đã thêm ${n} buổi vào Google Calendar`);aa.disabled=false};
  const gcb=$("#gcCon");if(gcb)gcb.onclick=async()=>{closeModal();await gcConnect()};
  $("#pRedo").onclick=()=>{closeModal();planDialog(subjOf(nbId)?nbId:undefined)};
}
async function openCalendarHubOld(){
  UI.reopen=()=>openCalendarHub();
  const ups=upcomingSessions();const gc=await gcStatus();
  openModal({title:"Lịch học",body:`<div class="pad" style="display:grid;gap:16px;max-width:980px;margin:0 auto"><div class="split">
    <section class="card"><h3>Buổi ôn tập trong Sổ Học</h3>${ups.length?ups.slice(0,20).map(evRow).join(""):`<div class="empty">Chưa có. Mở một sổ học → Studio → Lịch ôn tập.</div>`}
      ${UI.cals.length?`<div style="display:flex;gap:6px;flex-wrap:wrap">${UI.cals.map(c=>`<button class="chip" data-plan="${esc(c.nb)}">${esc(c.nbTitle||"Sổ học")}</button>`).join("")}</div>`:""}</section>
    <section class="card"><div style="display:flex;align-items:center;gap:8px"><h3 style="flex:1">Google Calendar · 14 ngày tới</h3>${gc==="ok"?`<button class="btn" id="gcR">Tải lại</button>`:""}</div><div id="gcBox">${gc==="ok"?`<div class="src-busy" style="padding:0"><span class="spin"></span>Đang tải lịch…</div>`:`<div class="empty">${gc==="none"?"Google Calendar chưa được thêm cho trang này.":"Cần kết nối lại."}</div><button class="pill-btn primary" id="gcC">${ic("cal")} Kết nối Google Calendar</button><p class="muted" style="font-size:12.5px">Dùng tài khoản Google bạn đã nối với Claude (ví dụ tài khoản sinh viên VGU). Lần đầu, Claude sẽ hỏi bạn có cho phép trang xem và thêm sự kiện không.</p>`}</div></section>
  </div></div>`});
  $$("[data-plan]").forEach(b=>b.onclick=()=>openPlan(b.dataset.plan));
  const load=async()=>{const box=$("#gcBox");if(!box)return;box.innerHTML=`<div class="src-busy" style="padding:0"><span class="spin"></span>Đang tải lịch…</div>`;
    try{const evs=await gcList(14);if(!$("#gcBox"))return;$("#gcBox").innerHTML=evs.length?evs.map(e=>{const d=new Date(e.start);const allDay=e.start.length<=10;return `<div class="ev"><div class="d"><b>${d.getDate()}</b>${d.toLocaleDateString("vi-VN",{weekday:"short"})}</div><div class="t"><b>${esc(e.title)}</b><small>${allDay?"Cả ngày":d.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}</small></div>${e.link?`<a class="btn" href="${esc(e.link)}" target="_blank" rel="noopener noreferrer">${ic("ext")}</a>`:"<span></span>"}</div>`}).join(""):`<div class="empty">Không có sự kiện trong 14 ngày tới.</div>`}
    catch(e){if($("#gcBox"))$("#gcBox").innerHTML=`<div class="warnbox">${esc(gcErr(e))}</div>`}};
  if(gc==="ok"){load();$("#gcR").onclick=load}else{const b=$("#gcC");if(b)b.onclick=()=>{closeModal();gcConnect()}}
}

/* =====================================================================
   CÔNG THỨC VIẾT TAY (KaTeX → MathML, font chữ tay)
   ===================================================================== */
function ensureKatex(){return window.katex?Promise.resolve(window.katex):loadScript("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js").then(()=>window.katex)}
/* AI hay bọc công thức trong $…$, $$…$$, \(…\) hoặc thêm \displaystyle → làm sạch trước khi vẽ */
function texClean(t){
  let s=String(t||"").replace(/\u00a0/g," ").trim();let m;const ds=/^\\displaystyle\b/.test(s);s=s.replace(/^(\\displaystyle\b\s*)+/,"");
  for(let k=0;k<3;k++){
    if((m=s.match(/^\$\$([\s\S]*)\$\$$/))&&!m[1].includes("$$"))s=m[1].trim();
    else if(m=s.match(/^\\\[([\s\S]*)\\\]$/))s=m[1].trim();
    else if(m=s.match(/^\\\(([\s\S]*)\\\)$/))s=m[1].trim();
    else if(m=s.match(/^\$([^$]*)\$$/))s=m[1].trim();
    else if(m=s.match(/^((?:\\(?:displaystyle|textstyle|large|Large)\s*)+)\$+([\s\S]*?)\$+$/))s=m[2].trim();
    else break}
  s=s.replace(/\\(displaystyle|textstyle|scriptstyle)\b\s*/g,"").replace(/\\\(|\\\)|\\\[|\\\]/g,"");
  if(s.includes("$")){/* lẫn chữ và công thức: phần ngoài $ thành chữ thường */
    s=s.split(/\${1,2}/).map((p,i)=>{if(i%2)return p;const q=p.trim();if(!q)return "";if(/^[\s=+\-−,;:.()<>≈→⇒0-9]*$/.test(q))return p;return `\\text{${p.replace(/[{}\\$#%&_^~]/g,"")}}`}).join(" ")}
  s=s.trim();return ds&&s?"\\displaystyle "+s:s}
function texPlain(s){return String(s).replace(/\\(cdot|times)/g,c=>c.includes("cdot")?"·":"×").replace(/\\(?:d?frac)\{([^{}]*)\}\{([^{}]*)\}?/g,"$1/$2").replace(/\\(text|mathrm|overline|bar)\{([^{}]*)\}/g,"$2").replace(/\\([a-zA-Z]+)/g,(m,w)=>({approx:"≈",le:"≤",ge:"≥",ne:"≠",pi:"π",Omega:"Ω",omega:"ω",mu:"µ",alpha:"α",beta:"β",theta:"θ",Delta:"Δ",infty:"∞",to:"→",Rightarrow:"⇒",pm:"±",sqrt:"√",quad:"  ",qquad:"   "})[w]||"").replace(/[{}]/g,"").replace(/\\[,;! ]/g," ")}
function tex(t,display,bare){
  const src=texClean(t);
  if(!window.katex)return `<span class="hw${display&&!bare?" hwd":""}" data-tex="${esc(src)}" data-d="${display?1:0}" data-b="${bare?1:0}">${esc(src)}</span>`;
  const cls=`hw${display&&!bare?" hwd":""}`;
  try{return `<span class="${cls}">${katex.renderToString(src,{output:"htmlAndMathml",throwOnError:true,displayMode:!!display,strict:false})}</span>`}
  catch(e){/* không vẽ được thì vẫn viết tay dạng chữ, không hiện mã đỏ */return `<span class="${cls} hw-plain">${esc(texPlain(src))}</span>`}
}
function upgradeMath(root){if(!window.katex||!root)return;$$("[data-tex]",root).forEach(el=>{const w=document.createElement("span");w.innerHTML=tex(el.dataset.tex,el.dataset.d==="1",el.dataset.b==="1");el.replaceWith(w.firstChild)})}
new MutationObserver(ms=>{if(!window.katex)return;for(const m of ms)m.addedNodes.forEach(n=>{if(n.nodeType===1&&(n.matches("[data-tex]")||n.querySelector("[data-tex]")))upgradeMath(n.parentNode||n)})}).observe(document.body,{childList:true,subtree:true});
/* chuyển công thức sang lời đọc cho giọng nói */
function sayable(t){
  const spoken=x=>x.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g,"$1 chia $2").replace(/\\sqrt\{([^{}]*)\}/g,"căn $1").replace(/\^\{?2\}?/g," bình phương").replace(/\^\{?([^{} ]+)\}?/g," mũ $1").replace(/_\{?([^{} ]+)\}?/g," $1")
    .replace(/\\cdot|\\times/g," nhân ").replace(/\\overline\{([^{}]*)\}/g,"$1 đảo").replace(/\\bar\{([^{}]*)\}/g,"$1 đảo").replace(/\\(Omega)/g," ôm").replace(/\\(tau)/g," tau").replace(/\\(oplus)/g," xor ").replace(/\\(approx)/g," xấp xỉ ").replace(/\\(Rightarrow|to|rightarrow)/g," suy ra ")
    .replace(/\\[a-zA-Z]+/g," ").replace(/[{}]/g,"").replace(/=/g," bằng ").replace(/\+/g," cộng ").replace(/(\w)'/g,"$1 phẩy");
  return String(t||"").replace(/\$\$([^$]+)\$\$|\$([^$]+)\$/g,(m,a,b)=>spoken(a||b)).replace(/\*\*/g,"").replace(/\[\d+(?:\s*[,–-]\s*\d+)*\]/g,"").replace(/`/g,"");
}

/* =====================================================================
   GIAO DIỆN (skin)
   ===================================================================== */
const SKINS=[
 {k:"dem",l:"Tối · Sổ tay",sw:["#0d0f11","#16191c","#e38a4e"],theme:"dark"},
 {k:"sang",l:"Sáng",sw:["#eef0f3","#ffffff","#b0571f"],theme:"light"},
 {k:"pastel",l:"Pixel pastel",sw:["#f3eeff","#ffe1ef","#4aa9e2"],theme:"light",pixel:true},
 {k:"demsao",l:"Đêm sao pixel",sw:["#16143a","#2a2762","#ff8fca"],theme:"dark",pixel:true},
 {k:"bangden",l:"Bảng đen phấn",sw:["#111d17","#223c30","#f4d06f"],theme:"dark"}
];
function applySkin(k,quiet){
  const s=SKINS.find(x=>x.k===k)||SKINS[0];const r=document.documentElement;
  r.setAttribute("data-theme",s.theme);if(s.k==="dem"||s.k==="sang")r.removeAttribute("data-skin");else r.setAttribute("data-skin",s.k);
  r.classList.toggle("pixel",!!s.pixel);
  document.body.style.backgroundImage=s.k==="pastel"?`url(${bgTile(["#ffd6ea","#d8ecff","#fff3a8","#e6dcff"],.55)})`:s.k==="demsao"?`url(${bgTile(["#ffffff","#ffe08a","#bfe3ff","#ffc4e4"],.65)})`:"";
  local.set("skin",s.k);UI.skin=s.k;if(!quiet)saveDecor();
}
function bgTile(cols,alpha){
  const c=document.createElement("canvas");c.width=c.height=180;const g=c.getContext("2d");g.globalAlpha=alpha;let seed=7;const r=()=>(seed=(seed*16807)%2147483647)/2147483647;
  for(let i=0;i<16;i++){const x=Math.floor(r()*170),y=Math.floor(r()*170),col=cols[i%cols.length],t=r();g.fillStyle=col;
    if(t<.45){g.fillRect(x,y,2,2)}else if(t<.8){g.fillRect(x,y-2,2,6);g.fillRect(x-2,y,6,2)}else{g.fillRect(x+2,y,2,10);g.fillRect(x-2,y+4,10,2);g.fillRect(x,y+2,6,6)}}
  return c.toDataURL();
}

/* =====================================================================
   STICKER PIXEL (vẽ thủ tục, không dùng ảnh bên ngoài)
   ===================================================================== */
const PAL={
 y:{o:"#eab676",f:"#fff3a0",h:"#fffbe2",w:"#ffffff"}, b:{o:"#79c3dd",f:"#d6edf7",h:"#f3fbff",w:"#ffffff"}, p:{o:"#f08bb8",f:"#f8d2ee",h:"#fff0fa",w:"#ffffff"},
 l:{o:"#b597ea",f:"#e3daff",h:"#f6f2ff",w:"#ffffff"}, m:{o:"#78d1ad",f:"#d3f6e6",h:"#f2fffa",w:"#ffffff"}, g:{o:"#e0b23e",f:"#ffe27a",h:"#fff5c8",w:"#ffffff"},
 hp:{o:"#de5f93",f:"#ffadcf",h:"#ffe0ee",w:"#ffffff"}, hl:{o:"#8577e2",f:"#c2baff",h:"#eceaff",w:"#ffffff"}, cl:{o:"#b6c7ee",f:"#ffffff",h:"#eef3ff",w:"#ffffff"}, bu:{o:"#9cc4f1",f:"rgba(214,233,255,.55)",h:"#ffffff",w:"#ffffff"}
};
function shapeGrid(w,h,inside){const g=[];for(let y=0;y<h;y++){const row=[];for(let x=0;x<w;x++){row.push(inside((x+.5)/w*2-1,(y+.5)/h*2-1)?1:0)}g.push(row)}return g}
function shade(g,{hl=true,dot=true,cross=false}={}){
  const h=g.length,w=g[0].length,out=g.map(r=>r.map(v=>v?"f":"."));
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(g[y][x]){const n=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>!(g[y+dy]&&g[y+dy][x+dx]));if(n)out[y][x]="o"}
  if(hl)for(let y=0;y<h;y++)for(let x=0;x<w;x++){const u=(x+.5)/w*2-1,v=(y+.5)/h*2-1;if(out[y][x]==="f"&&(u+v)<-.55&&(u+v)>-1.05)out[y][x]="h"}
  if(dot){const cx=Math.round(w*.62),cy=Math.round(h*.38);[[0,0],[1,0],[0,1],[1,1]].forEach(([dx,dy])=>{if(out[cy+dy]&&out[cy+dy][cx+dx]==="f")out[cy+dy][cx+dx]="w"})}
  if(cross){const cx=Math.round(w*.4),cy=Math.round(h*.58);[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{if(out[cy+dy]&&out[cy+dy][cx+dx]==="f")out[cy+dy][cx+dx]="w"})}
  return out;
}
function starIn(u,v){const ang=Math.atan2(v,u)+Math.PI/2,r=Math.hypot(u,v*1.03);const k=((ang%(2*Math.PI/5))+2*Math.PI/5)%(2*Math.PI/5)/(2*Math.PI/5);const t=Math.abs(k-.5)*2;const R=.47+(.98-.47)*Math.pow(t,1.15);return r<R}
const heartIn=(u,v)=>{const x=u*1.2,y=-v*1.25+.2;return Math.pow(x*x+y*y-1,3)-x*x*y*y*y<0};
const sparkIn=(u,v)=>Math.sqrt(Math.abs(u))+Math.sqrt(Math.abs(v))<1.02;
const moonIn=(u,v)=>Math.hypot(u,v)<.95&&Math.hypot(u-.42,v+.22)>.72;
const cloudIn=(u,v)=>[[-.45,.2,.45],[.1,-.05,.58],[.55,.25,.4],[0,.35,.5]].some(([a,b,r])=>Math.hypot(u-a,(v-b)*1.6)<r)&&v<.7;
const ringIn=(u,v)=>{const r=Math.hypot(u,v);return r<.95&&r>.55};
function painter(w,h,fn){const out=[];for(let y=0;y<h;y++){const r=[];for(let x=0;x<w;x++)r.push(fn(x,y)||".");out.push(r)}return out}
const STK={
 "star-y":()=>[shade(shapeGrid(17,17,starIn),{cross:true}),PAL.y],"star-b":()=>[shade(shapeGrid(17,17,starIn),{cross:true}),PAL.b],"star-p":()=>[shade(shapeGrid(17,17,starIn),{cross:true}),PAL.p],
 "star-l":()=>[shade(shapeGrid(15,15,starIn)),PAL.l],"star-m":()=>[shade(shapeGrid(15,15,starIn)),PAL.m],"star-g":()=>[shade(shapeGrid(13,13,starIn),{dot:false}),PAL.g],
 "spark-y":()=>[shade(shapeGrid(11,11,sparkIn),{hl:false,dot:false}),PAL.g],"spark-p":()=>[shade(shapeGrid(11,11,sparkIn),{hl:false,dot:false}),PAL.hp],
 "spark-b":()=>[shade(shapeGrid(9,9,sparkIn),{hl:false,dot:false}),PAL.b],"spark-l":()=>[shade(shapeGrid(9,9,sparkIn),{hl:false,dot:false}),PAL.hl],
 "heart-p":()=>[shade(shapeGrid(15,13,heartIn)),PAL.hp],"heart-l":()=>[shade(shapeGrid(15,13,heartIn)),PAL.hl],
 "moon":()=>[shade(shapeGrid(15,15,moonIn),{dot:false}),PAL.g],"cloud":()=>[shade(shapeGrid(20,12,cloudIn),{dot:false}),PAL.cl],
 "bubble":()=>[shade(shapeGrid(13,13,(u,v)=>Math.hypot(u,v)<.95)),PAL.bu],"ring":()=>[shade(shapeGrid(9,9,ringIn),{hl:false,dot:false}),PAL.b],
 "plus":()=>[painter(5,5,(x,y)=>x===2||y===2?(x===2&&y===2?"h":"o"):null),PAL.p],
 "led":()=>[painter(10,16,(x,y)=>{if(y<9){const u=(x+.5)/10*2-1,v=(y+.5)/9*2-1;const inside=y>=4?Math.abs(u)<.9:Math.hypot(u,(v+0.0)*1.2)<.92;if(!inside)return null;const edge=y===8||Math.abs(u)>.72||(y<4&&Math.hypot(u,v*1.2)>.7);return edge?"o":(x<4&&y<6?"h":"f")}if(y===9)return x>0&&x<9?"o":null;return (x===3||(x===6&&y<14))?"m":null}),{o:"#c2415f",f:"#ff7a92",h:"#ffd3dc",m:"#9aa3ad"}],
 "bolt":()=>[painter(9,14,(x,y)=>{const m=["....ooo..","...offo..","..offo...",".offo....","offfffoo.","oooffffo.","...offo..","..offo...","..ofo....",".ofo.....",".oo......","........."];const c=(m[y]||"")[x];return c&&c!=="."?c:null}),{o:"#e0a21a",f:"#ffe066"}],
 "chip":()=>[painter(14,14,(x,y)=>{if(x>=2&&x<=11&&y>=2&&y<=11){if(x===2||x===11||y===2||y===11)return "o";if(x===4&&y===4)return "h";return "f"}if((x<2||x>11)&&y>=3&&y<=10&&y%2===1)return "m";if((y<2||y>11)&&x>=3&&x<=10&&x%2===1)return "m";return null}),{o:"#3b3550",f:"#5b5476",h:"#c9c2e6",m:"#c9ced6"}],
 "res":()=>[painter(18,6,(x,y)=>{if((x<3||x>14)&&(y===2||y===3))return "m";if(x>=3&&x<=14){if((x===3||x===14)&&(y===0||y===5))return null;if(y===0||y===5||x===3||x===14)return "o";if(x===6)return "1";if(x===8)return "2";if(x===10)return "3";if(x===12)return "4";return y<2?"h":"f"}return null}),{o:"#b08a5a",f:"#f2dcb0",h:"#fff2d6",m:"#9aa3ad","1":"#6b3a1e","2":"#141414","3":"#c0392b","4":"#d4a82a"}],
 "bat":()=>[painter(16,9,(x,y)=>{if(x>=13&&y>=3&&y<=5)return "c";if(x<=12){if(x===0||x===12||y===0||y===8)return "o";if(y>=2&&y<=6&&x>=2&&x<=10&&x%3!==1)return "g";return "f"}return null}),{o:"#3b3550",f:"#5b5476",g:"#7be0a0",c:"#e3a24a"}],
 "win":()=>[painter(18,14,(x,y)=>{if(x===0||x===17||y===0||y===13)return "o";if(y<=3){if(y===3)return "o";if(y>=1&&y<=2&&((x>=10&&x<=11)||(x>=13&&x<=14)))return "w";return "t"}if(y===6&&x>=3&&x<=10)return "l";if(y===8&&x>=3&&x<=13)return "l";if(y===10&&x>=3&&x<=8)return "l";return "f"}),{o:"#8d72d8",t:"#ffb3d6",w:"#ffffff",f:"#fdfbff",l:"#d6ccf5"}],
 "cursor":()=>[painter(11,17,(x,y)=>{const m=["o..........","oo.........","owo........","owwo.......","owwwo......","owwwwo.....","owwwwwo....","owwwwwwo...","owwwwwwwo..","owwwwwwwwo.","owwwwwooooo","owwowwo....","owo.owwo...","oo..owwo...","o....owwo..",".....owwo..","......oo..."];const c=(m[y]||"")[x];return c&&c!=="."?c:null}),{o:"#3a2e5e",w:"#ffffff"}],
 "shoot":()=>{const st=shade(shapeGrid(13,13,starIn),{dot:false});const w=30,h=13,cols=["#ffd6ea","#d8ecff","#e6dcff"];const out=painter(w,h,(x,y)=>{if(x>=17){return st[y][x-17]!=="."?st[y][x-17]:null}const band=Math.floor((y-3)/2.4);if(y>=3&&y<=10&&x<17&&((x+y*3)%7!==0)&&x>(6-band*2)+(y%2?3:0))return "t"+Math.max(0,Math.min(2,band));return null});return [out,{...PAL.y,o:"#d98be8",t0:cols[0],t1:cols[1],t2:cols[2]}]}
};
const STK_KEYS=Object.keys(STK);const _stkCache={};
function stkURL(k,scale=4){const key=k+"@"+scale;if(_stkCache[key])return _stkCache[key];const [g,pal]=STK[k]();const h=g.length,w=g[0].length;const c=document.createElement("canvas");c.width=w*scale;c.height=h*scale;const x=c.getContext("2d");
  for(let y=0;y<h;y++)for(let i=0;i<w;i++){const ch=g[y][i];if(ch==="."||!ch)continue;const col=pal[ch];if(!col)continue;x.fillStyle=col;x.fillRect(i*scale,y*scale,scale,scale)}
  return (_stkCache[key]={url:c.toDataURL(),w,h})}

/* =====================================================================
   THANH TIỆN ÍCH BÊN TRÁI + FLYOUT
   ===================================================================== */
function renderRail(){
  const r=$("#rail");if(!r)return;const av=P.me&&P.me.avatarUrl?`<img class="avatar" src="${esc(P.me.avatarUrl)}" alt="">`:`<span class="avatar">${esc(((P.me&&P.me.name)||"B")[0].toUpperCase())}</span>`;
  const items=[["home","Trang chủ","home"],["books","Sổ học của tôi","book"],["cal","Lịch học","cal"],["lab","Phòng thí nghiệm 3D","flask"],"sep",["skin","Giao diện & màu","palette"],["stk","Sticker","star"],["wdg","Widget trang trí","widget"],["lay","Bố cục & toàn màn hình","split"]];
  r.innerHTML=`<button class="brand" data-r="home" aria-label="Sổ Học Điện Tử">${glyph("home",40)}</button>${items.map(x=>x==="sep"?`<div class="sep"></div>`:`<button data-r="${x[0]}" aria-label="${x[1]}" data-tip="${x[1]}" aria-pressed="${UI.fly===x[0]}">${ic(x[2])}</button>`).join("")}<div class="grow"></div><button data-r="acct" aria-label="Tài khoản" data-tip="Tài khoản" style="padding:0">${av}</button>`;
  $$("[data-r]",r).forEach(b=>{b.onclick=e=>railAct(b.dataset.r,b);b.onmouseenter=()=>showTip(b);b.onmouseleave=hideTip;b.onfocus=()=>showTip(b);b.onblur=hideTip});
}
function showTip(b){if(!b.dataset.tip||innerWidth<=720)return;hideTip();const t=document.createElement("div");t.className="tip";t.textContent=b.dataset.tip;document.body.appendChild(t);const r=b.getBoundingClientRect();t.style.left=(r.right+10)+"px";t.style.top=(r.top+r.height/2-t.offsetHeight/2)+"px"}
function hideTip(){$$(".tip").forEach(t=>t.remove())}
function railAct(k,btn){
  hideTip();if(innerWidth<=720&&!["skin","stk","wdg","books"].includes(k))$("#rail").classList.remove("open");
  if(k==="home"){closeFly();return goHome()}
  if(k==="cal"){closeFly();return openCalendarHub()}
  if(k==="lab"){closeFly();return openLabCatalog()}
  if(k==="lay"){closeFly();if(UI.view==="nb")return layoutMenu(btn);const m=popMenu(btn,`<button data-x="fs">${ic("full")}Toàn màn hình trình duyệt</button>${[["dock","Ghim trong cột Studio","panel"],["split","Cột riêng cạnh trò chuyện","split"],["modal","Cửa sổ nổi","win"],["full","Toàn màn hình","full"]].map(([v,l,i])=>`<button data-vm="${v}">${ic(i)}Mở nội dung Studio: ${l}${UI.vmode===v?" ✓":""}</button>`).join("")}`);$("[data-x=fs]",m).onclick=()=>{try{(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).catch(()=>toast("Toàn màn hình không khả dụng ở đây"))}catch(e){}};$$("[data-vm]",m).forEach(b=>b.onclick=()=>{UI.vmode=b.dataset.vm;local.set("vmode",UI.vmode)});return}
  if(k==="acct"){closeFly();return accountMenu(btn)}
  if(UI.fly===k)return closeFly();
  UI.fly=k;renderRail();renderFly();
}
function closeFly(){UI.fly=null;$$(".flyout").forEach(f=>f.remove());if(UI.decorating)setDecorating(false);renderRail()}
function renderFly(){
  $$(".flyout").forEach(f=>f.remove());const f=document.createElement("div");f.className="flyout";document.body.appendChild(f);
  const head=t=>`<h3>${t}<button class="ghost ic x" data-fx aria-label="Đóng">${ic("close")}</button></h3>`;
  if(UI.fly==="books"){const nbs=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0));f.innerHTML=head("Sổ học của tôi")+`<button class="pill-btn primary" id="fNew">${ic("plus")} Sổ học mới</button>`+nbs.map(n=>`<button class="src-item" data-go="${esc(n.id)}" style="border:0;background:none;border-radius:12px;text-align:left">${glyph(n.id,30)}<span style="flex:1;min-width:0"><b style="font-weight:500;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(n.title)}</b><small class="muted">${n.srcCount||0} nguồn</small></span></button>`).join("");
    $("#fNew",f).onclick=()=>{closeFly();newNotebook()};$$("[data-go]",f).forEach(b=>b.onclick=()=>{closeFly();openNotebook(b.dataset.go)})}
  if(UI.fly==="skin"){f.innerHTML=head("Giao diện & màu")+`<div class="skins">${SKINS.map(s=>`<button class="skin" data-sk="${s.k}" aria-pressed="${UI.skin===s.k}"><div class="sw">${s.sw.map(c=>`<i style="background:${c}"></i>`).join("")}</div><b>${s.l}</b></button>`).join("")}</div><p class="muted" style="font-size:12.5px;margin:0">Hai giao diện pixel có viền khung kiểu cửa sổ cổ điển, nền lấp lánh và con trỏ pixel.</p>`;
    $$("[data-sk]",f).forEach(b=>b.onclick=()=>{applySkin(b.dataset.sk);renderFly()})}
  if(UI.fly==="stk"){setDecorating(true);f.innerHTML=head("Sticker")+`<p class="muted" style="font-size:13px;margin:0">Bấm một sticker để thêm. Kéo để di chuyển; chọn sticker rồi dùng nút để phóng to, xoay hoặc xóa.</p><div class="stk-tray">${STK_KEYS.map(k=>`<button data-sa="${k}" aria-label="Thêm sticker ${k}"><img src="${stkURL(k).url}" alt=""></button>`).join("")}</div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="pill-btn" id="stkRand">${ic("spark")} Rắc ngẫu nhiên</button><button class="pill-btn" id="stkClr" style="color:var(--bad)">${ic("trash")} Xóa tất cả</button></div>`;
    $$("[data-sa]",f).forEach(b=>b.onclick=()=>addSticker(b.dataset.sa));
    $("#stkRand",f).onclick=()=>{for(let i=0;i<6;i++)addSticker(STK_KEYS[Math.floor(Math.random()*STK_KEYS.length)],{x:5+Math.random()*90,y:5+Math.random()*90,s:2+Math.random()*2.5})};
    $("#stkClr",f).onclick=()=>{D.stickers=[];renderStickers();saveDecor()}}
  if(UI.fly==="wdg"){f.innerHTML=head("Widget trang trí")+`<div class="wd-list">${Object.entries(WIDGETS).map(([k,w])=>`<label><input type="checkbox" class="chk" data-wk="${k}" ${D.widgets[k]&&D.widgets[k].on?"checked":""}><span style="flex:1"><b style="font-weight:600">${w.title}</b><br><small class="muted">${w.desc}</small></span></label>`).join("")}</div>`;
    $$("[data-wk]",f).forEach(x=>x.onchange=()=>{const k=x.dataset.wk;D.widgets[k]=Object.assign(D.widgets[k]||{},{on:x.checked});renderWidgets();saveDecor()})}
  $("[data-fx]",f).onclick=closeFly;
}

/* =====================================================================
   TRANG TRÍ: sticker & widget, lưu theo tài khoản
   ===================================================================== */
const D={custom:[],float:true,stickers:[],widgets:{},sticky:"",water:{d:"",c:0},streak:[],loaded:false};
async function initDecor(){
  let doc=null;try{doc=await Store.get("decor-me")}catch(e){}
  if(doc){Object.assign(D,{custom:doc.custom||[],float:doc.float!==false,stickers:doc.stickers||[],widgets:doc.widgets||{},sticky:doc.sticky||"",water:doc.water||{d:"",c:0},streak:doc.streak||[]});if(doc.skin&&doc.skin!==UI.skin)applySkin(doc.skin,true)}
  else{D.stickers=[{id:"s1",k:"star-y",x:96,y:93,s:2.6,r:0},{id:"s2",k:"spark-p",x:93,y:86,s:2,r:0},{id:"s3",k:"heart-l",x:3.2,y:96,s:1.8,r:-8}];D.widgets={}}
  const today=ymd(new Date());if(!D.streak.includes(today)){D.streak=[...D.streak.slice(-60),today]}
  D.loaded=true;renderStickers();renderWidgets();saveDecor();
}
let _sdT=0;function saveDecor(){if(!D.loaded)return;clearTimeout(_sdT);_sdT=setTimeout(()=>{Store.put("decor-me",{type:"decor",skin:UI.skin,stickers:D.stickers,custom:D.custom,float:D.float,widgets:D.widgets,sticky:D.sticky,water:D.water,streak:D.streak}).catch(()=>{})},900)}
function addSticker(k,o={}){D.stickers.push({id:mkid("s"),k,x:o.x??(40+Math.random()*20),y:o.y??(35+Math.random()*20),s:o.s??3,r:o.r??0});if(D.stickers.length>80)D.stickers.shift();renderStickers();saveDecor()}
function renderStickers(){
  const L=$("#decor");if(!L)return;L.innerHTML="";
  D.stickers.forEach(st=>{const m=stkURL(st.k);const img=document.createElement("img");img.className="stk"+(/spark|plus|ring/.test(st.k)?" tw":"");img.src=m.url;img.alt="";img.dataset.id=st.id;
    img.style.width=(m.w*st.s)+"px";img.style.left=`calc(${st.x}% - ${m.w*st.s/2}px)`;img.style.top=`calc(${st.y}% - ${m.h*st.s/2}px)`;img.style.rotate=(st.r||0)+"deg";img.style.animationDelay=(-(st.x*7)%4)+"s";
    if(UI.selStk===st.id)img.classList.add("sel");
    img.addEventListener("pointerdown",e=>{if(!UI.decorating)return;e.preventDefault();UI.selStk=st.id;img.setPointerCapture(e.pointerId);$$(".stk.sel").forEach(x=>x.classList.remove("sel"));img.classList.add("sel");
      const mv=ev=>{st.x=Math.max(0,Math.min(100,ev.clientX/innerWidth*100));st.y=Math.max(0,Math.min(100,ev.clientY/innerHeight*100));img.style.left=`calc(${st.x}% - ${m.w*st.s/2}px)`;img.style.top=`calc(${st.y}% - ${m.h*st.s/2}px)`;placeStkCtl()};
      const up=()=>{img.removeEventListener("pointermove",mv);img.removeEventListener("pointerup",up);saveDecor()};img.addEventListener("pointermove",mv);img.addEventListener("pointerup",up);placeStkCtl()});
    img.addEventListener("wheel",e=>{if(!UI.decorating)return;e.preventDefault();st.s=Math.max(1,Math.min(10,st.s*(e.deltaY<0?1.1:.9)));renderStickers();saveDecor()},{passive:false});
    L.appendChild(img)});
  placeStkCtl();
}
function placeStkCtl(){
  $$(".stk-ctl").forEach(x=>x.remove());if(!UI.decorating||!UI.selStk)return;const st=D.stickers.find(s=>s.id===UI.selStk);const el=$(`.stk[data-id="${UI.selStk}"]`);if(!st||!el)return;
  const r=el.getBoundingClientRect();const c=document.createElement("div");c.className="stk-ctl";c.innerHTML=`<button data-a="-" aria-label="Nhỏ hơn">−</button><button data-a="+" aria-label="To hơn">+</button><button data-a="r" aria-label="Xoay">⟳</button><button data-a="d" aria-label="Lật">⇋</button><button data-a="x" aria-label="Xóa" style="color:var(--bad)">✕</button>`;document.body.appendChild(c);
  c.style.left=Math.max(8,Math.min(innerWidth-c.offsetWidth-8,r.left+r.width/2-c.offsetWidth/2))+"px";c.style.top=Math.max(8,r.top-46)+"px";
  $$("button",c).forEach(b=>b.onclick=()=>{const a=b.dataset.a;if(a==="+")st.s=Math.min(10,st.s*1.2);if(a==="-")st.s=Math.max(1,st.s/1.2);if(a==="r")st.r=((st.r||0)+15)%360;if(a==="d"){D.stickers.push({...st,id:mkid("s"),x:Math.min(98,st.x+4),y:Math.min(98,st.y+4)})}if(a==="x"){D.stickers=D.stickers.filter(s=>s!==st);UI.selStk=null}renderStickers();saveDecor()});
}
function setDecorating(on){UI.decorating=on;document.body.classList.toggle("decorating",on);$$(".decor-bar").forEach(x=>x.remove());if(on){const b=document.createElement("div");b.className="decor-bar";b.innerHTML=`${ic("star")} Đang trang trí: kéo, cuộn để đổi cỡ<button id="decDone">Xong</button>`;document.body.appendChild(b);$("#decDone").onclick=()=>closeFly()}else{UI.selStk=null}renderStickers()}

/* ---------- pixel digits ---------- */
const F35={"0":"111101101101111","1":"010110010010111","2":"111001111100111","3":"111001111001111","4":"101101111001001","5":"111100111001111","6":"111100111101111","7":"111001010010010","8":"111101111101111","9":"111101111001111",":":"000010000010000","-":"000000111000000"," ":"000000000000000"};
function pixText(c,txt,col,px=6){const g=c.getContext("2d");const w=txt.length*4*px;c.width=w;c.height=5*px;g.clearRect(0,0,w,c.height);g.fillStyle=col;[...txt].forEach((ch,i)=>{const m=F35[ch]||F35[" "];for(let k=0;k<15;k++)if(m[k]==="1")g.fillRect(i*4*px+(k%3)*px,Math.floor(k/3)*px,px,px)})}
const css2=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
let _actx=null;function actx(){try{_actx=_actx||new (window.AudioContext||window.webkitAudioContext)();if(_actx.state==="suspended")_actx.resume();return _actx}catch(e){return null}}
function beep(){const a=actx();if(!a)return;[0,.18,.36].forEach((t,i)=>{const o=a.createOscillator(),g=a.createGain();o.type="square";o.frequency.value=[880,1175,1568][i];g.gain.value=.06;o.connect(g);g.connect(a.destination);o.start(a.currentTime+t);o.stop(a.currentTime+t+.14)})}
const QUOTES=["Hiểu bản chất trước, công thức sẽ tự nhớ.","Một mạch khó chỉ là nhiều mạch dễ ghép lại.","Vẽ sơ đồ ra giấy là đã giải được một nửa.","Sai ở mô phỏng còn hơn sai ở phòng thí nghiệm.","Mỗi flip-flop chỉ nhớ một bit, nhưng đủ nhiều thì nhớ cả thế giới.","Học 25 phút, nghỉ 5 phút, rồi học tiếp nhé.","Đọc datasheet trước khi cắm mạch.","Kiểm tra đơn vị ở mỗi bước tính."];
const WIDGETS={
 clock:{t:"clock.exe",title:"Đồng hồ pixel",desc:"Giờ hiện tại bằng số pixel",build(b){b.innerHTML=`<canvas></canvas><div class="row muted" style="font-size:12.5px"></div>`;const c=$("canvas",b),d=$(".row",b);const tick=()=>{const n=new Date();pixText(c,n.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit",hour12:false}),css2("--accent")||"#f08",7);d.textContent=n.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long"})};tick();return setInterval(tick,10000)}},
 pomo:{t:"focus.exe",title:"Pomodoro",desc:"Hẹn giờ học 25/5 phút, có chuông báo",build(b){let mode="f",dur={f:25,b:5},left=dur.f*60,run=false,last=0,iv;
   const draw=()=>{const m=String(Math.floor(left/60)).padStart(2,"0"),s=String(left%60).padStart(2,"0");pixText($("canvas",b),m+":"+s,mode==="f"?css2("--accent"):css2("--sig"),6);const tot=dur[mode]*60,done=Math.round((1-left/tot)*8);$(".hearts",b).innerHTML=Array.from({length:8},(_,i)=>`<img src="${stkURL(i<done?"heart-p":"ring",2).url}" alt="" style="width:${i<done?22:16}px;image-rendering:pixelated">`).join("");$("#pmLbl",b).textContent=mode==="f"?"Tập trung":"Nghỉ ngơi";$("#pmGo",b).textContent=run?"Tạm dừng":"Bắt đầu"};
   b.innerHTML=`<div class="row"><b id="pmLbl" style="font-size:12.5px"></b></div><canvas></canvas><div class="row hearts"></div><div class="row"><button class="sm on" id="pmGo"></button><button class="sm" id="pmRs">Đặt lại</button><button class="sm" id="pmLen">25/5</button></div>`;
   $("#pmGo",b).onclick=()=>{run=!run;last=Date.now();actx();draw()};$("#pmRs",b).onclick=()=>{run=false;left=dur[mode]*60;draw()};
   $("#pmLen",b).onclick=e=>{if(dur.f===25){dur={f:50,b:10};e.target.textContent="50/10"}else{dur={f:25,b:5};e.target.textContent="25/5"}run=false;left=dur[mode]*60;draw()};
   iv=setInterval(()=>{if(!run)return;const n=Date.now();if(n-last>=1000){left-=Math.floor((n-last)/1000);last=n;if(left<=0){beep();toast(mode==="f"?"Hết giờ tập trung — nghỉ 5 phút nhé!":"Hết giờ nghỉ — quay lại học thôi!",4000);mode=mode==="f"?"b":"f";left=dur[mode]*60}draw()}},250);draw();return iv}},
 water:{t:"h2o.exe",title:"Uống nước",desc:"Đếm cốc nước, nhắc mỗi 45 phút",build(b){const today=ymd(new Date());if(D.water.d!==today)D.water={d:today,c:0};
   const draw=()=>{b.innerHTML=`<div class="row" style="gap:3px">${Array.from({length:8},(_,i)=>`<span style="width:18px;height:24px;border:2px solid var(--sig);border-top:0;border-radius:0 0 5px 5px;background:${i<D.water.c?"var(--sig-soft)":"transparent"};position:relative;display:inline-block">${i<D.water.c?`<i style="position:absolute;left:2px;right:2px;bottom:2px;height:60%;background:var(--sig);border-radius:0 0 3px 3px"></i>`:""}</span>`).join("")}</div><div class="row"><b>${D.water.c}/8 cốc</b><button class="sm on" id="wPlus">+ 1 cốc</button></div><div class="quote" style="font-size:15px">♡ Nhớ uống nước nhé ♡</div>`;$("#wPlus",b).onclick=()=>{D.water.c=Math.min(12,D.water.c+1);saveDecor();draw()}};draw();
   return setInterval(()=>toast("Uống một ngụm nước nhé ♡",3500),45*60000)}},
 sound:{t:"lofi.exe",title:"Âm thanh tập trung",desc:"Tiếng mưa, tiếng ồn nâu, quạt máy — tạo trực tiếp",build(b){let node=null,gain=null,kind="rain",raf=0;
   b.innerHTML=`<div class="row" style="gap:3px;height:34px;align-items:flex-end" id="sBars">${Array.from({length:16},()=>`<i style="width:6px;height:4px;background:var(--accent);display:inline-block;border-radius:1px"></i>`).join("")}</div><div class="row">${[["rain","Mưa"],["brown","Ồn nâu"],["fan","Quạt"]].map(([k,l])=>`<button class="sm ${k===kind?"on":""}" data-sk="${k}">${l}</button>`).join("")}</div><div class="row"><button class="sm on" id="sPlay">▶ Phát</button><input type="range" id="sVol" min="0" max="1" step=".01" value=".35" style="width:110px" aria-label="Âm lượng"></div>`;
   const stop=()=>{try{node&&node.stop()}catch(e){}node=null;cancelAnimationFrame(raf);$("#sPlay",b).textContent="▶ Phát";$$("#sBars i",b).forEach(x=>x.style.height="4px")};
   const start=()=>{const a=actx();if(!a){toast("Thiết bị không hỗ trợ âm thanh");return}const len=a.sampleRate*4,buf=a.createBuffer(2,len,a.sampleRate);for(let ch=0;ch<2;ch++){const d=buf.getChannelData(ch);let l=0,b0=0,b1=0,b2=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;if(kind==="brown"){l=(l+.02*w)/1.02;d[i]=l*3.2}else if(kind==="rain"){b0=.99765*b0+w*.099;b1=.963*b1+w*.2965;b2=.57*b2+w*1.0526;d[i]=(b0+b1+b2+w*.1848)*.11*(Math.random()<.0008?3:1)}else{d[i]=w*.5}}}
     node=a.createBufferSource();node.buffer=buf;node.loop=true;const f=a.createBiquadFilter();f.type="lowpass";f.frequency.value=kind==="fan"?520:kind==="rain"?2600:900;gain=a.createGain();gain.gain.value=+$("#sVol",b).value;node.connect(f);f.connect(gain);gain.connect(a.destination);node.start();$("#sPlay",b).textContent="❚❚ Dừng";
     const an=()=>{$$("#sBars i",b).forEach(x=>x.style.height=(4+Math.random()*28*(+$("#sVol",b).value+.2))+"px");raf=setTimeout(()=>requestAnimationFrame(an),120)};an()};
   $("#sPlay",b).onclick=()=>node?stop():start();$("#sVol",b).oninput=e=>{if(gain)gain.gain.value=+e.target.value};
   $$("[data-sk]",b).forEach(x=>x.onclick=()=>{kind=x.dataset.sk;$$("[data-sk]",b).forEach(y=>y.classList.toggle("on",y===x));if(node){stop();start()}});return {stop}}},
 next:{t:"plan.exe",title:"Buổi ôn tiếp theo",desc:"Buổi học gần nhất trong lịch ôn tập",build(b){const draw=()=>{const e=upcomingSessions()[0];b.innerHTML=e?`<b>${esc(e.title)}</b><span class="muted">${new Date(e.date+"T"+e.start).toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"short"})} · ${e.start}</span>${e.focus?`<span class="quote" style="text-align:left;font-size:15px">${esc(e.focus)}</span>`:""}<button class="sm on" id="nxOpen">Mở lịch học</button>`:`<span class="muted">Chưa có buổi ôn. Tạo trong Studio → Lịch ôn tập.</span><button class="sm on" id="nxOpen">Mở lịch học</button>`;$("#nxOpen",b).onclick=openCalendarHub};draw();return setInterval(draw,60000)}},
 sticky:{t:"note.txt",title:"Giấy nhớ",desc:"Ghi nhanh bằng nét chữ tay",build(b){b.innerHTML=`<textarea aria-label="Giấy nhớ" placeholder="Viết gì đó…">${esc(D.sticky)}</textarea>`;let t;$("textarea",b).oninput=e=>{clearTimeout(t);t=setTimeout(()=>{D.sticky=e.target.value;saveDecor()},600)}}},
 progress:{t:"hp.exe",title:"Tiến độ & chuỗi ngày",desc:"Số sổ học, nguồn và chuỗi ngày học liên tiếp",build(b){const draw=()=>{let k=0;for(let d=new Date();;d.setDate(d.getDate()-1)){if(D.streak.includes(ymd(d)))k++;else break;if(k>60)break}const src=UI.nbs.reduce((a,n)=>a+(n.srcCount||0),0);
   b.innerHTML=`<div class="row">${Array.from({length:7},(_,i)=>`<img src="${stkURL(i<k?"heart-p":"heart-l",2).url}" alt="" style="width:22px;opacity:${i<k?1:.35};image-rendering:pixelated">`).join("")}</div><div class="row"><b>${k} ngày liên tiếp</b></div><div class="row muted" style="font-size:12.5px">${UI.nbs.length} sổ học · ${src} nguồn</div>`};draw();return setInterval(draw,30000)}},
 quote:{t:"hello.exe",title:"Lời nhắc",desc:"Câu động viên khi học",build(b){let i=Math.floor(Math.random()*QUOTES.length);const draw=()=>{b.innerHTML=`<div class="row"><img src="${stkURL("star-y",2).url}" alt="" style="width:30px;image-rendering:pixelated"></div><div class="quote">${esc(QUOTES[i])}</div><div class="row"><button class="sm" id="qNext">Câu khác</button></div>`;$("#qNext",b).onclick=()=>{i=(i+1)%QUOTES.length;draw()}};draw()}}
};
const _wRun={};
function renderWidgets(){
  const L=$("#widgets");if(!L)return;
  Object.keys(WIDGETS).forEach((k,idx)=>{const st=D.widgets[k];let el=$(`.wdg[data-w="${k}"]`);
    if(!st||!st.on){if(el){el.remove();const r=_wRun[k];if(r){if(typeof r==="number")clearInterval(r);else if(r.stop)r.stop()}delete _wRun[k]}return}
    if(!el){const w=WIDGETS[k];el=document.createElement("div");el.className="wdg";el.dataset.w=k;el.innerHTML=`<div class="wdg-h"><b>${w.t}</b><button data-m aria-label="Thu gọn">_</button><button data-x aria-label="Đóng">×</button></div><div class="wdg-b"></div>`;L.appendChild(el);
      if(st.x==null){const n=$$(".wdg",L).length-1;st.x=Math.max(70,innerWidth-250-(n%4)*240);st.y=Math.max(70,innerHeight-230-Math.floor(n/4)*200)}
      _wRun[k]=w.build($(".wdg-b",el));
      const h=$(".wdg-h",el);h.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;h.setPointerCapture(e.pointerId);const ox=e.clientX-st.x,oy=e.clientY-st.y;el.classList.add("dragging");const mv=ev=>{st.x=Math.max(0,Math.min(innerWidth-60,ev.clientX-ox));st.y=Math.max(0,Math.min(innerHeight-30,ev.clientY-oy));el.style.left=st.x+"px";el.style.top=st.y+"px"};const up=()=>{el.classList.remove("dragging");h.removeEventListener("pointermove",mv);h.removeEventListener("pointerup",up);saveDecor()};h.addEventListener("pointermove",mv);h.addEventListener("pointerup",up)});
      $("[data-m]",el).onclick=()=>{st.min=!st.min;el.classList.toggle("min",st.min);saveDecor()};
      $("[data-x]",el).onclick=()=>{st.on=false;renderWidgets();saveDecor();if(UI.fly==="wdg")renderFly()}}
    st.x=Math.max(0,Math.min(innerWidth-Math.min(innerWidth,(el.offsetWidth||200))-4,st.x));st.y=Math.max(0,Math.min(innerHeight-40,st.y));el.style.left=st.x+"px";el.style.top=st.y+"px";el.classList.toggle("min",!!st.min);el.classList.toggle("float",!!D.float&&!st.min)});
}
addEventListener("resize",()=>{if(D.loaded){renderWidgets();renderStickers()}});

/* =====================================================================
   BÀI GIẢNG VIDEO — cảnh vẽ tay chuyển động, điều khiển theo thời gian
   ===================================================================== */
const VSCENES=`- title {"text","sub"} — mở đầu
- bullets {"items":[≤5 ý ngắn]} — liệt kê
- equation {"steps":["LaTeX bước 1","LaTeX bước 2",…],"note":"…"} — biến đổi/tính toán viết tay từng dòng, bước cuối được khoanh
- gate {"gate":"AND|OR|NOT|NAND|NOR|XOR"} — cổng logic chạy qua bảng chân lý
- latch {"kind":"nand|nor"} — mạch chốt SR nối chéo, giữ/đặt/xóa
- timing {"signals":[{"name":"CLK","wave":"pppppppp"},{"name":"D","wave":"0.1..0.1"},{"name":"Q","wave":"0..1..0."}]} — giản đồ thời gian; ký tự 0,1,x,. (giữ),p (một chu kỳ xung nhịp)
- circuit {"kind":"led|divider|rc"} — sơ đồ mạch có dòng điện chạy
- memgrid {"rows":6,"cols":8,"label":"…"} — lưới ô nhớ (mỗi ô một bit)
- counter {"bits":3} — bộ đếm nhị phân dùng flip-flop
- shift {"bits":4,"data":"1011"} — thanh ghi dịch
- flow {"steps":["…","…"]} — quy trình các bước có mũi tên
- compare {"left":{"title","items":[]},"right":{"title","items":[]}} — so sánh hai khái niệm
- bigfact {"value":"…","label":"…"} — một con số/khái niệm nổi bật
- graph {"fn":"rc_charge|rc_discharge|sine|square|linear|quadratic|exp_decay","xlabel","ylabel","label"} — đồ thị được vẽ dần
- loop {"label":"…"} — vòng lặp vô tận (hồi tiếp)
- table {"headers":[],"rows":[[]]} — bảng`;
const NS="http://www.w3.org/2000/svg";
const clamp01=x=>Math.max(0,Math.min(1,x));
const seg=(p,a,b)=>clamp01((p-a)/(b-a));
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
function vpal(ch){return ch?{ink:"#f1efe2",soft:"#a9bdb0",blue:"#9fd3ff",or:"#f4d06f",red:"#ff9a8a",green:"#a8e6b0",paper:"#203b2f",fill:"rgba(255,255,255,.06)"}:{ink:"#2b3a55",soft:"#8a97ad",blue:"#3a86c8",or:"#e39b1b",red:"#d9534f",green:"#3a9b5c",paper:"#f4efe4",fill:"rgba(58,134,200,.08)"}}
function sv(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function jit(seed){let s=seed||1;return ()=>((s=(s*16807)%2147483647)/2147483647-.5)}
function wobble(pts,amt,seed){const r=jit(seed);let d=`M${pts[0][0]+r()*amt} ${pts[0][1]+r()*amt}`;for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i];const mx=(x0+x1)/2+r()*amt*1.6,my=(y0+y1)/2+r()*amt*1.6;d+=` Q${mx} ${my} ${x1+r()*amt} ${y1+r()*amt}`}return d}
function ink(g,d,o){const p=sv("path",{d,fill:o.fill||"none",stroke:o.c,"stroke-width":o.w||4,"stroke-linecap":"round","stroke-linejoin":"round",pathLength:1},g);p.style.strokeDasharray="1";p.style.strokeDashoffset="1";if(o.fill&&o.fill!=="none")p.style.fillOpacity="0";return {el:p,set(q){p.style.strokeDashoffset=String(1-q);if(o.fill&&o.fill!=="none")p.style.fillOpacity=String(Math.max(0,q*2-1)*(o.fo??1))}}}
function wtext(g,x,y,txt,o){const t=sv("text",{x,y,"font-size":o.s||40,fill:o.c,"text-anchor":o.a||"start","font-family":"Patrick Hand, Itim, cursive","dominant-baseline":"middle"},g);t.textContent=txt;let bb=null;const id="c"+Math.random().toString(36).slice(2);const cp=sv("clipPath",{id},g);const rect=sv("rect",{x:0,y:0,width:0,height:0},cp);t.setAttribute("clip-path",`url(#${id})`);
  return {el:t,set(q){if(!bb){try{bb=t.getBBox()}catch(e){bb={x,y:y-30,width:600,height:60}}rect.setAttribute("x",bb.x-6);rect.setAttribute("y",bb.y-10);rect.setAttribute("height",bb.height+20)}rect.setAttribute("width",Math.max(0,(bb.width+12)*q))},text(v){t.textContent=v;bb=null}}}
function wrapText(s,max){const w=String(s||"").split(/\s+/);const L=[];let c="";w.forEach(x=>{if((c+" "+x).trim().length>max&&c){L.push(c);c=x}else c=(c+" "+x).trim()});if(c)L.push(c);return L}
function spark(g,x,y,r,c){return ink(g,`M${x} ${y-r}Q${x+r*.12} ${y-r*.12} ${x+r} ${y}Q${x+r*.12} ${y+r*.12} ${x} ${y+r}Q${x-r*.12} ${y+r*.12} ${x-r} ${y}Q${x-r*.12} ${y-r*.12} ${x} ${y-r}Z`,{c,w:3,fill:c,fo:.6})}
const GATES={AND:{d:"M15 15H50A35 35 0 0 1 50 85H15Z",inx:15,out:85},NAND:{d:"M15 15H50A35 35 0 0 1 50 85H15Z",inx:15,out:85,bub:true},OR:{d:"M12 15Q36 50 12 85Q58 85 86 50Q58 15 12 15Z",inx:22,out:86},NOR:{d:"M12 15Q36 50 12 85Q58 85 86 50Q58 15 12 15Z",inx:22,out:86,bub:true},XOR:{d:"M20 15Q44 50 20 85Q64 85 90 50Q64 15 20 15ZM8 15Q32 50 8 85",inx:24,out:90},NOT:{d:"M20 18L78 50L20 82Z",inx:20,out:78,bub:true,one:true}};
const GF={AND:(a,b)=>a&b,NAND:(a,b)=>1-(a&b),OR:(a,b)=>a|b,NOR:(a,b)=>1-(a|b),XOR:(a,b)=>a^b,NOT:a=>1-a};
function gateAt(g,type,x,y,s,c,seed){const G=GATES[type]||GATES.AND;const k=s/100;const tr=`translate(${x} ${y}) scale(${k})`;const grp=sv("g",{transform:tr},g);const body=ink(grp,G.d,{c,w:4/k});let bub=null;if(G.bub){bub=ink(grp,`M${G.out+12} 50a6 6 0 1 0 -12 0a6 6 0 1 0 12 0`,{c,w:4/k})}
  const out=G.out+(G.bub?12:0);return {set(q){body.set(q);if(bub)bub.set(seg(q,.7,1))},inA:[x+G.inx*k,y+(G.one?50:35)*k],inB:[x+G.inx*k,y+65*k],out:[x+out*k,y+50*k],one:!!G.one}}

/* ---------- scene builders: each returns update(p) ---------- */
const VB={
 title(g,W,H,v,C){const m=Math.min(W,H);const L=wrapText(v.text||"",W>H?26:14);const ts=L.map((l,i)=>wtext(g,W/2,H*.42+(i-(L.length-1)/2)*m*.11,l,{s:m*.095,c:C.ink,a:"middle"}));
   const ul=ink(g,wobble([[W*.28,H*.42+L.length*m*.06+20],[W*.5,H*.42+L.length*m*.06+28],[W*.72,H*.42+L.length*m*.06+16]],6,3),{c:C.or,w:7});
   const sub=wtext(g,W/2,H*.42+L.length*m*.06+m*.1,v.sub||"",{s:m*.05,c:C.soft,a:"middle"});const sp=[spark(g,W*.18,H*.25,m*.04,C.or),spark(g,W*.83,H*.3,m*.03,C.blue),spark(g,W*.78,H*.74,m*.025,C.red)];
   return p=>{ts.forEach((t,i)=>t.set(seg(p,.05+i*.15,.4+i*.15)));ul.set(seg(p,.4,.62));sub.set(seg(p,.55,.85));sp.forEach((s,i)=>s.set(seg(p,.3+i*.12,.5+i*.12)))}},
 bullets(g,W,H,v,C){const m=Math.min(W,H),items=(v.items||[]).slice(0,5),wide=W>H;const parts=[];let y=H*(wide?.3:.28);
   items.forEach((it,i)=>{const L=wrapText(it,wide?40:20);const dot=ink(g,`M${W*.12+10} ${y}a10 10 0 1 0 -20 0a10 10 0 1 0 20 0`,{c:C.or,w:5,fill:C.or,fo:.5});const ts=L.map((l,j)=>wtext(g,W*.12+30,y+j*m*.075,l,{s:m*.06,c:C.ink}));parts.push({dot,ts});y+=L.length*m*.075+m*(wide?.04:.05)});
   return p=>{const n=parts.length||1;parts.forEach((pt,i)=>{const a=i/n*.85,b=a+.85/n;pt.dot.set(seg(p,a,a+.08));pt.ts.forEach((t,j)=>t.set(seg(p,a+.05+j*(b-a)/pt.ts.length*.8,a+.05+(j+1)*(b-a)/pt.ts.length*.8)))})}},
 equation(g,W,H,v,C,host){const box=document.createElement("div");box.className="vmath";box.style.color=C.ink;const steps=(v.steps||[]).slice(0,6);box.innerHTML=steps.map(s=>`<div class="ln">${tex("\\displaystyle "+s,false,true)}</div>`).join("");host.appendChild(box);
   const lns=$$(".ln",box);const W2=W,ring=ink(g,"M0 0",{c:C.red,w:5});let placed=false;const note=wtext(g,W/2,H*.84,v.note||"",{s:Math.min(W,H)*.045,c:C.or,a:"middle"});
   return p=>{const n=lns.length||1;lns.forEach((l,i)=>{const q=seg(p,i/n*.75,(i+1)/n*.75);l.style.clipPath=`inset(-10% ${100-q*100}% -10% 0)`});
     if(!placed&&lns.length>1){const svgE=g.ownerSVGElement,lr=(lns[lns.length-1].querySelector(".katex-html")||lns[lns.length-1].querySelector("math")||lns[lns.length-1].firstElementChild).getBoundingClientRect();const M=svgE&&svgE.getScreenCTM&&svgE.getScreenCTM();if(M&&lr.width){const iv=M.inverse();const P1=new DOMPoint(lr.left,lr.top).matrixTransform(iv),P2=new DOMPoint(lr.right,lr.bottom).matrixTransform(iv);const x0=P1.x-24,x1=P2.x+24,y0=P1.y-12,y1=P2.y+12,cx=(x0+x1)/2,cy=(y0+y1)/2,rx=(x1-x0)/2,ry=(y1-y0)/2;const pts=[];for(let a=0;a<=1.08;a+=.04){const t=-Math.PI*.6+a*Math.PI*2;pts.push([cx+Math.cos(t)*rx,cy+Math.sin(t)*ry])}ring.el.setAttribute("d",wobble(pts,3,5));placed=true}}
     ring.set(lns.length>1?seg(p,.78,.92):0);note.set(seg(p,.82,1))}},
 gate(g,W,H,v,C){const type=(v.gate||"AND").toUpperCase(),m=Math.min(W,H),s=m*.42,wide=W>H;const x=W*(wide?.32:.5)-s/2,y=H*(wide?.5:.4)-s/2;const G=gateAt(g,GATES[type]?type:"AND",x,y,s,C.ink);
   const wA=ink(g,`M${G.inA[0]-m*.18} ${G.inA[1]}H${G.inA[0]}`,{c:C.ink,w:4}),wB=G.one?null:ink(g,`M${G.inB[0]-m*.18} ${G.inB[1]}H${G.inB[0]}`,{c:C.ink,w:4}),wY=ink(g,`M${G.out[0]} ${G.out[1]}H${G.out[0]+m*.16}`,{c:C.ink,w:4});
   const lamp=sv("circle",{cx:G.out[0]+m*.2,cy:G.out[1],r:m*.035,fill:"none",stroke:C.ink,"stroke-width":3},g);
   const tA=wtext(g,G.inA[0]-m*.2,G.inA[1],"A",{s:m*.05,c:C.soft,a:"end"}),tB=G.one?null:wtext(g,G.inB[0]-m*.2,G.inB[1],"B",{s:m*.05,c:C.soft,a:"end"});
   const vA=wtext(g,G.inA[0]-m*.12,G.inA[1]-m*.04,"0",{s:m*.05,c:C.or,a:"middle"}),vB=G.one?null:wtext(g,G.inB[0]-m*.12,G.inB[1]-m*.04,"0",{s:m*.05,c:C.or,a:"middle"}),vY=wtext(g,G.out[0]+m*.08,G.out[1]-m*.04,"0",{s:m*.05,c:C.or,a:"middle"});
   const lab=wtext(g,x+s/2,y-m*.04,type,{s:m*.055,c:C.ink,a:"middle"});
   const rows=G.one?[[0],[1]]:[[0,0],[0,1],[1,0],[1,1]];const tx=wide?W*.7:W*.32,ty=wide?H*.32:H*.66,cw=m*.09,rh=m*.065;const tt=[];
   const hdr=(G.one?["A","Y"]:["A","B","Y"]);hdr.forEach((h,j)=>tt.push(wtext(g,tx+j*cw,ty,h,{s:m*.045,c:C.soft,a:"middle"})));
   const hl=sv("rect",{x:tx-cw/2,y:ty+rh*.5,width:cw*hdr.length,height:rh,rx:8,fill:C.or,opacity:0},g);
   rows.forEach((r,i)=>{const y2=ty+rh*(i+1);[...r,G.one?GF.NOT(r[0]):GF[type](r[0],r[1])].forEach((c,j)=>tt.push(wtext(g,tx+j*cw,y2,String(c),{s:m*.045,c:C.ink,a:"middle"})))});
   return p=>{G.set(seg(p,0,.25));wA.set(seg(p,.15,.3));wB&&wB.set(seg(p,.15,.3));wY.set(seg(p,.2,.35));tA.set(seg(p,.2,.3));tB&&tB.set(seg(p,.2,.3));lab.set(seg(p,.25,.35));tt.forEach((t,i)=>t.set(seg(p,.3+i*.015,.36+i*.015)));
     if(p<.4){[vA,vB,vY].forEach(t=>t&&t.set(0));lamp.setAttribute("fill","none");hl.setAttribute("opacity",0);return}
     const i=Math.min(rows.length-1,Math.floor(seg(p,.4,.98)*rows.length));const r=rows[i];const y=G.one?GF.NOT(r[0]):GF[type](r[0],r[1]);
     vA.text(String(r[0]));vA.set(1);if(vB){vB.text(String(r[1]));vB.set(1)}vY.text(String(y));vY.set(1);
     wA.el.setAttribute("stroke",r[0]?C.or:C.ink);if(wB)wB.el.setAttribute("stroke",r[1]?C.or:C.ink);wY.el.setAttribute("stroke",y?C.or:C.ink);lamp.setAttribute("fill",y?C.or:"none");
     hl.setAttribute("y",ty+rh*(i+.5));hl.setAttribute("opacity",.22)}},
 latch(g,W,H,v,C){const nand=(v.kind||"nand")!=="nor",type=nand?"NAND":"NOR",m=Math.min(W,H),s=m*.24;const cx=W/2,yT=H*.36,yB=H*.66;const x=cx-s/2;
   const T=gateAt(g,type,x,yT-s/2,s,C.ink),B=gateAt(g,type,x,yB-s/2,s,C.ink);const dx=m*.06;
   const w=[ink(g,`M${T.inA[0]-m*.2} ${T.inA[1]}H${T.inA[0]}`,{c:C.ink,w:4}),ink(g,`M${B.inB[0]-m*.2} ${B.inB[1]}H${B.inB[0]}`,{c:C.ink,w:4}),ink(g,`M${T.out[0]} ${T.out[1]}H${T.out[0]+m*.18}`,{c:C.ink,w:4}),ink(g,`M${B.out[0]} ${B.out[1]}H${B.out[0]+m*.18}`,{c:C.ink,w:4})];
   const fb1=ink(g,wobble([[T.out[0]+dx,T.out[1]],[T.out[0]+dx,T.out[1]+s*.45],[B.inA[0]-dx,B.inA[1]-s*.35],[B.inA[0]-dx,B.inA[1]],[B.inA[0],B.inA[1]]],1.5,7),{c:C.ink,w:3.5}),fb2=ink(g,wobble([[B.out[0]+dx,B.out[1]],[B.out[0]+dx,B.out[1]-s*.45],[T.inB[0]-dx,T.inB[1]+s*.35],[T.inB[0]-dx,T.inB[1]],[T.inB[0],T.inB[1]]],1.5,9),{c:C.ink,w:3.5});
   const lS=wtext(g,T.inA[0]-m*.22,T.inA[1],nand?"S̄ (SET)":"S (SET)",{s:m*.04,c:C.soft,a:"end"}),lR=wtext(g,B.inB[0]-m*.22,B.inB[1],nand?"R̄ (RESET)":"R (RESET)",{s:m*.04,c:C.soft,a:"end"}),lQ=wtext(g,T.out[0]+m*.2,T.out[1],"Q",{s:m*.05,c:C.ink}),lQn=wtext(g,B.out[0]+m*.2,B.out[1],"Q̄",{s:m*.05,c:C.ink});
   const vS=wtext(g,T.inA[0]-m*.12,T.inA[1]-m*.035,"1",{s:m*.05,c:C.or,a:"middle"}),vR=wtext(g,B.inB[0]-m*.12,B.inB[1]-m*.035,"1",{s:m*.05,c:C.or,a:"middle"}),vQ=wtext(g,T.out[0]+m*.11,T.out[1]-m*.035,"0",{s:m*.05,c:C.or,a:"middle"}),vQn=wtext(g,B.out[0]+m*.11,B.out[1]-m*.035,"1",{s:m*.05,c:C.or,a:"middle"});
   const lg1=wtext(g,cx,yT-s*.72,"Cổng "+type,{s:m*.035,c:C.soft,a:"middle"}),lg2=wtext(g,cx,yB+s*.72,"Cổng "+type,{s:m*.035,c:C.soft,a:"middle"});
   const act=wtext(g,W/2,H*.86,"",{s:m*.05,c:C.or,a:"middle"});
   const seq=nand?[[1,1,0,"Giữ trạng thái"],[0,1,1,"Đặt: S̄ = 0 → Q = 1"],[1,1,1,"Giữ: Q vẫn = 1 (nhớ!)"],[1,0,0,"Xóa: R̄ = 0 → Q = 0"],[1,1,0,"Giữ: Q vẫn = 0"]]:[[0,0,0,"Giữ trạng thái"],[1,0,1,"Đặt: S = 1 → Q = 1"],[0,0,1,"Giữ: Q vẫn = 1 (nhớ!)"],[0,1,0,"Xóa: R = 1 → Q = 0"],[0,0,0,"Giữ: Q vẫn = 0"]];
   return p=>{T.set(seg(p,0,.2));B.set(seg(p,.05,.25));w.forEach((x,i)=>x.set(seg(p,.15+i*.03,.3+i*.03)));fb1.set(seg(p,.25,.42));fb2.set(seg(p,.28,.45));[lS,lR,lQ,lQn,lg1,lg2].forEach((t,i)=>t.set(seg(p,.3+i*.02,.4+i*.02)));
     if(p<.45){[vS,vR,vQ,vQn,act].forEach(t=>t.set(0));return}const k=Math.min(seq.length-1,Math.floor(seg(p,.45,.99)*seq.length));const [S,R,Q,txt]=seq[k];
     vS.text(String(S));vR.text(String(R));vQ.text(String(Q));vQn.text(String(1-Q));[vS,vR,vQ,vQn].forEach(t=>t.set(1));act.text(txt);act.set(seg(p,.45+k*.108,.5+k*.108));
     w[0].el.setAttribute("stroke",S?C.or:C.ink);w[1].el.setAttribute("stroke",R?C.or:C.ink);w[2].el.setAttribute("stroke",Q?C.or:C.ink);w[3].el.setAttribute("stroke",Q?C.ink:C.or);fb1.el.setAttribute("stroke",Q?C.or:C.ink);fb2.el.setAttribute("stroke",Q?C.ink:C.or)}},
 timing(g,W,H,v,C){const sig=(v.signals||[]).slice(0,5),m=Math.min(W,H),wide=W>H;const x0=W*(wide?.17:.2),x1=W*.92,top=H*(wide?.26:.3),rowH=Math.min(m*.15,(H*.55)/Math.max(1,sig.length)),amp=rowH*.42;
   const N=Math.max(...sig.map(s=>(s.wave||"").length),8),cw=(x1-x0)/N;const grid=[];for(let i=0;i<=N;i++)grid.push(sv("line",{x1:x0+i*cw,x2:x0+i*cw,y1:top-rowH*.4,y2:top+rowH*(sig.length-.3),stroke:C.soft,"stroke-dasharray":"4 8","stroke-width":1.2,opacity:0},g));
   const rows=sig.map((s,r)=>{const yb=top+r*rowH+amp,yh=yb-amp*1.6;const lab=wtext(g,x0-20,yb-amp*.8,s.name||"",{s:m*.045,c:C.ink,a:"end"});let prev="0",d="",xs=x0;const wv=(s.wave||"").padEnd(N,".");const col=/clk|xung/i.test(s.name||"")?C.blue:C.ink;
     const lvl=c=>c==="1"?yh:yb;let y=lvl(wv[0]==="p"?"1":wv[0]===".."?"0":wv[0]);d=`M${x0} ${y}`;
     for(let i=0;i<N;i++){let c=wv[i];if(c===".")c=prev==="p"?"p":prev;const xa=x0+i*cw,xb=xa+cw;
       if(c==="p"){d+=`L${xa} ${yh}L${xa+cw/2} ${yh}L${xa+cw/2} ${yb}L${xb} ${yb}`;y=yb}
       else if(c==="x"){d+=`L${xa} ${yh}L${xb} ${yb}M${xa} ${yb}L${xb} ${yh}M${xb} ${lvl(prev)}`}
       else{const ny=lvl(c);if(ny!==y)d+=`L${xa} ${ny}`;d+=`L${xb} ${ny}`;y=ny}prev=c==="."?prev:c}
     return {lab,line:ink(g,d,{c:col,w:4})}});
   const cur=sv("line",{y1:top-rowH*.5,y2:top+rowH*(sig.length-.2),stroke:C.or,"stroke-width":3,opacity:0},g);
   return p=>{grid.forEach((l,i)=>l.setAttribute("opacity",seg(p,0,.1)*.6));rows.forEach((r,i)=>{r.lab.set(seg(p,.02+i*.03,.12+i*.03));r.line.set(seg(p,.1,.9))});const x=x0+(x1-x0)*seg(p,.1,.9);cur.setAttribute("x1",x);cur.setAttribute("x2",x);cur.setAttribute("opacity",p>.1&&p<.92?.8:0)}},
 circuit(g,W,H,v,C){const k=v.kind||"led",m=Math.min(W,H),wide=W>H;const L=W*(wide?.25:.15),R=W*(wide?.75:.85),T=H*.3,B=H*.72;
   const zig=(x,y,len)=>{let d=`M${x} ${y}`;const n=6,st=len/n;for(let i=0;i<n;i++)d+=`L${x+st*(i+.5)} ${y+(i%2?14:-14)}`;return d+`L${x+len} ${y}`};
   const parts=[];const wire=pts=>{const e=ink(g,wobble(pts,1.2,pts.length*3),{c:C.ink,w:4});parts.push(e);return e};
   const midX=(L+R)/2;
   wire([[L,B],[L,T],[midX-m*.12,T]]);parts.push(ink(g,zig(midX-m*.12,T,m*.24),{c:C.ink,w:4}));wire([[midX+m*.12,T],[R,T],[R,(T+B)/2-m*.06]]);
   let lamp=null;
   if(k==="led"){parts.push(ink(g,`M${R-m*.05} ${(T+B)/2-m*.06}L${R+m*.05} ${(T+B)/2-m*.06}L${R} ${(T+B)/2+m*.03}ZM${R-m*.05} ${(T+B)/2+m*.03}H${R+m*.05}`,{c:C.ink,w:4}));lamp=sv("circle",{cx:R,cy:(T+B)/2-m*.02,r:m*.09,fill:C.red,opacity:0},g);wire([[R,(T+B)/2+m*.03],[R,B],[L,B]])}
   else if(k==="rc"){parts.push(ink(g,`M${R-m*.06} ${(T+B)/2-m*.06}H${R+m*.06}M${R-m*.06} ${(T+B)/2+m*.0}H${R+m*.06}`,{c:C.ink,w:5}));wire([[R,(T+B)/2],[R,B],[L,B]])}
   else{const zy=(T+B)/2-m*.06;let zd=`M${R} ${zy}`;for(let i=0;i<6;i++)zd+=`L${R+(i%2?14:-14)} ${zy+m*.2/6*(i+.5)}`;zd+=`L${R} ${zy+m*.2}`;parts.push(ink(g,zd,{c:C.ink,w:4}));wire([[R,zy+m*.2],[R,B],[L,B]]);parts.push(ink(g,`M${R} ${zy+m*.1}H${R+m*.12}`,{c:C.or,w:4}))}
   const bat=ink(g,`M${L-m*.06} ${(T+B)/2-m*.03}H${L+m*.06}M${L-m*.035} ${(T+B)/2+m*.03}H${L+m*.035}`,{c:C.ink,w:6});const bp=wtext(g,L+m*.08,(T+B)/2-m*.05,"+",{s:m*.05,c:C.red});
   const lab=wtext(g,midX,T-m*.07,"R",{s:m*.05,c:C.soft,a:"middle"});
   const loop=sv("path",{d:`M${L} ${B}L${L} ${T}L${R} ${T}L${R} ${B}Z`,fill:"none",stroke:"none"},g);const LEN=loop.getTotalLength?2*((R-L)+(B-T)):1;
   const dots=Array.from({length:22},()=>sv("circle",{r:m*.012,fill:C.blue,opacity:0},g));
   let graph=null;if(k==="rc"){const gx=W*(wide?.04:.1),gy=H*.9;let d="";for(let i=0;i<=40;i++){const t=i/40*5;d+=(i?"L":"M")+(gx+i*m*.006)+" "+(gy-(1-Math.exp(-t))*m*.13)}graph=ink(g,d,{c:C.or,w:3.5})}
   const fx=k==="divider"?wtext(g,W/2,H*.88,"Vout = Vin · R2/(R1+R2)",{s:m*.045,c:C.or,a:"middle"}):k==="led"?wtext(g,W/2,H*.88,"I = (V − Vf) / R",{s:m*.045,c:C.or,a:"middle"}):wtext(g,W/2,H*.88,"τ = R·C",{s:m*.045,c:C.or,a:"middle"});
   return p=>{parts.forEach((e,i)=>e.set(seg(p,i*.05,.3+i*.05)));bat.set(seg(p,0,.15));bp.set(seg(p,.1,.2));lab.set(seg(p,.2,.3));fx.set(seg(p,.6,.85));if(graph)graph.set(seg(p,.4,.95));
     const on=p>.4;if(lamp)lamp.setAttribute("opacity",on?.18+.12*Math.sin(p*60):0);const sp=k==="rc"?Math.exp(-seg(p,.4,1)*4):1;
     dots.forEach((d,i)=>{if(!on||!loop.getPointAtLength){d.setAttribute("opacity",0);return}const u=((i/dots.length+p*6*(k==="rc"?(.2+sp*.8):1))%1)*LEN;const pt=loop.getPointAtLength(u);d.setAttribute("cx",pt.x);d.setAttribute("cy",pt.y);d.setAttribute("opacity",k==="rc"?sp:.9)})}},
 memgrid(g,W,H,v,C){const rows=Math.max(2,Math.min(10,v.rows||6)),cols=Math.max(2,Math.min(12,v.cols||8)),m=Math.min(W,H);const gw=W*.74,gh=H*.48,cw=Math.min(gw/cols,gh/rows),x0=(W-cw*cols)/2,y0=H*.28;
   const cells=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=x0+c*cw+cw/2,y=y0+r*cw+cw/2,a=cw*.22,b=cw*.13;const d=`M${x} ${y}C${x+a*.6} ${y-b*2} ${x+a*2} ${y-b*2} ${x+a*2} ${y}C${x+a*2} ${y+b*2} ${x+a*.6} ${y+b*2} ${x} ${y}C${x-a*.6} ${y-b*2} ${x-a*2} ${y-b*2} ${x-a*2} ${y}C${x-a*2} ${y+b*2} ${x-a*.6} ${y+b*2} ${x} ${y}Z`;cells.push({e:ink(g,d,{c:C.blue,w:3}),k:(r+c)/(rows+cols),bit:((r*7+c*3)%5)<2})}
   const lab=wtext(g,W/2,y0+rows*cw+m*.07,v.label||"",{s:m*.05,c:C.ink,a:"middle"});
   return p=>{cells.forEach(c=>{c.e.set(seg(p,c.k*.5,c.k*.5+.15));c.e.el.setAttribute("stroke",p>.7&&c.bit&&Math.sin(p*40+c.k*30)>0?C.or:C.blue)});lab.set(seg(p,.55,.8))}},
 counter(g,W,H,v,C){const n=Math.max(2,Math.min(4,v.bits||3)),m=Math.min(W,H),wide=W>H;const bw=Math.min(m*.2,W*.8/n-20),x0=(W-(bw+20)*n)/2+10,y=H*.38;
   const ff=[];for(let i=0;i<n;i++){const x=x0+(n-1-i)*(bw+20);ff.push({box:ink(g,wobble([[x,y],[x+bw,y],[x+bw,y+bw],[x,y+bw],[x,y]],2,i+1),{c:C.ink,w:4}),lab:wtext(g,x+bw/2,y-m*.04,"FF"+i,{s:m*.04,c:C.soft,a:"middle"}),val:wtext(g,x+bw/2,y+bw/2,"0",{s:bw*.5,c:C.ink,a:"middle"})})}
   const dec=wtext(g,W/2,y+bw+m*.12,"= 0",{s:m*.08,c:C.or,a:"middle"});const clk=wtext(g,W/2,y+bw+m*.22,"",{s:m*.04,c:C.blue,a:"middle"});
   return p=>{ff.forEach((f,i)=>{f.box.set(seg(p,i*.06,.2+i*.06));f.lab.set(seg(p,.1,.2))});if(p<.25){ff.forEach(f=>f.val.set(0));dec.set(0);return}
     const max=1<<n;const cnt=Math.floor(seg(p,.25,.98)*max*1.25)%max;ff.forEach((f,i)=>{const b=(cnt>>i)&1;f.val.text(String(b));f.val.set(1);f.val.el.setAttribute("fill",b?C.or:C.ink)});dec.text("= "+cnt);dec.set(1);clk.text("xung nhịp thứ "+cnt+" ↑");clk.set(1)}},
 shift(g,W,H,v,C){const n=Math.max(3,Math.min(6,v.bits||4)),data=String(v.data||"1011").replace(/[^01]/g,"")||"1011",m=Math.min(W,H);const bw=Math.min(m*.17,W*.7/n-16),x0=(W-(bw+16)*n)/2+30,y=H*.42;
   const boxes=[];for(let i=0;i<n;i++){const x=x0+i*(bw+16);boxes.push({b:ink(g,wobble([[x,y],[x+bw,y],[x+bw,y+bw],[x,y+bw],[x,y]],2,i+3),{c:C.ink,w:4}),v:wtext(g,x+bw/2,y+bw/2,"0",{s:bw*.5,c:C.ink,a:"middle"}),l:wtext(g,x+bw/2,y+bw+m*.05,"Q"+i,{s:m*.035,c:C.soft,a:"middle"})})}
   const inL=wtext(g,x0-m*.08,y+bw/2,"",{s:bw*.45,c:C.or,a:"middle"}),arr=ink(g,`M${x0-m*.05} ${y+bw/2}H${x0-6}M${x0-18} ${y+bw/2-10}L${x0-6} ${y+bw/2}L${x0-18} ${y+bw/2+10}`,{c:C.or,w:4});const lab=wtext(g,W/2,y-m*.08,"Dữ liệu vào: "+data,{s:m*.045,c:C.ink,a:"middle"});
   return p=>{boxes.forEach((b,i)=>{b.b.set(seg(p,i*.05,.2+i*.05));b.l.set(seg(p,.1,.2))});arr.set(seg(p,.15,.25));lab.set(seg(p,.1,.25));if(p<.28){boxes.forEach(b=>b.v.set(0));return}
     const steps=data.length+n,k=Math.min(steps,Math.floor(seg(p,.28,.98)*(steps+1)));const reg=Array(n).fill("0");for(let s=0;s<k;s++){reg.pop();reg.unshift(s<data.length?data[s]:"0")}
     boxes.forEach((b,i)=>{b.v.text(reg[i]);b.v.set(1);b.v.el.setAttribute("fill",reg[i]==="1"?C.or:C.ink)});inL.text(k<data.length?data[k]:"");inL.set(1)}},
 flow(g,W,H,v,C){const st=(v.steps||[]).slice(0,6),m=Math.min(W,H),wide=W>H,n=st.length||1;const per=wide?Math.min(n,3):1,rows=Math.ceil(n/per);const bw=wide?W*.24:W*.62,bh=m*.12,gx=wide?(W-per*bw)/(per+1):(W-bw)/2,gy=(H*.62-rows*bh)/(rows+1);const items=[];
   st.forEach((s,i)=>{const r=Math.floor(i/per),c=i%per,cc=r%2&&wide?per-1-c:c;const x=wide?gx+cc*(bw+gx):gx,y=H*.24+gy+r*(bh+gy);const box=ink(g,wobble([[x,y],[x+bw,y],[x+bw,y+bh],[x,y+bh],[x,y]],2.5,i+11),{c:C.ink,w:4,fill:C.fill,fo:1});const L=wrapText(s,wide?20:24).slice(0,2);const t=L.map((l,j)=>wtext(g,x+bw/2,y+bh/2+(j-(L.length-1)/2)*m*.045,l,{s:m*.042,c:C.ink,a:"middle"}));items.push({box,t,x,y})});
   const arrows=[];for(let i=0;i<items.length-1;i++){const a=items[i],b=items[i+1];let d;if(Math.abs(a.y-b.y)<1){const ax=a.x<b.x?a.x+bw:a.x,bx=a.x<b.x?b.x:b.x+bw,yy=a.y+bh/2;const dir=bx>ax?1:-1;d=`M${ax+dir*6} ${yy}L${bx-dir*10} ${yy}M${bx-dir*22} ${yy-9}L${bx-dir*10} ${yy}L${bx-dir*22} ${yy+9}`}else{const xx=b.x+bw/2;d=`M${xx} ${a.y+bh+6}L${xx} ${b.y-10}M${xx-9} ${b.y-22}L${xx} ${b.y-10}L${xx+9} ${b.y-22}`}arrows.push(ink(g,d,{c:C.or,w:4}))}
   return p=>{items.forEach((it,i)=>{const a=i/n*.9;it.box.set(seg(p,a,a+.12));it.t.forEach(t=>t.set(seg(p,a+.06,a+.18)));if(arrows[i])arrows[i].set(seg(p,a+.12,a+.9/n))})}},
 compare(g,W,H,v,C){const m=Math.min(W,H),wide=W>H,Lc=v.left||{},Rc=v.right||{};const col=(c,x,y,w)=>{const t=wtext(g,x+w/2,y,c.title||"",{s:m*.06,c:C.blue,a:"middle"});const u=ink(g,wobble([[x+w*.15,y+m*.04],[x+w*.85,y+m*.045]],3,x),{c:C.blue,w:4});let yy=y+m*.12;const it=(c.items||[]).slice(0,4).flatMap(s=>wrapText(s,wide?24:20).slice(0,2).map((l,j,arr)=>{const e=wtext(g,x+20,yy,(j?"   ":"• ")+l,{s:m*.042,c:C.ink});yy+=m*(j===arr.length-1?.08:.055);return e}));return {t,u,it}};
   const A=wide?col(Lc,W*.06,H*.28,W*.4):col(Lc,W*.08,H*.2,W*.84),B=wide?col(Rc,W*.54,H*.28,W*.4):col(Rc,W*.08,H*.56,W*.84);const vs=wtext(g,W/2,wide?H*.5:H*.52,"vs",{s:m*.06,c:C.or,a:"middle"});
   return p=>{A.t.set(seg(p,0,.1));A.u.set(seg(p,.05,.15));A.it.forEach((e,i)=>e.set(seg(p,.12+i*.07,.2+i*.07)));vs.set(seg(p,.4,.5));B.t.set(seg(p,.45,.55));B.u.set(seg(p,.5,.6));B.it.forEach((e,i)=>e.set(seg(p,.57+i*.07,.65+i*.07)))}},
 bigfact(g,W,H,v,C){const m=Math.min(W,H);const t=wtext(g,W/2,H*.47,String(v.value||""),{s:m*.16,c:C.or,a:"middle"});const pts=[];for(let a=0;a<=1.08;a+=.04){const th=-Math.PI*.6+a*Math.PI*2;pts.push([W/2+Math.cos(th)*m*.34,H*.47+Math.sin(th)*m*.15])}const ring=ink(g,wobble(pts,4,13),{c:C.ink,w:4});const L=wrapText(v.label||"",W>H?40:22);const ls=L.map((l,i)=>wtext(g,W/2,H*.7+i*m*.06,l,{s:m*.05,c:C.ink,a:"middle"}));const sp=[spark(g,W/2+m*.38,H*.3,m*.04,C.blue),spark(g,W/2-m*.4,H*.62,m*.03,C.red)];
   return p=>{t.set(seg(p,0,.3));ring.set(seg(p,.25,.5));ls.forEach((x,i)=>x.set(seg(p,.45+i*.1,.65+i*.1)));sp.forEach((s,i)=>s.set(seg(p,.5+i*.1,.65+i*.1)))}},
 graph(g,W,H,v,C){const m=Math.min(W,H),x0=W*.16,x1=W*.88,y0=H*.76,y1=H*.26;const ax=ink(g,`M${x0} ${y1-20}L${x0} ${y0}L${x1+20} ${y0}M${x1+8} ${y0-8}L${x1+20} ${y0}L${x1+8} ${y0+8}M${x0-8} ${y1-8}L${x0} ${y1-20}L${x0+8} ${y1-8}`,{c:C.ink,w:4});
   const F={rc_charge:t=>1-Math.exp(-t*5),rc_discharge:t=>Math.exp(-t*5),exp_decay:t=>Math.exp(-t*4),sine:t=>.5+.45*Math.sin(t*Math.PI*4),square:t=>(Math.floor(t*6)%2)?.15:.85,linear:t=>t*.9,quadratic:t=>t*t*.9}[v.fn]||(t=>1-Math.exp(-t*5));
   let d="";for(let i=0;i<=120;i++){const t=i/120;d+=(i?"L":"M")+(x0+t*(x1-x0))+" "+(y0-F(t)*(y0-y1))}const cv=ink(g,d,{c:C.blue,w:5});
   const xl=wtext(g,x1,y0+m*.06,v.xlabel||"t",{s:m*.045,c:C.soft,a:"end"}),yl=wtext(g,x0+12,y1-m*.06,v.ylabel||"",{s:m*.045,c:C.soft}),lb=wtext(g,(x0+x1)/2,y1-m*.02,v.label||"",{s:m*.05,c:C.or,a:"middle"});
   let tau=null;if(/rc_/.test(v.fn||"rc_charge")){const tx=x0+(x1-x0)/5,ty=y0-F(.2)*(y0-y1);tau=[ink(g,`M${tx} ${y0}L${tx} ${ty}L${x0} ${ty}`,{c:C.or,w:3}),wtext(g,tx,y0+m*.05,"τ",{s:m*.05,c:C.or,a:"middle"}),wtext(g,x0-10,ty,v.fn==="rc_discharge"?"37%":"63%",{s:m*.04,c:C.or,a:"end"})]}
   const dot=sv("circle",{r:m*.015,fill:C.or,opacity:0},g);
   return p=>{ax.set(seg(p,0,.2));xl.set(seg(p,.15,.25));yl.set(seg(p,.15,.25));const q=seg(p,.2,.85);cv.set(q);dot.setAttribute("cx",x0+q*(x1-x0));dot.setAttribute("cy",y0-F(q)*(y0-y1));dot.setAttribute("opacity",q>0&&q<1?1:0);lb.set(seg(p,.7,.9));if(tau){tau[0].set(seg(p,.86,.96));tau[1].set(seg(p,.88,.98));tau[2].set(seg(p,.9,1))}}},
 loop(g,W,H,v,C){const m=Math.min(W,H),cx=W/2,cy=H*.48,a=Math.min(W*.36,m*.5);let d="";const pts=[];for(let i=0;i<=200;i++){const t=i/200*Math.PI*2;const s=Math.sin(t),c=Math.cos(t),den=1+s*s;const x=cx+a*c/den,y=cy+a*s*c/den;pts.push([x,y]);d+=(i?"L":"M")+x+" "+y}
   const path=ink(g,d,{c:C.blue,w:5});const dot=sv("circle",{r:m*.018,fill:C.or,opacity:0},g);const lab=wtext(g,W/2,H*.78,v.label||"",{s:m*.05,c:C.ink,a:"middle"});
   return p=>{path.set(seg(p,0,.4));lab.set(seg(p,.35,.6));if(p>.4){const k=Math.floor(((p-.4)*3.2%1)*200);dot.setAttribute("cx",pts[k][0]);dot.setAttribute("cy",pts[k][1]);dot.setAttribute("opacity",1)}else dot.setAttribute("opacity",0)}},
 table(g,W,H,v,C){const hd=(v.headers||[]).slice(0,5),rs=(v.rows||[]).slice(0,7),m=Math.min(W,H);const cols=hd.length||1,cw=Math.min(W*.8/cols,m*.36),rh=Math.min(m*.09,H*.55/(rs.length+1)),x0=(W-cw*cols)/2,y0=H*.26;
   const lines=[];for(let r=0;r<=rs.length+1;r++)lines.push(ink(g,wobble([[x0,y0+r*rh],[x0+cw*cols,y0+r*rh]],1.5,r+20),{c:r===1?C.ink:C.soft,w:r===1?3.5:2}));for(let c=0;c<=cols;c++)lines.push(ink(g,wobble([[x0+c*cw,y0],[x0+c*cw,y0+(rs.length+1)*rh]],1.5,c+40),{c:C.soft,w:2}));
   const cells=[];hd.forEach((h,c)=>cells.push({r:0,e:wtext(g,x0+c*cw+cw/2,y0+rh/2,String(h),{s:m*.042,c:C.blue,a:"middle"})}));rs.forEach((row,r)=>row.slice(0,cols).forEach((v2,c)=>cells.push({r:r+1,e:wtext(g,x0+c*cw+cw/2,y0+(r+1.5)*rh,String(v2).slice(0,18),{s:m*.04,c:C.ink,a:"middle"})})));
   return p=>{lines.forEach((l,i)=>l.set(seg(p,i*.015,.2+i*.015)));const n=rs.length+1;cells.forEach(c=>c.e.set(seg(p,.25+c.r/n*.65,.32+c.r/n*.65)))}}
};

/* ---------- player ---------- */
function sceneDur(s){const w=sayable(s.say||"").split(/\s+/).filter(Boolean).length;return Math.max(5.5,w/2.6+1.6)}
function viewVideo(a){
  const sc=(a.data.scenes||[]).filter(s=>s&&s.v);if(!sc.length){toast("Video trống");return}
  let tall=(a.cfg&&a.cfg.aspect==="tall")||local.get("vAspect","wide")==="tall",chalk=local.get("vChalk",false),capOn=local.get("vCap",true),voice=hasSpeech()&&local.get("vVoice",true),rate=1;
  const durs=sc.map(sceneDur);let starts=[];const recompute=()=>{starts=[];let t=0;durs.forEach(d=>{starts.push(t);t+=d})};recompute();const total=()=>starts[starts.length-1]+durs[durs.length-1];
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="vp" id="vp"><div class="vstage ${tall?"portrait":""} ${chalk?"chalk":""}" id="vst"><div class="vsc" id="vsc"></div><div class="vhead" id="vhd"></div><div class="vcap" id="vcap"></div><button class="vbig" id="vbig" aria-label="Phát bài giảng"><span>${ic("play","i")}</span></button></div>
    <div class="vctl"><button class="btn" id="vPlay" aria-label="Phát/Tạm dừng">${ic("play")}</button><button class="btn" id="vBk" aria-label="Lùi 10 giây">−10s</button><button class="btn" id="vFw" aria-label="Tới 10 giây">+10s</button>
      <div class="seekw"><div class="vmarks" id="vmk"></div><input type="range" id="vSeek" min="0" max="1000" value="0" aria-label="Tua"></div><span class="t" id="vT">0:00 / 0:00</span>
      <select id="vRate" aria-label="Tốc độ"><option value="0.75">0,75×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option><option value="1.5">1,5×</option></select>
      <span class="vvol"><button class="btn" id="vMute" aria-label="Tắt/bật tiếng" title="Tắt/bật tiếng">${ic(UI.mute?"mute":"vol")}</button><input type="range" id="vVol" min="0" max="1" step="0.05" value="${UI.mute?0:(UI.vol??1)}" aria-label="Âm lượng"></span><button class="btn" id="vCap" aria-pressed="${capOn}" title="Phụ đề">CC</button>${hasSpeech()?`<button class="btn" id="vVoice" aria-pressed="${voice}" title="Giọng đọc">${ic("audio")}</button>`:""}
      <button class="btn" id="vAsp" title="Đổi khung ngang/dọc">${tall?"9:16":"16:9"}</button><button class="btn" id="vChalk" title="Giấy / bảng đen">${chalk?"Bảng":"Giấy"}</button><button class="btn" id="vFull" aria-label="Toàn màn hình">${ic("full")}</button></div>
    <div class="vlist" id="vls">${sc.map((s,i)=>`<button data-sc="${i}">${i+1}. ${esc(s.head||s.v.text||s.v.type)}</button>`).join("")}</div></div>`});
  bindSrcList(a);
  let t=0,play=false,cur=-1,upd=null,raf=0,last=0,spoken=-1,speakingDone=true,tok=0;
  const stage=$("#vst"),host=$("#vsc");
  const marks=()=>{$("#vmk").innerHTML=starts.map(s=>`<i style="left:${s/total()*100}%"></i>`).join("")};marks();
  const build=i=>{host.innerHTML="";const W=tall?900:1600,H=tall?1600:900;const svg=sv("svg",{viewBox:`0 0 ${W} ${H}`,preserveAspectRatio:"xMidYMid meet"});host.appendChild(svg);const g=sv("g",{},svg);const C=vpal(chalk);const s=sc[i];
    $("#vhd").innerHTML=s.head&&s.v.type!=="title"?esc(s.head):"";$("#vhd").style.color=C.ink;
    try{upd=(VB[s.v.type]||VB.bullets)(g,W,H,s.v.type&&VB[s.v.type]?s.v:{items:[s.head||"",...String(s.say||"").split(/[.!?]\s/).slice(0,3)]},C,host)}catch(e){console.warn(e);upd=()=>{}}
    $$("#vls button").forEach((b,j)=>b.classList.toggle("on",j===i));const lb=$(`#vls [data-sc="${i}"]`);if(lb)lb.scrollIntoView({block:"nearest",inline:"nearest"})};
  const caption=(i,p)=>{if(!capOn){$("#vcap").textContent="";return}const words=sayable(sc[i].say||"").split(/\s+/).filter(Boolean);const per=13,chunks=[];for(let k=0;k<words.length;k+=per)chunks.push(words.slice(k,k+per).join(" "));$("#vcap").textContent=chunks[Math.min(chunks.length-1,Math.floor(p*chunks.length))]||""};
  const fmtT=x=>`${Math.floor(x/60)}:${String(Math.floor(x%60)).padStart(2,"0")}`;
  const render=()=>{let i=starts.findIndex((s,k)=>t>=s&&t<s+durs[k]);if(i<0)i=t>=total()?sc.length-1:0;if(i!==cur){cur=i;build(i)}let p=clamp01((t-starts[i])/durs[i]);if(!play&&t<.01)p=1;if(upd)upd(ease(p)*.15+p*.85);caption(i,p);
    $("#vSeek").value=Math.round(t/total()*1000);$("#vT").textContent=fmtT(t)+" / "+fmtT(total())};
  const say=i=>{if(!voice||!play)return;stopSpeech();tok=speechToken;spoken=i;speakingDone=false;speak(sayable(sc[i].say||""),{lang:(a.cfg&&a.cfg.lang)||"vi",rate}).then(()=>{if(tok===speechToken)speakingDone=true}).catch(()=>{speakingDone=true})};
  const loop=now=>{const dt=Math.min(.1,(now-last)/1000);last=now;if(play){const i=cur<0?0:cur;const end=starts[i]+durs[i];let nt=t+dt*rate;
      if(voice&&!speakingDone&&nt>=end-.05)nt=end-.06;
      if(nt>=total()){t=total()-.001;play=false;setPlayBtn();render();return}
      t=nt;const ni=starts.findIndex((s,k)=>t>=s&&t<s+durs[k]);if(ni!==spoken&&ni>=0)say(ni)}
    render();raf=requestAnimationFrame(loop)};
  let started=false;const setPlayBtn=()=>{if(play)started=true;$("#vPlay").innerHTML=ic(play?"pause":"play");$("#vbig").hidden=play||started};
  const start=()=>{if(t>=total()-.01)t=0;play=true;last=performance.now();spoken=-1;setPlayBtn()};
  const pause=()=>{play=false;stopSpeech();speakingDone=true;spoken=-1;setPlayBtn()};
  const seekTo=x=>{t=Math.max(0,Math.min(total()-.01,x));stopSpeech();speakingDone=true;spoken=-1;cur=-1};
  $("#vbig").onclick=start;$("#vPlay").onclick=()=>play?pause():start();stage.addEventListener("click",e=>{if(e.target.closest(".vbig"))return;play?pause():start()});
  $("#vBk").onclick=()=>seekTo(t-10);$("#vFw").onclick=()=>seekTo(t+10);$("#vSeek").oninput=e=>seekTo(+e.target.value/1000*total());
  $("#vRate").onchange=e=>{rate=+e.target.value;if(play&&voice){spoken=-1}};
  const setVol=(v,m)=>{UI.vol=v;UI.mute=m;local.set("vol",v);local.set("mute",m);$("#vMute").innerHTML=ic(m||v===0?"mute":"vol");$("#vVol").value=m?0:v;if(play&&voice){stopSpeech();speakingDone=true;spoken=-1}};
  $("#vVol").oninput=e=>setVol(+e.target.value,false);$("#vMute").onclick=()=>setVol(UI.vol||1,!UI.mute);
  $("#vCap").onclick=e=>{capOn=!capOn;local.set("vCap",capOn);e.currentTarget.setAttribute("aria-pressed",capOn)};
  const vv=$("#vVoice");if(vv)vv.onclick=e=>{voice=!voice;local.set("vVoice",voice);e.currentTarget.setAttribute("aria-pressed",voice);if(!voice){stopSpeech();speakingDone=true}else spoken=-1};
  $("#vAsp").onclick=e=>{tall=!tall;local.set("vAspect",tall?"tall":"wide");stage.classList.toggle("portrait",tall);e.currentTarget.textContent=tall?"9:16":"16:9";cur=-1};
  $("#vChalk").onclick=e=>{chalk=!chalk;local.set("vChalk",chalk);stage.classList.toggle("chalk",chalk);e.currentTarget.textContent=chalk?"Bảng":"Giấy";cur=-1};
  $("#vFull").onclick=()=>{const el=$("#vp");try{(document.fullscreenElement?document.exitFullscreen():el.requestFullscreen()).catch(()=>{UI.vmode="full";const r=UI.reopen;closeViewer(true);r&&r()})}catch(e){}};
  $$("#vls [data-sc]").forEach(b=>b.onclick=()=>seekTo(starts[+b.dataset.sc]+.01));
  const key=e=>{if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;if(e.key===" "){e.preventDefault();play?pause():start()}if(e.key==="ArrowRight")seekTo(t+5);if(e.key==="ArrowLeft")seekTo(t-5);if(e.key==="ArrowUp"||e.key==="ArrowDown"){e.preventDefault();const v=Math.max(0,Math.min(1,(UI.mute?0:(UI.vol??1))+(e.key==="ArrowUp"?.1:-.1)));setVol(Math.round(v*20)/20,false)}if(e.key==="m")$("#vMute").click()};
  document.addEventListener("keydown",key);
  ensureKatex().catch(()=>{}).finally(()=>{last=performance.now();raf=requestAnimationFrame(loop)});
  UI.modalCleanup=()=>{cancelAnimationFrame(raf);document.removeEventListener("keydown",key);play=false};
}

/* ---------- video mẫu cho sổ mẫu ---------- */
async function seedVideo(){
  await Store.put("art-mau-video",{type:"art",nb:"nb-mau-logic",kind:"video",status:"done",sample:true,srcLabels:["Bài giảng mẫu — Biểu diễn mạch logic"],cfg:{lang:"vi",aspect:"wide",depth:"deep"},title:"Từ cổng NAND đến bộ nhớ",created:Date.now(),data:{title:"Từ cổng NAND đến bộ nhớ",scenes:[
   {head:"",say:"Chào các em. Hôm nay ta sẽ đi từ một cổng logic rất đơn giản đến cách máy tính ghi nhớ từng bit dữ liệu.",v:{type:"title",text:"Từ cổng NAND đến bộ nhớ",sub:"Thiết kế hệ thống số"}},
   {head:"Đại số Boole",say:"Mọi thứ bắt đầu từ đại số Boole. Chỉ có hai giá trị là không và một, và ba phép toán cơ bản là OR, AND và NOT.",v:{type:"bullets",items:["Chỉ có hai giá trị: 0 và 1","OR: cộng logic","AND: nhân logic","NOT: phủ định"]}},
   {head:"Cổng NAND",say:"Cổng NAND là AND rồi đảo. Đầu ra chỉ bằng không khi cả hai đầu vào đều bằng một. Hãy nhìn bảng chân lý chạy qua từng hàng.",v:{type:"gate",gate:"NAND"}},
   {head:"Định lý DeMorgan",say:"Định lý DeMorgan cho phép đẩy dấu phủ định qua phép toán. Ví dụ A B cộng A B phẩy, ta nhóm A ra ngoài, B cộng B phẩy bằng một, nên kết quả là A.",v:{type:"equation",steps:["F = AB + A\\overline{B}","= A\\,(B + \\overline{B})","= A \\cdot 1","= A"],note:"Rút gọn được nhờ x + x' = 1"}},
   {head:"Cấu trúc nối chéo",say:"Bây giờ nối đầu ra của mỗi cổng NAND vào đầu vào của cổng kia. Đây là mạch chốt SR. Khi S gạch bằng không, Q lên một. Khi cả hai đầu vào trở về một, Q vẫn giữ nguyên giá trị.",v:{type:"latch",kind:"nand"}},
   {head:"Vòng lặp dữ liệu",say:"Bản chất của việc ghi nhớ là một vòng hồi tiếp. Tín hiệu chạy vòng qua hai cổng và tự duy trì chính nó, giống một vòng lặp vô tận.",v:{type:"loop",label:"Hồi tiếp giữ trạng thái"}},
   {head:"Xung nhịp và flip-flop D",say:"Flip-flop D chỉ lấy mẫu dữ liệu tại cạnh lên của xung nhịp. Giữa các cạnh lên, đầu ra Q giữ nguyên dù D thay đổi.",v:{type:"timing",signals:[{name:"CLK",wave:"pppppppp"},{name:"D",wave:"0.1..0.1"},{name:"Q",wave:"0..1..0."}]}},
   {head:"Bộ đếm nhị phân",say:"Ghép ba flip-flop lại, ta có một bộ đếm. Sau mỗi xung nhịp, giá trị nhị phân tăng thêm một, từ không đến bảy rồi quay về không.",v:{type:"counter",bits:3}},
   {head:"Hệ thống hàng tỷ ô nhớ",say:"Nhân mạch nhớ một bit lên hàng tỷ lần, ta có bộ nhớ trong máy tính của các em. Mỗi ô ở đây là một vòng hồi tiếp nhỏ.",v:{type:"memgrid",rows:6,cols:9,label:"Mỗi ô = 1 bit"}},
   {head:"Từ HDL đến phần cứng",say:"Ngày nay ta mô tả mạch bằng VHDL hoặc Verilog. Phần mềm tổng hợp biến mô tả đó thành sơ đồ kết nối, rồi nạp vào FPGA.",v:{type:"flow",steps:["Viết mã VHDL","Tổng hợp","Netlist","Nạp vào FPGA"]}},
   {head:"Ghi nhớ",say:"Tóm lại: NAND là cổng vạn năng, DeMorgan giúp rút gọn biểu thức, và hồi tiếp chéo tạo ra bộ nhớ.",v:{type:"bullets",items:["NAND, NOR là cổng vạn năng","DeMorgan: (xy)' = x' + y'","Hồi tiếp chéo → mạch chốt → bộ nhớ"]}}
  ]}});
}

/* =====================================================================
   v4 — MÔN HỌC / THƯ MỤC / BÀI HỌC · TRANG CHỦ · LỊCH · HỒ SƠ HỌC TẬP
   ===================================================================== */
UI.subjs=[];UI.folds=[];UI.tasks=[];UI.evs=[];UI.profile=null;UI.calView=local.get("calView","week");UI.calDate=new Date();UI.gcShow=local.get("gcShow",false);UI.gcCache={};UI.openFolds=new Set(local.get("openFolds",[]));UI.taskTab="todo";UI.courseTab="subj";UI.subjTab="lessons";UI.srcTab="src";
const SUBJ_COLORS=["#f08bb8","#7fb6ea","#9d86e9","#5fc79a","#f0b45a","#e8736f"];
const subjOf=id=>UI.subjs.find(s=>s.id===id);
const nbsOf=sid=>UI.nbs.filter(n=>sid==="none"?!n.subj||!subjOf(n.subj):n.subj===sid);

/* ---------- hồ sơ học tập → đưa vào mọi yêu cầu AI ---------- */
function rulesFor(){
  let t=RULES;const pf=UI.profile;
  if(pf){const bits=[];if(pf.name)bits.push("Người học tên "+pf.name);if(pf.major)bits.push("ngành "+pf.major);if(pf.year)bits.push(pf.year);if(pf.school)bits.push("trường "+pf.school);if(bits.length)t+=`\nHỒ SƠ NGƯỜI HỌC: ${bits.join(", ")}.`;if(pf.goal)t+=`\nMục tiêu học tập: ${pf.goal}.`;if((pf.styles||[]).length)t+=`\nCách giải thích người học thích: ${pf.styles.join("; ")}.`;if(pf.notes)t+=`\nYêu cầu riêng của người học: ${pf.notes}`}
  const nb=UI.view==="nb"?UI.cur:null;const sj=nb&&subjOf(nb.subj);
  if(sj){t+=`\nMÔN HỌC: ${sj.title}${sj.code?" ("+sj.code+")":""}.`;if(sj.syllabus)t+=`\nĐề cương môn (người học cung cấp): ${String(sj.syllabus).slice(0,3000)}`;if(sj.focus)t+=`\nTRỌNG TÂM người học muốn nhấn mạnh: ${sj.focus}`;if(sj.exclude)t+=`\nKHÔNG cần đi sâu: ${sj.exclude}`;if(sj.exam)t+=`\nNgày thi: ${sj.exam}.`}
  if(nb&&nb.goals)t+=`\nMỤC TIÊU CỦA BÀI HỌC NÀY: ${nb.goals}`;
  return t;
}
const STYLES=["Ví dụ thực tế, linh kiện thật","Trực quan bằng hình và sơ đồ","Chặt chẽ toán học, suy ra công thức","Từng bước như giải bài tập","Kèm thuật ngữ tiếng Anh/tiếng Đức","Gợi ý mẹo nhớ"];
function profileDialog(){
  const pf=Object.assign({name:"",school:"",major:"Kỹ thuật Điện tử – Máy tính",year:"",goal:"",styles:[],notes:"",accent:"",scale:1},UI.profile||{});
  openModal({title:"Cá nhân hóa việc học",small:true,body:`<div class="form">
    <p class="muted" style="margin:0;font-size:13.5px">Thông tin này được gửi kèm mọi yêu cầu AI (trò chuyện, slide, video, quiz…) để nội dung hợp với bạn. Đề cương và trọng tâm từng môn đặt trong trang môn học.</p>
    <div class="row3"><div class="field"><label for="pfN">Tên gọi</label><input class="input" id="pfN" value="${esc(pf.name)}"></div><div class="field"><label for="pfS">Trường</label><input class="input" id="pfS" value="${esc(pf.school)}" placeholder="Ví dụ: VGU"></div><div class="field"><label for="pfM">Ngành</label><input class="input" id="pfM" value="${esc(pf.major)}"></div><div class="field"><label for="pfY">Năm học</label><input class="input" id="pfY" value="${esc(pf.year)}" placeholder="Năm 2"></div></div>
    <div class="field"><label for="pfG">Mục tiêu học tập</label><input class="input" id="pfG" value="${esc(pf.goal)}" placeholder="Ví dụ: Qua môn Digital System Design điểm A, hiểu sâu để làm FPGA"></div>
    <div class="field"><span>Cách giải thích bạn thích</span><div class="model-pick">${STYLES.map(s=>`<button class="chip" data-st="${esc(s)}" aria-pressed="${pf.styles.includes(s)}">${esc(s)}</button>`).join("")}</div></div>
    <div class="field"><label for="pfX">Dặn thêm cho AI</label><textarea class="input" id="pfX" placeholder="Ví dụ: Giải thích bằng tiếng Việt nhưng giữ thuật ngữ tiếng Anh trong ngoặc; luôn có bài tập tự luyện ở cuối.">${esc(pf.notes)}</textarea></div>
    <div class="row3"><div class="field"><label for="pfA">Màu nhấn riêng</label><input type="color" id="pfA" value="${esc(pf.accent||"#e38a4e")}" style="width:100%;height:40px;padding:2px"><label class="chk-row"><input type="checkbox" class="chk" id="pfAon" ${pf.accent?"checked":""}> Dùng màu này thay màu của giao diện</label></div>
      <div class="field"><label for="pfZ">Cỡ chữ & khoảng cách</label><input type="range" id="pfZ" min="0.85" max="1.25" step="0.05" value="${pf.scale||1}"><output id="pfZo">${Math.round((pf.scale||1)*100)}%</output></div></div></div>`,
    foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="pfOk">Lưu</button>`});
  $$("[data-st]").forEach(b=>b.onclick=()=>b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true"));
  $("#pfZ").oninput=e=>{$("#pfZo").textContent=Math.round(e.target.value*100)+"%";applyPrefs({...pf,scale:+e.target.value})};
  $("#pfOk").onclick=async()=>{const n={name:$("#pfN").value.trim(),school:$("#pfS").value.trim(),major:$("#pfM").value.trim(),year:$("#pfY").value.trim(),goal:$("#pfG").value.trim(),styles:$$("[data-st]").filter(b=>b.getAttribute("aria-pressed")==="true").map(b=>b.dataset.st),notes:$("#pfX").value.trim(),accent:$("#pfAon").checked?$("#pfA").value:"",scale:+$("#pfZ").value};
    UI.profile=n;applyPrefs(n);closeDialog();await Store.put("profile-me",{type:"profile",...n}).catch(()=>{});toast("Đã lưu cá nhân hóa")};
}
function applyPrefs(pf){const r=document.documentElement;if(pf&&pf.accent){r.style.setProperty("--accent",pf.accent);r.style.setProperty("--accent-soft",`color-mix(in srgb, ${pf.accent} 22%, var(--panel))`)}else{r.style.removeProperty("--accent");r.style.removeProperty("--accent-soft")}const m=$("#main");if(m)m.style.zoom=pf&&pf.scale&&pf.scale!==1?pf.scale:""}

/* ---------- pixel icons ---------- */
const pxFolder=(open,c="#f2c14e")=>`<svg class="pxi" viewBox="0 0 18 16" shape-rendering="crispEdges" aria-hidden="true"><path d="M1 3h6l2 2h8v10H1z" fill="${c}"/><path d="M1 3h6l2 2h8v10H1z" fill="none" stroke="#8a6a1e" stroke-width="1"/>${open?`<path d="M3 8h14l-2 7H1z" fill="#ffe08a" stroke="#8a6a1e"/>`:`<path d="M2 7h14" stroke="#fff3c4"/>`}</svg>`;
const pxFile=(c="#f08bb8")=>`<svg class="pxi" viewBox="0 0 18 16" shape-rendering="crispEdges" aria-hidden="true"><path d="M4 1h7l3 3v11H4z" fill="#fff" stroke="${c}"/><path d="M11 1v3h3" fill="none" stroke="${c}"/><path d="M6 7h6M6 9h6M6 11h4" stroke="${c}"/></svg>`;

/* ---------- cảnh pixel (bìa, banner) ---------- */
function pixelScene(cv,{seed="x",night=false,tint=null,w=200,h=72}={}){
  cv.width=w;cv.height=h;const g=cv.getContext("2d");let s=[...String(seed)].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,11)||7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
  const sky=night?["#141238","#1d1a4d","#2a2465","#3a2f7a","#4b3a86"]:["#a9d6ff","#c3e2ff","#dcecff","#f3dcf2","#ffe3f1"];
  sky.forEach((c,i)=>{g.fillStyle=c;g.fillRect(0,Math.floor(i*h*.62/sky.length),w,Math.ceil(h*.62/sky.length)+1)});g.fillStyle=sky[sky.length-1];g.fillRect(0,Math.floor(h*.6),w,h);
  if(night){for(let i=0;i<60;i++){g.fillStyle=r()<.2?"#ffe08a":"#ffffff";g.fillRect(Math.floor(r()*w),Math.floor(r()*h*.55),1,1)}g.fillStyle="#fff3c4";const mx=Math.floor(w*.82),my=10;for(let y=-6;y<=6;y++)for(let x=-6;x<=6;x++)if(x*x+y*y<=36&&(x+3)*(x+3)+(y-2)*(y-2)>20)g.fillRect(mx+x,my+y,1,1)}
  const cloud=(cx,cy,rad,col)=>{g.fillStyle=col;for(let k=0;k<5;k++){const ox=(k-2)*rad*.75,oy=k%2?-rad*.35:0,rr=rad*(k%2?.85:.7);for(let y=-rr;y<=rr;y++)for(let x=-rr;x<=rr;x++)if(x*x+y*y<=rr*rr)g.fillRect(Math.floor(cx+ox+x),Math.floor(cy+oy+y),1,1)}};
  for(let i=0;i<5;i++)cloud(r()*w,h*.18+r()*h*.3,5+r()*6,night?"rgba(120,110,200,.35)":(r()<.5?"#ffffff":"#fff0f7"));
  const bcol=night?["#3a3270","#463d86","#2f295e"]:["#9aa8e6","#b6c1f2","#c9b8f0","#a7b9ef"];let x=0;
  while(x<w){const bw=12+Math.floor(r()*22),bh=Math.floor(h*(.22+r()*.3)),by=h-6-bh;g.fillStyle=bcol[Math.floor(r()*bcol.length)];g.fillRect(x,by,bw,bh);g.fillStyle=night?"#2a2455":"#8794d8";g.fillRect(x,by,bw,1);
    for(let yy=by+3;yy<h-9;yy+=5)for(let xx=x+2;xx<x+bw-3;xx+=5){g.fillStyle=night?(r()<.45?"#ffd77a":"#5a4fa0"):(r()<.3?"#ffd1e6":"#eef2ff");g.fillRect(xx,yy,3,3)}
    if(r()<.4){g.fillStyle=night?"#6c64c4":"#6f7cc8";for(let k=0;k<bw;k+=2)g.fillRect(x+k,by-3,1,3);g.fillRect(x,by-3,bw,1)}x+=bw+Math.floor(r()*6)}
  const pink=tint?[tint,"#ffb7d5","#ffd1e6"]:night?["#c2549a","#e07ab8","#a74687"]:["#ff9cc6","#ffb7d5","#ffd1e6"];
  const trees=3+Math.floor(r()*3);for(let i=0;i<trees;i++){const tx=Math.floor(r()*w),tr=7+r()*8,ty=h-12-tr*1.2;g.fillStyle=night?"#4a3a5e":"#8a6f8f";g.fillRect(tx,ty,2,h-ty-6);
    for(let k=0;k<6;k++){const cx=tx+(r()-.5)*tr*1.6,cy=ty-r()*tr*.8,rr=tr*(.5+r()*.5);for(let y=-rr;y<=rr;y++)for(let xx=-rr;xx<=rr;xx++)if(xx*xx+y*y<=rr*rr){g.fillStyle=pink[(Math.floor(cx+xx)+Math.floor(cy+y))%3===0?2:k%2];g.fillRect(Math.floor(cx+xx),Math.floor(cy+y),1,1)}}}
  g.fillStyle=night?"#2a2455":"#6c6fa8";g.fillRect(0,h-6,w,1);for(let k=0;k<w;k+=4)g.fillRect(k,h-9,1,4);g.fillRect(0,h-9,w,1);g.fillStyle=night?"#1b1840":"#8c90c8";g.fillRect(0,h-5,w,5);
  for(let i=0;i<26;i++){g.fillStyle=pink[i%3];g.fillRect(Math.floor(r()*w),Math.floor(r()*h*.9),1,1)}
}
const isNightSkin=()=>["dem","demsao","bangden"].includes(UI.skin);

/* =====================================================================
   TRANG CHỦ — bảng điều khiển kiểu Notion
   ===================================================================== */
const WD=["T2","T3","T4","T5","T6","T7","CN"],WDL=["Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy","Chủ Nhật"];
const monday=d=>{const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const tagCol=sid=>(subjOf(sid)||{}).color||"#8b93a8";
function renderHome(){
  if(UI.view!=="home")return;if(document.activeElement&&$("#main").contains(document.activeElement)&&/INPUT|TEXTAREA/.test(document.activeElement.tagName)){UI._pend=true;return}
  const name=(UI.profile&&UI.profile.name)||(P.me&&P.me.name)||"bạn";const now=new Date();
  const recent=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,5);
  const wk=monday(now);
  $("#main").innerHTML=`<div class="dash"><div class="dash-in">
   <div class="banner"><canvas id="bnr" aria-hidden="true"></canvas><div class="hello"><h1>Chào ${esc(name)} ♡</h1><span>${now.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})} · ${UI.tasks.filter(t=>t.status!=="done").length} bài tập cần làm</span></div><button class="pill-btn chg" id="bnrSeed">${ic("spark")} Đổi cảnh</button></div>
   <div class="grid3">
    <div class="panel-box"><h4>${ic("spark")} Lối tắt</h4><div class="qa">
      <button data-qa="lesson">${ic("plus")}<span>Bài học mới</span></button><button data-qa="subj">${ic("book")}<span>Môn học mới</span></button><button data-qa="task">${ic("check")}<span>Thêm bài tập</span></button><button data-qa="ev">${ic("cal")}<span>Thêm sự kiện</span></button><button data-qa="prof">${ic("edit")}<span>Cá nhân hóa việc học</span></button></div></div>
    <div class="panel-box"><h4>${ic("ext")} Đi nhanh</h4><div class="qa">${recent.length?recent.map(n=>`<button data-go="${esc(n.id)}">${pxFile(tagCol(n.subj))}<span>${esc(n.title)}</span></button>`).join(""):`<span class="muted" style="font-size:13px">Các bài học mở gần đây hiện ở đây.</span>`}<button data-qa="cal">${ic("cal")}<span>Lịch học đầy đủ</span></button></div></div>
    <div class="panel-box"><h4>${ic("star")} Tiến độ</h4><div id="dashProg"></div></div>
   </div>
   <section class="sec"><div class="sec-h"><span class="ico">${ic("check")}</span>Bài tập<span class="grow"></span><button class="btn" data-qa="task">${ic("plus")} Thêm</button></div>
     <div class="rtab" role="tablist">${[["todo","Cần làm"],["done","Đã xong"],["all","Tất cả"]].map(([k,l])=>`<button role="tab" data-tt="${k}" aria-selected="${UI.taskTab===k}">${l}</button>`).join("")}<span class="grow"></span></div>
     <div class="tags">${UI.subjs.map(s=>`<span class="tag" style="background:${s.color}">${esc(s.code||s.title)} <b>${UI.tasks.filter(t=>t.subj===s.id&&t.status!=="done").length}</b></span>`).join("")}</div>
     <div class="tasks" id="taskList"></div></section>
   <section class="sec"><div class="sec-h"><span class="ico">${ic("note")}</span>Việc cần làm trong tuần<span class="grow"></span><span class="muted" style="font-size:13px;font-weight:500">${wk.toLocaleDateString("vi-VN",{day:"numeric",month:"short"})} – ${addD(wk,6).toLocaleDateString("vi-VN",{day:"numeric",month:"short"})}</span></div>
     <div class="week">${WD.map((d,i)=>{const day=addD(wk,i),ds=ymd(day),its=UI.tasks.filter(t=>t.due===ds),ses=upcomingAll().filter(e=>e.date===ds);return `<div class="day ${ds===ymd(now)?"today":""}"><h5><img src="${stkURL(["star-y","star-b","star-p","star-l","star-m","heart-p","moon"][i],2).url}" alt="">${WDL[i]}</h5>${its.map(t=>`<label class="it"><input type="checkbox" class="chk" data-tk="${esc(t.id)}" ${t.status==="done"?"checked":""}><span style="${t.status==="done"?"text-decoration:line-through;opacity:.6":""}">${esc(t.title)}</span></label>`).join("")}${ses.map(e=>`<div class="it" title="${esc(e.title)}">${ic("cal")}<span>${esc(e.start)} ${esc(e.title)}</span></div>`).join("")}<button class="add" data-addday="${ds}">+ Việc cần làm</button></div>`}).join("")}</div></section>
   <section class="sec"><div class="sec-h"><span class="ico">${ic("cal")}</span>Lịch học<span class="grow"></span><button class="btn" data-qa="cal">${ic("ext")} Mở trang lịch</button></div><div id="homeCal"></div></section>
   <section class="sec"><div class="sec-h"><span class="ico">${ic("book")}</span>Môn học<span class="grow"></span><button class="btn" data-qa="subj">${ic("plus")} Môn mới</button></div>
     <div class="rtab" role="tablist">${[["subj","Môn học"],["all","Tất cả bài học"]].map(([k,l])=>`<button role="tab" data-ct="${k}" aria-selected="${UI.courseTab===k}">${l}</button>`).join("")}<span class="grow"></span></div>
     <div id="courseBox"></div></section>
  </div></div>`;
  pixelScene($("#bnr"),{seed:local.get("bnrSeed","so-hoc"),night:isNightSkin(),w:320,h:90});
  $("#bnrSeed").onclick=()=>{local.set("bnrSeed",Math.random().toString(36).slice(2));pixelScene($("#bnr"),{seed:local.get("bnrSeed"),night:isNightSkin(),w:320,h:90})};
  $$("[data-qa]").forEach(b=>b.onclick=()=>({lesson:()=>newLessonDialog(),subj:()=>subjectDialog(),task:()=>taskDialog(),ev:()=>eventDialog({date:ymd(new Date()),start:"19:00"}),prof:profileDialog,cal:goCal})[b.dataset.qa]());
  $$("[data-go]").forEach(b=>b.onclick=()=>openNotebook(b.dataset.go));
  $$("[data-tt]").forEach(b=>b.onclick=()=>{UI.taskTab=b.dataset.tt;$$("[data-tt]").forEach(x=>x.setAttribute("aria-selected",x===b));renderTasks($("#taskList"))});
  $$("[data-ct]").forEach(b=>b.onclick=()=>{UI.courseTab=b.dataset.ct;$$("[data-ct]").forEach(x=>x.setAttribute("aria-selected",x===b));renderCourses()});
  $$("[data-tk]").forEach(x=>x.onchange=()=>Store.patch(x.dataset.tk,{status:x.checked?"done":"todo"}));
  $$("[data-addday]").forEach(b=>b.onclick=()=>taskDialog({due:b.dataset.addday}));
  renderTasks($("#taskList"));renderCourses();renderCalendar($("#homeCal"),{compact:true});
  let k=0;for(let d=new Date();;d.setDate(d.getDate()-1)){if(D.streak.includes(ymd(d)))k++;else break;if(k>90)break}
  const lessons=UI.nbs.length,srcs=UI.nbs.reduce((a,n)=>a+(n.srcCount||0),0),done=UI.tasks.filter(t=>t.status==="done").length,tot=UI.tasks.length||1;
  $("#dashProg").innerHTML=`<div style="display:flex;gap:3px;flex-wrap:wrap">${Array.from({length:7},(_,i)=>`<img src="${stkURL(i<k?"heart-p":"heart-l",2).url}" alt="" style="width:22px;opacity:${i<k?1:.35};image-rendering:pixelated">`).join("")}</div><b>${k} ngày học liên tiếp</b><div class="muted" style="font-size:13px">${UI.subjs.length} môn · ${lessons} bài học · ${srcs} nguồn</div><div style="height:12px;border-radius:3px;background:var(--panel2);box-shadow:inset 0 0 0 2px var(--frame);overflow:hidden"><i style="display:block;height:100%;width:${Math.round(done/tot*100)}%;background:repeating-linear-gradient(90deg,var(--accent) 0 10px,color-mix(in srgb,var(--accent) 70%,#fff) 10px 12px)"></i></div><span class="muted" style="font-size:12.5px">${done}/${UI.tasks.length} bài tập hoàn thành</span>`;
}
function renderTasks(el,sid){
  if(!el)return;const today=ymd(new Date());let L=UI.tasks.filter(t=>!sid||t.subj===sid);
  if(UI.taskTab==="todo")L=L.filter(t=>t.status!=="done");if(UI.taskTab==="done")L=L.filter(t=>t.status==="done");
  L.sort((a,b)=>(a.due||"9").localeCompare(b.due||"9"));
  el.innerHTML=L.length?L.map(t=>{const s=subjOf(t.subj);const late=t.status!=="done"&&t.due&&t.due<today;return `<div class="trow ${t.status==="done"?"done":""}"><input type="checkbox" class="chk" data-tk2="${esc(t.id)}" ${t.status==="done"?"checked":""} aria-label="Hoàn thành"><span class="tt-title">${esc(t.title)}</span><span class="tagc">${s?`<span class="tag" style="background:${s.color}">${esc(s.code||s.title)}</span>`:""}</span><span class="due ${late?"late":""}">${t.due?new Date(t.due+"T00:00").toLocaleDateString("vi-VN",{day:"numeric",month:"short"}):"—"}</span><button class="ghost ic" data-tdel="${esc(t.id)}" aria-label="Xóa">${ic("trash")}</button></div>`}).join(""):`<div class="empty">${UI.taskTab==="done"?"Chưa có bài tập hoàn thành.":"Không có bài tập. Bấm “Thêm” để ghi hạn nộp."}</div>`;
  $$("[data-tk2]",el).forEach(x=>x.onchange=()=>Store.patch(x.dataset.tk2,{status:x.checked?"done":"todo"}));
  $$("[data-tdel]",el).forEach(b=>b.onclick=()=>Store.del(b.dataset.tdel));
}
function renderCourses(){
  const box=$("#courseBox");if(!box)return;
  if(UI.courseTab==="all"){const L=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0));box.innerHTML=`<div class="lessons-grid">${L.map(n=>`<button class="lcard" data-go="${esc(n.id)}"><b>${pxFile(tagCol(n.subj))} ${esc(n.title)}</b><small>${esc((subjOf(n.subj)||{}).title||"Chưa xếp môn")} · ${n.srcCount||0} nguồn</small></button>`).join("")||`<div class="empty">Chưa có bài học.</div>`}</div>`;$$("[data-go]",box).forEach(b=>b.onclick=()=>openNotebook(b.dataset.go));return}
  const list=[...UI.subjs].sort((a,b)=>(a.order||0)-(b.order||0)||(a.created||0)-(b.created||0));const orphan=nbsOf("none");
  box.innerHTML=`<div class="courses">${list.map(s=>`<button class="course" data-sj="${esc(s.id)}"><canvas data-cov="${esc(s.id)}" aria-hidden="true"></canvas><div class="cb"><b><span class="dot" style="background:${s.color}"></span>${esc(s.title)}</b><small>${esc(s.code||"")}${s.code?" · ":""}${nbsOf(s.id).length} bài học · ${UI.folds.filter(f=>f.subj===s.id).length} thư mục</small></div></button>`).join("")}
    ${orphan.length?`<button class="course" data-sj="none"><canvas data-cov="none" aria-hidden="true"></canvas><div class="cb"><b><span class="dot" style="background:#8b93a8"></span>Chưa xếp môn</b><small>${orphan.length} bài học</small></div></button>`:""}
    <button class="course" data-newsj style="place-items:center;min-height:180px;border-style:dashed"><div class="cb" style="text-align:center">${ic("plus")}<b style="justify-content:center">Thêm môn học</b><small>Ví dụ: Thiết kế hệ thống số, Mạch điện tử</small></div></button></div>`;
  $$("[data-cov]",box).forEach(c=>{const s=subjOf(c.dataset.cov);pixelScene(c,{seed:c.dataset.cov+(s?s.title:""),night:isNightSkin(),tint:s?s.color:null,w:160,h:90})});
  $$("[data-sj]",box).forEach(b=>b.onclick=()=>openSubject(b.dataset.sj));$("[data-newsj]",box).onclick=()=>subjectDialog();
}

/* ---------- hộp thoại: môn, bài, thư mục, bài tập, sự kiện ---------- */
function subjectDialog(s){
  const v=Object.assign({title:"",code:"",color:SUBJ_COLORS[UI.subjs.length%SUBJ_COLORS.length]},s||{});
  openModal({title:s?"Sửa môn học":"Môn học mới",small:true,body:`<div class="form"><div class="field"><label for="sjT">Tên môn</label><input class="input" id="sjT" value="${esc(v.title)}" placeholder="Thiết kế hệ thống số"></div><div class="field"><label for="sjC">Mã/nhãn ngắn</label><input class="input" id="sjC" value="${esc(v.code)}" placeholder="DSD"></div><div class="field"><span>Màu nhãn</span><div class="model-pick">${SUBJ_COLORS.map(c=>`<button class="chip" data-col="${c}" aria-pressed="${c===v.color}" style="background:${c};width:36px;height:30px"></button>`).join("")}</div></div>${s?"":`<label class="chk-row"><input type="checkbox" class="chk" id="sjF" checked> Tạo sẵn thư mục “Chương 1”</label>`}</div>`,foot:`${s?`<button class="pill-btn" id="sjDel" style="color:var(--bad)">${ic("trash")} Xóa môn</button>`:""}<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="sjOk">${s?"Lưu":"Tạo môn"}</button>`});
  if(s)$("#sjDel").onclick=()=>{closeDialog();confirmDialog("Xóa môn “"+s.title+"”?","Thư mục của môn bị xóa; các bài học bên trong KHÔNG bị xóa mà chuyển sang “Chưa xếp môn”.","Xóa môn",async()=>{for(const n of UI.nbs.filter(n=>n.subj===s.id))await Store.patch(n.id,{subj:null,parent:null});for(const f of UI.folds.filter(f=>f.subj===s.id))await Store.del(f.id);for(const t of UI.tasks.filter(t=>t.subj===s.id))await Store.patch(t.id,{subj:null});await Store.del(s.id);goHome()})};
  let col=v.color;$$("[data-col]").forEach(b=>b.onclick=()=>{col=b.dataset.col;$$("[data-col]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $("#sjOk").onclick=async()=>{const t=$("#sjT").value.trim();if(!t){toast("Nhập tên môn");return}const id=s?s.id:mkid("sj");
    const base={...(s||{})};delete base.id;await Store.put(id,{...base,type:"subj",title:t,code:$("#sjC").value.trim(),color:col,created:(s&&s.created)||Date.now(),order:(s&&s.order)||UI.subjs.length});
    if(!s&&$("#sjF")&&$("#sjF").checked)await Store.put(mkid("fd"),{type:"fold",subj:id,parent:null,title:"Chương 1",order:0,created:Date.now()});closeDialog();if(!s)openSubject(id)};
}
function newLessonDialog(sid,parent){
  const subs=UI.subjs;openModal({title:"Bài học mới",small:true,body:`<div class="form"><div class="field"><label for="lsT">Tên bài</label><input class="input" id="lsT" placeholder="Ví dụ: Flip-Flop và ứng dụng"></div>
   <div class="row3"><div class="field"><label for="lsS">Môn</label><select id="lsS"><option value="">Chưa xếp môn</option>${subs.map(s=>`<option value="${esc(s.id)}" ${s.id===sid?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div><div class="field"><label for="lsF">Thư mục</label><select id="lsF"></select></div></div>
   <div class="field"><label for="lsG">Mục tiêu bài học (tùy chọn)</label><textarea class="input" id="lsG" placeholder="Ví dụ: Hiểu SR latch, D flip-flop, tính tần số ra của bộ chia tần"></textarea></div></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="lsOk">Tạo và thêm nguồn</button>`});
  const fill=()=>{const s=$("#lsS").value;$("#lsF").innerHTML=`<option value="">(Gốc của môn)</option>`+UI.folds.filter(f=>f.subj===s).map(f=>`<option value="${esc(f.id)}" ${f.id===parent?"selected":""}>${esc(foldPath(f.id))}</option>`).join("")};fill();$("#lsS").onchange=fill;
  $("#lsOk").onclick=async()=>{const id=mkid("nb");await Store.put(id,{type:"nb",title:$("#lsT").value.trim()||"Bài học chưa đặt tên",subj:$("#lsS").value||null,parent:$("#lsF").value||null,goals:$("#lsG").value.trim(),created:Date.now(),updated:Date.now(),srcCount:0,summary:"",questions:[]});closeDialog();setTimeout(()=>openNotebook(id,{addSources:true}),250)};
}
function foldPath(fid){const p=[];let f=UI.folds.find(x=>x.id===fid);let g=0;while(f&&g++<12){p.unshift(f.title);f=UI.folds.find(x=>x.id===f.parent)}return p.join(" › ")}
function folderDialog(sid,parent,f){
  openModal({title:f?"Đổi tên thư mục":"Thư mục mới",small:true,body:`<div class="form"><input class="input" id="fdT" value="${esc(f?f.title:"")}" placeholder="Ví dụ: Chương 3 · Mạch tuần tự"></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="fdOk">Lưu</button>`});
  $("#fdT").focus();$("#fdOk").onclick=async()=>{const t=$("#fdT").value.trim()||"Thư mục mới";if(f)await Store.patch(f.id,{title:t});else{const id=mkid("fd");await Store.put(id,{type:"fold",subj:sid,parent:parent||null,title:t,order:Date.now(),created:Date.now()});UI.openFolds.add(id);local.set("openFolds",[...UI.openFolds])}closeDialog()};
}
function taskDialog(o={}){
  openModal({title:"Thêm bài tập / việc cần làm",small:true,body:`<div class="form"><div class="field"><label for="tkT">Nội dung</label><input class="input" id="tkT" value="${esc(o.title||"")}" placeholder="Ví dụ: Nộp lab 3 — bộ đếm mod 10"></div><div class="row3"><div class="field"><label for="tkS">Môn</label><select id="tkS"><option value="">Không gắn môn</option>${UI.subjs.map(s=>`<option value="${esc(s.id)}" ${s.id===o.subj?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div><div class="field"><label for="tkD">Hạn</label><input type="date" id="tkD" value="${esc(o.due||ymd(addD(new Date(),3)))}"></div></div></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="tkOk">Thêm</button>`});
  $("#tkT").focus();$("#tkOk").onclick=async()=>{const t=$("#tkT").value.trim();if(!t){toast("Nhập nội dung");return}await Store.put(mkid("tk"),{type:"task",title:t,subj:$("#tkS").value||null,due:$("#tkD").value||null,status:"todo",created:Date.now()});closeDialog();toast("Đã thêm")};
}

/* =====================================================================
   TRANG MÔN HỌC + TRÌNH DUYỆT THƯ MỤC
   ===================================================================== */
function openSubject(id){stopAll();UI.unsub.forEach(u=>u());UI.unsub=[];UI.view="subj";UI.curSubj=id;UI.cur=null;$("#app").classList.remove("in-nb");$("#mobtabs").hidden=true;renderTop();renderSubject()}
function treeHTML(sid,parent,curNb){
  const folds=UI.folds.filter(f=>f.subj===sid&&(f.parent||null)===(parent||null)).sort((a,b)=>(a.order||0)-(b.order||0));
  const files=(sid==="none"?nbsOf("none"):UI.nbs.filter(n=>n.subj===sid&&(n.parent&&UI.folds.some(f=>f.id===n.parent)?n.parent:null)===(parent||null))).sort((a,b)=>(a.created||0)-(b.created||0));
  return `<ul class="tree">${folds.map(f=>{const open=UI.openFolds.has(f.id);return `<li><div class="node" data-fold="${esc(f.id)}" draggable="true" tabindex="0"><span class="tw">${open?"▾":"▸"}</span>${pxFolder(open)}<span class="nm">${esc(f.title)}</span><button class="mn" data-fmenu="${esc(f.id)}" aria-label="Tùy chọn thư mục">${ic("more")}</button></div>${open?treeHTML(sid,f.id,curNb):""}</li>`}).join("")}
   ${files.map(n=>`<li><div class="node ${n.id===curNb?"cur":""}" data-file="${esc(n.id)}" draggable="true" tabindex="0"><span class="tw"></span>${pxFile(tagCol(n.subj))}<span class="nm">${esc(n.title)}</span><button class="mn" data-lmenu="${esc(n.id)}" aria-label="Tùy chọn bài">${ic("more")}</button></div></li>`).join("")}</ul>`;
}
function bindTree(root,sid){
  $$("[data-fold]",root).forEach(el=>{const id=el.dataset.fold;el.onclick=e=>{if(e.target.closest(".mn"))return;UI.openFolds.has(id)?UI.openFolds.delete(id):UI.openFolds.add(id);local.set("openFolds",[...UI.openFolds]);rerenderTree()};el.onkeydown=e=>{if(e.key==="Enter")el.click()}});
  $$("[data-file]",root).forEach(el=>{el.onclick=e=>{if(e.target.closest(".mn"))return;openNotebook(el.dataset.file)};el.onkeydown=e=>{if(e.key==="Enter")el.click()}});
  $$("[data-fmenu]",root).forEach(b=>b.onclick=e=>{e.stopPropagation();const f=UI.folds.find(x=>x.id===b.dataset.fmenu);const m=popMenu(b,`<button data-a="l">${ic("plus")}Bài học mới trong thư mục</button><button data-a="f">${ic("plus")}Thư mục con</button><button data-a="r">${ic("edit")}Đổi tên</button><button data-a="d" style="color:var(--bad)">${ic("trash")}Xóa thư mục</button>`);
    $("[data-a=l]",m).onclick=()=>newLessonDialog(f.subj,f.id);$("[data-a=f]",m).onclick=()=>folderDialog(f.subj,f.id);$("[data-a=r]",m).onclick=()=>folderDialog(f.subj,null,f);
    $("[data-a=d]",m).onclick=()=>confirmDialog("Xóa thư mục “"+f.title+"”?","Các bài học và thư mục con bên trong được chuyển lên thư mục cha, không bị xóa.","Xóa",async()=>{for(const n of UI.nbs.filter(n=>n.parent===f.id))await Store.patch(n.id,{parent:f.parent||null});for(const c of UI.folds.filter(c=>c.parent===f.id))await Store.patch(c.id,{parent:f.parent||null});await Store.del(f.id)})});
  $$("[data-lmenu]",root).forEach(b=>b.onclick=e=>{e.stopPropagation();const n=UI.nbs.find(x=>x.id===b.dataset.lmenu);const m=popMenu(b,`<button data-a="o">${ic("ext")}Mở</button><button data-a="r">${ic("edit")}Đổi tên</button><button data-a="mv">${ic("book")}Chuyển môn/thư mục</button><button data-a="d" style="color:var(--bad)">${ic("trash")}Xóa bài học</button>`);
    $("[data-a=o]",m).onclick=()=>openNotebook(n.id);$("[data-a=r]",m).onclick=()=>renameDialog(n.id);$("[data-a=mv]",m).onclick=()=>moveDialog(n);
    $("[data-a=d]",m).onclick=()=>confirmDialog("Xóa bài học này?","Toàn bộ nguồn, ghi chú và nội dung Studio trong bài sẽ bị xóa vĩnh viễn.","Xóa",()=>deleteNotebook(n.id))});
  /* kéo thả bài/thư mục vào thư mục khác */
  $$("[draggable=true]",root).forEach(el=>{el.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain",(el.dataset.file?"f:":"d:")+(el.dataset.file||el.dataset.fold));e.dataTransfer.effectAllowed="move"})});
  const targets=[...$$("[data-fold]",root),...$$("[data-root-drop]",root.closest(".xp")||root)];
  targets.forEach(t=>{t.addEventListener("dragover",e=>{e.preventDefault();t.classList.add("drop")});t.addEventListener("dragleave",()=>t.classList.remove("drop"));
    t.addEventListener("drop",async e=>{e.preventDefault();t.classList.remove("drop");const v=e.dataTransfer.getData("text/plain");const dest=t.dataset.fold||null;if(!v)return;const [k,id]=[v.slice(0,1),v.slice(2)];
      if(k==="f"){await Store.patch(id,{parent:dest,subj:dest?UI.folds.find(f=>f.id===dest).subj:(sid==="none"?null:sid)})}else{if(id===dest)return;let p=dest,g=0;while(p&&g++<20){if(p===id){toast("Không thể chuyển thư mục vào chính nó");return}p=(UI.folds.find(f=>f.id===p)||{}).parent}await Store.patch(id,{parent:dest})}
      if(dest){UI.openFolds.add(dest);local.set("openFolds",[...UI.openFolds])}})});
}
function moveDialog(n){
  openModal({title:"Chuyển bài học",small:true,body:`<div class="form"><div class="field"><label for="mvS">Môn</label><select id="mvS"><option value="">Chưa xếp môn</option>${UI.subjs.map(s=>`<option value="${esc(s.id)}" ${s.id===n.subj?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div><div class="field"><label for="mvF">Thư mục</label><select id="mvF"></select></div></div>`,foot:`<div class="grow"></div><button class="pill-btn primary" id="mvOk">Chuyển</button>`});
  const fill=()=>{const s=$("#mvS").value;$("#mvF").innerHTML=`<option value="">(Gốc của môn)</option>`+UI.folds.filter(f=>f.subj===s).map(f=>`<option value="${esc(f.id)}" ${f.id===n.parent?"selected":""}>${esc(foldPath(f.id))}</option>`).join("")};fill();$("#mvS").onchange=fill;
  $("#mvOk").onclick=async()=>{await Store.patch(n.id,{subj:$("#mvS").value||null,parent:$("#mvF").value||null});closeDialog();toast("Đã chuyển")};
}
function rerenderTree(){if(UI.view==="subj")renderSubject(true);else if(UI.view==="nb"&&UI.srcTab==="tree")renderSources()}
function renderSubject(treeOnly){
  if(UI.view!=="subj")return;const sid=UI.curSubj;const s=sid==="none"?{id:"none",title:"Chưa xếp môn",color:"#8b93a8"}:subjOf(sid);if(!s){goHome();return}
  if(!treeOnly&&document.activeElement&&$("#main").contains(document.activeElement)&&/INPUT|TEXTAREA/.test(document.activeElement.tagName)&&$("#xpTree")){const t=$("#xpTree");t.innerHTML=treeHTML(sid,null);bindTree(t,sid);return}
  if(treeOnly&&$("#xpTree")){$("#xpTree").innerHTML=treeHTML(sid,null);bindTree($("#xpTree"),sid);return}
  const lessons=nbsOf(sid);
  $("#main").innerHTML=`<div class="subj"><aside class="xp"><div class="xp-h"><b>explorer.exe</b><i></i><i></i><i style="background:var(--accent)"></i></div>
    <div class="xp-tools">${sid!=="none"?`<button id="xpF">${pxFolder(false)} Thư mục</button>`:""}<button id="xpL">${pxFile(s.color)} Bài học</button></div>
    <div class="xp-b"><div class="node" data-root-drop style="font-weight:600">${ic("book")}<span class="nm">${esc(s.title)}</span></div><div id="xpTree">${treeHTML(sid,null)}</div><p class="muted" style="font-size:12px;padding:8px 10px">Kéo bài học hoặc thư mục để sắp xếp. Bấm ⋯ để đổi tên, chuyển, xóa.</p></div></aside>
   <main class="subj-main"><div class="subj-cover"><canvas id="sjCov" aria-hidden="true"></canvas></div><div class="subj-body">
     <div class="subj-title"><span class="tag" style="background:${s.color}">${esc(s.code||"MÔN")}</span>${sid==="none"?`<h2 style="font-size:26px">${esc(s.title)}</h2>`:`<input id="sjName" value="${esc(s.title)}" aria-label="Tên môn"><button class="btn" id="sjEdit">${ic("edit")} Nhãn & màu</button>`}</div>
     <div class="rtab" role="tablist">${[["lessons","Bài học"],["plan","Đề cương & trọng tâm"],["tasks","Bài tập"]].filter(x=>sid!=="none"||x[0]==="lessons").map(([k,l])=>`<button role="tab" data-stab="${k}" aria-selected="${UI.subjTab===k}">${l}</button>`).join("")}<span class="grow"></span></div>
     <div id="sjBody"></div></div></main></div>`;
  pixelScene($("#sjCov"),{seed:sid+(s.title||""),night:isNightSkin(),tint:sid==="none"?null:s.color,w:320,h:80});
  bindTree($("#main"),sid);
  if($("#xpF"))$("#xpF").onclick=()=>folderDialog(sid,null);$("#xpL").onclick=()=>newLessonDialog(sid==="none"?null:sid);
  const nm=$("#sjName");if(nm)nm.onchange=()=>Store.patch(sid,{title:nm.value.trim()||s.title});const ed=$("#sjEdit");if(ed)ed.onclick=()=>subjectDialog(s);
  $$("[data-stab]").forEach(b=>b.onclick=()=>{UI.subjTab=b.dataset.stab;$$("[data-stab]").forEach(x=>x.setAttribute("aria-selected",x===b));subjBody(s)});
  if(sid==="none")UI.subjTab="lessons";subjBody(s);
}
function subjBody(s){
  const b=$("#sjBody");if(!b)return;const sid=s.id;
  if(UI.subjTab==="lessons"){const groups=[[null,"Bài học ở gốc"],...UI.folds.filter(f=>f.subj===sid).sort((a,c)=>(a.order||0)-(c.order||0)).map(f=>[f.id,foldPath(f.id)])];
    b.innerHTML=groups.map(([fid,label])=>{const L=(sid==="none"?nbsOf("none"):UI.nbs.filter(n=>n.subj===sid&&(n.parent||null)===fid));if(!L.length&&fid===null)return"";return `<div class="sec"><h4 style="display:flex;gap:8px;align-items:center;font-size:14px">${fid?pxFolder(true):""}${esc(label)} <span class="muted" style="font-weight:400">(${L.length})</span>${fid?`<button class="btn" data-addin="${esc(fid)}" style="margin-left:auto">${ic("plus")} Bài</button>`:""}</h4><div class="lessons-grid">${L.map(n=>`<button class="lcard" data-go="${esc(n.id)}"><b>${pxFile(s.color)} ${esc(n.title)}</b><small>${esc(n.summary?n.summary.replace(/\*\*|\[\d+\]/g,""):n.goals||"Chưa có tóm tắt")}</small><span class="muted" style="font-size:12px">${n.srcCount||0} nguồn · ${dfmt(n.updated||n.created||Date.now())}</span></button>`).join("")||`<span class="muted" style="font-size:13px">Thư mục trống.</span>`}</div></div>`}).join("")||`<div class="empty">Môn này chưa có bài học. Bấm “Bài học” ở cửa sổ explorer để thêm.</div>`;
    $$("[data-go]",b).forEach(x=>x.onclick=()=>openNotebook(x.dataset.go));$$("[data-addin]",b).forEach(x=>x.onclick=()=>newLessonDialog(sid,x.dataset.addin));return}
  if(UI.subjTab==="plan"){b.innerHTML=`<div class="form" style="padding:0">
    <p class="muted" style="margin:0;font-size:13.5px">AI đọc phần này mỗi khi trả lời hoặc tạo nội dung cho bài học thuộc môn, để bám đúng chương trình của bạn.</p>
    <div class="field"><label for="sjSy">Đề cương / danh sách chương (dán từ Moodle)</label><textarea class="input" id="sjSy" style="min-height:160px" placeholder="Ví dụ: Ch1 Number systems · Ch2 Boolean algebra · Ch3 Combinational logic · Ch4 Sequential logic · Ch5 FSM · Ch6 VHDL">${esc(s.syllabus||"")}</textarea></div>
    <div class="field"><label for="sjFo">Trọng tâm muốn nhấn mạnh</label><textarea class="input" id="sjFo" placeholder="Ví dụ: Thiết kế FSM Moore/Mealy, phân tích timing, bài tập tính tần số">${esc(s.focus||"")}</textarea></div>
    <div class="field"><label for="sjEx">Phần không cần đi sâu</label><input class="input" id="sjEx" value="${esc(s.exclude||"")}" placeholder="Ví dụ: Lịch sử ra đời TTL"></div>
    <div class="row3"><div class="field"><label for="sjDt">Ngày thi</label><input type="date" id="sjDt" value="${esc(s.exam||"")}"></div><div class="field"><span>&nbsp;</span><button class="pill-btn primary" id="sjSave">Lưu đề cương</button></div><div class="field"><span>&nbsp;</span><button class="pill-btn" id="sjPlan">${ic("cal")} Lập lịch ôn tập môn này</button></div></div></div>`;
    $("#sjSave").onclick=async()=>{await Store.patch(sid,{syllabus:$("#sjSy").value,focus:$("#sjFo").value,exclude:$("#sjEx").value,exam:$("#sjDt").value});toast("Đã lưu đề cương")};
    $("#sjPlan").onclick=()=>planDialog(sid);return}
  b.innerHTML=`<div style="display:flex;justify-content:flex-end"><button class="btn" id="sjTk">${ic("plus")} Bài tập</button></div><div class="tasks" id="sjTasks"></div>`;$("#sjTk").onclick=()=>taskDialog({subj:sid});const keep=UI.taskTab;UI.taskTab="all";renderTasks($("#sjTasks"),sid);UI.taskTab=keep;
}

/* =====================================================================
   LỊCH: NGÀY / TUẦN / THÁNG (như Google Calendar)
   ===================================================================== */
function goCal(){stopAll();UI.unsub.forEach(u=>u());UI.unsub=[];UI.view="cal";UI.cur=null;$("#app").classList.remove("in-nb");$("#mobtabs").hidden=true;renderTop();renderCalPage()}
function openCalendarHub(){goCal()}
function upcomingAll(){const L=[];UI.cals.forEach(c=>(c.events||[]).forEach(e=>L.push({...e,nbTitle:c.nbTitle,nb:c.nb})));return L}
function calRange(){const d=new Date(UI.calDate);d.setHours(0,0,0,0);if(UI.calView==="month"){const f=new Date(d.getFullYear(),d.getMonth(),1);const s=monday(f);return [s,addD(s,42)]}if(UI.calView==="week"){const s=monday(d);return [s,addD(s,7)]}return [d,addD(d,1)]}
const COLS={study:"#9d86e9",own:"#5fa8e0",task:"#e8736f",google:"#4caf7d"};
function calEvents(rs,re){
  const out=[];const fl=local.get("calFilter",{study:true,own:true,task:true,google:true});
  if(fl.study)upcomingAll().forEach(e=>{const st=new Date(e.date+"T"+(e.start||"19:00")+":00");const en=new Date(st.getTime()+(e.minutes||60)*6e4);if(st<re&&en>rs)out.push({t:e.title,st,en,k:"study",c:COLS.study,ref:e,nb:e.nb})});
  if(fl.own)UI.evs.forEach(e=>{const st=new Date(e.date+"T"+(e.start||"09:00")+":00"),en=new Date(st.getTime()+(e.minutes||60)*6e4);if(st<re&&en>rs)out.push({t:e.title,st,en,k:"own",c:e.subj?tagCol(e.subj):COLS.own,id:e.id})});
  if(fl.task)UI.tasks.forEach(t=>{if(!t.due)return;const st=new Date(t.due+"T00:00:00");if(st>=rs&&st<re)out.push({t:(t.status==="done"?"✓ ":"")+t.title,st,en:addD(st,1),all:true,k:"task",c:t.subj?tagCol(t.subj):COLS.task,id:t.id})});
  if(fl.google&&UI.gcShow){const key=rs.toISOString()+re.toISOString();const g=UI.gcCache[key];if(g&&g!=="loading")g.forEach(e=>{const all=e.start.length<=10;const st=new Date(all?e.start+"T00:00:00":e.start),en=new Date(all?(e.end||e.start)+"T00:00:00":(e.end||e.start));out.push({t:e.title,st,en:all&&en<=st?addD(st,1):en,all,k:"google",c:COLS.google,link:e.link})});else if(!g)loadGc(rs,re,key)}
  return out.sort((a,b)=>a.st-b.st);
}
async function loadGc(rs,re,key){if((await gcStatus())!=="ok"){UI.gcCache[key]=[];return}UI.gcCache[key]="loading";
  try{const r=await P.mcp.callTool(GC,"list_events",{startTime:localISO(rs),endTime:localISO(re),orderBy:"startTime",pageSize:250});const pl=r.payload||{};UI.gcCache[key]=(pl.events||[]).map(e=>({title:e.summary||"(Không tiêu đề)",start:(e.start&&(e.start.dateTime||e.start.date))||"",end:(e.end&&(e.end.dateTime||e.end.date))||"",link:e.htmlLink||""}))}catch(e){UI.gcCache[key]=[];toast(gcErr(e),4000)}
  rerenderCals()}
function rerenderCals(){const h=$("#homeCal");if(h)renderCalendar(h,{compact:true});const c=$("#calMain");if(c)renderCalendar(c,{});const m=$("#miniCal");if(m)renderMini(m)}
function calTitle(){const d=UI.calDate;if(UI.calView==="month")return d.toLocaleDateString("vi-VN",{month:"long",year:"numeric"});if(UI.calView==="week"){const [s,e]=calRange();return `${s.toLocaleDateString("vi-VN",{day:"numeric",month:"short"})} – ${addD(e,-1).toLocaleDateString("vi-VN",{day:"numeric",month:"short",year:"numeric"})}`}return d.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
function renderCalendar(el,{compact}={}){
  if(!el)return;const [rs,re]=calRange();const evs=calEvents(rs,re);const today=ymd(new Date());
  const bar=`<div class="cal-bar"><button class="btn" data-cn="today">Hôm nay</button><button class="ghost ic" data-cn="-1" aria-label="Trước">${ic("back")}</button><button class="ghost ic" data-cn="1" aria-label="Sau" style="transform:scaleX(-1)">${ic("back")}</button><h3>${esc(calTitle())}</h3><span class="grow"></span>
   <div class="rtab" role="tablist" style="border:0">${[["day","Ngày"],["week","Tuần"],["month","Tháng"]].map(([k,l])=>`<button role="tab" data-cv="${k}" aria-selected="${UI.calView===k}">${l}</button>`).join("")}</div>
   <button class="btn" data-cn="new">${ic("plus")} Sự kiện</button>${compact?"":`<button class="btn" data-cn="plan">${ic("spark")} Lập lịch ôn tập</button>`}</div>`;
  let body="";
  if(UI.calView==="month"){const cells=[];for(let i=0;i<42;i++){const d=addD(rs,i),ds=ymd(d);const de=evs.filter(e=>ymd(e.st)===ds||(e.all&&e.st<=d&&e.en>d));cells.push(`<div class="mc ${d.getMonth()!==UI.calDate.getMonth()?"out":""} ${ds===today?"today":""}" data-day="${ds}"><span class="dn">${d.getDate()}</span>${de.slice(0,3).map((e,j)=>`<button class="chipev" style="background:${e.c}" data-ev="${evs.indexOf(e)}" title="${esc(e.t)}">${e.all?"":e.st.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})+" "}${esc(e.t)}</button>`).join("")}${de.length>3?`<button class="more" data-day="${ds}">+${de.length-3} nữa</button>`:""}</div>`)}
    body=`<div class="month">${WD.map(w=>`<div class="wd">${w}</div>`).join("")}${cells.join("")}</div>`}
  else{const n=UI.calView==="week"?7:1;const days=Array.from({length:n},(_,i)=>addD(rs,i));const H0=6,H1=24,PH=44;
    const head=`<div class="tg-head" style="--n:${n}"><div></div>${days.map(d=>`<div class="${ymd(d)===today?"today":""}">${WD[(d.getDay()+6)%7]}<b>${d.getDate()}</b></div>`).join("")}</div>`;
    const all=`<div class="tg-all" style="--n:${n}"><div>cả ngày</div>${days.map(d=>`<div>${evs.filter(e=>e.all&&e.st<=d&&e.en>d).map(e=>`<button class="chipev" style="background:${e.c}" data-ev="${evs.indexOf(e)}">${esc(e.t)}</button>`).join("")}</div>`).join("")}</div>`;
    const cols=days.map(d=>{const de=evs.filter(e=>!e.all&&ymd(e.st)===ymd(d));const lanes=[];de.forEach(e=>{let l=lanes.findIndex(end=>end<=e.st);if(l<0){l=lanes.length;lanes.push(e.en)}else lanes[l]=e.en;e._l=l});const nl=Math.max(1,lanes.length);
      const now=new Date();const nowTop=ymd(d)===today?((now.getHours()+now.getMinutes()/60)-H0)*PH:null;
      return `<div class="tg-col" data-col="${ymd(d)}" style="height:${(H1-H0)*PH}px">${de.map(e=>{const top=Math.max(0,(e.st.getHours()+e.st.getMinutes()/60-H0)*PH),hh=Math.max(20,(e.en-e.st)/36e5*PH-2);return `<button class="tg-ev" data-ev="${evs.indexOf(e)}" style="top:${top}px;height:${hh}px;background:${e.c};left:calc(${e._l/nl*100}% + 2px);width:calc(${100/nl}% - 4px);right:auto">${esc(e.t)}<small>${e.st.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}–${e.en.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}</small></button>`}).join("")}${nowTop!=null&&nowTop>=0?`<div class="nowline" style="top:${nowTop}px"></div>`:""}</div>`});
    body=`<div class="tg">${head}${all}<div class="tg-body" style="--n:${n}"><div class="tg-hours">${Array.from({length:H1-H0},(_,i)=>`<div>${String(H0+i).padStart(2,"0")}:00</div>`).join("")}</div>${cols.join("")}</div></div>`}
  el.innerHTML=`<div class="cal">${bar}${body}${UI.gcShow?"":`<div class="muted" style="font-size:12.5px">Lịch Google đang ẩn — bật “Hiện lịch Google” trong trang Lịch học để xem cả sự kiện từ Google Calendar.</div>`}</div>`;
  const tb=$(".tg-body",el);if(tb){const timed=evs.filter(e=>!e.all);const nowH=new Date().getHours();const first=timed.length?Math.min(...timed.map(e=>e.st.getHours())):nowH;const tgt=Math.min(first,nowH>=7?nowH:first);tb.scrollTop=Math.max(0,(tgt-6-.5)*44)}
  $$("[data-cn]",el).forEach(b=>b.onclick=()=>{const k=b.dataset.cn;if(k==="today")UI.calDate=new Date();else if(k==="new")return eventDialog({date:ymd(UI.calDate),start:"19:00"});else if(k==="plan")return planDialog();else{const d=new Date(UI.calDate);const s=+k;if(UI.calView==="month")d.setMonth(d.getMonth()+s);else d.setDate(d.getDate()+s*(UI.calView==="week"?7:1));UI.calDate=d}rerenderCals()});
  $$("[data-cv]",el).forEach(b=>b.onclick=()=>{UI.calView=b.dataset.cv;local.set("calView",UI.calView);rerenderCals()});
  $$(".mc[data-day],.more[data-day]",el).forEach(c=>c.onclick=e=>{if(e.target.closest("[data-ev]"))return;UI.calDate=new Date(c.dataset.day+"T00:00");UI.calView="day";local.set("calView","day");rerenderCals()});
  $$("[data-col]",el).forEach(c=>c.onclick=e=>{if(e.target.closest("[data-ev]"))return;const r=c.getBoundingClientRect();const h=6+Math.floor((e.clientY-r.top)/44*2)/2;eventDialog({date:c.dataset.col,start:`${String(Math.floor(h)).padStart(2,"0")}:${h%1?"30":"00"}`})});
  $$("[data-ev]",el).forEach(b=>b.onclick=e=>{e.stopPropagation();evPop(b,evs[+b.dataset.ev])});
}
function evPop(anchor,e){
  const m=popMenu(anchor,`<div class="who"><b style="color:var(--ink);font-size:14px">${esc(e.t)}</b><br>${e.all?e.st.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long"}):e.st.toLocaleString("vi-VN",{weekday:"long",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}<br>${{study:"Buổi ôn tập",own:"Sự kiện của bạn",task:"Hạn bài tập",google:"Google Calendar"}[e.k]}</div>
   ${e.k==="study"&&e.nb?`<button data-a="plan">${ic("cal")}Xem lịch ôn tập</button>`:""}${e.k==="google"&&e.link?`<button data-a="g">${ic("ext")}Mở trong Google Calendar</button>`:""}${e.k==="own"||e.k==="task"?`<button data-a="d" style="color:var(--bad)">${ic("trash")}Xóa</button>`:""}`);
  const p=$("[data-a=plan]",m);if(p)p.onclick=()=>openPlan(e.nb);const g=$("[data-a=g]",m);if(g)g.onclick=()=>window.open(e.link,"_blank","noopener");const d=$("[data-a=d]",m);if(d)d.onclick=()=>Store.del(e.id);
}
async function eventDialog(o){
  const gc=await gcStatus();
  openModal({title:"Sự kiện mới",small:true,body:`<div class="form"><div class="field"><label for="evT">Tiêu đề</label><input class="input" id="evT" placeholder="Ví dụ: Học nhóm Digital Design"></div>
   <div class="row3"><div class="field"><label for="evD">Ngày</label><input type="date" id="evD" value="${esc(o.date)}"></div><div class="field"><label for="evS">Bắt đầu</label><input type="time" id="evS" value="${esc(o.start||"19:00")}"></div><div class="field"><label for="evM">Thời lượng (phút)</label><input type="number" id="evM" min="15" max="600" value="60"></div><div class="field"><label for="evJ">Môn</label><select id="evJ"><option value="">—</option>${UI.subjs.map(s=>`<option value="${esc(s.id)}">${esc(s.title)}</option>`).join("")}</select></div></div>
   <label class="chk-row"><input type="checkbox" class="chk" id="evG" ${gc==="ok"?"checked":"disabled"}> Lưu vào Google Calendar ${gc==="ok"?"":"(chưa kết nối — lưu trong Sổ Học)"}</label></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="evOk">Lưu</button>`});
  $("#evT").focus();
  $("#evOk").onclick=async()=>{const ev={title:$("#evT").value.trim()||"Sự kiện",date:$("#evD").value,start:$("#evS").value||"19:00",minutes:Math.max(15,+$("#evM").value||60),subj:$("#evJ").value||null};
    $("#evOk").disabled=true;
    if($("#evG").checked&&gc==="ok"){try{await gcCreate(ev);UI.gcCache={};toast("Đã thêm vào Google Calendar")}catch(e){toast(gcErr(e),4000);$("#evOk").disabled=false;return}}
    else{await Store.put(mkid("ev"),{type:"ev",...ev,created:Date.now()});toast("Đã lưu sự kiện")}
    closeDialog();rerenderCals()};
}
function renderMini(el){const d=UI.calDate,f=new Date(d.getFullYear(),d.getMonth(),1),s=monday(f),today=ymd(new Date()),sel=ymd(d);
  el.innerHTML=`<div style="display:flex;align-items:center;gap:6px"><b style="flex:1;font-size:14px">${f.toLocaleDateString("vi-VN",{month:"long",year:"numeric"})}</b><button class="ghost ic" data-mm="-1" aria-label="Tháng trước">${ic("back")}</button><button class="ghost ic" data-mm="1" aria-label="Tháng sau" style="transform:scaleX(-1)">${ic("back")}</button></div><div class="minimo">${WD.map(w=>`<span class="muted">${w}</span>`).join("")}${Array.from({length:42},(_,i)=>{const x=addD(s,i),xs=ymd(x);return `<button data-md="${xs}" class="${x.getMonth()!==f.getMonth()?"out":""} ${xs===today?"today":""} ${xs===sel?"sel":""}">${x.getDate()}</button>`}).join("")}</div>`;
  $$("[data-mm]",el).forEach(b=>b.onclick=()=>{const x=new Date(UI.calDate);x.setMonth(x.getMonth()+ +b.dataset.mm);UI.calDate=x;rerenderCals()});$$("[data-md]",el).forEach(b=>b.onclick=()=>{UI.calDate=new Date(b.dataset.md+"T00:00");rerenderCals()})}
async function renderCalPage(){
  if(UI.view!=="cal")return;const fl=local.get("calFilter",{study:true,own:true,task:true,google:true});const gc=await gcStatus();
  $("#main").innerHTML=`<div class="calpage"><div class="calpage-in"><aside style="display:grid;gap:14px">
    <button class="pill-btn primary" id="cpNew">${ic("plus")} Tạo sự kiện</button>
    <div class="panel-box" id="miniCal"></div>
    <div class="panel-box"><h4>Hiển thị</h4>${[["study","Buổi ôn tập"],["own","Sự kiện của bạn"],["task","Hạn bài tập"],["google","Google Calendar"]].map(([k,l])=>`<label class="chk-row"><input type="checkbox" class="chk" data-fl="${k}" ${fl[k]?"checked":""}><i style="background:${COLS[k]}"></i>${l}</label>`).join("")}
      <div class="sep" style="height:1px;background:var(--line);margin:4px 0"></div>
      ${gc==="ok"?`<label class="chk-row"><input type="checkbox" class="chk" id="gcShow" ${UI.gcShow?"checked":""}> Hiện lịch Google</label>`:`<button class="btn" id="gcCon">${ic("cal")} Kết nối Google Calendar</button><span class="muted" style="font-size:12px">${gc==="none"?"Chưa thêm Google Calendar cho trang.":"Cần kết nối lại."}</span>`}</div>
    <div class="panel-box"><h4>Lịch ôn tập</h4>${UI.cals.length?UI.cals.map(c=>`<button class="btn" data-plan="${esc(c.nb)}" style="justify-content:flex-start">${ic("cal")} ${esc(c.nbTitle||"Lịch ôn")}</button>`).join(""):`<span class="muted" style="font-size:13px">Chưa có. Bấm “Lập lịch ôn tập”.</span>`}<button class="btn" id="cpPlan">${ic("spark")} Lập lịch ôn tập</button></div>
   </aside><div class="panel-box" id="calMain"></div></div></div>`;
  renderMini($("#miniCal"));renderCalendar($("#calMain"),{});
  $("#cpNew").onclick=()=>eventDialog({date:ymd(UI.calDate),start:"19:00"});$("#cpPlan").onclick=()=>planDialog();
  $$("[data-fl]").forEach(x=>x.onchange=()=>{const f=local.get("calFilter",{study:true,own:true,task:true,google:true});f[x.dataset.fl]=x.checked;local.set("calFilter",f);rerenderCals()});
  const gs=$("#gcShow");if(gs)gs.onchange=()=>{UI.gcShow=gs.checked;local.set("gcShow",UI.gcShow);UI.gcCache={};rerenderCals()};
  const gcb=$("#gcCon");if(gcb)gcb.onclick=async()=>{await gcConnect();UI.gcShow=true;local.set("gcShow",true);renderCalPage()};
  $$("[data-plan]").forEach(b=>b.onclick=()=>openPlan(b.dataset.plan));
}

/* ---------- lập lịch ôn tập theo môn ---------- */
function planDialog(sid){
  const today=ymd(new Date());const s0=sid?subjOf(sid):UI.subjs[0];const exam=(s0&&s0.exam)||ymd(addD(new Date(),21));
  openModal({title:"Lập lịch ôn tập",small:true,body:`<div class="form">
    <p class="muted" style="margin:0">AI chia các bài học của môn (theo thứ tự thư mục) thành từng buổi ôn. Nếu đã kết nối Google Calendar, Sổ Học dời giờ để tránh trùng lịch có sẵn.</p>
    <div class="field"><label for="plS">Môn</label><select id="plS">${UI.subjs.map(s=>`<option value="${esc(s.id)}" ${s0&&s.id===s0.id?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div>
    <div class="row3"><div class="field"><label for="pS">Bắt đầu</label><input type="date" id="pS" value="${today}"></div><div class="field"><label for="pE">Ngày thi / hạn chót</label><input type="date" id="pE" value="${exam}"></div><div class="field"><label for="pT">Giờ học</label><input type="time" id="pT" value="20:00"></div><div class="field"><label for="pM">Thời lượng (phút)</label><input type="number" id="pM" min="20" max="240" value="60"></div></div>
    <div class="field"><span>Ngày trong tuần</span><div class="model-pick">${["CN","T2","T3","T4","T5","T6","T7"].map((d,i)=>`<button class="chip" data-dow="${i}" aria-pressed="${[1,3,5].includes(i)}">${d}</button>`).join("")}</div></div></div>`,
    foot:`<div class="grow"></div><button class="pill-btn primary" id="pGo">${ic("spark")} Lập lịch</button>`});
  if(!UI.subjs.length){$("#pGo").disabled=true;toast("Tạo một môn học trước")}
  $$("[data-dow]").forEach(b=>b.onclick=()=>b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true"));
  $("#pGo").onclick=async()=>{
    const sj=subjOf($("#plS").value);if(!sj)return;const dows=$$("[data-dow]").filter(b=>b.getAttribute("aria-pressed")==="true").map(b=>+b.dataset.dow);
    const s=new Date($("#pS").value+"T00:00:00"),e=new Date($("#pE").value+"T00:00:00"),t=$("#pT").value||"20:00",mins=Math.max(20,+$("#pM").value||60);
    if(!dows.length||!(e>s)){toast("Chọn ngày trong tuần và hạn chót sau ngày bắt đầu");return}
    const dates=[];for(let d=new Date(s);d<e&&dates.length<30;d.setDate(d.getDate()+1))if(dows.includes(d.getDay()))dates.push(new Date(d));if(!dates.length){toast("Không có buổi nào trong khoảng đã chọn");return}
    $("#pGo").disabled=true;$("#pGo").innerHTML=`<span class="spin"></span> Đang lập lịch…`;
    const lessons=nbsOf(sj.id).map(n=>`- ${foldPath(n.parent)?foldPath(n.parent)+" › ":""}${n.title}${n.summary?": "+n.summary.replace(/\*\*|\[\d+\]/g,"").slice(0,300):""}${n.goals?" (mục tiêu: "+n.goals+")":""}`).join("\n");
    let focus=[];
    if(P.sample){try{const r=await P.sample.json(`${RULES}\n\nMÔN: ${sj.title}. ${sj.syllabus?"Đề cương: "+sj.syllabus.slice(0,2000):""} ${sj.focus?"Trọng tâm: "+sj.focus:""}\nCÁC BÀI HỌC TRONG SỔ:\n${lessons||"(chưa có bài)"}\n\nNHIỆM VỤ: Chia nội dung thành đúng ${dates.length} buổi ôn theo thứ tự hợp lý (buổi cuối ôn tổng hợp/làm đề). Mỗi buổi: "title" ≤ 8 từ, "focus" 1–2 câu việc cần làm.\nTrả về CHỈ JSON: {"sessions":[{"title":"…","focus":"…"}]}`,{modelTier:"default"});focus=r.sessions||[]}catch(err){toast("AI chưa chia được nội dung: "+aiErr(err))}}
    let busy=[];if(await gcStatus()==="ok"){try{busy=await gcList(Math.ceil((e-new Date())/864e5)+1)}catch(err){}}
    const p=n=>String(n).padStart(2,"0");
    const events=dates.map((d,i)=>{let [hh,mm]=t.split(":").map(Number);let tries=0,moved=false;while(tries<4){const st=new Date(d);st.setHours(hh,mm,0,0);const en=new Date(st.getTime()+mins*6e4);const clash=busy.some(b=>{const bs=new Date(b.start),be=new Date(b.end||b.start);return b.start.length>10&&bs<en&&be>st});if(!clash)break;hh+=1;tries++;moved=true}
      const f=focus[i]||{};return {date:ymd(d),start:`${p(hh)}:${p(mm)}`,minutes:mins,title:`${sj.code||sj.title}: ${f.title||"Buổi ôn "+(i+1)}`,focus:f.focus||"",moved,added:false}});
    await Store.put("cal-"+sj.id,{type:"cal",nb:sj.id,nbTitle:sj.title,events,created:Date.now()});closeDialog();openPlan(sj.id)};
}

/* =====================================================================
   v4 (tiếp) — THANH TRÊN · THANH TIỆN ÍCH · STICKER TỰ DO · CẮT GHÉP · LINH VẬT
   ===================================================================== */
Object.assign(IC,{
 vol:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
 mute:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9l5 6M21 9l-5 6"/>',
 cut:'<circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M8.5 8.5L20 18M8.5 15.5L20 6"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
 image:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 8"/>',
 folder:'<path d="M3 6h6l2 2h10v11H3z"/>',
 flip:'<path d="M12 3v18M8 7L4 12l4 5zM16 7l4 5-4 5z"/>',
 dup:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
 up:'<path d="M12 19V5M6 11l6-6 6 6"/>', down:'<path d="M12 5v14M6 13l6 6 6-6"/>'
});
UI.vol=local.get("vol",1);UI.mute=local.get("mute",false);

/* ---------- cập nhật các trang khi dữ liệu đổi ---------- */
let _rvPend=false;
function refreshViews(kind){
  const ae=document.activeElement;const typing=ae&&$("#main").contains(ae)&&/INPUT|TEXTAREA|SELECT/.test(ae.tagName);
  if(typing&&UI.view!=="nb"){if(!_rvPend){_rvPend=true;ae.addEventListener("blur",()=>{_rvPend=false;setTimeout(()=>refreshViews(kind),50)},{once:true})}
    if(UI.view==="subj"&&$("#xpTree")){$("#xpTree").innerHTML=treeHTML(UI.curSubj,null);bindTree($("#xpTree"),UI.curSubj)}return}
  if(UI.view==="home")renderHome();
  else if(UI.view==="subj")renderSubject();
  else if(UI.view==="cal"){if(kind==="cal"||kind==="subj")renderCalPage();else rerenderCals()}
  else if(UI.view==="nb"){renderCrumb();if(UI.srcTab==="tree"&&kind!=="task"&&kind!=="ev")renderSources()}
  if(UI.fly==="books")renderFly();
}

/* ---------- thanh trên ---------- */
function renderTop(){
  if(P&&D)try{renderRail()}catch(e){}
  const t=$("#top");const v=UI.view;const inNb=v==="nb"&&UI.cur;
  let mid="";
  if(inNb)mid=`<button class="ghost ic" id="tBack" aria-label="Quay lại">${ic("back")}</button><nav class="tcrumb hide-sm" id="tCrumb" aria-label="Vị trí"></nav><input class="nbtitle" id="tTitle" value="${esc(UI.cur.title)}" aria-label="Tên bài học"><div class="grow hide-sm"></div><button class="ghost hide-sm" id="tLay">${ic("split")}<span>Bố cục</span></button><button class="ghost hide-sm" id="tNew">${ic("plus")}<span>Bài học mới</span></button>`;
  else if(v==="subj"){const s=subjOf(UI.curSubj);mid=`<button class="ghost ic" id="tBack" aria-label="Về trang chủ">${ic("back")}</button><b class="ttl">${esc(s?s.title:"Chưa xếp môn")}</b><div class="grow"></div><button class="ghost" id="tCal">${ic("cal")}<span class="hide-sm">Lịch học</span></button>`}
  else if(v==="cal")mid=`<button class="ghost ic" id="tBack" aria-label="Về trang chủ">${ic("back")}</button><b class="ttl">Lịch học</b><div class="grow"></div>`;
  else mid=`<b class="ttl" style="font-family:var(--f-display)">Sổ Học Điện Tử</b><div class="grow"></div><button class="ghost" id="tCal">${ic("cal")}<span class="hide-sm">Lịch học</span></button><button class="ghost hide-sm" id="tNew">${ic("plus")}<span>Bài học mới</span></button>`;
  t.innerHTML=`<button class="ghost ic mob-only" id="tMenu" aria-label="Mở thanh tiện ích">${ic("widget")}</button>${mid}`;
  $("#tMenu").onclick=()=>$("#rail").classList.toggle("open");
  const bk=$("#tBack");if(bk)bk.onclick=()=>{if(inNb&&UI.cur.subj&&subjOf(UI.cur.subj))openSubject(UI.cur.subj);else goHome()};
  const tc=$("#tCal");if(tc)tc.onclick=goCal;
  const tn=$("#tNew");if(tn)tn.onclick=()=>newLessonDialog(inNb?UI.cur.subj:null,inNb?UI.cur.parent:null);
  if(inNb){$("#tTitle").onchange=e=>{const val=e.target.value.trim()||"Bài học chưa đặt tên";Store.patch(UI.cur.id,{title:val,updated:Date.now()})};$("#tLay").onclick=e=>layoutMenu(e.currentTarget);renderCrumb()}
}
function renderCrumb(){
  const c=$("#tCrumb");if(!c||!UI.cur)return;const s=subjOf(UI.cur.subj);
  if(!s){c.innerHTML=`<button data-cr="none">Chưa xếp môn</button><span>›</span>`;}
  else{const fp=UI.cur.parent?foldPath(UI.cur.parent):"";c.innerHTML=`<button data-cr="${esc(s.id)}"><i class="dot" style="background:${s.color}"></i>${esc(s.code||s.title)}</button><span>›</span>${fp?`<span class="fp">${esc(fp)}</span><span>›</span>`:""}`}
  $$("[data-cr]",c).forEach(b=>b.onclick=()=>openSubject(b.dataset.cr));
}
function newNotebook(){newLessonDialog()}

/* ---------- cột Nguồn: tab Nguồn | Bài học ---------- */
function renderSources(){
  const tb=$("#srcTabs");if(tb){tb.innerHTML=`<button role="tab" data-st="src" aria-selected="${UI.srcTab==="src"}">${ic("file")} Nguồn (${UI.srcs.length})</button><button role="tab" data-st="tree" aria-selected="${UI.srcTab==="tree"}">${ic("folder")} Bài học</button>`;
    $$("[data-st]",tb).forEach(b=>b.onclick=e=>{e.stopPropagation();UI.srcTab=b.dataset.st;renderSources()})}
  if(UI.srcTab!=="tree")return renderSourcesList();
  const b=$("#srcBody");if(!b||!UI.cur)return;const nb=UI.cur,s=subjOf(nb.subj);
  const keepFocus=document.activeElement&&document.activeElement.id==="lsGoal";if(keepFocus)return;
  b.innerHTML=`<div class="lesson-side">
    <div class="field"><label for="lsGoal">Mục tiêu bài học — AI bám theo khi giảng</label><textarea class="input" id="lsGoal" placeholder="Ví dụ: Hiểu vì sao D flip-flop chỉ đổi trạng thái ở sườn lên; tự vẽ được giản đồ thời gian">${esc(nb.goals||"")}</textarea></div>
    ${s?`<div class="subj-chip"><i class="dot" style="background:${s.color}"></i><b>${esc(s.title)}</b><button class="btn" id="lsOpenS">${ic("ext")} Đề cương</button></div>`:`<div class="field"><label for="lsAssign">Xếp bài này vào môn</label><select id="lsAssign"><option value="">— Chọn môn —</option>${UI.subjs.map(x=>`<option value="${esc(x.id)}">${esc(x.title)}</option>`).join("")}</select></div>`}
    ${s?`<div class="xp mini"><div class="xp-h"><b>${esc(s.code||"môn")}.dir</b><i></i><i></i><i style="background:var(--accent)"></i></div><div class="xp-tools"><button id="lsF">${pxFolder(false)} Thư mục</button><button id="lsL">${pxFile(s.color)} Bài học</button></div><div class="xp-b"><div class="node" data-root-drop>${ic("book")}<span class="nm">${esc(s.title)}</span></div><div id="lsTree">${treeHTML(s.id,null,nb.id)}</div></div></div>`:""}</div>`;
  const g=$("#lsGoal");let gt;g.oninput=()=>{clearTimeout(gt);gt=setTimeout(()=>Store.patch(nb.id,{goals:g.value.trim()}),700)};g.onblur=()=>{clearTimeout(gt);Store.patch(nb.id,{goals:g.value.trim()})};
  const as=$("#lsAssign");if(as)as.onchange=()=>{if(as.value)Store.patch(nb.id,{subj:as.value,parent:null})};
  if(s){$("#lsOpenS").onclick=()=>{UI.subjTab="plan";openSubject(s.id)};bindTree(b,s.id);$("#lsF").onclick=()=>folderDialog(s.id,nb.parent||null);$("#lsL").onclick=()=>newLessonDialog(s.id,nb.parent||null)}
  const on=UI.srcs.filter(x=>x.on!==false).length;const n=$("#srcN");if(n)n.textContent=on+" nguồn";
}

/* ---------- thanh tiện ích bên trái ---------- */
function renderRail(){
  const r=$("#rail");if(!r)return;const av=P.me&&P.me.avatarUrl?`<img class="avatar" src="${esc(P.me.avatarUrl)}" alt="">`:`<span class="avatar">${esc(((P.me&&P.me.name)||"B")[0].toUpperCase())}</span>`;
  const items=[["home","Trang chủ","home"],["books","Môn học & bài học","book"],["cal","Lịch học (ngày · tuần · tháng)","cal"],["lab","Phòng thí nghiệm 3D","flask"],"sep",["prof","Cá nhân hóa việc học","user"],["skin","Giao diện & màu","palette"],["stk","Sticker","star"],["cut","Cắt ghép sticker","cut"],["wdg","Widget trang trí","widget"],["lay","Bố cục & toàn màn hình","split"]];
  r.innerHTML=`<button class="brand" data-r="home" aria-label="Sổ Học Điện Tử">${glyph("home",40)}</button>${items.map(x=>x==="sep"?`<div class="sep"></div>`:`<button data-r="${x[0]}" aria-label="${x[1]}" data-tip="${x[1]}" aria-pressed="${UI.fly===x[0]||(!UI.fly&&((x[0]==="cal"&&UI.view==="cal")||(x[0]==="home"&&UI.view==="home")||(x[0]==="books"&&(UI.view==="subj"||UI.view==="nb"))))}">${ic(x[2])}</button>`).join("")}<div class="grow"></div><button data-r="acct" aria-label="Tài khoản" data-tip="Tài khoản" style="padding:0">${av}</button>`;
  $$("[data-r]",r).forEach(b=>{b.onclick=e=>railAct(b.dataset.r,b);b.onmouseenter=()=>showTip(b);b.onmouseleave=hideTip;b.onfocus=()=>showTip(b);b.onblur=hideTip});
}
function railAct(k,btn){
  hideTip();if(innerWidth<=720&&!["skin","stk","wdg","books"].includes(k))$("#rail").classList.remove("open");
  if(k==="home"){closeFly();return goHome()}
  if(k==="cal"){closeFly();return goCal()}
  if(k==="lab"){closeFly();return openLabCatalog()}
  if(k==="prof"){closeFly();return profileDialog()}
  if(k==="cut"){closeFly();return openStickerStudio()}
  if(k==="lay"){closeFly();if(UI.view==="nb")return layoutMenu(btn);const m=popMenu(btn,`<button data-x="fs">${ic("full")}Toàn màn hình trình duyệt</button>${[["dock","Ghim trong cột Studio","panel"],["split","Cột riêng cạnh trò chuyện","split"],["modal","Cửa sổ nổi","win"],["full","Toàn màn hình","full"]].map(([v,l,i])=>`<button data-vm="${v}">${ic(i)}Mở nội dung Studio: ${l}${UI.vmode===v?" ✓":""}</button>`).join("")}`);$("[data-x=fs]",m).onclick=()=>{try{(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).catch(()=>toast("Toàn màn hình không khả dụng ở đây"))}catch(e){}};$$("[data-vm]",m).forEach(b=>b.onclick=()=>{UI.vmode=b.dataset.vm;local.set("vmode",UI.vmode)});return}
  if(k==="acct"){closeFly();return accountMenu(btn)}
  if(UI.fly===k)return closeFly();
  UI.fly=k;renderRail();renderFly();
}
function renderFly(){
  $$(".flyout").forEach(f=>f.remove());if(!UI.fly)return;const f=document.createElement("div");f.className="flyout";document.body.appendChild(f);
  const head=t=>`<h3>${t}<button class="ghost ic x" data-fx aria-label="Đóng">${ic("close")}</button></h3>`;
  if(UI.fly==="books"){const subs=[...UI.subjs].sort((a,b)=>(a.order||0)-(b.order||0));
    f.innerHTML=head("Môn học & bài học")+`<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="pill-btn primary" id="fNewL">${ic("plus")} Bài học</button><button class="pill-btn" id="fNewS">${ic("book")} Môn học</button></div>
     <div class="xp-b fly-tree">${subs.map(s=>`<div class="fly-subj"><button class="node" data-os="${esc(s.id)}"><i class="dot" style="background:${s.color}"></i><span class="nm"><b>${esc(s.title)}</b></span><small class="muted">${nbsOf(s.id).length}</small></button><div data-ft="${esc(s.id)}">${treeHTML(s.id,null,UI.cur&&UI.cur.id)}</div></div>`).join("")}
     ${nbsOf("none").length?`<div class="fly-subj"><button class="node" data-os="none"><i class="dot" style="background:#8b93a8"></i><span class="nm"><b>Chưa xếp môn</b></span></button><div data-ft="none">${treeHTML("none",null,UI.cur&&UI.cur.id)}</div></div>`:""}</div>`;
    $("#fNewL",f).onclick=()=>{closeFly();newLessonDialog()};$("#fNewS",f).onclick=()=>{closeFly();subjectDialog()};
    $$("[data-os]",f).forEach(b=>b.onclick=()=>{closeFly();openSubject(b.dataset.os)});
    $$("[data-ft]",f).forEach(t=>bindTree(t,t.dataset.ft));$$("[data-file]",f).forEach(el=>{const o=el.onclick;el.onclick=e=>{if(e.target.closest(".mn"))return;closeFly();openNotebook(el.dataset.file)}})}
  if(UI.fly==="skin"){f.innerHTML=head("Giao diện & màu")+`<div class="skins">${SKINS.map(s=>`<button class="skin" data-sk="${s.k}" aria-pressed="${UI.skin===s.k}"><div class="sw">${s.sw.map(c=>`<i style="background:${c}"></i>`).join("")}</div><b>${s.l}</b></button>`).join("")}</div><p class="muted" style="font-size:12.5px;margin:0">Giao diện pixel có viền khung cửa sổ cổ điển, nền lấp lánh và con trỏ pixel.</p><button class="pill-btn" id="fProf">${ic("user")} Màu nhấn riêng, cỡ chữ, cách AI giảng</button>`;
    $$("[data-sk]",f).forEach(b=>b.onclick=()=>{applySkin(b.dataset.sk);applyPrefs(UI.profile);renderFly();if(UI.view==="home")renderHome()});$("#fProf",f).onclick=()=>{closeFly();profileDialog()}}
  if(UI.fly==="stk"){setDecorating(true);
    f.innerHTML=head("Sticker")+`<p class="muted" style="font-size:13px;margin:0"><b>Kéo</b> sticker ra bất cứ đâu trên màn hình để dán (hoặc bấm để thêm). Chọn sticker đã dán: kéo để di chuyển, kéo nút ⤡ để phóng to/xoay, phím Delete để xóa.</p>
     <div class="stk-tray">${STK_KEYS.map(k=>`<button data-sa="${k}" aria-label="Sticker ${k}"><img src="${stkURL(k).url}" alt="" draggable="false"></button>`).join("")}</div>
     <h4 style="margin:4px 0 0;font-size:14px">Sticker của bạn</h4>
     <div class="stk-tray" id="myTray">${D.custom.map(c=>`<button data-sa="c:${esc(c.id)}" class="custom" aria-label="${esc(c.name||"Sticker riêng")}"><img src="${esc(c.url)}" alt="" draggable="false" style="image-rendering:auto"><span class="del" data-cdel="${esc(c.id)}" role="button" aria-label="Xóa sticker này khỏi bộ sưu tập">×</span></button>`).join("")}<label class="addc" title="Thêm ảnh từ máy">${ic("plus")}<input type="file" accept="image/*" multiple hidden id="stkFile"></label></div>
     <p class="muted" style="font-size:12px;margin:0">Thêm sticker từ bên ngoài: chọn ảnh, <b>dán</b> (Ctrl+V) ảnh đã sao chép, hoặc <b>thả</b> ảnh vào màn hình.</p>
     <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="pill-btn" id="stkCut">${ic("cut")} Cắt ghép</button><button class="pill-btn" id="stkRand">${ic("spark")} Rắc ngẫu nhiên</button><button class="pill-btn" id="stkClr" style="color:var(--bad)">${ic("trash")} Gỡ tất cả</button></div>`;
    $$("[data-sa]",f).forEach(b=>trayDrag(b,b.dataset.sa));
    $$("[data-cdel]",f).forEach(x=>x.addEventListener("pointerdown",e=>{e.stopPropagation();e.preventDefault();const id=x.dataset.cdel;confirmDialog("Xóa sticker riêng này?","Các bản đã dán trên màn hình cũng bị gỡ.","Xóa",async()=>{const c=D.custom.find(z=>z.id===id);D.custom=D.custom.filter(z=>z.id!==id);D.stickers=D.stickers.filter(s=>s.k!=="c:"+id);if(c&&c.asset&&P.assets)P.assets.delete(c.asset).catch(()=>{});renderStickers();saveDecor();renderFly()})}));
    $("#stkFile",f).onchange=e=>{importStickerFiles([...e.target.files])};
    $("#stkCut",f).onclick=()=>{closeFly();openStickerStudio()};
    $("#stkRand",f).onclick=()=>{for(let i=0;i<6;i++)addSticker(STK_KEYS[Math.floor(Math.random()*STK_KEYS.length)],{x:5+Math.random()*90,y:5+Math.random()*90,s:2+Math.random()*2.5,r:Math.round((Math.random()-.5)*30)})};
    $("#stkClr",f).onclick=()=>{D.stickers=[];UI.selStk=null;renderStickers();saveDecor()}}
  if(UI.fly==="wdg"){const mode=k=>hasBlock("w:"+k)?"dash":(D.widgets[k]&&D.widgets[k].on?"float":"off");
    f.innerHTML=head("Widget trang trí")+`<p class="muted" style="font-size:12.5px;margin:0">Chọn nơi hiện mỗi widget: <b>Trang chủ</b> (một khối trên trang, đổi vị trí bằng “Tùy chỉnh”) hoặc <b>Nổi</b> (cửa sổ nhỏ kéo đi đâu cũng được, kể cả trong bài học).</p><div class="wd-list">${Object.entries(WIDGETS).map(([k,w])=>`<div class="wd-row"><span style="flex:1;min-width:0"><b style="font-weight:600">${w.title}</b><br><small class="muted">${w.desc}</small></span><div class="seg" role="radiogroup" aria-label="${esc(w.title)}">${[["off","Tắt"],["dash","Trang chủ"],["float","Nổi"]].map(([m,l])=>`<button role="radio" data-wm="${k}:${m}" aria-checked="${mode(k)===m}">${l}</button>`).join("")}</div></div>`).join("")}</div>
     <label class="chk-row"><input type="checkbox" class="chk" id="wFloat" ${D.float?"checked":""}> Widget nổi bồng bềnh (chuyển động nhẹ)</label><button class="pill-btn" id="wReset">${ic("widget")} Đưa widget nổi về góc màn hình</button>`;
    $("#wFloat",f).onchange=e=>{D.float=e.target.checked;renderWidgets();saveDecor()};$("#wReset",f).onclick=resetWidgetPos;
    $$("[data-wm]",f).forEach(x=>x.onclick=()=>{const [k,m]=x.dataset.wm.split(":");setWidgetMode(k,m);if(m==="dash"&&UI.view!=="home")toast("Đã thêm vào trang chủ")})}
  const fx=$("[data-fx]",f);if(fx)fx.onclick=closeFly;
}

/* =====================================================================
   STICKER: kéo thả tự do, phóng to/xoay/lật/nhân bản/xóa, sticker riêng
   ===================================================================== */
function stkBase(k){if(String(k).startsWith("c:")){const c=D.custom.find(z=>z.id===k.slice(2));return c?{url:c.url,w:c.w,h:c.h,custom:true}:null}return STK[k]?stkURL(k):null}
function addSticker(k,o={}){const st={id:mkid("s"),k,x:o.x??(40+Math.random()*20),y:o.y??(35+Math.random()*20),s:o.s??3,r:o.r??0,f:!!o.f};D.stickers.push(st);if(D.stickers.length>600)D.stickers.shift();UI.selStk=UI.decorating?st.id:null;renderStickers();saveDecor();return st}
function stkPlace(el,st,m){const w=m.w*st.s,h=m.h*st.s;el.style.width=w+"px";el.style.height=h+"px";el.style.left=`calc(${st.x}% - ${w/2}px)`;el.style.top=`calc(${st.y}% - ${h/2}px)`;el.style.rotate=(st.r||0)+"deg";const im=el.firstChild;if(im)im.style.transform=st.f?"scaleX(-1)":""}
function renderStickers(){
  const L=$("#decor");if(!L)return;L.innerHTML="";
  D.stickers.forEach(st=>{const m=stkBase(st.k);if(!m)return;const el=document.createElement("div");el.className="stk"+(m.custom?" custom":"")+(/spark|plus|ring/.test(st.k)?" tw":"")+(typeof stkView==="function"&&(st.v||"home")!==stkView()?" voff":"");el.dataset.id=st.id;
    el.innerHTML=`<img src="${esc(m.url)}" alt="" draggable="false">`;stkPlace(el,st,m);el.style.animationDelay=(-(st.x*7)%4)+"s";if(UI.selStk===st.id)el.classList.add("sel");
    el.addEventListener("pointerdown",e=>{if(!UI.decorating)return;e.preventDefault();e.stopPropagation();selectStk(st.id);el.setPointerCapture(e.pointerId);const ox=e.clientX/innerWidth*100-st.x,oy=e.clientY/innerHeight*100-st.y;
      const mv=ev=>{st.x=Math.max(-2,Math.min(102,ev.clientX/innerWidth*100-ox));st.y=Math.max(-2,Math.min(102,ev.clientY/innerHeight*100-oy));stkPlace(el,st,m);placeStkCtl()};
      const up=()=>{el.removeEventListener("pointermove",mv);el.removeEventListener("pointerup",up);saveDecor()};el.addEventListener("pointermove",mv);el.addEventListener("pointerup",up)});
    el.addEventListener("wheel",e=>{if(!UI.decorating)return;e.preventDefault();if(e.shiftKey)st.r=((st.r||0)+(e.deltaY<0?-5:5)+360)%360;else st.s=Math.max(.6,Math.min(14,st.s*(e.deltaY<0?1.08:.93)));stkPlace(el,st,m);placeStkCtl();saveDecor()},{passive:false});
    L.appendChild(el)});
  placeStkCtl();
}
function selectStk(id){UI.selStk=id;$$(".stk.sel").forEach(x=>x.classList.remove("sel"));const el=$(`.stk[data-id="${id}"]`);if(el)el.classList.add("sel");placeStkCtl()}
function placeStkCtl(){
  $$(".stk-ctl,.stk-box").forEach(x=>x.remove());if(!UI.decorating||!UI.selStk)return;const st=D.stickers.find(s=>s.id===UI.selStk);const el=$(`.stk[data-id="${UI.selStk}"]`);if(!st||!el)return;const m=stkBase(st.k);
  const w=m.w*st.s,h=m.h*st.s,cx=st.x/100*innerWidth,cy=st.y/100*innerHeight-(typeof stkOffPx==="function"?stkOffPx():0);
  const b=document.createElement("div");b.className="stk-box";b.style.cssText=`left:${cx-w/2-6}px;top:${cy-h/2-6}px;width:${w+12}px;height:${h+12}px;rotate:${st.r||0}deg`;
  b.innerHTML=`<button class="h-x" data-a="x" aria-label="Xóa sticker" title="Xóa">✕</button><button class="h-f" data-a="f" aria-label="Lật ngang" title="Lật">⇋</button><button class="h-d" data-a="d" aria-label="Nhân bản" title="Nhân bản">⧉</button><button class="h-z" data-a="z" aria-label="Đưa lên trên cùng" title="Lên trên cùng">▲</button><button class="h-rs" aria-label="Kéo để phóng to, thu nhỏ và xoay" title="Kéo: phóng to/thu nhỏ + xoay">⤡</button>`;
  document.body.appendChild(b);
  $$("[data-a]",b).forEach(x=>x.onclick=e=>{e.stopPropagation();const a=x.dataset.a;
    if(a==="x"){D.stickers=D.stickers.filter(s=>s!==st);UI.selStk=null}
    if(a==="f")st.f=!st.f;
    if(a==="d"){const n={...st,id:mkid("s"),x:Math.min(98,st.x+3),y:Math.min(98,st.y+3)};D.stickers.push(n);UI.selStk=n.id}
    if(a==="z"){D.stickers=D.stickers.filter(s=>s!==st);D.stickers.push(st)}
    renderStickers();saveDecor()});
  const rs=$(".h-rs",b);rs.addEventListener("pointerdown",e=>{e.preventDefault();e.stopPropagation();rs.setPointerCapture(e.pointerId);
    const d0=Math.hypot(e.clientX-cx,e.clientY-cy),a0=Math.atan2(e.clientY-cy,e.clientX-cx),s0=st.s,r0=st.r||0;
    const mv=ev=>{const d=Math.hypot(ev.clientX-cx,ev.clientY-cy),a=Math.atan2(ev.clientY-cy,ev.clientX-cx);st.s=Math.max(.6,Math.min(14,s0*d/Math.max(8,d0)));let r=r0+(a-a0)*180/Math.PI;if(ev.shiftKey)r=Math.round(r/15)*15;st.r=Math.round(((r%360)+360)%360);stkPlace(el,st,m);
      const w2=m.w*st.s,h2=m.h*st.s;b.style.left=(cx-w2/2-6)+"px";b.style.top=(cy-h2/2-6)+"px";b.style.width=(w2+12)+"px";b.style.height=(h2+12)+"px";b.style.rotate=st.r+"deg"};
    const up=()=>{rs.removeEventListener("pointermove",mv);rs.removeEventListener("pointerup",up);saveDecor()};rs.addEventListener("pointermove",mv);rs.addEventListener("pointerup",up)});
}
function setDecorating(on){UI.decorating=on;document.body.classList.toggle("decorating",on);$$(".decor-bar").forEach(x=>x.remove());
  if(on){const b=document.createElement("div");b.className="decor-bar";b.innerHTML=`${ic("star")} Đang trang trí — kéo sticker ra màn hình · cuộn: đổi cỡ · Shift+cuộn: xoay<button id="decDone">Xong</button>`;document.body.appendChild(b);$("#decDone").onclick=()=>closeFly()}else{UI.selStk=null}renderStickers()}
/* kéo từ khay ra màn hình */
function trayDrag(btn,k){
  btn.addEventListener("pointerdown",e=>{if(e.button!==0)return;e.preventDefault();const m=stkBase(k);if(!m)return;let moved=false,g=null;const x0=e.clientX,y0=e.clientY;btn.setPointerCapture(e.pointerId);
    const mv=ev=>{if(!moved&&Math.hypot(ev.clientX-x0,ev.clientY-y0)>6){moved=true;g=document.createElement("img");g.className="drag-ghost";g.src=m.url;g.style.width=(m.w*3)+"px";if(m.custom)g.style.imageRendering="auto";document.body.appendChild(g)}
      if(g){g.style.left=ev.clientX+"px";g.style.top=ev.clientY+"px"}};
    const up=ev=>{btn.removeEventListener("pointermove",mv);btn.removeEventListener("pointerup",up);btn.removeEventListener("pointercancel",up);if(g)g.remove();
      if(moved&&ev.type==="pointerup")addSticker(k,{x:ev.clientX/innerWidth*100,y:ev.clientY/innerHeight*100});else if(!moved)addSticker(k)};
    btn.addEventListener("pointermove",mv);btn.addEventListener("pointerup",up);btn.addEventListener("pointercancel",up)});
}
document.addEventListener("keydown",e=>{if(!UI.decorating||!UI.selStk||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;const st=D.stickers.find(s=>s.id===UI.selStk);if(!st)return;let ch=true;
  if(e.key==="Delete"||e.key==="Backspace"){D.stickers=D.stickers.filter(s=>s!==st);UI.selStk=null}
  else if(e.key==="ArrowLeft")st.x-=.5;else if(e.key==="ArrowRight")st.x+=.5;else if(e.key==="ArrowUp")st.y-=.5;else if(e.key==="ArrowDown")st.y+=.5;
  else if(e.key==="["||e.key==="q")st.r=((st.r||0)-15+360)%360;else if(e.key==="]"||e.key==="e")st.r=((st.r||0)+15)%360;
  else if(e.key==="+"||e.key==="=")st.s=Math.min(14,st.s*1.1);else if(e.key==="-")st.s=Math.max(.6,st.s/1.1);else ch=false;
  if(ch){e.preventDefault();renderStickers();saveDecor()}});
document.addEventListener("pointerdown",e=>{if(UI.decorating&&UI.selStk&&!e.target.closest(".stk,.stk-box,.flyout,.decor-bar"))selectStk(null)});

/* ---------- sticker từ bên ngoài: chọn ảnh, dán, thả ---------- */
function loadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src})}
function fileToURL(f){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f)})}
function trimCanvas(c){const g=c.getContext("2d");const d=g.getImageData(0,0,c.width,c.height).data;let x0=c.width,y0=c.height,x1=-1,y1=-1;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]>8){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
  if(x1<0)return c;const o=document.createElement("canvas");o.width=x1-x0+1;o.height=y1-y0+1;o.getContext("2d").drawImage(c,-x0,-y0);return o}
async function saveCustomSticker(canvas,name,place=true){
  let c=trimCanvas(canvas);const max=360;if(c.width>max||c.height>max){const k=max/Math.max(c.width,c.height);const o=document.createElement("canvas");o.width=Math.round(c.width*k);o.height=Math.round(c.height*k);const g=o.getContext("2d");g.imageSmoothingQuality="high";g.drawImage(c,0,0,o.width,o.height);c=o}
  const id=mkid("cs");let url=null,asset=null;
  if(P.assets&&!P.local){try{const blob=await new Promise(r=>c.toBlob(r,"image/png"));const up=await P.assets.upload(blob);url=up.url;asset=up.id}catch(e){url=null}}
  if(!url){let o=c;for(let tries=0;tries<4;tries++){url=o.toDataURL("image/webp",.85);if(!url.startsWith("data:image/webp"))url=o.toDataURL("image/png");if(P.local||url.length<70000)break;const k=.7;const n=document.createElement("canvas");n.width=Math.max(16,Math.round(o.width*k));n.height=Math.max(16,Math.round(o.height*k));n.getContext("2d").drawImage(o,0,0,n.width,n.height);o=n}
    const total=JSON.stringify(D.custom).length+url.length;if(!P.local&&total>190000){toast("Bộ sưu tập sticker đã đầy — xóa bớt sticker riêng để thêm mới",4500);return null}}
  const base=c.width>c.height?{w:Math.round(c.width/3*Math.min(1,180/c.width)),h:0}:{h:Math.round(c.height/3*Math.min(1,180/c.height)),w:0};
  if(!base.w)base.w=Math.round(base.h*c.width/c.height);if(!base.h)base.h=Math.round(base.w*c.height/c.width);
  const item={id,url,asset,w:Math.max(8,base.w),h:Math.max(8,base.h),name:name||"Sticker riêng"};D.custom.push(item);if(D.custom.length>60){const old=D.custom.shift();D.stickers=D.stickers.filter(s=>s.k!=="c:"+old.id)}
  saveDecor();if(place)addSticker("c:"+id,{x:50,y:45,s:3});if(UI.fly==="stk")renderFly();return item;
}
async function importStickerFiles(files,at){
  const imgs=files.filter(f=>/^image\//.test(f.type));if(!imgs.length){toast("Chỉ nhận tệp ảnh (PNG, JPG, GIF, WebP)");return}
  for(const f of imgs.slice(0,8)){try{const i=await loadImg(await fileToURL(f));const c=document.createElement("canvas");c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext("2d").drawImage(i,0,0);const it=await saveCustomSticker(c,f.name.replace(/\.[^.]+$/,""),false);if(it)addSticker("c:"+it.id,at||{});}catch(e){toast("Không đọc được ảnh "+f.name)}}
  if(!UI.decorating){UI.fly="stk";renderRail();renderFly()}toast("Đã thêm sticker — kéo để đặt vị trí");
}
document.addEventListener("paste",e=>{if(!(UI.decorating||UI.studioOpen))return;const items=[...(e.clipboardData&&e.clipboardData.items||[])].filter(i=>i.type.startsWith("image/"));if(!items.length)return;e.preventDefault();const files=items.map(i=>i.getAsFile()).filter(Boolean);if(UI.studioOpen&&UI.studioAdd)UI.studioAdd(files);else importStickerFiles(files)});
addEventListener("dragover",e=>{if(e.dataTransfer&&[...e.dataTransfer.types].includes("Files")&&(UI.decorating||UI.studioOpen)){e.preventDefault();document.body.classList.add("drop-stk")}});
addEventListener("dragleave",e=>{if(!e.relatedTarget)document.body.classList.remove("drop-stk")});
addEventListener("drop",e=>{document.body.classList.remove("drop-stk");if(!(UI.decorating||UI.studioOpen)||!e.dataTransfer||!e.dataTransfer.files.length)return;if(e.target.closest&&e.target.closest("#dz"))return;e.preventDefault();const files=[...e.dataTransfer.files];if(UI.studioOpen&&UI.studioAdd)UI.studioAdd(files);else importStickerFiles(files,{x:e.clientX/innerWidth*100,y:e.clientY/innerHeight*100})});

/* =====================================================================
   CẮT GHÉP STICKER — nhiều lớp ảnh, cắt theo hình, xóa nền, viền trắng, pixel hóa
   ===================================================================== */
const MASKS={none:"Không cắt",circle:"Tròn",rrect:"Bo góc",heart:"Trái tim",star:"Ngôi sao",cloud:"Đám mây",lasso:"Cắt tự do"};
function maskPath(g,kind,w,h,pts){g.beginPath();const rx=w/2,ry=h/2;
  if(kind==="circle")g.ellipse(0,0,rx,ry,0,0,Math.PI*2);
  else if(kind==="rrect"){const r=Math.min(w,h)*.18;g.roundRect?g.roundRect(-rx,-ry,w,h,r):g.rect(-rx,-ry,w,h)}
  else if(kind==="heart"){for(let i=0;i<=80;i++){const t=i/80*Math.PI*2;const x=16*Math.pow(Math.sin(t),3),y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));const px=x/17*rx,py=(y+2)/17*ry;i?g.lineTo(px,py):g.moveTo(px,py)}}
  else if(kind==="star"){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?.45:1;const px=Math.cos(a)*rx*r,py=Math.sin(a)*ry*r;i?g.lineTo(px,py):g.moveTo(px,py)}}
  else if(kind==="cloud"){[[-.45,.15,.42],[.05,-.2,.55],[.5,.12,.42],[0,.3,.45]].forEach(([a,b,r])=>{g.moveTo(a*rx+r*rx,b*ry);g.ellipse(a*rx,b*ry,r*rx,r*ry*.9,0,0,Math.PI*2)})}
  else if(kind==="lasso"&&pts&&pts.length>2){pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]))}
  else g.rect(-rx,-ry,w,h);g.closePath()}
function openStickerStudio(){
  const S=680;const layers=[];let sel=-1,tool="move",lasso=null,tol=36,outline=6,ocol="#ffffff",pix=1,shadow=true;
  UI.reopen=null;UI.studioOpen=true;const _vm=UI.vmode;UI.vmode=innerWidth>720?"modal":"full";
  openModal({title:"Cắt ghép sticker",body:`<div class="studio-ed">
   <div class="ed-stage" id="edSt"><canvas id="edC" width="${S}" height="${S}" aria-label="Khung cắt ghép"></canvas><div class="ed-hint" id="edHint">Thêm ảnh (chọn tệp, dán Ctrl+V, thả vào đây) hoặc sticker có sẵn để bắt đầu ghép.</div></div>
   <div class="ed-side">
    <div class="panel-box"><h4>${ic("plus")} Thêm lớp</h4><div style="display:flex;gap:6px;flex-wrap:wrap"><label class="btn">${ic("image")} Ảnh / GIF từ máy<input type="file" id="edFile" accept="image/*,.gif" multiple hidden></label><button class="btn" id="edPx">${ic("star")} Sticker có sẵn</button><button class="btn" id="edTxt">Aa Chữ</button></div><div class="stk-tray" id="edTray" hidden>${STK_KEYS.map(k=>`<button data-ek="${k}"><img src="${stkURL(k).url}" alt="${k}"></button>`).join("")}${D.custom.map(c=>`<button data-ec="${esc(c.id)}"><img src="${esc(c.url)}" alt="" style="image-rendering:auto"></button>`).join("")}</div></div>
    <div class="panel-box"><h4>${ic("cut")} Công cụ cho lớp đang chọn</h4>
      <div class="model-pick" id="edTools">${[["move","Di chuyển"],["wand","Xóa nền (bấm vào nền)"],["lasso","Cắt tự do (vẽ vòng)"]].map(([k,l])=>`<button class="chip" data-tool="${k}" aria-pressed="${k==="move"}">${l}</button>`).join("")}</div>
      <div class="field"><label for="edMask">Cắt theo hình</label><select id="edMask">${Object.entries(MASKS).map(([k,l])=>`<option value="${k}">${l}</option>`).join("")}</select></div>
      <div class="row3"><div class="field"><label for="edTol">Độ nhạy xóa nền</label><input type="range" id="edTol" min="5" max="120" value="${tol}"></div><div class="field"><span>&nbsp;</span><button class="btn" id="edAuto">Tự xóa nền viền ảnh</button></div></div>
      <div class="row3"><div class="field"><label for="edRot">Xoay</label><input type="range" id="edRot" min="-180" max="180" value="0"></div><div class="field"><label for="edSc">Cỡ</label><input type="range" id="edSc" min="0.1" max="3" step="0.01" value="1"></div></div>
      <div id="edLayers" class="ed-layers"></div></div>
    <div class="panel-box"><h4>${ic("spark")} Hiệu ứng sticker</h4>
      <div class="row3"><div class="field"><label for="edOl">Viền</label><input type="range" id="edOl" min="0" max="16" value="${outline}"></div><div class="field"><label for="edOc">Màu viền</label><input type="color" id="edOc" value="${ocol}" style="width:100%;height:36px;padding:2px"></div></div>
      <div class="row3"><div class="field"><label for="edPix">Pixel hóa</label><input type="range" id="edPix" min="1" max="10" value="1"></div><label class="chk-row"><input type="checkbox" class="chk" id="edSh" checked> Bóng đổ nhẹ</label></div>
      <div class="field"><label for="edMv">Chuyển động khi dán</label><select id="edMv">${Object.entries(typeof STK_MV!=="undefined"?STK_MV:{bob:"Nhún nhẹ"}).map(([k,l])=>`<option value="${k}" ${k==="bob"?"selected":""}>${l}</option>`).join("")}</select></div>
      <div class="prev"><span class="prev-stk" id="edPrevW" data-mv="bob"><canvas id="edPrev"></canvas></span></div><p class="muted" style="font-size:12px;margin:0">Thêm ảnh <b>GIF</b> để làm sticker động — xóa nền, cắt, viền áp dụng cho mọi khung hình.</p></div>
   </div></div>`,foot:`<button class="pill-btn" id="edClear" style="color:var(--bad)">${ic("trash")} Làm lại</button><div class="grow"></div><button class="pill-btn" id="edDl">${ic("dl")} Tải PNG</button><button class="pill-btn primary" id="edSave">${ic("check")} Lưu & dán lên màn hình</button>`});
  UI.vmode=_vm;
  const cv=$("#edC"),g=cv.getContext("2d");
  const obs=new MutationObserver(()=>{if(!document.body.contains(cv)){UI.studioOpen=false;UI.studioAdd=null;obs.disconnect()}});obs.observe(document.body,{childList:true,subtree:true});
  const addLayer=(src,name,frames)=>{const c=document.createElement("canvas");c.width=src.width||src.naturalWidth;c.height=src.height||src.naturalHeight;const cg=c.getContext("2d");cg.imageSmoothingEnabled=!(src.dataset&&src.dataset.px);cg.drawImage(src,0,0,c.width,c.height);
    const k=Math.min(1,(S*.6)/Math.max(c.width,c.height));layers.push({c:frames?frames[0].c:c,frames:frames||null,name:(frames?"🎞 ":"")+name,x:S/2+(layers.length%3)*30-30,y:S/2+(layers.length%3)*24-24,s:k,r:0,mask:"none",pts:null,px:!!(src.dataset&&src.dataset.px)});sel=layers.length-1;sync();draw();if(frames){animTick();const dl=$("#edDl");if(dl)dl.innerHTML=`${ic("dl")} Tải GIF`}};
  UI.studioAdd=async files=>{for(const f of files.filter(f=>/^image\//.test(f.type)).slice(0,6)){try{const fr=/gif|webp|png/.test(f.type)?await gifFrames(f):null;if(f.type==="image/gif"&&!fr&&!("ImageDecoder" in window))toast("Trình duyệt này chưa tách được khung GIF — dùng Chrome/Edge để giữ chuyển động",4500);addLayer(await loadImg(await fileToURL(f)),f.name,fr)}catch(e){toast("Không đọc được ảnh")}}};
  $("#edFile").onchange=e=>UI.studioAdd([...e.target.files]);
  $("#edPx").onclick=()=>{$("#edTray").hidden=!$("#edTray").hidden};
  $$("[data-ek]").forEach(b=>b.onclick=async()=>{const i=await loadImg(stkURL(b.dataset.ek,8).url);i.dataset.px="1";addLayer(i,b.dataset.ek)});
  $$("[data-ec]").forEach(b=>b.onclick=async()=>{const c=D.custom.find(z=>z.id===b.dataset.ec);if(!c)return;try{const i=new Image();i.crossOrigin="anonymous";i.src=c.url;await i.decode();let fr=null;if(c.anim){try{fr=await gifFrames(await (await fetch(c.url)).blob())}catch(_){}}addLayer(i,c.name,fr)}catch(e){toast("Không mở được sticker này để ghép")}});
  $("#edTxt").onclick=()=>{openModal({title:"Thêm chữ",small:true,body:`<div class="form"><input class="input" id="tT" placeholder="Ví dụ: Cố lên!" maxlength="40"><div class="row3"><div class="field"><label for="tC">Màu chữ</label><input type="color" id="tC" value="#f08bb8" style="width:100%;height:36px"></div><div class="field"><label for="tF">Kiểu</label><select id="tF"><option value="Baloo 2">Tròn</option><option value="Patrick Hand">Viết tay</option><option value="Silkscreen">Pixel (không dấu)</option></select></div></div></div>`,foot:`<div class="grow"></div><button class="pill-btn primary" id="tOk">Thêm</button>`});
    $("#tT").focus();$("#tOk").onclick=()=>{const t=$("#tT").value.trim();if(!t)return;const fam=$("#tF").value;const c=document.createElement("canvas");const x=c.getContext("2d");x.font=`700 96px "${fam}", system-ui`;const w=Math.ceil(x.measureText(t).width)+20;c.width=w;c.height=130;x.font=`700 96px "${fam}", system-ui`;x.fillStyle=$("#tC").value;x.textBaseline="middle";x.fillText(t,10,68);closeDialog();addLayer(c,"Chữ: "+t)}};
  const L=()=>layers[sel];
  const toLocal=(ly,px,py)=>{const dx=px-ly.x,dy=py-ly.y,a=-ly.r*Math.PI/180;return [(dx*Math.cos(a)-dy*Math.sin(a))/ly.s,(dx*Math.sin(a)+dy*Math.cos(a))/ly.s]};
  const ptr=e=>{const r=cv.getBoundingClientRect();return [(e.clientX-r.left)/r.width*S,(e.clientY-r.top)/r.height*S]};
  const paint=(ctx,ui)=>{layers.forEach((ly,i)=>{ctx.save();ctx.translate(ly.x,ly.y);ctx.rotate(ly.r*Math.PI/180);ctx.scale(ly.s,ly.s);const w=ly.c.width,h=ly.c.height;
      if(ly.mask!=="none"){maskPath(ctx,ly.mask,w,h,ly.pts);ctx.clip()}ctx.imageSmoothingEnabled=!ly.px;ctx.drawImage(ly.c,-w/2,-h/2);ctx.restore();
      if(ui&&i===sel){ctx.save();ctx.translate(ly.x,ly.y);ctx.rotate(ly.r*Math.PI/180);ctx.setLineDash([8,6]);ctx.lineWidth=2;ctx.strokeStyle="#e05a9a";ctx.strokeRect(-w*ly.s/2,-h*ly.s/2,w*ly.s,h*ly.s);
        if(ly.mask!=="none"){ctx.scale(ly.s,ly.s);ctx.setLineDash([4,4]);ctx.lineWidth=2/ly.s;ctx.strokeStyle="#4a7fd8";maskPath(ctx,ly.mask,w,h,ly.pts);ctx.stroke()}ctx.restore()}});
    if(ui&&lasso&&lasso.length>1){ctx.save();ctx.strokeStyle="#4a7fd8";ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.beginPath();lasso.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.restore()}};
  const finalCanvas=box=>{const off=document.createElement("canvas");off.width=S;off.height=S;paint(off.getContext("2d"),false);let c;if(box){c=document.createElement("canvas");c.width=box[2];c.height=box[3];c.getContext("2d").drawImage(off,-box[0],-box[1])}else c=trimCanvas(off);
    if(pix>1){const s=document.createElement("canvas");s.width=Math.max(1,Math.round(c.width/pix));s.height=Math.max(1,Math.round(c.height/pix));const sg=s.getContext("2d");sg.drawImage(c,0,0,s.width,s.height);const d=sg.getImageData(0,0,s.width,s.height);for(let i=3;i<d.data.length;i+=4)d.data[i]=d.data[i]>110?255:0;sg.putImageData(d,0,0);const b=document.createElement("canvas");b.width=s.width*pix;b.height=s.height*pix;const bg=b.getContext("2d");bg.imageSmoothingEnabled=false;bg.drawImage(s,0,0,b.width,b.height);c=b}
    const pad=outline+(shadow?6:0)+4;const o=document.createElement("canvas");o.width=c.width+pad*2;o.height=c.height+pad*2;const og=o.getContext("2d");
    if(outline>0){const sil=document.createElement("canvas");sil.width=c.width;sil.height=c.height;const sg=sil.getContext("2d");sg.drawImage(c,0,0);sg.globalCompositeOperation="source-in";sg.fillStyle=ocol;sg.fillRect(0,0,c.width,c.height);
      if(shadow){og.save();og.globalAlpha=.25;og.filter="blur(2px)";for(let a=0;a<16;a++){og.drawImage(sil,pad+Math.cos(a/16*Math.PI*2)*outline+2,pad+Math.sin(a/16*Math.PI*2)*outline+4)}og.restore();og.filter="none";og.globalAlpha=1;
        og.globalCompositeOperation="source-atop";og.fillStyle="rgba(60,40,80,1)";og.fillRect(0,0,o.width,o.height);og.globalCompositeOperation="source-over";og.globalAlpha=1}
      const steps=pix>1?8:24;for(let a=0;a<steps;a++){const t=a/steps*Math.PI*2;og.drawImage(sil,pad+Math.round(Math.cos(t)*outline),pad+Math.round(Math.sin(t)*outline))}}
    else if(shadow){og.save();og.shadowColor="rgba(40,20,60,.35)";og.shadowBlur=6;og.shadowOffsetY=3;og.drawImage(c,pad,pad);og.restore()}
    og.drawImage(c,pad,pad);return o};
  const preview=()=>{const p=$("#edPrev");if(!p)return;if(!layers.length){p.width=1;p.height=1;return}const f=finalCanvas();p.width=f.width;p.height=f.height;const pg=p.getContext("2d");pg.imageSmoothingEnabled=pix===1;pg.drawImage(f,0,0)};
  let _pt=0;const draw=()=>{g.clearRect(0,0,S,S);paint(g,true);$("#edHint").hidden=layers.length>0;clearTimeout(_pt);_pt=setTimeout(preview,120)};
  const sync=()=>{const ly=L();$("#edMask").value=ly?ly.mask:"none";$("#edRot").value=ly?ly.r:0;$("#edSc").value=ly?ly.s:1;
    $("#edLayers").innerHTML=layers.length?[...layers].map((ly,i)=>({ly,i})).reverse().map(({ly,i})=>`<div class="ed-ly ${i===sel?"on":""}" data-li="${i}"><span class="nm">${esc(ly.name||"Lớp "+(i+1))}</span><button class="ghost ic" data-lu="${i}" aria-label="Lên trên">${ic("up")}</button><button class="ghost ic" data-ld="${i}" aria-label="Xuống dưới">${ic("down")}</button><button class="ghost ic" data-lc="${i}" aria-label="Nhân bản lớp">${ic("dup")}</button><button class="ghost ic" data-lf="${i}" aria-label="Lật lớp">${ic("flip")}</button><button class="ghost ic" data-lx="${i}" aria-label="Xóa lớp">${ic("trash")}</button></div>`).join(""):`<span class="muted" style="font-size:13px">Chưa có lớp nào.</span>`;
    $$("[data-li]").forEach(r=>r.onclick=e=>{if(e.target.closest("button"))return;sel=+r.dataset.li;sync();draw()});
    $$("[data-lu]").forEach(b=>b.onclick=()=>{const i=+b.dataset.lu;if(i<layers.length-1){[layers[i],layers[i+1]]=[layers[i+1],layers[i]];sel=i+1;sync();draw()}});
    $$("[data-ld]").forEach(b=>b.onclick=()=>{const i=+b.dataset.ld;if(i>0){[layers[i],layers[i-1]]=[layers[i-1],layers[i]];sel=i-1;sync();draw()}});
    $$("[data-lc]").forEach(b=>b.onclick=()=>{const s=layers[+b.dataset.lc];const cp=src=>{const c=document.createElement("canvas");c.width=src.width;c.height=src.height;c.getContext("2d").drawImage(src,0,0);return c};const c=cp(s.c);layers.push({...s,c,frames:s.frames?s.frames.map(f=>({c:cp(f.c),d:f.d})):null,x:s.x+24,y:s.y+24,pts:s.pts&&s.pts.map(p=>[...p])});sel=layers.length-1;sync();draw()});
    $$("[data-lf]").forEach(b=>b.onclick=()=>{const s=layers[+b.dataset.lf];const fl=src=>{const c=document.createElement("canvas");c.width=src.width;c.height=src.height;const x=c.getContext("2d");x.translate(c.width,0);x.scale(-1,1);x.drawImage(src,0,0);return c};if(s.frames)s.frames.forEach(f=>{f.c=fl(f.c)});s.c=fl(s.c);if(s.pts)s.pts=s.pts.map(([a,b])=>[-a,b]);draw()});
    $$("[data-lx]").forEach(b=>b.onclick=()=>{layers.splice(+b.dataset.lx,1);sel=Math.min(sel,layers.length-1);sync();draw()})};
  const flood=(ly,lx,lyy)=>{const w=ly.c.width,h=ly.c.height;const x0=Math.floor(lx+w/2),y0=Math.floor(lyy+h/2);if(x0<0||y0<0||x0>=w||y0>=h)return false;const cg=ly.c.getContext("2d");const im=cg.getImageData(0,0,w,h),d=im.data;const i0=(y0*w+x0)*4;if(d[i0+3]===0)return false;const R=d[i0],G=d[i0+1],B=d[i0+2];const t2=tol*tol*3;
    const seen=new Uint8Array(w*h);const st=[x0+y0*w];seen[st[0]]=1;let n=0;while(st.length){const p=st.pop();const k=p*4;const dr=d[k]-R,dg=d[k+1]-G,db=d[k+2]-B;if(d[k+3]===0||dr*dr+dg*dg+db*db>t2)continue;d[k+3]=0;n++;const x=p%w,y=(p-x)/w;
      if(x>0&&!seen[p-1]){seen[p-1]=1;st.push(p-1)}if(x<w-1&&!seen[p+1]){seen[p+1]=1;st.push(p+1)}if(y>0&&!seen[p-w]){seen[p-w]=1;st.push(p-w)}if(y<h-1&&!seen[p+w]){seen[p+w]=1;st.push(p+w)}}
    for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const k=(y*w+x)*4;if(d[k+3]&&(d[k-1]===0||d[k+7]===0||d[k-w*4+3]===0||d[k+w*4+3]===0))d[k+3]=Math.min(d[k+3],170)}
    cg.putImageData(im,0,0);return n>0};
  const floodAll=(ly,a,b)=>{if(!ly.frames)return flood(ly,a,b);let ok=false;ly.frames.forEach(fr=>{if(flood({...ly,c:fr.c},a,b))ok=true});return ok};
  let at0=performance.now(),atT=0;function animTick(){if(atT)return;const step=()=>{atT=0;if(!document.body.contains(cv))return;if(!layers.some(l=>l.frames))return;const t=performance.now()-at0;layers.forEach(l=>{if(!l.frames)return;l.c=frameAt(l,t)});draw();if((step.k=(step.k||0)+1)%3===0)preview();atT=setTimeout(step,60)};atT=setTimeout(step,60)}
  const frameAt=(l,t)=>{const tot=l.frames.reduce((a,f)=>a+f.d,0)||1;let u=t%tot;for(const f of l.frames){if(u<f.d)return f.c;u-=f.d}return l.frames[0].c};
  let drag=null;
  cv.addEventListener("pointerdown",e=>{const [px,py]=ptr(e);cv.setPointerCapture(e.pointerId);
    if(tool==="move"){let hit=-1;for(let i=layers.length-1;i>=0;i--){const ly=layers[i];const [lx,lyy]=toLocal(ly,px,py);if(Math.abs(lx)<=ly.c.width/2&&Math.abs(lyy)<=ly.c.height/2){hit=i;break}}if(hit>=0){sel=hit;sync();drag={ox:px-layers[hit].x,oy:py-layers[hit].y}}draw()}
    else if(tool==="wand"&&L()){const [lx,lyy]=toLocal(L(),px,py);if(!floodAll(L(),lx,lyy))toast("Bấm vào vùng nền của lớp đang chọn");draw()}
    else if(tool==="lasso"&&L()){lasso=[[px,py]]}});
  cv.addEventListener("pointermove",e=>{const [px,py]=ptr(e);if(tool==="move"&&drag&&L()){L().x=px-drag.ox;L().y=py-drag.oy;draw()}else if(tool==="lasso"&&lasso){lasso.push([px,py]);draw()}});
  const end=()=>{drag=null;if(lasso&&L()){if(lasso.length>8){L().pts=lasso.map(([px,py])=>toLocal(L(),px,py));L().mask="lasso";sync()}lasso=null;draw()}};
  cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);
  cv.addEventListener("wheel",e=>{if(!L())return;e.preventDefault();if(e.shiftKey)L().r=Math.max(-180,Math.min(180,L().r+(e.deltaY<0?-4:4)));else L().s=Math.max(.05,Math.min(4,L().s*(e.deltaY<0?1.06:.94)));sync();draw()},{passive:false});
  $$("[data-tool]").forEach(b=>b.onclick=()=>{tool=b.dataset.tool;$$("[data-tool]").forEach(x=>x.setAttribute("aria-pressed",x===b));cv.style.cursor=tool==="move"?"grab":"crosshair"});
  $("#edMask").onchange=e=>{if(!L())return;L().mask=e.target.value;if(L().mask==="lasso"&&!L().pts){toast("Chọn công cụ “Cắt tự do” rồi vẽ một vòng quanh phần muốn giữ");tool="lasso";$$("[data-tool]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.tool==="lasso"))}draw()};
  $("#edTol").oninput=e=>tol=+e.target.value;
  $("#edAuto").onclick=()=>{const ly=L();if(!ly)return;const w=ly.c.width,h=ly.c.height;[[-w/2+1,-h/2+1],[w/2-2,-h/2+1],[-w/2+1,h/2-2],[w/2-2,h/2-2]].forEach(([a,b])=>floodAll(ly,a,b));draw()};
  $("#edRot").oninput=e=>{if(L()){L().r=+e.target.value;draw()}};$("#edSc").oninput=e=>{if(L()){L().s=+e.target.value;draw()}};
  $("#edOl").oninput=e=>{outline=+e.target.value;draw()};$("#edOc").oninput=e=>{ocol=e.target.value;draw()};$("#edPix").oninput=e=>{pix=+e.target.value;draw()};$("#edSh").onchange=e=>{shadow=e.target.checked;draw()};
  $("#edClear").onclick=()=>{layers.length=0;sel=-1;sync();draw()};
  const animated=()=>layers.some(l=>l.frames);
  const buildGif=async()=>{const tot=Math.min(6000,Math.max(...layers.filter(l=>l.frames).map(l=>l.frames.reduce((a,f)=>a+f.d,0))));const step=Math.max(40,Math.round(tot/80));const n=Math.max(2,Math.round(tot/step));
    const offs=[];for(let i=0;i<n;i++){const t=i*step;layers.forEach(l=>{if(l.frames)l.c=frameAt(l,t)});const off=document.createElement("canvas");off.width=S;off.height=S;paint(off.getContext("2d"),false);offs.push(off)}
    let x0=S,y0=S,x1=-1,y1=-1;offs.forEach(o=>{const d=o.getContext("2d").getImageData(0,0,S,S).data;for(let y=0;y<S;y+=2)for(let x=0;x<S;x+=2)if(d[(y*S+x)*4+3]>8){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}});if(x1<0)throw new Error("trống");
    const box=[Math.max(0,x0-2),Math.max(0,y0-2),Math.min(S,x1+3)-Math.max(0,x0-2),Math.min(S,y1+3)-Math.max(0,y0-2)];const frames=[];
    for(let i=0;i<n;i++){const t=i*step;layers.forEach(l=>{if(l.frames)l.c=frameAt(l,t)});let f=finalCanvas(box);const mx=320;if(f.width>mx||f.height>mx){const k=mx/Math.max(f.width,f.height);const o=document.createElement("canvas");o.width=Math.round(f.width*k);o.height=Math.round(f.height*k);o.getContext("2d").drawImage(f,0,0,o.width,o.height);f=o}frames.push({c:f,d:step});if(i%8===7)await new Promise(r=>setTimeout(r,0))}
    return encodeGif(frames)};
  const mvSel=$("#edMv");if(mvSel)mvSel.onchange=()=>{const w=$("#edPrevW");if(w)w.dataset.mv=mvSel.value};
  $("#edDl").onclick=async()=>{if(!layers.length)return toast("Chưa có gì để tải");if(animated()){toast("Đang tạo GIF động…");try{saveFile("sticker.gif",await buildGif(),"image/gif")}catch(e){toast("Không tạo được GIF")}return}const f=finalCanvas();const blob=await new Promise(r=>f.toBlob(r,"image/png"));saveFile("sticker.png",blob,"image/png")};
  $("#edSave").onclick=async()=>{if(!layers.length)return toast("Thêm ít nhất một lớp ảnh");$("#edSave").disabled=true;const mv=($("#edMv")||{}).value||"bob";try{let it;if(animated()){toast("Đang tạo sticker GIF động…");it=await saveGifSticker(await buildGif(),"Sticker động cắt ghép",{x:50,y:45},mv)}else{it=await saveCustomSticker(finalCanvas(),"Sticker cắt ghép",true);if(it){it.mv=mv;const st=D.stickers[D.stickers.length-1];if(st&&st.k==="c:"+it.id&&mv!=="bob"){st.mv=mv;renderStickers();saveDecor()}}}if(it){closeViewer();UI.fly="stk";renderRail();renderFly();toast("Đã lưu vào “Sticker của bạn” và dán lên màn hình")}}catch(e){toast("Không lưu được: "+(e.message||e))}$("#edSave")&&($("#edSave").disabled=false)};
  sync();draw();
}

/* =====================================================================
   LINH VẬT PIXEL "BIT" — widget chuyển động
   ===================================================================== */
const BIT_TIPS=["Bit đây! Học 25 phút rồi nghỉ 5 phút nhé.","Vẽ giản đồ thời gian ra giấy là hiểu flip-flop liền!","Nhớ kiểm tra đơn vị ở mỗi bước tính nha.","Uống nước chưa? Bit vừa uống 1 cốc điện tử.","Bí quá thì hỏi trợ lý ở cột Trò chuyện nhé!","Hôm nay ôn lại 5 thẻ ghi nhớ thôi cũng được.","Định luật Ohm: V = I·R — dễ như ăn bánh."];
function drawBit(g,x,y,f,P){const px=(a,b,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x+a*P),Math.round(y+b*P),w*P,h*P)};
  const body=css2("--accent")||"#f08bb8",dark="#3b2a55";const bob=f.walk&&f.step%2?1:0;const yy=f.jump?-f.jump:0;y+=yy*P-bob*P*0;
  // antenna + LED
  px(7,0,1,2,dark);px(6.5,-1,2,1.4,f.led?"#ffe27a":"#c9a94a");
  // body (chip)
  px(2,2,12,10,dark);px(3,3,10,8,body);px(3,3,10,1,"rgba(255,255,255,.35)");
  // pins
  for(let i=0;i<4;i++){px(0.5,3.5+i*2,1.5,1,"#cfd3dc");px(14,3.5+i*2,1.5,1,"#cfd3dc")}
  // eyes
  if(f.sleep){px(5,6,2,.6,dark);px(9,6,2,.6,dark)}else if(f.blink){px(5,6.5,2,.6,dark);px(9,6.5,2,.6,dark)}else{px(5,5,2,2.4,"#fff");px(9,5,2,2.4,"#fff");px(5.6+f.look*.4,5.8,1,1.4,dark);px(9.6+f.look*.4,5.8,1,1.4,dark)}
  // cheeks + mouth
  px(4,8,1.4,.8,"#ff9cc0");px(10.6,8,1.4,.8,"#ff9cc0");px(7,8.6,2,.6,dark);if(f.happy)px(7.4,9.2,1.2,.5,"#ff6a9a");
  // legs
  const l=f.walk?(f.step%2?1:-1):0;px(4.5,12,1.2,2+(l>0?0:.6),dark);px(10.3,12,1.2,2+(l<0?0:.6),dark);px(4+(l>0?.6:0),13.8+(l>0?0:.6),2,.8,dark);px(10+(l<0?.6:0),13.8+(l<0?0:.6),2,.8,dark);
}
WIDGETS.mascot={t:"bit.exe",title:"Linh vật Bit",desc:"Chú chip pixel đi dạo, chớp mắt, bấm vào để nghe lời nhắc",build(b){
  b.innerHTML=`<canvas class="bitc" width="232" height="118" aria-label="Linh vật Bit — bấm để nói chuyện"></canvas><div class="bit-say" hidden></div>`;const c=$("canvas",b),g=c.getContext("2d");g.imageSmoothingEnabled=false;const say=$(".bit-say",b);
  let woke=0,x=40,dir=1,step=0,blink=0,jump=0,vy=0,happy=0,tick=0,idle=0,hearts=[];
  c.onclick=()=>{woke=Date.now();if(jump===0){vy=3.2;jump=.01}happy=30;hearts.push({x:x+30,y:40,t:0});say.hidden=false;say.textContent=BIT_TIPS[Math.floor(Math.random()*BIT_TIPS.length)];clearTimeout(say._t);say._t=setTimeout(()=>say.hidden=true,4500)};
  const night=()=>{const h=new Date().getHours();return h>=23||h<6};
  const frame=()=>{if(!document.body.contains(c))return;tick++;g.clearRect(0,0,232,118);
    g.fillStyle="color-mix(in srgb, var(--accent) 12%, transparent)";g.fillStyle=css2("--panel2")||"#eee";g.fillRect(0,100,232,18);g.fillStyle=css2("--line")||"#ccc";for(let i=0;i<232;i+=8)g.fillRect(i+(tick>>2)%8*0,100,4,2);
    [[30,28],[150,18],[200,40]].forEach(([a,bq],k)=>{g.fillStyle=k%2?"#ffd1e6":"#d9ecff";const ox=(a+tick*.15*(k+1))%260-20;g.fillRect(ox,bq,18,5);g.fillRect(ox+4,bq-3,10,3)});
    const sleeping=night()&&!happy&&Date.now()-woke>120000;say.hidden=sleeping?false:say.hidden;if(sleeping)say.textContent="Bit đang ngủ… bấm để đánh thức";
    if(!sleeping&&!jump){if(idle>0)idle--;else{x+=dir*1.2;if(tick%6===0)step++;if(x>170||x<6){dir*=-1;if(Math.random()<.5)idle=40}}if(Math.random()<.004)idle=50}
    if(jump){jump+=vy;vy-=.35;if(jump<=0){jump=0;vy=0}}
    if(tick%90===0)blink=6;if(blink)blink--;if(happy)happy--;
    drawBit(g,x,100-16*4+0,{walk:!sleeping&&!idle&&!jump,step,blink:blink>0,jump:jump,look:dir,led:tick%30<15,happy:happy>0,sleep:sleeping},4);
    if(sleeping){g.fillStyle=css2("--muted")||"#888";g.font="700 14px Silkscreen, monospace";g.fillText("z",x+66,30-(tick%40)/4);g.fillText("Z",x+76,20-(tick%40)/5)}
    hearts=hearts.filter(h=>h.t<40);hearts.forEach(h=>{h.t++;const hy=h.y-h.t;g.globalAlpha=1-h.t/40;g.fillStyle="#ff6a9a";[[1,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[1,2],[2,2],[3,2],[2,3]].forEach(([a,bq])=>g.fillRect(h.x+a*3,hy+bq*3,3,3));g.globalAlpha=1});
  };
  let vis=true,stop=false,last=0;try{new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(c)}catch(e){}
  const loop=t=>{if(stop)return;if(vis&&!document.hidden&&t-last>=48){last=t;frame()}requestAnimationFrame(loop)};frame();requestAnimationFrame(loop);return {stop:()=>{stop=true}}}};
WIDGETS.next.desc="Buổi học gần nhất trong lịch ôn tập";
WIDGETS.next.build=function(b){const draw=()=>{const e=upcomingSessions()[0];b.innerHTML=e?`<b>${esc(e.title)}</b><span class="muted">${new Date(e.date+"T"+e.start).toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"short"})} · ${e.start}</span>${e.focus?`<span class="quote" style="text-align:left;font-size:15px">${esc(e.focus)}</span>`:""}<button class="sm on" id="nxOpen">Mở lịch học</button>`:`<span class="muted">Chưa có buổi ôn. Vào Lịch học → Lập lịch ôn tập.</span><button class="sm on" id="nxOpen">Mở lịch học</button>`;$("#nxOpen",b).onclick=goCal};draw();return setInterval(draw,60000)};

/* =====================================================================
   DỮ LIỆU MẪU: môn học, thư mục, bài tập ví dụ
   ===================================================================== */
async function seedSubjects(){
  const m=await Store.get("meta-seeded3").catch(()=>null);if(m||UI.subjs.length)return;
  const now=Date.now(),d=n=>ymd(addD(new Date(),n));
  await Store.put("sj-dsd",{type:"subj",title:"Thiết kế hệ thống số",code:"DSD",color:"#f08bb8",order:0,created:now,
    syllabus:"Ch1 Hệ đếm và mã · Ch2 Đại số Boole và cổng logic · Ch3 Mạch tổ hợp (MUX, decoder, cộng) · Ch4 Mạch tuần tự (latch, flip-flop, bộ đếm, thanh ghi dịch) · Ch5 Máy trạng thái FSM · Ch6 VHDL và FPGA",
    focus:"Rút gọn biểu thức bằng DeMorgan; vẽ giản đồ thời gian flip-flop; thiết kế bộ đếm",exclude:"",exam:d(28)});
  await Store.put("sj-ec",{type:"subj",title:"Mạch điện tử",code:"EC",color:"#7fb6ea",order:1,created:now+1,syllabus:"",focus:"",exclude:""});
  await Store.put("fd-dsd-2",{type:"fold",subj:"sj-dsd",parent:null,title:"Chương 2 · Đại số Boole & cổng logic",order:2,created:now});
  await Store.put("fd-dsd-4",{type:"fold",subj:"sj-dsd",parent:null,title:"Chương 4 · Mạch tuần tự",order:4,created:now});
  await Store.put("fd-ec-1",{type:"fold",subj:"sj-ec",parent:null,title:"Chương 1 · Mạch DC & định luật Kirchhoff",order:1,created:now});
  UI.openFolds.add("fd-dsd-2");local.set("openFolds",[...UI.openFolds]);
  if(UI.nbs.some(n=>n.id==="nb-mau-logic"))await Store.patch("nb-mau-logic",{subj:"sj-dsd",parent:"fd-dsd-2",goals:"Dựng được mọi cổng từ NAND; dùng DeMorgan để rút gọn"}).catch(()=>{});
  await Store.put("tk-mau-1",{type:"task",title:"Ví dụ: Làm 5 bài rút gọn DeMorgan",subj:"sj-dsd",due:d(2),status:"todo",created:now,sample:true});
  await Store.put("tk-mau-2",{type:"task",title:"Ví dụ: Nộp lab bộ đếm mod 10",subj:"sj-dsd",due:d(6),status:"todo",created:now+1,sample:true});
  await Store.put("tk-mau-3",{type:"task",title:"Ví dụ: Ôn định luật Kirchhoff",subj:"sj-ec",due:d(4),status:"todo",created:now+2,sample:true});
  await Store.put("meta-seeded3",{type:"meta",at:now});
}

/* =====================================================================
   v5 — TRANG CHỦ DẠNG KHỐI (kiểu Notion) · TAB TÙY CHỈNH · THANH CÔNG CỤ TÙY CHỈNH
        · THÊM NGUỒN NHANH · WIDGET TRÊN TRANG · SƠ ĐỒ TƯ DUY MỚI
   ===================================================================== */
const RAIL_ALL={home:["Trang chủ","home"],books:["Môn học & bài học","book"],cal:["Lịch học (ngày · tuần · tháng)","cal"],lab:["Phòng thí nghiệm 3D","flask"],prof:["Cá nhân hóa việc học","user"],skin:["Giao diện & màu","palette"],stk:["Sticker","star"],cut:["Cắt ghép sticker","cut"],wdg:["Widget trang trí","widget"],lay:["Bố cục & toàn màn hình","split"]};
const TOP_ALL={cal:["Lịch học","cal"],lesson:["Bài học mới","plus"],src:["Thêm nguồn","upload"],subj:["Môn học mới","book"],task:["Thêm bài tập","check"],prof:["Cá nhân hóa","user"],edit:["Tùy chỉnh trang chủ","edit"],bars:["Tùy chỉnh thanh công cụ","more"]};
const W_LBL={2:"⅓",3:"½",4:"⅔",6:"Rộng"};
const DASH_DEF=()=>({blocks:[{id:"b1",k:"shortcuts",w:2},{id:"b2",k:"recent",w:2},{id:"b3",k:"addsrc",w:2},{id:"b4",k:"tasks",w:6},{id:"b5",k:"week",w:6},{id:"b6",k:"cal",w:6},{id:"b7",k:"courses",w:6}],
  tviews:[{id:"tv-todo",l:"Cần làm",st:"todo",subj:"",when:"all"},{id:"tv-done",l:"Đã xong",st:"done",subj:"",when:"all"},{id:"tv-all",l:"Tất cả",st:"all",subj:"",when:"all"}],
  rail:{order:Object.keys(RAIL_ALL),hidden:[]},top:{order:Object.keys(TOP_ALL),hidden:["src","subj","task","prof","edit","bars"]}});
function normDash(d){const D0=DASH_DEF();if(!d||typeof d!=="object")return D0;const o={...D0,...d};
  o.blocks=Array.isArray(d.blocks)?d.blocks.filter(b=>b&&b.k&&(BLK[b.k]||(String(b.k).startsWith("w:")&&WIDGETS[b.k.slice(2)]))).map(b=>({id:b.id||mkid("b"),k:b.k,w:[2,3,4,6].includes(+b.w)?+b.w:2,c:!!b.c,m:!!b.m})):D0.blocks;
  o.tviews=Array.isArray(d.tviews)&&d.tviews.length?d.tviews.map(v=>({id:v.id||mkid("tv"),l:String(v.l||"Tab"),st:v.st||"all",subj:v.subj||"",when:v.when||"all"})):D0.tviews;
  const fix=(x,all,def)=>{const r={order:Array.isArray(x&&x.order)?x.order.filter(k=>all[k]):[...def.order],hidden:Array.isArray(x&&x.hidden)?x.hidden.filter(k=>all[k]):[...def.hidden]};Object.keys(all).forEach(k=>{if(!r.order.includes(k)){r.order.push(k);if(def.hidden.includes(k))r.hidden.push(k)}});return r};
  o.rail=fix(d.rail,RAIL_ALL,D0.rail);o.top=fix(d.top,TOP_ALL,D0.top);delete o.id;delete o.type;return o}
UI.dashEdit=false;UI.taskView=local.get("taskView","tv-todo");
let _sdashT=0;function saveDash(){local.set("dash",UI.dash);clearTimeout(_sdashT);_sdashT=setTimeout(()=>{const d=UI.dash;Store.put("dash-me",{type:"dash",blocks:d.blocks,tviews:d.tviews,rail:d.rail,top:d.top}).catch(e=>console.warn(e))},700)}
async function loadDash(){try{const d=await Store.get("dash-me");if(d){UI.dash=normDash(d);local.set("dash",UI.dash);renderRail();renderTop();if(UI.view==="home")renderHome()}}catch(e){}}
function waitNb(id,ms=4000){return new Promise(res=>{const t0=Date.now();const tick=()=>{if(UI.nbs.some(n=>n.id===id))return res(true);if(Date.now()-t0>ms)return res(false);setTimeout(tick,80)};tick()})}
async function goLesson(id,opt){await waitNb(id);openNotebook(id,opt||{})}

/* ---------- thanh tiện ích trái & thanh trên — tùy chỉnh ---------- */
function renderRail(){
  const r=$("#rail");if(!r)return;const d=UI.dash||DASH_DEF();const av=P.me&&P.me.avatarUrl?`<img class="avatar" src="${esc(P.me.avatarUrl)}" alt="">`:`<span class="avatar">${esc(((P.me&&P.me.name)||"B")[0].toUpperCase())}</span>`;
  const keys=d.rail.order.filter(k=>!d.rail.hidden.includes(k));
  const on=k=>UI.fly===k||(!UI.fly&&((k==="cal"&&UI.view==="cal")||(k==="home"&&UI.view==="home")||(k==="books"&&(UI.view==="subj"||UI.view==="nb"))));
  r.innerHTML=`<button class="brand" data-r="home" aria-label="Sổ Học Điện Tử">${glyph("home",40)}</button>${keys.map(k=>`<button data-r="${k}" aria-label="${RAIL_ALL[k][0]}" data-tip="${RAIL_ALL[k][0]}" aria-pressed="${on(k)}">${ic(RAIL_ALL[k][1])}</button>`).join("")}<div class="grow"></div><button data-r="cust" aria-label="Tùy chỉnh thanh công cụ" data-tip="Tùy chỉnh thanh công cụ">${ic("more")}</button><button data-r="acct" aria-label="Tài khoản" data-tip="Tài khoản" style="padding:0">${av}</button>`;
  $$("[data-r]",r).forEach(b=>{b.onclick=e=>railAct(b.dataset.r,b);b.onmouseenter=()=>showTip(b);b.onmouseleave=hideTip;b.onfocus=()=>showTip(b);b.onblur=hideTip});
}
const _railAct0=railAct;
railAct=function(k,btn){if(k==="cust"){hideTip();closeFly();return barsDialog()}return _railAct0(k,btn)};
function topAct(k){({cal:goCal,lesson:()=>newLessonDialog(),src:()=>quickSourceDialog(),subj:()=>subjectDialog(),task:()=>taskDialog(),prof:profileDialog,edit:()=>{if(UI.view!=="home")goHome();UI.dashEdit=true;renderHome()},bars:barsDialog})[k]()}
function renderTop(){
  try{renderRail()}catch(e){}
  const t=$("#top");const v=UI.view;const inNb=v==="nb"&&UI.cur;const d=UI.dash||DASH_DEF();
  const custom=d.top.order.filter(k=>!d.top.hidden.includes(k)).map(k=>`<button class="ghost" data-top="${k}" title="${TOP_ALL[k][0]}">${ic(TOP_ALL[k][1])}<span class="hide-sm">${TOP_ALL[k][0]}</span></button>`).join("");
  let mid="";
  if(inNb)mid=`<button class="ghost ic" id="tBack" aria-label="Quay lại">${ic("back")}</button><nav class="tcrumb hide-sm" id="tCrumb" aria-label="Vị trí"></nav><input class="nbtitle" id="tTitle" value="${esc(UI.cur.title)}" aria-label="Tên bài học"><div class="grow hide-sm"></div><button class="ghost hide-sm" id="tLay">${ic("split")}<span>Bố cục</span></button><button class="ghost hide-sm" id="tNew">${ic("plus")}<span>Bài học mới</span></button>`;
  else if(v==="subj"){const s=subjOf(UI.curSubj);mid=`<button class="ghost ic" id="tBack" aria-label="Về trang chủ">${ic("back")}</button><b class="ttl">${esc(s?s.title:"Chưa xếp môn")}</b><div class="grow"></div>${custom}`}
  else if(v==="cal")mid=`<button class="ghost ic" id="tBack" aria-label="Về trang chủ">${ic("back")}</button><b class="ttl">Lịch học</b><div class="grow"></div>${custom.replace(/<button class="ghost" data-top="cal"[\s\S]*?<\/button>/,"")}`;
  else mid=`<b class="ttl" style="font-family:var(--f-display)">Sổ Học Điện Tử</b><div class="grow"></div>${custom}`;
  t.innerHTML=`<button class="ghost ic mob-only" id="tMenu" aria-label="Mở thanh tiện ích">${ic("widget")}</button>${mid}`;
  $("#tMenu").onclick=()=>$("#rail").classList.toggle("open");
  const bk=$("#tBack");if(bk)bk.onclick=()=>{if(inNb&&UI.cur.subj&&subjOf(UI.cur.subj))openSubject(UI.cur.subj);else goHome()};
  $$("[data-top]",t).forEach(b=>b.onclick=()=>topAct(b.dataset.top));
  const tn=$("#tNew");if(tn)tn.onclick=()=>newLessonDialog(UI.cur.subj,UI.cur.parent);
  if(inNb){$("#tTitle").onchange=e=>{const val=e.target.value.trim()||"Bài học chưa đặt tên";Store.patch(UI.cur.id,{title:val,updated:Date.now()})};$("#tLay").onclick=e=>layoutMenu(e.currentTarget);renderCrumb()}
}
function barsDialog(){
  const list=(key,all)=>{const s=UI.dash[key];return s.order.map((k,i)=>`<div class="bar-row" draggable="true" data-bk="${key}" data-k="${k}"><span class="handle" aria-hidden="true">⠿</span><input type="checkbox" class="chk" data-vis="${key}:${k}" ${s.hidden.includes(k)?"":"checked"} aria-label="Hiện ${esc(all[k][0])}">${ic(all[k][1])}<span class="nm">${esc(all[k][0])}</span><button class="ghost ic" data-mv="${key}:${k}:-1" aria-label="Lên" ${i?"":"disabled"}>${ic("up")}</button><button class="ghost ic" data-mv="${key}:${k}:1" aria-label="Xuống" ${i<s.order.length-1?"":"disabled"}>${ic("down")}</button></div>`).join("")};
  const draw=()=>{$("#barsBody").innerHTML=`<p class="muted" style="margin:0;font-size:13px">Tích để hiện/ẩn, kéo ⠿ hoặc dùng mũi tên để đổi thứ tự. Thay đổi áp dụng ngay.</p><h4>Thanh tiện ích bên trái</h4><div class="bar-list" data-list="rail">${list("rail",RAIL_ALL)}</div><h4>Nút trên thanh trên cùng</h4><div class="bar-list" data-list="top">${list("top",TOP_ALL)}</div>`;
    $$("[data-vis]").forEach(x=>x.onchange=()=>{const [key,k]=x.dataset.vis.split(":");const s=UI.dash[key];s.hidden=s.hidden.filter(z=>z!==k);if(!x.checked)s.hidden.push(k);apply()});
    $$("[data-mv]").forEach(b=>b.onclick=()=>{const [key,k,dir]=b.dataset.mv.split(":");const o=UI.dash[key].order;const i=o.indexOf(k),j=i+ +dir;if(j<0||j>=o.length)return;[o[i],o[j]]=[o[j],o[i]];apply()});
    $$(".bar-row").forEach(r=>{r.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain",r.dataset.bk+":"+r.dataset.k);r.classList.add("dragging")});r.addEventListener("dragend",()=>r.classList.remove("dragging"));
      r.addEventListener("dragover",e=>{e.preventDefault();r.classList.add("drop")});r.addEventListener("dragleave",()=>r.classList.remove("drop"));
      r.addEventListener("drop",e=>{e.preventDefault();r.classList.remove("drop");const [key,k]=e.dataTransfer.getData("text/plain").split(":");if(key!==r.dataset.bk||k===r.dataset.k)return;const o=UI.dash[key].order;o.splice(o.indexOf(k),1);const rect=r.getBoundingClientRect();let j=o.indexOf(r.dataset.k);if(e.clientY>rect.top+rect.height/2)j++;o.splice(j,0,k);apply()})})};
  const apply=()=>{saveDash();renderRail();renderTop();draw()};
  openModal({title:"Tùy chỉnh thanh công cụ",small:true,body:`<div class="form" id="barsBody"></div>`,foot:`<button class="pill-btn" id="barsReset">Khôi phục mặc định</button><div class="grow"></div><button class="pill-btn primary" data-close>Xong</button>`});
  $("#barsReset").onclick=()=>{const D0=DASH_DEF();UI.dash.rail=D0.rail;UI.dash.top=D0.top;apply()};draw();
}

/* ---------- thêm nguồn nhanh (+) ---------- */
function quickSourceHTML(){
  const recent=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,30);
  return `<label class="qdrop" data-qd tabindex="0"><span class="plus">${ic("plus")}</span><b>Thả tệp vào đây hoặc bấm để chọn</b><small>PDF · DOCX · TXT · ảnh · ZIP từ Moodle</small><input type="file" multiple hidden accept=".pdf,.docx,.txt,.md,.png,.jpg,.jpeg,.webp,.zip" data-qf></label>
   <div class="qs-row"><label class="muted" style="font-size:12.5px">Thêm vào</label><select data-qt aria-label="Thêm nguồn vào bài học"><option value="new">+ Bài học mới</option>${recent.map(n=>`<option value="${esc(n.id)}">${esc(((subjOf(n.subj)||{}).code?subjOf(n.subj).code+" · ":"")+n.title)}</option>`).join("")}</select></div>
   <button class="btn" data-qp>${ic("text")} Dán văn bản hoặc liên kết</button>`;
}
function bindQuickSource(root){
  const sel=$("[data-qt]",root),inp=$("[data-qf]",root),dz=$("[data-qd]",root);
  const target=async(files)=>{const v=sel.value;if(v!=="new")return v;const id=mkid("nb");const name=files&&files[0]?files[0].name.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").slice(0,80):"Bài học mới";
    await Store.put(id,{type:"nb",title:name||"Bài học mới",subj:null,parent:null,goals:"",created:Date.now(),updated:Date.now(),srcCount:0,summary:"",questions:[]});return id};
  const go=async files=>{if(!files.length)return;closeDialog();toast("Đang mở bài học để thêm "+files.length+" tệp…");const id=await target(files);await goLesson(id);const t0=Date.now();while(!(UI.cur&&UI.cur.id===id)&&Date.now()-t0<3000)await new Promise(r=>setTimeout(r,50));ingestFiles(files)};
  inp.onchange=()=>go([...inp.files]);dz.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();inp.click()}};
  ["dragenter","dragover"].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();dz.classList.add("over")}));
  dz.addEventListener("dragleave",()=>dz.classList.remove("over"));
  dz.addEventListener("drop",e=>{e.preventDefault();e.stopPropagation();dz.classList.remove("over");go([...e.dataTransfer.files])});
  $("[data-qp]",root).onclick=async()=>{closeDialog();const id=await target(null);goLesson(id,{addSources:true})};
}
function quickSourceDialog(){openModal({title:"Thêm nguồn",small:true,body:`<div class="form qs">${quickSourceHTML()}</div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Đóng</button>`});bindQuickSource($("#dcard")||document)}
async function newLessonFrom(opts){const id=mkid("nb");await Store.put(id,{type:"nb",...opts});return id}
/* bài học mới: chờ dữ liệu về rồi mới mở (tránh “Không tìm thấy sổ học”) */
const _nld=newLessonDialog;
newLessonDialog=function(sid,parent){_nld(sid,parent);const ok=$("#lsOk");if(!ok)return;ok.onclick=async()=>{ok.disabled=true;const id=mkid("nb");await Store.put(id,{type:"nb",title:$("#lsT").value.trim()||"Bài học chưa đặt tên",subj:$("#lsS").value||null,parent:$("#lsF").value||null,goals:$("#lsG").value.trim(),created:Date.now(),updated:Date.now(),srcCount:0,summary:"",questions:[]});closeDialog();goLesson(id,{addSources:true})}};

/* =====================================================================
   TRANG CHỦ DẠNG KHỐI
   ===================================================================== */
const _wBlk=new Map();
function killWidgetRun(r){try{if(typeof r==="number")clearInterval(r);else if(r&&r.stop)r.stop()}catch(e){}}
function widgetBlockEl(k){let w=_wBlk.get(k);if(w)return w.el;const el=document.createElement("div");el.className="wdg-in";let run=null;try{run=WIDGETS[k].build(el)}catch(e){console.warn(e);el.innerHTML=`<div class="warnbox">Widget lỗi: ${esc(e.message||String(e))}</div>`}_wBlk.set(k,{el,run});return el}
function dropWidgetBlock(k){const w=_wBlk.get(k);if(w){killWidgetRun(w.run);w.el.remove();_wBlk.delete(k)}}
const hasBlock=k=>UI.dash.blocks.some(b=>b.k===k);
function setWidgetMode(k,mode){/* mode: off | float | dash */
  const st=D.widgets[k]=Object.assign(D.widgets[k]||{},{on:mode==="float"});
  if(mode==="dash"){if(!hasBlock("w:"+k))UI.dash.blocks.splice(Math.min(3,UI.dash.blocks.length),0,{id:mkid("b"),k:"w:"+k,w:2})}
  else{UI.dash.blocks=UI.dash.blocks.filter(b=>b.k!=="w:"+k);dropWidgetBlock(k)}
  renderWidgets();saveDecor();saveDash();if(UI.view==="home")renderHome();if(UI.fly==="wdg")renderFly();
}
const BLK={
 shortcuts:{l:"Lối tắt",i:"spark",small:1,w:2,body(b){b.innerHTML=`<div class="qa">${[["lesson","plus","Bài học mới"],["subj","book","Môn học mới"],["task","check","Thêm bài tập"],["ev","cal","Thêm sự kiện"],["prof","edit","Cá nhân hóa việc học"]].map(([k,i,l])=>`<button data-qa="${k}">${ic(i)}<span>${l}</span></button>`).join("")}</div>`}},
 recent:{l:"Đi nhanh",i:"ext",small:1,w:2,body(b){const recent=[...UI.nbs].sort((a,c)=>(c.updated||0)-(a.updated||0)).slice(0,5);b.innerHTML=`<div class="qa">${recent.length?recent.map(n=>`<button data-go="${esc(n.id)}">${pxFile(tagCol(n.subj))}<span>${esc(n.title)}</span></button>`).join(""):`<span class="muted" style="font-size:13px">Các bài học mở gần đây hiện ở đây.</span>`}<button data-qa="cal">${ic("cal")}<span>Lịch học đầy đủ</span></button></div>`}},
 addsrc:{l:"Thêm nguồn",i:"upload",small:1,w:2,body(b){b.innerHTML=`<div class="qs">${quickSourceHTML()}</div>`;bindQuickSource(b)}},
 progress:{l:"Tiến độ",i:"star",small:1,w:2,body(b){let k=0;for(let d=new Date();;d.setDate(d.getDate()-1)){if(D.streak.includes(ymd(d)))k++;else break;if(k>90)break}const done=UI.tasks.filter(t=>t.status==="done").length,tot=UI.tasks.length||1;
   b.innerHTML=`<div style="display:flex;gap:3px;flex-wrap:wrap">${Array.from({length:7},(_,i)=>`<img src="${stkURL(i<k?"heart-p":"heart-l",2).url}" alt="" style="width:22px;opacity:${i<k?1:.35};image-rendering:pixelated">`).join("")}</div><b>${k} ngày học liên tiếp</b><div class="muted" style="font-size:13px">${UI.subjs.length} môn · ${UI.nbs.length} bài học</div><div class="pbar"><i style="width:${Math.round(done/tot*100)}%"></i></div><span class="muted" style="font-size:12.5px">${done}/${UI.tasks.length} bài tập hoàn thành</span>`}},
 tasks:{l:"Bài tập",i:"check",w:6,act:`<button class="btn" data-qa="task">${ic("plus")} Thêm</button>`,body(b){taskBlock(b)}},
 week:{l:"Việc cần làm trong tuần",i:"note",w:6,body(b){const now=new Date(),wk=monday(now);
   b.innerHTML=`<div class="week">${WD.map((d,i)=>{const day=addD(wk,i),ds=ymd(day),its=UI.tasks.filter(t=>t.due===ds),ses=upcomingAll().filter(e=>e.date===ds);return `<div class="day ${ds===ymd(now)?"today":""}"><h5><img src="${stkURL(["star-y","star-b","star-p","star-l","star-m","heart-p","moon"][i],2).url}" alt="">${WDL[i]}</h5>${its.map(t=>`<label class="it"><input type="checkbox" class="chk" data-tk="${esc(t.id)}" ${t.status==="done"?"checked":""}><span style="${t.status==="done"?"text-decoration:line-through;opacity:.6":""}">${esc(t.title)}</span></label>`).join("")}${ses.map(e=>`<div class="it" title="${esc(e.title)}">${ic("cal")}<span>${esc(e.start)} ${esc(e.title)}</span></div>`).join("")}<button class="add" data-addday="${ds}">+ Việc cần làm</button></div>`}).join("")}</div>`}},
 cal:{l:"Lịch học",i:"cal",w:6,act:`<button class="btn" data-qa="cal">${ic("ext")} Mở trang lịch</button>`,body(b){b.innerHTML=`<div id="homeCal"></div>`;renderCalendar($("#homeCal",b),{compact:true})}},
 courses:{l:"Môn học",i:"book",w:6,act:`<button class="btn" data-qa="subj">${ic("plus")} Môn mới</button>`,body(b){b.innerHTML=`<div class="rtab" role="tablist">${[["subj","Môn học"],["all","Tất cả bài học"]].map(([k,l])=>`<button role="tab" data-ct="${k}" aria-selected="${UI.courseTab===k}">${l}</button>`).join("")}<span class="grow"></span></div><div id="courseBox"></div>`;
   $$("[data-ct]",b).forEach(x=>x.onclick=()=>{UI.courseTab=x.dataset.ct;$$("[data-ct]",b).forEach(y=>y.setAttribute("aria-selected",y===x));renderCourses()});renderCourses()}}
};
function blkDef(k){if(BLK[k])return BLK[k];if(String(k).startsWith("w:")){const w=WIDGETS[k.slice(2)];if(w)return {l:w.title,i:"widget",small:1,w:2,widget:k.slice(2)}}return null}
function renderHome(){
  if(UI.view!=="home")return;const ae=document.activeElement;if(ae&&$("#main").contains(ae)&&(/INPUT|TEXTAREA|SELECT/.test(ae.tagName)||ae.isContentEditable)){if(!UI._homePend){UI._homePend=true;ae.addEventListener("blur",()=>{UI._homePend=false;setTimeout(renderHome,30)},{once:true})}return}
  if(!UI.dash)UI.dash=normDash(local.get("dash",null));
  const keep=$(".dash")?$(".dash").scrollTop:0;
  const name=(UI.profile&&UI.profile.name)||(P.me&&P.me.name)||"bạn";const now=new Date();const ed=UI.dashEdit;
  /* widget khối không còn trên trang → dừng */
  [..._wBlk.keys()].forEach(k=>{if(!hasBlock("w:"+k))dropWidgetBlock(k)});
  const tools=b=>ed?`<span class="blk-tools"><button class="handle" draggable="true" data-bt="drag" aria-label="Kéo để di chuyển khối" title="Kéo để di chuyển">⠿</button><button data-bt="l" aria-label="Sang trái" title="Sang trái">←</button><button data-bt="u" aria-label="Lên trên" title="Lên trên">↑</button><button data-bt="d" aria-label="Xuống dưới" title="Xuống dưới">↓</button><button data-bt="r" aria-label="Sang phải" title="Sang phải">→</button><button data-bt="w" aria-label="Đổi độ rộng" title="Đổi độ rộng">${W_LBL[b.w]}</button><button data-bt="x" aria-label="Ẩn khối" title="Ẩn khối" class="x">✕</button></span>`:"";
  const blocks=UI.dash.blocks.map(b=>{const def=blkDef(b.k);if(!def)return"";
    return def.small?`<section class="blk panel-box ${ed?"editing":""}" data-bid="${esc(b.id)}" style="--w:${b.w}"><h4>${ic(def.i)} ${esc(def.l)}<span class="grow"></span>${tools(b)}</h4><div class="blk-b" data-bb="${esc(b.id)}"></div></section>`
      :`<section class="blk sec ${ed?"editing":""}" data-bid="${esc(b.id)}" style="--w:${b.w}"><div class="sec-h"><span class="ico">${ic(def.i)}</span>${esc(def.l)}<span class="grow"></span>${ed?"":def.act||""}${tools(b)}</div><div class="blk-b" data-bb="${esc(b.id)}"></div></section>`}).join("");
  $("#main").innerHTML=`<div class="dash"><div class="dash-in">
   <div class="banner"><canvas id="bnr" aria-hidden="true"></canvas><div class="hello"><h1>Chào <span class="hname" id="hName" title="Bấm để sửa tên" tabindex="0" role="button">${esc(name)}</span> ♡<button class="ghost ic hn-ed" id="hNameEd" aria-label="Sửa tên">${ic("edit")}</button></h1><span>${now.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})} · ${UI.tasks.filter(t=>t.status!=="done").length} bài tập cần làm</span></div><div class="bnr-act"><button class="pill-btn" id="dEdit">${ic(ed?"check":"edit")} ${ed?"Xong":"Tùy chỉnh"}</button><button class="pill-btn" id="bnrSeed">${ic("spark")} Đổi cảnh</button></div></div>
   ${ed?`<div class="dash-editbar">${ic("edit")}<span>Đang tùy chỉnh trang chủ — kéo <b>⠿</b> hoặc dùng mũi tên để đổi vị trí, nút ⅓/½/⅔ để đổi độ rộng, ✕ để ẩn khối.</span><span class="grow"></span><button class="btn" id="dAdd">${ic("plus")} Thêm khối</button><button class="btn" id="dBars">${ic("more")} Thanh công cụ</button><button class="btn" id="dReset">Mặc định</button><button class="btn primary" id="dDone">${ic("check")} Xong</button></div>`:""}
   <div class="dgrid" id="dgrid">${blocks}${ed?`<button class="blk add-blk" id="dAdd2" style="--w:2">${ic("plus")}<b>Thêm khối</b><small>Bài tập, lịch, widget đồng hồ, Pomodoro, giấy nhớ…</small></button>`:""}</div>
  </div></div>`;
  $(".dash").scrollTop=keep;
  pixelScene($("#bnr"),{seed:local.get("bnrSeed","so-hoc"),night:isNightSkin(),w:320,h:90});
  $("#bnrSeed").onclick=()=>{local.set("bnrSeed",Math.random().toString(36).slice(2));pixelScene($("#bnr"),{seed:local.get("bnrSeed"),night:isNightSkin(),w:320,h:90})};
  $("#dEdit").onclick=()=>{UI.dashEdit=!UI.dashEdit;renderHome()};
  if(ed){$("#dDone").onclick=()=>{UI.dashEdit=false;renderHome()};$("#dAdd").onclick=e=>addBlockMenu(e.currentTarget);$("#dAdd2").onclick=e=>addBlockMenu(e.currentTarget);$("#dBars").onclick=barsDialog;
    $("#dReset").onclick=()=>confirmDialog("Khôi phục bố cục mặc định?","Các khối trên trang chủ trở lại như ban đầu. Dữ liệu bài tập, môn học không bị ảnh hưởng.","Khôi phục",()=>{UI.dash.blocks=DASH_DEF().blocks;saveDash();renderHome()})}
  /* tên chỉnh sửa được */
  const hn=$("#hName");const startEdit=()=>{hn.contentEditable="true";hn.focus();const r=document.createRange();r.selectNodeContents(hn);const s=getSelection();s.removeAllRanges();s.addRange(r)};
  hn.onclick=startEdit;$("#hNameEd").onclick=startEdit;hn.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();hn.blur()}if(e.key==="Escape"){hn.textContent=name;hn.blur()}};
  hn.onblur=async()=>{hn.contentEditable="false";const v=hn.textContent.replace(/\s+/g," ").trim().slice(0,40);if(!v){hn.textContent=name;return}if(v===name)return;const pf={...(UI.profile||{}),name:v};delete pf.id;delete pf.type;UI.profile=pf;try{await Store.put("profile-me",{type:"profile",...pf});toast("Đã đổi tên hiển thị")}catch(e){toast("Không lưu được tên")}};
  /* nội dung từng khối */
  UI.dash.blocks.forEach(b=>{const def=blkDef(b.k);const body=$(`[data-bb="${b.id}"]`);if(!def||!body)return;
    try{if(def.widget)body.appendChild(widgetBlockEl(def.widget));else def.body(body)}catch(e){console.warn(e);body.innerHTML=`<div class="warnbox">Khối này gặp lỗi: ${esc(e.message||String(e))}</div>`}});
  bindHomeCommon($("#main"));
  if(ed)bindBlockTools();
}
function bindHomeCommon(root){
  $$("[data-qa]",root).forEach(b=>b.onclick=()=>({lesson:()=>newLessonDialog(),subj:()=>subjectDialog(),task:()=>taskDialog(),ev:()=>eventDialog({date:ymd(new Date()),start:"19:00"}),prof:profileDialog,cal:goCal})[b.dataset.qa]());
  $$("[data-go]",root).forEach(b=>{if(b.closest("#courseBox"))return;b.onclick=()=>openNotebook(b.dataset.go)});
  $$("[data-tk]",root).forEach(x=>x.onchange=()=>Store.patch(x.dataset.tk,{status:x.checked?"done":"todo"}));
  $$("[data-addday]",root).forEach(b=>b.onclick=()=>taskDialog({due:b.dataset.addday}));
}
function addBlockMenu(anchor){
  const opts=[...Object.keys(BLK).filter(k=>!hasBlock(k)).map(k=>[k,BLK[k].l,BLK[k].i]),...Object.keys(WIDGETS).filter(k=>!hasBlock("w:"+k)).map(k=>["w:"+k,"Widget: "+WIDGETS[k].title,"widget"])];
  if(!opts.length){toast("Đã có đủ tất cả các khối");return}
  const m=popMenu(anchor,`<div class="who">Thêm khối vào trang chủ</div>${opts.map(([k,l,i])=>`<button data-addb="${k}">${ic(i)}${esc(l)}</button>`).join("")}`);
  $$("[data-addb]",m).forEach(b=>b.onclick=()=>{const k=b.dataset.addb;if(k.startsWith("w:"))return setWidgetMode(k.slice(2),"dash");UI.dash.blocks.push({id:mkid("b"),k,w:BLK[k].w});saveDash();renderHome();setTimeout(()=>{const el=$(`.blk[data-bid="${UI.dash.blocks[UI.dash.blocks.length-1].id}"]`);if(el)el.scrollIntoView({block:"center",behavior:"smooth"})},60)});
}
function blockRows(){const els=$$("#dgrid>.blk[data-bid]");const rows=[];let lastTop=null;els.forEach(el=>{const t=Math.round(el.offsetTop);if(lastTop===null||Math.abs(t-lastTop)>8){rows.push([]);lastTop=t}rows[rows.length-1].push(el.dataset.bid)});return rows}
function moveBlock(id,dir){
  const B=UI.dash.blocks;const i=B.findIndex(b=>b.id===id);if(i<0)return;
  if(dir==="l"&&i>0)[B[i-1],B[i]]=[B[i],B[i-1]];
  else if(dir==="r"&&i<B.length-1)[B[i+1],B[i]]=[B[i],B[i+1]];
  else if(dir==="u"||dir==="d"){const rows=blockRows();const r=rows.findIndex(row=>row.includes(id));const tr=r+(dir==="u"?-1:1);if(r<0||tr<0||tr>=rows.length){toast(dir==="u"?"Khối đã ở hàng trên cùng":"Khối đã ở hàng dưới cùng");return}
    const [blk]=B.splice(i,1);const pos=rows[tr].indexOf(id)>=0?0:Math.min(rows[r].indexOf(id),rows[tr].length-(dir==="d"?0:1));
    const anchorId=dir==="u"?rows[tr][Math.max(0,Math.min(pos,rows[tr].length-1))]:rows[tr][Math.min(rows[tr].length-1,pos)];let j=B.findIndex(b=>b.id===anchorId);if(dir==="d")j+=1;B.splice(Math.max(0,j),0,blk)}
  else return;
  saveDash();renderHome();const el=$(`.blk[data-bid="${id}"]`);if(el){el.classList.add("moved");el.scrollIntoView({block:"nearest",behavior:"smooth"});const btn=$(`[data-bt="${dir}"]`,el);if(btn)btn.focus()}
}
function bindBlockTools(){
  $$("#dgrid>.blk[data-bid]").forEach(el=>{const id=el.dataset.bid;const b=UI.dash.blocks.find(x=>x.id===id);
    $$("[data-bt]",el).forEach(x=>{const a=x.dataset.bt;if(a==="drag")return;x.onclick=e=>{e.stopPropagation();if(a==="w"){const seq=[2,3,4,6];b.w=seq[(seq.indexOf(b.w)+1)%seq.length];saveDash();renderHome();return}
      if(a==="x"){const def=blkDef(b.k);if(def&&def.widget)return setWidgetMode(def.widget,"off");UI.dash.blocks=UI.dash.blocks.filter(z=>z!==b);saveDash();renderHome();toast("Đã ẩn khối — bấm “Thêm khối” để hiện lại");return}
      moveBlock(id,a)}});
    const h=$("[data-bt=drag]",el);if(!h)return;h.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain","blk:"+id);e.dataTransfer.effectAllowed="move";el.classList.add("dragging");try{e.dataTransfer.setDragImage(el,20,20)}catch(_){}});
    h.addEventListener("dragend",()=>{el.classList.remove("dragging");$$(".blk.drop-a,.blk.drop-b").forEach(z=>z.classList.remove("drop-a","drop-b"))});
    el.addEventListener("dragover",e=>{if(!e.dataTransfer.types.includes("text/plain"))return;e.preventDefault();const r=el.getBoundingClientRect();const full=r.width>el.parentElement.clientWidth*.8;const after=full?e.clientY>r.top+r.height/2:e.clientX>r.left+r.width/2;el.classList.toggle("drop-a",after);el.classList.toggle("drop-b",!after);el.dataset.full=full?"1":""});
    el.addEventListener("dragleave",e=>{if(!el.contains(e.relatedTarget))el.classList.remove("drop-a","drop-b")});
    el.addEventListener("drop",e=>{e.preventDefault();const v=e.dataTransfer.getData("text/plain");const after=el.classList.contains("drop-a");el.classList.remove("drop-a","drop-b");if(!v.startsWith("blk:"))return;const from=v.slice(4);if(from===id)return;const B=UI.dash.blocks;const [blk]=B.splice(B.findIndex(x=>x.id===from),1);let j=B.findIndex(x=>x.id===id);if(after)j++;B.splice(j,0,blk);saveDash();renderHome()});
  });
}

/* ---------- Bài tập: tab tùy chỉnh (kiểu view của Notion) ---------- */
function curView(){const L=UI.dash.tviews;return L.find(v=>v.id===UI.taskView)||L[0]}
function taskBlock(b){
  const v=curView();const ed=UI.dashEdit;
  b.innerHTML=`<div class="rtab tv-tabs" role="tablist">${UI.dash.tviews.map(t=>`<button role="tab" data-tv="${esc(t.id)}" aria-selected="${t.id===v.id}" draggable="true" title="Kéo để đổi thứ tự · chuột phải để sửa">${t.subj&&subjOf(t.subj)?`<i class="dot" style="background:${subjOf(t.subj).color}"></i>`:""}${esc(t.l)}${t.id===v.id?`<span class="tv-m" data-tvm="${esc(t.id)}" role="button" aria-label="Tùy chọn tab" tabindex="0">⋯</span>`:""}</button>`).join("")}<button class="tv-add" data-tvadd aria-label="Thêm tab" title="Thêm tab lọc mới">+</button><span class="grow"></span></div>
    <div class="tags">${UI.subjs.map(s=>`<span class="tag" style="background:${s.color}">${esc(s.code||s.title)} <b>${UI.tasks.filter(t=>t.subj===s.id&&t.status!=="done").length}</b></span>`).join("")}</div><div class="tasks" id="taskList"></div>`;
  renderTasks($("#taskList",b),null,v);
  $$("[data-tv]",b).forEach(x=>{x.onclick=e=>{if(e.target.closest("[data-tvm]"))return;UI.taskView=x.dataset.tv;local.set("taskView",UI.taskView);taskBlock(b)};
    x.oncontextmenu=e=>{e.preventDefault();tvMenu(x,x.dataset.tv,b)};x.ondblclick=()=>tvDialog(UI.dash.tviews.find(t=>t.id===x.dataset.tv),b);
    x.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain","tv:"+x.dataset.tv)});
    x.addEventListener("dragover",e=>{e.preventDefault();x.classList.add("drop")});x.addEventListener("dragleave",()=>x.classList.remove("drop"));
    x.addEventListener("drop",e=>{e.preventDefault();e.stopPropagation();x.classList.remove("drop");const d=e.dataTransfer.getData("text/plain");if(!d.startsWith("tv:"))return;const from=d.slice(3);if(from===x.dataset.tv)return;const L=UI.dash.tviews;const [t]=L.splice(L.findIndex(z=>z.id===from),1);const r=x.getBoundingClientRect();let j=L.findIndex(z=>z.id===x.dataset.tv);if(e.clientX>r.left+r.width/2)j++;L.splice(j,0,t);saveDash();taskBlock(b)})});
  $$("[data-tvm]",b).forEach(x=>{x.onclick=e=>{e.stopPropagation();tvMenu(x,x.dataset.tvm,b)};x.onkeydown=e=>{if(e.key==="Enter")x.click()}});
  $("[data-tvadd]",b).onclick=()=>tvDialog(null,b);
  bindHomeCommon(b);
}
function tvMenu(anchor,id,b){const L=UI.dash.tviews;const i=L.findIndex(t=>t.id===id);const t=L[i];
  const m=popMenu(anchor,`<button data-a="e">${ic("edit")}Sửa tab “${esc(t.l)}”</button><button data-a="l" ${i?"":"disabled"}>← Chuyển sang trái</button><button data-a="r" ${i<L.length-1?"":"disabled"}>→ Chuyển sang phải</button><button data-a="c">${ic("dup")}Nhân bản</button><button data-a="d" style="color:var(--bad)" ${L.length>1?"":"disabled"}>${ic("trash")}Xóa tab</button>`);
  const mv=d=>{const j=i+d;if(j<0||j>=L.length)return;[L[i],L[j]]=[L[j],L[i]];saveDash();taskBlock(b)};
  $("[data-a=e]",m).onclick=()=>tvDialog(t,b);$("[data-a=l]",m).onclick=()=>mv(-1);$("[data-a=r]",m).onclick=()=>mv(1);
  $("[data-a=c]",m).onclick=()=>{const n={...t,id:mkid("tv"),l:t.l+" (bản sao)"};L.splice(i+1,0,n);UI.taskView=n.id;saveDash();taskBlock(b)};
  $("[data-a=d]",m).onclick=()=>{if(L.length<2)return;L.splice(i,1);if(UI.taskView===id)UI.taskView=L[0].id;saveDash();taskBlock(b)}}
function tvDialog(t,b){const v=t||{l:"",st:"todo",subj:"",when:"all"};
  openModal({title:t?"Sửa tab":"Tab mới",small:true,body:`<div class="form"><div class="field"><label for="tvL">Tên tab</label><input class="input" id="tvL" value="${esc(v.l)}" placeholder="Ví dụ: DSD tuần này"></div>
   <div class="row3"><div class="field"><label for="tvS">Trạng thái</label><select id="tvS">${[["todo","Cần làm"],["done","Đã xong"],["all","Tất cả"]].map(([k,l])=>`<option value="${k}" ${v.st===k?"selected":""}>${l}</option>`).join("")}</select></div>
   <div class="field"><label for="tvJ">Môn</label><select id="tvJ"><option value="">Mọi môn</option>${UI.subjs.map(s=>`<option value="${esc(s.id)}" ${v.subj===s.id?"selected":""}>${esc(s.title)}</option>`).join("")}</select></div>
   <div class="field"><label for="tvW">Thời gian</label><select id="tvW">${[["all","Mọi lúc"],["week","Tuần này"],["next7","7 ngày tới"],["late","Quá hạn"],["nodue","Chưa có hạn"]].map(([k,l])=>`<option value="${k}" ${v.when===k?"selected":""}>${l}</option>`).join("")}</select></div></div></div>`,
   foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="tvOk">${t?"Lưu":"Thêm tab"}</button>`});
  $("#tvL").focus();$("#tvOk").onclick=()=>{const sj=subjOf($("#tvJ").value);const n={l:$("#tvL").value.trim()||(sj?(sj.code||sj.title):"Tab mới"),st:$("#tvS").value,subj:$("#tvJ").value,when:$("#tvW").value};
    if(t)Object.assign(t,n);else{const nv={id:mkid("tv"),...n};UI.dash.tviews.push(nv);UI.taskView=nv.id}saveDash();closeDialog();if(UI.view==="home")renderHome();else if(b)taskBlock(b)}}
function renderTasks(el,sid,view){
  if(!el)return;const today=ymd(new Date());const v=view||(sid?{st:"all",subj:sid,when:"all"}:curView());
  let L=UI.tasks.filter(t=>(!v.subj||t.subj===v.subj)&&(!sid||t.subj===sid));
  if(v.st==="todo")L=L.filter(t=>t.status!=="done");if(v.st==="done")L=L.filter(t=>t.status==="done");
  const wk=monday(new Date()),wkE=ymd(addD(wk,6)),n7=ymd(addD(new Date(),7));
  if(v.when==="week")L=L.filter(t=>t.due&&t.due>=ymd(wk)&&t.due<=wkE);if(v.when==="next7")L=L.filter(t=>t.due&&t.due>=today&&t.due<=n7);if(v.when==="late")L=L.filter(t=>t.status!=="done"&&t.due&&t.due<today);if(v.when==="nodue")L=L.filter(t=>!t.due);
  L.sort((a,b)=>(a.due||"9").localeCompare(b.due||"9"));
  el.innerHTML=L.length?L.map(t=>{const s=subjOf(t.subj);const late=t.status!=="done"&&t.due&&t.due<today;return `<div class="trow ${t.status==="done"?"done":""}"><input type="checkbox" class="chk" data-tk2="${esc(t.id)}" ${t.status==="done"?"checked":""} aria-label="Hoàn thành"><span class="tt-title">${esc(t.title)}</span><span class="tagc">${s?`<span class="tag" style="background:${s.color}">${esc(s.code||s.title)}</span>`:""}</span><span class="due ${late?"late":""}">${t.due?new Date(t.due+"T00:00").toLocaleDateString("vi-VN",{day:"numeric",month:"short"}):"—"}</span><button class="ghost ic" data-tdel="${esc(t.id)}" aria-label="Xóa">${ic("trash")}</button></div>`}).join(""):`<div class="empty">Không có bài tập nào trong tab này.</div>`;
  $$("[data-tk2]",el).forEach(x=>x.onchange=()=>Store.patch(x.dataset.tk2,{status:x.checked?"done":"todo"}));
  $$("[data-tdel]",el).forEach(b=>b.onclick=()=>Store.del(b.dataset.tdel));
}

/* ---------- widget nổi: an toàn, không làm hỏng cả lớp widget khi một widget lỗi ---------- */
function renderWidgets(){
  const L=$("#widgets");if(!L)return;
  Object.keys(WIDGETS).forEach(k=>{const st=D.widgets[k];let el=$(`.wdg[data-w="${k}"]`);
    const want=st&&st.on&&!(UI.dash&&hasBlock("w:"+k));
    if(!want){if(el){el.remove();killWidgetRun(_wRun[k]);delete _wRun[k]}return}
    if(!el){const w=WIDGETS[k];el=document.createElement("div");el.className="wdg";el.dataset.w=k;el.innerHTML=`<div class="wdg-h" tabindex="0" aria-label="${esc(w.title)} — kéo hoặc dùng phím mũi tên để di chuyển"><b>${w.t}</b><button data-m aria-label="Thu gọn">_</button><button data-x aria-label="Đóng">×</button></div><div class="wdg-b"></div>`;L.appendChild(el);
      try{_wRun[k]=w.build($(".wdg-b",el))}catch(e){console.warn(e);$(".wdg-b",el).innerHTML=`<div class="warnbox">Widget lỗi: ${esc(e.message||String(e))}</div>`}
      if(st.x==null||st.y==null){const n=$$(".wdg",L).length-1;st.x=innerWidth-250-(n%3)*240;st.y=innerHeight-260-Math.floor(n/3)*210}
      const h=$(".wdg-h",el);
      h.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;e.preventDefault();h.setPointerCapture(e.pointerId);el.classList.add("dragging");const ox=e.clientX-st.x,oy=e.clientY-st.y;const mv=ev=>{st.x=ev.clientX-ox;st.y=ev.clientY-oy;place()};const up=()=>{el.classList.remove("dragging");h.removeEventListener("pointermove",mv);h.removeEventListener("pointerup",up);saveDecor()};h.addEventListener("pointermove",mv);h.addEventListener("pointerup",up)});
      h.addEventListener("keydown",e=>{const d=e.shiftKey?40:10;const m={ArrowLeft:[-d,0],ArrowRight:[d,0],ArrowUp:[0,-d],ArrowDown:[0,d]}[e.key];if(!m)return;e.preventDefault();st.x+=m[0];st.y+=m[1];place();saveDecor()});
      $("[data-m]",el).onclick=()=>{st.min=!st.min;el.classList.toggle("min",st.min);saveDecor()};
      $("[data-x]",el).onclick=()=>setWidgetMode(k,"off")}
    const place=()=>{const w=Math.min(innerWidth,el.offsetWidth||230),hh=Math.min(innerHeight,el.offsetHeight||40);st.x=Math.max(0,Math.min(innerWidth-w,st.x));st.y=Math.max(0,Math.min(innerHeight-Math.min(hh,48),st.y));el.style.left=st.x+"px";el.style.top=st.y+"px"};
    el.classList.toggle("min",!!st.min);el.classList.toggle("float",!!D.float&&!st.min);requestAnimationFrame(place);place()});
}
function resetWidgetPos(){let n=0;Object.keys(WIDGETS).forEach(k=>{const st=D.widgets[k];if(st&&st.on){st.x=innerWidth-250-(n%3)*240;st.y=Math.max(70,innerHeight-260-Math.floor(n/3)*210);n++}});renderWidgets();saveDecor()}

/* =====================================================================
   SƠ ĐỒ TƯ DUY — làm lại: kéo để di chuyển, cuộn/nút để phóng to, thu gọn nhánh, vừa khung, tải PNG
   ===================================================================== */
function mmNorm(n,depth=0){if(n==null)return null;if(typeof n==="string"||typeof n==="number")return {t:String(n),c:[]};
  const t=n.t??n.title??n.text??n.label??n.name??n.topic??n.node??"";let kids=n.c??n.children??n.nodes??n.items??n.subtopics??n.branches??[];if(!Array.isArray(kids))kids=typeof kids==="object"?Object.values(kids):[];
  return {t:String(t||"(không tên)").replace(/\s+/g," ").trim(),c:depth>8?[]:kids.map(k=>mmNorm(k,depth+1)).filter(Boolean)}}
function mmColor(expr){const s=document.createElement("span");s.style.color=expr;s.style.display="none";document.body.appendChild(s);const c=getComputedStyle(s).color;s.remove();return c||expr}
function viewMind(a){
  const d=a.data||{};let root=d.root?mmNorm(d.root):(d.t||d.title&&(d.children||d.c)?mmNorm(d):null);
  if(!root&&Array.isArray(d.nodes))root={t:d.title||a.title,c:d.nodes.map(x=>mmNorm(x))};if(!root)root={t:a.title||"Sơ đồ",c:[]};
  let idc=0;const all=[];(function walk(n,dp,p){n._id=idc++;n._d=dp;n._p=p;all.push(n);n.c.forEach(c=>walk(c,dp+1,n))})(root,0,null);
  const closed=new Set(all.filter(n=>n._d>=2&&n.c.length).map(n=>n._id));
  UI.reopen=()=>viewMind(a);
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="mm2" id="mm2" tabindex="0" aria-label="Sơ đồ tư duy — kéo để di chuyển, cuộn để phóng to"><svg id="mmSvg" width="100%" height="100%"><g id="mmG"></g></svg>
    <div class="mm-ctl" role="toolbar" aria-label="Điều khiển sơ đồ"><button id="mmEx" title="Mở rộng / thu gọn tất cả" aria-label="Mở rộng hoặc thu gọn tất cả"><svg viewBox="0 0 24 24" class="i"><path d="M7 9l5-5 5 5M7 15l5 5 5-5"/></svg></button><span class="sep"></span><button id="mmIn" aria-label="Phóng to">${ic("plus")}</button><button id="mmPct" class="pct" aria-label="Vừa khung">100%</button><button id="mmOut" aria-label="Thu nhỏ">${ic("min")}</button><span class="sep"></span><button id="mmFit" title="Vừa khung" aria-label="Vừa khung">${ic("expand")}</button><button id="mmDl" title="Tải ảnh PNG" aria-label="Tải ảnh PNG">${ic("dl")}</button></div>
    <div class="mm-pop" id="mmPop" hidden></div><div class="mm-hint muted">Kéo nền để di chuyển · cuộn để phóng to · bấm ‹ › để mở/thu nhánh · bấm một mục để hỏi trợ lý</div></div>`});
  bindSrcList(a);
  const host=$("#mm2"),svg=$("#mmSvg"),G=$("#mmG");
  const css=getComputedStyle(document.documentElement);const fontFam=css.getPropertyValue("--f-body")||"system-ui";
  const COL=[mmColor("color-mix(in srgb, var(--accent) 30%, var(--panel))"),mmColor("color-mix(in srgb, var(--sig) 24%, var(--panel))"),mmColor("color-mix(in srgb, var(--ok) 22%, var(--panel))"),mmColor("color-mix(in srgb, var(--ok) 14%, var(--panel))")];
  const EDGE=[mmColor("color-mix(in srgb, var(--accent) 55%, var(--line))"),mmColor("color-mix(in srgb, var(--sig) 55%, var(--line))"),mmColor("color-mix(in srgb, var(--ok) 50%, var(--line))")];
  const INK=mmColor("var(--ink)"),SEL=mmColor("var(--accent)"),BG=mmColor("var(--panel2)"),TOG=mmColor("var(--panel)"),MUT=mmColor("var(--muted)");
  const mc=document.createElement("canvas").getContext("2d");const FS=13.5,LH=18,MAXW=300,PADX=14,GAPX=56,GAPY=12;
  const measure=n=>{mc.font=`${n._d===0?600:500} ${n._d===0?15:FS}px ${fontFam}`;const words=n.t.split(" ");const lines=[];let cur="";words.forEach(w=>{const tr=cur?cur+" "+w:w;if(mc.measureText(tr).width>MAXW-PADX*2&&cur){lines.push(cur);cur=w}else cur=tr});if(cur)lines.push(cur);
    n._lines=lines;n._w=Math.ceil(Math.min(MAXW,Math.max(...lines.map(l=>mc.measureText(l).width))+PADX*2));n._h=lines.length*LH+16};
  all.forEach(measure);
  let Z=1,TX=40,TY=40,sel=null;const kids=n=>closed.has(n._id)?[]:n.c;
  const layout=()=>{let y=0;const lay=(n,x)=>{n._x=x;const k=kids(n);if(!k.length){n._y=y;y+=n._h+GAPY}else{k.forEach(c=>lay(c,x+n._w+GAPX+(n.c.length?14:0)));const top=k[0]._y+k[0]._h/2,bot=k[k.length-1]._y+k[k.length-1]._h/2;n._y=(top+bot)/2-n._h/2;if(n._y<0){}}};lay(root,0)};
  const vis=()=>{const out=[];(function f(n){out.push(n);kids(n).forEach(f)})(root);return out};
  const apply=()=>{G.setAttribute("transform",`translate(${TX},${TY}) scale(${Z})`);$("#mmPct").textContent=Math.round(Z*100)+"%";placePop()};
  const draw=()=>{layout();const V=vis();let o="";
    V.forEach(n=>kids(n).forEach(c=>{const x1=n._x+n._w+(n.c.length?14:0),y1=n._y+n._h/2,x2=c._x,y2=c._y+c._h/2,mx=(x1+x2)/2;o+=`<path d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}" fill="none" stroke="${EDGE[Math.min(2,n._d)]}" stroke-width="1.6"/>`}));
    V.forEach(n=>{const s=sel===n;o+=`<g class="mmn" data-n="${n._id}"><rect x="${n._x}" y="${n._y}" width="${n._w}" height="${n._h}" rx="9" fill="${COL[Math.min(3,n._d)]}" stroke="${s?SEL:"transparent"}" stroke-width="2"/>${n._lines.map((l,i)=>`<text x="${n._x+PADX}" y="${n._y+8+LH*(i+1)-5}" font-size="${n._d===0?15:FS}" font-weight="${n._d===0?600:500}" fill="${INK}" font-family="${esc(fontFam)}">${esc(l)}</text>`).join("")}</g>`;
      if(n.c.length){const cx=n._x+n._w+8,cy=n._y+n._h/2;o+=`<g class="mmt" data-t="${n._id}" role="button" aria-label="${closed.has(n._id)?"Mở":"Thu gọn"} nhánh ${esc(n.t)}"><circle cx="${cx}" cy="${cy}" r="9" fill="${TOG}" stroke="${EDGE[Math.min(2,n._d)]}"/><text x="${cx}" y="${cy+4.5}" text-anchor="middle" font-size="13" fill="${MUT}" font-family="${esc(fontFam)}">${closed.has(n._id)?"›":"‹"}</text></g>`}});
    G.innerHTML=o;apply()};
  const bounds=()=>{const V=vis();return {x0:Math.min(...V.map(n=>n._x)),y0:Math.min(...V.map(n=>n._y)),x1:Math.max(...V.map(n=>n._x+n._w+(n.c.length?24:0))),y1:Math.max(...V.map(n=>n._y+n._h))}};
  const fit=()=>{const b=bounds(),W=host.clientWidth||800,H=host.clientHeight||500;Z=Math.max(.3,Math.min(1.15,Math.min((W-60)/(b.x1-b.x0),(H-90)/(b.y1-b.y0))));TX=(W-(b.x1-b.x0)*Z)/2-b.x0*Z;TY=(H-(b.y1-b.y0)*Z)/2-b.y0*Z-12;apply()};
  const zoomAt=(f,cx,cy)=>{const nz=Math.max(.2,Math.min(3,Z*f));TX=cx-(cx-TX)*nz/Z;TY=cy-(cy-TY)*nz/Z;Z=nz;apply()};
  const toggle=n=>{const ox=n._x*Z+TX,oy=(n._y+n._h/2)*Z+TY;closed.has(n._id)?closed.delete(n._id):closed.add(n._id);draw();TX+=ox-(n._x*Z+TX);TY+=oy-((n._y+n._h/2)*Z+TY);apply()};
  function placePop(){const p=$("#mmPop");if(!p)return;if(!sel){p.hidden=true;return}p.hidden=false;const x=(sel._x)*Z+TX,y=(sel._y+sel._h)*Z+TY+6;p.style.left=Math.max(8,Math.min(host.clientWidth-p.offsetWidth-8,x))+"px";p.style.top=Math.max(8,Math.min(host.clientHeight-p.offsetHeight-8,y))+"px"}
  const select=n=>{sel=n;const p=$("#mmPop");const path=[];let q=n;while(q){path.unshift(q.t);q=q._p}
    p.innerHTML=`<b>${esc(n.t)}</b><div class="row"><button class="btn primary" id="mmAsk">${ic("chat")} Hỏi trợ lý về mục này</button>${n.c.length?`<button class="btn" id="mmTg">${closed.has(n._id)?"Mở nhánh":"Thu nhánh"}</button>`:""}<button class="ghost ic" id="mmX" aria-label="Đóng">${ic("close")}</button></div>`;
    draw();$("#mmAsk").onclick=()=>{closeViewer();chatSend(`Giải thích "${n.t}" (trong ngữ cảnh: ${path.join(" › ")}) dựa trên nguồn, kèm ví dụ.`)};const tg=$("#mmTg");if(tg)tg.onclick=()=>{toggle(n);select(n)};$("#mmX").onclick=()=>{sel=null;draw()}};
  /* tương tác */
  let pan=null,moved=false;
  svg.addEventListener("pointerdown",e=>{moved=false;pan={x:e.clientX,y:e.clientY,tx:TX,ty:TY,id:e.pointerId};host.classList.add("panning")});
  svg.addEventListener("pointermove",e=>{if(!pan)return;const dx=e.clientX-pan.x,dy=e.clientY-pan.y;if(!moved&&Math.hypot(dx,dy)>4){moved=true;try{svg.setPointerCapture(pan.id)}catch(_){}}if(moved){TX=pan.tx+dx;TY=pan.ty+dy;apply()}});
  const endPan=e=>{host.classList.remove("panning");if(pan&&!moved){const t=e.target.closest&&e.target.closest("[data-t]"),g=e.target.closest&&e.target.closest("[data-n]");if(t)toggle(all[+t.dataset.t]);else if(g)select(all[+g.dataset.n]);else if(sel){sel=null;draw()}}pan=null};
  svg.addEventListener("pointerup",endPan);svg.addEventListener("pointercancel",()=>{pan=null;host.classList.remove("panning")});
  host.addEventListener("wheel",e=>{e.preventDefault();const r=host.getBoundingClientRect();if(e.ctrlKey||e.metaKey||Math.abs(e.deltaY)>=Math.abs(e.deltaX)&&!e.shiftKey)zoomAt(Math.exp(-e.deltaY*.0015),e.clientX-r.left,e.clientY-r.top);else{TX-=e.deltaX||e.deltaY;apply()}},{passive:false});
  host.addEventListener("keydown",e=>{const W=host.clientWidth/2,H=host.clientHeight/2;if(e.key==="+"||e.key==="=")zoomAt(1.2,W,H);else if(e.key==="-")zoomAt(1/1.2,W,H);else if(e.key==="0")fit();else if(e.key.startsWith("Arrow")){TX+=e.key==="ArrowLeft"?40:e.key==="ArrowRight"?-40:0;TY+=e.key==="ArrowUp"?40:e.key==="ArrowDown"?-40:0;apply()}else return;e.preventDefault()});
  $("#mmIn").onclick=()=>zoomAt(1.2,host.clientWidth/2,host.clientHeight/2);$("#mmOut").onclick=()=>zoomAt(1/1.2,host.clientWidth/2,host.clientHeight/2);
  $("#mmPct").onclick=fit;$("#mmFit").onclick=fit;
  $("#mmEx").onclick=()=>{const anyClosed=closed.size>0;closed.clear();if(!anyClosed)all.filter(n=>n._d>=1&&n.c.length).forEach(n=>closed.add(n._id));draw();fit()};
  $("#mmDl").onclick=async()=>{const b=bounds();const pad=24,W=Math.ceil(b.x1-b.x0+pad*2),H=Math.ceil(b.y1-b.y0+pad*2),S=2;
    const s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="${BG}"/><g transform="translate(${pad-b.x0},${pad-b.y0})">${G.innerHTML}</g></svg>`;
    const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=W*S;c.height=H*S;const g=c.getContext("2d");g.scale(S,S);g.drawImage(img,0,0);c.toBlob(bl=>saveFile(slug(a.title||"so-do")+".png",bl,"image/png"),"image/png")};img.onerror=()=>saveFile(slug(a.title||"so-do")+".svg",s,"image/svg+xml");img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s)};
  draw();requestAnimationFrame(fit);
  try{const ro=new ResizeObserver(()=>{if(!document.body.contains(host)){ro.disconnect();return}fit()});ro.observe(host)}catch(e){}
}

UI.dash=normDash(local.get("dash",null));

/* =====================================================================
   v6 — KHỐI KÉO THẢ MƯỢT · RÚT GỌN / THU NHỎ / PHÓNG TO · CẢNH NỀN PIXEL
        · SƠ ĐỒ TƯ DUY CÓ CHUYỂN ĐỘNG · TỐI ƯU HIỆU NĂNG
   ===================================================================== */
const RM=()=>UI.reduceMotion||matchMedia("(prefers-reduced-motion: reduce)").matches;
UI.reduceMotion=local.get("reduceMotion",false);
const easeIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,easeOut=t=>1-Math.pow(1-t,3);
document.addEventListener("visibilitychange",()=>document.body.classList.toggle("tab-hidden",document.hidden));

/* ---------- gom các lần cập nhật dữ liệu vào một khung hình ---------- */
const _rvKinds=new Set();let _rvRaf=0;const _rv0=refreshViews;
refreshViews=function(kind){_rvKinds.add(kind||"*");if(_rvRaf)return;_rvRaf=requestAnimationFrame(()=>{_rvRaf=0;const ks=[..._rvKinds];_rvKinds.clear();
  if(UI.view==="home"&&$("#dgrid")){homeRefresh(ks);if(UI.fly==="books")renderFly()}else{const seen=new Set();ks.forEach(k=>{if(!seen.has(k)){seen.add(k);_rv0(k)}})}})};
const BLK_DEPS={nb:["recent","courses","addsrc","progress"],subj:["courses","tasks","addsrc","progress"],fold:["courses"],task:["tasks","week","cal","progress"],ev:["cal"],cal:["cal","week"],"*":Object.keys(BLK)};
function homeRefresh(kinds){const want=new Set();kinds.forEach(k=>(BLK_DEPS[k]||BLK_DEPS["*"]).forEach(x=>want.add(x)));
  UI.dash.blocks.forEach(b=>{if(want.has(b.k))renderBlockBody(b)});
  if(kinds.some(k=>k==="task"||k==="*")){const s=$("#hSub");if(s)s.textContent=homeSub()}}
function homeSub(){return `${new Date().toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})} · ${UI.tasks.filter(t=>t.status!=="done").length} bài tập cần làm`}
function renderBlockBody(b){const def=blkDef(b.k);const body=$(`[data-bb="${b.id}"]`);if(!def||!body||def.widget)return;
  const ae=document.activeElement;if(ae&&body.contains(ae)&&/INPUT|TEXTAREA|SELECT/.test(ae.tagName)){ae.addEventListener("blur",()=>setTimeout(()=>renderBlockBody(b),30),{once:true});return}
  try{def.body(body);bindHomeCommon(body)}catch(e){console.warn(e);body.innerHTML=`<div class="warnbox">Khối này gặp lỗi: ${esc(e.message||String(e))}</div>`}}

/* ---------- chuyển trang mượt ---------- */
function vt(fn){return function(...a){if(RM()||!document.startViewTransition||document.hidden)return fn.apply(this,a);let r;document.startViewTransition(()=>{r=fn.apply(this,a)});return r}}
goHome=vt(goHome);openSubject=vt(openSubject);goCal=vt(goCal);openNotebook=vt(openNotebook);

/* =====================================================================
   CẢNH NỀN PIXEL (vẽ bằng mã, không dùng ảnh của người khác)
   ===================================================================== */
const hex2=c=>{c=c.replace("#","");return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]};
function pxG(cv,w,h){cv.width=w;cv.height=h;const g=cv.getContext("2d",{willReadFrequently:true});g.imageSmoothingEnabled=false;return g}
function rngOf(seed){let s=[...String(seed)].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7)||7;return()=>(s=(s*16807)%2147483647)/2147483647}
const PR=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
const BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function vgrad(g,w,h,y0,y1,cols){const im=g.getImageData(0,0,w,h),d=im.data;const C=cols.map(hex2);const a=Math.max(0,Math.floor(y0)),b=Math.min(h,Math.ceil(y1));
  for(let y=a;y<b;y++){const t=(y-y0)/Math.max(1,y1-y0)*(C.length-1);const i=Math.min(C.length-2,Math.floor(t)),f=t-i;for(let x=0;x<w;x++){const c=f*16>BAYER[y%4][x%4]?C[i+1]:C[i];const k=(y*w+x)*4;d[k]=c[0];d[k+1]=c[1];d[k+2]=c[2];d[k+3]=255}}g.putImageData(im,0,0)}
function disc(g,cx,cy,r,c){g.fillStyle=c;for(let dy=-Math.floor(r);dy<=r;dy++){const hw=Math.floor(Math.sqrt(Math.max(0,r*r-dy*dy)));g.fillRect(Math.round(cx-hw),Math.round(cy+dy),hw*2+1,1)}}
function puff(g,x,y,s,cols,r){/* cols: [shadow, base, highlight] */const parts=[[-1.1,.15,.55],[-.45,-.25,.75],[.35,-.35,.85],[1.05,.05,.6],[.2,.25,.7],[-.6,.3,.6]];
  parts.forEach(([a,b,k])=>disc(g,x+a*s,y+b*s+2,k*s,cols[0]));parts.forEach(([a,b,k])=>disc(g,x+a*s,y+b*s,k*s,cols[1]));
  parts.slice(1,4).forEach(([a,b,k])=>disc(g,x+a*s-s*.15,y+b*s-s*.22,k*s*.55,cols[2]));if(r)for(let i=0;i<s*1.4;i++)PR(g,x+(r()-.5)*s*2.4,y+(r()-.2)*s*.8,1,1,cols[2])}
function sparkle(g,x,y,c,n=1){PR(g,x,y-n,1,2*n+1,c);PR(g,x-n,y,2*n+1,1,c)}
function xMark(g,x,y,c){for(let i=-2;i<=2;i++){PR(g,x+i,y+i,1,1,c);PR(g,x+i,y-i,1,1,c)}}
const SCENES={
 auto:{l:"Tự động (ngày/đêm)",draw(cv,w,h,seed){pixelScene(cv,{seed,night:isNightSkin(),w,h})}},
 day:{l:"Phố anh đào",draw(cv,w,h,seed){pixelScene(cv,{seed,night:false,w,h})}},
 night:{l:"Phố đêm",draw(cv,w,h,seed){pixelScene(cv,{seed,night:true,w,h})}},
 beach:{l:"Bờ biển",draw(cv,w,h,seed){const g=pxG(cv,w,h),r=rngOf(seed+"b");const sh=x=>h*.34+x*(h*.42/w)+Math.sin(x/17)*3+Math.sin(x/7)*1.2;
   vgrad(g,w,h,0,h,["#7cb6c6","#8ec2cf","#a3cfd8","#b0bde0"]);for(let i=0;i<w*h/90;i++){const x=r()*w,y=r()*h*.9;if(y<sh(x)-4)PR(g,x,y,2+r()*9,1,r()<.5?"#c6e5ea":"#6ea6b9")}
   for(let x=0;x<w;x++){const s=sh(x);PR(g,x,s,1,h-s,"#dcbcc8");PR(g,x,s+h*.16+Math.sin(x/11)*2,1,h,"#f2d8d5")}
   const dg=g.getImageData(0,0,w,h);g.putImageData(dg,0,0);
   for(let x=0;x<w;x++){const s=sh(x);PR(g,x,s-2,1,3,"#f4fbfc");if(r()<.5)PR(g,x,s+2+Math.floor(r()*6),1,1,"#f4fbfc");if(r()<.35)PR(g,x,s-5-Math.floor(r()*5),1,1,"#e4f4f6");if(r()<.25)PR(g,x,s+5+r()*h*.12,1,1,"#e9cbd3")}
   for(let i=0;i<w*h/60;i++){const x=r()*w,y=r()*h;if(y>sh(x)+h*.18)PR(g,x,y,1,1,r()<.5?"#e8c6c4":"#fbe9e6")}
   const sx=w*.16,sy=h*.82;for(let a=0;a<7;a++){const an=Math.PI*(1.1+a*.12);for(let k=2;k<9;k++)PR(g,sx+Math.cos(an)*k,sy+Math.sin(an)*k,1,1,"#b4a4cc")}PR(g,sx-2,sy,5,1,"#b4a4cc")}},
 pinksky:{l:"Trời đêm hồng",draw(cv,w,h,seed){const g=pxG(cv,w,h),r=rngOf(seed+"p");vgrad(g,w,h,0,h*.85,["#a597d6","#b19ad6","#c9a2d4","#e7acc9","#f2b4c9"]);PR(g,0,h*.85,w,h,"#f2b4c9");
   for(let i=0;i<w*h/220;i++){const x=r()*w,y=r()*h*.8;r()<.15?sparkle(g,x,y,"#fff4fa",1+(r()<.3?1:0)):PR(g,x,y,1,1,"#efe2f7")}
   const mx=w*.84,my=h*.2,mr=Math.max(8,h*.11);for(let k=0;k<160;k++){const an=k/160*Math.PI*2;[1.35,1.6].forEach(f=>{if(k%3)PR(g,mx+Math.cos(an)*mr*f,my+Math.sin(an)*mr*f,1,1,"#c3b4e8")})}
   disc(g,mx,my,mr,"#fde8ef");disc(g,mx-mr*.42,my-mr*.32,mr*.9,"#b6a3db");
   puff(g,w*.22,h*.3,h*.07,["#c77aa6","#f0c6c4","#fbe9d8"],r);puff(g,w*.4,h*.27,h*.06,["#c77aa6","#f3cfc6","#fcefe1"],r);puff(g,w*.86,h*.5,h*.06,["#b9739f","#f2c3c3","#fbeadb"],r);puff(g,w*.1,h*.46,h*.05,["#c77aa6","#f5d8b8","#fdf0dc"],r);
   for(let i=0;i<7;i++)puff(g,w*(i/6)+(r()-.5)*20,h*.86+r()*h*.08,h*(.08+r()*.04),["#b8649b","#de8fbc","#f3b6d0"],r);
   const lx=Math.round(w*.23);PR(g,lx,h*.3,2,h*.5,"#5d5763");PR(g,lx-2,h*.79,6,3,"#5d5763");PR(g,lx,h*.3,16,1,"#5d5763");PR(g,lx+15,h*.3,1,4,"#5d5763");disc(g,lx+15,h*.3+7,4,"#fde8ef");disc(g,lx+8,h*.3+5,2.5,"#fde8ef");
   for(let k=0;k<40;k++){const an=k/40*Math.PI*2;PR(g,lx+15+Math.cos(an)*7,h*.3+7+Math.sin(an)*7,1,1,"#e9cfe8")}
   PR(g,lx+3,h*.42,20,11,"#c4a4cc");PR(g,lx+4,h*.42+1,18,9,"#fbeef1");PR(g,lx+2,h*.43,1,2,"#5d5763");PR(g,lx+2,h*.48,1,2,"#5d5763");disc(g,lx+13,h*.42+5,2.5,"#e98fb5")}},
 desk:{l:"Desktop pastel",draw(cv,w,h,seed){const g=pxG(cv,w,h),r=rngOf(seed+"d");vgrad(g,w,h,0,h,["#c9dcfa","#dbe6fb","#ebeefb","#f5e6f3"]);const OL="#7380bd";
   const bank=(y0,up)=>{for(let i=0;i<9;i++){const x=i*w/8+(r()-.5)*14,y=y0+(r()-.5)*8,s=h*(.07+r()*.05);disc(g,x,y,s+1,OL)}for(let i=0;i<9;i++){}};
   const cloudRow=(y0,flip)=>{const pts=[];for(let i=0;i<10;i++)pts.push([i*w/9+(r()-.5)*12,y0+(r()-.5)*10,h*(.06+r()*.05)]);pts.forEach(([x,y,s])=>disc(g,x,y,s+1,OL));pts.forEach(([x,y,s])=>disc(g,x,y,s,"#fbfcff"));
     pts.forEach(([x,y,s])=>{for(let dy=0;dy<s;dy++)for(let dx=-s;dx<s;dx+=1){const yy=flip?y-dy:y+dy*.9;if((Math.round(x+dx)+Math.round(yy))%2===0&&dx*dx+(yy-y)*(yy-y)<s*s*.8&&(flip?yy<y-s*.3:yy>y+s*.25))PR(g,x+dx,yy,1,1,"#dbe4fa")}})};
   const win=(x,y,ww,hh,tc)=>{PR(g,x-1,y-1,ww+2,hh+2,OL);PR(g,x,y,ww,hh,"#fbfcff");PR(g,x,y,ww,6,tc);PR(g,x,y+6,ww,1,OL);[2,6,10].forEach(o=>PR(g,x+3+o,y+2,2,2,"#fbfcff"))};
   cloudRow(h*.05,true);win(w*.08,h*.18,w*.5,h*.5,"#f5b9d6");win(w*.62,h*.14,w*.3,h*.24,"#f5b9d6");win(w*.56,h*.5,w*.34,h*.34,"#b6c8f2");win(w*.18,h*.58,w*.3,h*.2,"#b6c8f2");
   PR(g,w*.27,h*.42,w*.12,h*.06,OL);PR(g,w*.27+1,h*.42+1,w*.12-2,h*.06-2,"#fbfcff");PR(g,w*.27+2,h*.42+2,(w*.12-4)*.55,h*.06-4,"#a7bdf0");
   const fold=(x,y,c)=>{PR(g,x,y,8,6,OL);PR(g,x+1,y+1,6,4,c);PR(g,x,y-1,3,1,OL)};fold(w*.94,h*.3,"#f5b9d6");fold(w*.94,h*.4,"#b6c8f2");fold(w*.03,h*.32,"#f5b9d6");
   const mail=(x,y)=>{PR(g,x,y,9,6,OL);PR(g,x+1,y+1,7,4,"#fdf0f6");PR(g,x+1,y+1,1,1,OL);PR(g,x+7,y+1,1,1,OL);PR(g,x+4,y+3,1,1,OL)};mail(w*.2,h*.62);mail(w*.6,h*.56);
   const bub=(x,y)=>{PR(g,x,y,9,7,OL);PR(g,x+1,y+1,7,5,"#fff");PR(g,x+2,y+7,2,2,OL);PR(g,x+3,y+2,1,1,"#f08bb8");PR(g,x+5,y+2,1,1,"#f08bb8");PR(g,x+3,y+3,3,1,"#f08bb8");PR(g,x+4,y+4,1,1,"#f08bb8")};bub(w*.3,h*.13);bub(w*.66,h*.08);
   cloudRow(h*.95,false);for(let i=0;i<14;i++){const x=r()*w,y=r()*h;r()<.4?xMark(g,x,y,r()<.5?"#f08bb8":"#8aa0e0"):sparkle(g,x,y,"#9fb2ea",1)}}},
 sunset:{l:"Phố hoàng hôn",draw(cv,w,h,seed){const g=pxG(cv,w,h),r=rngOf(seed+"s");vgrad(g,w,h,0,h*.62,["#5fae9f","#76bcae","#9fcab8","#f1c5ad","#f2a7b8"]);PR(g,0,h*.62,w,h,"#f2a7b8");
   for(let i=0;i<w*h/160;i++){const x=r()*w,y=r()*h*.35;PR(g,x,y,1,1,r()<.8?"#e8f6f2":"#fff")}disc(g,w*.7,h*.08,3,"#cdeee6");
   [[.75,.28,.07],[.9,.4,.06],[.55,.42,.05],[.15,.2,.04],[.65,.5,.05]].forEach(([a,b,s])=>puff(g,w*a,h*b,h*s,["#c48fc8","#f3a9c2","#fbd2d6"],r));
   for(let x=0;x<w*.72;x+=6+Math.floor(r()*8)){const bh=h*(.06+r()*.12),bw=5+r()*10;PR(g,x,h*.62-bh,bw,bh+2,"#a3a7cc");for(let k=0;k<3;k++)PR(g,x+1+r()*(bw-2),h*.62-bh+2+r()*(bh-3),1,1,"#f6e1c6")}
   PR(g,0,h*.62,w,h*.38,"#b9b4d4");PR(g,0,h*.86,w,h,"#a8a3c6");for(let x=0;x<w;x+=14)PR(g,x,h*.74,7,1,"#cdc9e2");
   const sx=w*.6;PR(g,sx,h*.3,w*.4,h*.56,"#f3dcd6");PR(g,sx,h*.3,w*.4,3,"#e9c6c3");PR(g,sx,h*.42,w*.4,4,"#5db3ab");for(let k=0;k<w*.4;k+=4)PR(g,sx+k,h*.42+4,2,1,"#5db3ab");
   PR(g,sx+w*.18,h*.48,w*.18,h*.38,"#bfe4e0");PR(g,sx+w*.27,h*.48,1,h*.38,"#8fbcb8");
   PR(g,sx+w*.03,h*.52,w*.11,h*.34,"#f29fb2");PR(g,sx+w*.03+2,h*.55,w*.11-4,h*.14,"#fbe7ee");for(let yy=0;yy<4;yy++)for(let xx=0;xx<5;xx++)PR(g,sx+w*.03+3+xx*((w*.11-6)/5),h*.56+yy*(h*.03),2,2,["#7fc7c0","#f2c26a","#e77fa0","#8fb0e8"][(xx+yy)%4]);
   [w*.83,w*.9].forEach((px,i)=>{PR(g,px,h*.12+i*4,2,h*.5,"#866d6d");PR(g,px-4,h*.16+i*4,10,1,"#866d6d");PR(g,px-3,h*.2+i*4,8,1,"#866d6d")});
   for(let x=0;x<w*.83;x++){const t=x/(w*.83);PR(g,x,h*.16+Math.sin(t*Math.PI)*h*.05+t*2,1,1,"#866d6d");PR(g,x,h*.2+Math.sin(t*Math.PI)*h*.06+t*2,1,1,"#9a8384")}
   PR(g,w*.06,h*.35,3,h*.5,"#6e5a58");for(let i=0;i<8;i++)puff(g,w*.07+(r()-.5)*w*.12,h*.3+(r()-.5)*h*.2,h*.05,["#3f7a5e","#5c9a74","#7cb68a"]);for(let i=0;i<40;i++)PR(g,w*.07+(r()-.5)*w*.2,h*.3+(r()-.5)*h*.28,1,1,"#f3a3c0")}},
 cottage:{l:"Vườn hoa tím",draw(cv,w,h,seed){const g=pxG(cv,w,h),r=rngOf(seed+"c");vgrad(g,w,h,0,h*.7,["#9fb9e4","#b3c3ec","#c9c6ee","#ecc3dc"]);PR(g,0,h*.7,w,h,"#ecc3dc");
   disc(g,w*.82,h*.14,h*.07+3,"#d9dcf6");disc(g,w*.82,h*.14,h*.07,"#f7f5fc");
   for(let i=0;i<10;i++)puff(g,w*(.3+i*.08),h*.58+r()*6,h*.08,["#8ea4cf","#9fb3d9","#b0c2e2"]);
   PR(g,0,h*.66,w,h,"#a9c4d6");for(let i=0;i<w*h/50;i++){const x=r()*w,y=h*.66+r()*h*.34;PR(g,x,y,1,1,r()<.5?"#9ab8cc":"#bcd3e0")}
   const hx=w*.36,hy=h*.32,hw=w*.38,hh=h*.36;PR(g,hx,hy,hw,hh,"#bcd5ea");PR(g,hx,hy,hw,2,"#a9c3dc");for(let i=0;i<hw/2;i++){PR(g,hx-4+i,hy-i*.5,hw+8-i*2,1,"#8e9bc4")}
   PR(g,hx-3,hy+hh*.42,hw+6,3,"#e8eef7");for(let k=0;k<hw+6;k+=4)PR(g,hx-3+k,hy+hh*.3,1,hh*.12,"#e8eef7");
   [[.1,.08],[.62,.08],[.12,.58],[.62,.58]].forEach(([a,b])=>{PR(g,hx+hw*a-1,hy+hh*b-1,hw*.22+2,hh*.22+2,"#f4f6fb");PR(g,hx+hw*a,hy+hh*b,hw*.22,hh*.22,"#f6c6d8");PR(g,hx+hw*a+hw*.11,hy+hh*b,1,hh*.22,"#f4f6fb")});
   PR(g,hx+hw*.4,hy+hh*.55,hw*.16,hh*.45,"#a6c4de");for(let k=0;k<=24;k++){const t=k/24;PR(g,hx+t*hw,hy+hh*.02+Math.sin(t*Math.PI)*hh*.12,1,1,"#ffe7b3")}
   PR(g,w*.1,h*.3,4,h*.5,"#8a79a8");for(let i=0;i<16;i++)puff(g,w*.1+(r()-.5)*w*.3,h*.22+(r()-.5)*h*.3,h*.05,["#e2b4d6","#f5d4e8","#fff1f8"]);
   for(let i=0;i<70;i++)PR(g,r()*w*.3,r()*h*.6,1,1,"#ffffff");
   for(let i=0;i<14;i++)puff(g,r()*w,h*.88+r()*h*.1,h*.04,["#7fa6a6","#93baba","#a9cccc"]);for(let i=0;i<w*.7;i++)PR(g,r()*w,h*.8+r()*h*.2,1,1,["#f7b7d0","#ffffff","#e99ac0","#f8e1ee"][i%4]);
   for(let i=0;i<5;i++)PR(g,w*.55+i*w*.06,h*.78+i*h*.04,w*.05,h*.025,"#dcd8f0")}}
};
const _sceneCache=new Map();
function sceneCanvas(id,w,h,seed){const key=[id,w,h,seed,id==="auto"?isNightSkin():""].join("|");let c=_sceneCache.get(key);if(c)return c;c=document.createElement("canvas");try{(SCENES[id]||SCENES.auto).draw(c,w,h,seed)}catch(e){console.warn(e);SCENES.auto.draw(c,w,h,seed)}_sceneCache.set(key,c);if(_sceneCache.size>40)_sceneCache.delete(_sceneCache.keys().next().value);return c}
const _sceneURL=new Map();function sceneURL(id,w,h,seed){const k=[id,w,h,seed,isNightSkin()].join("|");if(!_sceneURL.has(k))_sceneURL.set(k,sceneCanvas(id,w,h,seed).toDataURL());return _sceneURL.get(k)}

/* ---------- lựa chọn nền: cảnh pixel hoặc ảnh của bạn ---------- */
UI.bg=Object.assign({sel:"auto",wall:false,dim:.25,fx:true,pix:false,customs:[]},local.get("bg",{}));
let _sbgT=0;function saveBg(){const b=UI.bg;const lite={...b,customs:b.customs.map(c=>({id:c.id,url:c.url.length<4000?c.url:"",name:c.name}))};try{local.set("bg",lite)}catch(e){}clearTimeout(_sbgT);_sbgT=setTimeout(()=>Store.put("bg-me",{type:"bg",sel:b.sel,wall:!!b.wall,dim:+b.dim,fx:!!b.fx,pix:!!b.pix,customs:b.customs.map(c=>({id:c.id,url:c.url,name:c.name||"",asset:c.asset||null}))}).catch(e=>{console.warn(e);toast("Chưa lưu được hình nền")}),600)}
async function loadBg(){try{const d=await Store.get("bg-me");if(d){UI.bg={sel:d.sel||"auto",wall:!!d.wall,dim:d.dim??.25,fx:d.fx!==false,pix:!!d.pix,customs:Array.isArray(d.customs)?d.customs.filter(c=>c&&c.url):[]};applyBg();if(UI.view==="home")drawBanner()}}catch(e){}}
function bgSrc(){const s=UI.bg.sel;if(s.startsWith("c:")){const c=UI.bg.customs.find(x=>"c:"+x.id===s);if(c)return {img:c.url}}return {scene:SCENES[s]?s:"auto"}}
function applyBg(){let w=$("#wall");if(!w){w=document.createElement("div");w.id="wall";w.setAttribute("aria-hidden","true");document.body.prepend(w)}
  const on=!!UI.bg.wall;document.body.classList.toggle("has-wall",on);w.hidden=!on;if(!on){w.innerHTML="";return}
  const src=bgSrc();let url;if(src.img)url=src.img;else{const W=innerWidth>=innerHeight?320:180,H=Math.round(W*innerHeight/Math.max(1,innerWidth));url=sceneURL(src.scene,W,Math.max(90,Math.min(600,H)),local.get("bnrSeed","so-hoc"))}
  w.style.setProperty("--wall",`url("${url}")`);w.classList.toggle("px",!src.img||!!UI.bg.pix);w.style.setProperty("--dim",Math.round(UI.bg.dim*100)+"%");
  const fx=UI.bg.fx&&!RM();if(fx&&!w.querySelector("i")){w.innerHTML=Array.from({length:14},(_,i)=>`<i style="left:${(i*37)%100}%;top:${(i*53)%90}%;animation-delay:${-(i*1.3)%7}s;animation-duration:${5+(i%5)}s"></i>`).join("")}else if(!fx)w.innerHTML=""}
let _bgRz=0;addEventListener("resize",()=>{clearTimeout(_bgRz);_bgRz=setTimeout(()=>{if(UI.bg.wall)applyBg()},250)});
function drawBanner(){const cv=$("#bnr");if(!cv)return;const src=bgSrc();const b=cv.closest(".banner");
  if(UI.bg.wall){b.classList.add("on-wall");return}b.classList.remove("on-wall");
  if(src.img){cv.hidden=true;b.style.setProperty("--bimg",`url("${src.img}")`);b.classList.add("img");b.classList.toggle("px",!!UI.bg.pix);return}
  cv.hidden=false;b.classList.remove("img");const c=sceneCanvas(src.scene,320,90,local.get("bnrSeed","so-hoc"));cv.width=c.width;cv.height=c.height;cv.getContext("2d").drawImage(c,0,0)}
async function addCustomBg(files){
  for(const f of files.filter(f=>/^image\//.test(f.type)).slice(0,4)){try{const i=await loadImg(await fileToURL(f));const max=UI.bg.pix?480:1920;const k=Math.min(1,max/Math.max(i.naturalWidth,i.naturalHeight));const c=document.createElement("canvas");c.width=Math.round(i.naturalWidth*k);c.height=Math.round(i.naturalHeight*k);const g=c.getContext("2d");g.imageSmoothingQuality="high";g.drawImage(i,0,0,c.width,c.height);
    const id=mkid("bg");let url=null,asset=null;
    if(P.assets&&!P.local){try{const blob=await new Promise(r=>c.toBlob(r,"image/jpeg",.88));const up=await P.assets.upload(blob);url=up.url;asset=up.id}catch(e){url=null}}
    if(!url){let q=.86,o=c;for(let t=0;t<6;t++){url=o.toDataURL("image/jpeg",q);if(P.local||url.length<200000)break;q-=.12;if(q<.5){const n=document.createElement("canvas");n.width=Math.round(o.width*.75);n.height=Math.round(o.height*.75);n.getContext("2d").drawImage(o,0,0,n.width,n.height);o=n;q=.8}}}
    UI.bg.customs.push({id,url,asset,name:f.name});if(UI.bg.customs.length>8){const old=UI.bg.customs.shift();if(old.asset&&P.assets&&!P.local)P.assets.delete(old.asset).catch(()=>{})}UI.bg.sel="c:"+id}catch(e){toast("Không đọc được ảnh "+f.name)}}
  saveBg();applyBg();drawBanner();if(UI.fly==="skin")renderFly();toast("Đã đặt ảnh làm cảnh nền")}
function bgPickerHTML(){const seed=local.get("bnrSeed","so-hoc");
  return `<div class="bg-grid">${Object.entries(SCENES).map(([k,s])=>`<button class="bg-t" data-bgs="${k}" aria-pressed="${UI.bg.sel===k}" title="${esc(s.l)}"><img src="${sceneURL(k,160,90,seed)}" alt=""><span>${esc(s.l)}</span></button>`).join("")}
   ${UI.bg.customs.map(c=>`<button class="bg-t" data-bgs="c:${esc(c.id)}" aria-pressed="${UI.bg.sel==="c:"+c.id}" title="${esc(c.name||"Ảnh của bạn")}"><img src="${esc(c.url)}" alt="" style="image-rendering:auto;object-fit:cover"><span>${esc(c.name||"Ảnh của bạn")}</span><i class="del" data-bgdel="${esc(c.id)}" role="button" aria-label="Xóa ảnh nền">×</i></button>`).join("")}
   <label class="bg-t add" title="Tải ảnh của bạn">${ic("plus")}<span>Ảnh của bạn</span><input type="file" accept="image/*" multiple hidden data-bgf></label></div>
   <label class="chk-row"><input type="checkbox" class="chk" data-bgo="wall" ${UI.bg.wall?"checked":""}> Dùng làm hình nền toàn trang</label>
   <label class="chk-row"><input type="checkbox" class="chk" data-bgo="fx" ${UI.bg.fx?"checked":""}> Lấp lánh chuyển động trên nền</label>
   <label class="chk-row"><input type="checkbox" class="chk" data-bgo="pix" ${UI.bg.pix?"checked":""}> Pixel hóa ảnh tải lên</label>
   <div class="field"><label>Độ mờ nền (giúp chữ dễ đọc)</label><input type="range" min="0" max="0.7" step="0.05" value="${UI.bg.dim}" data-bgdim></div>
   <div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-bgseed>${ic("spark")} Vẽ lại cảnh khác</button></div>`}
function bindBgPicker(root,after){
  $$("[data-bgs]",root).forEach(b=>b.onclick=e=>{if(e.target.closest("[data-bgdel]"))return;UI.bg.sel=b.dataset.bgs;saveBg();applyBg();drawBanner();$$("[data-bgs]",root).forEach(x=>x.setAttribute("aria-pressed",x===b))});
  $$("[data-bgdel]",root).forEach(x=>x.onclick=e=>{e.stopPropagation();const id=x.dataset.bgdel;const c=UI.bg.customs.find(z=>z.id===id);UI.bg.customs=UI.bg.customs.filter(z=>z.id!==id);if(c&&c.asset&&P.assets&&!P.local)P.assets.delete(c.asset).catch(()=>{});if(UI.bg.sel==="c:"+id)UI.bg.sel="auto";saveBg();applyBg();drawBanner();after&&after()});
  const f=$("[data-bgf]",root);if(f)f.onchange=()=>addCustomBg([...f.files]).then(()=>after&&after());
  $$("[data-bgo]",root).forEach(x=>x.onchange=()=>{UI.bg[x.dataset.bgo]=x.checked;saveBg();applyBg();drawBanner();if(UI.view==="home"&&x.dataset.bgo==="wall")drawBanner()});
  const dm=$("[data-bgdim]",root);if(dm)dm.oninput=()=>{UI.bg.dim=+dm.value;applyBg();clearTimeout(dm._t);dm._t=setTimeout(saveBg,400)};
  const sd=$("[data-bgseed]",root);if(sd)sd.onclick=()=>{local.set("bnrSeed",Math.random().toString(36).slice(2));_sceneURL.clear();applyBg();drawBanner();after&&after()};
}
function bgPopover(anchor){const m=popMenu(anchor,`<div class="who">Cảnh nền</div><div class="bgpop">${bgPickerHTML()}</div>`);m.classList.add("wide");{const r=anchor.getBoundingClientRect(),w=m.offsetWidth,h=m.offsetHeight;m.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+"px";m.style.top=Math.max(8,Math.min(innerHeight-h-8,r.bottom+6))+"px"}m.addEventListener("click",e=>e.stopPropagation());
  bindBgPicker(m,()=>{closePop();bgPopover(anchor)});setTimeout(()=>{const off=e=>{if(!m.contains(e.target)){closePop();document.removeEventListener("pointerdown",off,true)}};document.addEventListener("pointerdown",off,true)},0)}
/* thêm mục cảnh nền vào bảng “Giao diện & màu” */
const _renderFly8=renderFly;
renderFly=function(){_renderFly8();if(UI.fly!=="skin")return;const f=$(".flyout");if(!f)return;const sec=document.createElement("div");sec.className="fly-bg";
  sec.innerHTML=`<h4 style="margin:6px 0 0;font-size:14px">Cảnh nền</h4>${bgPickerHTML()}<label class="chk-row"><input type="checkbox" class="chk" id="rmOn" ${UI.reduceMotion?"checked":""}> Giảm chuyển động (máy yếu)</label>`;f.appendChild(sec);
  bindBgPicker(sec,()=>renderFly());$("#rmOn",sec).onchange=e=>{UI.reduceMotion=e.target.checked;local.set("reduceMotion",UI.reduceMotion);document.body.classList.toggle("rm",UI.reduceMotion);applyBg()}};
document.body.classList.toggle("rm",UI.reduceMotion);

/* =====================================================================
   TRANG CHỦ: khối có thể kéo lên/xuống, rút gọn, thu nhỏ, phóng to
   ===================================================================== */
function renderHome(){
  if(UI.view!=="home")return;const ae=document.activeElement;if(ae&&$("#main").contains(ae)&&(/INPUT|TEXTAREA|SELECT/.test(ae.tagName)||ae.isContentEditable)){if(!UI._homePend){UI._homePend=true;ae.addEventListener("blur",()=>{UI._homePend=false;setTimeout(renderHome,30)},{once:true})}return}
  if(!UI.dash)UI.dash=normDash(local.get("dash",null));$$("body>.blk.maxed,.blk-shade").forEach(x=>x.remove());
  const keep=$(".dash")?$(".dash").scrollTop:0;
  const name=(UI.profile&&UI.profile.name)||(P.me&&P.me.name)||"bạn";const ed=UI.dashEdit;
  [..._wBlk.keys()].forEach(k=>{if(!hasBlock("w:"+k))dropWidgetBlock(k)});
  const etools=b=>ed?`<span class="blk-tools"><button data-bt="l" aria-label="Sang trái" title="Sang trái">←</button><button data-bt="u" aria-label="Lên trên" title="Lên trên">↑</button><button data-bt="d" aria-label="Xuống dưới" title="Xuống dưới">↓</button><button data-bt="r" aria-label="Sang phải" title="Sang phải">→</button><button data-bt="w" aria-label="Đổi độ rộng" title="Đổi độ rộng">${W_LBL[b.w]}</button><button data-bt="x" aria-label="Ẩn khối" title="Ẩn khối" class="x">✕</button></span>`:"";
  const ctl=b=>`<span class="blk-ctl"><button data-bc="grip" class="grip" aria-label="Kéo để di chuyển khối" title="Kéo để di chuyển (lên/xuống/trái/phải)">⠿</button><button data-bc="col" aria-label="${b.c?"Mở rộng khối":"Rút gọn khối"}" title="${b.c?"Mở rộng":"Rút gọn"}" aria-expanded="${!b.c}"><svg viewBox="0 0 24 24" class="i chev"><path d="M6 9l6 6 6-6"/></svg></button><button data-bc="min" aria-label="Thu nhỏ khối xuống khay" title="Thu nhỏ">${ic("min")}</button><button data-bc="max" aria-label="Phóng to khối" title="Phóng to">${ic("expand")}</button></span>`;
  const shown=UI.dash.blocks.filter(b=>!b.m);const mins=UI.dash.blocks.filter(b=>b.m);
  const blocks=shown.map(b=>{const def=blkDef(b.k);if(!def)return"";const cls=`blk ${def.small?"panel-box":"sec"} ${ed?"editing":""} ${b.c?"collapsed":""}`;
    const head=def.small?`<h4 class="blk-h">${ic(def.i)} <span class="bt">${esc(def.l)}</span><span class="grow"></span>${etools(b)}${ctl(b)}</h4>`:`<div class="sec-h blk-h"><span class="ico">${ic(def.i)}</span><span class="bt">${esc(def.l)}</span><span class="grow"></span>${ed?"":def.act||""}${etools(b)}${ctl(b)}</div>`;
    return `<section class="${cls}" data-bid="${esc(b.id)}" style="--w:${b.w}">${head}<div class="blk-wrap"><div class="blk-in"><div class="blk-b" data-bb="${esc(b.id)}"></div></div></div></section>`}).join("");
  $("#main").innerHTML=`<div class="dash"><div class="dash-in">
   <div class="banner"><canvas id="bnr" aria-hidden="true"></canvas><div class="hello"><h1>Chào <span class="hname" id="hName" title="Bấm để sửa tên" tabindex="0" role="button">${esc(name)}</span> ♡<button class="ghost ic hn-ed" id="hNameEd" aria-label="Sửa tên">${ic("edit")}</button></h1><span id="hSub">${homeSub()}</span></div><div class="bnr-act"><button class="pill-btn" id="dEdit">${ic(ed?"check":"edit")} ${ed?"Xong":"Tùy chỉnh"}</button><button class="pill-btn" id="bnrSeed">${ic("image")} Cảnh nền</button></div></div>
   ${ed?`<div class="dash-editbar">${ic("edit")}<span>Kéo <b>⠿</b> để đổi vị trí, nút ⅓/½/⅔ đổi độ rộng, ✕ để ẩn khối.</span><span class="grow"></span><button class="btn" id="dAdd">${ic("plus")} Thêm khối</button><button class="btn" id="dBars">${ic("more")} Thanh công cụ</button><button class="btn" id="dReset">Mặc định</button><button class="btn primary" id="dDone">${ic("check")} Xong</button></div>`:""}
   ${mins.length?`<div class="min-tray" role="toolbar" aria-label="Khối đã thu nhỏ"><span class="muted">Đã thu nhỏ:</span>${mins.map(b=>{const d=blkDef(b.k);return d?`<button class="min-chip" data-restore="${esc(b.id)}">${ic(d.i)}${esc(d.l)}</button>`:""}).join("")}</div>`:""}
   <div class="dgrid" id="dgrid">${blocks}${ed?`<button class="blk add-blk" id="dAdd2" style="--w:2">${ic("plus")}<b>Thêm khối</b><small>Bài tập, lịch, widget đồng hồ, Pomodoro, giấy nhớ…</small></button>`:""}</div>
  </div></div>`;
  $(".dash").scrollTop=keep;drawBanner();
  $("#bnrSeed").onclick=e=>{e.stopPropagation();bgPopover(e.currentTarget)};
  $("#dEdit").onclick=()=>{UI.dashEdit=!UI.dashEdit;renderHome()};
  if(ed){$("#dDone").onclick=()=>{UI.dashEdit=false;renderHome()};$("#dAdd").onclick=e=>addBlockMenu(e.currentTarget);$("#dAdd2").onclick=e=>addBlockMenu(e.currentTarget);$("#dBars").onclick=barsDialog;
    $("#dReset").onclick=()=>confirmDialog("Khôi phục bố cục mặc định?","Các khối trên trang chủ trở lại như ban đầu. Dữ liệu bài tập, môn học không bị ảnh hưởng.","Khôi phục",()=>{UI.dash.blocks=DASH_DEF().blocks;saveDash();renderHome()})}
  const hn=$("#hName");const startEdit=()=>{hn.contentEditable="true";hn.focus();const r=document.createRange();r.selectNodeContents(hn);const s=getSelection();s.removeAllRanges();s.addRange(r)};
  hn.onclick=startEdit;$("#hNameEd").onclick=startEdit;hn.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();hn.blur()}if(e.key==="Escape"){hn.textContent=name;hn.blur()}};
  hn.onblur=async()=>{hn.contentEditable="false";const v=hn.textContent.replace(/\s+/g," ").trim().slice(0,40);if(!v){hn.textContent=name;return}if(v===name)return;const pf={...(UI.profile||{}),name:v};delete pf.id;delete pf.type;UI.profile=pf;try{await Store.put("profile-me",{type:"profile",...pf});toast("Đã đổi tên hiển thị")}catch(e){toast("Không lưu được tên")}};
  shown.forEach(b=>{const def=blkDef(b.k);const body=$(`[data-bb="${b.id}"]`);if(!def||!body)return;try{if(def.widget)body.appendChild(widgetBlockEl(def.widget));else def.body(body)}catch(e){console.warn(e);body.innerHTML=`<div class="warnbox">Khối này gặp lỗi: ${esc(e.message||String(e))}</div>`}});
  bindHomeCommon($("#main"));bindBlockCtl();if(ed)bindBlockTools();
  $$("[data-restore]").forEach(x=>x.onclick=()=>{const b=UI.dash.blocks.find(z=>z.id===x.dataset.restore);if(b){b.m=false;saveDash();renderHome();const el=$(`.blk[data-bid="${b.id}"]`);if(el){el.classList.add("pop-in");el.scrollIntoView({block:"nearest",behavior:RM()?"auto":"smooth"})}}});
}
function bindBlockCtl(){
  $$("#dgrid>.blk[data-bid]").forEach(el=>{const b=UI.dash.blocks.find(x=>x.id===el.dataset.bid);if(!b)return;
    $$("[data-bc]",el).forEach(x=>{const a=x.dataset.bc;
      if(a==="grip"){x.addEventListener("pointerdown",e=>startBlockDrag(e,el,b));x.addEventListener("keydown",e=>{const m={ArrowUp:"u",ArrowDown:"d",ArrowLeft:"l",ArrowRight:"r"}[e.key];if(m){e.preventDefault();moveBlock(b.id,m);const g=$(`.blk[data-bid="${b.id}"] [data-bc=grip]`);if(g)g.focus()}});return}
      x.onclick=e=>{e.stopPropagation();if(a==="col"){b.c=!b.c;el.classList.toggle("collapsed",b.c);x.setAttribute("aria-expanded",!b.c);x.title=b.c?"Mở rộng":"Rút gọn";saveDash()}
        if(a==="min"){el.classList.add("leaving");setTimeout(()=>{b.m=true;saveDash();renderHome()},RM()?0:180)}
        if(a==="max")maxBlock(el)}});
    $(".blk-h",el).addEventListener("dblclick",e=>{if(e.target.closest("button,a,input"))return;const c=$("[data-bc=col]",el);if(c)c.click()})});
}
function maxBlock(el){if(el.classList.contains("maxed"))return unmax(el);const r=el.getBoundingClientRect();const ph=document.createElement("div");ph.className="blk-ph";ph.style.cssText=`--w:${el.style.getPropertyValue("--w")};height:${r.height}px`;el.after(ph);el._ph=ph;
  const sh=document.createElement("div");sh.className="blk-shade";sh.onclick=()=>unmax(el);document.body.appendChild(sh);el._sh=sh;document.body.appendChild(el);el.classList.add("maxed");
  if(!RM()){const r2=el.getBoundingClientRect();el.animate([{transform:`translate(${r.left-r2.left}px,${r.top-r2.top}px) scale(${r.width/r2.width},${r.height/r2.height})`,transformOrigin:"0 0"},{transform:"none",transformOrigin:"0 0"}],{duration:280,easing:"cubic-bezier(.2,.8,.2,1)"})}
  const btn=$("[data-bc=max]",el);if(btn){btn.innerHTML=ic("close");btn.title="Thu về";btn.setAttribute("aria-label","Thu về")}
  const esc_=e=>{if(e.key==="Escape"){unmax(el);document.removeEventListener("keydown",esc_)}};document.addEventListener("keydown",esc_);el._esc=esc_;
  if($("#homeCal",el))rerenderCals()}
function unmax(el){if(!el._ph)return;const ph=el._ph;el.classList.remove("maxed");ph.replaceWith(el);el._ph=null;if(el._sh){el._sh.remove();el._sh=null}if(el._esc)document.removeEventListener("keydown",el._esc);
  const btn=$("[data-bc=max]",el);if(btn){btn.innerHTML=ic("expand");btn.title="Phóng to";btn.setAttribute("aria-label","Phóng to khối")}if(!RM())el.animate([{opacity:.6,transform:"scale(.98)"},{opacity:1,transform:"none"}],{duration:200,easing:"ease-out"})}
/* kéo khối bằng chuột / cảm ứng: khối nổi lên, các khối khác trượt nhường chỗ */
function startBlockDrag(e,el,b){
  if(e.button!==0&&e.pointerType==="mouse")return;e.preventDefault();const grid=$("#dgrid"),dash=$(".dash");const r=el.getBoundingClientRect();
  const ph=document.createElement("div");ph.className="blk-ph";ph.style.cssText=`--w:${b.w};height:${r.height}px`;el.before(ph);
  el.classList.add("lifted");el.style.width=r.width+"px";el.style.height=r.height+"px";el.style.left=r.left+"px";el.style.top=r.top+"px";document.body.appendChild(el);
  const ox=e.clientX-r.left,oy=e.clientY-r.top;let px=e.clientX,py=e.clientY,raf=0,scrollV=0;const sc=r.width>560?Math.max(.45,420/r.width):1;el.style.transformOrigin=`${ox}px ${oy}px`;
  const flip=fn=>{const sibs=$$(".blk:not(.lifted),.blk-ph",grid);const before=new Map(sibs.map(s=>[s,s.getBoundingClientRect()]));fn();if(RM())return;sibs.forEach(s=>{const a=before.get(s),c=s.getBoundingClientRect();const dx=a.left-c.left,dy=a.top-c.top;if(dx||dy)s.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:220,easing:"cubic-bezier(.2,.8,.2,1)"})})};
  const tick=()=>{raf=0;el.style.transform=`translate(${px-ox-r.left}px,${py-oy-r.top}px) scale(${sc}) rotate(.6deg)`;
    const target=$$(".blk[data-bid]:not(.lifted)",grid).find(s=>{const q=s.getBoundingClientRect();return px>=q.left&&px<=q.right&&py>=q.top&&py<=q.bottom});
    if(target){const q=target.getBoundingClientRect();const full=q.width>grid.clientWidth*.8;const after=full?py>q.top+q.height/2:px>q.left+q.width/2;const want=after?target.nextSibling:target;if(want!==ph&&ph.nextSibling!==want)flip(()=>grid.insertBefore(ph,want))}
    const dr=dash.getBoundingClientRect();scrollV=py<dr.top+60?-12:py>dr.bottom-60?12:0;if(scrollV){dash.scrollTop+=scrollV;raf=requestAnimationFrame(tick)}};
  const mv=ev=>{px=ev.clientX;py=ev.clientY;if(!raf)raf=requestAnimationFrame(tick)};
  const up=()=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);cancelAnimationFrame(raf);
    const q=ph.getBoundingClientRect();const done=()=>{el.classList.remove("lifted");el.style.cssText=`--w:${b.w}`;ph.replaceWith(el);
      const order=$$(".blk[data-bid]",grid).map(x=>x.dataset.bid);const mins=UI.dash.blocks.filter(z=>z.m);UI.dash.blocks=[...order.map(id=>UI.dash.blocks.find(z=>z.id===id)).filter(Boolean),...mins];saveDash()};
    if(RM())return done();const a=el.animate([{transform:el.style.transform},{transform:`translate(${q.left-r.left}px,${q.top-r.top}px)`}],{duration:200,easing:"cubic-bezier(.2,.8,.2,1)"});a.onfinish=done};
  addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up);tick();
}

/* =====================================================================
   SƠ ĐỒ TƯ DUY — có chuyển động: nhánh trượt ra/thu vào, máy quay lướt mượt, quán tính khi kéo
   ===================================================================== */
function viewMind(a){
  const d=a.data||{};let root=d.root?mmNorm(d.root):(d.t||d.title&&(d.children||d.c)?mmNorm(d):null);
  if(!root&&Array.isArray(d.nodes))root={t:d.title||a.title,c:d.nodes.map(x=>mmNorm(x))};if(!root)root={t:a.title||"Sơ đồ",c:[]};
  let idc=0;const all=[];(function walk(n,dp,p){n._id=idc++;n._d=dp;n._p=p;all.push(n);n.c.forEach(c=>walk(c,dp+1,n))})(root,0,null);
  const closed=new Set(all.filter(n=>n._d>=2&&n.c.length).map(n=>n._id));
  UI.reopen=()=>viewMind(a);
  openModal({title:a.title,actions:srcBtn(a),body:`<div class="mm2" id="mm2" tabindex="0" aria-label="Sơ đồ tư duy — kéo để di chuyển, cuộn để phóng to"><svg id="mmSvg" width="100%" height="100%"><g id="mmG"><g id="mmE"></g><g id="mmN"></g></g></svg>
    <div class="mm-ctl" role="toolbar" aria-label="Điều khiển sơ đồ"><button id="mmEx" title="Mở rộng / thu gọn tất cả" aria-label="Mở rộng hoặc thu gọn tất cả"><svg viewBox="0 0 24 24" class="i"><path d="M7 9l5-5 5 5M7 15l5 5 5-5"/></svg></button><span class="sep"></span><button id="mmIn" aria-label="Phóng to">${ic("plus")}</button><button id="mmPct" class="pct" aria-label="Vừa khung">100%</button><button id="mmOut" aria-label="Thu nhỏ">${ic("min")}</button><span class="sep"></span><button id="mmFit" title="Vừa khung" aria-label="Vừa khung">${ic("expand")}</button><button id="mmDl" title="Tải ảnh PNG" aria-label="Tải ảnh PNG">${ic("dl")}</button></div>
    <div class="mm-pop" id="mmPop" hidden></div><div class="mm-hint muted">Kéo nền để di chuyển · cuộn để phóng to · bấm ‹ › để mở/thu nhánh · bấm một mục để hỏi trợ lý</div></div>`});
  bindSrcList(a);
  const NSV="http://www.w3.org/2000/svg";const host=$("#mm2"),svg=$("#mmSvg"),G=$("#mmG"),GE=$("#mmE"),GN=$("#mmN");
  const fontFam=getComputedStyle(document.documentElement).getPropertyValue("--f-body")||"system-ui";
  const COL=[mmColor("color-mix(in srgb, var(--accent) 30%, var(--panel))"),mmColor("color-mix(in srgb, var(--sig) 24%, var(--panel))"),mmColor("color-mix(in srgb, var(--ok) 22%, var(--panel))"),mmColor("color-mix(in srgb, var(--ok) 14%, var(--panel))")];
  const EDGE=[mmColor("color-mix(in srgb, var(--accent) 55%, var(--line))"),mmColor("color-mix(in srgb, var(--sig) 55%, var(--line))"),mmColor("color-mix(in srgb, var(--ok) 50%, var(--line))")];
  const INK=mmColor("var(--ink)"),SEL=mmColor("var(--accent)"),BG=mmColor("var(--panel2)"),TOG=mmColor("var(--panel)"),MUT=mmColor("var(--muted)");
  const mc=document.createElement("canvas").getContext("2d");const FS=13.5,LH=18,MAXW=300,PADX=14,GAPX=56,GAPY=12,TS=14;
  all.forEach(n=>{mc.font=`${n._d===0?600:500} ${n._d===0?15:FS}px ${fontFam}`;const words=n.t.split(" ");const lines=[];let cur="";words.forEach(w=>{const tr=cur?cur+" "+w:w;if(mc.measureText(tr).width>MAXW-PADX*2&&cur){lines.push(cur);cur=w}else cur=tr});if(cur)lines.push(cur);n._lines=lines;n._w=Math.ceil(Math.min(MAXW,Math.max(...lines.map(l=>mc.measureText(l).width))+PADX*2));n._h=lines.length*LH+16});
  const kids=n=>closed.has(n._id)?[]:n.c;
  const layout=()=>{const T=new Map();let y=0;const lay=(n,x)=>{const k=kids(n);let ny;if(!k.length){ny=y;y+=n._h+GAPY}else{k.forEach(c=>lay(c,x+n._w+GAPX+(n.c.length?TS:0)));const a0=T.get(k[0]._id),a1=T.get(k[k.length-1]._id);ny=((a0.y+k[0]._h/2)+(a1.y+k[k.length-1]._h/2))/2-n._h/2}T.set(n._id,{x,y:ny})};lay(root,0);return T};
  /* trạng thái động */
  const cur=new Map();/* id -> {x,y,a} */let tgt=layout();const els=new Map(),edges=new Map();let sel=null;
  const cam={z:1,x:40,y:40},camA={...cam},camB={...cam};let camT0=0,camDur=0;let nodeT0=0,nodeDur=0;const nodeA=new Map();let leaving=new Set();let raf=0;
  const mkNode=n=>{let g=els.get(n._id);if(g)return g;g=document.createElementNS(NSV,"g");g.setAttribute("class","mmn");g.dataset.n=n._id;
    g.innerHTML=`<rect width="${n._w}" height="${n._h}" rx="9" fill="${COL[Math.min(3,n._d)]}" stroke="transparent" stroke-width="2"/>${n._lines.map((l,i)=>`<text x="${PADX}" y="${8+LH*(i+1)-5}" font-size="${n._d===0?15:FS}" font-weight="${n._d===0?600:500}" fill="${INK}" font-family="${esc(fontFam)}">${esc(l)}</text>`).join("")}${n.c.length?`<g class="mmt" data-t="${n._id}"><circle cx="${n._w+8}" cy="${n._h/2}" r="9" fill="${TOG}" stroke="${EDGE[Math.min(2,n._d)]}"/><text x="${n._w+8}" y="${n._h/2+4.5}" text-anchor="middle" font-size="13" fill="${MUT}" font-family="${esc(fontFam)}">‹</text></g>`:""}`;
    GN.appendChild(g);els.set(n._id,g);return g};
  const mkEdge=c=>{let p=edges.get(c._id);if(p)return p;p=document.createElementNS(NSV,"path");p.setAttribute("fill","none");p.setAttribute("stroke",EDGE[Math.min(2,c._p._d)]);p.setAttribute("stroke-width","1.6");GE.appendChild(p);edges.set(c._id,p);return p};
  const visible=()=>{const out=[];(function f(n){out.push(n);kids(n).forEach(f)})(root);return out};
  const ancIn=(n,M)=>{let p=n._p;while(p&&!M.has(p._id))p=p._p;return p||root};
  const tuck=(n,an,P0)=>({x:P0.x+an._w-n._w*.6,y:P0.y+(an._h-n._h)/2});
  const leaveTo=new Map();
  const paint=()=>{G.setAttribute("transform",`translate(${cam.x},${cam.y}) scale(${cam.z})`);$("#mmPct").textContent=Math.round(cam.z*100)+"%";
    cur.forEach((s,id)=>{const n=all[id];const g=els.get(id);if(!g)return;g.setAttribute("transform",`translate(${s.x},${s.y})`);g.style.opacity=s.a;
      if(n._p){const ps=cur.get(n._p._id);const p=edges.get(id);if(ps&&p){const x1=ps.x+n._p._w+TS,y1=ps.y+n._p._h/2,x2=s.x,y2=s.y+n._h/2,mx=(x1+x2)/2;p.setAttribute("d",`M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`);p.style.opacity=Math.min(s.a,ps.a)}}});
    placePop()};
  const frame=t=>{raf=0;let more=false;
    if(nodeDur){const k=Math.min(1,(t-nodeT0)/nodeDur),e=easeIO(k);nodeA.forEach((A,id)=>{const B=tgt.get(id)||leaveTo.get(id);const s=cur.get(id);if(!B||!s)return;s.x=A.x+(B.x-A.x)*e;s.y=A.y+(B.y-A.y)*e;s.a=A.a+((tgt.has(id)?1:0)-A.a)*e});
      if(k>=1){nodeDur=0;leaving.forEach(id=>{cur.delete(id);const g=els.get(id);if(g){g.remove();els.delete(id)}const p=edges.get(id);if(p){p.remove();edges.delete(id)}});leaving.clear()}else more=true}
    if(camDur){const k=Math.min(1,(t-camT0)/camDur),e=camDur<200?easeOut(k):easeIO(k);cam.z=camA.z+(camB.z-camA.z)*e;cam.x=camA.x+(camB.x-camA.x)*e;cam.y=camA.y+(camB.y-camA.y)*e;if(k>=1)camDur=0;else more=true}
    if(inert&&!pan){cam.x+=vel.x;cam.y+=vel.y;vel.x*=.92;vel.y*=.92;if(Math.hypot(vel.x,vel.y)<.3)inert=false;else more=true}
    paint();if(more)raf=requestAnimationFrame(frame)};
  const kick=()=>{if(!raf)raf=requestAnimationFrame(frame)};
  const camTo=(z,x,y,dur)=>{if(RM())dur=0;Object.assign(camA,cam);Object.assign(camB,{z,x,y});camT0=performance.now();camDur=dur;if(!dur)Object.assign(cam,camB);kick()};
  const goal=()=>camDur?camB:cam;
  /* đổi bố cục: các nút trượt tới vị trí mới */
  const relayout=(anchorNode,dur=420)=>{tgt=layout();leaveTo.clear();
    visible().forEach(n=>{mkNode(n);if(n._p)mkEdge(n);if(!cur.has(n._id)){const an=ancIn(n,cur);const ps=cur.get(an._id)||tgt.get(an._id);cur.set(n._id,{...tuck(n,an,ps),a:0})}});
    leaving=new Set();cur.forEach((s,id)=>{if(!tgt.has(id)){leaving.add(id);const an=ancIn(all[id],tgt);leaveTo.set(id,tuck(all[id],an,tgt.get(an._id)))}});
    nodeA.clear();cur.forEach((s,id)=>nodeA.set(id,{x:s.x,y:s.y,a:s.a}));
    if(anchorNode&&cur.has(anchorNode._id)&&tgt.has(anchorNode._id)){const s=cur.get(anchorNode._id),T=tgt.get(anchorNode._id);const g=goal();camTo(g.z,g.x+g.z*(s.x-T.x),g.y+g.z*(s.y-T.y),dur)}
    els.forEach((g,id)=>{const t=$(".mmt text",g);if(t)t.textContent=closed.has(+id)?"›":"‹"});
    nodeT0=performance.now();nodeDur=RM()?1:dur;kick()};
  const bounds=T=>{const V=visible();return {x0:Math.min(...V.map(n=>T.get(n._id).x)),y0:Math.min(...V.map(n=>T.get(n._id).y)),x1:Math.max(...V.map(n=>T.get(n._id).x+n._w+(n.c.length?24:0))),y1:Math.max(...V.map(n=>T.get(n._id).y+n._h))}};
  const fitCam=()=>{const b=bounds(tgt),W=host.clientWidth||800,H=host.clientHeight||500;const z=Math.max(.3,Math.min(1.15,Math.min((W-60)/(b.x1-b.x0),(H-90)/(b.y1-b.y0))));return {z,x:(W-(b.x1-b.x0)*z)/2-b.x0*z,y:(H-(b.y1-b.y0)*z)/2-b.y0*z-12}};
  const fit=(dur=460)=>{const f=fitCam();camTo(f.z,f.x,f.y,dur)};
  const zoomAt=(f,cx,cy,dur=260)=>{const g=goal();const nz=Math.max(.2,Math.min(3,g.z*f));camTo(nz,cx-(cx-g.x)*nz/g.z,cy-(cy-g.y)*nz/g.z,dur)};
  const toggle=n=>{closed.has(n._id)?closed.delete(n._id):closed.add(n._id);relayout(n)};
  function placePop(){const p=$("#mmPop");if(!p)return;if(!sel||!cur.has(sel._id)){p.hidden=true;return}p.hidden=false;const s=cur.get(sel._id);const x=s.x*cam.z+cam.x,y=(s.y+sel._h)*cam.z+cam.y+6;p.style.translate=`${Math.max(8,Math.min(host.clientWidth-p.offsetWidth-8,x))}px ${Math.max(8,Math.min(host.clientHeight-p.offsetHeight-8,y))}px`}
  const setSel=n=>{els.forEach((g,id)=>{const r=$("rect",g);if(r)r.setAttribute("stroke",n&&n._id===+id?SEL:"transparent")});sel=n};
  const select=n=>{setSel(n);const p=$("#mmPop");const path=[];let q=n;while(q){path.unshift(q.t);q=q._p}
    p.innerHTML=`<b>${esc(n.t)}</b><div class="row"><button class="btn primary" id="mmAsk">${ic("chat")} Hỏi trợ lý về mục này</button>${n.c.length?`<button class="btn" id="mmTg">${closed.has(n._id)?"Mở nhánh":"Thu nhánh"}</button>`:""}<button class="ghost ic" id="mmX" aria-label="Đóng">${ic("close")}</button></div>`;
    p.classList.remove("show");void p.offsetWidth;p.classList.add("show");placePop();
    $("#mmAsk").onclick=()=>{closeViewer();chatSend(`Giải thích "${n.t}" (trong ngữ cảnh: ${path.join(" › ")}) dựa trên nguồn, kèm ví dụ.`)};const tg=$("#mmTg");if(tg)tg.onclick=()=>{toggle(n);select(n)};$("#mmX").onclick=()=>{setSel(null);placePop()};
    const s=cur.get(n._id);if(s){const sx=s.x*cam.z+cam.x,sy=s.y*cam.z+cam.y,W=host.clientWidth,H=host.clientHeight;const g=goal();let dx=0,dy=0;if(sx<20)dx=60-sx;if(sx+n._w*cam.z>W-80)dx=W-80-(sx+n._w*cam.z);if(sy<20)dy=60-sy;if(sy+n._h*cam.z>H-120)dy=H-120-(sy+n._h*cam.z);if(dx||dy)camTo(g.z,g.x+dx,g.y+dy,320)}};
  /* kéo nền + quán tính */
  let pan=null,moved=false,inert=false;const vel={x:0,y:0};
  svg.addEventListener("pointerdown",e=>{moved=false;inert=false;camDur=0;pan={x:e.clientX,y:e.clientY,cx:cam.x,cy:cam.y,id:e.pointerId,lt:performance.now(),lx:e.clientX,ly:e.clientY};host.classList.add("panning")});
  svg.addEventListener("pointermove",e=>{if(!pan)return;const dx=e.clientX-pan.x,dy=e.clientY-pan.y;if(!moved&&Math.hypot(dx,dy)>4){moved=true;try{svg.setPointerCapture(pan.id)}catch(_){}}
    if(moved){const now=performance.now(),dt=Math.max(1,now-pan.lt);vel.x=(e.clientX-pan.lx)/dt*16;vel.y=(e.clientY-pan.ly)/dt*16;pan.lt=now;pan.lx=e.clientX;pan.ly=e.clientY;cam.x=pan.cx+dx;cam.y=pan.cy+dy;kick()}});
  const endPan=e=>{host.classList.remove("panning");if(pan&&!moved){const t=e.target.closest&&e.target.closest("[data-t]"),g=e.target.closest&&e.target.closest("[data-n]");if(t)toggle(all[+t.dataset.t]);else if(g)select(all[+g.dataset.n]);else if(sel){setSel(null);placePop()}}
    else if(pan&&moved&&!RM()&&performance.now()-pan.lt<80&&Math.hypot(vel.x,vel.y)>1){inert=true;kick()}pan=null};
  svg.addEventListener("pointerup",endPan);svg.addEventListener("pointercancel",()=>{pan=null;host.classList.remove("panning")});
  host.addEventListener("wheel",e=>{e.preventDefault();const r=host.getBoundingClientRect();inert=false;if(e.ctrlKey||e.metaKey||(Math.abs(e.deltaY)>=Math.abs(e.deltaX)&&!e.shiftKey))zoomAt(Math.exp(-e.deltaY*.0018),e.clientX-r.left,e.clientY-r.top,140);else{const g=goal();camTo(g.z,g.x-(e.deltaX||e.deltaY),g.y,140)}},{passive:false});
  host.addEventListener("keydown",e=>{const W=host.clientWidth/2,H=host.clientHeight/2,g=goal();if(e.key==="+"||e.key==="=")zoomAt(1.25,W,H);else if(e.key==="-")zoomAt(.8,W,H);else if(e.key==="0")fit();else if(e.key.startsWith("Arrow"))camTo(g.z,g.x+(e.key==="ArrowLeft"?80:e.key==="ArrowRight"?-80:0),g.y+(e.key==="ArrowUp"?80:e.key==="ArrowDown"?-80:0),220);else return;e.preventDefault()});
  $("#mmIn").onclick=()=>zoomAt(1.25,host.clientWidth/2,host.clientHeight/2);$("#mmOut").onclick=()=>zoomAt(.8,host.clientWidth/2,host.clientHeight/2);
  $("#mmPct").onclick=()=>fit();$("#mmFit").onclick=()=>fit();
  $("#mmEx").onclick=()=>{const anyClosed=closed.size>0;closed.clear();if(!anyClosed)all.filter(n=>n._d>=1&&n.c.length).forEach(n=>closed.add(n._id));relayout(null,480);fit(520)};
  $("#mmDl").onclick=()=>{const b=bounds(tgt);const pad=24,W=Math.ceil(b.x1-b.x0+pad*2),H=Math.ceil(b.y1-b.y0+pad*2),S=2;
    let o="";visible().forEach(n=>{const T=tgt.get(n._id);if(n._p){const P2=tgt.get(n._p._id);const x1=P2.x+n._p._w+TS,y1=P2.y+n._p._h/2,x2=T.x,y2=T.y+n._h/2,mx=(x1+x2)/2;o+=`<path d="M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}" fill="none" stroke="${EDGE[Math.min(2,n._p._d)]}" stroke-width="1.6"/>`}});
    visible().forEach(n=>{const T=tgt.get(n._id);const g=els.get(n._id);if(g)o+=`<g transform="translate(${T.x},${T.y})">${g.innerHTML}</g>`});
    const s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="100%" height="100%" fill="${BG}"/><g transform="translate(${pad-b.x0},${pad-b.y0})">${o}</g></svg>`;
    const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=W*S;c.height=H*S;const g=c.getContext("2d");g.scale(S,S);g.drawImage(img,0,0);c.toBlob(bl=>saveFile(slug(a.title||"so-do")+".png",bl,"image/png"),"image/png")};img.onerror=()=>saveFile(slug(a.title||"so-do")+".svg",s,"image/svg+xml");img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s)};
  /* mở đầu: các nhánh mọc ra từ nút gốc */
  cur.set(root._id,{x:0,y:tgt.get(root._id).y,a:1});mkNode(root);Object.assign(cam,fitCam());paint();
  let _rw=host.clientWidth,_rh=host.clientHeight;requestAnimationFrame(()=>{_rw=host.clientWidth;_rh=host.clientHeight;Object.assign(cam,fitCam());relayout(null,RM()?1:650)});
  try{const ro=new ResizeObserver(()=>{if(!host.isConnected){ro.disconnect();return}if(Math.abs(host.clientWidth-_rw)>40||Math.abs(host.clientHeight-_rh)>40){_rw=host.clientWidth;_rh=host.clientHeight;fit(300)}});ro.observe(host)}catch(e){}
}

const _applySkin9=applySkin;applySkin=function(...a){const r=_applySkin9.apply(this,a);try{if(UI.bg&&UI.bg.wall)applyBg();if(UI.view==="home")drawBanner()}catch(e){}return r};
applyBg();

/* =====================================================================
   v7 — XƯỞNG MÔ HÌNH 3D (tự tạo · chỉnh sửa · AI gợi ý) · ĐỒNG BỘ MÀU VỚI CẢNH NỀN · ÂM THANH NỀN
   ===================================================================== */
Object.assign(IC,{move:'<path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/>',rot:'<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/>',undo:'<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',redo:'<path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/>',grid:'<path d="M4 4h16v16H4zM4 10h16M4 16h16M10 4v16M16 4v16"/>',cam:'<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/>',music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',sync:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M4 4v4h4M20 20v-4h-4"/>'});

/* ---------------- linh kiện ---------------- */
const M3_TYPES={
 box:{l:"Hộp",g:"▣",col:"#8fb3e8",prim:1},cylinder:{l:"Trụ",g:"◍",col:"#9fd8c0",prim:1},sphere:{l:"Cầu",g:"●",col:"#f0b4d0",prim:1},cone:{l:"Nón",g:"▲",col:"#f2cf7a",prim:1},torus:{l:"Vòng xuyến",g:"◎",col:"#c7b5f0",prim:1},
 board:{l:"Bảng mạch PCB",g:"▭",col:"#2f7d4f"},breadboard:{l:"Breadboard",g:"⋮⋮",col:"#eceae3"},
 resistor:{l:"Điện trở",g:"⊏⊐",col:"#d8c49b"},led:{l:"LED",g:"◖",col:"#ff4d4d"},capacitor:{l:"Tụ điện",g:"‖",col:"#2b4fa8"},
 ic:{l:"IC DIP",g:"▤",col:"#1d1d20"},battery:{l:"Pin",g:"⊞",col:"#2b2b2b"},transistor:{l:"Transistor",g:"⫯",col:"#222"},switch:{l:"Công tắc",g:"⏻",col:"#6b6f78"},
 wire:{l:"Dây dẫn",g:"〰",col:"#e05a4f"},text:{l:"Chữ chú thích",g:"Aa",col:"#ffffff"},arrow:{l:"Mũi tên",g:"➜",col:"#ffd45a"}
};
const LED_COL={red:"#ff3b3b",green:"#35e06b",blue:"#3b8bff",yellow:"#ffd23b",white:"#f4f4ff",orange:"#ff8a2b"};
const M3_ANIM={none:"Không",spin:"Xoay tròn",pulse:"Phập phồng",blink:"Nhấp nháy",bob:"Lơ lửng"};
const num=(v,d=0,lo=-60,hi=60)=>{v=+v;return Number.isFinite(v)?Math.max(lo,Math.min(hi,v)):d};
const v3=(a,d)=>Array.isArray(a)&&a.length>=3?[num(a[0],d[0]),num(a[1],d[1]),num(a[2],d[2])]:typeof a==="number"?[num(a,d[0],.01,40),num(a,d[1],.01,40),num(a,d[2],.01,40)]:[...d];
const hexc=(c,d)=>typeof c==="string"&&/^#[0-9a-f]{6}$/i.test(c)?c:typeof c==="string"&&/^#[0-9a-f]{3}$/i.test(c)?"#"+c.slice(1).split("").map(x=>x+x).join(""):d;
function m3CleanPart(p,i,ids){if(!p||typeof p!=="object")return null;const type=M3_TYPES[p.type]?p.type:null;if(!type)return null;
  let id=String(p.id||"").replace(/[^\w-]/g,"").slice(0,24)||type+(i+1);while(ids.has(id))id+="_";ids.add(id);
  const pr=p.props&&typeof p.props==="object"?p.props:{};const props={};
  if(type==="resistor")props.ohm=num(pr.ohm,330,1,1e7);
  if(type==="led"){props.color=LED_COL[pr.color]?pr.color:"red";props.on=pr.on!==false}
  if(type==="capacitor")props.label=String(pr.label||"100µF").slice(0,12);
  if(type==="ic"){props.label=String(pr.label||"74HC00").slice(0,12);props.pins=[8,14,16].includes(+pr.pins)?+pr.pins:14}
  if(type==="battery")props.kind=pr.kind==="aa"?"aa":"9v";
  if(type==="transistor")props.label=String(pr.label||"NPN").slice(0,14);
  if(type==="switch")props.on=!!pr.on;
  if(type==="breadboard"){props.w=num(pr.w,10,3,30);props.d=num(pr.d,5,2,14)}
  if(type==="wire"){props.pts=(Array.isArray(pr.pts)?pr.pts:[]).slice(0,24).map(q=>v3(q,[0,0,0]));if(props.pts.length<2)props.pts=[[-1,.05,0],[1,.05,0]];props.flow=!!pr.flow;props.dir=pr.dir===-1?-1:1;props.speed=num(pr.speed,1,.1,5);props.r=num(pr.r,.045,.01,.3);const ref=q=>q&&typeof q==="object"&&q.id?{id:String(q.id).slice(0,24),pin:String(q.pin||"").slice(0,8)}:null;if(ref(pr.a))props.a=ref(pr.a);if(ref(pr.b))props.b=ref(pr.b);if(pr.auto)props.auto=true}
  if(type==="capacitor"&&pr.uf!=null)props.uf=num(pr.uf,100,1e-6,1e6);
  if(type==="transistor"&&pr.beta!=null)props.beta=num(pr.beta,100,5,1000);
  const out={id,type,name:String(p.name||M3_TYPES[type].l).slice(0,40),pos:v3(p.pos,[0,0,0]),rot:v3(p.rot,[0,0,0]).map(x=>num(x,0,-360,360)),scale:v3(p.scale??[1,1,1],[1,1,1]).map(x=>num(x,1,.02,40)),color:hexc(p.color,M3_TYPES[type].col),label:String(p.label||"").slice(0,60),props,anim:M3_ANIM[p.anim]?p.anim:"none"};
  return out}
function m3Clean(s){const ids=new Set();const parts=(Array.isArray(s&&s.parts)?s.parts:[]).slice(0,80).map((p,i)=>m3CleanPart(p,i,ids)).filter(Boolean);return {title:String((s&&s.title)||"Mô hình 3D").slice(0,80),notes:String((s&&s.notes)||"").slice(0,1200),parts}}

/* ---------------- mẫu có sẵn (bản chỉnh sửa được của phòng thí nghiệm) ---------------- */
const M3_TPL={
 blank:{l:"Mô hình trống",d:"Bắt đầu với một breadboard",spec:{title:"Mô hình mới",parts:[{id:"bb",type:"breadboard",name:"Breadboard",pos:[0,0,0],props:{w:10,d:5}}]}},
 led:{l:"Mạch LED cơ bản",d:"Pin 9 V – điện trở – LED, electron chạy trong dây",lab:"led",spec:{title:"Mạch LED: pin – điện trở – LED",notes:"Dòng electron chạy từ cực âm của pin, qua LED, qua điện trở rồi về cực dương. Điện trở hạn dòng: I = (V − Vf) / R.",parts:[
  {id:"bb",type:"breadboard",name:"Breadboard",pos:[0,0,0],props:{w:10,d:5}},
  {id:"bat",type:"battery",name:"Pin 9 V",pos:[-6.4,-.35,0],props:{kind:"9v"},label:"Pin 9 V"},
  {id:"r1",type:"resistor",name:"Điện trở R1",pos:[-1.6,0,-.6],props:{ohm:330},label:"R = 330 Ω"},
  {id:"d1",type:"led",name:"LED đỏ",pos:[1.6,0,-.6],props:{color:"red",on:true},label:"LED đỏ"},
  {id:"w1",type:"wire",name:"Dây (+) → R1",color:"#e05a4f",props:{pts:[[-6.15,1.4,.15],[-5.5,1.9,.1],[-3.2,1.2,-.6],[-2.35,.06,-.6]],flow:true,dir:-1}},
  {id:"w2",type:"wire",name:"Dây R1 → LED",color:"#e8b04a",props:{pts:[[-.85,.06,-.6],[.3,.4,-.6],[1.48,.06,-.6]],flow:true,dir:-1}},
  {id:"w3",type:"wire",name:"Dây LED → (−)",color:"#2f3640",props:{pts:[[1.72,.06,-.6],[2.4,.3,1.4],[-3,.6,1.8],[-5.6,1.9,-.1],[-6.65,1.4,-.15]],flow:true,dir:-1}},
  {id:"t1",type:"text",name:"Chú thích",pos:[0,2.6,0],label:"Electron đi từ cực âm (−) → cực dương (+)"}]}},
 nand:{l:"IC 74HC00 trên breadboard",d:"4 cổng NAND, nối nguồn VCC/GND và một LED ở ngõ ra",lab:"logic",spec:{title:"IC 74HC00 — cổng NAND",notes:"Chân 14 nối VCC (thanh đỏ), chân 7 nối GND (thanh xanh). Ngõ ra cổng 1 ở chân 3 điều khiển LED.",parts:[
  {id:"bb",type:"breadboard",name:"Breadboard",pos:[0,0,0],props:{w:10,d:5}},
  {id:"u1",type:"ic",name:"74HC00",pos:[0,0,0],props:{label:"74HC00",pins:14},label:"74HC00 (4 × NAND)"},
  {id:"wv",type:"wire",name:"VCC → chân 14",color:"#e05a4f",props:{pts:[[-1.25,.06,-1.05],[-1.25,.35,-1.7],[-1.25,.06,-2.25]]}},
  {id:"wg",type:"wire",name:"GND → chân 7",color:"#2f3640",props:{pts:[[1.15,.06,1.05],[1.15,.35,1.7],[1.15,.06,2.25]]}},
  {id:"r1",type:"resistor",name:"Điện trở 330 Ω",pos:[2.6,0,1.35],rot:[0,90,0],props:{ohm:330}},
  {id:"d1",type:"led",name:"LED ngõ ra",pos:[3.6,0,.4],props:{color:"green",on:true},label:"Y = (A·B)'"},
  {id:"wo",type:"wire",name:"Chân 3 → điện trở",color:"#4caf7d",props:{pts:[[-.45,.06,1.05],[.8,.5,1.6],[2.6,.06,2.1]],flow:true}},
  {id:"t1",type:"text",name:"Chú thích",pos:[0,2.4,0],label:"NAND: ra 0 chỉ khi cả hai vào = 1"}]}},
 rc:{l:"Mạch RC nạp tụ",d:"Pin – công tắc – điện trở – tụ điện",lab:"cap",spec:{title:"Mạch RC nạp/xả tụ",notes:"Khi đóng công tắc, tụ nạp qua điện trở với hằng số thời gian τ = R·C. Sau khoảng 5τ tụ gần như đầy.",parts:[
  {id:"bb",type:"breadboard",name:"Breadboard",pos:[0,0,0],props:{w:10,d:5}},
  {id:"bat",type:"battery",name:"Pin 9 V",pos:[-6.4,-.35,0],props:{kind:"9v"}},
  {id:"sw",type:"switch",name:"Công tắc",pos:[-3,0,-.9],props:{on:true},label:"S"},
  {id:"r1",type:"resistor",name:"R = 10 kΩ",pos:[-.4,0,-.9],props:{ohm:10000},label:"R = 10 kΩ"},
  {id:"c1",type:"capacitor",name:"Tụ 100 µF",pos:[2.4,0,-.3],props:{label:"100µF"},label:"C = 100 µF"},
  {id:"w1",type:"wire",name:"(+) → công tắc",color:"#e05a4f",props:{pts:[[-6.15,1.4,.15],[-5,1.8,-.4],[-3.4,.06,-.9]],flow:true,dir:-1}},
  {id:"w2",type:"wire",name:"Công tắc → R",color:"#e8b04a",props:{pts:[[-2.6,.06,-.9],[-1.15,.06,-.9]],flow:true,dir:-1}},
  {id:"w3",type:"wire",name:"R → tụ",color:"#e8b04a",props:{pts:[[.35,.06,-.9],[1.5,.3,-.9],[2.25,.06,-.3]],flow:true,dir:-1}},
  {id:"w4",type:"wire",name:"Tụ → (−)",color:"#2f3640",props:{pts:[[2.55,.06,-.3],[2.8,.4,1.6],[-4,.6,1.8],[-6.65,1.4,-.15]],flow:true,dir:-1}},
  {id:"t1",type:"text",name:"Chú thích",pos:[0,2.5,0],label:"τ = R·C = 10 kΩ × 100 µF = 1 s"}]}},
 bjt:{l:"Transistor làm công tắc",d:"NPN điều khiển LED bằng dòng nhỏ ở cực B",lab:"mos",spec:{title:"Transistor NPN làm công tắc",notes:"Dòng nhỏ vào cực B (qua R_B) mở transistor, cho dòng lớn chạy từ C xuống E làm LED sáng.",parts:[
  {id:"bb",type:"breadboard",name:"Breadboard",pos:[0,0,0],props:{w:10,d:5}},
  {id:"q1",type:"transistor",name:"2N2222",pos:[1,0,.3],props:{label:"NPN"},label:"Q1 · C B E"},
  {id:"rb",type:"resistor",name:"R_B = 10 kΩ",pos:[-1.6,0,.3],props:{ohm:10000},label:"R_B"},
  {id:"rc",type:"resistor",name:"R_C = 330 Ω",pos:[1,0,-1.7],rot:[0,90,0],props:{ohm:330}},
  {id:"d1",type:"led",name:"LED",pos:[2.8,0,-1.2],props:{color:"blue",on:true}},
  {id:"bat",type:"battery",name:"Pin 9 V",pos:[-6.4,-.35,0],props:{kind:"9v"}},
  {id:"w1",type:"wire",name:"R_B → B",color:"#e8b04a",props:{pts:[[-.85,.06,.3],[1,.06,.3]],flow:true}},
  {id:"w2",type:"wire",name:"(+) → R_B",color:"#e05a4f",props:{pts:[[-6.15,1.4,.15],[-4,1.4,.3],[-2.35,.06,.3]],flow:true}},
  {id:"t1",type:"text",name:"Chú thích",pos:[0,2.4,0],label:"I_C ≈ β · I_B"}]}},
 parts:{l:"Bộ linh kiện",d:"Bày sẵn mọi loại linh kiện để tập nhận biết",lab:"parts",spec:{title:"Bộ linh kiện điện tử",parts:[
  {id:"r",type:"resistor",name:"Điện trở",pos:[-4,0,0],props:{ohm:4700},label:"Điện trở 4,7 kΩ"},{id:"d",type:"led",name:"LED",pos:[-2,0,0],props:{color:"yellow",on:true},label:"LED"},
  {id:"c",type:"capacitor",name:"Tụ hóa",pos:[0,0,0],props:{label:"470µF"},label:"Tụ hóa"},{id:"q",type:"transistor",name:"Transistor",pos:[2,0,0],label:"Transistor TO-92"},
  {id:"u",type:"ic",name:"IC",pos:[4.5,0,0],props:{label:"NE555",pins:8},label:"IC 555"},{id:"b",type:"battery",name:"Pin AA",pos:[-4,0,2.6],props:{kind:"aa"},label:"Pin AA 1,5 V"},
  {id:"s",type:"switch",name:"Công tắc",pos:[0,0,2.6],label:"Công tắc gạt"},{id:"p",type:"board",name:"PCB",pos:[3.5,.05,2.8],scale:[3,.1,2],label:"Bảng mạch in"}]}}
};

/* ---------------- dựng hình từng linh kiện ---------------- */
function m3Legs(T,g,xs,y0,mat,z=0){xs.forEach(x=>{const l=new T.Mesh(new T.CylinderGeometry(.025,.025,y0,8),mat);l.position.set(x,y0/2,z);g.add(l)})}
function m3Build(T,p){
  const g=new T.Group();g.userData.pid=p.id;const metal=LM(T,0xb9bec4,{metalness:.85,roughness:.3});const col=new T.Color(p.color);const inner=new T.Group();g.add(inner);
  const P=p.props||{};
  switch(p.type){
   case"box":inner.add(new T.Mesh(new T.BoxGeometry(1,1,1),LM(T,col)));break;
   case"cylinder":inner.add(new T.Mesh(new T.CylinderGeometry(.5,.5,1,32),LM(T,col)));break;
   case"sphere":inner.add(new T.Mesh(new T.SphereGeometry(.5,32,18),LM(T,col)));break;
   case"cone":inner.add(new T.Mesh(new T.ConeGeometry(.5,1,32),LM(T,col)));break;
   case"torus":{const m=new T.Mesh(new T.TorusGeometry(.4,.12,16,48),LM(T,col));m.rotation.x=Math.PI/2;inner.add(m);break}
   case"board":{inner.add(new T.Mesh(new T.BoxGeometry(1,1,1),LM(T,col,{roughness:.7})));break}
   case"breadboard":{const b=breadboard(T,P.w||10,P.d||5);inner.add(b);break}
   case"resistor":{const r=resistorMesh(T);r.position.y=.45;inner.add(r);bandColors(P.ohm||330).forEach((c,i)=>r.userData.bands[i]&&r.userData.bands[i].material.color.set(c));
     [-1,1].forEach(s=>{const h=cylBetween(T,new T.Vector3(s*.62,.45,0),new T.Vector3(s*.75,.45,0),.025,metal);inner.add(h);const v=new T.Mesh(new T.CylinderGeometry(.025,.025,.45,8),metal);v.position.set(s*.75,.225,0);inner.add(v)});break}
   case"led":{const c=LED_COL[P.color]||"#ff3b3b";const l=ledMesh(T,new T.Color(c));l.position.y=.38;inner.add(l);m3Legs(T,inner,[-.12,.12],.38,metal);
     if(P.on){l.userData.mat.emissiveIntensity=1.5;const hc=document.createElement("canvas");hc.width=hc.height=64;const hg=hc.getContext("2d");const gr=hg.createRadialGradient(32,32,2,32,32,32);gr.addColorStop(0,c);gr.addColorStop(1,"rgba(0,0,0,0)");hg.fillStyle=gr;hg.fillRect(0,0,64,64);
       const s=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(hc),transparent:true,depthWrite:false,blending:T.AdditiveBlending}));s.scale.set(1.6,1.6,1);s.position.y=.75;inner.add(s);g.userData.glow=s;g.userData.ledMat=l.userData.mat}break}
   case"capacitor":{const b=new T.Mesh(new T.CylinderGeometry(.3,.3,.9,28),LM(T,col));b.position.y=.3+.45;inner.add(b);const st=new T.Mesh(new T.CylinderGeometry(.302,.302,.9,28,1,true,0,.7),LM(T,0xd9dde6));st.position.y=.75;inner.add(st);
     const top=new T.Mesh(new T.CylinderGeometry(.28,.28,.02,28),LM(T,0xc4c8cf,{metalness:.7}));top.position.y=1.21;inner.add(top);m3Legs(T,inner,[-.1,.1],.3,metal);break}
   case"ic":{const d=dipMesh(T,P.label||"74HC00",P.pins||14);d.position.y=.45;inner.add(d);break}
   case"battery":{if(P.kind==="aa"){const b=new T.Mesh(new T.CylinderGeometry(.28,.28,1.1,28),LM(T,col));b.rotation.z=Math.PI/2;b.position.y=.28;inner.add(b);const cap=new T.Mesh(new T.CylinderGeometry(.1,.1,.08,16),metal);cap.rotation.z=Math.PI/2;cap.position.set(.59,.28,0);inner.add(cap);
       const band=new T.Mesh(new T.CylinderGeometry(.285,.285,.35,28),LM(T,0xd9a42a));band.rotation.z=Math.PI/2;band.position.set(.35,.28,0);inner.add(band)}
     else{const b=new T.Mesh(new T.BoxGeometry(1,1.5,.6),LM(T,col));b.position.y=.75;inner.add(b);const lab=new T.Mesh(new T.BoxGeometry(1.01,.7,.61),LM(T,0xd9a42a));lab.position.y=.75;inner.add(lab);
       const p1=new T.Mesh(new T.CylinderGeometry(.12,.12,.18,6),metal);p1.position.set(.25,1.59,.15);inner.add(p1);const p2=new T.Mesh(new T.CylinderGeometry(.14,.14,.18,8),metal);p2.position.set(-.25,1.59,-.15);inner.add(p2);
       const sp=sprite(T,"+",{scale:.35});sp.position.set(.25,1.95,.15);inner.add(sp);const sm=sprite(T,"−",{scale:.35});sm.position.set(-.25,1.95,-.15);inner.add(sm)}break}
   case"transistor":{const b=new T.Mesh(new T.CylinderGeometry(.24,.24,.5,24,1,false,0,Math.PI),LM(T,col));b.position.y=.75;b.rotation.y=Math.PI/2;inner.add(b);const f=new T.Mesh(new T.BoxGeometry(.48,.5,.01),LM(T,col));f.position.y=.75;inner.add(f);m3Legs(T,inner,[-.14,0,.14],.5,metal);break}
   case"switch":{const b=new T.Mesh(new T.BoxGeometry(.8,.3,.45),LM(T,col));b.position.y=.15;inner.add(b);const lv=new T.Mesh(new T.CylinderGeometry(.05,.05,.45,10),LM(T,0xeeeeee));lv.position.set(0,.45,0);lv.rotation.z=P.on?-.45:.45;inner.add(lv);m3Legs(T,inner,[-.25,.25],.0001,metal);break}
   case"wire":{const pts=(P.pts||[]).map(q=>new T.Vector3(q[0],q[1],q[2]));const curve=new T.CatmullRomCurve3(pts,false,"centripetal");const m=new T.Mesh(new T.TubeGeometry(curve,Math.max(12,pts.length*14),P.r||.045,8,false),LM(T,col,{roughness:.45}));inner.add(m);
     if(P.flow){const len=curve.getLength();const n=Math.max(3,Math.min(60,Math.round(len/.32)));const dots=new T.InstancedMesh(new T.SphereGeometry(.06,10,8),new T.MeshBasicMaterial({color:0x7fd3ff}),n);inner.add(dots);g.userData.flow={curve,dots,n,t:0,len,dir:P.dir||1,speed:P.speed||1}}
     g.userData.isWire=true;break}
   case"text":{const s=m3LabelSprite(T,p.label||"Chú thích");s.scale.multiplyScalar(1.25);inner.add(s);g.userData.isText=true;break}
   case"arrow":{const sh=new T.Mesh(new T.CylinderGeometry(.06,.06,1,12),LM(T,col));sh.rotation.z=-Math.PI/2;sh.position.x=.5;inner.add(sh);const hd=new T.Mesh(new T.ConeGeometry(.16,.35,16),LM(T,col));hd.rotation.z=-Math.PI/2;hd.position.x=1.15;inner.add(hd);break}
  }
  if(p.label&&p.type!=="text"){const s=m3LabelSprite(T,p.label);s.position.y=(p.type==="breadboard"||p.type==="board")?.6:p.type==="battery"?2.3:1.5;g.add(s);g.userData.labelSprite=s}
  g.position.set(...p.pos);g.rotation.set(...p.rot.map(d=>d*Math.PI/180));inner.scale.set(...p.scale);
  g.userData.anim=p.anim;g.userData.inner=inner;return g;
}
function m3LabelSprite(T,text){const c=document.createElement("canvas");const g=c.getContext("2d");g.font="600 44px 'IBM Plex Sans',sans-serif";const w=Math.min(1400,Math.ceil(g.measureText(text).width)+60);c.width=w;c.height=84;
  g.fillStyle="rgba(15,20,26,.82)";g.beginPath();g.roundRect?g.roundRect(4,4,w-8,76,24):g.rect(4,4,w-8,76);g.fill();g.fillStyle="#fff";g.font="600 44px 'IBM Plex Sans',sans-serif";g.textBaseline="middle";g.fillText(text,30,44);
  const tx=new T.CanvasTexture(c);const s=new T.Sprite(new T.SpriteMaterial({map:tx,depthTest:false,transparent:true}));s.scale.set(w/84*.42,.42,1);s.renderOrder=9;return s}

/* ---------------- khung xem chỉnh sửa (xoay, kéo, chọn, chỉ vẽ lại khi cần) ---------------- */
function m3Viewer(T,stage,H){
  const r=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r.setPixelRatio(Math.min(2,devicePixelRatio||1));stage.prepend(r.domElement);
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,300);scene.add(new T.HemisphereLight(0xffffff,0x334455,.8));const d1=new T.DirectionalLight(0xffffff,.85);d1.position.set(5,9,6);scene.add(d1);const d2=new T.DirectionalLight(0xffe2c4,.3);d2.position.set(-6,3,-4);scene.add(d2);
  const grid=new T.GridHelper(30,60,0x6b7280,0x3a4150);grid.material.transparent=true;grid.material.opacity=.35;grid.position.y=-.36;scene.add(grid);
  let rx=.62,ry=-.45,dist=14;const tgt=new T.Vector3(0,.3,0);const cur={rx,ry,dist,tx:0,ty:.3,tz:0};let dirty=true;const el=r.domElement;
  const size=()=>{const w=stage.clientWidth||600,h=stage.clientHeight||400;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();dirty=true};const ro=new ResizeObserver(size);ro.observe(stage);size();
  const ray=new T.Raycaster(),ndc=new T.Vector2();const toNdc=(x,y)=>{const b=el.getBoundingClientRect();ndc.set((x-b.left)/b.width*2-1,-(y-b.top)/b.height*2+1);ray.setFromCamera(ndc,cam);return ray};
  const pts=new Map();let mode=null;
  el.addEventListener("contextmenu",e=>e.preventDefault());
  el.addEventListener("pointerdown",e=>{el.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY});
    if(pts.size===1){const ret=e.button===0?H.down(e,toNdc(e.clientX,e.clientY)):null;mode=ret==="drag"?"drag":(e.button===2||e.shiftKey&&e.button===0&&ret!=="drag")?"pan":"orbit"}else mode="pinch"});
  el.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId)){H.hover&&H.hover(e,toNdc(e.clientX,e.clientY));return}const p=pts.get(e.pointerId);const dx=e.clientX-p.x,dy=e.clientY-p.y;
    if(mode==="drag")H.move(e,toNdc(e.clientX,e.clientY));
    else if(mode==="orbit"){ry-=dx*.008;rx=Math.max(.05,Math.min(1.5,rx+dy*.008))}
    else if(mode==="pan"){const k=dist*.0016;const right=new T.Vector3(Math.cos(ry),0,-Math.sin(ry));tgt.addScaledVector(right,-dx*k);tgt.y+=dy*k}
    else if(mode==="pinch"&&pts.size===2){const o=[...pts.entries()].find(([k])=>k!==e.pointerId)[1];const a=Math.hypot(p.x-o.x,p.y-o.y),b=Math.hypot(e.clientX-o.x,e.clientY-o.y);if(b>0)dist=Math.max(3,Math.min(60,dist*a/b))}
    pts.set(e.pointerId,{...p,x:e.clientX,y:e.clientY});dirty=true});
  const up=e=>{const p=pts.get(e.pointerId);pts.delete(e.pointerId);if(mode==="drag")H.up(e);else if(p&&Math.hypot(e.clientX-p.x0,e.clientY-p.y0)<4&&mode==="orbit")H.click&&H.click(e,toNdc(e.clientX,e.clientY));if(!pts.size)mode=null};
  el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  el.addEventListener("wheel",e=>{e.preventDefault();dist=Math.max(3,Math.min(60,dist*(1+e.deltaY*.0012)));dirty=true},{passive:false});
  const frames=[];let raf=0,last=performance.now();
  const loop=now=>{raf=requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);last=now;let anim=false;frames.forEach(f=>{if(f(dt))anim=true});
    const k=1-Math.pow(.0005,dt);const prev=cur.rx+cur.ry+cur.dist+cur.tx+cur.ty+cur.tz;cur.rx+=(rx-cur.rx)*k;cur.ry+=(ry-cur.ry)*k;cur.dist+=(dist-cur.dist)*k;cur.tx+=(tgt.x-cur.tx)*k;cur.ty+=(tgt.y-cur.ty)*k;cur.tz+=(tgt.z-cur.tz)*k;
    const moving=Math.abs(prev-(cur.rx+cur.ry+cur.dist+cur.tx+cur.ty+cur.tz))>1e-5;if(!dirty&&!anim&&!moving)return;dirty=false;
    cam.position.set(cur.tx+cur.dist*Math.cos(cur.rx)*Math.sin(cur.ry),cur.ty+cur.dist*Math.sin(cur.rx),cur.tz+cur.dist*Math.cos(cur.rx)*Math.cos(cur.ry));cam.lookAt(cur.tx,cur.ty,cur.tz);r.render(scene,cam)};
  raf=requestAnimationFrame(loop);
  return {T,scene,cam,grid,el,renderer:r,ray:toNdc,onFrame:f=>frames.push(f),touch(){dirty=true},view(o){if(o.rx!=null)rx=o.rx;if(o.ry!=null)ry=o.ry;if(o.dist!=null)dist=o.dist;if(o.tgt)tgt.set(...o.tgt);dirty=true},get dist(){return dist},
    dispose(){cancelAnimationFrame(raf);ro.disconnect();scene.traverse(x=>{if(x.geometry)x.geometry.dispose();if(x.material){(Array.isArray(x.material)?x.material:[x.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})}});r.dispose();el.remove()}};
}

/* ---------------- trình chỉnh sửa ---------------- */
const M3_VOCAB=`HỆ TRỤC: y hướng lên, đơn vị ≈ 1 cm. Mặt trên breadboard ở y = 0 (breadboard 10×5 đặt tâm ở gốc, dải nguồn đỏ ở z = −2.25, xanh ở z = +2.25, rãnh giữa ở z = 0). Linh kiện điện tử có gốc ở chân nên đặt pos.y = 0 là cắm trên breadboard; pin đặt cạnh bảng ở y = −0.35.
LOẠI PART (type): box | cylinder | sphere | cone | torus (khối cơ bản, tâm ở pos, kích thước = scale [x,y,z]); board (bảng mạch in, scale [x,y,z]); breadboard (props.w, props.d); resistor (props.ohm, nằm dọc trục x, hai chân ở x = ±0.75); led (props.color: red|green|blue|yellow|white|orange; props.on: true/false; chân ở x = ±0.12); capacitor (props.label vd "100µF"); ic (props.label vd "74HC00"; props.pins 8|14|16; chân 1 ở góc x âm, z dương; bước chân 0.4); battery (props.kind "9v"|"aa"; cực + ở (pos.x+0.25, pos.y+1.75, pos.z+0.15), cực − ở (pos.x−0.25, pos.y+1.75, pos.z−0.15)); transistor (props.label); switch (props.on); wire (props.pts = mảng điểm TUYỆT ĐỐI [[x,y,z],…] từ 2–12 điểm, để pos [0,0,0]; props.flow true để hiện hạt electron chạy; props.dir 1 hoặc −1 đảo chiều); text (chữ nổi, nội dung ở "label"); arrow (mũi tên dài 1.3 theo trục x, dùng rot để xoay).
MỖI PART: {"id":"chuỗi ngắn","type":"…","name":"tên tiếng Việt","pos":[x,y,z],"rot":[độ quanh x,y,z],"scale":[x,y,z],"color":"#rrggbb","label":"chú thích nổi (tùy chọn)","props":{…},"anim":"none|spin|pulse|blink|bob"}.`;
let M3=null;
async function openModelEditor(a,seedSpec){
  const spec0=m3Clean(a&&a.data?a.data:seedSpec||M3_TPL.blank.spec);
  const st={spec:spec0,sel:null,tool:"move",snap:true,run:true,hist:[],fut:[],artId:a&&a.id||null,artNb:a?a.nb:(UI.cur&&UI.cur.id)||null,saved:true,tab:"lib",objs:new Map(),sugg:[],hook:{}};M3=st;
  UI.reopen=null;const _vm=UI.vmode;UI.vmode=innerWidth>720?"full":"full";
  openModal({title:"Xưởng mô hình 3D",actions:`<input class="input m3-title" id="m3T" value="${esc(st.spec.title)}" aria-label="Tên mô hình"><button class="pill-btn" id="m3Ask">${ic("chat")} Hỏi trợ lý</button><button class="pill-btn primary" id="m3Save">${ic("check")} Lưu vào Studio</button>`,
    body:`<div class="m3d"><div class="m3d-stage" id="m3St"><div class="loadmsg">Đang tải thư viện 3D…</div>
      <div class="m3-tb" role="toolbar" aria-label="Công cụ"><button data-tl="move" aria-pressed="true" title="Kéo linh kiện trên mặt phẳng (giữ Shift để nâng/hạ)">${ic("move")}<span>Di chuyển</span></button><button data-tl="rotate" aria-pressed="false" title="Kéo ngang để xoay linh kiện">${ic("rot")}<span>Xoay</span></button><i></i><button id="m3Un" title="Hoàn tác (Ctrl+Z)" aria-label="Hoàn tác">${ic("undo")}</button><button id="m3Re" title="Làm lại (Ctrl+Y)" aria-label="Làm lại">${ic("redo")}</button><i></i><button id="m3Sn" aria-pressed="true" title="Bám lưới 0,1">${ic("grid")}<span>Bám lưới</span></button><button id="m3Run" aria-pressed="true" title="Bật/tắt chuyển động">${ic("play")}<span>Chuyển động</span></button><button id="m3Shot" title="Chụp ảnh PNG" aria-label="Chụp ảnh">${ic("cam")}</button><button id="m3Fit" title="Nhìn toàn cảnh" aria-label="Nhìn toàn cảnh">${ic("expand")}</button></div>
      <span class="hint">Bấm để chọn · kéo linh kiện để di chuyển · kéo nền để xoay · chuột phải/Shift+kéo để dời khung · cuộn để phóng to</span></div>
     <aside class="m3d-side"><div class="rtab" role="tablist">${[["lib","Linh kiện"],["prop","Thuộc tính"],["list","Danh sách"],["ai","AI gợi ý"]].map(([k,l])=>`<button role="tab" data-m3tab="${k}" aria-selected="${k==="lib"}">${l}</button>`).join("")}</div><div class="m3-pane" id="m3P"></div></aside></div>`});
  UI.vmode=_vm;
  const snap=()=>{st.hist.push(JSON.stringify(st.spec));if(st.hist.length>80)st.hist.shift();st.fut=[];st.saved=false};
  const P_=id=>st.spec.parts.find(p=>p.id===id);
  $("#m3T").oninput=e=>{st.spec.title=e.target.value.slice(0,80);st.saved=false};
  let T;try{T=await ensureThree()}catch(e){const lm=$("#m3St .loadmsg");if(lm)lm.textContent="Không tải được thư viện 3D. Kiểm tra mạng rồi mở lại.";return}
  const stage=$("#m3St");if(!stage)return;$(".loadmsg",stage)?.remove();
  let drag=null;const helper=new T.BoxHelper(undefined,0xffc94d);helper.visible=false;
  const pick=ray=>{const hits=ray.intersectObjects([...st.objs.values()],true);for(const h of hits){let o=h.object;while(o&&!o.userData.pid)o=o.parent;if(o)return {pid:o.userData.pid,point:h.point}}return null};
  const V=m3Viewer(T,stage,{
    down(e,ray){if(st.hook.down){const r=st.hook.down(e,ray);if(r!==undefined)return r}const h=pick(ray);if(!h){return null}select(h.pid,true);const p=P_(h.pid);if(!p)return null;snap();
      if(st.tool==="rotate"){drag={kind:"rot",x0:e.clientX,r0:p.rot[1],p};return "drag"}
      const plane=new T.Plane(new T.Vector3(0,1,0),-p.pos[1]);const hit=new T.Vector3();ray.ray.intersectPlane(plane,hit);drag={kind:"move",p,off:hit?[p.pos[0]-hit.x,p.pos[2]-hit.z]:[0,0],y0:p.pos[1],sy:e.clientY,plane};stage.classList.add("dragging");return "drag"},
    move(e,ray){if(!drag)return;const p=drag.p;
      if(drag.kind==="rot"){p.rot[1]=Math.round((drag.r0+(e.clientX-drag.x0)*.6)/(st.snap?15:1))*(st.snap?15:1)}
      else if(e.shiftKey){p.pos[1]=Math.round((drag.y0+(drag.sy-e.clientY)*V.dist*.0016)*(st.snap?10:100))/(st.snap?10:100)}
      else{const hit=new T.Vector3();if(ray.ray.intersectPlane(drag.plane,hit)){const q=st.snap?10:100;p.pos[0]=Math.round((hit.x+drag.off[0])*q)/q;p.pos[2]=Math.round((hit.z+drag.off[1])*q)/q}}
      const o=st.objs.get(p.id);if(o){o.position.set(...p.pos);o.rotation.set(...p.rot.map(d=>d*Math.PI/180))}helper.update();if(st.hook.moved)st.hook.moved(p);V.touch();if(st.tab==="prop")syncPropInputs()},
    up(){stage.classList.remove("dragging");if(drag&&st.tab==="prop")drawPane();drag=null},
    click(e,ray){if(st.hook.click&&st.hook.click(e,ray))return;const h=pick(ray);if(!h)select(null)},
    hover(e,ray){if(st.hook.hover&&st.hook.hover(e,ray))return;const h=pick(ray);V.el.style.cursor=h?(st.tool==="rotate"?"ew-resize":"grab"):"default"}});
  V.scene.add(helper);
  const rebuild=id=>{const p=P_(id);const old=st.objs.get(id);if(old){V.scene.remove(old);old.traverse(x=>{if(x.geometry)x.geometry.dispose();if(x.material&&x.material.map)x.material.map.dispose()})}st.objs.delete(id);if(!p)return;const o=m3Build(T,p);V.scene.add(o);st.objs.set(id,o);if(st.sel===id){helper.setFromObject(o);helper.visible=true}V.touch()};
  const rebuildAll=()=>{[...st.objs.keys()].forEach(k=>{const o=st.objs.get(k);V.scene.remove(o)});st.objs.clear();if(st.hook.prebuild)st.hook.prebuild();st.spec.parts.forEach(p=>rebuild(p.id));if(!P_(st.sel))select(null);if(st.hook.rebuilt)st.hook.rebuilt();V.touch()};
  const select=(id,fromStage)=>{st.sel=id&&P_(id)?id:null;const o=st.objs.get(st.sel);if(o){helper.setFromObject(o);helper.visible=true}else helper.visible=false;V.touch();if(st.sel&&fromStage&&st.tab!=="prop"&&st.tab!=="ai"){st.tab="prop"}drawTabs();drawPane()};
  const fit=()=>{const b=new T.Box3();st.objs.forEach(o=>b.expandByObject(o));if(b.isEmpty())return V.view({dist:14,tgt:[0,.3,0]});const c=b.getCenter(new T.Vector3()),s=b.getSize(new T.Vector3()).length();V.view({tgt:[c.x,c.y,c.z],dist:Math.max(5,Math.min(50,s*1.25))})};
  /* chuyển động */
  const mtx=new T.Matrix4();let tAll=0;
  V.onFrame(dt=>{if(!st.run)return false;tAll+=dt;let any=false;st.objs.forEach(o=>{const a=o.userData.anim;const inn=o.userData.inner;
      if(a==="spin"){inn.rotation.y+=dt*1.2;any=true}else if(a==="pulse"){const k=1+Math.sin(tAll*3)*.06;const p=P_(o.userData.pid);if(p)inn.scale.set(p.scale[0]*k,p.scale[1]*k,p.scale[2]*k);any=true}
      else if(a==="bob"){inn.position.y=Math.sin(tAll*2)*.12;any=true}else if(a==="blink"){const on=Math.sin(tAll*5)>0;if(o.userData.ledMat)o.userData.ledMat.emissiveIntensity=on?1.6:.05;if(o.userData.glow)o.userData.glow.visible=on;inn.visible=o.userData.ledMat?true:on;any=true}
      const f=o.userData.flow;if(f){f.t=(f.t+dt*f.speed*.35/Math.max(1,f.len/4)*f.dir+1)%1;for(let i=0;i<f.n;i++){const u=((i/f.n+f.t)%1+1)%1;const q=f.curve.getPointAt(u);mtx.makeTranslation(q.x,q.y,q.z);f.dots.setMatrixAt(i,mtx)}f.dots.instanceMatrix.needsUpdate=true;any=true}});return any});
  /* ---------- bảng bên phải ---------- */
  const drawTabs=()=>$$("[data-m3tab]").forEach(b=>b.setAttribute("aria-selected",b.dataset.m3tab===st.tab));
  $$("[data-m3tab]").forEach(b=>b.onclick=()=>{st.tab=b.dataset.m3tab;drawTabs();drawPane()});
  const addPart=(type,extra={})=>{snap();const ids=new Set(st.spec.parts.map(p=>p.id));const n=st.spec.parts.filter(p=>p.type===type).length+1;const c=V.cam;const base={type,name:M3_TYPES[type].l+" "+n,pos:[Math.round((Math.random()-.5)*20)/10,type==="text"?2:M3_TYPES[type].prim?.6:0,Math.round((Math.random()-.5)*10)/10],props:type==="wire"?{pts:[[-1.5,.06,0],[0,.6,0],[1.5,.06,0]],flow:true}:{},...extra};
    const p=m3CleanPart(base,0,ids);st.spec.parts.push(p);rebuild(p.id);select(p.id);st.tab="prop";drawTabs();drawPane()};
  const del=id=>{snap();st.spec.parts=st.spec.parts.filter(p=>p.id!==id);rebuild(id);select(null)};
  const dup=id=>{const p=P_(id);if(!p)return;snap();const ids=new Set(st.spec.parts.map(x=>x.id));const c=m3CleanPart({...JSON.parse(JSON.stringify(p)),id:p.id+"b",name:p.name+" (bản sao)",pos:[p.pos[0]+.6,p.pos[1],p.pos[2]+.6]},0,ids);if(c.type==="wire")c.props.pts=c.props.pts.map(q=>[q[0]+.6,q[1],q[2]+.6]);st.spec.parts.push(c);rebuild(c.id);select(c.id)};
  function syncPropInputs(){const p=P_(st.sel);if(!p)return;["0","1","2"].forEach(i=>{const a=$(`[data-pp="pos${i}"]`),b=$(`[data-pp="rot${i}"]`);if(a&&document.activeElement!==a)a.value=p.pos[i];if(b&&document.activeElement!==b)b.value=p.rot[i]})}
  function drawPane(){const box=$("#m3P");if(!box)return;
    if(st.tab==="lib"){box.innerHTML=`<div class="m3-lib">${Object.entries(M3_TYPES).map(([k,t])=>`<button data-add="${k}" title="Thêm ${esc(t.l)}"><span class="g" style="color:${t.col}">${t.g}</span><span>${esc(t.l)}</span></button>`).join("")}</div>
        <h4>Mẫu có sẵn</h4><div class="m3-tpls">${Object.entries(M3_TPL).map(([k,t])=>`<button data-tpl="${k}"><b>${esc(t.l)}</b><small>${esc(t.d)}</small></button>`).join("")}</div>`;
      $$("[data-add]",box).forEach(b=>b.onclick=()=>addPart(b.dataset.add));
      $$("[data-tpl]",box).forEach(b=>b.onclick=()=>{const go=()=>{snap();st.spec=m3Clean(JSON.parse(JSON.stringify(M3_TPL[b.dataset.tpl].spec)));st.sugg=[];$("#m3T").value=st.spec.title;rebuildAll();fit();drawPane()};if(st.spec.parts.length>1)confirmDialog("Thay bằng mẫu này?","Mô hình hiện tại sẽ được thay thế (có thể hoàn tác bằng Ctrl+Z).","Thay",go);else go()});return}
    if(st.tab==="list"){box.innerHTML=st.spec.parts.length?`<div class="m3-list">${st.spec.parts.map(p=>`<div class="m3-row ${p.id===st.sel?"on":""}" data-pick="${esc(p.id)}"><span class="g" style="color:${p.type==="led"?LED_COL[p.props.color]:p.color}">${M3_TYPES[p.type].g}</span><span class="nm">${esc(p.name)}</span><small class="muted">${esc(M3_TYPES[p.type].l)}</small><button class="ghost ic" data-dup="${esc(p.id)}" aria-label="Nhân bản">${ic("dup")}</button><button class="ghost ic" data-del="${esc(p.id)}" aria-label="Xóa">${ic("trash")}</button></div>`).join("")}</div>`:`<div class="empty">Chưa có linh kiện. Chọn trong tab “Linh kiện”.</div>`;
      $$("[data-pick]",box).forEach(r=>r.onclick=e=>{if(e.target.closest("button"))return;select(r.dataset.pick);st.tab="prop";drawTabs();drawPane()});
      $$("[data-del]",box).forEach(b=>b.onclick=()=>{del(b.dataset.del);drawPane()});$$("[data-dup]",box).forEach(b=>b.onclick=()=>{dup(b.dataset.dup);drawPane()});return}
    if(st.tab==="prop"){const p=P_(st.sel);
      if(!p){box.innerHTML=`<div class="field"><label for="m3N">Ghi chú / giải thích mô hình</label><textarea class="input" id="m3N" placeholder="Mô hình này minh họa điều gì?">${esc(st.spec.notes)}</textarea></div><p class="muted" style="font-size:13px;margin:0">Bấm vào một linh kiện trong khung 3D (hoặc ở tab Danh sách) để chỉnh sửa vị trí, màu, giá trị…</p><div class="muted" style="font-size:13px">${st.spec.parts.length} linh kiện</div>`;
        const n=$("#m3N");n.onfocus=snap;n.oninput=()=>{st.spec.notes=n.value.slice(0,1200)};return}
      const P=p.props;const row=(k,lab,vals,step,lo,hi)=>`<div class="m3-vec"><span>${lab}</span>${vals.map((v,i)=>`<input type="number" step="${step}" min="${lo}" max="${hi}" value="${v}" data-pp="${k}${i}" aria-label="${lab} ${"xyz"[i]}">`).join("")}</div>`;
      box.innerHTML=`<div class="m3-prop"><div class="row2"><input class="input" data-pf="name" value="${esc(p.name)}" aria-label="Tên linh kiện"><span class="tagt">${esc(M3_TYPES[p.type].l)}</span></div>
        <div class="field"><label>Chú thích nổi</label><input class="input" data-pf="label" value="${esc(p.label)}" placeholder="Ví dụ: R = 330 Ω"></div>
        ${p.type!=="led"&&p.type!=="text"&&p.type!=="breadboard"&&p.type!=="ic"?`<div class="field"><label>Màu</label><input type="color" data-pf="color" value="${p.color}"></div>`:""}
        ${row("pos","Vị trí",p.pos,.1,-60,60)}${row("rot","Xoay (°)",p.rot,15,-360,360)}${p.type!=="wire"&&p.type!=="text"?row("scale","Tỉ lệ",p.scale,.1,.02,40):""}
        ${p.type==="resistor"?`<div class="field"><label>Giá trị (Ω) — vòng màu tự đổi</label><input type="number" min="1" max="10000000" data-pr="ohm" value="${P.ohm}"></div>`:""}
        ${p.type==="led"?`<div class="row2"><select data-pr="color">${Object.keys(LED_COL).map(c=>`<option value="${c}" ${P.color===c?"selected":""}>${{red:"Đỏ",green:"Xanh lá",blue:"Xanh dương",yellow:"Vàng",white:"Trắng",orange:"Cam"}[c]}</option>`).join("")}</select><label class="chk-row"><input type="checkbox" class="chk" data-pr="on" ${P.on?"checked":""}> Đang sáng</label></div>`:""}
        ${p.type==="ic"?`<div class="row2"><input class="input" data-pr="label" value="${esc(P.label)}" aria-label="Mã IC"><select data-pr="pins">${[8,14,16].map(n=>`<option ${P.pins===n?"selected":""}>${n}</option>`).join("")}</select></div>`:""}
        ${p.type==="capacitor"||p.type==="transistor"?`<div class="field"><label>Ký hiệu</label><input class="input" data-pr="label" value="${esc(P.label)}"></div>`:""}
        ${p.type==="battery"?`<div class="field"><label>Loại pin</label><select data-pr="kind"><option value="9v" ${P.kind==="9v"?"selected":""}>Pin 9 V</option><option value="aa" ${P.kind==="aa"?"selected":""}>Pin AA 1,5 V</option></select></div>`:""}
        ${p.type==="switch"?`<label class="chk-row"><input type="checkbox" class="chk" data-pr="on" ${P.on?"checked":""}> Đóng mạch</label>`:""}
        ${p.type==="breadboard"?`<div class="m3-vec"><span>Kích thước</span><input type="number" step="1" min="3" max="30" data-pr="w" value="${P.w}"><input type="number" step="1" min="2" max="14" data-pr="d" value="${P.d}"></div>`:""}
        ${p.type==="wire"?`<label class="chk-row"><input type="checkbox" class="chk" data-pr="flow" ${P.flow?"checked":""}> Hiện hạt electron chạy</label><div class="row2"><label class="chk-row"><input type="checkbox" class="chk" data-pr="dir" ${P.dir===-1?"checked":""}> Đảo chiều</label><input type="range" min=".2" max="4" step=".1" data-pr="speed" value="${P.speed}" aria-label="Tốc độ"></div>
          <div class="field"><label>Các điểm của dây</label><div class="m3-pts">${P.pts.map((q,i)=>`<div class="m3-vec"><span>${i+1}</span>${q.map((v,j)=>`<input type="number" step=".1" value="${v}" data-pt="${i}:${j}">`).join("")}<button class="ghost ic" data-ptdel="${i}" aria-label="Xóa điểm" ${P.pts.length<=2?"disabled":""}>${ic("close")}</button></div>`).join("")}</div><button class="btn" data-ptadd>${ic("plus")} Thêm điểm</button></div>`:""}
        <div class="field"><label>Chuyển động</label><select data-pf="anim">${Object.entries(M3_ANIM).map(([k,l])=>`<option value="${k}" ${p.anim===k?"selected":""}>${l}</option>`).join("")}</select></div>
        <div class="row2"><button class="btn" id="m3Dup">${ic("dup")} Nhân bản</button><button class="btn" id="m3Del" style="color:var(--bad)">${ic("trash")} Xóa</button><button class="btn" id="m3AskP">${ic("chat")} Hỏi về linh kiện</button></div></div>`;
      const live=(fn,re=true)=>e=>{if(!e.target._snapped){snap();e.target._snapped=true}fn(e.target);if(re)rebuild(p.id);else{const o=st.objs.get(p.id);if(o){o.position.set(...p.pos);o.rotation.set(...p.rot.map(d=>d*Math.PI/180));helper.update();V.touch()}}if(st.hook.moved)st.hook.moved(p)};
      $$("[data-pf]",box).forEach(x=>{const k=x.dataset.pf;x.addEventListener(x.tagName==="SELECT"?"change":"input",live(t=>{p[k]=k==="color"?hexc(t.value,p.color):t.value.slice(0,60)},k!=="name"));x.addEventListener("change",()=>{x._snapped=false;if(k==="name"&&st.tab==="list")drawPane()})});
      $$("[data-pp]",box).forEach(x=>{const k=x.dataset.pp,arr=k.slice(0,-1),i=+k.slice(-1);x.addEventListener("input",live(t=>{const lo=arr==="scale"?.02:arr==="rot"?-360:-60,hi=arr==="scale"?40:arr==="rot"?360:60;p[arr][i]=num(t.value,p[arr][i],lo,hi)},arr==="scale"));x.addEventListener("change",()=>x._snapped=false)});
      $$("[data-pr]",box).forEach(x=>{const k=x.dataset.pr;x.addEventListener(x.type==="checkbox"||x.tagName==="SELECT"?"change":"input",live(t=>{const v=t.type==="checkbox"?t.checked:t.value;
        if(k==="ohm")P.ohm=num(v,P.ohm,1,1e7);else if(k==="pins")P.pins=+v;else if(k==="w"||k==="d")P[k]=num(v,P[k],2,30);else if(k==="dir")P.dir=v?-1:1;else if(k==="speed")P.speed=num(v,1,.1,5);else if(k==="label")P.label=String(v).slice(0,14);else P[k]=v}));x.addEventListener("change",()=>x._snapped=false)});
      $$("[data-pt]",box).forEach(x=>{const [i,j]=x.dataset.pt.split(":").map(Number);x.addEventListener("input",live(t=>{P.pts[i][j]=num(t.value,P.pts[i][j])}));x.addEventListener("change",()=>x._snapped=false)});
      $$("[data-ptdel]",box).forEach(b=>b.onclick=()=>{if(P.pts.length<=2)return;snap();P.pts.splice(+b.dataset.ptdel,1);rebuild(p.id);drawPane()});
      const pa=$("[data-ptadd]",box);if(pa)pa.onclick=()=>{snap();const l=P.pts[P.pts.length-1];P.pts.push([l[0]+.8,l[1],l[2]]);rebuild(p.id);drawPane()};
      $("#m3Dup").onclick=()=>dup(p.id);$("#m3Del").onclick=()=>del(p.id);$("#m3AskP").onclick=()=>askChat(`Giải thích vai trò của "${p.name}" (${M3_TYPES[p.type].l}${p.type==="resistor"?", "+P.ohm+" Ω":""}) trong mô hình "${st.spec.title}".`);return}
    if(st.tab==="ai"){const can=!!P.sample;box.innerHTML=`<div class="m3-ai"><p class="muted" style="margin:0;font-size:13px">AI đọc mô hình hiện tại${UI.cur&&UI.srcs.length?" và các nguồn của bài học":""} rồi đề xuất chỉnh sửa. Bạn xem trước từng gợi ý và chọn áp dụng.</p>
        <textarea class="input" id="m3Q" placeholder="Ví dụ: thêm tụ lọc nguồn 100 µF, đổi LED sang xanh, đặt chú thích cho từng chân IC, làm mạch đúng với sơ đồ trong bài giảng…">${esc(st.q||"")}</textarea>
        <div class="row2"><button class="pill-btn primary" id="m3Sug" ${can?"":"disabled"}>${ic("spark")} Gợi ý chỉnh sửa</button><button class="pill-btn" id="m3Gen" ${can?"":"disabled"}>${ic("cube")} Tạo lại từ mô tả</button></div>${can?"":`<div class="warnbox">Trợ lý AI chưa sẵn sàng (cần cài đặt AI).</div>`}
        <div id="m3SugBox" class="m3-sugs">${st.sugg.map((s,i)=>`<div class="m3-sug ${s.done?"done":""}"><b>${esc(s.title||"Gợi ý "+(i+1))}</b>${s.why?`<span>${esc(s.why)}</span>`:""}<small class="muted">${(s.ops||[]).length} thay đổi</small><div class="row2"><button class="btn primary" data-apply="${i}" ${s.done?"disabled":""}>${s.done?"Đã áp dụng":"Áp dụng"}</button><button class="btn" data-skip="${i}">Bỏ qua</button></div></div>`).join("")}${st.sugg.filter(s=>!s.done).length>1?`<button class="btn" id="m3All">${ic("check")} Áp dụng tất cả</button>`:""}</div></div>`;
      const q=$("#m3Q");q.oninput=()=>st.q=q.value;
      const ctxText=async()=>{try{if(UI.cur&&UI.srcs.length){const c=await sourceContext(null,12000);return "\n\nNGUỒN:\n"+c.text}}catch(e){}return ""};
      const compact=()=>JSON.stringify({title:st.spec.title,parts:st.spec.parts.map(p=>{const o={id:p.id,type:p.type,name:p.name,pos:p.pos};if(p.rot.some(x=>x))o.rot=p.rot;if(p.scale.some(x=>x!==1))o.scale=p.scale;if(p.label)o.label=p.label;if(Object.keys(p.props).length)o.props=p.props;if(p.anim!=="none")o.anim=p.anim;if(M3_TYPES[p.type].prim||p.type==="wire"||p.type==="board")o.color=p.color;return o})});
      const busy=(b,on,t)=>{b.disabled=on;b.innerHTML=on?`<span class="spin"></span> ${t}`:b._h};
      const sb=$("#m3Sug");if(sb){sb._h=sb.innerHTML;sb.onclick=async()=>{busy(sb,true,"Đang nghĩ…");try{const r=await P.sample.json(`${rulesFor()}\n\nBạn là trợ giảng thiết kế mô hình 3D minh họa cho môn điện tử.\n${M3_VOCAB}\n\nMÔ HÌNH HIỆN TẠI (JSON):\n${compact()}\n\nYÊU CẦU CỦA NGƯỜI HỌC: ${st.q||"Hãy đề xuất cách làm mô hình đúng kỹ thuật, dễ hiểu và trực quan hơn (vị trí linh kiện, dây nối đúng chân, chú thích, giá trị linh kiện hợp lý)."}\n\nNHIỆM VỤ: Đưa ra 2–5 gợi ý chỉnh sửa độc lập. Mỗi gợi ý: "title" (≤ 10 từ), "why" (1–2 câu, nêu lý do kỹ thuật), "ops" là danh sách thao tác: {"op":"add","part":{…part đầy đủ…}} | {"op":"update","id":"…","set":{trường cần đổi, vd "pos":[…],"props":{…},"label":"…"}} | {"op":"remove","id":"…"}. Chỉ dùng id đang có khi update/remove.\nTrả về CHỈ JSON: {"suggestions":[{"title":"…","why":"…","ops":[…]}]}${await ctxText()}`,{modelTier:"default"});
          st.sugg=(r.suggestions||[]).slice(0,6).map(s=>({title:String(s.title||"").slice(0,80),why:String(s.why||"").slice(0,400),ops:Array.isArray(s.ops)?s.ops.slice(0,30):[]}));if(!st.sugg.length)toast("AI chưa đưa ra gợi ý nào");}catch(e){toast(aiErr(e),4500)}drawPane()}}
      const gb=$("#m3Gen");if(gb){gb._h=gb.innerHTML;gb.onclick=()=>{const go=async()=>{busy(gb,true,"Đang dựng…");try{const sp=await m3Generate(st.q||st.spec.title,await ctxText());snap();st.spec=sp;st.sugg=[];$("#m3T").value=sp.title;rebuildAll();fit();toast("Đã dựng mô hình mới — Ctrl+Z để quay lại bản cũ")}catch(e){toast(aiErr(e),4500)}drawPane()};if(st.spec.parts.length>1)confirmDialog("Tạo lại toàn bộ?","Mô hình hiện tại sẽ được thay bằng bản AI dựng (có thể hoàn tác).","Tạo lại",go);else go()}}
      $$("[data-apply]",box).forEach(b=>b.onclick=()=>{applySug(+b.dataset.apply);drawPane()});$$("[data-skip]",box).forEach(b=>b.onclick=()=>{st.sugg.splice(+b.dataset.skip,1);drawPane()});
      const all=$("#m3All");if(all)all.onclick=()=>{st.sugg.forEach((s,i)=>{if(!s.done)applySug(i,true)});rebuildAll();drawPane()}}
  }
  function applySug(i,batch){const s=st.sugg[i];if(!s||s.done)return;if(!batch)snap();else if(!st._bsnap){snap();st._bsnap=true;setTimeout(()=>st._bsnap=false,0)}
    const ids=new Set(st.spec.parts.map(p=>p.id));let n=0;
    (s.ops||[]).forEach(op=>{try{if(op.op==="add"&&op.part){const c=m3CleanPart(op.part,st.spec.parts.length,ids);if(c){st.spec.parts.push(c);n++}}
      else if(op.op==="remove"){const before=st.spec.parts.length;st.spec.parts=st.spec.parts.filter(p=>p.id!==op.id);if(st.spec.parts.length<before)n++}
      else if(op.op==="update"){const k=st.spec.parts.findIndex(p=>p.id===op.id);if(k<0)return;const old=st.spec.parts[k];const set=op.set||{};const merged={...old,...set,props:{...old.props,...(set.props||{})},id:old.id,type:set.type&&M3_TYPES[set.type]?set.type:old.type};const ids2=new Set(st.spec.parts.filter(p=>p!==old).map(p=>p.id));const c=m3CleanPart(merged,k,ids2);if(c){st.spec.parts[k]=c;n++}}}catch(e){}});
    s.done=true;if(!batch)rebuildAll();toast(n?`Đã áp dụng ${n} thay đổi`:"Gợi ý không khớp mô hình hiện tại")}
  const askChat=txt=>{if(!UI.cur){toast("Mở một bài học để hỏi trợ lý về mô hình");return}closeViewer();chatSend(txt+`\n\nMô hình gồm: ${st.spec.parts.map(p=>p.name+(p.label?" ("+p.label+")":"")).join(", ")}.`)};
  /* thanh công cụ */
  $$("[data-tl]").forEach(b=>b.onclick=()=>{st.tool=b.dataset.tl;$$("[data-tl]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  const undo=()=>{if(!st.hist.length)return toast("Không còn gì để hoàn tác");st.fut.push(JSON.stringify(st.spec));st.spec=JSON.parse(st.hist.pop());$("#m3T").value=st.spec.title;rebuildAll();drawPane();st.saved=false};
  const redo=()=>{if(!st.fut.length)return;st.hist.push(JSON.stringify(st.spec));st.spec=JSON.parse(st.fut.pop());$("#m3T").value=st.spec.title;rebuildAll();drawPane();st.saved=false};
  $("#m3Un").onclick=undo;$("#m3Re").onclick=redo;
  $("#m3Sn").onclick=e=>{st.snap=!st.snap;e.currentTarget.setAttribute("aria-pressed",st.snap)};
  $("#m3Run").onclick=e=>{st.run=!st.run;e.currentTarget.setAttribute("aria-pressed",st.run);V.touch()};
  $("#m3Fit").onclick=fit;
  $("#m3Shot").onclick=()=>{helper.visible=false;V.touch();requestAnimationFrame(()=>requestAnimationFrame(()=>{V.renderer.domElement.toBlob(b=>{saveFile(slug(st.spec.title||"mo-hinh")+".png",b,"image/png");if(st.sel)helper.visible=true;V.touch()},"image/png")}))};
  $("#m3Ask").onclick=()=>askChat(`Giải thích mô hình 3D "${st.spec.title}": các linh kiện, cách nối và hiện tượng vật lý. ${st.spec.notes}`);
  $("#m3Save").onclick=async()=>{const b=$("#m3Save");b.disabled=true;const data=JSON.parse(JSON.stringify(st.spec));try{
      if(st.artId){await Store.patch(st.artId,{data,title:data.title,updated:Date.now()})}else{const id=mkid("art");await Store.put(id,{type:"art",nb:st.artNb||null,kind:"model3d",status:"done",title:data.title,data,cfg:{},srcLabels:UI.cur?UI.srcs.filter(s=>s.on!==false).map(s=>s.name):[],created:Date.now()});st.artId=id}
      st.saved=true;toast(st.artNb?"Đã lưu vào Studio của bài học":"Đã lưu vào “Mô hình của bạn”")}catch(e){toast("Chưa lưu được: "+(e.message||e))}b.disabled=false};
  const key=e=>{if(!document.body.contains(stage)){document.removeEventListener("keydown",key);return}if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;const p=P_(st.sel);
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"){e.preventDefault();e.shiftKey?redo():undo();return}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"){e.preventDefault();redo();return}
    if(!p)return;const d=e.shiftKey?.5:.1;let ch=true;
    if(e.key==="Delete"||e.key==="Backspace"){del(p.id);drawPane();return}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="d"){e.preventDefault();dup(p.id);return}
    else if(e.key==="ArrowLeft")p.pos[0]-=d;else if(e.key==="ArrowRight")p.pos[0]+=d;else if(e.key==="ArrowUp")p.pos[2]-=d;else if(e.key==="ArrowDown")p.pos[2]+=d;else if(e.key==="PageUp")p.pos[1]+=d;else if(e.key==="PageDown")p.pos[1]-=d;else if(e.key.toLowerCase()==="r")p.rot[1]=(p.rot[1]+15)%360;else ch=false;
    if(ch){if(!key._t)snap();clearTimeout(key._t);key._t=setTimeout(()=>key._t=0,700);e.preventDefault();p.pos=p.pos.map(x=>Math.round(x*100)/100);const o=st.objs.get(p.id);if(o){o.position.set(...p.pos);o.rotation.set(...p.rot.map(x=>x*Math.PI/180))}helper.update();if(st.hook.moved)st.hook.moved(p);V.touch();syncPropInputs()}};
  document.addEventListener("keydown",key);
  st.api={T,V,stage,rebuild,rebuildAll,select,snap,drawPane,P_,pick,fit,helper,del};(window.M3_PLUG||[]).forEach(f=>{try{f(st)}catch(err){console.warn("m3 plugin",err)}});
  rebuildAll();fit();drawPane();
  UI.modalCleanup=()=>{document.removeEventListener("keydown",key);if(st.hook.dispose)st.hook.dispose();V.dispose();M3=null};
}
async function m3Generate(desc,ctx){
  const r=await P.sample.json(`${rulesFor()}\n\nBạn là trợ giảng dựng MÔ HÌNH 3D minh họa cho môn điện tử/kỹ thuật số.\n${M3_VOCAB}\n\nNHIỆM VỤ: Dựng một mô hình 3D (6–30 part) minh họa: ${desc}. Đặt linh kiện hợp lý, dây nối đúng chân, có 1–3 chú thích "text" giải thích hiện tượng. "notes": 2–4 câu giải thích mô hình (bám nguồn nếu có).\nTrả về CHỈ JSON: {"title":"…","notes":"…","parts":[…]}${ctx||""}`,{modelTier:"default"});
  const sp=m3Clean(r);if(!sp.parts.length)throw Object.assign(new Error("AI chưa dựng được mô hình"),{code:"invalid_json"});return sp}
function m3GenDialog(){
  openModal({title:"AI dựng mô hình 3D",small:true,body:`<div class="form"><p class="muted" style="margin:0;font-size:13.5px">Mô tả mô hình bạn muốn. ${UI.cur&&UI.srcs.length?"AI sẽ bám theo các nguồn đang chọn của bài học.":"Mở từ một bài học để AI bám theo tài liệu của bạn."}</p><textarea class="input" id="gD" placeholder="Ví dụ: mạch chia áp hai điện trở 10 kΩ từ pin 9 V, có chú thích điện áp ở điểm giữa">${UI.cur?esc("Mô hình minh họa nội dung chính của bài "+UI.cur.title):""}</textarea></div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="gGo">${ic("spark")} Dựng mô hình</button>`});
  $("#gGo").onclick=async()=>{const b=$("#gGo");b.disabled=true;b.innerHTML=`<span class="spin"></span> Đang dựng…`;let ctx="";try{if(UI.cur&&UI.srcs.length){const c=await sourceContext(null,12000);ctx="\n\nNGUỒN:\n"+c.text}}catch(e){}
    try{const sp=await m3Generate($("#gD").value.trim()||"một mạch điện tử cơ bản",ctx);closeDialog();openModelEditor(null,sp)}catch(e){toast(aiErr(e),4500);b.disabled=false;b.textContent="Thử lại"}};
}
/* danh mục: thêm phần mô hình chỉnh sửa được */
const _openLabCatalog10=openLabCatalog;
openLabCatalog=async function(){const p=_openLabCatalog10();const pad=$(".mbody .pad");if(pad){const sec=document.createElement("div");sec.className="m3-cat";
    let mine=[];try{mine=(await Store.query({type:"art"})).filter(x=>x.kind==="model3d").sort((a,b)=>(b.updated||b.created||0)-(a.updated||a.created||0)).slice(0,12)}catch(e){}
    if(!$(".mbody .pad"))return p;
    sec.innerHTML=`<div class="eyebrow" style="margin-bottom:8px">Xưởng mô hình — tự tạo &amp; chỉnh sửa</div><div class="catalog"><button class="cat new" data-m3new>${ic("plus")}<b>Tạo mô hình mới</b><span>Kéo thả linh kiện, chỉnh vị trí, màu, giá trị, dây nối</span></button><button class="cat new" data-m3ai ${P.sample?"":"disabled"}>${ic("spark")}<b>AI dựng mô hình</b><span>Mô tả bằng lời${UI.cur&&UI.srcs.length?", bám theo nguồn bài học":""}</span></button>${Object.entries(M3_TPL).filter(([k])=>k!=="blank").map(([k,t])=>`<button class="cat" data-m3tpl="${k}">${ic("cube")}<b>${esc(t.l)}</b><span>${esc(t.d)} · chỉnh sửa được</span></button>`).join("")}</div>
      ${mine.length?`<div class="eyebrow" style="margin:14px 0 8px">Mô hình của bạn</div><div class="catalog">${mine.map(m=>`<button class="cat" data-m3open="${esc(m.id)}">${ic("cube")}<b>${esc(m.title)}</b><span>${(m.data&&m.data.parts||[]).length} linh kiện${m.nb?" · trong bài học":""}</span></button>`).join("")}</div>`:""}`;
    pad.insertBefore(sec,pad.children[1]||null);
    $("[data-m3new]",sec).onclick=()=>openModelEditor(null,M3_TPL.blank.spec);$("[data-m3ai]",sec).onclick=m3GenDialog;
    $$("[data-m3tpl]",sec).forEach(b=>b.onclick=()=>openModelEditor(null,JSON.parse(JSON.stringify(M3_TPL[b.dataset.m3tpl].spec))));
    $$("[data-m3open]",sec).forEach(b=>b.onclick=()=>{const m=mine.find(x=>x.id===b.dataset.m3open);if(m)openModelEditor(m)})}return p};
const _openLab10=openLab;
openLab=function(k){const pr=_openLab10(k);const t=Object.entries(M3_TPL).find(([,v])=>v.lab===k);const bk=$("#labBack");if(t&&bk){const b=document.createElement("button");b.className="pill-btn";b.innerHTML=`${ic("edit")} Mở bản chỉnh sửa`;b.onclick=()=>openModelEditor(null,JSON.parse(JSON.stringify(t[1].spec)));bk.after(b)}return pr};
{const s=STUDIO.find(x=>x.k==="lab");if(s){s.l="Mô hình 3D";s.isNew=true}KLABEL.lab="Mô hình 3D";KLABEL.model3d="Mô hình 3D";}

/* =====================================================================
   v7 — ĐỒNG BỘ MÀU THANH CÔNG CỤ VỚI CẢNH NỀN · ÂM THANH / NHẠC NỀN (bật/tắt tiếng)
   ===================================================================== */
/* ---------- lấy bảng màu từ cảnh nền ---------- */
const rgb2hsl=(r,g,b)=>{r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0;const l=(mx+mn)/2;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6}return [h,s,l]};
const hsl2hex=(h,s,l)=>{const f=n=>{const k=(n+h*12)%12,a=s*Math.min(l,1-l);const c=l-a*Math.max(-1,Math.min(k-3,9-k,1));return Math.round(c*255).toString(16).padStart(2,"0")};return "#"+f(0)+f(8)+f(4)};
function paletteOf(src){
  const c=document.createElement("canvas");c.width=c.height=28;const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(src,0,0,28,28);const d=g.getImageData(0,0,28,28).data;
  const bins=new Map();let lum=0,n=0;
  for(let i=0;i<d.length;i+=4){if(d[i+3]<128)continue;const [h,s,l]=rgb2hsl(d[i],d[i+1],d[i+2]);lum+=l;n++;const k=Math.round(h*18)%18;const b=bins.get(k)||{c:0,s:0,h:0,l:0,hx:0,hy:0};b.c++;b.s+=s;b.l+=l;b.hx+=Math.cos(h*2*Math.PI);b.hy+=Math.sin(h*2*Math.PI);bins.set(k,b)}
  if(!n)return null;const L=[...bins.values()].map(b=>({n:b.c,s:b.s/b.c,l:b.l/b.c,h:((Math.atan2(b.hy,b.hx)/(2*Math.PI))+1)%1}));
  const dom=L.slice().sort((a,b)=>b.n-a.n)[0];
  const vivid=L.filter(x=>x.n>=n*.025).sort((a,b)=>(b.n*Math.pow(b.s,1.6)*(1-Math.abs(b.l-.6)))-(a.n*Math.pow(a.s,1.6)*(1-Math.abs(a.l-.6))));
  const acc=vivid[0]||dom;const sec=vivid.find(x=>{const dh=Math.min(Math.abs(x.h-acc.h),1-Math.abs(x.h-acc.h));return dh>.12})||vivid[1]||acc;
  return {dom,acc,sec,lum:lum/n}}
let _palKey="";
async function syncTheme(){
  const r=document.documentElement;const props=["--accent","--accent-soft","--accent-ink","--sig","--sig-soft","--tint","--frame"];
  if(!UI.bg.sync){if(_palKey){props.forEach(p=>r.style.removeProperty(p));document.body.classList.remove("synced");_palKey="";applyPrefs(UI.profile)}return}
  const src=bgSrc();const key=JSON.stringify([src,UI.skin,local.get("bnrSeed","so-hoc")]);if(key===_palKey)return;
  let img;try{if(src.img){img=new Image();img.crossOrigin="anonymous";img.src=src.img;await img.decode()}else img=sceneCanvas(src.scene,160,90,local.get("bnrSeed","so-hoc"))}catch(e){return}
  let pal=null;try{pal=paletteOf(img)}catch(e){return}if(!pal)return;_palKey=key;
  const dark=r.getAttribute("data-theme")!=="light";
  const tone=(x,lD,lL,sMin)=>hsl2hex(x.h,Math.max(sMin,Math.min(.85,x.s*1.15)),dark?lD:lL);
  const acc=tone(pal.acc,.7,.5,.45),sig=tone(pal.sec,.72,.46,.35),tint=hsl2hex(pal.dom.h,Math.min(.7,Math.max(.25,pal.dom.s)),dark?.55:.6);
  const ink=(()=>{const [,,l]=rgb2hsl(...hex2(acc));return l>.6?"#1a1420":"#ffffff"})();
  r.style.setProperty("--accent",acc);r.style.setProperty("--accent-soft",`color-mix(in srgb, ${acc} 22%, var(--panel))`);r.style.setProperty("--accent-ink",ink);
  r.style.setProperty("--sig",sig);r.style.setProperty("--sig-soft",`color-mix(in srgb, ${sig} 20%, var(--panel))`);r.style.setProperty("--tint",tint);
  if(r.classList.contains("pixel"))r.style.setProperty("--frame",`color-mix(in srgb, ${tint} 55%, var(--line))`);
  document.body.classList.add("synced");const m=$('meta[name="theme-color"]');if(m)m.content=getComputedStyle(document.querySelector(".top")||document.body).backgroundColor;
}
UI.bg.sync=UI.bg.sync!==false;
const _applyBg11=applyBg;applyBg=function(...a){const r=_applyBg11.apply(this,a);syncTheme();return r};
const _drawBanner11=drawBanner;drawBanner=function(...a){const r=_drawBanner11.apply(this,a);syncTheme();return r};
const _saveBg11=saveBg;saveBg=function(){local.set("bgSync",UI.bg.sync);local.set("bgSnd",UI.snd);return _saveBg11()};
UI.bg.sync=local.get("bgSync",true);
const _applyPrefs11=applyPrefs;applyPrefs=function(pf){if(UI.bg&&UI.bg.sync&&_palKey){const m=$("#main");if(m)m.style.zoom=pf&&pf.scale&&pf.scale!==1?pf.scale:"";return}return _applyPrefs11(pf)};

/* =====================================================================
   ÂM THANH NỀN — tự tạo bằng Web Audio, không cần tệp; có thể thêm nhạc của bạn
   ===================================================================== */
const SND_KINDS={scene:"Theo cảnh nền",waves:"Sóng biển",night:"Đêm & côn trùng",city:"Phố & chim hót",garden:"Vườn & chuông gió",rain:"Mưa rơi",lofi:"Nhạc lofi tự tạo",box:"Hộp nhạc"};
const SCENE_SND={auto:()=>isNightSkin()?"night":"city",day:"city",night:"night",beach:"waves",pinksky:"night",desk:"lofi",sunset:"city",cottage:"garden"};
UI.snd=Object.assign({on:false,vol:.5,kind:"scene",music:false,track:null,tracks:[]},local.get("bgSnd",{}));
const SND={ctx:null,master:null,duck:null,cur:null,curKind:null,audio:null,buf:{},
  init(){if(this.ctx)return this.ctx;try{this.ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return null}const c=this.ctx;this.master=c.createGain();this.duck=c.createGain();this.master.connect(this.duck);this.duck.connect(c.destination);this.master.gain.value=0;return c},
  noise(type){if(this.buf[type])return this.buf[type];const c=this.ctx,len=c.sampleRate*6,b=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);let l=0,b0=0,b1=0,b2=0,b3=0,b4=0,b5=0;for(let i=0;i<len;i++){const w=Math.random()*2-1;
    if(type==="brown"){l=(l+.02*w)/1.02;d[i]=l*3.5}else if(type==="pink"){b0=.99886*b0+w*.0555179;b1=.99332*b1+w*.0750759;b2=.969*b2+w*.153852;b3=.8665*b3+w*.3104856;b4=.55*b4+w*.5329522;b5=-.7616*b5-w*.016898;d[i]=(b0+b1+b2+b3+b4+b5+w*.5362)*.11}else d[i]=w*.5}
    for(let i=0;i<2000;i++){const k=i/2000;d[i]*=k;d[len-1-i]*=k}}return this.buf[type]=b},
  src(type,loop=true){const s=this.ctx.createBufferSource();s.buffer=this.noise(type);s.loop=loop;return s},
  bell(t,f,v=.12,dec=2.2,out){const c=this.ctx;[1,2.01,3.99].forEach((m,i)=>{const o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=f*m;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v/(i*1.8+1),t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dec/(i+1));o.connect(g);g.connect(out||this.master);o.start(t);o.stop(t+dec+.1)})},
  chirp(t,f0,f1,dur,v,out){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+dur);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+dur*.2);g.gain.linearRampToValueAtTime(0,t+dur);o.connect(g);g.connect(out||this.master);o.start(t);o.stop(t+dur+.02)},
  build(kind){const c=this.ctx,out=c.createGain();out.connect(this.master);const nodes=[out],timers=[];const t0=c.currentTime;
    const lp=(f,q=.7)=>{const x=c.createBiquadFilter();x.type="lowpass";x.frequency.value=f;x.Q.value=q;nodes.push(x);return x},hp=f=>{const x=c.createBiquadFilter();x.type="highpass";x.frequency.value=f;nodes.push(x);return x};
    const lfo=(rate,depth,target,base)=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=rate;g.gain.value=depth;o.connect(g);g.connect(target);target.value=base;o.start();nodes.push(o,g)};
    const bed=(type,f,vol,mod)=>{const s=this.src(type),f1=lp(f),g=c.createGain();g.gain.value=vol;s.connect(f1);f1.connect(g);g.connect(out);s.start(t0,Math.random()*5);nodes.push(s,g);if(mod)lfo(mod[0],mod[1]*vol,g.gain,vol);return g};
    const every=(lo,hi,fn)=>{let alive=true;const tick=()=>{if(!alive)return;try{fn(c.currentTime+.05)}catch(e){}timers.push(setTimeout(tick,(lo+Math.random()*(hi-lo))*1000))};timers.push(setTimeout(tick,500+Math.random()*1500));timers.push({stop(){alive=false}})};
    if(kind==="waves"){bed("pink",520,.55,[.075,.75]);const f=hp(1800),s=this.src("white"),g=c.createGain();g.gain.value=.05;s.connect(f);f.connect(g);g.connect(out);s.start();nodes.push(s,g);lfo(.075,.05,g.gain,.05)}
    else if(kind==="night"){bed("brown",380,.22,[.05,.5]);every(.25,1.6,t=>{const f=4200+Math.random()*700,n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++)this.chirp(t+i*.06,f,f*1.02,.035,.035)});every(5,12,t=>this.chirp(t,600,520,.5,.02))}
    else if(kind==="city"){bed("brown",260,.3,[.03,.3]);every(2.5,7,t=>{const n=2+Math.floor(Math.random()*4),f=2400+Math.random()*1800;for(let i=0;i<n;i++)this.chirp(t+i*.12,f,f*(1.25+Math.random()*.3),.09,.03)})}
    else if(kind==="garden"){bed("pink",900,.12,[.06,.6]);const PEN=[1046.5,1174.7,1318.5,1568,1760,2093];every(1.2,4,t=>{const k=1+Math.floor(Math.random()*3);for(let i=0;i<k;i++)this.bell(t+i*(.15+Math.random()*.3),PEN[Math.floor(Math.random()*PEN.length)],.05,3)});every(3,8,t=>{const f=2800+Math.random()*1200;for(let i=0;i<3;i++)this.chirp(t+i*.1,f,f*1.3,.08,.025)})}
    else if(kind==="rain"){bed("pink",2600,.45,[.1,.15]);const f=hp(3000),s=this.src("white"),g=c.createGain();g.gain.value=.06;s.connect(f);f.connect(g);g.connect(out);s.start();nodes.push(s,g);every(.05,.4,t=>{const o=c.createOscillator(),gg=c.createGain();o.frequency.value=2000+Math.random()*3000;gg.gain.setValueAtTime(.015,t);gg.gain.exponentialRampToValueAtTime(.0001,t+.04);o.connect(gg);gg.connect(out);o.start(t);o.stop(t+.05)})}
    else if(kind==="lofi"||kind==="box"){const box=kind==="box";const bpm=box?84:72,beat=60/bpm;
      const N=m=>440*Math.pow(2,(m-69)/12);const prog=[[65,69,72,76],[62,65,69,72],[67,70,74,77],[60,64,67,71]];const scale=[72,74,76,79,81,84];
      const pad=lp(box?3000:1300),pg=c.createGain();pg.gain.value=box?0:.09;pad.connect(pg);pg.connect(out);nodes.push(pg);
      const crack=c.createGain();crack.gain.value=box?0:.025;crack.connect(out);nodes.push(crack);if(!box){const s=this.src("white"),f=hp(4000);s.connect(f);f.connect(crack);s.start();nodes.push(s)}
      let next=c.currentTime+.1,step=0;let alive=true;
      const sched=()=>{if(!alive)return;while(next<c.currentTime+.4){const bar=Math.floor(step/8)%4,ch=prog[bar],t=next;
          if(step%8===0&&!box)ch.forEach((m,i)=>{const o=c.createOscillator(),g=c.createGain();o.type="triangle";o.frequency.value=N(m-12);o.detune.value=(i-1.5)*6;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.22,t+.6);g.gain.setValueAtTime(.22,t+beat*7.2);g.gain.linearRampToValueAtTime(0,t+beat*8);o.connect(g);g.connect(pad);o.start(t);o.stop(t+beat*8+.05)});
          if(!box&&(step%8===0||step%8===5)){const o=c.createOscillator(),g=c.createGain();o.type="sine";o.frequency.value=N(ch[0]-24);g.gain.setValueAtTime(.22,t);g.gain.exponentialRampToValueAtTime(.001,t+beat*1.8);o.connect(g);g.connect(out);o.start(t);o.stop(t+beat*2)}
          if(!box&&step%4===0){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(42,t+.18);g.gain.setValueAtTime(.35,t);g.gain.exponentialRampToValueAtTime(.001,t+.25);o.connect(g);g.connect(out);o.start(t);o.stop(t+.3)}
          if(!box&&step%4===2){const s=this.src("white",false),f=lp(1800),g=c.createGain();g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);s.connect(f);f.connect(g);g.connect(out);s.start(t,Math.random()*3,.2)}
          if(!box&&step%2===1){const s=this.src("white",false),f=hp(7000),g=c.createGain();g.gain.setValueAtTime(.025,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);s.connect(f);f.connect(g);g.connect(out);s.start(t,Math.random()*3,.06)}
          if(Math.random()<(box?.7:.33))this.bell(t,N(box?scale[Math.floor(Math.random()*6)]:scale[Math.floor(Math.random()*6)]),box?.07:.045,box?1.6:1.2,out);
          next+=beat/2;step++}timers.push(setTimeout(sched,120))};sched();timers.push({stop(){alive=false}})}
    return {nodes,timers,out}},
  stopCur(fade=.6){const cur=this.cur;this.cur=null;this.curKind=null;if(!cur)return;const c=this.ctx;try{cur.out.gain.setTargetAtTime(0,c.currentTime,fade/3)}catch(e){}setTimeout(()=>{cur.timers.forEach(t=>{if(t&&t.stop)t.stop();else clearTimeout(t)});cur.nodes.forEach(n=>{try{n.stop&&n.stop()}catch(e){}try{n.disconnect()}catch(e){}})},fade*1000+200)},
  async apply(){const s=UI.snd;if(!s.on){if(this.ctx)this.master.gain.setTargetAtTime(0,this.ctx.currentTime,.25);if(this.audio)this.audio.pause();updSndBtn();return}
    const c=this.init();if(!c)return;if(c.state==="suspended"){try{await c.resume()}catch(e){}}if(c.state!=="running"){waitGesture();updSndBtn();return}
    this.master.gain.setTargetAtTime(s.vol*.9,c.currentTime,.3);
    const tr=s.track&&s.tracks.find(t=>t.id===s.track);
    let kind=s.kind==="scene"?(()=>{const b=bgSrc();const m=SCENE_SND[b.scene||"auto"];return b.img?"lofi":typeof m==="function"?m():m||"city"})():s.kind;
    if(tr){kind=s.music?kind:null}
    if(kind!==this.curKind){this.stopCur();if(kind){this.cur=this.build(kind);this.curKind=kind}}
    if(tr){if(!this.audio||this.audio._id!==tr.id){if(this.audio){this.audio.pause();if(this.audio._obj)URL.revokeObjectURL(this.audio.src)}const a=new Audio();a.loop=true;a._id=tr.id;a.preload="auto";
        try{const r=await fetch(tr.url);if(!r.ok)throw 0;const b=await r.blob();a.src=URL.createObjectURL(b);a._obj=true}catch(e){a.src=tr.url}this.audio=a}
      this.audio.volume=Math.min(1,s.vol*(this._ducked?.35:1));this.audio.play().catch(()=>waitGesture())}
    else if(this.audio){this.audio.pause()}
    updSndBtn()}};
let _gw=false;function waitGesture(){if(_gw)return;_gw=true;const go=()=>{_gw=false;removeEventListener("pointerdown",go,true);removeEventListener("keydown",go,true);SND.apply()};addEventListener("pointerdown",go,true);addEventListener("keydown",go,true)}
/* hạ nhạc khi đang đọc bài giảng */
setInterval(()=>{if(!SND.ctx||!UI.snd.on)return;let sp=false;try{sp=speechSynthesis.speaking}catch(e){}if(sp!==SND._ducked){SND._ducked=sp;SND.duck.gain.setTargetAtTime(sp?.3:1,SND.ctx.currentTime,.2);if(SND.audio)SND.audio.volume=Math.min(1,UI.snd.vol*(sp?.35:1))}},500);
function saveSnd(){local.set("bgSnd",UI.snd);clearTimeout(saveSnd._t);saveSnd._t=setTimeout(()=>Store.put("snd-me",{type:"snd",vol:+UI.snd.vol,kind:UI.snd.kind,music:!!UI.snd.music,track:UI.snd.track||null,tracks:UI.snd.tracks.map(t=>({id:t.id,name:t.name,url:t.url,asset:t.asset||null}))}).catch(()=>{}),600)}
async function loadSnd(){try{const d=await Store.get("snd-me");if(d){Object.assign(UI.snd,{vol:d.vol??.5,kind:d.kind||"scene",music:!!d.music,track:d.track||null,tracks:Array.isArray(d.tracks)?d.tracks:[]});local.set("bgSnd",UI.snd);updSndBtn();if(UI.snd.on)SND.apply()}}catch(e){}}
async function addTracks(files){for(const f of files.filter(f=>/^audio\//.test(f.type)||/\.(mp3|m4a|ogg|wav|aac|flac|opus)$/i.test(f.name)).slice(0,5)){
    if(f.size>30e6){toast(f.name+" lớn hơn 30 MB — chọn tệp nhỏ hơn");continue}
    let url=null,asset=null;if(P.assets){try{const up=await P.assets.upload(f);url=up.url;asset=up.id}catch(e){}}
    if(!url){if(f.size>4e6){toast("Không lưu được nhạc ở chế độ này: "+f.name);continue}url=await fileToURL(f)}
    const id=mkid("tr");UI.snd.tracks.push({id,name:f.name.replace(/\.[^.]+$/,"").slice(0,60),url,asset});UI.snd.track=id}
  UI.snd.on=true;saveSnd();SND.apply();toast("Đã thêm nhạc của bạn")}
function updSndBtn(){$$("[data-snd]").forEach(b=>{const on=UI.snd.on;b.innerHTML=ic(on?"vol":"mute")+(b.dataset.snd==="lbl"?`<span class="hide-sm">${on?"Âm thanh":"Tắt tiếng"}</span>`:"");b.setAttribute("aria-pressed",on);b.title=on?"Đang phát âm thanh nền — bấm để chỉnh hoặc tắt":"Âm thanh nền đang tắt — bấm để bật"})}
function sndPopover(anchor){
  const s=UI.snd;const m=popMenu(anchor,`<div class="who">Âm thanh nền</div><div class="sndpop">
    <div class="row2"><button class="pill-btn ${s.on?"primary":""}" id="sOn">${ic(s.on?"vol":"mute")} ${s.on?"Đang bật":"Đang tắt"}</button><input type="range" min="0" max="1" step=".05" value="${s.vol}" id="sVol2" aria-label="Âm lượng"></div>
    <div class="field"><label for="sKind">Âm thanh</label><select id="sKind">${Object.entries(SND_KINDS).map(([k,l])=>`<option value="${k}" ${s.kind===k?"selected":""}>${l}</option>`).join("")}</select></div>
    <div class="field"><span>Nhạc của bạn</span><div class="trk">${s.tracks.map(t=>`<div class="trk-r ${s.track===t.id?"on":""}"><button class="nm" data-tr="${esc(t.id)}">${ic("music")} ${esc(t.name)}</button><button class="ghost ic" data-trdel="${esc(t.id)}" aria-label="Xóa">${ic("trash")}</button></div>`).join("")}<label class="btn">${ic("plus")} Thêm tệp nhạc (mp3, m4a…)<input type="file" accept="audio/*" multiple hidden id="sFile"></label>${s.track?`<button class="btn" id="sNoTr">Không dùng nhạc của tôi</button><label class="chk-row"><input type="checkbox" class="chk" id="sMix" ${s.music?"checked":""}> Phát kèm âm thanh cảnh nền</label>`:""}</div></div>
    <p class="muted" style="font-size:12px;margin:0">Âm thanh tự hạ nhỏ khi bài giảng đang đọc. Có thể tắt nhanh bằng nút loa trên thanh trên cùng.</p></div>`);
  m.classList.add("wide");m.addEventListener("click",e=>e.stopPropagation());
  {const r=anchor.getBoundingClientRect(),w=m.offsetWidth,h=m.offsetHeight;m.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+"px";m.style.top=Math.max(8,Math.min(innerHeight-h-8,r.bottom+6))+"px"}
  const re=()=>{closePop();sndPopover(anchor)};
  $("#sOn",m).onclick=()=>{s.on=!s.on;local.set("bgSnd",s);SND.apply();re()};
  $("#sVol2",m).oninput=e=>{s.vol=+e.target.value;if(SND.ctx&&s.on)SND.master.gain.setTargetAtTime(s.vol*.9,SND.ctx.currentTime,.1);if(SND.audio)SND.audio.volume=s.vol;clearTimeout(m._t);m._t=setTimeout(saveSnd,300)};
  $("#sKind",m).onchange=e=>{s.kind=e.target.value;s.on=true;if(s.track&&!s.music)s.track=null;saveSnd();SND.apply();re()};
  $$("[data-tr]",m).forEach(b=>b.onclick=()=>{s.track=b.dataset.tr;s.on=true;saveSnd();SND.apply();re()});
  $$("[data-trdel]",m).forEach(b=>b.onclick=()=>{const t=s.tracks.find(x=>x.id===b.dataset.trdel);s.tracks=s.tracks.filter(x=>x!==t);if(t&&t.asset&&P.assets)P.assets.delete(t.asset).catch(()=>{});if(s.track===b.dataset.trdel)s.track=null;saveSnd();SND.apply();re()});
  $("#sFile",m).onchange=e=>addTracks([...e.target.files]).then(re);
  const nt=$("#sNoTr",m);if(nt)nt.onclick=()=>{s.track=null;saveSnd();SND.apply();re()};const mx=$("#sMix",m);if(mx)mx.onchange=()=>{s.music=mx.checked;saveSnd();SND.apply()};
  setTimeout(()=>{const off=e=>{if(!m.contains(e.target)){closePop();document.removeEventListener("pointerdown",off,true)}};document.addEventListener("pointerdown",off,true)},0);
}
/* nút loa luôn có trên thanh trên cùng; cảnh nền đổi → âm thanh đổi theo */
const _renderTop11=renderTop;renderTop=function(...a){const r=_renderTop11.apply(this,a);const t=$("#top");if(t&&!$("#tSnd",t)){const b=document.createElement("button");b.className="ghost ic snd-btn";b.id="tSnd";b.dataset.snd="1";t.appendChild(b);
  let pt=0;b.onclick=e=>{sndPopover(b)};b.oncontextmenu=e=>{e.preventDefault();UI.snd.on=!UI.snd.on;local.set("bgSnd",UI.snd);SND.apply()};updSndBtn()}return r};
const _applyBg11b=applyBg;applyBg=function(...a){const r=_applyBg11b.apply(this,a);if(UI.snd&&UI.snd.on&&UI.snd.kind==="scene")SND.apply();return r};
document.addEventListener("keydown",e=>{if(e.key.toLowerCase()==="m"&&e.altKey){e.preventDefault();UI.snd.on=!UI.snd.on;local.set("bgSnd",UI.snd);SND.apply();toast(UI.snd.on?"Đã bật âm thanh nền":"Đã tắt tiếng")}});
/* bảng Cảnh nền: thêm lựa chọn đồng bộ màu + âm thanh */
const _bgPickerHTML11=bgPickerHTML;bgPickerHTML=function(){return _bgPickerHTML11()+`<label class="chk-row"><input type="checkbox" class="chk" data-bgsync ${UI.bg.sync?"checked":""}> ${ic("sync")} Đồng bộ màu thanh công cụ, thanh tiện ích, bảng với cảnh nền</label>
  <div class="bg-snd"><button class="btn" data-bgsnd>${ic(UI.snd.on?"vol":"mute")} Âm thanh nền: ${UI.snd.on?esc(UI.snd.track?((UI.snd.tracks.find(t=>t.id===UI.snd.track)||{}).name||"nhạc của bạn"):SND_KINDS[UI.snd.kind]):"đang tắt"}</button></div>`};
const _bindBgPicker11=bindBgPicker;bindBgPicker=function(root,after){_bindBgPicker11(root,after);const s=$("[data-bgsync]",root);if(s)s.onchange=()=>{UI.bg.sync=s.checked;_palKey=s.checked?"":_palKey;saveBg();syncTheme()};const b=$("[data-bgsnd]",root);if(b)b.onclick=e=>{e.stopPropagation();sndPopover(b)}};
const _applySkin11=applySkin;applySkin=function(...a){const r=_applySkin11.apply(this,a);_palKey="";try{syncTheme()}catch(e){}return r};
setTimeout(()=>{syncTheme();loadSnd();if(UI.snd.on)SND.apply()},0);

/* =====================================================================
   v8 — CẢNH NỀN CHUYỂN ĐỘNG + BIỂU TƯỢNG BAY THEO TỪNG CẢNH
   (vẽ lớp pixel động phủ lên cảnh tĩnh; ~20 khung/giây, dừng khi ẩn thẻ hoặc bật "Giảm chuyển động")
   ===================================================================== */
const FX_SYMS={auto:"Theo cảnh nền",star:"Sao lấp lánh",petal:"Cánh hoa anh đào",heart:"Trái tim",bubble:"Bong bóng",snow:"Tuyết",firefly:"Đom đóm",rain:"Mưa",note:"Nốt nhạc",none:"Không có"};
const FX_SCENE={
 day:{sym:["petal","petal","bird"],clouds:1},night:{sym:["twinkle","firefly"],shoot:1},auto:null,
 beach:{sym:["glint","bubble"],waves:1},pinksky:{sym:["twinkle","star"],moon:1,shoot:1},desk:{sym:["heart","xmark","star"],clouds:1},
 sunset:{sym:["twinkle","bird"],pinkClouds:1},cottage:{sym:["firefly","petalW"],lights:1},img:{sym:["star","petal"]}};
UI.bg.anim=local.get("bgAnim",true);UI.bg.sym=local.get("bgSym","auto");
const fxRand=(a,b)=>a+Math.random()*(b-a);
function fxCfg(){const s=bgSrc();if(s.img)return FX_SCENE.img;const k=s.scene||"auto";if(k==="auto")return isNightSkin()?FX_SCENE.night:FX_SCENE.day;return FX_SCENE[k]||FX_SCENE.day}
function fxSyms(cfg){const o=UI.bg.sym;if(o==="none")return[];if(o&&o!=="auto")return [o];return cfg.sym}
function fxSpawn(kind,w,h,init){const p={k:kind,x:fxRand(0,w),y:init?fxRand(0,h):-4,t:fxRand(0,6.28),v:1};
  if(kind==="petal"||kind==="petalW"){p.vx=fxRand(4,10);p.vy=fxRand(5,11);if(!init){p.x=fxRand(-w*.2,w)}if(kind==="petalW"){p.x=init?fxRand(0,w*.4):fxRand(0,w*.35);p.y=init?fxRand(h*.1,h):fxRand(h*.1,h*.4)}}
  else if(kind==="snow"){p.vx=fxRand(-2,2);p.vy=fxRand(4,9)}
  else if(kind==="rain"){p.vx=-3;p.vy=fxRand(70,100);p.y=init?fxRand(0,h):-6}
  else if(kind==="bubble"||kind==="heart"||kind==="note"){p.vx=fxRand(-1.5,1.5);p.vy=-fxRand(3,7);p.y=init?fxRand(0,h):h+5;p.r=kind==="bubble"?Math.round(fxRand(1,2.6)):1}
  else if(kind==="xmark"||kind==="star"){p.vx=fxRand(-1,1);p.vy=-fxRand(1,3);p.y=init?fxRand(0,h):h+4;p.life=fxRand(6,12)}
  else if(kind==="twinkle"){p.y=fxRand(0,h*.55);p.vx=0;p.vy=0;p.sp=fxRand(1.2,3)}
  else if(kind==="glint"){const sh=x=>h*.34+x*(h*.42/w)+Math.sin(x/17)*3;p.x=fxRand(0,w);p.y=fxRand(0,Math.max(4,sh(p.x)-6));p.vx=0;p.vy=0;p.sp=fxRand(1.5,4)}
  else if(kind==="firefly"){p.y=fxRand(h*.45,h*.95);p.vx=fxRand(-3,3);p.vy=fxRand(-2,2);p.sp=fxRand(1,2.4)}
  else if(kind==="bird"){p.x=-8;p.y=fxRand(h*.08,h*.35);p.vx=fxRand(10,18);p.vy=0;if(init)p.x=fxRand(-w,0)}
  return p}
const FXC={petal:["#ffb7d5","#ff9cc6","#ffe0ee"],petalW:["#ffffff","#f8d3e6","#f5b8d6"],heart:["#f08bb8","#ff9cc6","#8aa0e0"],star:["#ffffff","#fff4fa","#ffe8a0"],twinkle:["#ffffff","#fff6d8"],glint:["#ffffff","#e8fbff"],firefly:["#fff3a0","#ffe066"],snow:["#ffffff"],rain:["#cfe6ff"],bubble:["#f4fbff"],note:["#ffffff","#f8d3e6"],xmark:["#f08bb8","#8aa0e0"],bird:["#5b5470"]};
function fxDraw(g,p,t){const c=FXC[p.k]||["#fff"];const col=c[Math.floor(p.t*10)%c.length];const X=Math.round(p.x),Y=Math.round(p.y);g.fillStyle=col;
  switch(p.k){
   case"petal":case"petalW":{const f=Math.floor((t*3+p.t)%4);if(f===0)g.fillRect(X,Y,2,1);else if(f===1)g.fillRect(X,Y,1,2);else if(f===2){g.fillRect(X,Y,2,1);g.fillRect(X+1,Y+1,1,1)}else g.fillRect(X,Y,1,1);break}
   case"snow":g.fillRect(X,Y,p.t>3?2:1,p.t>3?2:1);break;
   case"rain":g.globalAlpha=.65;g.fillRect(X,Y,1,4);g.globalAlpha=1;break;
   case"bubble":{const r=p.r;g.globalAlpha=.85;for(let a=0;a<8;a++){const an=a/8*6.283;g.fillRect(Math.round(X+Math.cos(an)*r),Math.round(Y+Math.sin(an)*r),1,1)}g.fillStyle="#ffffff";g.fillRect(X-Math.ceil(r/2),Y-Math.ceil(r/2),1,1);g.globalAlpha=1;break}
   case"heart":g.globalAlpha=Math.min(1,(p.y)/20);[[1,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[1,2],[2,2],[3,2],[2,3]].forEach(([a,b])=>g.fillRect(X+a,Y+b,1,1));g.globalAlpha=1;break;
   case"note":g.globalAlpha=Math.min(1,p.y/20);g.fillRect(X+2,Y,1,4);g.fillRect(X+3,Y,2,1);g.fillRect(X,Y+3,2,2);g.globalAlpha=1;break;
   case"xmark":g.globalAlpha=Math.max(0,Math.min(1,p.life/3));for(let i=-1;i<=1;i++){g.fillRect(X+i,Y+i,1,1);g.fillRect(X+i,Y-i,1,1)}g.globalAlpha=1;break;
   case"star":{g.globalAlpha=Math.max(0,Math.min(1,p.life/3))*(.6+.4*Math.sin(t*4+p.t));const n=Math.sin(t*3+p.t)>.3?2:1;g.fillRect(X,Y-n,1,2*n+1);g.fillRect(X-n,Y,2*n+1,1);g.globalAlpha=1;break}
   case"twinkle":case"glint":{const a=Math.sin(t*p.sp+p.t);if(a<.2)break;g.globalAlpha=a;if(a>.85){g.fillRect(X,Y-1,1,3);g.fillRect(X-1,Y,3,1)}else g.fillRect(X,Y,1,1);g.globalAlpha=1;break}
   case"firefly":{const a=.5+.5*Math.sin(t*p.sp+p.t);g.globalAlpha=a*.35;g.fillRect(X-1,Y-1,3,3);g.globalAlpha=a;g.fillRect(X,Y,1,1);g.globalAlpha=1;break}
   case"bird":{const f=Math.floor(t*6+p.t)%2;g.fillRect(X,Y,1,1);g.fillRect(X+1,Y+1,1,1);g.fillRect(X+2,Y,1,1);if(f){g.fillRect(X-1,Y-1,1,1);g.fillRect(X+3,Y-1,1,1)}else{g.fillRect(X-1,Y+1,1,1);g.fillRect(X+3,Y+1,1,1)}break}
  }}
function fxStep(p,dt,t,w,h){
  if(p.k==="petal"||p.k==="petalW"){p.x+=(p.vx+Math.sin(t*1.5+p.t)*6)*dt;p.y+=p.vy*dt;return p.y<h+4&&p.x<w+6}
  if(p.k==="snow"){p.x+=(p.vx+Math.sin(t+p.t)*3)*dt;p.y+=p.vy*dt;return p.y<h+3}
  if(p.k==="rain"){p.x+=p.vx*dt;p.y+=p.vy*dt;return p.y<h+4}
  if(p.k==="bubble"||p.k==="heart"||p.k==="note"){p.x+=(p.vx+Math.sin(t*1.3+p.t)*2.5)*dt;p.y+=p.vy*dt;return p.y>-6}
  if(p.k==="xmark"||p.k==="star"){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;return p.life>0&&p.y>-4}
  if(p.k==="firefly"){p.vx+=fxRand(-6,6)*dt;p.vy+=fxRand(-6,6)*dt;p.vx=Math.max(-4,Math.min(4,p.vx));p.vy=Math.max(-3,Math.min(3,p.vy));p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<h*.35||p.y>h)p.vy*=-1;return true}
  if(p.k==="bird"){p.x+=p.vx*dt;p.y+=Math.sin(t*2+p.t)*3*dt;return p.x<w+10}
  return true}
const _fxL=new Map();let _fxRaf=0,_fxLast=0;
function fxAttach(host,w,h){if(!host)return;let L=_fxL.get(host);
  if(!L){const c=document.createElement("canvas");c.className="fx-layer";c.setAttribute("aria-hidden","true");host.appendChild(c);L={host,c,g:c.getContext("2d"),parts:[],t:0,w:0,h:0,key:""};_fxL.set(host,L)}
  else if(!L.c.isConnected)host.appendChild(L.c);
  if(L.w!==w||L.h!==h){L.c.width=w;L.c.height=h;L.g=L.c.getContext("2d");L.g.imageSmoothingEnabled=false;L.w=w;L.h=h;L.parts=[]}
  const cfg=fxCfg();const syms=fxSyms(cfg);const key=JSON.stringify([syms,cfg,w,h]);if(key!==L.key){L.key=key;L.cfg=cfg;L.syms=syms;L.parts=[];const n=Math.round(w*h/1400);for(let i=0;i<n&&syms.length;i++)L.parts.push(fxSpawn(syms[i%syms.length],w,h,true));L.clouds=null}
  fxKick()}
function fxDetach(host){const L=_fxL.get(host);if(L){L.c.remove();_fxL.delete(host)}}
function fxOn(){return UI.bg.anim&&!RM()&&!document.hidden}
function fxKick(){if(_fxRaf||!fxOn())return;_fxLast=performance.now();_fxRaf=requestAnimationFrame(fxLoop)}
document.addEventListener("visibilitychange",()=>{if(!document.hidden)fxKick()});
function fxLoop(now){_fxRaf=0;if(!fxOn()){_fxL.forEach(L=>L.g.clearRect(0,0,L.w,L.h));return}
  const dt=(now-_fxLast)/1000;if(dt<.045){_fxRaf=requestAnimationFrame(fxLoop);return}_fxLast=now;const d=Math.min(.1,dt);
  _fxL.forEach((L,host)=>{if(!host.isConnected){_fxL.delete(host);return}const r=host.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||r.width<2)return;
    L.t+=d;const {g,w,h,cfg,t}=L;g.clearRect(0,0,w,h);
    if(cfg.waves)fxWaves(g,w,h,L.t);if(cfg.pinkClouds||cfg.clouds)fxClouds(L,d);if(cfg.moon)fxMoon(g,w,h,L.t);if(cfg.lights)fxLights(g,w,h,L.t);
    if(cfg.shoot){L.sh=L.sh||{t:fxRand(2,6)};L.sh.t-=d;if(L.sh.t<0&&!L.sh.on){L.sh.on={x:fxRand(w*.2,w*.9),y:fxRand(2,h*.25),k:0}}if(L.sh.on){const s=L.sh.on;s.k+=d;for(let i=0;i<7;i++){g.globalAlpha=(1-i/7)*(1-s.k/.7);g.fillStyle="#fff";g.fillRect(Math.round(s.x-s.k*120+i*2),Math.round(s.y+s.k*45-i*.75),1,1)}g.globalAlpha=1;if(s.k>.7){L.sh.on=null;L.sh.t=fxRand(4,10)}}}
    for(let i=L.parts.length-1;i>=0;i--){const p=L.parts[i];if(!fxStep(p,d,L.t,w,h)){L.parts[i]=fxSpawn(p.k,w,h,false)}fxDraw(g,p,L.t)}});
  if(_fxL.size)_fxRaf=requestAnimationFrame(fxLoop)}
/* sóng biển: nước tràn lên rồi rút xuống bãi cát */
function fxWaves(g,w,h,t){const sh=x=>h*.34+x*(h*.42/w)+Math.sin(x/17)*3+Math.sin(x/7)*1.2;
  for(let x=0;x<w;x++){const s=sh(x);const ph=t*.7+x/55;const adv=(Math.sin(ph)*.5+.5)*h*.07+(Math.sin(t*.31+x/23)*.5+.5)*h*.015;
    g.fillStyle="rgba(143,196,208,.78)";g.fillRect(x,Math.round(s-1),1,Math.round(adv));g.fillStyle="rgba(244,251,252,.95)";g.fillRect(x,Math.round(s+adv-1),1,2);
    if((x*7+Math.floor(t*4))%11===0){g.fillStyle="rgba(255,255,255,.8)";g.fillRect(x,Math.round(s+adv-3-((x*13)%4)),1,1)}
    const back=(Math.sin(ph-1.2)*.5+.5);if(back>.6&&(x*5)%9===0){g.fillStyle="rgba(233,203,211,.6)";g.fillRect(x,Math.round(s+adv+2+back*3),1,1)}}}
/* mây trôi chậm */
function fxClouds(L,d){const {g,w,h,cfg}=L;if(!L.clouds){L.clouds=Array.from({length:cfg.pinkClouds?4:3},(_,i)=>({x:fxRand(0,w),y:fxRand(h*.06,h*.32),s:fxRand(h*.03,h*.055),v:fxRand(1.5,4)}))}
  const cols=cfg.pinkClouds?["#c48fc8","#f3a9c2","#fbd2d6"]:["#dbe4fa","#ffffff","#ffffff"];
  L.clouds.forEach(c=>{c.x+=c.v*d;if(c.x-c.s*3>w)c.x=-c.s*3;const R=Math.max(3,Math.round(c.s));g.globalAlpha=.88;
    [[-1.1,.15,.6],[-.4,-.2,.8],[.35,-.3,.9],[1.05,.05,.65],[.2,.25,.8]].forEach(([a,b,k],i)=>{const rr=Math.round(R*k);for(let dy=-rr;dy<=rr;dy++){const hw=Math.floor(Math.sqrt(rr*rr-dy*dy));g.fillStyle=dy>rr*.35?cols[0]:dy<-rr*.4?cols[2]:cols[1];g.fillRect(Math.round(c.x+a*R-hw),Math.round(c.y+b*R+dy),hw*2+1,1)}});g.globalAlpha=1})}
/* vầng sáng quanh trăng và đèn đường */
function fxMoon(g,w,h,t){const mx=w*.84,my=h*.2,mr=Math.max(8,h*.11);const a=.35+.3*Math.sin(t*.9);g.fillStyle="#fbe8f2";for(let k=0;k<90;k++){const an=k/90*6.283+t*.05;const f=1.85+Math.sin(t*.9+k)*.04;if(k%2){g.globalAlpha=a*(.5+.5*Math.sin(an*3+t));g.fillRect(Math.round(mx+Math.cos(an)*mr*f),Math.round(my+Math.sin(an)*mr*f),1,1)}}
  const lx=Math.round(w*.23),ly=Math.round(h*.3+7);const b=.25+.15*Math.sin(t*2.3)+.05*Math.sin(t*13);g.globalAlpha=b;g.fillStyle="#fff4f8";for(let dy=-7;dy<=7;dy++){const hw=Math.floor(Math.sqrt(49-dy*dy));g.fillRect(lx+15-hw,ly+dy,hw*2+1,1)}g.globalAlpha=1}
/* dây đèn nhấp nháy trước hiên nhà */
function fxLights(g,w,h,t){const hx=w*.36,hy=h*.32,hw=w*.38,hh=h*.36;for(let k=0;k<=24;k++){const tt=k/24;const on=Math.sin(t*2+k*1.7)>-.2;const x=Math.round(hx+tt*hw),y=Math.round(hy+hh*.02+Math.sin(tt*Math.PI)*hh*.12);g.globalAlpha=on?.95:.25;g.fillStyle=k%3===0?"#ffd6e6":"#fff1b8";g.fillRect(x,y,1,1);if(on){g.globalAlpha=.25;g.fillRect(x-1,y-1,3,3)}}g.globalAlpha=1}

/* gắn lớp động vào hình nền toàn trang và banner */
const _applyBg12=applyBg;applyBg=function(...a){const r=_applyBg12.apply(this,a);const w=$("#wall");
  if(w&&UI.bg.wall&&!w.hidden){const W=innerWidth>=innerHeight?320:180,H=Math.max(90,Math.min(600,Math.round(W*innerHeight/Math.max(1,innerWidth))));const src=bgSrc();
    if(src.img){const k=Math.min(1,320/Math.max(innerWidth,1));fxAttach(w,Math.round(innerWidth*k)||320,Math.round(innerHeight*k)||180)}else fxAttach(w,W,H);w.classList.add("anim")}else if(w){fxDetach(w);w.classList.remove("anim")}
  return r};
const _drawBanner12=drawBanner;drawBanner=function(...a){const r=_drawBanner12.apply(this,a);const cv=$("#bnr");const b=cv&&cv.closest(".banner");if(b){if(UI.bg.wall)fxDetach(b);else fxAttach(b,320,90)}return r};
/* lựa chọn trong bảng Cảnh nền */
const _bgPickerHTML12=bgPickerHTML;bgPickerHTML=function(){return _bgPickerHTML12().replace(/<label class="chk-row"><input type="checkbox" class="chk" data-bgo="fx"[^]*?<\/label>/,"")+`<label class="chk-row"><input type="checkbox" class="chk" data-bganim ${UI.bg.anim?"checked":""}> Cảnh nền chuyển động (sóng, mây trôi, đèn nhấp nháy…)</label>
  <div class="field"><label>Biểu tượng bay trên nền</label><div class="sym-pick">${Object.entries(FX_SYMS).map(([k,l])=>`<button class="chip" data-bgsym="${k}" aria-pressed="${UI.bg.sym===k}" title="${esc(l)}">${fxSymIcon(k)}<span>${esc(l)}</span></button>`).join("")}</div></div>`};
function fxSymIcon(k){const px={star:[[2,0],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[2,3],[2,4]],petal:[[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[1,2],[2,2],[2,3]],heart:[[1,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[1,2],[2,2],[3,2],[2,3]],bubble:[[1,0],[2,0],[3,0],[0,1],[4,1],[0,2],[4,2],[1,3],[2,3],[3,3],[1,1]],snow:[[2,0],[0,1],[2,1],[4,1],[1,2],[2,2],[3,2],[0,3],[2,3],[4,3],[2,4]],firefly:[[2,1],[1,2],[2,2],[3,2],[2,3]],rain:[[1,0],[1,1],[3,1],[1,2],[3,2],[3,3]],note:[[3,0],[4,0],[3,1],[3,2],[1,3],[2,3],[3,3],[1,4],[2,4]],auto:[[0,0],[4,0],[2,2],[0,4],[4,4],[2,0],[0,2],[4,2],[2,4]],none:[[0,0],[1,1],[2,2],[3,3],[4,4],[4,0],[3,1],[1,3],[0,4]]}[k]||[];
  const col={star:"#ffd45a",petal:"#ff9cc6",heart:"#f08bb8",bubble:"#7fd3ff",snow:"#ffffff",firefly:"#ffe066",rain:"#8fc6ff",note:"#c7b5f0",auto:"var(--accent)",none:"var(--muted)"}[k];
  return `<svg viewBox="0 0 5 5" width="15" height="15" shape-rendering="crispEdges" aria-hidden="true">${px.map(([x,y])=>`<rect x="${x}" y="${y}" width="1" height="1" fill="${col}"/>`).join("")}</svg>`}
const _bindBgPicker12=bindBgPicker;bindBgPicker=function(root,after){_bindBgPicker12(root,after);
  const a=$("[data-bganim]",root);if(a)a.onchange=()=>{UI.bg.anim=a.checked;local.set("bgAnim",UI.bg.anim);applyBg();drawBanner();fxKick()};
  $$("[data-bgsym]",root).forEach(b=>b.onclick=e=>{e.stopPropagation();UI.bg.sym=b.dataset.bgsym;local.set("bgSym",UI.bg.sym);$$("[data-bgsym]",root).forEach(x=>x.setAttribute("aria-pressed",x===b));_fxL.forEach(L=>L.key="");applyBg();drawBanner()})};
/* lưu cùng hồ sơ nền */
const _saveBg12=saveBg;saveBg=function(){local.set("bgAnim",UI.bg.anim);local.set("bgSym",UI.bg.sym);return _saveBg12()};
setTimeout(()=>{applyBg();if(UI.view==="home")drawBanner()},50);

/* =====================================================================
   v9 — BIỂU TƯỢNG Ô VUÔNG (logo thanh tiện ích) ĐỔI THEO CẢNH NỀN
   ===================================================================== */
const BRAND_ICONS={
 day:{l:"Hoa anh đào",g:`<g class="bi-spin">${[0,72,144,216,288].map(a=>`<path transform="rotate(${a} 20 20)" d="M20 20c-3.6-3.2-4.4-8.6-1.5-11.6.6.9 1 1.6 1.5 1.6s.9-.7 1.5-1.6c2.9 3 2.1 8.4-1.5 11.6z" fill="var(--bi-ink)"/>`).join("")}<circle cx="20" cy="20" r="2.6" fill="var(--bi-acc)"/></g>`},
 night:{l:"Trăng đêm",g:`<path d="M23.5 9.5a10 10 0 1 0 7.5 15.2A8.2 8.2 0 0 1 23.5 9.5z" fill="var(--bi-ink)"/><path class="bi-tw" d="M28 8v5M25.5 10.5h5" stroke="var(--bi-ink)" stroke-width="1.6" stroke-linecap="round"/><circle class="bi-tw2" cx="31" cy="17" r="1" fill="var(--bi-ink)"/>`},
 beach:{l:"Sóng biển",g:`<circle cx="27" cy="12" r="3.2" fill="var(--bi-ink)" opacity=".85"/><g class="bi-wave"><path d="M2 21c3-3 6-3 9 0s6 3 9 0 6-3 9 0 6 3 9 0" fill="none" stroke="var(--bi-ink)" stroke-width="2.4" stroke-linecap="round"/><path d="M2 27c3-3 6-3 9 0s6 3 9 0 6-3 9 0 6 3 9 0" fill="none" stroke="var(--bi-ink)" stroke-width="2.4" stroke-linecap="round" opacity=".7"/></g>`},
 pinksky:{l:"Trời hồng",g:`<path d="M24 8.5a7 7 0 1 0 5.6 10.8A5.8 5.8 0 0 1 24 8.5z" fill="var(--bi-ink)" opacity=".95"/><path class="bi-drift" d="M10 30h15a4.4 4.4 0 0 0 0-8.8 6 6 0 0 0-11.3-1.4A5.1 5.1 0 0 0 10 30z" fill="var(--bi-ink)"/><path class="bi-tw" d="M10 9v4M8 11h4" stroke="var(--bi-ink)" stroke-width="1.5" stroke-linecap="round"/>`},
 desk:{l:"Cửa sổ pastel",g:`<rect x="8" y="10" width="24" height="20" rx="2.5" fill="none" stroke="var(--bi-ink)" stroke-width="2"/><path d="M8 15h24" stroke="var(--bi-ink)" stroke-width="2"/><circle cx="11.5" cy="12.6" r=".9" fill="var(--bi-ink)"/><circle cx="14.5" cy="12.6" r=".9" fill="var(--bi-ink)"/><path class="bi-beat" d="M20 27.5s-5.5-3.3-5.5-6.6a2.9 2.9 0 0 1 5.5-1.4 2.9 2.9 0 0 1 5.5 1.4c0 3.3-5.5 6.6-5.5 6.6z" fill="var(--bi-ink)"/>`},
 sunset:{l:"Hoàng hôn",g:`<g class="bi-rise"><path d="M11 25a9 9 0 0 1 18 0z" fill="var(--bi-ink)"/><path d="M20 10v3M10.5 14l2 2M29.5 14l-2 2M7 21h2.5M33 21h-2.5" stroke="var(--bi-ink)" stroke-width="2" stroke-linecap="round"/></g><path d="M6 25h28M10 29h20M14 33h12" stroke="var(--bi-ink)" stroke-width="2" stroke-linecap="round" opacity=".8"/>`},
 cottage:{l:"Vườn nhà",g:`<path d="M8 19l12-9 12 9" fill="none" stroke="var(--bi-ink)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 17.5V30h18V17.5" fill="none" stroke="var(--bi-ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M17.5 30v-5.5h5V30" fill="none" stroke="var(--bi-ink)" stroke-width="2"/><circle class="bi-tw" cx="24.5" cy="20" r="1.6" fill="var(--bi-ink)"/><circle class="bi-tw2" cx="15.5" cy="20" r="1.6" fill="var(--bi-ink)"/>`},
 img:{l:"Ảnh của bạn",g:`<path class="bi-beat" d="M20 30s-9-5.4-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.6-9 11-9 11z" fill="var(--bi-ink)"/>`},
 pulse:{l:"Sổ Học (mặc định)",g:`<path d="M6 21h7l3-8 5 15 3-7h10" fill="none" stroke="var(--bi-ink)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`}
};
UI.brandMode=local.get("brandMode","theme");
function brandKey(){if(UI.brandMode&&UI.brandMode!=="theme")return BRAND_ICONS[UI.brandMode]?UI.brandMode:"pulse";const s=bgSrc();if(s.img)return "img";const k=s.scene||"auto";if(k==="auto")return isNightSkin()?"night":"day";return BRAND_ICONS[k]?k:"day"}
function brandSVG(k,size=40,anim=true){const ic=BRAND_ICONS[k]||BRAND_ICONS.pulse;const id="bg"+k;
  return `<svg class="brand-ico ${anim?"anim":""}" data-bk="${k}" viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--bi-a)"/><stop offset="1" style="stop-color:var(--bi-b)"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#${id})"/><rect x=".75" y=".75" width="38.5" height="38.5" rx="10.3" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.5"/>${ic.g}</svg>`}
function paintBrand(){const b=$("#rail .brand");if(!b)return;const k=brandKey();const cur=$(".brand-ico",b);if(cur&&cur.dataset.bk===k)return;
  b.innerHTML=brandSVG(k,40,!RM());b.title="Trang chủ · biểu tượng: "+BRAND_ICONS[k].l;if(!RM()&&cur)b.animate([{transform:"scale(.6) rotate(-20deg)",opacity:.2},{transform:"none",opacity:1}],{duration:380,easing:"cubic-bezier(.2,1.4,.4,1)"});setFavicon(k)}
/* favicon trang đổi theo (bản web) */
let _favT=0;function setFavicon(k){clearTimeout(_favT);_favT=setTimeout(()=>{try{const a=mmColor("var(--bi-a)"),b2=mmColor("var(--bi-b)"),ink=mmColor("var(--bi-ink)"),acc=mmColor("var(--accent)");
    const svg=brandSVG(k,64,false).replace(/var\(--bi-a\)/g,a).replace(/var\(--bi-b\)/g,b2).replace(/var\(--bi-ink\)/g,ink).replace(/var\(--bi-acc\)/g,acc).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');
    let l=document.querySelector('link[rel="icon"]');if(!l){l=document.createElement("link");l.rel="icon";document.head.appendChild(l)}l.type="image/svg+xml";l.href="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)}catch(e){}},300)}
const _renderRail13=renderRail;renderRail=function(...a){const r=_renderRail13.apply(this,a);const b=$("#rail .brand");if(b){b.innerHTML=brandSVG(brandKey(),40,!RM());b.title="Trang chủ · biểu tượng: "+BRAND_ICONS[brandKey()].l;
  b.oncontextmenu=e=>{e.preventDefault();brandMenu(b)}}return r};
const _applyBg13=applyBg;applyBg=function(...a){const r=_applyBg13.apply(this,a);paintBrand();return r};
const _drawBanner13=drawBanner;drawBanner=function(...a){const r=_drawBanner13.apply(this,a);paintBrand();return r};
const _syncTheme13=syncTheme;syncTheme=async function(...a){const r=await _syncTheme13.apply(this,a);setFavicon(brandKey());return r};
function brandMenu(anchor){const m=popMenu(anchor,`<div class="who">Biểu tượng ô vuông</div><button data-bm="theme">${brandSVG(brandKey(),22,false)}Đổi theo cảnh nền${UI.brandMode==="theme"?" ✓":""}</button><div class="sep"></div>${Object.entries(BRAND_ICONS).map(([k,v])=>`<button data-bm="${k}">${brandSVG(k,22,false)}${esc(v.l)}${UI.brandMode===k?" ✓":""}</button>`).join("")}`);
  {const r=anchor.getBoundingClientRect();m.style.left=(r.right+8)+"px";m.style.top=Math.max(8,Math.min(innerHeight-m.offsetHeight-8,r.top))+"px"}
  $$("[data-bm]",m).forEach(b=>b.onclick=()=>{UI.brandMode=b.dataset.bm;local.set("brandMode",UI.brandMode);const x=$("#rail .brand .brand-ico");if(x)x.dataset.bk="";paintBrand()})}
/* thêm lựa chọn vào bảng Cảnh nền */
const _bgPickerHTML13=bgPickerHTML;bgPickerHTML=function(){return _bgPickerHTML13()+`<div class="field"><label>Biểu tượng ô vuông ở thanh tiện ích</label><div class="sym-pick"><button class="chip" data-brm="theme" aria-pressed="${UI.brandMode==="theme"}">${brandSVG(brandKey(),18,false)}<span>Theo cảnh nền</span></button>${Object.entries(BRAND_ICONS).map(([k,v])=>`<button class="chip" data-brm="${k}" aria-pressed="${UI.brandMode===k}" title="${esc(v.l)}">${brandSVG(k,18,false)}<span>${esc(v.l)}</span></button>`).join("")}</div></div>`};
const _bindBgPicker13=bindBgPicker;bindBgPicker=function(root,after){_bindBgPicker13(root,after);$$("[data-brm]",root).forEach(b=>b.onclick=e=>{e.stopPropagation();UI.brandMode=b.dataset.brm;local.set("brandMode",UI.brandMode);$$("[data-brm]",root).forEach(x=>x.setAttribute("aria-pressed",x===b));const x=$("#rail .brand .brand-ico");if(x)x.dataset.bk="";paintBrand()})};
setTimeout(()=>{renderRail();paintBrand()},80);

/* =====================================================================
   v9 — HIỆU ỨNG KÍNH (kiểu Liquid Glass trên iPhone) cho thanh tiện ích, thanh công cụ, bảng nổi
   ===================================================================== */
UI.glass=local.get("glass",true);
const GLASS_SEL=".rail,.top,.mobtabs,.flyout,.popmenu,.m3-tb,.mm-ctl,.dash-editbar,.vctl,.decor-bar,.sec-h,.wdg-h";
function applyGlass(){document.body.classList.toggle("glass",!!UI.glass)}
applyGlass();
/* vệt sáng phản chiếu chạy theo con trỏ, như mặt kính bắt sáng */
let _gRaf=0,_gEv=null,_gEl=null;
document.addEventListener("pointermove",e=>{if(!UI.glass||e.pointerType==="touch"||RM())return;_gEv=e;if(_gRaf)return;_gRaf=requestAnimationFrame(()=>{_gRaf=0;const ev=_gEv;const el=ev.target&&ev.target.closest&&ev.target.closest(GLASS_SEL);
  if(_gEl&&_gEl!==el)_gEl.classList.remove("g-lit");_gEl=el;if(!el)return;const r=el.getBoundingClientRect();el.style.setProperty("--gx",((ev.clientX-r.left)/Math.max(1,r.width)*100).toFixed(1)+"%");el.style.setProperty("--gy",((ev.clientY-r.top)/Math.max(1,r.height)*100).toFixed(1)+"%");el.classList.add("g-lit")})},{passive:true});
document.addEventListener("pointerleave",()=>{if(_gEl)_gEl.classList.remove("g-lit");_gEl=null});
/* lựa chọn trong bảng Cảnh nền / Giao diện */
const _bgPickerHTML14=bgPickerHTML;bgPickerHTML=function(){return _bgPickerHTML14()+`<label class="chk-row"><input type="checkbox" class="chk" data-glass ${UI.glass?"checked":""}> Hiệu ứng kính trong suốt cho thanh công cụ (kiểu iPhone)</label>`};
const _bindBgPicker14=bindBgPicker;bindBgPicker=function(root,after){_bindBgPicker14(root,after);const g=$("[data-glass]",root);if(g)g.onchange=()=>{UI.glass=g.checked;local.set("glass",UI.glass);applyGlass();applyLayout&&applyLayout()}};

/* =====================================================================
   v13 — SỔ HỌC (Nguồn · Trò chuyện · Studio) ĐỒNG BỘ THEME + ICON · STUDIO TẠO NHANH HƠN
   ===================================================================== */
/* ---------- icon tiêu đề cột ---------- */
const PANE_IC={paneSrc:"file",paneChat:"chat",paneStudio:"spark"};
paneHead=function(id,title,coll,extra=""){return `<div class="pane-h" data-ph="${id}"><h2><span class="ph-ic" aria-hidden="true">${ic(PANE_IC[id]||"spark")}</span>${title}</h2>${extra}<span class="vtitle">${title}</span><div class="pane-tools">${coll?`<button class="ghost ic lay hide-coll" data-coll="${id}" aria-label="Thu nhỏ ${title}" title="Thu nhỏ">${ic("min")}</button>`:""}<button class="ghost ic lay" data-max="${id}" aria-label="Phóng to ${title}" title="Phóng to / thu về">${ic("expand")}</button></div></div>`};
/* ---------- biểu tượng sổ học đổi màu theo theme ---------- */
const GL_HEX=["#2b6f4f","#7ee0a7","#7a3d1c","#f4a26a","#244a7a","#8cc0ff","#5a2f6e","#d6a4ff","#6e5a1c","#f2d36b"];
const _glyph15=glyph;glyph=function(id,size){let s=_glyph15(id,size);if(UI.bg&&UI.bg.sync){GL_HEX.forEach((h,i)=>{s=s.split(h).join(i%2?"var(--gl-fg)":"var(--gl-bg)")})}return s};
/* ---------- màu icon các ô Studio lấy từ bảng màu cảnh nền ---------- */
const TILE_MIX=["var(--accent)","var(--sig)","color-mix(in srgb,var(--accent) 55%,var(--sig))","color-mix(in srgb,var(--tint) 70%,#fff)","color-mix(in srgb,var(--sig) 60%,#fff)","color-mix(in srgb,var(--accent) 60%,#fff)"];

/* =====================================================================
   STUDIO NHANH HƠN
   - đọc ít nguồn hơn với các dạng ngắn (thẻ nhớ, quiz, bảng…)
   - dùng mô hình nhanh cho dạng ngắn; Gemini: suy nghĩ mức thấp
   - viết dần và hiện % tiến độ thay vì chờ im lặng
   - tải sẵn thư viện 3D, công thức khi mở bài học
   ===================================================================== */
UI.speed=local.get("studioSpeed","balanced");
const SPEED={fast:"Nhanh nhất",balanced:"Cân bằng",quality:"Chất lượng cao"};
const GEN_BUDGET={flash:45000,quiz:50000,table:45000,info:45000,yt:30000,mindmap:60000,report:110000,slides:100000,video:90000,audio:90000};
const GEN_QUICK=new Set(["flash","quiz","table","info","yt","mindmap"]);
const GEN_EST={flash:3500,quiz:5000,table:3500,info:2600,yt:2500,mindmap:3200,report:9000,slides:9000,video:11000,audio:9000};
UI.genProg=new Map();
function tierFor(k){if(UI.speed==="quality")return "default";if(UI.speed==="fast")return "quick";return GEN_QUICK.has(k)?"quick":"default"}
function looseJSON(t){let s=String(t||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/,"");try{return JSON.parse(s)}catch(e){}const a=s.indexOf("{"),b=s.lastIndexOf("}");if(a>=0&&b>a){try{return JSON.parse(s.slice(a,b+1))}catch(e){}}return null}
async function genJSON(prompt,o,onChars){
  /* viết có luồng để hiện tiến độ; nếu JSON hỏng thì thử lại bằng chế độ JSON */
  if(P.local){return P.sample.json(prompt,{...o,onText:({text})=>onChars&&onChars(text.length)})}
  try{const r=await P.sample(prompt+"\n\nCHỈ trả lời bằng đúng một đối tượng JSON hợp lệ, không có chữ hay ``` nào khác.",{...o,onText:({text})=>onChars&&onChars(text.length)});const j=looseJSON(r&&r.text!=null?r.text:r);if(j)return j}catch(e){if(e&&(e.code==="cancelled"||e.code==="not_granted"||e.code==="rate_limited"))throw e}
  return P.sample.json(prompt,o)}
function progPaint(id){const p=UI.genProg.get(id);const el=$(`#studioBody [data-art="${id}"]`);if(!el||!p)return;const sm=$("small",el);const pct=Math.min(97,Math.round(p.chars/p.est*100));
  if(sm)sm.innerHTML=p.chars?`Đang viết… ${pct}% <i class="gprog"><i style="width:${pct}%"></i></i>`:`${p.stage||"Đang đọc nguồn…"} <i class="gprog wait"><i></i></i>`}
generate=async function(k,cfg){
  if(!UI.cur)return;
  if(!P.sample){toast("Studio cần trợ lý AI: hãy mở trang trong ứng dụng Claude hoặc thêm API key");return}
  const t0=performance.now();const id=mkid("art");const nb=UI.cur.id;const sp=spec(k,cfg);
  UI.genProg.set(id,{chars:0,est:GEN_EST[k]||6000,stage:"Đang đọc nguồn…"});
  await Store.put(id,{type:"art",nb,kind:k,title:"",status:"pending",cfg,created:Date.now()});
  if(innerWidth<=1100)mobPane("paneStudio");
  try{
    const ctx=await sourceContext(cfg.srcIds||null,GEN_BUDGET[k]||80000);
    if(!ctx.labels.length){await Store.del(id);UI.genProg.delete(id);toast("Thêm hoặc chọn ít nhất một nguồn trước");return}
    const pg=UI.genProg.get(id);pg.stage="AI đang soạn…";progPaint(id);
    const prompt=`${rulesFor()}\n\nNGÔN NGỮ ĐẦU RA: ${sp.L}. ĐỘ DÀI: ${sp.len}.\nMỨC ĐỘ: ${sp.D}${cfg.desc?"\nYÊU CẦU CỦA NGƯỜI HỌC: "+cfg.desc:""}\nNHIỆM VỤ: ${sp.task}\nTrường "cite" là mảng số thứ tự nguồn [n] đã dùng.\nTrả về CHỈ một JSON đúng mẫu:\n${sp.schema}\n\nNGUỒN:\n${ctx.text}`;
    let last=0;const data=await genJSON(prompt,{modelTier:tierFor(k),fast:UI.speed!=="quality",...(ctx.images.length?{images:ctx.images}:{})},n=>{pg.chars=n;const now=performance.now();if(now-last>250){last=now;progPaint(id)}});
    if(!data||typeof data!=="object")throw {code:"invalid_json"};
    const art={type:"art",nb,kind:k,title:String(data.title||KLABEL[k]).slice(0,120),status:"done",cfg,data,srcLabels:ctx.labels,created:Date.now(),genMs:Math.round(performance.now()-t0)};
    const sz=JSON.stringify(art).length;if(sz>240000)throw {code:"too_big"};
    await Store.put(id,art);UI.genProg.delete(id);toast(`Đã tạo ${KLABEL[k]} · ${(art.genMs/1000).toFixed(1)} giây`);
  }catch(e){console.warn(e);UI.genProg.delete(id);await Store.put(id,{type:"art",nb,kind:k,title:KLABEL[k],status:"error",err:e&&e.code==="too_big"?"Nội dung quá lớn, chọn độ dài ngắn hơn":aiErr(e),cfg,created:Date.now()})}
};
const _renderStudio15=renderStudio;renderStudio=function(...a){const r=_renderStudio15.apply(this,a);const b=$("#studioBody");if(!b)return r;
  $$(".tile",b).forEach((t,i)=>t.style.setProperty("--cs",TILE_MIX[i%TILE_MIX.length]));UI.genProg.forEach((p,id)=>progPaint(id));
  const ph=$("#paneStudio .pane-h");if(ph&&!$("#spd",ph)){const bt=document.createElement("button");bt.className="ghost spd-btn";bt.id="spd";bt.title="Tốc độ tạo nội dung Studio";bt.innerHTML=`${ic("spark")}<span>${SPEED[UI.speed]}</span>`;const tools=$(".pane-tools",ph);ph.insertBefore(bt,tools);
    bt.onclick=e=>{e.stopPropagation();const m=popMenu(bt,`<div class="who">Tốc độ tạo nội dung Studio</div>${[["fast","Nhanh nhất","mô hình nhanh cho mọi loại, đọc ít nguồn hơn"],["balanced","Cân bằng","thẻ nhớ, quiz, bảng… dùng mô hình nhanh; slide, video, báo cáo dùng mô hình chính"],["quality","Chất lượng cao","mô hình chính, suy nghĩ kỹ — chậm hơn"]].map(([k,l,d])=>`<button data-spd="${k}"><span style="display:grid"><b style="font-weight:600">${l}${UI.speed===k?" ✓":""}</b><small class="muted" style="white-space:normal">${d}</small></span></button>`).join("")}`);
      $$("[data-spd]",m).forEach(x=>x.onclick=()=>{UI.speed=x.dataset.spd;local.set("studioSpeed",UI.speed);try{if(window.SOHOC)SOHOC.LS.set("speed",UI.speed)}catch(_){}bt.querySelector("span").textContent=SPEED[UI.speed];toast("Tốc độ Studio: "+SPEED[UI.speed])})}}
  return r};
/* tải sẵn thư viện khi mở bài học, để mở Mô hình 3D / slide công thức gần như tức thì */
const _openNotebook15=openNotebook;openNotebook=function(...a){const r=_openNotebook15.apply(this,a);const idle=window.requestIdleCallback||(f=>setTimeout(f,1200));
  idle(()=>{ensureThree().catch(()=>{});ensureKatex().catch(()=>{});if(UI.srcs&&UI.srcs.length)sourceContext(null,60000).catch(()=>{})},{timeout:3000});return r};
try{if(window.SOHOC)SOHOC.LS.set("speed",UI.speed)}catch(e){}
/* ---------- thanh tiện ích: nút Nhạc để dán link / mở trình phát nhanh ---------- */
RAIL_ALL.music=["Nhạc & âm thanh nền","music"];
{const d=UI.dash;if(d&&d.rail&&!d.rail.order.includes("music")){d.rail.order.splice(Math.max(0,d.rail.order.indexOf("wdg")+1),0,"music")}}
const _railAct15=railAct;railAct=function(k,btn){if(k==="music"){hideTip();closeFly();sndPopover(btn);const place=()=>{const m=$$(".popmenu").pop();if(!m)return;const r=btn.getBoundingClientRect();m.style.left=Math.min(innerWidth-m.offsetWidth-8,r.right+10)+"px";m.style.top=Math.max(8,Math.min(innerHeight-m.offsetHeight-8,r.top-20))+"px"};place();requestAnimationFrame(place);setTimeout(place,60);return}return _railAct15(k,btn)};
setTimeout(()=>renderRail(),60);

/* =====================================================================
   v14 — SLIDE KIỂU NOTEBOOKLM: dải thu nhỏ, sửa từng slide bằng lời, tạo lại bộ slide,
         giao diện bản vẽ kỹ thuật, TRÌNH CHIẾU NHƯ VIDEO (giọng đọc, phụ đề, tua, âm lượng, hình vẽ dần)
   + NHIỀU MẪU MÀU GIAO DIỆN VÀ BỘ CHỦ ĐỀ
   ===================================================================== */
const SL_W=1280,SL_H=720;
const SL_THEMES={blue:"Bản vẽ kỹ thuật",chalk:"Bảng phấn",paper:"Giấy viết tay",sync:"Theo giao diện"};
UI.slTheme=local.get("slTheme","blue");
function slPal(th){if(th==="blue")return {ink:"#e8f0f6",soft:"#8fa6b6",blue:"#6fd3e6",or:"#f2c94c",red:"#e58ad9",green:"#7fe0a4",paper:"#1f2a33",fill:"rgba(111,211,230,.10)"};
  if(th==="chalk")return vpal(true);if(th==="paper")return vpal(false);
  return {ink:mmColor("var(--ink)"),soft:mmColor("var(--muted)"),blue:mmColor("var(--sig)"),or:mmColor("var(--accent)"),red:mmColor("var(--bad)"),green:mmColor("var(--ok)"),paper:mmColor("var(--panel2)"),fill:"rgba(127,127,127,.08)"}}
/* mở rộng lệnh tạo slide: thêm hình vẽ động (dùng chung bộ vẽ của bài giảng video) và thẻ ý chính */
{const _spec16=spec;spec=function(k,cfg){const s=_spec16(k,cfg);if(k==="slides"&&s&&s.task){s.task=s.task.replace(/hoặc "none"\./,`hoặc "scene" (kèm "scene":{"type":…} để VẼ SƠ ĐỒ ĐỘNG bằng một trong các mẫu sau:\n${VSCENES}\n), hoặc "cards" (kèm "cards":[{"icon":"gear|clock|chip|chart|bolt|book|idea|warn|loop|wave","title":"…","text":"…"}] — 2–4 thẻ ý chính, hợp cho slide tổng kết), hoặc "none". Slide đầu là slide tiêu đề ("layout":"title", "bullets" là 1 dòng phụ đề). Ưu tiên "scene" khi nói về cổng logic, mạch chốt, flip-flop, giản đồ thời gian, mạch điện, bộ đếm, thanh ghi dịch, đồ thị.`)}return s}}
const CARD_IC={gear:'<circle cx="24" cy="24" r="7"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M37 11l-4 4M15 33l-4 4"/>',clock:'<path d="M4 34h6V14h8v20h8V14h8v20h10"/>',chip:'<rect x="13" y="13" width="22" height="22" rx="3"/><path d="M18 13V6M24 13V6M30 13V6M18 42v-7M24 42v-7M30 42v-7M13 18H6M13 24H6M13 30H6M42 18h-7M42 24h-7M42 30h-7"/>',chart:'<path d="M6 40l10-12 8 6 16-20"/><path d="M32 14h8v8"/>',bolt:'<path d="M27 4L11 27h11l-3 17 17-24H25z"/>',book:'<path d="M8 10c6-3 12-3 16 1 4-4 10-4 16-1v28c-6-3-12-3-16 1-4-4-10-4-16-1z"/><path d="M24 11v28"/>',idea:'<path d="M17 30c-4-3-6-7-6-11a13 13 0 0 1 26 0c0 4-2 8-6 11v5H17z"/><path d="M19 41h10"/>',warn:'<path d="M24 6l19 34H5z"/><path d="M24 19v10M24 34v.5"/>',loop:'<path d="M14 16a12 12 0 1 1-4 9"/><path d="M6 14l4 2 2-4"/>',wave:'<path d="M4 24c4-10 8-10 12 0s8 10 12 0 8-10 12 0"/>'};
function slIsTitle(s,i){return s.layout==="title"||(i===0&&(!s.visual||s.visual==="none")&&(s.bullets||[]).length<=2)}
function slVisKind(s){if(s.visual==="scene"&&s.scene&&s.scene.type&&VB[s.scene.type])return "scene";if(s.visual==="cards"&&Array.isArray(s.cards)&&s.cards.length)return "cards";if(s.visual&&FIG[s.visual])return "fig";if(s.visual==="table"&&s.table&&s.table.headers)return "table";if(s.visual==="math"&&Array.isArray(s.math)&&s.math.length)return "math";if(s.visual==="formula"&&s.formula)return "formula";return null}
function slideHTML(s,i,deck,a,th){const L=a.srcLabels;const t=esc(s.title||"");const k=slVisKind(s);const foot=`<span class="sl-pg">${i+1}</span><span class="sl-mark">${esc(deck.title||a.title||"")} · Sổ Học</span>`;
  if(slIsTitle(s,i))return `<div class="sl sl-title"><div class="sl-decor" data-decor></div><div class="sl-tbox"><h1 class="rv">${t}</h1>${(s.bullets||[]).length?`<p class="rv">${(s.bullets||[]).map(b=>mdInline(b,L)).join("<br>")}</p>`:""}</div><span class="sl-tag rv">Tài liệu tham khảo trực quan | ${esc(deck.title||a.title||"")}</span>${foot}</div>`;
  if(k==="cards")return `<div class="sl sl-cards"><h2 class="rv">${t}</h2><div class="sl-cardl">${s.cards.slice(0,4).map(c=>`<div class="sl-card rv"><div class="ci"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${CARD_IC[c.icon]||CARD_IC.idea}</svg></div><div><b>${esc(c.title||"")}</b><p>${mdInline(c.text||"",L)}</p></div></div>`).join("")}</div>${foot}</div>`;
  const ul=`<ul>${(s.bullets||[]).map(b=>`<li class="rv">${mdInline(b,L)}</li>`).join("")}</ul>`;
  if(k)return `<div class="sl sl-split ${k==="scene"?"wide":""}"><div class="sl-col"><h2 class="rv">${t}</h2>${ul}<div class="sl-cite">${citeChips(s.cite,L)}</div></div><div class="sl-vis" data-vis></div>${foot}</div>`;
  return `<div class="sl sl-text"><h2 class="rv">${t}</h2>${ul}<div class="sl-cite">${citeChips(s.cite,L)}</div>${foot}</div>`}
/* gắn hình: trả về hàm vẽ theo tiến độ p (0→1) */
function slMount(frame,s,i,th){const fns=[];const C=slPal(th);
  const dc=$("[data-decor]",frame);if(dc){const svg=sv("svg",{viewBox:"0 0 640 720",preserveAspectRatio:"xMaxYMid slice"});dc.appendChild(svg);const g=sv("g",{opacity:.55},svg);const gs=[];
    [["NAND",330,70],["NAND",330,250],["NOR",470,160],["AND",330,430],["XOR",470,520],["NOT",200,340]].forEach(([ty,x,y],k)=>{try{gs.push(gateAt(g,ty,x,y,110,C.blue,k))}catch(e){}});
    const w=[["M200 60H330M200 120H330","M200 240H330M200 300H330"],["M440 125H470M440 305H470"],["M590 215H640M590 575H640"]].flat().map(d=>ink(g,d,{c:C.blue,w:3}));
    fns.push(p=>{gs.forEach((G,k)=>{try{G.set&&G.set(seg(p,k*.08,.5+k*.08))}catch(e){}});w.forEach((x,k)=>x.set(seg(p,.3+k*.06,.8)))})}
  const el=$("[data-vis]",frame);if(!el)return fns.length?p=>fns.forEach(f=>f(p)):null;const k=slVisKind(s);
  if(k==="scene"){const wide=frame.querySelector(".sl-split.wide");const W=wide?820:700,H=600;const svg=sv("svg",{viewBox:`0 0 ${W} ${H}`,preserveAspectRatio:"xMidYMid meet"});el.appendChild(svg);const g=sv("g",{},svg);
    let upd=null;try{upd=VB[s.scene.type](g,W,H,s.scene,C,el)}catch(e){console.warn(e)}if(upd)fns.push(p=>{try{upd(p)}catch(e){}})}
  else{if(k==="fig")el.innerHTML=FIG[s.visual]();else if(k==="table")el.innerHTML=`<table class="sl-tt"><tr>${s.table.headers.map(h=>`<th>${esc(h)}</th>`).join("")}</tr>${(s.table.rows||[]).slice(0,9).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>`;
    else if(k==="math"){el.innerHTML=sheet(s.math);hwFit(el)}else if(k==="formula")el.innerHTML=/\n|;|\bmodule\b|\bassign\b|<=|==|\bif\s*\(/.test(String(s.formula))?`<pre class="sl-code">${esc(s.formula)}</pre>`:`<div class="sl-formula">${tex(s.formula,true,true)}</div>`;
    fns.push(p=>{el.style.clipPath=p>=1?"":`inset(0 ${Math.round((1-ease(clamp01(p*1.4)))*100)}% 0 0)`})}
  return p=>fns.forEach(f=>f(p))}
function slFrame(host,s,i,deck,a,th){host.innerHTML=`<div class="sframe st-${th}">${slideHTML(s,i,deck,a,th)}</div>`;const f=host.firstChild;const u=slMount(f,s,i,th);if(u)u(1);return {frame:f,upd:u}}
function slFit(host,frame,zoom=1){const r=host.getBoundingClientRect();const k=Math.max(.05,Math.min(r.width/SL_W,r.height/SL_H)*zoom);frame.style.transform=`translate(-50%,-50%) scale(${k})`;return k}

/* ---------------- trình xem slide ---------------- */
viewSlides=function(a){
  const d=a.data||{};let sl=Array.isArray(d.slides)?d.slides:[];let i=0,zoom=1;const pend=[];UI.reopen=()=>viewSlides(a);
  openModal({title:a.title,actions:srcBtn(a)+`<select id="slTh" class="sl-thsel" aria-label="Giao diện slide">${Object.entries(SL_THEMES).map(([k,l])=>`<option value="${k}" ${UI.slTheme===k?"selected":""}>${l}</option>`).join("")}</select><button class="pill-btn primary" id="slPlay">${ic("play")} Trình chiếu</button><button class="ghost ic" id="slCopy" title="Chép dàn ý" aria-label="Chép dàn ý">${ic("copy")}</button>`,
    body:`<div class="sdeck"><div class="sdeck-main"><div class="sstage" id="sStage"></div><div class="szoom"><button class="ghost ic" id="sZi" aria-label="Phóng to">${ic("plus")}</button><button class="ghost ic" id="sZo" aria-label="Thu nhỏ">${ic("min")}</button></div>
      <details class="snotes" id="sNotes"><summary>Lời giảng của slide</summary><div id="sNotesB"></div></details>
      <div class="sedit"><label for="sEd" id="sEdL">Sửa slide 1</label><div class="sedit-row"><textarea class="input" id="sEd" rows="2" placeholder="Ví dụ: “Thêm giản đồ thời gian cho D flip-flop”, “Rút gọn tiêu đề”, “Thêm ví dụ số”"></textarea><button class="btn" id="sAdd">${ic("plus")} Thêm</button></div></div>
      <div class="sbar"><button class="pill-btn" id="sPend">Thay đổi chờ áp dụng (0) ▾</button><button class="pill-btn" id="sCancel">Hủy</button>${d.prev?`<button class="pill-btn" id="sUndo">${ic("undo")} Bản trước</button>`:""}<div class="grow"></div><button class="pill-btn primary" id="sGen" disabled>${ic("spark")} Tạo lại bộ slide</button></div></div>
      <aside class="sthumbs" id="sThumbs" aria-label="Danh sách slide"></aside></div>`});
  bindSrcList(a);
  const th=()=>UI.slTheme;const stage=$("#sStage");let cur=null;
  const drawMain=()=>{i=Math.max(0,Math.min(sl.length-1,i));const s=sl[i]||{};cur=slFrame(stage,s,i,d,a,th());slFit(stage,cur.frame,zoom);
    $("#sEdL").textContent=`Sửa slide ${i+1}`;$("#sNotesB").innerHTML=mdBlock(s.notes||"(Slide chưa có lời giảng)",a.srcLabels);
    $$(".sth").forEach((t,j)=>{t.classList.toggle("on",j===i);if(j===i)t.scrollIntoView({block:"nearest"})})};
  const drawThumbs=()=>{const box=$("#sThumbs");box.innerHTML=sl.map((_,j)=>`<div class="sth-r"><span class="n">${j+1}</span><button class="sth ${j===i?"on":""}" data-sj="${j}" aria-label="Slide ${j+1}"><div class="sth-in"></div></button><button class="ghost ic sth-m" data-sm="${j}" aria-label="Tùy chọn slide ${j+1}">${ic("more")}</button></div>`).join("");
    $$(".sth",box).forEach((b,j)=>{const inn=$(".sth-in",b);const f=slFrame(inn,sl[j]||{},j,d,a,th());requestAnimationFrame(()=>slFit(inn,f.frame));b.onclick=()=>{i=j;drawMain()}});
    $$("[data-sm]",box).forEach(b=>b.onclick=e=>{e.stopPropagation();const j=+b.dataset.sm;const m=popMenu(b,`<button data-x="up" ${j?"":"disabled"}>${ic("up")}Lên trên</button><button data-x="dn" ${j<sl.length-1?"":"disabled"}>${ic("down")}Xuống dưới</button><button data-x="dup">${ic("dup")}Nhân đôi</button><button data-x="del" style="color:var(--bad)" ${sl.length>1?"":"disabled"}>${ic("trash")}Xóa slide</button>`);
      $$("[data-x]",m).forEach(x=>x.onclick=()=>{const n=sl.slice();const op=x.dataset.x;if(op==="up")[n[j-1],n[j]]=[n[j],n[j-1]];if(op==="dn")[n[j+1],n[j]]=[n[j],n[j+1]];if(op==="dup")n.splice(j+1,0,JSON.parse(JSON.stringify(n[j])));if(op==="del")n.splice(j,1);
        i=op==="up"?j-1:op==="dn"?j+1:op==="dup"?j+1:Math.min(j,n.length-1);saveDeck(n,"Đã cập nhật bộ slide")})})};
  const saveDeck=async(n,msg)=>{const prev=sl;sl=n;d.slides=n;d.prev=prev;a.data=d;drawThumbs();drawMain();try{await Store.patch(a.id,{data:{...d}});if(msg)toast(msg)}catch(e){toast("Chưa lưu được: "+(e.message||e))}};
  const pendBtn=()=>{$("#sPend").textContent=`Thay đổi chờ áp dụng (${pend.length}) ▾`;$("#sGen").disabled=!pend.length};
  $("#sAdd").onclick=()=>{const v=$("#sEd").value.trim();if(!v){$("#sEd").focus();return}pend.push({i,text:v});$("#sEd").value="";pendBtn();toast(`Đã thêm thay đổi cho slide ${i+1}`)};
  $("#sEd").onkeydown=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#sAdd").click()}};
  $("#sPend").onclick=e=>{const m=popMenu(e.currentTarget,pend.length?pend.map((p,k)=>`<div class="pend-r"><b>Slide ${p.i+1}</b><span>${esc(p.text)}</span><button class="ghost ic" data-pd="${k}" aria-label="Bỏ">${ic("close")}</button></div>`).join(""):`<div class="who">Chưa có thay đổi nào. Viết yêu cầu vào ô “Sửa slide” rồi bấm Thêm.</div>`);
    $$("[data-pd]",m).forEach(b=>b.onclick=()=>{pend.splice(+b.dataset.pd,1);pendBtn()})};
  $("#sCancel").onclick=()=>{pend.length=0;pendBtn();$("#sEd").value=""};
  const ud=$("#sUndo");if(ud)ud.onclick=()=>{if(!d.prev)return;const p=d.prev;saveDeck(p,"Đã quay về bản trước");d.prev=null};
  $("#sGen").onclick=async()=>{if(!pend.length||!P.sample)return;const b=$("#sGen");b.disabled=true;b.innerHTML=`<span class="spin"></span> Đang sửa ${pend.length} thay đổi…`;
    try{let ctx="";try{if(UI.cur&&UI.srcs.length){const c=await sourceContext(null,50000);ctx="\n\nNGUỒN:\n"+c.text}}catch(e){}
      const r=await genJSON(`${rulesFor()}\n\nĐây là bộ slide hiện tại (JSON, slide đánh số từ 1):\n${JSON.stringify({title:d.title,slides:sl})}\n\nYÊU CẦU SỬA của người học:\n${pend.map(p=>`- Slide ${p.i+1}: ${p.text}`).join("\n")}\n\nNHIỆM VỤ: Áp dụng đúng các yêu cầu trên, giữ nguyên các slide không bị nhắc tới (có thể thêm slide mới nếu yêu cầu). Giữ cùng cấu trúc trường (title, bullets, notes, visual, scene, cards, table, math, formula, cite, layout).\nCác mẫu "scene" vẽ được:\n${VSCENES}\nTrả về CHỈ JSON: {"title":"…","slides":[…toàn bộ bộ slide sau khi sửa…]}${ctx}`,{modelTier:"default"});
      if(!r||!Array.isArray(r.slides)||!r.slides.length)throw {code:"invalid_json"};pend.length=0;pendBtn();if(r.title)d.title=String(r.title).slice(0,120);await saveDeck(r.slides.slice(0,40),"Đã tạo lại bộ slide");}
    catch(e){toast(aiErr(e),4500)}b.innerHTML=`${ic("spark")} Tạo lại bộ slide`;pendBtn()};
  $("#sZi").onclick=()=>{zoom=Math.min(1.6,zoom*1.15);slFit(stage,cur.frame,zoom)};$("#sZo").onclick=()=>{zoom=Math.max(.5,zoom/1.15);slFit(stage,cur.frame,zoom)};
  $("#slTh").onchange=e=>{UI.slTheme=e.target.value;local.set("slTheme",UI.slTheme);drawThumbs();drawMain()};
  $("#slCopy").onclick=()=>copyText(sl.map((s,j)=>`${j+1}. ${s.title||""}\n${(s.bullets||[]).map(b=>"   • "+b).join("\n")}${s.notes?"\n   Lời giảng: "+s.notes:""}`).join("\n\n"));
  $("#slPlay").onclick=()=>slideShow(a,sl,d,i);
  const key=e=>{if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)||$("#sshow"))return;if(e.key==="ArrowRight"||e.key==="ArrowDown"){if(i<sl.length-1){i++;drawMain()}e.preventDefault()}if(e.key==="ArrowLeft"||e.key==="ArrowUp"){if(i>0){i--;drawMain()}e.preventDefault()}};
  document.addEventListener("keydown",key);let ro=null;try{ro=new ResizeObserver(()=>{if(cur)slFit(stage,cur.frame,zoom)});ro.observe(stage)}catch(e){}
  UI.modalCleanup=()=>{document.removeEventListener("keydown",key);if(ro)ro.disconnect();const s=$("#sshow");if(s)s.remove();stopSpeech()};
  drawThumbs();drawMain();pendBtn();
  if(a.kind==="video")setTimeout(()=>slideShow(a,sl,d,0),250);
};

/* ---------------- trình chiếu như video ---------------- */
function slideShow(a,sl,d,start=0){
  $$("#sshow").forEach(x=>x.remove());const lang=(a.cfg&&a.cfg.lang)||"vi";
  const words=s=>sayable((s.title?s.title+". ":"")+(s.notes||(s.bullets||[]).join(". "))).split(/\s+/).filter(Boolean).length;
  const durs=sl.map(s=>Math.max(6,Math.min(45,words(s)/2.5+(slVisKind(s)?3:1))));const starts=[];{let t=0;durs.forEach(x=>{starts.push(t);t+=x})}const total=()=>starts[starts.length-1]+durs[durs.length-1];
  let t=starts[Math.min(start,sl.length-1)]||0,play=false,cur=-1,upd=null,frame=null,raf=0,last=0,spoken=-1,spDone=true,tok=0,rate=1,capOn=local.get("vCap",true),voice=hasSpeech()&&local.get("vVoice",true),rvs=[];
  const ov=document.createElement("div");ov.id="sshow";ov.className="sshow";ov.setAttribute("role","dialog");ov.setAttribute("aria-label","Trình chiếu "+a.title);
  ov.innerHTML=`<div class="ss-stage" id="ssSt"><div class="ss-host" id="ssHost"></div><div class="vcap ss-cap" id="ssCap"></div><button class="vbig" id="ssBig" aria-label="Phát"><span>${ic("play","i")}</span></button></div>
    <div class="vctl ss-ctl"><button class="btn" id="ssPlay" aria-label="Phát/Tạm dừng">${ic("play")}</button><button class="btn" id="ssPrev" aria-label="Slide trước">${ic("back")}</button><button class="btn" id="ssNext" aria-label="Slide sau" style="transform:scaleX(-1)">${ic("back")}</button>
      <div class="seekw"><div class="vmarks" id="ssMk"></div><input type="range" id="ssSeek" min="0" max="1000" value="0" aria-label="Tua"></div><span class="t" id="ssT">0:00 / 0:00</span><span class="t" id="ssN"></span>
      <select id="ssRate" aria-label="Tốc độ"><option value="0.75">0,75×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option><option value="1.5">1,5×</option></select>
      <span class="vvol"><button class="btn" id="ssMute" aria-label="Tắt/bật tiếng">${ic(UI.mute?"mute":"vol")}</button><input type="range" id="ssVol" min="0" max="1" step="0.05" value="${UI.mute?0:(UI.vol??1)}" aria-label="Âm lượng"></span>
      <button class="btn" id="ssCap2" aria-pressed="${capOn}" title="Phụ đề">CC</button>${hasSpeech()?`<button class="btn" id="ssVoice" aria-pressed="${voice}" title="Giọng đọc">${ic("audio")}</button>`:""}
      <button class="btn" id="ssFull" aria-label="Toàn màn hình">${ic("full")}</button><button class="btn" id="ssX" aria-label="Thoát trình chiếu">${ic("close")}</button></div>`;
  document.body.appendChild(ov);
  const host=$("#ssHost",ov);const fmt=x=>`${Math.floor(x/60)}:${String(Math.floor(x%60)).padStart(2,"0")}`;
  $("#ssMk",ov).innerHTML=starts.map(s=>`<i style="left:${s/total()*100}%"></i>`).join("");
  const build=k=>{host.innerHTML=`<div class="sframe st-${UI.slTheme}">${slideHTML(sl[k]||{},k,d,a,UI.slTheme)}</div>`;frame=host.firstChild;upd=slMount(frame,sl[k]||{},k,UI.slTheme);rvs=$$(".rv",frame);slFit(host,frame);$("#ssN",ov).textContent=`${k+1}/${sl.length}`};
  const caption=(k,p)=>{const c=$("#ssCap",ov);if(!capOn){c.textContent="";return}const w=sayable(sl[k].notes||"").split(/\s+/).filter(Boolean);const per=14,ch=[];for(let j=0;j<w.length;j+=per)ch.push(w.slice(j,j+per).join(" "));c.textContent=ch[Math.min(ch.length-1,Math.floor(p*ch.length))]||""};
  const render=()=>{let k=starts.findIndex((s,j)=>t>=s&&t<s+durs[j]);if(k<0)k=t>=total()?sl.length-1:0;if(k!==cur){cur=k;build(k)}let p=clamp01((t-starts[k])/durs[k]);if(!play&&t<=starts[k]+.01&&!started)p=1;
    const n=rvs.length||1;rvs.forEach((el,j)=>el.classList.toggle("on",p>=j/(n+1)*.7||p>=1));if(upd)upd(clamp01(p*1.35));caption(k,p);
    $("#ssSeek",ov).value=Math.round(t/total()*1000);$("#ssT",ov).textContent=fmt(t)+" / "+fmt(total())};
  const say=k=>{if(!voice||!play)return;stopSpeech();tok=speechToken;spoken=k;spDone=false;speak(sayable((sl[k].title?sl[k].title+". ":"")+(sl[k].notes||(sl[k].bullets||[]).join(". "))),{lang,rate}).then(()=>{if(tok===speechToken)spDone=true}).catch(()=>{spDone=true})};
  const loop=now=>{const dt=Math.min(.1,(now-last)/1000);last=now;if(play){const k=cur<0?0:cur;const end=starts[k]+durs[k];let nt=t+dt*rate;if(voice&&!spDone&&nt>=end-.05)nt=end-.06;
      if(nt>=total()){t=total()-.001;play=false;setBtn();render();raf=requestAnimationFrame(loop);return}t=nt;const nk=starts.findIndex((s,j)=>t>=s&&t<s+durs[j]);if(nk!==spoken&&nk>=0)say(nk)}
    render();raf=requestAnimationFrame(loop)};
  let started=false;const setBtn=()=>{if(play)started=true;$("#ssPlay",ov).innerHTML=ic(play?"pause":"play");$("#ssBig",ov).hidden=play||started};
  const go=()=>{if(t>=total()-.01)t=0;play=true;last=performance.now();spoken=-1;setBtn()};const pause=()=>{play=false;stopSpeech();spDone=true;spoken=-1;setBtn()};
  const seekTo=x=>{t=Math.max(0,Math.min(total()-.01,x));stopSpeech();spDone=true;spoken=-1;cur=-1;started=true;setBtn()};
  const close=()=>{cancelAnimationFrame(raf);stopSpeech();document.removeEventListener("keydown",key);ro&&ro.disconnect();try{if(document.fullscreenElement)document.exitFullscreen()}catch(e){}ov.remove()};
  $("#ssBig",ov).onclick=go;$("#ssPlay",ov).onclick=()=>play?pause():go();$("#ssSt",ov).addEventListener("click",e=>{if(e.target.closest(".vbig"))return;play?pause():go()});
  $("#ssPrev",ov).onclick=()=>seekTo(starts[Math.max(0,(cur<0?0:cur)-(t-starts[Math.max(0,cur)]>1.5?0:1))]+.01);$("#ssNext",ov).onclick=()=>seekTo(starts[Math.min(sl.length-1,(cur<0?0:cur)+1)]+.01);
  $("#ssSeek",ov).oninput=e=>seekTo(+e.target.value/1000*total());$("#ssRate",ov).onchange=e=>{rate=+e.target.value;if(play&&voice)spoken=-1};
  const setVol=(v,m)=>{UI.vol=v;UI.mute=m;local.set("vol",v);local.set("mute",m);$("#ssMute",ov).innerHTML=ic(m||v===0?"mute":"vol");$("#ssVol",ov).value=m?0:v;if(play&&voice){stopSpeech();spDone=true;spoken=-1}};
  $("#ssVol",ov).oninput=e=>setVol(+e.target.value,false);$("#ssMute",ov).onclick=()=>setVol(UI.vol||1,!UI.mute);
  $("#ssCap2",ov).onclick=e=>{capOn=!capOn;local.set("vCap",capOn);e.currentTarget.setAttribute("aria-pressed",capOn)};
  const vv=$("#ssVoice",ov);if(vv)vv.onclick=e=>{voice=!voice;local.set("vVoice",voice);e.currentTarget.setAttribute("aria-pressed",voice);if(!voice){stopSpeech();spDone=true}else spoken=-1};
  $("#ssFull",ov).onclick=()=>{try{(document.fullscreenElement?document.exitFullscreen():ov.requestFullscreen()).catch(()=>{})}catch(e){}};$("#ssX",ov).onclick=close;
  const key=e=>{if(!document.body.contains(ov))return;if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();close();return}if(e.key===" "){e.preventDefault();play?pause():go()}if(e.key==="ArrowRight")$("#ssNext",ov).click();if(e.key==="ArrowLeft")$("#ssPrev",ov).click();
    if(e.key==="m"||e.key==="M")$("#ssMute",ov).click();if(e.key==="ArrowUp"||e.key==="ArrowDown"){e.preventDefault();const v=Math.max(0,Math.min(1,(UI.mute?0:(UI.vol??1))+(e.key==="ArrowUp"?.1:-.1)));setVol(Math.round(v*20)/20,false)}};
  document.addEventListener("keydown",key,true);let ro=null;try{ro=new ResizeObserver(()=>{if(frame)slFit(host,frame)});ro.observe(host)}catch(e){}
  if(!RM())ov.animate([{opacity:0},{opacity:1}],{duration:220,easing:"ease-out"});
  render();raf=requestAnimationFrame(loop);setTimeout(go,350);
}

/* =====================================================================
   MẪU MÀU GIAO DIỆN MỚI + BỘ CHỦ ĐỀ (giao diện + cảnh nền + biểu tượng)
   ===================================================================== */
const SKIN_VARS={
 sakura:["light",["#fff5f8","#ffffff","#fff0f5","#ffe4ee","#f6cddd","#4a2a3a","#9a6b80","#e8578f","#ffe0ec","#ffffff","#7b8ce8","#e6e9ff"],{l:"Hoa anh đào"}],
 ocean:["dark",["#0b1a20","#10262e","#163340","#1b3c4a","#24505f","#e3f6f8","#8fb9c0","#4fd1c5","#123c3c","#062220","#7fb8ff","#173450"],{l:"Đại dương đêm"}],
 lavender:["light",["#f6f3ff","#ffffff","#f1ecff","#e8e0ff","#d8cdf7","#3a2f63","#7a6ea3","#8a6cf0","#ece5ff","#ffffff","#e87fb8","#fde6f2"],{l:"Oải hương",pixel:true}],
 matcha:["light",["#f3f7ee","#ffffff","#eef4e6","#e4eedb","#cfdec0","#26331c","#667a58","#5b8c3a","#e3efd6","#ffffff","#c98a4a","#f6e7d6"],{l:"Trà xanh"}],
 peach:["light",["#fff4ec","#ffffff","#fff0e6","#ffe6d6","#f6d2bb","#3f2a20","#8f6a58","#f07a4a","#ffe3d4","#ffffff","#3fa6a0","#d8f1ef"],{l:"Đào hoàng hôn"}],
 midnight:["dark",["#0d1226","#141a33","#1a2140","#20294d","#2c3762","#e6ebff","#9aa4cc","#7aa2ff","#1d2a52","#0a1230","#ff9bd2","#3a2240"],{l:"Xanh nửa đêm"}],
 neon:["dark",["#0b0716","#140d26","#1b1233","#24183f","#3a2763","#f4ecff","#a99ad1","#ff3ea5","#3a1230","#1a0410","#29f0ff","#0c3442"],{l:"Neon cyber",pixel:true}],
 coffee:["dark",["#1a1411","#231b17","#2b221c","#352a23","#4a3a30","#f3e7dc","#bba493","#d9a066","#3a2a1c","#1a1006","#8fc7a8","#1f3328"],{l:"Cà phê sữa"}],
 mint:["light",["#eefbf6","#ffffff","#e6f7ef","#dbf2e7","#bfe6d4","#1f3a30","#5d8576","#2bb39a","#d6f3ea","#ffffff","#f08bb8","#fde4ef"],{l:"Bạc hà pixel",pixel:true}],
 terminal:["dark",["#050d07","#0a160d","#0e1d12","#132618","#1e3b25","#c8ffd6","#6fae80","#39ff7a","#0f3a1c","#021006","#ffd166","#3a2e0c"],{l:"Màn hình cổ"}],
 nord:["dark",["#2e3440","#353c4a","#3b4252","#434c5e","#4c566a","#eceff4","#a3adbf","#88c0d0","#34505a","#1d2a30","#b48ead","#3e3647"],{l:"Bắc Âu"}],
 ink:["light",["#f7f1e3","#fffaf0","#f3ebd8","#ece2c9","#ddd0b0","#2a2a33","#6d6656","#3a5ba0","#e2e8f4","#ffffff","#c0504d","#f7e0de"],{l:"Mực & giấy"}]
};
(function addSkins(){let css="";Object.entries(SKIN_VARS).forEach(([k,[theme,c,o]])=>{const [bg,panel,panel2,hover,line,ink,muted,accent,accSoft,accInk,sig,sigSoft]=c;
  if(!SKINS.find(s=>s.k===k))SKINS.push({k,l:o.l,sw:[bg,panel2,accent,sig],theme,pixel:!!o.pixel});
  const dark=theme==="dark";
  css+=`:root[data-skin="${k}"]{--bg:${bg};--panel:${panel};--panel2:${panel2};--hover:${hover};--line:${line};--ink:${ink};--muted:${muted};--accent:${accent};--accent-soft:${accSoft};--accent-ink:${accInk};--sig:${sig};--sig-soft:${sigSoft};--ok:${dark?"#7be0a0":"#2e8a52"};--warn:${dark?"#f2c46a":"#a8690f"};--bad:${dark?"#ff8a8a":"#c0392b"};--trace:${dark?"#f2d07a":"#b48a2a"};--ink-hand:${dark?sig:accent};--pen-red:${dark?"#ff9ab0":"#d9365e"};--frame:${line};color-scheme:${theme}${k==="terminal"?";--f-body:'JetBrains Mono',ui-monospace,monospace;--f-display:'JetBrains Mono',ui-monospace,monospace":k==="ink"?";--f-display:'Patrick Hand','Be Vietnam Pro',system-ui,sans-serif":(o.pixel?";--f-display:'Baloo 2','Quicksand',system-ui,sans-serif;--f-body:'Quicksand','IBM Plex Sans',system-ui,sans-serif":"")}}\n`});
  const st=document.createElement("style");st.id="skins16";st.textContent=css;document.head.appendChild(st)})();
const THEME_PRESETS=[
 {k:"p-night",l:"Đêm anh đào",skin:"demsao",bg:"night",sym:"auto"},{k:"p-beach",l:"Biển chiều",skin:"ocean",bg:"beach",sym:"auto"},{k:"p-pink",l:"Trời hồng mộng mơ",skin:"lavender",bg:"pinksky",sym:"auto"},
 {k:"p-garden",l:"Vườn nhà",skin:"matcha",bg:"cottage",sym:"auto"},{k:"p-sunset",l:"Phố hoàng hôn",skin:"peach",bg:"sunset",sym:"auto"},{k:"p-desk",l:"Desktop pastel",skin:"pastel",bg:"desk",sym:"heart"},
 {k:"p-sakura",l:"Mùa hoa anh đào",skin:"sakura",bg:"day",sym:"petal"},{k:"p-neon",l:"Thành phố neon",skin:"neon",bg:"night",sym:"star"},{k:"p-coffee",l:"Cà phê đêm mưa",skin:"coffee",bg:"night",sym:"rain"},
 {k:"p-snow",l:"Đêm tuyết",skin:"midnight",bg:"pinksky",sym:"snow"},{k:"p-term",l:"Phòng lab cổ",skin:"terminal",bg:"night",sym:"firefly"},{k:"p-paper",l:"Sổ tay giấy",skin:"ink",bg:"desk",sym:"note"}];
function applyPreset(p){applySkin(p.skin);UI.bg.sel=p.bg;UI.bg.wall=true;UI.bg.sym=p.sym;local.set("bgSym",p.sym);try{_fxL.forEach(L=>L.key="")}catch(e){}saveBg();applyBg();drawBanner();if(UI.view==="home")renderHome();renderFly();toast("Đã áp dụng chủ đề “"+p.l+"”")}
function skinMock(s){const [bg,p2,ac,sg]=s.sw;return `<div class="skmock" style="--b:${bg};--p:${p2};--a:${ac};--s:${sg||ac}"><i class="r"></i><i class="h"></i><i class="c1"></i><i class="c2"></i><i class="bt"></i></div>`}
const _renderFly16=renderFly;renderFly=function(...x){const r=_renderFly16.apply(this,x);if(UI.fly!=="skin")return r;const f=$(".flyout");if(!f)return r;
  const sk=$(".skins",f);if(sk){sk.innerHTML=["dark","light"].map(t=>`<div class="sk-grp">${t==="dark"?"Tối":"Sáng"}</div>`+SKINS.filter(s=>s.theme===t).map(s=>`<button class="skin" data-sk="${s.k}" aria-pressed="${UI.skin===s.k}" title="${esc(s.l)}">${skinMock(s)}<b>${esc(s.l)}${s.pixel?` <small>pixel</small>`:""}</b></button>`).join("")).join("");
    $$("[data-sk]",sk).forEach(b=>b.onclick=()=>{applySkin(b.dataset.sk);applyPrefs(UI.profile);renderFly();if(UI.view==="home")renderHome()})
    const pr=document.createElement("div");pr.className="presets";pr.innerHTML=`<h4 style="margin:2px 0 6px;font-size:14px">Bộ chủ đề (giao diện + cảnh nền)</h4><div class="pre-grid">${THEME_PRESETS.map(p=>{const s=SKINS.find(z=>z.k===p.skin)||SKINS[0];return `<button class="pre" data-pre="${p.k}" title="${esc(p.l)}"><img src="${sceneURL(p.bg,160,90,local.get("bnrSeed","so-hoc"))}" alt=""><span class="pre-sw" style="background:${s.sw[2]}"></span><b>${esc(p.l)}</b></button>`}).join("")}</div><h4 style="margin:10px 0 6px;font-size:14px">Màu giao diện</h4>`;
    sk.before(pr);$$("[data-pre]",pr).forEach(b=>b.onclick=()=>applyPreset(THEME_PRESETS.find(p=>p.k===b.dataset.pre)))}
  return r};

/* v16: trường công thức trong slide/video phải là LaTeX thuần (không $…$) */
{const _spec16b=spec;spec=function(k,cfg){const s=_spec16b(k,cfg);if((k==="slides"||k==="video")&&s&&s.task)s.task+=`\nQUY ƯỚC CÔNG THỨC: trong "math", "formula" và "steps" mỗi phần tử là MỘT dòng LaTeX thuần (ví dụ "F = A\\overline{B} + AB" hoặc "I = \\frac{5-2}{330}") — TUYỆT ĐỐI không bọc trong $…$ hay $$…$$, không dùng \\displaystyle, không trộn câu chữ (lời giải thích để ở "bullets"/"notes"/"note"). Phủ định dùng \\overline{A} hoặc A'. Trong "bullets" thì vẫn dùng $…$ cho công thức xen trong câu.`;return s}}

/* dòng công thức quá dài: thu nhỏ chữ thay vì xuống dòng */
function hwFit(root){const run=()=>{$$(".hw-sheet .step",root).forEach(st=>{const sp=st.lastElementChild;if(!sp)return;sp.style.fontSize="";const n=st.firstElementChild;const avail=st.clientWidth-(n&&n!==sp?n.offsetWidth+14:0)-30;let w=sp.scrollWidth;if(avail>40&&w>avail)sp.style.fontSize=Math.max(.55,avail/w).toFixed(3)+"em"})};requestAnimationFrame(run);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(run)}

/* =====================================================================
   v16 — GMAIL TRONG SỔ HỌC
   - Hộp thư: tìm thư, đọc, thêm thư làm nguồn bài học, AI tóm tắt, soạn / trả lời
   - Widget "Hộp thư Gmail", nút Gmail ở thanh bên và thanh trên
   - Chạy qua trình kết nối Gmail của Claude (trong ứng dụng Claude)
     hoặc qua đăng nhập Google (bản web)
   ===================================================================== */
const GM="Gmail";
Object.assign(IC,{mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5l8.5 6 8.5-6"/>',reply:'<path d="M9 15l-5-5 5-5"/><path d="M4 10h10a6 6 0 0 1 6 6v3"/>',search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>'});
const gmPay=r=>{if(!r)return {};if(r.payload&&typeof r.payload==="object")return r.payload;if(r.structuredContent&&typeof r.structuredContent==="object")return r.structuredContent;
  const t=Array.isArray(r.content)&&r.content.find(c=>c&&c.type==="text");if(t){try{return JSON.parse(t.text)}catch(e){}}return r};
async function gmCall(tool,args){if(!P.mcp)throw {code:"unavailable"};return gmPay(await P.mcp.callTool(GM,tool,args||{}))}
async function gmStatus(){if(!P.mcp)return "none";
  try{const r=await P.mcp.listTools(GM);const s=(r.servers||[]).find(x=>x.server===GM);if(!s||!s.tools||!s.tools.length)return "none";return s.authStatus==="needs_reauth"?"reauth":"ok"}catch(e){return "none"}}
function gmErr(e){const c=e&&e.code;
  if(c==="unavailable")return "Gmail chỉ dùng được trong ứng dụng Claude hoặc bản web đã đăng nhập Google.";
  if(c==="no_client")return "Chưa cấu hình Google Client ID — mở Cài đặt (bánh răng) để thêm.";
  if(c==="server_not_connected")return P.local?"Chưa liên kết Gmail: bấm “Liên kết Gmail” trong menu tài khoản.":"Chưa thêm Gmail: vào claude.ai → Cài đặt → Trình kết nối → Gmail.";
  if(c==="needs_reauth")return P.local?"Phiên Google hết hạn — bấm “Kết nối lại”.":"Phiên Gmail hết hạn: kết nối lại Gmail trong claude.ai → Cài đặt → Trình kết nối.";
  if(c==="popup_closed")return "Bạn đã đóng cửa sổ đăng nhập Google.";
  if(c==="approval_required"||c==="not_in_manifest")return e.message&&P.local?String(e.message):"Bạn chưa cho phép trang dùng Gmail.";
  if(c==="rate_limited")return "Gmail đang giới hạn số lượt — đợi một chút rồi thử lại.";
  return "Gmail báo lỗi: "+String(e&&e.message||e||"").slice(0,160)}
async function gmConnect(){
  if(!P.mcp){toast(gmErr({code:"unavailable"}),4500);return false}
  try{if(P.perm)await P.perm.request(["mcp:"+GM]);await gmCall("search_threads",{pageSize:1,view:"THREAD_VIEW_METADATA_ONLY"});toast("Đã liên kết Gmail");return true}catch(e){toast(gmErr(e),5000);return false}}
/* chuẩn hóa thư (chấp nhận cả kiểu camelCase lẫn snake_case) */
function gmNorm(m){m=m||{};const d=m.date||m.internalDate||m.internal_date||"";
  return {id:m.id,threadId:m.threadId||m.thread_id||"",subject:m.subject||"",from:m.sender||m.from||"",to:m.toRecipients||m.to_recipients||[],cc:m.ccRecipients||m.cc_recipients||[],
    date:/^\d{10,}$/.test(String(d))?new Date(+d):d?new Date(d):null,snippet:m.snippet||"",labels:m.labelIds||m.label_ids||[],body:m.plaintextBody||m.plaintext_body||"",atts:m.attachments||[],url:m.viewUrl||m.view_url||""}}
const gmName=s=>{s=String(s||"");const m=s.match(/^\s*"?([^"<]*?)"?\s*<[^>]+>/);return (m&&m[1].trim())||s.replace(/<.*>/,"").trim()||s};
const gmAddr=s=>{s=String(s||"");const m=s.match(/<([^>]+)>/);return (m?m[1]:s).trim()};
function gmWhen(d){if(!d||isNaN(d))return "";const n=new Date();if(d.toDateString()===n.toDateString())return d.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});
  return d.toLocaleDateString("vi-VN",d.getFullYear()===n.getFullYear()?{day:"numeric",month:"short"}:{day:"numeric",month:"numeric",year:"numeric"})}
const gmLink=t=>esc(t).replace(/(https?:\/\/[^\s<>"')\]]+)/g,'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
const GM_CHIPS=[["in:inbox","Hộp thư đến"],["is:unread in:inbox","Chưa đọc"],["is:starred","Gắn sao"],["has:attachment newer_than:60d","Có tệp đính kèm"],["(vgu OR moodle) newer_than:90d","Trường VGU · Moodle"],["(deadline OR \"hạn nộp\" OR assignment OR exam OR \"thi\") newer_than:30d","Hạn nộp · thi"],["in:sent","Đã gửi"]];
UI.mail={q:"in:inbox",threads:[],next:null,sel:null,thread:null};

async function openMailHub(threadId){
  const st=await gmStatus();
  if(st==="none"||st==="reauth"){
    openModal({title:"Gmail",small:true,body:`<div class="form"><div class="mail-hero">${ic("mail")}</div><p style="margin:0">Liên kết Gmail để đọc thư trường, thông báo Moodle, hạn nộp bài ngay trong Sổ Học; thêm thư làm <b>nguồn</b> cho bài học, nhờ AI tóm tắt và soạn thư trả lời.</p>
      <p class="muted" style="margin:0;font-size:13px">${P.local?"Trang sẽ mở cửa sổ Google để bạn chọn tài khoản và tích ô cho phép đọc / soạn thư. Quyền chỉ lưu trên trình duyệt này.":"Dùng trình kết nối Gmail trong tài khoản Claude của bạn. Nếu chưa thêm: claude.ai → Cài đặt → Trình kết nối → Gmail."}</p></div>`,
      foot:`<button class="pill-btn" data-close>Để sau</button><div class="grow"></div><button class="pill-btn primary" id="gmLk">${ic("mail")} ${st==="reauth"?"Kết nối lại Gmail":"Liên kết Gmail"}</button>`});
    $("#gmLk").onclick=async()=>{if(await gmConnect()){closeDialog();openMailHub(threadId)}};return}
  UI.reopen=null;const _vm=UI.vmode;if(_vm==="dock"||_vm==="split")UI.vmode="modal";
  const acc=P.local&&window.SOHOC&&SOHOC.google?SOHOC.google.accounts().find(a=>a.active):null;
  openModal({title:"Gmail",actions:`<div class="mh-acct">${acc?`${acc.pic?`<img src="${esc(acc.pic)}" alt="" referrerpolicy="no-referrer">`:ic("user")}<span>${esc(acc.email||acc.name)}</span>`:""}</div>`,
    body:`<div class="mailhub"><form class="mh-bar" id="mhF"><span class="mh-sic">${ic("search")}</span><input class="input" id="mhQ" placeholder="Tìm thư — ví dụ: from:vgu.edu.vn, moodle, hạn nộp" value="${esc(UI.mail.q)}" aria-label="Tìm trong Gmail"><button class="btn" type="submit">Tìm</button><button class="btn" type="button" id="mhR" title="Làm mới" aria-label="Làm mới">${ic("sync")}</button><button class="pill-btn primary" type="button" id="mhNew">${ic("edit")} Soạn thư</button></form>
      <div class="mh-chips">${GM_CHIPS.map(([q,l])=>`<button type="button" class="chip" data-mq="${esc(q)}" aria-pressed="${UI.mail.q===q}">${l}</button>`).join("")}</div>
      <div class="mh-main"><div class="mh-list" id="mhList" role="list"></div><div class="mh-read" id="mhRead"><div class="mh-empty">${ic("mail")}<p>Chọn một thư để đọc</p></div></div></div></div>`});UI.vmode=_vm;
  const go=q=>{UI.mail.q=q;$$("[data-mq]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.mq===q));gmList(false)};
  $("#mhF").onsubmit=e=>{e.preventDefault();go($("#mhQ").value.trim())};$("#mhR").onclick=()=>gmList(false);
  $$("[data-mq]").forEach(b=>b.onclick=()=>{$("#mhQ").value=b.dataset.mq;go(b.dataset.mq)});
  $("#mhNew").onclick=()=>gmCompose({});
  await gmList(false);if(threadId)gmOpen(threadId);
}
async function gmList(more){const L=$("#mhList");if(!L)return;
  if(!more){UI.mail.threads=[];UI.mail.next=null;L.innerHTML=Array.from({length:6},()=>`<div class="mh-item sk"><i></i><i></i><i></i></div>`).join("")}
  try{const r=await gmCall("search_threads",{query:UI.mail.q||undefined,pageSize:20,...(more&&UI.mail.next?{pageToken:UI.mail.next}:{})});
    const th=(r.threads||[]).map(t=>{const ms=(t.messages||[]).map(gmNorm);const last=ms[ms.length-1]||{};const first=ms[0]||{};
      return {id:t.id,count:t.messageCount||ms.length,subject:first.subject||last.subject||"(Không tiêu đề)",from:last.from||first.from,date:last.date||first.date,snippet:last.snippet||first.snippet,unread:ms.some(m=>m.labels.includes("UNREAD")),star:ms.some(m=>m.labels.includes("STARRED")),att:ms.some(m=>(m.atts||[]).length)}});
    UI.mail.threads=more?UI.mail.threads.concat(th):th;UI.mail.next=r.nextPageToken||r.next_page_token||null;gmPaintList()}
  catch(e){L.innerHTML=`<div class="mh-err">${esc(gmErr(e))}${e&&(e.code==="needs_reauth"||e.code==="server_not_connected")?`<button class="btn" id="mhRe" style="margin-top:8px">${ic("sync")} Kết nối lại</button>`:""}</div>`;const b=$("#mhRe");if(b)b.onclick=async()=>{if(await gmConnect())gmList(false)}}}
function gmPaintList(){const L=$("#mhList");if(!L)return;const T=UI.mail.threads;
  L.innerHTML=T.length?T.map(t=>`<button class="mh-item${t.unread?" unread":""}${UI.mail.sel===t.id?" on":""}" data-th="${esc(t.id)}" role="listitem"><span class="mh-from">${esc(gmName(t.from))}${t.count>1?` <small>${t.count}</small>`:""}</span><span class="mh-date">${t.star?"★ ":""}${esc(gmWhen(t.date))}</span><b class="mh-sub">${esc(t.subject)}</b><span class="mh-snip">${esc(t.snippet)}</span></button>`).join("")+(UI.mail.next?`<button class="btn mh-more" id="mhMore">Xem thêm</button>`:"")
    :`<div class="mh-empty">${ic("search")}<p>Không có thư nào khớp “${esc(UI.mail.q)}”.</p></div>`;
  $$("[data-th]",L).forEach(b=>b.onclick=()=>gmOpen(b.dataset.th));const m=$("#mhMore");if(m)m.onclick=()=>{m.disabled=true;gmList(true)}}
async function gmOpen(id){UI.mail.sel=id;$$(".mh-item").forEach(b=>b.classList.toggle("on",b.dataset.th===id));const R=$("#mhRead");if(!R)return;
  R.classList.add("open");R.innerHTML=`<div class="mh-loading"><span class="spin"></span> Đang mở thư…</div>`;
  try{const t=await gmCall("get_thread",{threadId:id,messageFormat:"PLAIN_TEXT"});const ms=(t.messages||[]).map(gmNorm);if(!ms.length)throw {code:"tool_error",message:"Thư trống"};
    const th={id,subject:ms[0].subject||"(Không tiêu đề)",msgs:ms,url:t.viewUrl||t.view_url||ms[0].url||("https://mail.google.com/mail/#all/"+id)};UI.mail.thread=th;
    const it=UI.mail.threads.find(x=>x.id===id);if(it){it.unread=false;gmPaintList()}
    R.innerHTML=`<div class="mh-rhead"><button class="ghost ic mh-back" id="mhBack" aria-label="Quay lại danh sách">${ic("back")}</button><h3>${esc(th.subject)}</h3></div>
      <div class="mh-acts"><button class="btn" id="mhSrc">${ic("plus")} Thêm làm nguồn bài học</button><button class="btn" id="mhSum">${ic("spark")} AI tóm tắt</button><button class="btn" id="mhRep">${ic("reply")} Trả lời</button><a class="btn" href="${esc(th.url)}" target="_blank" rel="noopener noreferrer">${ic("ext")} Mở Gmail</a></div>
      <div id="mhAI"></div>
      ${ms.map((m,i)=>`<article class="mh-msg${i<ms.length-2?" fold":""}"><header><span class="mh-av">${esc((gmName(m.from)[0]||"?").toUpperCase())}</span><div><b>${esc(gmName(m.from))}</b> <small>${esc(gmAddr(m.from))}</small><br><small>đến ${esc((m.to||[]).map(gmName).join(", ")||"—")}</small></div><time>${m.date&&!isNaN(m.date)?esc(m.date.toLocaleString("vi-VN",{dateStyle:"medium",timeStyle:"short"})):""}</time></header>
        <div class="mh-body">${gmLink(m.body||m.snippet||"")}</div>${(m.atts||[]).length?`<div class="mh-atts">${m.atts.map(a=>`<span class="chip">${ic("file")} ${esc(a.filename||a.name||"tệp")}</span>`).join("")}</div>`:""}</article>`).join("")}`;
    $$(".mh-msg.fold header",R).forEach(h=>h.onclick=()=>h.parentElement.classList.remove("fold"));
    $("#mhBack").onclick=()=>R.classList.remove("open");
    $("#mhSrc").onclick=e=>gmAddSource(th,e.currentTarget);$("#mhSum").onclick=()=>gmSummary(th);
    $("#mhRep").onclick=()=>{const last=ms[ms.length-1];gmCompose({to:gmAddr(last.from),subject:/^re:/i.test(th.subject)?th.subject:"Re: "+th.subject,threadId:id,quote:last})}}
  catch(e){R.innerHTML=`<div class="mh-err">${esc(gmErr(e))}</div>`}}
const gmText=th=>`Thư: ${th.subject}\n`+th.msgs.map(m=>`--- Từ: ${m.from}\nĐến: ${(m.to||[]).join(", ")}\nNgày: ${m.date&&!isNaN(m.date)?m.date.toLocaleString("vi-VN"):""}\n\n${(m.body||m.snippet||"").trim()}${(m.atts||[]).length?"\n[Tệp đính kèm: "+m.atts.map(a=>a.filename||a.name).join(", ")+"]":""}`).join("\n\n");
async function gmAddSource(th,btn){
  const put=async nb=>{const text=gmText(th);const id=mkid("src");const CH=60000,chunks=[];for(let i=0;i<text.length&&chunks.length<12;i+=CH)chunks.push(text.slice(i,i+CH));
    for(let i=0;i<chunks.length;i++)await Store.put(`txt-${id}-${i}`,{type:"txt",nb:nb.id,src:id,n:i,text:chunks[i]});UI.textCache.set(id,chunks.join(""));
    await Store.put(id,{type:"src",nb:nb.id,name:("✉ "+th.subject).slice(0,120),kind:"paste",chars:text.length,chunks:chunks.length,truncated:false,url:th.url,on:true,created:Date.now()});
    const cnt=(await Store.query({nb:nb.id,type:"src"})).length;await Store.patch(nb.id,{srcCount:cnt,updated:Date.now()});toast(`Đã thêm thư vào “${nb.title}”`)};
  if(UI.view==="nb"&&UI.cur)return put(UI.cur);
  const nbs=[...(UI.nbs||[])].sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,12);if(!nbs.length){toast("Chưa có sổ học nào — tạo bài học trước");return}
  const m=popMenu(btn,`<div class="who">Thêm thư vào bài học</div>${nbs.map(n=>`<button data-nbp="${esc(n.id)}">${ic("book")}${esc(n.title)}</button>`).join("")}`);
  $$("[data-nbp]",m).forEach(b=>b.onclick=()=>{const n=UI.nbs.find(x=>x.id===b.dataset.nbp);if(n)put(n)})}
async function gmSummary(th){const box=$("#mhAI");if(!box)return;if(!P.sample){box.innerHTML=`<div class="mh-ai muted">Cần trợ lý AI để tóm tắt.</div>`;return}
  box.innerHTML=`<div class="mh-ai"><b>${ic("spark")} Tóm tắt</b><div class="mh-ai-t"><span class="spin"></span></div></div>`;const out=$(".mh-ai-t",box);
  const prompt=`Tóm tắt thư sau bằng tiếng Việt cho một sinh viên, ngắn gọn:\n- 1 câu: thư nói về gì, ai gửi\n- Các việc cần làm (nếu có), mỗi việc một dòng, ghi rõ HẠN (ngày/giờ) nếu thư có\n- Điểm cần chú ý khác (nếu có)\nKhông bịa thông tin không có trong thư.\n\n${gmText(th).slice(0,24000)}`;
  try{const r=await P.sample(prompt,{modelTier:"quick",onText:({text})=>{out.innerHTML=mdBlock(text)}});out.innerHTML=mdBlock(r.text||"")}catch(e){out.innerHTML=`<span style="color:var(--bad)">${esc(aiErr(e))}</span>`}}
function gmCompose({to="",cc="",subject="",body="",threadId=null,quote=null}){
  openModal({title:threadId?"Trả lời thư":"Soạn thư mới",small:true,body:`<div class="form mh-comp">
    <div class="field"><label for="gcTo">Đến</label><input class="input" id="gcTo" value="${esc(to)}" placeholder="ten@vgu.edu.vn, ban@gmail.com" spellcheck="false" autocomplete="email"></div>
    <div class="field"><label for="gcCc">Cc</label><input class="input" id="gcCc" value="${esc(cc)}" spellcheck="false"></div>
    <div class="field"><label for="gcSub">Tiêu đề</label><input class="input" id="gcSub" value="${esc(subject)}"></div>
    <div class="field"><label for="gcBody">Nội dung</label><textarea class="input" id="gcBody" rows="9">${esc(body)}</textarea></div>
    <div class="mh-aiw"><input class="input" id="gcAsk" placeholder="${threadId?"Muốn trả lời thế nào? — ví dụ: xin gia hạn nộp bài 2 ngày":"Muốn viết gì? — ví dụ: email xin thầy lịch hẹn trao đổi đồ án"}"><button class="btn" type="button" id="gcAI">${ic("spark")} AI viết giúp</button></div>
    <p class="muted" style="margin:0;font-size:12.5px">Thư chỉ được gửi khi bạn bấm “Gửi”. AI chỉ viết nháp — hãy đọc lại trước khi gửi.</p></div>`,
    foot:`<button class="pill-btn" data-close>Hủy</button><div class="grow"></div><button class="pill-btn" id="gcDraft">Lưu nháp</button><button class="pill-btn primary" id="gcSend">${ic("send")} Gửi</button>`});
  const val=()=>{const sp=s=>s.split(/[,;]/).map(x=>x.trim()).filter(Boolean);return {to:sp($("#gcTo").value),cc:sp($("#gcCc").value),subject:$("#gcSub").value.trim(),body:$("#gcBody").value}};
  const bad=v=>{const all=[...v.to,...v.cc];if(!v.to.length)return "Nhập người nhận";const w=all.find(a=>!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(a));return w?`Địa chỉ chưa đúng: ${w}`:null};
  $("#gcAI").onclick=async()=>{if(!P.sample){toast("Cần trợ lý AI");return}const ask=$("#gcAsk").value.trim();const ta=$("#gcBody");const btn=$("#gcAI");btn.disabled=true;
    const prompt=`Viết nội dung một email bằng ${/[a-z]{3,}/i.test(ask)&&!/[ăâđêôơưáàảãạ]/i.test(ask)?"ngôn ngữ của yêu cầu":"tiếng Việt"} (hoặc tiếng Anh/Đức nếu yêu cầu nói vậy), lịch sự, ngắn gọn, phù hợp sinh viên viết cho thầy cô/bạn bè ở trường đại học. Chỉ trả về phần thân thư (có lời chào và ký tên “[Tên của bạn]”), không có tiêu đề, không markdown.\nYÊU CẦU: ${ask||"viết thư phù hợp"}\nTIÊU ĐỀ: ${$("#gcSub").value}\n${ta.value.trim()?"BẢN NHÁP HIỆN TẠI:\n"+ta.value.slice(0,4000)+"\n":""}${quote?"THƯ ĐANG TRẢ LỜI (từ "+quote.from+"):\n"+String(quote.body||quote.snippet).slice(0,6000):""}`;
    try{const r=await P.sample(prompt,{modelTier:"quick",onText:({text})=>{ta.value=text}});ta.value=String(r.text||ta.value).trim();if(!$("#gcSub").value.trim()&&ask)$("#gcSub").value=ask.slice(0,80)}catch(e){toast(aiErr(e),4000)}btn.disabled=false};
  $("#gcDraft").onclick=async()=>{const v=val();if(!v.to.length&&!v.body.trim()){toast("Thư còn trống");return}try{await gmCall("create_draft",{...v,...(threadId&&quote?{replyToMessageId:quote.id}:{})});closeDialog();toast("Đã lưu vào Thư nháp của Gmail")}catch(e){toast(gmErr(e),4500)}};
  $("#gcSend").onclick=async()=>{const v=val();const b=bad(v);if(b){toast(b);return}if(!v.subject&&!confirm("Gửi thư không có tiêu đề?"))return;const btn=$("#gcSend");btn.disabled=true;
    try{await gmCall("send_message",{...v,...(threadId?{replyThreadId:threadId}:{})});closeDialog();toast("Đã gửi thư tới "+v.to.join(", "))}catch(e){btn.disabled=false;toast(gmErr(e),5000)}}}

/* ---------- widget "Hộp thư Gmail" ---------- */
WIDGETS.mail={t:"inbox.exe",title:"Hộp thư Gmail",desc:"Thư chưa đọc mới nhất, bấm để đọc",build(b){let alive=true;
  const draw=async()=>{if(!alive)return;const st=await gmStatus();if(st!=="ok"){b.innerHTML=`<div class="row muted" style="font-size:12.5px">${st==="reauth"?"Phiên Gmail hết hạn.":"Chưa liên kết Gmail."}</div><div class="row"><button class="sm on" data-gml>${ic("mail")} ${st==="reauth"?"Kết nối lại":"Liên kết Gmail"}</button></div>`;$("[data-gml]",b).onclick=async()=>{if(await gmConnect())draw()};return}
    b.innerHTML=`<div class="row muted" style="font-size:12.5px"><span class="spin"></span> Đang tải thư…</div>`;
    try{const r=await gmCall("search_threads",{query:"is:unread in:inbox",pageSize:5});const th=(r.threads||[]).map(t=>{const ms=(t.messages||[]).map(gmNorm);const l=ms[ms.length-1]||{};return {id:t.id,s:(ms[0]||l).subject||"(Không tiêu đề)",f:gmName(l.from),d:l.date}});
      const est=+(r.resultCountEstimate||r.result_count_estimate||th.length);
      b.innerHTML=`<div class="row" style="justify-content:space-between"><b style="font-size:12.5px">${th.length?`${est>th.length?est+"+":th.length} thư chưa đọc`:"Không có thư chưa đọc ♡"}</b><button class="sm" data-gmo>Mở</button></div>${th.map(t=>`<button class="mw-item" data-gmt="${esc(t.id)}"><b>${esc(t.f)}</b><span>${esc(t.s)}</span><small>${esc(gmWhen(t.d))}</small></button>`).join("")}`;
      $("[data-gmo]",b).onclick=()=>openMailHub();$$("[data-gmt]",b).forEach(x=>x.onclick=()=>openMailHub(x.dataset.gmt))}
    catch(e){b.innerHTML=`<div class="row muted" style="font-size:12.5px">${esc(gmErr(e))}</div>`}};
  draw();const iv=setInterval(draw,5*60000);return {stop(){alive=false;clearInterval(iv)}}}};

/* ---------- nút Gmail ở thanh bên + thanh trên ---------- */
RAIL_ALL.mail=["Gmail — hộp thư","mail"];TOP_ALL.mail=["Gmail","mail"];
{const d=UI.dash;if(d){if(d.rail&&!d.rail.order.includes("mail"))d.rail.order.splice(Math.max(0,d.rail.order.indexOf("cal")+1),0,"mail");if(d.top&&!d.top.order.includes("mail"))d.top.order.splice(Math.max(0,d.top.order.indexOf("cal")+1),0,"mail")}}
const _railAct17=railAct;railAct=function(k,btn){if(k==="mail"){hideTip();closeFly();return openMailHub()}return _railAct17(k,btn)};
const _topAct17=topAct;topAct=function(k){if(k==="mail")return openMailHub();return _topAct17(k)};

/* ---------- menu tài khoản trong ứng dụng Claude: thêm Gmail ---------- */
if(!window.SOHOC){accountMenu=async function(anchor){
  const name=(P.me&&P.me.name)||"Bạn";const [gc,gm]=await Promise.all([gcStatus(),gmStatus()]);const lbl=s=>s==="ok"?`<b style="color:var(--ok)">đã liên kết</b>`:s==="none"?`<b style="color:var(--warn)">chưa thêm</b>`:`<b style="color:var(--warn)">cần kết nối lại</b>`;
  const m=popMenu(anchor,`<div class="who"><b style="color:var(--ink)">${esc(name)}</b><br>Đăng nhập bằng tài khoản Claude</div><div class="sep"></div>
    <div class="who">Tài khoản Google (qua trình kết nối của Claude)</div>
    <button data-a="gc">${ic("cal")}<span style="flex:1">Google Calendar</span>${lbl(gc)}</button>
    <button data-a="gm">${ic("mail")}<span style="flex:1">Gmail</span>${lbl(gm)}</button>
    <div class="who" style="font-size:12px">Đổi tài khoản Google: claude.ai → Cài đặt → Trình kết nối.</div><div class="sep"></div>
    <div class="who">${Store.persistent()?"Sổ học được lưu riêng cho tài khoản của bạn.":"Đang chạy ngoài ứng dụng Claude: dữ liệu chỉ tồn tại trong phiên này."}</div>`);
  $("[data-a=gc]",m).onclick=()=>gc==="ok"?openCalendarHub():gcConnect();$("[data-a=gm]",m).onclick=()=>openMailHub()}}
setTimeout(()=>{try{renderRail()}catch(e){}},80);

/* =====================================================================
   v17 — MẠCH 3D CHẠY ĐƯỢC: NỐI DÂY GIỮA CÁC CHÂN + MÔ PHỎNG (dòng, áp, LED sáng,
   tụ nạp/xả, transistor, IC cổng logic) · AI DỰNG MẠCH NHANH (netlist gọn + tự xếp chỗ)
   ===================================================================== */
/* ---------- chân linh kiện (toạ độ trong khung của linh kiện) ---------- */
const M3_PINS={
 resistor:()=>[["a",[-.75,.03,0],"Chân 1"],["b",[.75,.03,0],"Chân 2"]],
 led:()=>[["A",[-.12,.03,0],"Anode (+)"],["K",[.12,.03,0],"Cathode (−)"]],
 capacitor:()=>[["+",[-.1,.03,0],"Cực +"],["-",[.1,.03,0],"Cực −"]],
 battery:p=>p.props.kind==="aa"?[["+",[.63,.28,0],"Cực +"],["-",[-.55,.28,0],"Cực −"]]:[["+",[.25,1.72,.15],"Cực +"],["-",[-.25,1.72,-.15],"Cực −"]],
 switch:()=>[["a",[-.25,.03,0],"Chân 1"],["b",[.25,.03,0],"Chân 2"]],
 transistor:()=>[["C",[-.14,.03,0],"Cực C"],["B",[0,.03,0],"Cực B"],["E",[.14,.03,0],"Cực E"]],
 ic:p=>{const n=(p.props.pins||14)/2,len=n*.4+.3,o=[];for(let i=0;i<n;i++)o.push([String(i+1),[-len/2+.3+i*.4,.03,.95],"Chân "+(i+1)]);for(let i=0;i<n;i++)o.push([String(n+i+1),[-len/2+.3+(n-1-i)*.4,.03,-.95],"Chân "+(n+i+1)]);return o}};
const ICPWR={8:[8,1],14:[14,7],16:[16,8]};
function m3PinName(p,name){const s=String(name||"").trim();const l=s.toLowerCase();const t=p.type;
  if(t==="led")return /^(a|an|anode|\+|p|1)$/.test(l)?"A":/^(k|c|ca|cathode|-|−|n|2)$/.test(l)?"K":null;
  if(t==="capacitor"||t==="battery")return /^(\+|p|pos|a|1|vcc|v\+)$/.test(l)?"+":/^(-|−|n|neg|b|2|gnd|v-)$/.test(l)?"-":null;
  if(t==="resistor"||t==="switch")return /^(a|1|l|left)$/.test(l)?"a":/^(b|2|r|right)$/.test(l)?"b":null;
  if(t==="transistor")return /^c/.test(l)?"C":/^b/.test(l)?"B":/^e/.test(l)?"E":null;
  if(t==="ic"){const n=p.props.pins||14;if(l==="vcc"||l==="vdd"||l==="v+")return String(ICPWR[n][0]);if(l==="gnd"||l==="vss")return String(ICPWR[n][1]);const k=parseInt(l.replace(/^(pin|chân)\s*/,""),10);return k>=1&&k<=n?String(k):null}
  return null}
/* toán học không cần three: vị trí thế giới của một chân (Euler XYZ như three.js) */
function m3World(p,loc){const [sx,sy,sz]=p.scale||[1,1,1];let x=loc[0]*sx,y=loc[1]*sy,z=loc[2]*sz;const [ax,ay,az]=(p.rot||[0,0,0]).map(d=>d*Math.PI/180);
  let c=Math.cos(az),s=Math.sin(az);[x,y]=[x*c-y*s,x*s+y*c];c=Math.cos(ay);s=Math.sin(ay);[x,z]=[x*c+z*s,-x*s+z*c];c=Math.cos(ax);s=Math.sin(ax);[y,z]=[y*c-z*s,y*s+z*c];
  return [p.pos[0]+x,p.pos[1]+y,p.pos[2]+z]}
function m3Terms(spec){const out=[];spec.parts.forEach(p=>{const f=M3_PINS[p.type];if(!f)return;f(p).forEach(([pin,loc,lab])=>out.push({pid:p.id,pin,lab,part:p,pos:m3World(p,loc)}))});return out}
const d3=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
function m3Route(A,B){const d=d3(A,B);if(d<.7)return [A,[(A[0]+B[0])/2,Math.max(A[1],B[1])+.22,(A[2]+B[2])/2],B];const h=Math.max(A[1],B[1])+.45+Math.min(1.4,d*.12);
  return [A,[A[0],A[1]+.3,A[2]],[(A[0]+B[0])/2,h,(A[2]+B[2])/2],[B[0],B[1]+.3,B[2]],B].map(q=>q.map(v=>Math.round(v*100)/100))}
/* dây có tham chiếu chân → cập nhật hai đầu (và đường đi nếu dây tự định tuyến) */
function m3Relink(spec,onlyPid){const T=new Map(m3Terms(spec).map(t=>[t.pid+"|"+t.pin,t]));const changed=[];
  spec.parts.forEach(w=>{if(w.type!=="wire")return;const P=w.props;if(!P.a&&!P.b)return;if(onlyPid&&!(P.a&&P.a.id===onlyPid)&&!(P.b&&P.b.id===onlyPid))return;
    const ta=P.a&&T.get(P.a.id+"|"+P.a.pin),tb=P.b&&T.get(P.b.id+"|"+P.b.pin);if(!ta&&!tb)return;
    const A=ta?[ta.pos[0],ta.pos[1]+.03,ta.pos[2]]:P.pts[0],B=tb?[tb.pos[0],tb.pos[1]+.03,tb.pos[2]]:P.pts[P.pts.length-1];
    if(P.auto)P.pts=m3Route(A,B);else{P.pts[0]=A;P.pts[P.pts.length-1]=B}changed.push(w.id)});return changed}

/* ---------- dựng mạng điện (nút) ---------- */
function m3Netlist(spec){
  const terms=m3Terms(spec);const par=new Map();const f=k=>{while(par.get(k)!==k){par.set(k,par.get(par.get(k)));k=par.get(k)}return k};const add=k=>{if(!par.has(k))par.set(k,k)};const uni=(a,b)=>{add(a);add(b);a=f(a);b=f(b);if(a!==b)par.set(a,b)};
  terms.forEach(t=>add(t.pid+"|"+t.pin));
  for(let i=0;i<terms.length;i++)for(let j=i+1;j<terms.length;j++)if(terms[i].pid!==terms[j].pid&&d3(terms[i].pos,terms[j].pos)<.1)uni(terms[i].pid+"|"+terms[i].pin,terms[j].pid+"|"+terms[j].pin);
  const wires=spec.parts.filter(p=>p.type==="wire");const ends=[];
  wires.forEach(w=>{const P=w.props;["a","b"].forEach((e,ix)=>{const k=w.id+"|"+e;add(k);const pt=ix?P.pts[P.pts.length-1]:P.pts[0];ends.push({k,pt,w});const ref=P[e];
    if(ref&&par.has(ref.id+"|"+ref.pin)){uni(k,ref.id+"|"+ref.pin);return}
    let best=null,bd=.23;terms.forEach(t=>{const d=d3(t.pos,pt);if(d<bd){bd=d;best=t}});if(best)uni(k,best.pid+"|"+best.pin)})});
  for(let i=0;i<ends.length;i++)for(let j=i+1;j<ends.length;j++)if(ends[i].w!==ends[j].w&&d3(ends[i].pt,ends[j].pt)<.16)uni(ends[i].k,ends[j].k);
  /* tách nút theo dây: dây là điện trở rất nhỏ để biết dòng qua từng dây */
  const idx=new Map();let n=0;par.forEach((_,k)=>{const r=f(k);if(!idx.has(r))idx.set(r,n++)});const node=k=>par.has(k)?idx.get(f(k)):-1;
  const deg=new Map();par.forEach((_,k)=>{const r=node(k);deg.set(r,(deg.get(r)||0)+1)});
  return {terms,wires,node,n,deg}}

/* ---------- bộ giải mạch (phân tích nút, mô hình tuyến tính từng đoạn) ---------- */
const M3_VF={red:1.8,orange:2,yellow:2.1,green:2.2,blue:3,white:3};
const M3_GATES={"74HC00":{f:(a,b)=>!(a&&b),g:[[1,2,3],[4,5,6],[9,10,8],[12,13,11]]},"74HC08":{f:(a,b)=>a&&b,g:[[1,2,3],[4,5,6],[9,10,8],[12,13,11]]},"74HC32":{f:(a,b)=>a||b,g:[[1,2,3],[4,5,6],[9,10,8],[12,13,11]]},
  "74HC86":{f:(a,b)=>a!==b,g:[[1,2,3],[4,5,6],[9,10,8],[12,13,11]]},"74HC02":{f:(a,b)=>!(a||b),g:[[2,3,1],[5,6,4],[8,9,10],[11,12,13]]},"74HC04":{f:a=>!a,g:[[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]]}};
const gateOf=lab=>{const m=String(lab||"").toUpperCase().replace(/\s/g,"").match(/74(?:HC|HCT|LS|AC|ACT|F|)?(00|02|04|08|32|86)/);return m?M3_GATES["74HC"+m[1]]:null};
const capF=p=>{if(p.props.uf)return p.props.uf*1e-6;const m=String(p.props.label||p.label||"").replace(",",".").match(/([\d.]+)\s*([pnuµm]?)F/i);if(!m)return 100e-6;return (+m[1])*({p:1e-12,n:1e-9,u:1e-6,"µ":1e-6,m:1e-3,"":1})[m[2]]||100e-6};
function solveLin(A,b){const n=b.length;for(let c=0;c<n;c++){let p=c,mx=Math.abs(A[c][c]);for(let r=c+1;r<n;r++){const v=Math.abs(A[r][c]);if(v>mx){mx=v;p=r}}if(mx<1e-15)continue;if(p!==c){[A[c],A[p]]=[A[p],A[c]];[b[c],b[p]]=[b[p],b[c]]}
    const ac=A[c],inv=1/ac[c];for(let r=c+1;r<n;r++){const ar=A[r];const k=ar[c]*inv;if(!k)continue;for(let j=c;j<n;j++)ar[j]-=k*ac[j];b[r]-=k*b[c]}}
  const x=new Array(n).fill(0);for(let r=n-1;r>=0;r--){let s=b[r];const ar=A[r];for(let j=r+1;j<n;j++)s-=ar[j]*x[j];x[r]=Math.abs(ar[r])<1e-15?0:s/ar[r]}return x}
function m3Simulate(spec,S,dt){
  const N=m3Netlist(spec);const nd=(id,pin)=>N.node(id+"|"+pin);const el=[];const res={parts:{},wires:{},warn:[],gnd:-1};
  spec.parts.forEach(p=>{const t=p.type;const P=p.props;
    if(t==="battery"){const v=P.kind==="aa"?1.5:9;el.push({k:"bat",p,a:nd(p.id,"+"),b:nd(p.id,"-"),v,r:P.kind==="aa"?.15:1.5})}
    else if(t==="resistor")el.push({k:"r",p,a:nd(p.id,"a"),b:nd(p.id,"b"),g:1/Math.max(.1,P.ohm||330)});
    else if(t==="switch")el.push({k:"sw",p,a:nd(p.id,"a"),b:nd(p.id,"b")});
    else if(t==="led")el.push({k:"led",p,a:nd(p.id,"A"),b:nd(p.id,"K"),vf:M3_VF[P.color]||2,rs:15});
    else if(t==="capacitor")el.push({k:"c",p,a:nd(p.id,"+"),b:nd(p.id,"-"),C:capF(p)});
    else if(t==="transistor"){const pnp=/pnp/i.test(P.label||p.label||"");el.push({k:"q",p,c:nd(p.id,"C"),bb:nd(p.id,"B"),e:nd(p.id,"E"),pnp,beta:P.beta||100})}
    else if(t==="ic"){const G=gateOf(P.label);const n=P.pins||14;el.push({k:"ic",p,G,vcc:nd(p.id,String(ICPWR[n][0])),gnd:nd(p.id,String(ICPWR[n][1])),pin:k=>nd(p.id,String(k))})}});
  N.wires.forEach(w=>el.push({k:"w",p:w,a:N.node(w.id+"|a"),b:N.node(w.id+"|b"),g:100}));
  const bat=el.find(e=>e.k==="bat"&&e.b>=0);const gnd=bat?bat.b:0;res.gnd=gnd;
  const n=N.n;if(!n)return res;const map=i=>i<0||i===gnd?-1:(i<gnd?i:i-1);const M=n-1;
  S.vc=S.vc||{};S.led=S.led||{};S.q=S.q||{};S.lg=S.lg||{};S.burn=S.burn||{};
  let V=S.V&&S.V.length===n?S.V.slice():new Array(n).fill(0);
  const vAt=i=>i<0?0:V[i]||0;
  for(let it=0;it<30;it++){
    const A=Array.from({length:M},()=>new Float64Array(M)),b=new Float64Array(M);
    const G=(x,y,g)=>{const i=map(x),j=map(y);if(x<0||y<0)return;if(i>=0)A[i][i]+=g;if(j>=0)A[j][j]+=g;if(i>=0&&j>=0){A[i][j]-=g;A[j][i]-=g}};
    const I=(x,y,c)=>{/* nguồn dòng c đẩy từ x sang y bên trong phần tử (vào nút y) */const i=map(x),j=map(y);if(x>=0&&i>=0)b[i]-=c;if(y>=0&&j>=0)b[j]+=c};
    for(let i=0;i<M;i++)A[i][i]+=1e-9;
    el.forEach(e=>{const id=e.p.id;
      if(e.k==="bat"){if(e.a<0||e.b<0)return;const g=1/e.r;G(e.a,e.b,g);I(e.b,e.a,e.v*g)}
      else if(e.k==="r"||e.k==="w")G(e.a,e.b,e.g);
      else if(e.k==="sw")G(e.a,e.b,e.p.props.on?20:1e-9);
      else if(e.k==="led"){if(S.burn[id]){G(e.a,e.b,1e-9);return}const on=S.led[id];if(on){const g=1/e.rs;G(e.a,e.b,g);I(e.b,e.a,e.vf*g)}else G(e.a,e.b,1e-9)}
      else if(e.k==="c"){if(!dt){G(e.a,e.b,1e-9);return}const g=e.C/dt;G(e.a,e.b,g);I(e.b,e.a,g*(S.vc[id]||0))}
      else if(e.k==="q"){const s=S.q[id]||(S.q[id]={be:false,gce:1e-9});const [x,y]=e.pnp?[e.e,e.bb]:[e.bb,e.e];if(s.be){const g=1/150;G(x,y,g);I(y,x,.65*g)}else G(x,y,1e-9);G(e.c,e.e,s.gce)}
      else if(e.k==="ic"){if(!e.G||e.vcc<0||e.gnd<0)return;const sup=vAt(e.vcc)-vAt(e.gnd);G(e.vcc,e.gnd,1/20000);if(sup<2)return;
        e.G.g.forEach((gt,gi)=>{const ins=gt.slice(0,-1).map(k=>e.pin(k)),o=e.pin(gt[gt.length-1]);ins.forEach(x=>G(x,e.gnd,1e-6));if(o<0)return;const key=id+":"+gi;const out=S.lg[key];G(o,out?e.vcc:e.gnd,1/40)})}});
    const x=solveLin(A.map(r=>Array.from(r)),Array.from(b));const NV=new Array(n).fill(0);for(let i=0;i<n;i++){const m=map(i);NV[i]=m<0?0:x[m]}V=NV;
    /* cập nhật trạng thái phi tuyến */
    let ch=false;
    el.forEach(e=>{const id=e.p.id;
      if(e.k==="led"&&!S.burn[id]){if(e.a<0||e.b<0){if(S.led[id]){S.led[id]=false;ch=true}return}const vd=vAt(e.a)-vAt(e.b);const on=!!S.led[id];const i=on?(vd-e.vf)/e.rs:0;const nw=on?i>0:vd>e.vf;if(nw!==on){S.led[id]=nw;ch=true}}
      else if(e.k==="q"){const s=S.q[id];const [x,y]=e.pnp?[e.e,e.bb]:[e.bb,e.e];if(x<0||y<0)return;const vbe=vAt(x)-vAt(y);const ib=s.be?(vbe-.65)/150:0;const nb=s.be?ib>0:vbe>.65;if(nb!==s.be){s.be=nb;ch=true}
        const vce=e.pnp?vAt(e.e)-vAt(e.c):vAt(e.c)-vAt(e.e);const ic=Math.max(0,e.beta*Math.max(0,ib));let tg=ic<=1e-9?1e-9:vce>.2?ic/vce:Math.min(1/.2,ic/.2+1/.5);if(ic>1e-9&&vce<=.2)tg=5;
        const ng=Math.exp(.5*Math.log(Math.max(1e-9,s.gce))+.5*Math.log(Math.max(1e-9,tg)));if(Math.abs(Math.log(ng/s.gce))>.02){s.gce=ng;ch=true}}
      else if(e.k==="ic"&&e.G&&e.vcc>=0&&e.gnd>=0){const sup=vAt(e.vcc)-vAt(e.gnd);e.G.g.forEach((gt,gi)=>{const ins=gt.slice(0,-1).map(k=>{const nn=e.pin(k);return nn>=0&&vAt(nn)-vAt(e.gnd)>sup/2});const key=id+":"+gi;const v=sup>=2?!!e.G.f(...ins):false;if(S.lg[key]!==v){S.lg[key]=v;ch=true}})}});
    if(!ch&&it>0)break}
  S.V=V;
  /* kết quả */
  el.forEach(e=>{const id=e.p.id;const va=vAt(e.a),vb=vAt(e.b);
    if(e.k==="bat"){const ok=e.a>=0&&e.b>=0;const i=ok?(e.v-(va-vb))/e.r:0;res.parts[id]={v:ok?va-vb:0,i,kind:"bat"};if(i>1.5)res.warn.push(`${e.p.name}: ĐOẢN MẠCH (${i.toFixed(1)} A)!`)}
    else if(e.k==="r"){const i=(va-vb)*e.g;res.parts[id]={v:va-vb,i,kind:"r",pw:i*i/e.g};if(i*i/e.g>.5)res.warn.push(`${e.p.name} nóng: ${(i*i/e.g).toFixed(2)} W (điện trở thường chịu 0,25 W)`)}
    else if(e.k==="sw")res.parts[id]={i:(va-vb)*(e.p.props.on?20:0),on:!!e.p.props.on,kind:"sw"};
    else if(e.k==="led"){const on=!!S.led[id]&&!S.burn[id];const i=on?(va-vb-e.vf)/e.rs:0;if(i>.035&&!S.burn[id]){S.burn[id]=true;res.burnNew=id}res.parts[id]={v:va-vb,i:Math.max(0,i),on,burn:!!S.burn[id],kind:"led",open:e.a<0||e.b<0||(N.deg.get(e.a)||0)<2||(N.deg.get(e.b)||0)<2}}
    else if(e.k==="c"){const vcap=va-vb;const i=dt?e.C/dt*(vcap-(S.vc[id]||0)):0;S.vc[id]=vcap;res.parts[id]={v:vcap,i,kind:"c",C:e.C};if(vcap<-.5)res.warn.push(`${e.p.name} bị cắm ngược cực (tụ hóa)!`)}
    else if(e.k==="q"){const s=S.q[id];const vce=e.pnp?vAt(e.e)-vAt(e.c):vAt(e.c)-vAt(e.e);const ic=Math.max(0,vce*s.gce*(e.pnp?1:1));res.parts[id]={kind:"q",on:s.be,ic,vce,sat:s.be&&vce<.25}}
    else if(e.k==="ic"){const sup=e.vcc>=0&&e.gnd>=0?vAt(e.vcc)-vAt(e.gnd):0;res.parts[id]={kind:"ic",sup,known:!!e.G,gates:e.G?e.G.g.map((gt,gi)=>({ins:gt.slice(0,-1).map(k=>{const nn=e.pin(k);return nn>=0&&vAt(nn)-vAt(e.gnd)>sup/2?1:0}),out:S.lg[id+":"+gi]?1:0,pins:gt})):[]};if(!e.G)res.warn.push(`${e.p.name}: chưa mô phỏng loại IC “${e.p.props.label}” (hỗ trợ 74HC00/02/04/08/32/86)`);else if(sup<2)res.warn.push(`${e.p.name} chưa có nguồn: nối VCC (chân ${ICPWR[e.p.props.pins||14][0]}) lên + và GND (chân ${ICPWR[e.p.props.pins||14][1]}) xuống −`)}
    else if(e.k==="w")res.wires[id]=(va-vb)*e.g});
  if(!el.some(e=>e.k==="bat"))res.warn.push("Chưa có pin — thêm pin để cấp điện cho mạch.");
  Object.entries(res.parts).forEach(([id,r])=>{if(r.kind==="led"&&r.open&&!r.burn){const p=spec.parts.find(x=>x.id===id);res.warn.push(`${p.name}: còn chân chưa nối`)}});
  return res}

/* ---------- AI dựng mạch: chỉ trả netlist ngắn → tự xếp chỗ trên breadboard ---------- */
const M3_NET_RULES=`Trả về JSON NGẮN. Nếu là MẠCH ĐIỆN (ưu tiên): {"title":"…","notes":"2–4 câu giải thích hiện tượng","parts":[…],"nets":[[…],…],"texts":["chú thích ngắn",…]}
- parts: {"id":"b1","type":"battery","kind":"9v|aa"} | {"id":"r1","type":"resistor","ohm":330} | {"id":"d1","type":"led","color":"red|green|blue|yellow|white|orange"} | {"id":"c1","type":"capacitor","uf":100} | {"id":"s1","type":"switch","on":true} | {"id":"q1","type":"transistor","label":"NPN|PNP","beta":100} | {"id":"u1","type":"ic","label":"74HC00|74HC02|74HC04|74HC08|74HC32|74HC86","pins":14}; có thể thêm "name" (tiếng Việt) và "label" (≤ 18 ký tự).
- Chân: battery "+" "-"; resistor "a" "b"; led "A" (anode) "K" (cathode); capacitor "+" "-"; switch "a" "b"; transistor "C" "B" "E"; ic số chân "1".."14" (VCC = 14, GND = 7).
- nets: mỗi phần tử là MỘT nút điện = danh sách chân nối chung, ví dụ [["b1.+","r1.a"],["r1.b","d1.A"],["d1.K","b1.-"]]. Mọi chân dùng tới phải nằm trong một net; LED luôn có điện trở hạn dòng; dòng LED 5–20 mA; tối đa 16 linh kiện.
Nếu KHÔNG phải mạch điện: {"title":"…","notes":"…","shapes":[{"type":"box|cylinder|sphere|cone|torus|text|arrow","name":"…","pos":[x,y,z],"scale":[x,y,z],"rot":[0,0,0],"color":"#rrggbb","label":"…"}]} (y hướng lên, đơn vị ≈ 1 cm).`;
const M3_W={resistor:1.5,led:.24,capacitor:.6,switch:.5,transistor:.3,ic:0};
function m3FromNetlist(r){
  const ids=new Set();const comps=[];const okT=new Set(["battery","resistor","led","capacitor","switch","transistor","ic"]);
  (Array.isArray(r.parts)?r.parts:[]).slice(0,24).forEach((q,i)=>{if(!q||!okT.has(q.type))return;const props={};
    if(q.type==="resistor")props.ohm=q.ohm||q.value||330;if(q.type==="led"){props.color=q.color||"red";props.on=false}if(q.type==="capacitor"){props.uf=q.uf||q.value||100;props.label=(q.uf||100)+"µF"}
    if(q.type==="battery")props.kind=q.kind==="aa"?"aa":"9v";if(q.type==="switch")props.on=q.on!==false;if(q.type==="transistor"){props.label=/pnp/i.test(q.label||"")?"PNP":"NPN";if(q.beta)props.beta=q.beta}
    if(q.type==="ic"){props.label=q.label||"74HC00";props.pins=[8,14,16].includes(+q.pins)?+q.pins:14}
    const c=m3CleanPart({id:q.id,type:q.type,name:q.name,label:q.label&&q.type!=="ic"&&q.type!=="transistor"?q.label:"",pos:[0,0,0],props},i,ids);if(c)comps.push(c)});
  const bats=comps.filter(c=>c.type==="battery"),ics=comps.filter(c=>c.type==="ic"),rest=comps.filter(c=>c.type!=="battery"&&c.type!=="ic");
  /* xếp chỗ: IC nằm giữa rãnh, linh kiện khác thành hai hàng trên/dưới */
  const rows=[[],[]];let L=[0,0];rest.forEach(c=>{const w=M3_W[c.type]+1.1;const k=L[0]<=L[1]?0:1;rows[k].push(c);L[k]+=w});
  const icLen=ics.reduce((s,c)=>s+(c.props.pins/2*.4+.3)+1,0);const W=Math.max(10,Math.ceil(Math.max(L[0],L[1],icLen)+2));
  rows.forEach((row,k)=>{let x=-W/2+1;row.forEach(c=>{const w=M3_W[c.type];c.pos=[Math.round((x+w/2)*100)/100,0,k?1.6:-1.6];x+=w+1.1})});
  {let x=-icLen/2+.5;ics.forEach(c=>{const len=c.props.pins/2*.4+.3;c.pos=[Math.round((x+len/2)*100)/100,0,0];x+=len+1})}
  bats.forEach((b,i)=>{b.pos=[-W/2-1.4,-.35,bats.length>1?(i?1.3:-1.3):0];b.label=b.label||(b.props.kind==="aa"?"Pin 1,5 V":"Pin 9 V")});
  const parts=[{id:"bb",type:"breadboard",name:"Breadboard",pos:[0,0,0],rot:[0,0,0],scale:[1,1,1],color:"#eceae3",label:"",props:{w:W,d:5},anim:"none"},...comps];
  const all=new Set(parts.map(p=>p.id));
  /* nối dây theo từng net */
  const terms=new Map(m3Terms({parts}).map(t=>[t.pid+"|"+t.pin,t]));const COLW=["#e8b04a","#4caf7d","#5b8def","#c77dff","#ff8a3d","#2ec4b6"];let ci=0,wi=0;
  (Array.isArray(r.nets)?r.nets:[]).slice(0,40).forEach(net=>{const pts=(Array.isArray(net)?net:[]).map(s=>{const m=String(s).match(/^\s*([\w-]+)\s*[.:]\s*(.+?)\s*$/);if(!m)return null;const p=parts.find(x=>x.id===m[1]);if(!p)return null;const pin=m3PinName(p,m[2]);return pin&&terms.get(p.id+"|"+pin)}).filter(Boolean);
    const uniq=[...new Map(pts.map(t=>[t.pid+"|"+t.pin,t])).values()];if(uniq.length<2)return;
    const hasP=uniq.some(t=>t.part.type==="battery"&&t.pin==="+"),hasN=uniq.some(t=>t.part.type==="battery"&&t.pin==="-");const col=hasP?"#e05a4f":hasN?"#2f3640":COLW[ci++%COLW.length];
    for(let i=1;i<uniq.length;i++){const a=uniq[i-1],b=uniq[i];let id="w"+(++wi);while(all.has(id))id+="_";all.add(id);
      parts.push({id,type:"wire",name:`Dây ${a.part.name} → ${b.part.name}`.slice(0,40),pos:[0,0,0],rot:[0,0,0],scale:[1,1,1],color:col,label:"",anim:"none",props:{pts:m3Route([a.pos[0],a.pos[1]+.03,a.pos[2]],[b.pos[0],b.pos[1]+.03,b.pos[2]]),a:{id:a.pid,pin:a.pin},b:{id:b.pid,pin:b.pin},auto:true,flow:true,dir:1,speed:1,r:.045}})}});
  (Array.isArray(r.texts)?r.texts:[]).slice(0,3).forEach((t,i)=>{let id="t"+(i+1);while(all.has(id))id+="_";all.add(id);parts.push({id,type:"text",name:"Chú thích",pos:[(i-((Math.min(3,r.texts.length)-1)/2))*4,2.7,0],rot:[0,0,0],scale:[1,1,1],color:"#ffffff",label:String(t).slice(0,60),props:{},anim:"none"})});
  return m3Clean({title:r.title||"Mạch điện",notes:r.notes||"",parts})}
m3Generate=async function(desc,ctx,onP){
  const prompt=`${rulesFor()}\n\nBạn là trợ giảng điện tử, dựng mô hình 3D có thể MÔ PHỎNG cho: ${desc}\n${M3_NET_RULES}${ctx?String(ctx).slice(0,14000):""}`;
  const r=await genJSON(prompt,{modelTier:UI.speed==="quality"?"default":"quick",fast:true},n=>onP&&onP(n));
  if(!r||typeof r!=="object")throw Object.assign(new Error("AI chưa dựng được mô hình"),{code:"invalid_json"});
  let sp;if(Array.isArray(r.nets)||(Array.isArray(r.parts)&&r.parts.some(p=>p&&M3_PINS[p.type]&&!p.pos)))sp=m3FromNetlist(r);else sp=m3Clean({title:r.title,notes:r.notes,parts:r.shapes||r.parts||[]});
  if(!sp.parts.length)throw Object.assign(new Error("AI chưa dựng được mô hình"),{code:"invalid_json"});sp._circuit=Array.isArray(r.nets);return sp};
m3GenDialog=function(){
  openModal({title:"AI dựng mạch 3D",small:true,body:`<div class="form"><p class="muted" style="margin:0;font-size:13.5px">Mô tả mạch hoặc mô hình. AI chỉ viết danh sách linh kiện và cách nối, trang tự xếp lên breadboard và đi dây nên xong trong vài giây. ${UI.cur&&UI.srcs.length?"AI bám theo các nguồn đang chọn của bài học.":""}</p>
    <textarea class="input" id="gD" placeholder="Ví dụ: pin 9 V, công tắc, điện trở 470 Ω và LED xanh; hoặc cổng NAND 74HC00 điều khiển LED bằng hai công tắc">${UI.cur?esc("Mạch minh họa nội dung chính của bài "+UI.cur.title):""}</textarea>
    <div class="m3-ex">${["Pin 9 V – công tắc – điện trở 470 Ω – LED xanh","Mạch RC: pin 9 V, điện trở 10 kΩ, tụ 470 µF, LED báo","Transistor NPN làm công tắc bật LED","74HC00: hai công tắc vào, LED ở ngõ ra","Hai LED song song, mỗi LED một điện trở"].map(t=>`<button type="button" class="chip" data-ex="${esc(t)}">${esc(t)}</button>`).join("")}</div>
    <div class="gprog-l" id="gP" hidden><i class="gprog"><i style="width:0%"></i></i><small class="muted" id="gPt">AI đang soạn…</small></div></div>`,
    foot:`<div class="grow"></div><button class="pill-btn" data-close>Hủy</button><button class="pill-btn primary" id="gGo">${ic("spark")} Dựng mạch</button>`});
  $$("[data-ex]").forEach(b=>b.onclick=()=>{$("#gD").value=b.dataset.ex});
  $("#gGo").onclick=async()=>{const b=$("#gGo");b.disabled=true;b.innerHTML=`<span class="spin"></span> Đang dựng…`;const t0=performance.now();const gp=$("#gP");gp.hidden=false;
    let ctx="";try{if(UI.cur&&UI.srcs.length&&/bài|nguồn|tài liệu|giảng/i.test($("#gD").value)){const c=await sourceContext(null,12000);ctx="\n\nNGUỒN:\n"+c.text}}catch(e){}
    try{const sp=await m3Generate($("#gD").value.trim()||"một mạch LED cơ bản",ctx,n=>{const pc=Math.min(96,Math.round(n/14));const bar=$("#gP .gprog i");if(bar)bar.style.width=pc+"%";const tt=$("#gPt");if(tt)tt.textContent=`AI đang viết… ${pc}%`});
      closeDialog();toast(`Đã dựng trong ${((performance.now()-t0)/1000).toFixed(1)} giây${sp._circuit?" — bấm ▶ Mô phỏng để chạy mạch":""}`,4000);window.M3_AUTOSIM=!!sp._circuit;openModelEditor(null,sp)}
    catch(e){toast(aiErr(e),4500);b.disabled=false;b.textContent="Thử lại";gp.hidden=true}}};

/* ---------- plugin cho xưởng mô hình: công cụ Nối dây + Mô phỏng ---------- */
window.M3_PLUG=window.M3_PLUG||[];
M3_PLUG.push(function(st){
  const {T,V,stage,rebuild,rebuildAll,snap,P_,drawPane}=st.api;const sim={on:false,S:{},res:null,acc:0,hudT:0};st.simState=sim;
  const tb=$(".m3-tb",stage);
  tb.insertAdjacentHTML("beforeend",`<i></i><button data-tl="wire" aria-pressed="false" title="Nối dây: bấm một chân rồi bấm chân thứ hai">${ic("link")}<span>Nối dây</span></button><button id="m3Sim" aria-pressed="false" title="Chạy mô phỏng mạch">${ic("play")}<span>Mô phỏng</span></button>`);
  const markers=new T.Group();markers.visible=false;V.scene.add(markers);const mGeo=new T.SphereGeometry(.075,14,10);
  const mCol={"+":0xff5a5a,"-":0x4d7cff,A:0xff5a5a,K:0x4d7cff};let hovM=null,start=null;
  const band=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3()]),new T.LineDashedMaterial({color:0xffd45a,dashSize:.12,gapSize:.08}));band.visible=false;V.scene.add(band);
  const tip=document.createElement("div");tip.className="m3-tip";tip.hidden=true;stage.appendChild(tip);
  const hud=document.createElement("div");hud.className="m3-sim";hud.hidden=true;stage.appendChild(hud);
  const drawMarkers=()=>{markers.children.slice().forEach(m=>{markers.remove(m);m.material.dispose()});if(!markers.visible)return;
    const N=m3Netlist(st.spec);m3Terms(st.spec).forEach(t=>{const used=(N.deg.get(N.node(t.pid+"|"+t.pin))||0)>1;const m=new T.Mesh(mGeo,new T.MeshBasicMaterial({color:mCol[t.pin]||(used?0x4caf7d:0xffd45a),transparent:true,opacity:used?.95:.85,depthTest:false}));m.renderOrder=10;m.position.set(...t.pos);m.userData.t=t;markers.add(m)});V.touch()};
  const setTool=k=>{st.tool=k;$$("[data-tl]",stage).forEach(x=>x.setAttribute("aria-pressed",x.dataset.tl===k));markers.visible=k==="wire";start=null;band.visible=false;tip.hidden=true;drawMarkers();
    $(".hint",stage).textContent=k==="wire"?"Nối dây: bấm vào một chân (chấm màu), rồi bấm chân thứ hai · Esc để hủy · chấm xanh lá = đã nối":"Bấm để chọn · kéo linh kiện để di chuyển · kéo nền để xoay · chuột phải/Shift+kéo để dời khung · cuộn để phóng to"};
  $$("[data-tl]",stage).forEach(b=>b.addEventListener("click",()=>setTool(b.dataset.tl)));
  const pickM=ray=>{if(!markers.visible)return null;const h=ray.intersectObjects(markers.children,false)[0];return h?h.object:null};
  const showTip=(e,txt)=>{const r=stage.getBoundingClientRect();tip.textContent=txt;tip.hidden=false;tip.style.left=(e.clientX-r.left+14)+"px";tip.style.top=(e.clientY-r.top+12)+"px"};
  const addWire=(a,b)=>{snap();const ids=new Set(st.spec.parts.map(p=>p.id));const isP=t=>t.part.type==="battery"&&t.pin==="+",isN=t=>t.part.type==="battery"&&t.pin==="-";
    const col=isP(a)||isP(b)?"#e05a4f":isN(a)||isN(b)?"#2f3640":["#e8b04a","#4caf7d","#5b8def","#c77dff","#ff8a3d"][st.spec.parts.filter(p=>p.type==="wire").length%5];
    const w=m3CleanPart({id:"w"+(st.spec.parts.length+1),type:"wire",name:`Dây ${a.part.name} → ${b.part.name}`.slice(0,40),color:col,props:{pts:m3Route([a.pos[0],a.pos[1]+.03,a.pos[2]],[b.pos[0],b.pos[1]+.03,b.pos[2]]),a:{id:a.pid,pin:a.pin},b:{id:b.pid,pin:b.pin},flow:true}},0,ids);w.props.auto=true;
    st.spec.parts.push(w);rebuild(w.id);drawMarkers();if(sim.on)sim.dirty=true;toast(`Đã nối ${a.part.name} (${a.lab}) ↔ ${b.part.name} (${b.lab})`,2200)};
  st.hook.down=(e,ray)=>{if(st.tool==="wire")return null;if(sim.on){const h=st.api.pick(ray);const p=h&&P_(h.pid);if(p&&p.type==="switch")return null}return undefined};
  st.hook.click=(e,ray)=>{
    if(st.tool==="wire"){const m=pickM(ray);if(!m){if(start){start=null;band.visible=false;V.touch()}return true}const t=m.userData.t;
      if(!start){start=t;m.scale.setScalar(1.6);band.visible=true;V.touch();return true}
      if(start.pid===t.pid&&start.pin===t.pin){start=null;band.visible=false;drawMarkers();return true}
      addWire(start,t);start=null;band.visible=false;return true}
    if(sim.on){const h=st.api.pick(ray);const p=h&&P_(h.pid);if(p&&p.type==="switch"){p.props.on=!p.props.on;rebuild(p.id);sim.dirty=true;toast(p.props.on?"Đóng công tắc":"Mở công tắc",1200);return true}}
    return false};
  st.hook.hover=(e,ray)=>{if(st.tool!=="wire"){if(sim.on){const h=st.api.pick(ray);const p=h&&P_(h.pid);const r=p&&sim.res&&sim.res.parts[p.id];if(p&&r){V.el.style.cursor=p.type==="switch"?"pointer":"default";showTip(e,simLine(p,r))}else tip.hidden=true}return false}
    const m=pickM(ray);if(hovM&&hovM!==m){hovM.scale.setScalar(start&&hovM.userData.t===start?1.6:1);hovM=null}
    if(m){hovM=m;m.scale.setScalar(1.6);const t=m.userData.t;showTip(e,`${t.part.name} · ${t.lab}`);V.el.style.cursor="crosshair"}else{tip.hidden=true;V.el.style.cursor="default"}
    if(start){const p=new T.Vector3();const pl=new T.Plane(new T.Vector3(0,1,0),-start.pos[1]);const q=m?m.position:(ray.ray.intersectPlane(pl,p)?p:null);if(q){band.geometry.setFromPoints([new T.Vector3(...start.pos),q.clone()]);band.computeLineDistances()}}
    V.touch();return true};
  /* khi kéo linh kiện: dây gắn chân chạy theo */
  let relT=0;st.hook.moved=p=>{const ch=m3Relink(st.spec,p.id);ch.forEach(id=>rebuild(id));if(markers.visible){clearTimeout(relT);relT=setTimeout(drawMarkers,120)}if(sim.on)sim.dirty=true};
  st.hook.prebuild=()=>{m3Relink(st.spec)};
  st.hook.rebuilt=()=>{if(markers.visible)drawMarkers();if(sim.on){sim.dirty=true;applyVis(true)}};
  const keyEsc=e=>{if(e.key==="Escape"&&start){start=null;band.visible=false;drawMarkers();e.stopPropagation()}};document.addEventListener("keydown",keyEsc,true);
  /* ---- mô phỏng ---- */
  const fmtI=i=>{const a=Math.abs(i);return a>=1?a.toFixed(2)+" A":a>=1e-3?(a*1e3).toFixed(a<.01?2:1)+" mA":a>=1e-6?(a*1e6).toFixed(0)+" µA":"0"};
  const fmtV=v=>(Math.abs(v)<.005?0:v).toFixed(2)+" V";
  function simLine(p,r){if(r.kind==="led")return `${p.name}: ${r.burn?"ĐÃ CHÁY (quá dòng)":r.on?"sáng · "+fmtI(r.i):"tắt"} · U = ${fmtV(r.v)}`;if(r.kind==="r")return `${p.name}: I = ${fmtI(r.i)} · U = ${fmtV(r.v)}`;if(r.kind==="c")return `${p.name}: U = ${fmtV(r.v)} · I = ${fmtI(r.i)}`;
    if(r.kind==="bat")return `${p.name}: ${fmtV(r.v)} · cấp ${fmtI(r.i)}`;if(r.kind==="sw")return `${p.name}: ${r.on?"đóng":"mở"} — bấm để gạt`;if(r.kind==="q")return `${p.name}: ${!r.on?"tắt":r.sat?"bão hòa (dẫn mạnh)":"khuếch đại"} · I_C = ${fmtI(r.ic)}`;
    if(r.kind==="ic")return `${p.name}: ${r.sup<2?"chưa có nguồn":"nguồn "+fmtV(r.sup)}`;return p.name}
  const ledMat=o=>{let m=null;o.traverse(x=>{if(!m&&x.userData&&x.userData.mat)m=x.userData.mat});return m};
  const glowTex=c=>{const hc=document.createElement("canvas");hc.width=hc.height=64;const g=hc.getContext("2d");const gr=g.createRadialGradient(32,32,2,32,32,32);gr.addColorStop(0,c);gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(0,0,64,64);return new T.CanvasTexture(hc)};
  const mtx=new T.Matrix4();
  function applyVis(force){const R=sim.res;if(!R)return;
    st.objs.forEach((o,id)=>{const p=P_(id);if(!p)return;const r=R.parts[id];
      if(p.type==="led"){const mat=ledMat(o);if(o.userData.glow)o.userData.glow.visible=false;let g=o.userData.simGlow;if(!g){g=new T.Sprite(new T.SpriteMaterial({map:glowTex(LED_COL[p.props.color]||"#ff3b3b"),transparent:true,depthWrite:false,blending:T.AdditiveBlending}));g.position.y=.75;o.userData.inner.add(g);o.userData.simGlow=g}
        const k=r&&r.on?Math.min(1.4,Math.sqrt(r.i/.018)):0;if(mat){mat.emissiveIntensity=r&&r.burn?0:.05+1.7*k;if(r&&r.burn)mat.color.set(0x3a3a3a)}g.visible=k>.03;g.material.opacity=Math.min(1,k);g.scale.setScalar(.8+1.2*k)}
      if(p.type==="wire"){let f=o.userData.flow;if(!f){const tube=o.userData.inner.children[0];const curve=tube&&tube.geometry&&tube.geometry.parameters&&tube.geometry.parameters.path;if(!curve)return;const len=curve.getLength();const n=Math.max(3,Math.min(60,Math.round(len/.32)));const dots=new T.InstancedMesh(new T.SphereGeometry(.06,10,8),new T.MeshBasicMaterial({color:0x7fd3ff}),n);for(let i=0;i<n;i++){const q=curve.getPointAt(i/n);mtx.makeTranslation(q.x,q.y,q.z);dots.setMatrixAt(i,mtx)}o.userData.inner.add(dots);f=o.userData.flow={curve,dots,n,t:0,len,dir:1,speed:1};o.userData.simFlow=true}
        const i=R.wires[id]||0;const a=Math.abs(i);f.dots.visible=a>2e-6;f.dir=i>0?-1:1;f.speed=a>2e-6?Math.min(5,.25+Math.sqrt(a/.01)*1.1):0}});
    V.touch()}
  function hudVal(p,r){if(r.kind==="bat")return `<b>${fmtV(r.v)}</b> · ${fmtI(r.i)}`;if(r.kind==="r")return `${fmtI(r.i)} · ${fmtV(r.v)}`;if(r.kind==="led")return r.burn?`<b class="bad">cháy!</b>`:r.on?`<b class="ok">sáng</b> ${fmtI(r.i)}`:`<span class="muted">tắt</span>${r.open?" · chưa nối":""}`;
    if(r.kind==="c"){const pc=Math.max(0,Math.min(100,r.v/9*100));return `${fmtV(r.v)} <i class="cbar"><i style="width:${pc.toFixed(0)}%"></i></i>`}if(r.kind==="sw")return `<button class="sm" data-swt="${esc(p.id)}">${r.on?"Đóng ●":"Mở ○"}</button>`;
    if(r.kind==="q")return !r.on?`<span class="muted">tắt</span>`:`<b class="ok">${r.sat?"dẫn bão hòa":"khuếch đại"}</b> I<sub>C</sub> ${fmtI(r.ic)}`;if(r.kind==="ic")return r.sup<2?`<span class="muted">chưa có nguồn</span>`:r.gates.map(g=>`<span class="gt" title="Chân ${g.pins.join(", ")}">${g.ins.join("")}→<b>${g.out}</b></span>`).join(" ");return ""}
  let hudKey="";
  function hudDraw(){const R=sim.res;if(!R)return;const ps=st.spec.parts.filter(p=>R.parts[p.id]);const key=ps.map(p=>p.id+":"+p.name).join("|");
    if(key!==hudKey||!$(".rows",hud)){hudKey=key;hud.innerHTML=`<div class="h"><b>${ic("bolt")} Mô phỏng</b><span class="muted" data-tt></span><button class="sm" data-rs title="Đặt lại: xả tụ, thay LED cháy">Đặt lại</button></div><div class="rows">${ps.map(p=>`<div class="r"><span class="n">${esc(p.name)}</span><span class="v" data-v="${esc(p.id)}"></span></div>`).join("")||`<div class="muted">Chưa có linh kiện điện.</div>`}</div><div class="w" data-w></div><div class="lg muted">Chấm xanh = electron (đi từ − sang +) · bấm công tắc để gạt · rê chuột lên linh kiện để xem số đo</div>`}
    ps.forEach(p=>{const el=hud.querySelector(`[data-v="${CSS.escape(p.id)}"]`);if(!el)return;const h=hudVal(p,R.parts[p.id]);if(el._h!==h){el._h=h;el.innerHTML=h}});
    const tt=$("[data-tt]",hud);if(tt)tt.textContent=sim.S.t?sim.S.t.toFixed(1)+" s":"";
    const w=$("[data-w]",hud);const wh=R.warn.slice(0,4).map(x=>`<div>⚠ ${esc(x)}</div>`).join("");if(w&&w._h!==wh){w._h=wh;w.innerHTML=wh;w.hidden=!wh}}
  hud.addEventListener("click",e=>{const sw=e.target.closest("[data-swt]");if(sw){const p=P_(sw.dataset.swt);if(p){p.props.on=!p.props.on;rebuild(p.id);sim.dirty=true}return}
    if(e.target.closest("[data-rs]")){sim.S={};sim.dirty=true;rebuildAll();toast("Đã đặt lại mô phỏng")}});
  V.onFrame(dt=>{if(!sim.on)return false;sim.S.t=(sim.S.t||0)+dt;
    const res=m3Simulate(st.spec,sim.S,Math.max(.004,dt));sim.res=res;if(res.burnNew){const p=P_(res.burnNew);toast(`💥 ${p?p.name:"LED"} cháy vì dòng quá lớn — thêm/ tăng điện trở hạn dòng rồi bấm Đặt lại`,5000);rebuild(res.burnNew)}
    applyVis();sim.hudT+=dt;if(sim.hudT>.25||sim.dirty){sim.hudT=0;sim.dirty=false;hudDraw()}return true});
  const simBtn=$("#m3Sim",stage);
  const setSim=on=>{sim.on=on;simBtn.setAttribute("aria-pressed",on);simBtn.querySelector("span").textContent=on?"Dừng mô phỏng":"Mô phỏng";simBtn.innerHTML=`${ic(on?"stop":"play")}<span>${on?"Dừng mô phỏng":"Mô phỏng"}</span>`;hud.hidden=!on;tip.hidden=true;hudKey="";
    if(on){sim.S={};st.run=true;const rb=$("#m3Run");if(rb)rb.setAttribute("aria-pressed","true");sim.res=m3Simulate(st.spec,sim.S,0);applyVis(true);hudDraw()}else{sim.res=null;rebuildAll()}V.touch()};
  simBtn.onclick=()=>setSim(!sim.on);
  st.hook.dispose=()=>{document.removeEventListener("keydown",keyEsc,true);sim.on=false};
  if(window.M3_AUTOSIM){window.M3_AUTOSIM=false;setTimeout(()=>setSim(true),400)}
});
/* mẫu có sẵn: thêm mạch chạy được bằng netlist */
Object.assign(M3_TPL,{
  nandsw:{l:"Cổng NAND + công tắc",d:"74HC00 nối nguồn, hai công tắc vào, LED báo ngõ ra — chạy mô phỏng được",spec:m3FromNetlist({title:"Cổng NAND 74HC00 điều khiển LED",notes:"Hai công tắc đưa mức 1 vào chân 1 và 2. Ngõ ra chân 3 chỉ xuống 0 (LED tắt) khi cả hai công tắc cùng đóng.",
    parts:[{id:"b1",type:"battery",kind:"9v"},{id:"u1",type:"ic",label:"74HC00",pins:14,name:"74HC00"},{id:"s1",type:"switch",name:"Công tắc A",on:true},{id:"s2",type:"switch",name:"Công tắc B",on:false},{id:"rl",type:"resistor",ohm:470,name:"R LED 470 Ω"},{id:"d1",type:"led",color:"green",name:"LED ngõ ra Y"},{id:"r1",type:"resistor",ohm:10000,name:"R kéo xuống A"},{id:"r2",type:"resistor",ohm:10000,name:"R kéo xuống B"}],
    nets:[["b1.+","u1.14","s1.a","s2.a"],["b1.-","u1.7","d1.K","r1.b","r2.b"],["s1.b","u1.1","r1.a"],["s2.b","u1.2","r2.a"],["u1.3","rl.a"],["rl.b","d1.A"]],texts:["Y = (A·B)' — bấm công tắc để đổi"]})},
  ledsw:{l:"Pin – công tắc – LED",d:"Mạch đơn giản nhất để thử nối dây và mô phỏng",spec:m3FromNetlist({title:"Pin – công tắc – điện trở – LED",notes:"Đóng công tắc, dòng I = (9 − 2,2) / 470 ≈ 14 mA làm LED sáng. Thử bỏ điện trở để thấy LED cháy.",
    parts:[{id:"b1",type:"battery",kind:"9v"},{id:"s1",type:"switch",name:"Công tắc",on:true},{id:"r1",type:"resistor",ohm:470,name:"R 470 Ω",label:"R = 470 Ω"},{id:"d1",type:"led",color:"green",name:"LED xanh"}],nets:[["b1.+","s1.a"],["s1.b","r1.a"],["r1.b","d1.A"],["d1.K","b1.-"]]})}});
M3_TPL.nandsw.spec.parts.forEach(p=>{if(p.type==="led")p.props.on=false});

/* =====================================================================
   GOOGLE CALENDAR: XEM CẢ LỊCH CỦA TRƯỜNG / LỊCH ĐƯỢC CHIA SẺ
   ===================================================================== */
UI.gcCals=null;
const GC_COLS=["#4caf7d","#5b8def","#e8736f","#c77dff","#f2b84b","#2ec4b6","#ff8fab","#8d99ae","#90be6d","#f9844a"];
let _gcCalP=null;function gcCalList(force){if(UI.gcCals&&!force)return Promise.resolve(UI.gcCals);if(_gcCalP&&!force)return _gcCalP;_gcCalP=gcCalList0().finally(()=>{_gcCalP=null});return _gcCalP}
async function gcCalList0(){const out=[];let tok=null;
  try{for(let k=0;k<4;k++){const r=await P.mcp.callTool(GC,"list_calendars",{pageSize:250,...(tok?{pageToken:tok}:{})});const pl=r.payload||{};(pl.calendars||pl.items||[]).forEach(c=>{if(c&&c.id)out.push({id:c.id,name:c.summaryOverride||c.summary||c.id,color:c.backgroundColor||"",primary:!!c.primary,role:c.accessRole||""})});tok=pl.nextPageToken;if(!tok)break}}
  catch(e){if(!out.length){UI.gcCalErr=e;UI.gcCals=[{id:"primary",name:"Lịch chính",primary:true}];return UI.gcCals}}
  UI.gcCalErr=null;(local.get("gcExtra",[])||[]).forEach(x=>{if(!out.some(c=>c.id===x.id))out.push({id:x.id,name:x.name||x.id,extra:true})});
  if(!out.length)out.push({id:"primary",name:"Lịch chính",primary:true});
  if(!out.some(c=>c.primary)&&out[0])out[0].primary=true;
  out.forEach((c,i)=>{if(!c.color)c.color=GC_COLS[i%GC_COLS.length]});UI.gcCals=out;return out}
function gcSelected(cals){const sel=local.get("gcSel",{});return cals.filter(c=>sel[c.id]!==false&&!(sel[c.id]==null&&/#contacts@|#weeknum@/.test(c.id)))}
async function gcEventsAll(rs,re,max){const cals=gcSelected(await gcCalList());const lists=await Promise.all(cals.map(async c=>{try{const r=await P.mcp.callTool(GC,"list_events",{...(c.primary&&c.id==="primary"?{}:{calendarId:c.id}),startTime:localISO(rs),endTime:localISO(re),orderBy:"startTime",pageSize:max||250});
    return ((r.payload||{}).events||[]).map(e=>({title:e.summary||"(Không tiêu đề)",start:(e.start&&(e.start.dateTime||e.start.date))||"",end:(e.end&&(e.end.dateTime||e.end.date))||"",link:e.htmlLink||"",cal:c.name,color:c.color}))}catch(err){c.err=err;return []}}));
  const seen=new Set();return lists.flat().filter(e=>{const k=e.title+"|"+e.start;if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>new Date(a.start)-new Date(b.start))}
gcList=async function(days=14){const now=new Date(),end=new Date(now.getTime()+days*864e5);return gcEventsAll(now,end,100)};
loadGc=async function(rs,re,key){if((await gcStatus())!=="ok"){UI.gcCache[key]=[];return}UI.gcCache[key]="loading";
  try{UI.gcCache[key]=await gcEventsAll(rs,re,250)}catch(e){UI.gcCache[key]=[];toast(gcErr(e),4000)}rerenderCals()};
/* bảng chọn lịch ở trang Lịch học */
async function gcCalPanel(host){if(!host)return;host.innerHTML=`<div class="muted" style="font-size:12.5px"><span class="spin"></span> Đang tải danh sách lịch…</div>`;
  const cals=await gcCalList();const sel=local.get("gcSel",{});const on=new Set(gcSelected(cals).map(c=>c.id));
  host.innerHTML=`<div class="gcl-h"><b>Lịch Google</b><button class="ghost ic" id="gclR" title="Tải lại danh sách lịch" aria-label="Tải lại danh sách lịch">${ic("sync")}</button></div>
    ${UI.gcCalErr?`<div class="warnbox" style="font-size:12px">${P.local?"Chưa có quyền xem danh sách lịch — bấm “Cấp quyền” để thấy cả lịch của trường.":"Không lấy được danh sách lịch: "+esc(gcErr(UI.gcCalErr))}${P.local?`<br><button class="btn" id="gclPerm" style="margin-top:6px">Cấp quyền xem danh sách lịch</button>`:""}</div>`:""}
    <div class="gcl">${cals.map(c=>`<label class="chk-row" title="${esc(c.id)}"><input type="checkbox" class="chk" data-gcl="${esc(c.id)}" ${on.has(c.id)?"checked":""}><i style="background:${esc(c.color)}"></i><span class="gcl-n">${esc(c.name)}${c.primary?" <small>(chính)</small>":""}${c.err?` <small style="color:var(--bad)">lỗi</small>`:""}</span>${c.extra?`<button class="ghost ic" data-gcx="${esc(c.id)}" aria-label="Bỏ lịch này">${ic("close")}</button>`:""}</label>`).join("")}</div>
    <details class="gcl-add"><summary>+ Thêm lịch khác bằng ID</summary><p class="muted" style="font-size:12px;margin:4px 0">Lịch lớp / khoa được chia sẻ nhưng chưa có trong danh sách: mở Google Calendar → cài đặt lịch đó → <i>Tích hợp lịch → ID lịch</i> (dạng …@group.calendar.google.com).</p><div style="display:flex;gap:6px"><input class="input" id="gclId" placeholder="xxxx@group.calendar.google.com" spellcheck="false"><button class="btn" id="gclAdd">Thêm</button></div></details>`;
  $$("[data-gcl]",host).forEach(x=>x.onchange=()=>{const s=local.get("gcSel",{});s[x.dataset.gcl]=x.checked;local.set("gcSel",s);UI.gcCache={};rerenderCals()});
  $$("[data-gcx]",host).forEach(b=>b.onclick=e=>{e.preventDefault();local.set("gcExtra",(local.get("gcExtra",[])||[]).filter(x=>x.id!==b.dataset.gcx));UI.gcCals=null;UI.gcCache={};gcCalPanel(host);rerenderCals()});
  $("#gclR",host).onclick=async()=>{UI.gcCals=null;UI.gcCache={};await gcCalPanel(host);rerenderCals()};
  const pb=$("#gclPerm",host);if(pb)pb.onclick=async()=>{try{await SOHOC.google.link("Google Calendar");UI.gcCals=null;UI.gcCache={};gcCalPanel(host);rerenderCals()}catch(e){toast(gcErr(e),4500)}};
  $("#gclAdd",host).onclick=async()=>{const id=$("#gclId",host).value.trim();if(!/^[^\s@]+@[^\s@]+$/.test(id)){toast("ID lịch có dạng …@group.calendar.google.com hoặc một địa chỉ email");return}
    const b=$("#gclAdd",host);b.disabled=true;try{const now=new Date();const r=await P.mcp.callTool(GC,"list_events",{calendarId:id,startTime:localISO(now),endTime:localISO(new Date(now.getTime()+30*864e5)),pageSize:1});
      const ex=local.get("gcExtra",[])||[];if(!ex.some(x=>x.id===id))ex.push({id,name:id.split("@")[0].slice(0,40)});local.set("gcExtra",ex);UI.gcCals=null;UI.gcCache={};toast("Đã thêm lịch");gcCalPanel(host);rerenderCals()}
    catch(e){b.disabled=false;toast("Không đọc được lịch này — kiểm tra ID và quyền xem của bạn. "+gcErr(e),5000)}}}
const _renderCalPage18=renderCalPage;renderCalPage=async function(...a){const r=await _renderCalPage18.apply(this,a);try{const gs=$("#gcShow");if(gs&&!$("#gcCalSel")){const box=document.createElement("div");box.id="gcCalSel";box.className="gcl-box";gs.closest("label").after(box);if(UI.gcShow)gcCalPanel(box);
    gs.addEventListener("change",()=>{if(gs.checked)gcCalPanel(box);else box.innerHTML=""})}}catch(e){}return r};
/* màu sự kiện Google theo từng lịch */
{const _calEvents18=calEvents;calEvents=function(rs,re){const out=_calEvents18(rs,re);const key=rs.toISOString()+re.toISOString();const g=UI.gcCache[key];if(Array.isArray(g)){const byKey=new Map(g.map(e=>[e.title+"|"+new Date(e.start.length<=10?e.start+"T00:00:00":e.start).getTime(),e]));out.forEach(o=>{if(o.k==="google"){const e=byKey.get(o.t+"|"+o.st.getTime());if(e){o.c=e.color||o.c;o.cal=e.cal}}})}return out}}

/* =====================================================================
   GIAO DIỆN & MÀU: KHÔNG GIẬT KHI BẤM CHỌN
   - giữ vị trí cuộn của bảng, không chạy lại hiệu ứng mở bảng
   - đổi màu mượt (chuyển màu 0,3 giây) thay vì nháy
   ===================================================================== */
{const _rf18=renderFly;renderFly=function(...a){const old=$(".flyout");const same=old&&old.dataset.k===String(UI.fly||"");const top=old?old.scrollTop:0;
  const r=_rf18.apply(this,a);const f=$(".flyout");if(f){f.dataset.k=String(UI.fly||"");if(same){f.classList.add("noanim");f.scrollTop=top;requestAnimationFrame(()=>{f.scrollTop=top})}}return r}}
{const _as18=applySkin;let tmr=0;applySkin=function(k,quiet){if(!quiet&&!UI.reduceMotion&&document.body){const r=document.documentElement;r.classList.add("skin-x");clearTimeout(tmr);tmr=setTimeout(()=>r.classList.remove("skin-x"),420)}return _as18.apply(this,arguments)}}
/* bảng chọn cảnh nền dạng popover: không đóng/mở lại khi chọn */
{const _bp18=bgPopover;bgPopover=function(anchor){const old=$(".popmenu.wide .bgpop");const top=old?old.parentElement.scrollTop:0;const r=_bp18(anchor);const m=$(".popmenu.wide");if(m&&old){m.style.animation="none";m.scrollTop=top}return r}}
/* trang chủ vẽ lại sau khi đổi giao diện: giữ vị trí cuộn */
{const _rh18=renderHome;renderHome=function(...a){const keep=!!$("#dgrid");const sc=$("#main");const top=sc?sc.scrollTop:0;const y=scrollY;const r=_rh18.apply(this,a);if(keep){if(sc&&top)sc.scrollTop=top;if(y)scrollTo(0,y)}return r}}

/* gifenc 1.0.3 — (c) 2017 Matt DesLauriers, MIT License — mã hóa ảnh GIF động */
window.GIFENC=(function(){var X={signature:"GIF",version:"89a",trailer:59,extensionIntroducer:33,applicationExtensionLabel:255,graphicControlExtensionLabel:249,imageSeparator:44,signatureSize:3,versionSize:3,globalColorTableFlagMask:128,colorResolutionMask:112,sortFlagMask:8,globalColorTableSizeMask:7,applicationIdentifierSize:8,applicationAuthCodeSize:3,disposalMethodMask:28,userInputFlagMask:2,transparentColorFlagMask:1,localColorTableFlagMask:128,interlaceFlagMask:64,idSortFlagMask:32,localColorTableSizeMask:7};function F(t=256){let e=0,s=new Uint8Array(t);return{get buffer(){return s.buffer},reset(){e=0},bytesView(){return s.subarray(0,e)},bytes(){return s.slice(0,e)},writeByte(r){n(e+1),s[e]=r,e++},writeBytes(r,o=0,i=r.length){n(e+i);for(let c=0;c<i;c++)s[e++]=r[c+o]},writeBytesView(r,o=0,i=r.byteLength){n(e+i),s.set(r.subarray(o,o+i),e),e+=i}};function n(r){var o=s.length;if(o>=r)return;var i=1024*1024;r=Math.max(r,o*(o<i?2:1.125)>>>0),o!=0&&(r=Math.max(r,256));let c=s;s=new Uint8Array(r),e>0&&s.set(c.subarray(0,e),0)}}var O=12,J=5003,lt=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function at(t,e,s,n,r=F(512),o=new Uint8Array(256),i=new Int32Array(J),c=new Int32Array(J)){let x=i.length,a=Math.max(2,n);o.fill(0),c.fill(0),i.fill(-1);let l=0,f=0,g=a+1,h=g,b=!1,w=h,_=(1<<w)-1,u=1<<g-1,k=u+1,B=u+2,p=0,A=s[0],z=0;for(let y=x;y<65536;y*=2)++z;z=8-z,r.writeByte(a),I(u);let d=s.length;for(let y=1;y<d;y++){t:{let m=s[y],v=(m<<O)+A,M=m<<z^A;if(i[M]===v){A=c[M];break t}let V=M===0?1:x-M;for(;i[M]>=0;)if(M-=V,M<0&&(M+=x),i[M]===v){A=c[M];break t}I(A),A=m,B<1<<O?(c[M]=B++,i[M]=v):(i.fill(-1),B=u+2,b=!0,I(u))}}return I(A),I(k),r.writeByte(0),r.bytesView();function I(y){for(l&=lt[f],f>0?l|=y<<f:l=y,f+=w;f>=8;)o[p++]=l&255,p>=254&&(r.writeByte(p),r.writeBytesView(o,0,p),p=0),l>>=8,f-=8;if((B>_||b)&&(b?(w=h,_=(1<<w)-1,b=!1):(++w,_=w===O?1<<w:(1<<w)-1)),y==k){for(;f>0;)o[p++]=l&255,p>=254&&(r.writeByte(p),r.writeBytesView(o,0,p),p=0),l>>=8,f-=8;p>0&&(r.writeByte(p),r.writeBytesView(o,0,p),p=0)}}}var $=at;function D(t,e,s){return t<<8&63488|e<<2&992|s>>3}function G(t,e,s,n){return t>>4|e&240|(s&240)<<4|(n&240)<<8}function j(t,e,s){return t>>4<<8|e&240|s>>4}function R(t,e,s){return t<e?e:t>s?s:t}function T(t){return t*t}function tt(t,e,s){var n=0,r=1e100;let o=t[e],i=o.cnt,c=o.ac,x=o.rc,a=o.gc,l=o.bc;for(var f=o.fw;f!=0;f=t[f].fw){let h=t[f],b=h.cnt,w=i*b/(i+b);if(!(w>=r)){var g=0;s&&(g+=w*T(h.ac-c),g>=r)||(g+=w*T(h.rc-x),!(g>=r)&&(g+=w*T(h.gc-a),!(g>=r)&&(g+=w*T(h.bc-l),!(g>=r)&&(r=g,n=f))))}}o.err=r,o.nn=n}function Q(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function ut(t,e){let s=e==="rgb444"?4096:65536,n=new Array(s),r=t.length;if(e==="rgba4444")for(let o=0;o<r;++o){let i=t[o],c=i>>24&255,x=i>>16&255,a=i>>8&255,l=i&255,f=G(l,a,x,c),g=f in n?n[f]:n[f]=Q();g.rc+=l,g.gc+=a,g.bc+=x,g.ac+=c,g.cnt++}else if(e==="rgb444")for(let o=0;o<r;++o){let i=t[o],c=i>>16&255,x=i>>8&255,a=i&255,l=j(a,x,c),f=l in n?n[l]:n[l]=Q();f.rc+=a,f.gc+=x,f.bc+=c,f.cnt++}else for(let o=0;o<r;++o){let i=t[o],c=i>>16&255,x=i>>8&255,a=i&255,l=D(a,x,c),f=l in n?n[l]:n[l]=Q();f.rc+=a,f.gc+=x,f.bc+=c,f.cnt++}return n}function H(t,e,s={}){let{format:n="rgb565",clearAlpha:r=!0,clearAlphaColor:o=0,clearAlphaThreshold:i=0,oneBitAlpha:c=!1}=s;if(!t||!t.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(t instanceof Uint8Array)&&!(t instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let x=new Uint32Array(t.buffer),a=s.useSqrt!==!1,l=n==="rgba4444",f=ut(x,n),g=f.length,h=g-1,b=new Uint32Array(g+1);for(var w=0,u=0;u<g;++u){let C=f[u];if(C!=null){var _=1/C.cnt;l&&(C.ac*=_),C.rc*=_,C.gc*=_,C.bc*=_,f[w++]=C}}T(e)/w<.022&&(a=!1);for(var u=0;u<w-1;++u)f[u].fw=u+1,f[u+1].bk=u,a&&(f[u].cnt=Math.sqrt(f[u].cnt));a&&(f[u].cnt=Math.sqrt(f[u].cnt));var k,B,p;for(u=0;u<w;++u){tt(f,u,!1);var A=f[u].err;for(B=++b[0];B>1&&(p=B>>1,!(f[k=b[p]].err<=A));B=p)b[B]=k;b[B]=u}var z=w-e;for(u=0;u<z;){for(var d;;){var I=b[1];if(d=f[I],d.tm>=d.mtm&&f[d.nn].mtm<=d.tm)break;d.mtm==h?I=b[1]=b[b[0]--]:(tt(f,I,!1),d.tm=u);var A=f[I].err;for(B=1;(p=B+B)<=b[0]&&(p<b[0]&&f[b[p]].err>f[b[p+1]].err&&p++,!(A<=f[k=b[p]].err));B=p)b[B]=k;b[B]=I}var y=f[d.nn],m=d.cnt,v=y.cnt,_=1/(m+v);l&&(d.ac=_*(m*d.ac+v*y.ac)),d.rc=_*(m*d.rc+v*y.rc),d.gc=_*(m*d.gc+v*y.gc),d.bc=_*(m*d.bc+v*y.bc),d.cnt+=y.cnt,d.mtm=++u,f[y.bk].fw=y.fw,f[y.fw].bk=y.bk,y.mtm=h}let M=[];var V=0;for(u=0;;++V){let L=R(Math.round(f[u].rc),0,255),C=R(Math.round(f[u].gc),0,255),Y=R(Math.round(f[u].bc),0,255),E=255;if(l){if(E=R(Math.round(f[u].ac),0,255),c){let st=typeof c=="number"?c:127;E=E<=st?0:255}r&&E<=i&&(L=C=Y=o,E=0)}let K=l?[L,C,Y,E]:[L,C,Y];if(xt(M,K)||M.push(K),(u=f[u].fw)==0)break}return M}function xt(t,e){for(let s=0;s<t.length;s++){let n=t[s],r=n[0]===e[0]&&n[1]===e[1]&&n[2]===e[2],o=n.length>=4&&e.length>=4?n[3]===e[3]:!0;if(r&&o)return!0}return!1}function U(t,e){var s=0,n;for(n=0;n<t.length;n++){let r=t[n]-e[n];s+=r*r}return s}function P(t,e){return e>1?Math.round(t/e)*e:t}function et(t,{roundRGB:e=5,roundAlpha:s=10,oneBitAlpha:n=null}={}){let r=new Uint32Array(t.buffer);for(let o=0;o<r.length;o++){let i=r[o],c=i>>24&255,x=i>>16&255,a=i>>8&255,l=i&255;if(c=P(c,s),n){let f=typeof n=="number"?n:127;c=c<=f?0:255}l=P(l,e),a=P(a,e),x=P(x,e),r[o]=c<<24|x<<16|a<<8|l<<0}}function nt(t,e,s="rgb565"){if(!t||!t.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(t instanceof Uint8Array)&&!(t instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(e.length>256)throw new Error("applyPalette() only works with 256 colors or less");let n=new Uint32Array(t.buffer),r=n.length,o=s==="rgb444"?4096:65536,i=new Uint8Array(r),c=new Array(o),x=s==="rgba4444";if(s==="rgba4444")for(let a=0;a<r;a++){let l=n[a],f=l>>24&255,g=l>>16&255,h=l>>8&255,b=l&255,w=G(b,h,g,f),_=w in c?c[w]:c[w]=gt(b,h,g,f,e);i[a]=_}else{let a=s==="rgb444"?j:D;for(let l=0;l<r;l++){let f=n[l],g=f>>16&255,h=f>>8&255,b=f&255,w=a(b,h,g),_=w in c?c[w]:c[w]=bt(b,h,g,e);i[l]=_}}return i}function gt(t,e,s,n,r){let o=0,i=1e100;for(let c=0;c<r.length;c++){let x=r[c],a=x[3],l=q(a-n);if(l>i)continue;let f=x[0];if(l+=q(f-t),l>i)continue;let g=x[1];if(l+=q(g-e),l>i)continue;let h=x[2];l+=q(h-s),!(l>i)&&(i=l,o=c)}return o}function bt(t,e,s,n){let r=0,o=1e100;for(let i=0;i<n.length;i++){let c=n[i],x=c[0],a=q(x-t);if(a>o)continue;let l=c[1];if(a+=q(l-e),a>o)continue;let f=c[2];a+=q(f-s),!(a>o)&&(o=a,r=i)}return r}function rt(t,e,s=5){if(!t.length||!e.length)return;let n=t.map(i=>i.slice(0,3)),r=s*s,o=t[0].length;for(let i=0;i<e.length;i++){let c=e[i];c.length<o?c=[c[0],c[1],c[2],255]:c.length>o?c=c.slice(0,3):c=c.slice();let x=N(n,c.slice(0,3),U),a=x[0],l=x[1];l>0&&l<=r&&(t[a]=c)}}function q(t){return t*t}function W(t,e,s=U){let n=Infinity,r=-1;for(let o=0;o<t.length;o++){let i=t[o],c=s(e,i);c<n&&(n=c,r=o)}return r}function N(t,e,s=U){let n=Infinity,r=-1;for(let o=0;o<t.length;o++){let i=t[o],c=s(e,i);c<n&&(n=c,r=o)}return[r,n]}function ot(t,e,s=U){return t[W(t,e,s)]}function ct(t={}){let{initialCapacity:e=4096,auto:s=!0}=t,n=F(e),r=5003,o=new Uint8Array(256),i=new Int32Array(r),c=new Int32Array(r),x=!1;return{reset(){n.reset(),x=!1},finish(){n.writeByte(X.trailer)},bytes(){return n.bytes()},bytesView(){return n.bytesView()},get buffer(){return n.buffer},get stream(){return n},writeHeader:a,writeFrame(l,f,g,h={}){let{transparent:b=!1,transparentIndex:w=0,delay:_=0,palette:u=null,repeat:k=0,colorDepth:B=8,dispose:p=-1}=h,A=!1;if(s?x||(A=!0,a(),x=!0):A=Boolean(h.first),f=Math.max(0,Math.floor(f)),g=Math.max(0,Math.floor(g)),A){if(!u)throw new Error("First frame must include a { palette } option");pt(n,f,g,u,B),it(n,u),k>=0&&dt(n,k)}let z=Math.round(_/10);wt(n,p,z,b,w);let d=Boolean(u)&&!A;ht(n,f,g,d?u:null),d&&it(n,u),yt(n,l,f,g,B,o,i,c)}};function a(){ft(n,"GIF89a")}}function wt(t,e,s,n,r){t.writeByte(33),t.writeByte(249),t.writeByte(4),r<0&&(r=0,n=!1);var o,i;n?(o=1,i=2):(o=0,i=0),e>=0&&(i=e&7),i<<=2;let c=0;t.writeByte(0|i|c|o),S(t,s),t.writeByte(r||0),t.writeByte(0)}function pt(t,e,s,n,r=8){let o=1,i=0,c=Z(n.length)-1,x=o<<7|r-1<<4|i<<3|c,a=0,l=0;S(t,e),S(t,s),t.writeBytes([x,a,l])}function dt(t,e){t.writeByte(33),t.writeByte(255),t.writeByte(11),ft(t,"NETSCAPE2.0"),t.writeByte(3),t.writeByte(1),S(t,e),t.writeByte(0)}function it(t,e){let s=1<<Z(e.length);for(let n=0;n<s;n++){let r=[0,0,0];n<e.length&&(r=e[n]),t.writeByte(r[0]),t.writeByte(r[1]),t.writeByte(r[2])}}function ht(t,e,s,n){if(t.writeByte(44),S(t,0),S(t,0),S(t,e),S(t,s),n){let r=0,o=0,i=Z(n.length)-1;t.writeByte(128|r|o|0|i)}else t.writeByte(0)}function yt(t,e,s,n,r=8,o,i,c){$(s,n,e,r,t,o,i,c)}function S(t,e){t.writeByte(e&255),t.writeByte(e>>8&255)}function ft(t,e){for(var s=0;s<e.length;s++)t.writeByte(e.charCodeAt(s))}function Z(t){return Math.max(Math.ceil(Math.log2(t)),1)}var Bt=ct;
return {GIFEncoder:ct,applyPalette:nt,quantize:H};})();

/* =====================================================================
   v18 — HỌA TIẾT & STICKER PIXEL ĐỒNG BỘ MỌI GIAO DIỆN · STICKER GIF ĐỘNG ·
   STICKER CHUYỂN ĐỘNG (đi, chạy, nhảy, theo chuột, né chuột, bấm để tương tác)
   ===================================================================== */
UI.pat=Object.assign({on:true,style:"auto",dens:1,size:1,alpha:.6,tw:true,col:"auto",c1:"#ffffff",c2:"#ffe08a",c3:"#bfe3ff",stk:true,ai:true},local.get("pat",{}));
const savePat=()=>{local.set("pat",UI.pat);clearTimeout(savePat._t);savePat._t=setTimeout(()=>{try{saveDecor()}catch(e){}},500)};
const PAT_STY={auto:"Theo giao diện",sparkle:"Sao lấp lánh",star:"Ngôi sao",heart:"Trái tim",dot:"Chấm bi",plus:"Dấu cộng",flower:"Hoa nhí",snow:"Bông tuyết",note:"Nốt nhạc",circuit:"Mạch điện",none:"Không"};
const PAT_AUTO={demsao:"sparkle",pastel:"heart",bangden:"plus",matrix:"circuit",terminal:"circuit",sakura:"flower",ocean:"dot",lavender:"sparkle",matcha:"flower",peach:"heart",midnight:"star",neon:"circuit",coffee:"dot",mint:"plus",nord:"snow",ink:"note",dem:"sparkle",sang:"dot"};
/* đọc màu thật của biến CSS (kể cả color-mix) */
const _probe=(()=>{let el=null;return v=>{if(!el){el=document.createElement("i");el.style.cssText="position:absolute;width:0;height:0;visibility:hidden";document.body.appendChild(el)}el.style.color="";el.style.color=v;const c=getComputedStyle(el).color;let m=c.match(/rgba?\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/);if(m)return [+m[1],+m[2],+m[3]];m=c.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)/);if(m)return [m[1]*255,m[2]*255,m[3]*255].map(Math.round);return [255,255,255]}})();
const p19toHex=a=>"#"+a.map(x=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,"0")).join("");
function p19hsl([r,g,b]){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0;const l=(mx+mn)/2;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h/=6}return [h,s,l]}
function p19rgb([h,s,l]){if(!s)return [l*255,l*255,l*255];const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q;const f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p};return [f(h+1/3)*255,f(h)*255,f(h-1/3)*255]}
const p19hex=h=>{h=String(h).replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)||0)};
function themeCols(){const dark=document.documentElement.getAttribute("data-theme")!=="light";const a=_probe("var(--accent)"),s=_probe("var(--sig)"),r=_probe("var(--pen-red, #ff8bb0)");
  return dark?["#ffffff",p19toHex(a),p19toHex(s),p19toHex(r)]:[p19toHex(a),p19toHex(s),p19toHex(r),p19toHex(a.map(x=>x*.75))]}
function patCols(){return UI.pat.col==="auto"?themeCols():[UI.pat.c1,UI.pat.c2,UI.pat.c3,UI.pat.c1]}
function patStyle(){return UI.pat.style==="auto"?(PAT_AUTO[UI.skin]||"sparkle"):UI.pat.style}
/* vẽ một ô họa tiết pixel lặp lại */
function patTile(style,cols,{dens=1,size=1,seed=7,alpha=.6}={}){
  const S=Math.round(180*size),u=Math.max(1,Math.round(2*size));const c=document.createElement("canvas");c.width=c.height=S;const g=c.getContext("2d");g.globalAlpha=alpha;let sd=seed;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
  const R=(x,y,w,h)=>g.fillRect(Math.round(x),Math.round(y),w*u,h*u);const M=(x,y,rows)=>rows.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!==".")R(x+i*u,y+j*u,1,1)}));
  const n=Math.round(14*dens);
  for(let i=0;i<n;i++){const x=Math.floor(r()*(S-12*u)),y=Math.floor(r()*(S-12*u)),t=r();g.fillStyle=cols[i%cols.length];
    switch(style){
     case"sparkle":if(t<.45)R(x,y,1,1);else if(t<.8){R(x,y-u,1,3);R(x-u,y,3,1)}else{R(x+u,y,1,5);R(x-u,y+2*u,5,1);R(x,y+u,3,3)}break;
     case"star":t<.4?R(x,y,1,1):M(x,y,["..#..","..#..","#####",".###.",".#.#."]);break;
     case"heart":t<.35?R(x,y,1,1):M(x,y,t<.7?[".#.#.","#####","#####",".###.","..#.."]:["##.##","#####",".###.","..#.."]);break;
     case"dot":t<.5?R(x,y,2,2):M(x,y,[".##.","####","####",".##."]);break;
     case"plus":t<.4?R(x,y,1,1):M(x,y,t<.75?[".#.","###",".#."]:["..#..","..#..","#####","..#..","..#.."]);break;
     case"flower":if(t<.35)R(x,y,1,1);else{M(x,y,[".#.","#.#",".#."]);g.fillStyle=cols[(i+1)%cols.length];R(x+u,y+u,1,1)}break;
     case"snow":t<.4?R(x,y,1,1):M(x,y,["#.#.#",".###.","##.##",".###.","#.#.#"]);break;
     case"note":t<.4?R(x,y,1,1):M(x,y,t<.7?["..##","..#.","..#.","###.","##.."]:[".####",".#..#",".#..#","##.##","##.##"]);break;
     case"circuit":{if(t<.3){R(x,y,2,2);break}const L=4+Math.floor(r()*8);if(t<.65){R(x,y,L,1);R(x+L*u,y-u,2,3)}else{R(x,y,1,L);R(x-u,y+L*u,3,2)}break}
    }}
  return c.toDataURL()}
function applyPat(){let L=$("#patl");if(!L){L=document.createElement("div");L.id="patl";L.setAttribute("aria-hidden","true");L.innerHTML="<i></i><i></i>";const w=$("#wall");if(w)w.after(L);else document.body.prepend(L)}
  const st=patStyle();const on=UI.pat.on&&st!=="none";L.hidden=!on;document.body.style.backgroundImage="";if(!on)return;
  const cols=patCols();const o={dens:UI.pat.dens,size:UI.pat.size,alpha:UI.pat.alpha};const [a,b]=L.children;
  a.style.backgroundImage=`url(${patTile(st,cols,{...o,seed:7})})`;b.style.backgroundImage=`url(${patTile(st,cols,{...o,seed:31,dens:o.dens*.8})})`;
  L.classList.toggle("tw",!!UI.pat.tw&&!UI.reduceMotion);L.classList.toggle("px",true)}

/* ---------- sticker pixel đổi màu theo giao diện ---------- */
const _stkURL19=stkURL;const _stkReg=new Set();
function stkThemeKey(){const c=themeCols();return c.join("").replace(/#/g,"")}
stkURL=function(k,scale){if(UI.pat&&UI.pat.stk&&STK[k]&&!String(k).includes("~")){const tk=k+"~"+stkThemeKey();if(!_stkReg.has(tk)){_stkReg.add(tk);const base=STK[k];const [A,B]=(()=>{const c=themeCols();const dark=document.documentElement.getAttribute("data-theme")!=="light";return dark?[c[1],c[2]]:[c[0],c[1]]})();
    const hA=p19hsl(p19hex(A)),hB=p19hsl(p19hex(B));
    STK[tk]=()=>{const [g,pal]=base();const np={};Object.entries(pal).forEach(([ch,col])=>{if(typeof col!=="string"||!/^#/.test(col)){np[ch]=col;return}const [h,s,l]=p19hsl(p19hex(col));if(s<.12||l>.93||l<.1){np[ch]=col;return}
      const warm=h<.17||h>.8;const tgt=warm?hA:hB;np[ch]=p19toHex(p19rgb([tgt[0],Math.min(1,(s*.5+tgt[1]*.5)*1.05),l]))});return [g,np]}}
    return _stkURL19(tk,scale)}return _stkURL19(k,scale)};

/* ---------- sticker GIF động (giữ nguyên chuyển động) ---------- */
const _importStk19=importStickerFiles;
importStickerFiles=async function(files,at){const anim=files.filter(f=>f.type==="image/gif"||/\.gif$/i.test(f.name||""));const rest=files.filter(f=>!anim.includes(f));
  for(const f of anim.slice(0,6)){try{if(f.size>15e6){toast(f.name+": GIF quá lớn (tối đa 15 MB)");continue}
      const src=await fileToURL(f);const im=await loadImg(src);const W=im.naturalWidth||120,H=im.naturalHeight||120;let url=null,asset=null;
      if(P.assets&&!P.local){try{const up=await P.assets.upload(f);url=up.url;asset=up.id}catch(e){}}
      if(!url){if(!P.local&&src.length>160000){toast(f.name+": GIF hơi lớn để lưu ở đây — hãy dùng GIF dưới 120 KB",4500);continue}url=src}
      const k=Math.min(1,180/Math.max(W,H));const item={id:mkid("cs"),url,asset,w:Math.max(8,Math.round(W/3*k)),h:Math.max(8,Math.round(H/3*k)),name:(f.name||"GIF").replace(/\.[^.]+$/,""),anim:true};
      D.custom.push(item);saveDecor();const st=addSticker("c:"+item.id,at||{});if(UI.pat.ai)stkAIMotion(st,true)}catch(e){toast("Không đọc được "+f.name)}}
  if(anim.length&&!rest.length){if(!UI.decorating){UI.fly="stk";renderRail();renderFly()}toast("Đã thêm sticker GIF động — kéo để đặt vị trí");return}
  const before=new Set(D.stickers.map(s=>s.id));const r=rest.length?await _importStk19(rest,at):undefined;
  if(UI.pat.ai)D.stickers.filter(s=>!before.has(s.id)&&String(s.k).startsWith("c:")).forEach(s=>stkAIMotion(s,true));return r};

/* ---------- chuyển động cho sticker ---------- */
const STK_MV={none:"Đứng yên",bob:"Nhún nhẹ",hop:"Nhảy tại chỗ",dance:"Nhún nhảy",wiggle:"Lắc lư",float:"Bay lơ lửng",spin:"Xoay tròn",walk:"Đi qua lại",run:"Chạy khắp màn hình",roam:"Đi lang thang",follow:"Đi theo chuột",shy:"Né chuột"};
const MV_MOVE=new Set(["walk","run","roam","follow","shy"]);
const MV_SAY=["Hi! ♡","Học tiếp nào!","Cố lên!","Nghỉ chút nhé?","♪ ♫","Yay!","Uống nước đi ♡","Giỏi quá!"];
let _mvRaf=0,_mvLast=0,_mx=-1e4,_my=-1e4;const _rt=new Map();
addEventListener("pointermove",e=>{_mx=e.clientX;_my=e.clientY},{passive:true});
const _stkPlace19=stkPlace;stkPlace=function(el,st,m){_stkPlace19(el,st,m);const im=el.firstChild;if(im){im.style.transform="";im.style.scale=st.f?"-1 1":""}
  const mv=st.mv||"bob";el.classList.toggle("mv",mv!=="bob");el.dataset.mv=mv;el.classList.toggle("mv-i",(mv!=="none"&&mv!=="bob")||!!(st.say&&st.say.length));if(!MV_MOVE.has(mv)){el.style.translate="";_rt.delete(st.id)}};
const _renderStk19=renderStickers;renderStickers=function(){_renderStk19();$$("#decor .stk").forEach(el=>{const st=D.stickers.find(s=>s.id===el.dataset.id);if(!st)return;const m=stkBase(st.k);if(m)stkPlace(el,st,m);if(m&&m.custom){const c=D.custom.find(z=>"c:"+z.id===st.k);if(c&&c.anim)el.classList.add("gif")}});mvKick()};
function mvKick(){if(_mvRaf)return;if(!D.stickers.some(s=>MV_MOVE.has(s.mv)))return;_mvLast=performance.now();_mvRaf=requestAnimationFrame(mvLoop)}
function mvLoop(now){_mvRaf=0;const dt=Math.min(.05,(now-_mvLast)/1000);_mvLast=now;const W=innerWidth,H=innerHeight;let any=false;
  if(!document.hidden&&!UI.decorating&&!RM())D.stickers.forEach(st=>{if(!MV_MOVE.has(st.mv))return;const el=$(`#decor .stk[data-id="${st.id}"]`);if(!el)return;any=true;
    if(el.hidden||el.classList.contains("voff"))return;const m=stkBase(st.k);if(!m)return;const ax=st.x/100*W,ay=st.y/100*H-stkOffPx(),hw=m.w*st.s/2;let r=_rt.get(st.id);if(!r){r={ox:0,oy:0,dir:Math.random()<.5?-1:1,t:Math.random()*9,pause:0,tx:0,ty:0,spd:0};_rt.set(st.id,r)}r.t+=dt;
    const lim=(v,a,b)=>Math.max(a,Math.min(b,v));const minX=hw+4-ax,maxX=W-hw-4-ax,minY=40-ay,maxY=H-30-ay;let bounce=0,moving=false;
    if(st.mv==="walk"||st.mv==="run"){const span=st.mv==="run"?1e9:Math.min(W*.22,280);const sp=st.mv==="run"?150:55;if(r.pause>0){r.pause-=dt}else{r.ox+=r.dir*sp*dt;moving=true;
        if(r.ox>Math.min(span,maxX)||r.ox<Math.max(-span,minX)){r.dir*=-1;r.ox=lim(r.ox,Math.max(-span,minX),Math.min(span,maxX));if(Math.random()<.5)r.pause=.4+Math.random()*1.2}}
      bounce=moving?-Math.abs(Math.sin(r.t*(st.mv==="run"?13:8)))*(st.mv==="run"?10:5):0}
    else if(st.mv==="roam"){if(r.pause>0)r.pause-=dt;else{const dx=r.tx-r.ox,dy=r.ty-r.oy,d=Math.hypot(dx,dy);if(d<4){r.pause=.8+Math.random()*2.5;const R=Math.min(W*.3,320);r.tx=lim((Math.random()*2-1)*R,minX,maxX);r.ty=lim((Math.random()*2-1)*R*.5,minY,maxY)}else{const sp=60;r.ox+=dx/d*sp*dt;r.oy+=dy/d*sp*dt;r.dir=dx>0?1:-1;moving=true}}bounce=moving?-Math.abs(Math.sin(r.t*9))*5:0}
    else if(st.mv==="follow"){const tx=_mx-ax,ty=_my-ay;const dx=tx-r.ox,dy=ty-r.oy,d=Math.hypot(dx,dy);if(_mx>-1e3&&d>70){const sp=Math.min(260,d*1.6);r.ox+=dx/d*sp*dt;r.oy+=dy/d*sp*dt;r.dir=dx>0?1:-1;moving=true}r.ox=lim(r.ox,minX,maxX);r.oy=lim(r.oy,minY,maxY);bounce=moving?-Math.abs(Math.sin(r.t*11))*6:0}
    else if(st.mv==="shy"){const cx=ax+r.ox,cy=ay+r.oy;const dx=cx-_mx,dy=cy-_my,d=Math.hypot(dx,dy);if(d<150&&d>0){r.ox+=dx/d*280*dt;r.oy+=dy/d*280*dt;r.dir=dx>0?1:-1;moving=true}else{const d0=Math.hypot(r.ox,r.oy);if(d0>2){r.ox-=r.ox/d0*45*dt;r.oy-=r.oy/d0*45*dt;r.dir=r.ox>0?-1:1;moving=true}}r.ox=lim(r.ox,minX,maxX);r.oy=lim(r.oy,minY,maxY);bounce=moving?-Math.abs(Math.sin(r.t*12))*5:0}
    if(r.jump>0){r.jump-=dt;bounce-=Math.sin((1-r.jump/.5)*Math.PI)*28}
    el.style.translate=`${r.ox.toFixed(1)}px ${(r.oy+bounce).toFixed(1)}px`;const im=el.firstChild;if(im)im.style.scale=((r.dir<0)!==!!st.f)?"-1 1":"";el.classList.toggle("walking",moving)});
  /* hai bạn gặp nhau → cùng nhảy, thả tim */
  if(any){const mov=D.stickers.filter(s=>MV_MOVE.has(s.mv)&&_rt.get(s.id));for(let i=0;i<mov.length;i++)for(let j=i+1;j<mov.length;j++){const a=mov[i],b=mov[j],ra=_rt.get(a.id),rb=_rt.get(b.id);if(now<(ra.cool||0)||now<(rb.cool||0))continue;
      if(a.v!==b.v)continue;const pa=[a.x/100*W+ra.ox,a.y/100*H+ra.oy-stkOffPx()],pb=[b.x/100*W+rb.ox,b.y/100*H+rb.oy-stkOffPx()];if(Math.hypot(pa[0]-pb[0],pa[1]-pb[1])<70){ra.cool=rb.cool=now+6000;ra.jump=rb.jump=.5;ra.dir=pb[0]>pa[0]?1:-1;rb.dir=-ra.dir;ra.pause=rb.pause=1.2;hearts((pa[0]+pb[0])/2,Math.min(pa[1],pb[1])-30,5)}}}
  if(any||D.stickers.some(s=>MV_MOVE.has(s.mv)))_mvRaf=requestAnimationFrame(mvLoop)}
function hearts(x,y,n=6){for(let i=0;i<n;i++){const h=document.createElement("img");h.className="stk-heart";h.src=stkURL(i%2?"heart-p":"heart-l",3).url;h.style.left=x+"px";h.style.top=y+"px";h.style.setProperty("--dx",((Math.random()*2-1)*50).toFixed(0)+"px");h.style.animationDelay=(i*.06)+"s";document.body.appendChild(h);setTimeout(()=>h.remove(),1500)}}
function stkSay(el,st){const t=(st.say&&st.say.length?st.say:MV_SAY)[Math.floor(Math.random()*((st.say&&st.say.length)||MV_SAY.length))];$$(".stk-say",el).forEach(x=>x.remove());const b=document.createElement("span");b.className="stk-say";b.textContent=t;el.appendChild(b);setTimeout(()=>b.remove(),2200)}
/* bấm vào sticker (khi không trang trí) → nhảy lên, thả tim, nói một câu */
document.addEventListener("pointerdown",e=>{if(UI.decorating)return;const el=e.target.closest&&e.target.closest("#decor .stk.mv-i");if(!el)return;const st=D.stickers.find(s=>s.id===el.dataset.id);if(!st)return;e.preventDefault();
  const r=_rt.get(st.id);if(r){r.jump=.5;r.pause=.6}else{el.classList.remove("poke");void el.offsetWidth;el.classList.add("poke");setTimeout(()=>el.classList.remove("poke"),650)}
  const b=el.getBoundingClientRect();hearts(b.left+b.width/2,b.top,4);stkSay(el,st);try{const a=actx();if(a){const o=a.createOscillator(),g=a.createGain();o.type="square";o.frequency.setValueAtTime(660,a.currentTime);o.frequency.exponentialRampToValueAtTime(1320,a.currentTime+.12);g.gain.setValueAtTime(.04*(UI.mute?0:1),a.currentTime);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+.18);o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+.2)}}catch(_){}},true);
/* AI xem ảnh: con vật / người → tự cho chuyển động phù hợp */
async function stkAIMotion(st,quiet){const c=D.custom.find(z=>"c:"+z.id===st.k);if(!c||!P.sample)return false;
  try{const blob=await (await fetch(c.url)).blob();const r=await P.sample.json(`Ảnh này là một sticker trang trí trang học tập. Cho biết trong ảnh là gì và chọn kiểu chuyển động hợp lý.\nTrả về CHỈ JSON: {"kind":"animal|person|character|vehicle|object","what":"tên ngắn tiếng Việt","motion":"walk|run|roam|hop|dance|float|wiggle|follow|shy|bob|none","say":["2–4 câu rất ngắn (≤ 4 từ) mà sticker có thể nói khi được bấm, dễ thương, tiếng Việt"]}\nGợi ý: con vật bốn chân → walk/run/roam; chim, bướm, cá → float; người → dance/hop/walk; xe → run; đồ vật → bob/none.`,{images:[blob],modelTier:"quick"});
    const mv=STK_MV[r&&r.motion]?r.motion:null;if(!mv)return false;if(quiet&&(r.kind==="object"||mv==="none"||mv==="bob"))return false;
    st.mv=mv;if(Array.isArray(r.say))st.say=r.say.slice(0,4).map(x=>String(x).slice(0,24));renderStickers();saveDecor();toast(`AI: ${r.what||"sticker"} — cho ${STK_MV[mv].toLowerCase()}. Đổi ở nút 🏃 khi trang trí.`,4200);return true}
  catch(e){if(!quiet)toast(aiErr(e),4000);return false}}
/* nút chọn chuyển động trong khung chỉnh sticker */
const _placeCtl19=placeStkCtl;placeStkCtl=function(){_placeCtl19();const b=$(".stk-box");if(!b||!UI.selStk)return;const st=D.stickers.find(s=>s.id===UI.selStk);if(!st)return;
  const bt=document.createElement("button");bt.className="h-mv";bt.title="Chuyển động";bt.setAttribute("aria-label","Chọn chuyển động");bt.textContent="🏃";b.appendChild(bt);
  bt.onclick=e=>{e.stopPropagation();mvMenu(bt,st)}};
function mvMenu(anchor,st){const isC=String(st.k).startsWith("c:");const m=popMenu(anchor,`<div class="who">Chuyển động của sticker</div><div class="mv-grid">${Object.entries(STK_MV).map(([k,l])=>`<button data-mvk="${k}" aria-pressed="${(st.mv||"bob")===k}">${l}</button>`).join("")}</div>${isC&&P.sample?`<div class="sep"></div><button data-mvai>${ic("spark")} AI xem ảnh và chọn giúp</button>`:""}<div class="who" style="font-size:12px">Bấm vào sticker (khi không trang trí) để nó nhảy lên và nói chuyện. Hai sticker đang chạy gặp nhau sẽ cùng chơi.</div>`);
  m.addEventListener("click",e=>e.stopPropagation());
  $$("[data-mvk]",m).forEach(x=>x.onclick=()=>{st.mv=x.dataset.mvk;_rt.delete(st.id);saveDecor();renderStickers();$$("[data-mvk]",m).forEach(y=>y.setAttribute("aria-pressed",y===x));toast("Chuyển động: "+STK_MV[st.mv]+(MV_MOVE.has(st.mv)?" — bấm Xong để xem":""),2200)});
  const ai=$("[data-mvai]",m);if(ai)ai.onclick=async()=>{ai.disabled=true;ai.innerHTML=`<span class="spin"></span> AI đang xem ảnh…`;await stkAIMotion(st,false);closePop()}}

/* ---------- tự rắc sticker pixel theo giao diện quanh các khối ---------- */
function autoDecorate(){const keys=["star-y","spark-p","star-b","spark-l","heart-p","plus","star-l","spark-b","moon","ring"];const blks=$$(".blk,.dblk,.card,.panel-box").filter(b=>{const r=b.getBoundingClientRect();return r.width>120&&r.height>60&&r.top<innerHeight&&r.bottom>0}).slice(0,8);
  D.stickers=D.stickers.filter(s=>!s.auto);let i=0;
  const put=(x,y,s)=>{const st=addSticker(keys[i%keys.length],{x:Math.max(1,Math.min(99,x/innerWidth*100)),y:Math.max(1,Math.min(99,y/innerHeight*100)),s,r:Math.round((Math.random()-.5)*24)});st.auto=true;if(i%3===0)st.mv="float";i++};
  blks.forEach((b,j)=>{const r=b.getBoundingClientRect();j%2?put(r.right-6,r.top+8,2+Math.random()*1.2):put(r.left+10,r.bottom-6,1.6+Math.random()*1.2)});
  for(let k=0;k<5;k++)put(innerWidth*(.08+.84*Math.random()),innerHeight*(.08+.84*Math.random()),1.4+Math.random());
  renderStickers();saveDecor();toast("Đã rắc sticker pixel theo màu giao diện — kéo để đổi chỗ khi trang trí")}

/* ---------- bảng điều khiển trong “Giao diện & màu” ---------- */
function patPanelHTML(){const p=UI.pat;const st=patStyle();return `<div class="pat-sec"><h4>Họa tiết &amp; sticker pixel</h4>
  <label class="chk-row"><input type="checkbox" class="chk" data-pt="on" ${p.on?"checked":""}> Họa tiết pixel trên nền (mọi giao diện)</label>
  <div class="pat-sty">${Object.entries(PAT_STY).map(([k,l])=>`<button type="button" data-ps="${k}" aria-pressed="${p.style===k}" title="${l}">${k==="auto"||k==="none"?"":`<img src="${patTile(k,patCols(),{dens:1.6,size:.5,alpha:1,seed:11})}" alt="">`}<span>${l}</span></button>`).join("")}</div>
  <div class="pat-row"><label>Mật độ<input type="range" min=".3" max="3" step=".1" data-pr="dens" value="${p.dens}"></label><label>Cỡ<input type="range" min=".6" max="2.5" step=".1" data-pr="size" value="${p.size}"></label><label>Độ đậm<input type="range" min=".15" max="1" step=".05" data-pr="alpha" value="${p.alpha}"></label></div>
  <label class="chk-row"><input type="checkbox" class="chk" data-pt="tw" ${p.tw?"checked":""}> Lấp lánh (họa tiết nhấp nháy nhẹ)</label>
  <div class="pat-row"><div class="seg" role="radiogroup" aria-label="Màu họa tiết"><button role="radio" type="button" data-pc="auto" aria-checked="${p.col==="auto"}">Theo màu giao diện</button><button role="radio" type="button" data-pc="own" aria-checked="${p.col!=="auto"}">Tự chọn màu</button></div><span class="pat-cols" ${p.col==="auto"?"hidden":""}>${["c1","c2","c3"].map(k=>`<input type="color" data-pcol="${k}" value="${p[k]}" aria-label="Màu họa tiết">`).join("")}</span></div>
  <label class="chk-row"><input type="checkbox" class="chk" data-pt="stk" ${p.stk?"checked":""}> Sticker pixel đổi màu theo giao diện</label>
  <label class="chk-row"><input type="checkbox" class="chk" data-pt="ai" ${p.ai?"checked":""} ${P.sample?"":"disabled"}> AI nhận ra ảnh con vật / người để cho sticker chuyển động</label>
  <div style="display:flex;gap:6px;flex-wrap:wrap"><button class="pill-btn" type="button" id="patDeco">${ic("star")} Rắc sticker theo giao diện</button><button class="pill-btn" type="button" id="patStk">${ic("plus")} Thêm ảnh / GIF động</button></div>
  <p class="muted" style="font-size:12px;margin:0">Kiểu hiện tại: <b data-pcur>${PAT_STY[st]}</b>. Sticker GIF giữ nguyên chuyển động; khi trang trí, chọn sticker rồi bấm 🏃 để cho nó đi, chạy, nhảy, theo chuột…</p></div>`}
function bindPat(root){const re=()=>{applyPat();if(UI.pat.stk!==undefined)stkRecolor();const c=$("[data-pcur]",root);if(c)c.textContent=PAT_STY[patStyle()]};
  $$("[data-pt]",root).forEach(x=>x.onchange=()=>{UI.pat[x.dataset.pt]=x.checked;savePat();re();if(x.dataset.pt==="stk"&&UI.fly==="stk")renderFly()});
  $$("[data-ps]",root).forEach(b=>b.onclick=()=>{UI.pat.style=b.dataset.ps;if(b.dataset.ps!=="none")UI.pat.on=true;const on=$("[data-pt=on]",root);if(on)on.checked=UI.pat.on;$$("[data-ps]",root).forEach(y=>y.setAttribute("aria-pressed",y===b));savePat();re()});
  $$("[data-pr]",root).forEach(x=>{x.oninput=()=>{UI.pat[x.dataset.pr]=+x.value;clearTimeout(x._t);x._t=setTimeout(()=>{applyPat()},60)};x.onchange=savePat});
  $$("[data-pc]",root).forEach(b=>b.onclick=()=>{UI.pat.col=b.dataset.pc;$$("[data-pc]",root).forEach(y=>y.setAttribute("aria-checked",y===b));const pc=$(".pat-cols",root);if(pc)pc.hidden=UI.pat.col==="auto";savePat();re()});
  $$("[data-pcol]",root).forEach(x=>x.oninput=()=>{UI.pat[x.dataset.pcol]=x.value;UI.pat.col="own";clearTimeout(x._t);x._t=setTimeout(()=>{applyPat();savePat()},80)});
  $("#patDeco",root).onclick=()=>{autoDecorate()};
  $("#patStk",root).onclick=()=>{const i=document.createElement("input");i.type="file";i.accept="image/*,.gif";i.multiple=true;i.onchange=()=>importStickerFiles([...i.files]);i.click()}}
const _renderFly19=renderFly;renderFly=function(...a){const r=_renderFly19.apply(this,a);const f=$(".flyout");if(!f)return r;
  if(UI.fly==="skin"&&!$(".pat-sec",f)){const sec=document.createElement("div");sec.innerHTML=patPanelHTML();const box=sec.firstElementChild;const after=$(".skins",f);if(after)after.after(box);else f.appendChild(box);bindPat(box)}
  if(UI.fly==="stk"){const inp=$("#stkFile",f);if(inp)inp.accept="image/*,.gif";const sel=UI.selStk&&D.stickers.find(s=>s.id===UI.selStk);
    if(!$(".stk-mvsec",f)){const d=document.createElement("div");d.className="stk-mvsec";d.innerHTML=`<p class="muted" style="font-size:12px;margin:0">Ảnh <b>GIF</b> giữ nguyên chuyển động. Chọn một sticker đã dán rồi bấm <b>🏃</b> để cho nó đi, chạy, nhảy, theo chuột; bấm vào sticker để nó tương tác.</p><button class="pill-btn" id="stkDeco">${ic("star")} Rắc sticker theo giao diện</button>`;const tr=$("#myTray",f);(tr?tr.nextElementSibling||tr:f.lastElementChild).after(d);$("#stkDeco",d).onclick=autoDecorate}}
  return r};
{const _as19=applySkin;applySkin=function(k,quiet){const r=_as19.apply(this,arguments);try{if(document.body){applyPat();if(UI.pat.stk&&D&&D.stickers&&D.stickers.length)stkRecolor()}}catch(e){}return r}}
/* đồng bộ màu cảnh nền (syncTheme) cũng đổi màu họa tiết */
if(typeof syncTheme==="function"){const _st19=syncTheme;syncTheme=async function(...a){const r=await _st19.apply(this,a);try{applyPat();if(UI.pat.stk)stkRecolor()}catch(e){}return r}}
setTimeout(()=>{try{applyPat();renderStickers()}catch(e){}},300);

/* đổi màu sticker pixel tại chỗ (không vẽ lại toàn bộ → không giật, GIF và chuyển động không bị chạy lại) */
function stkRecolor(){$$("#decor .stk:not(.custom)").forEach(el=>{const st=D.stickers.find(s=>s.id===el.dataset.id);if(!st)return;const m=stkBase(st.k);const im=el.firstChild;if(m&&im&&im.getAttribute("src")!==m.url)im.src=m.url})}

/* =====================================================================
   v19 — STICKER ĐỘNG TRONG XƯỞNG CẮT GHÉP · GỘP CẮT GHÉP VÀO MỤC STICKER ·
   BẤM RA NGOÀI ĐỂ ĐÓNG BẢNG · BIỂU TƯỢNG Ô VUÔNG MỞ BẢNG TỔNG QUAN ·
   BỎ MỤC "BỐ CỤC & TOÀN MÀN HÌNH"
   ===================================================================== */
/* ---------- GIF: tách khung (ImageDecoder) và mã hóa lại (gifenc) ---------- */
async function gifFrames(blob){if(!("ImageDecoder" in window)||!blob)return null;
  try{const type=blob.type||"image/gif";if(ImageDecoder.isTypeSupported&&!(await ImageDecoder.isTypeSupported(type)))return null;const dec=new ImageDecoder({data:await blob.arrayBuffer(),type});await dec.tracks.ready;const tr=dec.tracks.selectedTrack;const n=tr?tr.frameCount:1;if(!tr||n<2){dec.close();return null}
    const out=[];for(let i=0;i<Math.min(n,150);i++){const {image}=await dec.decode({frameIndex:i});const c=document.createElement("canvas");c.width=image.displayWidth;c.height=image.displayHeight;c.getContext("2d").drawImage(image,0,0);out.push({c,d:Math.max(20,Math.round((image.duration||100000)/1000))});image.close()}
    dec.close();return out}catch(e){console.warn("gifFrames",e);return null}}
function encodeGif(frames){const {GIFEncoder,quantize,applyPalette}=window.GIFENC;const enc=GIFEncoder();
  frames.forEach(({c,d})=>{const {data,width,height}=c.getContext("2d").getImageData(0,0,c.width,c.height);for(let i=3;i<data.length;i+=4)data[i]=data[i]>100?255:0;
    const pal=quantize(data,256,{format:"rgba4444",oneBitAlpha:true});const idx=applyPalette(data,pal,"rgba4444");const ti=pal.findIndex(p=>p[3]===0);
    enc.writeFrame(idx,width,height,{palette:pal,delay:d,transparent:ti>=0,transparentIndex:ti>=0?ti:0,dispose:2})});
  enc.finish();return new Blob([enc.bytes()],{type:"image/gif"})}
async function saveGifSticker(blob,name,at,mv){if(blob.size>15e6){toast("GIF quá lớn (tối đa 15 MB)");return null}
  const src=await fileToURL(blob);const im=await loadImg(src);const W=im.naturalWidth||120,H=im.naturalHeight||120;let url=null,asset=null;
  if(P.assets&&!P.local){try{const up=await P.assets.upload(blob);url=up.url;asset=up.id}catch(e){}}
  if(!url){if(!P.local&&src.length>160000){toast("GIF hơi lớn để lưu ở đây — thử bớt khung hoặc thu nhỏ",4500);return null}url=src}
  const k=Math.min(1,180/Math.max(W,H));const item={id:mkid("cs"),url,asset,w:Math.max(8,Math.round(W/3*k)),h:Math.max(8,Math.round(H/3*k)),name:name||"GIF",anim:true,mv:mv&&mv!=="bob"?mv:undefined};
  D.custom.push(item);saveDecor();const st=addSticker("c:"+item.id,at||{});if(item.mv){st.mv=item.mv;renderStickers();saveDecor()}return item}
/* sticker riêng có sẵn kiểu chuyển động → khi dán ra cũng chuyển động như vậy */
{const _add20=addSticker;addSticker=function(k,o={}){const st=_add20(k,o);if(String(k).startsWith("c:")&&!st.mv){const c=D.custom.find(z=>"c:"+z.id===k);if(c&&c.mv){st.mv=c.mv;renderStickers();saveDecor()}}return st}}

/* ---------- thanh tiện ích: bỏ "Cắt ghép" (đã gộp vào Sticker) và "Bố cục & toàn màn hình" ---------- */
delete RAIL_ALL.cut;delete RAIL_ALL.lay;
{const d=UI.dash;if(d&&d.rail){d.rail.order=d.rail.order.filter(k=>RAIL_ALL[k]);d.rail.hidden=(d.rail.hidden||[]).filter(k=>RAIL_ALL[k])}}
RAIL_ALL.stk=["Sticker · cắt ghép · GIF động","star"];

/* ---------- mục Sticker có hai thẻ: Dán sticker | Cắt ghép & GIF ---------- */
UI.stkTab=local.get("stkTab","paste");
const _renderFly20=renderFly;renderFly=function(...a){const r=_renderFly20.apply(this,a);const f=$(".flyout");if(!f||UI.fly!=="stk"||$(".stk-tabs",f))return r;
  const h3=$("h3",f);const kids=[...f.children].filter(x=>x!==h3);const p1=document.createElement("div");p1.className="stk-pane";kids.forEach(k=>p1.appendChild(k));
  const p2=document.createElement("div");p2.className="stk-pane";
  p2.innerHTML=`<label class="cut-drop" id="cutDrop">${ic("cut")}<b>Thả ảnh hoặc GIF vào đây</b><span>hoặc bấm để chọn — mở xưởng cắt ghép: xóa nền, cắt theo hình, viền, pixel hóa, ghép nhiều lớp</span><input type="file" accept="image/*,.gif" multiple hidden id="cutFile"></label>
    <button class="pill-btn primary" id="cutOpen">${ic("cut")} Mở xưởng cắt ghép</button>
    <p class="muted" style="font-size:12px;margin:0">GIF vẫn chuyển động sau khi xóa nền, cắt, thêm viền. Có thể chọn kiểu chuyển động (đi, chạy, nhảy…) trước khi dán.</p>
    ${D.custom.length?`<h4 style="margin:4px 0 0;font-size:14px">Sửa lại sticker của bạn</h4><div class="stk-tray">${D.custom.map(c=>`<button data-cedit="${esc(c.id)}" class="custom" title="Mở trong xưởng cắt ghép"><img src="${esc(c.url)}" alt="" style="image-rendering:auto">${c.anim?`<i class="gif-tag">GIF</i>`:""}</button>`).join("")}</div>`:""}`;
  const tabs=document.createElement("div");tabs.className="rtab stk-tabs";tabs.setAttribute("role","tablist");tabs.innerHTML=`<button role="tab" data-stab="paste">${ic("star")} Dán sticker</button><button role="tab" data-stab="cut">${ic("cut")} Cắt ghép &amp; GIF</button>`;
  f.append(tabs,p1,p2);
  const show=t=>{UI.stkTab=t;local.set("stkTab",t);$$("[data-stab]",tabs).forEach(b=>b.setAttribute("aria-selected",b.dataset.stab===t));p1.hidden=t!=="paste";p2.hidden=t!=="cut"};show(UI.stkTab);
  $$("[data-stab]",tabs).forEach(b=>b.onclick=()=>show(b.dataset.stab));
  const go=async files=>{closeFly();openStickerStudio();await new Promise(r=>setTimeout(r,60));if(files&&files.length&&UI.studioAdd)UI.studioAdd(files)};
  $("#cutOpen",p2).onclick=()=>go(null);$("#cutFile",p2).onchange=e=>go([...e.target.files]);
  const dz=$("#cutDrop",p2);dz.addEventListener("dragover",e=>{e.preventDefault();dz.classList.add("over")});dz.addEventListener("dragleave",()=>dz.classList.remove("over"));dz.addEventListener("drop",e=>{e.preventDefault();e.stopPropagation();dz.classList.remove("over");go([...e.dataTransfer.files])});
  $$("[data-cedit]",p2).forEach(b=>b.onclick=async()=>{const c=D.custom.find(z=>z.id===b.dataset.cedit);if(!c)return;try{const bl=await (await fetch(c.url)).blob();go([new File([bl],(c.name||"sticker")+(c.anim?".gif":".png"),{type:bl.type||(c.anim?"image/gif":"image/png")})])}catch(e){toast("Không mở được sticker này")}});
  return r};

/* ---------- bấm ra ngoài → tự đóng bảng của thanh tiện ích / thanh công cụ ---------- */
document.addEventListener("pointerdown",e=>{if(!UI.fly)return;const t=e.target;if(!t.closest)return;
  if(t.closest(".flyout,#rail,.rail,.popmenu,#modal,#dlg,.stk-box,.decor-bar,.drag-ghost,.toast,.tip,.mobtabs"))return;
  if(UI.decorating&&(t.closest("#decor .stk")||UI.selStk))return;/* đang trang trí: lần bấm đầu chỉ bỏ chọn sticker */
  closeFly()},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&UI.fly&&!/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||"")&&$("#modal").hidden!==false&&($("#dlg")||{}).hidden!==false)closeFly()});

/* ---------- biểu tượng ô vuông → bảng TỔNG QUAN (lịch học, việc cần làm, môn học…) ---------- */
{const _railAct20=railAct;railAct=function(k,btn){if(k==="home"&&btn&&btn.classList&&btn.classList.contains("brand")){hideTip();if(UI.fly==="ov")return closeFly();UI.fly="ov";renderRail();renderFly();return}return _railAct20(k,btn)}}
{const _rr20=renderRail;renderRail=function(...a){const r=_rr20.apply(this,a);const b=$("#rail .brand");if(b){b.title="Tổng quan: lịch học, việc cần làm, môn học (chuột phải: đổi biểu tượng)";b.setAttribute("aria-label","Mở bảng tổng quan");b.setAttribute("aria-pressed",UI.fly==="ov")}return r}}
UI.ovDays=local.get("ovDays",7);
function ovHTML(){const now=new Date();const today=ymd(now);const rs=new Date(now);rs.setHours(0,0,0,0);const re=addD(rs,UI.ovDays);
  let evs=[];try{evs=calEvents(rs,re)}catch(e){}
  const byDay=new Map();for(let i=0;i<UI.ovDays;i++)byDay.set(ymd(addD(rs,i)),[]);evs.forEach(e=>{const k=ymd(e.st);if(byDay.has(k))byDay.get(k).push(e)});
  const tasks=UI.tasks.filter(t=>t.status!=="done").sort((a,b)=>(a.due||"9999")<(b.due||"9999")?-1:1);
  const late=tasks.filter(t=>t.due&&t.due<today),soon=tasks.filter(t=>t.due&&t.due>=today&&t.due<=ymd(addD(rs,7))),later=tasks.filter(t=>!t.due||t.due>ymd(addD(rs,7)));
  const done=UI.tasks.filter(t=>t.status==="done").length,tot=UI.tasks.length;
  const tm=d=>d.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});
  const trow=t=>{const s=subjOf(t.subj);const lt=t.due&&t.due<today;return `<label class="ov-task ${lt?"late":""}"><input type="checkbox" class="chk" data-ovt="${esc(t.id)}"><span class="nm">${esc(t.title)}</span>${s?`<i class="tag" style="background:${s.color}">${esc(s.code||s.title)}</i>`:""}<small>${t.due?(lt?"quá hạn · ":"")+new Date(t.due+"T00:00:00").toLocaleDateString("vi-VN",{weekday:"short",day:"numeric",month:"numeric"}):"chưa đặt hạn"}</small></label>`};
  const subs=[...UI.subjs].sort((a,b)=>(a.order||0)-(b.order||0));
  const nbs=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,6);
  return `<h3>${ic("home")} Tổng quan<span class="muted ov-date">${now.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long"})}</span><button class="ghost ic x" data-fx aria-label="Đóng">${ic("close")}</button></h3>
  <div class="ov-stats"><div><b>${tasks.length}</b><span>việc cần làm</span></div><div class="${late.length?"bad":""}"><b>${late.length}</b><span>quá hạn</span></div><div><b>${evs.filter(e=>ymd(e.st)===today).length}</b><span>lịch hôm nay</span></div><div><b>${subs.length}</b><span>môn học</span></div><div><b>${tot?Math.round(done/tot*100):0}%</b><span>đã hoàn thành</span></div></div>
  <div class="ov-grid">
   <section class="ov-col ov-cal"><div class="ov-h"><b>${ic("cal")} Lịch học</b><div class="seg" role="radiogroup" aria-label="Số ngày">${[[3,"3 ngày"],[7,"Tuần"],[14,"2 tuần"]].map(([n,l])=>`<button role="radio" data-ovd="${n}" aria-checked="${UI.ovDays===n}">${l}</button>`).join("")}</div></div>
    <div class="ov-days">${[...byDay.entries()].map(([d,L])=>{const dd=new Date(d+"T00:00:00");return `<div class="ov-day ${d===today?"today":""}"><div class="dh"><b>${d===today?"Hôm nay":dd.toLocaleDateString("vi-VN",{weekday:"long"})}</b><small>${dd.toLocaleDateString("vi-VN",{day:"numeric",month:"numeric"})}</small></div>${L.length?L.map(e=>`<button class="ov-ev" data-ovk="${e.k}" ${e.nb?`data-ovnb="${esc(e.nb)}"`:""} ${e.link?`data-ovl="${esc(e.link)}"`:""} style="--c:${e.c}"><i></i><span class="t">${e.all?"Cả ngày":tm(e.st)}</span><span class="nm">${esc(e.t)}</span>${e.cal?`<small>${esc(e.cal)}</small>`:""}</button>`).join(""):`<span class="muted ov-none">Trống</span>`}</div>`}).join("")}</div>
    <div class="ov-acts"><button class="btn" data-ova="cal">${ic("cal")} Mở lịch đầy đủ</button><button class="btn" data-ova="ev">${ic("plus")} Thêm sự kiện</button></div></section>
   <section class="ov-col"><div class="ov-h"><b>${ic("check")} Việc cần làm</b><button class="btn" data-ova="task">${ic("plus")} Thêm</button></div>
    ${late.length?`<div class="ov-grp bad">Quá hạn</div>${late.map(trow).join("")}`:""}${soon.length?`<div class="ov-grp">7 ngày tới</div>${soon.map(trow).join("")}`:""}${later.length?`<div class="ov-grp">Sau đó / chưa có hạn</div>${later.slice(0,12).map(trow).join("")}`:""}${tasks.length?"":`<div class="ov-empty">Không còn việc nào ♡</div>`}</section>
   <section class="ov-col"><div class="ov-h"><b>${ic("book")} Môn học</b><button class="btn" data-ova="subj">${ic("plus")} Môn mới</button></div>
    ${subs.length?subs.map(s=>{const T=UI.tasks.filter(t=>t.subj===s.id),dn=T.filter(t=>t.status==="done").length,n=nbsOf(s.id).length;const pc=T.length?Math.round(dn/T.length*100):0;return `<button class="ov-subj" data-ovs="${esc(s.id)}" style="--c:${s.color}"><i class="dot"></i><span class="nm"><b>${esc(s.title)}</b><small>${n} bài học · ${T.length-dn} việc còn lại</small></span><span class="pc"><i style="width:${pc}%"></i></span><small class="pcn">${pc}%</small></button>`}).join(""):`<div class="ov-empty">Chưa có môn học.</div>`}
    ${nbs.length?`<div class="ov-grp">Bài học gần đây</div>${nbs.map(n=>`<button class="ov-nb" data-ovn="${esc(n.id)}">${ic("file")}<span class="nm">${esc(n.title)}</span><small>${n.srcCount||0} nguồn</small></button>`).join("")}`:""}
    <div class="ov-mail" id="ovMail"></div></section>
  </div>`}
async function ovMail(f){const box=$("#ovMail",f);if(!box||typeof gmStatus!=="function")return;const st=await gmStatus();if(st!=="ok"){box.innerHTML="";return}
  try{const r=await gmCall("search_threads",{query:"is:unread in:inbox",pageSize:4});const th=(r.threads||[]).map(t=>{const ms=(t.messages||[]).map(gmNorm);const l=ms[ms.length-1]||{};return {id:t.id,s:(ms[0]||l).subject||"(Không tiêu đề)",f:gmName(l.from)}});if(!$("#ovMail"))return;
    box.innerHTML=`<div class="ov-grp">${ic("mail")} Gmail chưa đọc</div>${th.length?th.map(t=>`<button class="ov-nb" data-ovm="${esc(t.id)}">${ic("mail")}<span class="nm">${esc(t.s)}</span><small>${esc(t.f)}</small></button>`).join(""):`<span class="muted" style="font-size:12.5px">Không có thư mới.</span>`}`;
    $$("[data-ovm]",box).forEach(b=>b.onclick=()=>{closeFly();openMailHub(b.dataset.ovm)})}catch(e){box.innerHTML=""}}
function bindOv(f){
  $("[data-fx]",f).onclick=closeFly;
  $$("[data-ovd]",f).forEach(b=>b.onclick=()=>{UI.ovDays=+b.dataset.ovd;local.set("ovDays",UI.ovDays);renderFly()});
  $$("[data-ovt]",f).forEach(x=>x.onchange=()=>{Store.patch(x.dataset.ovt,{status:x.checked?"done":"todo"});const row=x.closest(".ov-task");if(row)row.classList.add("gone");toast("Đã đánh dấu xong ✓",1600)});
  $$("[data-ovs]",f).forEach(b=>b.onclick=()=>{closeFly();openSubject(b.dataset.ovs)});
  $$("[data-ovn]",f).forEach(b=>b.onclick=()=>{closeFly();openNotebook(b.dataset.ovn)});
  $$(".ov-ev",f).forEach(b=>b.onclick=()=>{if(b.dataset.ovl){window.open(b.dataset.ovl,"_blank","noopener");return}if(b.dataset.ovnb){closeFly();openNotebook(b.dataset.ovnb);return}closeFly();goCal()});
  const act={cal:()=>{closeFly();goCal()},ev:()=>{closeFly();eventDialog({date:ymd(new Date()),start:"19:00"})},task:()=>{closeFly();taskDialog()},subj:()=>{closeFly();subjectDialog()}};
  $$("[data-ova]",f).forEach(b=>b.onclick=()=>act[b.dataset.ova]&&act[b.dataset.ova]());
  ovMail(f)}
{const _rf20b=renderFly;renderFly=function(...a){const old=$(".flyout.ov-fly");const top=old?old.scrollTop:0;const r=_rf20b.apply(this,a);if(UI.fly!=="ov")return r;let f=$(".flyout");if(!f){f=document.createElement("div");f.className="flyout";document.body.appendChild(f)}f.classList.add("ov-fly");f.dataset.k="ov";f.innerHTML=ovHTML();bindOv(f);if(old){f.classList.add("noanim");f.scrollTop=top}return r}}
/* dữ liệu đổi (đánh dấu việc xong, thêm lịch…) → bảng tổng quan cập nhật, giữ vị trí cuộn */
setInterval(()=>{if(UI.fly!=="ov")return;const f=$(".flyout.ov-fly");if(!f||f.matches(":hover"))return;const k=JSON.stringify([UI.tasks.map(t=>t.id+t.status+t.due),UI.subjs.length,UI.nbs.length]);if(f._k&&f._k!==k)renderFly();f._k=k},2500);
setTimeout(()=>{try{renderRail()}catch(e){}},90);

/* =====================================================================
   v20 — KHỐI KIỂU NOTION (⋮⋮ kéo/menu · ＋ thêm khối có ô lọc) cho TRANG CHỦ và
   bảng TỔNG QUAN · Tổng quan kéo thả, đổi cỡ, thêm/ẩn, đưa sang trang chủ ·
   STICKER GẮN VỚI TỪNG GIAO DIỆN và CUỘN THEO TRANG
   ===================================================================== */
/* ---------- tiện ích chung ---------- */
const W_SEQ=[2,3,4,6];const W_NAME={2:"⅓",3:"½",4:"⅔",6:"Rộng"};
function nbMenuFilter(anchor,{title,items,onPick,hint}){/* items: [{k,l,i,g}] */
  const m=popMenu(anchor,`<div class="nbf"><input class="input nbf-q" placeholder="Gõ để lọc…" aria-label="Lọc khối"><div class="nbf-list"></div>${hint?`<div class="nbf-hint">${hint}</div>`:""}</div>`);m.classList.add("nbf-pop");m.addEventListener("click",e=>e.stopPropagation());
  const q=$(".nbf-q",m),L=$(".nbf-list",m);let sel=0;
  const draw=()=>{const s=q.value.trim().toLowerCase();const it=items.filter(x=>!s||(x.l+" "+(x.g||"")).toLowerCase().includes(s));let last="";
    L.innerHTML=it.length?it.map((x,i)=>{const h=x.g!==last?`<div class="nbf-g">${esc(x.g||"")}</div>`:"";last=x.g;return h+`<button data-nbf="${i}" class="${i===sel?"on":""}">${ic(x.i||"plus")}<span>${esc(x.l)}</span>${x.d?`<small>${esc(x.d)}</small>`:""}</button>`}).join(""):`<div class="muted" style="padding:8px;font-size:13px">Không có khối nào khớp</div>`;
    $$("[data-nbf]",L).forEach(b=>b.onclick=e=>{closePop();onPick(it[+b.dataset.nbf],e)});L._it=it};
  q.oninput=()=>{sel=0;draw()};q.onkeydown=e=>{const it=L._it||[];if(e.key==="ArrowDown"){e.preventDefault();sel=Math.min(it.length-1,sel+1);draw()}else if(e.key==="ArrowUp"){e.preventDefault();sel=Math.max(0,sel-1);draw()}else if(e.key==="Enter"){e.preventDefault();if(it[sel]){closePop();onPick(it[sel],e)}}else if(e.key==="Escape")closePop()};
  draw();setTimeout(()=>q.focus(),0);
  const r=anchor.getBoundingClientRect();m.style.left=Math.max(8,Math.min(innerWidth-m.offsetWidth-8,r.left))+"px";m.style.top=Math.max(8,Math.min(innerHeight-m.offsetHeight-8,r.bottom+4))+"px";return m}
/* kéo đổi chỗ chung cho lưới khối (Tổng quan) */
function dragReorder(e,el,grid,sel,onDone){e.preventDefault();const r=el.getBoundingClientRect();const ph=document.createElement("div");ph.className="blk-ph";ph.style.cssText=`grid-column:span ${el.style.getPropertyValue("--w")||6};height:${r.height}px`;el.before(ph);
  el.classList.add("lifted");el.style.width=r.width+"px";el.style.height=r.height+"px";el.style.left=r.left+"px";el.style.top=r.top+"px";el.style.position="fixed";el.style.zIndex=90;document.body.appendChild(el);
  const ox=e.clientX-r.left,oy=e.clientY-r.top;let px=e.clientX,py=e.clientY,raf=0;
  const tick=()=>{raf=0;el.style.transform=`translate(${px-ox-r.left}px,${py-oy-r.top}px) rotate(.6deg)`;const t=$$(sel,grid).find(s=>s!==el&&(()=>{const q=s.getBoundingClientRect();return px>=q.left&&px<=q.right&&py>=q.top&&py<=q.bottom})());
    if(t){const q=t.getBoundingClientRect();const after=q.width>grid.clientWidth*.8?py>q.top+q.height/2:px>q.left+q.width/2;const want=after?t.nextSibling:t;if(want!==ph&&ph.nextSibling!==want)grid.insertBefore(ph,want)}
    const sc=grid.closest(".flyout")||grid.parentElement;const sr=sc.getBoundingClientRect();if(py<sr.top+40)sc.scrollTop-=10;else if(py>sr.bottom-40)sc.scrollTop+=10};
  const mv=ev=>{px=ev.clientX;py=ev.clientY;if(!raf)raf=requestAnimationFrame(tick)};
  const up=()=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);cancelAnimationFrame(raf);el.classList.remove("lifted");el.style.cssText=`--w:${el.dataset.w||6}`;ph.replaceWith(el);onDone($$(sel,grid).map(x=>x.dataset.id))};
  addEventListener("pointermove",mv);addEventListener("pointerup",up);addEventListener("pointercancel",up);tick()}
/* nút ⋮⋮: kéo nếu di chuột, bấm để mở menu */
function gripBind(btn,{drag,menu}){btn.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;e.stopPropagation();const x0=e.clientX,y0=e.clientY;let started=false;
  const mv=ev=>{if(!started&&Math.hypot(ev.clientX-x0,ev.clientY-y0)>5){started=true;cleanup();drag({clientX:ev.clientX,clientY:ev.clientY,button:0,pointerType:ev.pointerType,preventDefault(){}})}};
  const upf=()=>{cleanup();btn._dragged=started};const cleanup=()=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",upf)};addEventListener("pointermove",mv);addEventListener("pointerup",upf)});
  btn.addEventListener("click",e=>{e.stopPropagation();if(btn._dragged){btn._dragged=false;return}menu(btn)})}

/* =====================================================================
   TỔNG QUAN = lưới khối riêng
   ===================================================================== */
const OV_TO_HOME={cal:"cal",tasks:"tasks",subjects:"courses",recent:"recent",mail:"w:mail",week:"week"};
const HOME_TO_OV={cal:"cal",tasks:"tasks",week:"week",courses:"subjects",recent:"recent","w:mail":"mail"};
const OV_DEF=()=>[{id:"o1",k:"stats",w:6},{id:"o2",k:"cal",w:2},{id:"o3",k:"tasks",w:2},{id:"o4",k:"subjects",w:2}];
UI.ovDash=(()=>{const d=local.get("ovDash",null);return Array.isArray(d)&&d.length?d:OV_DEF()})();
const saveOv=()=>local.set("ovDash",UI.ovDash);
const ovToday=()=>ymd(new Date());
function ovTaskRow(t){const today=ovToday();const s=subjOf(t.subj);const lt=t.due&&t.due<today;return `<label class="ov-task ${lt?"late":""}"><input type="checkbox" class="chk" data-ovt="${esc(t.id)}"><span class="nm">${esc(t.title)}</span>${s?`<i class="tag" style="background:${s.color}">${esc(s.code||s.title)}</i>`:""}<small>${t.due?(lt?"quá hạn · ":"")+new Date(t.due+"T00:00:00").toLocaleDateString("vi-VN",{weekday:"short",day:"numeric",month:"numeric"}):"chưa đặt hạn"}</small></label>`}
const OV_BLK={
 stats:{l:"Số liệu nhanh",i:"chart",w:6,g:"Tổng quan",body(el){const today=ovToday();const rs=new Date();rs.setHours(0,0,0,0);let evs=[];try{evs=calEvents(rs,addD(rs,1))}catch(e){}
   const tasks=UI.tasks.filter(t=>t.status!=="done"),late=tasks.filter(t=>t.due&&t.due<today),done=UI.tasks.length-tasks.length;
   el.innerHTML=`<div class="ov-stats"><div><b>${tasks.length}</b><span>việc cần làm</span></div><div class="${late.length?"bad":""}"><b>${late.length}</b><span>quá hạn</span></div><div><b>${evs.length}</b><span>lịch hôm nay</span></div><div><b>${UI.subjs.length}</b><span>môn học</span></div><div><b>${UI.tasks.length?Math.round(done/UI.tasks.length*100):0}%</b><span>đã hoàn thành</span></div></div>`}},
 cal:{l:"Lịch học",i:"cal",w:2,g:"Tổng quan",act:b=>`<div class="seg" role="radiogroup" aria-label="Số ngày">${[[3,"3 ngày"],[7,"Tuần"],[14,"2 tuần"]].map(([n,l])=>`<button role="radio" data-ovd="${n}" aria-checked="${(b.days||7)===n}">${l}</button>`).join("")}</div>`,
  body(el,b){const n=b.days||7;const today=ovToday();const rs=new Date();rs.setHours(0,0,0,0);let evs=[];try{evs=calEvents(rs,addD(rs,n))}catch(e){}const by=new Map();for(let i=0;i<n;i++)by.set(ymd(addD(rs,i)),[]);evs.forEach(e=>{const k=ymd(e.st);if(by.has(k))by.get(k).push(e)});
   const tm=d=>d.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});
   el.innerHTML=`<div class="ov-days">${[...by.entries()].map(([d,L])=>{const dd=new Date(d+"T00:00:00");return `<div class="ov-day ${d===today?"today":""}"><div class="dh"><b>${d===today?"Hôm nay":dd.toLocaleDateString("vi-VN",{weekday:"long"})}</b><small>${dd.toLocaleDateString("vi-VN",{day:"numeric",month:"numeric"})}</small></div>${L.length?L.map(e=>`<button class="ov-ev" ${e.nb?`data-ovnb="${esc(e.nb)}"`:""} ${e.link?`data-ovl="${esc(e.link)}"`:""} style="--c:${e.c}"><i></i><span class="t">${e.all?"Cả ngày":tm(e.st)}</span><span class="nm">${esc(e.t)}</span>${e.cal?`<small>${esc(e.cal)}</small>`:""}</button>`).join(""):`<span class="muted ov-none">Trống</span>`}</div>`}).join("")}</div>
    <div class="ov-acts"><button class="btn" data-ova="cal">${ic("cal")} Mở lịch đầy đủ</button><button class="btn" data-ova="ev">${ic("plus")} Thêm sự kiện</button></div>`}},
 tasks:{l:"Việc cần làm",i:"check",w:2,g:"Tổng quan",act:()=>`<button class="btn" data-ova="task">${ic("plus")} Thêm</button>`,body(el){const today=ovToday();const rs=new Date();rs.setHours(0,0,0,0);const wk=ymd(addD(rs,7));
   const T=UI.tasks.filter(t=>t.status!=="done").sort((a,b)=>(a.due||"9999")<(b.due||"9999")?-1:1);const late=T.filter(t=>t.due&&t.due<today),soon=T.filter(t=>t.due&&t.due>=today&&t.due<=wk),later=T.filter(t=>!t.due||t.due>wk);
   el.innerHTML=`${late.length?`<div class="ov-grp bad">Quá hạn</div>${late.map(ovTaskRow).join("")}`:""}${soon.length?`<div class="ov-grp">7 ngày tới</div>${soon.map(ovTaskRow).join("")}`:""}${later.length?`<div class="ov-grp">Sau đó / chưa có hạn</div>${later.slice(0,12).map(ovTaskRow).join("")}`:""}${T.length?"":`<div class="ov-empty">Không còn việc nào ♡</div>`}`}},
 week:{l:"Tuần này theo ngày",i:"note",w:6,g:"Tổng quan",body(el){const now=new Date(),wk=monday(now);el.innerHTML=`<div class="ov-week">${WD.map((d,i)=>{const day=addD(wk,i),ds=ymd(day);const its=UI.tasks.filter(t=>t.due===ds);return `<div class="ov-wd ${ds===ymd(now)?"today":""}"><b>${d}</b><small>${day.getDate()}/${day.getMonth()+1}</small>${its.map(t=>`<span class="${t.status==="done"?"done":""}">${esc(t.title)}</span>`).join("")||`<i class="muted">—</i>`}</div>`}).join("")}</div>`}},
 subjects:{l:"Môn học",i:"book",w:2,g:"Tổng quan",act:()=>`<button class="btn" data-ova="subj">${ic("plus")} Môn mới</button>`,body(el){const subs=[...UI.subjs].sort((a,b)=>(a.order||0)-(b.order||0));
   el.innerHTML=subs.length?subs.map(s=>{const T=UI.tasks.filter(t=>t.subj===s.id),dn=T.filter(t=>t.status==="done").length,n=nbsOf(s.id).length;const pc=T.length?Math.round(dn/T.length*100):0;return `<button class="ov-subj" data-ovs="${esc(s.id)}" style="--c:${s.color}"><i class="dot"></i><span class="nm"><b>${esc(s.title)}</b><small>${n} bài học · ${T.length-dn} việc còn lại</small></span><span class="pc"><i style="width:${pc}%"></i></span><small class="pcn">${pc}%</small></button>`}).join(""):`<div class="ov-empty">Chưa có môn học.</div>`}},
 recent:{l:"Bài học gần đây",i:"file",w:2,g:"Tổng quan",body(el){const nbs=[...UI.nbs].sort((a,b)=>(b.updated||0)-(a.updated||0)).slice(0,8);el.innerHTML=nbs.length?nbs.map(n=>`<button class="ov-nb" data-ovn="${esc(n.id)}">${ic("file")}<span class="nm">${esc(n.title)}</span><small>${n.srcCount||0} nguồn</small></button>`).join(""):`<div class="ov-empty">Chưa có bài học.</div>`}},
 mail:{l:"Gmail chưa đọc",i:"mail",w:2,g:"Tổng quan",body(el){el.innerHTML=`<div class="muted" style="font-size:12.5px"><span class="spin"></span> Đang tải…</div>`;(async()=>{if(typeof gmStatus!=="function"||(await gmStatus())!=="ok"){el.innerHTML=`<button class="btn" data-ovmail>${ic("mail")} Liên kết Gmail</button>`;const b=$("[data-ovmail]",el);if(b)b.onclick=()=>{closeFly();openMailHub()};return}
   try{const r=await gmCall("search_threads",{query:"is:unread in:inbox",pageSize:5});const th=(r.threads||[]).map(t=>{const ms=(t.messages||[]).map(gmNorm);const l=ms[ms.length-1]||{};return {id:t.id,s:(ms[0]||l).subject||"(Không tiêu đề)",f:gmName(l.from)}});
     el.innerHTML=th.length?th.map(t=>`<button class="ov-nb" data-ovm="${esc(t.id)}">${ic("mail")}<span class="nm">${esc(t.s)}</span><small>${esc(t.f)}</small></button>`).join(""):`<span class="muted" style="font-size:12.5px">Không có thư mới ♡</span>`;$$("[data-ovm]",el).forEach(b=>b.onclick=()=>{closeFly();openMailHub(b.dataset.ovm)})}catch(e){el.innerHTML=`<span class="muted" style="font-size:12.5px">${esc(gmErr(e))}</span>`}})()}},
 note:{l:"Ghi chú nhanh",i:"edit",w:2,g:"Khác",multi:true,body(el,b){el.innerHTML=`<textarea class="ov-note" placeholder="Ghi nhanh việc cần nhớ…" aria-label="Ghi chú nhanh">${esc(local.get("ovNote:"+b.id,""))}</textarea>`;const ta=$("textarea",el);ta.oninput=()=>{clearTimeout(ta._t);ta._t=setTimeout(()=>local.set("ovNote:"+b.id,ta.value.slice(0,4000)),300)}}},
 focus:{l:"Hẹn giờ tập trung",i:"clock",w:2,g:"Khác",body(el,b){let left=(b.min||25)*60,run=false,iv=0;const draw=()=>{const m=String(Math.floor(left/60)).padStart(2,"0"),s=String(left%60).padStart(2,"0");el.innerHTML=`<div class="ov-focus"><b>${m}:${s}</b><div><button class="btn" data-f="go">${run?"Tạm dừng":"Bắt đầu"}</button><button class="btn" data-f="rs">Đặt lại</button><button class="btn" data-f="len">${b.min||25} phút</button></div></div>`;
   $("[data-f=go]",el).onclick=()=>{run=!run;if(run){iv=setInterval(()=>{if(!document.body.contains(el)){clearInterval(iv);return}left--;if(left<=0){clearInterval(iv);run=false;left=(b.min||25)*60;try{beep()}catch(e){}toast("Hết giờ tập trung — nghỉ chút nhé!",4000)}draw()},1000)}else clearInterval(iv);draw()};
   $("[data-f=rs]",el).onclick=()=>{clearInterval(iv);run=false;left=(b.min||25)*60;draw()};$("[data-f=len]",el).onclick=()=>{b.min=(b.min||25)===25?50:(b.min===50?15:25);saveOv();clearInterval(iv);run=false;left=b.min*60;draw()}};draw()}}
};
function ovAddItems(){const have=new Set(UI.ovDash.map(b=>b.k));return Object.entries(OV_BLK).filter(([k,d])=>d.multi||!have.has(k)).map(([k,d])=>({k,l:d.l,i:d.i,g:d.g,d:OV_TO_HOME[k]?"có thể đưa sang trang chủ":""}))}
function ovInsert(k,refId,before){const d=OV_BLK[k];if(!d)return;const nb={id:mkid("o"),k,w:d.w};let i=UI.ovDash.findIndex(b=>b.id===refId);if(i<0)i=UI.ovDash.length-1;UI.ovDash.splice(before?i:i+1,0,nb);saveOv();renderFly();setTimeout(()=>{const el=$(`.ov-blk[data-id="${nb.id}"]`);if(el){el.classList.add("pop-in");el.scrollIntoView({block:"nearest"})}},40)}
function homeHas(k){return UI.dash&&UI.dash.blocks.some(b=>b.k===k)}
function addToHome(hk){if(!hk)return;if(homeHas(hk)){const b=UI.dash.blocks.find(x=>x.k===hk);if(b&&b.m){b.m=false;saveDash()}toast("Khối này đã có trên trang chủ");return}
  if(hk.startsWith("w:"))setWidgetMode(hk.slice(2),"dash");else{UI.dash.blocks.push({id:mkid("b"),k:hk,w:BLK[hk]?BLK[hk].w:6});saveDash()}if(UI.view==="home")renderHome();toast("Đã thêm vào trang chủ")}
function ovBlockMenu(anchor,b){const d=OV_BLK[b.k];const hk=OV_TO_HOME[b.k];const m=popMenu(anchor,`<div class="who">${esc(d.l)}</div>
   <div class="nbw">${W_SEQ.map(w=>`<button data-ow="${w}" aria-pressed="${b.w===w}">${W_NAME[w]}</button>`).join("")}</div>
   <button data-om="col">${ic(b.c?"expand":"min")}${b.c?"Mở rộng khối":"Rút gọn khối"}</button>
   <button data-om="dup">${ic("dup")}Nhân bản<small class="kbd">Ctrl+D</small></button>
   <button data-om="up">${ic("up")}Lên trên</button><button data-om="down">${ic("down")}Xuống dưới</button>
   ${hk?`<button data-om="home">${ic("home")}${homeHas(hk)?"Đã có ở trang chủ":"Thêm vào trang chủ"}</button>`:""}
   <div class="sep"></div><button data-om="del" style="color:var(--bad)">${ic("trash")}Ẩn khỏi Tổng quan<small class="kbd">Del</small></button>`);
  m.addEventListener("click",e=>e.stopPropagation());
  $$("[data-ow]",m).forEach(x=>x.onclick=()=>{b.w=+x.dataset.ow;saveOv();closePop();renderFly()});
  const act=a=>{const i=UI.ovDash.indexOf(b);if(a==="col")b.c=!b.c;if(a==="dup"){UI.ovDash.splice(i+1,0,{...b,id:mkid("o")})}if(a==="up"&&i>0)[UI.ovDash[i-1],UI.ovDash[i]]=[UI.ovDash[i],UI.ovDash[i-1]];if(a==="down"&&i<UI.ovDash.length-1)[UI.ovDash[i+1],UI.ovDash[i]]=[UI.ovDash[i],UI.ovDash[i+1]];
    if(a==="home"){closePop();return addToHome(hk)}if(a==="del"){UI.ovDash=UI.ovDash.filter(x=>x!==b);toast("Đã ẩn — bấm ＋ để thêm lại")}saveOv();closePop();renderFly()};
  $$("[data-om]",m).forEach(x=>x.onclick=()=>act(x.dataset.om));
  const key=e=>{if(!document.body.contains(m)){removeEventListener("keydown",key);return}if(e.key==="Delete"){e.preventDefault();act("del")}else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="d"){e.preventDefault();act("dup")}};addEventListener("keydown",key)}
ovHTML=function(){const now=new Date();return `<h3>${ic("home")} Tổng quan<span class="muted ov-date">${now.toLocaleDateString("vi-VN",{weekday:"long",day:"numeric",month:"long"})}</span><button class="ghost ic" data-ovadd title="Thêm khối" aria-label="Thêm khối">${ic("plus")}</button><button class="ghost ic x" data-fx aria-label="Đóng">${ic("close")}</button></h3>
  <div class="ov-tip muted">Rê chuột lên khối: <b>⋮⋮</b> kéo để đổi chỗ, bấm để chọn cỡ / ẩn / thêm vào trang chủ · <b>＋</b> thêm khối</div>
  <div class="ov-grid2" id="ovGrid">${UI.ovDash.map(b=>{const d=OV_BLK[b.k];if(!d)return"";return `<section class="ov-blk ${b.c?"collapsed":""}" data-id="${esc(b.id)}" data-w="${b.w}" style="--w:${b.w}"><div class="nbh"><button class="nbh-add" data-nadd="${esc(b.id)}" title="Bấm: thêm khối bên dưới · Alt+bấm: thêm bên trên" aria-label="Thêm khối">${ic("plus")}</button><button class="nbh-grip" data-ngrip="${esc(b.id)}" title="Kéo để di chuyển · bấm để mở menu" aria-label="Di chuyển hoặc mở menu khối">⋮⋮</button></div>
    <div class="ov-h"><b>${ic(d.i)} ${esc(d.l)}</b><span class="grow"></span>${b.c?"":(d.act?d.act(b):"")}<button class="ghost ic ov-col" data-ocol="${esc(b.id)}" aria-label="${b.c?"Mở rộng":"Rút gọn"}" title="${b.c?"Mở rộng":"Rút gọn"}"><svg viewBox="0 0 24 24" class="i chev"><path d="M6 9l6 6 6-6"/></svg></button><button class="ghost ic ov-x" data-ox="${esc(b.id)}" aria-label="Ẩn khối" title="Ẩn khối">${ic("close")}</button></div><div class="ov-b" data-ob="${esc(b.id)}"></div></section>`}).join("")}
   <button class="ov-addblk" data-ovadd2 style="--w:6">${ic("plus")} Thêm khối vào Tổng quan</button></div>`};
bindOv=function(f){
  $("[data-fx]",f).onclick=closeFly;
  UI.ovDash.forEach(b=>{const d=OV_BLK[b.k];const el=$(`[data-ob="${CSS.escape(b.id)}"]`,f);if(!d||!el||b.c)return;try{d.body(el,b)}catch(e){el.innerHTML=`<div class="warnbox">${esc(e.message||String(e))}</div>`}});
  const B=id=>UI.ovDash.find(b=>b.id===id);
  const openAdd=(anchor,ref,before)=>nbMenuFilter(anchor,{items:ovAddItems(),hint:"Enter để chọn · Alt+bấm ＋ để thêm phía trên",onPick:it=>ovInsert(it.k,ref,before)});
  $$("[data-nadd]",f).forEach(x=>x.onclick=e=>{e.stopPropagation();openAdd(x,x.dataset.nadd,e.altKey)});
  const ad=$("[data-ovadd]",f);if(ad)ad.onclick=e=>{e.stopPropagation();openAdd(ad,null,false)};const ad2=$("[data-ovadd2]",f);if(ad2)ad2.onclick=e=>{e.stopPropagation();openAdd(ad2,null,false)};
  $$("[data-ngrip]",f).forEach(x=>{const b=B(x.dataset.ngrip);const el=x.closest(".ov-blk");gripBind(x,{drag:ev=>dragReorder(ev,el,$("#ovGrid",f),".ov-blk",ids=>{UI.ovDash=ids.map(B).filter(Boolean);saveOv()}),menu:a=>ovBlockMenu(a,b)})});
  $$("[data-ocol]",f).forEach(x=>x.onclick=e=>{e.stopPropagation();const b=B(x.dataset.ocol);b.c=!b.c;saveOv();renderFly()});
  $$("[data-ox]",f).forEach(x=>x.onclick=e=>{e.stopPropagation();UI.ovDash=UI.ovDash.filter(b=>b.id!==x.dataset.ox);saveOv();renderFly();toast("Đã ẩn — bấm ＋ để thêm lại")});
  $$(".ov-h",f).forEach(h=>h.addEventListener("dblclick",e=>{if(e.target.closest("button,input"))return;const c=$("[data-ocol]",h);if(c)c.click()}));
  $$("[data-ovd]",f).forEach(x=>x.onclick=()=>{const b=B(x.closest(".ov-blk").dataset.id);b.days=+x.dataset.ovd;saveOv();renderFly()});
  $$("[data-ovt]",f).forEach(x=>x.onchange=()=>{Store.patch(x.dataset.ovt,{status:x.checked?"done":"todo"});const row=x.closest(".ov-task");if(row)row.classList.add("gone");toast("Đã đánh dấu xong ✓",1600)});
  $$("[data-ovs]",f).forEach(x=>x.onclick=()=>{closeFly();openSubject(x.dataset.ovs)});
  $$("[data-ovn]",f).forEach(x=>x.onclick=()=>{closeFly();openNotebook(x.dataset.ovn)});
  $$(".ov-ev",f).forEach(x=>x.onclick=()=>{if(x.dataset.ovl){window.open(x.dataset.ovl,"_blank","noopener");return}if(x.dataset.ovnb){closeFly();openNotebook(x.dataset.ovnb);return}closeFly();goCal()});
  const act={cal:()=>{closeFly();goCal()},ev:()=>{closeFly();eventDialog({date:ymd(new Date()),start:"19:00"})},task:()=>{closeFly();taskDialog()},subj:()=>{closeFly();subjectDialog()}};
  $$("[data-ova]",f).forEach(x=>x.onclick=()=>act[x.dataset.ova]&&act[x.dataset.ova]())};

/* =====================================================================
   TRANG CHỦ: tay cầm kiểu Notion cho từng khối
   ===================================================================== */
function homeAddItems(){const it=[...Object.keys(BLK).filter(k=>!homeHas(k)).map(k=>({k,l:BLK[k].l,i:BLK[k].i,g:"Khối học tập"})),...Object.keys(WIDGETS).filter(k=>!homeHas("w:"+k)).map(k=>({k:"w:"+k,l:WIDGETS[k].title,i:"widget",g:"Widget",d:WIDGETS[k].desc}))];return it}
function homeInsert(k,refId,before){if(homeHas(k)){toast("Khối này đã có trên trang chủ");return}const blk={id:mkid("b"),k,w:k.startsWith("w:")?2:(BLK[k]?BLK[k].w:6)};
  if(k.startsWith("w:")){const st=D.widgets[k.slice(2)]=Object.assign(D.widgets[k.slice(2)]||{},{on:false});renderWidgets();saveDecor()}
  const B=UI.dash.blocks;let i=B.findIndex(b=>b.id===refId);if(i<0)i=B.length-1;B.splice(before?i:i+1,0,blk);saveDash();renderHome();setTimeout(()=>{const el=$(`.blk[data-bid="${blk.id}"]`);if(el){el.classList.add("pop-in");el.scrollIntoView({block:"nearest",behavior:"smooth"})}},50)}
function homeBlockMenu(anchor,b,el){const def=blkDef(b.k);const ok=HOME_TO_OV[b.k];const inOv=ok&&UI.ovDash.some(x=>x.k===ok);
  const m=popMenu(anchor,`<div class="who">${esc(def?def.l:"Khối")}</div><div class="nbw">${W_SEQ.map(w=>`<button data-hw="${w}" aria-pressed="${b.w===w}">${W_NAME[w]}</button>`).join("")}</div>
    <button data-hm="col">${ic(b.c?"expand":"min")}${b.c?"Mở rộng khối":"Rút gọn khối"}</button><button data-hm="max">${ic("expand")}Phóng to</button><button data-hm="min">${ic("min")}Thu nhỏ xuống khay</button>
    <button data-hm="u">${ic("up")}Lên trên</button><button data-hm="d">${ic("down")}Xuống dưới</button><button data-hm="l">${ic("back")}Sang trái</button><button data-hm="r">${ic("ext")}Sang phải</button>
    ${ok?`<button data-hm="ov">${ic("pin")}${inOv?"Đã có trong Tổng quan":"Ghim vào Tổng quan"}</button>`:""}
    <div class="sep"></div><button data-hm="x" style="color:var(--bad)">${ic("trash")}Ẩn khối<small class="kbd">Del</small></button>`);
  m.addEventListener("click",e=>e.stopPropagation());
  $$("[data-hw]",m).forEach(x=>x.onclick=()=>{b.w=+x.dataset.hw;saveDash();closePop();renderHome()});
  const act=a=>{closePop();if(a==="col"){const c=$("[data-bc=col]",el);if(c)c.click();return}if(a==="max"){maxBlock(el);return}if(a==="min"){b.m=true;saveDash();renderHome();return}
    if(a==="ov"){if(!inOv){UI.ovDash.push({id:mkid("o"),k:ok,w:OV_BLK[ok].w});saveOv();toast("Đã ghim vào Tổng quan — bấm biểu tượng ô vuông để xem")}return}
    if(a==="x"){const d=blkDef(b.k);if(d&&d.widget)return setWidgetMode(d.widget,"off");UI.dash.blocks=UI.dash.blocks.filter(z=>z!==b);saveDash();renderHome();toast("Đã ẩn khối — bấm ＋ để thêm lại");return}
    moveBlock(b.id,a)};
  $$("[data-hm]",m).forEach(x=>x.onclick=()=>act(x.dataset.hm));
  const key=e=>{if(!document.body.contains(m)){removeEventListener("keydown",key);return}if(e.key==="Delete"){e.preventDefault();act("x")}};addEventListener("keydown",key)}
const _renderHome21=renderHome;renderHome=function(...a){const r=_renderHome21.apply(this,a);try{if(UI.view==="home")$$("#dgrid>.blk[data-bid]").forEach(el=>{if($(".nbh",el))return;const b=UI.dash.blocks.find(x=>x.id===el.dataset.bid);if(!b)return;
    const h=document.createElement("div");h.className="nbh";h.innerHTML=`<button class="nbh-add" title="Bấm: thêm khối bên dưới · Alt+bấm: thêm bên trên" aria-label="Thêm khối">${ic("plus")}</button><button class="nbh-grip" title="Kéo để di chuyển · bấm để mở menu" aria-label="Di chuyển hoặc mở menu khối">⋮⋮</button>`;el.prepend(h);
    $(".nbh-add",h).onclick=e=>{e.stopPropagation();const before=e.altKey;nbMenuFilter(e.currentTarget,{items:homeAddItems(),hint:"Enter để chọn · Alt+bấm ＋ để thêm phía trên",onPick:it=>homeInsert(it.k,b.id,before)})};
    gripBind($(".nbh-grip",h),{drag:ev=>startBlockDrag(ev,el,b),menu:an=>homeBlockMenu(an,b,el)})})}catch(e){console.warn(e)}return r};

/* =====================================================================
   STICKER: gắn với giao diện nơi dán + cuộn theo trang
   ===================================================================== */
function stkView(){if(UI.view==="nb"&&UI.cur)return "nb:"+UI.cur.id;if(UI.view==="subj")return "subj:"+(UI.subjId||UI.curSubj||"");return UI.view||"home"}
let _stkScroller=null;
function stkScroller(){const m=$("#main");if(!m||UI.view==="nb")return null;const c=$(".dash",m)||[...m.querySelectorAll("*")].find(x=>{const s=getComputedStyle(x);return /(auto|scroll)/.test(s.overflowY)&&x.scrollHeight>x.clientHeight+4})||(/(auto|scroll)/.test(getComputedStyle(m).overflowY)?m:null);return c}
function stkOffPx(){if(!_stkScroller||!document.body.contains(_stkScroller))_stkScroller=stkScroller();return _stkScroller?_stkScroller.scrollTop:0}
function stkShift(){const L=$("#decor");if(!L)return;const off=stkOffPx();L.style.transform=off?`translateY(${-off}px)`:"";if(UI.decorating&&UI.selStk&&!stkShift._b){stkShift._b=1;requestAnimationFrame(()=>{stkShift._b=0;placeStkCtl()})}}
document.addEventListener("scroll",e=>{const t=e.target;if(t&&t.nodeType===1&&$("#main")&&$("#main").contains(t)&&(!_stkScroller||t===_stkScroller||!document.body.contains(_stkScroller))){_stkScroller=t;stkShift()}},true);
(D.stickers||[]).forEach(s=>{if(!s.v)s.v="home"});
{const _add21=addSticker;addSticker=function(k,o={}){const st=_add21(k,o);st.v=stkView();const off=stkOffPx();if(off&&!o._c){st.y+=off/innerHeight*100}renderStickers();saveDecor();return st}}
{const _rs21=renderStickers;renderStickers=function(){_rs21();const v=stkView();$$("#decor .stk").forEach(el=>{const st=D.stickers.find(s=>s.id===el.dataset.id);if(st&&!st.v)st.v="home";el.hidden=!!st&&st.v!==v});_stkScroller=stkScroller();stkShift()}}
/* đổi giao diện (trang chủ ↔ bài học ↔ lịch…) → chỉ hiện sticker của giao diện đó */
let _stkV="";setInterval(()=>{const v=stkView();if(v!==_stkV){_stkV=v;_stkScroller=null;if(UI.selStk){UI.selStk=null}try{typeof stkViewSync==="function"?stkViewSync():renderStickers()}catch(e){}}},150);
/* dữ liệu sticker cũ (chưa có giao diện) → thuộc trang chủ */
{const _sd21=saveDecor;saveDecor=function(...a){(D.stickers||[]).forEach(s=>{if(!s.v)s.v="home"});return _sd21.apply(this,a)}}
setTimeout(()=>{try{(D.stickers||[]).forEach(s=>{if(!s.v)s.v="home"});renderStickers()}catch(e){}},600);

/* =====================================================================
   v21 — sticker chuyển trang mượt · đồng bộ màu & khung pixel cho mọi giao diện ·
   Tổng quan xếp khít (không khoảng trống) + kéo cạnh/góc để đổi cỡ mượt ·
   Nhạc từ tài khoản YouTube / Spotify
   ===================================================================== */
/* ---------- 1. sticker: mờ dần khi rời trang, hiện dần khi tới trang ---------- */
function stkViewSync(){const v=stkView();let i=0;$$("#decor .stk").forEach(el=>{const st=D.stickers.find(s=>s.id===el.dataset.id);if(!st)return;if(!st.v)st.v="home";const off=st.v!==v;
    if(el.hidden){el.hidden=false;el.classList.add("voff")}
    if(off!==el.classList.contains("voff")){if(!off){el.style.transitionDelay=Math.min(240,(i++)*35)+"ms"}else el.style.transitionDelay="0ms";el.classList.toggle("voff",off)}});
  _stkScroller=null;requestAnimationFrame(()=>{_stkScroller=stkScroller();stkShift()})}
{const _rs22=renderStickers;renderStickers=function(){_rs22();const v=stkView();$$("#decor .stk").forEach(el=>{const st=D.stickers.find(s=>s.id===el.dataset.id);el.hidden=false;el.classList.toggle("voff",!!st&&(st.v||"home")!==v);el.style.transitionDelay="0ms"})}}
/* gọi ngay khi chuyển trang (không chờ vòng kiểm tra) */
["goHome","openNotebook","openSubject","goCal","renderCalPage"].forEach(fn=>{const f=window[fn];if(typeof f!=="function")return;window[fn]=function(...a){const r=f.apply(this,a);try{_stkV=stkView();stkViewSync()}catch(e){}if(r&&r.then)r.then(()=>{try{stkViewSync()}catch(e){}});return r}});
/* vòng kiểm tra dự phòng (đổi trang bằng cách khác) */
setInterval(()=>{const v=stkView();if(v!==_stkV){_stkV=v;stkViewSync()}},200);

/* ---------- 2. đồng bộ màu cảnh nền + khung trang trí pixel cho mọi giao diện ---------- */
UI.pat.mix=UI.pat.mix??16;UI.pat.pxd=UI.pat.pxd!==false;
function applyMix(){const r=document.documentElement;r.style.setProperty("--syncK",(+UI.pat.mix||0)+"%");r.classList.toggle("pxdeco",!!UI.pat.pxd)}
applyMix();
{const _pp22=patPanelHTML;patPanelHTML=function(){return _pp22().replace(`<label class="chk-row"><input type="checkbox" class="chk" data-pt="stk"`,`<div class="pat-row"><label style="flex:1">Độ hòa màu cảnh nền vào khung (mọi giao diện)<input type="range" min="0" max="40" step="1" data-pmix value="${UI.pat.mix}"></label></div>
  <label class="chk-row"><input type="checkbox" class="chk" data-pt="pxd" ${UI.pat.pxd?"checked":""}> Trang trí khung kiểu pixel (vạch màu, ô vuông ở tiêu đề) cho mọi giao diện</label>
  <label class="chk-row"><input type="checkbox" class="chk" data-pt="stk"`)}}
{const _bp22=bindPat;bindPat=function(root){_bp22(root);const m=$("[data-pmix]",root);if(m)m.oninput=()=>{UI.pat.mix=+m.value;applyMix();clearTimeout(m._t);m._t=setTimeout(savePat,300)};const px=$("[data-pt=pxd]",root);if(px)px.addEventListener("change",applyMix)}}

/* ---------- 3. Tổng quan: xếp khít kiểu “masonry” + kéo cạnh/góc để đổi cỡ ---------- */
UI.ovDense=local.get("ovDense",true);
function ovPack(f){const g=$("#ovGrid",f||document);if(!g)return;g.classList.toggle("dense",!!UI.ovDense);if(!UI.ovDense){$$(".ov-blk",g).forEach(el=>el.style.gridRowEnd="");return}
  const RH=6,GAP=12;$$(".ov-blk",g).forEach(el=>{if(el.classList.contains("lifted"))return;const h=el.getBoundingClientRect().height;el.style.gridRowEnd="span "+Math.max(1,Math.ceil((h+GAP)/RH))});
  const add=$(".ov-addblk",g);if(add)add.style.gridRowEnd="span "+Math.ceil((add.getBoundingClientRect().height+GAP)/RH)}
function ovResizeBind(f){const g=$("#ovGrid",f);if(!g)return;
  $$(".ov-blk",g).forEach(el=>{if($(":scope>.ovr",el))return;const b=UI.ovDash.find(x=>x.id===el.dataset.id);if(!b)return;if(b.h){el.style.height=b.h+"px";el.classList.add("has-h")}
    el.insertAdjacentHTML("beforeend",`<i class="ovr ovr-e" data-r="e" title="Kéo để đổi độ rộng · bấm đúp: mặc định"></i><i class="ovr ovr-s" data-r="s" title="Kéo để đổi chiều cao · bấm đúp: tự động"></i><i class="ovr ovr-c" data-r="c" title="Kéo để đổi cỡ"></i>`);
    $$(":scope>.ovr",el).forEach(h=>{const mode=h.dataset.r;
      h.addEventListener("pointerdown",e=>{if(e.button!==0&&e.pointerType==="mouse")return;e.preventDefault();e.stopPropagation();h.setPointerCapture(e.pointerId);
        const gr=g.getBoundingClientRect(),r=el.getBoundingClientRect();const cs=getComputedStyle(g);const gap=parseFloat(cs.columnGap)||12;const colW=(gr.width-gap*5)/6;
        let w=b.w,hh=b.h||r.height,raw=r.width;const ghost=document.createElement("i");ghost.className="rs-ghost";ghost.style.width=r.width+"px";el.appendChild(ghost);
        const badge=document.createElement("div");badge.className="rs-badge";el.appendChild(badge);el.classList.add("ov-rs");el.style.zIndex=6;if(mode!=="s"){el.style.width=r.width+"px";el.style.maxWidth="none"}
        const lab=()=>badge.textContent=(mode!=="s"?W_NAME[w]||w+"/6":"")+(mode==="c"?" · ":"")+(mode!=="e"?Math.round(hh)+"px":"");lab();let raf=0,last=null;
        const mv=ev=>{last=ev;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const p=last;
          if(mode!=="s"){raw=Math.max(150,Math.min(gr.right-r.left,p.clientX-r.left));el.style.width=raw+"px";w=Math.max(1,Math.min(6,Math.round((raw+gap)/(colW+gap))));ghost.style.width=Math.min(w*(colW+gap)-gap,gr.right-r.left)+"px"}
          if(mode!=="e"){hh=Math.max(90,Math.min(1400,r.height+(p.clientY-e.clientY)));el.style.height=hh+"px";el.classList.add("has-h")}lab()})};
        const up=()=>{h.removeEventListener("pointermove",mv);h.removeEventListener("pointerup",up);h.removeEventListener("pointercancel",up);cancelAnimationFrame(raf);ghost.remove();badge.remove();
          const sibs=$$(".ov-blk",g).filter(x=>x!==el);const before=new Map(sibs.map(x=>[x,x.getBoundingClientRect()]));
          if(mode!=="s"){b.w=w;el.dataset.w=w;el.style.setProperty("--w",w)}if(mode!=="e")b.h=Math.round(hh);saveOv();el.style.width="";el.style.maxWidth="";el.style.zIndex="";el.classList.remove("ov-rs");ovPack(f);
          if(!RM()){if(mode!=="s"){const fw=el.getBoundingClientRect().width;el.animate([{width:raw+"px"},{width:fw+"px"}],{duration:220,easing:"cubic-bezier(.2,.8,.2,1)"})}
            sibs.forEach(x=>{const a=before.get(x),c=x.getBoundingClientRect();const dx=a.left-c.left,dy=a.top-c.top;if(dx||dy)x.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:260,easing:"cubic-bezier(.2,.8,.2,1)"})})}};
        h.addEventListener("pointermove",mv);h.addEventListener("pointerup",up);h.addEventListener("pointercancel",up)});
      h.addEventListener("dblclick",e=>{e.stopPropagation();if(mode!=="s"){b.w=OV_BLK[b.k].w}if(mode!=="e"){delete b.h}saveOv();renderFly()})})});
  /* nội dung đổi cao (thư tải xong, ghi chú dài…) → xếp lại */
  if(!g._ro){g._ro=new ResizeObserver(()=>{clearTimeout(g._t);g._t=setTimeout(()=>ovPack(f),60)});$$(".ov-blk>.ov-b",g).forEach(x=>g._ro.observe(x))}}
{const _bindOv22=bindOv;bindOv=function(f){_bindOv22(f);const h3=$("h3",f);if(h3&&!$("[data-ovlay]",h3)){const b=document.createElement("button");b.className="ghost ic";b.dataset.ovlay="1";b.title="Bố cục Tổng quan";b.setAttribute("aria-label","Bố cục Tổng quan");b.innerHTML=ic("grid");h3.insertBefore(b,$("[data-fx]",h3));
    b.onclick=e=>{e.stopPropagation();const m=popMenu(b,`<div class="who">Bố cục Tổng quan</div><button data-ol="dense">${UI.ovDense?"✓ ":""}Tự lấp khoảng trống (xếp khít)</button><button data-ol="auto">${ic("spark")}Sắp xếp gọn theo cỡ</button><button data-ol="h">${ic("sync")}Bỏ chiều cao cố định của mọi khối</button><button data-ol="def">${ic("home")}Về bố cục mặc định</button>`);
      m.addEventListener("click",ev=>ev.stopPropagation());
      $$("[data-ol]",m).forEach(x=>x.onclick=()=>{const k=x.dataset.ol;if(k==="dense"){UI.ovDense=!UI.ovDense;local.set("ovDense",UI.ovDense)}if(k==="auto"){UI.ovDash.sort((a,c)=>c.w-a.w)}if(k==="h")UI.ovDash.forEach(z=>delete z.h);if(k==="def")UI.ovDash=OV_DEF();saveOv();closePop();renderFly()})}}
  ovResizeBind(f);requestAnimationFrame(()=>ovPack(f));setTimeout(()=>ovPack(f),400)}}
addEventListener("resize",()=>{if(UI.fly==="ov"){clearTimeout(ovPack._t);ovPack._t=setTimeout(()=>ovPack(),120)}});

/* ---------- 4. Nhạc từ tài khoản: YouTube (qua đăng nhập Google) · Spotify ---------- */
UI.maTab=local.get("maTab","yt");
async function musicAccounts(tab){if(tab){UI.maTab=tab;local.set("maTab",tab)}
  if(!P.local){openModal({title:"Nhạc từ tài khoản",small:true,body:`<div class="form"><p style="margin:0">Đăng nhập <b>YouTube</b> hoặc <b>Spotify</b> để phát danh sách nhạc của bạn chỉ chạy trên <b>bản web</b> (trang Netlify của bạn), vì trong Claude trang không được nhúng trình phát bên ngoài.</p><p class="muted" style="margin:0;font-size:13px">Ở đây bạn vẫn có thể dùng âm thanh nền tạo sẵn (mưa, lofi…) hoặc “Thêm tệp nhạc” từ máy.</p></div>`,foot:`<div class="grow"></div><button class="pill-btn primary" data-close>Đã hiểu</button>`});return}
  openModal({title:"Nhạc từ tài khoản",small:true,body:`<div class="ma"><div class="seg ma-tabs" role="tablist"><button role="tab" data-mat="yt" aria-selected="${UI.maTab==="yt"}">${ic("yt")} YouTube</button><button role="tab" data-mat="sp" aria-selected="${UI.maTab==="sp"}">${ic("music")} Spotify</button></div><div id="maBody" class="ma-body"></div></div>`,foot:`<span class="muted" style="font-size:12px">Bấm một danh sách để phát trong trình phát mini (góc màn hình).</span><div class="grow"></div><button class="pill-btn" data-close>Đóng</button>`});
  $$("[data-mat]").forEach(b=>b.onclick=()=>{UI.maTab=b.dataset.mat;local.set("maTab",UI.maTab);$$("[data-mat]").forEach(x=>x.setAttribute("aria-selected",x===b));maDraw()});maDraw()}
const maList=items=>`<div class="ma-list">${items.map(it=>`<button class="ma-it" data-mau="${esc(it.url)}" title="${esc(it.title)}">${it.img?`<img src="${esc(it.img)}" alt="" referrerpolicy="no-referrer" loading="lazy">`:`<span class="ma-ph">${ic("music")}</span>`}<span class="nm"><b>${esc(it.title)}</b><small>${esc(it.sub||"")}</small></span>${ic("play")}</button>`).join("")||`<div class="muted" style="font-size:13px;padding:8px">Không có gì ở đây.</div>`}</div>`;
function maBind(box){$$("[data-mau]",box).forEach(b=>b.onclick=async()=>{if(typeof window.addMusicLinks!=="function"){toast("Trình phát chưa sẵn sàng");return}const ok=await window.addMusicLinks([b.dataset.mau]);if(ok)toast("Đang phát: "+(b.title||"nhạc"))})}
async function maDraw(boxArg){const box=boxArg||$("#maBody");if(!box)return;const err=e=>`<div class="warnbox" style="font-size:13px">${esc(e&&e.message||String(e))}</div>`;
  if(UI.maTab==="yt"){const G=window.SOHOC;if(!G.clientId()){box.innerHTML=`<p style="margin:0">Cần Google Client ID (Cài đặt → Tài khoản Google) và bật <b>YouTube Data API v3</b> trong Google Cloud Console.</p><button class="btn" id="maSet">${ic("gear")} Mở Cài đặt</button>`;$("#maSet").onclick=()=>{closeDialog();settingsDialog("google")};return}
    if(!G.yt.has()){box.innerHTML=`<p style="margin:0">Đăng nhập YouTube bằng tài khoản Google để xem <b>danh sách phát của bạn</b> và tìm nhạc học bài.</p><button class="g-btn" id="maYt">${typeof G_LOGO!=="undefined"?G_LOGO:""}<span>Kết nối YouTube</span></button><p class="muted" style="font-size:12px;margin:0">Google sẽ hỏi quyền “xem tài khoản YouTube” (chỉ đọc). Tài khoản phải có trong Test users của ứng dụng (README mục 4).</p>`;
      $("#maYt").onclick=async()=>{try{await G.yt.link();maDraw(box)}catch(e){toast(gcErr(e),5000)}};return}
    box.innerHTML=`<form class="ma-q" id="maQ"><input class="input" id="maQi" placeholder="Tìm trên YouTube — ví dụ: lofi study, nhạc piano tập trung" value="${esc(local.get("maQ","lofi hip hop study"))}"><button class="btn">${ic("search")} Tìm</button></form><div id="maRes"></div><h4>Danh sách phát của bạn</h4><div id="maMine"><span class="spin"></span></div>`;
    const loadMine=async()=>{const m=$("#maMine");try{const r=await G.yt.api("playlists",{part:"snippet,contentDetails",mine:"true",maxResults:"50"});const it=(r.items||[]).map(p=>({title:p.snippet.title,sub:(p.contentDetails&&p.contentDetails.itemCount||0)+" video",img:p.snippet.thumbnails&&(p.snippet.thumbnails.medium||p.snippet.thumbnails.default||{}).url,url:"https://www.youtube.com/playlist?list="+p.id}));
        m.innerHTML=maList(it)+`<button class="btn" id="maLike" style="margin-top:6px">${ic("star")} Video đã thích</button>`;maBind(m);$("#maLike",m).onclick=()=>window.addMusicLinks(["https://www.youtube.com/playlist?list=LL"])}catch(e){m.innerHTML=err({message:gcErr(e)})+(e&&e.code==="needs_reauth"?`<button class="btn" id="maRe">${ic("sync")} Kết nối lại</button>`:"");const re=$("#maRe",m);if(re)re.onclick=async()=>{try{await G.yt.link();maDraw(box)}catch(x){toast(gcErr(x))}}}};
    const search=async q=>{const R=$("#maRes");R.innerHTML=`<span class="spin"></span>`;local.set("maQ",q);try{const r=await G.yt.api("search",{part:"snippet",q,type:"video,playlist",maxResults:"12",videoEmbeddable:"any"});const it=(r.items||[]).map(x=>({title:x.snippet.title.replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"'),sub:(x.id.kind==="youtube#playlist"?"Danh sách · ":"")+x.snippet.channelTitle,img:x.snippet.thumbnails&&(x.snippet.thumbnails.medium||x.snippet.thumbnails.default||{}).url,url:x.id.playlistId?"https://www.youtube.com/playlist?list="+x.id.playlistId:"https://www.youtube.com/watch?v="+x.id.videoId}));R.innerHTML=maList(it);maBind(R)}catch(e){R.innerHTML=err({message:gcErr(e)})}};
    $("#maQ").onsubmit=e=>{e.preventDefault();const q=$("#maQi").value.trim();if(q)search(q)};loadMine();return}
  /* Spotify */
  const S=window.SOHOC.spotify;
  if(!S.cid()){box.innerHTML=`<p style="margin:0">Để đăng nhập Spotify, tạo một ứng dụng miễn phí tại <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener">developer.spotify.com/dashboard</a>:</p><ol style="margin:0;padding-left:20px;font-size:13.5px;display:grid;gap:4px"><li>Create app → chọn <b>Web API</b>.</li><li>Redirect URI: <code>${esc(S.redirect())}</code></li><li>Settings → <b>User Management</b>: thêm email Spotify của bạn.</li><li>Sao chép <b>Client ID</b> dán vào đây.</li></ol><div style="display:flex;gap:6px"><input class="input" id="maCid" placeholder="Spotify Client ID" spellcheck="false" style="flex:1"><button class="btn primary" id="maCidOk">Lưu</button></div>`;
    $("#maCidOk").onclick=()=>{const v=$("#maCid").value.trim();if(v.length<16){toast("Client ID chưa đúng");return}S.setCid(v);maDraw(box)};return}
  if(!S.signed()){box.innerHTML=`<p style="margin:0">Đăng nhập Spotify để phát <b>danh sách phát</b>, album và bài hát bạn đã lưu.</p><button class="sp-btn" id="maSp">${ic("music")}<span>Đăng nhập với Spotify</span></button><p class="muted" style="font-size:12px;margin:0">Trang sẽ chuyển sang Spotify rồi quay lại. Trình phát nhúng phát đủ bài khi trình duyệt này đang đăng nhập Spotify (thường cần Premium để phát không giới hạn).</p><button class="btn" id="maCidRe" style="font-size:12px">Đổi Client ID</button>`;
    $("#maSp").onclick=()=>S.login().catch(e=>toast(e.message));$("#maCidRe").onclick=()=>{S.setCid("");maDraw(box)};return}
  const me=S.me();box.innerHTML=`<div class="ma-me">${me&&me.img?`<img src="${esc(me.img)}" alt="" referrerpolicy="no-referrer">`:""}<b>${esc(me&&me.name||"Spotify")}</b>${me&&me.product?`<small>${esc(me.product)}</small>`:""}<span class="grow"></span><button class="btn" id="maOut">Đăng xuất</button></div>
    <form class="ma-q" id="maQ"><input class="input" id="maQi" placeholder="Tìm trên Spotify — ví dụ: lofi beats, piano focus" value="${esc(local.get("maQs","lofi beats"))}"><button class="btn">${ic("search")} Tìm</button></form><div id="maRes"></div><h4>Danh sách phát của bạn</h4><div id="maMine"><span class="spin"></span></div><h4>Bài hát đã lưu</h4><div id="maSaved"><span class="spin"></span></div>`;
  $("#maOut").onclick=()=>{S.logout();maDraw(box)};
  const im=a=>a&&a[0]&&a[0].url;
  const fail=(el,e)=>{el.innerHTML=err(e)+(e&&e.code==="needs_reauth"?`<button class="btn" data-relog>${ic("sync")} Đăng nhập lại</button>`:"");const b=$("[data-relog]",el);if(b)b.onclick=()=>S.login()};
  (async()=>{const m=$("#maMine");try{const r=await S.api("me/playlists",{limit:"50"});m.innerHTML=maList((r.items||[]).filter(Boolean).map(p=>({title:p.name,sub:(p.tracks&&p.tracks.total||0)+" bài",img:im(p.images),url:"https://open.spotify.com/playlist/"+p.id})));maBind(m)}catch(e){fail(m,e)}})();
  (async()=>{const m=$("#maSaved");try{const r=await S.api("me/tracks",{limit:"20"});m.innerHTML=maList((r.items||[]).map(x=>x.track).filter(Boolean).map(t=>({title:t.name,sub:(t.artists||[]).map(a=>a.name).join(", "),img:im(t.album&&t.album.images),url:"https://open.spotify.com/track/"+t.id})));maBind(m)}catch(e){fail(m,e)}})();
  $("#maQ").onsubmit=async e=>{e.preventDefault();const q=$("#maQi").value.trim();if(!q)return;local.set("maQs",q);const R=$("#maRes");R.innerHTML=`<span class="spin"></span>`;try{const r=await S.api("search",{q,type:"playlist,track",limit:"8"});const it=[...((r.playlists&&r.playlists.items)||[]).filter(Boolean).map(p=>({title:p.name,sub:"Danh sách · "+(p.owner&&p.owner.display_name||""),img:im(p.images),url:"https://open.spotify.com/playlist/"+p.id})),...((r.tracks&&r.tracks.items)||[]).map(t=>({title:t.name,sub:(t.artists||[]).map(a=>a.name).join(", "),img:im(t.album&&t.album.images),url:"https://open.spotify.com/track/"+t.id}))];R.innerHTML=maList(it);maBind(R)}catch(er){fail(R,er)}}}
/* lối vào: bảng Âm thanh (nút Nhạc) */
/* lối vào cũ (nút “Nhạc từ tài khoản”) đã thay bằng các thẻ YouTube / Spotify trong bảng Nhạc — xem app23 */

/* =====================================================================
   v22 — sticker không bị mất khi quay lại trang · ứng dụng YouTube & Spotify
   nằm ngay trong bảng Nhạc
   ===================================================================== */
/* ---------- 1. sticker: thao tác “rắc”/“gỡ” chỉ tác động trang hiện tại; lưu chắc chắn ---------- */
{const _ad23=autoDecorate;autoDecorate=function(){const v=stkView();const keep=D.stickers.filter(s=>s.auto&&(s.v||"home")!==v);/* giữ sticker “rắc” của các trang khác */
  keep.forEach(s=>s.auto=false);_ad23();keep.forEach(s=>s.auto=true);renderStickers();saveDecor()}}
function stkClearView(){const v=stkView();const n=D.stickers.filter(s=>(s.v||"home")===v).length;if(!n){toast("Trang này chưa có sticker");return}
  confirmDialog("Gỡ sticker ở trang này?",`${n} sticker trên trang hiện tại sẽ bị gỡ. Sticker ở các trang khác và bộ sưu tập sticker riêng vẫn giữ nguyên.`,"Gỡ",()=>{D.stickers=D.stickers.filter(s=>(s.v||"home")!==v);UI.selStk=null;renderStickers();saveDecor();toast("Đã gỡ sticker của trang này")})}
{const _rf23=renderFly;renderFly=function(...a){const r=_rf23.apply(this,a);if(UI.fly==="stk"){const f=$(".flyout");const c=f&&$("#stkClr",f);if(c){c.innerHTML=`${ic("trash")} Gỡ sticker trang này`;c.onclick=e=>{e.stopPropagation();stkClearView()}}}return r}}
/* lưu: báo lỗi thay vì im lặng (trước đây lỗi lưu làm mất sticker sau khi tải lại) */
let _sd23=0,_sdWarn=0;
saveDecor=function(){if(!D.loaded)return;(D.stickers||[]).forEach(s=>{if(!s.v)s.v="home"});clearTimeout(_sd23);_sd23=setTimeout(async()=>{
  const doc={type:"decor",skin:UI.skin,stickers:D.stickers,custom:D.custom,float:D.float,widgets:D.widgets,sticky:D.sticky,water:D.water,streak:D.streak};
  try{await Store.put("decor-me",doc);local.set("decorBak",{t:Date.now(),stickers:D.stickers,custom:D.custom.map(c=>c.url&&c.url.length>60000?{...c,url:""}:c)})}
  catch(e){console.warn("saveDecor",e);/* thử lại không kèm ảnh nhúng quá lớn */
    try{const slim=D.custom.map(c=>c.url&&c.url.startsWith("data:")&&c.url.length>60000?{...c,url:"",lost:true}:c);await Store.put("decor-me",{...doc,custom:slim});if(Date.now()-_sdWarn>20000){_sdWarn=Date.now();toast("Bộ nhớ trang trí gần đầy: vài sticker ảnh/GIF lớn chỉ giữ trong phiên này — hãy dùng ảnh nhỏ hơn",5500)}}
    catch(e2){if(Date.now()-_sdWarn>20000){_sdWarn=Date.now();toast("Chưa lưu được sticker — kiểm tra kết nối rồi thử lại",4500)}}}},700)};
/* lưu ngay khi rời trang / đóng tab để không mất thao tác cuối */
addEventListener("pagehide",()=>{try{clearTimeout(_sd23);Store.put("decor-me",{type:"decor",skin:UI.skin,stickers:D.stickers,custom:D.custom,float:D.float,widgets:D.widgets,sticky:D.sticky,water:D.water,streak:D.streak}).catch(()=>{})}catch(e){}});
/* khôi phục từ bản dự phòng trên máy nếu bản lưu chính bị thiếu sticker */
setTimeout(()=>{try{const bak=local.get("decorBak",null);if(!bak||!D.loaded)return;const have=new Set(D.stickers.map(s=>s.id));const miss=(bak.stickers||[]).filter(s=>!have.has(s.id));const haveC=new Set(D.custom.map(c=>c.id));const missC=(bak.custom||[]).filter(c=>c.url&&!haveC.has(c.id));
  if(miss.length||missC.length){D.custom.push(...missC);D.stickers.push(...miss.filter(s=>!String(s.k).startsWith("c:")||D.custom.some(c=>"c:"+c.id===s.k)));renderStickers();saveDecor()}}catch(e){}},2500);

/* ---------- 2. bảng Nhạc: thẻ Âm thanh nền | YouTube | Spotify ---------- */
UI.mtab=local.get("mtab","snd");
const MT_IC={yt:`<svg viewBox="0 0 24 24" class="i" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="#ff3d3d" stroke="none"/><path d="M10 9.2v5.6l4.8-2.8z" fill="#fff" stroke="none"/></svg>`,sp:`<svg viewBox="0 0 24 24" class="i" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#1ed760" stroke="none"/><path d="M7.5 9.6c3-1 6.6-.8 9.2.7M8 12.6c2.5-.7 5.3-.5 7.4.7M8.6 15.4c1.9-.5 3.9-.3 5.5.5" stroke="#0b1a10" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`};
function mtabMount(m,anchor){if(!m||$(".mtabs",m))return;const who=$(".who",m);const bar=document.createElement("div");bar.className="mtabs";bar.setAttribute("role","tablist");
  bar.innerHTML=`<button role="tab" data-mtab="snd">${ic("vol")}<span>Âm thanh nền</span></button><button role="tab" data-mtab="yt">${MT_IC.yt}<span>YouTube</span></button><button role="tab" data-mtab="sp">${MT_IC.sp}<span>Spotify</span></button>`;
  (who||m.firstChild).after(bar);const app=document.createElement("div");app.className="mapp";app.hidden=true;bar.after(app);
  const show=t=>{UI.mtab=t;local.set("mtab",t);$$("[data-mtab]",bar).forEach(b=>b.setAttribute("aria-selected",b.dataset.mtab===t));const sp=$(".sndpop",m);if(sp)sp.hidden=t!=="snd";app.hidden=t==="snd";if(who)who.textContent=t==="snd"?"Âm thanh nền":t==="yt"?"Ứng dụng YouTube":"Ứng dụng Spotify";
    if(t!=="snd"){if(!P.local){app.innerHTML=`<div class="mapp-note">${t==="yt"?MT_IC.yt:MT_IC.sp}<p>Đăng nhập ${t==="yt"?"YouTube":"Spotify"} để phát danh sách nhạc của bạn chạy trên <b>bản web</b> (trang Netlify). Trong Claude, trang không được nhúng trình phát bên ngoài.</p><p class="muted">Ở đây vẫn dùng được âm thanh nền và nhạc tải lên từ máy (thẻ “Âm thanh nền”).</p></div>`;return}
      UI.maTab=t;maDraw(app)}
    requestAnimationFrame(()=>{const r=anchor.getBoundingClientRect(),h=m.offsetHeight;if(m.getBoundingClientRect().bottom>innerHeight-8){m.style.top=Math.max(8,innerHeight-h-8)+"px"}if(h>innerHeight-16){m.style.maxHeight=(innerHeight-16)+"px";m.style.overflow="auto"}})};
  $$("[data-mtab]",bar).forEach(b=>b.onclick=e=>{e.stopPropagation();show(b.dataset.mtab)});show(UI.mtab)}
function mtabWrap(){if(sndPopover._mt)return;const _sp23=sndPopover;sndPopover=function(anchor){const r=_sp23.apply(this,arguments);const m=$$(".popmenu").pop();if(m&&$(".sndpop",m)){m.classList.add("musicpop");mtabMount(m,anchor)}return r};sndPopover._mt=true}
/* bọc sau cùng (sau phần mở rộng của trình phát) */
if(document.readyState==="complete")setTimeout(mtabWrap,0);else addEventListener("load",()=>setTimeout(mtabWrap,0));
/* mở thẳng ứng dụng từ nơi khác (menu tài khoản…) */
function openMusicApp(t){UI.mtab=t;local.set("mtab",t);const b=$("#rail [data-r=music]")||$("#tSnd");if(b)b.click();else musicAccounts(t)}

/* =====================================================================
   v23 — Ứng dụng YouTube & Spotify: tài khoản RIÊNG (khác tài khoản đăng nhập Sổ Học),
   dùng quyền lợi của tài khoản đó (Premium) và kết nối với ứng dụng thật
   (Spotify Connect: điều khiển Spotify trên điện thoại/máy tính; mở YouTube / YouTube Music)
   ===================================================================== */
const MA_ERR=e=>`<div class="warnbox" style="font-size:12.5px">${esc(e&&e.message||String(e))}</div>`;
function maList2(items,kind){return `<div class="ma-list">${items.map((it,i)=>`<div class="ma-it2"><button class="ma-it" data-mi="${i}" title="${esc(it.title)}">${it.img?`<img src="${esc(it.img)}" alt="" referrerpolicy="no-referrer" loading="lazy">`:`<span class="ma-ph">${ic("music")}</span>`}<span class="nm"><b>${esc(it.title)}</b><small>${esc(it.sub||"")}</small></span>${ic("play")}</button>${kind==="yt"?`<a class="ma-open" href="${esc(it.ytUrl)}" target="_blank" rel="noopener" title="Mở trong ứng dụng YouTube" data-ytext>${MT_IC.yt}</a><a class="ma-open" href="${esc(it.ymUrl)}" target="_blank" rel="noopener" title="Mở trong YouTube Music" data-ytext>${ic("music")}</a>`:`<a class="ma-open" href="${esc(it.url)}" target="_blank" rel="noopener" title="Mở trong ứng dụng Spotify">${MT_IC.sp}</a>`}</div>`).join("")||`<div class="muted" style="font-size:13px;padding:8px">Không có gì ở đây.</div>`}</div>`}
/* ---------------- YouTube ---------------- */
function ytItem(x){const pl=x.kind==="pl";const id=x.id;const au=x.au?"&authuser="+encodeURIComponent(x.au):"";
  return {...x,url:pl?"https://www.youtube.com/playlist?list="+id:"https://www.youtube.com/watch?v="+id,ytUrl:(pl?"https://www.youtube.com/playlist?list="+id:"https://www.youtube.com/watch?v="+id)+au,ymUrl:(pl?"https://music.youtube.com/playlist?list="+id:"https://music.youtube.com/watch?v="+id)+au}}
async function maYT(box){const G=window.SOHOC;
  if(!G.clientId()){box.innerHTML=`<p style="margin:0">Cần Google Client ID (Cài đặt → Tài khoản Google) và bật <b>YouTube Data API v3</b> trong Google Cloud Console.</p><button class="btn" id="maSet">${ic("gear")} Mở Cài đặt</button>`;$("#maSet",box).onclick=()=>{closePop();closeDialog();settingsDialog("google")};return}
  const A=G.yt.acct();
  if(!A){box.innerHTML=`<p style="margin:0">Kết nối <b>tài khoản YouTube</b> — có thể là một tài khoản Google <b>khác</b> với tài khoản bạn đang dùng cho Sổ Học (ví dụ tài khoản có YouTube Premium).</p><button class="g-btn" id="maYt">${typeof G_LOGO!=="undefined"?G_LOGO:""}<span>Chọn tài khoản YouTube</span></button><p class="muted" style="font-size:12px;margin:0">Chỉ xin quyền xem (danh sách phát, video đã thích). Tài khoản phải có trong Test users của ứng dụng Google (README mục 4).</p>`;
    $("#maYt",box).onclick=async()=>{try{await G.yt.link(true);maYT(box)}catch(e){toast(gcErr(e),5000)}};return}
  const au=A.email||"";
  box.innerHTML=`<div class="ma-me">${A.ch&&A.ch.img||A.pic?`<img src="${esc(A.ch&&A.ch.img||A.pic)}" alt="" referrerpolicy="no-referrer">`:""}<span class="ma-who"><b>${esc(A.ch&&A.ch.title||A.name||"YouTube")}</b><small>${esc(A.email)}</small></span><button class="btn" id="maYsw" title="Dùng tài khoản YouTube khác">Đổi</button><button class="ghost ic" id="maYout" title="Ngắt kết nối YouTube" aria-label="Ngắt kết nối YouTube">${ic("close")}</button></div>
    ${A.fresh?"":`<div class="warnbox" style="font-size:12.5px">Phiên YouTube đã hết hạn. <button class="btn" id="maYre" style="margin-left:6px">${ic("sync")} Kết nối lại</button></div>`}
    <details class="ma-prem"><summary>${MT_IC.yt} Dùng quyền lợi Premium của tài khoản này</summary><p>Trình phát trong trang dùng phiên đăng nhập YouTube của <b>trình duyệt</b>. Đăng nhập cùng tài khoản <b>${esc(A.email)}</b> trên youtube.com để phát không quảng cáo (nếu tài khoản có Premium). Nút ${MT_IC.yt} / ${ic("music")} cạnh mỗi mục mở thẳng <b>ứng dụng YouTube / YouTube Music</b> bằng đúng tài khoản này (phát nền, tải xuống… theo gói của bạn).</p><a class="btn" href="https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(A.email)}&continue=${encodeURIComponent("https://www.youtube.com/")}" target="_blank" rel="noopener" data-ytext>${ic("ext")} Đăng nhập YouTube trên trình duyệt</a></details>
    <form class="ma-q" id="maQ"><input class="input" id="maQi" placeholder="Tìm trên YouTube — ví dụ: lofi study" value="${esc(local.get("maQ","lofi hip hop study"))}"><button class="btn">${ic("search")}</button></form><div id="maRes"></div>
    <h4>Danh sách phát của bạn</h4><div id="maMine"><span class="spin"></span></div>`;
  $("#maYsw",box).onclick=async()=>{try{await G.yt.link(true);maYT(box)}catch(e){toast(gcErr(e),5000)}};$("#maYout",box).onclick=()=>{G.yt.logout();maYT(box)};const re=$("#maYre",box);if(re)re.onclick=async()=>{try{await G.yt.link(false);maYT(box)}catch(e){toast(gcErr(e),5000)}};
  const bindL=(el,items)=>$$("[data-mi]",el).forEach(b=>b.onclick=async()=>{const it=items[+b.dataset.mi];if(await window.addMusicLinks([it.url]))toast("Đang phát: "+it.title)});
  (async()=>{const m=$("#maMine",box);try{const r=await G.yt.api("playlists",{part:"snippet,contentDetails",mine:"true",maxResults:"50"});const it=[ytItem({kind:"pl",id:"LL",title:"Video đã thích",sub:"Danh sách tự động",au}),...(r.items||[]).map(p=>ytItem({kind:"pl",id:p.id,title:p.snippet.title,sub:(p.contentDetails&&p.contentDetails.itemCount||0)+" video",img:p.snippet.thumbnails&&(p.snippet.thumbnails.medium||p.snippet.thumbnails.default||{}).url,au}))];m.innerHTML=maList2(it,"yt");bindL(m,it)}catch(e){m.innerHTML=MA_ERR({message:gcErr(e)})}})();
  $("#maQ",box).onsubmit=async e=>{e.preventDefault();const q=$("#maQi",box).value.trim();if(!q)return;local.set("maQ",q);const R=$("#maRes",box);R.innerHTML=`<span class="spin"></span>`;
    try{const r=await G.yt.api("search",{part:"snippet",q,type:"video,playlist",maxResults:"12"});const dec=t=>{const d=document.createElement("textarea");d.innerHTML=t;return d.value};const it=(r.items||[]).map(x=>ytItem({kind:x.id.playlistId?"pl":"v",id:x.id.playlistId||x.id.videoId,title:dec(x.snippet.title),sub:(x.id.playlistId?"Danh sách · ":"")+x.snippet.channelTitle,img:x.snippet.thumbnails&&(x.snippet.thumbnails.medium||x.snippet.thumbnails.default||{}).url,au}));R.innerHTML=maList2(it,"yt");bindL(R,it)}catch(er){R.innerHTML=MA_ERR({message:gcErr(er)})}}}
/* ---------------- Spotify ---------------- */
const SP=()=>window.SOHOC.spotify;
UI.spDev=local.get("spDev","auto");
async function spPlay(it){const S=SP(),me=S.me();const prem=me&&me.product==="premium";
  if(!prem||UI.spDev==="embed"){if(await window.addMusicLinks([it.url]))toast("Đang phát (trình phát nhúng): "+it.title);return}
  let dev=UI.spDev;try{if(dev==="auto"||dev==="local"){if(dev==="auto"){const d=await S.api("me/player/devices");const act=(d.devices||[]).find(x=>x.is_active);dev=act?act.id:"local"}if(dev==="local")dev=await S.startPlayer()}
    const body=it.uri.startsWith("spotify:track:")?{uris:[it.uri]}:{context_uri:it.uri};await S.api("me/player/play",{device_id:dev},{method:"PUT",body});toast("Đang phát trên Spotify: "+it.title);setTimeout(()=>spNow(),900)}
  catch(e){if(e.code==="premium_required"||e.code==="initialization_error"||e.code==="account_error"){toast(e.message+" — chuyển sang trình phát nhúng",4500);if(await window.addMusicLinks([it.url]))return}toast(e.message,5000)}}
let _spPoll=0;
async function spNow(){const box=$("#spNow");if(!box)return;const S=SP();try{const s=await S.api("me/player");if(!s||!s.item){box.innerHTML=`<div class="muted" style="font-size:12.5px">Chưa phát gì. Chọn một danh sách bên dưới.</div>`;return}
    const t=s.item;const img=t.album&&t.album.images&&t.album.images[t.album.images.length>1?1:0];const pc=t.duration_ms?Math.round((s.progress_ms||0)/t.duration_ms*100):0;
    box.innerHTML=`<div class="sp-now">${img?`<img src="${esc(img.url)}" alt="">`:""}<div class="sp-np"><b>${esc(t.name)}</b><small>${esc((t.artists||[]).map(a=>a.name).join(", "))} · ${esc(s.device&&s.device.name||"")}</small><i class="sp-bar"><i style="width:${pc}%"></i></i></div></div>
      <div class="sp-ctl"><button class="ghost ic" data-spc="prev" aria-label="Bài trước">${ic("prev")}</button><button class="pill-btn primary" data-spc="${s.is_playing?"pause":"play"}" aria-label="${s.is_playing?"Tạm dừng":"Phát"}">${ic(s.is_playing?"pause":"play")}</button><button class="ghost ic" data-spc="next" aria-label="Bài tiếp">${ic("next")}</button><input type="range" min="0" max="100" value="${s.device&&s.device.volume_percent!=null?s.device.volume_percent:60}" data-spv aria-label="Âm lượng Spotify"><a class="ghost ic" href="${esc(t.external_urls&&t.external_urls.spotify||"https://open.spotify.com")}" target="_blank" rel="noopener" title="Mở trong ứng dụng Spotify">${ic("ext")}</a></div>`;
    $$("[data-spc]",box).forEach(b=>b.onclick=async()=>{const a=b.dataset.spc;try{await S.api("me/player/"+(a==="prev"?"previous":a),null,{method:a==="play"||a==="pause"?"PUT":"POST"});setTimeout(spNow,500)}catch(e){toast(e.message,4000)}});
    const v=$("[data-spv]",box);v.onchange=async()=>{try{await S.api("me/player/volume",{volume_percent:v.value},{method:"PUT"})}catch(e){toast(e.message,4000)}}}
  catch(e){box.innerHTML=e.code==="premium_required"?"":MA_ERR(e)}}
async function maSP(box){const S=SP();clearInterval(_spPoll);
  if(!S.cid()){box.innerHTML=`<p style="margin:0">Tạo ứng dụng miễn phí tại <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener">developer.spotify.com/dashboard</a>: Create app (Web API + Web Playback SDK) · Redirect URI <code>${esc(S.redirect())}</code> · User Management: thêm email các tài khoản Spotify sẽ dùng. Dán Client ID:</p><div style="display:flex;gap:6px"><input class="input" id="maCid" placeholder="Spotify Client ID" spellcheck="false" style="flex:1"><button class="btn primary" id="maCidOk">Lưu</button></div>`;
    $("#maCidOk",box).onclick=()=>{const v=$("#maCid",box).value.trim();if(v.length<16){toast("Client ID chưa đúng");return}S.setCid(v);maSP(box)};return}
  if(!S.signed()){box.innerHTML=`<p style="margin:0">Đăng nhập <b>bất kỳ tài khoản Spotify</b> nào (không cần trùng với tài khoản Google). Tài khoản <b>Premium</b> sẽ điều khiển được <b>ứng dụng Spotify thật</b> trên điện thoại/máy tính và phát ngay trong trang.</p><button class="sp-btn" id="maSp">${MT_IC.sp}<span>Đăng nhập với Spotify</span></button><button class="btn" id="maCidRe" style="font-size:12px">Đổi Client ID</button>`;
    $("#maSp",box).onclick=()=>S.login(true).catch(e=>toast(e.message));$("#maCidRe",box).onclick=()=>{S.setCid("");maSP(box)};return}
  const me=S.me(),acs=S.accounts();const prem=me.product==="premium";
  box.innerHTML=`<div class="ma-me">${me.img?`<img src="${esc(me.img)}" alt="" referrerpolicy="no-referrer">`:""}<span class="ma-who"><b>${esc(me.name)}</b><small>${prem?"Spotify Premium":"Spotify Free"}${me.email?" · "+esc(me.email):""}</small></span><button class="btn" id="maSsw">Đổi</button><button class="ghost ic" id="maSout" title="Đăng xuất tài khoản này" aria-label="Đăng xuất Spotify">${ic("close")}</button></div>
    ${acs.length>1?`<div class="ma-accs">${acs.filter(a=>!a.active).map(a=>`<button class="chip" data-spa="${esc(a.id)}">${esc(a.name)}${a.product==="premium"?" ★":""}</button>`).join("")}</div>`:""}
    ${prem?`<div class="field"><label for="spDev">Phát qua</label><select id="spDev"><option value="auto">Thiết bị Spotify đang mở (tự chọn)</option><option value="local">Trình phát trong trang Sổ Học</option><option value="embed">Trình phát nhúng</option></select></div><div id="spNow" class="sp-nowbox"><span class="spin"></span></div>`
      :`<div class="muted" style="font-size:12px">Tài khoản Free: phát bằng trình phát nhúng. Nâng lên Premium để điều khiển ứng dụng Spotify thật và phát đủ bài trong trang.</div>`}
    <form class="ma-q" id="maQ"><input class="input" id="maQi" placeholder="Tìm trên Spotify" value="${esc(local.get("maQs","lofi beats"))}"><button class="btn">${ic("search")}</button></form><div id="maRes"></div>
    <h4>Danh sách phát của bạn</h4><div id="maMine"><span class="spin"></span></div><h4>Bài hát đã lưu</h4><div id="maSaved"><span class="spin"></span></div>`;
  $("#maSsw",box).onclick=()=>S.login(true).catch(e=>toast(e.message));$("#maSout",box).onclick=()=>{S.logout();maSP(box)};$$("[data-spa]",box).forEach(b=>b.onclick=()=>{S.switchTo(b.dataset.spa);maSP(box)});
  const im=a=>a&&a[0]&&a[0].url;const fail=(el,e)=>{el.innerHTML=MA_ERR(e)+(e&&e.code==="needs_reauth"?`<button class="btn" data-relog>${ic("sync")} Đăng nhập lại</button>`:"");const b=$("[data-relog]",el);if(b)b.onclick=()=>S.login(false)};
  const bindL=(el,items)=>$$("[data-mi]",el).forEach(b=>b.onclick=()=>spPlay(items[+b.dataset.mi]));
  if(prem){const sel=$("#spDev",box);(async()=>{try{const d=await S.api("me/player/devices");(d.devices||[]).forEach(x=>{const o=document.createElement("option");o.value=x.id;o.textContent=`${x.name} (${({Computer:"máy tính",Smartphone:"điện thoại",Speaker:"loa",TV:"TV"})[x.type]||x.type})${x.is_active?" · đang mở":""}`;sel.appendChild(o)})}catch(e){}sel.value=[...sel.options].some(o=>o.value===UI.spDev)?UI.spDev:"auto"})();
    sel.onchange=async()=>{UI.spDev=sel.value;local.set("spDev",UI.spDev);if(!["auto","local","embed"].includes(sel.value)){try{await S.api("me/player",null,{method:"PUT",body:{device_ids:[sel.value],play:true}});toast("Đã chuyển phát sang "+sel.options[sel.selectedIndex].text);setTimeout(spNow,800)}catch(e){toast(e.message,4500)}}else if(sel.value==="local"){try{const id=await S.startPlayer();await S.api("me/player",null,{method:"PUT",body:{device_ids:[id],play:false}});toast("Trình phát trong trang đã sẵn sàng")}catch(e){toast(e.message,4500)}}};
    spNow();_spPoll=setInterval(()=>{if(!document.body.contains(box)){clearInterval(_spPoll);return}spNow()},5000)}
  (async()=>{const m=$("#maMine",box);try{const r=await S.api("me/playlists",{limit:"50"});const it=(r.items||[]).filter(Boolean).map(p=>({title:p.name,sub:(p.tracks&&p.tracks.total||0)+" bài",img:im(p.images),url:"https://open.spotify.com/playlist/"+p.id,uri:"spotify:playlist:"+p.id}));m.innerHTML=maList2(it,"sp");bindL(m,it)}catch(e){fail(m,e)}})();
  (async()=>{const m=$("#maSaved",box);try{const r=await S.api("me/tracks",{limit:"20"});const it=(r.items||[]).map(x=>x.track).filter(Boolean).map(t=>({title:t.name,sub:(t.artists||[]).map(a=>a.name).join(", "),img:im(t.album&&t.album.images),url:"https://open.spotify.com/track/"+t.id,uri:"spotify:track:"+t.id}));m.innerHTML=maList2(it,"sp");bindL(m,it)}catch(e){fail(m,e)}})();
  $("#maQ",box).onsubmit=async e=>{e.preventDefault();const q=$("#maQi",box).value.trim();if(!q)return;local.set("maQs",q);const R=$("#maRes",box);R.innerHTML=`<span class="spin"></span>`;
    try{const r=await S.api("search",{q,type:"playlist,track",limit:"8"});const it=[...((r.playlists&&r.playlists.items)||[]).filter(Boolean).map(p=>({title:p.name,sub:"Danh sách · "+(p.owner&&p.owner.display_name||""),img:im(p.images),url:"https://open.spotify.com/playlist/"+p.id,uri:"spotify:playlist:"+p.id})),...((r.tracks&&r.tracks.items)||[]).map(t=>({title:t.name,sub:(t.artists||[]).map(a=>a.name).join(", "),img:im(t.album&&t.album.images),url:"https://open.spotify.com/track/"+t.id,uri:"spotify:track:"+t.id}))];R.innerHTML=maList2(it,"sp");bindL(R,it)}catch(er){fail(R,er)}}}
maDraw=async function(boxArg){const box=boxArg||$("#maBody");if(!box)return;if(!P.local){box.innerHTML=`<div class="mapp-note"><p>Ứng dụng YouTube / Spotify chạy trên <b>bản web</b> (trang Netlify).</p></div>`;return}return UI.maTab==="yt"?maYT(box):maSP(box)};
/* trạng thái Spotify đổi → cập nhật thẻ đang phát */
addEventListener("sohoc:spstate",()=>{clearTimeout(spNow._t);spNow._t=setTimeout(spNow,400)});

/* =====================================================================
   v24 — “Đang phát” + “Tiếp theo” như ứng dụng thật
   - YouTube: đọc danh sách của trình phát (vị trí, video kế tiếp), bấm để nhảy bài,
     trước / sau / trộn bài; xem bên trong từng danh sách phát
   - Spotify: hàng đợi thật của tài khoản (/me/player/queue), bấm để phát từ bài đó;
     xem bài trong danh sách phát
   ===================================================================== */
Object.assign(IC,{prev:'<path d="M6 5v14"/><path d="M18 6l-9 6 9 6z"/>',next:'<path d="M18 5v14"/><path d="M6 6l9 6-9 6z"/>',list:'<path d="M4 6h11M4 12h11M4 18h7"/><path d="M17 14v6l4-3z"/>',...(IC.music?{}:{music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'})});

/* ---------------- Spotify: hàng đợi thật + bài trong danh sách ---------------- */
{const _spNow25=spNow;spNow=async function(){await _spNow25.apply(this,arguments);const box=$("#spNow");if(!box||!$(".sp-now",box))return;const S=SP();
  try{const q=await S.api("me/player/queue");const st=await S.api("me/player").catch(()=>null);const ctx=st&&st.context&&st.context.uri;const L=(q.queue||[]).slice(0,10);if(!document.body.contains(box))return;
    let n=$(".ma-next",box);if(!n){n=document.createElement("div");n.className="ma-next";box.appendChild(n)}
    const im=t=>t.album&&t.album.images&&t.album.images.length?t.album.images[t.album.images.length-1].url:(t.images&&t.images[0]&&t.images[0].url);
    const h=L.length?`<div class="ma-nh">Tiếp theo${ctx?` <small>· trong ${ctx.startsWith("spotify:playlist")?"danh sách phát":ctx.startsWith("spotify:album")?"album":"ngữ cảnh"} đang phát</small>`:""}</div>${L.map((t,i)=>`<button class="ma-nx" data-spq="${i}">${im(t)?`<img src="${esc(im(t))}" alt="" loading="lazy">`:`<span class="ma-ph sm">${i+1}</span>`}<span><b>${esc(t.name)}</b><small>${esc((t.artists||[]).map(a=>a.name).join(", ")||(t.show&&t.show.name)||"")}</small></span></button>`).join("")}`:`<div class="ma-nh">Tiếp theo</div><div class="muted" style="font-size:12px">Hàng đợi trống.</div>`;
    if(n._h!==h){n._h=h;n.innerHTML=h;$$("[data-spq]",n).forEach(b=>b.onclick=async()=>{const t=L[+b.dataset.spq];try{const dev=st&&st.device&&st.device.id;const body=ctx&&!ctx.includes(":artist:")?{context_uri:ctx,offset:{uri:t.uri}}:{uris:[t.uri,...L.slice(+b.dataset.spq+1).map(x=>x.uri)]};await S.api("me/player/play",dev?{device_id:dev}:null,{method:"PUT",body});toast("Đang phát: "+t.name,1600);setTimeout(spNow,600)}catch(e){toast(e.message,4000)}})}}
  catch(e){}}}
{const _maSP25=maSP;maSP=async function(box){const r=await _maSP25.apply(this,arguments);try{const add=root=>$$(".ma-it2",root).forEach(row=>{if($("[data-splist]",row))return;const a=row.querySelector("a.ma-open");const m=a&&(a.getAttribute("href")||"").match(/open\.spotify\.com\/playlist\/(\w+)/);if(!m)return;
      const b=$("[data-mi]",row);const t=document.createElement("button");t.className="ma-open";t.dataset.splist=m[1];t.title="Xem các bài trong danh sách";t.innerHTML=ic("list");row.insertBefore(t,b.nextSibling);t.onclick=e=>{e.stopPropagation();spListView(box,m[1],$("b",b).textContent)}});
    const mo=new MutationObserver(()=>add(box));mo.observe(box,{childList:true,subtree:true});add(box)}catch(e){}return r}}
async function spListView(box,id,title){const S=SP();const host=document.createElement("div");host.className="ma-detail";host.innerHTML=`<div class="ma-dh"><button class="ghost ic" data-back aria-label="Quay lại">${ic("back")}</button><b>${esc(title||"Danh sách phát")}</b><button class="pill-btn primary sp" data-pall>${ic("play")} Phát</button></div><div class="ma-dl"><span class="spin"></span></div>`;
  const keep=[...box.children];keep.forEach(c=>c.hidden=true);box.appendChild(host);$("[data-back]",host).onclick=()=>{host.remove();keep.forEach(c=>c.hidden=false)};
  const it0={title,url:"https://open.spotify.com/playlist/"+id,uri:"spotify:playlist:"+id};$("[data-pall]",host).onclick=()=>spPlay(it0);
  try{const r=await S.api("playlists/"+id+"/tracks",{limit:"100",fields:"items(track(name,uri,id,artists(name),album(images)))"});const L=(r.items||[]).map(x=>x.track).filter(t=>t&&t.uri);const el=$(".ma-dl",host);
    el.innerHTML=L.length?L.map((t,i)=>{const im=t.album&&t.album.images&&t.album.images.length?t.album.images[t.album.images.length-1].url:"";return `<button class="ma-nx" data-spt="${i}">${im?`<img src="${esc(im)}" alt="" loading="lazy">`:`<span class="ma-ph sm">${i+1}</span>`}<span><b>${esc(t.name)}</b><small>${esc((t.artists||[]).map(a=>a.name).join(", "))}</small></span></button>`}).join(""):`<div class="muted" style="font-size:13px">Danh sách trống.</div>`;
    $$("[data-spt]",el).forEach(b=>b.onclick=async()=>{const t=L[+b.dataset.spt];const me=S.me();if(!me||me.product!=="premium"){window.addMusicLinks(["https://open.spotify.com/track/"+t.id]);return}
      try{let dev=UI.spDev;if(dev==="auto"||dev==="embed"){const d=await S.api("me/player/devices");const a=(d.devices||[]).find(x=>x.is_active);dev=a?a.id:await S.startPlayer()}else if(dev==="local")dev=await S.startPlayer();
        await S.api("me/player/play",{device_id:dev},{method:"PUT",body:{context_uri:it0.uri,offset:{uri:t.uri}}});toast("Đang phát: "+t.name,1600);setTimeout(spNow,700)}catch(e){toast(e.message,4500)}})}
  catch(e){$(".ma-dl",host).innerHTML=MA_ERR(e)}}

/* =====================================================================
   v25 — YouTube Premium dùng trực tiếp theo từng tài khoản
   - Tài khoản có Premium → phát bằng chính YouTube / YouTube Music (cửa sổ phát
     riêng của YouTube: không quảng cáo, phát nền, “Tiếp theo” của Premium), hoặc
     trong trang nếu trình duyệt đã đăng nhập tài khoản đó trên youtube.com
   - Không có Premium → trình phát YouTube thường trong trang
   - “Tiếp theo” hiện đúng tên + ảnh từng video (YouTube Data API / noembed)
   ===================================================================== */
const YV=new Map();/* videoId → {title,ch,dur} */
const YL=new Map();/* listId → [videoId] */
const YV_PEND=new Set();
const ytThumb=id=>id?`https://i.ytimg.com/vi/${id}/mqdefault.jpg`:"";
const isoDur=s=>{const m=String(s||"").match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);return m?((+m[1]||0)*86400+(+m[2]||0)*3600+(+m[3]||0)*60+(+m[4]||0)):0};
const fmtD=t=>{t=Math.round(t||0);const h=Math.floor(t/3600),m=Math.floor(t%3600/60),s=t%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(s).padStart(2,"0")};
const ytG=()=>window.SOHOC&&window.SOHOC.yt;
const ytLinked=()=>!!(ytG()&&ytG().has());
const ytPrem=()=>!!(ytG()&&ytG().premium&&ytG().premium());
UI.ytMode=local.get("ytMode","win");/* win = cửa sổ YouTube · music = cửa sổ YouTube Music · page = trong trang */
const ytWin=()=>ytPrem()&&UI.ytMode!=="page";
const ytEmb=()=>window.SOHOC_EMB;
const ytCookieBlock=()=>{const u=navigator.userAgent||"";return /Firefox\//.test(u)||(/Safari\//.test(u)&&!/Chrome|Chromium|Edg\//.test(u))||!!navigator.brave};

/* tên + thời lượng video: Data API khi có tài khoản YouTube, không thì noembed (12 video gần nhất) */
async function ytVids(ids,needDur){const want=[...new Set(ids.filter(Boolean))].filter(id=>!YV_PEND.has(id)&&(!YV.has(id)||(needDur&&YV.get(id).dur==null)));if(!want.length)return;want.forEach(id=>YV_PEND.add(id));
  try{if(ytLinked()&&ytG().acct().fresh){for(let i=0;i<want.length;i+=50){const part=want.slice(i,i+50);
        const r=await ytG().api("videos",{part:"snippet,contentDetails",id:part.join(","),maxResults:"50"});
        (r.items||[]).forEach(v=>YV.set(v.id,{title:v.snippet.title,ch:v.snippet.channelTitle||"",dur:isoDur(v.contentDetails&&v.contentDetails.duration)}));
        part.forEach(id=>{if(!YV.has(id))YV.set(id,{title:"Video riêng tư hoặc đã bị xóa",ch:"",dur:0})})}}
    else await Promise.all(want.slice(0,12).map(async id=>{try{const j=await fetch("https://noembed.com/embed?url="+encodeURIComponent("https://www.youtube.com/watch?v="+id)).then(r=>r.json());if(j&&j.title)YV.set(id,{title:j.title,ch:j.author_name||"",dur:0})}catch(e){}}))}
  catch(e){console.warn(e)}finally{want.forEach(id=>YV_PEND.delete(id))}}
async function ytList(list,force){if(!force&&YL.has(list))return YL.get(list);const out=[];let tok=null;
  for(let k=0;k<6;k++){const r=await ytG().api("playlistItems",{part:"snippet",playlistId:list,maxResults:"50",...(tok?{pageToken:tok}:{})});
    (r.items||[]).forEach(x=>{const s=x.snippet||{};const id=s.resourceId&&s.resourceId.videoId;if(!id)return;out.push(id);if(!YV.has(id))YV.set(id,{title:s.title,ch:s.videoOwnerChannelTitle||s.channelTitle||"",dur:null})});
    tok=r.nextPageToken;if(!tok)break}
  YL.set(list,out);return out}

/* ---------------- phát bằng chính YouTube (Premium) ---------------- */
const YQ=Object.assign({list:null,ids:[],idx:0,t0:0,title:""},local.get("ytQ",{}));
const ytQSave=()=>local.set("ytQ",{list:YQ.list,ids:YQ.ids.slice(0,300),idx:YQ.idx,t0:YQ.t0,title:YQ.title});
let YW=null,YWt=0,YWsev=false;
function ytWinURL(id,list,idx){const A=(ytG()&&ytG().acct())||{};const host=UI.ytMode==="music"?"https://music.youtube.com":"https://www.youtube.com";
  const q=new URLSearchParams();if(id)q.set("v",id);if(list){q.set("list",list);if(idx!=null)q.set("index",String(idx+1))}if(A.email)q.set("authuser",A.email);return host+"/watch?"+q}
function ytWinOpen(url){
  try{if(YW&&!YW.closed&&!YWsev){YW.location.href=url;try{YW.focus()}catch(e){}return true}}catch(e){YWsev=true}
  const w=Math.min(560,(screen.availWidth||1200)-40),h=Math.min(820,(screen.availHeight||900)-60);
  YW=window.open(url,"sohocYTP",`popup=yes,width=${w},height=${h},left=${Math.max(0,(screen.availWidth||1200)-w-24)},top=40`);YWt=Date.now();
  if(!YW){toast("Trình duyệt đang chặn cửa sổ bật lên. Cho phép cửa sổ bật lên cho trang này rồi bấm lại.",6000);return false}
  /* một số trình duyệt tách cửa sổ YouTube khỏi trang mở nó → không điều khiển tiếp được */
  setTimeout(()=>{try{if(YW&&YW.closed&&Date.now()-YWt<6000){YWsev=true;ytNowPaint()}}catch(e){}},3000);return true}
function ytWinCur(){let i=Math.min(YQ.idx,Math.max(0,YQ.ids.length-1)),el=(Date.now()-YQ.t0)/1000;
  while(i<YQ.ids.length-1){const v=YV.get(YQ.ids[i]);if(!v||!v.dur)break;if(el<v.dur+2)break;el-=v.dur+2;i++}return {i,el}}
function ytWinPlay(o){const E=ytEmb();if(E&&E.type==="yt"){try{E.pause()}catch(e){}const M=window.SOHOC_MP;if(M){M.paused=true;M.playing=false;try{M.render()}catch(e){}}}
  if(o.list){if(o.list!==YQ.list){YQ.list=o.list;YQ.ids=YL.get(o.list)||[]}}else{YQ.list=null;YQ.ids=o.id?[o.id]:[]}
  if(o.title)YQ.title=o.title;
  const idx=o.idx!=null?o.idx:(o.id&&YQ.ids.indexOf(o.id)>=0?YQ.ids.indexOf(o.id):0);const id=o.id||YQ.ids[idx]||null;
  YQ.idx=idx;YQ.t0=Date.now();ytQSave();
  const ok=ytWinOpen(ytWinURL(id,YQ.list,YQ.list?idx:null));
  const more=()=>ytVids(YQ.ids.slice(Math.max(0,YQ.idx-1),YQ.idx+40),true).then(ytNowPaint);
  if(YQ.list&&!YQ.ids.length&&ytLinked())ytList(YQ.list).then(ids=>{if(YQ.list!==o.list)return;YQ.ids=ids;ytQSave();more()}).catch(e=>console.warn(e));else more();
  ytNowPaint();if(ok)toast("Đang phát bằng YouTube"+(UI.ytMode==="music"?" Music":"")+" Premium của "+(((ytG()&&ytG().acct())||{}).email||"tài khoản này"),2200);return ok}

/* ---------------- khung “Đang phát / Tiếp theo” ---------------- */
const ytRow=(id,i,attr,cur)=>{const v=YV.get(id);return `<button class="ma-nx yt${cur?" cur":""}" data-${attr}="${i}"><img src="${ytThumb(id)}" alt="" loading="lazy" referrerpolicy="no-referrer"><span><b>${esc(v&&v.title||"Đang tải tên video…")}</b><small>${esc(v&&v.ch||"")}${v&&v.dur?" · "+fmtD(v.dur):""}</small></span></button>`};
function ytNowHTML(){
  if(ytWin()){
    if(!YQ.ids.length&&!YQ.list)return `<div class="muted" style="font-size:12.5px">Chọn một danh sách hoặc video bên dưới. Nhạc sẽ phát bằng YouTube${UI.ytMode==="music"?" Music":""} Premium của tài khoản này: không quảng cáo, vẫn phát khi bạn chuyển thẻ hay khóa màn hình.</div>`;
    const {i,el}=ytWinCur();const id=YQ.ids[i];const v=YV.get(id)||{};const pc=v.dur?Math.min(100,Math.round(el/v.dur*100)):0;const alive=!!(YW&&!YW.closed&&!YWsev);
    const next=YQ.ids.slice(i+1,i+11);
    return `<div class="sp-now">${id?`<img src="${ytThumb(id)}" alt="" class="yt16">`:`<span class="ma-ph">${MT_IC.yt}</span>`}<div class="sp-np"><b>${esc(v.title||YQ.title||"YouTube")}</b><small>${esc(v.ch||YQ.title||"")}${YQ.ids.length>1?` · bài ${i+1}/${YQ.ids.length}`:""}</small><i class="sp-bar yt"><i style="width:${pc}%"></i></i></div></div>
      <div class="sp-ctl"><span class="yt-badge">${MT_IC.yt} ${UI.ytMode==="music"?"YouTube Music":"YouTube"} Premium</span><span class="grow"></span><button class="ghost ic" data-ywc="prev" aria-label="Video trước">${ic("prev")}</button><button class="pill-btn primary yt" data-ywc="show">${ic("ext")} ${alive?"Hiện cửa sổ":"Mở cửa sổ"}</button><button class="ghost ic" data-ywc="next" aria-label="Video tiếp">${ic("next")}</button></div>
      <p class="ma-tip">${YWsev?"Trình duyệt này tách cửa sổ YouTube khỏi Sổ Học, nên Sổ Học không chuyển bài trong cửa sổ đó được. Hãy chuyển bài bằng ⏭ hoặc mục “Tiếp theo” ngay trong cửa sổ YouTube. Bấm một bài ở đây sẽ mở cửa sổ phát mới.":"Phát/dừng và âm lượng nằm trong cửa sổ YouTube (hoặc phím media trên bàn phím). Bài đang phát ở đây được ước tính theo thời lượng video."}</p>
      ${next.length?`<div class="ma-next"><div class="ma-nh">Tiếp theo</div>${next.map((x,k)=>ytRow(x,i+1+k,"ywi")).join("")}</div>`:""}`}
  const E=ytEmb();const I=window.__ytInfo||{};if(!E||E.type!=="yt")return `<div class="muted" style="font-size:12.5px">Chưa phát gì từ YouTube. Chọn một danh sách bên dưới.</div>`;
  const ids=Array.isArray(I.playlist)?I.playlist:[];const idx=typeof I.playlistIndex==="number"?I.playlistIndex:-1;
  const vd=I.videoData||{};const vid=vd.video_id||(E.info&&E.info.id);const v=YV.get(vid)||{};const playing=I.playerState===1||I.playerState===3;
  const pc=I.duration?Math.round((I.currentTime||0)/I.duration*100):0;const next=idx>=0?ids.slice(idx+1,idx+11):[];
  return `<div class="sp-now">${vid?`<img src="${ytThumb(vid)}" alt="" class="yt16">`:`<span class="ma-ph">${MT_IC.yt}</span>`}<div class="sp-np"><b>${esc(vd.title||v.title||"YouTube")}</b><small>${esc(vd.author||v.ch||"")}${idx>=0&&ids.length?` · bài ${idx+1}/${ids.length}`:""}</small><i class="sp-bar yt"><i style="width:${pc}%"></i></i></div></div>
    <div class="sp-ctl"><button class="ghost ic" data-ytc="prev" aria-label="Video trước">${ic("prev")}</button><button class="pill-btn primary yt" data-ytc="${playing?"pause":"play"}" aria-label="${playing?"Tạm dừng":"Phát"}">${ic(playing?"pause":"play")}</button><button class="ghost ic" data-ytc="next" aria-label="Video tiếp">${ic("next")}</button><button class="ghost ic ${UI.ytShuf?"on":""}" data-ytc="shuf" aria-label="Trộn bài" title="Trộn bài">${ic("shuffle")}</button>${vid?`<a class="ghost ic" href="${esc(ytWinURL(vid,E.info&&E.info.list,idx>=0?idx:null))}" target="_blank" rel="noopener" data-ytext title="Mở trong YouTube">${ic("ext")}</a>`:""}<span class="grow"></span>${ytPrem()?"":`<span class="yt-badge plain">YouTube thường</span>`}</div>
    ${next.length?`<div class="ma-next"><div class="ma-nh">Tiếp theo</div>${next.map((x,k)=>ytRow(x,idx+1+k,"yti")).join("")}</div>`:""}`}
function ytNowBind(box){const E=ytEmb();
  $$("[data-ytc]",box).forEach(b=>b.onclick=()=>{if(!E||E.type!=="yt")return;const a=b.dataset.ytc;const M=window.SOHOC_MP;
    if(a==="prev")E.yt("previousVideo");if(a==="next")E.yt("nextVideo");if(a==="play"){E.play();if(M)M.paused=false}if(a==="pause"){E.pause();if(M)M.paused=true}
    if(a==="shuf"){UI.ytShuf=!UI.ytShuf;E.yt("setShuffle",[!!UI.ytShuf]);toast(UI.ytShuf?"Đã bật trộn bài":"Đã tắt trộn bài",1500)}setTimeout(ytNowPaint,350)});
  $$("[data-yti]",box).forEach(b=>b.onclick=()=>{if(E&&E.type==="yt"){E.yt("playVideoAt",[+b.dataset.yti]);setTimeout(ytNowPaint,500)}});
  $$("[data-ywi]",box).forEach(b=>b.onclick=()=>{const k=+b.dataset.ywi;ytWinPlay({list:YQ.list,idx:k,id:YQ.ids[k]})});
  $$("[data-ywc]",box).forEach(b=>b.onclick=()=>{const a=b.dataset.ywc;const {i}=ytWinCur();
    if(a==="show"){if(YW&&!YW.closed&&!YWsev){try{YW.focus()}catch(e){}}else ytWinPlay({list:YQ.list,idx:i,id:YQ.ids[i]});return}
    if(!YQ.ids.length)return;const j=Math.max(0,Math.min(YQ.ids.length-1,i+(a==="next"?1:-1)));ytWinPlay({list:YQ.list,idx:j,id:YQ.ids[j]})})}
function ytNowPaint(){const box=$("#ytNow");if(!box)return;const h=ytNowHTML();if(box._h===h)return;box._h=h;box.innerHTML=h;ytNowBind(box)}
let _ytLT=0;addEventListener("sohoc:yt",()=>{clearTimeout(_ytLT);_ytLT=setTimeout(()=>{const I=window.__ytInfo||{};const ids=Array.isArray(I.playlist)?I.playlist:[];const idx=typeof I.playlistIndex==="number"?I.playlistIndex:0;
  const want=[I.videoData&&I.videoData.video_id,...ids.slice(Math.max(0,idx),idx+12)].filter(Boolean);if(want.some(id=>!YV.has(id)))ytVids(want).then(ytNowPaint);ytNowPaint()},250)});
setInterval(()=>{if(ytWin()&&document.visibilityState==="visible"&&$("#ytNow"))ytNowPaint()},5000);

/* ---------------- ứng dụng YouTube trong mục Nhạc ---------------- */
function ytRows(items){return `<div class="ma-list">${items.map((it,i)=>`<div class="ma-it2"><button class="ma-it" data-mi="${i}" title="Phát ${esc(it.title)}">${it.img?`<img src="${esc(it.img)}" alt="" referrerpolicy="no-referrer" loading="lazy">`:`<span class="ma-ph">${it.kind==="pl"?ic("list"):MT_IC.yt}</span>`}<span class="nm"><b>${esc(it.title)}</b><small>${esc(it.sub||"")}</small></span>${ic("play")}</button>${it.kind==="pl"?`<button class="ma-open" data-yl="${i}" title="Xem các video trong danh sách" aria-label="Xem các video trong ${esc(it.title)}">${ic("list")}</button>`:""}<a class="ma-open" href="${esc(UI.ytMode==="music"&&ytPrem()?it.ymUrl:it.ytUrl)}" target="_blank" rel="noopener" title="Mở trong ứng dụng YouTube${UI.ytMode==="music"&&ytPrem()?" Music":""}" data-ytext>${ic("ext")}</a></div>`).join("")||`<div class="muted" style="font-size:13px;padding:8px">Không có gì ở đây.</div>`}</div>`}
function ytPlayItem(it){if(ytWin()){if(it.kind==="pl")ytWinPlay({list:it.id,idx:0,title:it.title});else ytWinPlay({id:it.id,title:it.title});return}
  window.addMusicLinks([it.url]).then(ok=>{if(ok)toast("Đang phát: "+it.title,1600)})}
async function ytListView(box,list,title){const host=document.createElement("div");host.className="ma-detail";
  host.innerHTML=`<div class="ma-dh"><button class="ghost ic" data-back aria-label="Quay lại">${ic("back")}</button><b>${esc(title||"Danh sách phát")}</b><button class="pill-btn primary yt" data-pall>${ic("play")} Phát tất cả</button></div><div class="ma-dl"><span class="spin"></span></div>`;
  const keep=[...box.children];keep.forEach(c=>c.hidden=true);box.appendChild(host);$("[data-back]",host).onclick=()=>{host.remove();keep.forEach(c=>c.hidden=false)};
  $("[data-pall]",host).onclick=()=>ytPlayItem(ytItem({kind:"pl",id:list,title}));
  try{const ids=await ytList(list,true);const L=$(".ma-dl",host);
    L.innerHTML=ids.length?ids.map((id,k)=>ytRow(id,k,"yv")).join(""):`<div class="muted" style="font-size:13px">Danh sách trống (hoặc YouTube không cho xem danh sách này).</div>`;
    ytVids(ids.slice(0,50),true).then(()=>{if(!document.body.contains(L))return;$$("[data-yv]",L).forEach(b=>{const v=YV.get(ids[+b.dataset.yv]);const s=$("small",b);if(v&&s)s.textContent=(v.ch||"")+(v.dur?" · "+fmtD(v.dur):"")})});
    $$("[data-yv]",L).forEach(b=>b.onclick=()=>{const k=+b.dataset.yv,id=ids[k];
      if(ytWin()){ytWinPlay({list,idx:k,id,title});return}
      const E=ytEmb();if(E&&E.type==="yt"&&E.info&&E.info.list===list){E.yt("playVideoAt",[k]);toast("Đang phát: "+((YV.get(id)||{}).title||""),1500);return}
      window.addMusicLinks([`https://www.youtube.com/watch?v=${id}&list=${list}&index=${k+1}`])})}
  catch(e){$(".ma-dl",host).innerHTML=MA_ERR({message:gcErr(e)})}}

maYT=async function(box){const G=window.SOHOC;if(!G||!G.yt){box.innerHTML=`<p class="muted" style="margin:0">Ứng dụng YouTube chỉ có ở bản web Sổ Học.</p>`;return}
  if(!G.clientId()){box.innerHTML=`<p style="margin:0">Cần Google Client ID (Cài đặt → Tài khoản Google) và bật <b>YouTube Data API v3</b> trong Google Cloud Console.</p><button class="btn" id="maSet">${ic("gear")} Mở Cài đặt</button>`;$("#maSet",box).onclick=()=>{closePop();closeDialog();settingsDialog("google")};return}
  const A=G.yt.acct();
  if(!A){box.innerHTML=`<p style="margin:0">Kết nối <b>tài khoản YouTube</b>. Có thể là một tài khoản Google <b>khác</b> với tài khoản bạn đang dùng cho Sổ Học, ví dụ tài khoản có YouTube Premium.</p><button class="g-btn" id="maYt">${typeof G_LOGO!=="undefined"?G_LOGO:""}<span>Chọn tài khoản YouTube</span></button><p class="muted" style="font-size:12px;margin:0">Chỉ xin quyền xem (danh sách phát, video đã thích). Tài khoản phải có trong Test users của ứng dụng Google (README mục 4).</p>`;
    $("#maYt",box).onclick=async()=>{try{await G.yt.link(true);maYT(box)}catch(e){toast(gcErr(e),5000)}};return}
  const prem=!!A.prem,au=A.email||"";
  const modeSel=prem?`<div class="field"><label for="ytMode">Phát qua</label><select id="ytMode"><option value="win">YouTube Premium (cửa sổ YouTube)</option><option value="music">YouTube Music Premium</option><option value="page">Trong trang Sổ Học</option></select></div>`:"";
  const pageNote=prem&&UI.ytMode==="page"?`<div class="ma-tip box">Trình phát trong trang chỉ nhận Premium khi trình duyệt này <b>đã đăng nhập ${esc(au)}</b> trên youtube.com và cho phép cookie của YouTube trong trang khác.${ytCookieBlock()?` <b>Trình duyệt bạn đang dùng chặn cookie đó</b>, nên ở chế độ này vẫn có thể có quảng cáo. Hãy chọn “YouTube Premium (cửa sổ YouTube)”.`:""} <a href="https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(au)}&continue=${encodeURIComponent("https://www.youtube.com/")}" target="_blank" rel="noopener" data-ytext>Đăng nhập YouTube trên trình duyệt</a></div>`:"";
  box.innerHTML=`<div class="ma-me">${A.ch&&A.ch.img||A.pic?`<img src="${esc(A.ch&&A.ch.img||A.pic)}" alt="" referrerpolicy="no-referrer">`:""}<span class="ma-who"><b>${esc(A.ch&&A.ch.title||A.name||"YouTube")}</b><small>${esc(au)}</small></span><button class="btn" id="maYsw" title="Dùng tài khoản YouTube khác">Đổi</button><button class="ghost ic" id="maYout" title="Ngắt kết nối YouTube" aria-label="Ngắt kết nối YouTube">${ic("close")}</button></div>
    ${A.prem===undefined?`<div class="ma-ask"><b>Tài khoản ${esc(au)} có YouTube Premium không?</b><small>Google không cho trang web khác đọc gói Premium, nên Sổ Học hỏi bạn một lần cho mỗi tài khoản. Có Premium thì nhạc phát bằng chính YouTube Premium; không thì dùng YouTube thường.</small><div class="row"><button class="pill-btn primary yt" data-pr="1">Có Premium</button><button class="btn" data-pr="0">Không có</button></div></div>`
      :`<label class="ma-prtog"><input type="checkbox" class="chk" id="maPrem" ${prem?"checked":""}><span><b>${prem?"YouTube Premium đang bật":"YouTube thường"}</b><small>${prem?"Phát bằng YouTube Premium của tài khoản này: không quảng cáo, phát nền.":"Bật nếu tài khoản này có gói Premium."}</small></span></label>`}
    ${A.fresh?"":`<div class="warnbox" style="font-size:12.5px">Phiên YouTube đã hết hạn. <button class="btn" id="maYre" style="margin-left:6px">${ic("sync")} Kết nối lại</button></div>`}
    ${modeSel}${pageNote}<div id="ytNow" class="sp-nowbox yt"></div>
    <form class="ma-q" id="maQ"><input class="input" id="maQi" placeholder="Tìm trên YouTube, ví dụ: lofi study" value="${esc(local.get("maQ","lofi hip hop study"))}"><button class="btn" aria-label="Tìm">${ic("search")}</button></form><div id="maRes"></div>
    <h4>Danh sách phát của bạn</h4><div id="maMine"><span class="spin"></span></div>`;
  ytNowPaint();
  const sel=$("#ytMode",box);if(sel){sel.value=["win","music","page"].includes(UI.ytMode)?UI.ytMode:"win";sel.onchange=()=>{UI.ytMode=sel.value;local.set("ytMode",UI.ytMode);if(UI.ytMode!=="page"){const E=ytEmb();if(E&&E.type==="yt")try{E.pause()}catch(e){}}maYT(box)}}
  $$("[data-pr]",box).forEach(b=>b.onclick=()=>{G.yt.setPrem(b.dataset.pr==="1");if(b.dataset.pr==="1"&&!local.get("ytMode",null)){UI.ytMode="win";local.set("ytMode","win")}toast(b.dataset.pr==="1"?"Đã bật YouTube Premium cho "+au:"Dùng YouTube thường cho "+au,2200);maYT(box)});
  const pt=$("#maPrem",box);if(pt)pt.onchange=()=>{G.yt.setPrem(pt.checked);maYT(box)};
  $("#maYsw",box).onclick=async()=>{try{await G.yt.link(true);maYT(box)}catch(e){toast(gcErr(e),5000)}};$("#maYout",box).onclick=()=>{G.yt.logout();maYT(box)};
  const re=$("#maYre",box);if(re)re.onclick=async()=>{try{await G.yt.link(false);maYT(box)}catch(e){toast(gcErr(e),5000)}};
  const bindL=(el,items)=>{$$("[data-mi]",el).forEach(b=>b.onclick=()=>ytPlayItem(items[+b.dataset.mi]));$$("[data-yl]",el).forEach(b=>b.onclick=e=>{e.stopPropagation();const it=items[+b.dataset.yl];ytListView(box,it.id,it.title)})};
  (async()=>{const m=$("#maMine",box);try{const r=await G.yt.api("playlists",{part:"snippet,contentDetails",mine:"true",maxResults:"50"});
      const it=[ytItem({kind:"pl",id:"LL",title:"Video đã thích",sub:"Danh sách tự động",au}),...(r.items||[]).map(p=>ytItem({kind:"pl",id:p.id,title:p.snippet.title,sub:(p.contentDetails&&p.contentDetails.itemCount||0)+" video",img:p.snippet.thumbnails&&(p.snippet.thumbnails.medium||p.snippet.thumbnails.default||{}).url,au}))];
      m.innerHTML=ytRows(it);bindL(m,it)}catch(e){m.innerHTML=MA_ERR({message:gcErr(e)})}})();
  $("#maQ",box).onsubmit=async e=>{e.preventDefault();const q=$("#maQi",box).value.trim();if(!q)return;local.set("maQ",q);const R=$("#maRes",box);R.innerHTML=`<span class="spin"></span>`;
    try{const r=await G.yt.api("search",{part:"snippet",q,type:"video,playlist",maxResults:"12"});const dec=t=>{const d=document.createElement("textarea");d.innerHTML=t;return d.value};
      const it=(r.items||[]).map(x=>ytItem({kind:x.id.playlistId?"pl":"v",id:x.id.playlistId||x.id.videoId,title:dec(x.snippet.title),sub:(x.id.playlistId?"Danh sách · ":"")+x.snippet.channelTitle,img:x.snippet.thumbnails&&(x.snippet.thumbnails.medium||x.snippet.thumbnails.default||{}).url,au}));
      R.innerHTML=ytRows(it);bindL(R,it)}catch(er){R.innerHTML=MA_ERR({message:gcErr(er)})}}};

/* =====================================================================
   BẢN WEB ĐỘC LẬP — cài đặt AI, đăng nhập Google, sao lưu dữ liệu
   ===================================================================== */
P.local=true;
Object.assign(IC,{gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',google:'<path d="M20 12.2c0-.6-.1-1.2-.2-1.7H12v3.3h4.5a3.9 3.9 0 0 1-1.7 2.5v2h2.7c1.6-1.5 2.5-3.6 2.5-6.1z"/><path d="M12 20.5c2.3 0 4.2-.8 5.5-2.1l-2.7-2a5 5 0 0 1-7.5-2.7H4.5v2.1A8.5 8.5 0 0 0 12 20.5z"/><path d="M7.3 13.7a5 5 0 0 1 0-3.4V8.2H4.5a8.5 8.5 0 0 0 0 7.6z"/><path d="M12 6.7c1.3 0 2.4.4 3.3 1.3l2.4-2.4A8.5 8.5 0 0 0 4.5 8.2l2.8 2.1A5 5 0 0 1 12 6.7z"/>'});
RAIL_ALL.set=["Cài đặt AI & tài khoản","gear"];TOP_ALL.set=["Cài đặt","gear"];
UI.dash=normDash(local.get("dash",null));
const _railAct10=railAct;railAct=function(k,btn){if(k==="set"){hideTip();closeFly();return settingsDialog()}return _railAct10(k,btn)};
const _topAct10=topAct;topAct=function(k){if(k==="set")return settingsDialog();return _topAct10(k)};
window.addEventListener("sohoc:me",async()=>{try{P.me=await P.user.me()}catch(e){}renderRail();if(UI.view==="home")renderHome()});

const _aiErr10=aiErr;
aiErr=function(e){const c=e&&e.code;const pn=SOHOC.provider()==="claude"?"Claude":"Google Gemini";
  if(c==="not_granted")return `Chưa có API key ${pn}. Bấm biểu tượng bánh răng ở thanh bên trái → Cài đặt AI để thêm.`;
  if(c==="bad_key")return `API key ${pn} không đúng hoặc đã hết hiệu lực. Kiểm tra lại trong Cài đặt AI.`;
  if(c==="bad_model")return `Không dùng được mô hình “${SOHOC.model(null)}”. Bấm “Lấy danh sách mô hình” trong Cài đặt AI để chọn mô hình khác.`;
  if(c==="rate_limited")return `${pn} đang quá tải hoặc bạn đã dùng hết lượt miễn phí trong phút/ngày. Đợi một chút rồi thử lại.`;
  if(c==="refused")return String(e.message||"AI từ chối trả lời nội dung này.");
  if(c==="network")return `Không kết nối được tới ${pn}. Kiểm tra mạng rồi thử lại.`;
  if(c==="api_error")return `${pn} báo lỗi: `+String(e.message||"").slice(0,200);
  return _aiErr10(e)};
gcErr=function(e){const c=e&&e.code;
  if(c==="no_client"||c==="server_not_connected")return "Chưa cấu hình Google Client ID — mở Cài đặt (bánh răng) để thêm.";
  if(c==="needs_reauth")return "Phiên Google hết hạn — mở menu tài khoản và bấm liên kết lại.";
  if(c==="popup_closed")return "Bạn đã đóng cửa sổ đăng nhập Google.";
  if(c==="approval_required")return e&&e.message&&!/^approval/.test(e.message)?String(e.message):"Bạn chưa cho phép trang dùng tài khoản Google này.";
  return "Google báo lỗi: "+String(e&&e.message||e).slice(0,160)};

const G_LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
const gAv=a=>a&&a.pic?`<img class="av" src="${esc(a.pic)}" alt="" referrerpolicy="no-referrer">`:`<span class="av">${esc(((a&&(a.name||a.email))||"?")[0].toUpperCase())}</span>`;
const gAccts=()=>SOHOC.google.accounts();
const gAct=()=>gAccts().find(a=>a.active)||null;
async function gDo(fn,ok){if(!SOHOC.clientId()){toast("Cần Google Client ID trước — mở Cài đặt",4000);settingsDialog("google");return false}
  try{await fn();if(ok)toast(ok);UI.gcCache={};if(UI.view==="cal")renderCalPage();return true}catch(e){toast(gcErr(e),5000);return false}}
async function accountMenu(anchor){
  const A=gAccts(),a=gAct();const key=SOHOC.hasKey();const svc=a?a.svc:{};
  const row=(k,icn,l,on,act)=>`<button data-sv="${k}">${ic(icn)}<span style="flex:1">${l}</span>${on?`<b style="color:var(--ok)">✓ đã liên kết</b>`:`<b style="color:var(--accent)">${act}</b>`}</button>`;
  const m=popMenu(anchor,`<div class="who">${a?`<div class="who-acc">${gAv(a)}<div style="min-width:0"><b style="color:var(--ink)">${esc(a.name||"Tài khoản Google")}</b><br><span style="font-size:12px">${esc(a.email||"")}</span></div></div>`:`<b style="color:var(--ink)">Chế độ khách</b><br>Dữ liệu khách lưu trên trình duyệt này. Mỗi tài khoản Google có sổ học, sticker và giao diện riêng.`}</div>
    ${A.filter(x=>!x.active).map(x=>`<button data-sw="${esc(x.id)}">${x.pic?`<img src="${esc(x.pic)}" alt="" referrerpolicy="no-referrer" style="width:18px;height:18px;border-radius:50%">`:ic("user")}<span style="flex:1;overflow:hidden;text-overflow:ellipsis">Chuyển sang ${esc(x.email||x.name)}</span></button>`).join("")}
    <button data-a="in">${ic("google")}${a?"Thêm tài khoản Google khác":"Đăng nhập bằng Google"}</button><div class="sep"></div>
    ${a?row("cal","cal","Google Calendar",svc.cal,"Liên kết")+row("mail","mail","Gmail",svc.mail,"Liên kết"):""}
    ${a&&svc.cal?`<button data-a="gc">${ic("cal")}Xem lịch học</button>`:""}${a&&svc.mail?`<button data-a="gm">${ic("mail")}Mở hộp thư Gmail</button>`:""}
    <button data-a="man">${ic("user")}Quản lý tài khoản & quyền</button>
    <button data-a="set">${ic("key")}Cài đặt AI (${SOHOC.provider()==="claude"?"Claude":"Gemini"}) ${key?"<span class='muted'>(đã có key)</span>":"<b style='color:var(--warn)'>(chưa có key)</b>"}</button>
    <button data-a="bak">${ic("dl")}Sao lưu / khôi phục dữ liệu</button>${a?`<div class="sep"></div><button data-a="out" style="color:var(--bad)">${ic("close")}Đăng xuất ${esc(a.email||"")}</button>`:""}${a&&A.length>0?`<button data-sw="__guest">${ic("user")}<span style="flex:1">Chuyển sang chế độ khách</span></button>`:""}`);
  $$("[data-sw]",m).forEach(b=>b.onclick=()=>{SOHOC.google.switchTo(b.dataset.sw);UI.gcCache={}});
  $("[data-a=in]",m).onclick=()=>loginDialog(!!a);
  $$("[data-sv]",m).forEach(b=>b.onclick=()=>{const k=b.dataset.sv;if(svc[k])return k==="cal"?goCal():openMailHub();gDo(()=>SOHOC.google.link(k==="cal"?"Google Calendar":"Gmail"),k==="cal"?"Đã liên kết Google Calendar":"Đã liên kết Gmail").then(ok=>{if(ok&&k==="mail")openMailHub()})});
  const q=(s,f)=>{const b=$(s,m);if(b)b.onclick=f};q("[data-a=gc]",()=>goCal());q("[data-a=gm]",()=>openMailHub());q("[data-a=man]",()=>settingsDialog("google"));
  q("[data-a=set]",()=>settingsDialog());q("[data-a=bak]",()=>settingsDialog("bak"));q("[data-a=out]",()=>{SOHOC.signOut();UI.gcCache={}});
}
/* hộp đăng nhập: chọn tài khoản Google + liên kết dịch vụ trong một lần */
function loginDialog(add){
  if(!SOHOC.clientId()){toast("Cần Google Client ID trước — mở Cài đặt",4000);return settingsDialog("google")}
  const A=gAccts();
  openModal({title:add?"Thêm tài khoản Google":"Đăng nhập",small:true,body:`<div class="login-card">
    <p style="margin:0">Đăng nhập bằng tài khoản Google (Gmail cá nhân hoặc tài khoản trường) để đồng bộ lịch học và đọc thư ngay trong Sổ Học.</p>
    ${A.length&&!add?`<div class="gacc-list">${A.map(x=>`<button type="button" class="gacc${x.active?" on":""}" data-lsw="${esc(x.id)}" style="text-align:left;cursor:pointer">${gAv(x)}<span class="nm">${esc(x.name||x.email)}</span>${x.active?`<span class="tag">Đang dùng</span>`:"<span></span>"}<span class="em">${esc(x.email)}</span></button>`).join("")}</div>`:""}
    <div class="login-opts"><label><input type="checkbox" class="chk" id="lgCal" checked><span><b>Liên kết Google Calendar</b><small>Xem lịch của bạn và lịch lớp/trường được chia sẻ, thêm lịch học vào Google</small></span></label>
      <label><input type="checkbox" class="chk" id="lgMail"><span><b>Liên kết Gmail</b><small>Đọc thư, thêm thư làm nguồn bài học, soạn và gửi thư</small></span></label></div>
    <button type="button" class="g-btn" id="lgGo">${G_LOGO}<span>${add||A.length?"Chọn tài khoản Google":"Tiếp tục với Google"}</span></button>
    <p class="muted" style="margin:0;font-size:12.5px">Google sẽ mở cửa sổ để bạn chọn tài khoản và <b>tích các ô cho phép</b>. Quyền truy cập chỉ lưu trong trình duyệt này; bạn có thể gỡ bất cứ lúc nào ở <i>Quản lý tài khoản</i> hoặc tại myaccount.google.com/permissions.</p></div>`,
    foot:`<div class="grow"></div><button class="pill-btn" data-close>Đóng</button>`});
  $$("[data-lsw]").forEach(b=>b.onclick=()=>{SOHOC.google.switchTo(b.dataset.lsw);closeDialog();UI.gcCache={};toast("Đang dùng "+(gAct()||{}).email)});
  $("#lgGo").onclick=async()=>{const want=[];if($("#lgCal").checked)want.push("cal","calr");if($("#lgMail").checked)want.push("mail","send");
    const ok=await gDo(()=>SOHOC.google.addAccount(want),null);
    if(ok){closeDialog();const a=gAct();toast(`Đã đăng nhập ${a&&a.email?a.email:"Google"}`)}};
}
async function googleSignIn(){return loginDialog(false)}
function gAcctsHTML(){const A=gAccts();if(!A.length)return `<p class="muted" style="margin:0">Chưa có tài khoản nào trên trình duyệt này.</p>`;
  return `<div class="gacc-list">${A.map(x=>`<div class="gacc${x.active?" on":""}">${gAv(x)}<span class="nm">${esc(x.name||x.email||"Tài khoản Google")}</span>${x.active?`<span class="tag">Đang dùng</span>`:`<button class="btn" type="button" data-gsw="${esc(x.id)}" style="font-size:12px">Dùng tài khoản này</button>`}<span class="em">${esc(x.email)}${x.fresh?"":" · <i>cần đăng nhập lại khi dùng</i>"}</span>
    <div class="svc">${x.svc.cal?`<span class="chip ok">${ic("cal")} Calendar ✓</span>`:""}${x.svc.mail?`<span class="chip ok">${ic("mail")} Gmail ✓</span>`:""}${x.active?`${x.svc.cal?`<button class="chip" type="button" data-gun="Google Calendar">Gỡ Calendar</button>`:`<button class="chip" type="button" data-gln="Google Calendar">+ Liên kết Calendar</button>`}${x.svc.mail?`<button class="chip" type="button" data-gun="Gmail">Gỡ Gmail</button>`:`<button class="chip" type="button" data-gln="Gmail">+ Liên kết Gmail</button>`}`:""}<button class="chip" type="button" data-grm="${esc(x.id)}" style="color:var(--bad)">Xóa khỏi máy</button></div></div>`).join("")}</div>`}
function gAcctsWire(root){const re=()=>{const h=$("#stAccts",root);if(h){h.innerHTML=gAcctsHTML();gAcctsWire(root)}};
  $$("[data-gsw]",root).forEach(b=>b.onclick=()=>{SOHOC.google.switchTo(b.dataset.gsw);UI.gcCache={};re()});
  $$("[data-gln]",root).forEach(b=>b.onclick=async()=>{await gDo(()=>SOHOC.google.link(b.dataset.gln),"Đã liên kết "+b.dataset.gln);re()});
  $$("[data-gun]",root).forEach(b=>b.onclick=()=>{SOHOC.google.unlink(b.dataset.gun);UI.gcCache={};toast("Sổ Học sẽ không dùng "+b.dataset.gun+" của tài khoản này nữa");re()});
  $$("[data-grm]",root).forEach(b=>b.onclick=()=>{SOHOC.google.remove(b.dataset.grm);UI.gcCache={};toast("Đã xóa tài khoản khỏi máy này và thu hồi quyền");re()})}

function settingsDialog(focus){
  const L=SOHOC.LS;const key=L.get("apiKey","");const mdl=L.get("model",SOHOC.CFG.defaultModel);let pv=SOHOC.provider();const gkey=L.get("geminiKey","");const gm=L.get("gModel",SOHOC.CFG.geminiModel);const gq=L.get("gQuickModel",SOHOC.CFG.geminiQuickModel);const cid=L.get("googleClientId","")||SOHOC.CFG.googleClientId||"";
  openModal({title:"Cài đặt AI & tài khoản",small:true,body:`<div class="form set-form">
    <section id="setAI"><h4>${ic("key")} Trợ lý AI</h4>
      <div class="seg prov" role="radiogroup" aria-label="Nhà cung cấp AI">${[["gemini","Google Gemini (AI Studio)"],["claude","Claude (Anthropic)"]].map(([v,l])=>`<button type="button" role="radio" data-prov="${v}" aria-checked="${pv===v}">${l}</button>`).join("")}</div>
      <div data-pv="gemini" ${pv==="gemini"?"":"hidden"} class="pvbox">
        <p class="muted">Lấy key miễn phí tại <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> → <i>Create API key</i>. Gói miễn phí có giới hạn số lượt mỗi phút/ngày; Google có thể dùng nội dung gửi qua gói miễn phí để cải thiện sản phẩm — đừng gửi tài liệu mật.</p>
        <div class="field"><label for="stGKey">API key Google AI Studio</label><div style="display:flex;gap:6px"><input class="input" id="stGKey" type="password" autocomplete="off" spellcheck="false" placeholder="AIza…" value="${esc(gkey)}" style="flex:1"><button class="btn" data-show="stGKey" type="button">Hiện</button></div></div>
        <div class="row3"><div class="field"><label for="stGModel">Mô hình chính</label><input class="input" id="stGModel" list="gmList" value="${esc(gm)}" spellcheck="false"><datalist id="gmList">${["gemini-3.8-flash","gemini-3.6-flash","gemini-3.1-pro-preview","gemini-4-argon","gemini-3.5-flash-lite"].map(m=>`<option value="${m}">`).join("")}</datalist></div>
          <div class="field"><label for="stGQuick">Mô hình nhanh (chọn mô hình 3D, gợi ý ngắn)</label><input class="input" id="stGQuick" list="gmList" value="${esc(gq)}" spellcheck="false"></div></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn" id="stGList" type="button">${ic("text")} Lấy danh sách mô hình từ tài khoản</button></div>
        <div id="stGModels" class="gm-list"></div></div>
      <div data-pv="claude" ${pv==="claude"?"":"hidden"} class="pvbox">
        <p class="muted">Lấy key tại <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener">console.anthropic.com</a> (tài khoản API trả theo lượng dùng).</p>
        <div class="field"><label for="stKey">API key Claude</label><div style="display:flex;gap:6px"><input class="input" id="stKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-ant-…" value="${esc(key)}" style="flex:1"><button class="btn" data-show="stKey" type="button">Hiện</button></div></div>
        <div class="field"><label for="stModel">Mô hình</label><select id="stModel">${[["claude-sonnet-5-5","Claude Sonnet 5.5 — cân bằng (khuyên dùng)"],["claude-opus-5-5","Claude Opus 5.5 — giảng sâu nhất, đắt hơn"],["claude-haiku-5-5","Claude Haiku 5.5 — nhanh, rẻ"]].map(([v,l])=>`<option value="${v}" ${v===mdl?"selected":""}>${l}</option>`).join("")}</select></div></div>
      <p class="muted">Key chỉ lưu trong trình duyệt này và chỉ gửi tới máy chủ của nhà cung cấp AI bạn chọn.</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center"><button class="btn" id="stTest" type="button">${ic("spark")} Thử kết nối</button><span id="stTestOut" class="muted" style="font-size:13px"></span></div></section>
    <section id="setGoogle"><h4>${ic("google")} Tài khoản Google · Calendar · Gmail</h4>
      <div id="stAccts">${gAcctsHTML()}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn" id="stGin" type="button">${ic("google")} ${gAccts().length?"Thêm tài khoản Google":"Đăng nhập bằng Google"}</button></div>
      <details class="muted" style="font-size:13px"${SOHOC.clientId()?"":" open"}><summary style="cursor:pointer">Google Client ID (cần làm một lần)</summary>
      <p>Tạo <b>OAuth Client ID</b> loại “Web application” trong Google Cloud Console, thêm địa chỉ trang này vào <i>Authorized JavaScript origins</i>; bật <b>Google Calendar API</b> và <b>Gmail API</b> (APIs &amp; Services → Library); trong <i>OAuth consent screen</i> thêm các tài khoản sẽ đăng nhập vào <i>Test users</i>. Xem README.</p>
      <div class="field"><label for="stCid">Google Client ID</label><input class="input" id="stCid" spellcheck="false" placeholder="xxxxxxxx.apps.googleusercontent.com" value="${esc(cid)}"></div>
      <span style="font-size:12.5px">Địa chỉ trang hiện tại: <code>${esc(location.origin)}</code></span></details></section>
    <section id="setBak"><h4>${ic("dl")} Dữ liệu của bạn</h4>
      <p class="muted">Môn học, bài học, tài liệu và cài đặt được lưu trong trình duyệt trên máy này. Hãy sao lưu định kỳ để chuyển sang máy khác hoặc phòng khi xóa dữ liệu trình duyệt.</p>
      <div id="stUse" class="muted" style="font-size:12.5px"></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn" id="stExp" type="button">${ic("dl")} Tải bản sao lưu</button><label class="btn">${ic("upload")} Khôi phục từ tệp<input type="file" accept=".json,application/json" id="stImp" hidden></label><button class="btn" id="stClr" type="button" style="color:var(--bad)">${ic("trash")} Xóa toàn bộ dữ liệu</button></div></section>
  </div>`,foot:`<div class="grow"></div><button class="pill-btn" data-close>Đóng</button><button class="pill-btn primary" id="stSave">Lưu</button>`});
  const save=()=>{L.set("provider",pv);L.set("apiKey",$("#stKey").value.trim());L.set("model",$("#stModel").value);L.set("geminiKey",$("#stGKey").value.trim());L.set("gModel",$("#stGModel").value.trim()||SOHOC.CFG.geminiModel);L.set("gQuickModel",$("#stGQuick").value.trim()||SOHOC.CFG.geminiQuickModel);L.set("googleClientId",$("#stCid").value.trim())};
  $$("[data-prov]").forEach(b=>b.onclick=()=>{pv=b.dataset.prov;$$("[data-prov]").forEach(x=>x.setAttribute("aria-checked",x===b));$$("[data-pv]").forEach(x=>x.hidden=x.dataset.pv!==pv);$("#stTestOut").textContent=""});
  $$("[data-show]").forEach(b=>b.onclick=()=>{const i=$("#"+b.dataset.show);i.type=i.type==="password"?"text":"password";b.textContent=i.type==="password"?"Hiện":"Ẩn"});
  $("#stGList").onclick=async()=>{const o=$("#stGModels");o.innerHTML=`<span class="spin"></span>`;try{const L2=await SOHOC.listGeminiModels($("#stGKey").value.trim());o.innerHTML=L2.length?L2.map(m=>`<button type="button" class="chip" data-gm="${esc(m.id)}" title="${esc(m.name)}">${esc(m.id)}</button>`).join(""):"Không thấy mô hình nào.";$$("[data-gm]",o).forEach(b=>b.onclick=()=>{$("#stGModel").value=b.dataset.gm;toast("Đã chọn "+b.dataset.gm)})}catch(e){o.innerHTML=`<span style="color:var(--bad)">${esc(aiErr(e))}</span>`}};
    $("#stTest").onclick=async()=>{save();const o=$("#stTestOut");o.textContent="Đang thử…";try{const r=await P.sample("Trả lời đúng một từ: OK",{max:20});o.innerHTML=`<b style="color:var(--ok)">Kết nối được.</b> ${pv==="claude"?"Claude":"Gemini"} (${esc(SOHOC.model(null))}) trả lời: “${esc(r.text.trim().slice(0,40))}”`}catch(e){o.innerHTML=`<b style="color:var(--bad)">Chưa được.</b> ${esc(aiErr(e))}`}};
  $("#stGin").onclick=()=>{save();closeDialog();loginDialog(gAccts().length>0)};gAcctsWire($("#setGoogle"));
  $("#stExp").onclick=async()=>{toast("Đang đóng gói dữ liệu…");try{const b=await SOHOC.exportAll();await P.downloads.save({filename:`so-hoc-sao-luu-${ymd(new Date())}.json`,data:b});toast("Đã tải bản sao lưu")}catch(e){toast("Không sao lưu được: "+e.message)}};
  $("#stImp").onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const n=await SOHOC.importAll(f);toast(`Đã khôi phục ${n} mục — đang tải lại trang`);setTimeout(()=>location.reload(),900)}catch(err){toast("Không khôi phục được: "+err.message,4500)}};
  $("#stClr").onclick=()=>{closeDialog();confirmDialog("Xóa toàn bộ dữ liệu trên máy này?","Tất cả môn học, bài học, tài liệu và ghi chú sẽ bị xóa khỏi trình duyệt này. Hãy tải bản sao lưu trước nếu cần.","Xóa hết",async()=>{await SOHOC.clearAll();localStorage.clear();location.reload()})};
  $("#stSave").onclick=()=>{save();closeDialog();toast("Đã lưu cài đặt");UI.gcCache={}};
  SOHOC.usage().then(u=>{const el=$("#stUse");if(el&&u&&u.usage!=null)el.textContent=`Đang dùng ${(u.usage/1048576).toFixed(1)} MB trên khoảng ${(u.quota/1073741824).toFixed(1)} GB trình duyệt cho phép.`});
  const sec={google:"#setGoogle",bak:"#setBak"}[focus];if(sec)setTimeout(()=>{const s=$(sec);if(s){s.scrollIntoView({block:"start"});s.classList.add("pop-in")}},60);
}
/* lần đầu mở: hướng dẫn ngắn */
setTimeout(()=>{if(SOHOC.LS.get("welcomed",false))return;SOHOC.LS.set("welcomed",true);
  openModal({title:"Chào mừng đến Sổ Học Điện Tử",small:true,body:`<div class="form"><p style="margin:0">Trang này chạy hoàn toàn trên trình duyệt của bạn:</p><ul style="margin:0;padding-left:20px;display:grid;gap:6px"><li>Môn học, bài học và tài liệu được <b>lưu trên máy này</b> (có thể sao lưu ra tệp).</li><li>Trợ lý AI dùng <b>API key của bạn</b>: Google AI Studio (Gemini, có gói miễn phí) hoặc Claude — thêm trong Cài đặt.</li><li>Đăng nhập bằng <b>tài khoản Google</b> (có thể thêm nhiều tài khoản) để đồng bộ <b>Google Calendar</b> và đọc <b>Gmail</b> (cần Client ID, xem README).</li></ul></div>`,foot:`<button class="pill-btn" data-close>Để sau</button><div class="grow"></div><button class="pill-btn primary" id="wGo">${ic("key")} Mở Cài đặt</button>`});
  $("#wGo").onclick=()=>{closeDialog();settingsDialog()}},1800);
/* cài đặt như ứng dụng (PWA) */
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
/* xem video YouTube ngay trong trang (bản web cho phép nhúng trình phát) */
function ytParse(href){try{const u=new URL(href);let id=null;if(/youtu\.be$/.test(u.hostname))id=u.pathname.slice(1);else if(/youtube\.com$/.test(u.hostname.replace(/^www\.|^m\./,""))&&u.pathname==="/watch")id=u.searchParams.get("v");if(!id||!/^[\w-]{6,20}$/.test(id))return null;
  const t=u.searchParams.get("t")||u.searchParams.get("start");const list=u.searchParams.get("list");return {id,start:t?parseInt(t,10)||0:0,list}}catch(e){return null}}
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest("a[href]");if(!a||a.hasAttribute("data-ytext")||e.ctrlKey||e.metaKey||e.shiftKey)return;const v=ytParse(a.href);if(!v)return;e.preventDefault();
  const q=new URLSearchParams({rel:"0",modestbranding:"1",autoplay:"1"});if(v.start)q.set("start",v.start);if(v.list)q.set("list",v.list);
  const title=(a.querySelector("b")||a).textContent.trim().slice(0,120)||"Video YouTube";
  openModal({title,small:true,body:`<div class="ytwrap"><iframe src="https://www.youtube-nocookie.com/embed/${v.id}?${q}" title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`,foot:`<a class="pill-btn" href="${esc(a.href)}" target="_blank" rel="noopener noreferrer" data-ytext>${ic("ext")} Mở trên YouTube</a><div class="grow"></div><button class="pill-btn primary" data-close>Đóng</button>`});
  const d=$("#dcard");if(d)d.classList.add("wide")},true);

/* chuyển key cũ: ai đã nhập key Claude trước đây thì giữ Claude làm mặc định */
if(SOHOC.LS.get("provider",null)==null&&SOHOC.LS.get("apiKey","")&&!SOHOC.LS.get("geminiKey",""))SOHOC.LS.set("provider","claude");

/* =====================================================================
   SPOTIFY — đăng nhập (OAuth PKCE, không cần máy chủ) để lấy danh sách phát của bạn
   Cần “Client ID” của một ứng dụng tạo tại developer.spotify.com (miễn phí),
   Redirect URI = địa chỉ trang này.
   ===================================================================== */
(function(){const L=SOHOC.LS;const AUTH="https://accounts.spotify.com/authorize",TOK="https://accounts.spotify.com/api/token",API="https://api.spotify.com/v1/";
  const cid=()=>L.get("spClientId","")||SOHOC.CFG.spotifyClientId||"";const redirect=()=>location.origin+location.pathname;
  const b64u=buf=>btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  const rnd=n=>{const a=new Uint8Array(n);crypto.getRandomValues(a);return b64u(a)};
  const SCOPES="user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing streaming";
  /* nhiều tài khoản Spotify, mỗi tài khoản một token */
  const KA=SOHOC.pkey("spAccts"),KC=SOHOC.pkey("spAct");let accts=L.get(KA,null),act=L.get(KC,null);
  if(!Array.isArray(accts)){accts=[];const ot=L.get("spTok",null),om=L.get("spMe",null);if(ot){accts.push({id:"old",name:(om&&om.name)||"Spotify",product:(om&&om.product)||"",img:(om&&om.img)||"",tok:ot,scope:""});act="old"}L.del("spTok");L.del("spMe")}
  const cur=()=>accts.find(a=>a.id===act)||accts[0]||null;const save=()=>{L.set(KA,accts);L.set(KC,(cur()||{}).id||null)};
  async function login(sw){if(!cid())throw Object.assign(new Error("Chưa có Spotify Client ID"),{code:"no_client"});const ver=rnd(48);const ch=b64u(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(ver)));const st=rnd(12);
    L.set("spPkce",{ver,st,t:Date.now()});const q=new URLSearchParams({client_id:cid(),response_type:"code",redirect_uri:redirect(),code_challenge_method:"S256",code_challenge:ch,state:st,scope:SCOPES,...(sw?{show_dialog:"true"}:{})});location.assign(AUTH+"?"+q)}
  async function tokenReq(body){const r=await fetch(TOK,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams(body)});const j=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(j.error_description||j.error||"Spotify từ chối đăng nhập"),{code:"auth_error"});return j}
  async function access(a){a=a||cur();if(!a)throw Object.assign(new Error("Chưa đăng nhập Spotify"),{code:"needs_reauth"});if(a.tok&&a.tok.exp>Date.now()+60000)return a.tok.t;
    if(a.tok&&a.tok.r){try{const j=await tokenReq({grant_type:"refresh_token",refresh_token:a.tok.r,client_id:cid()});a.tok={t:j.access_token,r:j.refresh_token||a.tok.r,exp:Date.now()+(j.expires_in||3600)*1000};if(j.scope)a.scope=j.scope;save();return a.tok.t}catch(e){}}
    throw Object.assign(new Error("Phiên Spotify hết hạn — đăng nhập lại"),{code:"needs_reauth"})}
  async function api(path,q,opt={}){const t=await access();const r=await fetch(API+path+(q?"?"+new URLSearchParams(q):""),{method:opt.method||"GET",headers:{Authorization:"Bearer "+t,...(opt.body?{"content-type":"application/json"}:{})},body:opt.body?JSON.stringify(opt.body):undefined});
    if(r.status===204||r.status===202)return {};if(r.status===401){throw Object.assign(new Error("Phiên Spotify hết hạn"),{code:"needs_reauth"})}
    const j=await r.json().catch(()=>({}));const msg=(j.error&&j.error.message)||"";
    if(r.status===403){if(/premium/i.test(msg)||(j.error&&j.error.reason==="PREMIUM_REQUIRED"))throw Object.assign(new Error("Điều khiển phát cần tài khoản Spotify Premium"),{code:"premium_required"});if(/scope/i.test(msg))throw Object.assign(new Error("Cần cấp thêm quyền điều khiển phát — bấm “Đăng nhập lại”"),{code:"needs_reauth"});throw Object.assign(new Error(msg||"Spotify chưa cho phép tài khoản này dùng ứng dụng — thêm email vào “User Management” của ứng dụng trên developer.spotify.com"),{code:"approval_required"})}
    if(r.status===404&&/device/i.test(msg))throw Object.assign(new Error("Không tìm thấy thiết bị — mở ứng dụng Spotify trên máy/điện thoại hoặc chọn “Trình phát trong trang”"),{code:"no_device"});
    if(!r.ok)throw Object.assign(new Error(msg||"Spotify báo lỗi"),{code:"tool_error"});return j}
  /* quay lại từ trang đăng nhập */
  (async()=>{const u=new URL(location.href);const code=u.searchParams.get("code"),state=u.searchParams.get("state"),er=u.searchParams.get("error");const pk=L.get("spPkce",null);if(!pk||(!code&&!er)||state!==pk.st)return;
    u.searchParams.delete("code");u.searchParams.delete("state");u.searchParams.delete("error");history.replaceState(null,"",u.pathname+(u.search||"")+u.hash);L.del("spPkce");
    if(er){setTimeout(()=>toast("Đã hủy đăng nhập Spotify"),1500);return}
    try{const j=await tokenReq({grant_type:"authorization_code",code,redirect_uri:redirect(),client_id:cid(),code_verifier:pk.ver});const tok={t:j.access_token,r:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000};
      const me=await fetch(API+"me",{headers:{Authorization:"Bearer "+tok.t}}).then(x=>x.json());let a=accts.find(x=>x.id===me.id);if(!a){a={id:me.id};accts.push(a)}accts=accts.filter(x=>x.id!=="old"||x===a);
      Object.assign(a,{name:me.display_name||me.id,product:me.product||"",img:(me.images&&me.images[0]&&me.images[0].url)||"",email:me.email||"",country:me.country||"",tok,scope:j.scope||SCOPES});act=a.id;save();L.set("mtab","sp");
      setTimeout(()=>{toast("Đã đăng nhập Spotify: "+a.name+(a.product==="premium"?" · Premium":""));const b=$("#rail [data-r=music]");if(b)b.click()},1400)}catch(e){setTimeout(()=>toast(e.message,5000),1400)}})();
  /* ---- trình phát trong trang (Web Playback SDK — cần Premium) ---- */
  let player=null,devId=null,sdkErr="";const sdkReady=()=>new Promise((res,rej)=>{if(window.Spotify&&Spotify.Player)return res();window.onSpotifyWebPlaybackSDKReady=()=>res();if(!$("#spSdk")){const sc=document.createElement("script");sc.id="spSdk";sc.src="https://sdk.scdn.co/spotify-player.js";sc.onerror=()=>rej(new Error("Không tải được trình phát Spotify"));document.head.appendChild(sc)}});
  async function startPlayer(){if(devId)return devId;const a=cur();if(!a||a.product!=="premium")throw Object.assign(new Error("Trình phát trong trang cần Spotify Premium"),{code:"premium_required"});await sdkReady();
    return new Promise((res,rej)=>{player=new Spotify.Player({name:"Sổ Học Điện Tử",getOAuthToken:cb=>access().then(cb).catch(()=>{}),volume:(UI.snd&&UI.snd.vol)||.6});
      player.addListener("ready",({device_id})=>{devId=device_id;res(device_id)});player.addListener("not_ready",()=>{devId=null});
      ["initialization_error","authentication_error","account_error","playback_error"].forEach(ev=>player.addListener(ev,({message})=>{sdkErr=message;if(ev!=="playback_error")rej(Object.assign(new Error(ev==="account_error"?"Tài khoản cần Spotify Premium":ev==="authentication_error"?"Cần đăng nhập lại Spotify (thiếu quyền phát)":"Trình duyệt này chưa phát được Spotify: "+message),{code:ev}))}));
      player.addListener("player_state_changed",s=>{window.dispatchEvent(new CustomEvent("sohoc:spstate",{detail:s}))});player.connect()})}
  SOHOC.spotify={cid,redirect,login,api,access,
    me:()=>{const a=cur();return a&&{id:a.id,name:a.name,product:a.product,img:a.img,email:a.email}},accounts:()=>accts.map(a=>({id:a.id,name:a.name,product:a.product,img:a.img,active:a===cur()})),
    signed:()=>!!cur(),switchTo(id){if(accts.some(a=>a.id===id)){act=id;save();devId=null;try{player&&player.disconnect()}catch(e){}player=null}},
    logout(id){accts=accts.filter(a=>a.id!==(id||(cur()||{}).id));act=accts[0]?accts[0].id:null;save();devId=null;try{player&&player.disconnect()}catch(e){}player=null},setCid(v){L.set("spClientId",String(v||"").trim())},
    startPlayer,localDevice:()=>devId,player:()=>player,sdkErr:()=>sdkErr};
})();

/* ---- đổi tài khoản → mở kho dữ liệu của tài khoản đó ---- */
window.addEventListener("sohoc:profile",e=>{try{if(typeof saveDecor==="function")saveDecor()}catch(_){}try{document.activeElement&&document.activeElement.blur&&document.activeElement.blur()}catch(_){}
  const d=document.createElement("div");d.className="prof-sw";d.setAttribute("role","status");d.innerHTML=`<div><span class="spin"></span><b>Đang mở dữ liệu của ${esc(e.detail&&e.detail.name||"tài khoản")}…</b><small>Sổ học, sticker, giao diện và cài đặt của từng tài khoản được lưu riêng.</small></div>`;document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add("on"))});
(()=>{let m=null;try{m=sessionStorage.getItem("sohoc:profMsg");sessionStorage.removeItem("sohoc:profMsg")}catch(e){}if(m)setTimeout(()=>toast(m,3000),1200)})();

/* =====================================================================
   PHÒNG THÍ NGHIỆM 3D — mô hình chạy được, điều khiển trực tiếp
   ===================================================================== */
async function ensureThree(){if(window.THREE)return window.THREE;await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");return window.THREE}
function makeViewer(T,stage,o={}){
  const r=new T.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(2,window.devicePixelRatio||1));stage.prepend(r.domElement);
  const scene=new T.Scene(),cam=new T.PerspectiveCamera(40,1,.1,200);
  scene.add(new T.HemisphereLight(0xffffff,0x334455,.75));const d1=new T.DirectionalLight(0xffffff,.85);d1.position.set(5,9,6);scene.add(d1);const d2=new T.DirectionalLight(0xffe2c4,.3);d2.position.set(-6,3,-4);scene.add(d2);
  let rx=o.rx??.62,ry=o.ry??-.45,dist=o.dist??11;const tgt=new T.Vector3(...(o.target||[0,0,0]));const pts=new Map();
  const el=r.domElement;
  const size=()=>{const w=stage.clientWidth||600,h=stage.clientHeight||400;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};
  const ro=new ResizeObserver(size);ro.observe(stage);size();
  el.addEventListener("pointerdown",e=>{pts.set(e.pointerId,{x:e.clientX,y:e.clientY});el.setPointerCapture(e.pointerId)});
  el.addEventListener("pointermove",e=>{if(!pts.has(e.pointerId))return;const p=pts.get(e.pointerId);
    if(pts.size===1){ry+=(e.clientX-p.x)*.008;rx=Math.max(.05,Math.min(1.45,rx+(e.clientY-p.y)*.008))}
    else if(pts.size===2){const oth=[...pts.entries()].find(([k])=>k!==e.pointerId)[1];const d0=Math.hypot(p.x-oth.x,p.y-oth.y),d1=Math.hypot(e.clientX-oth.x,e.clientY-oth.y);if(d1>0)dist=Math.max(4,Math.min(26,dist*d0/d1))}
    pts.set(e.pointerId,{x:e.clientX,y:e.clientY})});
  const up=e=>pts.delete(e.pointerId);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);
  el.addEventListener("wheel",e=>{e.preventDefault();dist=Math.max(4,Math.min(26,dist*(1+e.deltaY*.001)))},{passive:false});
  const frames=[];let raf=0,last=performance.now();
  const loop=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;frames.forEach(f=>f(dt));cam.position.set(tgt.x+dist*Math.cos(rx)*Math.sin(ry),tgt.y+dist*Math.sin(rx),tgt.z+dist*Math.cos(rx)*Math.cos(ry));cam.lookAt(tgt);r.render(scene,cam);raf=requestAnimationFrame(loop)};
  raf=requestAnimationFrame(loop);
  return {T,scene,cam,onFrame:f=>frames.push(f),dispose(){cancelAnimationFrame(raf);ro.disconnect();scene.traverse(x=>{if(x.geometry)x.geometry.dispose();if(x.material){(Array.isArray(x.material)?x.material:[x.material]).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})}});r.dispose();el.remove()}};
}
const LM=(T,c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.55,metalness:.05},o));
function cylBetween(T,a,b,r,mat){const d=new T.Vector3().subVectors(b,a),len=d.length()||.001;const m=new T.Mesh(new T.CylinderGeometry(r,r,len,10),mat);m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.clone().normalize());return m}
function pathOf(T,pts,closed){const cp=new T.CurvePath();for(let i=0;i<pts.length-1;i++)cp.add(new T.LineCurve3(pts[i],pts[i+1]));if(closed)cp.add(new T.LineCurve3(pts[pts.length-1],pts[0]));return cp}
const V3=(T,a)=>a.map(p=>new T.Vector3(p[0],p[1],p[2]));
function sprite(T,text,{color="#ffffff",bg="rgba(15,20,26,.82)",scale=.55}={}){const c=document.createElement("canvas");c.width=256;c.height=128;const g=c.getContext("2d");g.fillStyle=bg;const r=26;g.beginPath();g.moveTo(r,8);g.arcTo(248,8,248,120,r);g.arcTo(248,120,8,120,r);g.arcTo(8,120,8,8,r);g.arcTo(8,8,248,8,r);g.fill();g.fillStyle=color;g.font="600 58px 'IBM Plex Sans',sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillText(text,128,66);const tx=new T.CanvasTexture(c);const s=new T.Sprite(new T.SpriteMaterial({map:tx,depthTest:false}));s.scale.set(scale*2,scale,1);s.renderOrder=10;return s}
function breadboard(T,w=10,d=5){
  const g=new T.Group();const b=new T.Mesh(new T.BoxGeometry(w,.35,d),LM(T,0xeceae3,{roughness:.8}));b.position.y=-.175;g.add(b);
  const cols=Math.floor((w-.8)/.3),rows=Math.floor((d-1.2)/.3);const hole=new T.InstancedMesh(new T.BoxGeometry(.09,.02,.09),LM(T,0x3a3a3a),cols*rows);let k=0;const m=new T.Matrix4();
  for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){m.setPosition(-w/2+.4+i*.3,.005,-d/2+.6+j*.3+(j>=rows/2?.25:0));hole.setMatrixAt(k++,m)}g.add(hole);
  [[-d/2+.25,0xd0473c],[d/2-.25,0x2e6fd8]].forEach(([z,c])=>{const l=new T.Mesh(new T.BoxGeometry(w-.6,.012,.03),LM(T,c));l.position.set(0,.006,z);g.add(l)});
  return g;
}
function bandColors(R){const digit=["#141414","#6b3a1e","#c0392b","#e67e22","#f1c40f","#27ae60","#2e6fd8","#8e44ad","#7f8c8d","#f2f2f2"];const e=Math.max(0,Math.floor(Math.log10(R))-1);const two=Math.round(R/10**e);return [digit[Math.floor(two/10)%10],digit[two%10],digit[Math.min(9,e)],"#d4a82a"]}
function resistorMesh(T){const g=new T.Group();const body=new T.Mesh(new T.CylinderGeometry(.22,.22,1.1,24),LM(T,0xd8c49b));body.rotation.z=Math.PI/2;g.add(body);
  [-1,1].forEach(s=>{const e=new T.Mesh(new T.SphereGeometry(.26,20,12),LM(T,0xd8c49b));e.scale.set(.5,1,1);e.position.x=s*.55;g.add(e)});
  const bands=[-.32,-.15,.02,.32].map(x=>{const b=new T.Mesh(new T.CylinderGeometry(.228,.228,.08,24),LM(T,0x000000));b.rotation.z=Math.PI/2;b.position.x=x;g.add(b);return b});g.userData.bands=bands;return g}
function ledMesh(T,color){const g=new T.Group();const mat=LM(T,color,{transparent:true,opacity:.75,roughness:.15,emissive:color,emissiveIntensity:0});
  const c=new T.Mesh(new T.CylinderGeometry(.3,.3,.5,28),mat);c.position.y=.25;g.add(c);const dome=new T.Mesh(new T.SphereGeometry(.3,28,14,0,Math.PI*2,0,Math.PI/2),mat);dome.position.y=.5;g.add(dome);
  const fl=new T.Mesh(new T.CylinderGeometry(.36,.36,.07,28),mat);g.add(fl);g.userData.mat=mat;return g}
function dipMesh(T,label,pins=14){
  const g=new T.Group(),n=pins/2,pitch=.4,len=n*pitch+.3,metal=LM(T,0xb9bec4,{metalness:.85,roughness:.3});
  const body=new T.Mesh(new T.BoxGeometry(len,.42,1.15),LM(T,0x1d1d20,{roughness:.75}));g.add(body);
  const nc=new T.Mesh(new T.CylinderGeometry(.13,.13,.02,20),LM(T,0x0b0b0c));nc.position.set(-len/2+.12,.215,0);g.add(nc);
  const p1=new T.Mesh(new T.CylinderGeometry(.06,.06,.02,16),LM(T,0x3a3a3e));p1.position.set(-len/2+.34,.215,.36);g.add(p1);
  const lab=new T.Mesh(new T.PlaneGeometry(len*.62,.3),new T.MeshStandardMaterial({map:labelTex(T,label),roughness:.8}));lab.rotation.x=-Math.PI/2;lab.position.set(.1,.216,0);g.add(lab);g.userData.lab=lab;
  const pinPos=[];for(let i=0;i<n;i++)[1,-1].forEach(s=>{const x=-len/2+.3+i*pitch;const a=new T.Mesh(new T.BoxGeometry(.13,.05,.18),metal);a.position.set(x,.03,s*.66);g.add(a);const b=new T.Mesh(new T.BoxGeometry(.07,.6,.04),metal);b.position.set(x,-.28,s*.76);g.add(b)});
  for(let i=0;i<n;i++)pinPos[i+1]=[-len/2+.3+i*pitch,.76];for(let i=0;i<n;i++)pinPos[pins-i]=[-len/2+.3+i*pitch,-.76];
  g.userData.pins=pinPos;return g;
}

/* ---------- Lab definitions ---------- */
const LABS={
 led:{name:"Mạch LED: pin – điện trở – LED",desc:"Electron chạy trong mạch, LED sáng theo dòng điện. Vòng màu điện trở đổi theo giá trị.",tags:["Ohm","dòng điện","LED","điện trở","KVL"],
  legend:[["#6ec6ff","Electron (−)"],["#ff7a5c","Dòng quy ước (+)"]],
  controls:[{id:"V",l:"Điện áp pin",min:0,max:9,step:.1,v:5,u:"V"},{id:"R",l:"Điện trở",min:2,max:3.35,step:.005,v:2.52,log:true,u:"Ω"},{id:"col",t:"sel",l:"Màu LED",o:[["r","Đỏ · Vf ≈ 2,0 V"],["g","Xanh lá · Vf ≈ 2,2 V"],["b","Xanh dương · Vf ≈ 3,0 V"]]},{id:"mode",t:"sel",l:"Hiển thị hạt mang điện",o:[["e","Electron (đi từ cực âm)"],["c","Dòng quy ước (đi từ cực dương)"]]}],
  build(T,v,st){
   const S=v.scene;S.add(breadboard(T,10,5));
   const metal=LM(T,0xb9bec4,{metalness:.8,roughness:.3}),wire=LM(T,0xd9b55c,{metalness:.6,roughness:.35});
   const bat=new T.Group();const bb=new T.Mesh(new T.CylinderGeometry(.42,.42,1.6,28),LM(T,0x22262b,{roughness:.4}));bb.rotation.z=Math.PI/2;bat.add(bb);const bc=new T.Mesh(new T.CylinderGeometry(.43,.43,.5,28),LM(T,0xc77a2c,{metalness:.4,roughness:.3}));bc.rotation.z=Math.PI/2;bc.position.x=.55;bat.add(bc);const nub=new T.Mesh(new T.CylinderGeometry(.14,.14,.12,16),metal);nub.rotation.z=Math.PI/2;nub.position.x=.86;bat.add(nub);bat.position.set(-3.2,.42,0);S.add(bat);
   const lp=sprite(T,"+",{color:"#ff9a7a",scale:.35});lp.position.set(-2.3,1.05,0);S.add(lp);const ln=sprite(T,"−",{color:"#8cc6ff",scale:.35});ln.position.set(-4.1,1.05,0);S.add(ln);
   const pts=V3(T,[[-2.3,.42,0],[-1.6,.42,0],[-1.6,.42,-1.5],[1.4,.42,-1.5],[1.9,.42,-1.5],[1.9,1.05,-1.5],[2.3,1.05,-1.5],[2.3,.42,-1.5],[3.4,.42,-1.5],[3.4,.42,1.5],[-4.6,.42,1.5],[-4.6,.42,0],[-4.05,.42,0]]);
   for(let i=0;i<pts.length-1;i++){if(i===5)continue;S.add(cylBetween(T,pts[i],pts[i+1],i===4||i===6?.035:.05,i===4||i===6?metal:wire))}
   const path=pathOf(T,pts,true);
   const res=resistorMesh(T);res.position.set(-.1,.42,-1.5);S.add(res);
   const lsR=sprite(T,"R",{scale:.32});lsR.position.set(-.1,1.0,-1.5);S.add(lsR);
   const led=ledMesh(T,0xff3b2f);led.position.set(2.1,1.05,-1.5);S.add(led);const light=new T.PointLight(0xff3b2f,0,7);light.position.set(2.1,1.7,-1.5);S.add(light);
   const lsL=sprite(T,"LED",{scale:.32});lsL.position.set(2.1,2.25,-1.5);S.add(lsL);
   const N=56,pm=new T.InstancedMesh(new T.SphereGeometry(.075,10,8),new T.MeshBasicMaterial({color:0xffffff}),N);S.add(pm);const mtx=new T.Matrix4();let phase=0;
   const VF={r:2.0,g:2.2,b:3.0},COL={r:0xff3b2f,g:0x2ecc71,b:0x3d7bff};
   const calc=()=>{const R=st.R,vf=VF[st.col];const I=st.V>vf?(st.V-vf)/R:0;return {R,vf,I,b:Math.min(1.25,I/0.02)}};
   return {frame(dt,run){const c=calc();bandColors(c.R).forEach((h,i)=>res.userData.bands[i].material.color.set(h));
      const col=COL[st.col];led.userData.mat.color.setHex(col);led.userData.mat.emissive.setHex(col);led.userData.mat.emissiveIntensity=Math.min(1.6,c.b*1.4);light.color.setHex(col);light.intensity=c.b*2.2;
      const speed=c.I>0?.03+Math.min(.45,c.b*.22):0;if(run)phase+=(st.mode==="e"?-1:1)*speed*dt;
      pm.material.color.set(st.mode==="e"?"#6ec6ff":"#ff7a5c");
      for(let i=0;i<N;i++){let u=((i/N+phase)%1+1)%1;const p=path.getPointAt(u);const inside=p.z>-.1&&p.z<.1&&p.x<-2.3&&p.x>-4.05;mtx.makeScale(inside?0:1,inside?0:1,inside?0:1);mtx.setPosition(p.x,p.y+.02,p.z);pm.setMatrixAt(i,mtx)}pm.instanceMatrix.needsUpdate=true},
     info(){const c=calc();const steps=[`Pin tạo hiệu điện thế <b>${st.V.toFixed(1)} V</b> giữa hai cực.`,`LED chỉ dẫn khi điện áp đặt lên nó vượt <b>Vf ≈ ${c.vf.toFixed(1)} V</b>.`,`Phần còn lại rơi trên điện trở: V<sub>R</sub> = ${Math.max(0,st.V-c.vf).toFixed(2)} V.`,`Định luật Ohm: I = V<sub>R</sub>/R = <b>${fmt(c.I,"A")}</b>.`,`${st.mode==="e"?"Electron mang điện âm nên chạy ngược chiều dòng quy ước: từ cực (−) qua dây về cực (+).":"Dòng quy ước đi từ cực (+) qua R, qua LED, về cực (−)."}`];
      const on=c.I>0?3:1;return `<div class="readout"><div class="ro"><small>Dòng I</small><b>${fmt(c.I,"A")}</b></div><div class="ro"><small>Độ sáng</small><b>${Math.round(Math.min(1,c.b)*100)} %</b></div><div class="ro"><small>P điện trở</small><b>${fmt(c.I*c.I*c.R,"W")}</b></div><div class="ro"><small>Mã màu R</small><b>${fmt(c.R,"Ω")}</b></div></div>
      ${c.I>0.02?`<div class="warnbox">I vượt 20 mA (dòng định mức điển hình của LED 5 mm): LED có thể hỏng. Tăng R.</div>`:c.I===0?`<div class="warnbox">Điện áp pin chưa vượt Vf: LED không dẫn, không có dòng.</div>`:`<div class="okbox">LED hoạt động trong vùng an toàn.</div>`}
      <ol class="steps">${steps.map((s,i)=>`<li class="${i<=on?"on":""}">${s}</li>`).join("")}</ol><div class="muted" style="font-size:12.5px">Mô hình LED lý tưởng hóa: điện áp rơi cố định Vf khi dẫn.</div>`}};
  }},
 cap:{name:"Nạp và xả tụ điện",desc:"Điện tích tích tụ trên hai bản tụ, điện trường giữa hai bản mạnh dần; dòng giảm theo hàm mũ với τ = RC.",tags:["tụ điện","RC","τ","hằng số thời gian"],
  legend:[["#ff7a5c","Điện tích dương"],["#6ec6ff","Electron"],["#f2c14e","Đường sức điện trường"]],
  controls:[{id:"Vs",l:"Nguồn Vs",min:1,max:9,step:.1,v:6,u:"V"},{id:"R",l:"Điện trở",min:3,max:5,step:.01,v:4,log:true,u:"Ω"},{id:"C",l:"Điện dung (µF)",min:1,max:3.3,step:.01,v:2,log:true,u:"µF",raw:true},{id:"mode",t:"sel",l:"Công tắc",o:[["chg","Nạp (nối với pin)"],["dis","Xả (nối tắt qua R)"]]},{id:"spd",l:"Tốc độ thời gian",min:.25,max:10,step:.25,v:1,u:"×",raw:true}],
  build(T,v,st){
   const S=v.scene;S.add(breadboard(T,8,5));const wire=LM(T,0xd9b55c,{metalness:.6,roughness:.35}),plateM=LM(T,0xc9ced6,{metalness:.7,roughness:.25});
   const pl=new T.Mesh(new T.BoxGeometry(.08,1.6,1.6),plateM),pr=pl.clone();pl.position.set(-.3,1.2,0);pr.position.set(.3,1.2,0);S.add(pl,pr);
   const bat=new T.Mesh(new T.CylinderGeometry(.38,.38,1.4,24),LM(T,0x22262b));bat.rotation.z=Math.PI/2;bat.position.set(-1.7,.42,1.8);S.add(bat);const bcap=new T.Mesh(new T.CylinderGeometry(.39,.39,.4,24),LM(T,0xc77a2c,{metalness:.4}));bcap.rotation.z=Math.PI/2;bcap.position.set(-1.2,.42,1.8);S.add(bcap);
   const A=V3(T,[[-1.0,.42,1.8],[2.4,.42,1.8],[2.4,.42,0],[.3,.42,0],[.3,.4,0]]),B=V3(T,[[-.3,.4,0],[-.3,.42,0],[-2.6,.42,0],[-2.6,.42,1.8],[-2.4,.42,1.8]]);
   for(const P of [A,B])for(let i=0;i<P.length-1;i++)S.add(cylBetween(T,P[i],P[i+1],.05,wire));
   const bypass=new T.Group();V3(T,[[-2.4,.42,1.8],[-2.4,1.0,1.8],[-1.0,1.0,1.8],[-1.0,.42,1.8]]).reduce((a,b)=>{bypass.add(cylBetween(T,a,b,.05,LM(T,0x58ba76,{emissive:0x1f5a33})));return b});S.add(bypass);
   const res=resistorMesh(T);res.position.set(1.0,.42,1.8);S.add(res);
   [["+",.3,"#ff9a7a"],["−",-.3,"#8cc6ff"]].forEach(([t,x,c])=>{const s=sprite(T,t,{color:c,scale:.34});s.position.set(x*3,2.3,0);S.add(s)});
   const pathA=pathOf(T,A,false),pathB=pathOf(T,B,false);
   const NQ=36,plus=new T.InstancedMesh(new T.SphereGeometry(.06,10,8),new T.MeshBasicMaterial({color:0xff7a5c}),NQ),minus=new T.InstancedMesh(new T.SphereGeometry(.06,10,8),new T.MeshBasicMaterial({color:0x6ec6ff}),NQ);S.add(plus,minus);
   const m=new T.Matrix4();for(let i=0;i<NQ;i++){const y=.6+Math.floor(i/6)*.24,z=-.6+(i%6)*.24;m.setPosition(.22,y,z);plus.setMatrixAt(i,m);m.setPosition(-.22,y,z);minus.setMatrixAt(i,m)}
   const field=[];for(let i=0;i<9;i++){const f=new T.Mesh(new T.CylinderGeometry(.012,.012,.36,6),new T.MeshBasicMaterial({color:0xf2c14e,transparent:true,opacity:0}));f.rotation.z=Math.PI/2;f.position.set(0,.7+Math.floor(i/3)*.5,-.5+(i%3)*.5);S.add(f);field.push(f)}
   const NE=28,em=new T.InstancedMesh(new T.SphereGeometry(.07,10,8),new T.MeshBasicMaterial({color:0x6ec6ff}),NE*2);S.add(em);let ph=0;
   let vc=0;const hist=[];let ht=0;
   const p=()=>({R:st.R,C:st.C*1e-6,tau:st.R*st.C*1e-6});
   return {frame(dt,run){const {R,tau}=p();bandColors(R).forEach((h,i)=>res.userData.bands[i].material.color.set(h));bypass.visible=st.mode==="dis";bat.material.color.set(st.mode==="dis"?0x3a3f45:0x22262b);
      const target=st.mode==="chg"?st.Vs:0;const sdt=dt*st.spd;if(run){vc+=(target-vc)*(1-Math.exp(-sdt/tau));ht+=sdt;if(ht>tau/25){ht=0;hist.push(vc);if(hist.length>160)hist.shift()}}
      const frac=Math.max(0,Math.min(1,vc/9));plus.count=Math.round(NQ*frac);minus.count=plus.count;field.forEach(f=>f.material.opacity=frac*.85);
      const i=(target-vc)/R,mag=Math.abs(i)/(9/R);const dir=Math.sign(i);if(run)ph+=-dir*Math.min(.5,mag*.6)*dt*Math.min(3,st.spd);
      const mt=new T.Matrix4();for(let k=0;k<NE;k++){const u=((k/NE+ph)%1+1)%1;const a=pathA.getPointAt(u),b=pathB.getPointAt(u);const show=mag>.01?1:0;mt.makeScale(show,show,show);mt.setPosition(a.x,a.y+.02,a.z);em.setMatrixAt(k,mt);mt.makeScale(show,show,show);mt.setPosition(b.x,b.y+.02,b.z);em.setMatrixAt(NE+k,mt)}em.instanceMatrix.needsUpdate=true},
     info(){const {R,C,tau}=p();const target=st.mode==="chg"?st.Vs:0,i=(target-vc)/R,pct=st.Vs?vc/st.Vs*100:0;
      const W=320,H=110;let path="";hist.forEach((h,k)=>{path+=(k?"L":"M")+(k/159*W).toFixed(1)+" "+(H-6-h/9*(H-12)).toFixed(1)});
      return `<div class="readout"><div class="ro"><small>v tụ</small><b>${vc.toFixed(2)} V</b></div><div class="ro"><small>% của Vs</small><b>${pct.toFixed(0)} %</b></div><div class="ro"><small>Dòng i</small><b>${fmt(Math.abs(i),"A")}</b></div><div class="ro"><small>τ = RC</small><b>${fmt(tau,"s")}</b></div></div>
       <svg viewBox="0 0 ${W} ${H}" style="width:100%;background:var(--panel2);border-radius:10px"><path d="M0 ${H-6-st.Vs/9*(H-12)}H${W}" stroke="var(--muted)" stroke-dasharray="4 4"/><path d="${path}" stroke="var(--sig)" stroke-width="2.5" fill="none"/><text x="6" y="14" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">v(t) · vạch đứt = Vs</text></svg>
       <ol class="steps"><li class="${st.mode==="chg"?"on":""}">Nạp: dòng quy ước từ (+) pin qua R đến bản phải → bản phải tích điện dương, electron dồn về bản trái.</li><li class="on">Điện tích tăng thì điện áp tụ tăng, dòng i = (Vs − v)/R giảm dần.</li><li class="${pct>=60&&pct<=70?"on":""}">Sau 1τ = ${fmt(tau,"s")}, v đạt ≈ 63 % Vs; sau 5τ coi như đầy.</li><li class="${st.mode==="dis"?"on":""}">Xả: tụ đóng vai nguồn, dòng chạy ngược, v giảm theo e<sup>−t/τ</sup>.</li></ol>`},
     reset(){vc=0;hist.length=0}};
  }},
 mos:{name:"MOSFET kênh N: tạo kênh dẫn",desc:"Mặt cắt transistor: điện áp cổng hút electron tạo kênh; quan sát vùng cắt, tuyến tính và bão hòa (thắt kênh).",tags:["MOSFET","transistor","bán dẫn","CMOS"],
  legend:[["#6ec6ff","Electron"],["#3a7bd5","Vùng n+"],["#7b5fb3","Đế p"],["#41c1cb","Kênh dẫn"]],
  controls:[{id:"Vgs",l:"V_GS (cổng – nguồn)",min:0,max:5,step:.05,v:2.5,u:"V"},{id:"Vds",l:"V_DS (máng – nguồn)",min:0,max:5,step:.05,v:1,u:"V"}],
  build(T,v,st){
   const S=v.scene;const sub=new T.Mesh(new T.BoxGeometry(7,1.8,2.6),LM(T,0x7b5fb3,{transparent:true,opacity:.42,depthWrite:false}));sub.position.y=-.9;S.add(sub);
   [-2.1,2.1].forEach(x=>{const w=new T.Mesh(new T.BoxGeometry(1.5,.6,2.6),LM(T,0x3a7bd5,{transparent:true,opacity:.5,depthWrite:false}));w.position.set(x,-.29,0);S.add(w);const ct=new T.Mesh(new T.BoxGeometry(.8,.25,2.2),LM(T,0xb9bec4,{metalness:.8,roughness:.3}));ct.position.set(x,.13,0);S.add(ct)});
   const ox=new T.Mesh(new T.BoxGeometry(2.7,.12,2.6),LM(T,0xe8e8e8,{transparent:true,opacity:.75}));ox.position.set(0,.06,0);S.add(ox);
   const gate=new T.Mesh(new T.BoxGeometry(2.7,.4,2.6),LM(T,0x8c9096,{metalness:.6,roughness:.35,transparent:true,opacity:.55,depthWrite:false}));gate.position.set(0,.32,0);S.add(gate);
   [["S",-2.1,1.0],["G",0,1.05],["D",2.1,1.0],["Đế (B)",0,-2.1]].forEach(([t,x,y])=>{const s=sprite(T,t,{scale:.36});s.position.set(x,y,1.5);S.add(s)});
   const seg=[];for(let i=0;i<14;i++){const b=new T.Mesh(new T.BoxGeometry(2.7/14,.1,2.2),new T.MeshBasicMaterial({color:0x41c1cb,transparent:true,opacity:0}));b.position.set(-1.35+2.7/28+i*2.7/14,-.05,0);S.add(b);seg.push(b)}
   const N=46,em=new T.InstancedMesh(new T.SphereGeometry(.06,10,8),new T.MeshBasicMaterial({color:0x6ec6ff}),N);S.add(em);
   const P=[...Array(N)].map(()=>({x:-2.1+(Math.random()-.5)*1.3,z:(Math.random()-.5)*2.0,y:-.3+(Math.random()-.5)*.4,j:Math.random()*6}));
   const Vth=1.0,k=2e-3;const calc=()=>{const ov=st.Vgs-Vth;let Id=0,reg="Cắt (cutoff)";if(ov>0){if(st.Vds<ov){Id=k*(ov*st.Vds-st.Vds*st.Vds/2);reg="Tuyến tính (triode)"}else{Id=.5*k*ov*ov;reg="Bão hòa (saturation)"}}return {ov,Id,reg}};
   return {frame(dt,run){const c=calc();const ovn=Math.max(0,c.ov);
      seg.forEach((b,i)=>{const x=(i+.5)/14;const local=Math.max(0,ovn-st.Vds*x);const th=ovn>0?Math.max(.05,local/4):0;b.scale.y=Math.max(.01,th/.1*.6);b.position.y=-.02-b.scale.y*.05;b.material.opacity=ovn>0?Math.min(.9,.15+local/3):0});
      const sp=c.Id/(k*8)*3.2;const mt=new T.Matrix4();
      P.forEach((p,i)=>{if(ovn>0&&st.Vds>0){if(run){p.x+=(.4+sp)*dt*(1+p.j*.05);if(p.x>2.1){p.x=-2.1;p.z=(Math.random()-.5)*2}}p.y=p.x>-1.35&&p.x<1.35?-.06:-.2}else{if(run)p.j+=dt*2;p.x=-2.1+Math.sin(p.j+i)*.5;p.y=-.3+Math.cos(p.j*1.3+i)*.18}
        mt.setPosition(p.x,p.y,p.z);em.setMatrixAt(i,mt)});em.instanceMatrix.needsUpdate=true},
     info(){const c=calc();const W=320,H=140;const vmax=5,imax=.5*k*16;const curve=vgs=>{let d="";for(let s=0;s<=50;s++){const vd=s/50*vmax,ov=vgs-Vth;let I=0;if(ov>0)I=vd<ov?k*(ov*vd-vd*vd/2):.5*k*ov*ov;d+=(s?"L":"M")+(vd/vmax*W).toFixed(1)+" "+(H-8-I/imax*(H-16)).toFixed(1)}return d};
      return `<div class="readout"><div class="ro"><small>Vùng làm việc</small><b style="font-size:13px">${c.reg}</b></div><div class="ro"><small>I_D</small><b>${fmt(c.Id,"A")}</b></div><div class="ro"><small>V_ov = V_GS − V_th</small><b>${c.ov.toFixed(2)} V</b></div></div>
       <svg viewBox="0 0 ${W} ${H}" style="width:100%;background:var(--panel2);border-radius:10px">${[2,3,4,5].map(g=>`<path d="${curve(g)}" stroke="var(--line)" stroke-width="1.5" fill="none"/>`).join("")}<path d="${curve(st.Vgs)}" stroke="var(--sig)" stroke-width="2.5" fill="none"/><circle cx="${st.Vds/vmax*W}" cy="${H-8-c.Id/imax*(H-16)}" r="5" fill="var(--accent)"/><text x="6" y="14" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">I_D theo V_DS · chấm = điểm làm việc</text></svg>
       <ol class="steps"><li class="${c.ov<=0?"on":""}">V_GS &lt; V_th = 1 V: chưa có kênh, electron nằm yên trong vùng n+ nguồn.</li><li class="${c.ov>0?"on":""}">V_GS &gt; V_th: điện trường qua lớp oxit hút electron lên bề mặt đế p, tạo kênh n nối S và D.</li><li class="${c.reg.startsWith("Tuyến")?"on":""}">V_DS nhỏ: kênh như điện trở, I_D tăng gần tuyến tính theo V_DS.</li><li class="${c.reg.startsWith("Bão")?"on":""}">V_DS ≥ V_ov: kênh bị thắt gần cực máng, I_D ≈ ½·k·V_ov² gần như không đổi.</li></ol><div class="muted" style="font-size:12.5px">Mô hình bậc hai lý tưởng, k = 2 mA/V², V_th = 1 V.</div>`}};
  }},
 logic:{name:"Cổng logic trên breadboard",desc:"Gạt công tắc A, B; tín hiệu chạy theo dây vào IC 74HC, LED đầu ra sáng theo bảng chân lý. Có chế độ tự chạy.",tags:["cổng logic","NAND","AND","XOR","74HC00","đại số Boole"],
  legend:[["#58ba76","Mức 1 (HIGH)"],["#6b7480","Mức 0 (LOW)"]],
  controls:[{id:"g",t:"sel",l:"Loại cổng",o:[["NAND","NAND · 74HC00"],["AND","AND · 74HC08"],["OR","OR · 74HC32"],["NOR","NOR · 74HC02"],["XOR","XOR · 74HC86"]]},{id:"A",t:"bit",l:"Công tắc A"},{id:"B",t:"bit",l:"Công tắc B"},{id:"autoTT",t:"bool",l:"Tự chạy bảng chân lý"}],
  build(T,v,st){
   const S=v.scene;S.add(breadboard(T,10,5));const CHIP={NAND:"74HC00",AND:"74HC08",OR:"74HC32",NOR:"74HC02",XOR:"74HC86"};
   let ic=dipMesh(T,CHIP[st.g],14);ic.position.set(.6,.45,0);S.add(ic);let curG=st.g;
   const sw=["A","B"].map((n,i)=>{const g=new T.Group();const base=new T.Mesh(new T.BoxGeometry(.7,.3,.45),LM(T,0x2e6fd8));g.add(base);const kn=new T.Mesh(new T.BoxGeometry(.18,.22,.2),LM(T,0xf2f2f2));kn.position.y=.24;g.add(kn);g.userData.kn=kn;g.position.set(-3.6+i*1.4,.15,1.95);S.add(g);const s=sprite(T,n,{scale:.3});s.position.set(-3.6+i*1.4,.85,1.95);S.add(s);return g});
   const pins=ic.userData.pins,px=n=>.6+pins[n][0],pz=n=>pins[n][1];
   const routes={A:V3(T,[[-3.6,.32,1.7],[-3.6,.32,1.25],[px(1),.32,1.25],[px(1),.32,pz(1)]]),B:V3(T,[[-2.2,.32,1.7],[-2.2,.32,1.45],[px(2),.32,1.45],[px(2),.32,pz(2)]]),Y:V3(T,[[px(3),.32,pz(3)],[px(3),.32,1.05],[3.6,.32,1.05],[3.6,.32,.2]])};
   const mats={},paths={};for(const k of ["A","B","Y"]){mats[k]=LM(T,0x6b7480,{emissive:0x000000});const P=routes[k];for(let i=0;i<P.length-1;i++)S.add(cylBetween(T,P[i],P[i+1],.045,mats[k]));paths[k]=pathOf(T,P,false)}
   const vcc=LM(T,0xd0473c),gnd=LM(T,0x222222);V3(T,[[px(14),.32,pz(14)],[px(14),.32,-2.25]]).reduce((a,b)=>{S.add(cylBetween(T,a,b,.04,vcc));return b});V3(T,[[px(7),.32,pz(7)],[px(7),.32,1.7],[px(7)+.4,.32,2.25]]).reduce((a,b)=>{S.add(cylBetween(T,a,b,.04,gnd));return b});
   const l14=sprite(T,"VCC",{scale:.26,color:"#ff9a7a"});l14.position.set(px(14),.8,-2.25);S.add(l14);
   const led=ledMesh(T,0x2ecc71);led.position.set(3.6,.25,.2);S.add(led);const light=new T.PointLight(0x2ecc71,0,6);light.position.set(3.6,1.2,.2);S.add(light);
   const ly=sprite(T,"Y",{scale:.3});ly.position.set(3.6,1.4,.2);S.add(ly);
   const NP=10,pulse=new T.InstancedMesh(new T.SphereGeometry(.07,10,8),new T.MeshBasicMaterial({color:0x9df5b8}),NP*3);S.add(pulse);let ph=0,tt=0;
   const F={NAND:(a,b)=>1-(a&b),AND:(a,b)=>a&b,OR:(a,b)=>a|b,NOR:(a,b)=>1-(a|b),XOR:(a,b)=>a^b};
   return {frame(dt,run){if(st.g!==curG){curG=st.g;ic.userData.lab.material.map.dispose();ic.userData.lab.material.map=labelTex(T,CHIP[st.g]);ic.userData.lab.material.needsUpdate=true}
      if(run&&st.autoTT){tt+=dt;if(tt>1.6){tt=0;const n=((st.A<<1)|st.B)+1;st.A=(n>>1)&1;st.B=n&1;if(n>3){st.A=0;st.B=0}syncCtl(st)}}
      const y=F[st.g](st.A,st.B);const lv={A:st.A,B:st.B,Y:y};
      sw.forEach((g,i)=>g.userData.kn.position.x=(i?st.B:st.A)?.16:-.16);
      for(const k in mats){mats[k].color.setHex(lv[k]?0x58ba76:0x6b7480);mats[k].emissive.setHex(lv[k]?0x1d5a31:0x000000)}
      led.userData.mat.emissiveIntensity=y?1.5:0;light.intensity=y?2:0;
      if(run)ph+=dt*.5;const mt=new T.Matrix4();["A","B","Y"].forEach((k,j)=>{for(let i=0;i<NP;i++){const u=((i/NP+ph)%1);const p=paths[k].getPointAt(u);const s=lv[k]?1:0;mt.makeScale(s,s,s);mt.setPosition(p.x,p.y+.05,p.z);pulse.setMatrixAt(j*NP+i,mt)}});pulse.instanceMatrix.needsUpdate=true},
     info(){const y=F[st.g](st.A,st.B);const rows=[[0,0],[0,1],[1,0],[1,1]];const expr={NAND:"Y = ¬(A·B)",AND:"Y = A·B",OR:"Y = A + B",NOR:"Y = ¬(A + B)",XOR:"Y = A ⊕ B"}[st.g];
      return `<div class="readout"><div class="ro"><small>Biểu thức</small><b>${expr}</b></div><div class="ro"><small>Đầu ra Y</small><b>${y}</b></div><div class="ro"><small>IC</small><b>${CHIP[st.g]}</b></div></div>
       <div class="tbl-wrap"><table class="tt"><tr><th>A</th><th>B</th><th>Y</th></tr>${rows.map(([a,b])=>`<tr class="${a===st.A&&b===st.B?"hl":""}"><td>${a}</td><td>${b}</td><td>${F[st.g](a,b)}</td></tr>`).join("")}</table></div>
       <ol class="steps"><li class="on">Công tắc nối đầu vào lên VCC (mức 1) hoặc xuống GND (mức 0).</li><li class="on">IC họ 74xx cấp nguồn ở chân 14 (VCC) và chân 7 (GND).</li><li class="on">Mô hình nối cổng thứ nhất của IC vào chân 1, 2, 3${st.g==="NOR"?" (riêng 74HC02 thực tế: đầu ra chân 1, đầu vào chân 2, 3)":" (đầu vào 1, 2 · đầu ra 3)"}.</li><li class="${y?"on":""}">Đầu ra mức 1 làm LED sáng.</li></ol>`}};
  }},
 parts:{name:"Thư viện linh kiện 3D",desc:"Xoay, phóng to linh kiện thật: điện trở, tụ hóa, IC DIP, LED, vi điều khiển QFP — kèm ghi chú nhận biết.",tags:["linh kiện","IC","nhận biết"],
  controls:[{id:"m",t:"sel",l:"Linh kiện",o:Object.keys(MODELS).map(k=>[k,MODELS[k].name])}],
  build(T,v,st){let cur=null,key=null;const ring=new T.Mesh(new T.CylinderGeometry(3.2,3.2,.05,64),LM(T,0x2a2f35,{roughness:.9}));ring.position.y=-1.6;v.scene.add(ring);let ang=0;
   return {frame(dt,run){if(st.m!==key){if(cur)v.scene.remove(cur);key=st.m;cur=buildModel(T,key);cur.scale.setScalar(1.25);v.scene.add(cur)}if(run){ang+=dt*.5;cur.rotation.y=ang}},
     info(){const m=MODELS[st.m];return `<h3 style="font-size:15px">${esc(m.name)}</h3><div style="display:grid;gap:8px">${m.parts.map(p=>`<div class="ro"><small>${esc(p[0])}</small><span>${esc(p[1])}</span></div>`).join("")}</div>`}}}}
};
const SIM2D={divider:["Mạch chia áp","Ohm, KVL"],rc:["Nạp/xả RC (đồ thị)","τ = RC"],opamp:["Op-amp đảo/không đảo","Khuếch đại, bão hòa"],gates:["Bàn thử cổng logic","Bảng chân lý"],adder:["Bộ cộng 4 bit","Ripple carry, bù 2"],latch:["SR / D latch","Mạch tuần tự"],pwm:["PWM & LED","Duty cycle, R hạn dòng"],spi:["Truyền SPI","SCLK, MOSI, MISO"],rtos:["Lập lịch RTOS","Ưu tiên, chiếm quyền"],cpu:["CPU 8 bit chạy lệnh","Fetch – execute"],pipeline:["Pipeline 5 tầng","Hazard, stall"],cache:["Cache direct/2-way","Hit, miss, AMAT"]};

let _syncCtl=null;function syncCtl(st){if(_syncCtl)_syncCtl(st)}
async function openLabCatalog(){
  UI.reopen=()=>openLabCatalog();
  openModal({title:"Phòng thí nghiệm 3D",body:`<div class="pad" style="display:grid;gap:18px">
    <div id="labAi"></div>
    <div><div class="eyebrow" style="margin-bottom:8px">Mô hình chạy được</div><div class="catalog">${Object.entries(LABS).map(([k,l])=>`<button class="cat" data-lab="${k}">${ic("cube")}<b>${esc(l.name)}</b><span>${esc(l.desc)}</span></button>`).join("")}</div></div>
    <div><div class="eyebrow" style="margin-bottom:8px">Mô phỏng 2D</div><div class="catalog">${Object.entries(SIM2D).map(([k,[n,d]])=>`<button class="cat" data-sim="${k}">${ic("wave")}<b>${esc(n)}</b><span>${esc(d)}</span></button>`).join("")}</div></div></div>`});
  $$("[data-lab]").forEach(b=>b.onclick=()=>openLab(b.dataset.lab));$$("[data-sim]").forEach(b=>b.onclick=()=>openSim(b.dataset.sim));
  const box=$("#labAi");
  if(P.sample&&UI.cur&&UI.srcs.length){box.innerHTML=`<div class="src-busy" style="padding:0"><span class="spin"></span>AI đang chọn mô hình hợp với nguồn của bạn…</div>`;
    try{const ctx=await sourceContext(null,40000);const cat=[...Object.entries(LABS).map(([k,l])=>`lab:${k} — ${l.name} [${l.tags.join(", ")}]`),...Object.entries(SIM2D).map(([k,[n,d]])=>`sim:${k} — ${n} [${d}]`)].join("\n");
      const r=await P.sample.json(`${rulesFor()}\n\nNHIỆM VỤ: Từ danh mục mô hình dưới đây, chọn tối đa 4 mô hình giúp người học hình dung nội dung trong NGUỒN. Chỉ chọn mã có trong danh mục. "why": 1 câu nói rõ phần nào trong nguồn liên quan.\nDANH MỤC:\n${cat}\nTrả về CHỈ JSON: {"picks":[{"id":"lab:led","why":"…"}]}\n\nNGUỒN:\n${ctx.text}`,{modelTier:"quick",cache:{gcTime:36e5}});
      const picks=(r.picks||[]).filter(p=>/^(lab|sim):/.test(p.id)&&((p.id.startsWith("lab:")&&LABS[p.id.slice(4)])||(p.id.startsWith("sim:")&&SIM2D[p.id.slice(4)])));
      if(!$("#labAi"))return;box.innerHTML=picks.length?`<div class="eyebrow" style="margin-bottom:8px">Gợi ý cho sổ học này</div><div class="catalog">${picks.map(p=>{const [t,k]=p.id.split(":");const n=t==="lab"?LABS[k].name:SIM2D[k][0];return `<button class="cat" data-pick="${esc(p.id)}" style="border-color:var(--accent)">${ic(t==="lab"?"cube":"wave")}<b>${esc(n)}</b><span class="why">${mdInline(p.why||"",ctx.labels)}</span></button>`}).join("")}</div>`:"";
      $$("[data-pick]").forEach(b=>b.onclick=()=>{const [t,k]=b.dataset.pick.split(":");t==="lab"?openLab(k):openSim(k)});
    }catch(e){if($("#labAi"))box.innerHTML=""}}
}
function openSim(k){
  UI.reopen=()=>openSim(k);
  openModal({title:SIM2D[k][0],body:`<div class="pad"><div class="sim" id="simBox"></div><p class="muted" style="font-size:13px">Mô hình lý tưởng hóa; linh kiện thật có sai số và giới hạn công suất.</p></div>`,actions:`<button class="pill-btn" id="simBack">${ic("back")} Danh mục</button>`});
  $("#simBack").onclick=openLabCatalog;SIM[k]($("#simBox"));
}
async function openLab(k){
  UI.reopen=()=>openLab(k);
  const L=LABS[k];const st={};
  L.controls.forEach(c=>{st[c.id]=c.t==="sel"?c.o[0][0]:c.t==="bit"?0:c.t==="bool"?false:(c.log?(c.raw?Math.round(10**c.v):Math.round(10**c.v/10)*10):c.v)});
  openModal({title:L.name,actions:`<button class="pill-btn" id="labBack">${ic("back")} Danh mục</button>`,body:`<div class="lab"><div class="lab-stage" id="stage"><div class="loadmsg">Đang tải mô hình 3D…</div>${L.legend?`<div class="legend">${L.legend.map(([c,t])=>`<span><i style="background:${c}"></i>${esc(t)}</span>`).join("")}</div>`:""}<span class="hint">Kéo để xoay · cuộn hoặc chụm hai ngón để phóng to</span></div>
   <aside class="lab-side"><div style="display:flex;gap:8px"><button class="pill-btn primary" id="run">${ic("pause")} Tạm dừng</button>${k==="cap"?`<button class="pill-btn" id="rst">Xả hết · đặt lại</button>`:""}</div>
   <div id="ctls" style="display:grid;gap:12px">${L.controls.map(c=>c.t==="sel"?`<div class="field"><label for="c_${c.id}">${esc(c.l)}</label><select id="c_${c.id}">${c.o.map(([v,t])=>`<option value="${v}">${esc(t)}</option>`).join("")}</select></div>`
     :c.t==="bit"?`<div class="field" style="grid-auto-flow:column;justify-content:space-between;align-items:center"><span>${esc(c.l)}</span><button class="toggle" id="c_${c.id}" aria-pressed="false">0</button></div>`
     :c.t==="bool"?`<label class="field" style="grid-auto-flow:column;justify-content:start;align-items:center;gap:8px"><input type="checkbox" class="chk" id="c_${c.id}">${esc(c.l)}</label>`
     :`<div class="field"><div class="row"><label for="c_${c.id}">${esc(c.l)}</label><output id="o_${c.id}"></output></div><input type="range" id="c_${c.id}" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.v}"></div>`).join("")}</div>
   <div id="labInfo" style="display:grid;gap:12px"></div>
   <button class="pill-btn" id="labAsk">${ic("chat")} Hỏi trợ lý về mô hình này</button></aside></div>`});
  $("#labBack").onclick=openLabCatalog;
  const outFmt=(c,val)=>c.u==="Ω"?fmt(val,"Ω"):c.u==="µF"?(val>=1000?(val/1000).toLocaleString("vi-VN")+" mF":val+" µF"):c.u==="×"?val+"×":(+val).toFixed(2)+" "+c.u;
  const bind=()=>{L.controls.forEach(c=>{const el=$("#c_"+c.id);if(!el)return;
    if(c.t==="sel")el.onchange=()=>st[c.id]=el.value;
    else if(c.t==="bit")el.onclick=()=>{st[c.id]^=1;el.textContent=st[c.id];el.setAttribute("aria-pressed",!!st[c.id])};
    else if(c.t==="bool")el.onchange=()=>st[c.id]=el.checked;
    else{const up=()=>{const x=+el.value;st[c.id]=c.log?(c.raw?Math.round(10**x):Math.round(10**x/10)*10):x;$("#o_"+c.id).textContent=outFmt(c,st[c.id])};el.oninput=up;up()}})};
  bind();
  _syncCtl=s=>L.controls.forEach(c=>{if(c.t==="bit"){const el=$("#c_"+c.id);if(el){el.textContent=s[c.id];el.setAttribute("aria-pressed",!!s[c.id])}}});
  let run=!matchMedia("(prefers-reduced-motion: reduce)").matches;const rb=$("#run");const setRun=()=>rb.innerHTML=run?`${ic("pause")} Tạm dừng`:`${ic("play")} Chạy`;setRun();rb.onclick=()=>{run=!run;setRun()};
  $("#labAsk").onclick=()=>{const txt=$("#labInfo").innerText.slice(0,1500);closeModal();if(UI.cur)chatSend(`Tôi đang xem mô hình "${L.name}" với trạng thái:\n${txt}\nGiải thích hiện tượng này và liên hệ với nguồn của tôi.`);else toast("Mở một sổ học để hỏi trợ lý")};
  let T;try{T=await ensureThree()}catch(e){const lm=$("#stage .loadmsg");if(lm)lm.textContent="Không tải được thư viện 3D. Kiểm tra mạng rồi mở lại.";return}
  const stage=$("#stage");if(!stage)return;$(".loadmsg",stage)?.remove();
  const v=makeViewer(T,stage,{dist:k==="mos"?9:k==="parts"?8:11.5,rx:k==="mos"?.35:.62,target:k==="mos"?[0,-.3,0]:[0,.3,0]});
  const inst=L.build(T,v,st);
  const rs=$("#rst");if(rs&&inst.reset)rs.onclick=()=>inst.reset();
  let it=0;v.onFrame(dt=>{inst.frame(dt,run);it+=dt;if(it>.2){it=0;const box=$("#labInfo");if(box)box.innerHTML=inst.info()}});
  $("#labInfo").innerHTML=inst.info();
  UI.modalCleanup=()=>{_syncCtl=null;v.dispose()};
}

/* =====================================================================
   SỔ MẪU (tạo một lần khi chưa có sổ học nào)
   ===================================================================== */
const SAMPLE_SRC=`BÀI GIẢNG MẪU — THIẾT KẾ HỆ THỐNG SỐ: BIỂU DIỄN MẠCH LOGIC
(Nguồn mẫu do Sổ Học biên soạn để minh họa. Hãy thay bằng bài giảng của bạn.)

1. Hằng số và biến Boole
Trong đại số Boole chỉ có hai giá trị: 0 và 1. Chúng biểu diễn Sai/Đúng, Tắt/Bật, mức điện áp Thấp/Cao, công tắc Mở/Đóng. Ta dùng các chữ cái A, B, C… làm biến Boole. Ba phép toán cơ bản là OR (cộng logic, ký hiệu +), AND (nhân logic, ký hiệu ·) và NOT (phủ định, ký hiệu gạch trên hoặc dấu ').

2. Ba cổng logic cơ bản
- Cổng AND: đầu ra bằng 1 chỉ khi tất cả đầu vào bằng 1. Y = A·B.
- Cổng OR: đầu ra bằng 1 khi có ít nhất một đầu vào bằng 1. Y = A + B.
- Cổng NOT (inverter): đầu ra là phủ định của đầu vào. Y = A'.
Bảng chân lý liệt kê đầu ra cho mọi tổ hợp đầu vào; với n đầu vào có 2^n hàng.

3. Cổng NAND, NOR và tính vạn năng
NAND là AND rồi đảo: Y = (A·B)'. NOR là OR rồi đảo: Y = (A + B)'.
NAND và NOR là cổng vạn năng: mọi hàm logic đều dựng được chỉ từ NAND (hoặc chỉ từ NOR).
- NOT từ NAND: nối chung hai đầu vào, (A·A)' = A'.
- AND từ NAND: một cổng NAND theo sau bởi một NAND làm NOT.
- OR từ NAND: đảo từng đầu vào rồi NAND: (A'·B')' = A + B.
Ngoài thực tế, IC 74HC00 chứa bốn cổng NAND hai đầu vào; chân 14 là VCC, chân 7 là GND.

4. Các định lý Boole và định lý DeMorgan
Định lý một biến: x·0 = 0; x·1 = x; x·x = x; x·x' = 0; x + 0 = x; x + 1 = 1; x + x = x; x + x' = 1; (x')' = x.
Định lý nhiều biến: giao hoán x + y = y + x, x·y = y·x; kết hợp; phân phối x(y + z) = xy + xz và x + yz = (x + y)(x + z); hấp thụ x + xy = x; x + x'y = x + y.
Định lý DeMorgan: (x + y)' = x'·y' và (x·y)' = x' + y'.
Ví dụ rút gọn: F = AB + AB' = A(B + B') = A·1 = A. G = (A + B)(A + B') = A + BB' = A.

5. Biểu diễn cổng thay thế
Theo DeMorgan, một cổng NAND tương đương một cổng OR có hai đầu vào đảo (vòng tròn nhỏ – "bong bóng" – ở đầu vào). Cổng NOR tương đương cổng AND có đầu vào đảo. Bong bóng biểu thị tín hiệu tích cực mức thấp (active-LOW). Khi vẽ sơ đồ, chọn ký hiệu sao cho đầu ra có bong bóng nối vào đầu vào có bong bóng giúp đọc chức năng mạch dễ hơn.

6. Thiết kế mạch số hiện đại với HDL và PLD
Ngôn ngữ mô tả phần cứng (HDL) như VHDL và Verilog mô tả mạch bằng văn bản. Phần mềm tổng hợp (synthesis) biên dịch mã HDL thành sơ đồ kết nối (netlist) rồi nạp vào thiết bị logic khả trình (PLD) hoặc FPGA.
Ví dụ VHDL cho cổng AND:
entity AND_GATE is
  port (A, B : in std_logic; Y : out std_logic);
end AND_GATE;
architecture behavior of AND_GATE is
begin
  Y <= A and B;
end behavior;
Phần entity khai báo cổng vào/ra; phần architecture mô tả hoạt động. Tín hiệu trung gian được khai báo bằng từ khóa signal bên trong architecture.`;
async function seedSample(){
  const nb="nb-mau-logic",src="src-mau-logic",L=["Bài giảng mẫu — Biểu diễn mạch logic"];
  await Store.put("txt-"+src+"-0",{type:"txt",nb,src,n:0,text:SAMPLE_SRC});
  await Store.put(src,{type:"src",nb,name:L[0],kind:"paste",chars:SAMPLE_SRC.length,chunks:1,on:true,created:Date.now()});
  await Store.put(nb,{type:"nb",sample:true,title:"Thiết kế hệ thống số: Mô tả mạch logic",created:Date.now(),updated:Date.now(),srcCount:1,
    summary:"Nguồn giới thiệu **đại số Boole** với hai giá trị 0 và 1 cùng ba phép toán **AND, OR, NOT** [1]. Bài giảng trình bày **tính vạn năng của NAND và NOR**, các **định lý Boole** và **định lý DeMorgan** để rút gọn biểu thức [1]. Phần cuối nói về **biểu diễn cổng thay thế** bằng bong bóng tích cực mức thấp và quy trình thiết kế với **HDL (VHDL)** và **PLD/FPGA** [1].",
    questions:["Làm thế nào để dựng cổng OR chỉ bằng cổng NAND?","Định lý DeMorgan giúp rút gọn biểu thức logic như thế nào?","Phần entity và architecture trong VHDL khác nhau ra sao?"]});
  const base={type:"art",nb,status:"done",srcLabels:L,cfg:{lang:"vi"},sample:true};
  await Store.put("art-mau-slides",{...base,kind:"slides",title:"Biểu diễn mạch logic",created:Date.now()-5,data:{title:"Biểu diễn mạch logic",slides:[
    {title:"Đại số Boole: chỉ có 0 và 1",bullets:["Hai giá trị: Sai/Đúng, Thấp/Cao, Tắt/Bật","Biến Boole: A, B, C…","Ba phép toán: OR (+), AND (·), NOT (')"],notes:"Chào các em. Toàn bộ mạch số được xây trên một ý tưởng rất đơn giản: mỗi tín hiệu chỉ có hai giá trị, không và một. Ta gọi tên các tín hiệu bằng chữ cái và kết hợp chúng bằng ba phép toán OR, AND và NOT.",visual:"none",cite:[1]},
    {title:"Ba cổng cơ bản",bullets:["AND = 1 khi mọi đầu vào = 1","OR = 1 khi ít nhất một đầu vào = 1","NOT đảo giá trị đầu vào"],notes:"Nhìn bảng chân lý: cổng AND chỉ ra một ở hàng cuối, cổng OR ra một ở ba hàng. Với n đầu vào, bảng có hai mũ n hàng.",visual:"table",table:{headers:["A","B","A·B","A+B"],rows:[["0","0","0","0"],["0","1","0","1"],["1","0","0","1"],["1","1","1","1"]]},cite:[1]},
    {title:"NAND và NOR là cổng vạn năng",bullets:["NOT: nối chung hai đầu vào NAND","AND: NAND rồi NAND làm NOT","OR: (A'·B')' = A + B","IC 74HC00: 4 cổng NAND, chân 14 VCC, chân 7 GND"],notes:"Điều thú vị là chỉ cần cổng NAND ta dựng được mọi cổng khác. Ví dụ nối chung hai đầu vào NAND ta có cổng NOT. Hãy mở Phòng thí nghiệm 3D để gạt công tắc trên IC 74HC00.",visual:"inverter",cite:[1]},
    {title:"Định lý DeMorgan",bullets:["(x + y)' = x'·y'","(x·y)' = x' + y'","Rút gọn: AB + AB' = A"],notes:"Định lý DeMorgan cho phép đổi phép AND thành OR khi đẩy dấu phủ định qua. Ví dụ AB cộng AB phẩy, nhóm A ra ngoài, còn B cộng B phẩy bằng một, nên kết quả là A.",visual:"formula",formula:"F = AB + AB'\n  = A(B + B')\n  = A·1 = A",cite:[1]},
    {title:"Từ HDL đến phần cứng",bullets:["VHDL/Verilog mô tả mạch bằng văn bản","Tổng hợp → netlist → nạp vào PLD/FPGA","entity: cổng vào/ra · architecture: hoạt động"],notes:"Ngày nay ta ít khi nối từng cổng bằng tay. Ta viết mô tả bằng VHDL, phần mềm tổng hợp biến nó thành sơ đồ kết nối và nạp vào FPGA.",visual:"formula",formula:"entity AND_GATE is\n  port (A, B : in std_logic;\n        Y : out std_logic);\nend AND_GATE;\narchitecture behavior of AND_GATE is\nbegin\n  Y <= A and B;\nend behavior;",cite:[1]}]}});
  await Store.put("art-mau-quiz",{...base,kind:"quiz",title:"Kiểm tra: cổng logic & DeMorgan",created:Date.now()-4,data:{title:"Kiểm tra: cổng logic & DeMorgan",questions:[
    {q:"Theo định lý DeMorgan, (x·y)' bằng?",options:["x'·y'","x' + y'","x + y","(x + y)'"],answer:1,explain:"(x·y)' = x' + y' [1].",hint:"Phủ định đổi AND thành OR.",cite:[1]},
    {q:"Rút gọn F = AB + AB'.",options:["B","AB","A","1"],answer:2,explain:"F = A(B + B') = A·1 = A [1].",cite:[1]},
    {q:"Cách tạo cổng NOT từ một cổng NAND?",options:["Nối đầu vào với GND","Nối chung hai đầu vào","Đảo đầu ra","Không thể"],answer:1,explain:"(A·A)' = A' [1].",cite:[1]},
    {q:"Trong IC 74HC00, chân nào là VCC?",options:["Chân 1","Chân 7","Chân 8","Chân 14"],answer:3,explain:"Chân 14 là VCC, chân 7 là GND [1].",cite:[1]}]}});
  await Store.put("art-mau-flash",{...base,kind:"flash",title:"Thẻ nhớ: đại số Boole",created:Date.now()-3,data:{title:"Thẻ nhớ: đại số Boole",cards:[{q:"x + x' = ?",a:"1",cite:[1]},{q:"x·x' = ?",a:"0",cite:[1]},{q:"Định lý hấp thụ",a:"x + xy = x",cite:[1]},{q:"(x + y)' = ?",a:"x'·y' (DeMorgan)",cite:[1]},{q:"Bong bóng ở đầu vào cổng nghĩa là gì?",a:"Tín hiệu tích cực mức thấp (active-LOW)",cite:[1]},{q:"Hai phần chính của một thiết kế VHDL",a:"entity (cổng vào/ra) và architecture (hoạt động)",cite:[1]}]}});
  await Store.put("art-mau-mind",{...base,kind:"mindmap",title:"Sơ đồ: biểu diễn mạch logic",created:Date.now()-2,data:{title:"Sơ đồ: biểu diễn mạch logic",root:{t:"Biểu diễn mạch logic",c:[{t:"Đại số Boole",c:[{t:"Giá trị 0 và 1"},{t:"Biến A, B, C"},{t:"OR · AND · NOT"}]},{t:"Cổng logic",c:[{t:"AND, OR, NOT"},{t:"NAND, NOR vạn năng",c:[{t:"NOT từ NAND"},{t:"OR từ NAND"}]},{t:"IC 74HC00"}]},{t:"Định lý",c:[{t:"Một biến"},{t:"Phân phối, hấp thụ"},{t:"DeMorgan"}]},{t:"Ký hiệu thay thế",c:[{t:"Bong bóng active-LOW"},{t:"Nối bong bóng với bong bóng"}]},{t:"HDL & PLD",c:[{t:"VHDL / Verilog"},{t:"Tổng hợp → netlist"},{t:"entity / architecture"}]}]}}});
  await Store.put("art-mau-info",{...base,kind:"info",title:"Hệ sinh thái biểu diễn logic",created:Date.now()-1,data:{title:"Hệ sinh thái biểu diễn logic",subtitle:"Từ ý tưởng đại số đến phần cứng",center:"Mạch logic",nodes:[{label:"Đại số Boole",desc:"Công cụ toán học"},{label:"Bảng chân lý",desc:"Liệt kê mọi tổ hợp đầu vào"},{label:"Ký hiệu sơ đồ",desc:"Cổng chuẩn và cổng thay thế"},{label:"Định lý DeMorgan",desc:"Rút gọn, đổi AND↔OR"},{label:"HDL",desc:"VHDL, Verilog"},{label:"PLD / FPGA",desc:"Phần cứng khả trình"}],keys:["NAND và NOR đủ để dựng mọi hàm logic [1]","DeMorgan: (x·y)' = x' + y' [1]","HDL được tổng hợp thành netlist rồi nạp vào PLD [1]"]}});
  await Store.put("meta-seeded",{type:"meta",at:Date.now()});
}

/* =====================================================================
   KHỞI ĐỘNG
   ===================================================================== */
(function boot(){
  const t=local.get("theme",null);if(t)document.documentElement.setAttribute("data-theme",t);
  renderTop();renderRail();applySkin(local.get("skin","dem"),true);ensureKatex().then(()=>upgradeMath(document.body)).catch(()=>{});
  initPlatform().then(async()=>{
    renderTop();renderRail();initDecor();
    let first=true;
    Store.watch({type:"nb"},async docs=>{
      UI.nbs=docs;
      if(first){first=false;if(!docs.length){const m=await Store.get("meta-seeded").catch(()=>null);if(!m){try{await seedSample();await seedVideo()}catch(e){console.warn(e)}return}}else if(docs.some(d=>d.id==="nb-mau-logic")){Store.get("art-mau-video").then(v=>{if(!v)seedVideo()}).catch(()=>{})}}
      if(UI.view!=="nb")refreshViews("nb");
      else if(UI.cur){const n=docs.find(d=>d.id===UI.cur.id);if(!n){goHome();return}UI.cur=n;renderChat();renderCrumb();if(UI.srcTab!=="src")renderSources();const ti=$("#tTitle");if(ti&&document.activeElement!==ti)ti.value=n.title}
    });
    Store.watch({type:"cal"},docs=>{UI.cals=docs;refreshViews("cal")});
    Store.watch({type:"subj"},docs=>{UI.subjs=docs;refreshViews("subj")});
    Store.watch({type:"fold"},docs=>{UI.folds=docs;refreshViews("fold")});
    Store.watch({type:"task"},docs=>{UI.tasks=docs;refreshViews("task")});
    Store.watch({type:"ev"},docs=>{UI.evs=docs;refreshViews("ev")});
    loadDash();loadBg();
    Store.get("profile-me").then(p=>{if(p){UI.profile=p;applyPrefs(p);if(UI.view==="home")renderHome()}}).catch(()=>{});
    setTimeout(()=>seedSubjects().catch(e=>console.warn(e)),1200);
    if(!Store.persistent())setTimeout(()=>toast("Đang chạy ngoài ứng dụng Claude: sổ học không được lưu lại",4000),800);
  });
})();
function openSimCatalog(){openLabCatalog()}
