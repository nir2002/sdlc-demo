# Dreamshot

Type a thought. Get a picture. ✨

Dreamshot is an AI image generator built with Vite, React, TypeScript,
Tailwind CSS and React Router. Images come from the OpenAI Images API.

## Run it

```sh
npm install
cp .env.example .env.local   # then paste your OpenAI key into .env.local
npm run dev
```

Open http://localhost:5173/create and describe something weird.

The OpenAI key is only read by the Vite dev server (`server/imageApi.ts`),
which exposes `POST /api/generate`. It is never sent to the browser.
Generation works under `npm run dev` and `npm run preview`.

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: type-check and build to `dist/`
- `npm run preview`: serve the production build (API included)
- `npm run lint`: lint with oxlint

## Where things live

- `server/imageApi.ts`: the `/api/generate` endpoint
- `src/pages/`: one component per route
- `src/components/`: layout, header, footer, mobile nav and result tiles
- `src/lib/`: image generation client and saved creations
- `src/content/docs.ts`: docs articles as typed data
- `src/hooks/`: focus trap and scroll lock
