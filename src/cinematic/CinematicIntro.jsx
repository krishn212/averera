import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './cinematic.css';

export default function CinematicIntro({ onComplete, onTransitionStart }) {
  /* ── State ────────────────────────────────────────────────────────────── */
  const [step, setStep] = useState('logo-video'); // 'logo-video', 'vehicle-video', 'climax'
  const [taglineActive, setTaglineActive] = useState(false);
  const [preloadVehicle, setPreloadVehicle] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  /* ── Refs ─────────────────────────────────────────────────────────────── */
  const stageRef = useRef(null);
  const logoVideoRef = useRef(null);
  const vehicleVideoRef = useRef(null);

  const logoContainerRef = useRef(null);
  const taglineRef = useRef(null);
  const taglineLineRef = useRef(null);
  const taglinePrimaryRef = useRef(null);
  const taglineSecondaryRef = useRef(null);

  const vehicleContainerRef = useRef(null);

  // Brand Mark Refs
  const brandGroupRef = useRef(null);
  const brandLineRef = useRef(null);
  const brandTeamRef = useRef(null);
  const brandNameRef = useRef(null);
  const tricolorLineRef = useRef(null);

  // Statement Refs
  const statementPrimaryRef = useRef(null);
  const statementSecondaryRef = useRef(null);
  const statementSweepRef = useRef(null);
  const techDetailsRef = useRef(null);

  // CTA Refs
  const enterStageRef = useRef(null);
  const enterLineRef = useRef(null);
  const btnBorderRef = useRef(null);
  const btnGlintRef = useRef(null);
  const flashRef = useRef(null);

  const btnRef = useRef(null);
  const btnTextRef = useRef(null);
  const skipBtnRef = useRef(null);

  const isTransitioningRef = useRef(false);
  const timelineRef = useRef(null);

  /* ── Initial Configuration & Autoplay Fallback ────────────────────────── */
  useEffect(() => {
    // Lock page scrolling
    document.body.style.overflow = 'hidden';

    // Start logo video
    const logoVideo = logoVideoRef.current;
    if (logoVideo) {
      logoVideo.muted = true;
      logoVideo.playbackRate = 1.5;
      logoVideo.play().catch(e => console.error("Muted playback failed", e));
    }

    return () => {
      document.body.style.overflow = '';
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  // Monitor logo video time to trigger tagline mid-way
  const handleLogoTimeUpdate = () => {
    const video = logoVideoRef.current;
    if (!video) return;

    // Trigger tagline when logo is sufficiently established (e.g. at 3.6 seconds)
    if (video.currentTime >= 3.6 && !taglineActive) {
      setTaglineActive(true);

      // Tagline resolves elegantly at the bottom center of viewport
      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 15, filter: 'blur(8px)', letterSpacing: '0.42em' },
        { opacity: 0.75, y: 0, filter: 'blur(0px)', letterSpacing: '0.35em', duration: 1.6, ease: 'power4.out' }
      );
    }
  };

  const handleLogoPlay = () => {
    // Preload vehicle video in background once logo starts playing
    setPreloadVehicle(true);
  };

  const handleLogoEnded = () => {
    // 0.4s atmospheric darkening transition
    const tl = gsap.timeline({
      onComplete: () => {
        setStep('vehicle-video');
        const vehicleVideo = vehicleVideoRef.current;
        if (vehicleVideo) {
          vehicleVideo.muted = isMuted;
          vehicleVideo.playbackRate = 1.5;
          vehicleVideo.play().catch((err) => {
            console.warn("Vehicle video autoplay blocked. Retrying muted.", err);
            vehicleVideo.muted = true;
            setIsMuted(true);
            vehicleVideo.playbackRate = 1.5;
            vehicleVideo.play().catch(e => console.error("Vehicle playback failed", e));
          });
        }
      }
    });

    tl.to(logoContainerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    });
  };

  const handleVehicleEnded = () => {
    setStep('climax');

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Phase 1: Silence / Visual breathing room (1.2s Hold final vehicle frame)
    // Plus cinematic camera push-in (very slow scale)
    gsap.fromTo(vehicleContainerRef.current,
      { scale: 1 },
      { scale: 1.03, duration: 4.8, ease: 'power1.out' }
    );

    tl.set({}, {}, "+=0.15");

    // Phase 2: Brand marker reveal (1.0s - 2.0s)
    tl.add(() => {
      const brandTl = gsap.timeline();

      // Vertical line appears
      brandTl.fromTo(brandLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.25, ease: 'power3.out' }
      );

      // TEAM marker fades in
      brandTl.fromTo(brandTeamRef.current,
        { opacity: 0, y: 5, letterSpacing: '0.55em' },
        { opacity: 0.5, y: 0, letterSpacing: '0.45em', duration: 0.25, ease: 'power3.out' },
        '-=0.15'
      );

      // AVERERA resolves with horizontal mask
      brandTl.fromTo(brandNameRef.current,
        { opacity: 0, clipPath: 'polygon(0 0, 0 100%, 0 100%, 0 0)', letterSpacing: '0.36em' },
        { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', letterSpacing: '0.28em', duration: 0.35, ease: 'power3.out' },
        '-=0.2'
      );

      // Tricolor line draws from left to right
      brandTl.fromTo(tricolorLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.3, ease: 'power2.out' },
        '-=0.15'
      );
    });

    // Phase 3: Statement Line 1 resolves (1.6s - 2.8s)
    tl.fromTo(statementPrimaryRef.current,
      { opacity: 0, clipPath: 'polygon(0 0, 0 100%, 0 100%, 0 0)', filter: 'blur(6px)', letterSpacing: '0.22em' },
      { opacity: 0.95, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', filter: 'blur(0px)', letterSpacing: '0.14em', duration: 0.55, ease: 'power3.out' },
      '+=0.1'
    );

    // Horizontal sweep behind statement
    tl.fromTo(statementSweepRef.current,
      { left: '-100%', opacity: 0 },
      { left: '100%', opacity: 0.16, duration: 0.4, ease: 'power2.inOut' },
      '-=0.45'
    );

    // Phase 4: Statement Line 2 resolves (2.1s - 3.2s)
    tl.fromTo(statementSecondaryRef.current,
      { opacity: 0, y: 10, filter: 'blur(6px)', letterSpacing: '0.18em' },
      { opacity: 0.75, y: 0, filter: 'blur(0px)', letterSpacing: '0.12em', duration: 0.5, ease: 'power3.out' },
      '-=0.35'
    );

    // Fade in small technical details
    tl.fromTo(techDetailsRef.current,
      { opacity: 0 },
      { opacity: 0.35, duration: 0.35, ease: 'power2.out' },
      '-=0.25'
    );

    // Phase 5: Delay -> Vignette darkens -> Horizontal line draws -> CTA draws/reveals (2.8s - 4.0s)
    tl.set({}, {}, "+=0.05");

    tl.to('.cin-video-vignette', {
      background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.8) 100%)',
      duration: 0.25,
      ease: 'power2.out'
    });

    tl.fromTo(enterLineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.4, duration: 0.2, ease: 'power2.inOut' }
    );

    tl.add(() => {
      // Dissolve expander line
      gsap.to(enterLineRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out'
      });

      // Animate pill button frame and glass panel
      gsap.fromTo(enterStageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 }
      );

      gsap.fromTo(btnRef.current,
        { opacity: 0, scaleX: 0.7, filter: 'blur(8px)' },
        {
          opacity: 1,
          scaleX: 1,
          filter: 'blur(0px)',
          duration: 0.35,
          ease: 'power3.out',
          onComplete: () => {
            // Trigger a single glint sweep on entry completion
            if (btnGlintRef.current) {
              gsap.fromTo(btnGlintRef.current,
                { left: '-150%' },
                { left: '150%', duration: 1.0, ease: 'power2.inOut' }
              );
            }
          }
        }
      );

      gsap.fromTo(btnBorderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    });
  };

  /* ── Interactive CTA Handlers ─────────────────────────────────────────── */
  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current || !btnTextRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // Restrained scale 1.01 hover movement
    gsap.to(btnRef.current, {
      x: relX * 0.08,
      y: relY * 0.08,
      scale: 1.01,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    gsap.to(btnTextRef.current, {
      x: relX * 0.03,
      y: relY * 0.03,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current || !btnTextRef.current) return;

    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    gsap.to(btnTextRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, []);

  const handleEnter = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    onTransitionStart?.();

    const btn = btnRef.current;
    if (!btn) return;

    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // Subtle click compression
    tl.to(btn, { scale: 0.98, duration: 0.10, ease: 'power2.out' });
    tl.to(btn, { scale: 1.01, duration: 0.08, ease: 'power2.in' }, '+=0.02');

    // Volumetric expanding light transition
    if (flashRef.current) {
      gsap.set(flashRef.current, { opacity: 0 });
      const proxy = { radius: 0, opacity: 0 };
      tl.to(proxy, {
        radius: 100,
        opacity: 1,
        duration: 0.90,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (flashRef.current) {
            flashRef.current.style.background =
              `radial-gradient(circle at 50% 80%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) ${proxy.radius * 0.4}%, rgba(2,17,36,0) ${proxy.radius}%)`;
            flashRef.current.style.opacity = String(proxy.opacity);
          }
        }
      }, 0.06);
    }

    // Dissolve cinematic stage
    tl.to(stageRef.current, { opacity: 0, duration: 0.50, ease: 'power2.inOut' }, 0.50);
  }, [onComplete, onTransitionStart]);

  const handleSkip = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // Stop videos
    if (logoVideoRef.current) logoVideoRef.current.pause();
    if (vehicleVideoRef.current) vehicleVideoRef.current.pause();

    if (timelineRef.current) timelineRef.current.kill();
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

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (logoVideoRef.current) logoVideoRef.current.muted = nextMuted;
    if (vehicleVideoRef.current) vehicleVideoRef.current.muted = nextMuted;
  };

  return (
    <div ref={stageRef} className="cin-stage-fixed" aria-label="AVERERA cinematic intro">
      <div className="cin-bg-black" />

      {/* Skip Button */}
      <button
        ref={skipBtnRef}
        className="cin-skip"
        onClick={handleSkip}
        type="button"
        aria-label="Skip intro"
      >
        SKIP INTRO
      </button>

      {/* Unmute Toggle Overlay */}


      {/* STAGE 1: Logo Reveal Stage with Left-Aligned Tagline */}
      <div
        ref={logoContainerRef}
        className={`cin-video-container ${step === 'logo-video' ? 'active' : 'hidden'}`}
      >
        <video
          ref={logoVideoRef}
          src="/upscaled-video.mp4"
          className="cin-video-element"
          playsInline
          autoPlay
          muted={isMuted}
          preload="metadata"
          onPlay={handleLogoPlay}
          onTimeUpdate={handleLogoTimeUpdate}
          onEnded={handleLogoEnded}
        />
        <div className="cin-video-vignette" />

        {/* Minimal Centered Tagline, Sits far below the centered logo */}
        <div
          ref={taglineRef}
          className="cin-tagline-wrap"
          style={{ opacity: taglineActive ? 1 : 0 }}
        >
          DRIVEN BY INNOVATION. CRAFTED WITH PRECISION.
        </div>
      </div>

      {/* STAGE 2: Vehicle 360 Video / Climax Stage */}
      <div
        ref={vehicleContainerRef}
        className={`cin-video-container ${(step === 'vehicle-video' || step === 'climax') ? 'active' : 'hidden'}`}
      >
        {step !== 'climax' ? (
          <video
            ref={vehicleVideoRef}
            src="/erasio_main_360.mp4"
            className="cin-video-element"
            playsInline
            muted={isMuted}
            preload={preloadVehicle ? "auto" : "metadata"}
            onEnded={handleVehicleEnded}
          />
        ) : (
          <img
            src="/frame_149.webp"
            alt="Vehicle Climax Frame"
            className="cin-video-element"
          />
        )}
        <div className="cin-video-vignette" />

        {/* CLIMAX OVERLAYS */}
        {step === 'climax' && (
          <div className="cin-climax-overlay">

            {/* Lower-Left Editorial layout */}
            <div className="cin-climax-editorial-block">
              {/* Eyebrow & Accent Line */}
              <div ref={brandGroupRef} className="cin-brand-group">
                <div ref={brandLineRef} className="cin-brand-accent-line" />
                <div className="cin-brand-text-wrap">
                  <div ref={brandTeamRef} className="cin-brand-team">TEAM</div>
                  <div ref={brandNameRef} className="cin-brand-name">AVERERA</div>
                </div>
                {/* Tricolor underline strip (orange - white - green) */}
                <div ref={tricolorLineRef} className="cin-tricolor-line">
                  <span className="cin-tricol-orange" />
                  <span className="cin-tricol-white" />
                  <span className="cin-tricol-green" />
                </div>
              </div>

              {/* Main Statements */}
              <div className="cin-statement-group">
                <div ref={statementPrimaryRef} className="cin-statement-primary">
                  ENGINEERED <br />FOR EFFICIENCY.
                </div>
                <div ref={statementSecondaryRef} className="cin-statement-secondary">
                  BUILT FOR <span className="cin-accent-tomorrow">TOMORROW.</span>
                </div>
                {/* Volumetric horizontal sweep line */}
                <div ref={statementSweepRef} className="cin-statement-sweep" />
              </div>

              {/* Barely noticeable technical tags */}
              <div ref={techDetailsRef} className="cin-tech-details">
                VEHICLE DESIGN &bull; EMBEDDED SYSTEMS &bull; AUTONOMOUS SYSTEMS
              </div>
            </div>

            {/* Phase E: ENTER THE REALM Gateway Inviter */}
            <div ref={enterStageRef} className="cin-enter-stage-container" style={{ opacity: 0 }}>
              <div ref={enterLineRef} className="cin-enter-expanding-line" />
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
                <span ref={btnBorderRef} className="cin-btn-glow-border" aria-hidden="true" />
                <span ref={btnGlintRef} className="cin-btn-inner-glint" aria-hidden="true" />
                <span ref={btnTextRef} className="cin-heavy-btn-text">ENTER THE REALM &nbsp;&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Radial light flash screen overlay */}
      <div ref={flashRef} className="cin-gateway-flash" aria-hidden="true" />
    </div>
  );
}
