import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="text-heading1-sb text-purple-60 md:text-[32px]">404</h1>
      <p className="text-heading1-sb text-gray-90 md:text-[28px]">페이지를 찾을 수 없어요</p>
      <p className="text-body1-m md:text-heading2-m text-gray-60">
        주소가 잘못되었거나 삭제된 페이지예요
      </p>
      <Link
        href="/"
        className="rounded-50 text-body1-sb md:text-heading2-sb hover:bg-purple-40 mt-2 cursor-pointer bg-purple-50 px-6 py-3 text-center text-white transition-colors md:mt-4"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default page;
