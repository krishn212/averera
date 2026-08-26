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
  | "Civil Engineering"
  | "Mining Engineering"
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
  generation: string; // e.g. "14"
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
  photo?: string;
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
    photo: opts.photo ?? photo(opts.name),
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
    name: "Subhakanta Mohapatra",
    photo: "/src/assets/team/subhakanta.jpg",
    position: "Team Manager",
    department: "Mechanical Engineering",
    generation: "13",
    team: "Mechanical",
    isCurrent: true,
    isLeadership: true,
    bio: "Worked on designing the chassis and structural analysis of the vehicle outerbody, serving as Team Manager for 2026-27.",
    projects: ["Chassis Structural Design & Validation","Outerbody Structural Analysis"],
    achievements: ["Team Manager (2026-27)"],
    skills: ["Team Leadership","Operations","Project Execution","Branding","SolidWorks","ANSYS Structural","Chassis Design"],
    social: {
      email: "subhakanta@itbhu.ac.in",
    },
  }),
  makeMember({
    name: "Aryan Sharma",
    photo: "/src/assets/team/aryan_sharma.jpg",
    position: "Project Manager (Urban Concept EV)",
    department: "Mechanical Engineering",
    generation: "13",
    team: "Management",
    isCurrent: true,
    isLeadership: true,
    bio: "Worked on transmission design and driving strategy, serving as Project Manager (Urban Concept) for 2026-27.",
    projects: ["Transmission System Design","Competition Driving Strategy Optimization"],
    achievements: ["Project Manager (Urban Concept EV) (2026-27)"],
    skills: ["Project Management","Automotive Systems","Agile Execution","Gearbox Design","Driving Strategy Analysis"],
    social: {
      email: "aryan.sharma.mec24@itbhu.ac.in",
    },
  }),
  makeMember({
    name: "Vasu Srivastava",
    photo: "/src/assets/team/vasu_srivastava.jpg",
    position: "Vehicle Design Head",
    department: "Mechanical Engineering",
    generation: "13",
    team: "Mechanical",
    isCurrent: true,
    isLeadership: true,
    bio: "Worked on design and aerodynamic analysis of the vehicle outerbody, serving as Vehicle Design Head for 2026-27.",
    skills: ["SolidWorks","ANSYS Structural","Aerodynamics Analysis","GD&T","CFD Simulations"],
    projects: ["Aerodynamic Analysis of Car Outerbody","Outerbody Geometric CAD Design","Alterno Shell Design Redesign","Chassis Structural Testing"],
    achievements: ["Vehicle Design Head (2026-27)","Successfully optimized chassis weight targets by 10%"],
    social: {
      linkedin: "https://www.linkedin.com/in/vasu-srivastava-752291344/",
      email: "vasu.srivastava.cd.mec24@itbhu.ac.in",
    },
  }),
  makeMember({
    name: "Keerthana Sri K M",
    photo: "/src/assets/team/keerthana_sri_km.jpg",
    position: "Vehicle Design Head",
    department: "Mechanical Engineering",
    generation: "13",
    team: "Mechanical",
    isCurrent: true,
    isLeadership: true,
    bio: "Worked on designing and validating the vehicle chassis frame, serving as Vehicle Design Head for 2026-27.",
    skills: ["CAD/CAM","Manufacturing Execution","Chassis Stress Analysis","Team Management","SolidWorks","Finite Element Analysis (FEA)"],
    projects: ["Chassis Structural Design & Finite Element Analysis","Suspension Mounting Refinement"],
    achievements: ["Vehicle Design Head (2026-27)","Led manufacturing process optimization for the VD team"],
    social: {
      linkedin: "https://www.linkedin.com/in/keerthana-moorthy-605736326",
      email: "keerthana.srikm.cd.mec24@itbhu.ac.in",
    },
  }),
  makeMember({
    name: "Jai Sharma",
    position: "Embedded Systems Head",
    department: "Electronics Engineering",
    generation: "13",
    team: "Electronics",
    isCurrent: true,
    isLeadership: true,
    bio: "Designed the dual motor control PCB and developed its core control logic, serving as Embedded Head for 2026-27.",
    skills: ["Embedded C", "Circuit Integration", "Microcontrollers", "RTOS", "PCB Design", "Altium Designer", "Control Theory"],
    projects: ["Dual Motor Control PCB Layout", "Control Logic Firmware Stack"],
    achievements: ["Embedded Systems Head (2026-27)"],
    social: {
      email: "jai.sharma.ece24@itbhu.ac.in",
    },
  }),
  makeMember({
    name: "Raghav Sharma",
    photo: "/src/assets/team/raghav_sharma.jpg",
    position: "Autonomy Head",
    department: "Mechanical Engineering",
    generation: "13",
    team: "Technical",
    isCurrent: true,
    isLeadership: true,
    bio: "Worked on computer vision, object detection, and voxelization algorithms, serving as Autonomy Head for 2026-27.",
    skills: ["Python","C++","ROS2","Computer Vision","Deep Learning","Motion Control","Voxelization"],
    projects: ["Computer Vision, Object Detection & Voxelization Stack","SAE Level-2 Autonomy Stack Deployments"],
    achievements: ["Autonomy Head (2026-27)","Engineered highly reliable autonomous lane tracking model"],
    social: {
      linkedin: "https://www.linkedin.com/in/raghavs8",
      email: "raghavsharma.r25@gmail.com",
    },
  }),
];

// -------------------------------------------------------------
// CURRENT TEAM — by generation
// -------------------------------------------------------------
const gen2026 = [
  {
    name: "Siddh Sharma",
    photo: "/src/assets/team/siddh_sharma.jpg",
    position: "Autonomy Member (ML)",
    department: "Mechanical Engineering" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/siddh-sharma-41a2a0239",
      email: "siddh.sharma.mec25@itbhu.ac.in",
    },
  },
  {
    name: "Divya Nand Sharma",
    photo: "/src/assets/team/divya_nand_sharma.png",
    position: "Autonomy Member (Computer Vision)",
    department: "Civil Engineering" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/divyanand-sharma",
      email: "divyanand.sharma.civ25@itbhu.ac.in",
    },
  },
  {
    name: "Narsepalli Sai Ashrith",
    photo: "/src/assets/team/sai_ashrith.webp",
    position: "VD Member (Steering)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/sai-ashrith-narsepalli-699606373/",
      email: "narsepallis.ashrith.mec25@itbhu.ac.in",
    },
  },
  {
    name: "Parth Gupta",
    photo: "/src/assets/team/parth_gupta.jpeg",
    position: "Autonomy Member",
    department: "Mechanical Engineering" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/parth-gupta-78013a3b6",
      email: "parth.gupta.mec25@itbhu.ac.in",
    },
  },
  {
    name: "MD AYAAN",
    photo: "/src/assets/team/md_ayaan.jpeg",
    position: "Autonomy Member",
    department: "Mining Engineering" as Department,
    team: "Technical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/md-ayaan-538ba9379",
      email: "md.ayaan.min25@itbhu.ac.in",
    },
  },
  {
    name: "Ansh Mehrotra",
    photo: "/src/assets/team/ansh_mehrotra.jpg",
    position: "Technical Coordinator (Transmission)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/ansh-mehrotra-a72b8336a",
      email: "anshmehrotraofficial@gmail.com",
    },
  },
  {
    name: "V L Shivadhar",
    photo: "/src/assets/team/vl_shivadhar.jpg",
    position: "Technical Coordinator (Embedded)",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/v-l-shivadhar-52aa9136a",
      email: "vleela.shivadhar.ece25@itbhu.ac.in",
    },
  },
  {
    name: "Anvi Verma",
    photo: "/src/assets/team/anvi_verma.jpg",
    position: "Technical Coordinator (Aerodynamics)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/anviverma07",
      email: "anvi.verma.mec25@itbhu.ac.in",
    },
  },
  {
    name: "Peddada Shanmukh Sai Das Chakradar",
    photo: "/src/assets/team/peddada_shanmukh.jpeg",
    position: "Web Developer",
    department: "Electronics Engineering" as Department,
    team: "Management" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/peddada-shanmukh-b31560272",
      email: "shannu.chakri@gmail.com",
    },
  },
  {
    name: "Pillitla Vennela",
    photo: "/src/assets/team/pillitla_vennela.png",
    position: "Embedded Member",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/vennela-pillitla-13344b37b",
      email: "pillitla.vennela.ece25@itbhu.ac.in",
    },
  },
  {
    name: "Hemanth Sai",
    photo: "/src/assets/team/hemanth_sai.jpg",
    position: "VD Member (Transmission)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/hemanth-sai-80270a2aa",
      email: "bandlamudi.hemanths.mec25@itbhu.ac.in",
    },
  },
  {
    name: "Anika Sachan",
    photo: "/src/assets/team/anika_sachan.jpg",
    position: "Embedded Member",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/anika-sachan-7aba6036a",
      email: "anika.sachan.ece25@itbhu.ac.in",
    },
  },
  {
    name: "Krishna Rao",
    photo: "/src/assets/team/krishna_rao.png",
    position: "Embedded Member",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/krishna-rao-a04aa6371",
      email: "krishnarao3180.work@gmail.com",
    },
  },
  {
    name: "Prathmesh Jadhav",
    photo: "/src/assets/team/prathmesh_jadhav.jpg",
    position: "Technical Coordinator (Transmission)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/prathmesh-jadhav-16b7213b1",
      email: "prathmesh.hjadhav.mec25@itbhu.ac.in",
    },
  },
  {
    name: "Mukunda H V",
    photo: "/src/assets/team/mukunda_hv.jpg",
    position: "Technical Coordinator (Embedded)",
    department: "Electrical Engineering" as Department,
    team: "Electronics" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/mukunda-h-v-620a0238a",
      email: "mukunda.hv.eee25@itbhu.ac.in",
    },
  },
  {
    name: "A Krishnapadma",
    photo: "/src/assets/team/a_krishnapadma.jpg",
    position: "Technical Coordinator (Embedded)",
    department: "Electrical Engineering" as Department,
    team: "Electronics" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/krishnapadma-aravind-313164421",
      email: "a.krishnapadma.eee25@itbhu.ac.in",
    },
  },
  {
    name: "Aisha Ambreen Hashmi",
    photo: "/src/assets/team/aisha_ambreen_hashmi.jpg",
    position: "Technical Coordinator (Braking)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    social: {
      linkedin: "https://www.linkedin.com/in/aisha-hashmi-227589375",
      email: "aishaambreen.hashmi.mec25@itbhu.ac.in",
    },
  },
];

const gen2025 = [
  {
    name: "Subhakanta Mohapatra",
    photo: "/src/assets/team/subhakanta.jpg",
    position: "Team Manager",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on designing the chassis and structural analysis of the vehicle outerbody, serving as Team Manager for 2026-27.",
    projects: ["Chassis Structural Design & Validation", "Outerbody Structural Analysis"],
    achievements: ["Team Manager (2026-27)"],
    skills: ["SolidWorks", "ANSYS Structural", "Chassis Design"],
    social: {
      email: "subhakanta@itbhu.ac.in",
    },
  },
  {
    name: "Aryan Sharma",
    photo: "/src/assets/team/aryan_sharma.jpg",
    position: "Project Manager (Urban Concept EV)",
    department: "Mechanical Engineering" as Department,
    team: "Management" as TeamGroup,
    bio: "Worked on transmission design and driving strategy, serving as Project Manager (Urban Concept) for 2026-27.",
    projects: ["Transmission System Design", "Competition Driving Strategy Optimization"],
    achievements: ["Project Manager (Urban Concept EV) (2026-27)"],
    skills: ["Gearbox Design", "Driving Strategy Analysis", "Project Management"],
    social: {
      email: "aryan.sharma.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Jai Sharma",
    position: "Embedded Systems Head",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    bio: "Designed the dual motor control PCB and developed its core control logic, serving as Embedded Head for 2026-27.",
    projects: ["Dual Motor Control PCB Layout", "Control Logic Firmware Stack"],
    achievements: ["Embedded Systems Head (2026-27)"],
    skills: ["PCB Design", "Altium Designer", "Control Theory", "Embedded C"],
    social: {
      email: "jai.sharma.ece24@itbhu.ac.in",
    },
  },
  {
    name: "Vasu Srivastava",
    photo: "/src/assets/team/vasu_srivastava.jpg",
    position: "VD Head",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on the design and aerodynamic analysis of the car outerbody, serving as Vehicle Design Head for 2026-27.",
    projects: ["Aerodynamic Analysis of Car Outerbody", "Outerbody Geometric CAD Design"],
    achievements: ["Vehicle Design Head (2026-27)"],
    skills: ["SolidWorks", "Aerodynamics Analysis", "CFD Simulations"],
    social: {
      linkedin: "https://www.linkedin.com/in/vasu-srivastava-752291344/",
      email: "vasu.srivastava.cd.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Joshua Somabattula",
    photo: "/src/assets/team/joshua_somabattula.jpeg",
    position: "VD Engineer (Braking System)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on the design and optimization of the braking system for the vehicle platform.",
    projects: ["Braking System Design & Assembly"],
    achievements: ["Braking performance characterization"],
    skills: ["SolidWorks", "Braking Mechanics", "Material Selection"],
    social: {
      linkedin: "https://www.linkedin.com/in/joshua-somabattula-801305357",
      email: "somabattula.joshua.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Ishant Kanwat",
    photo: "/src/assets/team/ishant_kanwat.jpeg",
    position: "VD Engineer (Suspension)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on suspension system kinematics and layout integration for Team Averera.",
    projects: ["Suspension Geometry & Spring-Damper Selection"],
    achievements: ["Designed double-wishbone kinematics"],
    skills: ["SolidWorks Simulation", "Kinematic Analysis", "Suspension Calibration"],
    social: {
      linkedin: "https://www.linkedin.com/in/ishant-kanwat",
      email: "ishant.kanwat.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Parth Burande",
    photo: "/src/assets/team/parth_burande.jpg",
    position: "Technical Coordinator (Autonomy)",
    department: "Mechanical Engineering" as Department,
    team: "Technical" as TeamGroup,
    bio: "Worked on localisation and mapping stacks for the team's autonomous navigation systems.",
    projects: ["Autonomous Localisation & Mapping (SLAM)"],
    achievements: ["Implemented RTK-GPS integration stacks"],
    skills: ["SLAM", "C++", "ROS2", "Python"],
    social: {
      linkedin: "https://www.linkedin.com/in/parth-burande-622b14333/",
      email: "parthn.burande.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Krish",
    photo: "/src/assets/team/krish_kinra.jpeg",
    position: "Technical Coordinator (Embedded)",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    bio: "Designed the dual motor control PCB layout and verified electrical safety protocols.",
    projects: ["Dual Motor Control PCB Design"],
    achievements: ["Integrated low-noise sensor signal routing layouts"],
    skills: ["PCB Routing", "Altium Designer", "High-Voltage Safety"],
    social: {
      linkedin: "https://www.linkedin.com/in/krish5596",
      email: "krish.student.cd.ece24@itbhu.ac.in",
    },
  },
  {
    name: "Varad Kulkarni",
    photo: "/src/assets/team/varad_kulkarni.jpeg",
    position: "VD Engineer (Aerodynamics)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on design and aerodynamic analysis of the car outerbody, validating airflow parameters in simulations.",
    projects: ["Aerodynamic Simulation & Outerbody Design"],
    achievements: ["Conducted wind tunnel simulations"],
    skills: ["ANSYS Fluent", "CFD Meshing", "SolidWorks Design"],
    social: {
      linkedin: "https://www.linkedin.com/in/varad-kulkarni-6330ab310",
      email: "kulkarni.varadu.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Tejaswa Khare",
    photo: "/src/assets/team/tejaswa_khare.jpg",
    position: "VD Engineer (Aerodynamics)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on design and aerodynamic analysis of the car outerbody, refining scale models to reduce drag.",
    projects: ["Aerodynamic Drag Reduction & Design"],
    achievements: ["Optimized vehicle drag coefficient in CFD models"],
    skills: ["SolidWorks Design", "CFD Simulations", "Aerodynamics Analysis"],
    social: {
      linkedin: "https://www.linkedin.com/in/tejaswa-khare-9519aa324",
      email: "tejaswa2911@gmail.com",
    },
  },
  {
    name: "Pragya Rathal",
    photo: "/src/assets/team/pragya_rathal.jpg",
    position: "Technical Coordinator (Autonomy)",
    department: "Civil Engineering" as Department,
    team: "Technical" as TeamGroup,
    bio: "Worked on autonomous sensor fusion systems (LiDAR, Camera, IMU) for navigation.",
    projects: ["Sensor Fusion Pipeline Stack"],
    achievements: ["Active contributor to autonomous lane navigation stacks"],
    skills: ["ROS2", "Sensor Fusion", "Python", "Data Processing"],
    social: {
      linkedin: "https://www.linkedin.com/in/pragya-rathal-6b97a5321/",
      email: "pragya.rathal.civ24@itbhu.ac.in",
    },
  },
  {
    name: "Keerthana Sri K M",
    photo: "/src/assets/team/keerthana_sri_km.jpg",
    position: "VD Head",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on designing and validating the vehicle chassis frame, serving as Vehicle Design Head for 2026-27.",
    projects: ["Chassis Structural Design & Finite Element Analysis"],
    achievements: ["Vehicle Design Head (2026-27)"],
    skills: ["Chassis stress analysis", "SolidWorks", "Finite Element Analysis (FEA)"],
    social: {
      linkedin: "https://www.linkedin.com/in/keerthana-moorthy-605736326",
      email: "keerthana.srikm.cd.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Akash",
    photo: "/src/assets/team/akash.jpg",
    position: "Powertrain & Vehicle Dynamics Lead",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on transmission design and dynamic testing phases for Team Averera.",
    projects: ["Custom Transmission System Design"],
    achievements: ["Transmission design optimization"],
    skills: ["Transmission Systems", "CAD Assemblies", "Gearbox Kinematics"],
    social: {
      linkedin: "https://www.linkedin.com/in/akash-50b7ba2b3",
      email: "akash.student.mec23@itbhu.ac.in",
    },
  },
  {
    name: "Arnab Chakraborty",
    photo: "/src/assets/team/arnab_chakraborty.jpg",
    position: "Content, Branding & Outreach",
    department: "Mechanical Engineering" as Department,
    team: "Management" as TeamGroup,
    bio: "Drives content creation, marketing prospectus packages, and commercial brand outreach campaigns.",
    projects: ["Averera Launch Media kit", "Outreach Portfolios Design"],
    achievements: ["Increased social media campaign impressions by 25%"],
    skills: ["Graphic Design", "Content Strategy", "Brand Management"],
    social: {
      linkedin: "https://www.linkedin.com/in/arnab-chakraborty-b9804a372",
      email: "arnab.chakraborty.mec25@itbhu.ac.in",
    },
  },
  {
    name: "Raghav Sharma",
    photo: "/src/assets/team/raghav_sharma.jpg",
    position: "Autonomy Head",
    department: "Mechanical Engineering" as Department,
    team: "Technical" as TeamGroup,
    bio: "Worked on computer vision, object detection, and voxelization algorithms, serving as Autonomy Head for 2026-27.",
    projects: ["Computer Vision, Object Detection & Voxelization Stack"],
    achievements: ["Autonomy Head (2026-27)"],
    skills: ["ROS2", "Computer Vision", "Object Detection", "Python", "C++"],
    social: {
      linkedin: "https://www.linkedin.com/in/raghavs8",
      email: "raghavsharma.r25@gmail.com",
    },
  },
  {
    name: "Madhvendra",
    position: "VD Engineer (Steering System)",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on design and optimization of steering linkages and dynamics for vehicle safety compliance.",
    projects: ["Steering Geometry & Linkages Optimization"],
    achievements: ["Designed zero-slack steering linkage mounts"],
    skills: ["SolidWorks", "Steering Kinematics", "GD&T"],
    social: {
      email: "madhvendra.student.mec24@itbhu.ac.in",
    },
  },
  {
    name: "Sai Charan",
    position: "Embedded Systems Engineer",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    bio: "Designed the dual motor control PCB layout and implemented DNT (Driver Notification Terminal) PCB modifications.",
    projects: ["Dual Motor Control PCB Design", "DNT PCB System Modifications"],
    achievements: ["Integrated display telemetry notifications firmware updates"],
    skills: ["PCB Routing", "Altium Designer", "Embedded Firmware"],
    social: {
      email: "saicharan.student.ece24@itbhu.ac.in",
    },
  },
];

const gen2024 = [
  {
    name: "Ashwin R Venkateshwar",
    photo: "/src/assets/team/ashwin_r_venkateshwar.png",
    position: "Team Manager",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on aerodynamic analysis of the outerbody of the car, serving as Team Manager for 2025-26.",
    projects: ["Aerodynamic Analysis of Car Outer Body"],
    achievements: ["Team Manager (2025-26)"],
    skills: ["Project Management", "CFD Simulations", "Aerodynamics Analysis"],
    social: {
      linkedin: "https://www.linkedin.com/in/ashwinrv",
      email: "ashwinr.venkateshwar.mec23@itbhu.ac.in",
    },
  },
  {
    name: "R S Panjabakesan",
    photo: "/src/assets/team/panjabakesan_rs.jpeg",
    position: "Vehicle Design Engineer",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on vehicle dynamics calibration, structural design of braking, steering, and suspension assemblies.",
    projects: ["Vehicle Dynamics: Braking, Steering & Suspension Systems"],
    achievements: ["Integrated vehicle dynamics safety validation"],
    skills: ["Suspension Kinematics", "Braking Systems", "SolidWorks"],
    social: {
      linkedin: "https://www.linkedin.com/in/r-s-panjabakesan-1002642b1",
      email: "panjabakesan27072005@gmail.com",
    },
  },
  {
    name: "Thillak Devendran",
    photo: "/src/assets/team/thillak_devendran.jpg",
    position: "Vehicle Design Head",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on designing and optimizing the structural chassis layout, serving as Vehicle Design Head for 2025-26.",
    projects: ["Chassis Structural Design & Optimization"],
    achievements: ["Vehicle Design Head (2025-26)"],
    skills: ["Chassis Layout Design", "FEA Structural Analysis", "SolidWorks"],
    social: {
      linkedin: "https://www.linkedin.com/in/thillak-devendran-51b61b289",
      email: "thillakdevendran39@gmail.com",
    },
  },
  {
    name: "Punit Makwana",
    photo: "/src/assets/team/punit_makwana.jpg",
    position: "Embedded Head",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    bio: "Designed the dual motor control PCB layout and developed its control firmware logic, serving as Embedded Head for 2025-26.",
    projects: ["Dual Motor Control PCB Layout & Logic"],
    achievements: ["Embedded Head (2025-26)"],
    skills: ["Altium Designer", "PCB Layout", "Embedded Control Logic"],
    social: {
      linkedin: "https://www.linkedin.com/in/punit-makwana-662814286",
      email: "makwana.punitrakesh.cd.ece23@itbhu.ac.in",
    },
  },
  {
    name: "Hirendran",
    position: "Vehicle Dynamics Engineer",
    department: "Mechanical Engineering" as Department,
    team: "Mechanical" as TeamGroup,
    bio: "Worked on vehicle dynamics calibration, structural design of braking, steering, and suspension assemblies.",
    projects: ["Vehicle Dynamics calibration (Braking, Steering & Suspension)"],
    achievements: ["Optimized vehicle handling parameters"],
    skills: ["Suspension Calibration", "Braking Mechanics", "SolidWorks"],
    social: {
      email: "hirendran.student.mec23@itbhu.ac.in",
    },
  },
  {
    name: "Ishant",
    position: "Embedded Systems Engineer",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    bio: "Worked on Driver Notification Terminal (DNT) design and dual motor control PCB routing.",
    projects: ["Driver Notification Terminal (DNT) & Dual Motor Control PCB"],
    achievements: ["Integrated custom notification terminal circuits"],
    skills: ["Altium Designer", "PCB Routing", "Embedded Systems"],
    social: {
      email: "ishant.student.ece23@itbhu.ac.in",
    },
  },
  {
    name: "Ayush",
    position: "Embedded Head",
    department: "Electronics Engineering" as Department,
    team: "Electronics" as TeamGroup,
    bio: "Designed the dual motor control PCB layout and control logic, serving as Embedded Head for 2025-26.",
    projects: ["Dual Motor Control PCB & Firmware Control Logic"],
    achievements: ["Embedded Head (2025-26)"],
    skills: ["PCB Layout Design", "Embedded Firmware", "Altium Designer"],
    social: {
      email: "ayush.student.ece23@itbhu.ac.in",
    },
  },
];

function buildGeneration(
  list: Array<{
    name: string;
    position: string;
    department: Department;
    team: TeamGroup;
    photo?: string;
    bio?: string;
    skills?: string[];
    projects?: string[];
    achievements?: string[];
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
      photo: member.photo,
      bio: member.bio,
      skills: member.skills,
      projects: member.projects,
      achievements: member.achievements,
      social: member.social,
    })
  );
}

export const currentTeam: Member[] = [
  ...buildGeneration(gen2026, "14"),
  ...buildGeneration(gen2025, "13"),
  ...buildGeneration(gen2024, "12"),
];

export const currentGenerations = ["14", "13", "12"];

// -------------------------------------------------------------
// ALUMNI — Team Legacy timeline
// -------------------------------------------------------------
interface AlumniData {
  name: string;
  position: string;
  department: Department;
  team: TeamGroup;
  photo?: string;

  bio?: string;
  skills?: string[];
  projects?: string[];
  achievements?: string[];
  timeline?: TimelineEntry[];
  social?: SocialLinks;
}
const alumniRoster: Record<string, AlumniData[]> = {
  "11": [
    {
      name: "Gyanaranjan Sahoo",
      position: "Team Captain & Chassis Lead",
      department: "Mechanical Engineering",
      team: "Management",
      photo: "/src/assets/alumni/gen 11/Gyanaranjan.avif",
      social: { linkedin: "https://www.linkedin.com/in/gyanaranjan-sahoo-691862263/" },
      bio: "Coordinated Team Averera's entire vehicle integration, manufacturing pipelines, and administrative logistics for Shell Eco-Marathon Qatar Gen 11 campaigns.",
      skills: ["Composites Manufacturing", "Finite Element Analysis (FEA)", "Strategic Planning", "GD&T", "Automotive Assemblies"],
      projects: ["Gen 11 Prototype Chassis", "Modular Battery Mounting System", "CFD-Optimized Body Panels"],
      achievements: ["Led Team Averera in Shell Eco-Marathon Qatar 2025", "Implemented light-weight steering linkage geometry", "Secured corporate tooling and carbon sponsorships"]
    },
    {
      name: "Shashwat Yadav",
      position: "Autonomous Systems & Controls Lead",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 11/Shashwat.avif",
      social: { linkedin: "https://www.linkedin.com/in/shashwat-yadav-b527b5258/" },
      bio: "Spearheaded autonomous navigation stacks development, path-planning nodes, and ROS2 telemetry pipeline integrations for next-gen vehicles.",
      skills: ["ROS2", "Path Planning Algorithms", "C++", "Python", "Docker", "Sensor Fusion", "Linux Kernel"],
      projects: ["LiDAR-based Obstacle Mapping Node", "WebSockets Telemetry Dashboard", "Predictive Power Management Control"],
      achievements: ["Integrated real-time sensor fusion stacks", "Optimized obstacle categorization latencies below 50ms"]
    },
    {
      name: "Ratnam Bhavsar",
      position: "Vehicle Dynamics & Suspension Lead",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 11/ratnam.avif",
      social: { linkedin: "https://www.linkedin.com/in/ratnam-bhavsar/" },
      bio: "Executed high-precision simulations, suspension kinematic designs, and structural optimization models for eco-marathon racecars.",
      skills: ["ANSYS Structural", "SolidWorks Simulation", "Kinematics Analysis", "Mechanical CAD", "Carbon Layup Design"],
      projects: ["Double Wishbone Geometry Optimization", "Carbon Fiber Wheel Assemblies", "Aerodynamic Chassis Bottom Cover"],
      achievements: ["Decreased dynamic unsprung weight by 15%", "Ensured zero component failure during 200 hours of track tests"]
    },
    {
      name: "Anirudh Bhogi",
      position: "Power Electronics & BMS Engineer",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 11/Anirudh.avif",
      social: { linkedin: "https://www.linkedin.com/in/anirudh-bhogi/" },
      bio: "Developed high-current PCB modules, battery pack management designs (BMS), and vehicle communication architectures.",
      skills: ["PCB Layout Design", "Altium Designer", "High-Voltage safety systems", "CAN-Bus Networking", "Embedded C"],
      projects: ["Modular 48V Battery Management Board", "Central vehicle controller unit PCB", "UART-CAN converter module"],
      achievements: ["Designed 3 custom multi-layer PCBs", "Established fail-safe automatic hardware isolation nodes"]
    },
    {
      name: "Sharad Singh",
      position: "Fabrication & Workshop Manager",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 11/Sharad.avif",
      social: { linkedin: "https://www.linkedin.com/in/sharad-singh-053430262/" },
      bio: "Organized carbon composite mold layouts, metal spaceframe welding operations, and CNC machine programming tasks.",
      skills: ["CNC Milling", "Carbon Composite Wet Layup", "Shop Floor Management", "Precision Measurement", "Metal Welding"],
      projects: ["Chassis Assembly Manufacturing Setup", "Gen 11 Wheel Hub Upright Fabrication"],
      achievements: ["Reduced chassis turnaround cycles by 30%", "Optimized wet layup thickness variation margins to 0.1mm"]
    },
    {
      name: "Bhavya Vishwakarma",
      position: "Outreach, Operations & Sponsorship Coordinator",
      department: "Industrial Design",
      team: "Design",
      photo: "/src/assets/alumni/gen 11/Bhavya.avif",
      social: { linkedin: "https://www.linkedin.com/in/bhavya-vishwakarma-ba38a5256/" },
      bio: "Handled digital branding portfolios, marketing prospectus packages, and managed commercial sponsor relations for regional campaigns.",
      skills: ["Graphic Design", "Brand Management", "Figma", "Social Media Strategy", "Negotiation"],
      projects: ["Team Averera Qatar Launch Media kit", "Commercial Sponsor Prospectus Proposal"],
      achievements: ["Secured 4 new corporate sponsors", "Achieved 30k+ impressions across digital media channels"]
    }
  ],
  "10": [
    {
      name: "Darshan Kumar Jajoria",
      position: "Autonomous Systems Developer",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 10/Darshan.avif",
      social: { linkedin: "https://www.linkedin.com/in/darshan-kumar-jajoria/" },
      bio: "Worked on control system state estimations and drive-by-wire controller integrations.",
      skills: ["ROS", "Python", "Control Systems", "State Estimation"],
      projects: ["Drive-by-Wire Steering Controller"],
      achievements: ["Improved path tracking precision by 15%"]
    },
    {
      name: "Sugavanesh KR",
      position: "Aerodynamics & Shell Designer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 10/Sugavanesh Photo.avif",
      social: { linkedin: "https://www.linkedin.com/in/sugavanesh-kr/" },
      bio: "Designed active aerodynamic components and drag-reduction covers for vehicle body panels.",
      skills: ["CAD Design", "Aerodynamics", "SolidWorks Flow Simulation"],
      projects: ["Teardrop Body Panel Aerodynamics"],
      achievements: ["Optimized vehicle drag coefficient to 0.13 Cd"]
    },
    {
      name: "Mithilesh Kukkapalli",
      position: "Telemetry & Embedded Systems Engineer",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 10/Mithilesh.avif",
      social: { linkedin: "https://www.linkedin.com/in/mithilesh-kukkapalli/" },
      bio: "Designed embedded motor control loops and customized firmware modules for current sensors.",
      skills: ["Embedded Systems", "Altium Layout", "Current Sensors", "Calibration"],
      projects: ["Motor Control Firmware Update"],
      achievements: ["Designed fail-safe battery cut-off safety circuit"]
    },
    {
      name: "Yash",
      position: "Chassis Design Engineer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 10/Yash.avif",
      bio: "Assisted with vehicle structure layout optimization, wheel assembly design, and track deployments.",
      skills: ["Mechanical CAD", "Structural Analysis", "Assembly Modeling"],
      projects: ["Front Suspension Mount Redesign"],
      achievements: ["Active contributor to Gen 10 track operations"]
    }
  ],
  "9": [
    {
      name: "Astitva Gupta",
      position: "Team Manager",
      department: "Industrial Design",
      team: "Management",
      photo: "/src/assets/alumni/gen 9/ASTITVA_edited.avif",
      social: { linkedin: "https://www.linkedin.com/in/astitva-gupta-26798312b/" },
      bio: "Managed season budget targets, coordinated outreach setups, and handled overall team administration.",
      skills: ["Administration", "Finance Control", "Outreach", "Sponsor Relations"],
      projects: ["Gen 9 Budget Allocation Framework"],
      achievements: ["Handled Gen 9 team administration successfully"]
    },
    {
      name: "Jaynil Sheth",
      position: "Technical Coordinator",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 9/jaynil.avif",
      social: { linkedin: "https://www.linkedin.com/in/jaynilsheth/" },
      bio: "Maintained safety nodes, autonomous telemetry dashboards, and live tracking APIs.",
      skills: ["React", "Node.js", "WebSockets", "Data Dashboards"],
      projects: ["Vite-Based Live Telemetry Screen"],
      achievements: ["Built first WebSocket live data dashboard feed"]
    },
    {
      name: "Naitik",
      position: "Electronics Specialist",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 9/Naitik.avif",
      social: { linkedin: "https://www.linkedin.com/in/ntk241/" },
      bio: "Developed battery pack monitoring nodes and isolated battery cell temperature sensor loops.",
      skills: ["Altium Design", "SPI Protocol", "BMS Systems"],
      projects: ["Multicell BMS Module Layout"],
      achievements: ["Integrated 12-channel cell balancer safety board"]
    },
    {
      name: "Prateek",
      position: "Research Specialist",
      department: "Pharmaceutical Engineering",
      team: "Research",
      photo: "/src/assets/alumni/gen 9/prateek.avif",
      bio: "Investigated thermal cooling properties of composite polymer coatings on high-current battery cells.",
      skills: ["Thermal Analysis", "Polymer Chemistry", "Data Visualization"],
      projects: ["Battery Pack Thermal Runaway Coating Studies"],
      achievements: ["Identified cooling compound mapping layouts"]
    },
    {
      name: "Pratmesh Adhav",
      position: "Mechanical Engineer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 9/pratmesh.avif",
      social: { linkedin: "https://www.linkedin.com/in/adhavpb/" },
      bio: "Fabricated rollcage structures and verified torsional stiffness calculations against simulation parameters.",
      skills: ["SolidWorks Simulations", "Torsional Stiffness", "Fabrication"],
      projects: ["Chassis Stiffness Optimization Project"],
      achievements: ["Increased structural stiffness by 12% without weight additions"]
    },
    {
      name: "Shubh Khandelwal",
      position: "Frontend Specialist",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 9/shubh.avif",
      social: { linkedin: "https://www.linkedin.com/in/shubh-khandelwal-4178a0200/" },
      bio: "Developed public website landing pages and web apps for technical data lookup tables.",
      skills: ["React", "CSS Grid", "TypeScript", "TailwindCSS"],
      projects: ["Public Website Redesign Version 2"],
      achievements: ["Decreased web app bundle load time by 35%"]
    },
    {
      name: "Yash Shimpi",
      position: "Chassis Engineer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 9/Yash_edited.avif",
      social: { linkedin: "https://www.linkedin.com/in/yash-shimpi-42328b1b9/" },
      bio: "Simulated front suspension geometry models and analyzed shock absorbing load parameters.",
      skills: ["FEA Modeling", "Suspension Design", "MATLAB SimMechanics"],
      projects: ["Double Wishbone Suspension Optimization"],
      achievements: ["Improved wheel load balance efficiency during turns"]
    }
  ],
  "8": [
    {
      name: "Atharva Jamsandekar",
      position: "Software Engineer",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 8/Atharva.avif",
      social: { linkedin: "https://www.linkedin.com/in/atharva-jamsandekar/" },
      bio: "Integrated camera detection algorithms for track safety boundaries and obstacles tracking.",
      skills: ["OpenCV", "ROS", "Python", "Deep Learning"],
      projects: ["YOLO Obstacle Classification Pipeline"],
      achievements: ["Achieved obstacle categorization rate under 80ms latency"]
    },
    {
      name: "Rahul Goel",
      position: "Team Leader",
      department: "Mechanical Engineering",
      team: "Management",
      photo: "/src/assets/alumni/gen 8/Rahul.avif",
      social: { linkedin: "https://www.linkedin.com/in/rahul-goel-teamaverera/" },
      bio: "Coordinated Gen 8 vehicle timelines and drove standard vehicle testing phases on closed tracks.",
      skills: ["Operations Coordination", "Safety Regulations", "CAD Design"],
      projects: ["Track Testing Framework v1"],
      achievements: ["Successfully completed 200 hours of track tests"]
    },
    {
      name: "Harsh Agarwal",
      position: "PCB Designer",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 8/Harsh.avif",
      social: { linkedin: "https://www.linkedin.com/in/harsh-agarwal-8b2b09190/" },
      bio: "Designed isolated power distribution block PCBs and current limiting fuses matrices.",
      skills: ["Altium Designer", "Power Electronics", "PCB Routing"],
      projects: ["Gen 8 Power Supply Regulator Board"],
      achievements: ["Decreased PCB footprints by 20%"]
    },
    {
      name: "Aman Mishra",
      position: "Research Specialist",
      department: "Pharmaceutical Engineering",
      team: "Research",
      photo: "/src/assets/alumni/gen 8/Aman.avif",
      social: { linkedin: "https://www.linkedin.com/in/amshra267/" },
      bio: "Researched battery electrolyte behavior under high-stress discharging load profiles.",
      skills: ["Electrochemistry", "Chemical Safety", "Thermal Chambers"],
      projects: ["Electrolyte Thermal Degradation Models"],
      achievements: ["Contributed to battery cell selection process mapping"]
    },
    {
      name: "Prateek Agrawal",
      position: "Mechanical Analyst",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 8/Prateek.avif",
      social: { linkedin: "https://www.linkedin.com/in/prateekagrawal7877/" },
      bio: "Conducted finite element simulations of chassis joints under various collision impact angles.",
      skills: ["Impact Simulation", "ANSYS Workbench", "Joint Stress Analysis"],
      projects: ["Front Crash Box Structural Simulation"],
      achievements: ["Designed chassis structures matching safety rating regulations"]
    },
    {
      name: "Shreyansh Vinit",
      position: "Electronics Lead",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 8/Shreyansh.avif",
      social: { linkedin: "https://www.linkedin.com/in/shreyansh-vinit-b922951a1/" },
      bio: "Designed embedded motor control loops and customized firmware modules for current sensors.",
      skills: ["Altium Designer", "Embedded Systems", "Altium Layout"],
      projects: ["Sensor Bus Update Project"],
      achievements: ["Integrated dynamic current sensors tracking real-time draw"]
    }
  ],
  "7": [
    {
      name: "Tejas Chavan",
      position: "Mechanical Engineer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 7/Tejas Chavan.avif",
      social: { linkedin: "https://www.linkedin.com/in/tejas-chavan-09b094192/" },
      bio: "Designed transmission gear ratio assemblies for optimal motor power band utilization.",
      skills: ["Gear Design", "Transmission Systems", "CAD Assemblies"],
      projects: ["High-Ratio Reduction Gearbox"],
      achievements: ["Achieved 96% transmission efficiency in custom gearbox"]
    },
    {
      name: "Sweekar Banthiya",
      position: "Manager",
      department: "Industrial Design",
      team: "Management",
      photo: "/src/assets/alumni/gen 7/Sweekar Banthiya.avif",
      social: { linkedin: "https://www.linkedin.com/in/sweekar-banthiya-a5a1a8179/" },
      bio: "Handled commercial and academic team relations, securing material sponsorships for carbon fiber composites.",
      skills: ["Sponsor Management", "Material Logistics", "Communications"],
      projects: ["Gen 7 Material Sponsor Outreach"],
      achievements: ["Secured 100% sponsored carbon fiber materials for Gen 7 chassis"]
    },
    {
      name: "Sushrut Mirzapure",
      position: "Aerodynamics Analyst",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 7/Sushrut Mirzapure.avif",
      social: { linkedin: "https://www.linkedin.com/in/sushrut-mirzapure-437375191/" },
      bio: "Simulated teardrop body layouts in virtual wind tunnels to optimize airflow detachments.",
      skills: ["ANSYS Fluent", "CFD Meshing", "Boundary Layer Aerodynamics"],
      projects: ["Boundary Layer Aerodynamics Redesign"],
      achievements: ["Reduced drag coefficient value on rear body panels by 6%"]
    },
    {
      name: "Shashank Maddeshiya",
      position: "Lead Programmer",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 7/Shashank Maddeshiya.avif",
      social: { linkedin: "https://www.linkedin.com/in/the-shashank-kumar/" },
      bio: "Maintained telemetry APIs, safety monitor tasks, and vehicle control logs storage servers.",
      skills: ["Python", "SQLite", "API Design", "Linux Shell"],
      projects: ["Chassis Telemetry Logs Server v1"],
      achievements: ["Constructed highly reliable crash data storage system"]
    },
    {
      name: "Rohan Nemade",
      position: "Electronics Lead",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 7/Rohan Nemade.avif",
      social: { linkedin: "https://www.linkedin.com/in/rohan-nemade/" },
      bio: "Developed high-current power distribution logic gates and driver dashboard screen layouts.",
      skills: ["PCB Routing", "Embedded Graphics", "SPI Display Integration"],
      projects: ["Driver Instrument Dashboard v2"],
      achievements: ["Designed low-latency graphic interface layout screen"]
    },
    {
      name: "Vikas Goyat",
      position: "Research Analyst",
      department: "Pharmaceutical Engineering",
      team: "Research",
      photo: "/src/assets/alumni/gen 7/Vikas Goyat.avif",
      social: { linkedin: "https://www.linkedin.com/in/vikas-goyat-aa52701a2/" },
      bio: "Studied electrochemical aging profiles on battery cells under variable temperature environments.",
      skills: ["Electrochemistry", "Degradation Modeling", "Chemical Testing"],
      projects: ["Electrochemical Performance Mapping under Load"],
      achievements: ["Formulated precise cycle-life estimations for battery arrays"]
    }
  ],
  "6": [
    {
      name: "Shubham Yadav",
      position: "Mechanical Designer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 6/Shubham Yadav.avif",
      social: { linkedin: "https://www.linkedin.com/in/shubham-yadav-345378167/" },
      bio: "Created suspension system assemblies and structural CAD layouts for Gen 6 concepts.",
      skills: ["SolidWorks Design", "Mechanical Drawing", "CAD Layouts"],
      projects: ["Gen 6 Steering Linkage CAD Design"],
      achievements: ["Completed structural safety layouts matches"]
    },
    {
      name: "Snehal Kumar",
      position: "Electronics Engineer",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 6/Snehal.avif",
      social: { linkedin: "https://www.linkedin.com/in/snehal-kumar-209456194/" },
      bio: "Designed embedded motor control loops and customized firmware modules for current sensors.",
      skills: ["PCB Routing", "Altium Designer", "Sensor Calibration"],
      projects: ["Gen 6 Motor Sensor PCB Array"],
      achievements: ["Implemented noise isolation layouts on sensor feeds"]
    },
    {
      name: "Shashank Kumar",
      position: "Software Developer",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 6/Shashank Kumar.avif",
      social: { linkedin: "https://www.linkedin.com/in/shashank-kumar-292402192/" },
      bio: "Integrated camera detection algorithms for track safety boundaries and obstacles tracking.",
      skills: ["C++", "Python", "ROS Nodes"],
      projects: ["Camera Path Finding Software"],
      achievements: ["Successfully completed 200 hours of track tests"]
    },
    {
      name: "Rishabh Singh",
      position: "Research Lead",
      department: "Pharmaceutical Engineering",
      team: "Research",
      photo: "/src/assets/alumni/gen 6/Rishabh Singh.avif",
      social: { linkedin: "https://www.linkedin.com/in/rishabh-singh-voltworks/" },
      bio: "Conducted chemical composition analysis of raw polymer compounds for lightweight body construction.",
      skills: ["Materials Science", "Chemical Composition Testing", "Report Writing"],
      projects: ["Polymer Composite Lightweight Panel Studies"],
      achievements: ["Co-authored materials selection research updates"]
    },
    {
      name: "Abhay Agrawal",
      position: "Technical Writer",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 6/Abhay Agrawal.avif",
      social: { linkedin: "https://www.linkedin.com/in/abhay-agrawal-92ba06162/" },
      bio: "Managed design document formats, compliance manuals, and track-safety checklist records.",
      skills: ["Technical Documentation", "Safety Compliance", "Markdown"],
      projects: ["Gen 6 Vehicle Safety Manual Publication"],
      achievements: ["Cleanly formatted 100+ pages compliance document"]
    }
  ],
  "5": [
    {
      name: "Saurabh Patel",
      position: "Mechanical Specialist",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 5/Saurabh20Patel.avif",
      social: { linkedin: "https://www.linkedin.com/in/saurabhpateliitbhu/" },
      bio: "Managed mechanical component testing, structural chassis joints weld tests, and stress metrics validation.",
      skills: ["ANSYS Structural", "Destructive Testing", "CAD Assemblies"],
      projects: ["Gen 5 Chassis Safety Joint Optimization"],
      achievements: ["Maintained zero failures on structural parts during track test loops"]
    },
    {
      name: "Himanshu Sahu",
      position: "Electrical Lead",
      department: "Electrical Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 5/Himanshu20Sahu.avif",
      social: { linkedin: "https://www.linkedin.com/in/himanshuiitbhu/" },
      bio: "Designed wiring harness distribution maps, battery box safety barriers, and circuit routing diagrams.",
      skills: ["Electrical Layouts", "Wiring Harness Design", "Wiring Safety"],
      projects: ["Gen 5 High Voltage Harness Array"],
      achievements: ["Integrated low-loss power distribution terminal blocks"]
    },
    {
      name: "Rayala Kartheek",
      position: "Technical Specialist",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 5/Rayala20Kartheek.avif",
      bio: "Maintained safety nodes, autonomous telemetry dashboards, and live tracking APIs.",
      skills: ["API Construction", "ROS Node Optimization", "Telemetry Scripting"],
      projects: ["Chassis Telemetry Live Feeds"],
      achievements: ["Maintained 99.8% uptime on telecommunication node streams"]
    },
    {
      name: "Hriddhi Ghosh",
      position: "Materials Analyst",
      department: "Pharmaceutical Engineering",
      team: "Research",
      photo: "/src/assets/alumni/gen 5/hriddhighosh.avif",
      social: { linkedin: "https://www.linkedin.com/in/hriddhi-ghosh-408497180/" },
      bio: "Investigated chemical curing rates of lightweight polymer compounds for aerodynamic sheets construction.",
      skills: ["Polymer Testing", "Material Characterization", "Differential Scanning Calorimetry"],
      projects: ["Curing Cycle Optimization for Epoxy Matrices"],
      achievements: ["Halved component curing cycles under optimized heating plans"]
    },
    {
      name: "Abhyuday Verma",
      position: "Outreach Lead",
      department: "Industrial Design",
      team: "Design",
      photo: "/src/assets/alumni/gen 5/Abhyuday20Verma.avif",
      social: { linkedin: "https://www.linkedin.com/in/abhyuday-verma-67b3a8135/" },
      bio: "Crafted marketing prospectus campaigns and managed digital assets across media feeds.",
      skills: ["Media Management", "Graphic Illustration", "Communication Strategies"],
      projects: ["Averera Gen 5 Media Campaign Launch"],
      achievements: ["Reached 20k+ impressions across digital channels"]
    }
  ],
  "4": [
    {
      name: "Lakshya Bhonde",
      position: "Aerodynamics Lead",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 4/Lakshya Bhonde.avif",
      social: { linkedin: "https://www.linkedin.com/in/lakshya-bhonde-823a39123/" },
      bio: "Formulated vehicle body drag coefficients reduction models and optimized body designs.",
      skills: ["Computational Fluid Dynamics", "Drag Minimization", "Airfoil Optimization"],
      projects: ["Gen 4 Airflow Profile Detachment Studies"],
      achievements: ["Achieved 10% drag coefficient reduction compared to Gen 3 model"]
    },
    {
      name: "Rishav Guha",
      position: "Technical Specialist",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 4/Rishav Guha.avif",
      bio: "Built data analysis scripts tracking motor efficiency levels under variable track inclines.",
      skills: ["Python Data Sci", "Pandas", "Matplotlib", "Numerical Simulation"],
      projects: ["Motor Efficiency Incline Trajectory Predictions"],
      achievements: ["Optimized battery discharge plan arrays for track profiles"]
    },
    {
      name: "Shivam Mishra",
      position: "Electronics Engineer",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 4/Shivam20Formal_JPG.avif",
      social: { linkedin: "https://www.linkedin.com/in/mishrashivam25/" },
      bio: "Developed high-current power distribution logic gates and driver dashboard screen layouts.",
      skills: ["Altium Layouts", "Power Regulators", "Noise Filtering"],
      projects: ["Gen 4 Control Board PCB Rev 3"],
      achievements: ["Cleanly routed dual-layer logic signal lines safely"]
    },
    {
      name: "Pawas Suman",
      position: "Mechanical Engineer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 4/Pawas Suman.avif",
      social: { linkedin: "https://www.linkedin.com/in/pawas-suman/" },
      bio: "Calculated structural joint loads and suspension mounts stress thresholds.",
      skills: ["Stress Calculations", "FEA Analysis", "SolidWorks Structs"],
      projects: ["Chassis Structural Stress Mapping"],
      achievements: ["Validated mechanical safety margins under high-speed curves"]
    },
    {
      name: "Somesh Jaiswal",
      position: "Design Coordinator",
      department: "Industrial Design",
      team: "Design",
      photo: "/src/assets/alumni/gen 4/Somesh Jaiswal.avif",
      bio: "Created render mockups of vehicle models for technical presentations and sponsors display materials.",
      skills: ["Rendering Models", "Keyshot", "Figma Design"],
      projects: ["Gen 4 Presentation Render Arrays"],
      achievements: ["Delivered high-quality assets for team design reviews"]
    }
  ],
  "3": [
    {
      name: "Aditya Raghuwanshi",
      position: "Mechanical Specialist",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 3/Aditya Raghuwanshi.avif",
      social: { linkedin: "https://www.linkedin.com/in/aditya-raghuwanshi-65ab60104/" },
      bio: "Formulated vehicle body drag coefficients reduction models and optimized body designs.",
      skills: ["CAD Assemblies", "ANSYS Structural", "SolidWorks"],
      projects: ["Gen 3 Body Assembly Blueprint"],
      achievements: ["Successfully delivered frame designs on time"]
    },
    {
      name: "Rajat Singhvi",
      position: "Technical Specialist",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/gen 3/Rajat Singhvi.avif",
      social: { linkedin: "https://www.linkedin.com/in/rs3/" },
      bio: "Maintained safety nodes, autonomous telemetry dashboards, and live tracking APIs.",
      skills: ["Python", "System Scripting", "ROS Nodes"],
      projects: ["Chassis Telemetry Log API"],
      achievements: ["Maintained 99.8% uptime on telecommunication node streams"]
    },
    {
      name: "Aniket Sahoo",
      position: "PCB Designer",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 3/Aniket Sahoo.avif",
      social: { linkedin: "https://www.linkedin.com/in/aniket-sahoo/" },
      bio: "Designed isolated power distribution block PCBs and current limiting fuses matrices.",
      skills: ["PCB Routing", "Altium Designer", "Altium Schematics"],
      projects: ["Gen 3 Power Board Design Layout"],
      achievements: ["Reduced control board electromagnetic noise footprint by 15%"]
    },
    {
      name: "Shashank More",
      position: "Research Specialist",
      department: "Pharmaceutical Engineering",
      team: "Research",
      photo: "/src/assets/alumni/gen 3/Shashank More.avif",
      social: { linkedin: "https://www.linkedin.com/in/shashank-more-478805114/" },
      bio: "Studied electrochemical aging profiles on battery cells under variable temperature environments.",
      skills: ["Battery Testing", "Thermal Cycling", "Materials Science"],
      projects: ["Lithium Cell Degradation Models"],
      achievements: ["Contributed to battery cell selection process mapping"]
    },
    {
      name: "Anitya Gupta",
      position: "Mechanical Specialist",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 3/Anitya Gutpa.avif",
      social: { linkedin: "https://www.linkedin.com/in/anitya/" },
      bio: "Conducted finite element simulations of chassis joints under various collision impact angles.",
      skills: ["FEA Analysis", "Joint Torsional Stiffness", "Material Testing"],
      projects: ["Chassis Safety Joint Testing"],
      achievements: ["Optimized structural joint corners to resist high load loads"]
    },
    {
      name: "Akash Chaurasia",
      position: "Design Specialist",
      department: "Industrial Design",
      team: "Design",
      photo: "/src/assets/alumni/gen 3/Akash Chaurasia.avif",
      social: { linkedin: "https://www.linkedin.com/in/chaurasia1996/" },
      bio: "Created render mockups of vehicle models for technical presentations and sponsors display materials.",
      skills: ["Rendering Models", "Industrial Design", "CAD Presentation"],
      projects: ["Gen 3 Sponsorship Material Assets Rendering"],
      achievements: ["Created team logo decals layouts"]
    }
  ],
  "2": [
    {
      name: "Akash Gupta",
      position: "Lead Mechanical Engineer",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/gen 2/Akash Gupta.avif",
      social: { linkedin: "https://www.linkedin.com/in/akash-gupta-6961b1121/" },
      bio: "Designed first suspension mounts assemblies and managed early carbon layup sheet curing setups.",
      skills: ["Structural Welds", "Chassis Design", "Suspension Geometry"],
      projects: ["Gen 2 Suspension Setup Blueprint"],
      achievements: ["Built first double wishbone setup models"]
    },
    {
      name: "Ankit Patel",
      position: "Electronics Lead",
      department: "Electronics Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/gen 2/Ankit patel.avif",
      social: { linkedin: "https://www.linkedin.com/in/ankit-patel-ab0237b2/" },
      bio: "Built custom battery pack safety enclosures and wired cell monitoring boards loops.",
      skills: ["Safety Enclosures", "High-Voltage Safety Loops", "Altium Routing"],
      projects: ["Gen 2 Custom Multi-Cell Battery Pack Enclosure"],
      achievements: ["Created isolated wiring hubs for cell sensor wires"]
    }
  ],
  "1": [
    {
      name: "Kanishk Mishra",
      position: "Founding Team Captain",
      department: "Mechanical Engineering",
      team: "Management",
      photo: "/src/assets/alumni/founders/kanishk(1).avif",
      social: { linkedin: "https://www.linkedin.com/in/kanishk-mishra-1a048197/" },
      bio: "Coordinated early founding phases of Team Averera and drove first vehicle prototype construction plans.",
      skills: ["Operations Setup", "Public Relations", "Team Organization"],
      projects: ["Founding Roster Setup and Recruitment Framework"],
      achievements: ["Created Team Averera founding charter at IIT (BHU)"]
    },
    {
      name: "Ankit Verma",
      position: "Founding Technical Head",
      department: "Computer Science",
      team: "Technical",
      photo: "/src/assets/alumni/founders/ankit verma.avif",
      social: { linkedin: "https://www.linkedin.com/in/ankit-teamaverera/" },
      bio: "Led early code repository architectures and set up telemetry protocols foundations.",
      skills: ["Technical Planning", "Embedded Programming", "Git Workflows"],
      projects: ["Founding Telemetry Transmission Protocols"],
      achievements: ["Completed first remote serial telemetry transmission tracks"]
    },
    {
      name: "Aditya Saraswat",
      position: "Founding Design Lead",
      department: "Industrial Design",
      team: "Design",
      photo: "/src/assets/alumni/founders/Aditya Saraswat.avif",
      social: { linkedin: "https://www.linkedin.com/in/aditya-saraswat-095353116/" },
      bio: "Defined the team's first official logo design sheets and created initial vehicle outer shell shape models.",
      skills: ["Industrial Rendering", "Illustrator Design", "Exterior Shell Concepts"],
      projects: ["Averera Brand Guidelines v1.0"],
      achievements: ["Designed Team Averera's iconic initial identity concept visual sheets"]
    },
    {
      name: "Ranjeet Kumar",
      position: "Founding Fabrication Lead",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/founders/Ranjeet Kumar.avif",
      social: { linkedin: "https://www.linkedin.com/in/ranjit-teamaverera/" },
      bio: "Supervised first frame welding tests and calibrated workshop mill cutters metrics.",
      skills: ["Metal Fabrication", "Lathe Turning", "Shop Safety"],
      projects: ["Chassis Base Welds Fabrication Setup"],
      achievements: ["Assembled and aligned first custom metal spaceframe structure track-ready"]
    },
    {
      name: "Mani Shankar Meena",
      position: "Founding Electrical Specialist",
      department: "Electrical Engineering",
      team: "Electronics",
      photo: "/src/assets/alumni/founders/manishankarmeena.avif",
      social: { linkedin: "https://www.linkedin.com/in/mani-shankar-meena-82a858141/" },
      bio: "Mapped first high-current power cables routing maps and fuse ratings arrays.",
      skills: ["Electrical safety loops", "Cable Splicing", "Cable Shielding"],
      projects: ["First-Gen Isolated Power Harness Layout"],
      achievements: ["Implemented safe grounding protocols for multi-phase drive systems"]
    },
    {
      name: "Vivek Chauhan",
      position: "Founding Aerodynamics Specialist",
      department: "Mechanical Engineering",
      team: "Mechanical",
      photo: "/src/assets/alumni/founders/Vivek  Chauhan.avif",
      social: { linkedin: "https://www.linkedin.com/in/vivek-chauhan-51031698/" },
      bio: "Formulated vehicle body drag coefficients reduction models and optimized body designs.",
      skills: ["Wind Tunnel Mockups", "Aerodynamic Drag Analysis", "SolidWorks Flow Modeling"],
      projects: ["Chassis Aerodynamic Concept Blueprint Design"],
      achievements: ["Reduced drag profiles on early spatial panels models"]
    }
  ]
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
    photo: member.photo,

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
  .sort((a, b) => Number(a.year) - Number(b.year));

export const alumni: Member[] = legacyGenerations.flatMap((g) => g.members);

// -------------------------------------------------------------
// COMBINED — everything, for search/filtering
// -------------------------------------------------------------
export const allMembers: Member[] = [...leadership, ...currentTeam, ...alumni];

export const filterChips = [
  "All",
  "Current Team",
] as const;

export type FilterChip = (typeof filterChips)[number];

export function matchesFilter(member: Member, chip: FilterChip): boolean {
  switch (chip) {
    case "All":
      return true;
    case "Current Team":
      return member.isCurrent;
    default:
      return true;
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

export const alumniStats = [
  { value: 5, suffix: "+", label: "Startups Founded Collectively" },
  { value: 50, suffix: "+", label: "Industry Leaders & Researchers" },
  { value: 20, suffix: "+", label: "Global Entities Represented" },
];
