import { cn } from "@/lib/utils/cn";

type Tab = {
  label: string;
  value: string;
};

type TabToggleProps = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
};

const TabToggle = ({ tabs, value, onChange }: TabToggleProps) => {
  return (
    <div className="flex w-full overflow-hidden rounded-full ring-1 ring-purple-50">
      {tabs.map(tab => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "text-body2-m md:text-heading2-m flex-1 cursor-pointer px-8 py-3 whitespace-nowrap transition-colors duration-200 md:px-10",
            value === tab.value ? "bg-purple-50 text-white" : "bg-white text-purple-50",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabToggle;
