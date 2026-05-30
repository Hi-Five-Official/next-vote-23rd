import api from "@/lib/apis/api";
import type {
  GetTeamVoteResultsResponse,
  PostTeamVoteRequest,
  PostTeamVoteResponse,
} from "@/types/vote";

// 데모데이 팀 투표
export const postTeamVote = async (body: PostTeamVoteRequest): Promise<PostTeamVoteResponse> => {
  return (await api.post("/api/v1/votes/teams", { json: body }).json()) as PostTeamVoteResponse;
};

// 데모데이 팀 투표 결과 조회
export const getTeamVoteResults = async (): Promise<GetTeamVoteResultsResponse> => {
  return (await api.get("/api/v1/votes/teams/results").json()) as GetTeamVoteResultsResponse;
};
