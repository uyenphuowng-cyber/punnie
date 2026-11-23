/* Cầu nối an toàn: trang Sổ Học chỉ gọi được mấy lệnh điều khiển khung Gemini Notebook bên phải */
const {contextBridge,ipcRenderer}=require("electron");
const subs=new Set();ipcRenderer.on("gnb:state",(e,s)=>subs.forEach(f=>{try{f(s)}catch(_){}}));
contextBridge.exposeInMainWorld("sohocDesk",{
  version:1,
  gnb:{open:u=>ipcRenderer.invoke("gnb:open",u),close:()=>ipcRenderer.invoke("gnb:close"),toggle:u=>ipcRenderer.invoke("gnb:toggle",u),
    width:f=>ipcRenderer.invoke("gnb:width",f),state:()=>ipcRenderer.invoke("gnb:state"),reload:()=>ipcRenderer.invoke("gnb:reload"),back:()=>ipcRenderer.invoke("gnb:back"),
    ask:t=>ipcRenderer.invoke("gnb:ask",String(t||"").slice(0,8000)),grab:()=>ipcRenderer.invoke("gnb:grab"),
    onState:f=>{subs.add(f);return ()=>subs.delete(f)}}});
