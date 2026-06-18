import api from "@/lib/apis/api";
import type { Part } from "@/types/team";
import type {
  GetCandidateVoteResultsResponse,
  GetTeamVoteResultsResponse,
  GetVoteCountResponse,
  PostCandidateVoteRequest,
  PostCandidateVoteResponse,
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

// 파트장 투표
export const postCandidateVote = async (
  body: PostCandidateVoteRequest,
): Promise<PostCandidateVoteResponse> => {
  return (await api
    .post("/api/v1/votes/candidates", { json: body })
    .json()) as PostCandidateVoteResponse;
};

// 파트장 투표 결과 조회
export const getCandidateVoteResults = async (
  part: Part,
): Promise<GetCandidateVoteResultsResponse> => {
  return (await api
    .get("/api/v1/votes/candidates/results", { searchParams: { part } })
    .json()) as GetCandidateVoteResultsResponse;
};

// 총 투표 수 조회
export const getVoteCount = async (): Promise<GetVoteCountResponse> => {
  return (await api.get("/api/v1/votes/count").json()) as GetVoteCountResponse;
};
