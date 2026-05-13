import Link from "next/link";

import CTA from "@/components/common/CTA";
import InputField from "@/components/common/InputField";

const page = () => {
  return (
    <div>
      <p className="text-body1-sb md:text-heading1-sb text-purple-60">LOGIN</p>
      <div className="flex flex-col gap-8 pt-8 pb-15">
        <div className="flex flex-row items-center justify-between">
          <span className="text-body2-m md:text-heading2-m w-30">아이디</span>
          <InputField placeholder="아이디를 입력해주세요" />
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-body2-m md:text-heading2-m w-30">비밀번호</span>
          <InputField placeholder="비밀번호를 입력해주세요" />
        </div>
      </div>
      <CTA label="로그인하기" />
      <Link
        href="/signup"
        className="text-gray-80 hover:text-gray-70 text-caption1-sb md:text-body1-sb block cursor-pointer pt-4 text-center"
      >
        계정이 없다면 회원가입하러 가기 →
      </Link>
    </div>
  );
};

export default page;
