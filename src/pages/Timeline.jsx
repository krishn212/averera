import React, { useState, useEffect, useRef } from 'react';
import semChampionshipImg from '../assets/sem_championship.png';
import oimtGrantImg from '../assets/oimt_grant.png';
import vehicleImg from '../assets/vehicle.png';
import gytiAwardImg from '../assets/gyti_award.png';
import saeDesignImg from '../assets/sae_design.png';
import img2025 from '../legacy_assets/2025.avif';
import img2023 from '../legacy_assets/2023.avif';
import img2022 from '../legacy_assets/2022_win.avif';
import img2021 from '../legacy_assets/2021.avif';
import img2019 from '../legacy_assets/sema 2019.avif';
import img2018 from '../legacy_assets/2018.avif';
import img2017 from '../legacy_assets/2017.avif';
import img2015 from '../legacy_assets/2015.avif';
import img2013 from '../legacy_assets/2013.avif';

export default function Timeline() {
  const [activeConsole, setActiveConsole] = useState({});
  const [printedLogs, setPrintedLogs] = useState({});
  const timersRef = useRef({});
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll & Animation Refs & State
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const carRef = useRef(null);

  const [svgDimensions, setSvgDimensions] = useState({ width: 900, height: 1600 });
  const [pathD, setPathD] = useState('');
  const [checkpoints, setCheckpoints] = useState([]);
  const [passedCheckpointsCount, setPassedCheckpointsCount] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  const logsDatabase = {
    "2025": [
      "Initializing Shell Eco-Marathon 2025 telemetry...",
      "Technical Innovation Award: Achieved.",
      "Carbon Footprint Reduction Award: Secured.",
      "Top Efficiency Measured: 83km/kWh.",
      ">> LATEST INNOVATION VERIFIED."
    ],
    "2023": [
      "Analyzing 2023 Competition Metrics...",
      "Carbon Footprint Reduction Award: Secured.",
      "IIT Formula Student Collaboration Competition (JLR): Awarded.",
      "Asia-Pacific Rank: 6th place.",
      ">> MILESTONES LOADED."
    ],
    "2022": [
      "Fetching Shivaay Global League Telemetry...",
      "Global Rank: 3 (Shivaay Urban Concept).",
      "Off-track awards won: 2.",
      "Quiz events: 1st place.",
      "Asia-Pacific Rank: 7th place.",
      ">> LEAGUE DATA PROCESSED."
    ],
    "2021": [
      "Accessing Shell Eco-marathon Global League 2021...",
      "Global Rank 1 secured with 'SHIVAAY' Urban Concept.",
      "Off-track awards won: 3.",
      "Asia-Pacific Rank: 9th place.",
      ">> RECORD DECRYPTED."
    ],
    "2019": [
      "Loading Alterno v4 Performance Data...",
      "Shell Eco-Marathon Asia-Pacific & Middle East: 2nd Rank.",
      "Peak Efficiency Achieved: 465.1 km/kWh.",
      ">> VEHICLE HISTORY RETRIEVED."
    ],
    "2018": [
      "Accessing Alterno v3 Race Telemetry...",
      "Shell Eco-Marathon Asia-Pacific & Middle East: 3rd Place.",
      "Efficiency Achieved: 349.6 km/kWh.",
      ">> PODIUM DATA LOADED."
    ],
    "2017": [
      "Accessing Alterno v2.1 Technical Evaluation...",
      "Passed Shell Eco-Marathon Technical Round.",
      "Efficiency Achieved: 131.8 km/kWh.",
      ">> TECHNICAL AUDIT COMPLETE."
    ],
    "2015": [
      "Shell Eco-Marathon Asia Pacific & ME Debut...",
      "First Indian team to participate in SEM Asia Pacific.",
      "Vehicle: Alterno v1.0 prototype.",
      ">> HISTORICAL RECORD UNLOCKED."
    ],
    "2014": [
      "Colloquium 2014 Contest Audit...",
      "COMET-IIT BHU contest: 1st Place.",
      "Prototype Presentation: 'ALTERNO'.",
      ">> CONTEST RECORD RETRIEVED."
    ],
    "2013": [
      "Booting Modex 2013 Genesis Logs...",
      "Winners of National Level Technical Innovation Competition.",
      "First official event success achieved.",
      ">> ORIGINS LOADED."
    ]
  };

  const handleRunDiagnostics = (year) => {
    if (timersRef.current[year]) {
      timersRef.current[year].forEach(clearTimeout);
      timersRef.current[year] = [];
    }

    const isOpening = !activeConsole[year];
    setActiveConsole((prev) => ({ ...prev, [year]: isOpening }));

    if (!isOpening) {
      setPrintedLogs((prev) => ({ ...prev, [year]: [] }));
      return;
    }

    setPrintedLogs((prev) => ({ ...prev, [year]: [] }));
    const lines = logsDatabase[year] || ["System idle."];
    timersRef.current[year] = [];

    lines.forEach((line, index) => {
      const timeoutId = setTimeout(() => {
        setPrintedLogs((prev) => {
          const currentLines = prev[year] || [];
          return { ...prev, [year]: [...currentLines, `> ${line}`] };
        });
      }, (index + 1) * 280);

      timersRef.current[year].push(timeoutId);
    });

    const cursorTimeoutId = setTimeout(() => {
      setPrintedLogs((prev) => {
        const currentLines = prev[year] || [];
        return { ...prev, [year]: [...currentLines, 'cursor'] };
      });
    }, (lines.length + 1) * 280);

    timersRef.current[year].push(cursorTimeoutId);
  };

  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).forEach((year) => {
        timersRef.current[year].forEach(clearTimeout);
      });
    };
  }, []);

  const timelineEvents = [
    // --- 2021-25 | The Urban Concept Era: Shivaay ---
    {
      year: "2025",
      title: "SHELL ECO-MARATHON 2025",
      description: "Technical Innovation Award & Carbon Footprint Reduction Award winner; top efficiency 83km/kWh.",
      side: "right",
      highlight: true,
      tag: "AVG_2025_INNOVATION",
      location: "SHELL ECO-MARATHON",
      subtitle: "SEM 2025",
      vehicleConcept: "Shivaay v2.0 Urban Concept",
      image: img2025,
      imageCaption: "Shivaay Urban Concept at Shell Eco-Marathon 2025",
      detailedBullets: [
        "Achieved Technical Innovation Off-track Award.",
        "Secured Carbon Footprint Reduction Off-track Award.",
        "Recorded peak efficiency of 83 km/kWh in Urban Concept category."
      ]
    },
    {
      year: "2023",
      title: "SUSTAINABILITY & COLLABORATION",
      description: "Carbon Footprint Reduction Award (SEM 2023) & JLR Collaboration Award at IIT Formula Student.",
      side: "left",
      tag: "AVG_2023_SUSTAINABILITY",
      location: "SEM 2023 & IIT FORMULA",
      subtitle: "SEM 2023",
      image: img2023,
      imageCaption: "Shivaay Urban Concept - Aerodynamic Package Showcase",
      detailedBullets: [
        "Won Carbon Footprint Reduction Off-track Award at Shell Eco-marathon 2023.",
        "Awarded JLR Collaboration Award at IIT Formula Student Competition.",
        "Secured 6th rank in Asia-Pacific region."
      ]
    },
    {
      year: "2022",
      title: "GLOBAL RANK #3",
      description: "3rd overall global rank with Shivaay Urban Concept; 2 off-track awards, 1st place in quiz events.",
      side: "right",
      highlight: true,
      tag: "AVG_GLOBAL3_2022",
      location: "GLOBAL LEAGUE 2022",
      subtitle: "SEM GLOBAL LEAGUE 2022",
      image: img2022,
      imageCaption: "Team Averera at Shell Eco-Marathon Global Podium",
      detailedBullets: [
        "The team demonstrated remarkable success with an impressive overall global ranking of 3.",
        "Their achievements extended to securing the 7th position in the global Autonomous Programming Competition.",
        "Moreover, they claimed the 1st position in the APME Quiz and Pitch the Future Competitions, along with winning the Simulate to Innovate Off-track Award.",
        "Additionally, they secured the runner-up position in the Carbon Footprint Reduction Off-track Award."
      ]
    },
    {
      year: "2021",
      title: "GLOBAL RANK #1",
      description: "Global Rank 1 in the Shell Eco-Marathon Global League with the 'SHIVAAY' Urban Concept; 3 off-track awards, 9th in APC.",
      side: "left",
      highlight: true,
      tag: "AVG_RANK1_2021",
      location: "GLOBAL LEAGUE 2021",
      subtitle: "Shell Eco-marathon Global League 2021",
      image: img2021,
      imageCaption: "SHELL ECO-MARATHON GLOBAL LEAGUE 2021",
      detailedBullets: [
        "Achieved Global Rank 1 in the Shell Eco-Marathon Global League with 'SHIVAAY' Urban Concept.",
        "In the fiercely competitive Autonomous Programming Competition, they secured the 9th position.",
        "Their remarkable achievements included winning the Virtual Technical Inspection, Simulate to Innovate Off-track Award, and the Safety Off-track Award.",
        "They also claimed the runner-up position in the Vehicle Design Off-track Award."
      ]
    },

    // --- 2013-19 | The Prototype Era: Alterno ---
    {
      year: "2019",
      title: "GLOBAL RANK #2",
      description: "2nd rank at Shell Eco-Marathon Asia-Pacific & Middle East with the Alterno v4, top efficiency: 465.1 km/kWh.",
      side: "right",
      tag: "AVG_ALT4_2019",
      location: "ASIA PACIFIC",
      subtitle: "SEM ASIA 2019",
      image: img2019,
      imageCaption: "SEM ASIA 2019",
      detailedBullets: [
        "Achieved 2nd rank at the Shell Eco-Marathon Asia-Pacific & Middle East.",
        "Recorded maximum efficiency of 465.1 km/kWh.",
        "Team also bagged vehicle-design off-track award"
      ]
    },
    {
      year: "2018",
      title: "GLOBAL RANK #3",
      description: "3rd place at Shell Eco-Marathon Asia-Pacific & Middle East with the Alterno v3, efficiency: 349.6km/kWh.",
      side: "left",
      tag: "AVG_ALT3_2018",
      location: "ASIA PACIFIC",
      subtitle: "SEM ASIA 2018",
      image: img2018,
      imageCaption: "SEM ASIA 2018",
      detailedBullets: [
        "Achieved 3rd rank at the Shell Eco-Marathon Asia-Pacific & Middle East.",
        "Alterno v4.0 gauged an efficiency of 349.6 km/kWh",
        "Team also won Safety award."
      ]
    },
    {
      year: "2017",
      title: "TECHNICAL AUDIT MILESTONE",
      description: "Passed technical & safety inspection rounds with Alterno v2.1, achieving 131.8km/kWh efficiency.",
      side: "right",
      tag: "AVG_ALT2_2017",
      location: "ASIA PACIFIC",
      subtitle: "SEM ASIA 2017",
      image: img2017,
      imageCaption: "SEM ASIA 2017",
      detailedBullets: [
        "The team successfully passed both the technical and safety inspections, marking a significant milestone in their journey.",
        "Alterno v2.1 recorded an efficiency of 131.8 km/kWh."
      ]
    },
    {
      year: "2015",
      title: "SEM ASIA DEBUT",
      description: "First Indian team to compete at Shell Eco-Marathon Asia-Pacific using Alterno v1.0 prototype.",
      side: "left",
      tag: "AVG_DEBUT_2015",
      location: "ASIA PACIFIC",
      subtitle: "SEM ASIA 2015",
      image: img2015,
      imageCaption: "SEM ASIA 2015",
      detailedBullets: [
        "Made history as the first indian team to participate in this prestigious event using the alterno v1.0 prototype",
        "Unfortunately, we could not clear the Technical Inspection Round and thus can not hit the track."
      ]
    },
    {
      year: "2014",
      title: "COLLOQUIUM 2014 WINNERS",
      description: "1st place in COMET-IIT BHU contest presenting the early 'Alterno' prototype design.",
      side: "right",
      tag: "AVG_COMET_2014",
      location: "NATIONAL COMPETITION",
      subtitle: "COLLOQUIUM 2014",
      detailedBullets: [
        "Secured 1st Place in Colloquium 2014 organized by COMET-IIT BHU.",
        "Presented early aerodynamic prototype design 'ALTERNO'."
      ]
    },
    {
      year: "2013",
      title: "GENESIS - MODEX 2013 WINNERS",
      description: "1st place at Modex 2013 (National Technical Innovation Competition), marking the birth of Team Averera.",
      side: "left",
      tag: "AVG_MODEX_2013",
      location: "ASIA PACIFIC",
      subtitle: "Beginning of an Era",
      image: img2013,
      imageCaption: "Beginning of an Era",
      detailedBullets: [
        "This was the year when a few, Automobile Enthusiast decided to develop an Efficient Fuel Vehicle.",
        "Team build the whole prototype within 21 days."
      ]
    }
  ];

  // Dynamic Winding Path & Checkpoint Positions Calculation
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width || 900;
      const height = rect.height || 1600;
      setSvgDimensions({ width, height });

      const itemsCount = timelineEvents.length;
      const isMobile = window.innerWidth <= 768;
      const center = isMobile ? 35 : width / 2;
      // Amplitude of curve (left-right distance from center line)
      const amplitude = isMobile ? 0 : width * 0.26;

      let d = `M ${center} 0`;
      const newCheckpoints = [];

      let prevX = center;
      let prevY = 0;

      for (let i = 0; i < itemsCount; i++) {
        // Y position of checkpoint corresponding to each timeline card
        const y = (height / (itemsCount + 0.2)) * (i + 0.6);
        // Alternate curve directions: even index left, odd index right
        const direction = i % 2 === 0 ? -1 : 1;
        const x = isMobile ? center : center + direction * amplitude;

        const cpY1 = prevY + (y - prevY) * 0.5;
        const cpY2 = y - (y - prevY) * 0.5;
        d += ` C ${prevX} ${cpY1}, ${x} ${cpY2}, ${x} ${y}`;

        newCheckpoints.push({ x, y, index: i, year: timelineEvents[i].year });
        prevX = x;
        prevY = y;
      }

      // Final curve smooth finish to bottom center
      const endY = height;
      d += ` C ${prevX} ${prevY + (endY - prevY) * 0.5}, ${center} ${endY - (endY - prevY) * 0.5}, ${center} ${endY}`;

      setPathD(d);
      setCheckpoints(newCheckpoints);
    };

    updatePath();

    const ro = new ResizeObserver(() => {
      updatePath();
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    const handleResize = () => updatePath();
    window.addEventListener('resize', handleResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [timelineEvents.length]);

  // Scroll Animation Loop for Car & Checkpoints using RAF
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current || !pathRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress relative to container height in viewport
      const startPoint = windowHeight * 0.5;
      const totalScrollDist = rect.height - windowHeight * 0.2;
      const currentScrollDist = startPoint - rect.top;

      let progress = currentScrollDist / Math.max(1, totalScrollDist);
      progress = Math.max(0, Math.min(1, progress));

      // Calculate instantaneous scroll speed
      const now = Date.now();
      const dt = Math.max(1, now - lastScrollTime.current);
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      const instSpeed = Math.min(140, Math.round((dy / dt) * 55));
      setCurrentSpeed(instSpeed);
      lastScrollY.current = window.scrollY;
      lastScrollTime.current = now;

      // Map progress to point along SVG curve path
      const totalLength = pathRef.current.getTotalLength();
      if (totalLength > 0) {
        const currentLength = progress * totalLength;
        const point = pathRef.current.getPointAtLength(currentLength);

        // Compute exact tangent steering angle (+2px look-ahead for smooth curve tracking)
        const sampleLength = Math.min(totalLength, currentLength + 2);
        const nextPoint = pathRef.current.getPointAtLength(sampleLength);

        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        // SVG Car points upwards by default (+90deg offset)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        if (carRef.current) {
          carRef.current.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
        }

        // Count passed checkpoints
        let passed = 0;
        checkpoints.forEach((cp, idx) => {
          const cpLength = (totalLength / (checkpoints.length + 0.5)) * (idx + 0.6);
          // Check both currentLength along the SVG path AND actual scroll distance down the page
          if (currentLength >= cpLength - 25 || currentScrollDist >= cp.y - windowHeight * 0.35) {
            passed = idx + 1;
          }
        });
        setPassedCheckpointsCount(passed);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathD, checkpoints]);

  return (
    <main style={{ paddingTop: '150px' }}>
      {/* Fixed Bottom Horizontal Progress Bar & 10 Mini Cards Overview */}
      <div className="legacy-bottom-progress-bar">
        <div className="legacy-progress-top">
          <div className="legacy-progress-info">
            <span className="legacy-progress-badge">
              <i className="fa-solid fa-trophy" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>
              {passedCheckpointsCount > 0 
                ? timelineEvents[Math.min(passedCheckpointsCount - 1, timelineEvents.length - 1)].year 
                : timelineEvents[0].year}
            </span>
            <span className="legacy-progress-title">
              {passedCheckpointsCount > 0 
                ? timelineEvents[Math.min(passedCheckpointsCount - 1, timelineEvents.length - 1)].title 
                : 'JOURNEY INITIALIZED'}
            </span>
          </div>

          <div className="legacy-progress-track-wrapper">
            <div className="legacy-progress-track">
              <div 
                className="legacy-progress-fill" 
                style={{ width: `${(passedCheckpointsCount / timelineEvents.length) * 100}%` }}
              />
            </div>
            <span className="legacy-progress-pct">
              {Math.round((passedCheckpointsCount / timelineEvents.length) * 100)}%
            </span>
          </div>
        </div>

        {/* All 10 Milestone Mini Cards Fitting Horizontally */}
        <div className="legacy-mini-cards-grid">
          {timelineEvents.map((event, idx) => {
            const isUnlocked = idx < passedCheckpointsCount;
            const isCurrent = idx === Math.max(0, passedCheckpointsCount - 1);

            return (
              <div 
                key={event.year}
                className={`legacy-mini-card ${isUnlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => setSelectedImage(event)}
                title={`${event.year}: ${event.title} - Click to view`}
              >
                <div className="mini-card-header">
                  <span className="mini-year">{event.year}</span>
                  {isUnlocked && <i className="fa-solid fa-check mini-check"></i>}
                </div>
                <div className="mini-card-heading">{event.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Telemetry Speedometer HUD */}
      <div className="speedometer-hud">
        <div className="speedometer-gauge">
          <svg viewBox="0 0 60 60" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border-color, rgba(217,229,236,0.3))" strokeWidth="5" />
            <circle
              cx="30" cy="30" r="24" fill="none"
              stroke="var(--accent-green, #16A34A)" strokeWidth="5"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 - (passedCheckpointsCount / timelineEvents.length) * 150.8}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--accent-green, #16A34A)', fontFamily: 'var(--font-mono)' }}>
            {Math.round((passedCheckpointsCount / timelineEvents.length) * 100)}%
          </div>
        </div>
        <div className="speedometer-readout">
          <div className="speedometer-val">
            {passedCheckpointsCount} / {timelineEvents.length}
          </div>
          <div className="speedometer-lbl">CHECKPOINTS</div>
          <div style={{ fontSize: '0.66rem', color: 'var(--accent-green, #16A34A)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            <i className="fa-solid fa-gauge-high" style={{ marginRight: '4px' }}></i>
            {currentSpeed > 0 ? `${currentSpeed} KM/H` : 'CRUISING'}
          </div>
        </div>
      </div>

      {/* Timeline Page Hero */}
      <section className="section-header">
        <div className="badge-glass">
          <i className="fa-solid fa-trophy" style={{ marginRight: '6px' }}></i> The Road to Global Excellence
        </div>
        <h2>Our Journey & Achievements</h2>
        <p>Tracking our history of push-the-envelope engineering, from a student collective to a globally recognized automotive research team.</p>
      </section>

      {/* Vertical Timeline with Winding SVG Road Track & Animated Car */}
      <section className="timeline-section" style={{ paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
        <div className="timeline-container" ref={containerRef}>

          {/* Winding Racetrack SVG Overlay */}
          <div className="timeline-svg-wrapper">
            <svg
              width={svgDimensions.width}
              height={svgDimensions.height}
              viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <linearGradient id="roadGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-green, #16A34A)" />
                  <stop offset="50%" stopColor="var(--accent-cyan, #06B6D4)" />
                  <stop offset="100%" stopColor="var(--primary-blue, #2563EB)" />
                </linearGradient>
                <linearGradient id="headlightCone" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(22, 163, 74, 0.85)" />
                  <stop offset="100%" stopColor="rgba(22, 163, 74, 0)" />
                </linearGradient>
              </defs>

              {/* Outer Glowing Road Bed */}
              {pathD && <path d={pathD} className="road-track-border" />}
              {/* Dark Asphalt Core Track */}
              {pathD && <path d={pathD} className="road-track-core" />}
              {/* Dashed Centerline Track */}
              {pathD && <path ref={pathRef} d={pathD} className="road-track-dash" />}
            </svg>

            {/* Checkpoint Flags / Pitstop Markers along the Path */}
            {checkpoints.map((cp, idx) => (
              <div
                key={idx}
                className={`checkpoint-marker ${idx + 1 === passedCheckpointsCount ? 'active' : idx + 1 < passedCheckpointsCount ? 'passed' : ''}`}
                style={{ left: `${cp.x}px`, top: `${cp.y}px` }}
                title={`Checkpoint ${idx + 1}: ${cp.year}`}
              >
                <i className={idx + 1 <= passedCheckpointsCount ? "fa-solid fa-flag-checkered" : "fa-solid fa-location-dot"}></i>
              </div>
            ))}

            {/* Scroll-Driven Prototype Car */}
            <div className="timeline-car" ref={carRef}>
              <svg viewBox="0 0 36 58" style={{ width: '100%', height: '100%', display: 'block' }}>
                {/* Headlight beams */}
                <polygon points="4,2 -6,-22 14,-22" fill="url(#headlightCone)" opacity="0.9" />
                <polygon points="32,2 42,-22 22,-22" fill="url(#headlightCone)" opacity="0.9" />

                {/* Wheels */}
                <rect x="1" y="8" width="5" height="12" rx="2" fill="var(--car-wheel-fill, #1AFFFF)" />
                <rect x="30" y="8" width="5" height="12" rx="2" fill="var(--car-wheel-fill, #1AFFFF)" />
                <rect x="1" y="38" width="5" height="12" rx="2" fill="var(--car-wheel-fill, #1AFFFF)" />
                <rect x="30" y="38" width="5" height="12" rx="2" fill="var(--car-wheel-fill, #1AFFFF)" />

                {/* Sleek Aerodynamic Body */}
                <path d="M 18,2 C 27,2 31,12 31,28 C 31,44 27,56 18,56 C 9,56 5,44 5,28 C 5,12 9,2 18,2 Z" fill="var(--car-body-fill, #040d0f)" stroke="var(--car-body-stroke, #1AFFFF)" strokeWidth="2.2" />

                {/* Center Racing Stripe */}
                <path d="M 18,2 L 18,56" stroke="var(--car-stripe, #1AFFFF)" strokeWidth="1.8" opacity="0.95" />

                {/* Glass Canopy Cockpit */}
                <path d="M 18,14 C 23,14 25,20 25,28 C 25,36 23,40 18,40 C 13,40 11,36 11,28 C 11,20 13,14 18,14 Z" fill="var(--car-cockpit-fill, rgba(26, 255, 255, 0.85))" />

                {/* Rear Spoiler Wing */}
                <rect x="4" y="52" width="28" height="4" rx="2" fill="var(--car-spoiler-fill, #1AFFFF)" />
              </svg>
            </div>
          </div>

          {timelineEvents.map((item, idx) => (
            <div key={item.year} className={`timeline-item ${item.side} ${idx < passedCheckpointsCount ? 'animate-in' : ''}`}>
              <div className={item.highlight ? "timeline-dot-highlight" : "timeline-dot"}></div>
              <div
                className={`timeline-content-glass legacy-card-light ${item.highlight ? 'highlight-border' : ''}`}
                style={{
                  background: 'var(--legacy-card-bg)',
                  color: 'var(--legacy-card-text)',
                  borderColor: 'var(--legacy-card-border, rgba(43, 197, 206, 0.45))',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(24, 208, 220, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.3)'
                }}
              >
                <div className="card-decor-corners"></div>
                <div className="card-scanline"></div>
                <div className="card-tech-header">
                  <span className="card-tech-tag">[ {item.tag} ]</span>
                  <span className="card-tech-status">
                    <i className={item.highlight ? "fa-solid fa-trophy" : "fa-solid fa-circle-nodes"} style={{ marginRight: '4px' }}></i>
                    {item.highlight ? 'Decrypted' : 'Ready'}
                  </span>
                </div>

                <span className={`timeline-date ${item.highlight ? 'highlight-text' : ''}`}>{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>

                {/* Photo Preview Box - image fills the entire container */}
                {item.image && (
                  <div
                    onClick={() => setSelectedImage(item)}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '140px',
                      margin: '12px 0 8px 0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(24, 208, 220, 0.35)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                      e.currentTarget.style.transform = 'scale(1.01)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 208, 220, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(24, 208, 220, 0.35)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      padding: '12px 14px'
                    }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <i className="fa-solid fa-camera" style={{ color: 'var(--accent-cyan)' }}></i> {item.year} Event Photo
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.8)', marginTop: '2px' }}>
                          {item.imageCaption || 'Beginning of an Era'}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(24, 208, 220, 0.4)', whiteSpace: 'nowrap' }}>
                        <i className="fa-solid fa-expand" style={{ marginRight: '4px' }}></i> View
                      </span>
                    </div>
                  </div>
                )}

                <button
                  className="btn-tech-diag"
                  onClick={() => handleRunDiagnostics(item.year)}
                  style={{ marginTop: '10px' }}
                >
                  <i className={activeConsole[item.year] ? 'fa-solid fa-square-minus' : 'fa-solid fa-terminal'} style={{ marginRight: '6px' }}></i>
                  {activeConsole[item.year] ? 'Close Console' : 'Run Diagnostics'}
                </button>

                {activeConsole[item.year] && (
                  <div className="card-diag-console active" style={{ maxHeight: '180px', padding: '12px', borderWidth: '1px', marginTop: '15px' }}>
                    {(printedLogs[item.year] || []).map((line, idx) => (
                      line === 'cursor' ? (
                        <div key={idx} className="console-line">&gt; <span className="console-cursor"></span></div>
                      ) : (
                        <div key={idx} className="console-line">{line}</div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Lightbox / Modal for Photo View & Full Detailed Information */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--card-bg)',
              border: '1px solid var(--accent-cyan)',
              borderRadius: '16px',
              boxShadow: '0 20px 50px rgba(0, 208, 220, 0.2)',
              animation: 'fadeIn 0.3s ease',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                zIndex: 20,
                background: 'rgba(10, 15, 25, 0.85)',
                backdropFilter: 'blur(6px)',
                border: '1px solid var(--accent-cyan)',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
              title="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div
              style={{
                overflowY: 'auto',
                padding: '24px',
                maxHeight: '90vh'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', paddingRight: '40px' }}>
                <span className="timeline-date" style={{ fontSize: '1.1rem' }}>{selectedImage.year}</span>
                {selectedImage.location && (
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(24, 208, 220, 0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(24, 208, 220, 0.25)' }}>
                    <i className="fa-solid fa-location-dot" style={{ marginRight: '4px' }}></i>{selectedImage.location}
                  </span>
                )}
              </div>

              <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-primary)', fontSize: '1.3rem', marginBottom: '4px', paddingRight: '40px' }}>
                {selectedImage.subtitle || selectedImage.title}
              </h2>

              {selectedImage.vehicleConcept && (
                <div style={{ color: 'var(--accent-cyan)', fontWeight: '600', fontSize: '0.95rem', fontFamily: 'var(--font-title)', marginTop: '2px' }}>
                  {selectedImage.vehicleConcept}
                </div>
              )}

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{ width: '100%', maxHeight: '55vh', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--glass-border)', margin: '14px 0' }}
              />

              {selectedImage.imageCaption && (
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>
                  <i className="fa-solid fa-camera" style={{ marginRight: '6px' }}></i>
                  {selectedImage.imageCaption}
                </p>
              )}

              {/* Detailed Bullet Points from Last Year's Site */}
              {selectedImage.detailedBullets && selectedImage.detailedBullets.length > 0 && (
                <div style={{ background: 'rgba(24, 208, 220, 0.04)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1rem', fontFamily: 'var(--font-title)' }}>Key Achievements & Event Details:</h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {selectedImage.detailedBullets.map((bullet, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
