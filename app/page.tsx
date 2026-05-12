"use client";

import { useState } from "react";

import CTA from "@/app/components/common/CTA";
import Modal from "@/app/components/common/Modal";

const Page = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-heading1-sb text-black md:text-[40px] md:leading-[135%] md:font-semibold md:tracking-[-0.8px]">
        🏆<span className="text-purple-60">2026</span> CEOS <br />
        23RD AWARDS
      </h1>
      <CTA label="confirm 모달" onClick={() => setConfirmOpen(true)} />
      <CTA label="alert 모달" onClick={() => setAlertOpen(true)} />

      {confirmOpen && (
        <Modal
          buttons="double"
          title="투표하시겠습니까?"
          description="분야별 1회만 가능하며, 제출 후에는 수정이 어렵습니다."
          leftLabel="아니오"
          rightLabel="예"
          onClose={() => setConfirmOpen(false)}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => setConfirmOpen(false)}
        />
      )}
      {alertOpen && (
        <Modal
          buttons="single"
          title="회원가입이 완료되었습니다."
          description="CEOS 투표에 참여해보세요!"
          rightLabel="확인"
          onClose={() => setAlertOpen(false)}
          onConfirm={() => setAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default Page;
