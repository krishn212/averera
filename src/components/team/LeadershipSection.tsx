"use client";

import { AnimatePresence } from "framer-motion";
import type { Member } from "../../data/team";
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
    <section id="leadership" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <SectionHeading
          eyebrow="Office Bearers"
          title="Leadership Team"
          subtitle="Meet the core leaders directing our research and engineering."
        />
        <div className="about-grid">
          <AnimatePresence mode="popLayout">
            {members.map((m, i) => (
              <PORCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </AnimatePresence>
        </div>
        {members.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
            No leadership members match your search.
          </p>
        )}
      </div>
    </section>
  );
}
