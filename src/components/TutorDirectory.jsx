import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TutorCard from './TutorCard'

export default function TutorDirectory() {
  const [tutors, setTutors] = useState([])
  const [filters, setFilters] = useState({ grade: '', subject: '' })
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadTutors = async () => {
    const params = new URLSearchParams()
    if (filters.grade) params.append('grade', filters.grade)
    if (filters.subject) params.append('subject', filters.subject)
    const res = await fetch(`${baseUrl}/tutors?${params.toString()}`)
    const data = await res.json()
    setTutors(data.tutors || [])
  }

  useEffect(() => { loadTutors() }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end gap-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-blue-600 mb-1">Grade</label>
          <select className="border rounded-lg px-3 py-2" value={filters.grade} onChange={e => setFilters(f => ({ ...f, grade: e.target.value }))}>
            <option value="">All</option>
            {[8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-blue-600 mb-1">Subject</label>
          <input className="border rounded-lg px-3 py-2" placeholder="e.g. Maths" value={filters.subject} onChange={e => setFilters(f => ({ ...f, subject: e.target.value }))} />
        </div>
        <button onClick={loadTutors} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">Search</button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {tutors.map(t => (
            <motion.div
              key={t.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TutorCard tutor={t} />
            </motion.div>
          ))}
        </AnimatePresence>
        {tutors.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No tutors found yet. Add some via the API.</div>
        )}
      </motion.div>
    </section>
  )
}
