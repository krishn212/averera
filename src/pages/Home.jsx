import React, { useState, useEffect, useRef } from 'react';
import priyaImg from '../assets/eee_faculty_shyam.avif';
import marcusImg from '../assets/eee_faculty_sandip.avif';
import liImg from '../assets/mec_faculty_amitesh.avif';

// Sponsor Logos
import spMain from '../assets/sponsors.avif';
import sp1 from '../assets/sponsors1.avif';
import sp2 from '../assets/sponsors2.avif';
import sp3 from '../assets/sponsors3.avif';
import sp4 from '../assets/sponsors4.avif';
import sp5 from '../assets/sponsors5.avif';
import sp6 from '../assets/sponsors6.avif';
import sp7 from '../assets/sponsors7.avif';
import sp8 from '../assets/sponsors8.avif';
import sp9 from '../assets/sponsors9.avif';
import sp10 from '../assets/sponsors10.avif';
import sp11 from '../assets/sponsors11.avif';
import sp12 from '../assets/sponsors12.avif';
import sp13 from '../assets/sponsors13 (2).avif';
import sp14 from '../assets/sponsors14.avif';
import spTata from '../assets/tata.avif';
import spIitbhu from '../assets/IITBHU_logo.avif';
import spCerd from '../assets/cerd logo.avif';

import {
  initHeroAnimations,
  initStatCounters,
  initScrollReveals,
  initNavScrollEffect,
  ScrollTrigger
} from '../utils/animations';

export default function Home({ setActivePage, introDone }) {
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToContact');
    if (shouldScroll === 'true') {
      sessionStorage.removeItem('scrollToContact');
      const timer = setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  // --- 1. Typewriter Effect ---
  const [typedText, setTypedText] = useState('');
  const textArray = [
    "Engineering The Future of Sustainable Mobility",
    "Designing Zero-Emission Electric Vehicles",
    "Pioneering Autonomous Racing Systems",
    "Shaping the Next Era of Transportation"
  ];
  const badgeArray = [
    "🏆 Winner Shell Eco-Marathon 2021",
    "⚡ 250+ km/kWh Ultra Efficiency",
    "🤖 AI Autonomous Sensor Fusion",
    "🇮🇳 IIT BHU Premier Research Team"
  ];
  const [currentBadge, setCurrentBadge] = useState(badgeArray[0]);

  const typingSpeed = 60;
  const erasingSpeed = 30;
  const newTextDelay = 2500;

  const textArrayIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isErasingRef = useRef(false);
  const typewriterTimeoutRef = useRef(null);

  useEffect(() => {
    function handleTypewriter() {
      const currentSentence = textArray[textArrayIndexRef.current];

      if (!isErasingRef.current) {
        // Typing text
        setTypedText(currentSentence.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;

        if (charIndexRef.current === currentSentence.length) {
          isErasingRef.current = true;
          typewriterTimeoutRef.current = setTimeout(handleTypewriter, newTextDelay);
        } else {
          typewriterTimeoutRef.current = setTimeout(handleTypewriter, typingSpeed);
        }
      } else {
        // Erasing text
        setTypedText(currentSentence.substring(0, charIndexRef.current - 1));
        charIndexRef.current--;

        if (charIndexRef.current === 0) {
          isErasingRef.current = false;
          textArrayIndexRef.current = (textArrayIndexRef.current + 1) % textArray.length;
          setCurrentBadge(badgeArray[textArrayIndexRef.current]);
          typewriterTimeoutRef.current = setTimeout(handleTypewriter, typingSpeed + 500);
        } else {
          typewriterTimeoutRef.current = setTimeout(handleTypewriter, erasingSpeed);
        }
      }
    }

    typewriterTimeoutRef.current = setTimeout(handleTypewriter, 800);

    return () => {
      if (typewriterTimeoutRef.current) {
        clearTimeout(typewriterTimeoutRef.current);
      }
    };
  }, []);

  // --- 2. 3D Tilt Effect Handlers ---
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  // --- 3. Telemetry Simulator State ---
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(88.5);
  const [efficiency, setEfficiency] = useState(245.2);
  const [logs, setLogs] = useState([
    "SYSTEM OFFLINE: Press 'Start Engine' to initialize systems..."
  ]);

  const accelerationActive = useRef(false);
  const regenerationActive = useRef(false);
  const simInterval = useRef(null);

  const addLog = (text, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString().split(' ')[0];
    const newLogLine = `[${timestamp}] [${type.toUpperCase()}] ${text}`;
    setLogs((prevLogs) => {
      const updated = [...prevLogs, newLogLine];
      // Keep last 40 logs
      if (updated.length > 40) updated.shift();
      return updated;
    });
  };

  const consoleContainerRef = useRef(null);
  useEffect(() => {
    // Scroll logs console container to bottom
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const startEngine = () => {
    if (!isRunning) {
      setIsRunning(true);
      addLog('Eco-Drive motor system powered up.', 'ok');
      addLog('Telemetry connection established over 4G LTE.', 'ok');
      addLog('Active sensors: LiDAR, Camera, Wheel Encoders.', 'info');
    } else {
      setIsRunning(false);
      setSpeed(0);
      accelerationActive.current = false;
      regenerationActive.current = false;
      addLog('Vehicle shut down sequence initiated.', 'warn');
      addLog('Motors powered off. Safe state active.', 'info');
    }
  };

  useEffect(() => {
    if (isRunning) {
      simInterval.current = setInterval(() => {
        if (accelerationActive.current) {
          setSpeed((prevSpeed) => {
            const nextSpeed = Math.min(60, prevSpeed + 1.8);
            if (Math.random() < 0.15) {
              addLog(`Accelerating: Draw ${(nextSpeed * 0.15).toFixed(2)} kW from motor.`, 'info');
            }
            return nextSpeed;
          });
          setBattery((prevBattery) => {
            const nextBattery = prevBattery - 0.12;
            if (nextBattery <= 0) {
              setIsRunning(false);
              setSpeed(0);
              addLog('SYSTEM SHUTDOWN: Critical low battery!', 'critical');
              return 0;
            }
            return nextBattery;
          });
          setEfficiency((prevSpeed) => 240 + Math.random() * 20 - (prevSpeed * 0.5));
        } else if (regenerationActive.current) {
          setSpeed((prevSpeed) => {
            const nextSpeed = Math.max(0, prevSpeed - 2.5);
            if (nextSpeed > 0) {
              setBattery((prevBattery) => Math.min(100, prevBattery + 0.05));
              setEfficiency((prevEff) => prevEff + 4.5);
              if (Math.random() < 0.15) {
                addLog(`Braking: Regenerating energy. Recovered ${(nextSpeed * 0.08).toFixed(2)} kW.`, 'ok');
              }
            }
            return nextSpeed;
          });
        } else {
          // Coasting deceleration
          setSpeed((prevSpeed) => Math.max(0, prevSpeed - 0.4));
          setEfficiency(() => 250 + Math.random() * 5);
        }
      }, 150);
    } else {
      if (simInterval.current) {
        clearInterval(simInterval.current);
      }
    }

    return () => {
      if (simInterval.current) {
        clearInterval(simInterval.current);
      }
    };
  }, [isRunning]);

  const mainRef = useRef(null);

  useEffect(() => {
    if (!introDone) return;

    const cleanHero = initHeroAnimations(mainRef.current);
    const cleanStats = initStatCounters(mainRef.current);
    const cleanReveals = initScrollReveals(mainRef.current);
    const cleanNav = initNavScrollEffect();

    // Settle layout then refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (cleanHero) cleanHero();
      if (cleanStats) cleanStats();
      if (cleanReveals) cleanReveals();
      if (cleanNav) cleanNav();
    };
  }, [introDone]);

  // Dial Ring stroke-dashoffset math
  // Map 0-60 km/h to offset 377-0
  const dialOffset = 377 - (speed / 60) * 377;

  return (
    <>

      <main ref={mainRef}>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="badge-glass">
                {currentBadge}
              </div>
              <h1 className="hero-typed-heading">
                <span id="typed-text">{typedText}</span>
                <span className="typed-cursor">|</span>
              </h1>
              <p>We are IIT BHU's premier automotive research team, designing and building ultra-efficient electric and autonomous vehicles to shape green transportation.</p>
              <div className="hero-buttons">
                <a
                  href="/documents/PARTNERSHIP_PROSPECTUS_2026-27.pdf"
                  download="PARTNERSHIP_PROSPECTUS_2026-27.pdf"
                  className="btn btn-glow"
                >
                  Partnership Prospectus <i className="fa-solid fa-download"></i>
                </a>
                <a
                  href="#about"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div
              className="stat-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h3>150+</h3>
              <p>Innovators & Engineers</p>
            </div>
            <div
              className="stat-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h3>1<sup>st</sup></h3>
              <p>Shell Eco-Marathon Global League</p>
            </div>
            <div
              className="stat-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h3>0</h3>
              <p>Carbon Emissions Goal</p>
            </div>
            <div
              className="stat-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h3>250+</h3>
              <p>Km/kWh Vehicle Efficiency</p>
            </div>
          </div>
        </section>

        {/* About / Mission Section */}
        <section id="about" className="about-section">
          <div className="section-header">
            <h2>ABOUT TEAM AVERERA</h2>
            <p>Pioneering eco-friendly vehicle technology through engineering excellence.</p>
          </div>
          <div className="about-grid">
            <div
              className="about-card card-wide"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card-icon"><i className="fa-solid fa-bolt-lightning"></i></div>
              <h3>Our Mission</h3>
              <p>To design, construct, and optimize high-efficiency electric and autonomous vehicles that tackle the world's energy and environmental challenges, representing IIT (BHU) Varanasi on global platforms.</p>
            </div>
            <div
              className="about-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card-icon"><i className="fa-solid fa-microchip"></i></div>
              <h3>Advanced Engineering</h3>
              <p>Developing custom carbon fiber monocoques, in-house BLDC motor controllers, and AI-driven autonomous perception models.</p>
            </div>
            <div
              className="about-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card-icon"><i className="fa-solid fa-trophy"></i></div>
              <h3>Global Excellence</h3>
              <p>Consistently placing at the top of the leaderboard in Asia & Global Shell Eco-Marathons, competing with top universities globally.</p>
            </div>
          </div>
        </section>

        {/* Upcoming Projects & Research Proposal Section (Below About Us) */}
        <section id="upcoming-projects" className="about-section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
          <div className="section-header">
            <div className="badge-glass">
              <i className="fa-solid fa-compass-drafting" style={{ marginRight: '6px' }}></i> Future Horizon
            </div>
            <h2>UPCOMING PROJECTS</h2>
            <p>Strategic research initiatives establishing permanent test facilities, custom motor dynos, and active battery balancing testbeds at IIT (BHU) Varanasi.</p>
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Project Proposal Banner */}
            <div className="proposal-roadmap-banner">
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px'
              }}>
                <div style={{ maxWidth: '720px' }}>
                  <div className="proposal-badge-tag" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}>
                    <i className="fa-solid fa-file-lines"></i> Official R&D Roadmap
                  </div>
                  <h3 style={{ fontSize: '2.2rem', marginBottom: '14px', lineHeight: '1.2' }}>
                    Urban Concept Electric Vehicle <br />
                    <span className="logo-accent">Project Proposal (2026–2028)</span>
                  </h3>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                    A research and development plan establishing testing facilities, dynamometer setups, battery characterization benches, and advanced thermoplastic composite manufacturing at IIT (BHU) Varanasi.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href="mailto:averera@iitbhu.ac.in?subject=Partnership%20Inquiry%20-%20Team%20AVERERA"
                    className="btn btn-glow"
                    style={{
                      padding: '16px 28px',
                      fontSize: '1.05rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    Partner with Us <i className="fa-solid fa-handshake"></i>
                  </a>
                  <a
                    href="/documents/Project_Proposal_UC.pdf"
                    download="Team_AVERERA_Project_Proposal_UC.pdf"
                    className="btn"
                    style={{
                      padding: '16px 24px',
                      fontSize: '1.05rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    Download Proposal <i className="fa-solid fa-file-pdf"></i>
                  </a>
                </div>
              </div>

              {/* Quick Metrics Bar - 3 core stats */}
              <div className="proposal-divider" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '35px',
                paddingTop: '25px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>
                  <div className="proposal-metric-title" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Target Efficiency</div>
                  <div className="proposal-metric-val" style={{ fontSize: '1.4rem', fontWeight: '700' }}>&gt; 250 km/kWh</div>
                </div>
                <div>
                  <div className="proposal-metric-title" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>R&D Scope</div>
                  <div className="proposal-metric-val" style={{ fontSize: '1.4rem', fontWeight: '700' }}>5 Core Verticals</div>
                </div>
                <div>
                  <div className="proposal-metric-title" style={{ fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>Timeline Horizon</div>
                  <div className="proposal-metric-val" style={{ fontSize: '1.4rem', fontWeight: '700' }}>24 Months (3 Phases)</div>
                </div>
              </div>
            </div>

            {/* 5 R&D Research Verticals as Full Editorial Subsections */}
            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '8px', letterSpacing: '-0.01em' }}>Strategic Research Verticals</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem' }}>
                  Phase-by-phase experimental testbenches and technical focus areas from the official project proposal.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {[
                  {
                    id: 'thermal',
                    num: '01',
                    title: 'Thermal Management Research',
                    tag: 'Powertrain & Battery Reliability',
                    icon: 'fa-fire-flame-curved',
                    summary: 'Establishing a dedicated thermal characterization facility to prevent thermal hotspots, lower electrical resistance losses, and CFD-optimize submerged NACA cooling ducts without bluff-body aerodynamic drag penalties.',
                    highlights: [
                      'Custom insulated testbench & FLIR thermal imaging setup',
                      'CFD & FEA airflow analysis across battery pack & motor controller',
                      'Active/passive hybrid cooling and Peltier module characterization'
                    ]
                  },
                  {
                    id: 'bms',
                    num: '02',
                    title: 'Advanced Battery Management Systems',
                    tag: 'Energy Storage Intelligence',
                    icon: 'fa-battery-bolt',
                    summary: 'Developing custom in-house BMS hardware featuring active inductive/capacitive cell balancing, STM32 real-time monitoring, and Kalman-filtered model-based SoC & SoH estimations to extract maximum energy from every watt-hour.',
                    highlights: [
                      'Multi-channel cell cycler dataset generation rig for cell characterization',
                      'Transition from passive resistive bleed to high-efficiency active balancing',
                      'CAN/UART telemetry pipeline streaming real-time metrics to pit crew dashboard'
                    ]
                  },
                  {
                    id: 'powertrain',
                    num: '03',
                    title: 'High-Efficiency Powertrain & Dyno',
                    tag: 'Propulsion Optimization',
                    icon: 'fa-gears',
                    summary: 'Custom BLDC/PMSM motor design with optimized windings, coupled with an in-house motor dynamometer testbench to minimize switching, transmission, and rolling resistance losses.',
                    highlights: [
                      'Dedicated motor dynamometer testbench with torque/speed power analyzer',
                      'Genetic algorithm optimization of gear ratios & track driving strategies in MATLAB/Simulink',
                      'Hardware-in-the-loop (HIL) testing platform to isolate subsystem losses'
                    ]
                  },
                  {
                    id: 'suspension',
                    num: '04',
                    title: 'Quasi-Zero Stiffness (QZS) Suspension',
                    tag: 'Vehicle Dynamics & Isolation',
                    icon: 'fa-arrows-down-to-line',
                    summary: 'Advanced vibration isolation research utilizing Quasi-Zero Stiffness (QZS) compliant mechanisms and eddy-current non-contact damping to reduce dynamic rolling friction and structural fatigue.',
                    highlights: [
                      'Quarter-car suspension test rig with actuator-based road excitation',
                      'Dynamic stiffness modulation & vibration transmissibility optimization',
                      'Lightweight flexure-based prototype fabrication for racing dynamics'
                    ]
                  },
                  {
                    id: 'composites',
                    num: '05',
                    title: 'Lightweight Thermoplastic Composites',
                    tag: 'Advanced Materials & Aeroshell',
                    icon: 'fa-layer-group',
                    summary: 'Pioneering Out-of-Autoclave (OOA) thermal consolidation, ultrasonic & induction fusion welding for thermoplastic CFRP matrices, eliminating mechanical fasteners and parasitic structural adhesives.',
                    highlights: [
                      'Localized heat-press & ultrasonic welding infrastructure',
                      'Aerogel & honeycomb core sandwich structures for extreme weight reduction',
                      'Full-scale research-derived aerodynamic aeroshell integration'
                    ]
                  }
                ].map((vert) => (
                  <div
                    key={vert.id}
                    id={`vertical-${vert.id}`}
                    className="about-card"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      width: '100%',
                      padding: '36px 38px',
                      borderRadius: '20px',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <div className="card-decor-corners" style={{ opacity: 1 }}></div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid var(--glass-border)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          color: 'var(--badge-color)',
                          fontSize: '1.4rem',
                          fontWeight: '800'
                        }}>
                          {vert.num}
                        </span>
                        <h4 style={{
                          fontSize: '1.5rem',
                          margin: 0,
                          fontWeight: '700',
                          letterSpacing: '-0.01em',
                          color: 'var(--text-primary)'
                        }}>
                          {vert.title}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: 'var(--badge-bg)',
                          color: 'var(--badge-color)',
                          border: 'var(--badge-border)',
                          borderRadius: '100px',
                          padding: '6px 16px',
                          fontSize: '0.82rem',
                          fontWeight: '600',
                          letterSpacing: '0.04em'
                        }}>
                          <i className={`fa-solid ${vert.icon}`} style={{ marginRight: '8px' }}></i>
                          {vert.tag}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '30px',
                      alignItems: 'start'
                    }}>
                      <div>
                        <p style={{
                          fontSize: '1.02rem',
                          lineHeight: '1.75',
                          color: 'var(--text-secondary)',
                          margin: 0
                        }}>
                          {vert.summary}
                        </p>
                      </div>

                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '14px',
                        padding: '22px 26px',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      }}>
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: '700',
                          marginBottom: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--badge-color)'
                        }}>
                          Key Deliverables
                        </div>
                        <ul style={{
                          paddingLeft: '18px',
                          fontSize: '0.92rem',
                          lineHeight: '1.65',
                          margin: 0,
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}>
                          {vert.highlights.map((h, i) => (
                            <li key={i} style={{ listStyleType: 'disc' }}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Separate Autonomous Research Project Block */}
            <div style={{ marginTop: '60px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Autonomous Technology</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                Upcoming autonomous vehicle development initiatives and research tracks.
              </p>

              <div className="about-card autonomy-upcoming-card" style={{
                background: 'linear-gradient(135deg, rgba(24, 208, 219, 0.04) 0%, rgba(10, 14, 23, 0.6) 100%)',
                border: '1px solid rgba(24, 208, 219, 0.25)',
                borderRadius: '20px',
                padding: '30px 35px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1.35rem', margin: 0 }}>
                    Autonomous Vehicle Project
                  </h4>
                  <span className="autonomy-stay-tuned-badge" style={{
                    background: 'rgba(24, 208, 219, 0.12)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(24, 208, 219, 0.35)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    letterSpacing: '0.05em'
                  }}>
                    STAY TUNED
                  </span>
                </div>
                <p style={{ margin: 0, maxWidth: '850px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Research and testing in intelligent mobility, drive-by-wire actuation, and autonomous vehicle technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="tech-section">
          <div className="section-header">
            <h2>TECHNOLOGICAL PILLARS</h2>
            <p>Integrating hardware, software, and aerodynamics.</p>
          </div>
          <div className="tech-grid">
            <div
              className="tech-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-solid fa-car-side"></i>
              <h4>Vehicle Design</h4>
              <p>Aerodynamics, lightweight structures, efficiency-focused vehicle architecture and mechanical design.</p>
            </div>
            <div
              className="tech-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-solid fa-car-battery"></i>
              <h4>Embedded Systems</h4>
              <p>Electronics, BMS, control systems, sensors and intelligent embedded hardware.</p>
            </div>
            <div
              className="tech-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-solid fa-brain"></i>
              <h4>Autonomous Vehicles</h4>
              <p>Perception, control, autonomous systems and intelligent mobility.</p>
            </div>
            <div
              className="tech-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fa-solid fa-bullhorn"></i>
              <h4>Branding & Outreach</h4>
              <p>Communication, outreach, sponsorship, brand development and representing AVERERA beyond engineering.</p>
            </div>
          </div>
        </section>

        {/* Faculty Mentors Section */}
        <section id="mentors" className="about-section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
          <div className="section-header">
            <h2>FACULTY MENTORS</h2>
            <p>World-class mentorship empowers our innovative minds to push the boundaries of what is possible.</p>
          </div>
          <div className="about-grid">
            <div
              className="about-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ textAlign: 'center', padding: '35px 25px' }}
            >
              <div className="mentor-img-wrapper" style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 20px auto' }}>
                <img
                  src={priyaImg}
                  alt="Dr. Shyam Kamal"
                  width="130"
                  height="130"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,255,255,0.25)',
                    boxShadow: '0 0 20px rgba(0,255,255,0.1)'
                  }}
                />
                <div className="card-decor-corners" style={{ opacity: 1 }}></div>
              </div>
              <h4 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Dr. Shyam Kamal</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
                Associate Professor<br />
                Dept. of Electrical Engg.<br />
                IIT (BHU) Varanasi
              </p>
              <div className="socials" style={{ gap: '10px', justifyContent: 'center' }}>
                <a href="https://www.linkedin.com/in/dr-shyam-kamal-9b750b98/" style={{ fontSize: '0.95rem' }}><i className="fa-brands fa-linkedin"></i></a>
                <a href="mailto:shyamkamal.eee@iitbhu.ac.in" style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>

            <div
              className="about-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ textAlign: 'center', padding: '35px 25px' }}
            >
              <div className="mentor-img-wrapper" style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 20px auto' }}>
                <img
                  src={marcusImg}
                  alt="Dr. Sandip Ghosh"
                  width="130"
                  height="130"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid rgba(16,185,129,0.25)',
                    boxShadow: '0 0 20px rgba(16,185,129,0.1)'
                  }}
                />
                <div className="card-decor-corners" style={{ opacity: 1 }}></div>
              </div>
              <h4 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Dr. Sandip Ghosh</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
                Associate Professor<br />
                Dept. of Electrical Engg.<br />
                IIT (BHU) Varanasi
              </p>
              <div className="socials" style={{ gap: '10px', justifyContent: 'center' }}>
                <a href="https://www.linkedin.com/in/sandip-ghosh-b3269614/" style={{ fontSize: '0.95rem' }}><i className="fa-brands fa-linkedin"></i></a>
                <a href="mailto:sghosh.eee@iitbhu.ac.in" style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>

            <div
              className="about-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ textAlign: 'center', padding: '35px 25px' }}
            >
              <div className="mentor-img-wrapper" style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 20px auto' }}>
                <img
                  src={liImg}
                  alt="Dr. Amitesh Kumar"
                  width="130"
                  height="130"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,255,255,0.25)',
                    boxShadow: '0 0 20px rgba(0,255,255,0.1)'
                  }}
                />
                <div className="card-decor-corners" style={{ opacity: 1 }}></div>
              </div>
              <h4 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Dr. Amitesh Kumar</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
                Assistant Professor<br />
                Dept. of Mechanical Engg.<br />
                IIT (BHU) Varanasi
              </p>
              <div className="socials" style={{ gap: '10px', justifyContent: 'center' }}>
                <a href="mailto:amitesh.mec@iitbhu.ac.in" style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </section>



        {/* Spacious Closing Statement Section */}
        <section className="closing-section" style={{ padding: '120px 20px', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px', fontFamily: 'Oxanium, sans-serif', fontWeight: 700 }}>
              ENGINEERING WHAT MOVES TOMORROW.
            </h2>
            <p style={{ letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)', marginBottom: '40px' }}>
              TEAM AVERERA • IIT (BHU), VARANASI
            </p>
            <a
              href="/legacy"
              className="btn btn-glow"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('legacy');
              }}
            >
              EXPLORE OUR LEGACY
            </a>
          </div>
        </section>

        {/* Contact & Connect */}
        <section id="contact" className="contact-section">
          <div className="contact-card-glass">
            <div className="contact-info">
              <h2>Contact Us</h2>
              <p>Partner with us, sponsor our projects, or join the team to build the future of sustainable mobility.</p>
              <div className="contact-details">
                <p>
                  <i className="fa-solid fa-user-tie" style={{ marginRight: '8px', color: 'var(--accent-cyan)' }}></i>
                  <strong>Subhakanta Mohapatra:</strong>{' '}
                  <a href="tel:+919007818674" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                    (+91)-9007818674
                  </a>
                </p>
                <p>
                  <i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: 'var(--accent-cyan)' }}></i>
                  <a href="mailto:averera@iitbhu.ac.in" style={{ color: 'inherit', textDecoration: 'none' }}>
                    averera@iitbhu.ac.in
                  </a>
                </p>
                <p>
                  <i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: 'var(--accent-cyan)' }}></i>
                  Team AVERERA Workshop, Indian Institute of Technology (BHU), Varanasi, Uttar Pradesh 221005, India
                </p>
              </div>

              {/* Embedded Interactive Google Map */}
              <div style={{
                marginTop: '25px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                height: '240px',
                width: '100%',
                position: 'relative'
              }}>
                <iframe
                  title="Team AVERERA IIT BHU Location Map"
                  src="https://maps.google.com/maps?q=Indian%20Institute%20of%20Technology%20(BHU)%20Varanasi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'invert(90%) hue-rotate(180deg) contrast(95%) saturate(80%)',
                    display: 'block'
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="contact-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Demo only)'); }}>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
