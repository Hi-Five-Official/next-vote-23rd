"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { setAuthCookie } from "@/app/actions/auth";
import CTA from "@/components/common/CTA";
import { dispatchAuthChange } from "@/components/common/Header";
import InputField from "@/components/common/InputField";
import Modal from "@/components/common/Modal";
import { LoginFormValues, loginSchema } from "@/constants/loginSchema";
import { postLogin } from "@/lib/apis/auth";

const Page = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const usernameValue = useWatch({ control, name: "username", defaultValue: "" });
  const passwordValue = useWatch({ control, name: "password", defaultValue: "" });

  const hasValues = usernameValue.trim() !== "" && passwordValue.trim() !== "";

  const onSubmit = async (data: LoginFormValues) => {
    setLoginError(null);
    setIsLoginFailed(false);
    try {
      const res = await postLogin({ username: data.username, password: data.password });
      if (!res.success || !res.result?.accessToken) {
        setLoginError(res.message ?? "아이디 또는 비밀번호를 확인해주세요.");
        return;
      }
      localStorage.setItem("accessToken", res.result.accessToken);
      await setAuthCookie(res.result.accessToken);
      dispatchAuthChange();
      setIsModalOpen(true);
    } catch {
      setLoginError("아이디 또는 비밀번호를 확인해주세요.");
      setIsLoginFailed(true);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          buttons="single"
          title="로그인에 성공했습니다!"
          description="서비스를 이용해보세요!"
          rightLabel="홈으로 가기"
          onConfirm={() => router.push("/")}
          onClose={() => router.push("/")}
        />
      )}
      <h1 className="text-body1-sb md:text-heading1-sb text-purple-60">LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 pt-8 pb-15">
          <div className="flex flex-row items-center justify-between">
            <label htmlFor="login-id" className="text-body2-m md:text-heading2-m w-30">
              아이디
            </label>
            <div className="relative flex-1">
              <InputField
                id="login-id"
                placeholder="아이디를 입력해주세요"
                errorMessage={errors.username?.message}
                {...register("username", {
                  onChange: () => {
                    setIsLoginFailed(false);
                    setLoginError(null);
                  },
                })}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label htmlFor="login-password" className="text-body2-m md:text-heading2-m w-30">
              비밀번호
            </label>
            <div className="relative flex-1">
              <InputField
                id="login-password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                errorMessage={errors.password?.message}
                {...register("password", {
                  onChange: () => {
                    setIsLoginFailed(false);
                    setLoginError(null);
                  },
                })}
              />
              {loginError && (
                <p className="text-caption2-m md:text-body2-m text-point-1 absolute top-full mt-1">
                  {loginError}
                </p>
              )}
            </div>
          </div>
        </div>
        <CTA label="로그인하기" disabled={!hasValues || isSubmitting || isLoginFailed} />
      </form>
      <Link
        href="/signup"
        className="text-gray-80 hover:text-gray-70 text-caption1-sb md:text-body1-sb block cursor-pointer pt-4 text-center"
      >
        계정이 없다면 회원가입하러 가기 →
      </Link>
    </div>
  );
};

export default Page;
