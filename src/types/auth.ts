import type { ApiResponse } from "@/types/common";

type RefreshTokenResult = {
  accessToken: string;
};

// 토큰 재발급 response
export type RefreshTokenResponse = ApiResponse<RefreshTokenResult>;
