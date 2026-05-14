"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Chip from "@/components/common/Chip";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";
import BackgroundGraphic from "@/components/home/BackgroundGraphic";
import { VOTE_CATEGORIES } from "@/constants/home";

const Page = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <BackgroundGraphic />
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[40px] font-semibold text-black md:text-[50px] md:leading-[135%] md:font-semibold md:tracking-[-0.8px]">
          🏆<span className="text-purple-60">2026</span> CEOS
          <br />
          23RD AWARDS
        </h1>
        <Chip label="투표 분야" />
        <div className="text-body2-sm md:text-heading2-m flex flex-col gap-3 pb-30 text-left">
          {VOTE_CATEGORIES.map(category => (
            <p key={category}># {category}</p>
          ))}
        </div>
        <CTA
          label="투표하러 가기"
          onClick={() => {
            if (document.cookie.split(";").some(c => c.trim().startsWith("accessToken="))) {
              router.push("/vote");
            } else {
              setModalOpen(true);
            }
          }}
        />
      </div>
      <p className="text-gray-80 text-body2-m md:text-heading2-m pt-3 text-center">
        현재 총 20건의 투표가 진행되었어요!
      </p>
      {modalOpen && (
        <Modal
          buttons="double"
          title="로그인하시겠습니까?"
          description="로그인이 필요한 서비스입니다."
          onConfirm={() => router.push("/login")}
          onCancel={() => setModalOpen(false)}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Page;
