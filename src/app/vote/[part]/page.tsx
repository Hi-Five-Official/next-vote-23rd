"use client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";
import {
  isLeaderPart,
  LEADER_CONFIGS,
  LEADER_PART_TO_API_PART,
  VOTE_MESSAGES,
} from "@/constants/vote";
import { getVotingCandidates } from "@/lib/apis/candidate";
import { postCandidateVote } from "@/lib/apis/vote";
import { getHttpErrorMessage } from "@/lib/utils/error";
import { sortByKoreanName } from "@/lib/utils/sort";
import type { VotingCandidate } from "@/types/candidate";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ part: string }>();

  if (!isLeaderPart(params.part)) notFound();

  const part = params.part;
  const apiPart = LEADER_PART_TO_API_PART[part];
  const voteConfig = LEADER_CONFIGS[part];

  const [candidates, setCandidates] = useState<VotingCandidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [voteError, setVoteError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getVotingCandidates(apiPart)
      .then(res => {
        if (!isMounted) return;
        setSelectedCandidateId(null);
        setCandidates(sortByKoreanName(res.result?.candidates ?? []));
        setLoadError(null);
      })
      .catch(async err => {
        if (!isMounted) return;
        setCandidates([]);
        setLoadError(await getHttpErrorMessage(err, VOTE_MESSAGES.LEADER_CANDIDATE_LOAD_ERROR));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apiPart]);

  const serverVotedCandidate = useMemo(
    () => candidates.find(candidate => candidate.isMyVote),
    [candidates],
  );
  const selectedCandidate = useMemo(
    () => candidates.find(candidate => candidate.candidateId === selectedCandidateId) ?? null,
    [selectedCandidateId, candidates],
  );

  const hasVoted = !!serverVotedCandidate;
  const isVoteEnabled = selectedCandidateId !== null && !hasVoted && !isVoting;
  const hasCandidates = !isLoading && !loadError && candidates.length > 0;

  const isCandidateSelected = (candidate: VotingCandidate) => {
    if (serverVotedCandidate) {
      return serverVotedCandidate.candidateId === candidate.candidateId;
    }
    return selectedCandidateId === candidate.candidateId;
  };

  const handleVoteClick = () => {
    if (!selectedCandidate || hasVoted || isVoting) return;
    setIsModalOpen(true);
  };

  const handleCancelVote = () => {
    if (isVoting) return;
    setIsModalOpen(false);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidate || isVoting) return;

    setIsVoting(true);
    setVoteError(null);
    try {
      const response = await postCandidateVote({ candidateId: selectedCandidate.candidateId });
      if (!response.success) {
        setVoteError(response.message ?? VOTE_MESSAGES.LEADER_CANDIDATE_VOTE_ERROR);
        setIsModalOpen(false);
        return;
      }

      setCandidates(prevCandidates =>
        prevCandidates.map(candidate => ({
          ...candidate,
          isMyVote: candidate.candidateId === selectedCandidate.candidateId,
        })),
      );
      setIsModalOpen(false);
    } catch (err) {
      setVoteError(await getHttpErrorMessage(err, VOTE_MESSAGES.LEADER_CANDIDATE_VOTE_ERROR));
      setIsModalOpen(false);
    } finally {
      setIsVoting(false);
    }
  };

  const handleRankingClick = () => {
    router.push(voteConfig.rankingHref);
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">
          {voteConfig.title}
        </h1>
        {isLoading && (
          <p className="text-caption2-m md:text-body2-m text-gray-70 mt-6 text-center">
            {VOTE_MESSAGES.LEADER_CANDIDATE_LOADING}
          </p>
        )}
        {!isLoading && loadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {loadError}
          </p>
        )}
        {hasCandidates && (
          <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2 md:mt-3 md:gap-x-3 md:gap-y-3">
            {candidates.map(candidate => (
              <Button
                key={candidate.candidateId}
                isSelected={isCandidateSelected(candidate)}
                onClick={() => {
                  if (hasVoted) return;
                  setSelectedCandidateId(candidate.candidateId);
                }}
              >
                {candidate.name}
              </Button>
            ))}
          </div>
        )}
        {!hasVoted && hasCandidates && (
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
        {isModalOpen && (
          <Modal
            buttons="double"
            title="투표는 분야별 1회만 가능하며, 제출 후에는 수정이 어렵습니다."
            description="투표하시겠습니까?"
            leftLabel="아니오"
            rightLabel={isVoting ? "투표 중..." : "예"}
            onCancel={handleCancelVote}
            onClose={handleCancelVote}
            onConfirm={handleConfirmVote}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
