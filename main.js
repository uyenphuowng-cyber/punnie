/* Sổ Học Điện Tử — ứng dụng máy tính (Electron)
   - Mở trang GitHub Pages của bạn (địa chỉ trong site.json, do GitHub Actions tự ghi) → luôn là bản mới nhất,
     đăng nhập Google dùng chung "Authorized JavaScript origins" với trang web.
   - Mất mạng: dùng bản đi kèm qua http://localhost:47823 (cần thêm địa chỉ này vào origins nếu muốn đăng nhập khi offline). */
const {app,BrowserWindow,shell,Menu,session}=require("electron");
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
let win=null;
const ours=u=>u.startsWith(LOCAL)||(SITE&&u.startsWith(SITE));
const isAuth=u=>/^https:\/\/(accounts\.google\.com|accounts\.spotify\.com)\//.test(u);
async function openLocal(){await serve();win.loadURL(LOCAL)}
function create(){win=new BrowserWindow({width:1360,height:860,minWidth:900,minHeight:600,title:"Sổ Học Điện Tử",icon:path.join(__dirname,"icon.png"),autoHideMenuBar:true,backgroundColor:"#16191c",webPreferences:{contextIsolation:true,sandbox:true,spellcheck:false}});
  win.webContents.setWindowOpenHandler(({url})=>{if(isAuth(url))return {action:"allow",overrideBrowserWindowOptions:{width:520,height:680,autoHideMenuBar:true,parent:win}};if(ours(url))return {action:"allow"};shell.openExternal(url);return {action:"deny"}});
  win.webContents.on("will-navigate",(e,url)=>{if(!ours(url)&&!isAuth(url)){e.preventDefault();shell.openExternal(url)}});
  win.on("page-title-updated",e=>e.preventDefault());
  let fellBack=false;win.webContents.on("did-fail-load",(e,code,desc,url,isMain)=>{if(isMain&&!fellBack&&SITE&&url.startsWith(SITE)){fellBack=true;openLocal()}});
  if(SITE)win.loadURL(SITE);else openLocal()}
app.on("second-instance",()=>{if(win){if(win.isMinimized())win.restore();win.focus()}});
app.whenReady().then(()=>{Menu.setApplicationMenu(null);
  session.defaultSession.setPermissionRequestHandler((wc,perm,cb)=>cb(["notifications","media","clipboard-read","clipboard-sanitized-write","fullscreen"].includes(perm)));
  create();app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)create()})});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});
