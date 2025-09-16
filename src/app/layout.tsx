import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import ToastProvider from "./providers/ToastProvider";
import { AuthProvider } from "./providers/AuthProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Streami - AI-Powered Streaming Assistant",
  description: "The ultimate AI companion for streamers, VTubers, and digital creators. Enhance engagement, build community, and grow your audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}