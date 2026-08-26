import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    setIsPhotoOpen(false);
  }, [member]);

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
              background: 'var(--drawer-overlay, rgba(0, 0, 0, 0.65))',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Centered Modal Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} profile`}
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              zIndex: 10000,
              width: '90%',
              maxWidth: '540px',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(var(--blur-radius))',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              boxShadow: 'var(--card-shadow)',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
            className="centered-profile-modal"
          >
            {/* Exit button */}
            <button
              onClick={onClose}
              aria-label="Close profile"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
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
              padding: '40px 24px 40px 24px',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}>
              {/* Profile Avatar */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPhotoOpen(true);
                }}
                style={{
                  position: 'relative',
                  height: '110px',
                  width: '110px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--glass-border)',
                  boxShadow: 'var(--card-shadow)',
                  marginBottom: '16px',
                  cursor: 'zoom-in',
                }}
              >
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
            </div>
          </motion.div>
          
          {/* Photo Zoom Modal Overlay */}
          {isPhotoOpen && typeof window !== 'undefined' && createPortal(
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsPhotoOpen(false);
              }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(10, 12, 16, 0.85)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 11000,
                cursor: 'zoom-out',
                animation: 'fadeIn 0.25s ease-out',
              }}
            >
              <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes scaleUp {
                  from { transform: scale(0.9); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
              `}</style>
              <div 
                onClick={(e) => e.stopPropagation()} 
                style={{
                  position: 'relative',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    borderRadius: '16px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    objectFit: 'contain',
                  }}
                />
                <h3 style={{
                  marginTop: '20px',
                  color: '#ffffff',
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '4px',
                  textAlign: 'center',
                }}>
                  {member.name}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  margin: 0,
                }}>
                  {member.position}
                </p>
                
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPhotoOpen(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </AnimatePresence>
  );
}
