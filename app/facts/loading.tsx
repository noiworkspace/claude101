// ===== LOADING STATES (Topic 6) =====
// loading.tsx is automatically used by Next.js for loading states
// Shows while the page.tsx is loading data

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 h-12 w-64 animate-pulse rounded-lg bg-indigo-200 mx-auto"></div>
          <div className="h-6 w-96 animate-pulse rounded-lg bg-indigo-100 mx-auto"></div>
        </div>

        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
            <p className="text-xl font-semibold text-indigo-900">
              Loading facts...
            </p>
            <p className="mt-2 text-sm text-indigo-600">
              Fetching data from the server
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
