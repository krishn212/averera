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
  const isLeft = align === "left";

  return (
    <div className="timeline-node-row" style={{
      position: 'relative',
      display: 'flex',
      width: '100%',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      alignItems: 'center',
    }}>
      {/* Dot on the spine */}
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          height: '16px',
          width: '16px',
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          border: '3px solid var(--bg-color)',
          boxShadow: isOpen
            ? '0 0 12px rgba(24, 208, 220, 0.5), 0 0 4px rgba(24, 208, 220, 0.3)'
            : '0 0 6px rgba(24, 208, 220, 0.2)',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Horizontal connecting arm — hidden on mobile via CSS */}
      <div
        className="timeline-arm"
        style={{
          position: 'absolute',
          top: '50%',
          left: isLeft ? '50%' : 'auto',
          right: isLeft ? 'auto' : '50%',
          width: 'calc(50% - 170px)',
          height: '2px',
          background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, var(--accent-cyan), transparent)`,
          transform: 'translateY(-50%)',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      {/* Card button */}
      <motion.button
        onClick={onClick}
        whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(24, 208, 220, 0.15)' }}
        whileTap={{ scale: 0.97 }}
        className="timeline-card-btn"
        style={{
          background: 'var(--glass-bg)',
          border: isOpen ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
          boxShadow: isOpen ? '0 0 20px rgba(24, 208, 220, 0.12)' : 'var(--card-shadow)',
          cursor: 'pointer',
          width: 'calc(50% - 40px)',
          maxWidth: '340px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 22px',
          borderRadius: '16px',
          zIndex: 5,
          position: 'relative',
          backdropFilter: 'blur(12px)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1.3rem',
              fontWeight: '800',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            {year}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)',
              marginTop: '2px',
            }}
          >
            {count} members
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            height: '30px',
            width: '30px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            color: isOpen ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            background: isOpen ? 'rgba(24, 208, 220, 0.08)' : 'transparent',
            transition: 'all 0.3s ease',
          }}
        >
          <Plus size={14} />
        </motion.span>
      </motion.button>
    </div>
  );
}
