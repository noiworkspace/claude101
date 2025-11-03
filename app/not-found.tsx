// ===== 404 PAGE (Topic 6) =====
// not-found.tsx shows when a route doesn't exist

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-purple-900">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-purple-800">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-purple-700">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  )
}
