"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <h1 className="text-body1-sb md:text-heading1-sb text-purple-60">ERROR</h1>
      <p className="text-heading2-sb md:text-heading1-sb text-gray-90">오류가 발생했어요</p>
      <p className="text-body2-r md:text-body1-m text-gray-60">잠시 후 다시 시도해주세요</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-50 text-body2-sb md:text-body1-sb hover:bg-purple-40 mt-2 cursor-pointer bg-purple-50 px-6 py-2.5 text-center text-white transition-colors md:mt-4"
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
