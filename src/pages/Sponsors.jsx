import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import prospectusPdf from '../assets/PARTNERSHIP_PROSPECTUS_2026-27.pdf';

import spMain  from '../assets/sponsors.avif';
import sp1     from '../assets/sponsors1.avif';
import sp2     from '../assets/sponsors2.avif';
import sp3     from '../assets/sponsors3.avif';
import sp4     from '../assets/sponsors4.avif';
import sp5     from '../assets/sponsors5.avif';
import sp6     from '../assets/sponsors6.avif';
import sp7     from '../assets/sponsors7.avif';
import sp8     from '../assets/sponsors8.avif';
import sp9     from '../assets/sponsors9.avif';
import sp10    from '../assets/sponsors10.avif';
import sp11    from '../assets/sponsors11.avif';
import sp12    from '../assets/sponsors12.avif';
import sp13    from '../assets/sponsors13 (2).avif';
import sp14    from '../assets/sponsors14.avif';
import spTata  from '../assets/tata.avif';
import spIitbhu from '../assets/IITBHU_logo.avif';
import spCerd  from '../assets/cerd logo.avif';

const logos = [spTata, spIitbhu, spCerd, spMain, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12, sp13, sp14];
const row1 = [...logos, ...logos];
const row2 = [...logos.slice().reverse(), ...logos.slice().reverse()];

export default function Sponsors({ setActivePage }) {
  return (
    <main className="page-main" style={{ boxSizing: 'border-box', overflow: 'hidden' }}>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section style={{ padding: '90px 24px 60px', textAlign: 'center', position: 'relative' }}>
        {/* Decorative glow blob */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(24,208,220,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="badge-glass"
            style={{ marginBottom: '22px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-handshake" style={{ fontSize: '0.75rem' }}></i>
            Our Partners & Sponsors
          </motion.div>

          <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: '900',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              TRUSTED BY
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: '900',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0,
              }}
              className="logo-accent"
            >
              INDUSTRY LEADERS.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              maxWidth: '560px', margin: '0 auto',
              fontSize: '1rem', lineHeight: '1.65',
              color: 'var(--text-secondary)',
            }}
          >
            These organisations have backed Team Averera's push for sustainable mobility — from lab to global stage.
          </motion.p>
        </div>
      </section>

      {/* ─── MARQUEE ROWS ────────────────────────────────────── */}
      <section style={{ padding: '70px 0 60px', overflow: 'hidden' }}>
        <div style={{ marginBottom: '12px' }}>
          <div className="badge-glass" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            margin: '0 0 28px 40px'
          }}>
            <i className="fa-solid fa-star" style={{ fontSize: '0.6rem', color: 'var(--accent-cyan)' }}></i>
            Our sponsors
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div style={{ overflow: 'hidden', marginBottom: '18px' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '16px', width: 'max-content' }}
          >
            {row1.map((img, i) => (
              <div
                key={`r1-${i}`}
                style={{
                  flexShrink: 0,
                  width: '190px',
                  height: '100px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '18px 20px',
                  backdropFilter: 'blur(10px)',
                  transition: 'border-color 0.2s',
                }}
              >
                <img src={img} alt="Sponsor" style={{ maxWidth: '100%', maxHeight: '54px', objectFit: 'contain' }} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex', gap: '16px', width: 'max-content' }}
          >
            {row2.map((img, i) => (
              <div
                key={`r2-${i}`}
                style={{
                  flexShrink: 0,
                  width: '190px',
                  height: '100px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '18px 20px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <img src={img} alt="Sponsor" style={{ maxWidth: '100%', maxHeight: '54px', objectFit: 'contain' }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WHY PARTNER ─────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--border-color)', padding: '80px 24px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '52px' }}
          >
            <div className="badge-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px', padding: '4px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <i className="fa-solid fa-seedling" style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem' }}></i>
              Why Partner with us
            </div>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '800', color: 'var(--text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              Make an Impact
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { icon: 'fa-earth-asia',     color: '16, 185, 129', title: 'CSR & Green Energy',       body: 'Fulfil CSR goals by backing a zero-emission student automotive project competing on the global stage.' },
              { icon: 'fa-graduation-cap', color: '99, 102, 241',  title: 'Top Talent Pipeline',     body: 'Gain direct access to the brightest engineering minds at IIT (BHU) Varanasi for recruitment and R&D partnerships.' },
              { icon: 'fa-bullhorn',       color: '245, 158, 11', title: 'Global Brand Visibility', body: 'Feature on Shell Eco-Marathon platforms, international press, and across our digital and physical media.' },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: `0 10px 30px rgba(${c.color}, 0.12)` }}
                style={{
                  background: 'var(--glass-bg)',
                  border: `1px solid rgba(${c.color}, 0.2)`,
                  borderRadius: '16px',
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
              >
                {/* subtle top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `rgb(${c.color})`, borderRadius: '16px 16px 0 0' }} />
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `rgba(${c.color}, 0.12)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  <i className={`fa-solid ${c.icon}`} style={{ color: `rgb(${c.color})`, fontSize: '1.1rem' }}></i>
                </div>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 10px 0' }}>{c.title}</h4>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0 }}>{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px 100px',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '700px', height: '260px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(24,208,220,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}
        >
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Become Part of<br />
            <span style={{ color: 'var(--accent-cyan)' }}>the Journey</span>
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '36px' }}>
            Ready to fuel sustainable innovation? Download our partnership prospectus or reach out directly.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={prospectusPdf} download="PARTNERSHIP_PROSPECTUS_2026-27.pdf" className="btn btn-glow">
              Download Prospectus <i className="fa-solid fa-download" style={{ marginLeft: '6px' }}></i>
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                if (setActivePage) {
                  sessionStorage.setItem('scrollToContact', 'true');
                  setActivePage('home');
                }
              }}
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
