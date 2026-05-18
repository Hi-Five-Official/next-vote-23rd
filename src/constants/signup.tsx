import { type ReactNode } from "react";

export const TABS = [
  { label: "Front-end", value: "FE" },
  { label: "Back-end", value: "BE" },
];

export const FIELDS: { key: string; label: ReactNode; placeholder: string; type?: string }[] = [
  { key: "id", label: "아이디 *", placeholder: "6~20자 내로 입력해주세요" },
  { key: "email", label: "이메일 *", placeholder: "이메일을 입력해주세요", type: "email" },
  {
    key: "password",
    label: "비밀번호 *",
    placeholder: "비밀번호를 입력해주세요",
    type: "password",
  },
  {
    key: "passwordConfirm",
    label: (
      <>
        비밀번호 <br /> 재입력 *
      </>
    ),
    placeholder: "비밀번호를 재입력해주세요",
    type: "password",
  },
];
