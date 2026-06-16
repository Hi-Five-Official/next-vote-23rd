"use client";

import { useEffect, useState } from "react";

import ProfileCard from "@/components/common/ProfileCard";
import TabToggle from "@/components/common/TabToggle";
import { TABS } from "@/constants/signup";
import { getVotingCandidates } from "@/lib/apis/candidate";
import { sortByKoreanName } from "@/lib/utils/sort";
import type { Part } from "@/types/team";

type MemberProfile = {
  candidateId: number;
  name: string;
  university: string;
};

type MembersByPart = Record<Part, MemberProfile[]>;

const PARTS: Part[] = ["FE", "BE"];
const INITIAL_MEMBERS: MembersByPart = { FE: [], BE: [] };
const DEFAULT_MEMBER_LOAD_ERROR_MESSAGE =
  "멤버 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

const isAbortError = (err: unknown) => err instanceof DOMException && err.name === "AbortError";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState<Part>("FE");
  const [membersByPart, setMembersByPart] = useState<MembersByPart>(INITIAL_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      const nextMembers: MembersByPart = { FE: [], BE: [] };

      for (const part of PARTS) {
        const res = await getVotingCandidates(part);
        nextMembers[part] = sortByKoreanName(
          (res.result?.candidates ?? []).map(c => ({
            candidateId: c.candidateId,
            name: c.name,
            university: c.university,
          })),
        );
      }

      return nextMembers;
    };

    fetchAll()
      .then(nextMembers => {
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
    };
  }, []);

  const members = membersByPart[selectedTab];

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">MEMBERS</h1>
        <TabToggle
          tabs={TABS}
          value={selectedTab}
          onChange={value => setSelectedTab(value as Part)}
        />
        <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-1 md:mt-8 md:gap-x-3 md:gap-y-2">
          {members.map(member => (
            <ProfileCard
              key={`${selectedTab}-${member.candidateId}`}
              name={member.name}
              university={member.university}
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
