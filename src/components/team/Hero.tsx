"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="section-header"
      style={{
        paddingTop: '60px',
        paddingBottom: '20px',
        textAlign: 'center',
        background: 'transparent',
      }}
    >
      <div className="badge-glass" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center' }}>
        <i className="fa-solid fa-users" style={{ marginRight: '6px' }}></i> TEAM AVERERA · IIT BHU
      </div>

      <h1 className="alumni-hero-h1" style={{
        fontFamily: 'var(--font-title)',
        fontWeight: '800',
        lineHeight: '1.15',
        marginBottom: '20px',
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        textTransform: 'uppercase'
      }}>
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            THE PEOPLE
          </motion.span>
        </span>
        <span style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
            className="logo-accent"
          >
            BEHIND THE MACHINE.
          </motion.span>
        </span>
      </h1>

      {/* Animated separator line using theme color */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "120px", opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
          style={{
            height: '2px',
            background: 'var(--accent-cyan)',
            margin: '20px 0'
          }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          maxWidth: '650px',
          margin: '0 auto 30px auto',
          fontSize: '1.05rem',
          lineHeight: '1.6',
          color: 'var(--text-secondary)'
        }}
      >
        Engineers, designers, builders, and visionaries shaping the future of sustainable mobility.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <a href="#team-showcase" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          Meet Our Team <i className="fa-solid fa-arrow-down" style={{ marginLeft: '6px' }}></i>
        </a>
      </motion.div>
    </section>
  );
}
