"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Member } from "@/data/team";
import { currentGenerations } from "@/data/team";
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
    <section id="current-team" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Active Roster"
          title="Current Team"
          subtitle="Our active members shaping the future of Team Averera."
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
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visible.map((m, i) => (
              <motion.div key={m.id} className="animate-float-hover">
                <MemberCard member={m} index={i} onClick={() => onSelect(m)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="text-center text-sm text-muted">No members match your search.</p>
        )}
      </div>
    </section>
  );
}
