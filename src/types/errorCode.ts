export const ERROR_CODE = {
  // 인증 에러
  AUTH_401_01: "AUTH_401_01",
  AUTH_401_02: "AUTH_401_02",
  AUTH_401_03: "AUTH_401_03",
  AUTH_401_04: "AUTH_401_04",
  AUTH_403_01: "AUTH_403_01",

  // 요청/파라미터 에러
  REQ_400_01: "REQ_400_01",
  REQ_400_02: "REQ_400_02",
  REQ_400_03: "REQ_400_03",
  REQ_415_01: "REQ_415_01",
  REQ_409_01: "REQ_409_01",
  REQ_404_02: "REQ_404_02",

  // API/라우팅 에러
  API_404_01: "API_404_01",
  API_405_01: "API_405_01",

  // 서버 내부 에러
  SERVER_500_01: "SERVER_500_01",
  SERVER_503_01: "SERVER_503_01",
  SERVER_504_01: "SERVER_504_01",
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
