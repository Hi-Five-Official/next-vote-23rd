import "@/app/globals.css";

import type { Metadata } from "next";

import Header from "@/app/components/common/Header";

export const metadata: Metadata = {
  title: "next-vote-23rd",
  description: "next-vote-23rd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white">
        <Header />
        <main className="relative flex-1">
          <div className="bg-purple-fade pointer-events-none absolute top-0 right-0 left-0 h-22.5" />
          {children}
        </main>
        <div className="bg-purple-fade fixed right-0 bottom-0 left-0 z-0 h-22.5 rotate-180" />
      </body>
    </html>
  );
}
