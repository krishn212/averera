"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

const headline = "Meet Our Team";

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 8,
      })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-copper-400/40"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-graphite-950"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-grid-blueprint bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-mesh-1 animate-drift" />

      {/* Blurred glowing circles */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-copper-500/20 blur-[120px]" />
      <div className="absolute -right-24 bottom-1/4 h-[28rem] w-[28rem] rounded-full bg-signal-500/10 blur-[140px]" />

      <Particles />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mb-8 flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-signal-400"
        >
          <span className="h-1.5 w-1.5 animate-pulse-line rounded-full bg-signal-400" />
          Team Averera · IIT BHU
        </motion.div>

        <h1 className="font-display text-balance text-5xl font-semibold leading-[1.05] text-paper sm:text-6xl md:text-7xl">
          {headline.split(" ").map((word, wi) => (
            <span key={wi} className="mr-4 inline-block overflow-hidden last:mr-0">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block ${wi === 2 ? "text-copper-400" : ""}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-6 max-w-xl text-balance text-base text-muted sm:text-lg"
        >
          The people who innovate, build, compete, and carry forward the legacy
          of Team Averera.
        </motion.p>

        <motion.a
          href="#leadership"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="focus-ring mt-10 flex flex-col items-center gap-2 text-muted transition hover:text-copper-400"
          aria-label="Scroll to leadership section"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
