'use client';

import { useHeat } from './useHeat';
import { FluidSim } from './FluidSim';

export function FluidSimManager() {
  const { heat } = useHeat();
  return <FluidSim heat={heat} />;
}
