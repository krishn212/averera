"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { Member } from "@/data/team";
import SocialLinks from "./SocialLinks";
import SkillBadge from "./SkillBadge";
import ContributionTimeline from "./ContributionTimeline";
import Gallery from "./Gallery";

export default function ProfileDrawer({
  member,
  onClose,
}: {
  member: Member | null;
  onClose: () => void;
}) {
  const gallery = member
    ? Array.from({ length: 3 }).map(
        (_, i) => `https://api.dicebear.com/8.x/shapes/svg?seed=${member.id}-${i}&backgroundColor=131820`
      )
    : [];

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-graphite-950/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} profile`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col overflow-y-auto border-l border-white/10 bg-graphite-900/95 backdrop-blur-2xl sm:w-[440px] max-sm:top-auto max-sm:h-[88vh] max-sm:rounded-t-2xl max-sm:border-l-0 max-sm:border-t"
          >
            <div className="sticky top-0 z-10 flex items-center justify-end bg-graphite-900/95 p-4 backdrop-blur">
              <button
                onClick={onClose}
                aria-label="Close profile"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted hover:text-copper-400"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col items-center px-6 pb-10 text-center">
              <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-copper-400/50">
                <Image src={member.photo} alt={member.name} fill sizes="120px" className="object-cover" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-paper">{member.name}</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-copper-400">
                {member.position}
              </p>
              <p className="mt-1 text-xs text-muted">
                {member.department} · Gen {member.generation}
              </p>

              <SocialLinks social={member.social} className="mt-4" />

              <p className="mt-6 text-left text-sm leading-relaxed text-muted/90">{member.bio}</p>

              <div className="mt-8 w-full text-left">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal-400">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((s) => (
                    <SkillBadge key={s}>{s}</SkillBadge>
                  ))}
                </div>
              </div>

              <div className="mt-8 w-full text-left">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal-400">
                  Projects
                </h3>
                <ul className="space-y-1.5 text-sm text-paper/90">
                  {member.projects.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-copper-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 w-full text-left">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal-400">
                  Achievements
                </h3>
                <ul className="space-y-1.5 text-sm text-paper/90">
                  {member.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-400" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 w-full text-left">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal-400">
                  Contribution Timeline
                </h3>
                <ContributionTimeline entries={member.timeline} />
              </div>

              <div className="mt-8 w-full text-left">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal-400">
                  Gallery
                </h3>
                <Gallery photos={gallery} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
