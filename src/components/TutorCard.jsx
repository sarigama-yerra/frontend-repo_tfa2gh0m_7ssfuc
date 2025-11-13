import { motion } from 'framer-motion'

export default function TutorCard({ tutor }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-200 to-cyan-200"
    >
      <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{tutor.name}</h3>
            <p className="text-sm text-gray-600">Grades {tutor.grade_levels?.join(', ')} • {tutor.subjects?.join(', ')}</p>
          </div>
          {typeof tutor.rating === 'number' && (
            <div className="text-sm font-semibold text-blue-600">★ {tutor.rating.toFixed(1)}</div>
          )}
        </div>
        {tutor.bio && <p className="mt-3 text-gray-700 text-sm">{tutor.bio}</p>}
      </div>
    </motion.div>
  )
}
