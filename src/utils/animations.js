import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Check if user prefers reduced motion (Accessibility compliance)
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * 1. HERO SECTION ANIMATIONS & SMOOTH SCROLL PARALLAX
 * - Wireframe Car: Top-to-bottom blueprint drawing animation on load (4.8s)
 * - Scroll Parallax: Background wireframe moves slower than scroll speed (yPercent: 20)
 *   with smooth 1.2s scrub inertia.
 */
export const initHeroAnimations = (heroContainer) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const heroElements = [
      '.badge-glass',
      '.hero-typed-heading',
      '.hero-content p',
      '.hero-buttons'
    ];

    // Staggered load entrance animation for text
    gsap.fromTo(
      heroElements,
      {
        opacity: 0,
        y: 35,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1
      }
    );

    // Background Wireframe Parallax on scroll
    const carImg = document.querySelector('.page-bg-img');
    const heroSec = heroContainer || document.getElementById('hero');

    if (carImg && heroSec) {
      // Smooth parallax on scroll
      gsap.to(carImg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSec,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });
    }
  }, heroContainer);

  return () => ctx.revert();
};

/**
 * 2. STATS SECTION COUNT-UP ANIMATIONS (Smooth Glide)
 */
export const initStatCounters = (statsContainer) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const statCards = gsap.utils.toArray('.stat-card');
    
    statCards.forEach((card, index) => {
      const h3 = card.querySelector('h3');
      if (!h3) return;

      const fullText = h3.innerText;
      const numMatch = fullText.match(/\d+/);
      if (!numMatch) return;

      const targetVal = parseInt(numMatch[0], 10);
      const prefix = fullText.substring(0, numMatch.index);
      const suffix = fullText.substring(numMatch.index + numMatch[0].length);

      // Skip count-up mutation for ordinals (e.g. 1st) or single digit targets so it remains 1st
      if (targetVal <= 1 || suffix.toLowerCase().includes('st') || suffix.toLowerCase().includes('nd')) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
        return;
      }

      const counterObj = { val: 0 };

      gsap.fromTo(
        card,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
            onEnter: () => {
              gsap.to(counterObj, {
                val: targetVal,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                  h3.innerHTML = `${prefix}${Math.floor(counterObj.val)}${suffix}`;
                }
              });
            }
          }
        }
      );
    });
  }, statsContainer);

  return () => ctx.revert();
};

/**
 * 3. ULTRA-SMOOTH SECTION & CARD SCROLL REVEALS
 * - Natural drift-in: reduced y travel, no scale pop, expo easing
 */
export const initScrollReveals = (scopeContainer) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    // Section headers — gentle fade up
    const headers = gsap.utils.toArray('.section-header');
    headers.forEach((header) => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Cards — natural drift, no scale, short travel, tight stagger
    const cardSelectors = [
      '.about-card',
      '.vehicle-card',
      '.tech-card',
      '.simulator-card-glass',
      '.contact-card-glass'
    ];

    cardSelectors.forEach((selector) => {
      ScrollTrigger.batch(selector, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.07,
              ease: 'expo.out',
              clearProps: 'transform,opacity'
            }
          );
        }
      });
    });
  }, scopeContainer);

  return () => ctx.revert();
};

/**
 * 4. VEHICLES PINNED PREVIEW SHOWCASE
 */
export const initVehiclesPinning = (vehiclesSection) => {
  if (prefersReducedMotion()) return () => {};
  if (!vehiclesSection || window.innerWidth < 768) return () => {};

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.vehicle-card');
    if (cards.length > 1) {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.7, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.8
            }
          }
        );
      });
    }
  }, vehiclesSection);

  return () => ctx.revert();
};

/**
 * 5. NAVBAR SCROLL COMPACT EFFECT
 */
export const initNavScrollEffect = () => {
  if (prefersReducedMotion()) return () => {};

  const navbar = document.querySelector('.navbar-glass');
  if (!navbar) return () => {};

  const trigger = ScrollTrigger.create({
    start: '80 top',
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  });

  return () => trigger.kill();
};

/**
 * 6. ABOUT US PAGE ANIMATIONS
 */
export const initAboutAnimations = (aboutContainer) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.section-header',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
    );

    ScrollTrigger.batch('.about-card, .team-card, .award-card', {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.07,
            ease: 'expo.out',
            clearProps: 'transform,opacity'
          }
        );
      }
    });
  }, aboutContainer);

  return () => ctx.revert();
};

/**
 * 7. VEHICLES PAGE ANIMATIONS
 */
export const initVehiclesPageAnimations = (vehiclesContainer) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray('.vehicle-detail-section');
    sections.forEach((sec) => {
      const img = sec.querySelector('.hero-car-img, .image-glass-container');
      const specs = sec.querySelector('.vehicle-specs, .specs-table-glass');

      if (img) {
        gsap.fromTo(
          img,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: sec,
              start: 'top 95%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (specs) {
        gsap.fromTo(
          specs,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: sec,
              start: 'top 95%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  }, vehiclesContainer);

  return () => ctx.revert();
};

/**
 * 8. SPONSORS PAGE ANIMATIONS
 */
export const initSponsorsAnimations = (sponsorsContainer) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    ScrollTrigger.batch('.pricing-card', {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.07,
            ease: 'expo.out',
            clearProps: 'transform,opacity'
          }
        );
      }
    });
  }, sponsorsContainer);

  return () => ctx.revert();
};
