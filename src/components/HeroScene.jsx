import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  divineBlessings,
  parents,
  subhamPride,
} from '../assets.js'
import heroBananaTreeLeft from '../assets/hero/hero-banana-tree-left.png'
import heroBananaTreeRight from '../assets/hero/hero-banana-tree-right.png'
import heroLotusBorder from '../assets/hero/hero-lotus-border.png'
import heroMangoToranam from '../assets/hero/hero-mango-toranam.png'
import heroRitualTray from '../assets/hero/hero-ritual-tray.png'
import heroStandingLampShort from '../assets/hero/hero-standing-lamp-short.png'
import heroStandingLampTall from '../assets/hero/hero-standing-lamp-tall.png'
import heroToranamConnector from '../assets/hero/hero-toranam-connector.png'
import { event } from '../eventData.js'
import { PetalField } from './Decorations.jsx'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HeroScene() {
  const heroRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const divineY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 8])
  const houseY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 28])
  const toranamY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 10])
  const treeY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 16])
  const treeBackY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 24])
  const peopleY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 10])
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 5])

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 76, damping: 22, mass: 0.8 })
  const rotateY = useSpring(rawRotateY, { stiffness: 76, damping: 22, mass: 0.8 })

  const updateTilt = (clientX, clientY, bounds) => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) return
    const px = (clientX - bounds.left) / bounds.width - 0.5
    const py = (clientY - bounds.top) / bounds.height - 0.5
    rawRotateY.set(px * 3)
    rawRotateX.set(py * -3)
  }

  useEffect(() => {
    if (reducedMotion) return undefined
    const handleOrientation = (orientationEvent) => {
      if (orientationEvent.gamma == null || orientationEvent.beta == null) return
      rawRotateY.set(Math.max(-3, Math.min(3, orientationEvent.gamma / 11)))
      rawRotateX.set(Math.max(-3, Math.min(3, (orientationEvent.beta - 45) / -18)))
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [rawRotateX, rawRotateY, reducedMotion])

  return (
    <section id="home" ref={heroRef} className="hero-section section-shell">
      <PetalField density="light" />
      <motion.div className="hero-page-toranam" style={{ y: toranamY }} aria-hidden="true">
        <img className="toranam-segment toranam-segment-left" src={heroMangoToranam} alt="" draggable="false" />
        <img className="toranam-connector" src={heroToranamConnector} alt="" draggable="false" />
        <img className="toranam-segment toranam-segment-right" src={heroMangoToranam} alt="" draggable="false" />
      </motion.div>

      <div className="hero-layout content-width">
        <div className="hero-copy">
          <p className="eyebrow hero-telugu" lang="te">శ్రీ గణేశాయ నమః</p>
          <p className="family-script">{event.family}</p>
          <h1><span>Gruhapravesam</span><span>Invitation</span></h1>
          <p className="hero-message">
            With the blessings of God and elders, we warmly invite you and your family to join us as we step into our new home.
          </p>
          <div className="hero-actions">
            <button type="button" className="ceremonial-button" onClick={() => scrollToId('muhurtham')}>
              View Muhurtham
            </button>
            <a className="outline-button" href={event.mapsUrl} target="_blank" rel="noreferrer">
              Open Location
            </a>
            <button type="button" className="text-button" onClick={() => scrollToId('rsvp')}>
              RSVP
            </button>
          </div>
          <div className="hero-date-ribbon" aria-label={`${event.date}, ${event.time}`}>
            <span>{event.date}</span>
            <i aria-hidden="true" />
            <span>{event.time}</span>
          </div>
        </div>

        <div className="hero-visual-shell">
          <motion.div
            className="hero-visual-stage"
            style={{ rotateX, rotateY, transformPerspective: 1400, transformStyle: 'preserve-3d' }}
            onPointerMove={(pointerEvent) => updateTilt(pointerEvent.clientX, pointerEvent.clientY, pointerEvent.currentTarget.getBoundingClientRect())}
            onPointerLeave={() => {
              rawRotateX.set(0)
              rawRotateY.set(0)
            }}
          >
            <div className="hero-stage-glow" aria-hidden="true" />
            <div className="hero-ground" aria-hidden="true" />
            <motion.div className="hero-divine-crop" style={{ y: divineY, z: -6 }}>
              <img
                src={divineBlessings}
                alt="Divine deities blessing the occasion"
                draggable="false"
              />
            </motion.div>
            <motion.img
              style={{ y: houseY, z: -36 }}
              src={subhamPride}
              alt="Illustration of Subham Pride, the Nadella family’s new home"
              className="hero-house"
              draggable="false"
            />
            <motion.img
              style={{ y: treeBackY, z: 2 }}
              src={heroBananaTreeLeft}
              alt=""
              className="hero-banana-tree hero-banana-tree-back hero-banana-tree-back-left"
              aria-hidden="true"
              draggable="false"
            />
            <motion.img
              style={{ y: treeBackY, z: 2 }}
              src={heroBananaTreeRight}
              alt=""
              className="hero-banana-tree hero-banana-tree-back hero-banana-tree-back-right"
              aria-hidden="true"
              draggable="false"
            />
            <motion.img
              style={{ y: treeY, z: 24 }}
              src={heroBananaTreeLeft}
              alt=""
              className="hero-banana-tree hero-banana-tree-front hero-banana-tree-left"
              aria-hidden="true"
              draggable="false"
            />
            <motion.img
              style={{ y: treeY, z: 24 }}
              src={heroBananaTreeRight}
              alt=""
              className="hero-banana-tree hero-banana-tree-front hero-banana-tree-right"
              aria-hidden="true"
              draggable="false"
            />
            <img src={heroLotusBorder} alt="" className="hero-lotus-ground" aria-hidden="true" draggable="false" />
            <motion.img
              style={{ y: peopleY, z: 50 }}
              src={parents}
              alt="Illustrated portrait of the hosts"
              className="hero-parents"
              draggable="false"
            />
            <motion.img
              style={{ y: foregroundY, z: 56 }}
              src={heroStandingLampShort}
              alt=""
              className="hero-standing-lamp hero-standing-lamp-short"
              aria-hidden="true"
              draggable="false"
            />
            <motion.img
              style={{ y: foregroundY, z: 64 }}
              src={heroStandingLampTall}
              alt=""
              className="hero-standing-lamp hero-standing-lamp-tall"
              aria-hidden="true"
              draggable="false"
            />
            <motion.img
              style={{ y: foregroundY, z: 68 }}
              src={heroRitualTray}
              alt=""
              className="hero-ritual-tray"
              aria-hidden="true"
              draggable="false"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
