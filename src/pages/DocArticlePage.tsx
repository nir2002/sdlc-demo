import { Link, useParams } from 'react-router'
import { articlesInCategory, categoryEmoji, docs } from '../content/docs.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export function DocArticlePage() {
  const { slug } = useParams()
  const article = docs.find((doc) => doc.slug === slug)

  if (!article) {
    return <NotFoundPage title="Article not found" />
  }

  // Suggest the articles that come after this one in its category, wrapping around.
  const siblings = articlesInCategory(article.category)
  const index = siblings.indexOf(article)
  const next = [...siblings.slice(index + 1), ...siblings.slice(0, index)].slice(0, 2)

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <title>{`${article.title} — Dreamshot Docs`}</title>

      <Link to="/docs" className="text-sm text-zinc-400 hover:text-white">
        ← Docs
      </Link>
      <p className="mt-8 text-sm font-medium text-pink-400">
        {categoryEmoji[article.category]} {article.category}
      </p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{article.title}</h1>
      <p className="mt-4 text-xl text-zinc-400">{article.summary}</p>

      <div className="mt-10 space-y-6 text-lg leading-8">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {next.length > 0 && (
        <aside className="mt-16 border-t border-white/10 pt-8">
          <h2 className="text-sm font-semibold text-zinc-400">Keep reading</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {next.map((doc) => (
              <li key={doc.slug}>
                <Link
                  to={`/docs/${doc.slug}`}
                  className="block rounded-2xl border border-white/10 p-4 hover:border-pink-400/40"
                >
                  <span className="font-semibold text-white">{doc.title}</span>
                  <span className="mt-1 block text-sm text-zinc-400">{doc.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  )
}
