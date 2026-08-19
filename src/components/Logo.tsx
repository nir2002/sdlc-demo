import { Link } from 'react-router'

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 rounded-md font-display text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-400"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400">
        <svg viewBox="0 0 32 32" className="size-5 fill-white" aria-hidden="true">
          <path d="M16 3c1 6.6 6.4 12 13 13-6.6 1-12 6.4-13 13-1-6.6-6.4-12-13-13 6.6-1 12-6.4 13-13Z" />
        </svg>
      </span>
      Dreamshot
    </Link>
  )
}
