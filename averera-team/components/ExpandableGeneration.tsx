"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Member } from "@/data/team";
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
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="ml-10 mt-4 grid grid-cols-1 gap-4 pb-2 pr-2 sm:grid-cols-2 md:ml-0 md:grid-cols-3">
            {members.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
