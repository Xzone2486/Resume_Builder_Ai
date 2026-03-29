"use client"

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { forwardRef, useRef, useMemo, useLayoutEffect } from 'react'
import * as THREE from 'three'
import dynamic from 'next/dynamic'

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  hex = hex.replace('#', '')
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ]
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd     = noise(gl_FragCoord.xy);
  vec2  uv      = rotateUvs(vUv * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.04 * sin(6.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  // Blend between 3 pastels based on pattern & position
  float t1 = 0.5 + 0.5 * sin(pattern * 3.14159 + uTime * uSpeed * 0.3);
  float t2 = 0.5 + 0.5 * cos(vUv.x * 2.5 + uTime * uSpeed * 0.2);

  vec3 col = mix(uColor1, uColor2, t1);
  col = mix(col, uColor3, t2 * 0.5);

  // Apply pattern brightness modulation
  col *= (0.85 + 0.15 * pattern);

  // Subtle noise dithering
  col -= rnd / 20.0 * uNoiseIntensity;

  // Keep it bright/pastel: blend toward white
  col = mix(col, vec3(1.0), 0.35);
  col = clamp(col, 0.0, 1.0);

  gl_FragColor = vec4(col, 1.0);
}
`

interface SilkPlaneProps {
  uniforms: Record<string, THREE.IUniform>
}

const SilkPlane = forwardRef<THREE.Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree()
  const meshRef = ref as React.MutableRefObject<THREE.Mesh>

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1)
    }
  }, [meshRef, viewport])

  useFrame((_, delta) => {
    if (meshRef.current) {
      ;(meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value += 0.1 * delta
    }
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
})
SilkPlane.displayName = 'SilkPlane'

interface SilkSceneProps {
  speed?: number
  scale?: number
  color1?: string
  color2?: string
  color3?: string
  noiseIntensity?: number
  rotation?: number
}

function SilkScene({
  speed = 3,
  scale = 1.2,
  color1 = '#c4b5fd',  // violet-300
  color2 = '#93c5fd',  // blue-300
  color3 = '#6ee7b7',  // emerald-300
  noiseIntensity = 1.2,
  rotation = 0.3,
}: SilkSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor1: { value: new THREE.Color(...hexToNormalizedRGB(color1)) },
      uColor2: { value: new THREE.Color(...hexToNormalizedRGB(color2)) },
      uColor3: { value: new THREE.Color(...hexToNormalizedRGB(color3)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [speed, scale, noiseIntensity, color1, color2, color3, rotation]
  )

  return <SilkPlane ref={meshRef} uniforms={uniforms} />
}

function SilkBackground(props: SilkSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: false, alpha: false }}
    >
      <SilkScene {...props} />
    </Canvas>
  )
}

// Dynamic import to avoid SSR issues
export default dynamic(() => Promise.resolve(SilkBackground), { ssr: false })
