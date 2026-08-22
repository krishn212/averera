"use client";

import { useMemo, useState } from "react";
import {
  allMembers,
  leadership,
  currentTeam,
  legacyGenerations,
  matchesFilter,
  type FilterChip,
  type Member,
} from "@/data/team";

import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import LeadershipSection from "@/components/LeadershipSection";
import CurrentTeamSection from "@/components/CurrentTeamSection";
import StatsCounter from "@/components/StatsCounter";
import LegacySection from "@/components/LegacySection";
import SearchResultsSection from "@/components/SearchResultsSection";
import ProfileDrawer from "@/components/ProfileDrawer";
import Footer from "@/components/Footer";

function memberMatchesQuery(m: Member, query: string) {
  const q = query.toLowerCase();
  return (
    m.name.toLowerCase().includes(q) ||
    m.position.toLowerCase().includes(q) ||
    m.department.toLowerCase().includes(q) ||
    m.generation.includes(q) ||
    m.team.toLowerCase().includes(q)
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterChip>("All");
  const [selected, setSelected] = useState<Member | null>(null);

  const isSearchActive = query.trim().length > 0 || filter !== "All";

  const filtered = useMemo(() => {
    return allMembers.filter(
      (m) => matchesFilter(m, filter) && memberMatchesQuery(m, query.trim())
    );
  }, [query, filter]);

  const filteredLeadership = useMemo(
    () => leadership.filter((m) => memberMatchesQuery(m, query.trim()) && matchesFilter(m, filter)),
    [query, filter]
  );
  const filteredCurrent = useMemo(
    () => currentTeam.filter((m) => memberMatchesQuery(m, query.trim()) && matchesFilter(m, filter)),
    [query, filter]
  );

  return (
    <main className="relative">
      <Hero />

      <SearchSection
        query={query}
        onQueryChange={setQuery}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {isSearchActive ? (
        <SearchResultsSection members={filtered} onSelect={setSelected} />
      ) : (
        <>
          <LeadershipSection members={filteredLeadership} onSelect={setSelected} />
          <CurrentTeamSection
            members={filteredCurrent}
            onSelect={setSelected}
            searchActive={false}
          />
          <StatsCounter />
          <LegacySection generations={legacyGenerations} onSelect={setSelected} />
        </>
      )}

      <Footer />

      <ProfileDrawer member={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
