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
