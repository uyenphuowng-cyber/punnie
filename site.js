/* Cầu nối giữa trang Sổ Học của bạn và tiện ích. Chỉ chạy trên đúng trang Sổ Học (xem manifest).
   · báo cho trang biết tiện ích đã cài (thuộc tính data-sohoc-ext / data-sohoc-agent)
   · chuyển lệnh từ trang → tiện ích và kết quả/sự kiện ngược lại. Không đọc gì khác trên trang. */
(() => {
  const el = document.documentElement;
  el.setAttribute("data-sohoc-ext", chrome.runtime.getManifest().version);
  el.setAttribute("data-sohoc-agent", "2");
  window.addEventListener("message", e => {
    if (e.source !== window || e.origin !== location.origin) return;
    const d = e.data;
    if (!d || d.sohocReq !== 1 || typeof d.id !== "string" || typeof d.op !== "string") return;
    const reply = res => window.postMessage({ sohocRes: 1, id: d.id, res }, location.origin);
    chrome.runtime.sendMessage({ op: d.op, args: d.args || {} }).then(reply, er => reply({ ok: false, error: "ext:" + (er && er.message || er) }));
  });
  chrome.runtime.onMessage.addListener(m => {
    if (m && m.evt) window.postMessage({ sohocEvt: 1, evt: m.evt, data: m.data }, location.origin);
  });
})();
