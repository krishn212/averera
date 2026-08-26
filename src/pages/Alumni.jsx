import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { legacyGenerations, alumniStats } from "../data/team";
import LegacySection from "../components/team/LegacySection";
import ProfileDrawer from "../components/team/ProfileDrawer";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.4, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Alumni({ setActivePage }) {
  const [selected, setSelected] = useState(null);

  return (
    <main className="page-main" style={{ boxSizing: 'border-box' }}>

      {/* 1. HERO / INTRODUCTION */}
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
          <i className="fa-solid fa-graduation-cap" style={{ marginRight: '6px' }}></i> Averera Alumni
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
            maxWidth: '650px',
            margin: '0 auto 30px auto',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            color: 'var(--text-secondary)'
          }}
        >
          Our graduates are pioneering next-generation automotive systems, leading global tech organizations, and founding startup ecosystems worldwide.
        </motion.p>
      </section>

      {/* 2. ALUMNI IMPACT STATS DASHBOARD (Including collective startup count) */}
      <section className="stats-section" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '60px 0', background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
          <div className="stats-grid">
            {alumniStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="stat-card"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  textAlign: 'center',
                  boxShadow: 'var(--card-shadow)'
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', fontSize: '2.6rem', fontWeight: '800' }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TIMELINE / GENERATIONS ROSTER */}
      <LegacySection generations={legacyGenerations} onSelect={setSelected} />


      {/* Profile Details Drawer */}
      <ProfileDrawer member={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
