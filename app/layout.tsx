import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "./components/layout/AppLayout";
import { QueryProvider } from "./components/providers/QueryProvider";
import { SessionHydrator } from "./components/providers/SessionHydrator";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seashore Site Management Portal",
  description: "Site management portal for Seashore Enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen">
        <QueryProvider>
          <SessionHydrator />
          <AppLayout>{children}</AppLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
