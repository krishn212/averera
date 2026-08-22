"use client";

import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import type { FilterChip } from "../../data/team";

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
    <div className="team-search-section">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6">
        <SearchBar value={query} onChange={onQueryChange} />
        <FilterChips active={activeFilter} onChange={onFilterChange} />
      </div>
    </div>
  );
}
