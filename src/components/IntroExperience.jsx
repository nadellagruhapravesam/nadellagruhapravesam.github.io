import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { ceremonialHeader, divineBlessings, parchment } from '../assets.js'
import { PetalField } from './Decorations.jsx'

function damp(current, target, smoothing, delta) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-smoothing * delta))
}

function InvitationDoors({ opening, reducedMotion }) {
  const left = useRef()
  const right = useRef()
  const card = useRef()

  useFrame((state, delta) => {
    const openAngle = reducedMotion ? 0 : 1.24
    if (left.current && right.current) {
      left.current.rotation.y = damp(left.current.rotation.y, opening ? -openAngle : 0, 5.6, delta)
      right.current.rotation.y = damp(right.current.rotation.y, opening ? openAngle : 0, 5.6, delta)
    }
    if (card.current && !reducedMotion) {
      card.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.32) * 0.006
    }
  })

  const cardWidth = 3.2
  const cardHeight = 3.86
  const halfWidth = cardWidth / 2
  const doorWidth = cardWidth / 2

  return (
    <group ref={card}>
      <mesh position={[0, 0, -0.12]}>
        <boxGeometry args={[3.32, 3.98, 0.08]} />
        <meshStandardMaterial color="#c49131" roughness={0.34} metalness={0.66} />
      </mesh>

      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[3.18, 3.82, 0.06]} />
        <meshStandardMaterial color="#fff1cf" roughness={0.82} metalness={0.02} />
      </mesh>

      <group ref={left} position={[-halfWidth, 0, 0.02]}>
        <mesh position={[doorWidth / 2, 0, 0]} castShadow>
          <boxGeometry args={[doorWidth, cardHeight, 0.08]} />
          <meshStandardMaterial color="#7b1729" roughness={0.5} metalness={0.08} />
        </mesh>
        <mesh position={[doorWidth / 2, 0, 0.055]}>
          <planeGeometry args={[doorWidth - 0.18, cardHeight - 0.28]} />
          <meshStandardMaterial color="#f2ddb0" roughness={0.84} />
        </mesh>
        <mesh position={[doorWidth - 0.035, 0, 0.08]}>
          <boxGeometry args={[0.035, cardHeight - 0.18, 0.04]} />
          <meshStandardMaterial color="#b98428" metalness={0.64} roughness={0.3} />
        </mesh>
      </group>

      <group ref={right} position={[halfWidth, 0, 0.02]}>
        <mesh position={[-doorWidth / 2, 0, 0]} castShadow>
          <boxGeometry args={[doorWidth, cardHeight, 0.08]} />
          <meshStandardMaterial color="#7b1729" roughness={0.5} metalness={0.08} />
        </mesh>
        <mesh position={[-doorWidth / 2, 0, 0.055]}>
          <planeGeometry args={[doorWidth - 0.18, cardHeight - 0.28]} />
          <meshStandardMaterial color="#f2ddb0" roughness={0.84} />
        </mesh>
        <mesh position={[-doorWidth + 0.035, 0, 0.08]}>
          <boxGeometry args={[0.035, cardHeight - 0.18, 0.04]} />
          <meshStandardMaterial color="#b98428" metalness={0.64} roughness={0.3} />
        </mesh>
      </group>

      <mesh position={[0, -2.04, 0.06]}>
        <boxGeometry args={[3.48, 0.055, 0.1]} />
        <meshStandardMaterial color="#c7902f" metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh position={[0, 2.04, 0.06]}>
        <boxGeometry args={[3.48, 0.055, 0.1]} />
        <meshStandardMaterial color="#c7902f" metalness={0.72} roughness={0.28} />
      </mesh>
    </group>
  )
}

export default function IntroExperience({ onOpen, onComplete }) {
  const [opening, setOpening] = useState(false)
  const [doorsOpening, setDoorsOpening] = useState(false)
  const timers = useRef([])
  const reducedMotion = useReducedMotion()

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    onOpen()

    if (!reducedMotion) {
      timers.current.push(window.setTimeout(() => setDoorsOpening(true), 260))
    }
    timers.current.push(window.setTimeout(onComplete, reducedMotion ? 520 : 1750))
  }

  return (
    <div className={`intro-experience ${opening ? 'is-opening' : ''}`}>
      <img src={parchment} alt="" className="intro-parchment" aria-hidden="true" />
      <PetalField density="light" className="intro-petals" />

      <div className="intro-composition">
        <div className="intro-blessing-wrap" aria-hidden="true">
          <img src={divineBlessings} alt="" className="intro-blessing" />
        </div>

        <div className="intro-card-stage">
          <div className="intro-canvas" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 6.2], fov: 38 }} dpr={[1, 1.5]} shadows>
              <ambientLight intensity={2.15} />
              <directionalLight position={[3, 4, 5]} intensity={3.25} color="#fff0c0" castShadow />
              <pointLight position={[-3, -2, 3]} intensity={1.15} color="#dc8836" />
              <InvitationDoors opening={doorsOpening} reducedMotion={reducedMotion} />
            </Canvas>
          </div>

          <div className="intro-content-panel">
            <img src={ceremonialHeader} alt="" className="intro-ornament" />
            <p className="eyebrow" lang="te">శ్రీ గణేశాయ నమః</p>
            <h1>Nadella Family</h1>
            <p className="intro-event-name">Gruhapravesam Invitation</p>
          </div>
        </div>

        <div className="intro-actions">
          <button type="button" className="ceremonial-button intro-open" onClick={handleOpen} disabled={opening}>
            <span className="button-glow" aria-hidden="true" />
            {opening ? 'Opening...' : 'Open Invitation'}
          </button>
        </div>
      </div>
    </div>
  )
}
