"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LegacyGeneration, Member } from "@/data/team";
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
    <div className="relative mx-auto max-w-4xl">
      {/* the spine — glowing circuit trace */}
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-signal-500/40 to-transparent md:left-1/2">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="h-full w-full bg-gradient-to-b from-copper-400/70 via-signal-500/50 to-copper-400/20"
        />
      </div>

      <div className="flex flex-col gap-10">
        {generations.map((g, i) => {
          const isOpen = openYear === g.year;
          const align = i % 2 === 0 ? "left" : "right";
          return (
            <motion.div
              key={g.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
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
