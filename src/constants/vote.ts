import type { Part } from "@/types/team";

export const LEADER_CONFIGS = {
  frontend: {
    title: "23RD FRONT-END",
    rankingTitle: "현재 프론트엔드 파트장 투표 순위",
  },
  backend: {
    title: "23RD BACK-END",
    rankingTitle: "현재 백엔드 파트장 투표 순위",
  },
} as const;

export type LeaderPart = keyof typeof LEADER_CONFIGS;

export const LEADER_PART_TO_API_PART: Record<LeaderPart, Part> = {
  frontend: "FE",
  backend: "BE",
};

export const VOTE_BUTTONS = [
  { label: "프론트엔드 파트장", href: "/vote/leader/frontend" },
  { label: "백엔드 파트장", href: "/vote/leader/backend" },
] as const;
