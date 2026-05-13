import { cn } from "@/lib/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "check";
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default: {
    base: "text-body2-m md:text-heading2-m rounded-50 inline-flex cursor-pointer items-center justify-center border border-purple-50 px-8 py-3 text-purple-50 transition-colors md:px-14 md:py-3",
    selected: "text-body2-sb md:text-heading2-sb bg-purple-50 text-white",
    unselected: "hover:bg-purple-40 bg-white hover:text-white",
  },
  check: {
    base: "rounded-50 cursor-pointer bg-purple-50 px-1.5 py-0.75 text-caption2-m text-white hover:bg-purple-40 mb-1.5",
    selected: "",
    unselected: "",
  },
};

const Button = ({
  children,
  variant = "default",
  isSelected = false,
  onClick,
  className,
}: ButtonProps) => {
  const styles = variantStyles[variant];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        styles.base,
        variant === "default" && (isSelected ? styles.selected : styles.unselected),
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
