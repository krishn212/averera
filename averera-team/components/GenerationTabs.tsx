"use client";

import { motion } from "framer-motion";

export default function GenerationTabs({
  generations,
  active,
  onChange,
}: {
  generations: string[];
  active: string;
  onChange: (gen: string) => void;
}) {
  return (
    <div className="glass mx-auto mb-12 flex w-fit items-center gap-1 rounded-full p-1">
      {generations.map((gen) => {
        const isActive = gen === active;
        return (
          <button
            key={gen}
            onClick={() => onChange(gen)}
            className="focus-ring relative rounded-full px-5 py-2 font-mono text-sm transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="active-gen-tab"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-copper-400"
              />
            )}
            <span className={`relative z-10 ${isActive ? "text-graphite-950" : "text-muted"}`}>
              Gen {gen}
            </span>
          </button>
        );
      })}
    </div>
  );
}
