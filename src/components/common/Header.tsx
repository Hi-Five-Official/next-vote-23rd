"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import { deleteAuthCookie } from "@/app/actions/auth";
import DitdaIcon from "@/assets/icons/icon_ditda_regular.svg";
import HamburgerIcon from "@/assets/icons/icon_hamburger_regular.svg";
import XIcon from "@/assets/icons/icon_x_regular.svg";
import Modal from "@/components/common/Modal";
import { NAV_ITEMS } from "@/constants/navigation";
import { postLogout } from "@/lib/apis/auth";
import { cn } from "@/lib/utils/cn";
import { getCookieToken } from "@/lib/utils/cookie";

const AUTH_CHANGE_EVENT = "auth-change";

const subscribeAuth = (callback: () => void) => {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
};

const getAuthSnapshot = () => !!getCookieToken();
const getAuthServerSnapshot = () => false;

export const dispatchAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const isLoggedIn = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (href: string, requireAuth: boolean) => {
    setSidebarOpen(false);
    if (requireAuth && !isLoggedIn) {
      setLoginModalOpen(true);
    } else {
      router.push(href);
    }
  };

  const handleLogout = () => {
    setSidebarOpen(false);
    setLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await postLogout();
    } finally {
      await deleteAuthCookie();
      window.location.href = "/";
    }
  };

  return (
    <>
      {loginModalOpen && (
        <Modal
          buttons="double"
          title="로그인하시겠습니까?"
          description="로그인이 필요한 서비스입니다."
          onConfirm={() => {
            setLoginModalOpen(false);
            router.push("/login");
          }}
          onCancel={() => setLoginModalOpen(false)}
          onClose={() => setLoginModalOpen(false)}
        />
      )}
      {logoutModalOpen && (
        <Modal
          buttons="double"
          title="로그아웃 하시겠습니까?"
          description={`로그아웃 후에는 다시 로그인하셔야\n서비스를 이용하실 수 있습니다.`}
          onConfirm={confirmLogout}
          onCancel={() => setLogoutModalOpen(false)}
          onClose={() => setLogoutModalOpen(false)}
        />
      )}
      <header className="bg-gray-10 z-header relative flex h-16 shrink-0 items-center justify-between px-6">
        <Link href="/" aria-label="딧다 홈으로">
          <DitdaIcon className="h-8.5 w-17" aria-hidden="true" />
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(({ label, href, requireAuth }) => (
            <button
              key={href}
              type="button"
              onClick={() => handleNavClick(href, requireAuth)}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "text-heading1-sb hover:text-purple-60 cursor-pointer transition-colors",
                pathname === href ? "text-purple-60" : "text-black",
              )}
            >
              {label}
            </button>
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
              aria-current={pathname === "/login" ? "page" : undefined}
              className={cn(
                "text-heading1-sb hover:text-purple-60 cursor-pointer transition-colors",
                pathname === "/login" ? "text-purple-60" : "text-black",
              )}
            >
              Login
            </Link>
          )}
        </nav>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={sidebarOpen}
          aria-controls="mobile-sidebar"
          className="md:hidden"
        >
          <HamburgerIcon
            aria-hidden="true"
            className={cn(
              "hover:text-purple-60 size-6 cursor-pointer transition-colors",
              sidebarOpen ? "text-purple-60" : "text-black",
            )}
          />
        </button>
      </header>
      <div
        aria-hidden="true"
        className={cn(
          "z-sidebar fixed inset-0 transition-opacity duration-300 md:hidden",
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        id="mobile-sidebar"
        aria-label="사이드 메뉴"
        aria-hidden={!sidebarOpen}
        className={cn(
          "bg-gray-20 z-sidebar fixed top-0 right-0 flex h-full w-64 flex-col px-6 py-5 shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          sidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="메뉴 닫기"
            className="text-gray-60 cursor-pointer transition-colors hover:text-black"
          >
            <XIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <nav aria-label="모바일 메뉴" className="flex flex-col items-end gap-8 pt-10">
          {NAV_ITEMS.map(({ label, href, requireAuth }) => (
            <button
              key={href}
              type="button"
              onClick={() => handleNavClick(href, requireAuth)}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "text-heading1-sb hover:text-purple-60 cursor-pointer transition-colors",
                pathname === href ? "text-purple-60" : "text-black",
              )}
            >
              {label}
            </button>
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
              onClick={() => setSidebarOpen(false)}
              aria-current={pathname === "/login" ? "page" : undefined}
              className={cn(
                "text-heading1-sb hover:text-purple-60 cursor-pointer transition-colors",
                pathname === "/login" ? "text-purple-60" : "text-black",
              )}
            >
              Login
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Header;
