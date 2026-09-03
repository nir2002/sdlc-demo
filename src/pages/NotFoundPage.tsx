import { Link } from 'react-router'

type NotFoundPageProps = {
  title?: string
}

export function NotFoundPage({ title = 'This page wandered off' }: NotFoundPageProps) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <title>{`${title} — Dreamshot`}</title>
      <p aria-hidden="true" className="text-7xl">🫠</p>
      <p className="mt-6 text-sm font-semibold text-pink-400">404</p>
      <h1 className="mt-2 text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg text-zinc-400">
        We couldn't find it. It's probably off somewhere generating cats.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-5 py-2.5 font-semibold text-white hover:brightness-110"
        >
          Take me home
        </Link>
        <Link to="/docs" className="rounded-full border border-white/15 px-5 py-2.5 font-semibold text-white hover:bg-white/5">
          Browse the docs
        </Link>
      </div>
    </section>
  )
}
