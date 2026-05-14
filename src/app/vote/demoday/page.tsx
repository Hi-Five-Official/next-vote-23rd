"use client";
import { idea } from "@/data/members";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";

const Page = () => {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const savedSelectedMember = sessionStorage.getItem("selected-demoday");

    if (savedSelectedMember) {
      setSelectedMember(savedSelectedMember);
      setHasVoted(true);
    }
  }, []);

  const isVoteEnabled = selectedMember !== "";

  const handleVoteClick = () => {
    if (!selectedMember) return;
    setIsModalOpen(true);
  };

  const handleCancelVote = () => {
    setIsModalOpen(false);
  };

  const handleConfirmVote = () => {
    sessionStorage.setItem("selected-demoday", selectedMember);

    setHasVoted(true);
    setIsModalOpen(false);
  };

  const handleRankingClick = () => {
    router.push("/vote/demoday/ranking");
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb mb-5 text-purple-50 md:mb-10">
          23RD CEOS PROJECT
        </h1>

        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2 md:mt-3 md:gap-x-3 md:gap-y-3">
          {idea.map(member => (
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
          className="text-caption2-m md:text-body2-m mt-3 cursor-pointer"
        >
          현재 투표 순위 보러 가기
        </button>
      </div>

      {isModalOpen && (
        <Modal
          buttons="double"
          title={`투표는 분야별 1회만 가능하며, 제출 후에는 수정이 어렵습니다.`}
          description="투표하시겠습니까?"
          leftLabel="아니오"
          rightLabel="예"
          onCancel={handleCancelVote}
          onClose={handleCancelVote}
          onConfirm={handleConfirmVote}
        />
      )}
    </div>
  );
};

export default Page;
