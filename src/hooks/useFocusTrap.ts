import { useEffect, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Keeps keyboard focus inside `containerRef` while `active` is true.
 * Focuses the first focusable element on activation and returns focus
 * to whatever was focused before once the trap is released.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!active || !container) return

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const focusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))

    focusableElements()[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !container) return

      const elements = focusableElements()
      if (elements.length === 0) {
        event.preventDefault()
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]
      const current = document.activeElement
      const outside = !container.contains(current)

      if (event.shiftKey && (current === first || outside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (current === last || outside)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [containerRef, active])
}
