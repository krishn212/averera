import React, { useEffect, useRef } from 'react';
import { initSponsorsAnimations } from '../utils/animations';

export default function Sponsors({ setActivePage }) {
  const mainRef = useRef(null);

  useEffect(() => {
    const cleanup = initSponsorsAnimations(mainRef.current);
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
      {/* Sponsors Page Hero */}
      <section className="section-header">
        <div className="badge-glass">
          <i className="fa-solid fa-handshake" style={{ marginRight: '6px' }}></i> Partner with Us
        </div>
        <h2>Support Sustainable Innovation</h2>
        <p>By partnering with Team Averera, you fuel green energy research, empower the next generation of engineers, and gain global brand visibility.</p>
      </section>

      {/* Sponsor Tiers Grid */}
      <section className="pricing-section">
        <div className="pricing-grid">

          {/* Bronze Tier */}
          <div
            className="pricing-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="pricing-header">
              <h4>Bronze</h4>
              <div className="price-val">Support</div>
            </div>
            <ul className="pricing-benefits">
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Logo on Website</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Logo on team apparel</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Social media mentions</li>
              <li className="disabled"><i className="fa-solid fa-xmark" style={{ marginRight: '8px' }}></i> Logo on vehicle chassis</li>
              <li className="disabled"><i className="fa-solid fa-xmark" style={{ marginRight: '8px' }}></i> Recruitment access</li>
            </ul>
            <a
              href="#contact"
              className="btn btn-secondary btn-full"
              onClick={(e) => {
                e.preventDefault();
                if (setActivePage) {
                  sessionStorage.setItem('scrollToContact', 'true');
                  setActivePage('home');
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Partner With Us
            </a>
          </div>

          {/* Platinum Tier (Highlighted) */}
          <div
            className="pricing-card highlighted-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-glow-border"></div>
            <div className="pricing-header">
              <span className="popular-badge">Most Impact</span>
              <h4 style={{ color: 'var(--accent-cyan)' }}>Platinum</h4>
              <div className="price-val">Strategic</div>
            </div>
            <ul className="pricing-benefits">
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Prime logo space on vehicle</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Direct access to recruitment</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Shared press releases</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Invite to vehicle rollouts</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Tech exchange opportunities</li>
            </ul>
            <a
              href="#contact"
              className="btn btn-glow btn-full"
              onClick={(e) => {
                e.preventDefault();
                if (setActivePage) {
                  sessionStorage.setItem('scrollToContact', 'true');
                  setActivePage('home');
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Become Strategic Partner
            </a>
          </div>

          {/* Gold Tier */}
          <div
            className="pricing-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="pricing-header">
              <h4>Gold</h4>
              <div className="price-val">Premium</div>
            </div>
            <ul className="pricing-benefits">
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Prominent logo on vehicle</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Logo on apparel & banners</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Regular newsletter features</li>
              <li><i className="fa-solid fa-check text-glow" style={{ marginRight: '8px' }}></i> Dedicated recruitment files</li>
              <li className="disabled"><i className="fa-solid fa-xmark" style={{ marginRight: '8px' }}></i> Custom tech exchanges</li>
            </ul>
            <a
              href="#contact"
              className="btn btn-secondary btn-full"
              onClick={(e) => {
                e.preventDefault();
                if (setActivePage) {
                  sessionStorage.setItem('scrollToContact', 'true');
                  setActivePage('home');
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Choose Gold
            </a>
          </div>

        </div>
      </section>

      {/* Why Sponsor Us */}
      <section className="why-sponsor-section" style={{ marginTop: '80px', paddingBottom: '80px' }}>
        <div className="section-header">
          <h2>Why Partner with Team Averera?</h2>
          <p>Align your brand with global technological leadership and clean energy initiatives.</p>
        </div>
        <div className="tech-grid">
          <div
            className="tech-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa-solid fa-earth-asia"></i>
            <h4>CSR & Green Energy</h4>
            <p>Fulfill Corporate Social Responsibility goals by supporting a zero-emission student automotive project.</p>
          </div>
          <div
            className="tech-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <h4>Top Talent Pipeline</h4>
            <p>Gain direct exposure to some of the brightest engineering minds at IIT (BHU) Varanasi for recruitments.</p>
          </div>
          <div
            className="tech-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <i className="fa-solid fa-bullhorn"></i>
            <h4>Global Brand Visibility</h4>
            <p>Get featured on international platforms and races, including the prestigious Shell Eco-marathon events.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
