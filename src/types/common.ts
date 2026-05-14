import type { ErrorCode } from "@/types/errorCode";

export type ApiResponse<T = null> = {
  success: boolean;
  code: ErrorCode;
  message: string;
  result?: T | null;
  error?: Record<string, unknown> | null;
  timestamp: string;
};
