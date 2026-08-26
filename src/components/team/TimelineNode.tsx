"use client";

import { motion } from "framer-motion";

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
  const isLeft = align === "left";

  // Each generation gets a distinct accent so the timeline reads like a colour-coded history
  const genColors: Record<string, string> = {
    "1":  "6, 182, 212",    // cyan   — Founders
    "2":  "99, 102, 241",   // indigo
    "3":  "16, 185, 129",   // emerald
    "4":  "245, 158, 11",   // amber
    "5":  "239, 68, 68",    // red
    "6":  "168, 85, 247",   // violet
    "7":  "59, 130, 246",   // blue
    "8":  "20, 184, 166",   // teal
    "9":  "234, 179, 8",    // yellow
    "10": "249, 115, 22",   // orange
    "11": "132, 204, 22",   // lime
  };
  const accent = genColors[year] ?? "24, 208, 219";
  const label = year === "1" ? "FOUNDERS" : `GEN ${year}`;

  return (
    <div
      className="timeline-node-row"
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        alignItems: "center",
      }}
    >
      {/* Dot on the spine */}
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          height: isOpen ? "18px" : "13px",
          width:  isOpen ? "18px" : "13px",
          borderRadius: "50%",
          background: `rgb(${accent})`,
          border: `3px solid var(--bg-color)`,
          boxShadow: isOpen
            ? `0 0 16px rgba(${accent}, 0.55), 0 0 4px rgba(${accent}, 0.3)`
            : `0 0 6px rgba(${accent}, 0.25)`,
          transition: "all 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal arm */}
      <div
        className="timeline-arm"
        style={{
          position: "absolute",
          top: "50%",
          left: isLeft ? "50%" : "auto",
          right: isLeft ? "auto" : "50%",
          width: "calc(50% - 170px)",
          height: "1px",
          background: `linear-gradient(${isLeft ? "to left" : "to right"}, rgba(${accent}, 0.6), transparent)`,
          transform: "translateY(-50%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <motion.button
        onClick={onClick}
        whileHover={{ y: -2, boxShadow: `0 8px 28px rgba(${accent}, 0.18)` }}
        whileTap={{ scale: 0.98 }}
        className="timeline-card-btn"
        style={{
          background: isOpen ? `rgba(${accent}, 0.06)` : "var(--glass-bg)",
          border: `1px solid ${isOpen ? `rgba(${accent}, 0.45)` : "var(--border-color)"}`,
          boxShadow: isOpen
            ? `0 0 0 1px rgba(${accent},0.12), 0 6px 28px rgba(${accent},0.1)`
            : "var(--card-shadow)",
          cursor: "pointer",
          width: "calc(50% - 40px)",
          maxWidth: "340px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 20px",
          borderRadius: "14px",
          zIndex: 5,
          position: "relative",
          backdropFilter: "blur(12px)",
          transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        {/* Left accent bar */}
        <div style={{
          width: "3px",
          height: "38px",
          borderRadius: "2px",
          background: `rgb(${accent})`,
          flexShrink: 0,
          opacity: isOpen ? 1 : 0.45,
          transition: "opacity 0.25s ease",
        }} />

        {/* Label + count */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{
            fontFamily: "var(--font-title)",
            fontSize: "1.05rem",
            fontWeight: "800",
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: `rgb(${accent})`,
            opacity: 0.8,
            marginTop: "3px",
          }}>
            {count} member{count !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Chevron toggle */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "7px",
          border: `1px solid rgba(${accent}, ${isOpen ? "0.45" : "0.18"})`,
          background: `rgba(${accent}, ${isOpen ? "0.14" : "0.06"})`,
          color: `rgb(${accent})`,
          transition: "all 0.25s ease",
          flexShrink: 0,
        }}>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", lineHeight: 1 }}
          >
            +
          </motion.span>
        </div>
      </motion.button>
    </div>
  );
}
