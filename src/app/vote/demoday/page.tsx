"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";
import { STORAGE_KEY } from "@/constants/vote";
import { getVotingTeams } from "@/lib/apis/team";
import type { VotingTeam } from "@/types/team";

const Page = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<VotingTeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [votedInSession, setVotedInSession] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const storedTeamName = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem(STORAGE_KEY.DEMODAY) ?? "",
    () => "",
  );

  useEffect(() => {
    let isMounted = true;

    getVotingTeams()
      .then(res => {
        if (!isMounted) return;
        setTeams(res.result?.teams ?? []);
        setLoadError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setLoadError("데모데이 팀 후보 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const serverVotedTeam = useMemo(() => teams.find(team => team.isMyVote), [teams]);
  const selectedTeam = useMemo(
    () => teams.find(team => team.teamId === selectedTeamId) ?? null,
    [selectedTeamId, teams],
  );

  const hasVoted = votedInSession || !!storedTeamName || !!serverVotedTeam;
  const isVoteEnabled = selectedTeamId !== null && !hasVoted;

  const isTeamSelected = (team: VotingTeam) => {
    if (serverVotedTeam) return serverVotedTeam.teamId === team.teamId;
    if (storedTeamName) return storedTeamName === team.name;
    return selectedTeamId === team.teamId;
  };

  const handleVoteClick = () => {
    if (!selectedTeam || hasVoted) return;
    setIsModalOpen(true);
  };

  const handleCancelVote = () => {
    setIsModalOpen(false);
  };

  const handleConfirmVote = () => {
    if (!selectedTeam) return;
    sessionStorage.setItem(STORAGE_KEY.DEMODAY, selectedTeam.name);
    setVotedInSession(true);
    setIsModalOpen(false);
  };

  const handleRankingClick = () => {
    router.push("/vote/demoday/ranking");
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">
          23RD CEOS PROJECT
        </h1>
        {isLoading && (
          <p className="text-caption2-m md:text-body2-m text-gray-70 mt-6 text-center">
            데모데이 팀 후보를 불러오는 중입니다.
          </p>
        )}
        {!isLoading && loadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {loadError}
          </p>
        )}
        {!isLoading && !loadError && teams.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2 md:mt-3 md:gap-x-3 md:gap-y-3">
            {teams.map(team => (
              <Button
                key={team.teamId}
                isSelected={isTeamSelected(team)}
                onClick={() => {
                  if (hasVoted) return;
                  setSelectedTeamId(team.teamId);
                }}
              >
                {team.name}
              </Button>
            ))}
          </div>
        )}
        {!hasVoted && !isLoading && !loadError && teams.length > 0 && (
          <div className="mt-10 md:mt-14">
            <CTA label="투표하기" disabled={!isVoteEnabled} onClick={handleVoteClick} />
          </div>
        )}
        <button
          type="button"
          onClick={handleRankingClick}
          className="text-caption2-m md:text-body2-m text-gray-80 hover:text-gray-70 mt-6 cursor-pointer"
        >
          현재 투표 순위 보러 가기 →
        </button>
      </div>
      {isModalOpen && (
        <Modal
          buttons="double"
          title={`투표는 분야별 1회만 가능하며,\n제출 후에는 수정이 어렵습니다.`}
          description="투표하시겠습니까?"
          leftLabel="아니오"
          rightLabel="예"
          onCancel={handleCancelVote}
          onClose={handleCancelVote}
          onConfirm={handleConfirmVote}
        />
      )}
    </div>
  );
};

export default Page;
