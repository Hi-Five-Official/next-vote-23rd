"use client";
import ProfileCard from "@/components/common/ProfileCard";
import TabToggle from "@/components/common/TabToggle";
import { useState } from "react";
import { backendMembers, frontendMembers } from "@/data/members";

const tabs = [
  {
    label: "Front-End",
    value: "frontend",
  },
  {
    label: "Back-End",
    value: "backend",
  },
];

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("frontend");
  const members = selectedTab === "frontend" ? frontendMembers : backendMembers;

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb mb-2 text-purple-50 md:mb-3">MEMBERS</h1>

        <TabToggle tabs={tabs} value={selectedTab} onChange={setSelectedTab} />

        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 md:mt-3 md:gap-x-3 md:gap-y-2">
          {members.map(member => (
            <ProfileCard name={member.name} university={member.university} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
