import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TutorDirectory from './components/TutorDirectory'
import AptitudeForm from './components/AptitudeForm'
import BackgroundFX from './components/BackgroundFX'

function App() {
  const [active, setActive] = useState('students')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <BackgroundFX />
      <Navbar active={active} onChange={setActive} />
      <Hero />

      {active === 'students' ? (
        <>
          <section className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-gray-900 mb-3"
            >
              Explore Peer Tutors
            </motion.h2>
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-gray-600 mb-4"
            >
              Find top-performing students from grades 8–12 who teach subjects you want to learn.
            </motion.p>
          </section>
          <TutorDirectory />
        </>
      ) : (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <AptitudeForm />
        </section>
      )}

      <footer className="mt-16 border-t border-blue-100 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Atomik — Teen-to-Teen Learning</p>
          <p className="text-blue-600">Built for the Indian education system (Grades 8–12)</p>
        </div>
      </footer>
    </div>
  )
}

export default App