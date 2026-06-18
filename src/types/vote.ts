import type { ApiResponse } from "@/types/common";
import type { VotingTeam } from "@/types/team";

// 데모데이 팀 투표 request
export type PostTeamVoteRequest = {
  teamId: number;
};

// 데모데이 팀 투표 response
export type PostTeamVoteResponse = ApiResponse<string>;

// 데모데이 팀 투표 결과 response
export type TeamVoteResult = VotingTeam & {
  voteCount: number;
};

export type GetTeamVoteResultsResponse = ApiResponse<{ teams: TeamVoteResult[] }>;

// 파트장 투표 request
export type PostCandidateVoteRequest = {
  candidateId: number;
};

// 파트장 투표 response
export type PostCandidateVoteResponse = ApiResponse<string>;

// 파트장 투표 결과 response
export type CandidateVoteResult = {
  candidateId: number;
  name: string;
  voteCount: number;
  isMyVote: boolean;
};

export type GetCandidateVoteResultsResponse = ApiResponse<{
  candidates: CandidateVoteResult[];
}>;

// 총 투표 수 조회 response
export type GetVoteCountResponse = ApiResponse<{ totalCount: number }>;
