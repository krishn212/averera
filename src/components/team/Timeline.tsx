"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LegacyGeneration, Member } from "../../data/team";
import TimelineNode from "./TimelineNode";
import ExpandableGeneration from "./ExpandableGeneration";

export default function Timeline({
  generations,
  onSelect,
}: {
  generations: LegacyGeneration[];
  onSelect: (m: Member) => void;
}) {
  const [openYear, setOpenYear] = useState<string | null>(generations[0]?.year ?? null);

  return (
    <div className="team-timeline-root" style={{ margin: '0 auto', width: '100%', maxWidth: '900px', position: 'relative' }}>
      {/* Centered timeline spine */}
      <div className="team-timeline-spine">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{
            transformOrigin: "top",
            height: '100%',
            width: '100%',
            background: 'linear-gradient(to bottom, transparent, rgba(24, 208, 220, 0.4) 5%, rgba(24, 208, 220, 0.3) 95%, transparent)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 2 }}>
        {generations.map((g, i) => {
          const isOpen = openYear === g.year;
          const align = i % 2 === 0 ? "left" : "right";

          return (
            <motion.div
              key={g.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              style={{ width: '100%' }}
            >
              <TimelineNode
                year={g.year}
                count={g.members.length}
                isOpen={isOpen}
                align={align}
                onClick={() => setOpenYear(isOpen ? null : g.year)}
              />
              <ExpandableGeneration isOpen={isOpen} members={g.members} onSelect={onSelect} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
