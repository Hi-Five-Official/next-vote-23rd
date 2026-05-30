import api from "@/lib/apis/api";
import type { GetVotingCandidatesResponse } from "@/types/candidate";
import type { Part } from "@/types/team";

// 파트장 투표 후보 조회
export const getVotingCandidates = async (part: Part): Promise<GetVotingCandidatesResponse> => {
  return (await api
    .get("/api/v1/candidates/voting", { searchParams: { part } })
    .json()) as GetVotingCandidatesResponse;
};
