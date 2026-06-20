import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import HeroScene from './components/HeroScene.jsx'
import Muhurtham from './components/Muhurtham.jsx'
import Timeline from './components/Timeline.jsx'
import HomeSection from './components/HomeSection.jsx'
import Blessings from './components/Blessings.jsx'
import RSVP from './components/RSVP.jsx'
import MusicControl from './components/MusicControl.jsx'
import { floralGarland } from './assets.js'
import { event } from './eventData.js'

const IntroExperience = lazy(() => import('./components/IntroExperience.jsx'))
const MUSIC_VOLUME = 0.18
const MUSIC_FADE_DURATION = 2000
const MUSIC_SOURCE = '/audio/background-music.m4a'
const clampMusicVolume = (volume) => Math.min(Math.max(volume, 0), MUSIC_VOLUME)

export default function App() {
  const [introVisible, setIntroVisible] = useState(true)
  const [hasEntered, setHasEntered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef(null)
  const fadeFrameRef = useRef(null)

  const stopFade = () => {
    if (fadeFrameRef.current) {
      window.cancelAnimationFrame(fadeFrameRef.current)
      fadeFrameRef.current = null
    }
  }

  const fadeVolume = (targetVolume, duration = MUSIC_FADE_DURATION) => {
    const audio = audioRef.current
    if (!audio) return

    stopFade()
    const startVolume = audio.volume
    const startedAt = window.performance.now()

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1)
      audio.volume = clampMusicVolume(startVolume + ((targetVolume - startVolume) * progress))

      if (progress < 1) {
        fadeFrameRef.current = window.requestAnimationFrame(tick)
        return
      }

      audio.volume = clampMusicVolume(targetVolume)
      fadeFrameRef.current = null
    }

    fadeFrameRef.current = window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined
    audio.volume = MUSIC_VOLUME
    audio.loop = true
    return () => {
      stopFade()
      audio.pause()
    }
  }, [])


  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    root.classList.toggle('intro-scroll-locked', introVisible)
    body.classList.toggle('intro-scroll-locked', introVisible)

    return () => {
      root.classList.remove('intro-scroll-locked')
      body.classList.remove('intro-scroll-locked')
    }
  }, [introVisible])
  const beginExperience = async () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    setHasEntered(true)

    // Start both privileged actions directly inside the same user gesture.
    const audio = audioRef.current
    if (audio) {
      stopFade()
      audio.volume = 0
    }
    const playPromise = audio?.play()
    const orientationApi = window.DeviceOrientationEvent
    const permissionPromise = typeof orientationApi?.requestPermission === 'function'
      ? orientationApi.requestPermission()
      : Promise.resolve('not-required')

    try {
      if (!audio) throw new Error('Background audio element is not available.')
      await playPromise
      setIsMuted(false)
      setIsPlaying(true)
      fadeVolume(MUSIC_VOLUME)
    } catch {
      setIsMuted(true)
      setIsPlaying(false)
    }

    try {
      await permissionPromise
    } catch {
      // Touch, pointer, and scroll parallax remain available without sensor access.
    }
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        stopFade()
        audio.volume = MUSIC_VOLUME
        await audio.play()
        setIsMuted(false)
        setIsPlaying(true)
      } catch {
        setIsMuted(true)
        setIsPlaying(false)
      }
    } else {
      stopFade()
      audio.pause()
      setIsMuted(true)
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SOURCE} loop preload="auto" playsInline />
      {introVisible && (
        <Suspense fallback={<div className="intro-loading-fallback">Preparing the invitation...</div>}>
          <IntroExperience onOpen={beginExperience} onComplete={() => setIntroVisible(false)} />
        </Suspense>
      )}

      <main className={introVisible ? 'page-is-covered' : ''}>
        <HeroScene />
        <Muhurtham />
        <Timeline />
        <HomeSection />
        <Blessings />
        <RSVP />
      </main>

      <footer className="site-footer">
        <img src={floralGarland} alt="" aria-hidden="true" />
        <p className="footer-family">{event.family}</p>
        <p>{event.venueName}, Hyderabad</p>
        <strong lang="te">ధన్యవాదాలు</strong>
      </footer>

      {hasEntered && (
        <MusicControl isMuted={isMuted} isPlaying={isPlaying} onToggleMusic={toggleMusic} />
      )}
    </>
  )
}
