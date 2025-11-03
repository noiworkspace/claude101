import { Metadata } from 'next'

// ===== SEO OPTIMIZATION (Topic 6) =====
// This is the Metadata API - helps search engines understand your page
export const metadata: Metadata = {
  title: 'About Claude AI | Claude 101',
  description:
    'Learn about Claude AI - an AI assistant created by Anthropic that can help with coding, writing, analysis, and more.',
  keywords: ['Claude AI', 'Anthropic', 'AI Assistant', 'Next.js Learning'],
}

// ===== SERVER COMPONENT (Topic 1) =====
// This is a Server Component (default in app directory)
// - Runs on the server
// - Can fetch data directly
// - Better for SEO
// - Cannot use React hooks (useState, useEffect)
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-indigo-900">
            About Claude AI 🤖
          </h1>
          <p className="text-xl text-indigo-700">
            Your AI coding companion built by Anthropic
          </p>
        </header>

        {/* Main Content - Styled with Tailwind (Topic 4) */}
        <div className="space-y-8">
          {/* Card 1 */}
          <section className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-3xl font-semibold text-indigo-800">
              🌟 What is Claude?
            </h2>
            <p className="leading-relaxed text-gray-700">
              Claude is an AI assistant created by Anthropic. I can help you
              with:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 text-2xl">💻</span>
                <span>
                  <strong>Coding:</strong> Write, debug, and explain code in
                  many languages
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">📝</span>
                <span>
                  <strong>Writing:</strong> Create content, edit text, and
                  improve writing
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">🔍</span>
                <span>
                  <strong>Analysis:</strong> Analyze data, solve problems, and
                  answer questions
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-2xl">🎓</span>
                <span>
                  <strong>Learning:</strong> Teach concepts and help you
                  understand new topics
                </span>
              </li>
            </ul>
          </section>

          {/* Card 2 */}
          <section className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-3xl font-semibold text-indigo-800">
              🏢 About Anthropic
            </h2>
            <p className="leading-relaxed text-gray-700">
              Anthropic is an AI safety company focused on building reliable,
              interpretable, and steerable AI systems. Founded in 2021, the
              company's mission is to ensure that artificial intelligence is
              developed safely and benefits humanity.
            </p>
          </section>

          {/* Card 3 */}
          <section className="rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-3xl font-semibold text-indigo-800">
              ⚡ Key Features
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">
                  Long Context Window
                </h3>
                <p className="text-sm text-gray-700">
                  Can process and remember large amounts of information in a
                  conversation
                </p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">
                  Code Understanding
                </h3>
                <p className="text-sm text-gray-700">
                  Excellent at reading, writing, and explaining code across
                  multiple languages
                </p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">
                  Honest & Helpful
                </h3>
                <p className="text-sm text-gray-700">
                  Designed to be truthful and admit when uncertain about
                  something
                </p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-4">
                <h3 className="mb-2 font-semibold text-indigo-900">
                  Safety Focused
                </h3>
                <p className="text-sm text-gray-700">
                  Built with Constitutional AI to be helpful, harmless, and
                  honest
                </p>
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-center gap-4 pt-8">
            <a
              href="/"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              ← Back to Home
            </a>
            <a
              href="/chat"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Try Interactive Demo →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
