"use client";

import { motion } from "framer-motion";
import type { Member } from "@/data/team";
import MemberCard from "./MemberCard";

export default function SearchResultsSection({
  members,
  onSelect,
}: {
  members: Member[];
  onSelect: (m: Member) => void;
}) {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-signal-400">
            Search Results
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-paper">
            {members.length} {members.length === 1 ? "member" : "members"} found
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
          ))}
        </div>

        {members.length === 0 && (
          <p className="text-center text-sm text-muted">
            No members match that search. Try a different name, role, or department.
          </p>
        )}
      </div>
    </section>
  );
}
