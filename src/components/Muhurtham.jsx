import { motion, useReducedMotion } from 'framer-motion'
import { ornatePlaque } from '../assets.js'
import { event } from '../eventData.js'

const details = [
  ['Date', event.date],
  ['Day', event.day],
  ['Time', event.time],
  ['Lagnam', event.lagnam],
]

export default function Muhurtham() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="muhurtham" className="muhurtham-section section-shell">
      <div className="content-width narrow-content section-heading">
        <p className="eyebrow">Sacred Muhurtham</p>
        <h2>An auspicious beginning</h2>
        <p>We would be honoured to begin this new chapter in your presence.</p>
      </div>

      <motion.div
        className="muhurtham-plaque content-width"
        initial={reducedMotion ? false : { opacity: 0, y: 35, scale: 0.98 }}
        whileInView={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <img src={ornatePlaque} alt="" className="plaque-art" aria-hidden="true" />
        <div className="plaque-content">
          <div className="muhurtham-grid">
            {details.map(([label, value]) => (
              <div className="muhurtham-detail" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p className="telugu-line" lang="te">{event.teluguMuhurtham}</p>
        </div>
      </motion.div>
    </section>
  )
}
