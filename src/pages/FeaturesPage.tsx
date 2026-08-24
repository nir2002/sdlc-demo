import { PageIntro } from '../components/PageIntro.tsx'

const features = [
  { emoji: '⚡', title: 'Four images in five seconds', body: 'Type, hit enter, pick your favorite.' },
  { emoji: '🎨', title: '40+ styles', body: 'Anime, oil paint, pixel art, claymation. One click to switch.' },
  { emoji: '✏️', title: 'Edit with words', body: 'Say “make it night time” and watch it happen.' },
  { emoji: '🖼️', title: '4K upscaling', body: 'Sharp enough to print and hang on your wall.' },
  { emoji: '👯', title: 'Same character, every time', body: 'Keep a face or mascot consistent across images.' },
  { emoji: '💼', title: 'Yours to use', body: 'Paid plans include a full commercial license.' },
]

export function FeaturesPage() {
  return (
    <>
      <title>Features — Dreamshot</title>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <PageIntro eyebrow="Features" title={<>Your imagination, <span className="text-gradient">on tap</span></>}>
          Everything you need to go from “what if…” to wow.
        </PageIntro>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-pink-400/40"
            >
              <span aria-hidden="true" className="text-4xl">{feature.emoji}</span>
              <h2 className="mt-5 text-xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-zinc-400">{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
