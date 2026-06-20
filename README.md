# Ditda Vote <img src="src/app/icon.svg" alt="Ditda Vote" width="40" align="left" />

> CEOS 23기 7~9주차 프론트엔드·백엔드 협업 과제 **Next-Vote**의 프론트엔드 레포지토리입니다. <br />
> 회원가입·로그인부터 파트장·데모데이 투표, 실시간 순위 결과 확인까지 한 흐름으로 이어지는 투표 서비스를 구현했습니다.

🔗 [배포 링크](https://crossbizz.cloud/) &nbsp;|&nbsp; 🎨 [Figma](https://www.figma.com/design/axmymu1aC95PifVE4u7aQ6/Ditda-Vote?node-id=0-1&m=dev) &nbsp;|&nbsp; 📄 [API 명세서](https://documenter.getpostman.com/view/54737459/2sBXqNnyxC) &nbsp;|&nbsp; 📘 [Swagger UI](https://api.crossbizz.cloud/swagger-ui/index.html#/)

## ✨ 주요 기능

### 🔐 Onboarding

- 아이디·이메일 실시간 중복 확인을 포함한 단계별 회원가입 플로우
- JWT 기반 로그인 / 로그아웃 (Access Token 인메모리 관리 + Refresh Token 자동 갱신)
- 로그아웃 확인 모달로 실수 방지
- 미인증 상태로 보호된 페이지 접근 시 로그인 유도 모달

### 🗳 Vote

- **홈 화면** — 투표 분야 안내 및 실시간 총 투표 수 집계 표시
- **프론트엔드 파트장 투표** — FE 후보자 목록을 가나다순으로 정렬해 표시, 선택 후 제출
- **백엔드 파트장 투표** — BE 후보자 목록을 가나다순으로 정렬해 표시, 선택 후 제출
- **데모데이 투표** — 팀 목록 조회 및 투표
- 분야별 1회 투표 제한, 제출 확인 모달로 실수 투표 방지
- 투표 완료 후 실시간 순위 결과 페이지로 이동

### 👥 Members

- FE / BE 탭 전환으로 CEOS 23기 멤버 프로필(이름·소속 대학교) 카드 목록 조회
- 멤버 데이터 가나다순 정렬

### 🙌 Contributors

- 서비스를 개발한 Ditda 팀원의 GitHub 프로필 카드 목록
- 카드 클릭 시 팀원 GitHub 프로필로 이동

## 🛠️ 기술 스택

| 구분        | 기술                                                                                                                                                                                                                             | 선택 이유                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework   | <img src="https://img.shields.io/badge/Next.js 16-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" height="28"/>                                                                                                   | App Router 기반 페이지 구성. 개발 환경 Turbopack으로 빠른 HMR 확보. Next.js Middleware로 미인증 사용자 접근을 서버 사이드에서 일괄 차단    |
| Language    | <img src="https://img.shields.io/badge/TypeScript 5-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" height="28"/>                                                                                                | API 응답 타입을 정의해 런타임 오류 없는 안전한 데이터 처리. 복잡한 투표·후보자 타입을 명확한 인터페이스로 관리                             |
| Styling     | <img src="https://img.shields.io/badge/Tailwind CSS 4-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" height="28"/>                                                                                             | 별도 CSS 파일 없이 유틸리티 클래스로 디자인 반영. `clsx` + `tailwind-merge`를 묶은 `cn` 유틸로 조건부 클래스 충돌 방지                     |
| Form        | <img src="https://img.shields.io/badge/React Hook Form-EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" height="28"/> <img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge" height="28"/> | 아이디·이메일 중복 확인을 포함한 복잡한 회원가입 폼의 유효성 검사를 선언적으로 처리. Zod 스키마로 타입과 검증 로직을 한 곳에서 관리        |
| HTTP Client | <img src="https://img.shields.io/badge/ky-F7DF1E.svg?style=for-the-badge" height="28"/>                                                                                                                                          | `beforeRequest` / `afterResponse` 훅으로 토큰 주입·401 자동 갱신·리다이렉트를 인터셉터 한 곳에서 처리. fetch 기반이라 번들 오버헤드 최소화 |
| Compiler    | <img src="https://img.shields.io/badge/React Compiler-20232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB" height="28"/>                                                                                                  | 컴파일 타임 자동 메모이제이션으로 `useMemo`·`useCallback` 수동 작성 부담 제거                                                              |
| SVG         | <img src="https://img.shields.io/badge/SVGR-2E2E2E.svg?style=for-the-badge" height="28"/>                                                                                                                                        | SVG를 React 컴포넌트로 변환해 `className`으로 크기·색상 자유 제어. Turbopack rules에서 `*.svg` import 자동 처리                            |
| Linting     | <img src="https://img.shields.io/badge/ESLint 9-4B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white" height="28"/>                                                                                                        | `eslint-config-next`로 Next.js 이미지 최적화·Link 규칙 자동 검사. `simple-import-sort`로 import 순서 일관성 유지                           |
| Formatting  | <img src="https://img.shields.io/badge/Prettier 3-1A2B34.svg?style=for-the-badge&logo=prettier&logoColor=F7B93E" height="28"/>                                                                                                   | `prettier-plugin-tailwindcss`로 Tailwind 클래스 선언 순서를 권장 순서로 자동 정렬해 리뷰 노이즈 제거                                       |
| Git Hooks   | <img src="https://img.shields.io/badge/Husky-2E2E2E.svg?style=for-the-badge" height="28"/> <img src="https://img.shields.io/badge/lint--staged-4B5563.svg?style=for-the-badge" height="28"/>                                     | 전체 파일이 아닌 staged 파일에만 lint·format 실행해 커밋 속도 유지. 코드 품질 기준 자동 통일                                               |
| Package     | <img src="https://img.shields.io/badge/yarn-2C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" height="28"/>                                                                                                              | 안정적인 lockfile과 워크스페이스 지원으로 의존성 일관성 보장                                                                               |
| Deploy      | <img src="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" height="28"/>                                                                                                          | Next.js와 최적 통합. PR별 Preview URL 자동 생성으로 머지 전 실환경 검증 가능                                                               |

## 📁 디렉토리 구조

Next.js **App Router** 기반의 페이지 구성을 따릅니다.

```
src/
├── app/                        # Next.js App Router (라우트·레이아웃·메타데이터)
│   ├── actions/                # Server Actions (쿠키 삭제 등)
│   ├── login/                  # 로그인 페이지
│   ├── signup/                 # 회원가입 페이지
│   ├── vote/                   # 투표 홈
│   │   ├── [part]/             # 파트장 투표 (FE/BE)
│   │   │   └── ranking/        # 파트장 투표 결과
│   │   └── demoday/            # 데모데이 투표
│   │       └── ranking/        # 데모데이 투표 결과
│   ├── members/                # CEOS 멤버 목록
│   ├── contributors/           # Ditda 팀원 목록
│   └── layout.tsx / globals.css / not-found.tsx
├── components/                 # 재사용 가능한 순수 UI 컴포넌트
├── constants/                  # 라우트·폼 스키마·투표 카테고리 등 상수
├── lib/
│   ├── apis/                   # API 호출 함수 (auth, vote, candidate, team)
│   └── utils/                  # 유틸 함수 (cn, cookie, auth, error, sort)
├── types/                      # 전역 TypeScript 타입 정의
├── assets/                     # SVG 아이콘·그래픽
└── proxy.ts                    # Next.js Middleware 기반 인증 라우트 가드
```

## ⚡ 핵심 설계 포인트

**인증 & 토큰 관리**

- **Access Token 인메모리 저장** — `setAccessToken` / `getAccessToken`으로 메모리에서만 관리해 XSS 탈취 위험 최소화
- **자동 토큰 갱신** — ky `afterResponse` 훅에서 401 응답 시 Refresh Token으로 자동 재발급 후 원래 요청 재시도. 재발급 실패 또는 기타 401 오류 시 쿠키 삭제 후 로그인 페이지로 리다이렉트
- **미들웨어 라우트 가드** — `proxy.ts`에서 쿠키 기반으로 `/vote`, `/members` 접근을 서버 사이드에서 차단

**API 통신**

- `ky` 기반 HTTP 클라이언트로 인터셉터·타임아웃을 일관되게 처리
- `beforeRequest` 훅에서 인메모리 Access Token → 쿠키 Access Token 순으로 폴백하여 Authorization 헤더 자동 주입

**성능 최적화**

- **React Compiler** 활성화 — 컴파일 타임 자동 메모이제이션으로 `useMemo`·`useCallback` 수동 작성 부담 제거
- **SVG 최적화** — 아이콘은 SVGR로 React 컴포넌트화해 `currentColor` 동적 색상 적용 및 트리쉐이킹, Turbopack 로더 규칙으로 처리

**코드 품질**

- **Husky + lint-staged** — 커밋 시 변경 파일에만 ESLint·Prettier를 적용해 빠른 피드백 유지
- **Prettier + prettier-plugin-tailwindcss** — Tailwind 클래스 자동 정렬로 코드 리뷰 노이즈 제거
- **simple-import-sort** — import 순서 자동 정렬

## ☁️ CI/CD

> **PR 생성 → Vercel Preview 자동 배포 → PR 코멘트로 URL 공유**
> **Push to `master` → 개인 GitHub 레포에 코드 자동 미러링**

| 워크플로      | 트리거          | 주요 작업                                                         |
| ------------- | --------------- | ----------------------------------------------------------------- |
| `preview.yml` | PR → `master`   | Vercel Preview 빌드·배포 → PR 코멘트에 URL 자동 게시              |
| `deploy.yml`  | Push → `master` | `build.sh`로 output 생성 후 `waldls/next-vote-23rd` 레포에 미러링 |

- **환경 변수**: Vercel 프로젝트 환경 변수로 관리 — 레포에 평문 미탑재

## 💻 로컬 실행

요구사항: **Node.js 22**, **yarn**

```bash
# 1. 의존성 설치
yarn install

# 2. 환경 변수 설정
cp .env.example .env.local
# .env.local에 아래 값 입력

# 3. 개발 서버 실행
yarn dev
# → http://localhost:3000
```

### 주요 명령어

```bash
yarn lint        # ESLint 자동 수정
yarn prettier    # Prettier 자동 정렬
yarn build       # 프로덕션 빌드
```

### 환경 변수

| 변수                  | 설명                |
| --------------------- | ------------------- |
| `NEXT_PUBLIC_API_URL` | 백엔드 API 서버 URL |

## 👥 팀원

### Team.Ditda

| <img src="https://github.com/waldls.png" width="200" height="200"/> | <img src="https://github.com/KOJ50.png" width="200" height="200"/> | <img src="https://github.com/fervovita.png" width="200" height="200"/> | <img src="https://github.com/Jong0128.png" width="200" height="200"/> |
| :-----------------------------------------------------------------: | :----------------------------------------------------------------: | :--------------------------------------------------------------------: | :-------------------------------------------------------------------: |
|          박유민 <br/> [@waldls](https://github.com/waldls)          |          권오진 <br/> [@KOJ50](https://github.com/KOJ50)           |        안준석 <br/> [@fervovita](https://github.com/fervovita)         |         임종훈 <br/> [@Jong0128](https://github.com/Jong0128)         |
|                          **Frontend Lead**                          |                            **Frontend**                            |                            **Backend Lead**                            |                              **Backend**                              |

