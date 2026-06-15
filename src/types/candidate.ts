import type { ApiResponse } from "@/types/common";
import type { Part } from "@/types/team";

// 파트장 투표 후보 조회 response
export type VotingCandidate = {
  candidateId: number;
  name: string;
  part: Part;
  university: string;
  isMyVote: boolean;
};

export type GetVotingCandidatesResponse = ApiResponse<{ candidates: VotingCandidate[] }>;
