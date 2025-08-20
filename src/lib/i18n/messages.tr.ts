export const messagesTr = {
  common: {
    unknownError: "Bir hata oluştu.",
    networkError: "Ağ hatası. Lütfen tekrar deneyin.",
  },
  auth: {
    register: {
      success: "Doğrulama e-postası gönderildi.",
    },
    verify: {
      success: "E-posta doğrulandı.",
    },
    login: {
      success: "Başarıyla giriş yapıldı.",
      invalid: "E-posta veya şifre hatalı.",
    },
    logout: {
      success: "Çıkış yapıldı.",
    },
  },
} as const;

export type MessagesTr = typeof messagesTr;

