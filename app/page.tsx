// ===== HOME PAGE - Complete Learning Hub =====
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Hero Section */}
      <div className="px-6 py-20 text-center">
        <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent">
          Welcome to Claude 101 🚀
        </h1>
        <p className="mx-auto mb-4 max-w-2xl text-xl text-gray-700">
          A complete Next.js learning project with TypeScript
        </p>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Learn Next.js fundamentals by building a real application about Claude
          AI. This project covers all essential topics from routing to testing!
        </p>
      </div>

      {/* Learning Modules */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          📚 Learning Modules
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Module 1: About Page */}
          <a
            href="/about"
            className="group rounded-2xl bg-white p-8 shadow-lg transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4 text-5xl">📖</div>
            <h3 className="mb-3 text-2xl font-bold text-indigo-900 group-hover:text-indigo-600">
              About Claude
            </h3>
            <p className="mb-4 text-gray-600">
              Learn about file-based routing, Server Components, and SEO with
              Next.js Metadata API
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                Routing
              </span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                SEO
              </span>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                Server
              </span>
            </div>
          </a>

          {/* Module 2: Chat Demo */}
          <a
            href="/chat"
            className="group rounded-2xl bg-white p-8 shadow-lg transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4 text-5xl">💬</div>
            <h3 className="mb-3 text-2xl font-bold text-green-900 group-hover:text-green-600">
              Interactive Chat
            </h3>
            <p className="mb-4 text-gray-600">
              Build interactive components with Client Components, useState, and
              useEffect hooks
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                Client
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                Hooks
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                Interactive
              </span>
            </div>
          </a>

          {/* Module 3: Data Fetching */}
          <a
            href="/facts"
            className="group rounded-2xl bg-white p-8 shadow-lg transition hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-4 text-5xl">📊</div>
            <h3 className="mb-3 text-2xl font-bold text-blue-900 group-hover:text-blue-600">
              Data Fetching
            </h3>
            <p className="mb-4 text-gray-600">
              Compare Server-side vs Client-side data fetching with real
              examples
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Fetching
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                API
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Async
              </span>
            </div>
          </a>
        </div>

        {/* Topics Covered */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-10 text-white shadow-2xl">
          <h2 className="mb-6 text-center text-3xl font-bold">
            ✨ What You'll Learn
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">🗂️</div>
              <h3 className="mb-2 font-bold">1. File-based Routing</h3>
              <p className="text-sm text-purple-100">
                Create pages with folders and files
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">⚡</div>
              <h3 className="mb-2 font-bold">2. Server Components</h3>
              <p className="text-sm text-purple-100">
                Fast, SEO-friendly by default
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">🌐</div>
              <h3 className="mb-2 font-bold">3. Client Components</h3>
              <p className="text-sm text-purple-100">
                Interactive with React hooks
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">🔌</div>
              <h3 className="mb-2 font-bold">4. API Routes</h3>
              <p className="text-sm text-purple-100">
                Build backend endpoints
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">🎨</div>
              <h3 className="mb-2 font-bold">5. Tailwind CSS</h3>
              <p className="text-sm text-purple-100">
                Utility-first styling
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">🔍</div>
              <h3 className="mb-2 font-bold">6. SEO & Metadata</h3>
              <p className="text-sm text-purple-100">
                Optimize for search engines
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">⏳</div>
              <h3 className="mb-2 font-bold">7. Loading States</h3>
              <p className="text-sm text-purple-100">
                Suspense and loading.tsx
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">🧪</div>
              <h3 className="mb-2 font-bold">8. Testing</h3>
              <p className="text-sm text-purple-100">
                Jest + React Testing Library
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 text-3xl">📝</div>
              <h3 className="mb-2 font-bold">9. TypeScript</h3>
              <p className="text-sm text-purple-100">
                Type-safe development
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mt-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            🚀 Ready to Learn?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Start with any module above, or explore the code in your editor!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/about"
              className="rounded-lg bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
            >
              Start Learning →
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-200 px-8 py-4 font-semibold text-gray-900 transition hover:bg-gray-300"
            >
              Next.js Docs
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
