import type { Part } from "@/types/team";

export const LEADER_CONFIGS = {
  frontend: {
    title: "23RD FRONT-END",
    rankingTitle: "현재 프론트엔드 파트장 투표 순위",
    rankingHref: "/vote/leader/frontend/ranking",
  },
  backend: {
    title: "23RD BACK-END",
    rankingTitle: "현재 백엔드 파트장 투표 순위",
    rankingHref: "/vote/leader/backend/ranking",
  },
} as const;

export type LeaderPart = keyof typeof LEADER_CONFIGS;

export const isLeaderPart = (part: string | string[] | undefined): part is LeaderPart =>
  typeof part === "string" && Object.prototype.hasOwnProperty.call(LEADER_CONFIGS, part);

export const LEADER_PART_TO_API_PART: Record<LeaderPart, Part> = {
  frontend: "FE",
  backend: "BE",
};

export const VOTE_BUTTONS = [
  { label: "프론트엔드 파트장", href: "/vote/leader/frontend" },
  { label: "백엔드 파트장", href: "/vote/leader/backend" },
] as const;
