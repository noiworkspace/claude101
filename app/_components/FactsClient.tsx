'use client'

// ===== CLIENT-SIDE DATA FETCHING (Topic 3) =====
// This component fetches data in the browser using useEffect

import { useState, useEffect } from 'react'

type Fact = {
  id: number
  fact: string
  category: string
}

export default function FactsClient() {
  const [fact, setFact] = useState<Fact | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFact = async () => {
    setLoading(true)
    setError(null)

    try {
      // Client-side fetch - runs in the browser
      const response = await fetch('/api/facts')
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setFact(data.fact)
    } catch (err) {
      setError('Failed to load fact. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch on component mount
  useEffect(() => {
    fetchFact()
  }, [])

  return (
    <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 p-8 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-green-900">
          🌐 Client-Side Fetching
        </h3>
        <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          CLIENT
        </span>
      </div>

      <p className="mb-6 text-sm text-green-700">
        This data is fetched in the <strong>browser</strong> using useEffect
        hook. It runs after the component renders.
      </p>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">{error}</div>
      )}

      {fact && !loading && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="mb-3 text-lg font-medium text-gray-800">
            {fact.fact}
          </p>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            {fact.category}
          </span>
        </div>
      )}

      <button
        onClick={fetchFact}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : '🔄 Get Another Fact'}
      </button>

      <div className="mt-4 rounded-lg bg-green-50 p-4">
        <p className="text-xs font-semibold text-green-900">
          📚 How it works:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-green-700">
          <li>Component renders first (without data)</li>
          <li>useEffect runs after render</li>
          <li>Fetch request sent from browser</li>
          <li>State updates, component re-renders with data</li>
        </ul>
      </div>
    </div>
  )
}
