"use client";

import { useEffect, useRef, useState } from "react";

import ChevronDownIcon from "@/assets/icons/icon_chevron_down_regular.svg";
import { cn } from "@/lib/utils/cn";

type Option = {
  label: string;
  value: string;
};

type DropDownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onDisabledClick?: () => void;
};

const DropDown = ({
  options,
  value,
  onChange,
  placeholder = "선택",
  disabled = false,
  onDisabledClick,
}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => {
          if (disabled) {
            onDisabledClick?.();
          } else {
            setOpen(prev => !prev);
          }
        }}
        className="rounded-50 text-body2-m md:text-heading3-m flex w-full cursor-pointer items-center justify-between gap-3 border border-purple-50 px-5 py-2.5 text-purple-50 transition-colors md:px-6"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDownIcon
          className={cn("size-6 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <ul className="z-dropdown absolute top-full left-0 mt-1 w-full overflow-hidden border border-purple-50 bg-white shadow-sm">
          {options.map(option => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="text-body2-m md:text-heading3-m w-full cursor-pointer px-4 py-2 text-center text-black transition-colors hover:bg-purple-50/10 md:py-3"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
