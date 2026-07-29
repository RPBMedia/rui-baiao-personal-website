import { lazy, Suspense, useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import LeadershipPhilosophy from './components/LeadershipPhilosophy'
import AIEngineering from './components/AIEngineering'
import ExperienceHighlights from './components/ExperienceHighlights'
import Skills from './components/Skills'
import CareerTimeline from './components/CareerTimeline'
import CreativeSide from './components/CreativeSide'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import { Glow } from './components/ui'

// The network animation is decorative: split it out of the main bundle and
// only mount it after the page has painted and the browser is idle, so it can
// never delay first paint / LCP on slow mobile devices.
const NetworkCanvas = lazy(() => import('./components/NetworkCanvas'))

function useDeferredFx() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let idleId = 0
    let timeoutId = 0
    const start = () => {
      // Give the compositor one more breath after idle before mounting.
      timeoutId = window.setTimeout(() => setReady(true), 250)
    }
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 2000 })
      } else {
        timeoutId = window.setTimeout(start, 800)
      }
    }

    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }

    return () => {
      window.removeEventListener('load', schedule)
      if (idleId && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return ready
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)
  const fxReady = useDeferredFx()

  return (
    <div className="relative min-h-screen text-paper">

      {/*
        Fixed full-page backdrop: the continuous dark gradient + ambient glows +
        network canvas. This is a `fixed z-0` layer (NOT negative z-index): it
        stays behind the content but above nothing, so the mobile compositor
        cannot promote it in front of the page on address-bar resize. It also
        supplies the navy gradient directly (viewport-fixed) instead of relying
        on the mobile-buggy `background-attachment: fixed`.
      */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ background: 'linear-gradient(165deg, #0B1E3D 0%, #060D1C 35%, #060D1C 100%)' }}
        aria-hidden
      >
        {/* Large soft radial glows — pure gradients, no blur filters */}
        <Glow className="-top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2" alpha={0.09} />
        <Glow className="top-[55vh] right-[-12rem] h-[32rem] w-[32rem]" alpha={0.05} />
        <Glow className="bottom-[15vh] left-[-8rem] h-[28rem] w-[28rem]" alpha={0.045} />
        {/* Network topology — mounted after first paint + idle, never blocking */}
        {fxReady && (
          <Suspense fallback={null}>
            <NetworkCanvas />
          </Suspense>
        )}
      </div>

      <Nav onContact={openContact} />
      {/* Content sits above the animation layer (z-10 < header z-50). */}
      <main className="relative z-10">
        <Hero onContact={openContact} />
        <About />
        <LeadershipPhilosophy />
        <AIEngineering />
        <ExperienceHighlights />
        <Skills />
        <CareerTimeline />
        <CreativeSide />
        <Portfolio />
        <Contact onContact={openContact} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
