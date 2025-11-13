import { GraduationCap, Users, Pencil } from 'lucide-react'

export default function Navbar({ active, onChange }) {
  const tabs = [
    { key: 'students', label: 'Find Tutors', icon: Users },
    { key: 'tutors', label: 'Become a Tutor', icon: Pencil },
  ]

  return (
    <header className="w-full sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="">
            <p className="text-lg font-extrabold text-blue-600 tracking-tight">Atomik</p>
            <p className="text-[10px] uppercase tracking-wider text-blue-400 -mt-1">Peer Learning</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                active === key
                  ? 'bg-blue-500 text-white border-blue-500 shadow'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
