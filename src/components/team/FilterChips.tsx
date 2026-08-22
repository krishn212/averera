"use client";

import { filterChips, type FilterChip } from "../../data/team";

export default function FilterChips({
  active,
  onChange,
}: {
  active: FilterChip;
  onChange: (chip: FilterChip) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
      {filterChips.map((chip) => {
        const isActive = chip === active;
        return (
          <button
            key={chip}
            onClick={() => onChange(chip)}
            className={`filter-chip ${isActive ? "active" : ""}`}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}
