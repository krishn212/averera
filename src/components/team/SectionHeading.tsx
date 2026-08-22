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
      className="section-header"
      style={{ marginBottom: '50px', textAlign: 'center' }}
    >
      <div className="badge-glass" style={{ marginBottom: '15px', display: 'inline-flex', alignItems: 'center' }}>
        <i className="fa-solid fa-gears" style={{ marginRight: '6px' }}></i> {eyebrow}
      </div>
      <h2 style={{ 
        fontFamily: 'var(--font-title)', 
        color: 'var(--text-primary)', 
        textTransform: 'uppercase',
        fontSize: '2.2rem',
        fontWeight: '700',
        margin: '0 0 12px 0'
      }}>
        {title}
      </h2>
      <p style={{ 
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        margin: '0 auto',
        fontSize: '0.95rem'
      }}>
        {subtitle}
      </p>
    </motion.div>
  );
}
