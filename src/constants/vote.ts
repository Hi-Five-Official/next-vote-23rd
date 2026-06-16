import type { Part } from "@/types/team";

export const LEADER_CONFIGS = {
  frontend: {
    title: "23RD FRONT-END",
    rankingTitle: "현재 프론트엔드 파트장 투표 순위",
    rankingHref: "/vote/frontend/ranking",
  },
  backend: {
    title: "23RD BACK-END",
    rankingTitle: "현재 백엔드 파트장 투표 순위",
    rankingHref: "/vote/backend/ranking",
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
  { label: "프론트엔드 파트장", href: "/vote/frontend" },
  { label: "백엔드 파트장", href: "/vote/backend" },
] as const;

export const VOTE_MESSAGES = {
  DEMODAY_TEAM_LOADING: "데모데이 팀 후보를 불러오는 중입니다.",
  DEMODAY_TEAM_LOAD_ERROR:
    "데모데이 팀 후보 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  DEMODAY_TEAM_VOTE_ERROR: "투표에 실패했습니다. 잠시 후 다시 시도해주세요.",
  DEMODAY_RANKING_LOADING: "데모데이 투표 결과를 불러오는 중입니다.",
  DEMODAY_RANKING_LOAD_ERROR:
    "데모데이 투표 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  LEADER_CANDIDATE_LOADING: "파트장 후보를 불러오는 중입니다.",
  LEADER_CANDIDATE_LOAD_ERROR: "파트장 후보 목록을 불러오지 못했습니다.",
  LEADER_CANDIDATE_VOTE_ERROR: "투표에 실패했습니다. 잠시 후 다시 시도해주세요.",
  LEADER_RANKING_LOADING: "파트장 투표 결과를 불러오는 중입니다.",
  LEADER_RANKING_LOAD_ERROR: "파트장 투표 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
} as const;
