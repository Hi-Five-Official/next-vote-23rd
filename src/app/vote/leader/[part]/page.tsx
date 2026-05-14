"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";
import { LEADER_CONFIGS, type LeaderPart, STORAGE_KEY } from "@/constants/vote";

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const part = params.part as LeaderPart;
  const voteConfig = LEADER_CONFIGS[part];

  const [selectedMember, setSelectedMember] = useState<string>(
    () => sessionStorage.getItem(STORAGE_KEY.LEADER(part)) ?? "",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(
    () => !!sessionStorage.getItem(STORAGE_KEY.LEADER(part)),
  );

  const isVoteEnabled = selectedMember !== "";

  const handleVoteClick = () => {
    if (!selectedMember) return;
    setIsModalOpen(true);
  };

  const handleCancelVote = () => {
    setIsModalOpen(false);
  };

  const handleConfirmVote = () => {
    sessionStorage.setItem(STORAGE_KEY.LEADER(part), selectedMember);
    //세션스토리지에 저장 및 API 연동 시 수정
    setHasVoted(true);
    setIsModalOpen(false);
  };

  const handleRankingClick = () => {
    router.push(`/vote/leader/${part}/ranking`);
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">
          {voteConfig.title}
        </h1>
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2 md:mt-3 md:gap-x-3 md:gap-y-3">
          {voteConfig.members.map(member => (
            <Button
              key={member.name}
              isSelected={selectedMember === member.name}
              onClick={() => {
                if (hasVoted) return;
                setSelectedMember(member.name);
              }}
            >
              {member.name}
            </Button>
          ))}
        </div>
        {!hasVoted && (
          <div className="mt-10 md:mt-14">
            <CTA label="투표하기" disabled={!isVoteEnabled} onClick={handleVoteClick} />
          </div>
        )}
        <button
          type="button"
          onClick={handleRankingClick}
          className="text-caption2-m md:text-body2-m text-gray-80 hover:text-gray-70 mt-6 cursor-pointer"
        >
          현재 투표 순위 보러 가기 →
        </button>
        {isModalOpen && (
          <Modal
            buttons="double"
            title="투표는 분야별 1회만 가능하며, 제출 후에는 수정이 어렵습니다."
            description="투표하시겠습니까?"
            leftLabel="아니오"
            rightLabel="예"
            onCancel={handleCancelVote}
            onClose={handleCancelVote}
            onConfirm={handleConfirmVote}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
