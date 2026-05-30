"use client";
import { HTTPError } from "ky";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Button from "@/components/common/Button";
import CTA from "@/components/common/CTA";
import Modal from "@/components/common/Modal";
import { LEADER_CONFIGS, type LeaderPart } from "@/constants/vote";
import { getVotingCandidates } from "@/lib/apis/candidate";
import type { VotingCandidate } from "@/types/candidate";
import type { ApiResponse } from "@/types/common";
import type { Part } from "@/types/team";

type CandidateLoadState = {
  part: Part | null;
  candidates: VotingCandidate[];
  error: string | null;
  status: "loading" | "success" | "error";
};

const LEADER_PART_TO_API_PART: Record<LeaderPart, Part> = {
  frontend: "FE",
  backend: "BE",
};

const DEFAULT_CANDIDATE_LOAD_ERROR_MESSAGE = "파트장 후보 목록을 불러오지 못했습니다.";
const INITIAL_CANDIDATE_LOAD_STATE: CandidateLoadState = {
  part: null,
  candidates: [],
  error: null,
  status: "loading",
};
const EMPTY_CANDIDATES: VotingCandidate[] = [];

const sortCandidatesByName = (candidates: VotingCandidate[]) =>
  [...candidates].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"));

const getCandidateLoadErrorMessage = async (err: unknown) => {
  if (!(err instanceof HTTPError)) return DEFAULT_CANDIDATE_LOAD_ERROR_MESSAGE;

  try {
    const body = (await err.response.json()) as ApiResponse;
    return body.message ?? DEFAULT_CANDIDATE_LOAD_ERROR_MESSAGE;
  } catch {
    return DEFAULT_CANDIDATE_LOAD_ERROR_MESSAGE;
  }
};

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const part = params.part as LeaderPart;
  const apiPart = LEADER_PART_TO_API_PART[part];
  const voteConfig = LEADER_CONFIGS[part];

  const [candidateLoadState, setCandidateLoadState] = useState<CandidateLoadState>(
    INITIAL_CANDIDATE_LOAD_STATE,
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!apiPart) {
      return () => {
        isMounted = false;
      };
    }

    getVotingCandidates(apiPart)
      .then(res => {
        if (!isMounted) return;
        setSelectedCandidateId(null);
        setCandidateLoadState({
          part: apiPart,
          candidates: sortCandidatesByName(res.result?.candidates ?? []),
          error: null,
          status: "success",
        });
      })
      .catch(async err => {
        if (!isMounted) return;
        setCandidateLoadState({
          part: apiPart,
          candidates: [],
          error: await getCandidateLoadErrorMessage(err),
          status: "error",
        });
      });

    return () => {
      isMounted = false;
    };
  }, [apiPart]);

  const candidates =
    candidateLoadState.part === apiPart ? candidateLoadState.candidates : EMPTY_CANDIDATES;
  const loadError = candidateLoadState.part === apiPart ? candidateLoadState.error : null;
  const isLoading =
    !!apiPart && (candidateLoadState.part !== apiPart || candidateLoadState.status === "loading");

  const serverVotedCandidate = useMemo(
    () => candidates.find(candidate => candidate.isMyVote),
    [candidates],
  );
  const selectedCandidate = useMemo(
    () => candidates.find(candidate => candidate.candidateId === selectedCandidateId) ?? null,
    [selectedCandidateId, candidates],
  );

  const isInvalidPart = !apiPart;
  const displayLoadError = isInvalidPart ? "올바르지 않은 파트입니다." : loadError;
  const hasVoted = !!serverVotedCandidate;
  const isVoteEnabled = selectedCandidateId !== null && !hasVoted;
  const hasCandidates = !isLoading && !displayLoadError && candidates.length > 0;

  const isCandidateSelected = (candidate: VotingCandidate) => {
    if (serverVotedCandidate) {
      return serverVotedCandidate.candidateId === candidate.candidateId;
    }
    return selectedCandidateId === candidate.candidateId;
  };

  const handleVoteClick = () => {
    if (!selectedCandidate || hasVoted) return;
    setIsModalOpen(true);
  };

  const handleCancelVote = () => {
    setIsModalOpen(false);
  };

  const handleConfirmVote = () => {
    setIsModalOpen(false);
  };

  const handleRankingClick = () => {
    router.push(`/vote/leader/${part}/ranking`);
  };

  return (
    <div>
      <div className="flex w-full flex-col">
        <h1 className="text-body1-sb md:text-heading1-sb text-purple-60 mb-5 md:mb-10">
          {voteConfig.title}
        </h1>
        {!isInvalidPart && isLoading && (
          <p className="text-caption2-m md:text-body2-m text-gray-70 mt-6 text-center">
            파트장 후보를 불러오는 중입니다.
          </p>
        )}
        {displayLoadError && (
          <p className="text-caption2-m md:text-body2-m text-point-1 mt-6 text-center">
            {displayLoadError}
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
            rightLabel="예"
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
