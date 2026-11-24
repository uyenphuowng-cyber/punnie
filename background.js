/* Nền của tiện ích: giữ MỘT cửa sổ Gemini Notebook nhỏ (cửa sổ “làm việc”), giao việc cho nó và gửi kết quả về trang Sổ Học.
   Cửa sổ này là một cửa sổ Chrome bình thường nên đăng nhập Gmail ở đó được, không dính chuyện Google chặn nhúng khung. */
const ALLOW = /^https:\/\/uyenphuowng-cyber\.github\.io$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$|^https:\/\/localhost(:\d+)?$/;
const NB = /^https:\/\/(notebook|notebooklm)\.google\.com\//;
const SS = chrome.storage.session;
const get = async k => (await SS.get(k))[k];
const set = (k, v) => SS.set({ [k]: v });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const path = u => { try { return new URL(u).pathname.replace(/\/+$/, ""); } catch (e) { return ""; } };

async function agentTab() {
  const id = await get("agentTab"); if (!id) return null;
  try { return await chrome.tabs.get(id); } catch (e) { await set("agentTab", null); return null; }
}
async function waitLoaded(id, ms = 45000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try { const t = await chrome.tabs.get(id); if (t.status === "complete") return t; } catch (e) { return null; }
    await sleep(400);
  }
  return null;
}
/* cửa sổ làm việc: tạo nếu chưa có, đưa tới đúng sổ */
async function ensureAgent(url, opt = {}) {
  let t = await agentTab();
  if (t) {
    if (url && path(t.url) !== path(url)) { await chrome.tabs.update(t.id, { url }); t = await waitLoaded(t.id); }
  } else {
    let left, top;
    try {
      const d = (await chrome.system.display.getInfo())[0].workArea;
      left = d.left + d.width - 470; top = d.top + d.height - 590;
    } catch (e) {}
    const w = await chrome.windows.create({ url: url || "https://notebook.google.com/", type: "popup", focused: !!opt.focus, width: 460, height: 560, left, top });
    t = w.tabs[0]; await set("agentTab", t.id); await set("agentWin", w.id);
    t = await waitLoaded(t.id);
  }
  return t;
}
async function sendTab(tab, msg, tries = 30) {
  for (let i = 0; i < tries; i++) {
    try { return await chrome.tabs.sendMessage(tab, msg); } catch (e) { await sleep(500); }
  }
  return null;
}
async function toSite(evt, data) {
  const id = await get("siteTab"); if (!id) return;
  try { await chrome.tabs.sendMessage(id, { evt, data }); } catch (e) {}
}
/* Cửa sổ Notebook đã sẵn sàng chưa? (chưa đăng nhập → đang ở accounts.google.com) */
async function readyAgent(url, focus) {
  const t = await ensureAgent(url, { focus });
  if (!t) return { ok: false, error: "open" };
  if (!NB.test(t.url || "")) return { ok: false, error: "login", url: t.url || "" };
  const p = await sendTab(t.id, { cmd: "ping" }, 24);
  if (!p) return { ok: false, error: "noscript", url: t.url };
  return { ok: true, tab: t.id, url: p.url, win: t.windowId, ping: p };
}
/* chia đôi màn hình: Sổ Học bên trái, Gemini Notebook bên phải */
async function dockOpen(siteTab, url, frac) {
  const r = await readyAgent(url, true); if (!r.tab && r.error !== "login") return r;
  const at = await agentTab(); if (!at) return { ok: false, error: "open" };
  let wa = { left: 0, top: 0, width: 1280, height: 800 };
  try { const ds = await chrome.system.display.getInfo(); wa = (ds.find(d => d.isPrimary) || ds[0]).workArea; } catch (e) {}
  const mw = await chrome.windows.get(siteTab.windowId);
  if (!(await get("orig"))) await set("orig", { id: mw.id, left: mw.left, top: mw.top, width: mw.width, height: mw.height, state: mw.state });
  const f = Math.max(0.25, Math.min(0.7, +frac || 0.42)), wr = Math.round(wa.width * f), wl = wa.width - wr;
  await chrome.windows.update(mw.id, { state: "normal" });
  await chrome.windows.update(mw.id, { left: wa.left, top: wa.top, width: wl, height: wa.height, state: "normal" });
  await chrome.windows.update(at.windowId, { left: wa.left + wl, top: wa.top, width: wr, height: wa.height, state: "normal", focused: true });
  await set("dock", { on: true, frac: f });
  return { ok: true, login: r.error === "login", frac: f };
}
async function dockClose(closeWin) {
  const o = await get("orig");
  if (o) {
    if (o.state === "maximized" || o.state === "fullscreen") { try { await chrome.windows.update(o.id, { state: o.state }); } catch (e) {} }
    else {
      try { await chrome.windows.update(o.id, { left: o.left, top: o.top, width: o.width, height: o.height, state: "normal" }); }
      catch (e) { /* màn hình/độ phân giải đã đổi: co lại cho vừa màn hình hiện tại */
        try {
          const ds = await chrome.system.display.getInfo(); const wa = (ds.find(d => d.isPrimary) || ds[0]).workArea;
          const w = Math.min(o.width, wa.width), h = Math.min(o.height, wa.height);
          await chrome.windows.update(o.id, { left: Math.max(wa.left, Math.min(o.left, wa.left + wa.width - w)), top: Math.max(wa.top, Math.min(o.top, wa.top + wa.height - h)), width: w, height: h, state: "normal" });
        } catch (e2) {}
      }
    }
  }
  await set("orig", null); await set("dock", { on: false });
  if (closeWin) { const t = await agentTab(); if (t) { try { await chrome.windows.remove(t.windowId); } catch (e) {} } }
  return { ok: true };
}
chrome.windows.onRemoved.addListener(async wid => {
  if (wid === (await get("agentWin"))) {
    await set("agentTab", null); await set("agentWin", null);
    if ((await get("dock") || {}).on) { await dockClose(false); await toSite("dock-state", { open: false }); }
  }
});

chrome.runtime.onMessage.addListener((m, sender, respond) => {
  (async () => {
    /* --- sự kiện từ cửa sổ Notebook (nb.js) --- */
    if (m && (m.evt === "job-done" || m.evt === "job-progress")) {
      const aT = await get("agentTab");
      if (!sender.tab || sender.tab.id !== aT || !NB.test(sender.url || "")) return respond({ ok: false });
      await toSite(m.evt, m.data); return respond({ ok: true });
    }
    /* --- lệnh từ trang Sổ Học (site.js) --- */
    const o = sender.origin || (sender.url ? new URL(sender.url).origin : "");
    if (!ALLOW.test(o) || !sender.tab) return respond({ ok: false, error: "origin" });
    await set("siteTab", sender.tab.id);
    const a = (m && m.args) || {};
    switch (m && m.op) {
      case "hello": return respond({ ok: true, v: chrome.runtime.getManifest().version, dock: !!((await get("dock")) || {}).on });
      case "ping": { const r = await readyAgent(String(a.url || ""), !!a.focus); return respond({ ok: r.ok, error: r.error, url: r.url }); }
      case "job": {
        const r = await readyAgent(String(a.url || ""), false);
        if (!r.ok) return respond({ ok: false, error: r.error, url: r.url });
        const ack = await sendTab(r.tab, { cmd: "run", job: String(a.job), kind: String(a.cmd), payload: a.payload || {} }, 10);
        return respond(ack && ack.accepted ? { ok: true } : { ok: false, error: "noscript" });
      }
      case "abort": { const t = await agentTab(); if (t) await sendTab(t.id, { cmd: "abort", job: String(a.job) }, 2); return respond({ ok: true }); }
      case "dock.open": return respond(await dockOpen(sender.tab, String(a.url || ""), a.frac));
      case "dock.width": { const d = await get("dock"); if (!d || !d.on) return respond({ ok: false }); return respond(await dockOpen(sender.tab, "", a.frac)); }
      case "dock.close": return respond(await dockClose(true));
      case "nav": { const t = await agentTab(); if (!t) return respond({ ok: false }); await chrome.tabs.update(t.id, { url: String(a.url) }); return respond({ ok: true }); }
      case "back": { const t = await agentTab(); if (t) await chrome.tabs.goBack(t.id).catch(() => {}); return respond({ ok: true }); }
      case "reload": { const t = await agentTab(); if (t) await chrome.tabs.reload(t.id); return respond({ ok: true }); }
      default: return respond({ ok: false, error: "op" });
    }
  })().catch(e => respond({ ok: false, error: String(e && e.message || e) }));
  return true;
});
