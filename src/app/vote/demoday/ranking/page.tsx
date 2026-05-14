"use client";

import { useState } from "react";

import Chip from "@/components/common/Chip";
import { demoVoteRankings } from "@/data/members";

const Page = () => {
  const [selectedMember] = useState<string | null>(() =>
    sessionStorage.getItem("selected-demoday"),
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
        <h1 className="text-body1-sb md:text-heading1-sb mb-5 text-purple-50 md:mb-10">
          현재 데모데이 아이디어 투표 순위
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
