import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { imageApi } from './server/imageApi.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all variables, not only VITE_* ones, so the API key stays server-side.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      imageApi({
        apiKey: env.OPENAI_API_KEY,
        baseUrl: env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
        model: env.OPENAI_IMAGE_MODEL || 'gpt-image-2.5-flare',
        quality: env.OPENAI_IMAGE_QUALITY || 'low',
      }),
    ],
  }
})
