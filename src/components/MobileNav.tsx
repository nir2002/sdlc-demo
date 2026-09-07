import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router'
import { useFocusTrap } from '../hooks/useFocusTrap.ts'
import { useScrollLock } from '../hooks/useScrollLock.ts'
import { Logo } from './Logo.tsx'
import { navItems } from './navigation.ts'

// Matches Tailwind's `md` breakpoint, where the desktop nav takes over.
const DESKTOP_QUERY = '(min-width: 48rem)'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const drawerId = useId()
  const location = useLocation()
  const [locationKey, setLocationKey] = useState(location.key)

  // Close whenever the route changes, including taps on links inside the drawer.
  if (location.key !== locationKey) {
    setLocationKey(location.key)
    setOpen(false)
  }

  useFocusTrap(drawerRef, open)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const desktop = window.matchMedia(DESKTOP_QUERY)
    const close = () => setOpen(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleBreakpoint)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleBreakpoint)
    }
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-fuchsia-400"
      >
        <span className="sr-only">Open menu</span>
        <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {/* Portaled so the sticky header's backdrop blur can't become the drawer's containing block. */}
      {createPortal(
        <>
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:hidden ${
              open ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />

          <div
            ref={drawerRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            inert={!open}
            // Visibility flips instantly on open (so focus can move in) but waits for the slide-out on close.
            className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-white/10 bg-zinc-900 shadow-2xl duration-300 ease-out motion-reduce:transition-none md:hidden ${
              open
                ? 'visible translate-x-0 transition-[translate]'
                : 'invisible translate-x-full transition-[translate,visibility]'
            }`}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-fuchsia-400"
              >
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3 font-display text-2xl font-semibold ${
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

            <div className="border-t border-white/10 p-4">
              <Link
                to="/create"
                className="block rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-4 py-3 text-center font-semibold text-white hover:brightness-110"
              >
                Start creating
              </Link>
            </div>
          </div>
        </>,
        document.body,
      )}
    </div>
  )
}
