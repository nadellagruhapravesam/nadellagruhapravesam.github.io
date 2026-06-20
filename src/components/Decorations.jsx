import { petals } from '../assets.js'

const petalLayout = [
  [4, 11, 12, 0, 17],
  [12, 18, 15, 3, 21],
  [20, 8, 11, 7, 16],
  [28, 15, 14, 1, 24],
  [36, 5, 10, 9, 18],
  [44, 20, 13, 4, 22],
  [53, 10, 15, 6, 19],
  [61, 17, 11, 2, 25],
  [70, 6, 14, 8, 17],
  [79, 14, 12, 5, 23],
  [88, 4, 16, 10, 20],
  [95, 19, 10, 11, 26],
]

export function PetalField({ density = 'normal', className = '' }) {
  const count = density === 'light' ? 8 : petals.length
  const items = Array.from({ length: count }, (_, index) => {
    const base = petalLayout[index % petalLayout.length]
    return {
      src: petals[index % petals.length],
      left: base[0],
      delay: base[1],
      duration: base[2],
      rotation: base[3] * 17 - 65,
      size: base[4],
    }
  })

  return (
    <div className={`petal-field ${className}`} aria-hidden="true">
      {items.map((item, index) => (
        <img
          key={`${item.src}-${index}`}
          src={item.src}
          alt=""
          className="falling-petal"
          style={{
            '--petal-left': `${item.left}%`,
            '--petal-delay': `-${item.delay}s`,
            '--petal-duration': `${item.duration}s`,
            '--petal-rotation': `${item.rotation}deg`,
            '--petal-size': `${item.size}px`,
          }}
        />
      ))}
    </div>
  )
}

export function Flame({ className = '' }) {
  return <span className={`animated-flame ${className}`} aria-hidden="true" />
}
