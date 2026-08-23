import React, { useState, useEffect, useRef } from 'react';
import StaggeredMenu from './StaggeredMenu';

export default function Navbar({ activePage, setActivePage, theme, setTheme }) {
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewports dynamically
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 30) {
        setVisible(true);
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 120) {
        setVisible(false);
      } else if (currentScrollY < lastScrollYRef.current) {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const navItems = [
    { label: 'Home',     key: 'home' },
    { label: 'Legacy',   key: 'legacy' },
    { label: 'Vehicles', key: 'vehicles' },
    { label: 'Team',     key: 'team' },
    { label: 'Alumni',   key: 'alumni' },
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com/company/team-averera' },
    { label: 'Instagram', link: 'https://instagram.com/team_averera' },
    { label: 'Facebook', link: 'https://facebook.com/Averera' }
  ];

  if (isMobile) {
    return (
      <header className={visible ? 'nav-visible' : 'nav-hidden'} style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}>
        <StaggeredMenu
          position="right"
          logoUrl="/TEAM AVERERA logo.avif"
          items={navItems.map(item => ({
            label: item.label,
            link: `#${item.key}`,
            onClick: () => handleNavClick(item.key)
          }))}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={false}
          colors={['var(--border-color)', 'var(--accent-cyan)']}
          accentColor="var(--accent-cyan)"
          isFixed={true}
          headerContent={
            <button
              onClick={() => {
                const newTheme = theme === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                setTheme(newTheme);
                window.location.reload();
              }}
              className="navbar-icon-btn"
              aria-label="Toggle Theme"
              style={{
                width: '34px',
                height: '34px',
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <i className={theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'} />
            </button>
          }
        />
      </header>
    );
  }

  // Pure untouched Desktop Version
  return (
    <header className={visible ? 'nav-visible' : 'nav-hidden'}>
      <div className="navbar-glass">
        {/* Logo */}
        <div
          className="logo"
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img src="/TEAM AVERERA logo.avif" alt="Team Averera Logo" className="navbar-logo-img" />
        </div>

        {/* Desktop nav links */}
        <nav className="desktop-nav">
          <ul>
            {navItems.map(({ key, label }) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className={activePage === key ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick(key); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right-side controls */}
        <div className="navbar-controls">
          {/* Replay intro */}
          <button
            onClick={() => {
              sessionStorage.removeItem('hasPlayedCinematic');
              window.location.reload();
            }}
            className="navbar-icon-btn"
            aria-label="Replay Intro"
            title="Replay Intro"
          >
            <i className="fa-solid fa-rotate-left" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => {
              const newTheme = theme === 'light' ? 'dark' : 'light';
              localStorage.setItem('theme', newTheme);
              setTheme(newTheme);
              window.location.reload();
            }}
            className="navbar-icon-btn"
            aria-label="Toggle Theme"
          >
            <i className={theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'} />
          </button>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="btn btn-primary nav-cta"
            onClick={(e) => {
              e.preventDefault();
              if (activePage === 'home') {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                sessionStorage.setItem('scrollToContact', 'true');
                handleNavClick('home');
              }
            }}
          >
            Connect With Us
          </a>
        </div>
      </div>
    </header>
  );
}
