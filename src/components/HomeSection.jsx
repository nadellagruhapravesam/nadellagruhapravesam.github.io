import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ornateFrame, subhamPride } from '../assets.js'
import { event } from '../eventData.js'

export default function HomeSection() {
  const reducedMotion = useReducedMotion()
  const cardRef = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 })

  const handleMove = (pointerEvent) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const px = (pointerEvent.clientX - rect.left) / rect.width - 0.5
    const py = (pointerEvent.clientY - rect.top) / rect.height - 0.5
    x.set(py * -5)
    y.set(px * 6)
  }

  return (
    <section id="venue" className="home-section section-shell">
      <div className="content-width home-grid">
        <motion.div
          ref={cardRef}
          className="home-art-card"
          style={{ rotateX: x, rotateY: y, transformPerspective: 1100 }}
          onPointerMove={handleMove}
          onPointerLeave={() => { x.set(0); y.set(0) }}
        >
          <img src={ornateFrame} alt="" className="home-frame" aria-hidden="true" />
          <div className="house-art-window">
            <img src={subhamPride} alt="Illustration of Subham Pride" className="home-building" />
          </div>
          <span className="home-card-shine" aria-hidden="true" />
        </motion.div>

        <div className="home-copy">
          <p className="eyebrow">Our new home</p>
          <h2>{event.venueName}</h2>
          <p className="home-address">{event.address}</p>
          <div className="address-rule" aria-hidden="true"><span /></div>
          <p className="home-note">Please join us, share in our joy, and bless this home with warmth, happiness, and togetherness.</p>
          <a className="ceremonial-button inline-button" href={event.mapsUrl} target="_blank" rel="noreferrer">
            Open Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
