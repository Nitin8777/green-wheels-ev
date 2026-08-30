'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronDown, CheckCircle2, ArrowDown } from 'lucide-react';

const TOTAL_FRAMES = 40;
const FRAME_PREFIX = '/frames/ezgif-frame-';

interface ScooterScrollProps {
  onUnlock?: (unlocked: boolean) => void;
}

export default function ScooterScroll({ onUnlock }: ScooterScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const wheelAccumulatorRef = useRef<number>(0);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Render a specific frame on canvas in full screen
  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;

    if (canvasRatio > imgRatio) {
      drawH = ch * 0.95;
      drawW = drawH * imgRatio;
    } else {
      drawW = cw * 0.96;
      drawH = drawW / imgRatio;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Update canvas size with HiDPI support
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Set active frame and trigger unlock when frame 39 is reached
  const setFrameIndex = useCallback(
    (newIndex: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, newIndex));
      currentFrameRef.current = clamped;
      setCurrentFrame(clamped);
      renderFrame(clamped);

      if (clamped >= TOTAL_FRAMES - 1) {
        setIsUnlocked(true);
        if (onUnlock) onUnlock(true);
      }
    },
    [onUnlock, renderFrame]
  );

  // Preload all 40 frames into memory
  useEffect(() => {
    let count = 0;
    const list: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `${FRAME_PREFIX}${padded}.jpg`;

      const onLoad = () => {
        count++;
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));

        if (i === 1) {
          imagesRef.current = list;
          renderFrame(0);
        }

        if (count === TOTAL_FRAMES) {
          imagesRef.current = list;
          setImagesLoaded(true);
          resizeCanvas();
        }
      };

      img.onload = onLoad;
      img.onerror = onLoad;
      list[i - 1] = img;
    }

    imagesRef.current = list;
  }, [renderFrame, resizeCanvas]);

  // Window resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // STRICT SCROLL LOCK ENGINE:
  // Cannot scroll down past hero until frame 39 is reached.
  // Wheel and Touch events advance frames forward on scroll down and backward on scroll up.
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const frame = currentFrameRef.current;

      // When at the top of the page
      if (scrollY <= 5) {
        if (e.deltaY > 0) {
          // Scrolling down: If not finished, prevent body scroll and advance frames
          if (frame < TOTAL_FRAMES - 1) {
            e.preventDefault();
            wheelAccumulatorRef.current += e.deltaY;
            const threshold = 35; // sensitivity
            if (Math.abs(wheelAccumulatorRef.current) >= threshold) {
              const steps = Math.max(1, Math.floor(Math.abs(wheelAccumulatorRef.current) / threshold));
              setFrameIndex(frame + steps);
              wheelAccumulatorRef.current = 0;
            }
          }
          // If frame === TOTAL_FRAMES - 1, allow natural page scroll to lower sections!
        } else if (e.deltaY < 0) {
          // Scrolling up: If at top of page, rewind frames
          if (frame > 0) {
            e.preventDefault();
            wheelAccumulatorRef.current += e.deltaY;
            const threshold = 35;
            if (Math.abs(wheelAccumulatorRef.current) >= threshold) {
              const steps = Math.max(1, Math.floor(Math.abs(wheelAccumulatorRef.current) / threshold));
              setFrameIndex(frame - steps);
              wheelAccumulatorRef.current = 0;
            }
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const frame = currentFrameRef.current;

      if (scrollY <= 5) {
        const touchY = e.touches[0].clientY;
        const diff = touchStartYRef.current - touchY;

        if (diff > 0) {
          // Swiping up (scrolling down)
          if (frame < TOTAL_FRAMES - 1) {
            e.preventDefault();
            if (Math.abs(diff) > 15) {
              setFrameIndex(frame + 1);
              touchStartYRef.current = touchY;
            }
          }
        } else if (diff < 0) {
          // Swiping down (scrolling up)
          if (frame > 0) {
            e.preventDefault();
            if (Math.abs(diff) > 15) {
              setFrameIndex(frame - 1);
              touchStartYRef.current = touchY;
            }
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [setFrameIndex]);

  // Percentage of disassembly completed
  const progressPercent = Math.round((currentFrame / (TOTAL_FRAMES - 1)) * 100);

  const handleScrollToContent = () => {
    setFrameIndex(TOTAL_FRAMES - 1);
    const el = document.getElementById('specs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="relative w-full h-screen bg-[#666a6f] overflow-hidden flex flex-col justify-between select-none"
      style={{
        background: 'radial-gradient(circle at center, #7a8087 0%, #5d6369 60%, #4b5055 100%)',
      }}
    >
      {/* Fullscreen HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain z-10"
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {!imagesLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0d10] px-6 text-center"
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-2">
              GREEN WHEELS
            </h2>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-emerald-400 transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-emerald-400">{loadProgress}% Preloaded</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narrative Overlays & Progress Lock HUD */}
      {imagesLoaded && (
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 md:p-14 max-w-7xl mx-auto pointer-events-none">
          {/* Top Bar / Status */}
          <div className="pt-16 flex items-center justify-between text-xs font-mono text-white/70">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SPATIAL DECONSTRUCTION</span>
            </div>

            <div className="pointer-events-auto">
              {!isUnlocked ? (
                <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-white/50 text-[11px]">
                  🔒 Disassemble 100% to Unlock Page
                </span>
              ) : (
                <button
                  onClick={handleScrollToContent}
                  className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                >
                  <span>Explore Specs</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Story Cards */}
          <div className="my-auto pointer-events-none">
            {/* Stage 0: 0% to 24% (Hero) */}
            {progressPercent < 25 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center flex flex-col items-center justify-center max-w-3xl mx-auto"
              >
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-white font-display leading-none mb-3 drop-shadow-xl">
                  GREEN WHEELS
                </h1>
                <p className="text-lg sm:text-2xl text-emerald-300 font-display font-semibold tracking-wide mb-8 drop-shadow-md">
                  APEX-1 // Pure Electric Velocity
                </p>

                <div className="flex flex-col items-center gap-2 text-white/80">
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="w-5 h-8 rounded-full border-2 border-white/50 flex items-start justify-center p-1 bg-black/30 backdrop-blur-sm"
                  >
                    <div className="w-1.5 h-2 bg-emerald-400 rounded-full" />
                  </motion.div>
                  <span className="text-[11px] uppercase tracking-widest font-mono font-medium drop-shadow bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    Scroll down to disassemble ↓
                  </span>
                </div>
              </motion.div>
            )}

            {/* Stage 1: 25% to 58% (Modular Unibody) */}
            {progressPercent >= 25 && progressPercent < 60 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="self-start max-w-md glass-panel bg-black/65 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl"
              >
                <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest block mb-1 font-bold">
                  Phase 01 // Structural Deconstruction
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                  MODULAR UNIBODY
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                  Hydroformed 6061-T6 aviation aluminum chassis separates under dynamic tension for full internal inspection.
                </p>
                <div className="flex gap-6 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                  <div>
                    <span className="text-emerald-400 font-bold text-base block">28.4 kg</span>
                    <span>Chassis Weight</span>
                  </div>
                  <div>
                    <span className="text-white font-bold text-base block">380%</span>
                    <span>Torsional Stiffness</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 2: 60% to 88% (HyperCell Powertrain) */}
            {progressPercent >= 60 && progressPercent < 90 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="self-end ml-auto max-w-md glass-panel bg-black/65 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl text-left"
              >
                <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest block mb-1 font-bold">
                  Phase 02 // Core Propulsion System
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                  HYPERCELL™ DYNAMICS
                </h2>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                  4.2 kWh liquid-cooled battery pack exposed with dual high-flux PMSM vector hub motors.
                </p>
                <div className="flex gap-6 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                  <div>
                    <span className="text-emerald-400 font-bold text-base block">85 Nm</span>
                    <span>Peak Torque</span>
                  </div>
                  <div>
                    <span className="text-white font-bold text-base block">2.8s</span>
                    <span>0 - 60 km/h</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stage 3: 90% to 100% (Complete Reassembly & Page Unlock Cue) */}
            {progressPercent >= 90 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center justify-center max-w-xl mx-auto glass-panel bg-black/75 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-emerald-500/30 glow-green shadow-2xl"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Teardown Complete & Reassembled</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-2">
                  REASSEMBLED. READY.
                </h2>
                <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto leading-relaxed mb-5">
                  160 km certified range • Dual PMSM propulsion • Zero emissions
                </p>

                <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest pt-1">
                  <span>Scroll down to explore full website</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Interactive Progress HUD */}
          <div className="pb-4 pointer-events-auto">
            <div className="max-w-md mx-auto glass-panel bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between gap-4 shadow-xl">
              <div className="flex-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-white/70 mb-1">
                  <span>DISASSEMBLY PROGRESS</span>
                  <span className="text-emerald-300 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {!isUnlocked ? (
                <div className="text-[11px] font-mono text-emerald-300 flex items-center gap-1 whitespace-nowrap bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <span>Scroll</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </div>
              ) : (
                <button
                  onClick={handleScrollToContent}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold font-mono transition-all flex items-center gap-1"
                >
                  <span>Explore ↓</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
