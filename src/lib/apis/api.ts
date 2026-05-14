import ky from "ky";

import { getAccessToken, postRefreshToken, setAccessToken } from "@/lib/apis/auth";

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
        const token = getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async ({ request, response, retryCount }) => {
        if (response.status !== 401 || retryCount > 0) return;

        const body = (await response.clone().json()) as { code?: string };
        if (body.code !== "AUTH_401_04") return;

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
