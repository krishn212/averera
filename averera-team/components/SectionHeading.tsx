"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-signal-400">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">{title}</h2>
      <p className="mt-3 text-sm text-muted sm:text-base">{subtitle}</p>
    </motion.div>
  );
}
