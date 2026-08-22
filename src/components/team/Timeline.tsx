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
    <div className="relative mx-auto max-w-4xl" style={{ margin: '0 auto', width: '100%', position: 'relative' }}>
      {/* Centered timeline spine */}
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 0,
          height: '100%',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--border-color), transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ transformOrigin: "top", height: '100%', width: '100%', background: 'var(--accent-cyan)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 2 }}>
        {generations.map((g, i) => {
          const isOpen = openYear === g.year;
          return (
            <motion.div
              key={g.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{ width: '100%' }}
            >
              <TimelineNode
                year={g.year}
                count={g.members.length}
                isOpen={isOpen}
                align={i % 2 === 0 ? "left" : "right"}
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
