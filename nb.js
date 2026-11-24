/* Chạy trong trang Gemini Notebook. Chỉ hành động khi tiện ích gửi lệnh (từ trang Sổ Học của bạn):
   hỏi (điền câu hỏi, gửi, chờ câu trả lời xong rồi trả về), bấm ô Studio, lấy nội dung đã bôi đen / câu trả lời cuối.
   Giao diện Gemini Notebook do Google quyết định nên các bước tìm nút dùng nhiều cách dự phòng (tiếng Việt + tiếng Anh). */
(() => {
  if (window.top !== window || window.__sohocNb) return;
  window.__sohocNb = 1;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const vis = el => { if (!el || !el.getBoundingClientRect) return false; const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return r.width > 2 && r.height > 2 && cs.visibility !== "hidden" && cs.display !== "none"; };
  const nfc = s => String(s || "").normalize("NFC");
  const asc = s => nfc(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();
  const txt = el => nfc(((el.getAttribute && el.getAttribute("aria-label")) || "") + " " + (el.innerText || el.textContent || ""));
  const aborted = new Set();

  const RESP = ['.to-user-container', '[class*="to-user"]', 'chat-message [class*="message-text"]', '.message-text-content', '[data-message-author="model"]', '[data-author="model"]', '[class*="response-container"]', '[class*="model-response"]'];
  function responses() {
    for (const s of RESP) { const l = [...document.querySelectorAll(s)].filter(e => (e.innerText || "").trim().length > 0); if (l.length) return l; }
    return [];
  }
  function chatBox() {
    return [...document.querySelectorAll('textarea,[contenteditable="true"],[role="textbox"]')].filter(vis)
      .filter(e => !e.closest('[aria-hidden="true"]'))
      .sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom)[0] || null;
  }
  function setText(box, text) {
    box.focus();
    if (box.tagName === "TEXTAREA" || box.tagName === "INPUT") {
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(box), "value").set.call(box, text);
      box.dispatchEvent(new Event("input", { bubbles: true }));
    } else { document.execCommand("selectAll"); document.execCommand("insertText", false, text); box.dispatchEvent(new Event("input", { bubbles: true })); }
  }
  function sendBtn(box) {
    const r0 = box.getBoundingClientRect();
    return [...document.querySelectorAll("button,[role=button]")].filter(b => vis(b) && !b.disabled && b.getAttribute("aria-disabled") !== "true" &&
      (/^\s*(send|submit|gửi|ask|hỏi|query)\b/i.test(nfc(b.getAttribute("aria-label")).trim()) || /^\s*(send|submit|gửi)\s*$/i.test(nfc(b.innerText)) || /(^|[\s_-])(submit|send)([\s_-]|$)/i.test(String(b.className || ""))))
      .sort((a, b) => Math.hypot(a.getBoundingClientRect().x - r0.right, a.getBoundingClientRect().y - r0.y) - Math.hypot(b.getBoundingClientRect().x - r0.right, b.getBoundingClientRect().y - r0.y))[0] || null;
  }
  const generating = () => [...document.querySelectorAll("button,[role=button]")].some(b => vis(b) && /\b(stop|dừng)\b/i.test(txt(b)) && !/stop sharing|dừng chia sẻ/i.test(txt(b)));
  const bodyLen = () => (document.body.innerText || "").length;

  async function ask(prompt, job, prog) {
    let box = null;
    for (let i = 0; i < 40 && !box; i++) { box = chatBox(); if (!box) await sleep(500); }
    if (!box) return { ok: false, error: "nobox" };
    const before = responses(), n0 = before.length, t0 = before.length ? before[before.length - 1].innerText : "", L0 = bodyLen();
    setText(box, prompt); await sleep(350);
    const b = sendBtn(box);
    const dbg = { btn: !!b, tag: box.tagName, n0 };
    if (b) b.click(); else for (const t of ["keydown", "keypress", "keyup"]) box.dispatchEvent(new KeyboardEvent(t, { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
    const T0 = Date.now(); let last = "", stable = 0, seen = false, lastP = 0;
    while (Date.now() - T0 < 200000) {
      if (aborted.has(job)) return { ok: false, error: "cancelled" };
      await sleep(600);
      const rs = responses(); const lr = rs.length ? rs[rs.length - 1] : null;
      let cur = lr ? lr.innerText.trim() : "";
      const fresh = rs.length > n0 || (cur && cur !== t0.trim());
      if (!fresh && !(bodyLen() > L0 + 60)) { if (Date.now() - T0 > 45000) return { ok: false, error: "noanswer", dbg: Object.assign(dbg, { n: rs.length, vlen: (box.value || box.innerText || "").length }) }; continue; }
      seen = true;
      if (cur === last && cur) stable += 600; else { stable = 0; last = cur; }
      if (Date.now() - lastP > 2500) { lastP = Date.now(); prog({ chars: cur.length }); }
      if (seen && cur && stable >= 4200 && !generating()) return { ok: true, text: cur };
    }
    return last ? { ok: true, text: last, partial: true } : { ok: false, error: "timeout" };
  }
  /* so khớp không dấu, không phân biệt hoa/thường (giao diện Google có thể là tiếng Việt hoặc Anh) */
  const KIND = {
    audio: /audio overview|tong quan (bang )?am thanh|am thanh/, video: /video overview|tong quan (bang )?video|bai giang video/,
    mindmap: /mind ?map|so do tu duy/, report: /report|bao cao/, flash: /flash ?cards?|the ghi nho/, quiz: /quiz|bai kiem tra|trac nghiem/,
    slides: /slide|ban trinh bay/, info: /infographic|do hoa thong tin/, table: /data table|bang du lieu/
  };
  async function studio(kind) {
    const rx = KIND[kind]; if (!rx) return { ok: false, error: "kind" };
    const c = [...document.querySelectorAll("button,[role=button],[tabindex],mat-card")].filter(e => vis(e) && rx.test(asc(txt(e)).slice(0, 90)) && !e.closest("[class*=source]"))
      .sort((a, b) => { const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(); return A.width * A.height - B.width * B.height; });
    if (!c.length) return { ok: false, error: "notile", dbg: { sample: [...document.querySelectorAll("button,[role=button]")].filter(vis).slice(0, 14).map(e => asc(txt(e)).trim().slice(0, 32)) } };
    c[0].click(); await sleep(1500);
    const dlg = document.querySelector('[role=dialog],mat-dialog-container,[class*="dialog"]');
    if (dlg) { const g = [...dlg.querySelectorAll("button")].filter(vis).find(b => /^\s*(generate|tạo|create|bắt đầu|start)\s*$/i.test(b.innerText || "")); if (g) { g.click(); await sleep(800); } }
    return { ok: true, started: true };
  }
  function grab() {
    const s = String(getSelection() || "").trim(); if (s) return s;
    const rs = responses(); return rs.length ? rs[rs.length - 1].innerText.trim() : "";
  }
  chrome.runtime.onMessage.addListener((m, s, respond) => {
    if (!m || !m.cmd) return;
    if (m.cmd === "ping") { respond({ ok: true, url: location.href, title: document.title, box: !!chatBox() }); return; }
    if (m.cmd === "abort") { aborted.add(m.job); respond({ ok: true }); return; }
    if (m.cmd === "run") {
      respond({ accepted: true });
      const job = m.job, prog = d => chrome.runtime.sendMessage({ evt: "job-progress", data: Object.assign({ job }, d) }).catch(() => {});
      (async () => {
        let res;
        try {
          const p = m.payload || {};
          if (m.kind === "ask") res = await ask(String(p.prompt || "").slice(0, 20000), job, prog);
          else if (m.kind === "studio") res = await studio(String(p.kind || ""));
          else if (m.kind === "grab") res = { ok: true, text: grab() };
          else res = { ok: false, error: "kind" };
        } catch (e) { res = { ok: false, error: "script:" + (e && e.message || e) }; }
        chrome.runtime.sendMessage({ evt: "job-done", data: { job, result: res } }).catch(() => {});
      })();
      return;
    }
  });
})();
