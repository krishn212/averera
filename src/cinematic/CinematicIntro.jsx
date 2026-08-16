import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import FrameSequence from './FrameSequence';
import './cinematic.css';

// Runway scroll container height - increased to 800vh for slow cinematic pacing
const CINEMATIC_SCROLL_HEIGHT = '800vh';

// Mappings for scroll progress phases (0.00 -> 1.00)
const SCENE_0_END = 0.14;

const TRANSITION_0_START = 0.14;
const TRANSITION_0_END = 0.19; // Scene 0 -> Logo 1 transition range

const LOGO_FRAME_START = 0.19;
const LOGO_FRAME_END = 0.34; // plays Logo 1 frames 0 -> 179

const LOGO_HOLD_END = 0.41; // logo holds stable

const TAGLINE_REVEAL_START = 0.41;
const TAGLINE_REVEAL_END = 0.48; // tagline emerges slowly

const LOGO_TAGLINE_HOLD_END = 0.50; // starts crossfade transition

const VEHICLE_START = 0.54; // plays vehicle frames 0 -> 148 over 0.54 -> 0.84
const VEHICLE_END = 0.84;

const HERO_HOLD_END = 0.90; // vehicle hero hold settling phase

const STATEMENT_REVEAL_END = 0.95; // Cinematic text statement fade-in

export default function CinematicIntro({ onComplete, onTransitionStart }) {
  /* ── Refs ─────────────────────────────────────────────────────────────── */
  const rootRef           = useRef(null);   // Runway scroll container (800vh)
  const stageRef          = useRef(null);   // Sticky stage viewport (100vh)
  const scene0Ref         = useRef(null);   // Scene 0 content block
  const logoSmallRef      = useRef(null);   // Top small logo (Scene 0)
  
  const logoCanvasWrapRef = useRef(null);   // Logo 1 frame sequence wrapper
  const logoSeqRef        = useRef(null);   // Logo 1 FrameSequence ref
  const taglineRef        = useRef(null);   // Tagline text reveal container
  
  const canvasWrapRef     = useRef(null);   // Canvas vehicle frame sequence wrapper
  const vehicleSeqRef     = useRef(null);   // Vehicle FrameSequence component ref
  const dramaticTextRef   = useRef(null);  // "BEYOND THE LIMITS OF MOTION." container
  const textSweepRef      = useRef(null);   // Thin horizontal sweep line over dramatic text
  const enterStageRef     = useRef(null);   // ENTER THE REALM CTA container
  const flashRef          = useRef(null);   // Click transition flash overlay
  const transitionGlowRef = useRef(null);   // Cinematic exposure bloom overlay
  const btnRef            = useRef(null);   // Magnetic button wrapper
  const btnTextRef        = useRef(null);   // Magnetic inner text wrapper

  /* ── State ────────────────────────────────────────────────────────────── */
  const [preloadLogoSequence, setPreloadLogoSequence] = useState(false);
  const [preloadSequence, setPreloadSequence] = useState(false);

  const scrollProgressRef = useRef({ value: 0 });
  const isTransitioningRef = useRef(false);

  /* ── Handlers ─────────────────────────────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current || !btnTextRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    
    // Relative coordinate offsets from the center of the button bounds
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // Magnetic offset on the outer button body
    gsap.to(btnRef.current, {
      x: relX * 0.35,
      y: relY * 0.35,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Subtler parallax text drift
    gsap.to(btnTextRef.current, {
      x: relX * 0.15,
      y: relY * 0.15,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current || !btnTextRef.current) return;

    // Premium elastic physics spring return to dead center
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.70,
      ease: 'elastic.out(1, 0.6)',
      overwrite: 'auto'
    });

    gsap.to(btnTextRef.current, {
      x: 0,
      y: 0,
      duration: 0.70,
      ease: 'elastic.out(1, 0.6)',
      overwrite: 'auto'
    });
  }, []);

  const handleEnter = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // Notify parent to reveal the main website underneath immediately
    onTransitionStart?.();

    const btn = btnRef.current;
    if (!btn) return;

    // Ensure scroll position of website is locked at 0 during transition
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // 1. Button compresses slightly (0.94) and glows
    tl.to(btn, { scale: 0.94, duration: 0.12, ease: 'power2.out' });
    tl.to(btn, { scale: 1.05, duration: 0.10, ease: 'power2.in' }, '+=0.02');

    // 2. Volumetric radial light expands from button center (50% 88%)
    if (flashRef.current) {
      gsap.set(flashRef.current, { opacity: 0 });
      const proxy = { radius: 0, opacity: 0 };
      tl.to(proxy, {
        radius: 100,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (flashRef.current) {
            flashRef.current.style.background =
              `radial-gradient(circle at 50% 88%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) ${proxy.radius * 0.4}%, rgba(2,17,36,0) ${proxy.radius}%)`;
            flashRef.current.style.opacity = String(proxy.opacity);
          }
        }
      }, 0.08);
    }

    // 3. Cinematic wrapper dissolves as the light expands
    tl.to(stageRef.current, { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0.55);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    gsap.killTweensOf('*');
    document.body.style.overflow = '';

    gsap.to(stageRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete?.();
      }
    });
  }, [onComplete]);

  /* ── Core Scroll Update Mapping (0.00 -> 1.00) ────────────────────────── */
  const updateCinematic = useCallback((progress) => {
    // ── 1. SCENE 0: 0.00 -> 0.14 ──
    if (progress <= SCENE_0_END) {
      const scene0Opacity = 1 - (progress / SCENE_0_END);
      gsap.set(scene0Ref.current, { opacity: scene0Opacity, y: -20 * (progress / SCENE_0_END) });
      gsap.set(logoSmallRef.current, { opacity: scene0Opacity, y: -15 * (progress / SCENE_0_END) });
    } else {
      gsap.set(scene0Ref.current, { opacity: 0 });
      gsap.set(logoSmallRef.current, { opacity: 0 });
    }

    // ── 2. SCENE 0 → LOGO 1 ATMOSPHERIC TRANSITION: 0.14 -> 0.19 ──
    if (progress >= TRANSITION_0_START && progress <= TRANSITION_0_END) {
      const tRatio = (progress - TRANSITION_0_START) / (TRANSITION_0_END - TRANSITION_0_START);
      // Bell curve light movement
      const lightOpacity = 0.45 * Math.sin(tRatio * Math.PI);
      gsap.set(transitionGlowRef.current, { opacity: lightOpacity });
    }

    // ── 3. LOGO 1 FRAME REVEAL & HOLDS: 0.14 -> 0.56 ──
    if (progress >= 0.14 && progress <= 0.56) {
      let logoCanvasOpacity = 0;
      
      // Emerges only near the end of the transition (0.17 -> 0.19)
      if (progress < LOGO_FRAME_START) {
        if (progress >= 0.17) {
          logoCanvasOpacity = (progress - 0.17) / 0.02;
        } else {
          logoCanvasOpacity = 0;
        }
      } 
      // Fully visible during show and hold phases (0.19 -> 0.50)
      else if (progress <= LOGO_TAGLINE_HOLD_END) {
        logoCanvasOpacity = 1;
      } 
      // Crossfade fade-out into vehicle (0.50 -> 0.56)
      else {
        logoCanvasOpacity = 1 - (progress - LOGO_TAGLINE_HOLD_END) / (0.56 - LOGO_TAGLINE_HOLD_END);
      }

      gsap.set(logoCanvasWrapRef.current, { opacity: logoCanvasOpacity });

      // Frame mapping for Logo 1 (0 -> 179)
      if (progress <= LOGO_FRAME_END) {
        const logoProgress = (progress - LOGO_FRAME_START) / (LOGO_FRAME_END - LOGO_FRAME_START);
        const clampedLogo = Math.max(0, Math.min(1, logoProgress));
        const logoFrameIndex = Math.floor(clampedLogo * 179);
        logoSeqRef.current?.setFrame(logoFrameIndex);
      } else {
        // Hold final frame 179
        logoSeqRef.current?.setFrame(179);

        // Subtle studio-light breathing during holds (0.34 -> 0.50)
        if (progress <= LOGO_TAGLINE_HOLD_END) {
          const breath = 0.05 * Math.sin((progress - LOGO_FRAME_END) * 15 * Math.PI);
          gsap.set(logoCanvasWrapRef.current, { filter: `brightness(${1.0 + breath})` });
        } else {
          gsap.set(logoCanvasWrapRef.current, { filter: 'none' });
        }
      }
    } else {
      gsap.set(logoCanvasWrapRef.current, { opacity: 0 });
    }

    // ── 4. TAGLINE REVEAL: 0.41 -> 0.56 ──
    if (progress >= TAGLINE_REVEAL_START && progress <= 0.56) {
      let taglineOpacity = 0;
      let taglineY = 20;
      let taglineBlur = 4;

      if (progress < TAGLINE_REVEAL_END) {
        // Slow elegant emergence (0.41 -> 0.48)
        const ratio = (progress - TAGLINE_REVEAL_START) / (TAGLINE_REVEAL_END - TAGLINE_REVEAL_START);
        taglineOpacity = ratio;
        taglineY = 20 * (1 - ratio);
        taglineBlur = 4 * (1 - ratio);
      } else if (progress <= LOGO_TAGLINE_HOLD_END) {
        // Hold (0.48 -> 0.50)
        taglineOpacity = 1;
        taglineY = 0;
        taglineBlur = 0;
      } else {
        // Crossfade fade-out into vehicle (0.50 -> 0.56)
        const ratio = (progress - LOGO_TAGLINE_HOLD_END) / (0.56 - LOGO_TAGLINE_HOLD_END);
        taglineOpacity = 1 - ratio;
        taglineY = -12 * ratio;
        taglineBlur = 4 * ratio;
      }

      gsap.set(taglineRef.current, { 
        opacity: taglineOpacity, 
        y: taglineY,
        filter: `blur(${taglineBlur}px)`
      });
    } else {
      gsap.set(taglineRef.current, { opacity: 0 });
    }

    // ── 5. VEHICLE FRAMES SEQUENCE: 0.50 -> 1.00 ──
    if (progress >= 0.50) {
      let canvasOpacity = 0;
      
      // Crossfade fade-in from logo (0.50 -> 0.56)
      if (progress < 0.56) {
        canvasOpacity = (progress - 0.50) / 0.06;
      } else {
        canvasOpacity = 1;
      }

      gsap.set(canvasWrapRef.current, { opacity: canvasOpacity });

      // Frame mapping
      if (progress <= VEHICLE_END) {
        const vehicleProgress = (progress - VEHICLE_START) / (VEHICLE_END - VEHICLE_START);
        const clampedProgress = Math.max(0, Math.min(1, vehicleProgress));
        const frameIndex = Math.floor(clampedProgress * 148);
        vehicleSeqRef.current?.setFrame(frameIndex);
        
        gsap.set(canvasWrapRef.current, { scale: 1.0, filter: 'none' });
        gsap.set(".cin-video-vignette", { background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0, 2, 10, 0.28) 100%)' });
      } else {
        // Hold final frame 148
        vehicleSeqRef.current?.setFrame(148);

        // Settle & Hero hold phase (0.84 -> 0.90) and beyond
        const holdProgress = (progress - VEHICLE_END) / (1.0 - VEHICLE_END);
        const clampedHold = Math.max(0, Math.min(1, holdProgress));
        
        gsap.set(canvasWrapRef.current, { 
          scale: 1.0 + 0.015 * clampedHold, // extremely slow visual breathing scale
          filter: `brightness(${1.0 + 0.10 * clampedHold})` 
        });
        
        const vignetteShadow = 0.28 + 0.18 * clampedHold;
        gsap.set(".cin-video-vignette", { 
          background: `radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(0, 1, 5, ${vignetteShadow}) 100%)` 
        });
      }
    } else {
      gsap.set(canvasWrapRef.current, { opacity: 0 });
    }

    // ── 6. SMOOTH CROSSFADE LENS BLOOM TRANSITION: 0.50 -> 0.56 ──
    if (progress >= 0.50 && progress <= 0.56) {
      const tRatio = (progress - 0.50) / 0.06;
      const t = Math.sin(tRatio * Math.PI); // bell curve peaking at 0.53
      
      gsap.set(transitionGlowRef.current, { opacity: 0.88 * t });
      gsap.set(logoCanvasWrapRef.current, { filter: `brightness(${1.0 + 0.4 * t}) blur(${4 * t}px)` });
      gsap.set(canvasWrapRef.current, { filter: `brightness(${1.0 + 0.4 * t}) blur(${4 * t}px)` });
    } else if (progress > 0.56) {
      // Clear filters once transition resolves
      gsap.set(transitionGlowRef.current, { opacity: 0 });
    }

    // ── 7. DRAMATIC CINEMATIC STATEMENT: 0.90 -> 1.00 ──
    if (progress >= 0.90) {
      let textOpacity = 0;
      let textScale = 0.98;
      let textSpacing = '0.22em';
      let textBlur = 10;
      let textY = 12;

      if (progress < STATEMENT_REVEAL_END) {
        // Elegant fade-in (0.90 -> 0.95)
        const ratio = (progress - HERO_HOLD_END) / (STATEMENT_REVEAL_END - HERO_HOLD_END);
        textOpacity = ratio;
        textScale = 0.98 + 0.02 * ratio;
        textSpacing = `${0.22 + 0.04 * ratio}em`;
        textBlur = 10 * (1 - ratio);
        textY = 12 * (1 - ratio);

        if (textSweepRef.current) {
          gsap.set(textSweepRef.current, { left: `${ratio * 100}%`, opacity: Math.sin(ratio * Math.PI) });
        }
      } else {
        // Subtly recedes upward to make space for CTA (0.95 -> 1.00)
        const ratio = (progress - STATEMENT_REVEAL_END) / (1.0 - STATEMENT_REVEAL_END);
        textOpacity = 1.0 - 0.45 * ratio; 
        textScale = 1.0 - 0.04 * ratio;  
        textSpacing = '0.26em';
        textBlur = 0;
        textY = -14 * ratio;              

        if (textSweepRef.current) {
          gsap.set(textSweepRef.current, { opacity: 0 });
        }
      }

      gsap.set(dramaticTextRef.current, { 
        opacity: textOpacity, 
        scale: textScale,
        y: textY,
        letterSpacing: textSpacing,
        filter: `blur(${textBlur}px)`
      });
    } else {
      gsap.set(dramaticTextRef.current, { opacity: 0 });
    }

    // ── 8. HEAVY CTA GATEWAY: 0.95 -> 1.00 ──
    if (progress >= 0.95) {
      const ctaProgress = (progress - 0.95) / 0.05;
      const ctaOpacity = Math.max(0, Math.min(1, ctaProgress));
      const ctaScale = 0.92 + 0.08 * ctaOpacity;
      const ctaY = 15 * (1 - ctaOpacity);
      
      gsap.set(enterStageRef.current, { opacity: ctaOpacity, y: ctaY, scale: ctaScale });
      
      const borderGlow = document.querySelector('.cin-heavy-gateway-btn');
      if (borderGlow) {
        borderGlow.style.setProperty('--border-glow-opacity', String(ctaOpacity));
      }
    } else {
      gsap.set(enterStageRef.current, { opacity: 0 });
    }
  }, []);

  /* ── Lifecycle & Scroll Event Listener ────────────────────────────────── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.();
      return;
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'scroll';
    window.scrollTo(0, 0);

    // Scene 0 entrance
    const entryTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
    entryTl
      .fromTo(logoSmallRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.65 })
      .fromTo(".cin-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.50 }, "-=0.30")
      .fromTo(".cin-title", { opacity: 0, y: 16, letterSpacing: '0.04em' }, { opacity: 1, y: 0, letterSpacing: '0.20em', duration: 0.90 }, "-=0.40")
      .fromTo(".cin-divider", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.55, ease: 'expo.inOut' }, "-=0.50")
      .fromTo(".cin-tagline", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25");

    const handleScroll = () => {
      if (isTransitioningRef.current || !rootRef.current) return;

      const totalScrollHeight = rootRef.current.scrollHeight - window.innerHeight;
      const target = totalScrollHeight > 0 ? window.scrollY / totalScrollHeight : 0;

      if (target > 0.05) {
        setPreloadLogoSequence(true);
      }
      
      if (target > 0.38) {
        setPreloadSequence(true);
      }

      gsap.to(scrollProgressRef.current, {
        value: target,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: () => {
          updateCinematic(scrollProgressRef.current.value);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCinematic(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      gsap.killTweensOf(scrollProgressRef.current);
    };
  }, [onComplete, updateCinematic]);

  /* ── Keyboard bindings ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const enterStage = enterStageRef.current;
        if (enterStage && parseFloat(getComputedStyle(enterStage).opacity) > 0.5) {
          e.preventDefault();
          handleEnter();
        }
      }
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter, handleSkip]);

  return (
    <div ref={rootRef} className="cin-root" style={{ height: CINEMATIC_SCROLL_HEIGHT }} aria-label="AVERERA cinematic intro">
      <div ref={stageRef} className="cin-stage">
        
        <div className="cin-bg" aria-hidden="true" />

        {/* Scene 0 Small Logo */}
        <div ref={logoSmallRef} className="cin-logo">
          <img
            src="/TEAM AVERERA logo.avif"
            alt="Team AVERERA logo"
            width="240"
            height="auto"
            decoding="async"
          />
        </div>

        {/* Scene 0 Center Composition */}
        <div ref={scene0Ref} className="cin-center-block">
          <span className="cin-eyebrow">IIT (BHU) Varanasi</span>
          <h1 className="cin-title">AVERERA</h1>
          <div className="cin-divider" aria-hidden="true" />
          <p className="cin-tagline">Engineering the future of sustainable mobility</p>
        </div>

        {/* Full-Screen Logo 1 WebP Reveal sequence wrapper */}
        <div ref={logoCanvasWrapRef} className="cin-logo-canvas-wrap" aria-hidden="true">
          <FrameSequence
            ref={logoSeqRef}
            folderPath="/assets/logo_1_reveal_webp"
            fileNamePrefix="frame_"
            totalFrames={180}
            fileExtension="webp"
            scaleFactor={1.0}
            preload={preloadLogoSequence}
          />
        </div>

        {/* HTML/CSS Tagline text reveal (under Logo 1) */}
        <div ref={taglineRef} className="cin-logo-tagline-wrap" aria-hidden="true">
          <p className="cin-tagline-reveal-heavy">
            DRIVEN BY INNOVATION, CRAFTED WITH PRECISION
          </p>
        </div>

        {/* Full-Screen Vehicle sequence wrapper */}
        <div ref={canvasWrapRef} className="cin-vehicle-wrap" aria-hidden="true">
          <FrameSequence
            ref={vehicleSeqRef}
            folderPath="/assets/vehicle_360_webp"
            fileNamePrefix="frame_"
            totalFrames={149}
            fileExtension="webp"
            scaleFactor={1.0}
            preload={preloadSequence}
          />
          <div className="cin-video-vignette" aria-hidden="true" />
        </div>

        {/* Cinematic volumetric exposure flash / bloom overlay */}
        <div ref={transitionGlowRef} className="cin-transition-glow" aria-hidden="true" />

        {/* Dramatic Cinematic Text card (positioned above the CTA) */}
        <div ref={dramaticTextRef} className="cin-dramatic-text-container" aria-hidden="true">
          <div className="cin-dramatic-text-box">
            <h2 className="cin-dramatic-text">BEYOND THE LIMITS OF MOTION.</h2>
            <div ref={textSweepRef} className="cin-dramatic-text-sweep" />
          </div>
          <div className="cin-dramatic-sub-line-wrap">
            <div className="cin-dramatic-sub-line">ENGINEERED AT IIT (BHU), VARANASI</div>
          </div>
        </div>

        {/* Premium Heavy Gateway ENTER THE REALM CTA */}
        <div ref={enterStageRef} className="cin-enter-stage">
          <button
            ref={btnRef}
            className="cin-heavy-gateway-btn"
            onClick={handleEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            type="button"
            aria-label="Enter the Realm"
          >
            <span className="cin-btn-led-dot" aria-hidden="true" />
            <span className="cin-btn-glow-border" aria-hidden="true" />
            <span className="cin-btn-inner-glint" aria-hidden="true" />
            <span ref={btnTextRef} className="cin-heavy-btn-text">ENTER THE REALM</span>
          </button>
        </div>

        {/* Radial light flash screen overlay */}
        <div ref={flashRef} className="cin-gateway-flash" aria-hidden="true" />

        {/* Skip button */}
        <button
          className="cin-skip"
          onClick={handleSkip}
          type="button"
          aria-label="Skip intro"
        >
          SKIP INTRO
        </button>

      </div>
    </div>
  );
}
