import { motion, useReducedMotion } from 'framer-motion'
import { divineBlessings } from '../assets.js'

export default function Blessings() {
  const reducedMotion = useReducedMotion()
  return (
    <section className="blessings-section section-shell">
      <div className="golden-rays" aria-hidden="true" />
      <motion.div
        className="blessings-inner content-width"
        initial={reducedMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
      >
        <div className="blessing-figure-shell">
          <img src={divineBlessings} alt="Divine blessings" className="blessing-banner" />
        </div>
        <div className="blessing-copy">
          <h2>Your presence and blessings mean the world to us.</h2>
        </div>
      </motion.div>
    </section>
  )
}
