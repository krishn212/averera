"use client";

import { AnimatePresence } from "framer-motion";
import type { Member } from "@/data/team";
import SectionHeading from "./SectionHeading";
import PORCard from "./PORCard";

export default function LeadershipSection({
  members,
  onSelect,
}: {
  members: Member[];
  onSelect: (m: Member) => void;
}) {
  return (
    <section id="leadership" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Office Bearers"
          title="Leadership Team"
          subtitle="Meet the people currently leading Team Averera."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {members.map((m, i) => (
              <PORCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </AnimatePresence>
        </div>
        {members.length === 0 && (
          <p className="text-center text-sm text-muted">No leadership members match your search.</p>
        )}
      </div>
    </section>
  );
}
