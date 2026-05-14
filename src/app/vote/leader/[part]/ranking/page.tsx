"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import Chip from "@/components/common/Chip";
import { LEADER_CONFIGS, type LeaderPart, STORAGE_KEY } from "@/constants/vote";

const Page = () => {
  const params = useParams();

  const part = params.part as LeaderPart;
  const rankingConfig = LEADER_CONFIGS[part];

  const [selectedMember] = useState<string | null>(() =>
    sessionStorage.getItem(STORAGE_KEY.LEADER(part)),
  );

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
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-6 md:mb-10">
          {rankingConfig.rankingTitle}
        </h1>
        <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-2 md:justify-items-center md:gap-y-4">
          {updatedRankings.map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="text-body1-sb md:text-heading1-sb w-6 shrink-0 text-right text-purple-50">
                {item.rank}
              </span>
              <Chip
                label={item.label}
                voteCount={item.voteCount}
                isSelected={selectedMember === item.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
