import "@/app/globals.css";

import type { Metadata } from "next";

import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "CEOS 23rd Vote",
  description: "CEOS 23rd Vote by Ditda",
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
          <div className="w-80 md:w-100">{children}</div>
        </main>
      </body>
    </html>
  );
}
