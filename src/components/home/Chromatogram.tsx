'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface PeakDef {
  rt: number;     amp: number;    width: number;
  tail: number;   label: string;  areaPct: number;
}

const PEAKS: PeakDef[] = [
  { rt: 5.21, amp: 0.38, width: 0.42, tail: 0.7,  label: 'α-Pinene',     areaPct: 8.4 },
  { rt: 8.37, amp: 0.55, width: 0.36, tail: 0.65, label: 'Limonene',     areaPct: 12.1 },
  { rt: 10.94, amp: 0.85, width: 0.30, tail: 0.6, label: '1,8-Cineole',  areaPct: 72.3 },
  { rt: 12.10, amp: 0.12, width: 0.25, tail: 0.7, label: 'γ-Terpinene',  areaPct: 1.8 },
  { rt: 14.62, amp: 0.55, width: 0.38, tail: 0.65, label: 'Linalool',    areaPct: 34.5 },
  { rt: 16.40, amp: 0.15, width: 0.28, tail: 0.7, label: 'p-Cymene',     areaPct: 2.1 },
  { rt: 18.15, amp: 0.45, width: 0.32, tail: 0.6, label: 'Camphor',      areaPct: 4.2 },
  { rt: 21.73, amp: 0.28, width: 0.40, tail: 0.7, label: 'Bornyl Acet.', areaPct: 2.8 },
];

interface PeakMeta { quality: 'Premium' | 'Standard' | 'Trace'; match: number; color: string; }
const PEAK_META: Record<number, PeakMeta> = {};
PEAKS.forEach((p, i) => {
  const q = p.areaPct > 20 ? 'Premium' : p.areaPct > 5 ? 'Standard' : 'Trace';
  PEAK_META[i] = {
    quality: q,
    match: Math.round(85 + (p.areaPct / 72.3) * 13),
    color: q === 'Premium' ? '#4caf50' : q === 'Standard' ? '#ffb873' : 'rgba(255,255,255,0.25)',
  };
});

function emg(x: number, cx: number, amp: number, sigma: number, tau: number): number {
  const arg = (sigma * sigma) / (2 * tau * tau) - (x - cx) / tau;
  const base = (sigma / tau) * Math.sqrt(Math.PI / 2) * Math.exp(arg);
  const erfArg = ((x - cx) / sigma - sigma / tau) / Math.SQRT2;
  return amp * base * (0.5 + 0.5 * erf(erfArg));
}

function erf(z: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  z = Math.abs(z);
  const t = 1 / (1 + p * z);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
  return sign * y;
}

function rtToX(rt: number, w: number): number {
  return (rt / 25) * w;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ─── Layout proportions (fractions of canvas height) ──────
const HDR = 0.055;
const G_TOP = 0.075;
const G_BOT = 0.86;

// ─── Fluid font scale (proportional to canvas height) ─────
const FONT = (h: number, base: number) => `${Math.max(base, Math.round(h * base / 400))}px 'JetBrains Mono', monospace`;
const FONT_BOLD = (h: number, base: number) => `bold ${Math.max(base, Math.round(h * base / 400))}px 'JetBrains Mono', monospace`;

export function Chromatogram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPeak, setHoveredPeak] = useState<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const getPeakAtMouse = useCallback((mx: number, my: number, w: number, h: number) => {
    const yRange = my > h * G_TOP && my < h * (G_BOT + 0.04);
    if (!yRange) return null;
    for (let i = PEAKS.length - 1; i >= 0; i--) {
      const pk = PEAKS[i];
      const cx = rtToX(pk.rt, w);
      const px = pk.width * (w / 25) * 5;
      if (Math.abs(mx - cx) < px) return i;
    }
    return null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let frameId: number;
    let progress = 0;
    const SCAN_MS = 5000;
    let lastT = performance.now();
    let hold = 0;
    const HOLD_MS = 800;
    let phase: 'inject' | 'scan' | 'hold' | 'reset' = 'inject';
    let injectTimer = 0;
    const INJECT_MS = 600;

    function resize() {
      const cw = container!.clientWidth || 400;
      const ch = container!.clientHeight || 400;
      canvas!.width = cw * dpr;
      canvas!.height = ch * dpr;
    }
    // Force initial resize after layout settles
    resize();
    requestAnimationFrame(() => resize());

    function draw(now: number) {
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      const dt = now - lastT;
      lastT = now;

      if (phase === 'inject') {
        injectTimer += dt;
        if (injectTimer >= INJECT_MS) { phase = 'scan'; injectTimer = 0; }
      } else if (phase === 'scan') {
        progress += dt / SCAN_MS;
        if (progress >= 1) { progress = 1; phase = 'hold'; hold = 0; }
      } else if (phase === 'hold') {
        hold += dt;
        if (hold >= HOLD_MS) { phase = 'reset'; }
      } else if (phase === 'reset') {
        progress = 0; phase = 'inject';
      }

      const scanX = progress * w;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      // ─── Background ──────────────────────────────────
      ctx!.fillStyle = '#0a0908';
      ctx!.fillRect(0, 0, w, h);

      // ─── Top edge accent ─────────────────────────────
      ctx!.fillStyle = 'rgba(255,184,115,0.15)';
      ctx!.fillRect(0, 0, w, 1);

      // ─── Header ──────────────────────────────────────
      ctx!.fillStyle = 'rgba(255,255,255,0.75)';
      ctx!.font = FONT_BOLD(h, 10);
      ctx!.textAlign = 'left';
      ctx!.fillText('GC/MS Analysis', 14, h * HDR * 0.55);
      ctx!.fillStyle = 'rgba(255,255,255,0.25)';
      ctx!.font = FONT(h, 8);
      ctx!.fillText('Batch TSA-24-001', 14, h * HDR * 0.9);

      // Purity badge
      const badgeText = '99.8% Purity';
      ctx!.font = FONT_BOLD(h, 9);
      const bw = ctx!.measureText(badgeText).width + 18;
      const bh = h * HDR * 0.65;
      const by = h * HDR * 0.18;
      const bx = w - bw - 14;
      roundRect(ctx!, bx, by, bw, bh, 4);
      ctx!.fillStyle = 'rgba(76,175,80,0.1)';
      ctx!.fill();
      ctx!.fillStyle = 'rgba(76,175,80,0.85)';
      ctx!.textAlign = 'center';
      ctx!.fillText(badgeText, bx + bw / 2, by + bh * 0.6);

      // ─── Grid ──────────────────────────────────────────
      ctx!.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx!.lineWidth = 0.5;
      const nRows = 5;
      for (let row = 0; row < nRows; row++) {
        const y = h * G_TOP + ((h * (G_BOT - G_TOP)) / nRows) * row;
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(w, y); ctx!.stroke();
      }
      // vertical grid: every 2.5 min
      for (let min = 0; min <= 25; min += 2.5) {
        const x = rtToX(min, w);
        ctx!.beginPath(); ctx!.moveTo(x, h * G_TOP); ctx!.lineTo(x, h * G_BOT); ctx!.stroke();
      }

      // ─── Baseline ──────────────────────────────────────
      ctx!.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx!.lineWidth = 0.5;
      ctx!.beginPath(); ctx!.moveTo(0, h * G_BOT); ctx!.lineTo(w, h * G_BOT); ctx!.stroke();

      // ─── Peaks ──────────────────────────────────────────
      const placedLabels: { l: number; r: number; t: number; b: number }[] = [];
      for (const peak of PEAKS) {
        const cx = rtToX(peak.rt, w);
        const sigma = (peak.width / 2.355) * (w / 25);
        const tau = sigma * peak.tail;
        const isRevealed = cx <= scanX;
        const isHover = hoveredPeak === PEAKS.indexOf(peak);
        const displayAmp = peak.areaPct > 50 ? peak.amp * 0.92 : peak.amp;
        const isMajor = peak.areaPct > 5;

        const pts: { x: number; y: number }[] = [];
        const xStart = Math.max(0, cx - sigma * 5);
        const xEnd = Math.min(w, cx + sigma * 8);
        for (let x = xStart; x <= xEnd; x += 1) {
          const raw = emg(x, cx, 1, sigma, tau);
          const norm = raw / emg(cx, cx, 1, sigma, tau);
          const y = h * G_BOT - norm * displayAmp * h * (G_BOT - G_TOP) * 0.9;
          pts.push({ x, y });
        }

        const baseY = h * G_BOT;

        // Peak fill
        if (isRevealed) {
          ctx!.beginPath();
          ctx!.moveTo(pts[0].x, baseY);
          for (const p of pts) {
            if (p.x > scanX && cx <= scanX) break;
            ctx!.lineTo(p.x, p.y);
          }
          ctx!.lineTo(Math.min(scanX, pts[pts.length - 1].x), baseY);
          ctx!.closePath();
          const fillGrad = ctx!.createLinearGradient(0, h * G_TOP, 0, h * G_BOT);
          const alpha = isHover ? 0.3 : 0.15;
          fillGrad.addColorStop(0, `rgba(255,184,115,${alpha * 0.3})`);
          fillGrad.addColorStop(0.5, `rgba(255,184,115,${alpha})`);
          fillGrad.addColorStop(1, `rgba(255,184,115,${alpha * 0.05})`);
          ctx!.fillStyle = fillGrad;
          ctx!.fill();
        }

        // Peak stroke
        if (isRevealed) {
          ctx!.beginPath();
          let started = false;
          for (const p of pts) {
            if (p.x > scanX) break;
            if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
            else ctx!.lineTo(p.x, p.y);
          }
          ctx!.strokeStyle = `rgba(255,184,115,${isHover ? 0.85 : 0.5})`;
          ctx!.lineWidth = isHover ? 2 : 1.2;
          ctx!.stroke();
        }

        // ─── Option A: Integration marks at baseline ──────
        if (isRevealed && isMajor) {
          ctx!.strokeStyle = 'rgba(255,184,115,0.12)';
          ctx!.lineWidth = 1;
          ctx!.beginPath(); ctx!.moveTo(xStart, baseY); ctx!.lineTo(xStart, baseY + 4); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(xEnd, baseY); ctx!.lineTo(xEnd, baseY + 4); ctx!.stroke();
        }

        // ─── Option B: Contextual peak labels ─────────────
        if (isRevealed && scanX > cx + sigma * 7 && isMajor) {
          const apexY = pts.find(p => p.x >= cx)?.y ?? baseY;
          const midY = h * G_TOP + h * (G_BOT - G_TOP) * 0.35;
          const above = apexY > midY;
          const labelFont = FONT(h, 6);
          ctx!.font = labelFont;
          const tw = ctx!.measureText(peak.label).width;

          let labelY = above ? apexY - 5 : apexY + 16;
          const labelL = cx - tw / 2 - 4;
          const labelR = cx + tw / 2 + 4;
          const over = placedLabels.some(p => labelL < p.r && labelR > p.l);
          if (over) labelY += above ? -8 : 8;
          placedLabels.push({ l: labelL, r: labelR, t: labelY - 8, b: labelY + 8 });

          ctx!.fillStyle = 'rgba(255,255,255,0.45)';
          ctx!.font = FONT(h, 6);
          ctx!.textAlign = 'center';
          ctx!.fillText(peak.label, cx, labelY);
          ctx!.fillStyle = 'rgba(255,184,115,0.55)';
          ctx!.font = FONT_BOLD(h, 5);
          ctx!.fillText(`${peak.areaPct.toFixed(1)}%`, cx, labelY + 7);
        }

        // ─── Option C: Hover tooltip (enriched) ───────────
        if (isHover) {
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const toolW = 175;
          const toolH = 98;
          let tx = mx + 12;
          let ty = my - 10;
          if (tx + toolW > w) tx = mx - toolW - 12;
          if (ty + toolH > h) ty = h - toolH - 6;
          if (ty < 6) ty = 6;

          ctx!.fillStyle = 'rgba(0,0,0,0.3)';
          roundRect(ctx!, tx + 2, ty + 2, toolW, toolH, 4);
          ctx!.fill();

          ctx!.fillStyle = 'rgba(10,9,8,0.95)';
          ctx!.strokeStyle = 'rgba(255,184,115,0.4)';
          ctx!.lineWidth = 1;
          roundRect(ctx!, tx, ty, toolW, toolH, 4);
          ctx!.fill();
          ctx!.stroke();

          // Compound name
          ctx!.fillStyle = 'rgba(255,255,255,0.9)';
          ctx!.font = FONT_BOLD(h, 11);
          ctx!.textAlign = 'left';
          ctx!.fillText(peak.label, tx + 12, ty + 16);

          // Quality tier badge
          const meta = PEAK_META[PEAKS.indexOf(peak)];
          if (meta) {
            ctx!.fillStyle = meta.color;
            ctx!.font = FONT(h, 6);
            ctx!.textAlign = 'right';
            ctx!.fillText(meta.quality, tx + toolW - 12, ty + 14);
          }

          // RT
          ctx!.fillStyle = 'rgba(255,255,255,0.35)';
          ctx!.font = FONT(h, 9);
          ctx!.fillText(`RT  ${peak.rt.toFixed(2)} min`, tx + 12, ty + 30);

          // Area
          ctx!.fillStyle = 'rgba(255,184,115,0.95)';
          ctx!.font = FONT_BOLD(h, 11);
          ctx!.fillText(`Area  ${peak.areaPct.toFixed(1)}%`, tx + 12, ty + 46);

          // Height
          ctx!.fillStyle = 'rgba(255,255,255,0.25)';
          ctx!.font = FONT(h, 8);
          ctx!.fillText(`Height  ${(peak.amp * 100).toFixed(0)} pA`, tx + 12, ty + 59);

          // Mini abundance bar (Option C)
          const barMaxW = 100;
          const barW = Math.max(8, (peak.areaPct / 72.3) * barMaxW);
          ctx!.fillStyle = 'rgba(255,255,255,0.05)';
          ctx!.fillRect(tx + 12, ty + 67, barMaxW, 4);
          ctx!.fillStyle = 'rgba(255,184,115,0.5)';
          ctx!.fillRect(tx + 12, ty + 67, barW, 4);
          ctx!.fillStyle = 'rgba(255,255,255,0.15)';
          ctx!.font = FONT(h, 6);
          ctx!.textAlign = 'left';
          ctx!.fillText('Rel. Abundance', tx + 12, ty + 81);

          // Match factor (Option C)
          if (meta) {
            ctx!.fillStyle = 'rgba(255,255,255,0.2)';
            ctx!.font = FONT(h, 7);
            ctx!.textAlign = 'right';
            ctx!.fillText(`NIST Match  ${meta.match}%`, tx + toolW - 12, ty + 81);
          }
        }
      }

      // ─── Scan line ──────────────────────────────────────
      if (phase !== 'reset') {
        ctx!.beginPath();
        ctx!.moveTo(scanX, h * G_TOP);
        ctx!.lineTo(scanX, h * G_BOT);
        ctx!.strokeStyle = `rgba(255,184,115,${0.06 + Math.sin(now * 0.005) * 0.025})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // ─── RT tick marks ───────────────────────────────────
      const gb = h * G_BOT;
      ctx!.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx!.lineWidth = 0.5;
      for (let min = 0; min <= 25; min += 2.5) {
        const x = rtToX(min, w);
        ctx!.beginPath(); ctx!.moveTo(x, gb); ctx!.lineTo(x, gb + 3); ctx!.stroke();
      }
      ctx!.fillStyle = 'rgba(255,255,255,0.12)';
      ctx!.font = FONT(h, 5);
      ctx!.textAlign = 'center';
      for (let min = 0; min <= 25; min += 2.5) {
        ctx!.fillText(min.toFixed(1), rtToX(min, w), gb + 11);
      }

      // ─── Method line ─────────────────────────────────────
      ctx!.fillStyle = 'rgba(255,255,255,0.1)';
      ctx!.font = FONT(h, 5);
      ctx!.textAlign = 'left';
      ctx!.fillText('DB-5MS · TSA-EO-01  |  1.0µL · Split 50:1', 14, h - 6);
      ctx!.textAlign = 'right';
      ctx!.fillText(`${new Date().toLocaleDateString('en-GB')}  ·  ${PEAKS.length} compounds`, w - 14, h - 6);

      frameId = requestAnimationFrame(draw);
    }

    frameId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      const idx = getPeakAtMouse(mx, my, w, h);
      setHoveredPeak(idx);
      canvas!.style.cursor = idx !== null ? 'pointer' : 'default';
    }
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', () => setHoveredPeak(null));

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', () => setHoveredPeak(null));
    };
  }, [getPeakAtMouse]);

  return (
    <div ref={containerRef} className="w-full flex-1 min-h-[400px]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
