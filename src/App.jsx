import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Timeline from './pages/Timeline';
import Sponsors from './pages/Sponsors';
import AboutUs from './pages/AboutUs';
import Team from './pages/Team';
import Alumni from './pages/Alumni';
import SideRays from './components/SideRays';
import wireframeImg from './assets/wireframe_car.png';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App({ introDone }) {
  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname;
    if (path === '/team') return 'team';
    if (path === '/alumni') return 'alumni';
    if (path === '/legacy' || path === '/timeline') return 'legacy';
    if (path === '/' || path === '') return 'home';
    const savedPage = localStorage.getItem('activePage');
    return savedPage || 'home';
  });

  const initialTargetPage = useRef(activePage);
  const wasInitiallyBehindIntro = useRef(!introDone);

  useEffect(() => {
    if (introDone && wasInitiallyBehindIntro.current) {
      setActivePage(initialTargetPage.current);
      const targetPath = initialTargetPage.current === 'home' ? '/' : `/${initialTargetPage.current}`;
      window.history.pushState(null, '', targetPath);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [introDone]);

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
    
    // Sync browser URL paths
    const path = activePage === 'home' ? '/' : `/${activePage}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    
    // When navigating to legacy (Legacy), trigger a single-pass window reload
    if (activePage === 'legacy') {
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

    const shouldScroll = sessionStorage.getItem('scrollToContact');
    if (shouldScroll === 'true') {
      let attempts = 0;
      const interval = setInterval(() => {
        const contact = document.getElementById('contact');
        attempts++;
        if (contact) {
          contact.scrollIntoView({ behavior: 'instant' });
          sessionStorage.removeItem('scrollToContact');
          clearInterval(interval);
          ScrollTrigger.refresh();
        } else if (attempts > 30) {
          sessionStorage.removeItem('scrollToContact');
          clearInterval(interval);
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activePage]);

  // Support browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/team') setActivePage('team');
      else if (path === '/alumni') setActivePage('alumni');
      else if (path === '/vehicles') setActivePage('vehicles');
      else if (path === '/timeline') setActivePage('timeline');
      else if (path === '/sponsors') setActivePage('sponsors');
      else if (path === '/about') setActivePage('about');
      else setActivePage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      case 'legacy':
        return <Timeline />;
      case 'sponsors':
        return <Sponsors setActivePage={setActivePage} />;
      case 'team':
        return <Team setActivePage={setActivePage} />;
      case 'alumni':
        return <Alumni setActivePage={setActivePage} />;
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
