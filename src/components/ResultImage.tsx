import { useEffect, useState } from 'react'
import { downloadImage } from '../lib/imageGen.ts'

type ResultImageProps = {
  src: string
  prompt: string
  aspectClass: string
}

export function ResultImage({ src, prompt, aspectClass }: ResultImageProps) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-white/5 ${aspectClass}`}>
      <img src={src} alt={prompt} className="size-full object-cover" />
      <button
        type="button"
        onClick={() => downloadImage(src, prompt)}
        className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-opacity hover:bg-black/80 motion-reduce:transition-none sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
      >
        ⬇ Download
      </button>
    </div>
  )
}

export function PaintingPlaceholder({ aspectClass }: { aspectClass: string }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-500/15 via-pink-500/10 to-orange-400/15 ${aspectClass}`}
    >
      <div className="absolute inset-0 animate-pulse bg-white/5 motion-reduce:animate-none" />
      <p className="relative text-sm font-medium text-zinc-300 tabular-nums">🎨 Painting… {seconds}s</p>
    </div>
  )
}
