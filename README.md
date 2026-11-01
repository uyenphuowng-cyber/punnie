# Sổ Học Điện Tử — bản web độc lập

Sổ học kiểu NotebookLM cho sinh viên Kỹ thuật Điện tử – Máy tính. Bản này **không cần Claude.ai**: chỉ là một trang web tĩnh (HTML + JavaScript), đưa lên hosting miễn phí nào cũng chạy.

| Phần | Bản web độc lập dùng gì |
|---|---|
| Lưu môn học, bài học, tài liệu | IndexedDB trong trình duyệt của bạn (có sao lưu/khôi phục ra tệp `.json`) |
| Trợ lý AI, slide, video, quiz, mô hình 3D… | **Google Gemini (AI Studio, có gói miễn phí)** hoặc Claude API, bằng API key của bạn (chỉ lưu trên máy bạn) |
| Đăng nhập Google (nhiều tài khoản), Google Calendar, Gmail | Google Identity Services + Google Calendar API + Gmail API (cần **OAuth Client ID**) |
| Video YouTube | Phát ngay trong trang (trình phát nhúng youtube-nocookie) |
| Mở nhanh / dùng khi mạng yếu | Service worker + có thể "Cài đặt như ứng dụng" (PWA) |

## 1. Chạy thử trên máy

Trang phải được mở qua `http://` (không mở trực tiếp file `index.html`), vì service worker và đăng nhập Google không chạy với `file://`.

```bash
cd so-hoc-web
python3 -m http.server 8080
# mở http://localhost:8080
```

## 2. Đưa lên mạng (chọn một cách)

**GitHub Pages Drop (dễ nhất, không cần tài khoản Git):**
1. Vào https://app.netlify.com/drop
2. Kéo cả thư mục `so-hoc-web` vào trang → nhận địa chỉ dạng `https://ten-ngau-nhien.netlify.app`.
3. Có thể đổi tên miền con trong *Site configuration → Change site name*.

**GitHub Pages:**
1. Tạo repository mới (ví dụ `so-hoc`), tải toàn bộ nội dung thư mục `so-hoc-web` lên nhánh `main` (tệp `index.html` nằm ở gốc).
2. *Settings → Pages → Build and deployment → Source: Deploy from a branch*, chọn `main` / `(root)` → Save.
3. Vài phút sau trang có ở `https://<tên-github>.github.io/so-hoc/`.

**Cloudflare Pages / Vercel:** tạo dự án mới, chọn "upload" hoặc nối repository, *Build command* để trống, *Output directory* là thư mục chứa `index.html`.

## 3. Bật trợ lý AI (Google AI Studio hoặc Claude)

**Google Gemini — có gói miễn phí (mặc định):**
1. Vào https://aistudio.google.com/apikey → đăng nhập Google → **Create API key**.
2. Mở trang → biểu tượng bánh răng **Cài đặt AI & tài khoản** → chọn **Google Gemini (AI Studio)** → dán key → **Thử kết nối** → **Lưu**.
3. Mô hình mặc định: `gemini-3.8-flash` (chính) và `gemini-3.5-flash-lite` (nhanh). Bấm **Lấy danh sách mô hình từ tài khoản** để chọn mô hình khác mà key của bạn dùng được (ví dụ bản Pro).
4. Gói miễn phí giới hạn số lượt mỗi phút/ngày; tạo slide/video dài có thể bị báo "quá tải" → đợi một lúc. Theo điều khoản của Google, nội dung gửi qua gói miễn phí có thể được dùng để cải thiện sản phẩm — không gửi tài liệu mật.

**Claude (Anthropic):** tạo key tại https://console.anthropic.com/settings/keys (tài khoản API trả theo lượng dùng, khác gói Claude Pro) → trong Cài đặt chọn **Claude** → dán key.

Lưu ý bảo mật: key được lưu trong `localStorage` của trình duyệt và gửi thẳng tới máy chủ của nhà cung cấp. Chỉ nhập key trên máy của bạn. Không bao giờ ghi key vào `config.js` hay đưa lên GitHub. Với AI Studio có thể giới hạn key chỉ dùng cho "Generative Language API" trong Google Cloud Console.

## 4. Bật đăng nhập Google (nhiều tài khoản) + Google Calendar + Gmail

1. Vào https://console.cloud.google.com → tạo Project mới.
2. *APIs & Services → Library* → bật **Google Calendar API**, **Gmail API** và **YouTube Data API v3** (để phát danh sách nhạc YouTube của bạn).
3. *APIs & Services → OAuth consent screen* (Google Auth Platform) → User type **External** → điền tên ứng dụng, email.
   - *Data access / Scopes* → thêm: `openid`, `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `.../auth/calendar.events`, `.../auth/calendar.calendarlist.readonly` (để thấy cả lịch lớp/trường được chia sẻ), `.../auth/gmail.readonly`, `.../auth/gmail.compose`, `.../auth/youtube.readonly`.
   - *Audience / Test users* → thêm **mọi tài khoản Google sẽ đăng nhập** (Gmail cá nhân, email sinh viên…). Ở chế độ thử nghiệm tối đa 100 người; tài khoản chưa có trong danh sách sẽ bị Google chặn.
4. *Credentials → Create credentials → OAuth client ID* → loại **Web application** → **Authorized JavaScript origins** thêm địa chỉ trang, ví dụ `https://ten-cua-ban.netlify.app` và `http://localhost:8080`.
5. Sao chép **Client ID** (dạng `xxxx.apps.googleusercontent.com`) và:
   - dán vào trang: *Cài đặt → Tài khoản Google → Google Client ID*, hoặc
   - ghi vào `config.js` (`googleClientId: "..."`) để ai mở trang cũng dùng được.
6. Bấm ảnh đại diện / **Đăng nhập** ở thanh bên → tích **Liên kết Google Calendar**, **Liên kết Gmail** → *Tiếp tục với Google* → chọn tài khoản → **tích đủ các ô cho phép** trong cửa sổ Google. Lần đầu Google báo "ứng dụng chưa được xác minh" vì đang thử nghiệm → *Nâng cao → Tiếp tục*.

Dùng nhiều tài khoản: menu tài khoản → *Thêm tài khoản Google khác*, rồi *Chuyển sang …* để đổi; *Quản lý tài khoản & quyền* để liên kết / gỡ Calendar, Gmail hoặc xóa tài khoản khỏi máy (thu hồi quyền).

Gmail trong Sổ Học: nút **Gmail** ở thanh trên / thanh bên → tìm thư (lọc nhanh: chưa đọc, có tệp, VGU · Moodle, hạn nộp), đọc thư, **Thêm làm nguồn bài học**, **AI tóm tắt** (việc cần làm + hạn), **Trả lời / Soạn thư** (AI viết nháp, chỉ gửi khi bạn bấm Gửi). Widget *Hộp thư Gmail* hiện thư chưa đọc trên trang chủ.

Mã truy cập Google chỉ lưu trong trình duyệt này (hết hạn sau khoảng 1 giờ; khi cần Sổ Học sẽ nhờ bạn bấm kết nối lại). Client ID không phải mật khẩu nên để trong `config.js` là bình thường. Nếu tài khoản trường (Google Workspace của VGU) chặn ứng dụng bên ngoài, hãy dùng Gmail cá nhân hoặc nhờ quản trị cho phép.

## 4c. Thêm nguồn từ Google Drive

1. Google Cloud Console → **APIs & Services → Library** → bật **Google Drive API** (cùng dự án với Client ID ở mục 4).
2. **OAuth consent screen → Data access → Add or remove scopes** → thêm `https://www.googleapis.com/auth/drive.readonly`. Ứng dụng ở chế độ *Testing* thì tài khoản phải nằm trong **Test users**.
3. Trong Sổ Học: ô **Thêm nguồn** (trang chủ), hộp **Thêm nguồn** trong bài học hoặc hộp **Bài học mới** → **Từ Google Drive** → *Liên kết Google Drive* → chọn tệp (Drive của tôi, Được chia sẻ, Gần đây, Có gắn sao, Drive dùng chung của trường). Google Tài liệu được chuyển thành DOCX, Trang trình bày thành PDF, Trang tính thành CSV.

## 4b. Nhạc từ tài khoản (YouTube · Spotify)

Nút **Nhạc** ở thanh bên → **Nhạc từ tài khoản**.
- **YouTube**: dùng đăng nhập Google ở trên (bật YouTube Data API v3, thêm quyền `youtube.readonly`) → xem danh sách phát của bạn, video đã thích, tìm nhạc học bài → bấm để phát trong trình phát mini. Tài khoản YouTube có thể khác tài khoản đăng nhập. Lần đầu trang hỏi tài khoản có **YouTube Premium** không (Google không cho trang khác đọc gói này): có Premium → phát bằng chính YouTube / YouTube Music Premium trong cửa sổ phát riêng (không quảng cáo, phát nền); không Premium → trình phát YouTube thường trong trang. Cần cho phép **cửa sổ bật lên** cho trang.
- **Spotify**: tạo ứng dụng miễn phí tại https://developer.spotify.com/dashboard → *Create app* (chọn Web API) → **Redirect URI** = địa chỉ trang (ví dụ `https://ten-cua-ban.netlify.app/`) → *Settings → User Management* thêm email Spotify của bạn → dán **Client ID** vào trang (hoặc `spotifyClientId` trong `config.js`). Đăng nhập xong sẽ thấy danh sách phát, bài đã lưu, tìm kiếm. Trình phát nhúng phát đủ bài khi trình duyệt đang đăng nhập Spotify (thường cần Premium).

## 5. Cập nhật phiên bản mới lên GitHub Pages

Nếu đã đưa trang lên bằng GitHub Pages Drop: vào https://app.netlify.com → chọn trang → tab **Deploys** → kéo thư mục `so-hoc-web` mới vào ô "Drag and drop your site output folder here". Địa chỉ trang giữ nguyên, dữ liệu trong trình duyệt không mất.

## 6. Dữ liệu

- Mọi thứ nằm trong trình duyệt trên **từng máy**. Đổi máy/trình duyệt → dùng *Cài đặt → Tải bản sao lưu* rồi *Khôi phục từ tệp* trên máy mới.
- Xóa dữ liệu duyệt web (cookie, dữ liệu trang) sẽ xóa sổ học → hãy sao lưu định kỳ.
- **Mỗi tài khoản Google đăng nhập có kho dữ liệu riêng** (sổ học, nguồn, sticker, giao diện, bố cục, tài khoản YouTube/Spotify đã liên kết). Đăng xuất → chế độ khách; đăng nhập lại tài khoản cũ → dữ liệu của tài khoản đó trở lại. Dữ liệu có từ trước bản v25 thuộc về tài khoản đang đăng nhập lúc nâng cấp. API key AI, Google/Spotify Client ID dùng chung cho cả trình duyệt.
- Nhập tài liệu Moodle: trên Moodle VGU chọn *Download folder* (tệp ZIP) rồi thả vào ô **Thêm nguồn (+)**.

## 7. Bản nâng cấp v12: kéo đổi kích thước, nhạc từ link, cài như ứng dụng

- **Kéo để đổi kích thước** (kích thước được lưu lại):
  - Khối trang chủ: rê chuột vào khối, kéo **cạnh phải** để đổi độ rộng (12 nấc), **cạnh dưới** để đổi chiều cao, **góc dưới phải** để đổi cả hai. Bấm đúp vào tay nắm để về mặc định. Dùng được phím ← → / ↑ ↓ khi tay nắm đang được chọn.
  - Cột các trang (môn học, lịch học, phòng lab, báo cáo, studio…): kéo vạch giữa hai cột. Trang bài học vẫn dùng thanh kéo sẵn có.
  - Bảng bên trái (Sổ học của tôi, Giao diện…): kéo mép phải.
  - Hộp thoại và widget nổi: kéo góc dưới phải.
- **Nhạc từ link:** kéo một link (YouTube, YouTube Music, SoundCloud, Spotify, tệp .mp3/.m4a/.ogg, Google Drive, Dropbox) hoặc tệp nhạc thả vào nút loa trên cùng — khi đang kéo sẽ hiện ô “Thả vào đây để phát nhạc”. Cũng có thể dán link vào ô **Link nhạc** trong bảng âm thanh, hoặc bấm Ctrl+V ở trang chủ. Trình phát mini có bài trước/tiếp, lặp 1 bài hoặc phát lần lượt, âm lượng; kéo thanh tiêu đề để di chuyển, kéo góc để phóng to.
  - YouTube/SoundCloud phát qua trình phát nhúng của chính họ; Spotify chỉ phát bằng nút ▶ trong khung (chưa đăng nhập Spotify thì nghe 30 giây).
- **Cài như ứng dụng:** trên Chrome/Edge (máy tính, Android) có nút **Cài ứng dụng** ở thanh trên cùng. iPhone/iPad: Safari → Chia sẻ → *Thêm vào MH chính*. Ứng dụng có lối tắt (Bài học mới, Lịch học, Nhạc), nhận link được chia sẻ từ app khác (Android), và hiện số bài tập cần làm trên biểu tượng.

## 8. Cấu trúc tệp

```
index.html            khung trang
app.js                toàn bộ giao diện và tính năng
app-plus.js / .css    v12: kéo đổi kích thước, nhạc từ link, cài ứng dụng
platform.js           lưu trữ IndexedDB, Claude API, Google, tải tệp
config.js             cấu hình (Google Client ID, mô hình mặc định)
sw.js                 service worker (mở nhanh, dùng khi mất mạng)
manifest.webmanifest  thông tin cài đặt như ứng dụng
icon-192.png, icon-512.png
```

Thư viện ngoài được tải từ CDN khi cần: KaTeX (công thức), three.js (mô hình 3D), pdf.js (đọc PDF), mammoth (đọc DOCX), JSZip (giải nén ZIP Moodle), Google Fonts.

## Dùng ở nhiều máy mà không phải nhập lại Client ID và API key

1. Trong Google Cloud Console (APIs & Services → Library) bật thêm **Google Drive API**. Sổ Học chỉ dùng một thư mục ẩn dành riêng cho ứng dụng trên Drive của bạn để lưu cài đặt.
2. Ở máy đang dùng: **Cài đặt → Đồng bộ giữa các máy** → bấm **Đồng bộ ngay** (sau khi đã đăng nhập Google).
3. Để máy nào mở trang cũng có sẵn Client ID: bấm **Tải config.js có sẵn Client ID**, chép đè tệp `config.js` trong thư mục `so-hoc-web`, rồi kéo thư mục lên GitHub Pages lại. Cách khác: **Sao chép link cài nhanh** rồi mở link đó trên máy mới.
4. Ở máy mới: bấm **Đăng nhập bằng Google** → API key và lựa chọn mô hình tự được điền. Vẫn sửa được trong trang Cài đặt.

## Cài thành ứng dụng

- **Máy tính (cách nhanh):** mở trang bằng Chrome/Edge → biểu tượng "Cài đặt" ở thanh địa chỉ.
- **Máy tính (bản .exe riêng):** dùng gói `SoHocDienTu-Windows.zip`; nhớ thêm `http://localhost:47823` vào *Authorized JavaScript origins*.
- **Android:** mở trang bằng Chrome → ⋮ → *Cài đặt ứng dụng*. Muốn có tệp .apk / đưa lên Google Play: vào https://www.pwabuilder.com, dán địa chỉ trang GitHub Pages → *Package for stores* → Android.
- **iPhone/iPad:** mở bằng Safari → Chia sẻ → *Thêm vào Màn hình chính*.
