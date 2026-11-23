/* Chạy bên trong khung Gemini Notebook khi được nhúng trong trang Sổ Học:
   nhận lệnh "hỏi" (điền câu hỏi + gửi) và "lấy nội dung" (đoạn bôi đen / câu trả lời cuối) từ đúng trang Sổ Học. */
(() => {
  if (window.top === window) return;
  const parentOrigin = (location.ancestorOrigins && location.ancestorOrigins[0]) || "";
  if (!/^https:\/\/[a-z0-9-]+\.github\.io$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(parentOrigin)) return;
  if (window.parent !== window.top) return; // chỉ khung trực tiếp của trang Sổ Học
  const send = m => window.parent.postMessage(Object.assign({ sohocGnb: 1 }, m), parentOrigin);
  const vis = el => el && el.offsetParent !== null;
  async function ask(text) {
    let box = null;
    for (let i = 0; i < 30 && !box; i++) {
      box = [...document.querySelectorAll('textarea,[contenteditable="true"]')].filter(vis)
        .sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom)[0];
      if (!box) await new Promise(r => setTimeout(r, 400));
    }
    if (!box) return "nobox";
    box.focus();
    if (box.tagName === "TEXTAREA") {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set.call(box, text);
      box.dispatchEvent(new Event("input", { bubbles: true }));
    } else { document.execCommand("selectAll"); document.execCommand("insertText", false, text); }
    await new Promise(r => setTimeout(r, 250));
    const r0 = box.getBoundingClientRect();
    const btn = [...document.querySelectorAll("button")].filter(b => vis(b) && !b.disabled &&
      /send|submit|gửi|query|hỏi/i.test((b.getAttribute("aria-label") || "") + " " + (b.type || "") + " " + (b.className || "")))
      .sort((a, b) => Math.hypot(a.getBoundingClientRect().x - r0.right, a.getBoundingClientRect().y - r0.y) - Math.hypot(b.getBoundingClientRect().x - r0.right, b.getBoundingClientRect().y - r0.y))[0];
    if (btn) { btn.click(); return "sent"; }
    box.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true }));
    return "typed";
  }
  function grab() {
    const s = String(getSelection() || "").trim(); if (s) return s;
    const c = [...document.querySelectorAll('[class*="message"],[class*="response"],chat-message,.to-user-container,mat-card')]
      .filter(x => vis(x) && x.innerText && x.innerText.trim().length > 40);
    return c.length ? c[c.length - 1].innerText.trim() : "";
  }
  window.addEventListener("message", async e => {
    if (e.origin !== parentOrigin || e.source !== window.parent || !e.data || !e.data.sohocGnb) return;
    const d = e.data;
    if (d.t === "ask") send({ t: "asked", id: d.id, r: await ask(String(d.text || "").slice(0, 8000)) });
    if (d.t === "grab") send({ t: "grabbed", id: d.id, text: grab() });
    if (d.t === "back") history.back();
  });
  send({ t: "ready", url: location.href, login: /accounts\.google\.com/.test(location.href) });
  let last = location.href; setInterval(() => { if (location.href !== last) { last = location.href; send({ t: "nav", url: last }); } }, 1000);
})();
