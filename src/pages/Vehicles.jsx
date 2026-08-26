import React, { useEffect, useRef } from 'react';
import shivayImg from '../assets/vehicles/shivay 2.png';
import alternoV4Img from '../assets/vehicles/v4.jpg';
import alternoV3Img from '../assets/vehicles/v3.jpg';
import alternoV2Img from '../assets/vehicles/v2.jpg';
import alternoV1Img from '../assets/vehicles/v1.jpg';
import golfCartImg from '../assets/vehicles/autonomus golf cart.jpg';
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
            <p className="lead-text">
              The latest vehicle, Shivaay, is the team’s interpretation of an Urban-Concept vehicle. Features an aerodynamic design with a drag coefficient of 0.106, a versatile transmission (85% efficiency) with a sprag-clutch, and an in-house built modular Motor Controller.
            </p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Chassis Type</div>
                <div className="spec-metric-value">Carbon Fiber Monocoque</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Curb Weight</div>
                <div className="spec-metric-value highlight-green">25 kg Shell</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Motor Efficiency</div>
                <div className="spec-metric-value">91% peak</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Safety Status</div>
                <div className="spec-metric-value">Cleared Technical (2023)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Alterno V4 Section (Prototype Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid swap-grid">
          <div className="vehicle-specs">
            <div className="badge-glass">02 — Prototype Class</div>
            <h3>ALTERNO V4</h3>
            <p className="lead-text">
              Built with optimized motor windings to maximize efficiency. Features a 1kW custom motor controller developed in-house incorporating an STM chip with higher processing power. Kerb weight was reduced to an all-time low, including a sprag clutch-based transmission.
            </p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Top Efficiency</div>
                <div className="spec-metric-value highlight-green">465.1 km/kWh</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">India Rank</div>
                <div className="spec-metric-value">1st Place</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Asia Rank</div>
                <div className="spec-metric-value">2nd Place</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Controller</div>
                <div className="spec-metric-value">Custom STM-based 1kW</div>
              </div>
            </div>
          </div>
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={alternoV4Img}
                alt="Alterno V4 Prototype"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Alterno V3 Section (Prototype Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid">
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={alternoV3Img}
                alt="Alterno V3 Prototype"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
          <div className="vehicle-specs">
            <div className="badge-glass">03 — Prototype Class</div>
            <h3>ALTERNO V3</h3>
            <p className="lead-text">
              Nicknamed "Black Panther", featuring an aerodynamic teardrop body shape and low rolling resistance tires with ceramic bearings. Reinforced with carbon fiber longerons and stringers for weight optimization.
            </p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Efficiency</div>
                <div className="spec-metric-value highlight-green">349.6 km/kWh</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Chassis Weight</div>
                <div className="spec-metric-value">14 kg Carbon Monocoque</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Drag Coefficient</div>
                <div className="spec-metric-value">0.092 Cd</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Rankings</div>
                <div className="spec-metric-value">1st in India / 3rd in Asia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Alterno V2.0 Section (Prototype Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid swap-grid">
          <div className="vehicle-specs">
            <div className="badge-glass">04 — Prototype Class</div>
            <h3>ALTERNO V2.0</h3>
            <p className="lead-text">
              Successfully cleared all Shell Eco-Marathon Technical Inspections and completed standard track test runs. Sleek body modifications were introduced to optimize drag coefficients, and the weight of the glass fiber shell was significantly reduced.
            </p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Chassis Design</div>
                <div className="spec-metric-value">Truss-based circular members</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Torsional Stiffness</div>
                <div className="spec-metric-value">Optimum weight-to-stiffness</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Shell Material</div>
                <div className="spec-metric-value">Lightweight Glass Fiber</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Status</div>
                <div className="spec-metric-value">Track Tested</div>
              </div>
            </div>
          </div>
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={alternoV2Img}
                alt="Alterno V2.0 Prototype"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Alterno V1.0 Section (Prototype Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid">
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={alternoV1Img}
                alt="Alterno V1.0 Prototype"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
          <div className="vehicle-specs">
            <div className="badge-glass">05 — Prototype Class</div>
            <h3>ALTERNO V1.0</h3>
            <p className="lead-text">
              Second generation Alterno, developed in the year 2014-2015. This vehicle marked the team's first official attempt to represent our institute and the nation on an international technical mobility platform.
            </p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Event Debut</div>
                <div className="spec-metric-value">Shell Eco-marathon Asia 2015</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Significance</div>
                <div className="spec-metric-value">1st Indian Team in Category</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Timeline</div>
                <div className="spec-metric-value">Developed 2014-2015</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Pioneering Step</div>
                <div className="spec-metric-value">Laid Founding R&D Base</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Autonomous Golf Vehicle Section (Autonomous Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px', marginBottom: '80px' }}>
        <div className="vehicle-detail-grid swap-grid">
          <div className="vehicle-specs">
            <div className="badge-glass">06 — Autonomous Testbed Class</div>
            <h3>AUTONOMOUS GOLF VEHICLE</h3>
            <p className="lead-text">
              Developed as a dedicated testing pipeline platform for Connected Vehicle Technology. Integrates drive-by-wire steering mechanisms, a self-developed hardware test bench, and LiDAR perception models fit for Indian road configurations.
            </p>

            <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Autonomy Level</div>
                <div className="spec-metric-value highlight-green">SAE Level-2 Autonomy</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Perception Sensors</div>
                <div className="spec-metric-value">LiDAR + Camera array</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Control System</div>
                <div className="spec-metric-value">Drive-by-wire controller</div>
              </div>
              <div className="spec-metric-card">
                <div className="spec-metric-label">Infrastructure</div>
                <div className="spec-metric-value">Connected Vehicle Tech</div>
              </div>
            </div>
          </div>
          <div className="vehicle-gallery">
            <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <img
                src={golfCartImg}
                alt="Autonomous Golf Vehicle"
                className="hero-car-img"
                style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Pillars */}
      <section className="tech-pillars-section" style={{ marginTop: '40px' }}>
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
    </main>
  );
}
