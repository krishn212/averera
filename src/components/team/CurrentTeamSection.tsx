"use client";

import { useMemo, useRef } from "react";
import type { Member } from "../../data/team";
import SectionHeading from "./SectionHeading";
import MemberCard from "./MemberCard";
import { GlobalSpotlight } from "../MagicBento";

export default function CurrentTeamSection({
  members,
  onSelect,
  searchActive,
}: {
  members: Member[];
  onSelect: (m: Member) => void;
  searchActive: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  // De-duplicate the input members list by name to avoid duplicates between leadership and vertical lists
  const uniqueMembers = useMemo(() => {
    const seen = new Set<string>();
    return members.filter((m) => {
      const nameKey = m.name.trim().toLowerCase();
      if (seen.has(nameKey)) return false;
      seen.add(nameKey);
      return true;
    });
  }, [members]);

  // 1. Core Leadership (Heads / Managers)
  const pors = useMemo(() => {
    const activeLeaderNames = [
      "subhakanta mohapatra",
      "subhakanta",
      "aryan sharma",
      "vasu srivastava",
      "keerthana sri k m",
      "jai sharma",
      "raghav sharma"
    ];
    return uniqueMembers
      .filter((m) => activeLeaderNames.includes(m.name.trim().toLowerCase()))
      .sort((a, b) => Number(a.generation) - Number(b.generation));
  }, [uniqueMembers]);

  // 2. Verticals definition
  const verticals = [
    { key: "Mechanical", label: "Vehicle Design" },
    { key: "Technical", label: "Autonomy" },
    { key: "Electronics", label: "Embedded" },
    { key: "Management", label: "Marketing & Management" },
  ];

  // Group members into their respective verticals (and sort senior to junior: 12 -> 13 -> 14)
  const verticalGroups = useMemo(() => {
    return verticals.map((v) => {
      const groupMembers = uniqueMembers
        .filter((m) => m.team === v.key)
        .sort((a, b) => Number(a.generation) - Number(b.generation));
      return {
        ...v,
        members: groupMembers,
      };
    });
  }, [uniqueMembers]);

  if (searchActive) {
    return (
      <section id="current-members" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <div ref={gridRef} className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
          <GlobalSpotlight gridRef={gridRef} glowColor="24, 208, 219" spotlightRadius={350} />
          <SectionHeading
            eyebrow="Search Results"
            title="Matching Members"
            subtitle="Current active team members matching search criteria."
          />
          <div className="about-grid" style={{ marginTop: '30px' }}>
            {members.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </div>
          {members.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
              No members match your search.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="current-members" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
      <div ref={gridRef} className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <GlobalSpotlight gridRef={gridRef} glowColor="24, 208, 219" spotlightRadius={350} />
        
        {/* 1. POSITIONS OF RESPONSIBILITY SECTION */}
        <div style={{ marginBottom: '60px' }}>
          <SectionHeading
            eyebrow="Leadership Roster"
            title="Core Leadership"
            subtitle="The managers and heads driving Team Averera's research directives."
          />
          <div className="about-grid" style={{ marginTop: '30px' }}>
            {pors.map((m, i) => (
              <MemberCard key={`por-${m.id}`} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </div>
        </div>

        {/* 2. VERTICAL WISE SUBDIVISIONS (Seniors to Juniors) */}
        {verticalGroups.map((v) => {
          if (v.members.length === 0) return null;
          return (
            <div key={v.key} style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px' }}>
              <div style={{ marginBottom: '25px' }}>
                <div className="badge-glass" style={{ display: 'inline-flex', padding: '4px 10px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  {v.label} Vertical
                </div>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                  {v.label}
                </h3>
              </div>
              <div className="about-grid">
                {v.members.map((m, i) => (
                  <MemberCard key={`vert-${v.key}-${m.id}`} member={m} index={i} onClick={() => onSelect(m)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
