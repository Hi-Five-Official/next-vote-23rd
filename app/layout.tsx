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
        <main className="relative flex flex-1 items-center justify-center">{children}</main>
      </body>
    </html>
  );
}
