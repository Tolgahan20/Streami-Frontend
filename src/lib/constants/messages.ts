// Authentication Messages
export const AUTH_MESSAGES = {
  // Success Messages
  REGISTER_SUCCESS: "Account created successfully! Please check your email for verification.",
  LOGIN_SUCCESS: "Successfully signed in!",
  LOGOUT_SUCCESS: "Successfully signed out!",
  EMAIL_VERIFIED: "Email verified successfully! Welcome to Streami!",
  GOOGLE_SIGNIN_SUCCESS: "Successfully signed in with Google!",
  VERIFICATION_EMAIL_SENT: "Verification email sent! Please check your inbox.",
  VERIFYING_EMAIL: "Verifying your email...",
  REGISTER_FAILED: "Registration failed. Please try again.",
  LOGIN_FAILED: "Login failed. Please try again.",
  LOGOUT_FAILED: "Failed to sign out. Please try again.",
  VERIFICATION_FAILED: "Verification failed. Please try again.",
  GOOGLE_SIGNIN_FAILED: "Failed to sign in with Google. Please try again.",
  
  BACKEND_ERRORS: {
    // Registration Errors
    email_in_use: "An account with this email already exists. Please sign in instead.",
    email_already_exists: "An account with this email already exists. Please sign in instead.",
    invalid_email: "Please enter a valid email address.",
    password_too_weak: "Password is too weak. Please choose a stronger password.",
    display_name_taken: "This display name is already taken. Please choose another one.",
    user_already_exists: "An account with this information already exists. Please sign in instead.",
    validation_failed: "Please check your input and try again.",
    server_error: "Something went wrong on our end. Please try again later.",
    
    // Login Errors
    user_not_found: "No account found with this email. Please register first.",
    invalid_credentials: "Invalid email or password. Please try again.",
    account_not_verified: "Please verify your email before signing in.",
    
    // Verification Errors
    invalid_or_expired_token: "This verification link has expired or is invalid. Please request a new one.",
    token_not_found: "Verification link not found. Please check your email and try again.",
    email_already_verified: "This email has already been verified. You can sign in now.",
    verification_failed: "Email verification failed. Please try again or contact support.",
    
    // Google Auth Errors
    google_auth_failed: "Google authentication failed. Please try again.",
    backend_registration_failed: "Backend registration failed. Please try again.",
  },
  
  // Firebase Error Mappings
  FIREBASE_ERRORS: {
    'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
    'auth/popup-blocked': 'Pop-up was blocked. Please allow pop-ups and try again.',
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/operation-not-allowed': 'Google sign-in is not enabled. Please contact support.',
  },
  
  // Form Validation Messages
  VALIDATION: {
    REQUIRED_FIELD: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
    PASSWORD_MISMATCH: "Passwords do not match.",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters long.",
    PASSWORD_TOO_WEAK: "Password must contain letters, numbers, and special characters.",
  },
} as const;

// API Error Messages
export const API_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied. You don't have permission for this action.",
  NOT_FOUND: "The requested resource was not found.",
  TIMEOUT: "Request timed out. Please try again.",
} as const;

// General Messages
export const GENERAL_MESSAGES = {
  LOADING: "Loading...",
  SUCCESS: "Success!",
  ERROR: "Error!",
  WARNING: "Warning!",
  INFO: "Information",
} as const;
