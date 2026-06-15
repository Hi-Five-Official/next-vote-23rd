"use client";

import { useEffect, useState } from "react";

import ProfileCard from "@/components/common/ProfileCard";
import TabToggle from "@/components/common/TabToggle";
import { TABS } from "@/constants/signup";
import { getTeamCandidates, getTeams } from "@/lib/apis/team";
import type { Part, Team } from "@/types/team";

type MemberProfile = {
  candidateId: number;
  name: string;
  team: string;
};

type MembersByPart = Record<Part, MemberProfile[]>;

const PARTS: Part[] = ["FE", "BE"];
const INITIAL_MEMBERS: MembersByPart = { FE: [], BE: [] };
const DEFAULT_MEMBER_LOAD_ERROR_MESSAGE =
  "멤버 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

const sortMembersByName = (members: MemberProfile[]) =>
  [...members].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));

const isAbortError = (err: unknown) => err instanceof DOMException && err.name === "AbortError";

const getMembersByPart = async (teams: Team[], signal: AbortSignal): Promise<MembersByPart> => {
  const nextMembers: MembersByPart = { FE: [], BE: [] };

  for (const part of PARTS) {
    const members: MemberProfile[] = [];

    for (const team of teams) {
      signal.throwIfAborted();

      const candidatesResponse = await getTeamCandidates(team.teamId, part, { signal });
      members.push(
        ...(candidatesResponse.result?.candidates ?? []).map(candidate => ({
          candidateId: candidate.candidateId,
          name: candidate.name,
          team: team.name,
        })),
      );
    }

    nextMembers[part] = sortMembersByName(members);
  }

  return nextMembers;
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<Part>("FE");
  const [membersByPart, setMembersByPart] = useState<MembersByPart>(INITIAL_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    getTeams({ signal: controller.signal })
      .then(async res => {
        if (!isMounted) return;

        const teams = res.result?.teams ?? [];
        const nextMembers = await getMembersByPart(teams, controller.signal);

        if (!isMounted) return;

        setLoadError(null);
        setMembersByPart(nextMembers);
      })
      .catch(err => {
        if (!isMounted) return;
        if (isAbortError(err)) return;
        setLoadError(DEFAULT_MEMBER_LOAD_ERROR_MESSAGE);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleTabChange = (value: string) => {
    setSelectedTab(value as Part);
  };

  const members = membersByPart[selectedTab];

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">MEMBERS</h1>
        <TabToggle tabs={TABS} value={selectedTab} onChange={handleTabChange} />
        <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-1 md:mt-8 md:gap-x-3 md:gap-y-2">
          {members.map(member => (
            <ProfileCard
              key={`${selectedTab}-${member.candidateId}`}
              name={member.name}
              team={member.team}
            />
          ))}
        </div>
        {isLoading && (
          <p className="text-caption2-m md:text-body2-m text-gray-70 mt-6 text-center">
            멤버 목록을 불러오는 중입니다.
          </p>
        )}
        {!isLoading && loadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {loadError}
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
