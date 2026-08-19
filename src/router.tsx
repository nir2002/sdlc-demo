import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout.tsx'
import { DocsPage } from './pages/DocsPage.tsx'
import { FeaturesPage } from './pages/FeaturesPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
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
    ],
  },
])
