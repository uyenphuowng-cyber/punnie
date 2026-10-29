/* Cấu hình Sổ Học Điện Tử (bản web độc lập)
   - googleClientId: OAuth Client ID loại "Web application" từ Google Cloud Console
     (thêm địa chỉ trang web vào "Authorized JavaScript origins"). Để trống nếu chưa dùng Google.
     Client ID không phải mật khẩu nên để ở đây được.
   - provider: "gemini" (Google AI Studio) hoặc "claude" — người dùng đổi được trong Cài đặt AI.
   - KHÔNG đặt API key ở tệp này: nhập key trong trang (Cài đặt AI), key chỉ lưu trên trình duyệt của bạn. */
window.SOHOC_CONFIG = {
  googleClientId: "",
  spotifyClientId: "",
  provider: "gemini",
  geminiModel: "gemini-3.8-flash",
  geminiQuickModel: "gemini-3.5-flash-lite",
  defaultModel: "claude-sonnet-5-5",
  quickModel: "claude-haiku-5-5"
};
