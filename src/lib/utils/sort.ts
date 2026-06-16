export const sortByKoreanName = <T extends { name: string }>(arr: T[]): T[] =>
  [...arr].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));
