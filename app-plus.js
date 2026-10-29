/* =====================================================================
   Sổ Học Điện Tử — v12
   1. Kéo để đổi kích thước: khối trang chủ (rộng + cao), cột các trang,
      bảng bên, hộp thoại, widget nổi. Kích thước được lưu lại.
   2. Nhạc từ link: kéo thả / dán link YouTube, SoundCloud, Spotify,
      tệp nhạc trực tiếp (mp3…), Google Drive, Dropbox → trình phát mini.
   3. Ứng dụng (PWA): nút "Cài ứng dụng", lối tắt, chia sẻ link vào app.
   Tệp này chạy sau app.js và chỉ bọc thêm các hàm có sẵn.
   ===================================================================== */
(function(){
"use strict";
const RS=Object.assign({vars:{}},local.get("rs",{}));const saveRS=()=>local.set("rs",RS);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const root=document.documentElement;

Object.assign(IC,{
  play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  pause:'<path d="M8 5v14M16 5v14" stroke-width="3"/>',
  next:'<path d="M6 6l9 6-9 6z" fill="currentColor"/><path d="M18 5v14"/>',
  prev:'<path d="M18 6l-9 6 9 6z" fill="currentColor"/><path d="M6 5v14"/>',
  rep1:'<path d="M4 11V9a3 3 0 0 1 3-3h12l-3-3M20 13v2a3 3 0 0 1-3 3H5l3 3"/><path d="M11.5 10.5l1-.5v4.5"/>',
  seq:'<path d="M4 7h11M4 12h11M4 17h7"/><path d="M17 14l4 3-4 3z" fill="currentColor"/>',
  list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  chevd:'<path d="M6 9l6 6 6-6"/>',
  inst:'<path d="M12 3v12M7 10l5 5 5-5"/><rect x="4" y="17" width="16" height="4" rx="1.5"/>'
});

/* ---------- tiện ích kéo bằng con trỏ (chuột, bút, cảm ứng) ---------- */
function dragPtr(e,{move,end,cursor}){
  e.preventDefault();e.stopPropagation();const t=e.currentTarget;try{t.setPointerCapture(e.pointerId)}catch(_){}
  document.body.classList.add("rs-dragging");document.body.style.cursor=cursor||"";
  let raf=0,last=null;const mv=ev=>{last=ev;if(!raf)raf=requestAnimationFrame(()=>{raf=0;move(last)})};
  const up=ev=>{t.removeEventListener("pointermove",mv);t.removeEventListener("pointerup",up);t.removeEventListener("pointercancel",up);
    cancelAnimationFrame(raf);if(last)move(last);document.body.classList.remove("rs-dragging");document.body.style.cursor="";end&&end(ev)};
  t.addEventListener("pointermove",mv);t.addEventListener("pointerup",up);t.addEventListener("pointercancel",up);
}
const okBtn=e=>!(e.button!==0&&e.pointerType==="mouse");
const nudge=()=>{try{dispatchEvent(new Event("resize"))}catch(e){}};

/* =====================================================================
   1a. KHỐI TRANG CHỦ — kéo cạnh phải (rộng), cạnh dưới (cao), góc (cả hai)
   ===================================================================== */
Object.assign(W_LBL,{1:"⅙",1.5:"¼",2.5:"5/12",3.5:"7/12",4.5:"¾",5:"⅚",5.5:"11/12"});
const _normDash12=normDash;
normDash=function(d){const o=_normDash12(d);
  if(d&&Array.isArray(d.blocks)){const raw=new Map(d.blocks.filter(b=>b&&b.id).map(b=>[b.id,b]));
    o.blocks.forEach(b=>{const r=raw.get(b.id);if(!r)return;const w=+r.w;if(w>=1&&w<=6)b.w=Math.round(w*2)/2;const h=+r.h;if(h>=60&&h<=4000)b.h=Math.round(h)})}
  return o};
if(UI.dash){try{UI.dash=normDash(local.get("dash",UI.dash))}catch(e){}}

const blkOf=id=>UI.dash&&UI.dash.blocks.find(x=>x.id===id);
const lbl=(w,h,mode)=>{const a=[];if(mode!=="s")a.push(W_LBL[w]||w);if(mode!=="e")a.push(h?Math.round(h)+"px":"cao tự động");return a.join(" · ")};
function gridInfo(){const g=$("#dgrid");const gs=getComputedStyle(g);const cols=gs.gridTemplateColumns.split(/\s+/).filter(Boolean).length||12;
  const gap=parseFloat(gs.columnGap)||14;const gr=g.getBoundingClientRect();return {cols,gap,colW:(gr.width-gap*(cols-1))/cols,min:innerWidth<=1000?3:1}}
function afterBlockResize(el){if(el&&$("#homeCal",el)&&typeof rerenderCals==="function"){try{rerenderCals()}catch(e){}}nudge()}

function decorateBlocks(){
  const g=$("#dgrid");if(!g||!UI.dash)return;
  $$(":scope>.blk[data-bid]",g).forEach(el=>{const b=blkOf(el.dataset.bid);if(!b||el.classList.contains("rs-live"))return;
    if(el.style.getPropertyValue("--w").trim()!==String(b.w))el.style.setProperty("--w",b.w);
    const hv=b.h?b.h+"px":"";if(el.style.getPropertyValue("--h").trim()!==hv){if(hv)el.style.setProperty("--h",hv);else el.style.removeProperty("--h")}
    if(el.classList.contains("has-h")!==!!b.h)el.classList.toggle("has-h",!!b.h);
    const wb=$("[data-bt=w]",el);if(wb&&wb.textContent!==(W_LBL[b.w]||String(b.w)))wb.textContent=W_LBL[b.w]||String(b.w);
    if(!$(":scope>.rs-e",el)){
      el.insertAdjacentHTML("beforeend",`<div class="rs-h rs-e" data-rs="e" tabindex="0" role="separator" aria-orientation="vertical" aria-label="Kéo để đổi độ rộng khối (phím ← →)" title="Kéo để đổi độ rộng · bấm đúp để về mặc định"></div><div class="rs-h rs-s" data-rs="s" tabindex="0" role="separator" aria-orientation="horizontal" aria-label="Kéo để đổi chiều cao khối (phím ↑ ↓)" title="Kéo để đổi chiều cao · bấm đúp để cao tự động"></div><div class="rs-h rs-se" data-rs="se" aria-hidden="true" title="Kéo để đổi cả rộng và cao"></div>`);
      $$(":scope>.rs-h",el).forEach(h=>bindBlkHandle(h,el))}
  });
}
function bindBlkHandle(h,el){const mode=h.dataset.rs;
  h.addEventListener("pointerdown",e=>{if(!okBtn(e))return;const id=el.dataset.bid;const b=blkOf(id);if(!b)return;
    const G=gridInfo();const r=el.getBoundingClientRect();const body=$(".blk-b",el);const h0=body?body.getBoundingClientRect().height:200;const y0=e.clientY;
    let w=b.w,hh=b.h||null;el.classList.add("rs-live");const badge=document.createElement("div");badge.className="rs-badge";el.appendChild(badge);badge.textContent=lbl(w,hh,mode);
    /* kéo mượt: khối giãn theo chuột (px), khung nét đứt cho thấy độ rộng sẽ bám vào; thả ra mới xếp lại lưới */
    const gr=$("#dgrid").getBoundingClientRect();const pxOf=ww=>{const n=ww*2*G.cols/12;return n*(G.colW+G.gap)-G.gap};let raw=r.width;let ghost=null;
    if(mode!=="s"){ghost=document.createElement("div");ghost.className="rs-ghost";el.appendChild(ghost);ghost.style.width=r.width+"px";el.style.width=r.width+"px";el.style.maxWidth="none";el.style.zIndex=6}
    dragPtr(e,{cursor:mode==="e"?"ew-resize":mode==="s"?"ns-resize":"nwse-resize",
      move(ev){if(mode!=="s"){const per=12/G.cols;raw=clamp(ev.clientX-r.left,Math.max(120,pxOf(G.min)*.6),gr.right-r.left);el.style.width=raw+"px";let span=Math.round((raw+G.gap)/(G.colW+G.gap))*per;w=clamp(span/2,G.min,6);ghost.style.width=Math.min(pxOf(w),gr.right-r.left)+"px"}
        if(mode!=="e"){hh=clamp(h0+(ev.clientY-y0),80,4000);el.style.setProperty("--h",hh+"px");el.classList.add("has-h")}
        badge.textContent=lbl(w,hh,mode)},
      end(){badge.remove();if(ghost)ghost.remove();const B=blkOf(id);if(!B){el.classList.remove("rs-live");return}
        const grid=$("#dgrid");const sibs=$$(":scope>.blk",grid).filter(x=>x!==el);const before=new Map(sibs.map(x=>[x,x.getBoundingClientRect()]));
        B.w=w;if(mode!=="e"&&hh)B.h=Math.round(hh);el.style.setProperty("--w",w);el.style.width="";el.style.maxWidth="";el.style.zIndex="";el.classList.remove("rs-live");
        if(mode!=="s"&&!(typeof RM==="function"&&RM())){const fw=el.getBoundingClientRect().width;el.animate([{width:raw+"px"},{width:fw+"px"}],{duration:220,easing:"cubic-bezier(.2,.8,.2,1)"});
          sibs.forEach(x=>{const a=before.get(x),c=x.getBoundingClientRect();const dx=a.left-c.left,dy=a.top-c.top;if(dx||dy)x.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:240,easing:"cubic-bezier(.2,.8,.2,1)"})})}
        saveDash();decorateBlocks();afterBlockResize(el)}})});
  h.addEventListener("dblclick",e=>{e.stopPropagation();const b=blkOf(el.dataset.bid);if(!b)return;
    if(mode!=="s"){const d=blkDef(b.k);b.w=(d&&d.w)||6}if(mode!=="e")delete b.h;saveDash();decorateBlocks();afterBlockResize(el);toast(mode==="e"?"Độ rộng về mặc định":"Chiều cao tự động")});
  h.addEventListener("keydown",e=>{const b=blkOf(el.dataset.bid);if(!b)return;const G=$("#dgrid")?gridInfo():{min:1};let used=true;
    if(mode==="e"&&(e.key==="ArrowLeft"||e.key==="ArrowRight"))b.w=clamp(b.w+(e.key==="ArrowRight"?.5:-.5),G.min,6);
    else if(mode==="s"&&(e.key==="ArrowUp"||e.key==="ArrowDown")){const cur=b.h||Math.round(($(".blk-b",el)||el).getBoundingClientRect().height);b.h=clamp(cur+(e.key==="ArrowDown"?1:-1)*(e.shiftKey?80:20),80,4000)}
    else used=false;
    if(used){e.preventDefault();saveDash();decorateBlocks();toast(lbl(b.w,b.h,mode),900)}});
}

/* =====================================================================
   1b. CỘT CỦA CÁC TRANG — vạch kéo giữa hai cột
   ===================================================================== */
const COLS=[
  {sel:".subj",v:"--rs-subj",side:"L",min:200,max:680},
  {sel:".calpage-in",v:"--rs-cal",side:"L",min:190,max:560},
  {sel:".report",v:"--rs-report",side:"L",min:170,max:600},
  {sel:".lab",v:"--rs-lab",side:"R",min:240,max:900},
  {sel:".studio-ed",v:"--rs-sted",side:"F"},
  {sel:".split",v:"--rs-split",side:"F"},
  {sel:".sim-grid",v:"--rs-sim",side:"F"}];
Object.entries(RS.vars).forEach(([k,v])=>root.style.setProperty(k,v));
const setVar=(k,v)=>{root.style.setProperty(k,v);RS.vars[k]=v};
const delVar=k=>{root.style.removeProperty(k);delete RS.vars[k]};
const colKids=c=>[...c.children].filter(x=>!x.classList.contains("rs-col")&&x.offsetParent!==null&&getComputedStyle(x).position!=="absolute"&&getComputedStyle(x).position!=="fixed");
const colRO=new ResizeObserver(ents=>{const seen=new Set();ents.forEach(en=>{const c=en.target.classList.contains("rs-host")?en.target:en.target.parentElement;if(c&&!seen.has(c)){seen.add(c);placeCol(c)}})});
function placeCol(c){const sp=c._rsCol;if(!sp)return;const k=colKids(c);
  if(k.length<2||innerWidth<=1100){sp.hidden=true;return}
  const ra=k[0].getBoundingClientRect(),rb=k[1].getBoundingClientRect(),rc=c.getBoundingClientRect();
  if(rb.left<ra.right-2||Math.abs(ra.top-rb.top)>Math.max(ra.height,rb.height)){sp.hidden=true;return}
  sp.hidden=false;const top=Math.min(ra.top,rb.top),bot=Math.max(ra.bottom,rb.bottom);
  sp.style.left=((ra.right+rb.left)/2-rc.left-c.clientLeft+c.scrollLeft-7)+"px";sp.style.top=(top-rc.top-c.clientTop+c.scrollTop)+"px";sp.style.height=Math.max(40,bot-top)+"px"}
function mountCols(){
  COLS.forEach(cfg=>$$(cfg.sel).forEach(c=>{if(c._rsCol&&c.contains(c._rsCol)){placeCol(c);return}
    if(getComputedStyle(c).position==="static")c.style.position="relative";c.classList.add("rs-host");
    const sp=document.createElement("div");sp.className="rs-col";sp.tabIndex=0;sp.setAttribute("role","separator");sp.setAttribute("aria-orientation","vertical");
    sp.setAttribute("aria-label","Kéo để đổi độ rộng cột (phím ← →, bấm đúp để về mặc định)");sp.title="Kéo để đổi độ rộng cột · bấm đúp để về mặc định";c.appendChild(sp);c._rsCol=sp;
    const kidsNow=()=>colKids(c);
    const setFrom=(px)=>{const k=kidsNow();if(k.length<2)return;const ra=k[0].getBoundingClientRect(),rb=k[1].getBoundingClientRect();const gap=Math.max(0,rb.left-ra.right);
      if(cfg.side==="L")setVar(cfg.v,clamp(px-ra.left-gap/2,cfg.min,Math.min(cfg.max,c.clientWidth-260))+"px");
      else if(cfg.side==="R")setVar(cfg.v,clamp(rb.right-px-gap/2,cfg.min,Math.min(cfg.max,c.clientWidth-260))+"px");
      else{const f=clamp((px-ra.left)/(rb.right-ra.left)*100,18,82);setVar(cfg.v+"-a",f.toFixed(1)+"fr");setVar(cfg.v+"-b",(100-f).toFixed(1)+"fr")}
      $$(cfg.sel).forEach(placeCol)};
    sp.addEventListener("pointerdown",e=>{if(!okBtn(e))return;sp.classList.add("drag");dragPtr(e,{cursor:"col-resize",move:ev=>setFrom(ev.clientX),end(){sp.classList.remove("drag");saveRS();nudge()}})});
    sp.addEventListener("dblclick",()=>{if(cfg.side==="F"){delVar(cfg.v+"-a");delVar(cfg.v+"-b")}else delVar(cfg.v);saveRS();$$(cfg.sel).forEach(placeCol);nudge();toast("Cột đã về độ rộng mặc định")});
    sp.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const r=sp.getBoundingClientRect();setFrom(r.left+7+(e.key==="ArrowRight"?1:-1)*(e.shiftKey?60:16));saveRS();nudge()});
    colRO.observe(c);colKids(c).slice(0,2).forEach(k=>colRO.observe(k));placeCol(c)}));
}
addEventListener("resize",()=>COLS.forEach(cfg=>$$(cfg.sel).forEach(placeCol)));

/* =====================================================================
   1c. BẢNG BÊN (flyout) — kéo mép phải
   ===================================================================== */
let flyH=null;const flyRO=new ResizeObserver(()=>placeFly());
function placeFly(){if(!flyH||!flyH._f)return;const r=flyH._f.getBoundingClientRect();flyH.style.left=(r.right-7)+"px";flyH.style.top=(r.top+16)+"px";flyH.style.height=Math.max(40,r.height-32)+"px"}
function mountFly(){const f=$(".flyout");
  if(!f){if(flyH){flyH.remove();flyH=null}return}
  if(!flyH){flyH=document.createElement("div");flyH.className="rs-fly";flyH.tabIndex=0;flyH.setAttribute("role","separator");flyH.setAttribute("aria-label","Kéo để đổi độ rộng bảng");flyH.title="Kéo để đổi độ rộng bảng · bấm đúp để về mặc định";document.body.appendChild(flyH);
    flyH.addEventListener("pointerdown",e=>{if(!okBtn(e)||!flyH._f)return;const L=flyH._f.getBoundingClientRect().left;flyH.classList.add("drag");
      dragPtr(e,{cursor:"ew-resize",move:ev=>{setVar("--rs-fly",clamp(ev.clientX-L,280,Math.min(900,innerWidth-110))+"px");placeFly()},end(){flyH&&flyH.classList.remove("drag");saveRS()}})});
    flyH.addEventListener("dblclick",()=>{delVar("--rs-fly");saveRS();setTimeout(placeFly,30)});
    flyH.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const r=flyH._f.getBoundingClientRect();setVar("--rs-fly",clamp(r.width+(e.key==="ArrowRight"?20:-20),280,innerWidth-110)+"px");saveRS();setTimeout(placeFly,20)})}
  if(flyH._f!==f){if(flyH._f)flyRO.unobserve(flyH._f);flyH._f=f;flyRO.observe(f)}
  placeFly()}
addEventListener("resize",placeFly);

/* =====================================================================
   1d. HỘP THOẠI — kéo góc dưới phải (hộp luôn ở giữa nên phóng đều hai phía)
   ===================================================================== */
function mountModals(){
  [["#modal","#mcard"],["#dlg","#dcard"]].forEach(([ms,cs])=>{const m=$(ms),c=$(cs);if(!m||!c)return;
    if(m.hidden){if(c.dataset.rsz){c.style.width=c.style.height=c.style.maxWidth=c.style.maxHeight="";delete c.dataset.rsz}return}
    if($(":scope>.rs-mc",c))return;const h=document.createElement("div");h.className="rs-mc";h.title="Kéo để phóng to / thu nhỏ hộp · bấm đúp để về cỡ cũ";h.setAttribute("aria-hidden","true");c.appendChild(h);
    h.addEventListener("pointerdown",e=>{if(!okBtn(e))return;const r=c.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;h.classList.add("drag");c.dataset.rsz="1";
      dragPtr(e,{cursor:"nwse-resize",move:ev=>{c.style.maxWidth="none";c.style.maxHeight="none";c.style.width=clamp(2*(ev.clientX-cx),320,innerWidth-16)+"px";c.style.height=clamp(2*(ev.clientY-cy),200,innerHeight-16)+"px"},end(){h.classList.remove("drag");nudge()}})});
    h.addEventListener("dblclick",()=>{c.style.width=c.style.height=c.style.maxWidth=c.style.maxHeight="";delete c.dataset.rsz;nudge()})});
}

/* =====================================================================
   1e. WIDGET NỔI — kéo góc để đổi cỡ (lưu theo từng widget)
   ===================================================================== */
function decorateWidgets(){
  $$("#widgets>.wdg[data-w]").forEach(el=>{const k=el.dataset.w;const st=D.widgets[k];if(!st)return;
    if(st.ww&&el.style.width!==st.ww+"px")el.style.width=st.ww+"px";
    if(st.wh){if(el.style.height!==st.wh+"px")el.style.height=st.wh+"px";el.classList.add("rs-sized")}else if(el.classList.contains("rs-sized")){el.classList.remove("rs-sized");el.style.height=""}
    if($(":scope>.rs-wc",el))return;const h=document.createElement("div");h.className="rs-wc";h.title="Kéo để đổi cỡ widget · bấm đúp để về mặc định";h.setAttribute("aria-hidden","true");el.appendChild(h);
    h.addEventListener("pointerdown",e=>{if(!okBtn(e))return;const r=el.getBoundingClientRect();const x0=e.clientX,y0=e.clientY;h.classList.add("drag");
      dragPtr(e,{cursor:"nwse-resize",move:ev=>{st.ww=Math.round(clamp(r.width+ev.clientX-x0,170,Math.min(760,innerWidth-8)));st.wh=Math.round(clamp(r.height+ev.clientY-y0,90,Math.min(900,innerHeight-8)));el.style.width=st.ww+"px";el.style.height=st.wh+"px";el.classList.add("rs-sized")},
        end(){h.classList.remove("drag");saveDecor();nudge()}})});
    h.addEventListener("dblclick",()=>{delete st.ww;delete st.wh;el.style.width=el.style.height="";el.classList.remove("rs-sized");saveDecor();nudge()})});
}

/* ---------- theo dõi DOM: gắn tay nắm mỗi khi giao diện vẽ lại ---------- */
let _tick=0;const schedule=()=>{if(_tick)return;_tick=requestAnimationFrame(()=>{_tick=0;try{decorateBlocks();mountCols();mountFly();mountModals();decorateWidgets()}catch(e){console.warn(e)}})};
new MutationObserver(recs=>{for(const r of recs){const t=r.target;if(t.nodeType===1&&t.closest&&t.closest("#decor,.mp-frame"))continue;schedule();return}}).observe(document.body,{childList:true,subtree:true});
const mainEl=$("#main");
if(mainEl)new MutationObserver(recs=>{if(recs.some(r=>r.target.matches&&r.target.matches("#dgrid>.blk[data-bid]")))schedule()}).observe(mainEl,{attributes:true,subtree:true,attributeFilter:["style"]});
["#modal","#dlg"].forEach(s=>{const m=$(s);if(m)new MutationObserver(schedule).observe(m,{attributes:true,attributeFilter:["hidden"]})});
const _renderHome12=renderHome;renderHome=function(...a){const r=_renderHome12.apply(this,a);decorateBlocks();return r};
const _renderWidgets12=renderWidgets;renderWidgets=function(...a){const r=_renderWidgets12.apply(this,a);decorateWidgets();return r};
schedule();

/* =====================================================================
   2. NHẠC TỪ LINK
   ===================================================================== */
const AUDIO_EXT=/\.(mp3|m4a|mp4a|aac|ogg|oga|opus|wav|flac|weba|webm)$/i;
function parseMusic(raw){
  const s=String(raw||"").trim();if(!s)return null;
  if(/^(data|blob):/i.test(s))return {type:"audio",norm:s,file:true};
  let u;try{u=new URL(s)}catch(e){return null}
  if(!/^https?:$/.test(u.protocol))return null;
  const h=u.hostname.toLowerCase().replace(/^(www\.|m\.)/,"");const q=u.searchParams;
  if(h==="youtu.be"||h==="youtube.com"||h==="music.youtube.com"||h==="youtube-nocookie.com"){
    let id=h==="youtu.be"?u.pathname.slice(1).split("/")[0]:q.get("v");
    if(!id){const m=u.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]{6,})/);if(m)id=m[1]}
    const list=q.get("list");if(id&&!/^[\w-]{6,}$/.test(id))id=null;if(id==="videoseries")id=null;
    if(!id&&!list)return null;const t=q.get("t")||q.get("start");let start=0;if(t){const m=String(t).match(/(?:(\d+)h)?(?:(\d+)m)?(\d+)s?/);if(m)start=(+m[1]||0)*3600+(+m[2]||0)*60+(+m[3]||0)}
    return {type:"yt",id,list,start,norm:"https://www.youtube.com/watch?"+(id?"v="+id:"")+(list?(id?"&":"")+"list="+list:"")}}
  if(h==="soundcloud.com"||h==="on.soundcloud.com"||h==="api.soundcloud.com"){if(u.pathname.length<2)return null;return {type:"sc",norm:u.origin+u.pathname}}
  if(h==="open.spotify.com"||h==="play.spotify.com"){const m=u.pathname.match(/\/(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);if(!m)return null;return {type:"sp",kind:m[1],id:m[2],norm:`https://open.spotify.com/${m[1]}/${m[2]}`}}
  if(h==="music.apple.com"||h==="embed.music.apple.com"){if(!/\/(album|playlist|song|station|music-video)\//.test(u.pathname))return null;return {type:"am",norm:"https://music.apple.com"+u.pathname+u.search,embed:"https://embed.music.apple.com"+u.pathname+u.search}}
  if(h==="deezer.com"||h==="link.deezer.com"){const m=u.pathname.match(/\/(track|album|playlist|episode|show)\/(\d+)/);if(!m)return null;return {type:"dz",kind:m[1],id:m[2],norm:`https://www.deezer.com/${m[1]}/${m[2]}`}}
  if(h==="mixcloud.com"){const parts=u.pathname.split("/").filter(Boolean);if(parts.length<2)return null;return {type:"mc",norm:"https://www.mixcloud.com/"+parts.slice(0,2).join("/")+"/",feed:"/"+parts.slice(0,2).join("/")+"/"}}
  if(h==="vimeo.com"||h==="player.vimeo.com"){const m=u.pathname.match(/(\d{6,})/);if(!m)return null;return {type:"vm",id:m[1],norm:"https://vimeo.com/"+m[1]}}
  if(h==="drive.google.com"||h==="docs.google.com"){const m=u.pathname.match(/\/d\/([\w-]{10,})/);const id=m?m[1]:q.get("id");if(id)return {type:"audio",norm:`https://drive.google.com/uc?export=download&id=${id}`,host:"Google Drive"}}
  if(h==="dropbox.com"||h==="dl.dropboxusercontent.com"){q.delete("dl");q.set("raw","1");return {type:"audio",norm:u.toString(),host:"Dropbox"}}
  return {type:"audio",norm:u.toString(),guess:!AUDIO_EXT.test(u.pathname)};
}
const KIND_L={yt:"YouTube",sc:"SoundCloud",sp:"Spotify",am:"Apple Music",dz:"Deezer",mc:"Mixcloud",vm:"Vimeo",audio:"Link nhạc"};
const kindOf=tr=>{const i=parseMusic(tr.url);if(!i)return "Tệp";if(i.file)return "Tệp";return i.host||KIND_L[i.type]};
function defName(info){try{if(info.type==="am"){const ps=new URL(info.norm).pathname.split("/").filter(Boolean);return ("Apple Music · "+decodeURIComponent(ps[ps.length-2]||ps[1]||"").replace(/-/g," ")).slice(0,60)}if(info.type==="dz")return "Deezer · "+info.kind+" "+info.id;if(info.type==="mc")return ("Mixcloud · "+decodeURIComponent(info.feed.split("/").filter(Boolean).pop()||"").replace(/-/g," ")).slice(0,60);if(info.type==="vm")return "Vimeo · "+info.id}catch(e){}if(info.type==="yt")return info.id?"YouTube · "+info.id:"Danh sách YouTube";if(info.type==="sp")return "Spotify · "+info.kind;if(info.type==="sc")return decodeURIComponent(info.norm.split("/").filter(Boolean).slice(-1)[0]||"SoundCloud").replace(/-/g," ");
  try{const p=decodeURIComponent(new URL(info.norm).pathname.split("/").filter(Boolean).pop()||"");return (p.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").trim()||info.host||"Link nhạc").slice(0,60)}catch(e){return "Link nhạc"}}
async function jget(url){const ac=new AbortController();const t=setTimeout(()=>ac.abort(),6000);try{const r=await fetch(url,{signal:ac.signal});if(!r.ok)throw 0;return await r.json()}finally{clearTimeout(t)}}
async function fetchTitle(info){const enc=encodeURIComponent(info.norm);
  const tries={yt:[`https://www.youtube.com/oembed?format=json&url=${enc}`,`https://noembed.com/embed?url=${enc}`],sc:[`https://soundcloud.com/oembed?format=json&url=${enc}`,`https://noembed.com/embed?url=${enc}`],sp:[`https://open.spotify.com/oembed?url=${enc}`]}[info.type]||[];
  for(const u of tries){try{const j=await jget(u);if(j&&j.title)return String(j.title).slice(0,80)}catch(e){}}return null}

async function addMusicLinks(urls){
  const s=UI.snd;let last=null,first=null,added=0,bad=0;
  for(const raw of urls.slice(0,12)){const info=parseMusic(raw);if(!info||info.file){bad++;continue}
    let tr=s.tracks.find(t=>t.url===info.norm);
    if(!tr){tr={id:mkid("tr"),name:defName(info),url:info.norm};s.tracks.push(tr);added++;
      if(info.type!=="audio")fetchTitle(info).then(n=>{if(!n)return;tr.name=n;saveSnd();MP.render()})}
    last=tr;if(!first)first=tr}
  if(!last){toast("Không nhận ra link nhạc — dùng link YouTube, SoundCloud, Spotify hoặc link trực tiếp tới tệp .mp3/.m4a/.ogg",4200);return false}
  last=first;s.track=first.id;s.on=true;MP.paused=false;MP.col=false;local.set("mpCol",false);saveSnd();await SND.apply();
  toast(added>1?`Đã thêm ${added} bài vào danh sách phát`:"Đang phát: "+last.name);
  if(bad)setTimeout(()=>toast(`${bad} link không phải link nhạc nên được bỏ qua`),2400);
  return true}
window.addMusicLinks=addMusicLinks;

function curTrack(){const s=UI.snd;return s.track?s.tracks.find(t=>t.id===s.track)||null:null}
function nextTrack(d){const s=UI.snd;const L=s.tracks;if(!L.length)return;let i=L.findIndex(t=>t.id===s.track);const nt=L[(i+d+L.length)%L.length];
  if(nt.id===s.track){if(SND.audio&&SND.audio._id===nt.id){SND.audio.currentTime=0;SND.audio.play().catch(()=>{})}else if(EMB.type==="yt"){EMB.yt("seekTo",[0,true]);EMB.yt("playVideo")}else if(EMB.type==="sc"){EMB.post({method:"seekTo",value:0});EMB.post({method:"play"})}return}
  s.track=nt.id;MP.paused=false;saveSnd();SND.apply()}

/* ---------- trình phát nhúng (YouTube / SoundCloud / Spotify) ---------- */
const EMB={el:null,id:null,type:null,info:null,mode:null,
  src(i){const o=encodeURIComponent(location.origin);const loop=UI.snd.mode!=="seq";
    if(i.type==="yt"){let q=`enablejsapi=1&autoplay=1&playsinline=1&rel=0&modestbranding=1&origin=${o}`+(i.start?`&start=${i.start}`:"");
      /* tài khoản YouTube Premium → youtube.com (nhận phiên Premium của trình duyệt); không Premium → YouTube thường (nocookie) */
      window.__ytInfo={};const H=window.SOHOC&&SOHOC.yt&&SOHOC.yt.premium&&SOHOC.yt.premium()?"https://www.youtube.com":"https://www.youtube-nocookie.com";
      if(i.list)return `${H}/embed/${i.id||"videoseries"}?list=${encodeURIComponent(i.list)}&${q}${loop&&!i.id?"&loop=1":""}`;
      return `${H}/embed/${i.id}?${q}${loop?`&loop=1&playlist=${i.id}`:""}`}
    if(i.type==="sc")return `https://w.soundcloud.com/player/?url=${encodeURIComponent(i.norm)}&auto_play=true&hide_related=true&show_comments=false&show_reposts=false&show_teaser=false&visual=false&color=%23a98bff`;
    if(i.type==="sp")return `https://open.spotify.com/embed/${i.kind}/${i.id}?utm_source=generator`;
    if(i.type==="am")return i.embed;
    if(i.type==="dz")return `https://widget.deezer.com/widget/auto/${i.kind}/${i.id}?autoplay=true&tracklist=${i.kind==="track"?"false":"true"}`;
    if(i.type==="mc")return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed=${encodeURIComponent(i.feed)}`;
    if(i.type==="vm")return `https://player.vimeo.com/video/${i.id}?autoplay=1&dnt=1`;
    return "about:blank"},
  show(tr,info){const host=MP.ensure().querySelector("#mpFrame");
    if(this.id!==tr.id||!this.el||this.mode!==UI.snd.mode){this.stop();this.id=tr.id;this.type=info.type;this.info=info;this.mode=UI.snd.mode;MP.playing=false;
      const f=document.createElement("iframe");f.allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; fullscreen";f.referrerPolicy="strict-origin-when-cross-origin";f.title="Trình phát "+(KIND_L[info.type]||"nhạc");
      f.addEventListener("load",()=>this.onload());f.src=this.src(info);host.className="mp-frame "+info.type;host.appendChild(f);this.el=f}
    else if(MP.paused)this.pause();else this.play()},
  post(m){try{this.el&&this.el.contentWindow&&this.el.contentWindow.postMessage(typeof m==="string"?m:JSON.stringify(m),"*")}catch(e){}},
  yt(func,args){this.post({event:"command",func,args:args||[]})},
  onload(){if(this.type==="yt"){const hi=()=>this.post({event:"listening",id:"sohoc",channel:"widget"});hi();setTimeout(hi,600);setTimeout(()=>{this.vol();if(MP.paused||!UI.snd.on)this.pause()},700)}
    if(this.type==="sc"){["finish","play","pause"].forEach(v=>this.post({method:"addEventListener",value:v}));setTimeout(()=>{this.vol();if(MP.paused||!UI.snd.on)this.pause()},500)}},
  play(){if(this.type==="yt")this.yt("playVideo");else if(this.type==="sc")this.post({method:"play"})},
  pause(){if(this.type==="yt")this.yt("pauseVideo");else if(this.type==="sc")this.post({method:"pause"})},
  vol(){const v=Math.round(clamp(UI.snd.vol,0,1)*100*(SND._ducked?.35:1));if(this.type==="yt")this.yt("setVolume",[v]);else if(this.type==="sc")this.post({method:"setVolume",value:v})},
  stop(){if(this.el){try{this.el.src="about:blank"}catch(e){}this.el.remove()}this.el=null;this.id=null;this.type=null;this.info=null;MP.playing=false;const h=$("#mpFrame");if(h){h.innerHTML="";h.className="mp-frame"}}};
addEventListener("message",e=>{if(!EMB.el||e.source!==EMB.el.contentWindow)return;let d=e.data;if(typeof d==="string"){try{d=JSON.parse(d)}catch(_){return}}if(!d)return;
  if(EMB.type==="yt"&&d.info&&typeof d.info==="object"){window.__ytInfo=Object.assign(window.__ytInfo||{},d.info);try{dispatchEvent(new CustomEvent("sohoc:yt"))}catch(_){}}
  if(EMB.type==="yt"&&d.info&&typeof d.info.playerState==="number"){const ps=d.info.playerState;const was=MP.playing;MP.playing=ps===1||ps===3;
    if(ps===0&&UI.snd.mode==="seq"&&!(EMB.info&&EMB.info.list))nextTrack(1);if(was!==MP.playing)MP.render()}
  if(EMB.type==="sc"&&d.method){if(d.method==="finish"){if(UI.snd.mode==="seq")nextTrack(1);else{EMB.post({method:"seekTo",value:0});EMB.post({method:"play"})}}
    if(d.method==="play"){MP.playing=true;MP.render()}if(d.method==="pause"){MP.playing=false;MP.render()}}});
setInterval(()=>{if(!EMB.el)return;let sp=false;try{sp=speechSynthesis.speaking}catch(e){}if(sp!==EMB._duck){EMB._duck=sp;EMB.vol()}},600);

/* ---------- SND.apply: thêm nhạc nhúng + phát lần lượt ---------- */
SND.apply=async function(){
  const s=UI.snd;if(s.on&&!MP._lastOn)MP.paused=false;MP._lastOn=!!s.on;const tr=curTrack();const info=tr?(parseMusic(tr.url)||{type:"audio",norm:tr.url}):null;const emb=!!(info&&info.type!=="audio");
  if(!s.on){if(this.ctx)this.master.gain.setTargetAtTime(0,this.ctx.currentTime,.25);if(this.audio)this.audio.pause();EMB.pause();updSndBtn();MP.render();return}
  const c=this.init();
  if(c){if(c.state==="suspended"){try{await c.resume()}catch(e){}}
    if(c.state==="running"){this.master.gain.setTargetAtTime(s.vol*.9,c.currentTime,.3);
      let kind=s.kind==="scene"?(()=>{const b=bgSrc();const m=SCENE_SND[b.scene||"auto"];return b.img?"lofi":typeof m==="function"?m():m||"city"})():s.kind;
      if(tr)kind=s.music?kind:null;
      if(kind!==this.curKind){this.stopCur();if(kind){this.cur=this.build(kind);this.curKind=kind}}}
    else waitGesture()}
  if(tr&&!emb){EMB.stop();
    if(!this.audio||this.audio._id!==tr.id){if(this.audio){this.audio.pause();if(this.audio._obj)URL.revokeObjectURL(this.audio.src)}
      const a=new Audio();a._id=tr.id;a.preload="auto";
      if(/^https?:/i.test(info.norm)&&!/^https?:\/\/[^/]*claude\.(ai|com)/i.test(info.norm))a.src=info.norm;
      else{try{const r=await fetch(tr.url);if(!r.ok)throw 0;const b=await r.blob();a.src=URL.createObjectURL(b);a._obj=true}catch(e){a.src=tr.url}}
      a.addEventListener("ended",()=>{if(UI.snd.mode==="seq")nextTrack(1)});
      a.addEventListener("error",()=>{if(a._id!==UI.snd.track)return;toast(info.guess?"Link này không phải tệp nhạc phát trực tiếp — thử link .mp3 hoặc link YouTube/SoundCloud/Spotify":"Không phát được bài này (link hỏng hoặc trang nguồn chặn phát nhúng)",4500);MP.render()});
      ["play","pause","loadedmetadata"].forEach(ev=>a.addEventListener(ev,()=>MP.render()));a.addEventListener("timeupdate",()=>MP.tick());
      this.audio=a}
    this.audio.loop=s.mode!=="seq";this.audio.volume=Math.min(1,s.vol*(this._ducked?.35:1));
    if(MP.paused)this.audio.pause();else this.audio.play().catch(()=>waitGesture())}
  else{if(this.audio)this.audio.pause();if(emb)EMB.show(tr,info);else EMB.stop()}
  updSndBtn();MP.render()};

/* ---------- trình phát mini ---------- */
const fmtT=t=>{t=Math.max(0,Math.floor(t||0));return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")};
const MP={paused:false,playing:false,col:local.get("mpCol",false),pos:local.get("mpPos",null),
  ensure(){let p=$("#mplayer");if(p)return p;p=document.createElement("section");p.id="mplayer";p.hidden=true;p.setAttribute("aria-label","Trình phát nhạc");
    p.innerHTML=`<div class="mp-h" id="mpH" title="Kéo để di chuyển"><span class="mp-ic">${ic("music")}</span><div class="mp-ttl"><b id="mpT"></b><small id="mpS"></small></div><button id="mpCol" aria-label="Thu gọn / mở rộng" title="Thu gọn / mở rộng">${ic("chevd")}</button><button id="mpX" aria-label="Dừng nhạc của bạn" title="Dừng nhạc của bạn và đóng trình phát">${ic("close")}</button></div>
      <div class="mp-b" id="mpB"><div class="mp-frame" id="mpFrame"></div><div class="mp-note" id="mpNote" hidden></div><div class="mp-seek" id="mpSeek" hidden><span id="mpCur">0:00</span><input type="range" id="mpPos" min="0" max="1000" value="0" aria-label="Vị trí trong bài"><span id="mpDur">0:00</span></div></div>
      <div class="mp-ctl"><button id="mpPrev" aria-label="Bài trước" title="Bài trước">${ic("prev")}</button><button id="mpPlay" class="mp-main" aria-label="Phát / tạm dừng">${ic("play")}</button><button id="mpNext" aria-label="Bài tiếp" title="Bài tiếp">${ic("next")}</button><button id="mpMode" aria-label="Chế độ phát"></button><span class="mp-vol">${ic("vol")}<input type="range" id="mpVol" min="0" max="1" step=".05" aria-label="Âm lượng"></span><button id="mpList" aria-label="Danh sách phát và âm thanh nền" title="Danh sách phát, thêm link, âm thanh nền">${ic("list")}</button></div>
      <div class="mp-rs" id="mpRs" title="Kéo để đổi cỡ trình phát · bấm đúp để về mặc định" aria-hidden="true"></div>`;
    document.body.appendChild(p);this.bind(p);return p},
  bind(p){
    $("#mpPlay",p).onclick=()=>{const tr=curTrack();if(!tr)return;const i=parseMusic(tr.url)||{type:"audio"};
      if(["sp","am","dz","mc","vm"].includes(i.type)){toast(`Với ${KIND_L[i.type]}, bấm nút ▶ ngay trong khung trình phát`);return}
      const playing=this.isPlaying();this.paused=playing;
      if(i.type==="audio"&&SND.audio){if(playing)SND.audio.pause();else{if(!UI.snd.on){UI.snd.on=true;local.set("bgSnd",UI.snd)}SND.audio.play().catch(()=>{})}}
      else{if(playing)EMB.pause();else EMB.play();this.playing=!playing}
      this.render()};
    $("#mpPrev",p).onclick=()=>nextTrack(-1);$("#mpNext",p).onclick=()=>nextTrack(1);
    $("#mpMode",p).onclick=()=>{UI.snd.mode=UI.snd.mode==="seq"?"one":"seq";local.set("bgSnd",UI.snd);toast(UI.snd.mode==="seq"?"Hết bài sẽ phát bài tiếp theo":"Lặp lại bài đang phát");if(SND.audio)SND.audio.loop=UI.snd.mode!=="seq";if(EMB.type==="yt")SND.apply();this.render()};
    $("#mpVol",p).oninput=e=>{const s=UI.snd;s.vol=+e.target.value;if(SND.ctx&&s.on)SND.master.gain.setTargetAtTime(s.vol*.9,SND.ctx.currentTime,.1);if(SND.audio)SND.audio.volume=s.vol;EMB.vol();clearTimeout(p._vt);p._vt=setTimeout(saveSnd,300)};
    $("#mpPos",p).oninput=e=>{const a=SND.audio;if(a&&isFinite(a.duration))a.currentTime=a.duration*(+e.target.value/1000)};
    $("#mpList",p).onclick=e=>{e.stopPropagation();sndPopover(e.currentTarget)};
    $("#mpCol",p).onclick=()=>{this.col=!this.col;local.set("mpCol",this.col);this.render()};
    $("#mpX",p).onclick=()=>{UI.snd.track=null;this.paused=false;saveSnd();SND.apply();toast("Đã dừng nhạc của bạn — danh sách vẫn được giữ trong nút loa")};
    const H=$("#mpH",p);
    H.addEventListener("pointerdown",e=>{if(e.target.closest("button")||!okBtn(e)||innerWidth<=720)return;const r=p.getBoundingClientRect();const ox=e.clientX-r.left,oy=e.clientY-r.top;
      dragPtr(e,{cursor:"grabbing",move:ev=>{const pos=this.pos=Object.assign(this.pos||{},{x:clamp(ev.clientX-ox,0,innerWidth-120),y:clamp(ev.clientY-oy,0,innerHeight-50)});this.place()},end:()=>local.set("mpPos",this.pos)})});
    H.addEventListener("dblclick",e=>{if(e.target.closest("button"))return;this.col=!this.col;local.set("mpCol",this.col);this.render()});
    const R=$("#mpRs",p);
    R.addEventListener("pointerdown",e=>{if(!okBtn(e))return;const r=p.getBoundingClientRect();const fr=$("#mpFrame",p);const fh0=fr.getBoundingClientRect().height;const x0=e.clientX,y0=e.clientY;
      dragPtr(e,{cursor:"nwse-resize",move:ev=>{const pos=this.pos=Object.assign(this.pos||{},{});pos.w=Math.round(clamp(r.width+ev.clientX-x0,250,Math.min(900,innerWidth-16)));if(fr.childElementCount)pos.fh=Math.round(clamp(fh0+ev.clientY-y0,80,Math.min(720,innerHeight-160)));this.place()},end:()=>local.set("mpPos",this.pos)})});
    R.addEventListener("dblclick",()=>{if(this.pos){delete this.pos.w;delete this.pos.fh}local.set("mpPos",this.pos);this.place()});
    addEventListener("resize",()=>this.place())},
  isPlaying(){const tr=curTrack();if(!tr||!UI.snd.on)return false;const i=parseMusic(tr.url)||{type:"audio"};if(i.type==="audio")return !!(SND.audio&&SND.audio._id===tr.id&&!SND.audio.paused);return this.paused?false:this.playing},
  place(){const p=$("#mplayer");if(!p)return;const pos=this.pos||{};const fr=$("#mpFrame",p);const t=EMB.type;
    p.style.width=pos.w?pos.w+"px":"";
    const def=t==="yt"?Math.round(((pos.w||320)-2)*9/16):t==="sc"?166:t==="sp"?(EMB.info&&EMB.info.kind==="track"?152:352):t==="am"?(/[?&]i=/.test(EMB.info&&EMB.info.embed||"")?175:450):t==="dz"?(EMB.info&&EMB.info.kind==="track"?150:300):t==="mc"?120:t==="vm"?Math.round(((pos.w||320)-2)*9/16):0;
    fr.style.height=t?(pos.fh||def)+"px":"";
    if(innerWidth>720&&pos.x!=null){const r=p.getBoundingClientRect();p.style.left=clamp(pos.x,0,Math.max(0,innerWidth-r.width))+"px";p.style.top=clamp(pos.y,0,Math.max(0,innerHeight-Math.min(r.height,60)))+"px";p.style.bottom="auto"}
    else{p.style.left=p.style.top=p.style.bottom=""}},
  render(){const s=UI.snd;const tr=curTrack();const p=this.ensure();const show=!!(s.on&&tr);const wasHidden=p.hidden;p.hidden=!show;if(!show)return;
    const i=parseMusic(tr.url)||{type:"audio"};const n=s.tracks.indexOf(tr)+1;
    $("#mpT",p).textContent=tr.name;$("#mpT",p).title=tr.name;$("#mpS",p).textContent=`${kindOf(tr)} · bài ${n}/${s.tracks.length}${s.music?" · kèm âm thanh nền":""}`;
    const pl=this.isPlaying();const b=$("#mpPlay",p);b.innerHTML=ic(pl?"pause":"play");b.title=pl?"Tạm dừng":"Phát";b.style.visibility=["sp","am","dz","mc","vm"].includes(i.type)?"hidden":"";
    const one=s.tracks.length<2;$("#mpPrev",p).disabled=one;$("#mpNext",p).disabled=one;
    const m=$("#mpMode",p);const seq=s.mode==="seq";m.innerHTML=ic(seq?"seq":"rep1");m.title=seq?"Đang phát lần lượt — bấm để lặp 1 bài":"Đang lặp 1 bài — bấm để phát lần lượt";m.setAttribute("aria-pressed",seq);
    const v=$("#mpVol",p);if(document.activeElement!==v)v.value=s.vol;
    $("#mpSeek",p).hidden=i.type!=="audio";
    const note=$("#mpNote",p);const msg=i.type==="sp"?"Spotify chỉ cho phát bằng nút ▶ trong khung (chưa đăng nhập Spotify thì chỉ nghe được 30 giây).":["am","dz"].includes(i.type)?`${KIND_L[i.type]}: bấm ▶ trong khung; chưa đăng nhập thì chỉ nghe được đoạn ngắn.`:["mc","vm"].includes(i.type)?`${KIND_L[i.type]}: bấm ▶ trong khung để phát.`:(i.type!=="audio"&&!pl&&!this.paused)?"Nếu nhạc chưa chạy, bấm ▶ một lần — trình duyệt cần bạn bấm trước khi phát.":"";
    note.hidden=!msg;note.textContent=msg;
    p.classList.toggle("col",!!this.col);this.place();this.tick();
    if(wasHidden&&!RM())p.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"none"}],{duration:220,easing:"ease-out"})},
  tick(){const a=SND.audio;const p=$("#mplayer");if(!p||p.hidden||!a)return;const d=a.duration;$("#mpCur",p).textContent=fmtT(a.currentTime);$("#mpDur",p).textContent=isFinite(d)?fmtT(d):"--:--";const r=$("#mpPos",p);if(document.activeElement!==r)r.value=isFinite(d)&&d>0?Math.round(a.currentTime/d*1000):0}};
window.SOHOC_MP=MP;window.SOHOC_EMB=EMB;
UI.snd.mode=UI.snd.mode==="seq"?"seq":"one";

/* ---------- kéo thả link/tệp nhạc ---------- */
const ZONES="#mdrop,#tSnd,.sndpop,#mplayer";
function isMusicDrag(dt){if(!dt)return false;const t=[...(dt.types||[])];if(t.includes("text/uri-list"))return true;
  if(t.includes("Files")){const it=[...(dt.items||[])];return it.some(i=>i.kind==="file"&&/^audio\//.test(i.type))}return false}
function dropEl(){let d=$("#mdrop");if(d)return d;d=document.createElement("div");d.id="mdrop";d.hidden=true;d.setAttribute("role","status");
  d.innerHTML=`${ic("music")}<div>Thả vào đây để phát nhạc<small>Link YouTube, SoundCloud, Spotify, .mp3… hoặc tệp nhạc</small></div>`;document.body.appendChild(d);return d}
let dropT=0;function showDrop(){const d=dropEl();if(d.hidden){d.hidden=false;const sb=$("#tSnd");if(sb){const r=sb.getBoundingClientRect();d.style.top=(r.bottom+10)+"px";d.style.right=Math.max(12,innerWidth-r.right-6)+"px"}$$(".snd-btn").forEach(b=>b.classList.add("drop-hint"))}clearTimeout(dropT);dropT=setTimeout(hideDrop,450)}
function hideDrop(){clearTimeout(dropT);const d=$("#mdrop");if(d){d.hidden=true;d.classList.remove("over")}$$(".snd-btn").forEach(b=>b.classList.remove("drop-hint"))}
function linksFrom(dt){const out=[];const ul=dt.getData("text/uri-list");if(ul)ul.split(/\r?\n/).forEach(l=>{l=l.trim();if(l&&!l.startsWith("#"))out.push(l)});
  if(!out.length){const tx=dt.getData("text/plain")||"";(tx.match(/https?:\/\/[^\s<>"']+/g)||[]).forEach(l=>out.push(l))}return [...new Set(out)]}
async function handleMusicDrop(dt){const files=[...(dt.files||[])].filter(f=>/^audio\//.test(f.type)||AUDIO_EXT.test(f.name));
  if(files.length){await addTracks(files);MP.paused=false;MP.render();return}
  const links=linksFrom(dt);if(links.length)await addMusicLinks(links);else toast("Không thấy link nhạc trong thứ bạn vừa thả")}
document.addEventListener("dragover",e=>{if(!isMusicDrag(e.dataTransfer))return;showDrop();const z=e.target.closest&&e.target.closest(ZONES);const d=$("#mdrop");if(d)d.classList.toggle("over",!!z);if(z){e.preventDefault();e.dataTransfer.dropEffect="copy"}},true);
document.addEventListener("drop",e=>{const z=e.target.closest&&e.target.closest(ZONES);const music=isMusicDrag(e.dataTransfer);hideDrop();if(!z||!music)return;e.preventDefault();e.stopPropagation();handleMusicDrop(e.dataTransfer)},true);
document.addEventListener("dragend",hideDrop,true);
/* dán link nhạc (Ctrl+V) khi không đang gõ chữ: chỉ nhận link nhạc rõ ràng */
document.addEventListener("paste",e=>{const a=document.activeElement;if(a&&(/INPUT|TEXTAREA|SELECT/.test(a.tagName)||a.isContentEditable))return;const tx=(e.clipboardData&&e.clipboardData.getData("text"))||"";const m=tx.trim().match(/^https?:\/\/\S+$/);if(!m)return;const i=parseMusic(m[0]);if(!i||(i.type==="audio"&&i.guess))return;e.preventDefault();addMusicLinks([m[0]])});

/* ---------- bảng Âm thanh nền: thêm ô link + chế độ phát ---------- */
const _sndPopover12=sndPopover;
sndPopover=function(anchor){_sndPopover12(anchor);const m=$$(".popmenu").pop();const box=m&&$(".sndpop",m);if(!box)return;const s=UI.snd;
  $$("[data-tr]",box).forEach(b=>{const t=s.tracks.find(x=>x.id===b.dataset.tr);if(t)b.insertAdjacentHTML("beforeend",`<span class="src-k">${esc(kindOf(t))}</span>`)});
  const trkField=$(".trk",box)&&$(".trk",box).closest(".field");
  const html=`<div class="field"><label for="sLink">Link nhạc</label><div class="sndlink"><input class="input" id="sLink" type="url" inputmode="url" placeholder="Dán link YouTube, Spotify, SoundCloud, Apple Music, Deezer, Mixcloud, .mp3…" autocomplete="off"><button class="btn primary" id="sLinkGo">Phát</button></div><small class="muted" style="font-size:12px">Hoặc kéo link / tệp nhạc từ nơi khác thả vào nút loa hay vào bảng này.</small></div>
    ${s.tracks.length?`<div class="field"><span>Khi hết bài</span><div class="seg mode"><button data-pmode="one" aria-pressed="${s.mode!=="seq"}">Lặp lại bài</button><button data-pmode="seq" aria-pressed="${s.mode==="seq"}">Phát bài tiếp</button></div></div>`:""}`;
  if(trkField)trkField.insertAdjacentHTML("afterend",html);else box.insertAdjacentHTML("beforeend",html);
  const inp=$("#sLink",box);const go=async()=>{const v=inp.value.trim();if(!v){inp.focus();return}if(await addMusicLinks(v.split(/\s+/))){closePop();sndPopover(anchor)}};
  $("#sLinkGo",box).onclick=go;inp.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();go()}};
  $$("[data-pmode]",box).forEach(b=>b.onclick=()=>{s.mode=b.dataset.pmode;local.set("bgSnd",s);$$("[data-pmode]",box).forEach(x=>x.setAttribute("aria-pressed",x===b));if(SND.audio)SND.audio.loop=s.mode!=="seq";if(EMB.type==="yt")SND.apply();MP.render()});
  {const r=anchor.getBoundingClientRect(),w=m.offsetWidth,h=m.offsetHeight;m.style.left=Math.max(8,Math.min(innerWidth-w-8,r.right-w))+"px";
    let top=r.bottom+6;if(top+h>innerHeight-8)top=Math.max(8,r.top-h-6);m.style.top=Math.max(8,Math.min(innerHeight-h-8,top))+"px";if(h>innerHeight-16){m.style.maxHeight=(innerHeight-16)+"px";m.style.overflow="auto"}}
};
const _updSndBtn12=updSndBtn;updSndBtn=function(){_updSndBtn12();$$("[data-snd]").forEach(b=>{b.title+=" · kéo thả link nhạc vào đây để phát"})};
setTimeout(()=>{if(UI.snd.on&&curTrack())SND.apply();else MP.render()},400);

/* =====================================================================
   3. ỨNG DỤNG (PWA)
   ===================================================================== */
const standalone=()=>{try{return matchMedia("(display-mode: standalone)").matches||matchMedia("(display-mode: minimal-ui)").matches||matchMedia("(display-mode: window-controls-overlay)").matches||navigator.standalone===true}catch(e){return false}};
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
let bip=null;
addEventListener("beforeinstallprompt",e=>{e.preventDefault();bip=e;addInstallBtn()});
addEventListener("appinstalled",()=>{bip=null;const b=$("#tInstall");if(b)b.remove();toast("Đã cài Sổ Học — mở từ màn hình chính hoặc menu Start",4000)});
function addInstallBtn(){const t=$("#top");if(!t||standalone()||$("#tInstall",t))return;if(!bip&&!isIOS)return;
  const b=document.createElement("button");b.className="ghost install-btn";b.id="tInstall";b.innerHTML=`${ic("inst")}<span class="hide-sm">Cài ứng dụng</span>`;b.title="Cài Sổ Học như một ứng dụng: có biểu tượng riêng, mở cửa sổ riêng, dùng được khi mất mạng";
  t.insertBefore(b,$("#tSnd",t)||null);b.onclick=installApp}
async function installApp(){
  if(bip){const p=bip;bip=null;try{p.prompt();const r=await p.userChoice;if(r&&r.outcome!=="accepted")bip=p}catch(e){}const b=$("#tInstall");if(b&&!bip)b.remove();return}
  if(isIOS)toast("Trên iPhone/iPad: mở trang bằng Safari → bấm nút Chia sẻ → “Thêm vào MH chính”.",7000)}
const _renderTop12=renderTop;renderTop=function(...a){const r=_renderTop12.apply(this,a);addInstallBtn();return r};
addInstallBtn();
if(standalone())document.body.classList.add("is-app");
try{matchMedia("(display-mode: standalone)").addEventListener("change",ev=>{document.body.classList.toggle("is-app",ev.matches);if(ev.matches){const b=$("#tInstall");if(b)b.remove()}})}catch(e){}

/* số bài tập cần làm hiện trên biểu tượng ứng dụng (Windows/macOS/Android có hỗ trợ) */
function badge(){if(!("setAppBadge" in navigator)||!standalone())return;const n=(UI.tasks||[]).filter(t=>t.status!=="done").length;try{n?navigator.setAppBadge(n):navigator.clearAppBadge()}catch(e){}}
setTimeout(badge,4000);setInterval(badge,30000);

/* lối tắt của ứng dụng (?a=new|cal|music) và chia sẻ link vào ứng dụng (?url=…) */
(function(){const q=new URLSearchParams(location.search);const a=q.get("a");const shared=[q.get("url"),q.get("text"),q.get("title")].filter(Boolean).join(" ");if(!a&&!shared)return;
  const go=()=>{try{history.replaceState(null,"",location.pathname+location.hash)}catch(e){}
    try{if(a==="new")newLessonDialog();else if(a==="cal")goCal();else if(a==="music"){const b=$("#tSnd");if(b)sndPopover(b)}}catch(e){console.warn(e)}
    const m=shared.match(/https?:\/\/[^\s<>"']+/);if(m){const i=parseMusic(m[0]);if(i&&!(i.type==="audio"&&i.guess))addMusicLinks([m[0]]);else toast("Đã nhận link — dán vào ô Thêm nguồn để đưa vào bài học",4000)}};
  let n=0;const w=setInterval(()=>{n++;if((typeof UI!=="undefined"&&UI.view&&$("#main .dash,#main .calpage,#main .nb3"))||n>48){clearInterval(w);setTimeout(go,350)}},250)})();
})();
