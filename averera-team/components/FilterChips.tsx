"use client";

import { motion } from "framer-motion";
import { filterChips, type FilterChip } from "@/data/team";

export default function FilterChips({
  active,
  onChange,
}: {
  active: FilterChip;
  onChange: (chip: FilterChip) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {filterChips.map((chip) => {
        const isActive = chip === active;
        return (
          <button
            key={chip}
            onClick={() => onChange(chip)}
            className={`focus-ring relative rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              isActive ? "text-graphite-950" : "text-muted hover:text-paper"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-chip"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-copper-400"
              />
            )}
            <span className="relative z-10">{chip}</span>
          </button>
        );
      })}
    </div>
  );
}
