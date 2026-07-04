import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import LeadershipPhilosophy from './components/LeadershipPhilosophy'
import AIEngineering from './components/AIEngineering'
import ExperienceHighlights from './components/ExperienceHighlights'
import Skills from './components/Skills'
import CareerTimeline from './components/CareerTimeline'
import CreativeSide from './components/CreativeSide'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import NetworkCanvas from './components/NetworkCanvas'

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)

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
        {/* Large soft radial glow blobs */}
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />
        <div className="absolute top-[55vh] right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-accent/[0.04] blur-[110px]" />
        <div className="absolute bottom-[15vh] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-accent/[0.035] blur-[100px]" />
        {/* Network topology — persists through all scroll positions */}
        <NetworkCanvas />
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
        <Contact onContact={openContact} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
