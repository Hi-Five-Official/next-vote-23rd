import { HTTPError } from "ky";

import type { ApiResponse } from "@/types/common";

export const getHttpErrorMessage = async (
  err: unknown,
  defaultMessage: string,
): Promise<string> => {
  if (!(err instanceof HTTPError)) return defaultMessage;
  try {
    const body = (await err.response.json()) as ApiResponse;
    return body.message ?? defaultMessage;
  } catch {
    return defaultMessage;
  }
};
