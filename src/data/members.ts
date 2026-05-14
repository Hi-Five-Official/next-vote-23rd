export type Member = {
  name: string;
  university: string;
};

export type VoteRanking = {
  rank: number;
  label: string;
  voteCount: number;
};

export const frontendMembers: Member[] = [
  { name: "구민교", university: "Ewha. W. Univ" },
  { name: "권오진", university: "Hongik Univ." },
  { name: "김민서", university: "Ewha. W. Univ" },
  { name: "김홍엽", university: "Hongik Univ." },
  { name: "남기림", university: "Ewha. W. Univ" },
  { name: "박유민", university: "Hongik Univ." },
  { name: "오유진", university: "Yonsei Univ." },
  { name: "이승연", university: "Hongik Univ." },
  { name: "이윤서", university: "Hongik Univ." },
  { name: "황영준", university: "Hongik Univ." },
];

export const backendMembers: Member[] = [
  { name: "김도현", university: "Hongik Univ." },
  { name: "김동욱", university: "Hongik Univ." },
  { name: "김태익", university: "Hongik Univ." },
  { name: "김태희", university: "Hongik Univ." },
  { name: "안준석", university: "Hongik Univ." },
  { name: "임종훈", university: "Hongik Univ." },
  { name: "오지송", university: "Ewha. W. Univ." },
  { name: "최승원", university: "Hongik Univ." },
  { name: "최우혁", university: "Hongik Univ." },
  { name: "황신애", university: "Hongik Univ." },
];

export const idea = [
  { name: "Ditda" },
  { name: "Jobdri" },
  { name: "Groupeat" },
  { name: "CONX" },
  { name: "IPX" },
];

export const frontendVoteRankings: VoteRanking[] = [
  { rank: 1, label: "구민교", voteCount: 7 },
  { rank: 2, label: "권오진", voteCount: 6 },
  { rank: 3, label: "김민서", voteCount: 5 },
  { rank: 4, label: "김홍엽", voteCount: 4 },
  { rank: 5, label: "남기림", voteCount: 4 },
  { rank: 6, label: "박유민", voteCount: 3 },
  { rank: 7, label: "오유진", voteCount: 3 },
  { rank: 8, label: "이승연", voteCount: 2 },
  { rank: 9, label: "이윤서", voteCount: 1 },
  { rank: 10, label: "황영준", voteCount: 0 },
];

/**
 * 백엔드 파트장 투표 순위
 */
export const backendVoteRankings: VoteRanking[] = [
  { rank: 1, label: "김도현", voteCount: 8 },
  { rank: 2, label: "김동욱", voteCount: 7 },
  { rank: 3, label: "김태익", voteCount: 6 },
  { rank: 4, label: "김태희", voteCount: 5 },
  { rank: 5, label: "안준석", voteCount: 4 },
  { rank: 6, label: "임종훈", voteCount: 3 },
  { rank: 7, label: "오지송", voteCount: 3 },
  { rank: 8, label: "최승원", voteCount: 2 },
  { rank: 9, label: "최우혁", voteCount: 1 },
  { rank: 10, label: "황신애", voteCount: 0 },
];

/**
 * 데모데이 아이디어 투표 순위
 */
export const demoVoteRankings: VoteRanking[] = [
  { rank: 1, label: "Ditda", voteCount: 10 },
  { rank: 2, label: "Jobdri", voteCount: 8 },
  { rank: 3, label: "Groupeat", voteCount: 6 },
  { rank: 4, label: "CONX", voteCount: 4 },
  { rank: 5, label: "IPX", voteCount: 2 },
];
