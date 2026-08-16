import { StrictMode, useState, useEffect } from 'react';
import { createRoot }           from 'react-dom/client';
import './index.css';
import App              from './App.jsx';
import CinematicIntro   from './cinematic/CinematicIntro.jsx';
import { gsap }         from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * AppRoot — wraps cinematic intro above the existing App.
 *
 * The cinematic intro fades out in-place (no page reload).
 * The main <App /> is mounted underneath the intro from the start,
 * so it is ready to display instantly when the intro completes.
 */
export default function AppRoot() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [done, setDone] = useState(() => {
    if (prefersReduced) return true;
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hasPlayedCinematic') === 'true';
    }
    return false;
  });

  const [transitioning, setTransitioning] = useState(false);

  const handleDone = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasPlayedCinematic', 'true');
    }
    setDone(true);
    setTransitioning(false);
  };

  useEffect(() => {
    if (done) {
      document.body.style.overflow = '';
      const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 900);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [done]);

  return (
    <>
      {/* Cinematic — outside StrictMode to avoid GSAP double-mount issues */}
      {!done && (
        <CinematicIntro 
          onComplete={handleDone} 
          onTransitionStart={() => setTransitioning(true)}
        />
      )}

      {/* Main website — hidden but mounted during intro, revealed immediately after */}
      <div className={done ? 'app-revealed' : (transitioning ? 'app-revealing' : 'app-behind-intro')}>
        <StrictMode>
          <App introDone={done} />
        </StrictMode>
      </div>
    </>
  );
}

let root = window.__reactRoot;
if (!root) {
  root = createRoot(document.getElementById('root'));
  window.__reactRoot = root;
}
root.render(<AppRoot />);
