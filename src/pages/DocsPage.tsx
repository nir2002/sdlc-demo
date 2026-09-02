import { Link } from 'react-router'
import { PageIntro } from '../components/PageIntro.tsx'
import { articlesInCategory, categoryEmoji, docCategories } from '../content/docs.ts'

export function DocsPage() {
  return (
    <>
      <title>Docs — Dreamshot</title>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <PageIntro eyebrow="Docs" title={<>Learn the <span className="text-gradient">tricks</span></>}>
          Short guides to help you get better pictures, faster.
        </PageIntro>

        <div className="mt-16 space-y-14">
          {docCategories.map((category) => {
            const headingId = `category-${category.toLowerCase().replaceAll(' ', '-')}`
            return (
              <section key={category} aria-labelledby={headingId}>
                <h2 id={headingId} className="flex items-center gap-3 text-2xl font-semibold">
                  <span aria-hidden="true">{categoryEmoji[category]}</span>
                  {category}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {articlesInCategory(category).map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        to={`/docs/${doc.slug}`}
                        className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-pink-400/40 hover:bg-white/[0.06]"
                      >
                        <p className="text-xs font-medium text-pink-400">{doc.category}</p>
                        <h3 className="mt-1 font-semibold group-hover:text-pink-200">{doc.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400">{doc.summary}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </section>
    </>
  )
}
