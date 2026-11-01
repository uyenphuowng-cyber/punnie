/* Cấu hình Sổ Học Điện Tử (bản web độc lập)
   - googleClientId: OAuth Client ID loại "Web application" từ Google Cloud Console
     (thêm địa chỉ trang web vào "Authorized JavaScript origins"). Để trống nếu chưa dùng Google.
     Client ID không phải mật khẩu nên để ở đây được.
   - provider: "gemini" (Google AI Studio) hoặc "claude" — người dùng đổi được trong Cài đặt AI.
   - ownerGeminiKey: ĐỂ TRỐNG. Không đặt API key vào tệp này — tệp nằm công khai trên GitHub, ai cũng đọc được.
     Nhập key trong trang (Cài đặt → Trợ lý AI); key chỉ lưu trên máy và tự đồng bộ sang máy khác qua tài khoản Google của bạn. */
window.SOHOC_CONFIG = {
  googleClientId: "746912320374-8u277183bn8154ljltjui9ri6phqqb3o.apps.googleusercontent.com",
  spotifyClientId: "",
  ownerGeminiKey: "",
  provider: "gemini",
  geminiModel: "gemini-3.8-flash",
  geminiQuickModel: "gemini-3.5-flash-lite",
  defaultModel: "claude-sonnet-5-5",
  quickModel: "claude-haiku-5-5"
};
