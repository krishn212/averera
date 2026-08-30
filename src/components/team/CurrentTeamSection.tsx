"use client";

import { useMemo, useRef, useState } from "react";
import type { Member } from "../../data/team";
import SectionHeading from "./SectionHeading";
import MemberCard from "./MemberCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CurrentTeamSection({
  members,
  onSelect,
  searchActive,
}: {
  members: Member[];
  onSelect: (m: Member) => void;
  searchActive: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const toggleVertical = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  // De-duplicate the input members list by name to avoid duplicates between leadership and vertical lists
  const uniqueMembers = useMemo(() => {
    const seen = new Set<string>();
    return members.filter((m) => {
      const nameKey = m.name.trim().toLowerCase();
      if (seen.has(nameKey)) return false;
      seen.add(nameKey);
      return true;
    });
  }, [members]);

  // 1. Core Leadership (Heads / Managers)
  const pors = useMemo(() => {
    const activeLeaderNames = [
      "subhakanta mohapatra",
      "subhakanta",
      "aryan sharma",
      "raghav sharma",
      "vasu srivastava",
      "keerthana sri k m",
      "jai sharma"
    ];
    return uniqueMembers
      .filter((m) => activeLeaderNames.includes(m.name.trim().toLowerCase()))
      .sort((a, b) => {
        const indexA = activeLeaderNames.indexOf(a.name.trim().toLowerCase());
        const indexB = activeLeaderNames.indexOf(b.name.trim().toLowerCase());
        return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
      });
  }, [uniqueMembers]);

  // 2. Verticals definition
  const verticals = [
    { key: "Mechanical", label: "Vehicle Design" },
    { key: "Technical", label: "Autonomy" },
    { key: "Electronics", label: "Embedded Systems" },
    { key: "Management", label: "Branding & Outreach" },
  ];

  // Group members into their respective verticals (and sort senior to junior: 12 -> 13 -> 14)
  const verticalGroups = useMemo(() => {
    return verticals.map((v) => {
      const groupMembers = uniqueMembers
        .filter((m) => m.team === v.key)
        .sort((a, b) => Number(a.generation) - Number(b.generation));
      return {
        ...v,
        members: groupMembers,
      };
    });
  }, [uniqueMembers]);

  if (searchActive) {
    return (
      <section id="current-members" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <div ref={gridRef} className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
          <SectionHeading
            eyebrow="Search Results"
            title="Matching Members"
            subtitle="Current active team members matching search criteria."
          />
          <div className="about-grid" style={{ marginTop: '30px' }}>
            {members.map((m, i) => (
              <MemberCard key={m.id} member={m} index={i} onClick={() => onSelect(m)} />
            ))}
          </div>
          {members.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '20px' }}>
              No members match your search.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="current-members" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
      <div ref={gridRef} className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        {/* 1. POSITIONS OF RESPONSIBILITY SECTION */}
        <div style={{ marginBottom: '60px' }}>
          <SectionHeading
            eyebrow="Leadership Roster"
            title="Core Leadership"
            subtitle="The managers and heads driving TEAM AVERERA's research directives."
          />
          <div className="about-grid" style={{ marginTop: '30px' }}>
            {pors.map((m, i) => (
              <MemberCard key={`por-${m.id}`} member={m} index={i} variant="leadership" onClick={() => onSelect(m)} />
            ))}
          </div>
        </div>

        {/* 2. VERTICAL WISE SUBDIVISIONS */}
        <div style={{ marginTop: '60px', borderTop: '1px solid var(--border-color)', paddingTop: '50px' }}>
          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
              Team Verticals
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {verticalGroups.map((v) => {
              if (v.members.length === 0) return null;
              const isExpanded = expandedKey === v.key;

              const accentColors: Record<string, string> = {
                Mechanical: '6, 182, 212',   // cyan
                Technical:  '99, 102, 241',  // indigo
                Electronics:'16, 185, 129',  // emerald
                Management: '245, 158, 11',  // amber
              };
              const accent = accentColors[v.key] || '24, 208, 219';

              return (
                <div key={v.key} style={{
                  borderRadius: '14px',
                  border: `1px solid ${isExpanded ? `rgba(${accent}, 0.35)` : 'var(--border-color)'}`,
                  background: isExpanded ? `rgba(${accent}, 0.04)` : 'var(--glass-bg)',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, background 0.25s ease',
                  boxShadow: isExpanded ? `0 0 0 1px rgba(${accent},0.1), 0 4px 24px rgba(${accent},0.06)` : 'none'
                }}>
                  {/* Header */}
                  <div
                    onClick={() => toggleVertical(v.key)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '18px',
                      padding: '20px 24px',
                      userSelect: 'none',
                    }}
                  >
                    {/* Left accent bar */}
                    <div style={{
                      width: '3px',
                      height: '40px',
                      borderRadius: '2px',
                      background: `rgb(${accent})`,
                      flexShrink: 0,
                      opacity: isExpanded ? 1 : 0.5,
                      transition: 'opacity 0.25s ease'
                    }} />

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1.45rem',
                        fontWeight: '800',
                        color: 'var(--text-primary)',
                        marginBottom: '3px',
                        letterSpacing: '-0.019em'
                      }}>
                        {v.label}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        color: `rgb(${accent})`,
                        opacity: 0.8
                      }}>
                        {v.members.length} member{v.members.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Chevron */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: `1px solid rgba(${accent}, ${isExpanded ? '0.4' : '0.15'})`,
                      background: `rgba(${accent}, ${isExpanded ? '0.12' : '0.05'})`,
                      color: `rgb(${accent})`,
                      transition: 'all 0.25s ease',
                      flexShrink: 0
                    }}>
                      <motion.i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: '0.72rem' }}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 24px 24px 24px',
                          borderTop: `1px solid rgba(${accent}, 0.12)`
                        }}>
                          <div className="about-grid" style={{ marginTop: '20px' }}>
                            {v.members.map((m, i) => (
                              <MemberCard key={`vert-${v.key}-${m.id}`} member={m} index={i} onClick={() => onSelect(m)} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
