import DitdaIcon from "@/app/assets/icons/icon_ditda_regular.svg";
import HamburgerIcon from "@/app/assets/icons/icon_hamburger_regular.svg";

const NAV_ITEMS = [
  { label: "Vote", href: "/vote" },
  { label: "Members", href: "/members" },
  { label: "Login", href: "/login" },
];

const Header = () => {
  return (
    <header className="bg-gray-10 relative z-10 flex h-16 shrink-0 items-center justify-between px-6">
      <DitdaIcon className="h-8.5 w-17" />
      <nav className="hidden items-center gap-8 md:flex">
        {NAV_ITEMS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-purple-60 text-heading1-sb transition-colors hover:underline"
          >
            {label}
          </a>
        ))}
      </nav>
      <HamburgerIcon className="text-purple-60 size-6 cursor-pointer md:hidden" />
    </header>
  );
};

export default Header;
