"use client";

import { type ReactNode, useState } from "react";

import CTA from "@/components/common/CTA";
import DropDown from "@/components/common/DropDown";
import InputField from "@/components/common/InputField";
import TabToggle from "@/components/common/TabToggle";

const TABS = [
  { label: "Front-end", value: "FE" },
  { label: "Back-end", value: "BE" },
];

const FIELDS: { key: string; label: ReactNode; placeholder: string }[] = [
  { key: "id", label: "아이디 *", placeholder: "6~20자 내로 입력해주세요" },
  { key: "email", label: "이메일 *", placeholder: "이메일을 입력해주세요" },
  { key: "password", label: "비밀번호 *", placeholder: "비밀번호를 입력해주세요" },
  {
    key: "passwordConfirm",
    label: (
      <>
        비밀번호 <br /> 재입력 *
      </>
    ),
    placeholder: "비밀번호를 재입력해주세요",
  },
];

const TEAM_OPTIONS = [
  { label: "JobDri", value: "JOBDRI" },
  { label: "IPX", value: "IPX" },
  { label: "CONX", value: "CONX" },
  { label: "Groupeat", value: "GROUPEAT" },
  { label: "Ditda", value: "DITDA" },
];

const NAME_MAP: Record<string, Record<string, string[]>> = {
  DITDA: { FE: ["박유민", "권오진"], BE: ["임종훈", "안준석"] },
  JOBDRI: { FE: ["이윤서", "구민교"], BE: ["황신애", "최우혁"] },
  GROUPEAT: { FE: ["이승연", "황영준"], BE: ["김동욱", "최승원"] },
  IPX: { FE: ["남기림", "김민서"], BE: ["오지송", "김태익"] },
  CONX: { FE: ["김홍엽", "오유진"], BE: ["김태희", "김도현"] },
};

const Page = () => {
  const [activeTab, setActiveTab] = useState("FE");
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [fields, setFields] = useState({ id: "", email: "", password: "", passwordConfirm: "" });

  const nameOptions = (NAME_MAP[team]?.[activeTab] ?? []).map(n => ({ label: n, value: n }));

  const isFormValid = !!team && !!name && Object.values(fields).every(v => v.trim() !== "");

  return (
    <div>
      <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 pb-8">SIGNUP</h1>
      <div className="flex flex-col gap-3 pb-6">
        <h3 className="md:text-body2-m text-caption2-m text-black">파트 *</h3>
        <TabToggle tabs={TABS} value={activeTab} onChange={setActiveTab} />
      </div>
      <div className="flex flex-row gap-3 md:justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="md:text-body2-m text-caption2-m text-black">팀명 *</h3>
          <DropDown options={TEAM_OPTIONS} value={team} onChange={setTeam} placeholder="팀명" />
        </div>
        <div className="relative flex flex-col gap-3">
          <h3 className="md:text-body2-m text-caption2-m text-black">이름 *</h3>
          <DropDown
            options={nameOptions}
            value={name}
            onChange={setName}
            placeholder="이름"
            disabled={!team}
          />
          {!team && (
            <p className="text-caption2-m absolute top-full mt-1.5 w-full text-center text-gray-50">
              팀명을 먼저 선택해주세요
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10 pt-10 pb-12">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="flex flex-row items-center justify-between">
            <h3 className="md:text-body2-m text-caption2-m w-30 text-black">{label}</h3>
            <InputField
              placeholder={placeholder}
              value={fields[key as keyof typeof fields]}
              onChange={e => setFields(prev => ({ ...prev, [key]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <CTA label="가입하기" disabled={!isFormValid} />
    </div>
  );
};

export default Page;
