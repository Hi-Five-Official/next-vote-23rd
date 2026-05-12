import HomeCircle from "@/app/assets/home/home_circle.svg";
import HomeDiamond from "@/app/assets/home/home_diamond.svg";
import HomeFlower from "@/app/assets/home/home_flower.svg";
import Chip from "@/app/components/common/Chip";
import CTA from "@/app/components/common/CTA";

const page = () => {
  return (
    <div>
      <HomeFlower
        aria-hidden="true"
        className="pointer-events-none absolute md:-top-10 md:-left-95 md:h-225 md:w-205"
      />
      <HomeDiamond
        aria-hidden="true"
        className="pointer-events-none absolute md:-top-25 md:-right-50 md:h-155 md:w-180"
      />
      <HomeCircle
        aria-hidden="true"
        className="pointer-events-none absolute md:-bottom-55 md:left-3/5 md:h-122 md:w-122 md:-translate-x-1/2"
      />
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[40px] font-semibold text-black md:text-[50px] md:leading-[135%] md:font-semibold md:tracking-[-0.8px]">
          🏆<span className="text-purple-60">2026</span> CEOS
          <br />
          23RD AWARDS
        </h1>
        <Chip label="투표 분야" />
        <div className="text-body2-sm md:text-heading2-m flex flex-col gap-3 pb-30 text-left">
          <p># 프론트엔드 파트장 투표</p>
          <p># 백엔드 파트장 투표</p>
          <p># 데모데이 파트장 투표</p>
        </div>
        <CTA label="투표하러 가기" />
      </div>
      <p className="text-gray-80 text-body2-m md:text-heading2-m pt-3 text-center">
        현재 총 20건의 투표가 진행되었어요!
      </p>
    </div>
  );
};

export default page;
