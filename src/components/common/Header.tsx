"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import DitdaIcon from "@/assets/icons/icon_ditda_regular.svg";
import HamburgerIcon from "@/assets/icons/icon_hamburger_regular.svg";
import XIcon from "@/assets/icons/icon_x_regular.svg";
import { NAV_ITEMS } from "@/constants/navigation";
import { postLogout } from "@/lib/apis/auth";
import { cn } from "@/lib/utils/cn";

const AUTH_CHANGE_EVENT = "auth-change";

const subscribeAuth = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
};

const getAuthSnapshot = () => !!localStorage.getItem("accessToken");
const getAuthServerSnapshot = () => false;

export const dispatchAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const Header = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await postLogout();
    } finally {
      localStorage.removeItem("accessToken");
      dispatchAuthChange();
      alert("로그아웃 되었습니다!");
    }
  };

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
              className={`text-heading1-sb hover:text-purple-60 transition-colors ${pathname === href ? "text-purple-60" : "text-black"}`}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-heading1-sb hover:text-purple-60 cursor-pointer text-black transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`text-heading1-sb hover:text-purple-60 transition-colors ${pathname === "/login" ? "text-purple-60" : "text-black"}`}
            >
              Login
            </Link>
          )}
        </nav>
        <button type="button" onClick={() => setSidebarOpen(true)} className="md:hidden">
          <HamburgerIcon
            className={cn(
              "hover:text-purple-60 size-6 cursor-pointer transition-colors",
              sidebarOpen ? "text-purple-60" : "text-black",
            )}
          />
        </button>
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
              className={cn(
                "text-heading1-sb hover:text-purple-60 cursor-pointer transition-colors",
                pathname === href ? "text-purple-60" : "text-black",
              )}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className="text-heading1-sb hover:text-purple-60 cursor-pointer text-black transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "text-heading1-sb hover:text-purple-60 cursor-pointer transition-colors",
                pathname === "/login" ? "text-purple-60" : "text-black",
              )}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
