"use client";

import { useState } from "react";

import ProfileCard from "@/components/common/ProfileCard";
import TabToggle from "@/components/common/TabToggle";
import { TABS } from "@/constants/signup";
import { backendMembers, frontendMembers } from "@/data/members";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("FE");
  const members = selectedTab === "FE" ? frontendMembers : backendMembers;

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">MEMBERS</h1>
        <TabToggle tabs={TABS} value={selectedTab} onChange={setSelectedTab} />
        <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-1 md:mt-8 md:gap-x-3 md:gap-y-2">
          {members.map(member => (
            <ProfileCard key={member.name} name={member.name} university={member.university} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
