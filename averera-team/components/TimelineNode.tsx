"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function TimelineNode({
  year,
  count,
  isOpen,
  align,
  onClick,
}: {
  year: string;
  count: number;
  isOpen: boolean;
  align: "left" | "right";
  onClick: () => void;
}) {
  return (
    <div
      className={`relative flex w-full items-center ${
        align === "left" ? "justify-start md:justify-end md:pr-[52%]" : "justify-start md:pl-[52%]"
      }`}
    >
      {/* node dot on the spine */}
      <span
        className={`absolute left-3 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-graphite-950 transition-colors duration-300 md:left-1/2 md:-translate-x-1/2 ${
          isOpen ? "bg-copper-400 shadow-glow" : "bg-signal-500"
        }`}
      />

      <motion.button
        onClick={onClick}
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`focus-ring glass relative ml-10 flex w-full max-w-sm items-center justify-between rounded-xl2 px-6 py-4 text-left transition-shadow duration-300 hover:shadow-glow md:ml-0 ${
          isOpen ? "border-copper-400/50 shadow-glow" : ""
        }`}
      >
        <div>
          <div className="font-display text-xl font-semibold text-paper">{year}</div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-muted">
            {count} members
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-copper-400"
        >
          <Plus size={16} />
        </motion.span>
      </motion.button>
    </div>
  );
}
