'use client' // ⚡ This makes it a CLIENT COMPONENT (Topic 1)

// ===== CLIENT COMPONENT (Topic 2) =====
// Client Components:
// - Can use React hooks (useState, useEffect, etc.)
// - Run in the browser
// - Can handle user interactions
// - Need 'use client' directive at the top

import { useState, useEffect } from 'react'

// TypeScript type definition
type Message = {
  id: number
  text: string
  sender: 'user' | 'claude'
  timestamp: Date
}

export default function ChatBox() {
  // ===== REACT HOOKS (useState) =====
  // useState manages component state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! I am Claude. Ask me anything about programming, Next.js, or how I can help you! 👋',
      sender: 'claude',
      timestamp: new Date(),
    },
  ])

  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // ===== DATA FETCHING - Client Side (Topic 3) =====
  // This function fetches data from our API route
  const sendMessage = async () => {
    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    try {
      // Fetch from API route (we'll create this in Step 3)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      })

      const data = await response.json()

      // Simulate typing delay
      setTimeout(() => {
        const claudeMessage: Message = {
          id: messages.length + 2,
          text: data.reply,
          sender: 'claude',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, claudeMessage])
        setIsTyping(false)
      }, 1000)
    } catch (error) {
      console.error('Error:', error)
      setIsTyping(false)
    }
  }

  // ===== REACT HOOKS (useEffect) =====
  // useEffect runs side effects (like scrolling to bottom)
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  return (
    <div className="mx-auto flex h-[600px] max-w-3xl flex-col rounded-2xl bg-white shadow-2xl">
      {/* Chat Header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white">💬 Chat with Claude</h2>
        <p className="text-sm text-indigo-100">
          This is a demo showing Client Components with useState/useEffect
        </p>
      </div>

      {/* Messages Container */}
      <div
        id="chat-messages"
        className="flex-1 space-y-4 overflow-y-auto p-6"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                message.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm font-semibold">
                {message.sender === 'user' ? '👤 You' : '🤖 Claude'}
              </p>
              <p className="mt-1">{message.text}</p>
              <p className="mt-2 text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-gray-100 px-6 py-4">
              <p className="text-sm font-semibold text-gray-800">
                🤖 Claude is typing
              </p>
              <div className="mt-2 flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></span>
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          💡 Try asking: "What is Next.js?", "What can you do?", "How do hooks
          work?"
        </p>
      </div>
    </div>
  )
}
