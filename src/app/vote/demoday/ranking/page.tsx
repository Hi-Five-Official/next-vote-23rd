"use client";

import { useState } from "react";

import Chip from "@/components/common/Chip";
import { STORAGE_KEY } from "@/constants/vote";
import { demoVoteRankings } from "@/data/members";

const Page = () => {
  const [selectedMember] = useState<string | null>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY.DEMODAY) : null,
  );

  const updatedRankings = demoVoteRankings
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
          현재 데모데이 아이디어 투표 순위
        </h1>
        <div className="flex w-full flex-col gap-y-4">
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
