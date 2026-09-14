export type Creation = {
  id: string
  prompt: string
  /** Small JPEG data URL; full-size images are too big for localStorage. */
  thumbnail: string
  createdAt: number
}

const STORAGE_KEY = 'dreamshot.creations'
export const MAX_CREATIONS = 24

export function loadCreations(): Creation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Creation[]) : []
  } catch {
    return []
  }
}

export function saveCreations(creations: Creation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creations.slice(0, MAX_CREATIONS)))
  } catch {
    // Storage is full or blocked (private mode). The gallery just won't persist.
  }
}
