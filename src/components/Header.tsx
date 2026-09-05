import { Link, NavLink } from 'react-router'
import { Logo } from './Logo.tsx'
import { navItems } from './navigation.ts'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/create"
          className="hidden rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 hover:brightness-110 md:block"
        >
          Start creating
        </Link>
      </div>
    </header>
  )
}
