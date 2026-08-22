"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function TimelineNode({
  year,
  count,
  isOpen,
  onClick,
}: {
  year: string;
  count: number;
  isOpen: boolean;
  align: "left" | "right";
  onClick: () => void;
}) {
  return (
    <div style={{ position: 'relative', display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      {/* Centered dot indicator on spine */}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          height: '14px',
          width: '14px',
          borderRadius: '50%',
          border: '2.5px solid var(--bg-color)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
        className={isOpen ? "bg-copper-500 shadow-glow" : "bg-signal-500"}
      />

      <motion.button
        onClick={onClick}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'var(--glass-bg)',
          border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
          boxShadow: isOpen ? '0 0 15px rgba(24, 208, 220, 0.15)' : 'var(--card-shadow)',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '300px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderRadius: '16px',
          zIndex: 5,
          position: 'relative'
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {year}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', tracking: '0.05em', color: 'var(--text-secondary)' }}>
            {count} members
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            height: '28px',
            width: '28px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)'
          }}
        >
          <Plus size={14} />
        </motion.span>
      </motion.button>
    </div>
  );
}
