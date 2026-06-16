"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Chip from "@/components/common/Chip";
import {
  isLeaderPart,
  LEADER_CONFIGS,
  LEADER_PART_TO_API_PART,
  VOTE_MESSAGES,
} from "@/constants/vote";
import { getCandidateVoteResults } from "@/lib/apis/vote";
import type { CandidateVoteResult } from "@/types/vote";

const Page = () => {
  const params = useParams<{ part: string }>();

  if (!isLeaderPart(params.part)) notFound();

  const part = params.part;
  const apiPart = LEADER_PART_TO_API_PART[part];
  const rankingConfig = LEADER_CONFIGS[part];

  const [candidates, setCandidates] = useState<CandidateVoteResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getCandidateVoteResults(apiPart)
      .then(res => {
        if (!isMounted) return;
        if (!res.success) {
          setCandidates([]);
          setLoadError(res.message ?? VOTE_MESSAGES.LEADER_RANKING_LOAD_ERROR);
          return;
        }

        setCandidates(res.result?.candidates ?? []);
        setLoadError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setCandidates([]);
        setLoadError(VOTE_MESSAGES.LEADER_RANKING_LOAD_ERROR);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apiPart]);

  const rankings = useMemo(
    () =>
      [...candidates]
        .sort((a, b) => b.voteCount - a.voteCount)
        .map((candidate, index) => ({
          ...candidate,
          rank: index + 1,
        })),
    [candidates],
  );

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-6 md:mb-10">
          {rankingConfig.rankingTitle}
        </h1>
        {isLoading && (
          <p className="text-caption2-m md:text-body2-m text-gray-70 mt-6 text-center">
            {VOTE_MESSAGES.LEADER_RANKING_LOADING}
          </p>
        )}
        {!isLoading && loadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {loadError}
          </p>
        )}
        {!isLoading && !loadError && (
          <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:justify-items-center md:gap-y-4">
            {rankings.map(item => (
              <div key={item.candidateId} className="flex items-center gap-4">
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
