// =============================================================
// team.ts — SINGLE SOURCE OF TRUTH for Team Averera's roster.
// To add a member or a new generation, edit this file only.
// No member data should ever be hardcoded inside components.
// =============================================================

export type Department =
  | "Mechanical Engineering"
  | "Electrical Engineering"
  | "Electronics Engineering"
  | "Computer Science"
  | "Industrial Design"
  | "Pharmaceutical Engineering";

export type TeamGroup =
  | "Technical"
  | "Electronics"
  | "Mechanical"
  | "Design"
  | "Research"
  | "Management";

export interface TimelineEntry {
  year: string;
  label: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  email?: string;
}

export interface Member {
  id: string;
  name: string;
  photo: string;
  department: Department;
  generation: string; // e.g. "2026"
  team: TeamGroup;
  position: string;
  bio: string;
  skills: string[];
  projects: string[];
  achievements: string[];
  timeline: TimelineEntry[];
  social: SocialLinks;
  isCurrent: boolean;
  isLeadership: boolean;
}

const photo = (seed: string) =>
  `https://api.dicebear.com/8.x/notionists/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=131820`;


// -------------------------------------------------------------
// Helper to cut down on boilerplate for roster-only entries
// (alumni / current members that don't need a full bio yet —
// still typed fully so the Profile Drawer always has content).
// -------------------------------------------------------------
function makeMember(opts: {
  name: string;
  position: string;
  department: Department;
  generation: string;
  team: TeamGroup;
  isCurrent: boolean;
  isLeadership: boolean;
  bio?: string;
  skills?: string[];
  projects?: string[];
  achievements?: string[];
  timeline?: TimelineEntry[];
  social?: SocialLinks;
}): Member {
  const slug = opts.name.toLowerCase().replace(/[^a-z]+/g, "");
  return {
    id: `${opts.generation}-${slug}`,
    name: opts.name,
    photo: photo(opts.name),
    department: opts.department,
    generation: opts.generation,
    team: opts.team,
    position: opts.position,
    bio:
      opts.bio ??
      `${opts.position} for Generation ${opts.generation}, contributing to Team Averera's robotics, research, and competition efforts within ${opts.department}.`,
    skills: opts.skills ?? ["Problem Solving", "Teamwork", "CAD", "Documentation"],
    projects: opts.projects ?? ["Team Averera Robotics Platform"],
    achievements: opts.achievements ?? [`Active contributor, Generation ${opts.generation}`],
    timeline: opts.timeline ?? [
      { year: opts.generation, label: `Joined as ${opts.position}` },
    ],
    social: opts.social ?? {},
    isCurrent: opts.isCurrent,
    isLeadership: opts.isLeadership,
  };
}

// -------------------------------------------------------------
// LEADERSHIP — current POR holders
// -------------------------------------------------------------
export const leadership: Member[] = [
  makeMember({
    name: "Aarav Sharma",
    position: "President",
    department: "Mechanical Engineering",
    generation: "2026",
    team: "Management",
    isCurrent: true,
    isLeadership: true,
    bio: "A passionate robotics enthusiast focused on autonomous systems, manufacturing, and leadership. Has represented Team Averera in multiple national competitions and mentored junior members.",
    skills: ["C++", "Python", "ROS", "SolidWorks", "Fusion 360", "Embedded Systems"],
    projects: [
      "Autonomous Ground Robot",
      "Smart Navigation Platform",
      "Aero India Exhibition Prototype",
      "Team Website Revamp",
    ],
    achievements: [
      "National Robotics Finalist",
      "Organized 15+ Workshops",
      "Mentored 30+ Students",
      "Published Undergraduate Research",
    ],
    timeline: [
      { year: "2023", label: "Joined Team" },
      { year: "2023", label: "Software Team Member" },
      { year: "2024", label: "Technical Coordinator" },
      { year: "2025", label: "Vice President" },
      { year: "2026", label: "President" },
    ],
  }),
  makeMember({
    name: "Priyanshu Verma",
    position: "Vice President",
    department: "Electrical Engineering",
    generation: "2026",
    team: "Management",
    isCurrent: true,
    isLeadership: true,
    bio: "Managed operations and coordinated interdisciplinary projects, keeping every subsystem of Team Averera moving in sync.",
    skills: ["Project Management", "Power Systems", "MATLAB", "Team Coordination"],
    projects: ["Cross-Team Ops Dashboard", "Battery Management System"],
    achievements: ["Streamlined cross-department workflows", "Secured key sponsorships"],
  }),
  makeMember({
    name: "Ananya Singh",
    position: "Technical Head",
    department: "Computer Science",
    generation: "2026",
    team: "Technical",
    isCurrent: true,
    isLeadership: true,
    bio: "Led autonomous systems development and software architecture across the team's robotics stack.",
    skills: ["Python", "ROS2", "Computer Vision", "System Architecture"],
    projects: ["Autonomous Navigation Stack", "Vision-Based Object Detection"],
    achievements: ["Architected the team's core software stack", "Led 4 competition deployments"],
  }),
  makeMember({
    name: "Rohan Das",
    position: "Design Head",
    department: "Industrial Design",
    generation: "2026",
    team: "Design",
    isCurrent: true,
    isLeadership: true,
    bio: "Designed robot chassis, branding, and technical presentations that define how Team Averera is seen.",
    skills: ["Fusion 360", "Figma", "Industrial Design", "Branding"],
    projects: ["Chassis Redesign 2026", "Team Brand Identity"],
    achievements: ["Redesigned the team's full visual identity"],
  }),
  makeMember({
    name: "Ishita Gupta",
    position: "Research Lead",
    department: "Pharmaceutical Engineering",
    generation: "2026",
    team: "Research",
    isCurrent: true,
    isLeadership: true,
    bio: "Worked on advanced materials research and prototype testing to push component reliability forward.",
    skills: ["Materials Science", "Research Methodology", "Data Analysis"],
    projects: ["Advanced Composite Materials Study"],
    achievements: ["Co-authored 2 research papers"],
  }),
  makeMember({
    name: "Vivek Nair",
    position: "Electronics Lead",
    department: "Electronics Engineering",
    generation: "2026",
    team: "Electronics",
    isCurrent: true,
    isLeadership: true,
    bio: "Developed embedded systems, PCB design, and sensor integration for every active platform on the team.",
    skills: ["PCB Design", "Embedded C", "Sensor Fusion", "Altium"],
    projects: ["Custom Sensor Array PCB", "Embedded Control Firmware"],
    achievements: ["Designed 6 production PCBs"],
  }),
  makeMember({
    name: "Rahul Mehta",
    position: "Manufacturing Lead",
    department: "Mechanical Engineering",
    generation: "2026",
    team: "Mechanical",
    isCurrent: true,
    isLeadership: true,
    bio: "Manages CAD, fabrication, and manufacturing processes, turning designs into competition-ready hardware.",
    skills: ["CAD", "CNC Machining", "Fabrication", "GD&T"],
    projects: ["Chassis Manufacturing Pipeline"],
    achievements: ["Cut fabrication turnaround time by 40%"],
  }),
];

// -------------------------------------------------------------
// CURRENT TEAM — by generation
// -------------------------------------------------------------
const gen2026 = [
  {
    name: "Aditi Roy",
    position: "Frontend Developer",
    department: "Computer Science" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://linkedin.com/in/aditi-roy",
      github: "https://github.com/aditiroyr",
    },
  },
  {
    name: "Arjun Patel",
    position: "Backend Developer",
    department: "Computer Science" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://linkedin.com/in/arjun-patel",
      github: "https://github.com/arjunpatel",
      portfolio: "https://arjunpatel.dev",
    },
  },
];
const gen2025 = [
  {
    name: "Aditi Roy",
    position: "Frontend Developer",
    department: "Computer Science" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://linkedin.com/in/aditi-roy",
      github: "https://github.com/aditiroyr",
    },
  },
  {
    name: "Arjun Patel",
    position: "Backend Developer",
    department: "Computer Science" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://linkedin.com/in/arjun-patel",
      github: "https://github.com/arjunpatel",
      portfolio: "https://arjunpatel.dev",
    },
  },
];
const gen2024 = [
  {
    name: "Aditi Roy",
    position: "Frontend Developer",
    department: "Computer Science" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://linkedin.com/in/aditi-roy",
      github: "https://github.com/aditiroyr",
    },
  },
  {
    name: "Arjun Patel",
    position: "Backend Developer",
    department: "Computer Science" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://linkedin.com/in/arjun-patel",
      github: "https://github.com/arjunpatel",
      portfolio: "https://arjunpatel.dev",
    },
  },
];


function buildGeneration(
  list: Array<{
    name: string;
    position: string;
    department: Department;
    team: TeamGroup;
    social?: SocialLinks;
  }>,
  generation: string
): Member[] {
  return list.map((member) =>
    makeMember({
      name: member.name,
      position: member.position,
      department: member.department,
      team: member.team,
      generation,
      isCurrent: true,
      isLeadership: false,
      social: member.social,
    })
  );
}

export const currentTeam: Member[] = [
  ...buildGeneration(gen2026, "2026"),
  ...buildGeneration(gen2025, "2025"),
  ...buildGeneration(gen2024, "2024"),
];

export const currentGenerations = ["2026", "2025", "2024"];

// -------------------------------------------------------------
// ALUMNI — Team Legacy timeline
// -------------------------------------------------------------
interface AlumniData {
  name: string;
  position: string;
  department: Department;
  team: TeamGroup;

  bio?: string;
  skills?: string[];
  projects?: string[];
  achievements?: string[];
  timeline?: TimelineEntry[];
  social?: SocialLinks;
}
const alumniRoster: Record<string, AlumniData[]> = {
 "2023": [
  {
    name: "Rahul Sharma",
    position: "Team Captain",
    department: "Mechanical Engineering",
    team: "Management",

    bio: "Led Team Averera during the 2023 season and coordinated the mechanical and competition teams.",

    skills: [
      "SolidWorks",
      "CAD",
      "Manufacturing",
      "Team Leadership",
    ],

    projects: [
      "Autonomous Ground Robot",
      "Competition Vehicle",
    ],

    achievements: [
      "Led the team in national competitions",
      "Mentored junior members",
    ],

    timeline: [
      { year: "2021", label: "Joined Team" },
      { year: "2022", label: "Mechanical Lead" },
      { year: "2023", label: "Team Captain" },
    ],

    social: {
      linkedin: "https://linkedin.com/in/rahul-sharma",
      github: "https://github.com/rahulsharma",
      portfolio: "https://rahulsharma.dev",
      email: "rahul@example.com",
    },
  },

  {
    name: "Shubham Agarwal",
    position: "Technical Lead",
    department: "Computer Science",
    team: "Technical",

    bio: "Led software development and autonomous systems for Team Averera.",

    skills: [
      "C++",
      "Python",
      "ROS",
      "Computer Vision",
    ],

    projects: [
      "Autonomous Navigation System",
      "Computer Vision Pipeline",
    ],

    achievements: [
      "Led software development",
      "Deployed autonomous systems in competitions",
    ],

    timeline: [
      { year: "2021", label: "Joined Team" },
      { year: "2022", label: "Software Developer" },
      { year: "2023", label: "Technical Lead" },
    ],

    social: {
      linkedin: "https://linkedin.com/in/shubham-agarwal",
      github: "https://github.com/shubhamagarwal",
    },
  },

  {
    name: "Anjali Gupta",
    position: "Design Lead",
    department: "Industrial Design",
    team: "Design",

    social: {
      linkedin: "https://linkedin.com/in/anjali-gupta",
      portfolio: "https://anjaligupta.design",
    },
  },

  {
    name: "Akash Singh",
    position: "Manufacturing Head",
    department: "Mechanical Engineering",
    team: "Mechanical",

    social: {
      linkedin: "https://linkedin.com/in/akash-singh",
    },
  },

  {
    name: "Priya Nair",
    position: "Electronics Engineer",
    department: "Electronics Engineering",
    team: "Electronics",

    social: {
      linkedin: "https://linkedin.com/in/priya-nair",
      github: "https://github.com/priyanair",
    },
  },

  {
    name: "Manish Verma",
    position: "Software Developer",
    department: "Computer Science",
    team: "Technical",

    social: {
      linkedin: "https://linkedin.com/in/manish-verma",
      github: "https://github.com/manishverma",
    },
  },
],
"2022": [
  {
    name: "Aditya Mehta",
    position: "President",
    department: "Mechanical Engineering",
    team: "Management",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Rohan Kapoor",
    position: "Technical Head",
    department: "Computer Science",
    team: "Technical",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Sneha Gupta",
    position: "Research Lead",
    department: "Pharmaceutical Engineering",
    team: "Research",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
    },
  },
],
"2021": [
  {
    name: "Aditya Mehta",
    position: "President",
    department: "Mechanical Engineering",
    team: "Management",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Rohan Kapoor",
    position: "Technical Head",
    department: "Computer Science",
    team: "Technical",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Sneha Gupta",
    position: "Research Lead",
    department: "Pharmaceutical Engineering",
    team: "Research",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
    },
  },
],
"2020": [
  {
    name: "Aditya Mehta",
    position: "President",
    department: "Mechanical Engineering",
    team: "Management",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Rohan Kapoor",
    position: "Technical Head",
    department: "Computer Science",
    team: "Technical",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Sneha Gupta",
    position: "Research Lead",
    department: "Pharmaceutical Engineering",
    team: "Research",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
    },
  },
],
"2019": [
  {
    name: "Aditya Mehta",
    position: "President",
    department: "Mechanical Engineering",
    team: "Management",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Rohan Kapoor",
    position: "Technical Head",
    department: "Computer Science",
    team: "Technical",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Sneha Gupta",
    position: "Research Lead",
    department: "Pharmaceutical Engineering",
    team: "Research",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
    },
  },
],
"2015": [
  {
    name: "Aditya Mehta",
    position: "President",
    department: "Mechanical Engineering",
    team: "Management",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Rohan Kapoor",
    position: "Technical Head",
    department: "Computer Science",
    team: "Technical",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
      github: "ACTUAL_GITHUB_URL",
    },
  },

  {
    name: "Sneha Gupta",
    position: "Research Lead",
    department: "Pharmaceutical Engineering",
    team: "Research",

    social: {
      linkedin: "ACTUAL_LINKEDIN_URL",
    },
  },
],
};

export interface LegacyGeneration {
  year: string;
  members: Member[];
}

export const legacyGenerations: LegacyGeneration[] = Object.entries(alumniRoster)
  .map(([year, list]) => ({
    year,
   members: list.map((member) =>
  makeMember({
    name: member.name,
    position: member.position,
    department: member.department,
    generation: year,
    team: member.team,

    bio: member.bio,
    skills: member.skills,
    projects: member.projects,
    achievements: member.achievements,
    timeline: member.timeline,
    social: member.social,

    isCurrent: false,
    isLeadership: false,
  })
),
  }))
  .sort((a, b) => Number(b.year) - Number(a.year));

export const alumni: Member[] = legacyGenerations.flatMap((g) => g.members);

// -------------------------------------------------------------
// COMBINED — everything, for search/filtering
// -------------------------------------------------------------
export const allMembers: Member[] = [...leadership, ...currentTeam, ...alumni];

export const filterChips = [
  "All",
  "Leadership",
  "Current Team",
  "Alumni",
  // "Technical",
  // "Electronics",
  // "Mechanical",
  // "Design",
  // "Research",
  // "Management",
] as const;

export type FilterChip = (typeof filterChips)[number];

export function matchesFilter(member: Member, chip: FilterChip): boolean {
  switch (chip) {
    case "All":
      return true;
    case "Leadership":
      return member.isLeadership;
    case "Current Team":
      return member.isCurrent && !member.isLeadership;
    case "Alumni":
      return !member.isCurrent;
    default:
      return member.team === chip;
  }
}

// -------------------------------------------------------------
// STATS
// -------------------------------------------------------------
export const stats = [
  { value: 7, suffix: "+", label: "Generations" },
  { value: 120, suffix: "+", label: "Members" },
  { value: 35, suffix: "+", label: "National Competitions" },
  { value: 60, suffix: "+", label: "Projects" },
  { value: 150, suffix: "+", label: "Workshops" },
  { value: 20, suffix: "+", label: "Awards" },
];
