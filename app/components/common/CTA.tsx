interface CTAProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CTA = ({ label, disabled = false, onClick }: CTAProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="disabled:bg-gray-20 hover:bg-purple-40 rounded-24 text-body1-sb md:text-heading1-sb w-full min-w-55 cursor-pointer bg-purple-50 py-2 text-white transition-colors disabled:text-gray-50"
    >
      {label}
    </button>
  );
};

export default CTA;
