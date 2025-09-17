import { PropsWithChildren } from "react";
import ThemeProvider from "../providers/ThemeProvider";
import { AuthWrapper } from "@/features/auth/components/AuthWrapper";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function FeedLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ProtectedRoute>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </ProtectedRoute>
    </ThemeProvider>
  );
}
