export const styles = [
  { id: 'none', label: 'No style', emoji: '✨', suffix: '' },
  { id: 'anime', label: 'Anime', emoji: '🌸', suffix: 'anime style, cel shaded, vibrant colors' },
  { id: 'watercolor', label: 'Watercolor', emoji: '🎨', suffix: 'soft watercolor painting, paper texture' },
  { id: 'pixel', label: 'Pixel art', emoji: '👾', suffix: '16-bit pixel art, retro video game' },
  { id: 'neon', label: 'Neon', emoji: '🌃', suffix: 'neon synthwave, glowing lights, night' },
  { id: 'clay', label: 'Claymation', emoji: '🧸', suffix: 'claymation, plasticine, stop motion' },
  { id: 'photo', label: 'Photo', emoji: '📷', suffix: 'photorealistic, 35mm film photo, natural light' },
] as const

export type StyleId = (typeof styles)[number]['id']

// Must match the sizes in server/imageApi.ts.
export const aspects = {
  square: { label: 'Square', className: 'aspect-square' },
  portrait: { label: 'Portrait', className: 'aspect-[2/3]' },
  wide: { label: 'Wide', className: 'aspect-[3/2]' },
} as const

export type AspectId = keyof typeof aspects

export const surprisePrompts = [
  'A corgi astronaut eating ramen on the moon',
  'A sloth running a tiny coffee shop, cozy morning light',
  'A castle made of pancakes floating above the clouds',
  'A robot and a cat playing chess in a treehouse',
  'A jellyfish city glowing at the bottom of the ocean',
  'A grumpy owl wearing a tiny wizard hat',
  'A hot air balloon shaped like a strawberry over Paris',
  'A penguin surfing a giant wave at sunset',
  'A library inside a giant hollow tree',
  'A raccoon DJ at a neon rooftop party',
]

type GenerateRequest = {
  prompt: string
  styleId: StyleId
  aspect: AspectId
  count: number
}

/** Returns the generated images as data URLs. */
export async function generateImages({ prompt, styleId, aspect, count }: GenerateRequest): Promise<string[]> {
  const style = styles.find((s) => s.id === styleId) ?? styles[0]
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: style.suffix ? `${prompt}, ${style.suffix}` : prompt, aspect, count }),
  })

  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error ?? `Generation failed (${response.status}).`)
  return body.images
}

/** A small square JPEG of the image, small enough to keep in localStorage. */
export function thumbnailOf(src: string, size = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const side = Math.min(img.naturalWidth, img.naturalHeight)
      canvas
        .getContext('2d')
        ?.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.onerror = reject
    img.src = src
  })
}

export function downloadImage(src: string, prompt: string) {
  const slug = prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
  const link = document.createElement('a')
  link.href = src
  link.download = `dreamshot-${slug || 'image'}.jpg`
  link.click()
}
