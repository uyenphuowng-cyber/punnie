/* báo cho trang Sổ Học biết tiện ích đã cài (chỉ đặt 1 thuộc tính, không đọc gì trên trang) */
document.documentElement.setAttribute("data-sohoc-ext", chrome.runtime.getManifest().version);
