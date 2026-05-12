interface ButtonProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

function Button({ children, isSelected = false, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-body2-m md:text-heading2-m border-gray-60 inline-flex cursor-pointer items-center justify-center rounded-[var(--radius-50)] border px-8 py-3 text-purple-50 md:px-14 md:py-3 ${isSelected ? "text-body2-sb md:text-heading2-sb border-purple-50 bg-purple-50 text-white" : "hover:bg-purple-40 border-purple-50 bg-white text-purple-50 hover:text-white"}`}
    >
      {children}
    </button>
  );
}

export default Button;
