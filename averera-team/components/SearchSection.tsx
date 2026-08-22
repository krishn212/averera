"use client";

import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import type { FilterChip } from "@/data/team";

export default function SearchSection({
  query,
  onQueryChange,
  activeFilter,
  onFilterChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  activeFilter: FilterChip;
  onFilterChange: (chip: FilterChip) => void;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/5 bg-graphite-950/80 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6">
        <SearchBar value={query} onChange={onQueryChange} />
        <FilterChips active={activeFilter} onChange={onFilterChange} />
      </div>
    </div>
  );
}
