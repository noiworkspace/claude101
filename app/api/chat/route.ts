// ===== API ROUTES (Topic 7) =====
// API Routes let you create backend endpoints in Next.js
// File: app/api/chat/route.ts → Endpoint: /api/chat

import { NextRequest, NextResponse } from 'next/server'

// Simple knowledge base about Claude
const knowledge: { [key: string]: string } = {
  'what is nextjs':
    'Next.js is a React framework that makes building web applications easy! It has features like file-based routing, Server Components, and automatic optimization.',
  'what can you do':
    'I can help you with: 💻 Coding (write, debug, explain), 📝 Writing, 🔍 Analysis, 🎓 Teaching concepts, and much more!',
  'how do hooks work':
    'React hooks like useState and useEffect let you use state and lifecycle features in functional components. useState manages data, useEffect handles side effects!',
  'what is typescript':
    'TypeScript is JavaScript with type safety! It helps catch errors early and makes your code more maintainable. Next.js works great with TypeScript.',
  'what is tailwind':
    'Tailwind CSS is a utility-first CSS framework. Instead of writing CSS, you use classes like "bg-blue-500" and "p-4" directly in your HTML!',
  'who made you':
    'I was created by Anthropic, an AI safety company founded in 2021. My purpose is to be helpful, harmless, and honest!',
}

// POST handler - handles POST requests to /api/chat
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const userMessage = body.message.toLowerCase()

    // Find matching response
    let reply = "That's an interesting question! I'm a demo chatbot, so my knowledge is limited. Try asking about Next.js, hooks, or what I can do!"

    // Check if user message matches any knowledge
    for (const [key, value] of Object.entries(knowledge)) {
      if (userMessage.includes(key)) {
        reply = value
        break
      }
    }

    // Return JSON response
    return NextResponse.json(
      {
        reply,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    // Error handling
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}

// GET handler - handles GET requests to /api/chat
export async function GET() {
  return NextResponse.json({
    message: 'Chat API is working!',
    availableTopics: Object.keys(knowledge),
  })
}
