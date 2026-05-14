import ky from "ky";

import type { RefreshTokenResponse } from "@/types/auth";
import { ERROR_CODE } from "@/types/errorCode";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

// 토큰 재발급
const postRefreshToken = async (): Promise<string> => {
  const response = (await ky
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
      credentials: "include",
    })
    .json()) as RefreshTokenResponse;

  if (!response.result) throw new Error(response.message);

  setAccessToken(response.result.accessToken);
  return response.result.accessToken;
};

const api = ky.create({
  prefix: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = getAccessToken() ?? localStorage.getItem("accessToken");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async ({ request, response, retryCount }) => {
        if (response.status !== 401 || retryCount > 0) return;

        const body = (await response.clone().json()) as { code?: string };
        if (body.code !== ERROR_CODE.AUTH_401_04) return;

        try {
          const newToken = await postRefreshToken();
          const headers = new Headers(request.headers);
          headers.set("Authorization", `Bearer ${newToken}`);
          return ky.retry({ request: new Request(request, { headers }) });
        } catch {
          setAccessToken(null);
        }
      },
    ],
  },
});

export default api;
