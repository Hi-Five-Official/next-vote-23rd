"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-body1-sb md:text-heading1-sb mb-5 text-purple-50 md:mb-10">VOTE</h1>
      <div>
        <div className="text-caption1-sb md:text-body1-sb mb-3 md:mb-6">파트장 투표</div>
        <div className="grid grid-cols-1 gap-3">
          <Button onClick={() => router.push("/vote/leader/frontend")}>프론트엔드 파트장</Button>
          <Button onClick={() => router.push("/vote/leader/backend")}>백엔드 파트장</Button>
        </div>
      </div>

      <div className="mt-5 md:mt-10">
        <div className="text-caption1-sb md:text-body1-sb mb-3 md:mb-6">데모데이 투표</div>
        <Button onClick={() => router.push("/vote/demoday")}>데모데이</Button>
      </div>
    </div>
  );
};

export default Page;
