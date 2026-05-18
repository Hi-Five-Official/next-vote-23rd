import api from "@/lib/apis/api";
import type { GetTeamCandidatesResponse, GetTeamsResponse, Part } from "@/types/team";

// 팀 조회
export const getTeams = async (): Promise<GetTeamsResponse> => {
  return (await api.get("/api/v1/teams").json()) as GetTeamsResponse;
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
