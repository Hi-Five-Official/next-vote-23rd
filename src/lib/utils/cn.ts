import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const isProjectTypographyToken = (value: string) =>
  /^(heading|body|caption)\d+-[a-z]+$/.test(value);

const twMerge = extendTailwindMerge<"project-font-size">({
  override: {
    classGroups: {
      "text-color": [{ text: [(value: string) => !isProjectTypographyToken(value)] }],
    },
  },
  extend: {
    classGroups: {
      "project-font-size": [{ text: [isProjectTypographyToken] }],
    },
    conflictingClassGroups: {
      "font-size": ["project-font-size"],
      "project-font-size": ["font-size", "leading"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
