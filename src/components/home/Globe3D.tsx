'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

interface Port { port: string; lon: number; lat: number }
const PORTS: Port[] = [
  { port: 'ROTTERDAM', lon: 4.5, lat: 51.9 },
  { port: 'NEW YORK', lon: -74, lat: 40.7 },
  { port: 'SINGAPORE', lon: 103.8, lat: 1.4 },
  { port: 'DUBAI', lon: 55.3, lat: 25.2 },
  { port: 'SYDNEY', lon: 151.2, lat: -33.9 },
];
const ORIGIN = { lon: 78, lat: 22 };

function geoToVec3(lon: number, lat: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = lon * Math.PI / 180;
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// ─── Procedural Earth ────────────────────────────────────
function ProceduralEarth() {
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vPosition;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }
          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec3 n = normalize(vNormal);
            vec2 uv = vec2(atan(n.z, n.x) / 6.2832 + 0.5, asin(n.y) / 3.14159 + 0.5);
            float nv = fbm(uv * 4.0 + uTime * 0.002);
            float th = 0.45;

            vec3 ocean = vec3(0.02, 0.06, 0.14);
            vec3 land = vec3(0.08, 0.18, 0.08);
            vec3 col = mix(ocean, land, smoothstep(th - 0.08, th + 0.08, nv));

            vec3 light = normalize(vec3(1.0, 0.5, 0.8));
            float diff = max(dot(n, light), 0.0) * 0.6 + 0.4;
            float spec = pow(max(dot(n, light), 0.0), 32.0) * 0.25;
            col *= diff;
            col += vec3(0.3, 0.4, 0.5) * spec;

            float rim = pow(1.0 - abs(dot(n, vec3(0.0, 0.0, 1.0))), 3.0);
            col += vec3(0.1, 0.2, 0.3) * rim * 0.2;

            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

// ─── Atmosphere ──────────────────────────────────────────
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.06, 48, 48]} />
      <meshBasicMaterial color="#64b4ff" transparent opacity={0.04} side={THREE.BackSide} />
    </mesh>
  );
}

// ─── Port dot ────────────────────────────────────────────
function PortDot({ port, active }: { port: Port; active: boolean }) {
  const pos = useMemo(() => geoToVec3(port.lon, port.lat, 1.02), [port.lon, port.lat]);

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[active ? 0.055 : 0.03, 16, 16]} />
        <meshBasicMaterial color={active ? '#ffb873' : '#888'} transparent opacity={active ? 1 : 0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.14 : 0.07, 16, 16]} />
        <meshBasicMaterial color="#ffb873" transparent opacity={active ? 0.2 : 0.04} />
      </mesh>
    </group>
  );
}

// ─── Origin + animated route ────────────────────────────
function OriginAndRoutes({ activePort }: { activePort: number }) {
  const originPos = useMemo(() => geoToVec3(ORIGIN.lon, ORIGIN.lat, 1.02), []);
  const dest = PORTS[activePort];
  const destPos = useMemo(() => geoToVec3(dest.lon, dest.lat, 1.02), [dest.lon, dest.lat]);

  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(originPos, destPos).multiplyScalar(0.5);
    mid.y += 0.8;
    return new THREE.QuadraticBezierCurve3(originPos, mid, destPos);
  }, [originPos, destPos]);

  const points = useMemo(() => curve.getPoints(60), [curve]);

  return (
    <group>
      <group position={originPos}>
        <mesh>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ff6464" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ff6464" transparent opacity={0.15} />
        </mesh>
      </group>

      <Line points={points} color="#ffb873" opacity={0.3} transparent lineWidth={1} />
    </group>
  );
}

// ─── Scene ───────────────────────────────────────────────
function GlobeScene({ activePort }: { activePort: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      <ProceduralEarth />
      <Atmosphere />
      {PORTS.map((p, i) => <PortDot key={p.port} port={p} active={i === activePort} />)}
      <OriginAndRoutes activePort={activePort} />
    </group>
  );
}

// ─── Public component ────────────────────────────────────
export function Globe3D({ activePort = 0 }: { activePort?: number }) {
  return (
    <div className="w-full h-full min-h-[180px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0.3, 2.8], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <GlobeScene activePort={activePort} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 1.6} />
      </Canvas>
    </div>
  );
}
