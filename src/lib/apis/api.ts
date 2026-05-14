import ky from "ky";

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const refreshAccessToken = async (): Promise<string> => {
  const response = await ky
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
      credentials: "include",
    })
    .json<{ result: { accessToken: string } }>();

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
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async ({ request, response, retryCount }) => {
        if (response.status !== 401 || retryCount > 0) return;

        const body = (await response.clone().json()) as { code?: string };
        if (body.code !== "AUTH_401_04") return;

        try {
          const newToken = await refreshAccessToken();
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
