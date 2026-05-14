import ky from "ky";

import type { RefreshTokenResponse } from "@/types/auth";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// 토큰 재발급
export const postRefreshToken = async (): Promise<string> => {
  const response = (await ky
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
      credentials: "include",
    })
    .json()) as RefreshTokenResponse;

  if (!response.result) throw new Error(response.message);

  setAccessToken(response.result.accessToken);
  return response.result.accessToken;
};

// 로그인
export const postLogin = async () => {};

// 로그아웃
export const postLogout = async () => {};

// 회원가입
export const postSignUp = async () => {};

// 아이디 중복 확인
export const getCheckDuplicateId = async () => {};

// 이메일 중복 확인
export const getCheckDuplicateEmail = async () => {};
