import { cn } from "@/lib/utils/cn";

interface ChipProps {
  label: string;
  voteCount?: number;
  isSelected?: boolean;
}

const Chip = ({ label, voteCount, isSelected = false }: ChipProps) => {
  return (
    <div
      className={cn(
        "text-body2-m md:text-heading2-m rounded-24 inline-flex items-center justify-center px-5 py-2 md:px-6 md:py-3",
        isSelected
          ? "border-purple-60 text-body2-sb md:text-heading2-sb border bg-purple-50 text-white"
          : "bg-gray-10 text-purple-50",
      )}
    >
      <span>{label}</span>
      {voteCount !== undefined && <span className="ml-2">{voteCount}</span>}
    </div>
  );
};

export default Chip;
