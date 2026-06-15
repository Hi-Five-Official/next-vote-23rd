import type { ApiResponse } from "@/types/common";

// 팀 조회 response
export type Team = {
  teamId: number;
  name: string;
};

export type GetTeamsResponse = ApiResponse<{ teams: Team[] }>;

// 팀 투표 후보 조회 response
export type VotingTeam = Team & {
  isMyVote: boolean;
};

export type GetVotingTeamsResponse = ApiResponse<{ teams: VotingTeam[] }>;

// 팀별 팀원 조회 response
export type Part = "FE" | "BE";

export type Candidate = {
  candidateId: number;
  name: string;
};

export type GetTeamCandidatesResponse = ApiResponse<{ candidates: Candidate[] }>;
