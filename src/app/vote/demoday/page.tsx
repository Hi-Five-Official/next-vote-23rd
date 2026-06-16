"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";
import { VOTE_MESSAGES } from "@/constants/vote";
import { getVotingTeams } from "@/lib/apis/team";
import { postTeamVote } from "@/lib/apis/vote";
import { getHttpErrorMessage } from "@/lib/utils/error";
import type { VotingTeam } from "@/types/team";

const Page = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<VotingTeam[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);

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
        setLoadError(VOTE_MESSAGES.DEMODAY_TEAM_LOAD_ERROR);
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

  const hasVoted = !!serverVotedTeam;
  const isVoteEnabled = selectedTeamId !== null && !hasVoted && !isVoting;
  const hasTeams = !isLoading && !loadError && teams.length > 0;

  const isTeamSelected = (team: VotingTeam) => {
    if (serverVotedTeam) return serverVotedTeam.teamId === team.teamId;
    return selectedTeamId === team.teamId;
  };

  const handleVoteClick = () => {
    if (!selectedTeam || hasVoted || isVoting) return;
    setIsModalOpen(true);
  };

  const handleCancelVote = () => {
    if (isVoting) return;
    setIsModalOpen(false);
  };

  const handleConfirmVote = async () => {
    if (!selectedTeam || isVoting) return;

    setIsVoting(true);
    setVoteError(null);
    try {
      const response = await postTeamVote({ teamId: selectedTeam.teamId });
      if (!response.success) {
        setVoteError(response.message ?? VOTE_MESSAGES.DEMODAY_TEAM_VOTE_ERROR);
        setIsModalOpen(false);
        return;
      }

      setTeams(prevTeams =>
        prevTeams.map(team => ({
          ...team,
          isMyVote: team.teamId === selectedTeam.teamId,
        })),
      );
      setIsModalOpen(false);
    } catch (err) {
      setVoteError(await getHttpErrorMessage(err, VOTE_MESSAGES.DEMODAY_TEAM_VOTE_ERROR));
      setIsModalOpen(false);
    } finally {
      setIsVoting(false);
    }
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
            {VOTE_MESSAGES.DEMODAY_TEAM_LOADING}
          </p>
        )}
        {!isLoading && loadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {loadError}
          </p>
        )}
        {hasTeams && (
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
        {!hasVoted && hasTeams && (
          <div className="mt-10 md:mt-14">
            <CTA label="투표하기" disabled={!isVoteEnabled} onClick={handleVoteClick} />
          </div>
        )}
        {voteError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-3 text-center">
            {voteError}
          </p>
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
          rightLabel={isVoting ? "투표 중..." : "예"}
          onCancel={handleCancelVote}
          onClose={handleCancelVote}
          onConfirm={handleConfirmVote}
        />
      )}
    </div>
  );
};

export default Page;
