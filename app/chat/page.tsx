import { Metadata } from 'next'
import ChatBox from '../_components/ChatBox'

export const metadata: Metadata = {
  title: 'Chat with Claude | Claude 101',
  description: 'Interactive demo showing Client Components with React hooks',
}

// This is a SERVER COMPONENT that imports a CLIENT COMPONENT
// Server Components can import Client Components, but not vice versa
export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-purple-900">
            Interactive Chat Demo
          </h1>
          <p className="text-lg text-purple-700">
            This demonstrates Client Components, React Hooks (useState,
            useEffect), and API Routes
          </p>
        </div>

        {/* Client Component */}
        <ChatBox />

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
