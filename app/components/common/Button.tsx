import { cn } from "@/app/lib/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

const Button = ({ children, isSelected = false, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-body2-m md:text-heading2-m rounded-50 inline-flex cursor-pointer items-center justify-center border border-purple-50 px-8 py-3 text-purple-50 transition-colors md:px-14 md:py-3",
        isSelected
          ? "text-body2-sb md:text-heading2-sb bg-purple-50 text-white"
          : "hover:bg-purple-40 bg-white hover:text-white",
      )}
    >
      {children}
    </button>
  );
};

export default Button;
