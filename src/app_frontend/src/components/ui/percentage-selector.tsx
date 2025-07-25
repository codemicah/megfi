"use client";

import { cn } from "@/lib/utils";

interface PercentageSelectorProps {
  values: number[];
  selectedValue: number;
  onChange: (value: number) => void;
}

export function PercentageSelector({
  values,
  selectedValue,
  onChange
}: PercentageSelectorProps) {
  return (
    <div className="flex gap-2">
      {values.map((value) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
            selectedValue === value
              ? "bg-[#00A3FF] text-white"
              : "bg-white/5 text-gray-400"
          )}
        >
          {value}%
        </button>
      ))}
    </div>
  );
}