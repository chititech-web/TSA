'use client';

import { useEffect, useRef } from 'react';
import { useSound } from '@/contexts/sound';

interface Bubble {
  x: number; y: number;
  radius: number;
  baseRadius: number;
  speed: number;
  wobbleAmp: number;
  wobbleFreq: number;
  phase: number;
  alpha: number;
  sparkle: number;
  sparkleShow: number;
  popped: boolean;
}

interface Burst {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  alpha: number;
  life: number;
  decay: number;
  hue: number;
}

const palette = ['#5C3317','#D4AF37','#FFF8DC','#8B4513','#CD853F','#DEB887','#B8860B','#D2691E','#A0522D'];

export function FluidSim({ heat = 40 }: { heat?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatRef = useRef(heat);
  heatRef.current = heat;
  const { popSound } = useSound();
  const popSoundRef = useRef(popSound);
  popSoundRef.current = popSound;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let w = 0, h = 0, dpr = 1;
    let time = 0, last = 0;
    let mouseX = -100, mouseY = -100;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string; baseAlpha: number; alpha: number; phase: number; }[] = [];
    const bubbles: Bubble[] = [];
    const bursts: Burst[] = [];

    let heroSection = document.querySelector<HTMLElement>('[data-hero]');

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      heroSection = document.querySelector<HTMLElement>('[data-hero]');
    }

    function mkParticle() {
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
        radius: 24 + Math.random() * 64,
        color: palette[Math.floor(Math.random() * palette.length)],
        baseAlpha: 0.03 + Math.random() * 0.06,
        alpha: 0.03 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function mkBubble(fromBottom: boolean): Bubble {
      const r = 2 + Math.random() * 5;
      return {
        x: 10 + Math.random() * (w - 20),
        y: fromBottom ? h + 3 + Math.random() * 12 : h * (0.2 + Math.random() * 0.7),
        radius: r, baseRadius: r,
        speed: 0.8 + Math.random() * 1.6,
        wobbleAmp: 0.15 + Math.random() * 0.4,
        wobbleFreq: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.25,
        sparkle: Math.random() * 600,
        sparkleShow: 0,
        popped: false,
      };
    }

    function popBubble(b: Bubble) {
      b.popped = true;
      const n = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 / n) * i + (Math.random() - 0.5) * 0.5;
        const sp = 1 + Math.random() * 3;
        bursts.push({
          x: b.x, y: b.y,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.5,
          radius: 1.5 + Math.random() * 3.5,
          alpha: 1, life: 1, decay: 0.015 + Math.random() * 0.025,
          hue: 30 + Math.random() * 20,
        });
      }
    }

    function getPopThreshold() {
      if (heroSection) {
        const r = heroSection.getBoundingClientRect();
        if (r.bottom > 10) return r.bottom;
      }
      return h * 0.05;
    }

    function update(dt: number) {
      if (!ctx || !w || !h) return;
      ctx.clearRect(0, 0, w * dpr, h * dpr);

      const t = time;
      const hVal = heatRef.current;
      const heatMul = 0.2 + (hVal / 100) * 2.8;
      const popThreshold = getPopThreshold();

      // Fluid particles (40 warm blobs)
      for (const p of particles) {
        p.x += p.vx + Math.sin(t + p.phase) * 0.25;
        p.y += p.vy + Math.cos(t * 0.7 + p.phase) * 0.25;
        if (p.x < -150) p.x = w + 150;
        if (p.x > w + 150) p.x = -150;
        if (p.y < -150) p.y = h + 150;
        if (p.y > h + 150) p.y = -150;
        if (p.alpha < 0.001) continue;

        const g = ctx.createRadialGradient(p.x * dpr, p.y * dpr, 0, p.x * dpr, p.y * dpr, p.radius * dpr);
        g.addColorStop(0, p.color);
        g.addColorStop(1, 'transparent');
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x * dpr, p.y * dpr, p.radius * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bubbles — rise from bottom, pop at hero threshold
      for (let j = 0; j < bubbles.length; j++) {
        const b = bubbles[j];
        if (b.popped) continue;

        b.y -= b.speed * dt * 0.06 * heatMul;
        b.x += Math.sin(t * b.wobbleFreq * 12 + b.phase) * b.wobbleAmp * dt * 0.02;

        // Grow as they rise
        const risePct = 1 - Math.max(0, b.y / h);
        b.radius = b.baseRadius * (1 + risePct * 3);

        // Sparkle timer
        b.sparkle -= dt * 1000;
        if (b.sparkle <= 0) { b.sparkle = 200 + Math.random() * 800; b.sparkleShow = 1; }
        b.sparkleShow *= 0.92;

        // Hover pop
        const dx = b.x - mouseX, dy = b.y - mouseY;
        if (dx * dx + dy * dy < b.radius * b.radius * 2.2) {
          popBubble(b);
          popSoundRef.current();
          bubbles[j] = mkBubble(true);
          continue;
        }

        // Pop at hero section bottom (v2 behaviour)
        if (b.y < popThreshold) {
          popBubble(b);
          bubbles[j] = mkBubble(true);
          continue;
        }

        // Wrap horizontally
        if (b.x < -30 || b.x > w + 30) {
          b.x = 10 + Math.random() * (w - 20);
          b.y = h + 3 + Math.random() * 12;
        }

        const bx = b.x * dpr, by = b.y * dpr, br = b.radius * dpr;

        // Outer glow
        const og = ctx.createRadialGradient(bx, by, 0, bx, by, br * 1.3);
        og.addColorStop(0, 'rgba(255,248,230,0.08)');
        og.addColorStop(1, 'transparent');
        ctx.globalAlpha = 1;
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(bx, by, br * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Body
        const bg = ctx.createRadialGradient(bx - br * 0.3, by - br * 0.3, 0, bx, by, br);
        bg.addColorStop(0, `rgba(255,248,235,${b.alpha * 0.5})`);
        bg.addColorStop(0.4, `rgba(240,225,200,${b.alpha * 0.25})`);
        bg.addColorStop(1, 'rgba(200,180,160,0)');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();

        // Rim
        ctx.strokeStyle = `rgba(255,248,235,${b.alpha * 0.35})`;
        ctx.lineWidth = Math.max(1, 1.0 * dpr);
        ctx.beginPath();
        ctx.arc(bx, by, br * 0.92, 0, Math.PI * 2);
        ctx.stroke();

        // Specular highlight
        ctx.fillStyle = `rgba(255,255,255,${b.alpha * 0.45})`;
        ctx.beginPath();
        ctx.arc(bx - br * 0.22, by - br * 0.22, br * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Sparkle
        if (b.sparkleShow > 0.01) {
          ctx.fillStyle = `rgba(255,255,245,${b.sparkleShow * 0.7})`;
          ctx.beginPath();
          ctx.arc(bx - br * 0.15, by - br * 0.35, br * 0.06, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(255,255,245,${b.sparkleShow * 0.4})`;
          ctx.beginPath();
          ctx.arc(bx - br * 0.1, by - br * 0.4, br * 0.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Burst particles
      for (let k = bursts.length - 1; k >= 0; k--) {
        const bp = bursts[k];
        bp.x += bp.vx * dt * 0.06;
        bp.y += bp.vy * dt * 0.06;
        bp.vy += 0.06 * dt * 0.06;
        bp.alpha -= bp.decay * dt * 0.06;
        bp.life -= bp.decay * dt * 0.06;
        if (bp.life <= 0) { bursts.splice(k, 1); continue; }
        ctx.globalAlpha = bp.alpha;
        ctx.fillStyle = `hsl(${bp.hue}, 50%, 70%)`;
        ctx.beginPath();
        ctx.arc(bp.x * dpr, bp.y * dpr, bp.radius * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Heat-based bubble count
      const target = Math.round(5 + (hVal / 100) * 55);
      for (let a = bubbles.filter(b => !b.popped).length; a < target; a++) {
        bubbles.push(mkBubble(true));
      }
      while (bubbles.length > target + 5) {
        const idx = bubbles.findIndex(b => !b.popped);
        if (idx >= 0) bubbles.splice(idx, 1); else break;
      }
    }

    function loop(ts: number) {
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;
      time += dt * 0.001;
      if (dt < 100) update(dt);
      animId = requestAnimationFrame(loop);
    }

    resize();
    for (let i = 0; i < 40; i++) particles.push(mkParticle());
    for (let i = 0; i < 35; i++) bubbles.push(mkBubble(true));

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) { mouseX = t.clientX; mouseY = t.clientY; } };

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouse);
    document.addEventListener('touchmove', onTouch, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
