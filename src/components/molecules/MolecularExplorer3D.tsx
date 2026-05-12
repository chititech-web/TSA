'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {
  moleculeData,
  type WeightedEdge,
  ifraLimits,
} from './MoleculeData';

const MIN_RADIUS = 0.35;
const MAX_RADIUS = 0.65;

type Node3D = {
  tag: string;
  pos: THREE.Vector3;
};

function forceLayout(
  tags: string[],
  edges: WeightedEdge[],
  counts: Record<string, number>,
  iterations = 60,
): Node3D[] {
  const maxCount = Math.max(...Object.values(counts), 1);
  const pos = new Map<string, THREE.Vector3>();
  const vel = new Map<string, THREE.Vector3>();

  tags.forEach((tag, i) => {
    const angle = (2 * Math.PI * i) / tags.length;
    const r = 3 + Math.random() * 1.5;
    pos.set(
      tag,
      new THREE.Vector3(
        Math.cos(angle) * r,
        (Math.random() - 0.5) * 2.5,
        Math.sin(angle) * r,
      ),
    );
    vel.set(tag, new THREE.Vector3());
  });

  for (let iter = 0; iter < iterations; iter++) {
    const cooling = 1 - iter / iterations;
    const acc = new Map<string, THREE.Vector3>();
    tags.forEach((t) => acc.set(t, new THREE.Vector3()));

    for (let i = 0; i < tags.length; i++) {
      for (let j = i + 1; j < tags.length; j++) {
        const a = pos.get(tags[i])!;
        const b = pos.get(tags[j])!;
        const diff = new THREE.Vector3().copy(a).sub(b);
        const dist = Math.max(diff.length(), 0.5);
        const force = (8 / (dist * dist + 0.1)) * cooling;
        diff.normalize().multiplyScalar(force);
        acc.get(tags[i])!.add(diff);
        acc.get(tags[j])!.sub(diff);
      }
    }

    for (const edge of edges) {
      const pA = pos.get(edge.a);
      const pB = pos.get(edge.b);
      if (!pA || !pB) continue;
      const diff = new THREE.Vector3().copy(pB).sub(pA);
      const dist = diff.length();
      const force = dist * 0.04 * cooling;
      diff.normalize().multiplyScalar(force);
      acc.get(edge.a)!.add(diff);
      acc.get(edge.b)!.sub(diff);
    }

    tags.forEach((tag) => {
      const p = pos.get(tag)!;
      const g = new THREE.Vector3().copy(p).multiplyScalar(-0.01 * cooling);
      acc.get(tag)!.add(g);
    });

    tags.forEach((tag) => {
      const v = vel.get(tag)!;
      v.add(acc.get(tag)!);
      v.multiplyScalar(0.45);
      pos.get(tag)!.add(v);
    });
  }

  return tags.map((tag) => ({
    tag,
    pos: pos.get(tag)!,
  }));
}

// ─── Sonifier ──────────────────────────────────────────────
let audioCtx: AudioContext | null = null;
function playSonar(freq: number) {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch {
    /* silent */
  }
}

// ─── 3D Components ─────────────────────────────────────────
function MoleculeSphere({
  node3d,
  radius,
  active,
  hovered,
  color,
  onClick,
  onHover,
  onHoverEnd,
  isRestricted,
  sonifier,
}: {
  node3d: Node3D;
  radius: number;
  active: boolean;
  hovered: boolean;
  color: string;
  onClick: (tag: string) => void;
  onHover: (tag: string) => void;
  onHoverEnd: () => void;
  isRestricted: boolean;
  sonifier: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const c = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const target = active || hovered ? radius * 1.5 : radius;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
    const float = Math.sin(clock.elapsedTime * 0.8 + node3d.pos.x) * 0.08;
    ref.current.position.y = node3d.pos.y + float;

    if (glowRef.current) {
      const s = active ? 2.0 : hovered ? 1.6 : 1.0;
      glowRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, active ? 0.25 : hovered ? 0.15 : 0.05, 0.08);
    }

    if (ringRef.current) {
      ringRef.current.position.y = node3d.pos.y + float;
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.3;
      ringRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.4) * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={glowRef} position={node3d.pos}>
        <sphereGeometry args={[radius * 1.5, 24, 24]} />
        <meshBasicMaterial color={c} transparent opacity={0.05} depthWrite={false} />
      </mesh>
      <mesh
        ref={ref}
        position={node3d.pos}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onClick(node3d.tag);
        }}
        onPointerEnter={() => {
          onHover(node3d.tag);
          if (sonifier) playSonar(300 + Math.random() * 400);
        }}
        onPointerLeave={() => onHoverEnd()}
      >
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial
          color={c}
          emissive={c}
          emissiveIntensity={active || hovered ? 0.5 : 0.12}
          transparent
          opacity={0.92}
        />
      </mesh>

      {isRestricted && (
        <mesh
          ref={ringRef}
          position={[node3d.pos.x, node3d.pos.y, node3d.pos.z]}
        >
          <torusGeometry args={[radius * 1.6, 0.04, 8, 16]} />
          <meshBasicMaterial color="#F0421B" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}

function WeightedEdgeLines({
  edges,
  nodesMap,
  maxWeight,
  activeTag,
}: {
  edges: WeightedEdge[];
  nodesMap: Map<string, THREE.Vector3>;
  maxWeight: number;
  activeTag: string | null;
}) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const lineColor = new THREE.Color();

    for (const edge of edges) {
      const pA = nodesMap.get(edge.a);
      const pB = nodesMap.get(edge.b);
      if (!pA || !pB) continue;
      positions.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);

      const w = edge.weight / maxWeight;
      const alpha = 0.04 + w * 0.25;
      const isActive = activeTag === edge.a || activeTag === edge.b;
      lineColor.setHSL(0.08, 0.5, 0.3 + w * 0.4);

      for (let k = 0; k < 2; k++) {
        colors.push(lineColor.r, lineColor.g, lineColor.b, alpha * (isActive ? 3 : 1));
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    return geo;
  }, [edges, nodesMap, maxWeight, activeTag]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial vertexColors transparent depthWrite={false} />
    </lineSegments>
  );
}

// ─── Scene ──────────────────────────────────────────────────
function Scene({
  nodes,
  edges,
  maxWeight,
  counts,
  selected,
  hovered,
  onSelect,
  onHover,
  showIFRA,
  sonifier,
}: {
  nodes: Node3D[];
  edges: WeightedEdge[];
  maxWeight: number;
  counts: Record<string, number>;
  selected: string | null;
  hovered: string | null;
  onSelect: (tag: string | null) => void;
  onHover: (tag: string | null) => void;
  showIFRA: boolean;
  sonifier: boolean;
}) {
  const maxCount = Math.max(...Object.values(counts), 1);
  const nodesMap = useMemo(() => new Map(nodes.map((n) => [n.tag, n.pos])), [nodes]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={0.7} />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#BF6F00" />

      <WeightedEdgeLines
        edges={edges}
        nodesMap={nodesMap}
        maxWeight={maxWeight}
        activeTag={selected || hovered}
      />

      {nodes.map((n) => {
        const count = counts[n.tag] || 1;
        const radius = MIN_RADIUS + (count / maxCount) * (MAX_RADIUS - MIN_RADIUS);
        const ifra = ifraLimits[n.tag];
        const isRestricted = showIFRA && ifra && ifra.restriction !== 'none';
        const molColor = moleculeData[n.tag]?.color || '#888';

        return (
          <MoleculeSphere
            key={n.tag}
            node3d={n}
            radius={radius}
            active={n.tag === selected}
            hovered={n.tag === hovered}
            color={molColor}
            onClick={onSelect}
            onHover={onHover}
            onHoverEnd={() => onHover(null)}
            isRestricted={!!isRestricted}
            sonifier={sonifier}
          />
        );
      })}

      <OrbitControls
        autoRotate={!selected && !hovered}
        autoRotateSpeed={0.6}
        enableZoom
        enablePan={false}
        minDistance={4}
        maxDistance={18}
      />
    </>
  );
}

// ─── Tooltip Overlay ────────────────────────────────────────
function TooltipContent({
  node,
  mousePos,
  showIFRA,
}: {
  node: { tag: string } | null;
  mousePos: { x: number; y: number };
  showIFRA: boolean;
}) {
  if (!node) return null;
  const mol = moleculeData[node.tag];
  const ifra = ifraLimits[node.tag];
  if (!mol) return null;

  const restrictionColor =
    ifra?.restriction === 'strict'
      ? '#F0421B'
      : ifra?.restriction === 'moderate'
        ? '#D4AF37'
        : '#4caf50';

  const style: React.CSSProperties = {
    position: 'fixed',
    left: mousePos.x + 16,
    top: mousePos.y - 10,
    zIndex: 60,
    pointerEvents: 'none',
    maxWidth: 260,
  };

  return (
    <div style={style}>
      <div className="glass rounded-xl p-3 shadow-2xl">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: mol.color }}
          />
          <span className="text-xs font-bold">{mol.name}</span>
        </div>
        <p className="text-[10px] text-[var(--color-muted)] italic leading-relaxed mb-1">
          {mol.desc}
        </p>
        <p className="text-[10px] text-[var(--color-primary)] leading-relaxed">
          {mol.therapeutic}
        </p>
        {showIFRA && ifra && (
          <div
            className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-[var(--color-border)] text-[10px]"
            style={{ color: restrictionColor }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: restrictionColor }}
            />
            IFRA: {ifra.max}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────
export function MolecularExplorer3D({
  selectedMol,
  onSelectMol,
  hoveredMol,
  onHoverMol,
  moleculeCounts,
  weightedEdges,
  molTags,
  showIFRA,
  sonifierEnabled,
}: {
  selectedMol?: string | null;
  onSelectMol?: (tag: string) => void;
  hoveredMol?: string | null;
  onHoverMol?: (tag: string | null) => void;
  moleculeCounts?: Record<string, number>;
  weightedEdges?: WeightedEdge[];
  molTags?: string[];
  showIFRA?: boolean;
  sonifierEnabled?: boolean;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeTag = selectedMol ?? selected;
  const activeHover = hoveredMol ?? hovered;

  const tags = useMemo(
    () =>
      molTags ||
      Object.keys(moleculeData).filter(
        (t) => moleculeCounts && (moleculeCounts[t] || 0) > 0,
      ),
    [molTags, moleculeCounts],
  );

  const counts = useMemo(
    () =>
      moleculeCounts ||
      Object.fromEntries(tags.map((t) => [t, 1])),
    [moleculeCounts, tags],
  );

  const allEdges = useMemo(() => {
    if (weightedEdges) return weightedEdges;
    return [];
  }, [weightedEdges, tags]);

  const maxWeight = useMemo(
    () => Math.max(...allEdges.map((e) => e.weight), 1),
    [allEdges],
  );

  const nodes = useMemo(() => forceLayout(tags, allEdges, counts), [tags, allEdges, counts]);

  const handleSelect = useCallback(
    (tag: string | null) => {
      const next = tag === activeTag ? null : tag;
      if (onSelectMol && next) {
        onSelectMol(next);
      } else {
        setSelected(next);
      }
    },
    [activeTag, onSelectMol],
  );

  const handleHover = useCallback(
    (tag: string | null) => {
      if (onHoverMol) {
        onHoverMol(tag);
      } else {
        setHovered(tag);
      }
      setMousePos((prev) => prev);
    },
    [onHoverMol],
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const hoveredNode = activeHover ? { tag: activeHover } : null;

  return (
    <div
      className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-[var(--color-surface-2)]"
      onMouseMove={handleMouseMove}
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <Scene
          nodes={nodes}
          edges={allEdges}
          maxWeight={maxWeight}
          counts={counts}
          selected={activeTag}
          hovered={activeHover}
          onSelect={handleSelect}
          onHover={handleHover}
          showIFRA={!!showIFRA}
          sonifier={!!sonifierEnabled}
        />
      </Canvas>

      <TooltipContent node={hoveredNode} mousePos={mousePos} showIFRA={!!showIFRA} />
    </div>
  );
}
