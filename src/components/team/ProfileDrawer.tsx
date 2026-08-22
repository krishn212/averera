"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Member } from "../../data/team";
import SocialLinks from "./SocialLinks";
import SkillBadge from "./SkillBadge";
import ContributionTimeline from "./ContributionTimeline";
import Gallery from "./Gallery";

export default function ProfileDrawer({
  member,
  onClose,
}: {
  member: Member | null;
  onClose: () => void;
}) {
  const gallery = member
    ? Array.from({ length: 3 }).map(
        (_, i) => `https://api.dicebear.com/8.x/shapes/svg?seed=${member.id}-${i}&backgroundColor=131820`
      )
    : [];

  return (
    <AnimatePresence>
      {member && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'var(--drawer-overlay, rgba(0, 0, 0, 0.45))',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} profile`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 10000,
              width: '100%',
              maxWidth: '440px',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--blur-radius))',
              borderLeft: '1px solid var(--border-color)',
              boxShadow: 'var(--card-shadow)',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
            className="mobile-drawer-bottom"
          >
            {/* Exit button positioned outside box on desktop, inside on mobile */}
            <button
              onClick={onClose}
              aria-label="Close profile"
              className="drawer-close-btn"
              style={{
                position: 'absolute',
                top: '20px',
                display: 'flex',
                height: '36px',
                width: '36px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--card-shadow)',
                zIndex: 10002,
              }}
            >
              <X size={15} />
            </button>

            {/* Profile Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '0 24px 40px 24px',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}>
              {/* Profile Avatar */}
              <div style={{
                position: 'relative',
                height: '110px',
                width: '110px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--glass-border)',
                boxShadow: 'var(--card-shadow)',
                marginBottom: '16px'
              }}>
                <img src={member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Title Names */}
              <h2 style={{
                fontFamily: 'var(--font-title)',
                fontSize: '1.6rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                margin: '0 0 4px 0',
                lineHeight: '1.2'
              }}>
                {member.name}
              </h2>
              
              <div 
                className="badge-glass"
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 10px',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {member.position}
              </div>

              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                margin: '0 0 16px 0',
                fontFamily: 'var(--font-body)'
              }}>
                {member.department} · Gen {member.generation}
              </p>

              <SocialLinks social={member.social} style={{ marginBottom: '24px' }} />

              <p style={{
                fontSize: '0.88rem',
                lineHeight: '1.5',
                color: 'var(--text-secondary)',
                textAlign: 'left',
                margin: '24px 0 0 0',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '20px',
                width: '100%'
              }}>
                {member.bio}
              </p>

              {/* Technical Details segments */}
              <div style={{ width: '100%', textAlign: 'left', marginTop: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '6px'
                }}>
                  Skills
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {member.skills.map((s) => (
                    <SkillBadge key={s}>{s}</SkillBadge>
                  ))}
                </div>
              </div>

              <div style={{ width: '100%', textAlign: 'left', marginTop: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '6px'
                }}>
                  Projects
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {member.projects.map((p) => (
                    <li key={p} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                      <span style={{ height: '5px', width: '5px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '6px', shrink: '0' }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ width: '100%', textAlign: 'left', marginTop: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '6px'
                }}>
                  Achievements
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {member.achievements.map((a) => (
                    <li key={a} style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                      <span style={{ height: '5px', width: '5px', borderRadius: '50%', background: 'var(--accent-green, #10B981)', marginTop: '6px', shrink: '0' }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ width: '100%', textAlign: 'left', marginTop: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '6px'
                }}>
                  Contribution Timeline
                </h3>
                <ContributionTimeline entries={member.timeline} />
              </div>

              <div style={{ width: '100%', textAlign: 'left', marginTop: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '6px'
                }}>
                  Gallery
                </h3>
                <Gallery photos={gallery} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
