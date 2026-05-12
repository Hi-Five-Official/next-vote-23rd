"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DitdaIcon from "@/app/assets/icons/icon_ditda_regular.svg";
import HamburgerIcon from "@/app/assets/icons/icon_hamburger_regular.svg";
import XIcon from "@/app/assets/icons/icon_x_regular.svg";
import { NAV_ITEMS } from "@/app/constants/navigation";
import { cn } from "@/app/lib/utils/cn";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="bg-gray-10 z-header relative flex h-16 shrink-0 items-center justify-between px-6">
        <Link href="/">
          <DitdaIcon className="h-8.5 w-17" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-purple-60 text-heading1-sb transition-colors hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
        <HamburgerIcon
          className="text-purple-60 size-6 cursor-pointer md:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      </header>
      <div
        className={cn(
          "z-sidebar fixed inset-0 transition-opacity duration-300 md:hidden",
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={cn(
          "bg-gray-20 z-sidebar fixed top-0 right-0 flex h-full w-64 flex-col px-6 py-5 shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-60 cursor-pointer transition-colors hover:text-black"
          >
            <XIcon className="size-6" />
          </button>
        </div>
        <nav className="flex flex-col items-end gap-8 pt-10">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="text-heading1-sb text-purple-60 cursor-pointer transition-colors hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
