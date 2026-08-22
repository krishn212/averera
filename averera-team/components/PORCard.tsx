"use client";

import type { Member } from "@/data/team";
import MemberCard from "./MemberCard";

export default function PORCard({
  member,
  onClick,
  index,
}: {
  member: Member;
  onClick: () => void;
  index: number;
}) {
  return <MemberCard member={member} onClick={onClick} variant="leadership" index={index} />;
}
