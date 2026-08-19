import { Link } from 'react-router'
import { Logo } from './Logo.tsx'
import { navItems } from './navigation.ts'

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-zinc-400 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Dreamshot. Made with pixels and coffee.
        </p>
      </div>
    </footer>
  )
}
