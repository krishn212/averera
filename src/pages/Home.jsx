import React, { useState, useEffect, useRef } from 'react';
import priyaImg from '../assets/priya_anand.png';
import marcusImg from '../assets/marcus_webb.png';
import liImg from '../assets/li_yuen.png';
import prospectusPdf from '../assets/SWARUP_AVERERA BROCHURE_FINAL14.pdf';

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
                  href={prospectusPdf}
                  download="SWARUP_AVERERA_BROCHURE_FINAL14.pdf"
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
              <i className="fa-solid fa-layer-group"></i>
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
                  alt="Dr. Priya Anand"
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
              <div className="badge-glass" style={{ fontSize: '0.75rem', padding: '4px 10px', marginBottom: '10px' }}>
                Mechanical & Aerospace
              </div>
              <h4 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Dr. Priya Anand</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
                Specializes in structural composites and aerodynamic design optimization.
              </p>
              <div className="socials" style={{ gap: '10px', justifyContent: 'center' }}>
                <a href="#" style={{ fontSize: '0.95rem' }}><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-envelope"></i></a>
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
                  alt="Prof. Marcus Webb"
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
              <div className="badge-glass" style={{ fontSize: '0.75rem', padding: '4px 10px', marginBottom: '10px', borderColor: 'rgba(16,185,129,0.2)', color: 'var(--accent-green)' }}>
                Autonomous Systems
              </div>
              <h4 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Prof. Marcus Webb</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
                Leads research in sensor fusion algorithms and vehicle autonomy.
              </p>
              <div className="socials" style={{ gap: '10px', justifyContent: 'center' }}>
                <a href="#" style={{ fontSize: '0.95rem' }}><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-envelope"></i></a>
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
                  alt="Dr. Li Yuen"
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
              <div className="badge-glass" style={{ fontSize: '0.75rem', padding: '4px 10px', marginBottom: '10px' }}>
                Power & Battery systems
              </div>
              <h4 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>Dr. Li Yuen</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
                Focuses on custom BMS safety circuits and electric powertrains.
              </p>
              <div className="socials" style={{ gap: '10px', justifyContent: 'center' }}>
                <a href="#" style={{ fontSize: '0.95rem' }}><i className="fa-brands fa-linkedin"></i></a>
                <a href="#" style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Horizontal Sponsor Logo Marquee */}
        <section id="sponsors" className="sponsors-section" style={{ marginTop: '70px', marginBottom: '40px' }}>
          <div className="section-header">
            <h2>Our Trusted Partners & Sponsors</h2>
            <p>Empowering student innovation, green energy research, and engineering excellence.</p>
          </div>

          <div className="sponsor-marquee-container">
            {/* Row 1: Left Infinite Scroll */}
            <div className="sponsor-marquee-track track-left">
              {[spTata, spIitbhu, spCerd, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12, sp13, sp14, spMain, spTata, spIitbhu, spCerd, sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12, sp13, sp14, spMain].map((imgSrc, i) => (
                <div className="sponsor-logo-card" key={`sp-l-${i}`}>
                  <img src={imgSrc} alt={`Sponsor logo ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* Row 2: Right Infinite Scroll */}
            <div className="sponsor-marquee-track track-right" style={{ marginTop: '20px' }}>
              {[sp14, sp13, sp12, sp11, sp10, sp9, sp8, sp7, sp6, sp5, sp4, sp3, sp2, sp1, spCerd, spIitbhu, spTata, spMain, sp14, sp13, sp12, sp11, sp10, sp9, sp8, sp7, sp6, sp5, sp4, sp3, sp2, sp1, spCerd, spIitbhu, spTata, spMain].map((imgSrc, i) => (
                <div className="sponsor-logo-card" key={`sp-r-${i}`}>
                  <img src={imgSrc} alt={`Sponsor logo ${i + 1}`} />
                </div>
              ))}
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
                <p><i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i> averera@iitbhu.ac.in</p>
                <p><i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }}></i> IIT (BHU) Varanasi, India</p>
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
