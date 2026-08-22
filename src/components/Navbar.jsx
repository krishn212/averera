import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Navbar({ activePage, setActivePage, theme, setTheme }) {
  const [navActive, setNavActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const handleNavClick = (page) => {
    setActivePage(page);
    setNavActive(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileNav = (e) => {
    e.stopPropagation();
    setNavActive(!navActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;
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
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={visible ? 'nav-visible' : 'nav-hidden'}>
      <div className="navbar-glass">
        <div className="logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src="/TEAM AVERERA logo.avif" alt="Team Averera Logo" className="navbar-logo-img" />
        </div>
        <nav className={navActive ? 'active' : ''}>
          <ul>
            <li>
              <a
                href="#home"
                className={activePage === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#legacy"
                className={activePage === 'legacy' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('legacy');
                }}
              >
                Legacy
              </a>
            </li>
            <li>
              <a
                href="#vehicles"
                className={activePage === 'vehicles' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('vehicles');
                }}
              >
                Vehicles
              </a>
            </li>
            <li>
              <a
                href="#team"
                className={activePage === 'team' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('team');
                }}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#alumni"
                className={activePage === 'alumni' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('alumni');
                }}
              >
                Alumni
              </a>
            </li>
            <li className="mobile-cta-li">
              <a
                href="#contact"
                className="btn btn-primary"
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
            </li>
          </ul>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              sessionStorage.removeItem('hasPlayedCinematic');
              window.location.reload();
            }}
            className="theme-toggle-btn"
            aria-label="Replay Intro"
            title="Replay Intro"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              fontSize: '1.05rem',
            }}
          >
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button
            onClick={() => {
              const newTheme = theme === 'light' ? 'dark' : 'light';
              localStorage.setItem('theme', newTheme);
              setTheme(newTheme);
              window.location.reload();
            }}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              fontSize: '1.05rem',
            }}
          >
            <i className={theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
          </button>
          
          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-hamburger"
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              cursor: 'pointer',
              display: 'none', // Managed via @media media query
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              fontSize: '1.2rem',
              zIndex: 10001,
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className="nav-cta">
            <a
              href="#contact"
              className="btn btn-primary"
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
      </div>

      {/* Premium Full-Screen Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li className="mobile-nav-item">
            <a
              href="#home"
              className={`mobile-nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              Home
            </a>
          </li>

          <li className="mobile-nav-item">
              <a
                href="#legacy"
                className={`mobile-nav-link ${activePage === 'legacy' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('legacy');
                }}
            >
              Legacy
            </a>
          </li>
          <li className="mobile-nav-item">
            <a
              href="#vehicles"
              className={`mobile-nav-link ${activePage === 'vehicles' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('vehicles');
              }}
            >
              Vehicles
            </a>
          </li>
          <li className="mobile-nav-item">
            <a
              href="#team"
              className={`mobile-nav-link ${activePage === 'team' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('team');
              }}
            >
              Team
            </a>
          </li>
          <li className="mobile-nav-item">
            <a
              href="#alumni"
              className={`mobile-nav-link ${activePage === 'alumni' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('alumni');
              }}
            >
              Alumni
            </a>
          </li>
          <li className="mobile-nav-item" style={{ marginTop: '20px' }}>
            <a
              href="#contact"
              className="btn btn-primary"
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
          </li>
        </ul>
      </div>

      {/* Responsive Styles for Mobile Overlay */}
      <style>{`
        /* Hide mobile overlay by default on desktop */
        .mobile-nav-overlay {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-mobile-hamburger {
            display: flex !important;
          }
          nav {
            display: none !important;
          }
          .nav-cta {
            display: none !important;
          }
          .navbar-glass {
            padding: 10px 18px !important;
          }
          
          /* Full screen premium drawer overlay */
          .mobile-nav-overlay {
            display: flex;
            position: fixed;
            inset: 0;
            background: rgba(4, 16, 18, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          }

          .mobile-nav-overlay.open {
            opacity: 1;
            pointer-events: auto;
          }

          .mobile-nav-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
          }

          .mobile-nav-item {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            text-align: center;
          }

          .mobile-nav-overlay.open .mobile-nav-item {
            opacity: 1;
            transform: translateY(0);
          }

          /* Staggered load delays */
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(1) { transition-delay: 0.08s; }
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(2) { transition-delay: 0.14s; }
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(3) { transition-delay: 0.2s; }
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(4) { transition-delay: 0.26s; }
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(5) { transition-delay: 0.32s; }
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(6) { transition-delay: 0.38s; }
          .mobile-nav-overlay.open .mobile-nav-item:nth-child(7) { transition-delay: 0.44s; }

          .mobile-nav-link {
            font-family: var(--font-title);
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            color: #ffffff;
            text-decoration: none;
            text-transform: uppercase;
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
            padding: 5px 15px;
          }

          .mobile-nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #10B981 0%, #1AFFFF 100%);
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }

          .mobile-nav-link:hover,
          .mobile-nav-link.active {
            color: #1AFFFF;
            transform: scale(1.05);
          }

          .mobile-nav-link:hover::after,
          .mobile-nav-link.active::after {
            width: 80%;
          }

          /* General mobile layout overrides for clean responsiveness */
          h1 {
            font-size: 2.2rem !important;
            line-height: 1.2 !important;
          }
          h2 {
            font-size: 1.8rem !important;
            line-height: 1.25 !important;
          }
          h3 {
            font-size: 1.4rem !important;
          }
          
          section, 
          .hero-section, 
          .about-section, 
          .vehicles-section, 
          .tech-section, 
          .sponsors-section, 
          .contact-section {
            padding-top: 50px !important;
            padding-bottom: 50px !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
          }

          .hero-section {
            padding-top: 120px !important;
          }

          .stat-card, 
          .about-card, 
          .vehicle-card, 
          .tech-card, 
          .pricing-card, 
          .contact-card-glass, 
          .simulator-card-glass {
            padding: 24px 16px !important;
            margin-bottom: 15px !important;
            width: 100% !important;
          }

          .sponsor-logo-card {
            width: 110px !important;
            height: 70px !important;
            padding: 6px !important;
          }

          .about-grid, 
          .tech-grid, 
          .vehicles-grid, 
          .stats-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
          }

          /* Stack vehicle details vertically on mobile and keep image on top */
          .vehicle-detail-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
          }
          .vehicle-gallery {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            order: 1 !important;
            margin-bottom: 10px !important;
          }
          .vehicle-specs {
            width: 100% !important;
            order: 2 !important;
          }
          .image-glass-container {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            aspect-ratio: 16/9 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 auto !important;
          }
          .hero-car-img {
            width: 100% !important;
            height: auto !important;
            max-height: 180px !important;
            object-fit: contain !important;
          }

          body {
            overflow-x: hidden !important;
          }
          
          .container {
            width: 100% !important;
            padding-left: 15px !important;
            padding-right: 15px !important;
            overflow-x: hidden !important;
          }
        }

        /* Prevent sticky vehicle stage from locking and overlapping content on mobile/tablet widths */
        @media (max-width: 992px) {
          .pinned-vehicles-container {
            flex-direction: column !important;
          }
          .pinned-vehicle-stage {
            position: relative !important;
            top: 0 !important;
            min-height: auto !important;
            margin-bottom: 20px !important;
            padding: 20px 10px !important;
            width: 100% !important;
          }
          .pinned-vehicle-img {
            max-height: 240px !important;
          }
        }
      `}</style>
    </header>
  );
}
