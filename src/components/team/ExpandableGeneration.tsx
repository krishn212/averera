"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Member } from "../../data/team";
import MemberCard from "./MemberCard";

export default function ExpandableGeneration({
  isOpen,
  members,
  onSelect,
}: {
  isOpen: boolean;
  members: Member[];
  onSelect: (m: Member) => void;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden', width: '100%' }}
        >
          <div className="about-grid" style={{ marginTop: '24px', width: '100%', boxSizing: 'border-box' }}>
            {members.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
