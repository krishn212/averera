"use client";

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
  variant?: "leadership" | "default";
  index?: number;
}) {
  const isLeadership = variant === "leadership";

  return (
    <ParticleCard
      className="about-card"
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      enableBorderGlow={true}
      particleCount={8}
      glowColor="24, 208, 219"
      style={{
        padding: '30px 24px',
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
          <div style={{
            position: 'relative',
            width: isLeadership ? '110px' : '90px',
            height: isLeadership ? '110px' : '90px',
            margin: '0 auto 16px auto',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--card-shadow)',
          }}>
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

          {/* Department / Gen */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            margin: '0 0 10px 0',
            fontFamily: 'var(--font-body)',
          }}>
            {member.department}
          </p>

          {isLeadership && member.bio && (
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              margin: '0 0 15px 0',
              lineHeight: '1.45',
              opacity: 0.85,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {member.bio}
            </p>
          )}
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
  );
}
