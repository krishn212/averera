"use client";

import { motion } from "framer-motion";
import type { Member } from "../../data/team";
import MemberCard from "./MemberCard";
import SectionHeading from "./SectionHeading";

export default function SearchResultsSection({
  members,
  onSelect,
}: {
  members: Member[];
  onSelect: (m: Member) => void;
}) {
  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <SectionHeading
          eyebrow="Query Complete"
          title="Search Results"
          subtitle={`${members.length} ${members.length === 1 ? "member" : "members"} found matching your search parameters.`}
        />

        <div className="about-grid">
          {members.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
          ))}
        </div>

        {members.length === 0 && (
          <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
            No members match that search. Try a different name, role, or department.
          </p>
        )}
      </div>
    </section>
  );
}
