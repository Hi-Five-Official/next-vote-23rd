import type { ApiResponse } from "@/types/common";

// 팀 조회 response
export type Team = {
  teamId: number;
  name: string;
};

export type GetTeamsResponse = ApiResponse<{ teams: Team[] }>;

// 팀별 팀원 조회 response
export type Part = "FE" | "BE";

export type Candidate = {
  candidateId: number;
  name: string;
};

export type GetTeamCandidatesResponse = ApiResponse<{ candidates: Candidate[] }>;
