/* Sổ Học Điện Tử — ứng dụng máy tính (Electron)
   - Mở trang GitHub Pages của bạn (địa chỉ trong site.json, do GitHub Actions tự ghi) → luôn là bản mới nhất.
   - Mất mạng: dùng bản đi kèm qua http://localhost:47823.
   - Gemini Notebook (NotebookLM) gắn NGAY BÊN PHẢI cửa sổ: đăng nhập Gmail một lần (được nhớ), dùng thẳng AI của
     Gemini Notebook (hỏi đáp, tổng quan âm thanh, thẻ ghi nhớ…) cạnh bài học; trang Sổ Học điều khiển qua window.sohocDesk. */
const {app,BaseWindow,WebContentsView,shell,Menu,session,ipcMain,clipboard}=require("electron");
const http=require("http"),fs=require("fs"),path=require("path");
const PORT=47823,ROOT=path.join(__dirname,"web"),LOCAL=`http://localhost:${PORT}/`;
let SITE="";try{SITE=String(JSON.parse(fs.readFileSync(path.join(__dirname,"site.json"),"utf8")).url||"")}catch(e){}
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json",".webmanifest":"application/manifest+json",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".ico":"image/x-icon",".gif":"image/gif",".webp":"image/webp",".woff2":"font/woff2",".mp3":"audio/mpeg"};
let server=null;
function serve(){if(server)return Promise.resolve();return new Promise(res=>{const s=http.createServer((req,rsp)=>{let p=decodeURIComponent((req.url||"/").split("?")[0].split("#")[0]);if(p.endsWith("/"))p+="index.html";
    const f=path.normalize(path.join(ROOT,p));if(!f.startsWith(ROOT)){rsp.writeHead(403);return rsp.end()}
    fs.readFile(f,(e,d)=>{if(e){rsp.writeHead(404);return rsp.end("Not found")}rsp.writeHead(200,{"Content-Type":MIME[path.extname(f).toLowerCase()]||"application/octet-stream","Cache-Control":"no-cache"});rsp.end(d)})});
  s.on("error",()=>res());s.listen(PORT,"127.0.0.1",()=>{server=s;res()})})}
if(!app.requestSingleInstanceLock())app.quit();

/* trình duyệt thật (Chrome) — Google chặn đăng nhập trong trình duyệt nhúng nếu thấy chữ “Electron” */
const CHROME_UA=()=>`Mozilla/5.0 (${process.platform==="darwin"?"Macintosh; Intel Mac OS X 10_15_7":process.platform==="win32"?"Windows NT 10.0; Win64; x64":"X11; Linux x86_64"}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`;
const GNB_HOME="https://notebook.google.com/";
const isGnb=u=>/^https:\/\/(notebook|notebooklm)\.google\.com\//.test(u);
const isGoogleAuth=u=>/^https:\/\/(accounts\.google\.com|accounts\.youtube\.com|myaccount\.google\.com|www\.google\.com\/(accounts|recaptcha)|ogs\.google\.com|gds\.google\.com)/.test(u);

let win=null,main=null,gnb=null,gnbOpen=false,gnbFrac=0.42;
const ours=u=>u.startsWith(LOCAL)||(SITE&&u.startsWith(SITE));
const isAuth=u=>/^https:\/\/(accounts\.google\.com|accounts\.spotify\.com)\//.test(u);
async function openLocal(){await serve();main.webContents.loadURL(LOCAL)}
function layout(){if(!win)return;const {width:W,height:H}=win.getContentBounds();const gw=gnbOpen?Math.round(Math.max(360,Math.min(W-560,W*gnbFrac))):0;
  main.setBounds({x:0,y:0,width:W-gw,height:H});if(gnb)gnb.setBounds(gnbOpen?{x:W-gw,y:0,width:gw,height:H}:{x:W,y:0,width:0,height:H});
  try{main.webContents.send("gnb:state",{open:gnbOpen,frac:gnbFrac,url:gnb?gnb.webContents.getURL():""})}catch(e){}}
function ensureGnb(){if(gnb)return gnb;const ses=session.fromPartition("persist:gemini-notebook");ses.setUserAgent(CHROME_UA());
  ses.setPermissionRequestHandler((wc,perm,cb)=>cb(["clipboard-read","clipboard-sanitized-write","media","fullscreen","notifications"].includes(perm)));
  gnb=new WebContentsView({webPreferences:{session:ses,contextIsolation:true,sandbox:true,spellcheck:true}});gnb.setBackgroundColor("#ffffff");
  gnb.webContents.setUserAgent(CHROME_UA());
  gnb.webContents.setWindowOpenHandler(({url})=>{if(isGnb(url)||isGoogleAuth(url)){gnb.webContents.loadURL(url);return {action:"deny"}}shell.openExternal(url);return {action:"deny"}});
  gnb.webContents.on("will-navigate",(e,url)=>{if(!isGnb(url)&&!isGoogleAuth(url)&&!/^https:\/\/[^/]*\.google\.com\//.test(url)){e.preventDefault();shell.openExternal(url)}});
  gnb.webContents.on("did-navigate",layout);gnb.webContents.on("did-navigate-in-page",layout);
  /* tải về (âm thanh tổng quan…) → hỏi nơi lưu như trình duyệt */
  ses.on("will-download",()=>{});
  win.contentView.addChildView(gnb);gnb.webContents.loadURL(GNB_HOME);return gnb}
function create(){win=new BaseWindow({width:1440,height:880,minWidth:900,minHeight:600,title:"Sổ Học Điện Tử",icon:path.join(__dirname,"icon.png"),autoHideMenuBar:true,backgroundColor:"#16191c"});
  main=new WebContentsView({webPreferences:{contextIsolation:true,sandbox:true,spellcheck:false,preload:path.join(__dirname,"preload.js")}});win.contentView.addChildView(main);
  const wc=main.webContents;
  wc.setWindowOpenHandler(({url})=>{if(isGnb(url)){openGnb(url);return {action:"deny"}}if(isAuth(url))return {action:"allow",overrideBrowserWindowOptions:{width:520,height:680,autoHideMenuBar:true}};if(ours(url))return {action:"allow"};shell.openExternal(url);return {action:"deny"}});
  wc.on("will-navigate",(e,url)=>{if(isGnb(url)){e.preventDefault();openGnb(url);return}if(!ours(url)&&!isAuth(url)){e.preventDefault();shell.openExternal(url)}});
  wc.on("page-title-updated",(e,t)=>win.setTitle("Sổ Học Điện Tử"));
  let fellBack=false;wc.on("did-fail-load",(e,code,desc,url,isMain)=>{if(isMain&&!fellBack&&SITE&&url.startsWith(SITE)){fellBack=true;openLocal()}});
  win.on("resize",layout);win.on("closed",()=>{win=null;main=null;gnb=null});layout();
  if(SITE)wc.loadURL(SITE);else openLocal()}
function openGnb(url){ensureGnb();gnbOpen=true;if(url&&isGnb(url)&&gnb.webContents.getURL()!==url)gnb.webContents.loadURL(url);layout()}
/* ---- trang Sổ Học gọi qua preload ---- */
ipcMain.handle("gnb:open",(e,url)=>{openGnb(url);return true});
ipcMain.handle("gnb:close",()=>{gnbOpen=false;layout();return true});
ipcMain.handle("gnb:toggle",(e,url)=>{if(gnbOpen){gnbOpen=false;layout()}else openGnb(url);return gnbOpen});
ipcMain.handle("gnb:width",(e,f)=>{gnbFrac=Math.max(.28,Math.min(.7,+f||.42));layout();return gnbFrac});
ipcMain.handle("gnb:state",()=>({open:gnbOpen,frac:gnbFrac,url:gnb?gnb.webContents.getURL():""}));
ipcMain.handle("gnb:reload",()=>{if(gnb)gnb.webContents.reload();return true});
ipcMain.handle("gnb:back",()=>{if(gnb&&gnb.webContents.navigationHistory.canGoBack())gnb.webContents.navigationHistory.goBack();return true});
/* gửi câu hỏi vào ô chat của Gemini Notebook (thử điền & bấm gửi; không được thì để sẵn trong clipboard) */
ipcMain.handle("gnb:ask",async(e,text)=>{openGnb();clipboard.writeText(String(text||""));const js=`(async()=>{const T=${JSON.stringify(String(text||""))};
  const vis=el=>el&&el.offsetParent!==null;const box=[...document.querySelectorAll('textarea,[contenteditable="true"]')].filter(vis).sort((a,b)=>b.getBoundingClientRect().bottom-a.getBoundingClientRect().bottom)[0];
  if(!box)return "nobox";box.focus();
  if(box.tagName==="TEXTAREA"){const set=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set;set.call(box,T);box.dispatchEvent(new Event("input",{bubbles:true}))}else{document.execCommand("selectAll");document.execCommand("insertText",false,T)}
  await new Promise(r=>setTimeout(r,250));
  const near=[...document.querySelectorAll('button')].filter(b=>vis(b)&&!b.disabled&&/send|submit|gửi|query|hỏi/i.test((b.getAttribute('aria-label')||'')+' '+(b.type||'')+' '+(b.className||'')));
  const r=box.getBoundingClientRect();near.sort((a,b)=>Math.hypot(a.getBoundingClientRect().x-r.right,a.getBoundingClientRect().y-r.y)-Math.hypot(b.getBoundingClientRect().x-r.right,b.getBoundingClientRect().y-r.y));
  if(near[0]){near[0].click();return "sent"}box.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:true}));return "typed"})()`;
  for(let i=0;i<20;i++){try{if(gnb&&!gnb.webContents.isLoading()){const r=await gnb.webContents.executeJavaScript(js,true);if(r!=="nobox")return r}}catch(err){}await new Promise(r=>setTimeout(r,500))}return "clipboard"});
/* lấy đoạn đang bôi đen (hoặc câu trả lời cuối) trong Gemini Notebook để lưu vào Studio */
ipcMain.handle("gnb:grab",async()=>{if(!gnb)return "";try{return await gnb.webContents.executeJavaScript(`(()=>{const s=String(getSelection()||"").trim();if(s)return s;
  const c=[...document.querySelectorAll('[class*="message"],[class*="response"],chat-message,.to-user-container,mat-card')].filter(x=>x.offsetParent!==null&&x.innerText&&x.innerText.trim().length>40);
  return c.length?c[c.length-1].innerText.trim():""})()`,true)}catch(e){return ""}});
app.on("second-instance",()=>{if(win){if(win.isMinimized())win.restore();win.focus()}});
app.whenReady().then(()=>{Menu.setApplicationMenu(null);
  session.defaultSession.setPermissionRequestHandler((wc,perm,cb)=>cb(["notifications","media","clipboard-read","clipboard-sanitized-write","fullscreen"].includes(perm)));
  create();app.on("activate",()=>{if(BaseWindow.getAllWindows().length===0)create()})});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});
