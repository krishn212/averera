import React, { useEffect, useRef } from 'react';
import vehicleImg from '../assets/vehicle.png';
import shivayImg from '../assets/shivay 2.png';
import stylishCarImg from '../assets/averera_stylish_car.png';
import { initVehiclesPageAnimations } from '../utils/animations';

export default function Vehicles({ setActivePage }) {
  const mainRef = useRef(null);

  useEffect(() => {
    const cleanup = initVehiclesPageAnimations(mainRef.current);
    return () => cleanup && cleanup();
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <main ref={mainRef} style={{ paddingTop: '150px' }}>
      {/* Vehicles Page Hero */}
      <section className="section-header">
        <div className="badge-glass">
          <i className="fa-solid fa-car" style={{ marginRight: '6px' }}></i> Performance & Efficiency
        </div>
        <h2>AVERERA VEHICLES</h2>
        <p>Explore the engineering marvels designed and manufactured entirely in-house by our team. These are custom-built, ultra-efficient competition machines designed to squeeze maximum performance from every watt.</p>
      </section>

      {/* 01 — Shivaay Section (Urban Concept) */}
      <section className="vehicle-detail-section">
        <div className="vehicle-detail-grid">
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={shivayImg}
                alt="Shivaay Urban Concept"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
          <div className="vehicle-specs">
            <div className="badge-glass">01 — Urban Concept Class</div>
            <h3>SHIVAAY</h3>
            <p className="lead-text">Optimized for urban driving conditions, Shivaay features an advanced lightweight monocoque, fully integrated driver assistance systems, and regenerative braking.</p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Chassis Type</div>
                <div className="spec-metric-value">Carbon Fiber Monocoque</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Curb Weight</div>
                <div className="spec-metric-value highlight-green">92 kg</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Top Speed</div>
                <div className="spec-metric-value">55 km/h</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Powertrain</div>
                <div className="spec-metric-value">Brushless DC Motor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Alterno Section (Prototype Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid swap-grid">
          <div className="vehicle-specs">
            <div className="badge-glass">02 — Prototype Class</div>
            <h3>ALTERNO v4.0</h3>
            <p className="lead-text">Built with one single goal: absolute energy efficiency. Alterno's teardrop design minimizes drag, achieving an incredible aerodynamic drag coefficient.</p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Layout</div>
                <div className="spec-metric-value">3-Wheeled RWD</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Body Material</div>
                <div className="spec-metric-value">Carbon Fiber Shell</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Efficiency</div>
                <div className="spec-metric-value highlight-green">250+ km/kWh</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Drag Coefficient</div>
                <div className="spec-metric-value">0.12 Cd</div>
              </div>
            </div>
          </div>
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={vehicleImg}
                alt="Alterno Prototype"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Averera Vision Section (Next-Gen Autonomous Concept) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid">
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={stylishCarImg}
                alt="Averera Vision Concept"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
          <div className="vehicle-specs">
            <div className="badge-glass">03 — Autonomous Concept Class</div>
            <h3>AVERERA VISION</h3>
            <p className="lead-text">Integrating LiDAR perception models, predictive power management, and active aerodynamic surfaces to define the future of autonomous efficiency racing.</p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Perception</div>
                <div className="spec-metric-value">LiDAR + AI Vision</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Telemetry</div>
                <div className="spec-metric-value">Live 4G LTE Stream</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Propulsion</div>
                <div className="spec-metric-value">Electric Pod Drive</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Status</div>
                <div className="spec-metric-value">Active Concept</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophies */}
      <section className="tech-pillars-section" style={{ marginTop: '120px' }}>
        <div className="section-header">
          <h2>Engineering Highlights</h2>
          <p>Our components are pushed to the limit of thermal, mechanical, and aerodynamic forces.</p>
        </div>
        <div className="tech-grid">
          <div
            className="tech-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa-solid fa-wind"></i>
            <h4>CFD & Aerodynamics</h4>
            <p>Over 500 hours of Computational Fluid Dynamics simulations to minimize pressure drag and skin friction.</p>
          </div>
          <div
            className="tech-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa-solid fa-circle-nodes"></i>
            <h4>Custom Telemetry</h4>
            <p>Live dashboard tracking battery temperature, motor RPM, speed, and driver biometrics over 4G LTE link.</p>
          </div>
          <div
            className="tech-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa-solid fa-weight-hanging"></i>
            <h4>Mass Optimization</h4>
            <p>Using topology optimization algorithms to shave structural weight from aluminum uprights and carbon components.</p>
          </div>
        </div>
      </section>

      {/* Spacious Legacy Transition Section */}
      <section style={{ padding: '120px 20px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: '80px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            ENGINEERING NEVER STANDS STILL.
          </p>
          <a
            href="/legacy"
            className="btn btn-glow"
            onClick={(e) => {
              e.preventDefault();
              setActivePage?.('legacy');
            }}
            style={{ fontSize: '1.05rem', letterSpacing: '0.1em' }}
          >
            EXPLORE THE AVERERA LEGACY <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
          </a>
        </div>
      </section>
    </main>
  );
}
