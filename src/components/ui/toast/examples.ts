/**
 * Toast Usage Examples
 * 
 * This file demonstrates how to use the unified toast system across your app.
 * Replace all existing toast calls with these new variants for consistency.
 */

import { 
  showToast, 
  toastSuccess, 
  toastError, 
  toastWarning, 
  toastInfo, 
  toastConfirm,
  toastConfirmAction 
} from '@/components/ui/toast';

// Basic usage with variants
export const examples = {
  // Success messages
  success: () => {
    toastSuccess("Profile updated successfully!");
    toastSuccess("File uploaded successfully!", { duration: 3000 });
  },

  // Error messages
  error: () => {
    toastError("Failed to save changes");
    toastError("Network connection lost", { duration: 0 }); // Don't auto-dismiss
  },

  // Warning messages
  warning: () => {
    toastWarning("This action cannot be undone");
    toastWarning("Session expires in 5 minutes", { duration: 10000 });
  },

  // Info messages
  info: () => {
    toastInfo("New features available");
    toastInfo("Check your email for verification", { position: "bottom-right" });
  },

  // Confirm messages
  confirm: () => {
    toastConfirm("Are you sure you want to delete this item?");
  },

  // Advanced usage with custom options
  advanced: () => {
    showToast("Custom message", {
      variant: "success",
      duration: 5000,
      position: "top-right",
      dismissible: true,
    });
  },

  // Action toasts (for confirmations with buttons)
  actionToast: () => {
    toastConfirmAction(
      "Delete this post?",
      () => console.log("Confirmed!"),
      () => console.log("Cancelled"),
      { duration: 0 } // Don't auto-dismiss
    );
  },

  // Toast with action button
  withAction: () => {
    showToast("New message received", {
      variant: "info",
      action: {
        label: "View",
        onClick: () => console.log("View message"),
      },
    });
  },
};

// Migration guide for existing toast calls:
export const migrationExamples = {
  // OLD: toast.success("Success!")
  // NEW: toastSuccess("Success!")
  
  // OLD: toast.error("Error!")
  // NEW: toastError("Error!")
  
  // OLD: toast("Info message")
  // NEW: toastInfo("Info message")
  
  // OLD: toast.custom(...)
  // NEW: showToast("Message", { variant: "custom", ... })
};
