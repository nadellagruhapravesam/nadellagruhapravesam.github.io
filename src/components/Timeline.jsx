import { motion, useReducedMotion } from 'framer-motion'
import { diya1, diya2, diya3, diya4, lotusDivider } from '../assets.js'

const timelineItems = [
  { title: 'Gopuja', subtitle: 'A sacred beginning with prayers for peace, prosperity, and abundance', art: diya1 },
  { title: 'Gruhapravesam', subtitle: 'Entering our new home at the auspicious Sumuhurtham', art: diya2 },
  { title: 'Homam & Vratam', subtitle: 'Performing sacred rituals for peace and prosperity', art: diya3 },
  { title: 'Blessings & Lunch', subtitle: 'Celebrating together with family and friends', art: diya4 },
]

export default function Timeline() {
  const reducedMotion = useReducedMotion()
  return (
    <section id="ceremony" className="timeline-section section-shell maroon-section">
      <div className="content-width narrow-content section-heading light-heading">
        <p className="eyebrow">Ceremony</p>
        <h2>The morning’s sacred moments</h2>
      </div>
      <div className="timeline content-width">
        <div className="timeline-thread" aria-hidden="true" />
        {timelineItems.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={item.title}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.12, duration: 0.65 }}
          >
            <div className="timeline-diya-wrap">
              <img src={item.art} alt="" className="timeline-diya" aria-hidden="true" />
              <span className="timeline-number">0{index + 1}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </motion.article>
        ))}
      </div>
      <img src={lotusDivider} alt="" className="timeline-divider" aria-hidden="true" />
    </section>
  )
}
