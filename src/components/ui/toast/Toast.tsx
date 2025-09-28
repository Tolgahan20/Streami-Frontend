"use client";

import toast from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info" | "confirm";

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  position?: "top-center" | "top-right" | "top-left" | "bottom-center" | "bottom-right" | "bottom-left";
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-800",
    iconClassName: "text-green-500",
  },
  error: {
    icon: XCircle,
    className: "bg-red-50 border-red-200 text-red-800",
    iconClassName: "text-red-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    iconClassName: "text-yellow-500",
  },
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-800",
    iconClassName: "text-blue-500",
  },
  confirm: {
    icon: AlertCircle,
    className: "bg-purple-50 border-purple-200 text-purple-800",
    iconClassName: "text-purple-500",
  },
};

const ToastComponent = ({
  message,
  variant = "info",
  action,
}: {
  message: string;
  variant: ToastVariant;
  action?: ToastOptions["action"];
}) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm",
        config.className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", config.iconClassName)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="ml-2 px-2 py-1 text-xs font-medium rounded bg-white/20 hover:bg-white/30 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export const showToast = (message: string, options: ToastOptions = {}) => {
  const {
    variant = "info",
    duration = 4000,
    position = "top-right",
    dismissible = true,
    action,
  } = options;

  const toastOptions = {
    duration: duration,
    position: position as "top-center" | "top-right" | "top-left" | "bottom-center" | "bottom-right" | "bottom-left",
    ...(dismissible &&
      {
        // react-hot-toast handles dismissible by default
      }),
  };

  return toast.custom(
    (t) => (
      <div
        className={cn(
          "transition-all duration-300",
          t.visible ? "opacity-100" : "opacity-0"
        )}
      >
        <ToastComponent message={message} variant={variant} action={action} />
      </div>
    ),
    toastOptions
  );
};

// Convenience functions for each variant
export const toastSuccess = (
  message: string,
  options?: Omit<ToastOptions, "variant">
) => showToast(message, { ...options, variant: "success" });

export const toastError = (
  message: string,
  options?: Omit<ToastOptions, "variant">
) => showToast(message, { ...options, variant: "error" });

export const toastWarning = (
  message: string,
  options?: Omit<ToastOptions, "variant">
) => showToast(message, { ...options, variant: "warning" });

export const toastInfo = (
  message: string,
  options?: Omit<ToastOptions, "variant">
) => showToast(message, { ...options, variant: "info" });

export const toastConfirm = (
  message: string,
  options?: Omit<ToastOptions, "variant">
) => showToast(message, { ...options, variant: "confirm" });

// Special confirm toast with action buttons
export const toastConfirmAction = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  options?: Omit<ToastOptions, "variant" | "action">
) => {
  return showToast(message, {
    ...options,
    variant: "confirm",
    duration: 0, // Don't auto-dismiss
    action: {
      label: "Confirm",
      onClick: onConfirm,
    },
  });
};

export default ToastComponent;
