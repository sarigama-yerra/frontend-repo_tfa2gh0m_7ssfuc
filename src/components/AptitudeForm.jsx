import { useState } from 'react'
import { motion } from 'framer-motion'

const defaultQuestions = [
  { q: 'If 3x + 5 = 11, what is x?', options: ['1', '2', '3', '4'] },
  { q: 'Synonym of "rapid"?', options: ['slow', 'quick', 'late', 'soft'] },
  { q: 'Water boils at what °C?', options: ['50', '90', '100', '120'] },
  { q: 'Which is a prime number?', options: ['9', '12', '13', '15'] },
  { q: 'SI unit of force?', options: ['Joule', 'Pascal', 'Watt', 'Newton'] },
]

export default function AptitudeForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', grade: 10, subjects: '', motivation: '' })
  const [answers, setAnswers] = useState(Array(defaultQuestions.length).fill(null))
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        grade: Number(form.grade),
        subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean),
        motivation: form.motivation || undefined,
        answers: answers.map(a => Number(a)),
      }
      const res = await fetch(`${baseUrl}/aptitude/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Submission failed')
      setResult(data)
      onSubmitted && onSubmitted(data)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-gray-900">Aptitude Test — Become a Tutor</h3>
      <p className="text-sm text-gray-600 mb-4">Answer 5 quick questions to qualify. Min grade 8, max 12.</p>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} required />
          <input className="border rounded-lg px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={e => update('email', e.target.value)} required />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <select className="border rounded-lg px-3 py-2" value={form.grade} onChange={e => update('grade', e.target.value)} required>
            {[8,9,10,11,12].map(g => <option key={g} value={g}>Grade {g}</option>)}
          </select>
          <input className="border rounded-lg px-3 py-2" placeholder="Subjects you can teach (comma separated)" value={form.subjects} onChange={e => update('subjects', e.target.value)} required />
        </div>
        <textarea className="border rounded-lg px-3 py-2 w-full" rows={3} placeholder="Why do you want to teach? (optional)" value={form.motivation} onChange={e => update('motivation', e.target.value)} />

        <div className="space-y-4">
          {defaultQuestions.map((q, idx) => (
            <div key={idx} className="">
              <p className="font-medium text-gray-800">Q{idx+1}. {q.q}</p>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                {q.options.map((opt, i) => (
                  <label key={i} className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${answers[idx] === i+1 ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200 hover:border-blue-200'}`}>
                    <input type="radio" name={`q-${idx}`} className="hidden" value={i+1} onChange={() => setAnswers(prev => { const n=[...prev]; n[idx]=i+1; return n })} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {loading ? 'Submitting...' : 'Submit & Apply'}
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-blue-800"
          >
            <p className="font-semibold">Score: {result.score}/5</p>
            <p>Status: {result.status}</p>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
