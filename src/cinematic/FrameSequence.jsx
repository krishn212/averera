import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

/**
 * FrameSequence — Production-optimized, canvas-based image sequence renderer.
 * Optimizations:
 *  - Asynchronous background thread decoding using fetch + createImageBitmap().
 *  - High-concurrency query throttling (max 4 concurrent fetches).
 *  - Sliding-window preloading (only loads close frames, skips distant frames).
 *  - Bounded memory cache eviction (releases decoded frames outside active window).
 *  - devicePixelRatio caps (desktop max 2.0, mobile max 1.5) to limit GPU footprint.
 *  - Debounced resize redrawing.
 *  - Nearest-loaded-frame fallback rendering to avoid blank canvases or flickers.
 */
const FrameSequence = forwardRef(({
  folderPath,
  fileNamePrefix,
  totalFrames,
  fileExtension = 'webp',
  scaleFactor = 1.0,
  onReady,
  preload = true
}, ref) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]); // holds ImageBitmap or HTMLImageElement
  const loadingStateRef = useRef([]); // 'idle', 'loading', 'loaded'
  const activeLoadersCountRef = useRef(0);
  
  const [isReady, setIsReady] = useState(false);
  const currentFrameRef = useRef(0);
  
  const [isMobile, setIsMobile] = useState(false);
  const rAFRef = useRef(null);
  const pendingFrameRef = useRef(null);

  // Initialize state arrays
  useEffect(() => {
    loadingStateRef.current = new Array(totalFrames).fill('idle');
    imagesRef.current = new Array(totalFrames).fill(null);
    activeLoadersCountRef.current = 0;
    setIsReady(false);
  }, [totalFrames]);

  // Viewport detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFramePath = (index) => {
    const fileNum = String(index + 1).padStart(3, '0');
    return `${folderPath}/${fileNamePrefix}${fileNum}.${fileExtension}`;
  };

  /* ── 1. Priority Sliding-Window Loader (Asynchronous Decoding) ─────────── */
  const loadNextInQueue = () => {
    if (!preload || activeLoadersCountRef.current >= 4) return;

    const currentFrame = currentFrameRef.current;
    
    // Sliders window: load N-5 to N+25
    const minLoad = Math.max(0, currentFrame - 5);
    const maxLoad = Math.min(totalFrames - 1, currentFrame + 25);

    const queue = [];
    for (let i = minLoad; i <= maxLoad; i++) {
      if (loadingStateRef.current[i] === 'idle') {
        let priority = 9999;
        const dist = i - currentFrame;
        const absDist = Math.abs(dist);

        if (i === currentFrame) {
          priority = 0;
        } else if (dist > 0 && dist <= 10) {
          priority = dist; // Forward playback buffer
        } else if (dist < 0 && dist >= -5) {
          priority = absDist * 2; // Backward buffer
        } else {
          priority = absDist + 50; // Outer preload buffer
        }

        queue.push({ index: i, priority });
      }
    }

    // Sort queue by priority (lowest number first)
    queue.sort((a, b) => a.priority - b.priority);

    const maxToLoad = Math.min(4 - activeLoadersCountRef.current, queue.length);
    for (let k = 0; k < maxToLoad; k++) {
      const idx = queue[k].index;
      loadingStateRef.current[idx] = 'loading';
      activeLoadersCountRef.current++;

      const url = getFramePath(idx);

      // Async Image Decoding via fetch + createImageBitmap
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error('Fetch failed');
          return response.blob();
        })
        .then(blob => createImageBitmap(blob))
        .then(bitmap => {
          imagesRef.current[idx] = bitmap;
          loadingStateRef.current[idx] = 'loaded';
          activeLoadersCountRef.current--;

          // Fire ready when first 8 frames are ready
          if (!isReady) {
            const firstBatchSize = Math.min(8, totalFrames);
            let firstBatchReady = true;
            for (let f = 0; f < firstBatchSize; f++) {
              if (loadingStateRef.current[f] !== 'loaded') {
                firstBatchReady = false;
                break;
              }
            }
            if (firstBatchReady) {
              setIsReady(true);
              onReady?.();
            }
          }

          loadNextInQueue();
        })
        .catch(() => {
          // Fallback to standard Image loader if fetch/createImageBitmap fails
          const img = new Image();
          img.src = url;
          img.onload = () => {
            imagesRef.current[idx] = img;
            loadingStateRef.current[idx] = 'loaded';
            activeLoadersCountRef.current--;
            loadNextInQueue();
          };
          img.onerror = () => {
            loadingStateRef.current[idx] = 'idle'; // Let it retry
            activeLoadersCountRef.current--;
            loadNextInQueue();
          };
        });
    }
  };

  useEffect(() => {
    if (preload) {
      loadNextInQueue();
    }
  }, [preload, isMobile, totalFrames]);

  /* ── 2. Memory Cache Eviction ───────────────────────────────────────────── */
  const runCacheEviction = (currentFrame) => {
    // Evict frames far outside the window: N-10 to N+25
    const CACHE_WINDOW_BACKWARD = 10;
    const CACHE_WINDOW_FORWARD = 25;

    for (let i = 0; i < totalFrames; i++) {
      if (imagesRef.current[i]) {
        const dist = i - currentFrame;
        if (dist > CACHE_WINDOW_FORWARD || dist < -CACHE_WINDOW_BACKWARD) {
          // Close ImageBitmap if supported to free GPU memory immediately
          if (typeof imagesRef.current[i].close === 'function') {
            imagesRef.current[i].close();
          }
          imagesRef.current[i] = null;
          loadingStateRef.current[i] = 'idle';
        }
      }
    }
  };

  /* ── 3. High-Performance Canvas Rendering ───────────────────────────────── */
  const renderLoop = () => {
    if (pendingFrameRef.current === null) {
      rAFRef.current = null;
      return;
    }

    const index = pendingFrameRef.current;
    pendingFrameRef.current = null;

    const canvas = canvasRef.current;
    if (!canvas) {
      rAFRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      rAFRef.current = requestAnimationFrame(renderLoop);
      return;
    }

    let img = imagesRef.current[index];
    if (!img) {
      // Find nearest loaded frame to prevent flickering
      let fallbackImg = null;
      for (let offset = 1; offset < 35; offset++) {
        const prev = imagesRef.current[index - offset];
        const next = imagesRef.current[index + offset];
        if (prev) { fallbackImg = prev; break; }
        if (next) { fallbackImg = next; break; }
      }
      img = fallbackImg;
    }

    if (img) {
      // Cap DPR for performance: desktop max 2.0, mobile max 1.5
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Support natural dimensions from ImageBitmap or HTMLImageElement
      const imgW = img.width || img.naturalWidth;
      const imgH = img.height || img.naturalHeight;
      if (imgW && imgH) {
        const baseRatio = Math.min(canvas.width / imgW, canvas.height / imgH);
        const ratio = baseRatio * scaleFactor;

        const drawW = imgW * ratio;
        const drawH = imgH * ratio;
        const drawX = (canvas.width - drawW) / 2;
        const drawY = (canvas.height - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
    }

    rAFRef.current = requestAnimationFrame(renderLoop);
  };

  const scheduleFrameRender = (index) => {
    currentFrameRef.current = index;
    pendingFrameRef.current = index;

    loadNextInQueue();
    runCacheEviction(index);

    if (!rAFRef.current) {
      rAFRef.current = requestAnimationFrame(renderLoop);
    }
  };

  /* ── 4. Imperative API ─────────────────────────────────────────────────── */
  useImperativeHandle(ref, () => ({
    setFrame: (index) => {
      const clampedIdx = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
      scheduleFrameRender(clampedIdx);
    },
    drawCurrentFrame: () => {
      scheduleFrameRender(currentFrameRef.current);
    }
  }));

  // Draw initial frame once the first batch is ready
  useEffect(() => {
    if (isReady) {
      scheduleFrameRender(currentFrameRef.current);
    }
  }, [isReady]);

  // Debounced/throttled resize redrawing
  useEffect(() => {
    let resizeRAF = null;
    const handleResize = () => {
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        scheduleFrameRender(currentFrameRef.current);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      
      {!isReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            zIndex: 9,
          }}
        >
          CONNECTING CORE CONCEPTS...
        </div>
      )}
    </div>
  );
});

FrameSequence.displayName = 'FrameSequence';

export default FrameSequence;
