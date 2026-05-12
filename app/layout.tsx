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
    <html lang="ko" className="h-full overflow-hidden antialiased">
      <body className="flex h-full flex-col overflow-hidden bg-white">
        <Header />
        <main className="relative flex flex-1 items-center justify-center">
          <div className="bg-purple-fade pointer-events-none absolute top-0 right-0 left-0 h-22.5" />
          {children}
        </main>
        <div className="bg-purple-fade z-layout fixed right-0 bottom-0 left-0 h-22.5 rotate-180" />
      </body>
    </html>
  );
}
