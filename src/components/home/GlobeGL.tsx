'use client';

import { useEffect, useRef } from 'react';

interface Port { port: string; lon: number; lat: number }
const PORTS: Port[] = [
  { port: 'ROTTERDAM', lon: 4.5, lat: 51.9 },
  { port: 'NEW YORK', lon: -74, lat: 40.7 },
  { port: 'SINGAPORE', lon: 103.8, lat: 1.4 },
  { port: 'DUBAI', lon: 55.3, lat: 25.2 },
  { port: 'SYDNEY', lon: 151.2, lat: -33.9 },
];
const ORIGIN = { lat: 22, lon: 78 };

const ARC_TEMPLATES = PORTS.map((p) => ({
  startLat: ORIGIN.lat,
  startLng: ORIGIN.lon,
  endLat: p.lat,
  endLng: p.lon,
}));

function makeArcs(activePort: number) {
  return ARC_TEMPLATES.map((a, i) => ({
    ...a,
    color: i === activePort
      ? ['#ffb873', 'rgba(255,184,115,0.1)']
      : ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.02)'],
    dashLength: i === activePort ? 0.5 : 0.8,
    dashGap: i === activePort ? 0.2 : 0.4,
    dashAnimateTime: i === activePort ? 4000 : 0,
  }));
}

function imgUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  return new URL(path, window.location.origin).href;
}

export function GlobeGL({ activePort = 0 }: { activePort?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let destroyed = false;

    (async () => {
      try {
        const mod: any = await import('globe.gl');
        const G: any = mod.default;

        if (destroyed) return;

        const w = el.clientWidth || 200;
        const h = el.clientHeight || 200;

        const globe = new G(el, { waitForGlobeReady: false });
        globe
          .width(w)
          .height(h)
          .backgroundColor('#0a0908')
          .atmosphereColor('#64b4ff')
          .atmosphereAltitude(0.18)
          .showGraticules(false)
          .globeImageUrl(imgUrl('/textures/earth/earth-albedo.jpg'))
          .bumpImageUrl(imgUrl('/textures/earth/earth-bump.jpg'));

        // Points
        globe
          .pointsData([
            ...PORTS.map((p, i) => ({
              lat: p.lat,
              lng: p.lon,
              color: i === activePort ? '#ffb873' : '#555',
              radius: i === activePort ? 1.2 : 0.4,
              label: p.port,
            })),
            {
              lat: ORIGIN.lat,
              lng: ORIGIN.lon,
              color: '#ff6464',
              radius: 0.8,
              label: 'INDIA',
            },
          ])
          .pointLat('lat')
          .pointLng('lng')
          .pointColor('color')
          .pointRadius('radius')
          .pointAltitude(0.01)
          .pointLabel('label')
          .pointsTransitionDuration(300);

        // Arcs
        globe
          .arcsData(makeArcs(activePort))
          .arcStartLat('startLat')
          .arcStartLng('startLng')
          .arcEndLat('endLat')
          .arcEndLng('endLng')
          .arcColor('color')
          .arcAltitude(0.4)
          .arcStroke(1.5)
          .arcDashLength('dashLength')
          .arcDashGap('dashGap')
          .arcDashAnimateTime('dashAnimateTime')
          .arcsTransitionDuration(300);

        // Controls — deferred retry
        const ctrl = () => {
          try {
            const c = globe.controls();
            if (!c) { setTimeout(ctrl, 100); return; }
            c.autoRotate = true;
            c.autoRotateSpeed = 0.8;
            c.enableZoom = false;
            c.enablePan = false;
            c.minPolarAngle = Math.PI / 3.5;
            c.maxPolarAngle = Math.PI / 1.6;
          } catch {
            setTimeout(ctrl, 200);
          }
        };
        setTimeout(ctrl, 200);

        globeRef.current = globe;

        const ro = new ResizeObserver(() => {
          if (containerRef.current && globeRef.current) {
            globeRef.current.width(containerRef.current.clientWidth);
            globeRef.current.height(containerRef.current.clientHeight);
          }
        });
        ro.observe(el);
        roRef.current = ro;
      } catch (err) {
        console.error('GlobeGL init failed', err);
      }
    })();

    return () => {
      destroyed = true;
      if (roRef.current) roRef.current.disconnect();
      if (globeRef.current) {
        try { globeRef.current._destructor?.(); } catch {}
      }
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe
      .pointsData([
        ...PORTS.map((p, i) => ({
          lat: p.lat,
          lng: p.lon,
          color: i === activePort ? '#ffb873' : '#555',
          radius: i === activePort ? 1.2 : 0.4,
          label: p.port,
        })),
        { lat: ORIGIN.lat, lng: ORIGIN.lon, color: '#ff6464', radius: 0.8, label: 'INDIA' },
      ]);

    globe
      .arcsData(makeArcs(activePort));
  }, [activePort]);

  return (
    <div
      ref={containerRef}
      className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden"
    />
  );
}
