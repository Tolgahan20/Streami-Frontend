import { PropsWithChildren } from "react";
import ThemeProvider from "../providers/ThemeProvider";
import { AuthWrapper } from "@/features/auth/components/AuthWrapper";

export default function FeedLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </ThemeProvider>
  );
}
