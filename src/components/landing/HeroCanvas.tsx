"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Float, Html, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (state.pointer.x * 20 - particle.mx) * 0.01
      particle.my += (state.pointer.y * 20 - particle.my) * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current!.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.03, 8]} />
      <meshBasicMaterial color="#a78bfa" depthWrite={false} transparent opacity={0.3} />
    </instancedMesh>
  )
}

function FloatingResume() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Auto-rotate left and right
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * (Math.PI / 8)
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * (Math.PI / 32)
    }
  })

  // Dummy blocks for the resume
  const blocks = [
    { y: 1.2, w: 1.4, h: 0.15, c: '#4f46e5' }, // Header
    { y: 0.7, w: 0.8, h: 0.08, c: '#a1a1aa' }, // Subtitle
    { y: 0.3, w: 1.8, h: 0.04, c: '#d4d4d8' }, // Line
    { y: 0.1, w: 1.6, h: 0.04, c: '#d4d4d8' }, // Line
    { y: -0.1, w: 1.7, h: 0.04, c: '#d4d4d8' }, // Line
    { y: -0.5, w: 1.2, h: 0.1, c: '#a78bfa' }, // Heading 2
    { y: -0.8, w: 1.6, h: 0.04, c: '#d4d4d8' }, // Line
    { y: -1.0, w: 1.8, h: 0.04, c: '#d4d4d8' }, // Line
    { y: -1.2, w: 1.5, h: 0.04, c: '#d4d4d8' }, // Line
  ]

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Glass Card Base */}
        <mesh>
          <planeGeometry args={[2.8, 3.6]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.3} 
            roughness={0.1}
            metalness={0.2}
            clearcoat={1}
            transmission={0.9}
            ior={1.5}
            thickness={0.5}
          />
        </mesh>

        {/* Card Border */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[2.85, 3.65]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
        
        {/* Scan line effect over the card */}
        <ScanLine />

        {/* Resume Content Blocks */}
        <group position={[0, 0, 0.05]}>
          {blocks.map((b, i) => (
            <mesh key={i} position={[-1.0 + (b.w/2) + 0.3, b.y, 0]}>
              <planeGeometry args={[b.w, b.h]} />
              <meshBasicMaterial color={b.c} transparent opacity={0.8} />
            </mesh>
          ))}
        </group>

        {/* Holographic glowing lines around card */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[2.8, 3.6, 0.05]} />
          <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>
    </group>
  )
}

function ScanLine() {
  const lineRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime) * 1.8
      ;(lineRef.current.material as THREE.MeshBasicMaterial).opacity = (Math.sin(state.clock.elapsedTime * 4) + 1) * 0.2 + 0.2
    }
  })

  return (
    <mesh ref={lineRef} position={[0, 1.8, 0.06]}>
      <planeGeometry args={[2.7, 0.05]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
    </mesh>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }} 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
        
        {/* Scene Components */}
        <Particles count={600} />
        <FloatingResume />
        

        
        {/* Environment map for realistic reflections */}
        <Environment preset="city">
          <Lightformer form="rect" intensity={2} color="#8b5cf6" scale={[10, 5, 1]} target={[0, 0, 0]} position={[0, 0, 5]} />
        </Environment>
      </Canvas>
    </div>
  )
}
