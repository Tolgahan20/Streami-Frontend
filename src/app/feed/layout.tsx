import { PropsWithChildren } from "react";
import ThemeProvider from "../providers/ThemeProvider";

export default function FeedLayout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
