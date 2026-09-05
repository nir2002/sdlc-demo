import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { useLocation } from 'react-router'
import { PageIntro } from '../components/PageIntro.tsx'
import { PaintingPlaceholder, ResultImage } from '../components/ResultImage.tsx'
import {
  aspects,
  generateImages,
  styles,
  surprisePrompts,
  type AspectId,
  type StyleId,
} from '../lib/imageGen.ts'

// Two per click keeps a tier-1 OpenAI account under its 5 images per minute.
const BATCH_SIZE = 2

type Run = {
  prompt: string
  aspect: AspectId
  images: string[]
}

export function CreatePage() {
  const location = useLocation()
  const promptFromLink = (location.state as { prompt?: string } | null)?.prompt ?? ''

  const [prompt, setPrompt] = useState(promptFromLink)
  const [styleId, setStyleId] = useState<StyleId>('none')
  const [aspect, setAspect] = useState<AspectId>('square')
  const [pending, setPending] = useState<Run | null>(null)
  const [result, setResult] = useState<Run | null>(null)
  const [error, setError] = useState<string | null>(null)

  const trimmed = prompt.trim()

  async function generate(event?: FormEvent) {
    event?.preventDefault()
    if (!trimmed || pending) return

    const run: Run = { prompt: trimmed, aspect, images: [] }
    setPending(run)
    setError(null)
    try {
      const images = await generateImages({ prompt: trimmed, styleId, aspect, count: BATCH_SIZE })
      setResult({ ...run, images })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setPending(null)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) generate()
  }

  function surpriseMe() {
    const index = Math.floor(Math.random() * surprisePrompts.length)
    // Never "surprise" with the prompt that's already there.
    const next = surprisePrompts[index] === prompt ? (index + 1) % surprisePrompts.length : index
    setPrompt(surprisePrompts[next])
  }

  const shown = pending ?? result
  const gridClass = shown?.aspect === 'portrait' ? 'grid-cols-2' : 'sm:grid-cols-2'

  return (
    <>
      <title>Create — Dreamshot</title>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <PageIntro eyebrow="Create" title={<>What do you <span className="text-gradient">want to see?</span></>} />

        <form
          onSubmit={generate}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-4 focus-within:border-pink-400/50 sm:p-6"
        >
          <label htmlFor="prompt" className="sr-only">
            Describe your image
          </label>
          <textarea
            id="prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="A corgi astronaut eating ramen on the moon"
            className="w-full resize-none bg-transparent text-lg text-white placeholder:text-zinc-500 focus:outline-none"
          />

          <div role="group" aria-label="Style" className="mt-4 flex flex-wrap gap-2">
            {styles.map((style) => (
              <button
                key={style.id}
                type="button"
                aria-pressed={style.id === styleId}
                onClick={() => setStyleId(style.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  style.id === styleId
                    ? 'bg-white text-zinc-900'
                    : 'bg-white/5 text-zinc-300 ring-1 ring-white/10 hover:bg-white/10'
                }`}
              >
                <span aria-hidden="true">{style.emoji}</span> {style.label}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <div role="group" aria-label="Shape" className="flex rounded-full bg-white/5 p-1 ring-1 ring-white/10">
              {(Object.keys(aspects) as AspectId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={id === aspect}
                  onClick={() => setAspect(id)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                    id === aspect ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {aspects[id].label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={surpriseMe}
                className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                🎲 Surprise me
              </button>
              <button
                type="submit"
                disabled={!trimmed || pending !== null}
                className="rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {pending ? 'Painting…' : 'Generate ✨'}
              </button>
            </div>
          </div>
        </form>
        <p className="mt-3 text-center text-xs text-zinc-500">Tip: press ⌘ + Enter to generate</p>

        {error && (
          <p role="alert" className="mt-10 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-center text-rose-200">
            😵 {error}
          </p>
        )}

        {shown && (
          <section aria-label="Results" aria-busy={pending !== null} className="mt-12">
            <p className="text-center text-zinc-400">“{shown.prompt}”</p>
            <ul className={`mt-6 grid gap-4 ${gridClass}`}>
              {pending
                ? Array.from({ length: BATCH_SIZE }, (_, i) => (
                    <li key={i}>
                      <PaintingPlaceholder aspectClass={aspects[pending.aspect].className} />
                    </li>
                  ))
                : result?.images.map((image, i) => (
                    <li key={i}>
                      <ResultImage src={image} prompt={result.prompt} aspectClass={aspects[result.aspect].className} />
                    </li>
                  ))}
            </ul>
          </section>
        )}
      </section>
    </>
  )
}
