import api from "@/lib/apis/api";
import type {
  CheckDuplicateEmailRequest,
  CheckDuplicateEmailResponse,
  CheckDuplicateIdRequest,
  CheckDuplicateIdResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";

// 로그인
export const postLogin = async (body: LoginRequest): Promise<LoginResponse> => {
  return (await api.post("api/v1/auth/login", { json: body }).json()) as LoginResponse;
};

// 로그아웃
export const postLogout = async (): Promise<LogoutResponse> => {
  return (await api.post("api/v1/auth/logout").json()) as LogoutResponse;
};

// 회원가입
export const postSignUp = async (body: SignUpRequest): Promise<SignUpResponse> => {
  return (await api.post("api/v1/auth/signup", { json: body }).json()) as SignUpResponse;
};

// 아이디 중복 확인
export const postCheckDuplicateId = async ({
  username,
}: CheckDuplicateIdRequest): Promise<CheckDuplicateIdResponse> => {
  return (await api
    .post("api/v1/auth/check-username", { json: { username } })
    .json()) as CheckDuplicateIdResponse;
};

// 이메일 중복 확인
export const postCheckDuplicateEmail = async ({
  email,
}: CheckDuplicateEmailRequest): Promise<CheckDuplicateEmailResponse> => {
  return (await api
    .post("api/v1/auth/check-email", { json: { email } })
    .json()) as CheckDuplicateEmailResponse;
};
