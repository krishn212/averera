import React from 'react';

export default function Footer({ setActivePage }) {
  const navLinks = [
    { label: 'Home',     key: 'home' },
    { label: 'Legacy',   key: 'legacy' },
    { label: 'Vehicles', key: 'vehicles' },
    { label: 'Team',     key: 'team' },
    { label: 'Alumni',   key: 'alumni' },
    { label: 'Sponsors', key: 'sponsors' },
  ];

  const projectLinks = [
    { label: 'SHIVAAY V1 — Urban Concept', key: 'vehicles' },
    { label: 'ALTERNO V3 — Black Panther', key: 'vehicles' },
    { label: 'Autonomous Test Vehicle',    key: 'vehicles' },
    { label: 'UC Project Proposal 2026',   href: '/documents/Project_Proposal_UC.pdf' },
    { label: 'Partnership Prospectus',     href: '/documents/PARTNERSHIP_PROSPECTUS_2026-27.pdf' },
  ];

  const handleNav = (key) => {
    if (setActivePage) setActivePage(key);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer>
      {/* Main columns */}
      <div className="footer-main">

        {/* Brand column */}
        <div className="footer-brand">
          <img
            src="/TEAM AVERERA logo.avif"
            alt="Team Averera Logo"
            className="footer-brand-logo"
          />
          <p className="footer-brand-tagline">
            IIT (BHU) Varanasi's premier automotive research team.
            Designing ultra-efficient electric vehicles and intelligent
            autonomous systems for a cleaner future.
          </p>
          <div className="footer-brand-socials">
            <a
              href="https://www.linkedin.com/company/team-averera-iit-bhu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Team Averera on LinkedIn"
            >
              <i className="fa-brands fa-linkedin" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/teamaverera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Team Averera on Instagram"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://youtube.com/@teamaverera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Team Averera on YouTube"
            >
              <i className="fa-brands fa-youtube" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Navigate column */}
        <nav aria-label="Footer navigation">
          <p className="footer-col-heading">Navigate</p>
          <ul className="footer-nav-list">
            {navLinks.map(({ label, key }) => (
              <li key={key}>
                <a
                  href={`/${key === 'home' ? '' : key}`}
                  onClick={(e) => { e.preventDefault(); handleNav(key); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Projects column */}
        <div>
          <p className="footer-col-heading">Projects</p>
          <ul className="footer-nav-list">
            {projectLinks.map(({ label, key, href }) => (
              <li key={label}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : (
                  <a
                    href={`/${key}`}
                    onClick={(e) => { e.preventDefault(); handleNav(key); }}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <address style={{ fontStyle: 'normal' }}>
          <p className="footer-col-heading">Contact</p>
          <div className="footer-contact-item">
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            <a href="mailto:averera@iitbhu.ac.in">averera@iitbhu.ac.in</a>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-phone" aria-hidden="true" />
            <a href="tel:+919007818674">(+91) 9007818674</a>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            <span>IIT (BHU) Varanasi,<br />Uttar Pradesh 221005, India</span>
          </div>
          <div className="footer-contact-item" style={{ marginTop: '12px' }}>
            <i className="fa-solid fa-file-pdf" aria-hidden="true" />
            <a
              href="/documents/PARTNERSHIP_PROSPECTUS_2026-27.pdf"
              download="PARTNERSHIP_PROSPECTUS_2026-27.pdf"
            >
              Download Partnership Prospectus
            </a>
          </div>
        </address>
      </div>

      {/* Bottom strip */}
      <div className="footer-bottom">
        <p className="footer-bottom-left">
          © {new Date().getFullYear()} Team Averera · IIT (BHU) Varanasi. All rights reserved.
        </p>
        <div className="footer-bottom-right">
          <span className="footer-achievement-stats">Shell Eco-Marathon Asia — 1st in India</span>
          <span className="footer-achievement-stats" aria-hidden="true">·</span>
          <span className="footer-achievement-stats">465.1 km/kWh Efficiency Record</span>
          <span className="footer-achievement-stats" aria-hidden="true">·</span>
          <a href="mailto:averera@iitbhu.ac.in">Partner With Us</a>
        </div>
      </div>

    </footer>
  );
}
