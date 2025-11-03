// ===== API ROUTES - Facts Endpoint =====
// This endpoint provides random facts about Claude AI
// URL: /api/facts

import { NextResponse } from 'next/server'

const claudeFacts = [
  {
    id: 1,
    fact: 'Claude was created by Anthropic, an AI safety company',
    category: 'company',
  },
  {
    id: 2,
    fact: 'Claude can understand and generate code in many programming languages',
    category: 'capabilities',
  },
  {
    id: 3,
    fact: 'Claude has a large context window, allowing it to process long documents',
    category: 'features',
  },
  {
    id: 4,
    fact: 'Claude uses Constitutional AI to be helpful, harmless, and honest',
    category: 'technology',
  },
  {
    id: 5,
    fact: 'Claude can help with writing, analysis, math, coding, and creative tasks',
    category: 'capabilities',
  },
  {
    id: 6,
    fact: 'Anthropic was founded in 2021 by former OpenAI researchers',
    category: 'company',
  },
  {
    id: 7,
    fact: 'Claude is named after Claude Shannon, the father of information theory',
    category: 'history',
  },
  {
    id: 8,
    fact: 'Claude can understand images and analyze visual content',
    category: 'capabilities',
  },
]

// GET /api/facts - Get random fact
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let facts = claudeFacts

  // Filter by category if provided
  if (category) {
    facts = claudeFacts.filter((f) => f.category === category)
  }

  // Get random fact
  const randomFact = facts[Math.floor(Math.random() * facts.length)]

  return NextResponse.json({
    fact: randomFact,
    totalFacts: claudeFacts.length,
    categories: ['company', 'capabilities', 'features', 'technology', 'history'],
  })
}
