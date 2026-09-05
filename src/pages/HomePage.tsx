import { Link } from 'react-router'

type Shot = {
  prompt: string
  image: string
  gradient: string
}

// Static samples so the homepage never waits on the image API.
const shots: Shot[] = [
  { prompt: 'A corgi astronaut eating ramen on the moon', image: '/gallery/corgi-astronaut.jpg', gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
  { prompt: 'Tiny dragon asleep in a teacup', image: '/gallery/teacup-dragon.jpg', gradient: 'from-emerald-400 via-teal-500 to-cyan-600' },
  { prompt: 'Neon Tokyo street in the rain, synthwave', image: '/gallery/neon-tokyo.jpg', gradient: 'from-fuchsia-600 via-violet-600 to-blue-600' },
  { prompt: 'A cat DJ at a sunset beach party', image: '/gallery/cat-dj.jpg', gradient: 'from-orange-400 via-rose-500 to-fuchsia-600' },
  { prompt: 'Cozy cabin inside a snow globe', image: '/gallery/snow-globe-cabin.jpg', gradient: 'from-sky-300 via-blue-500 to-indigo-700' },
  { prompt: 'A pizza planet with pepperoni moons', image: '/gallery/pizza-planet.jpg', gradient: 'from-yellow-300 via-orange-500 to-red-600' },
]

export function HomePage() {
  return (
    <>
      <title>Dreamshot — Type a thought. Get a picture.</title>

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-[-10rem] left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-600/40 via-pink-500/30 to-orange-400/20 blur-3xl"
        />
        <div className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
            ✨ New: 4K upscaling on every plan
          </p>
          <h1 className="mt-8 text-5xl leading-[1.05] font-bold sm:text-7xl">
            Type a thought.
            <br />
            <span className="text-gradient">Get a picture.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
            Dreamshot turns any sentence into a stunning image in seconds. No
            design skills required. Weird ideas encouraged.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/create"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 hover:brightness-110"
            >
              Start creating, it's free
            </Link>
            <Link
              to="/docs"
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:bg-white/5"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <h2 className="text-center text-sm font-medium text-zinc-500">
          Made with Dreamshot this week. Tap one to try the prompt.
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {shots.map((shot) => (
            <li key={shot.prompt}>
              <Link
                to="/create"
                state={{ prompt: shot.prompt }}
                className={`group relative block aspect-square overflow-hidden rounded-3xl bg-gradient-to-br ${shot.gradient}`}
              >
                <img
                  src={shot.image}
                  alt={shot.prompt}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <p className="absolute inset-x-3 bottom-3 rounded-2xl bg-black/50 px-3 py-2 text-xs text-white backdrop-blur-md sm:text-sm">
                  “{shot.prompt}”
                  <span className="hidden font-semibold text-pink-300 group-hover:inline"> Try it →</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
