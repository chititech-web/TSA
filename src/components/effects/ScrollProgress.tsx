'use client';

import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed right-4 bottom-20 z-50 w-[2px] h-20 bg-[rgba(255,255,255,0.06)] cursor-pointer transition-[height] duration-100 group"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div
        className="absolute bottom-0 left-0 w-full rounded-sm transition-[height,background] duration-100 group-hover:bg-[var(--color-brand-red)]"
        style={{
          height: `${progress * 100}%`,
          background: 'var(--color-primary)',
        }}
      />
    </div>
  );
}
