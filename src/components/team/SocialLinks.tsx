"use client";

import type { SocialLinks as SocialLinksType } from "../../data/team";

export default function SocialLinks({
  social,
  className,
}: {
  social: SocialLinksType;
  className?: string;
}) {
  const iconMap = [
    { key: "linkedin" as const, iconClass: "fa-brands fa-linkedin", label: "LinkedIn" },
    { key: "github" as const, iconClass: "fa-brands fa-github", label: "GitHub" },
    { key: "portfolio" as const, iconClass: "fa-solid fa-globe", label: "Portfolio" },
    { key: "email" as const, iconClass: "fa-solid fa-envelope", label: "Email" },
  ];

  return (
    <div className={`socials ${className ?? ""}`} style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: 0, padding: 0 }}>
      {iconMap.map(({ key, iconClass, label }) => {
        const href = social[key];
        if (!href) return null;
        const url = key === "email" ? `mailto:${href}` : href;
        return (
          <a
            key={key}
            href={url}
            target={key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <i className={iconClass}></i>
          </a>
        );
      })}
    </div>
  );
}
