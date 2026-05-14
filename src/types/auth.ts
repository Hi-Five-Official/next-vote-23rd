import type { ApiResponse } from "@/types/common";

type RefreshTokenResult = {
  accessToken: string;
};

// 토큰 재발급 response
export type RefreshTokenResponse = ApiResponse<RefreshTokenResult>;

// 로그인 request
export type LoginRequest = {
  username: string;
  password: string;
};

// 로그인 response
export type LoginResponse = ApiResponse<{
  accessToken: string;
  userId: number;
}>;

// 로그아웃 response
export type LogoutResponse = ApiResponse;

// 회원가입 request
export type SignUpRequest = {
  part: string;
  team: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

// 회원가입 response
export type SignUpResponse = ApiResponse<{ accessToken: string }>;

// 아이디 중복 확인 request
export type CheckDuplicateIdRequest = {
  username: string;
};

// 아이디 중복 확인 response
export type CheckDuplicateIdResponse = ApiResponse;

// 이메일 중복 확인 request
export type CheckDuplicateEmailRequest = {
  email: string;
};

// 이메일 중복 확인 response
export type CheckDuplicateEmailResponse = ApiResponse;
