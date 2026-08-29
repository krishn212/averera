import React, { useEffect, useRef } from 'react';
import priyaImg from '../assets/priya_anand.webp';
import marcusImg from '../assets/marcus_webb.webp';
import liImg from '../assets/li_yuen.webp';
import gytiImg from '../assets/gyti_award.webp';
import semImg from '../assets/sem_championship.webp';
import oimtImg from '../assets/oimt_grant.webp';
import saeImg from '../assets/sae_design.webp';
import { initAboutAnimations } from '../utils/animations';

export default function AboutUs() {
  const mainRef = useRef(null);

  useEffect(() => {
    const cleanup = initAboutAnimations(mainRef.current);
    return () => cleanup && cleanup();
  }, []);

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

  return (
    <main ref={mainRef} style={{ paddingTop: '150px' }}>
      {/* 1. Hero / Mission Header */}
      <section className="section-header">
        <div className="badge-glass">
          <i className="fa-solid fa-leaf" style={{ marginRight: '6px' }}></i> Mission & Vision of the Team
        </div>
        <h2 style={{ fontSize: '3rem', maxWidth: '800px', margin: '0 auto 20px auto', lineHeight: '1.2' }}>
          Our Mission: <br />
          <span className="logo-accent">Leave the world better than you found it.</span>
        </h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          Engineering the future of sustainable mobility through electric propulsion, autonomous systems, and relentless innovation.
        </p>
      </section>

      {/* 2. The Challenge & Our Solution */}
      <section className="about-section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
        <div className="section-header" style={{ textAlign: 'left', margin: '0 0 40px 0' }}>
          <h2 style={{ fontSize: '2rem' }}>The Challenge & Our Solution</h2>
        </div>
        
        <div className="about-grid" style={{ gridTemplateColumns: '1fr 1.2fr', alignItems: 'start' }}>
          {/* Challenge Column */}
          <div
            className="about-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ padding: '35px' }}
          >
            <div className="badge-glass" style={{ borderColor: 'rgba(6, 182, 212, 0.3)', color: 'var(--accent-cyan)', marginBottom: '20px' }}>
              The Challenge
            </div>
            <h3 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-cyan)', margin: '10px 0 15px 0' }}>75%</h3>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>of global power grids still rely on fossil fuels.</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
              The transport sector accounts for nearly 20% of greenhouse gas emissions worldwide. Internal combustion engines remain dominant despite their environmental cost—a reality that demands engineering solutions, not policy mandates.
            </p>
            <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
              <div>
                <h5 style={{ fontSize: '1.6rem', color: 'var(--accent-cyan)', margin: 0 }}>20%</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Global Transport Emission</p>
              </div>
              <div>
                <h5 style={{ fontSize: '1.6rem', color: 'var(--accent-cyan)', margin: 0 }}>1.4B</h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>ICE Vehicles in Use</p>
              </div>
            </div>
          </div>

          {/* Solution Column */}
          <div
            className="about-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ padding: '35px' }}
          >
            <div className="badge-glass" style={{ marginBottom: '20px' }}>
              Our Solution
            </div>
            <h4 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>High-efficiency electric mobility meets autonomous intelligence.</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px' }}>
              Team Averera designs next-generation electric vehicle prototypes to solve real-world efficiency challenges. Our electric and autonomous platforms serve as research testbeds—building the vehicles of tomorrow, today.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <span className="card-icon" style={{ width: '40px', height: '40px', fontSize: '1rem', flexShrink: 0, marginBottom: 0 }}>
                  <i className="fa-solid fa-bolt-lightning"></i>
                </span>
                <div>
                  <h5 style={{ fontSize: '1rem', margin: '0 0 4px 0' }}>96% Motor Efficiency</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Custom-designed BLDC controllers that maximize energy conversion efficiency on race tracks.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <span className="card-icon" style={{ width: '40px', height: '40px', fontSize: '1rem', flexShrink: 0, marginBottom: 0 }}>
                  <i className="fa-solid fa-brain"></i>
                </span>
                <div>
                  <h5 style={{ fontSize: '1rem', margin: '0 0 4px 0' }}>SAE Level 3 Autonomy</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Sensor-fusion algorithms (LiDAR, Camera, IMU) for real-time lane tracking, obstacle avoidance, and path planning.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '15px' }}>
                <span className="card-icon" style={{ width: '40px', height: '40px', fontSize: '1rem', flexShrink: 0, marginBottom: 0 }}>
                  <i className="fa-solid fa-leaf"></i>
                </span>
                <div>
                  <h5 style={{ fontSize: '1rem', margin: '0 0 4px 0' }}>Carbon Fiber Chassis</h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Lightweight composite chassis designed entirely in-house, reducing overall weight by 45%.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Faculty Mentors */}
      <section className="about-section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '60px' }}>
        <div className="section-header" style={{ textAlign: 'left', margin: '0 0 40px 0' }}>
          <h2 style={{ fontSize: '2rem' }}>Faculty Mentors</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
            World-class mentorship empowers our innovative minds to push the boundaries of what is possible.
          </p>
        </div>
        
        <div className="about-grid">
          {/* Card 1 */}
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

          {/* Card 2 */}
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

          {/* Card 3 */}
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

      {/* 4. Global Presence & Legacy */}
      <section className="about-section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="section-header" style={{ textAlign: 'left', margin: '0 0 40px 0' }}>
          <h2 style={{ fontSize: '2rem' }}>Global Presence & Legacy</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
            From national recognition to international racing championships, our track record speaks for itself.
          </p>
        </div>
        
        <div className="vehicles-grid" style={{ gap: '25px' }}>
          {/* Milestone 1 */}
          <div
            className="vehicle-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ borderRadius: '16px', overflow: 'hidden' }}
          >
            <div className="vehicle-img-wrapper" style={{ height: '220px', borderBottom: '1px solid var(--glass-border)' }}>
              <img src={gytiImg} alt="GYTI Award 2023" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="vehicle-info" style={{ padding: '25px' }}>
              <div className="vehicle-tag" style={{ background: 'rgba(0, 255, 255, 0.05)', color: 'var(--accent-cyan)' }}>National Recognition</div>
              <h3 style={{ fontSize: '1.2rem', margin: '10px 0 5px 0' }}>GYTI Award 2023</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Presented for breakthrough technical innovation in ultra-efficient electric powertrains.</p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div
            className="vehicle-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ borderRadius: '16px', overflow: 'hidden' }}
          >
            <div className="vehicle-img-wrapper" style={{ height: '220px', borderBottom: '1px solid var(--glass-border)' }}>
              <img src={semImg} alt="SEM Asia Championship" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="vehicle-info" style={{ padding: '25px' }}>
              <div className="vehicle-tag" style={{ background: 'rgba(16, 185, 129, 0.05)', color: 'var(--accent-green)' }}>Asia Cup Finals</div>
              <h3 style={{ fontSize: '1.2rem', margin: '10px 0 5px 0' }}>SEM Asia Championship</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Representing IIT BHU Varanasi on the global stage, competing with top Asian universities.</p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div
            className="vehicle-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ borderRadius: '16px', overflow: 'hidden' }}
          >
            <div className="vehicle-img-wrapper" style={{ height: '220px', borderBottom: '1px solid var(--glass-border)' }}>
              <img src={oimtImg} alt="OIMT Innovation Grant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="vehicle-info" style={{ padding: '25px' }}>
              <div className="vehicle-tag" style={{ background: 'rgba(0, 255, 255, 0.05)', color: 'var(--accent-cyan)' }}>Research Funding</div>
              <h3 style={{ fontSize: '1.2rem', margin: '10px 0 5px 0' }}>OIMT Innovation Grant</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Awarded to accelerate the development of advanced carbon composite components.</p>
            </div>
          </div>

          {/* Milestone 4 */}
          <div
            className="vehicle-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ borderRadius: '16px', overflow: 'hidden' }}
          >
            <div className="vehicle-img-wrapper" style={{ height: '220px', borderBottom: '1px solid var(--glass-border)' }}>
              <img src={saeImg} alt="SAE Collegiate Design" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="vehicle-info" style={{ padding: '25px' }}>
              <div className="vehicle-tag" style={{ background: 'rgba(16, 185, 129, 0.05)', color: 'var(--accent-green)' }}>eV Challenge</div>
              <h3 style={{ fontSize: '1.2rem', margin: '10px 0 5px 0' }}>SAE Collegiate Design</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Design evaluation certificate for high performance formula student vehicle chassis.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
