import api from "@/lib/apis/api";
import type {
  GetTeamCandidatesResponse,
  GetTeamsResponse,
  GetVotingTeamsResponse,
  Part,
} from "@/types/team";

// 팀 조회
export const getTeams = async (): Promise<GetTeamsResponse> => {
  return (await api.get("/api/v1/teams").json()) as GetTeamsResponse;
};

// 데모데이 팀 투표 후보 조회
export const getVotingTeams = async (): Promise<GetVotingTeamsResponse> => {
  return (await api.get("/api/v1/teams/voting").json()) as GetVotingTeamsResponse;
};

// 팀별 팀원 조회
export const getTeamCandidates = async (
  teamId: number,
  part: Part,
): Promise<GetTeamCandidatesResponse> => {
  return (await api
    .get(`/api/v1/teams/${teamId}/candidates`, { searchParams: { part } })
    .json()) as GetTeamCandidatesResponse;
};
