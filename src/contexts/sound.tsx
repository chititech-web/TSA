'use client';

import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

interface SoundContextValue {
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
  popSound: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  soundOn: true,
  setSoundOn: () => {},
  popSound: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundOn, setSoundOnState] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem('tsa-heat-sound');
    if (stored === 'off') setSoundOnState(false);
  }, []);

  const actxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(soundOn);
  enabledRef.current = soundOn;

  const setSoundOn = useCallback((v: boolean) => {
    setSoundOnState(v);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tsa-heat-sound', v ? 'on' : 'off');
    }
  }, []);

  const popSound = useCallback(() => {
    if (!enabledRef.current) return;
    try {
      if (!actxRef.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        actxRef.current = new AC();
      }
      if (actxRef.current.state === 'suspended') actxRef.current.resume();
      const osc = actxRef.current.createOscillator();
      const gain = actxRef.current.createGain();
      osc.type = 'sine';
      osc.frequency.value = 1200 - Math.random() * 400;
      gain.gain.setValueAtTime(0.06, actxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actxRef.current.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(actxRef.current.destination);
      osc.start();
      osc.stop(actxRef.current.currentTime + 0.05);
    } catch {}
  }, []);

  return (
    <SoundContext.Provider value={{ soundOn, setSoundOn, popSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
