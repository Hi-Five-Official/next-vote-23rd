import {
  backendMembers,
  backendVoteRankings,
  frontendMembers,
  frontendVoteRankings,
} from "@/data/members";

export const STORAGE_KEY = {
  DEMODAY: "selected-demoday",
  LEADER: (part: string) => `selected-leader-${part}`,
} as const;

export const LEADER_CONFIGS = {
  frontend: {
    title: "23RD FRONT-END",
    rankingTitle: "현재 프론트엔드 파트장 투표 순위",
    members: frontendMembers,
    rankings: frontendVoteRankings,
  },
  backend: {
    title: "23RD BACK-END",
    rankingTitle: "현재 백엔드 파트장 투표 순위",
    members: backendMembers,
    rankings: backendVoteRankings,
  },
} as const;

export type LeaderPart = keyof typeof LEADER_CONFIGS;

export const VOTE_BUTTONS = [
  { label: "프론트엔드 파트장", href: "/vote/leader/frontend" },
  { label: "백엔드 파트장", href: "/vote/leader/backend" },
] as const;
