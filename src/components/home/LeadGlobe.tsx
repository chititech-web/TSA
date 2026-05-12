'use client';

import { useEffect, useRef } from 'react';

interface Port {
  port: string;
  lon: number;
  lat: number;
}

interface Props {
  activePort?: number;
  onReady?: (api: { setActivePort: (idx: number) => void }) => void;
}

const portsGeo: Port[] = [
  { port: 'ROTTERDAM', lon: 4.5, lat: 51.9 },
  { port: 'NEW YORK', lon: -74, lat: 40.7 },
  { port: 'SINGAPORE', lon: 103.8, lat: 1.4 },
  { port: 'DUBAI', lon: 55.3, lat: 25.2 },
  { port: 'SYDNEY', lon: 151.2, lat: -33.9 },
];

const originGeo = { lon: 78, lat: 22 };

const continents: number[][][] = [
  [[-130, 50], [-125, 48], [-120, 35], [-110, 30], [-100, 25], [-85, 25], [-80, 27], [-75, 30], [-70, 35], [-65, 40], [-60, 45], [-55, 48], [-50, 50], [-55, 55], [-60, 60], [-70, 65], [-85, 68], [-100, 70], [-115, 68], [-125, 62], [-130, 55]],
  [[-80, 10], [-75, 5], [-60, 5], [-50, 0], [-35, -5], [-35, -15], [-38, -25], [-45, -30], [-52, -35], [-58, -40], [-65, -45], [-72, -50], [-75, -53], [-72, -48], [-68, -35], [-70, -20], [-72, -10], [-75, -3], [-78, 2], [-80, 8]],
  [[-10, 36], [-10, 43], [0, 44], [5, 48], [10, 55], [15, 55], [20, 57], [25, 60], [30, 62], [35, 65], [40, 65], [42, 60], [38, 50], [32, 45], [28, 40], [22, 37], [15, 36], [5, 36], [0, 35]],
  [[-17, 35], [-17, 20], [-15, 10], [-8, 5], [0, 0], [8, -5], [12, -10], [15, -18], [20, -25], [25, -30], [30, -33], [35, -30], [38, -25], [42, -15], [46, -5], [50, 0], [50, 5], [45, 10], [40, 12], [35, 30], [30, 35], [25, 37], [15, 37], [5, 35], [0, 35]],
  [[30, 50], [35, 45], [42, 35], [48, 30], [55, 25], [60, 22], [65, 18], [70, 18], [75, 15], [80, 10], [80, 5], [85, 5], [90, 8], [95, 7], [100, 8], [105, 10], [110, 0], [115, 2], [120, 5], [125, 10], [130, 15], [135, 22], [140, 30], [145, 40], [145, 48], [140, 52], [135, 55], [130, 55], [120, 55], [110, 55], [105, 55], [95, 55], [90, 50], [80, 48], [75, 45], [70, 42], [65, 42], [60, 45], [55, 47], [50, 48], [45, 50], [40, 50], [35, 52]],
  [[68, 22], [70, 18], [72, 14], [75, 10], [78, 8], [82, 8], [85, 10], [88, 15], [88, 22], [90, 26], [88, 30], [85, 32], [80, 32], [78, 30], [75, 28], [72, 26], [70, 24]],
  [[115, -20], [120, -15], [128, -14], [135, -15], [142, -18], [148, -22], [150, -28], [148, -33], [140, -36], [130, -35], [125, -33], [120, -30], [115, -26]],
  [[-55, 60], [-48, 62], [-40, 65], [-30, 70], [-20, 76], [-22, 80], [-30, 82], [-40, 82], [-50, 80], [-55, 78], [-55, 72], [-55, 66]],
];

function lonLatTo3D(lon: number, lat: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return { x: r * Math.sin(phi) * Math.cos(theta), y: r * Math.cos(phi), z: r * Math.sin(phi) * Math.sin(theta) };
}

function rotateY(p: { x: number; y: number; z: number }, a: number) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}

export function LeadGlobe({ activePort = 0, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let frameId: number;
    let rot = 0.6;
    let speed = 0.006;
    let targetSpeed = 0.006;
    let currentPort = activePort;
    let time = 0;

    function resize() {
      const s = canvas!.clientWidth;
      canvas!.width = s * dpr;
      canvas!.height = s * dpr;
    }
    resize();

    const api = {
      setActivePort: (idx: number) => {
        currentPort = idx;
        targetSpeed = 0.025;
        setTimeout(() => { targetSpeed = 0.006; }, 1200);
      },
    };

    if (onReady) onReady(api);

    function draw() {
      const s = canvas!.clientWidth;
      if (s < 10) { frameId = requestAnimationFrame(draw); return; }

      const cx = s / 2;
      const cy = s / 2;
      const r = Math.min(cx, cy) - 6;

      speed += (targetSpeed - speed) * 0.03;
      rot += speed;
      time += 0.016;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, s, s);

      // Atmosphere glow
      const ag = ctx!.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.25);
      ag.addColorStop(0, 'rgba(100,180,255,0)');
      ag.addColorStop(0.7, 'rgba(100,180,255,0.03)');
      ag.addColorStop(1, 'rgba(100,180,255,0)');
      ctx!.fillStyle = ag;
      ctx!.beginPath();
      ctx!.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      ctx!.fill();

      // Outer ring glow
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(100,180,255,0.08)';
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Globe background
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(10,18,28,0.7)';
      ctx!.fill();
      ctx!.strokeStyle = 'rgba(100,180,255,0.06)';
      ctx!.lineWidth = 0.5;
      ctx!.stroke();

      // Continents
      continents.forEach((pts) => {
        const pp = pts.map((p) => {
          const p3d = lonLatTo3D(p[0], p[1], r);
          const pr = rotateY(p3d, rot);
          const f = r / (r + pr.z * 0.8);
          return { sx: cx + pr.x * f, sy: cy - pr.y * f, rz: pr.z };
        });
        const avgZ = pp.reduce((s, p) => s + p.rz, 0) / pp.length;
        if (avgZ <= 2) return;
        ctx!.beginPath();
        ctx!.moveTo(pp[0].sx, pp[0].sy);
        for (let i = 1; i < pp.length; i++) ctx!.lineTo(pp[i].sx, pp[i].sy);
        ctx!.closePath();
        ctx!.fillStyle = 'rgba(30,65,45,0.55)';
        ctx!.fill();
        ctx!.strokeStyle = 'rgba(100,180,100,0.25)';
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      });

      // 3D lighting — shadow on right/bottom, highlight on top/left
      const lg = ctx!.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
      lg.addColorStop(0, 'rgba(200,230,255,0.07)');
      lg.addColorStop(0.4, 'rgba(0,0,0,0)');
      lg.addColorStop(0.85, 'rgba(0,0,0,0.25)');
      lg.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx!.fillStyle = lg;
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fill();

      // Port dots
      portsGeo.forEach((p, idx) => {
        const p3d = lonLatTo3D(p.lon, p.lat, r);
        const pr = rotateY(p3d, rot);
        if (pr.z < 2) return;
        const f = r / (r + pr.z * 0.8);
        const sx = cx + pr.x * f;
        const sy = cy - pr.y * f;
        const active = idx === currentPort;

        const gr = ctx!.createRadialGradient(sx, sy, 0, sx, sy, active ? 22 : 10);
        gr.addColorStop(0, active ? 'rgba(255,184,115,0.5)' : 'rgba(200,200,200,0.15)');
        gr.addColorStop(1, 'rgba(255,184,115,0)');
        ctx!.fillStyle = gr;
        ctx!.beginPath();
        ctx!.arc(sx, sy, active ? 22 : 10, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(sx, sy, active ? 5 : 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = active ? '#ffb873' : 'rgba(180,180,180,0.4)';
        ctx!.fill();
        if (active) {
          ctx!.strokeStyle = 'rgba(255,184,115,0.6)';
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }
      });

      // Origin + route arc
      const o3d = lonLatTo3D(originGeo.lon, originGeo.lat, r);
      const oRot = rotateY(o3d, rot);
      if (oRot.z > 2) {
        const f = r / (r + oRot.z * 0.8);
        const ox = cx + oRot.x * f;
        const oy = cy - oRot.y * f;

        const gg = ctx!.createRadialGradient(ox, oy, 0, ox, oy, 14);
        gg.addColorStop(0, 'rgba(255,100,100,0.35)');
        gg.addColorStop(1, 'rgba(255,100,100,0)');
        ctx!.fillStyle = gg;
        ctx!.beginPath();
        ctx!.arc(ox, oy, 14, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(ox, oy, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255,100,100,0.7)';
        ctx!.fill();

        const dest = portsGeo[currentPort];
        const d3d = lonLatTo3D(dest.lon, dest.lat, r);
        const dRot = rotateY(d3d, rot);
        if (dRot.z > 2) {
          const df = r / (r + dRot.z * 0.8);
          const dx = cx + dRot.x * df;
          const dy = cy - dRot.y * df;
          const mx = (ox + dx) / 2;
          const my = (oy + dy) / 2;
          const ndx = dx - ox;
          const ndy = dy - oy;
          const dist = Math.sqrt(ndx * ndx + ndy * ndy);
          const nx = -ndy / (dist || 1);
          const ny = ndx / (dist || 1);
          const cpx = mx + nx * dist * 0.3;
          const cpy = my + ny * dist * 0.3;

          ctx!.beginPath();
          ctx!.moveTo(ox, oy);
          ctx!.quadraticCurveTo(cpx, cpy, dx, dy);
          ctx!.strokeStyle = 'rgba(255,184,115,0.3)';
          ctx!.lineWidth = 1;
          ctx!.setLineDash([4, 8]);
          ctx!.lineDashOffset = -time * 40;
          ctx!.stroke();
          ctx!.setLineDash([]);
          ctx!.lineDashOffset = 0;
        }
      }

      frameId = requestAnimationFrame(draw);
    }

    draw();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full block" />;
}
