"use client";

import { Linkedin, Github, Globe, Mail } from "lucide-react";
import type { SocialLinks as SocialLinksType } from "@/data/team";
import { motion } from "framer-motion";

const iconMap = [
  { key: "linkedin" as const, Icon: Linkedin, label: "LinkedIn" },
  { key: "github" as const, Icon: Github, label: "GitHub" },
  { key: "portfolio" as const, Icon: Globe, label: "Portfolio" },
  { key: "email" as const, Icon: Mail, label: "Email" },
];

export default function SocialLinks({
  social,
  className,
}: {
  social: SocialLinksType;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {iconMap.map(({ key, Icon, label }) => {
        const href = social[key];
        if (!href) return null;
        const url = key === "email" ? `mailto:${href}` : href;
        return (
          <motion.a
            key={key}
            href={url}
            target={key === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
            whileHover={{ y: -2, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted hover:border-copper-500/50 hover:text-copper-400"
          >
            <Icon size={14} />
          </motion.a>
        );
      })}
    </div>
  );
}
