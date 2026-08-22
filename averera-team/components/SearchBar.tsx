"use client";

import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search by name, role, department, or generation…"
        aria-label="Search team members"
        className="focus-ring glass w-full rounded-full py-3 pl-11 pr-10 text-sm text-paper placeholder:text-muted/70"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-copper-400"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
