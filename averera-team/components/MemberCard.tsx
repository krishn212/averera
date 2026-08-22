"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Member } from "@/data/team";
import SocialLinks from "./SocialLinks";

export default function MemberCard({
  member,
  onClick,
  variant = "default",
  index = 0,
}: {
  member: Member;
  onClick: () => void;
  variant?: "leadership" | "default";
  index?: number;
}) {
  const isLeadership = variant === "leadership";

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={`focus-ring group relative w-full overflow-hidden rounded-xl2 border border-white/8 bg-graphite-850/60 p-5 text-left backdrop-blur-md transition-shadow duration-300 hover:shadow-glow ${
        isLeadership ? "p-6" : ""
      }`}
    >
      {/* animated glow border */}
      <span className="pointer-events-none absolute inset-0 rounded-xl2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:linear-gradient(135deg,rgba(224,138,60,0.18),transparent_60%)]" />

      <div className="relative flex flex-col items-center text-center">
        <div
          className={`relative mb-4 overflow-hidden rounded-full ring-1 ring-white/10 transition-all duration-300 group-hover:ring-copper-400/60 ${
            isLeadership ? "h-24 w-24" : "h-20 w-20"
          }`}
        >
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h3 className="font-display text-base font-semibold text-paper">{member.name}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-wide text-copper-400">
          {member.position}
        </p>
        <p className="mt-1 text-xs text-muted">{member.department}</p>

        {isLeadership && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted/90">{member.bio}</p>
        )}

        <motion.div
          initial={false}
          className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <SocialLinks social={member.social} />
        </motion.div>
      </div>
    </motion.button>
  );
}
