'use client' // Error components must be Client Components

// ===== ERROR HANDLING (Topic 6) =====
// error.tsx automatically catches errors in page.tsx
// Provides a fallback UI when something goes wrong

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-12 text-center shadow-2xl">
          <div className="mb-6 text-6xl">😕</div>
          <h1 className="mb-4 text-4xl font-bold text-red-900">
            Oops! Something went wrong
          </h1>
          <p className="mb-2 text-lg text-gray-700">
            We encountered an error while loading the page.
          </p>
          <p className="mb-8 text-sm text-gray-500">
            Error: {error.message}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={reset}
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
            <a
              href="/"
              className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
            >
              Go Home
            </a>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-6 text-left">
            <h3 className="mb-2 font-semibold text-blue-900">
              🛠️ For Developers:
            </h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• error.tsx catches errors in page.tsx</li>
              <li>• Must be a Client Component ('use client')</li>
              <li>• reset() function attempts to re-render</li>
              <li>• Check console for detailed error info</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
