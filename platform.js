/* Sổ Học Điện Tử — nền tảng chạy độc lập (không cần Claude.ai)
   Cung cấp cùng giao diện như runtime của artifact:
   db (IndexedDB trên máy), user, sample (Claude API bằng API key của bạn),
   mcp (Google Calendar + Gmail qua đăng nhập Google, nhiều tài khoản), assets, downloads, permissions. */
(function(){
"use strict";
const CFG=Object.assign({googleClientId:"",provider:"gemini",geminiModel:"gemini-3.8-flash",geminiQuickModel:"gemini-3.5-flash-lite",defaultModel:"claude-sonnet-5-5",quickModel:"claude-haiku-5-5"},window.SOHOC_CONFIG||{});
const LS={get(k,d){try{const v=localStorage.getItem("sohoc:"+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem("sohoc:"+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem("sohoc:"+k)}catch(e){}}};
const err=(code,msg,extra)=>Object.assign(new Error(msg||code),{code},extra||{});

/* ---------------- IndexedDB ---------------- */
let DBP=null;
function getDB(){return DBP||(DBP=new Promise((res,rej)=>{if(!("indexedDB" in window))return rej(new Error("no idb"));const r=indexedDB.open(DBN(),1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains("docs"))d.createObjectStore("docs");if(!d.objectStoreNames.contains("assets"))d.createObjectStore("assets")};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);r.onblocked=()=>rej(new Error("blocked"))}))}
function idbReq(store,mode,fn){return getDB().then(d=>new Promise((res,rej)=>{const t=d.transaction(store,mode);let out;const rq=fn(t.objectStore(store));if(rq)rq.onsuccess=()=>{out=rq.result};t.oncomplete=()=>res(out);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)}))}
const docs=new Map();let loaded=null,useLS=false;
function load(){return loaded||(loaded=(async()=>{
  try{await getDB();await new Promise((res,rej)=>{getDB().then(d=>{const rq=d.transaction("docs").objectStore("docs").openCursor();rq.onsuccess=()=>{const c=rq.result;if(c){docs.set(c.key,c.value);c.continue()}else res()};rq.onerror=()=>rej(rq.error)})})}
  catch(e){console.warn("IndexedDB không khả dụng, dùng localStorage",e);useLS=true;const raw=LS.get("docs"+PKS(),null);if(raw)Object.entries(raw).forEach(([k,v])=>docs.set(k,v))}
  try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}})())}
let _lsT=0;
function persist(id){if(useLS){clearTimeout(_lsT);_lsT=setTimeout(()=>LS.set("docs"+PKS(),Object.fromEntries(docs)),300);return}
  const v=docs.get(id);idbReq("docs","readwrite",s=>v===undefined?s.delete(id):s.put(v,id)).catch(e=>{console.warn(e);if(e&&e.name==="QuotaExceededError")alert("Bộ nhớ trình duyệt đã đầy. Hãy xóa bớt tài liệu hoặc sao lưu rồi dọn dữ liệu.")});
  try{bc&&bc.postMessage({id})}catch(e){}}
const subs=new Set();let emitT=0;const emit=()=>{if(emitT)return;emitT=setTimeout(()=>{emitT=0;subs.forEach(f=>f())},0)};
const clone=v=>v==null?v:(typeof structuredClone==="function"?structuredClone(v):JSON.parse(JSON.stringify(v)));
const clean=v=>JSON.parse(JSON.stringify(v));
/* đồng bộ giữa các thẻ trình duyệt đang mở cùng trang */
let bc=null;try{bc=new BroadcastChannel(DBN());bc.onmessage=async e=>{const id=e.data&&e.data.id;if(!id)return;try{const v=await idbReq("docs","readonly",s=>s.get(id));if(v===undefined)docs.delete(id);else docs.set(id,v);emit()}catch(_){}}}catch(e){}
function Q(filters){return{
  where(f,op,v){return Q([...filters,[f,op,v]])},
  _m(){const out=[];docs.forEach((d,id)=>{if(filters.every(([f,op,v])=>op==="=="?d[f]===v:op==="in"?v.includes(d[f]):true))out.push({id,exists:true,data:()=>clone(d)})});return out},
  async get(){await load();return{docs:this._m()}},
  onSnapshot(cb){let live=true;const run=()=>{if(!live)return;try{cb({docs:this._m()})}catch(e){console.error(e)}};subs.add(run);load().then(run);return()=>{live=false;subs.delete(run)}},
  doc(id){return{
    async set(v){await load();docs.set(id,clean(v));persist(id);emit()},
    async update(v){await load();if(!docs.has(id))throw err("not-found","Không tìm thấy dữ liệu "+id);docs.set(id,{...docs.get(id),...clean(v)});persist(id);emit()},
    async delete(){await load();docs.delete(id);persist(id);emit()},
    async get(){await load();const d=docs.get(id);return d?{exists:true,data:()=>clone(d)}:{exists:false,data:()=>undefined}}}}}}
const db={collection:()=>Q([])};

/* ---------------- tệp đính kèm (PDF, ảnh…) ---------------- */
const blobURL=new Map();
async function assetBlob(id){try{return await idbReq("assets","readonly",s=>s.get(id))}catch(e){return null}}
const assets={
  async upload(blob){const id="a"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);await idbReq("assets","readwrite",s=>s.put(blob,id));return{id,url:"asset:"+id}},
  async delete(id){await idbReq("assets","readwrite",s=>s.delete(id)).catch(()=>{});const u=blobURL.get(id);if(u){URL.revokeObjectURL(u);blobURL.delete(id)}}};
const _fetch=window.fetch.bind(window);
window.fetch=async function(u,o){const s=typeof u==="string"?u:u&&u.url;if(s&&s.startsWith("asset:")){const b=await assetBlob(s.slice(6));return b?new Response(b,{headers:{"content-type":b.type||"application/octet-stream"}}):new Response(null,{status:404})}return _fetch(u,o)};
document.addEventListener("click",async e=>{const a=e.target.closest&&e.target.closest('a[href^="asset:"]');if(!a)return;e.preventDefault();const id=a.getAttribute("href").slice(6);let u=blobURL.get(id);if(!u){const b=await assetBlob(id);if(!b)return;u=URL.createObjectURL(b);blobURL.set(id,u)}window.open(u,"_blank","noopener")},true);

/* ---------------- tải tệp về máy ---------------- */
const downloads={async save({filename,data}){const b=data instanceof Blob?data:new Blob([data]);const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=filename||"tep";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}};

/* ---------------- người dùng ---------------- */
let uid=LS.get("uid",null);if(!uid){uid="u"+Date.now().toString(36)+Math.random().toString(36).slice(2,8);LS.set("uid",uid)}
const user={async id(){return uid},async me(){return LS.get("me",{name:"",avatarUrl:""})}};

/* ---------------- Trợ lý AI: Google Gemini (AI Studio) hoặc Claude — API key của bạn, lưu trên máy này ---------------- */
const provider=()=>LS.get("provider",CFG.provider||"gemini")==="claude"?"claude":"gemini";
const apiKey=(pv=provider())=>pv==="claude"?LS.get("apiKey",""):LS.get("geminiKey","");
const model=(tier,pv=provider())=>pv==="claude"?(tier==="quick"?LS.get("quickModel",CFG.quickModel):LS.get("model",CFG.defaultModel)):(tier==="quick"?LS.get("gQuickModel",CFG.geminiQuickModel):LS.get("gModel",CFG.geminiModel));
async function blobToB64(b){let blob=b;try{const bmp=await createImageBitmap(b);const k=Math.min(1,1568/Math.max(bmp.width,bmp.height));if(k<1||b.size>3.5e6||!/png|jpeg|webp|gif/.test(b.type)){const c=document.createElement("canvas");c.width=Math.round(bmp.width*k);c.height=Math.round(bmp.height*k);c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);blob=await new Promise(r=>c.toBlob(r,"image/jpeg",.88))}}catch(e){}
  const data=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(",")[1]);r.onerror=rej;r.readAsDataURL(blob)});return{mime:blob.type||"image/jpeg",data}}
function toMessages(input){return typeof input==="string"?[{role:"user",content:input}]:input.map(t=>({role:t.role==="assistant"?"assistant":"user",content:String(t.content||"")}))}
async function sse(r,onEvent){const rd=r.body.getReader(),dec=new TextDecoder();let buf="";for(;;){const {value,done}=await rd.read();if(done)break;buf+=dec.decode(value,{stream:true}).replace(/\r/g,"");let i;
  while((i=buf.indexOf("\n\n"))>=0){const chunk=buf.slice(0,i);buf=buf.slice(i+2);const data=chunk.split("\n").filter(l=>l.startsWith("data:")).map(l=>l.slice(5).trim()).join("");if(!data||data==="[DONE]")continue;let ev;try{ev=JSON.parse(data)}catch(e){continue}onEvent(ev)}}
  if(buf.trim().startsWith("data:")){try{onEvent(JSON.parse(buf.trim().slice(5)))}catch(e){}}}
async function callClaude(input,o){
  const key=apiKey("claude");if(!key)throw err("not_granted","Chưa có API key Claude");
  const messages=toMessages(input);
  if(o.images&&o.images.length){const first=messages.findIndex(m=>m.role==="user");const blocks=[];for(const b of o.images.slice(0,4)){const x=await blobToB64(b);blocks.push({type:"image",source:{type:"base64",media_type:x.mime,data:x.data}})}messages[first]={role:"user",content:[...blocks,{type:"text",text:messages[first].content}]}}
  let r;try{r=await _fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal:o.signal,headers:{"content-type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:model(o.modelTier,"claude"),max_tokens:o.max||8000,messages,stream:true})})}
  catch(e){if(e&&e.name==="AbortError")throw err("cancelled","Đã dừng");throw err("network","Không kết nối được tới Claude API")}
  if(!r.ok){let j={};try{j=await r.json()}catch(e){}const m=(j.error&&j.error.message)||r.statusText||("HTTP "+r.status);
    const code=r.status===401||r.status===403?"bad_key":r.status===429||r.status===529?"rate_limited":r.status===413||/too long|too many tokens|exceed/i.test(m)?"prompt_too_large":/model/i.test(m)&&r.status===404?"bad_model":"api_error";throw err(code,m)}
  let text="",stop=null;
  try{await sse(r,ev=>{if(ev.type==="content_block_delta"&&ev.delta&&ev.delta.type==="text_delta"){text+=ev.delta.text;if(o.onText)o.onText({text})}else if(ev.type==="message_delta"&&ev.delta&&ev.delta.stop_reason)stop=ev.delta.stop_reason;else if(ev.type==="error")throw err(ev.error&&ev.error.type==="overloaded_error"?"rate_limited":"api_error",(ev.error&&ev.error.message)||"Lỗi luồng dữ liệu",{text})})}
  catch(e){if(e&&e.name==="AbortError")throw err("cancelled","Đã dừng",{text});throw e}
  return{text,truncated:stop==="max_tokens"}}
const GEM="https://generativelanguage.googleapis.com/v1beta";
function gemErr(status,j){const e=j&&j.error||{};const m=e.message||("HTTP "+status);const st=e.status||"";
  if(status===429||st==="RESOURCE_EXHAUSTED")return err("rate_limited",m);if(/API key not valid|API_KEY_INVALID|invalid api key/i.test(m)||status===401||st==="UNAUTHENTICATED")return err("bad_key",m);if(status===403||st==="PERMISSION_DENIED")return err("bad_key",m);
  if(status===404||/not found|is not supported/i.test(m))return err("bad_model",m);if(/token|too long|exceeds/i.test(m)&&status===400)return err("prompt_too_large",m);if(status===503||status===500||st==="UNAVAILABLE")return err("rate_limited",m);return err("api_error",m)}
async function callGemini(input,o){
  const key=apiKey("gemini");if(!key)throw err("not_granted","Chưa có API key Google AI Studio");
  const msgs=toMessages(input);const contents=[];msgs.forEach(m=>{const role=m.role==="assistant"?"model":"user";const last=contents[contents.length-1];if(last&&last.role===role)last.parts.push({text:m.content});else contents.push({role,parts:[{text:m.content}]})});
  if(contents.length&&contents[0].role!=="user")contents.unshift({role:"user",parts:[{text:"(bắt đầu)"}]});
  if(o.images&&o.images.length){const first=contents.findIndex(c=>c.role==="user");const parts=[];for(const b of o.images.slice(0,6)){const x=await blobToB64(b);parts.push({inline_data:{mime_type:x.mime,data:x.data}})}contents[first].parts=[...parts,...contents[first].parts]}
  const gc={maxOutputTokens:o.max||16384};if(o.json)gc.responseMimeType="application/json";
  const md=model(o.modelTier,"gemini");const sp=LS.get("speed","balanced");
  if(/gemini-(3|4)/i.test(md)&&!LS.get("noThink:"+md,false)&&(sp==="fast"||(sp==="balanced"&&(o.json||o.fast)))&&o.fast!==false)gc.thinkingConfig={thinkingLevel:"LOW"};
  let r;try{r=await _fetch(`${GEM}/models/${encodeURIComponent(model(o.modelTier,"gemini"))}:streamGenerateContent?alt=sse`,{method:"POST",signal:o.signal,headers:{"content-type":"application/json","x-goog-api-key":key},body:JSON.stringify({contents,generationConfig:gc})})}
  catch(e){if(e&&e.name==="AbortError")throw err("cancelled","Đã dừng");throw err("network","Không kết nối được tới Google AI Studio")}
  if(!r.ok){let j={};try{j=await r.json()}catch(e){}if(Array.isArray(j))j=j[0]||{};
    if(r.status===400&&gc.thinkingConfig&&/think/i.test(JSON.stringify(j))){LS.set("noThink:"+md,true);return callGemini(input,{...o,fast:false})}throw gemErr(r.status,j)}
  let text="",stop=null,blocked=null;
  try{await sse(r,ev=>{if(ev.error)throw gemErr(ev.error.code||500,ev);if(ev.promptFeedback&&ev.promptFeedback.blockReason)blocked=ev.promptFeedback.blockReason;const c=(ev.candidates||[])[0];if(!c)return;
      const parts=(c.content&&c.content.parts)||[];const add=parts.filter(p=>p.text&&!p.thought).map(p=>p.text).join("");if(add){text+=add;if(o.onText)o.onText({text})}if(c.finishReason&&c.finishReason!=="FINISH_REASON_UNSPECIFIED")stop=c.finishReason})}
  catch(e){if(e&&e.name==="AbortError")throw err("cancelled","Đã dừng",{text});throw e}
  if(!text&&(blocked||stop==="SAFETY"||stop==="PROHIBITED_CONTENT"))throw err("refused","Gemini từ chối trả lời nội dung này ("+(blocked||stop)+")");
  return{text,truncated:stop==="MAX_TOKENS"}}
async function listGeminiModels(key){const r=await _fetch(`${GEM}/models?pageSize=200`,{headers:{"x-goog-api-key":key||apiKey("gemini")}});const j=await r.json().catch(()=>({}));if(!r.ok)throw gemErr(r.status,j);
  return (j.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes("generateContent")&&/gemini/i.test(m.name)&&!/embedding|image|tts|live|audio|robotics/i.test(m.name)).map(m=>({id:m.name.replace(/^models\//,""),name:m.displayName||m.name}))}
const call=(input,o={})=>provider()==="claude"?callClaude(input,o):callGemini(input,o);
function parseJSON(t){let s=String(t||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/,"");try{return JSON.parse(s)}catch(e){}const a=s.indexOf("{"),b=s.lastIndexOf("}");if(a>=0&&b>a){try{return JSON.parse(s.slice(a,b+1))}catch(e){}}throw err("invalid_json","AI trả về sai định dạng")}
const sample=(input,o)=>call(input,o||{});
sample.json=async(prompt,o={})=>{const r=await call(prompt+"\n\nCHỈ trả lời bằng đúng một đối tượng JSON hợp lệ, không có chữ hay ``` nào khác.",{...o,json:true,max:provider()==="claude"?16000:32768});return parseJSON(r.text)};

/* ---------------- Google: nhiều tài khoản + Google Calendar + Gmail ----------------
   Mỗi tài khoản giữ token riêng (chỉ trên trình duyệt này). Dịch vụ được cấp quyền dần
   (đăng nhập trước, liên kết Calendar / Gmail khi cần). */
const GC="Google Calendar",GM="Gmail";
const SC={base:"openid email profile",cal:"https://www.googleapis.com/auth/calendar.events",calr:"https://www.googleapis.com/auth/calendar.calendarlist.readonly",mail:"https://www.googleapis.com/auth/gmail.readonly",yt:"https://www.googleapis.com/auth/youtube.readonly",send:"https://www.googleapis.com/auth/gmail.compose"};
const SVC_OF={YouTube:["yt"],[GC]:["cal","calr"],[GM]:["mail","send"]};
const clientId=()=>LS.get("googleClientId","")||CFG.googleClientId||"";
let accts=LS.get("gaccts",null),act=LS.get("gActive",null);
if(!Array.isArray(accts)){accts=[];const ot=LS.get("gtok",null),me=LS.get("me",null);if(ot&&me&&me.name){accts.push({id:"old",name:me.name,email:"",pic:me.avatarUrl||"",svc:{cal:true},tok:ot});act="old"}LS.del("gtok")}
const cur=()=>act==="__guest"?null:(accts.find(a=>a.id===act)||accts[0]||null);
/* ---- HỒ SƠ DỮ LIỆU: mỗi tài khoản Google đăng nhập có kho dữ liệu riêng (sổ học, sticker, giao diện, cài đặt) ----
   Dữ liệu đã có trước đây thuộc về tài khoản đang đăng nhập lúc nâng cấp (hoặc khách). */
const profKey=()=>{const a=cur();return a?a.id:"guest"};
let OWN=LS.get("dataOwner",null);if(OWN==null){OWN=profKey();LS.set("dataOwner",OWN)}
const PK0=profKey();
function PKS(){return PK0===OWN?"":"~"+PK0}
function DBN(){return PK0===OWN?"sohoc":"sohoc~"+PK0}
window.SOHOC_LP=PK0===OWN?"":PK0+"~";
let _profT=0;function profCheck(){const k=profKey();if(k===PK0||_profT)return;const a=cur();
  window.dispatchEvent(new CustomEvent("sohoc:profile",{detail:{key:k,name:a?(a.email||a.name):"Khách"}}));
  try{sessionStorage.setItem("sohoc:profMsg",a?"Đang dùng dữ liệu của "+(a.email||a.name):"Đã đăng xuất — đang ở chế độ khách")}catch(e){}
  _profT=setTimeout(()=>location.reload(),900)}
const tokOk=a=>!!(a&&a.tok&&a.tok.exp>Date.now()+60000);
function saveA(){LS.set("gaccts",accts);const c=cur();act=act==="__guest"?"__guest":(c?c.id:null);LS.set("gActive",act);LS.set("me",c?{name:c.name||c.email||"",avatarUrl:c.pic||""}:{name:"",avatarUrl:""});window.dispatchEvent(new CustomEvent("sohoc:me"));profCheck()}
function loadGIS(){return window.google&&google.accounts&&google.accounts.oauth2?Promise.resolve():new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://accounts.google.com/gsi/client";s.async=true;s.onload=()=>res();s.onerror=()=>rej(err("network","Không tải được dịch vụ đăng nhập Google"));document.head.appendChild(s)})}
/* mở cửa sổ Google: add=true → chọn/thêm tài khoản khác; svc = dịch vụ muốn liên kết thêm */
async function auth({svc=[],add=false,acct=null}={}){
  const cid=clientId();if(!cid)throw err("no_client","Chưa cấu hình Google Client ID");await loadGIS();
  const a0=add?null:(acct||cur());const want=new Set(svc);if(a0&&a0.svc)Object.keys(a0.svc).forEach(k=>{if(a0.svc[k])want.add(k)});
  const scope=[SC.base,...[...want].map(k=>SC[k])].join(" ");
  return new Promise((res,rej)=>{const c=google.accounts.oauth2.initTokenClient({client_id:cid,scope,include_granted_scopes:true,...(a0&&a0.email?{hint:a0.email}:{}),
    callback:async r=>{if(r.error){rej(err(r.error==="access_denied"?"approval_required":"auth_error",r.error_description||r.error));return}
      let u={};try{u=await _fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer "+r.access_token}}).then(x=>x.json())}catch(e){}
      const id=u.sub||(a0&&a0.id)||("g"+Date.now());let a=accts.find(x=>x.id===id)||(a0&&a0.id==="old"?a0:null);
      if(!a){a={id,svc:{}};accts.push(a)}if(a.id!==id&&OWN===a.id){OWN=id;LS.set("dataOwner",OWN)}a.id=id;a.name=u.name||u.given_name||a.name||"";a.email=u.email||a.email||"";a.pic=u.picture||a.pic||"";
      const has=k=>{try{return google.accounts.oauth2.hasGrantedAllScopes(r,SC[k])}catch(e){return String(r.scope||"").includes(SC[k])}};
      a.svc={cal:has("cal"),calr:has("calr"),mail:has("mail"),send:has("send"),yt:has("yt")};a.tok={t:r.access_token,exp:Date.now()+(+r.expires_in||3600)*1000};
      act=a.id;saveA();const miss=svc.filter(k=>!a.svc[k]);if(miss.length){rej(err("approval_required","Bạn chưa tích ô cho phép "+miss.map(k=>({cal:"Google Calendar",calr:"xem danh sách lịch",yt:"xem YouTube",mail:"đọc Gmail",send:"soạn/gửi Gmail"})[k]).join(", ")));return}res(a)},
    error_callback:e=>rej(err(e&&e.type==="popup_closed"?"popup_closed":"auth_error",e&&e.message||"Đăng nhập Google bị hủy"))});
    c.requestAccessToken({prompt:add?"select_account consent":(a0&&a0.tok?"":"consent")})})}
async function getToken(interactive,svc){const a=cur();if(a&&tokOk(a)&&(!svc||svc.every(k=>a.svc&&a.svc[k])))return a.tok.t;if(!clientId())throw err("no_client","Chưa cấu hình Google Client ID");
  if(!interactive)throw err("needs_reauth","Cần đăng nhập Google lại");return (await auth({svc:svc||[]})).tok.t}
async function gapi(url,opt={}){const t=await getToken(false);const r=await _fetch(url,{...opt,headers:{...(opt.headers||{}),Authorization:"Bearer "+t,...(opt.body?{"content-type":"application/json"}:{})}});
  if(r.status===401){const a=cur();if(a){a.tok=null;saveA()}throw err("needs_reauth","Phiên Google hết hạn")}
  if(r.status===403){const j=await r.json().catch(()=>({}));const m=(j.error&&j.error.message)||"";throw err(/insufficient|scope/i.test(m)?"approval_required":"tool_error",/has not been used|disabled/i.test(m)?"Chưa bật API này trong Google Cloud Console (APIs & Services → Library).":m||"Không có quyền")}
  const j=await r.json().catch(()=>({}));if(!r.ok)throw err("tool_error",(j.error&&j.error.message)||("HTTP "+r.status));return j}
const iso=s=>{const d=new Date(s);return isNaN(d)?s:d.toISOString()};
/* ---- Gmail REST → cùng dạng kết quả với trình kết nối Gmail của Claude ---- */
const GMU="https://gmail.googleapis.com/gmail/v1/users/me/";
const b64d=s=>{try{const bin=atob(String(s).replace(/-/g,"+").replace(/_/g,"/"));return new TextDecoder().decode(Uint8Array.from(bin,c=>c.charCodeAt(0)))}catch(e){return ""}};
const b64e=s=>{const b=new TextEncoder().encode(s);let bin="";b.forEach(x=>bin+=String.fromCharCode(x));return btoa(bin).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};
const hdr=(m,n)=>{const h=((m.payload&&m.payload.headers)||[]).find(x=>x.name.toLowerCase()===n.toLowerCase());return h?h.value:""};
const addrs=v=>String(v||"").split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(x=>x.trim()).filter(Boolean);
function html2text(h){const d=new DOMParser().parseFromString(String(h),"text/html");d.querySelectorAll("script,style").forEach(x=>x.remove());d.querySelectorAll("br").forEach(x=>x.replaceWith("\n"));d.querySelectorAll("p,div,tr,li,h1,h2,h3").forEach(x=>x.append("\n"));return (d.body.textContent||"").replace(/\n{3,}/g,"\n\n").trim()}
function bodyOf(p){let txt="",html="";const atts=[];(function walk(x){if(!x)return;if(x.filename&&x.body&&(x.body.attachmentId||x.body.size)){atts.push({filename:x.filename,mimeType:x.mimeType,size:x.body.size});return}
  if(x.mimeType==="text/plain"&&x.body&&x.body.data&&!txt)txt=b64d(x.body.data);else if(x.mimeType==="text/html"&&x.body&&x.body.data&&!html)html=b64d(x.body.data);(x.parts||[]).forEach(walk)})(p);
  return {text:txt||(html?html2text(html):""),atts}}
function gmMsg(m,full){const o={id:m.id,threadId:m.threadId,subject:hdr(m,"Subject"),sender:hdr(m,"From"),toRecipients:addrs(hdr(m,"To")),ccRecipients:addrs(hdr(m,"Cc")),date:m.internalDate?new Date(+m.internalDate).toISOString():hdr(m,"Date"),snippet:b64dSafe(m.snippet),labelIds:m.labelIds||[],viewUrl:"https://mail.google.com/mail/#all/"+m.threadId};
  if(full){const b=bodyOf(m.payload);o.plaintextBody=b.text;o.attachments=b.atts}return o}
function b64dSafe(s){const t=document.createElement("textarea");t.innerHTML=String(s||"");return t.value}
function mime({to=[],cc=[],bcc=[],subject="",body=""}){const enc=s=>/[^\x20-\x7e]/.test(s)?"=?UTF-8?B?"+btoa(String.fromCharCode(...new TextEncoder().encode(s)))+"?=":s;
  const h=[to.length?"To: "+to.join(", "):"",cc.length?"Cc: "+cc.join(", "):"",bcc.length?"Bcc: "+bcc.join(", "):"","Subject: "+enc(subject),"MIME-Version: 1.0","Content-Type: text/plain; charset=UTF-8","Content-Transfer-Encoding: base64"].filter(Boolean);
  const bb=btoa(String.fromCharCode(...new TextEncoder().encode(body))).replace(/.{76}/g,"$&\r\n");return b64e(h.join("\r\n")+"\r\n\r\n"+bb)}
const gmail={
  async search_threads(a){const p=new URLSearchParams({maxResults:String(Math.min(50,a.pageSize||20))});if(a.query)p.set("q",a.query);if(a.pageToken)p.set("pageToken",a.pageToken);if(a.includeTrash)p.set("includeSpamTrash","true");
    const j=await gapi(GMU+"threads?"+p);const meta=a.view==="THREAD_VIEW_METADATA_ONLY";
    const threads=await Promise.all((j.threads||[]).map(async t=>{const q=new URLSearchParams({format:"metadata"});["Subject","From","To","Cc","Date"].forEach(h=>q.append("metadataHeaders",h));
      const d=await gapi(GMU+"threads/"+t.id+"?"+q);const ms=(d.messages||[]).map(m=>gmMsg(m,false));if(meta)ms.forEach(m=>{delete m.subject;delete m.snippet});return {id:t.id,messageCount:ms.length,viewUrl:"https://mail.google.com/mail/#all/"+t.id,messages:ms.slice(0,5)}}));
    return {threads,nextPageToken:j.nextPageToken,resultCountEstimate:String(j.resultSizeEstimate||threads.length)}},
  async get_thread(a){const d=await gapi(GMU+"threads/"+encodeURIComponent(a.threadId)+"?format=full");return {id:d.id,viewUrl:"https://mail.google.com/mail/#all/"+d.id,messages:(d.messages||[]).map(m=>gmMsg(m,a.messageFormat!=="MINIMAL"))}},
  async send_message(a){await getToken(false,["send"]).catch(()=>getToken(true,["send"]));const body={raw:mime(a)};if(a.replyThreadId)body.threadId=a.replyThreadId;return await gapi(GMU+"messages/send",{method:"POST",body:JSON.stringify(body)})},
  async create_draft(a){await getToken(false,["send"]).catch(()=>getToken(true,["send"]));const d=await gapi(GMU+"drafts",{method:"POST",body:JSON.stringify({message:{raw:mime(a)}})});return {id:d.id,threadId:d.message&&d.message.threadId,viewUrl:"https://mail.google.com/mail/#drafts"}}};
const mcp={
  async listTools(){const a=cur();if(!clientId()||!a)return{servers:[]};const st=tokOk(a)?"ok":"needs_reauth";const s=[];
    if(a.svc&&a.svc.cal)s.push({server:GC,tools:["list_events","create_event",...(a.svc.calr?["list_calendars"]:[])],authStatus:st});if(a.svc&&a.svc.mail)s.push({server:GM,tools:["search_threads","get_thread",...(a.svc.send?["create_draft","send_message"]:[])],authStatus:st});return{servers:s}},
  async describeTool(){return{}},
  async callTool(server,tool,a={}){const A=cur();
    if(server===GC){if(!A||!A.svc||!A.svc.cal)throw err("server_not_connected");
      const CAL=id=>"https://www.googleapis.com/calendar/v3/calendars/"+encodeURIComponent(id||"primary");
      if(tool==="list_calendars"){if(!A.svc.calr)throw err("approval_required","Chưa cấp quyền xem danh sách lịch");const p=new URLSearchParams({maxResults:String(Math.min(250,a.pageSize||100))});if(a.pageToken)p.set("pageToken",a.pageToken);
        const j=await gapi("https://www.googleapis.com/calendar/v3/users/me/calendarList?"+p);return{payload:{calendars:(j.items||[]).map(c=>({id:c.id,summary:c.summary,summaryOverride:c.summaryOverride,backgroundColor:c.backgroundColor,primary:!!c.primary,accessRole:c.accessRole,timeZone:c.timeZone})),nextPageToken:j.nextPageToken}}}
      if(tool==="list_events"){const p=new URLSearchParams({singleEvents:"true",orderBy:"startTime",maxResults:String(Math.min(250,a.pageSize||100))});if(a.startTime)p.set("timeMin",iso(a.startTime));if(a.endTime)p.set("timeMax",iso(a.endTime));
        const j=await gapi(CAL(a.calendarId)+"/events?"+p);return{payload:{events:j.items||[]}}}
      if(tool==="create_event"){const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;const body={summary:a.summary,description:a.description||"",start:{dateTime:iso(a.startTime),timeZone:tz},end:{dateTime:iso(a.endTime),timeZone:tz},reminders:{useDefault:a.useDefaultReminders!==false}};
        const j=await gapi(CAL(a.calendarId)+"/events",{method:"POST",body:JSON.stringify(body)});return{payload:j}}}
    if(server===GM){if(!A||!A.svc||!A.svc.mail)throw err("server_not_connected");if(gmail[tool])return{payload:await gmail[tool](a)}}
    if(server!==GC&&server!==GM)throw err("server_not_connected");
    throw err("tool_error","Công cụ không hỗ trợ: "+tool)}};
const permissions={async request(list){const svc=[];(list||[]).forEach(x=>{const s=String(x);if(s.startsWith("mcp:"))(SVC_OF[s.slice(4)]||[]).forEach(k=>svc.push(k))});if(svc.length){const a=cur();if(!(a&&tokOk(a)&&svc.every(k=>a.svc&&a.svc[k])))await auth({svc})}return true},async state(){return {}}};
const google_={accounts:()=>accts.map(a=>({id:a.id,name:a.name,email:a.email,pic:a.pic,svc:{...(a.svc||{})},active:a.id===(cur()&&cur().id),fresh:tokOk(a)})),
  signIn:()=>auth({}),addAccount:svc=>auth({add:true,svc:svc||[]}),link:k=>auth({svc:SVC_OF[k]||[k]}),
  unlink(k){const a=cur();if(!a)return;(SVC_OF[k]||[k]).forEach(s=>{if(a.svc)a.svc[s]=false});saveA()},
  switchTo(id){if(id==="__guest"){act="__guest";saveA();return}if(accts.some(a=>a.id===id)){act=id;saveA()}},
  remove(id){const a=accts.find(x=>x.id===id);if(!a)return;const wasCur=cur()===a;try{if(a.tok&&a.tok.t&&window.google&&google.accounts.oauth2)google.accounts.oauth2.revoke(a.tok.t,()=>{})}catch(e){}accts=accts.filter(x=>x!==a);if(wasCur)act="__guest";saveA()},
  signOutKeep(){act="__guest";saveA()},guest:()=>act==="__guest"||!cur(),profile:()=>({key:PK0,owner:OWN===PK0}),
  async reconnect(){return auth({})}};


/* ---- YouTube: tài khoản Google RIÊNG cho YouTube (có thể khác tài khoản đăng nhập Sổ Học) ---- */
const YTK="ytAcct"+PKS();let ytA=LS.get(YTK,null);
function ytAuth(sw){const cid=clientId();if(!cid)return Promise.reject(err("no_client","Chưa cấu hình Google Client ID"));return loadGIS().then(()=>new Promise((res,rej)=>{
  const c=google.accounts.oauth2.initTokenClient({client_id:cid,scope:SC.base+" "+SC.yt,...(!sw&&ytA&&ytA.email?{hint:ytA.email}:{}),
    callback:async r=>{if(r.error){rej(err(r.error==="access_denied"?"approval_required":"auth_error",r.error_description||r.error));return}
      let ok=true;try{ok=google.accounts.oauth2.hasGrantedAllScopes(r,SC.yt)}catch(e){}if(!ok){rej(err("approval_required","Bạn chưa tích ô cho phép xem tài khoản YouTube"));return}
      let u={};try{u=await _fetch("https://www.googleapis.com/oauth2/v3/userinfo",{headers:{Authorization:"Bearer "+r.access_token}}).then(x=>x.json())}catch(e){}
      let ch=null;try{const j=await _fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",{headers:{Authorization:"Bearer "+r.access_token}}).then(x=>x.json());const it=j.items&&j.items[0];if(it)ch={id:it.id,title:it.snippet.title,img:it.snippet.thumbnails&&(it.snippet.thumbnails.default||{}).url}}catch(e){}
      const same=ytA&&ytA.email&&ytA.email===u.email;ytA={prem:same?ytA.prem:undefined,name:u.name||"",email:u.email||"",pic:u.picture||"",ch,tok:{t:r.access_token,exp:Date.now()+(+r.expires_in||3600)*1000}};LS.set(YTK,ytA);res(ytA)},
    error_callback:e=>rej(err(e&&e.type==="popup_closed"?"popup_closed":"auth_error",e&&e.message||"Đã hủy"))});
  c.requestAccessToken({prompt:sw||!ytA?"select_account consent":""})}))}
const ytApi_={has:()=>!!ytA,premium:()=>!!(ytA&&ytA.prem),setPrem(v){if(ytA){ytA.prem=!!v;LS.set(YTK,ytA)}},acct:()=>ytA&&{prem:ytA.prem,name:ytA.name,email:ytA.email,pic:ytA.pic,ch:ytA.ch,fresh:!!(ytA.tok&&ytA.tok.exp>Date.now()+60000)},
  link:sw=>ytAuth(!!sw),logout(){try{if(ytA&&ytA.tok&&window.google&&google.accounts.oauth2)google.accounts.oauth2.revoke(ytA.tok.t,()=>{})}catch(e){}ytA=null;LS.del(YTK)},
  async api(path,q={}){if(!ytA)throw err("needs_reauth","Chưa kết nối YouTube");if(!(ytA.tok&&ytA.tok.exp>Date.now()+60000))throw err("needs_reauth","Phiên YouTube hết hạn — bấm “Kết nối lại”");
    const r=await _fetch("https://www.googleapis.com/youtube/v3/"+path+"?"+new URLSearchParams(q),{headers:{Authorization:"Bearer "+ytA.tok.t}});if(r.status===401){ytA.tok=null;LS.set(YTK,ytA);throw err("needs_reauth","Phiên YouTube hết hạn")}
    const j=await r.json().catch(()=>({}));if(!r.ok)throw err("tool_error",(j.error&&j.error.message)||("HTTP "+r.status));return j}};
/* ---------------- sao lưu / khôi phục / dọn dữ liệu ---------------- */
const b64=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(b)});
window.SOHOC={CFG,LS,pkey:k=>k+PKS(),getToken:()=>getToken(true),google:google_,yt:ytApi_,signOut(){const a=cur();if(a)google_.remove(a.id)},
  hasKey:()=>!!apiKey(),provider,model,listGeminiModels,clientId,
  async exportAll(){await load();const out={app:"so-hoc-dien-tu",v:1,exported:new Date().toISOString(),docs:Object.fromEntries(docs),assets:{}};
    try{const d=await getDB();await new Promise((res,rej)=>{const rq=d.transaction("assets").objectStore("assets").openCursor();const pend=[];rq.onsuccess=()=>{const c=rq.result;if(c){pend.push(b64(c.value).then(u=>{out.assets[c.key]=u}));c.continue()}else Promise.all(pend).then(res,rej)};rq.onerror=()=>rej(rq.error)})}catch(e){}
    return new Blob([JSON.stringify(out)],{type:"application/json"})},
  async importAll(file){const j=JSON.parse(await file.text());if(!j||j.app!=="so-hoc-dien-tu"||!j.docs)throw new Error("Tệp sao lưu không hợp lệ");await load();
    for(const [id,v] of Object.entries(j.docs)){docs.set(id,v);persist(id)}
    for(const [id,u] of Object.entries(j.assets||{})){const b=await (await _fetch(u)).blob();await idbReq("assets","readwrite",s=>s.put(b,id))}emit();return Object.keys(j.docs).length},
  async clearAll(){docs.clear();try{await idbReq("docs","readwrite",s=>s.clear());await idbReq("assets","readwrite",s=>s.clear())}catch(e){}LS.del("docs"+PKS());emit()},
  async usage(){try{const e=await navigator.storage.estimate();return e}catch(e){return null}}};

window.claude={use:async name=>({db,user,sample,mcp,assets,downloads,permissions})[name]||Promise.reject(err("unavailable"))};
load();
})();
