import { useEffect } from 'react'

/**
 * Stops the page behind an overlay from scrolling while `locked` is true.
 * The actual styles live in index.css under `html[data-scroll-locked]`.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const root = document.documentElement
    // Reserve the scrollbar's width so the page does not shift sideways.
    const scrollbarWidth = window.innerWidth - root.clientWidth
    root.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    root.dataset.scrollLocked = ''

    return () => {
      delete root.dataset.scrollLocked
      root.style.removeProperty('--scrollbar-width')
    }
  }, [locked])
}
