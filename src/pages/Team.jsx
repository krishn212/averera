import { useMemo, useState, useEffect } from "react";
import {
  leadership,
  currentTeam,
  allMembers,
  matchesFilter,
} from "../data/team";

import Hero from "../components/team/Hero";
import CurrentTeamSection from "../components/team/CurrentTeamSection";
import ProfileDrawer from "../components/team/ProfileDrawer";

function memberMatchesQuery(m, query) {
  const q = query.toLowerCase();
  return (
    m.name.toLowerCase().includes(q) ||
    m.position.toLowerCase().includes(q) ||
    m.department.toLowerCase().includes(q) ||
    m.generation.includes(q) ||
    m.team.toLowerCase().includes(q)
  );
}

export default function Team({ setActivePage }) {
  const [selected, setSelected] = useState(null);

  // Filter only current team and leadership for current team page
  const allCurrentMembers = useMemo(() => {
    return [...leadership, ...currentTeam];
  }, []);



  return (
    <main className="page-main" style={{ boxSizing: 'border-box' }}>
      {/* 1. HERO SECTION */}
      <Hero />



      <CurrentTeamSection
        members={allCurrentMembers}
        onSelect={setSelected}
        searchActive={false}
      />



      {/* Profile Details Drawer */}
      <ProfileDrawer member={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
