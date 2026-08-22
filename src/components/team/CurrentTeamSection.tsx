"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Member } from "../../data/team";
import { currentGenerations } from "../../data/team";
import SectionHeading from "./SectionHeading";
import GenerationTabs from "./GenerationTabs";
import MemberCard from "./MemberCard";

export default function CurrentTeamSection({
  members,
  onSelect,
  searchActive,
}: {
  members: Member[];
  onSelect: (m: Member) => void;
  searchActive: boolean;
}) {
  const [activeGen, setActiveGen] = useState(currentGenerations[0]);

  const visible = useMemo(() => {
    if (searchActive) return members;
    return members.filter((m) => m.generation === activeGen);
  }, [members, activeGen, searchActive]);

  return (
    <section id="current-members" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <SectionHeading
          eyebrow="Active Roster"
          title="Current Team"
          subtitle="Our active members shaping the future of sustainable automotive systems."
        />

        {!searchActive && (
          <GenerationTabs
            generations={currentGenerations}
            active={activeGen}
            onChange={setActiveGen}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={searchActive ? "search" : activeGen}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="about-grid"
          >
            {visible.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
            No members match your search.
          </p>
        )}
      </div>
    </section>
  );
}
