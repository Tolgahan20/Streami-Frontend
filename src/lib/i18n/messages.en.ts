export const messagesEn = {
  common: {
    unknownError: "Something went wrong.",
    networkError: "Network error. Please try again.",
  },
  auth: {
    register: {
      success: "Verification email sent.",
    },
    verify: {
      success: "Email verified.",
    },
    login: {
      success: "Logged in successfully.",
      invalid: "Invalid email or password.",
    },
    logout: {
      success: "Logged out.",
    },
  },
} as const;

export type MessagesEn = typeof messagesEn;

