import {
  ArrowDown,
  ArrowUp,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ThemeMode } from '../types/network';

type GameState = 'TITLE_MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

interface OfflineRunnerGameProps {
  theme: ThemeMode;
  isOnline: boolean;
  checkingConnection: boolean;
  onCheckConnection: () => void;
  onReturnToSpeedTest: () => void;
}

interface Obstacle {
  x: number;
  width: number;
  height: number;
  yOffset: number; // distance above ground
  kind: 'tower' | 'double' | 'drone';
  passed: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const HIGH_SCORE_KEY = 'testline_runner_highscore_v1';

function loadHighScore(): number {
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number): void {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(Math.floor(score)));
  } catch {
    // Ignore storage quota issues
  }
}

export const OfflineRunnerGame = memo(function OfflineRunnerGame({
  theme,
  isOnline,
  checkingConnection,
  onCheckConnection,
  onReturnToSpeedTest,
}: OfflineRunnerGameProps) {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(loadHighScore);
  const [isNewBest, setIsNewBest] = useState(false);
  const [obstaclesCleared, setObstaclesCleared] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const gameStateRef = useRef<GameState>(gameState);
  const themeRef = useRef<ThemeMode>(theme);
  const soundEnabledRef = useRef<boolean>(soundEnabled);
  const highScoreRef = useRef<number>(highScore);

  gameStateRef.current = gameState;
  themeRef.current = theme;
  soundEnabledRef.current = soundEnabled;
  highScoreRef.current = highScore;

  // Mutable simulation state inside ref for zero-lag 60fps Canvas rendering
  const simRef = useRef({
    width: 720,
    height: 280,
    groundY: 228,
    runnerX: 68,
    runnerW: 32,
    runnerH: 40,
    y: 0, // elevation above ground (0 = grounded)
    vy: 0,
    jumpsUsed: 0,
    fastFalling: false,
    runPhase: 0,
    squash: 1,
    speed: 310,
    distance: 0,
    score: 0,
    lastMilestone: 0,
    cleared: 0,
    spawnCooldown: 0.9,
    obstacles: [] as Obstacle[],
    particles: [] as Particle[],
    clouds: [
      { x: 140, y: 54, w: 54, s: 18 },
      { x: 390, y: 38, w: 68, s: 14 },
      { x: 610, y: 68, w: 46, s: 22 },
    ],
  });

  const playTone = useCallback((freq: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.06) => {
    if (!soundEnabledRef.current || typeof window === 'undefined') return;
    try {
      const AudioCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore Web Audio errors on restricted devices
    }
  }, []);

  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    const sim = simRef.current;
    for (let i = 0; i < count; i++) {
      sim.particles.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y - Math.random() * 6,
        vx: -40 - Math.random() * 90,
        vy: -20 - Math.random() * 65,
        life: 0.35 + Math.random() * 0.2,
        maxLife: 0.55,
        size: 2.5 + Math.random() * 2.5,
      });
    }
  }, []);

  const resetAndStartRun = useCallback(() => {
    const sim = simRef.current;
    sim.y = 0;
    sim.vy = 0;
    sim.jumpsUsed = 0;
    sim.fastFalling = false;
    sim.runPhase = 0;
    sim.squash = 1;
    sim.speed = Math.max(280, Math.min(340, sim.width * 0.45));
    sim.distance = 0;
    sim.score = 0;
    sim.lastMilestone = 0;
    sim.cleared = 0;
    sim.spawnCooldown = 0.85;
    sim.obstacles = [];
    sim.particles = [];

    setScore(0);
    setObstaclesCleared(0);
    setIsNewBest(false);
    setGameState('PLAYING');
    playTone(520, 0.08, 'triangle', 0.05);
  }, [playTone]);

  const triggerJump = useCallback(() => {
    const state = gameStateRef.current;
    if (state === 'TITLE_MENU' || state === 'GAME_OVER') {
      resetAndStartRun();
      return;
    }
    if (state === 'PAUSED') {
      setGameState('PLAYING');
      return;
    }

    const sim = simRef.current;
    if (sim.jumpsUsed < 2) {
      const isFirst = sim.jumpsUsed === 0;
      sim.vy = isFirst ? 610 : 540;
      sim.jumpsUsed += 1;
      sim.fastFalling = false;
      sim.squash = 1.18;
      spawnParticles(sim.runnerX + sim.runnerW * 0.4, sim.groundY - sim.y, isFirst ? 6 : 5);
      playTone(isFirst ? 440 : 587, 0.09, 'triangle', 0.055);
    }
  }, [playTone, resetAndStartRun, spawnParticles]);

  const triggerFastDrop = useCallback(() => {
    if (gameStateRef.current !== 'PLAYING') return;
    const sim = simRef.current;
    if (sim.y > 0) {
      sim.fastFalling = true;
      sim.vy = Math.min(sim.vy, -680);
    }
  }, []);

  const togglePause = useCallback(() => {
    setGameState((prev) => {
      if (prev === 'PLAYING') return 'PAUSED';
      if (prev === 'PAUSED') return 'PLAYING';
      return prev;
    });
  }, []);

  // Auto-return to speed test if internet reconnects while user is still on the title menu
  useEffect(() => {
    if (isOnline && gameState === 'TITLE_MENU') {
      onReturnToSpeedTest();
    }
  }, [isOnline, gameState, onReturnToSpeedTest]);

  // Keyboard controls for desktop & tablet keyboards
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        triggerJump();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        triggerFastDrop();
      } else if (e.code === 'KeyP') {
        e.preventDefault();
        togglePause();
      } else if (e.code === 'Enter' && (gameStateRef.current === 'TITLE_MENU' || gameStateRef.current === 'GAME_OVER')) {
        e.preventDefault();
        resetAndStartRun();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [resetAndStartRun, togglePause, triggerFastDrop, triggerJump]);

  // ResizeObserver keeps Canvas crisp across mobile, tablet, and desktop widths
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(280, Math.floor(rect.width));
      const height = width < 480 ? 230 : width < 768 ? 265 : 300;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const sim = simRef.current;
      sim.width = width;
      sim.height = height;
      sim.groundY = height - 44;
      sim.runnerX = width < 480 ? 44 : 68;
      sim.runnerW = width < 480 ? 28 : 32;
      sim.runnerH = width < 480 ? 36 : 40;
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Main 60fps animation loop
  useEffect(() => {
    let rafId = 0;
    let prevTime = performance.now();

    const drawFrame = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      const canvas = canvasRef.current;
      if (!canvas) {
        rafId = requestAnimationFrame(drawFrame);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        rafId = requestAnimationFrame(drawFrame);
        return;
      }

      const sim = simRef.current;
      const dpr = canvas.width / sim.width;
      const isDark = themeRef.current === 'dark';

      // Physics & Spawner Step
      if (gameStateRef.current === 'PLAYING') {
        const gravity = sim.fastFalling ? 3200 : 1720;
        sim.vy -= gravity * dt;
        sim.y += sim.vy * dt;

        if (sim.y <= 0) {
          if (sim.vy < -220) {
            sim.squash = 0.82;
            spawnParticles(sim.runnerX + sim.runnerW * 0.5, sim.groundY, 5);
          }
          sim.y = 0;
          sim.vy = 0;
          sim.jumpsUsed = 0;
          sim.fastFalling = false;
        }

        sim.squash += (1 - sim.squash) * Math.min(1, dt * 14);
        sim.runPhase += dt * (sim.speed / 32);
        sim.speed = Math.min(640, sim.speed + dt * 9.5);
        sim.distance += sim.speed * dt;

        const nextScore = Math.floor(sim.distance / 18);
        if (nextScore !== sim.score) {
          sim.score = nextScore;
          setScore(nextScore);
          const milestone = Math.floor(nextScore / 100);
          if (milestone > sim.lastMilestone && nextScore > 0) {
            sim.lastMilestone = milestone;
            playTone(660, 0.08, 'sine', 0.05);
            window.setTimeout(() => playTone(880, 0.12, 'sine', 0.05), 85);
          }
        }

        // Scroll background signal clouds
        for (const cloud of sim.clouds) {
          cloud.x -= cloud.s * dt;
          if (cloud.x + cloud.w < 0) {
            cloud.x = sim.width + 20 + Math.random() * 60;
            cloud.y = 26 + Math.random() * Math.max(40, sim.groundY - 120);
          }
        }

        // Spawn obstacles with fair gap scaling
        sim.spawnCooldown -= dt;
        if (sim.spawnCooldown <= 0) {
          const canSpawnDrone = sim.score >= 80 && Math.random() < 0.28;
          const canSpawnDouble = sim.score >= 35 && !canSpawnDrone && Math.random() < 0.32;

          if (canSpawnDrone) {
            sim.obstacles.push({
              x: sim.width + 20,
              width: 34,
              height: 22,
              yOffset: Math.random() < 0.5 ? 36 : 58,
              kind: 'drone',
              passed: false,
            });
          } else if (canSpawnDouble) {
            sim.obstacles.push({
              x: sim.width + 20,
              width: 40,
              height: 30,
              yOffset: 0,
              kind: 'double',
              passed: false,
            });
          } else {
            sim.obstacles.push({
              x: sim.width + 20,
              width: 22 + Math.random() * 10,
              height: 34 + Math.random() * 18,
              yOffset: 0,
              kind: 'tower',
              passed: false,
            });
          }

          const minTimeGap = Math.max(0.68, 1.32 - (sim.speed - 280) / 700);
          sim.spawnCooldown = minTimeGap + Math.random() * 0.65;
        }

        // Update particles
        for (let i = sim.particles.length - 1; i >= 0; i--) {
          const p = sim.particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 240 * dt;
          p.life -= dt;
          if (p.life <= 0) {
            sim.particles.splice(i, 1);
          }
        }

        // Move obstacles & check forgiving AABB collision
        const rLeft = sim.runnerX + 6;
        const rRight = sim.runnerX + sim.runnerW - 6;
        const rBottom = sim.groundY - sim.y;
        const rTop = rBottom - sim.runnerH + 5;

        let crashed = false;
        for (let i = sim.obstacles.length - 1; i >= 0; i--) {
          const ob = sim.obstacles[i];
          ob.x -= sim.speed * dt;

          if (!ob.passed && ob.x + ob.width < sim.runnerX) {
            ob.passed = true;
            sim.cleared += 1;
            setObstaclesCleared(sim.cleared);
          }

          const oLeft = ob.x + 3;
          const oRight = ob.x + ob.width - 3;
          const oBottom = sim.groundY - ob.yOffset;
          const oTop = oBottom - ob.height + 3;

          if (rRight > oLeft && rLeft < oRight && rBottom > oTop && rTop < oBottom) {
            crashed = true;
            break;
          }

          if (ob.x + ob.width < -30) {
            sim.obstacles.splice(i, 1);
          }
        }

        if (crashed) {
          playTone(170, 0.22, 'sawtooth', 0.07);
          if (sim.score > highScoreRef.current) {
            saveHighScore(sim.score);
            setHighScore(sim.score);
            setIsNewBest(true);
          }
          setGameState('GAME_OVER');
        }
      } else if (gameStateRef.current === 'TITLE_MENU') {
        sim.runPhase += dt * 6;
      }

      // Render Canvas
      ctx.save();
      ctx.scale(dpr, dpr);

      // Background
      ctx.fillStyle = isDark ? '#0B1220' : '#F8FAFC';
      ctx.fillRect(0, 0, sim.width, sim.height);

      // Subtle dashed grid horizon
      ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(15, 23, 42, 0.06)';
      ctx.lineWidth = 1;
      for (let gx = -(sim.distance * 0.25) % 48; gx < sim.width; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 16);
        ctx.lineTo(gx, sim.groundY);
        ctx.stroke();
      }

      // Clouds / signal packets in sky
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.14)' : 'rgba(14, 165, 233, 0.14)';
      for (const cloud of sim.clouds) {
        ctx.beginPath();
        ctx.roundRect(cloud.x, cloud.y, cloud.w, 8, 4);
        ctx.fill();
      }

      // Ground track line + scrolling ticks
      ctx.strokeStyle = isDark ? '#334155' : '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, sim.groundY);
      ctx.lineTo(sim.width, sim.groundY);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#334155' : '#CBD5E1';
      const tickOffset = sim.distance % 36;
      for (let tx = -tickOffset; tx < sim.width; tx += 36) {
        ctx.fillRect(tx, sim.groundY + 8, 14, 2.5);
        ctx.fillRect(tx + 18, sim.groundY + 16, 6, 2);
      }

      // Dust particles
      for (const p of sim.particles) {
        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = isDark
          ? `rgba(56, 189, 248, ${alpha * 0.7})`
          : `rgba(14, 165, 233, ${alpha * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Obstacles
      for (const ob of sim.obstacles) {
        const bottomY = sim.groundY - ob.yOffset;
        const topY = bottomY - ob.height;

        if (ob.kind === 'drone') {
          // Floating drone packet
          ctx.fillStyle = isDark ? '#F59E0B' : '#D97706';
          ctx.beginPath();
          ctx.roundRect(ob.x, topY, ob.width, ob.height, 6);
          ctx.fill();

          ctx.fillStyle = isDark ? '#0F172A' : '#FFFFFF';
          ctx.fillRect(ob.x + 6, topY + 7, ob.width - 12, 4);
        } else if (ob.kind === 'double') {
          // Twin firewall spikes
          ctx.fillStyle = isDark ? '#FB7185' : '#E11D48';
          const halfW = ob.width / 2 - 2;
          ctx.beginPath();
          ctx.roundRect(ob.x, topY, halfW, ob.height, [4, 4, 0, 0]);
          ctx.roundRect(ob.x + halfW + 4, topY + 4, halfW, ob.height - 4, [4, 4, 0, 0]);
          ctx.fill();
        } else {
          // Signal tower / pylon
          ctx.fillStyle = isDark ? '#F43F5E' : '#BE123C';
          ctx.beginPath();
          ctx.roundRect(ob.x, topY, ob.width, ob.height, [5, 5, 0, 0]);
          ctx.fill();

          ctx.fillStyle = isDark ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.35)';
          ctx.fillRect(ob.x + 4, topY + 6, ob.width - 8, 4);
        }
      }

      // Signal Runner character
      const drawW = sim.runnerW / sim.squash;
      const drawH = sim.runnerH * sim.squash;
      const rx = sim.runnerX + (sim.runnerW - drawW) / 2;
      const rBottomY = sim.groundY - sim.y;
      const ry = rBottomY - drawH;

      // Ground shadow
      const shadowScale = Math.max(0.35, 1 - sim.y / 180);
      ctx.fillStyle = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(15,23,42,0.12)';
      ctx.beginPath();
      ctx.ellipse(
        sim.runnerX + sim.runnerW / 2,
        sim.groundY + 4,
        (sim.runnerW * 0.52) * shadowScale,
        3.5 * shadowScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Legs animation
      const legSwing = sim.y > 2 ? 4 : Math.sin(sim.runPhase) * 6;
      ctx.strokeStyle = isDark ? '#E2E8F0' : '#0F172A';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(rx + drawW * 0.35, rBottomY - 11);
      ctx.lineTo(rx + drawW * 0.35 + legSwing, rBottomY - 2);
      ctx.moveTo(rx + drawW * 0.68, rBottomY - 11);
      ctx.lineTo(rx + drawW * 0.68 - legSwing, rBottomY - 2);
      ctx.stroke();

      // Body
      ctx.fillStyle = isDark ? '#38BDF8' : '#0F172A';
      ctx.beginPath();
      ctx.roundRect(rx, ry, drawW, drawH - 9, 8);
      ctx.fill();

      // Visor
      ctx.fillStyle = isDark ? '#070B12' : '#38BDF8';
      ctx.beginPath();
      ctx.roundRect(rx + drawW * 0.42, ry + 7, drawW * 0.48, 8, 4);
      ctx.fill();

      // Top signal antenna
      ctx.strokeStyle = isDark ? '#38BDF8' : '#0284C7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(rx + drawW * 0.45, ry);
      ctx.lineTo(rx + drawW * 0.45, ry - 6);
      ctx.stroke();
      ctx.fillStyle = isDark ? '#F59E0B' : '#0EA5E9';
      ctx.beginPath();
      ctx.arc(rx + drawW * 0.45, ry - 7, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      rafId = requestAnimationFrame(drawFrame);
    };

    rafId = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(rafId);
  }, [playTone, spawnParticles]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-4 sm:p-6 space-y-4">
      {/* Unobtrusive Top HUD & Connection Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {isOnline ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400">
              <Wifi className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Internet Restored</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <WifiOff className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Offline Mode — Internet Disconnected</span>
            </span>
          )}

          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700 hidden sm:inline">
            ·
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isOnline
              ? 'Connection is active again'
              : 'Play Signal Runner while waiting to reconnect'}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-3">
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              Score{' '}
              <strong className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                {String(score).padStart(4, '0')}
              </strong>
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Best{' '}
              <strong className="font-semibold text-sky-700 dark:text-sky-400 tabular-nums">
                {String(highScore).padStart(4, '0')}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSoundEnabled((v) => !v)}
              aria-label={soundEnabled ? 'Mute game sound' : 'Unmute game sound'}
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
              className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" aria-hidden="true" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" aria-hidden="true" />
              )}
            </button>

            {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
              <button
                type="button"
                onClick={togglePause}
                aria-label={gameState === 'PAUSED' ? 'Resume game' : 'Pause game'}
                title={gameState === 'PAUSED' ? 'Resume (P)' : 'Pause (P)'}
                className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {gameState === 'PAUSED' ? (
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}

            {isOnline ? (
              <button
                type="button"
                onClick={onReturnToSpeedTest}
                className="min-h-[40px] px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                Return to Speed Test
              </button>
            ) : (
              <button
                type="button"
                onClick={onCheckConnection}
                disabled={checkingConnection}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${checkingConnection ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>{checkingConnection ? 'Checking...' : 'Check Connection'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Canvas Stage */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 select-none"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            e.preventDefault();
            triggerJump();
          }}
          style={{ touchAction: 'none' }}
          aria-label="Offline Signal Runner jump and run game canvas"
          className="block w-full cursor-pointer"
        />

        {gameState === 'TITLE_MENU' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/75 dark:bg-[#0B1220]/75 backdrop-blur-[2px]">
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              Signal Runner
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md">
              Jump over towers, spikes, and drones until your internet returns. Double-jump is enabled.
            </p>
            <button
              type="button"
              onClick={resetAndStartRun}
              className="mt-4 inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Start Game</span>
            </button>
            <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
              Tap screen or press Space / Up Arrow to jump
            </p>
          </div>
        )}

        {gameState === 'PAUSED' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/75 dark:bg-[#0B1220]/75 backdrop-blur-[2px]">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
              Game Paused
            </h2>
            <button
              type="button"
              onClick={() => setGameState('PLAYING')}
              className="mt-4 inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Resume</span>
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/82 dark:bg-[#0B1220]/82 backdrop-blur-[2px]">
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              Signal Interrupted
            </h2>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
              <span>
                Score: <strong className="text-slate-900 dark:text-slate-100">{score}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Cleared: <strong className="text-slate-900 dark:text-slate-100">{obstaclesCleared}</strong>
              </span>
              {isNewBest && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">New Best!</span>
                </>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={resetAndStartRun}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Play Again</span>
              </button>

              {isOnline && (
                <button
                  type="button"
                  onClick={onReturnToSpeedTest}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <Wifi className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                  <span>Back to Speed Test</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile, Tablet & Touch Ergonomic Controls + Desktop Hint */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="grid grid-cols-2 sm:flex items-center gap-2.5 w-full sm:w-auto">
          <button
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              triggerJump();
            }}
            style={{ touchAction: 'manipulation' }}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 text-white active:scale-[0.98] hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
            <span>{gameState === 'GAME_OVER' ? 'Play Again' : 'Jump'}</span>
          </button>

          <button
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              triggerFastDrop();
            }}
            style={{ touchAction: 'manipulation' }}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 active:scale-[0.98] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
            <span>Fast Drop</span>
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-right">
          Desktop: <span className="font-mono">Space / ↑</span> Jump ·{' '}
          <span className="font-mono">↓</span> Drop · <span className="font-mono">P</span> Pause
        </p>
      </div>
    </div>
  );
});
