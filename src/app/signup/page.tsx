"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { setAuthCookie } from "@/app/actions/auth";
import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import DropDown from "@/components/common/DropDown";
import InputField from "@/components/common/InputField";
import Modal from "@/components/common/Modal";
import TabToggle from "@/components/common/TabToggle";
import { EMAIL_REGEX, ID_REGEX } from "@/constants/regex";
import { FIELDS, NAME_MAP, TABS, TEAM_OPTIONS } from "@/constants/signup";
import { SignupFormValues, signupSchema } from "@/constants/signupSchema";
import { setAccessToken } from "@/lib/apis/api";
import { postCheckDuplicateEmail, postCheckDuplicateId, postSignUp } from "@/lib/apis/auth";
import type { ApiResponse } from "@/types/common";

type CheckStatus = "idle" | "available" | "duplicate";

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("FE");
  const [team, setTeam] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCheckStatus, setIdCheckStatus] = useState<CheckStatus>("idle");
  const [emailCheckStatus, setEmailCheckStatus] = useState<CheckStatus>("idle");
  const [isIdChecking, setIsIdChecking] = useState(false);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const idValue = useWatch({ control, name: "id", defaultValue: "" });
  const emailValue = useWatch({ control, name: "email", defaultValue: "" });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTeam("");
    setName("");
    reset();
    setIdCheckStatus("idle");
    setEmailCheckStatus("idle");
  };

  const handleTeamChange = (value: string) => {
    setTeam(value);
    setName("");
    reset();
    setIdCheckStatus("idle");
    setEmailCheckStatus("idle");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    reset();
    setIdCheckStatus("idle");
    setEmailCheckStatus("idle");
  };

  const nameOptions = (NAME_MAP[team]?.[activeTab] ?? []).map(n => ({ label: n, value: n }));

  const handleCheckId = async () => {
    setIsIdChecking(true);
    try {
      const res = await postCheckDuplicateId({ username: idValue });
      setIdCheckStatus(res.success ? "available" : "duplicate");
    } catch {
      setIdCheckStatus("duplicate");
    } finally {
      setIsIdChecking(false);
    }
  };

  const handleCheckEmail = async () => {
    setIsEmailChecking(true);
    try {
      const res = await postCheckDuplicateEmail({ email: emailValue });
      setEmailCheckStatus(res.success ? "available" : "duplicate");
    } catch {
      setEmailCheckStatus("duplicate");
    } finally {
      setIsEmailChecking(false);
    }
  };

  const getCheckErrorMessage = (key: string) => {
    if (key === "id" && idCheckStatus === "duplicate") return "이미 사용 중인 아이디입니다.";
    if (key === "email" && emailCheckStatus === "duplicate") return "이미 사용 중인 이메일입니다.";
    return errors[key as keyof SignupFormValues]?.message;
  };

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await postSignUp({
        part: activeTab,
        team,
        name,
        username: data.id,
        email: data.email,
        password: data.password,
      });
      if (res.result?.accessToken) {
        setAccessToken(res.result.accessToken);
        await setAuthCookie(res.result.accessToken);
      }
      setIsModalOpen(true);
    } catch (err) {
      if (err instanceof Error && "response" in err) {
        const body = (await (err as Error & { response: Response }).response.json()) as ApiResponse;
        setSubmitError(body.message ?? "회원가입에 실패했습니다.");
      } else {
        setSubmitError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormReady =
    !!team &&
    !!name &&
    isValid &&
    idCheckStatus === "available" &&
    emailCheckStatus === "available";

  return (
    <div>
      {isModalOpen && (
        <Modal
          buttons="single"
          title="회원가입이 완료되었습니다."
          description="환영합니다! 로그인 후 투표를 진행해보세요."
          rightLabel="로그인하러 가기"
          onConfirm={() => router.push("/login")}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 pb-8">SIGNUP</h1>
      <div className="flex flex-col gap-3 pb-3">
        <h3 className="md:text-body2-m text-caption2-m text-black">파트 *</h3>
        <TabToggle tabs={TABS} value={activeTab} onChange={handleTabChange} />
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 flex-col gap-3">
          <h3 className="md:text-body2-m text-caption2-m text-black">팀명 *</h3>
          <DropDown
            options={TEAM_OPTIONS}
            value={team}
            onChange={handleTeamChange}
            placeholder="팀명"
          />
        </div>
        <div className="relative flex flex-1 flex-col gap-3">
          <h3 className="md:text-body2-m text-caption2-m text-black">이름 *</h3>
          <DropDown
            options={nameOptions}
            value={name}
            onChange={handleNameChange}
            placeholder="이름"
            disabled={!team}
          />
          {!team && (
            <p className="text-caption2-m text-gray-70 absolute top-full mt-1.5 w-full text-center">
              팀명을 먼저 선택해주세요
            </p>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 pt-10 pb-12">
          {FIELDS.map(({ key, label, placeholder, type }) => {
            const hasCheckButton = key === "id" || key === "email";
            const checkStatus = key === "id" ? idCheckStatus : emailCheckStatus;
            const isChecking = key === "id" ? isIdChecking : isEmailChecking;
            const isCheckDisabled =
              key === "id"
                ? !ID_REGEX.test(idValue) || isIdChecking
                : !EMAIL_REGEX.test(emailValue) || isEmailChecking;
            return (
              <div key={key} className="flex flex-row items-center justify-between">
                <label
                  htmlFor={`signup-${key}`}
                  className="md:text-body2-m text-caption2-m w-20 text-black"
                >
                  {label}
                </label>
                <div className="relative flex-1">
                  <InputField
                    id={`signup-${key}`}
                    type={type}
                    placeholder={placeholder}
                    errorMessage={getCheckErrorMessage(key)}
                    className={hasCheckButton ? "pr-24" : undefined}
                    {...register(key as keyof SignupFormValues, {
                      onChange: () => {
                        if (key === "id") setIdCheckStatus("idle");
                        if (key === "email") setEmailCheckStatus("idle");
                      },
                    })}
                  />
                  {hasCheckButton && checkStatus === "available" && (
                    <p className="text-caption2-m md:text-body2-m absolute top-full mt-1 text-green-500">
                      사용 가능합니다.
                    </p>
                  )}
                  {hasCheckButton && (
                    <div className="absolute top-[45%] right-0 -translate-y-1/2">
                      <Button
                        variant="check"
                        disabled={isCheckDisabled}
                        onClick={key === "id" ? handleCheckId : handleCheckEmail}
                      >
                        {isChecking ? "확인 중..." : "중복 확인"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {submitError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 pb-3 text-center">
            {submitError}
          </p>
        )}
        <CTA label="가입하기" disabled={!isFormReady || isSubmitting} />
      </form>
    </div>
  );
};

export default Page;
