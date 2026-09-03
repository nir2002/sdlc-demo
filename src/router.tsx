import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout.tsx'
import { DocArticlePage } from './pages/DocArticlePage.tsx'
import { DocsPage } from './pages/DocsPage.tsx'
import { FeaturesPage } from './pages/FeaturesPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PricingPage } from './pages/PricingPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'features', element: <FeaturesPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: 'docs/:slug', element: <DocArticlePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
