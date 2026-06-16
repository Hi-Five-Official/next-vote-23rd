"use client";

import { useEffect, useMemo, useState } from "react";

import Chip from "@/components/common/Chip";
import { VOTE_MESSAGES } from "@/constants/vote";
import { getTeamVoteResults } from "@/lib/apis/vote";
import type { TeamVoteResult } from "@/types/vote";

const Page = () => {
  const [teams, setTeams] = useState<TeamVoteResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getTeamVoteResults()
      .then(res => {
        if (!isMounted) return;
        setTeams(res.result?.teams ?? []);
        setLoadError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setLoadError(VOTE_MESSAGES.DEMODAY_RANKING_LOAD_ERROR);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const rankings = useMemo(
    () =>
      [...teams]
        .sort((a, b) => b.voteCount - a.voteCount)
        .map((team, index) => ({
          ...team,
          rank: index + 1,
        })),
    [teams],
  );

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-6 md:mb-10">
          현재 데모데이 아이디어 투표 순위
        </h1>
        {isLoading && (
          <p className="text-caption2-m md:text-body2-m text-gray-70 mt-6 text-center">
            {VOTE_MESSAGES.DEMODAY_RANKING_LOADING}
          </p>
        )}
        {!isLoading && loadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {loadError}
          </p>
        )}
        {!isLoading && !loadError && (
          <div className="flex w-full flex-col gap-y-4">
            {rankings.map(item => (
              <div key={item.teamId} className="flex items-center gap-4">
                <span className="text-body1-sb md:text-heading1-sb w-6 shrink-0 text-right text-purple-50">
                  {item.rank}
                </span>
                <Chip label={item.name} voteCount={item.voteCount} isSelected={item.isMyVote} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
