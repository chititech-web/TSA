'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { GcmsCompound } from '@/data/gcms';

// Retention time lookup (DB-5MS, 30m × 0.25mm × 0.25µm, standard ramp)
const KNOWN_RTS: Record<string, number> = {
  'α-Pinene': 5.21, 'alpha-Pinene': 5.21,
  'Camphene': 5.62,
  'β-Pinene': 6.12, 'beta-Pinene': 6.12,
  'Myrcene': 6.48,
  'δ-3-Carene': 6.82, 'delta-3-Carene': 6.82,
  'α-Terpinene': 7.12, 'alpha-Terpinene': 7.12,
  'Limonene': 7.48,
  '1,8-Cineole': 7.82,
  'γ-Terpinene': 8.22, 'gamma-Terpinene': 8.22,
  'p-Cymene': 8.52,
  'Terpinolene': 8.92,
  'Linalool': 9.52,
  'Camphor': 10.48,
  'Menthone': 11.02,
  'Menthol': 11.82,
  'Terpinen-4-ol': 12.22,
  'α-Terpineol': 12.82, 'alpha-Terpineol': 12.82,
  'Citronellal': 13.22,
  'Citral': 13.52,
  'Linalyl Acetate': 14.22,
  'Geraniol': 14.52,
  'Carvone': 14.82,
  'Bornyl Acetate': 15.12,
  'Nerol': 15.42,
  'Methyl Chavicol': 15.82,
  'Eugenol': 16.52,
  'Cinnamaldehyde': 16.82,
  'Geranyl Acetate': 17.12,
  'β-Caryophyllene': 17.52, 'beta-Caryophyllene': 17.52,
  'α-Humulene': 18.02, 'alpha-Humulene': 18.02,
  'Caryophyllene Oxide': 21.02,
  'Lauric Acid': 14.48,
  'Myristic Acid': 17.02,
  'Palmitic Acid': 19.48,
  'Linoleic Acid': 21.98,
  'Oleic Acid': 22.48,
  'Stearic Acid': 23.02,
  'Ricinoleic Acid': 22.12,
  'Petroselinic Acid': 21.82,
  'Erucic Acid': 24.02,
  'Eicosenoic Acid': 23.52,
  'Behenic Acid': 24.52,
  'Cedrene': 15.82,
  'Cedrol': 16.48,
  'Thujopsene': 14.82,
  'Menthyl Acetate': 14.02,
  'Lavandulyl Acetate': 14.42,
};

const UNKNOWN_RT_POOL = [6.8, 9.2, 11.5, 13.8, 15.5, 17.8, 19.2, 20.8, 21.5, 23.5];

function getRt(name: string, idx: number, total: number): number {
  if (KNOWN_RTS[name]) return KNOWN_RTS[name];
  if (KNOWN_RTS[name.toLowerCase()]) return KNOWN_RTS[name.toLowerCase()];
  return UNKNOWN_RT_POOL[idx % UNKNOWN_RT_POOL.length];
}

function emg(x: number, cx: number, sigma: number, tau: number): number {
  const arg = (sigma * sigma) / (2 * tau * tau) - (x - cx) / tau;
  const base = (sigma / tau) * Math.sqrt(Math.PI / 2) * Math.exp(arg);
  const erfArg = ((x - cx) / sigma - sigma / tau) / Math.SQRT2;
  return base * (0.5 + 0.5 * erf(erfArg));
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

const Y_BASELINE = 0.82;
const Y_TOP = 0.10;

export function GcmsViewer({ compounds }: { compounds: GcmsCompound[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const peaks = compounds
    .map((c, i) => ({
      ...c,
      rt: getRt(c.name, i, compounds.length),
      amp: Math.min(c.percentage / 100 * 1.2, 0.95),
    }))
    .sort((a, b) => a.rt - b.rt);

  const getPeakAtMouse = useCallback((mx: number, my: number, w: number, h: number) => {
    for (let i = peaks.length - 1; i >= 0; i--) {
      const pk = peaks[i];
      const cx = rtToX(pk.rt, w);
      const halfW = 10;
      if (Math.abs(mx - cx) < halfW && my > h * Y_TOP && my < h * Y_BASELINE + 10) {
        return i;
      }
    }
    return null;
  }, [peaks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let frameId: number;
    let progress = 0;
    const SCAN_MS = 4000;
    let lastT = performance.now();
    let hold = 0;
    const HOLD_MS = 600;
    let phase: 'inject' | 'scan' | 'hold' | 'reset' = 'inject';
    let injectTimer = 0;
    const INJECT_MS = 500;

    function resize() {
      const s = canvas!.clientWidth;
      canvas!.width = s * dpr;
      canvas!.height = (s * 0.65) * dpr;
    }
    resize();

    function draw(now: number) {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
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

      // Background
      const bgGrad = ctx!.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0f0d0a');
      bgGrad.addColorStop(0.5, '#0a0908');
      bgGrad.addColorStop(1, '#070606');
      ctx!.fillStyle = bgGrad;
      ctx!.fillRect(0, 0, w, h);

      // Grid
      ctx!.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx!.lineWidth = 0.5;
      for (let row = 0; row < 6; row++) {
        const y = h * Y_TOP + ((h * (Y_BASELINE - Y_TOP)) / 6) * row;
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(w, y); ctx!.stroke();
      }
      for (let col = 0; col <= 10; col++) {
        const x = (w / 10) * col;
        ctx!.beginPath(); ctx!.moveTo(x, h * Y_TOP); ctx!.lineTo(x, h * Y_BASELINE); ctx!.stroke();
      }

      // Y-axis label
      ctx!.fillStyle = 'rgba(255,255,255,0.06)';
      ctx!.font = '6px JetBrains Mono, monospace';
      ctx!.textAlign = 'center';
      ctx!.fillText('pA', 14, h * (Y_TOP - 0.015));

      // X-axis labels
      ctx!.fillStyle = 'rgba(255,255,255,0.08)';
      ctx!.font = '7px JetBrains Mono, monospace';
      ctx!.textAlign = 'center';
      for (let min = 0; min <= 25; min += 2.5) {
        const x = rtToX(min, w);
        ctx!.fillText(min.toFixed(1), x, h * (Y_BASELINE + 0.04));
      }
      ctx!.fillStyle = 'rgba(255,255,255,0.05)';
      ctx!.font = '6px JetBrains Mono, monospace';
      ctx!.fillText('Retention Time (min) →', w / 2, h * (Y_BASELINE + 0.085));

      // Baseline drift
      ctx!.beginPath();
      ctx!.moveTo(0, h * Y_BASELINE);
      for (let x = 0; x <= w; x += 1) {
        const drift = Math.sin(x / w * Math.PI) * h * 0.012;
        const noise = Math.sin(x * 0.12) * 1.8 + Math.sin(x * 0.28) * 0.8;
        ctx!.lineTo(x, h * Y_BASELINE + drift + noise);
      }
      ctx!.strokeStyle = 'rgba(100,180,100,0.06)';
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // Draw peaks
      for (let i = 0; i < peaks.length; i++) {
        const pk = peaks[i];
        const cx = rtToX(pk.rt, w);
        const sigma = 4.5 + (25 / compounds.length) * 1.2;
        const tau = sigma * 0.65;
        const isRevealed = cx <= scanX;
        const isHover = hoveredIdx === i;

        const pts: { x: number; y: number }[] = [];
        const xStart = Math.max(0, cx - sigma * 4);
        const xEnd = Math.min(w, cx + sigma * 7);
        for (let x = xStart; x <= xEnd; x += 1) {
          const raw = emg(x, cx, sigma, tau);
          const norm = raw / emg(cx, cx, sigma, tau);
          const y = h * Y_BASELINE - norm * pk.amp * h * (Y_BASELINE - Y_TOP) * 0.92;
          pts.push({ x, y });
        }

        const baseY = h * Y_BASELINE;

        // Fill
        if (isRevealed) {
          ctx!.beginPath();
          ctx!.moveTo(pts[0].x, baseY);
          let started = false;
          for (const p of pts) {
            if (p.x > scanX) break;
            if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
            else ctx!.lineTo(p.x, p.y);
          }
          ctx!.lineTo(Math.min(scanX, pts[pts.length - 1].x), baseY);
          ctx!.closePath();

          const fillGrad = ctx!.createLinearGradient(0, h * Y_TOP, 0, h * Y_BASELINE);
          const alpha = isHover ? 0.35 : 0.18;
          fillGrad.addColorStop(0, `rgba(255,184,115,${alpha * 0.3})`);
          fillGrad.addColorStop(0.5, `rgba(255,184,115,${alpha})`);
          fillGrad.addColorStop(1, `rgba(255,184,115,${alpha * 0.05})`);
          ctx!.fillStyle = fillGrad;
          ctx!.fill();
        }

        // Integration marks
        if (isRevealed && scanX > cx + sigma * 5) {
          const intStart = pts[0].x;
          const intEnd = Math.min(pts[pts.length - 1].x, scanX);
          ctx!.strokeStyle = `rgba(100,180,100,${isHover ? 0.5 : 0.2})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath(); ctx!.moveTo(intStart - 3, baseY + 4); ctx!.lineTo(intStart + 3, baseY - 4); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(intStart, baseY - 4); ctx!.lineTo(intStart, baseY + 4); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(intEnd - 3, baseY + 4); ctx!.lineTo(intEnd + 3, baseY - 4); ctx!.stroke();
          ctx!.beginPath(); ctx!.moveTo(intEnd, baseY - 4); ctx!.lineTo(intEnd, baseY + 4); ctx!.stroke();
        }

        // Peak line
        if (isRevealed) {
          ctx!.beginPath();
          let started = false;
          for (const p of pts) {
            if (p.x > scanX) break;
            if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
            else ctx!.lineTo(p.x, p.y);
          }
          const peakAlpha = isHover ? 0.9 : 0.5;
          ctx!.strokeStyle = `rgba(255,184,115,${peakAlpha})`;
          ctx!.lineWidth = isHover ? 2 : 1.5;
          ctx!.stroke();
        }

        // Peak annotation (once fully revealed)
        if (isRevealed && scanX > cx + sigma * 6) {
          const labelY = h * Y_TOP + 6 + (i % 2) * 14;
          const anchorX = Math.max(50, Math.min(w - 50, cx));

          // Dotted leader
          ctx!.beginPath();
          ctx!.setLineDash([2, 3]);
          const apex = pts.find(p => p.x >= cx)?.y ?? baseY;
          ctx!.moveTo(cx, apex);
          ctx!.lineTo(anchorX, labelY + 6);
          ctx!.strokeStyle = `rgba(255,184,115,${isHover ? 0.3 : 0.1})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
          ctx!.setLineDash([]);

          // Label pill
          const nameW = ctx!.measureText(pk.name).width;
          const pctW = ctx!.measureText(`${pk.percentage.toFixed(1)}%`).width;
          const pillW = Math.max(nameW, pctW) + 14;
          ctx!.fillStyle = isHover ? 'rgba(191,111,0,0.25)' : 'rgba(0,0,0,0.5)';
          ctx!.strokeStyle = isHover ? 'rgba(255,184,115,0.4)' : 'rgba(255,255,255,0.06)';
          ctx!.lineWidth = 0.5;
          const pillX = anchorX - pillW / 2;
          roundRect(ctx!, pillX, labelY, pillW, 20, 3);
          ctx!.fill();
          ctx!.stroke();

          ctx!.fillStyle = `rgba(255,255,255,${isHover ? 0.8 : 0.45})`;
          ctx!.font = '7px JetBrains Mono, monospace';
          ctx!.textAlign = 'center';
          ctx!.fillText(pk.name, anchorX, labelY + 8);

          ctx!.fillStyle = `rgba(255,184,115,${isHover ? 1 : 0.7})`;
          ctx!.font = 'bold 8px JetBrains Mono, monospace';
          ctx!.fillText(`${pk.percentage.toFixed(1)}%`, anchorX, labelY + 17);

          if (!isHover) {
            ctx!.fillStyle = 'rgba(255,255,255,0.12)';
            ctx!.font = '6px JetBrains Mono, monospace';
            ctx!.textAlign = 'center';
            ctx!.fillText(`${pk.rt.toFixed(2)}`, cx, baseY - 4);
          }
        }

        // Hover tooltip
        if (isHover) {
          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;
          const toolW = 130;
          const toolH = 50;
          let tx = mx + 12;
          let ty = my - 10;
          if (tx + toolW > w) tx = mx - toolW - 12;
          if (ty + toolH > h) ty = h - toolH - 4;
          if (ty < 4) ty = 4;

          ctx!.fillStyle = 'rgba(10,9,8,0.92)';
          ctx!.strokeStyle = 'rgba(255,184,115,0.3)';
          ctx!.lineWidth = 1;
          roundRect(ctx!, tx, ty, toolW, toolH, 4);
          ctx!.fill();
          ctx!.stroke();

          ctx!.fillStyle = 'rgba(255,255,255,0.7)';
          ctx!.font = 'bold 9px JetBrains Mono, monospace';
          ctx!.textAlign = 'left';
          ctx!.fillText(pk.name, tx + 8, ty + 14);
          ctx!.fillStyle = 'rgba(255,255,255,0.4)';
          ctx!.font = '8px JetBrains Mono, monospace';
          ctx!.fillText(`RT: ${pk.rt.toFixed(2)} min`, tx + 8, ty + 27);
          ctx!.fillStyle = 'rgba(255,184,115,0.8)';
          ctx!.font = 'bold 8px JetBrains Mono, monospace';
          ctx!.fillText(`Area: ${pk.percentage.toFixed(1)}%`, tx + 8, ty + 40);
        }
      }

      // Scan line
      if (phase !== 'reset') {
        ctx!.beginPath();
        ctx!.moveTo(scanX, h * (Y_TOP - 0.02));
        ctx!.lineTo(scanX, h * (Y_BASELINE + 0.02));
        ctx!.strokeStyle = `rgba(255,184,115,${0.1 + Math.sin(now * 0.005) * 0.04})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        const scanGlow = ctx!.createLinearGradient(scanX - 25, 0, scanX + 25, 0);
        scanGlow.addColorStop(0, 'rgba(255,184,115,0)');
        scanGlow.addColorStop(0.5, `rgba(255,184,115,${0.03 + Math.sin(now * 0.005) * 0.015})`);
        scanGlow.addColorStop(1, 'rgba(255,184,115,0)');
        ctx!.fillStyle = scanGlow;
        ctx!.fillRect(scanX - 25, h * (Y_TOP - 0.02), 50, h * (Y_BASELINE - Y_TOP + 0.04));
      }

      // Vignette
      const vig = ctx!.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.7);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, w, h);

      frameId = requestAnimationFrame(draw);
    }

    frameId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mx = (e.clientX - rect.left);
      const my = (e.clientY - rect.top);
      mouseRef.current = { x: mx, y: my };
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      const idx = getPeakAtMouse(mx, my, w, h);
      setHoveredIdx(idx);
      canvas!.style.cursor = idx !== null ? 'pointer' : 'default';
    }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas!.getBoundingClientRect();
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top;
      mouseRef.current = { x: mx, y: my };
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      const idx = getPeakAtMouse(mx, my, w, h);
      setHoveredIdx(idx);
    }
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', () => setHoveredIdx(null));

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('mouseleave', () => setHoveredIdx(null));
    };
  }, [peaks, compounds.length, getPeakAtMouse]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-xl"
      style={{ aspectRatio: '1 / 0.65' }}
    />
  );
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
