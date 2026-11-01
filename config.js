/* Cấu hình Sổ Học Điện Tử (bản web độc lập)
   - googleClientId: OAuth Client ID loại "Web application" từ Google Cloud Console
     (thêm địa chỉ trang web vào "Authorized JavaScript origins"). Để trống nếu chưa dùng Google.
     Client ID không phải mật khẩu nên để ở đây được.
   - provider: "gemini" (Google AI Studio) hoặc "claude" — người dùng đổi được trong Cài đặt AI.
   - ownerGeminiKey: API key Gemini "có sẵn" của chủ trang. Người dùng chọn "Dùng key có sẵn của Sổ Học" hoặc nhập key riêng.
     LƯU Ý: key đặt ở đây ai mở trang cũng đọc được → nên giới hạn key trong Google Cloud Console
     (Credentials → key → Application restrictions: Websites = địa chỉ trang của bạn; API restrictions: Generative Language API). */
window.SOHOC_CONFIG = {
  googleClientId: "746912320374-8u277183bn8154ljltjui9ri6phqqb3o.apps.googleusercontent.com",
  spotifyClientId: "",
  ownerGeminiKey: "AQ.Ab8RN6LWV-QEcO6DJ6Ydy9zeyXg1BDF_HGEjR1snJhS5zhNI4A",
  provider: "gemini",
  geminiModel: "gemini-3.8-flash",
  geminiQuickModel: "gemini-3.5-flash-lite",
  defaultModel: "claude-sonnet-5-5",
  quickModel: "claude-haiku-5-5"
};
