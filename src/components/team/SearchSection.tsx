"use client";

import SearchBar from "./SearchBar";


export default function SearchSection({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <div className="team-search-section">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6">
        <SearchBar value={query} onChange={onQueryChange} />
      </div>
    </div>
  );
}
