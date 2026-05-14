"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Chip from "@/components/common/Chip";
import { backendVoteRankings, frontendVoteRankings } from "@/data/members";

const rankingConfigs = {
  frontend: {
    title: "현재 프론트엔드 파트장 투표 순위",
    rankings: frontendVoteRankings,
  },
  backend: {
    title: "현재 백엔드 파트장 투표 순위",
    rankings: backendVoteRankings,
  },
} as const;

type LeaderPart = keyof typeof rankingConfigs;

const Page = () => {
  const params = useParams();

  const part = params.part as LeaderPart;
  const rankingConfig = rankingConfigs[part];

  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  useEffect(() => {
    if (!part) return;

    const savedSelectedMember = sessionStorage.getItem(`selected-leader-${part}`);

    setSelectedMember(savedSelectedMember);
  }, [part]);

  const updatedRankings = rankingConfig.rankings
    .map(item => ({
      ...item,
      voteCount: item.label === selectedMember ? item.voteCount + 1 : item.voteCount,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb mb-5 text-purple-50 md:mb-10">
          {rankingConfig.title}
        </h1>

        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-3 md:gap-x-8 md:gap-y-6">
          {updatedRankings.map(item => (
            <div key={item.label} className="flex min-w-max items-center gap-1">
              <span className="text-body1-sb md:text-heading1-sb w-8 text-right text-purple-50">
                {item.rank}
              </span>

              <div className="[&_span:first-child]:mr-2">
                <Chip
                  label={item.label}
                  voteCount={item.voteCount}
                  isSelected={selectedMember === item.label}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
