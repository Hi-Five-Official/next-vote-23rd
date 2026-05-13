import { type ReactNode } from "react";

export const TABS = [
  { label: "Front-end", value: "FE" },
  { label: "Back-end", value: "BE" },
];

export const FIELDS: { key: string; label: ReactNode; placeholder: string }[] = [
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

export const TEAM_OPTIONS = [
  { label: "JobDri", value: "JOBDRI" },
  { label: "IPX", value: "IPX" },
  { label: "CONX", value: "CONX" },
  { label: "Groupeat", value: "GROUPEAT" },
  { label: "Ditda", value: "DITDA" },
];

export const NAME_MAP: Record<string, Record<string, string[]>> = {
  DITDA: { FE: ["박유민", "권오진"], BE: ["임종훈", "안준석"] },
  JOBDRI: { FE: ["이윤서", "구민교"], BE: ["황신애", "최우혁"] },
  GROUPEAT: { FE: ["이승연", "황영준"], BE: ["김동욱", "최승원"] },
  IPX: { FE: ["남기림", "김민서"], BE: ["오지송", "김태익"] },
  CONX: { FE: ["김홍엽", "오유진"], BE: ["김태희", "김도현"] },
};
