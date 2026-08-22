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
    if (preloadVehicle) {
      const img = new Image();
      img.src = "/frame_149.webp";
    }
  }, [preloadVehicle]);

  useEffect(() => {
    // Lock page scrolling
    document.body.style.overflow = 'hidden';

    // Start logo video
    const logoVideo = logoVideoRef.current;
    if (logoVideo) {
      logoVideo.muted = true;
      logoVideo.playbackRate = 1.5;
      logoVideo.play()
        .then(() => {
          setPreloadVehicle(true);
          gsap.fromTo(logoContainerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        })
        .catch(e => {
          console.error("Muted playback failed", e);
          // Fallback fade in so page never remains blank
          setPreloadVehicle(true);
          gsap.fromTo(logoContainerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        });
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

  const handleLogoEnded = () => {
    setStep('transitioning-to-vehicle');
    const vehicleVideo = vehicleVideoRef.current;
    if (vehicleVideo) {
      vehicleVideo.muted = isMuted;
      vehicleVideo.playbackRate = 1.5;

      const transitionToVehicleVideo = () => {
        gsap.to(logoContainerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setStep('vehicle-video');
          }
        });
      };

      vehicleVideo.play()
        .then(transitionToVehicleVideo)
        .catch((err) => {
          console.warn("Vehicle video autoplay blocked. Retrying muted.", err);
          vehicleVideo.muted = true;
          setIsMuted(true);
          vehicleVideo.playbackRate = 1.5;
          vehicleVideo.play()
            .then(transitionToVehicleVideo)
            .catch(e => {
              console.error("Vehicle playback failed", e);
              setStep('vehicle-video');
            });
        });
    } else {
      setStep('vehicle-video');
    }
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

    // Climax Delay & Vignette Overlay transition
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

    // Trigger transition start so the app is mounted and visible underneath
    onTransitionStart?.();

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
  }, [onComplete, onTransitionStart]);

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
        className={`cin-video-container ${(step === 'logo-video' || step === 'transitioning-to-vehicle') ? 'active' : 'hidden'}`}
        style={{
          opacity: 0,
          zIndex: (step === 'logo-video' || step === 'transitioning-to-vehicle') ? 7 : 5
        }}
      >
        <video
          ref={logoVideoRef}
          src="/upscaled-video.mp4"
          className="cin-video-element"
          playsInline
          autoPlay
          muted={isMuted}
          preload="metadata"
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
        className={`cin-video-container ${(step === 'vehicle-video' || step === 'climax' || step === 'transitioning-to-vehicle') ? 'active' : 'hidden'}`}
      >
        <video
          ref={vehicleVideoRef}
          src="/erasio_main_360.mp4"
          className="cin-video-element"
          playsInline
          muted={isMuted}
          preload={preloadVehicle ? "auto" : "metadata"}
          onEnded={handleVehicleEnded}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: step === 'climax' ? 0 : 1,
            zIndex: step === 'climax' ? 5 : 6
          }}
        />
        {(preloadVehicle || step === 'climax') && (
          <img
            src="/frame_149.webp"
            alt="Vehicle Climax Frame"
            className="cin-video-element"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: step === 'climax' ? 1 : 0,
              zIndex: step === 'climax' ? 6 : 5,
              pointerEvents: 'none'
            }}
          />
        )}
        <div className="cin-video-vignette" />

        {/* CLIMAX OVERLAYS */}
        {step === 'climax' && (
          <div className="cin-climax-overlay">

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
