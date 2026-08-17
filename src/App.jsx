import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Timeline from './pages/Timeline';
import Sponsors from './pages/Sponsors';
import AboutUs from './pages/AboutUs';
import SideRays from './components/SideRays';
import wireframeImg from './assets/wireframe_car.png';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App({ introDone }) {
  const [activePage, setActivePage] = useState(() => {
    const savedPage = localStorage.getItem('activePage');
    return savedPage || 'home';
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light'; // Default to light mode (Averera Day mode styling)
  });

  // Force scroll restoration to top on page reloads/refreshes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    resetScroll();

    const timer1 = setTimeout(resetScroll, 10);
    const timer2 = setTimeout(resetScroll, 50);
    const timer3 = setTimeout(resetScroll, 100);

    window.addEventListener('beforeunload', resetScroll);
    window.addEventListener('unload', resetScroll);
    window.addEventListener('load', resetScroll);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('beforeunload', resetScroll);
      window.removeEventListener('unload', resetScroll);
      window.removeEventListener('load', resetScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
    
    // When navigating to timeline (Legacy), trigger a single-pass window reload
    if (activePage === 'timeline') {
      const hasReloaded = sessionStorage.getItem('legacyReloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('legacyReloaded', 'true');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        window.location.reload();
        return;
      }
    } else {
      sessionStorage.removeItem('legacyReloaded');
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Let DOM settle and images load, then refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.getElementById('scroll-progress-bar');
      if (!progressBar) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} introDone={introDone} />;
      case 'about':
        return <AboutUs />;
      case 'vehicles':
        return <Vehicles setActivePage={setActivePage} />;
      case 'timeline':
        return <Timeline />;
      case 'sponsors':
        return <Sponsors />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Scroll Progress Bar */}
      <div id="scroll-progress-bar"></div>

      {/* Fixed Background for the website using wireframe car */}
      <div className="page-bg-fixed">
        {activePage === 'home' && (
          <>
            <img src={wireframeImg} alt="Futuristic Eco-Friendly Racing Car Blueprint" className="page-bg-img" />
            <div className="blueprint-tracer-line"></div>
          </>
        )}
      </div>
      <div className="page-bg-overlay-fixed"></div>

      {/* WebGL SideRays Background Animation */}
      <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: -2, pointerEvents: 'none' }}>
        <SideRays
          speed={1.5}
          rayColor1="#18D0DB"
          rayColor2={theme === 'light' ? '#0a8a96' : '#7c3aed'}
          intensity={theme === 'light' ? 1.4 : 1.8}
          spread={2.0}
          origin="top-left"
          tilt={-5}
          saturation={1.5}
          blend={0.7}
          falloff={1.5}
          opacity={theme === 'light' ? 0.35 : 0.45}
        />
      </div>

      {/* Navigation Header */}
      <Navbar activePage={activePage} setActivePage={setActivePage} theme={theme} setTheme={setTheme} />

      {/* Active Page View */}
      {renderActivePage()}

      {/* Footer */}
      <Footer />
    </div>
  );
}
