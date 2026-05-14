export type ApiResponse<T = null> = {
  success: boolean;
  code: string;
  message: string;
  result?: T | null;
  error?: Record<string, unknown> | null;
  timestamp: string;
};
