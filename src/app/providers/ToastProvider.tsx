"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--card)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '0.875rem',
          padding: 'var(--space-3) var(--space-4)',
        },
        success: {
          iconTheme: {
            primary: 'var(--success)',
            secondary: 'var(--success-foreground)',
          },
          style: {
            borderLeft: '4px solid var(--success)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--destructive)',
            secondary: 'var(--destructive-foreground)',
          },
          style: {
            borderLeft: '4px solid var(--destructive)',
          },
        },
      }}
    />
  );
}
