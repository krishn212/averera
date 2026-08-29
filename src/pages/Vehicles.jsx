import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import shivayImg from '../assets/vehicles/shivay 2.webp';
import alternoV4Img from '../assets/vehicles/v4.jpg';
import alternoV3Img from '../assets/vehicles/v3.jpg';
import alternoV2Img from '../assets/vehicles/v2.jpg';
import alternoV1Img from '../assets/vehicles/v1.jpg';
import autoTestImg from '../assets/vehicles/autonomous_test_vehicle.webp';
import golfCartImg from '../assets/vehicles/autonomus golf cart.jpg';
import { initVehiclesPageAnimations } from '../utils/animations';

export default function Vehicles({ setActivePage }) {
  const mainRef = useRef(null);
  const [filterView, setFilterView] = useState('all'); // 'all' | 'vehicles' | 'ongoing' | 'upcoming'
  const [selectedVertical, setSelectedVertical] = useState(null);

  const proposalDownloadUrl = "/documents/Project_Proposal_UC.pdf";

  const upcomingVerticals = [
    {
      id: 'thermal',
      num: '01',
      title: 'Thermal Management Research',
      tag: 'Powertrain & Battery Reliability',
      icon: 'fa-fire-flame-curved',
      budget: '₹6,38,000',
      duration: '24 Months (3 Phases)',
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
      budget: '₹8,42,000',
      duration: '24 Months (3 Phases)',
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
      budget: '₹13,58,400',
      duration: '24 Months (3 Phases)',
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
      budget: '₹3,62,000',
      duration: '24 Months (3 Phases)',
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
      budget: '₹8,66,000',
      duration: '24 Months (3 Phases)',
      summary: 'Pioneering Out-of-Autoclave (OOA) thermal consolidation, ultrasonic & induction fusion welding for thermoplastic CFRP matrices, eliminating mechanical fasteners and parasitic structural adhesives.',
      highlights: [
        'Localized heat-press & ultrasonic welding infrastructure',
        'Aerogel & honeycomb core sandwich structures for extreme weight reduction',
        'Full-scale research-derived aerodynamic aeroshell integration'
      ]
    }
  ];

  useEffect(() => {
    const cleanup = initVehiclesPageAnimations(mainRef.current);
    return () => cleanup && cleanup();
  }, []);

  const showVehicles = filterView === 'all' || filterView === 'vehicles';
  const showOngoing = filterView === 'all' || filterView === 'ongoing';
  const showUpcoming = filterView === 'all' || filterView === 'upcoming';

  return (
    <main ref={mainRef} style={{ paddingTop: '150px', paddingBottom: '100px' }}>
      {/* Vehicles Page Hero */}
      <section className="section-header">
        <div className="badge-glass">
          <i className="fa-solid fa-car" style={{ marginRight: '6px' }}></i> Performance & Efficiency
        </div>
        <h2>AVERERA VEHICLES & PROJECTS</h2>
        <p>Explore the engineering marvels designed and manufactured entirely in-house by our team, along with our active research initiatives and upcoming technical proposals.</p>

        {/* View Filter Switcher Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          marginTop: '35px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'all', label: 'All Fleet & R&D', icon: 'fa-layer-group' },
            { id: 'vehicles', label: 'Competition Vehicles', icon: 'fa-car-side' },
            { id: 'ongoing', label: 'Ongoing Projects', icon: 'fa-bolt' },
            { id: 'upcoming', label: 'Upcoming Plans', icon: 'fa-compass-drafting' }
          ].map((tab) => {
            const isActive = filterView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterView(tab.id)}
                style={{
                  background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#000' : 'var(--text-color)',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--glass-border)',
                  padding: '10px 22px',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 20px rgba(24, 208, 219, 0.4)' : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── COMPETITION VEHICLES FLEET ────────────────────────────────────────── */}
      {showVehicles && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* 01 — Shivaay Section (Urban Concept) */}
          <section className="vehicle-detail-section">
            <div className="vehicle-detail-grid">
              <div className="vehicle-gallery">
                <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img
                    src={shivayImg}
                    alt="Shivaay Urban Concept"
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
                <div className="badge-glass">01 — Urban Concept Class</div>
                <h3>SHIVAAY</h3>
                <p className="lead-text">
                  The latest vehicle, Shivaay, is the team’s interpretation of an Urban-Concept vehicle. Features an aerodynamic design with a drag coefficient of 0.106, a versatile transmission (85% efficiency) with a sprag-clutch, and an in-house built modular Motor Controller.
                </p>

                <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Developed By</div>
                    <div className="spec-metric-value">Generation 8 – 10</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Chassis Type</div>
                    <div className="spec-metric-value">Carbon Fiber Monocoque</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Curb Weight</div>
                    <div className="spec-metric-value">30 kg</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Vehicle Efficiency</div>
                    <div className="spec-metric-value">83 km/kWh</div>
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
                    <div className="spec-metric-label">Developed By</div>
                    <div className="spec-metric-value">Generation 7</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Top Efficiency</div>
                    <div className="spec-metric-value">465.1 km/kWh</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">India Rank</div>
                    <div className="spec-metric-value">1st Place</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Asia Rank</div>
                    <div className="spec-metric-value">2nd Place</div>
                  </div>
                </div>
              </div>
              <div className="vehicle-gallery">
                <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img
                    src={alternoV4Img}
                    alt="Alterno V4 Prototype"
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

          {/* 03 — Alterno V3 Section (Prototype Class) */}
          <section className="vehicle-detail-section" style={{ marginTop: '100px' }}>
            <div className="vehicle-detail-grid">
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
                    <div className="spec-metric-label">Developed By</div>
                    <div className="spec-metric-value">Generation 6</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Efficiency</div>
                    <div className="spec-metric-value">349.6 km/kWh</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Chassis Weight</div>
                    <div className="spec-metric-value">14 kg Carbon Monocoque</div>
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
                    <div className="spec-metric-label">Developed By</div>
                    <div className="spec-metric-value">Generation 4</div>
                  </div>
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

          {/* 05 — Alterno V1.0 Section (Prototype Class) */}
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
                <div className="badge-glass">05 — Prototype Class</div>
                <h3>ALTERNO V1.0</h3>
                <p className="lead-text">
                  Second generation Alterno, developed in the year 2014-2015. This vehicle marked the team's first official attempt to represent our institute and the nation on an international technical mobility platform.
                </p>

                <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Developed By</div>
                    <div className="spec-metric-value">Generation 2</div>
                  </div>
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
                    <div className="spec-metric-value">Made in only 21 days</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 06 — Autonomous Test Vehicle Section (Autonomous Class) */}
          <section className="vehicle-detail-section" style={{ marginTop: '100px', marginBottom: '80px' }}>
            <div className="vehicle-detail-grid swap-grid">
              <div className="vehicle-specs">
                <div className="badge-glass">06 — Autonomous Test Vehicle (2021–2022)</div>
                <h3>AUTONOMOUS TEST VEHICLE</h3>
                <p className="lead-text">
                  The Autonomous Test Vehicle was developed as the foundational starting platform for autonomous and connected technology. Utilizing a lightweight three-wheeled electric chassis with Ackermann steering, LiDAR, camera arrays, and IMU sensor mountings, it pioneered our self-developed drive-by-wire steering, braking, and throttle mechanisms—serving as the direct stepping stone towards our ongoing Autonomous Golf Cart platform.
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
                    <div className="spec-metric-label">Architecture</div>
                    <div className="spec-metric-value">3-Wheeled Ackermann Chassis</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Control System</div>
                    <div className="spec-metric-value">Drive-by-Wire Testbed</div>
                  </div>
                </div>
              </div>
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
                  <div className="glow-overlay" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}></div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* ─── INTEGRATED ONGOING PROJECTS (MATCHING VEHICLE CARD STYLE) ─────────── */}
      {showOngoing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Section Header */}
          <div className="section-header" style={{ marginTop: showVehicles ? '100px' : '30px', marginBottom: '60px' }}>
            <div className="badge-glass">
              <i className="fa-solid fa-bolt" style={{ marginRight: '6px' }}></i> Active Workstreams
            </div>
            <h2>ONGOING PROJECTS</h2>
            <p>Explore our active development platforms in autonomous systems and ultra-efficient urban electric mobility.</p>
          </div>

          {/* Ongoing Project 01 — Autonomous Technology & Connected Vehicle */}
          <section className="vehicle-detail-section">
            <div className="vehicle-detail-grid">
              <div className="vehicle-gallery">
                <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img
                    src={golfCartImg}
                    alt="Autonomous Technology & Connected Vehicle"
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
                <div className="badge-glass">Ongoing Project 01 — Autonomous Systems</div>
                <h3>AUTONOMOUS TECHNOLOGY & CONNECTED VEHICLE</h3>
                <p className="lead-text">
                  Developing Connected Vehicle Technology tailored to Indian road conditions. Incorporating multi-sensor perception with LiDAR, camera arrays, and IMUs, along with a full simulation-to-hardware testbench and drive-by-wire vehicle integration.
                </p>

                <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Target Architecture</div>
                    <div className="spec-metric-value">SAE Level-2 Autonomy</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Sensor Suite</div>
                    <div className="spec-metric-value">LiDAR + Stereo Vision</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Testbed Platform</div>
                    <div className="spec-metric-value">Autonomous Golf Cart</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Pipeline Status</div>
                    <div className="spec-metric-value">Active Testbed Validation</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ongoing Project 02 — Electric Vehicle Efficiency: Urban Concept */}
          <section className="vehicle-detail-section" style={{ marginTop: '100px', marginBottom: '80px' }}>
            <div className="vehicle-detail-grid swap-grid">
              <div className="vehicle-specs">
                <div className="badge-glass">Ongoing Project 02 — Urban Concept Class</div>
                <h3>ELECTRIC VEHICLE EFFICIENCY: URBAN CONCEPT</h3>
                <p className="lead-text">
                  Engineering our next iteration single-seater Urban Concept vehicle targeting over 230 km/kWh for the Shell Eco-marathon. Features custom BLDC modular motor controller electronics, aerodynamic drag reduction (Cd = 0.106), and real-time cockpit telemetry.
                </p>

                <div className="premium-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '25px' }}>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Target Efficiency</div>
                    <div className="spec-metric-value">&gt; 230 km/kWh</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Target Competition</div>
                    <div className="spec-metric-value">Shell Eco-marathon Qatar</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Powertrain</div>
                    <div className="spec-metric-value">In-House Modular BLDC</div>
                  </div>
                  <div className="spec-metric-card">
                    <div className="spec-metric-label">Chassis</div>
                    <div className="spec-metric-value">CFRP Monocoque (Cd 0.106)</div>
                  </div>
                </div>
              </div>
              <div className="vehicle-gallery">
                <div className="image-glass-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img
                    src={shivayImg}
                    alt="Electric Vehicle Efficiency: Urban Concept"
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
        </motion.div>
      )}

      {/* ─── UPCOMING PLANS & R&D ROADMAP ────────────────────────────────────────── */}
      {showUpcoming && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: '1200px', margin: '80px auto 0 auto', padding: '0 20px', borderTop: (showVehicles || showOngoing) ? '1px solid var(--glass-border)' : 'none', paddingTop: (showVehicles || showOngoing) ? '70px' : '20px' }}
        >
          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: '50px' }}>
            <div className="badge-glass">
              <i className="fa-solid fa-compass-drafting" style={{ marginRight: '6px' }}></i> Future Horizon
            </div>
            <h2 style={{ fontSize: '2.5rem' }}>UPCOMING PLANS & RESEARCH PROPOSAL</h2>
            <p style={{ maxWidth: '780px', margin: '0 auto' }}>
              Strategic research initiatives establishing permanent test facilities, custom motor dynos, and active battery balancing testbeds at IIT (BHU) Varanasi.
            </p>
          </div>

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

              <div>
                <a
                  href={proposalDownloadUrl}
                  download="Team_AVERERA_Project_Proposal_UC.pdf"
                  className="btn btn-glow"
                  style={{
                    padding: '16px 32px',
                    fontSize: '1.05rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  Download Project Proposal <i className="fa-solid fa-file-pdf"></i>
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
                <div className="proposal-metric-val" style={{ fontSize: '1.4rem', fontWeight: '700' }}>&gt; 230 km/kWh</div>
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

          {/* 5 R&D Verticals Grid */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>5 Strategic Research Verticals</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
              Phase-by-phase implementation plan and experimental testbenches from the official project proposal.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {upcomingVerticals.map((vert) => (
                <div
                  key={vert.id}
                  className="about-card upcoming-vertical-card"
                  style={{
                    borderColor: 'var(--glass-border)',
                    background: 'var(--glass-bg)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      color: 'var(--accent-cyan)',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}>
                      {vert.num}
                    </span>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(24, 208, 219, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)'
                    }}>
                      <i className={`fa-solid ${vert.icon}`}></i>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.25rem', marginBottom: '6px', lineHeight: '1.3' }}>{vert.title}</h4>
                  <div className="vertical-tag" style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '12px' }}>{vert.tag}</div>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{vert.summary}</p>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--glass-border)' }}>
                    <div className="vertical-deliverables-title" style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>Key Deliverables:</div>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                      {vert.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontSize: '0.85rem'
                  }}>
                    <span>Budget: <strong className="vertical-budget-val">{vert.budget}</strong></span>
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
                Team AVERERA is currently planning and formulating its next-generation autonomous vehicle research initiative. Full project documentation and detailed technical roadmaps will be unveiled soon.
              </p>
            </div>
          </div>

        </motion.section>
      )}

    </main>
  );
}
