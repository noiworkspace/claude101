import { Metadata } from 'next'
import { Suspense } from 'react'
import FactsServer from '../_components/FactsServer'
import FactsClient from '../_components/FactsClient'

export const metadata: Metadata = {
  title: 'Data Fetching Examples | Claude 101',
  description: 'Learn the difference between Server and Client data fetching',
}

// ===== LOADING & ERROR STATES (Topic 6) =====
// Suspense provides loading states for async components
function LoadingFallback() {
  return (
    <div className="rounded-xl bg-blue-50 p-8 shadow-lg">
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    </div>
  )
}

export default function FactsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-indigo-900">
            📊 Data Fetching Patterns
          </h1>
          <p className="text-xl text-indigo-700">
            Understanding Server vs Client Data Fetching
          </p>
        </header>

        {/* Comparison Info */}
        <div className="mb-8 rounded-xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            🎯 When to Use Each?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 flex items-center text-xl font-semibold text-blue-900">
                <span className="mr-2">⚡</span> Server Components
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Better SEO (data in HTML)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Faster initial load</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Direct database access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Secure API keys on server</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>No user interactions</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-6">
              <h3 className="mb-3 flex items-center text-xl font-semibold text-green-900">
                <span className="mr-2">🌐</span> Client Components
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Interactive (buttons, forms)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Real-time updates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Use React hooks</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Browser APIs access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>Slower initial load</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Server Component with Suspense */}
          <Suspense fallback={<LoadingFallback />}>
            <FactsServer />
          </Suspense>

          {/* Client Component */}
          <FactsClient />
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            ← Back to Home
          </a>
        </div>

        {/* Learning Notes */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-purple-900">
            📝 Key Takeaways
          </h2>
          <div className="space-y-3 text-purple-800">
            <p>
              <strong>1. Server Components (default):</strong> Fetch data with
              async/await directly in the component. Great for SEO and
              performance.
            </p>
            <p>
              <strong>2. Client Components ('use client'):</strong> Use
              useState/useEffect for interactive features and real-time updates.
            </p>
            <p>
              <strong>3. Best Practice:</strong> Use Server Components by
              default. Only use Client Components when you need interactivity.
            </p>
            <p>
              <strong>4. Suspense:</strong> Wrap async Server Components with
              Suspense for loading states.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
