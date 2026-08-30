import { useState } from "react";
import { motion } from "framer-motion";
import { legacyGenerations } from "../data/team";
import LegacySection from "../components/team/LegacySection";
import ProfileDrawer from "../components/team/ProfileDrawer";

export default function Alumni({ setActivePage }) {
  const [selected, setSelected] = useState(null);

  return (
    <main className="page-main" style={{ boxSizing: 'border-box' }}>

      {/* 1. Alumni Header */}
      <section
        id="top"
        className="section-header"
        style={{
          paddingTop: '60px',
          paddingBottom: '20px',
          textAlign: 'center',
          background: 'transparent',
          maxWidth: '850px',
          margin: '0 auto 10px auto',
        }}
      >
        <div className="badge-glass" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center' }}>
          <i className="fa-solid fa-graduation-cap" style={{ marginRight: '6px' }}></i> AVERERA ALUMNI
        </div>

        <h1 className="alumni-hero-h1" style={{
          fontFamily: 'var(--font-title, Oxanium, sans-serif)',
          fontSize: 'clamp(2.5rem, 5.5vw, 3.8rem)',
          fontWeight: '800',
          lineHeight: '1.15',
          marginBottom: '16px',
          letterSpacing: '-0.01em',
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
              THE ALUMNI
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
              NETWORK.
            </motion.span>
          </span>
        </h1>

        {/* Separator line */}
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
            maxWidth: '680px',
            margin: '0 auto',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            color: 'var(--text-secondary)'
          }}
        >
          Founded in 2013 in a hostel common room, with a vision to build a greener future and transform electric mobility in India.
        </motion.p>
      </section>

      {/* 2. Generations Timeline Roster */}
      <LegacySection generations={legacyGenerations} onSelect={setSelected} />

      {/* Profile Details Drawer */}
      <ProfileDrawer member={selected} onClose={() => setSelected(null)} simpleOnly={true} />
    </main>
  );
}
