// ===== SERVER-SIDE DATA FETCHING (Topic 3) =====
// This component fetches data on the SERVER before rendering
// NO 'use client' directive = Server Component

type Fact = {
  id: number
  fact: string
  category: string
}

// Async Server Component - can fetch data directly
export default async function FactsServer() {
  // Server-side fetch - runs on the server during build/request
  const response = await fetch('http://localhost:3000/api/facts', {
    cache: 'no-store', // Don't cache, always get fresh data
  })

  if (!response.ok) {
    // Will trigger error.tsx if available
    throw new Error('Failed to fetch fact')
  }

  const data = await response.json()
  const fact: Fact = data.fact

  return (
    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 p-8 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-blue-900">
          ⚡ Server-Side Fetching
        </h3>
        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
          SERVER
        </span>
      </div>

      <p className="mb-6 text-sm text-blue-700">
        This data is fetched on the <strong>server</strong> before the page is
        sent to the browser. Better for SEO!
      </p>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <p className="mb-3 text-lg font-medium text-gray-800">{fact.fact}</p>
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
          {fact.category}
        </span>
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <p className="text-xs font-semibold text-blue-900">📚 How it works:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-blue-700">
          <li>Data fetched on server during request</li>
          <li>Component renders with data already available</li>
          <li>Complete HTML sent to browser</li>
          <li>Better SEO (search engines see the data)</li>
          <li>Refresh page to get new data</li>
        </ul>
      </div>

      <div className="mt-4 rounded-lg bg-yellow-50 p-4">
        <p className="text-xs text-yellow-800">
          💡 <strong>Note:</strong> Server Components can't use useState,
          useEffect, or handle user interactions. Use Client Components for
          that!
        </p>
      </div>
    </div>
  )
}
