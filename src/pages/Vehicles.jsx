import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import shivayImg from '../assets/vehicles/shivay 2.webp';
import alternoV3Img from '../assets/vehicles/v4.webp'; // V3 (2018-2019)
import alternoV2_1Img from '../assets/vehicles/v2_1.webp'; // V2.1 (2017)
import alternoV2Img from '../assets/vehicles/v2.webp'; // V2.0 (2016)
import alternoV1Img from '../assets/vehicles/v1.webp'; // V1 (2015)
import alternoOrigImg from '../assets/vehicles/alterno_2013.webp'; // Alterno (2013-14)
import autoTestImg from '../assets/vehicles/autonomous_test_vehicle.webp';
import { initVehiclesPageAnimations } from '../utils/animations';

export default function Vehicles({ setActivePage }) {
  const mainRef = useRef(null);

  useEffect(() => {
    const cleanup = initVehiclesPageAnimations(mainRef.current);
    return () => cleanup && cleanup();
  }, []);

  return (
    <main ref={mainRef} style={{ paddingTop: '150px', paddingBottom: '100px' }}>
      {/* Vehicles Page Hero */}
      <section className="section-header">
        <div className="badge-glass">
          <i className="fa-solid fa-car" style={{ marginRight: '6px' }}></i> Performance & Efficiency
        </div>
        <h2>COMPETITION FLEET</h2>
        <p>Explore the complete lineage of high-efficiency electric and autonomous vehicles designed and manufactured entirely in-house by Team AVERERA at IIT (BHU) Varanasi.</p>
      </section>

      {/* ─── COMPETITION VEHICLES FLEET ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* 01 — Shivaay V1 Section (2020–2023) */}
        <section className="vehicle-detail-section">
          <div className="vehicle-detail-grid">
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={shivayImg}
                  alt="Shivaay V1 Urban Concept"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
            <div className="vehicle-specs">
              <div className="badge-glass">01 — Urban Concept Class (2020–2023)</div>
              <h3>SHIVAAY V1</h3>
              <p className="lead-text">
                The latest vehicle, SHIVAAY, is the team’s interpretation of an Urban-Concept vehicle. It has an aerodynamic design with a low drag coefficient, lightweight (35kg) Carbon Fiber monocoque, versatile transmission (85% efficiency) with sprag-clutch, and in-house built modular Motor Controller with high efficiency (91%), ceramic bearings, and low rolling-resistance tires. Successfully cleared Technical and Safety Inspection.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 8 – 10</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Chassis Type</div>
                  <div className="spec-metric-value">Carbon Fibre Monocoque (35kg)</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Motor Controller</div>
                  <div className="spec-metric-value">91% In-House Modular</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Autonomy Prep</div>
                  <div className="spec-metric-value">SAE Level-2 Integration</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Alterno V3 Section (2018–2019) */}
        <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
          <div className="vehicle-detail-grid swap-grid">
            <div className="vehicle-specs">
              <div className="badge-glass">02 — Prototype Class (2018–2019)</div>
              <h3>ALTERNO V3</h3>
              <p className="lead-text">
                The team fabricated a new body for the 5th prototype and nicknamed it <em>Black Panther</em>. The body developed was aerodynamic with a tear-drop shape and drag coefficient of 0.092, using a highly light-weight (14 kg) Carbon Fibre Monocoque. We became one of the few teams to use Carbon fibre composites in their prototype design, using longerons and stringers for reinforcement and weight optimization. It had low rolling resistance tires with ceramic bearings. In its final iteration with an in-house 1kW STM motor controller, it achieved a record efficiency of 465.1 km/kWh, securing 2nd rank in Asia and 1st in India.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 6 – 7</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Top Efficiency</div>
                  <div className="spec-metric-value">465.1 km/kWh</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Chassis Weight</div>
                  <div className="spec-metric-value">14 kg Carbon Fibre Monocoque</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Rankings</div>
                  <div className="spec-metric-value">1st in India / 2nd in Asia</div>
                </div>
              </div>
            </div>
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={alternoV3Img}
                  alt="Alterno V3 Prototype"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Alterno V2.1 Section (2017) */}
        <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
          <div className="vehicle-detail-grid">
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={alternoV2_1Img}
                  alt="Alterno V2.1 Prototype"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
            <div className="vehicle-specs">
              <div className="badge-glass">03 — Prototype Class (2017)</div>
              <h3>ALTERNO V2.1</h3>
              <p className="lead-text">
                In the 4th iteration, the motor controller was improved to overcome humid conditions by the use of heat sinks and an SMPS box. The knuckles were redesigned for vehicle weight reduction. The visibility was improved using thermoforming - vacuum moulding of the windshield. It was the 1st Indian team’s vehicle making an official attempt at Shell Eco-marathon Asia. We an efficiency of 131.8 km/kWh, with 11th position in Asia and 1st in India.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 5</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Efficiency</div>
                  <div className="spec-metric-value">131.8 km/kWh</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Rankings</div>
                  <div className="spec-metric-value">1st in India / 11th in Asia</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Thermal Solution</div>
                  <div className="spec-metric-value">Heat sinks & SMPS Box</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Alterno V2.0 Section (2016) */}
        <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
          <div className="vehicle-detail-grid swap-grid">
            <div className="vehicle-specs">
              <div className="badge-glass">04 — Prototype Class (2016)</div>
              <h3>ALTERNO V2.0</h3>
              <p className="lead-text">
                The 3rd vehicle successfully passed Technical Inspection and test runs. The design was made more sleek for improvement in the aerodynamics. A truss-based chassis was manufactured using circular cross-section members for an optimum torsional stiffness at minimum weight. The weight of the glass fiber shell was further reduced.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 4</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Chassis Design</div>
                  <div className="spec-metric-value">Circular Truss Structure</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Aerodynamics</div>
                  <div className="spec-metric-value">Sleek Low-Drag Profile</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Shell Weight</div>
                  <div className="spec-metric-value">Ultra-light Glass Fiber</div>
                </div>
              </div>
            </div>
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={alternoV2Img}
                  alt="Alterno V2.0 Prototype"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Alterno V1.0 Section (2015) */}
        <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
          <div className="vehicle-detail-grid">
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={alternoV1Img}
                  alt="Alterno V1.0 Prototype"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
            <div className="vehicle-specs">
              <div className="badge-glass">05 — Prototype Class (2015)</div>
              <h3>ALTERNO V1.0</h3>
              <p className="lead-text">
                Second generation Alterno, developed in the year 2014-2015. This was the first official attempt to represent our institute at the event. The attempt of 2015 saw the team become the first-ever Indian team to represent the country at Shell Eco-marathon Asia 2015, but could not clear the technical inspection round.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 3</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Milestone</div>
                  <div className="spec-metric-value">1st Indian Team at SEM Asia</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Event</div>
                  <div className="spec-metric-value">Shell Eco-marathon Asia 2015</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Timeline</div>
                  <div className="spec-metric-value">2014 – 2015</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Alterno Section (2013–2014) */}
        <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
          <div className="vehicle-detail-grid swap-grid">
            <div className="vehicle-specs">
              <div className="badge-glass">06 — Prototype Class (2013–2014)</div>
              <h3>ALTERNO</h3>
              <p className="lead-text">
                The team participated for the first time with this vehicle, becoming India’s first-ever team to represent the country at Shell Eco-Marathon Asia. The vehicle included a lightweight chassis, low aerodynamic drag despite rough surface finish, and a self-fabricated motor controller. Unfortunately, it did not clear the Technical Inspection.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 1 & 2 (Founders)</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Historic Milestone</div>
                  <div className="spec-metric-value">India's 1st SEM Asia Entry</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Motor Controller</div>
                  <div className="spec-metric-value">Self-Fabricated Custom PCB</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Chassis</div>
                  <div className="spec-metric-value">Lightweight Custom Chassis</div>
                </div>
              </div>
            </div>
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={alternoOrigImg}
                  alt="Alterno 2013-14 Prototype"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 — Autonomous Test Vehicle Section (2021–2022) */}
        <section className="vehicle-detail-section" style={{ marginTop: '100px', marginBottom: '80px' }}>
          <div className="vehicle-detail-grid">
            <div className="vehicle-gallery">
              <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <img
                  src={autoTestImg}
                  alt="Autonomous Test Vehicle"
                  className="hero-car-img"
                  width="580"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', maxWidth: '580px', objectFit: 'contain' }}
                />
                <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%)' }}></div>
              </div>
            </div>
            <div className="vehicle-specs">
              <div className="badge-glass">07 — Autonomous Test Vehicle (2021–2022)</div>
              <h3>AUTONOMOUS TEST VEHICLE</h3>
              <p className="lead-text">
                The main objective of this project is to develop Connected Vehicle Technology for Autonomous vehicles as per Indian road conditions. It involves developing software to drive the car by analyzing the input from a set of sensors. The software to be first tested in a simulation, then on a self-developed Test Bench, and further on a road-ready car that uses drive-by-wire mechanisms to control the vehicle. The car’s autonomy will further be enhanced by designing a Connected Vehicle Infrastructure and integrating this technology with the Autonomous car.
              </p>

              <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Developed By</div>
                  <div className="spec-metric-value">Generation 9 – 10</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Timeline</div>
                  <div className="spec-metric-value">2021 – 2022</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Steering Mechanism</div>
                  <div className="spec-metric-value">Ackermann + Drive-by-Wire</div>
                </div>
                <div className="spec-metric-card">
                  <div className="spec-metric-label">Sensor Architecture</div>
                  <div className="spec-metric-value">LiDAR + Vision + IMU</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
