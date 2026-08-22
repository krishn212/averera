import { useMemo, useState, useEffect } from "react";
import {
  leadership,
  currentTeam,
  allMembers,
  matchesFilter,
} from "../data/team";

import Hero from "../components/team/Hero";
import SearchSection from "../components/team/SearchSection";
import LeadershipSection from "../components/team/LeadershipSection";
import CurrentTeamSection from "../components/team/CurrentTeamSection";
import StatsCounter from "../components/team/StatsCounter";
import LegacySection from "../components/team/LegacySection";
import SearchResultsSection from "../components/team/SearchResultsSection";
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
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const isSearchActive = query.trim().length > 0 || filter !== "All";

  // Filter only current team and leadership for current team page
  const filteredCurrentMembers = useMemo(() => {
    const currentList = [...leadership, ...currentTeam];
    return currentList.filter(
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
    <main style={{ paddingTop: '130px', boxSizing: 'border-box' }}>
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TEAM INTRO SECTION */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center', boxSizing: 'border-box' }}>
          <div className="badge-glass" style={{ marginBottom: '15px', display: 'inline-flex', alignItems: 'center' }}>
            <i className="fa-solid fa-circle-nodes" style={{ marginRight: '6px' }}></i> Engineering Excellence
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-title)', 
            color: 'var(--text-primary)', 
            fontSize: '1.8rem', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            margin: '0 0 15px 0' 
          }}>
            Meet the Minds Shaping Eco-Mobility
          </h2>
          <p style={{ 
            fontSize: '0.95rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6', 
            margin: 0 
          }}>
            TEAM AVERERA is a group of student innovators from IIT (BHU) Varanasi. We design, simulate, and manufacture highly efficient eco-vehicles, pushing the boundaries of automotive engineering, smart battery architectures, and autonomous navigation system stacks.
          </p>
        </div>
      </section>

      {/* 3. SEARCH & FILTERS */}
      <div id="team-showcase">
        <SearchSection
          query={query}
          onQueryChange={setQuery}
          activeFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* 4. TEAM MEMBERS */}
      {isSearchActive ? (
        <SearchResultsSection members={filteredCurrentMembers} onSelect={setSelected} />
      ) : (
        <>
          <LeadershipSection members={filteredLeadership} onSelect={setSelected} />
          <CurrentTeamSection
            members={filteredCurrent}
            onSelect={setSelected}
            searchActive={false}
          />
          <StatsCounter />
        </>
      )}

      {/* 5. FINAL CTA SECTION */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', background: 'transparent', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
          <div className="badge-glass" style={{ marginBottom: '15px', display: 'inline-flex', alignItems: 'center' }}>
            <i className="fa-solid fa-handshake" style={{ marginRight: '6px' }}></i> Join The Team / Collaborate
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-title)', 
            color: 'var(--text-primary)', 
            fontSize: '2.2rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            margin: '0 0 15px 0' 
          }}>
            Build The Future With Us
          </h2>
          <p style={{ 
            fontSize: '0.95rem', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6', 
            maxWidth: '600px',
            margin: '0 auto 30px auto'
          }}>
            Whether you want to sponsor our vehicle development, collaborate on research, or apply to join our engineering rosters, we want to hear from you.
          </p>
          <div>
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                if (setActivePage) {
                  sessionStorage.setItem('scrollToContact', 'true');
                  setActivePage("home");
                } else {
                  const contact = document.getElementById("contact");
                  if (contact) {
                    contact.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                  }
                }
              }}
            >
              Connect With Us <i className="fa-solid fa-paper-plane" style={{ marginLeft: '6px' }}></i>
            </a>
          </div>
        </div>
      </section>

      {/* Profile Details Drawer */}
      <ProfileDrawer member={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
