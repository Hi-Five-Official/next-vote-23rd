import { getCandidateVoteResults, getTeamVoteResults } from "@/lib/apis/vote";

export const getTotalVoteCount = async (): Promise<number> => {
  const [teamResult, feResult, beResult] = await Promise.all([
    getTeamVoteResults(),
    getCandidateVoteResults("FE"),
    getCandidateVoteResults("BE"),
  ]);

  const teamTotal = teamResult.result?.teams.reduce((sum, t) => sum + t.voteCount, 0) ?? 0;
  const feTotal = feResult.result?.candidates.reduce((sum, c) => sum + c.voteCount, 0) ?? 0;
  const beTotal = beResult.result?.candidates.reduce((sum, c) => sum + c.voteCount, 0) ?? 0;

  return teamTotal + feTotal + beTotal;
};
