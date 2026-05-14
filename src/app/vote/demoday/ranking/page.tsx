"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Chip from "@/components/common/Chip";
import { demoVoteRankings } from "@/data/members";

const DemodayRankingContent = () => {
  const searchParams = useSearchParams();
  const selectedItem = searchParams.get("selected");

  const updatedRankings = demoVoteRankings
    .map(item => ({
      ...item,
      voteCount: item.label === selectedItem ? item.voteCount + 1 : item.voteCount,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-2">
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb mb-2 text-purple-50 md:mb-3">
          현재 데모데이 아이디어 투표 순위
        </h1>

        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3 md:gap-x-8">
          {updatedRankings.map(item => (
            <div key={item.label} className="flex min-w-max items-center gap-3">
              <span className="text-body1-sb md:text-heading1-sb w-8 text-right text-purple-50">
                {item.rank}
              </span>

              <Chip
                label={item.label}
                voteCount={item.voteCount}
                isSelected={selectedItem === item.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={null}>
      <DemodayRankingContent />
    </Suspense>
  );
};

export default page;
