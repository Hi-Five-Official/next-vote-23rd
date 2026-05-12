import CTA from "@/app/components/common/CTA";

const page = () => {
  return (
    <div>
      <h1 className="text-heading1-sb text-black md:text-[40px] md:leading-[135%] md:font-semibold md:tracking-[-0.8px]">
        🏆<span className="text-purple-60">2026</span> CEOS <br />
        23RD AWARDS
      </h1>
      <CTA label="투표하러 가기" />
    </div>
  );
};

export default page;
