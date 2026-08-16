import React, { useEffect, useRef } from 'react';
import vehicleImg from '../assets/vehicle.png';
import { initVehiclesPageAnimations } from '../utils/animations';

export default function Vehicles() {
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
    const rotateX = ((centerY - y) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
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
        <h2>The Averera Fleet</h2>
        <p>Explore the engineering marvels designed and manufactured entirely in-house by our team. Built for maximum efficiency and aerodynamic perfection.</p>
      </section>

      {/* Shivaay Section (Urban Concept) */}
      <section className="vehicle-detail-section">
        <div className="vehicle-detail-grid">
          <div className="vehicle-gallery">
            <div className="image-glass-container">
              <img
                src={vehicleImg}
                alt="Shivaay Concept Car"
                className="hero-car-img"
                style={{ filter: 'hue-rotate(90deg)' }}
              />
              <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.15) 0%, transparent 70%)' }}></div>
            </div>
          </div>
          <div className="vehicle-specs">
            <div className="badge-glass">UrbanConcept Class</div>
            <h3>Shivaay</h3>
            <p className="lead-text">Optimized for urban driving conditions, Shivaay features an advanced lightweight monocoque, fully integrated driver assistance systems, and regenerative braking.</p>
            
            <table className="specs-table-glass">
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Chassis Type</strong></td>
                  <td>Carbon Fiber Monocoque (In-house)</td>
                </tr>
                <tr>
                  <td><strong>Powertrain</strong></td>
                  <td>Brushless DC Motor (Custom Controller)</td>
                </tr>
                <tr>
                  <td><strong>Curb Weight</strong></td>
                  <td>92 kg</td>
                </tr>
                <tr>
                  <td><strong>Top Speed</strong></td>
                  <td>55 km/h</td>
                </tr>
                <tr>
                  <td><strong>Braking System</strong></td>
                  <td>Hydraulic Disc with Regenerative Braking</td>
                </tr>
                <tr>
                  <td><strong>Telemetry</strong></td>
                  <td>Real-time CAN-bus system with cloud syncing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Alterno Section (Prototype Class) */}
      <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
        <div className="vehicle-detail-grid swap-grid">
          <div className="vehicle-specs">
            <div className="badge-glass">Prototype Class</div>
            <h3>Alterno v4.0</h3>
            <p className="lead-text">Built with one single goal: absolute energy efficiency. Alterno's tear-drop design minimizes drag, achieving an incredible aerodynamic drag coefficient.</p>
            
            <table className="specs-table-glass">
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Layout</strong></td>
                  <td>3-wheeled, Rear-wheel drive</td>
                </tr>
                <tr>
                  <td><strong>Body Material</strong></td>
                  <td>Ultra-light carbon fiber composite shell</td>
                </tr>
                <tr>
                  <td><strong>Energy Source</strong></td>
                  <td>Lithium-ion Battery Pack (Custom BMS)</td>
                </tr>
                <tr>
                  <td><strong>Efficiency</strong></td>
                  <td>250+ km / kWh</td>
                </tr>
                <tr>
                  <td><strong>Drag Coefficient (Cd)</strong></td>
                  <td>0.12</td>
                </tr>
                <tr>
                  <td><strong>Steering System</strong></td>
                  <td>Indirect custom mechanical linkage</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="vehicle-gallery">
            <div className="image-glass-container">
              <img src={vehicleImg} alt="Alterno Prototype" className="hero-car-img" />
              <div className="glow-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophies */}
      <section className="tech-pillars-section" style={{ marginTop: '100px', paddingBottom: '80px' }}>
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
