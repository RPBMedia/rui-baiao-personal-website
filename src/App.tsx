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

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Nav />
      <main>
        <Hero />
        <About />
        <LeadershipPhilosophy />
        <AIEngineering />
        <ExperienceHighlights />
        <Skills />
        <CareerTimeline />
        <CreativeSide />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
