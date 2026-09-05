import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Connect, Plugin } from 'vite'

// Dev-server endpoint that forwards prompts to the OpenAI Images API.
// The API key only lives here, on the server; the browser never sees it.

const SIZES = {
  square: '1024x1024',
  portrait: '1024x1536',
  wide: '1536x1024',
} as const

const MAX_IMAGES = 4
const MAX_PROMPT_LENGTH = 1000

type OpenAIImagesResponse = {
  data?: { b64_json: string }[]
  error?: { message?: string }
}

type ImageApiOptions = {
  apiKey?: string
  baseUrl: string
  model: string
  quality: string
}

export function imageApi(options: ImageApiOptions): Plugin {
  const handler: Connect.NextHandleFunction = async (req, res, next) => {
    if (req.url !== '/api/generate') return next()
    if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST.' })
    if (!options.apiKey) {
      return sendJson(res, 500, { error: 'Add OPENAI_API_KEY to .env.local and restart the dev server.' })
    }

    try {
      const { prompt, aspect, count } = JSON.parse(await readBody(req))
      if (typeof prompt !== 'string' || !prompt.trim()) {
        return sendJson(res, 400, { error: 'Describe the image you want first.' })
      }

      const response = await fetch(`${options.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model,
          prompt: prompt.slice(0, MAX_PROMPT_LENGTH),
          n: Math.min(Math.max(Number(count) || 1, 1), MAX_IMAGES),
          size: SIZES[aspect as keyof typeof SIZES] ?? SIZES.square,
          quality: options.quality,
          output_format: 'jpeg',
          output_compression: 85,
        }),
      })

      const body = (await response.json()) as OpenAIImagesResponse
      if (!response.ok) {
        return sendJson(res, response.status, { error: body.error?.message ?? 'Image generation failed.' })
      }

      const images = (body.data ?? []).map((d) => `data:image/jpeg;base64,${d.b64_json}`)
      sendJson(res, 200, { images })
    } catch (error) {
      sendJson(res, 500, { error: error instanceof Error ? error.message : 'Unexpected error.' })
    }
  }

  return {
    name: 'dreamshot-image-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}
