# Sổ Học Điện Tử — trang web + app điện thoại + app máy tính từ một kho GitHub

Kho này chỉ chứa mã nguồn nhẹ (dưới 2 MB). **Đừng tải thư mục app .exe lên kho** — GitHub chặn tệp trên 25 MB.
App máy tính và app Android do **GitHub Actions** tự build trên máy chủ của GitHub rồi đặt ở mục **Releases**.

## 1. Trang web (GitHub Pages)
1. Giải nén `so-hoc-github.zip`, mở thư mục `so-hoc-github`.
2. Trên GitHub: kho của bạn → **Add file → Upload files** → kéo **toàn bộ nội dung bên trong** thư mục (index.html, app.js, desktop/, android/, …) → **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save. Sau 1–2 phút trang chạy ở `https://<tên>.github.io/<tên-kho>/`.
4. Google Cloud Console → **Credentials → OAuth Client ID → Authorized JavaScript origins** → thêm `https://<tên>.github.io` (chỉ phần gốc, không có /tên-kho).

## 2. App máy tính + app Android (tự build)
1. Kiểm tra có tệp `.github/workflows/build-apps.yml` trong kho. Nếu khi kéo thả GitHub bỏ qua thư mục `.github`:
   **Add file → Create new file** → gõ tên `.github/workflows/build-apps.yml` → dán nội dung tệp cùng tên trong thư mục giải nén → Commit.
2. Tab **Actions** → chọn **Build apps** → **Run workflow**. Đợi khoảng 10–15 phút.
3. Tab **Releases** (hoặc trang chính của kho, cột phải) → bản “Sổ Học — ứng dụng” có:
   - `SoHoc-cai-dat.exe` — cài trên Windows (tạo lối tắt Desktop), hoặc `SoHoc-chay-ngay.exe` — chạy luôn.
   - `SoHoc-android.apk` — tải về điện thoại Android và mở để cài (cho phép “cài ứng dụng từ nguồn không xác định”).
   - `SoHoc-mac.dmg`, `SoHoc-linux.AppImage`.
   Windows có thể báo “Windows protected your PC” vì app chưa ký số → **More info → Run anyway**.
4. Mỗi lần bạn sửa trang và muốn app có biểu tượng/tên mới thì chạy lại workflow. Còn nội dung trang thì app **tự cập nhật** vì app mở thẳng trang GitHub Pages.

## 3. Cách nhanh không cần build
- **Máy tính:** mở trang bằng Chrome/Edge → biểu tượng **Cài đặt** ở thanh địa chỉ.
- **Android:** Chrome → ⋮ → **Cài đặt ứng dụng**.
- **iPhone/iPad:** Safari → **Chia sẻ → Thêm vào Màn hình chính** (Apple không cho cài .apk; muốn lên App Store cần máy Mac + tài khoản Apple Developer).

## Lưu ý về app Android
- App Android mở trang bằng Chrome (Trusted Web Activity) nên đăng nhập Google hoạt động.
- Với kho dạng `<tên>.github.io/<tên-kho>`, trên cùng app có thể hiện một thanh địa chỉ mỏng. Muốn ẩn hẳn: cần tệp
  `https://<tên>.github.io/.well-known/assetlinks.json` (chỉ làm được nếu bạn có kho tên `<tên>.github.io`).
