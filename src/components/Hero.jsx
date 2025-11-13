import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4"
          >
            8th–12th • CBSE/ICSE/State Boards
          </motion.p>
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          >
            Learn from Teens who <span className="text-blue-600">excel</span>
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-gray-600 text-lg"
          >
            Atomik connects school students with high-performing peer tutors for personalised, friendly sessions in Maths, Science, English and more.
          </motion.p>
        </div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:justify-self-end"
        >
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-3 text-center">
              {['VIII','IX','X','XI','XII'].map((g, i) => (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  key={i}
                  className="rounded-xl bg-white border border-blue-100 p-4"
                >
                  <p className="text-xs text-blue-500 font-semibold">Grade</p>
                  <p className="text-2xl font-bold text-gray-900">{g}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
