'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface HeatCtx {
  heat: number;
  setHeat: (v: number) => void;
}

const HeatContext = createContext<HeatCtx>({ heat: 40, setHeat: () => {} });

export function HeatProvider({ children }: { children: ReactNode }) {
  const [heat, setHeat] = useState(40);

  useEffect(() => {
    const glowIntensity = Math.min(1, heat / 80);
    document.documentElement.style.setProperty(
      '--watermark-glow',
      `0 0 ${glowIntensity * 40}px rgba(191, 111, 0, ${glowIntensity * 0.25})`,
    );
    document.documentElement.style.setProperty(
      '--watermark-opacity',
      String(Math.min(0.4, heat / 200)),
    );
    document.documentElement.style.setProperty(
      '--heat-haze',
      heat > 60 ? 'url(#heatHaze)' : 'none',
    );
  }, [heat]);

  return (
    <HeatContext.Provider value={{ heat, setHeat }}>
      {children}
    </HeatContext.Provider>
  );
}

export const useHeat = () => useContext(HeatContext);
