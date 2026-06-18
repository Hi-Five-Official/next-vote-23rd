export const NAV_ITEMS = [
  { label: "Vote", href: "/vote", requireAuth: true },
  { label: "Members", href: "/members", requireAuth: true },
  { label: "Contributors", href: "/contributors", requireAuth: false },
] as const;
