import { useState } from "react";
import { createPortal } from "react-dom";
import type { Member } from "../../data/team";
import SocialLinks from "./SocialLinks";
import { ParticleCard } from "../MagicBento";

export default function MemberCard({
  member,
  onClick,
  variant = "default",
}: {
  member: Member;
  onClick: () => void;
  variant?: "leadership" | "default" | "alumni";
  index?: number;
}) {
  const isLeadership = variant === "leadership";
  const isAlumni = variant === "alumni";
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  const photoModal = isPhotoOpen && typeof window !== 'undefined' && createPortal(
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
        zIndex: 99999,
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
        
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPhotoOpen(false);
          }}
          style={{
            position: 'absolute',
            top: '-50px',
            right: isMobile ? '0px' : '-50px',
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
  );

  if (isAlumni) {
    return (
      <>
        <ParticleCard
          className="about-card"
          enableTilt={!isMobile}
          enableMagnetism={!isMobile}
          clickEffect={false}
          enableBorderGlow={!isMobile}
          particleCount={0}
          glowColor="24, 208, 219"
          style={{
            padding: '24px 16px',
            cursor: 'default',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            boxSizing: 'border-box',
            borderRadius: 'inherit',
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Avatar container */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setIsPhotoOpen(true);
              }}
              style={{
                position: 'relative',
                width: '90px',
                height: '90px',
                margin: '0 auto 16px auto',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--card-shadow)',
                cursor: 'zoom-in',
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                loading="lazy"
              />
            </div>

            {/* Name */}
            <h4 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: '0 0 14px 0',
              lineHeight: '1.2',
            }}>
              {member.name}
            </h4>

            {/* Social Links (LinkedIn button only) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SocialLinks social={member.social} />
            </div>
          </div>
        </ParticleCard>
        {photoModal}
      </>
    );
  }

  return (
    <>
      <ParticleCard
        className="about-card"
        enableTilt={!isMobile}
        enableMagnetism={!isMobile}
        clickEffect={true}
        enableBorderGlow={!isMobile}
        particleCount={isMobile ? 0 : 8}
        glowColor="24, 208, 219"
        style={{
          padding: isMobile ? '20px 16px' : '30px 24px',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: 'inherit',
        }}
      >
        <div onClick={onClick} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Avatar container */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setIsPhotoOpen(true);
              }}
              style={{
                position: 'relative',
                width: isLeadership ? '110px' : '90px',
                height: isLeadership ? '110px' : '90px',
                margin: '0 auto 16px auto',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--card-shadow)',
                cursor: 'zoom-in',
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                loading="lazy"
              />
            </div>

            {/* Name */}
            <h4 style={{
              fontFamily: 'var(--font-title)',
              fontSize: '1.2rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              margin: '0 0 6px 0',
              lineHeight: '1.2',
            }}>
              {member.name}
            </h4>

            {/* Role Position */}
            {isLeadership && (
              <div className="badge-glass" style={{
                fontSize: '0.68rem',
                padding: '2px 10px',
                marginBottom: '10px',
                borderColor: 'var(--glass-border)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.05em',
                display: 'inline-block',
              }}>
                {member.position}
              </div>
            )}

            {/* Department / Gen */}
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              margin: '0 0 10px 0',
              fontFamily: 'var(--font-body)',
            }}>
              {member.department}
            </p>


          </div>

          {/* Social Links / Action footer inside card */}
          <div style={{
            width: '100%',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '15px',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Gen {member.generation}
            </span>
            <SocialLinks social={member.social} />
          </div>
        </div>
      </ParticleCard>
      {photoModal}
    </>
  );
}
