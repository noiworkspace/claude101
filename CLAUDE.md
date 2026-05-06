# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**claude101** is a full-stack Next.js learning project with TypeScript. It started as a fundamentals sandbox and has grown into a real application with authentication, multi-database infrastructure, and interactive features themed around Claude AI.

**Primary learning goals:**
- Next.js App Router patterns (Server Components, Client Components, API Routes)
- TypeScript in a real-world context
- Multi-database architecture (PostgreSQL + Redis + MongoDB)
- Authentication flows (bcrypt, JWT, session management)
- Testing with Jest + React Testing Library

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Testing | Jest + React Testing Library |
| Package Manager | npm |
| Primary DB | PostgreSQL (member data) |
| Cache / Sessions | Redis |
| Logging / Analytics | MongoDB |
| Local infra | Docker Compose |

## Development Commands

```bash
# Install dependencies
npm install

# Start all databases (PostgreSQL, Redis, MongoDB)
docker compose up -d

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint (prettier check)
npm run lint

# Format code
npm run format
```

## Environment Setup

Copy `.env.example` to `.env` and fill in values. The defaults match `docker-compose.yml`:

```bash
cp .env.example .env
```

Key env vars:
- `POSTGRES_*` — member database
- `REDIS_*` — sessions and caching
- `MONGODB_*` — activity logs and analytics
- `JWT_SECRET` — sign/verify JWT tokens (change in production)
- `BCRYPT_ROUNDS` — password hashing cost (default 10)

## Architecture

### Next.js App Router Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page — learning module hub
├── globals.css
├── not-found.tsx
├── about/page.tsx          # Static Server Component demo + SEO
├── auth/page.tsx           # Auth UI (register/login forms)
├── chat/page.tsx           # Interactive chat (Client Component)
├── facts/
│   ├── page.tsx            # Data fetching demo
│   ├── loading.tsx         # Suspense loading state
│   └── error.tsx           # Error boundary
├── _components/            # Private (non-routable) components
│   ├── ChatBox.tsx         # Client Component with useState/useEffect
│   ├── ChatBox.test.tsx
│   ├── FactsServer.tsx     # Server Component — direct async fetch
│   └── FactsClient.tsx     # Client Component — fetch in useEffect
├── components/
│   └── AuthForms.tsx       # Register + login form components
├── api/
│   ├── chat/route.ts       # POST /api/chat — mock chatbot
│   ├── facts/route.ts      # GET  /api/facts — random Claude facts
│   └── members/
│       ├── register/route.ts  # POST /api/members/register
│       └── login/route.ts     # POST /api/members/login
├── lib/
│   ├── auth.ts             # bcrypt, JWT, validation, sanitization
│   ├── utils.ts            # getClientIp, getUserAgent helpers
│   └── db/
│       ├── postgres.ts     # Pool singleton, query(), transaction()
│       ├── redis.ts        # Client singleton, cache, session, rateLimit
│       └── mongodb.ts      # Client singleton, activityLog, errorLog, analytics
└── types/
    └── member.ts           # Member, MemberSession, request/response types
```

### Key Patterns

**Server vs Client Components**
- Components are Server Components by default — fetch data directly with `async/await`
- Use `'use client'` only when you need interactivity, hooks, or browser APIs
- `FactsServer.tsx` vs `FactsClient.tsx` show the contrast side-by-side

**Authentication Flow**
1. Register: validate → sanitize → check uniqueness in Postgres → bcrypt hash → insert → log to MongoDB
2. Login: lookup in Postgres → bcrypt compare → generate JWT → store session in Redis → log to MongoDB
3. JWT tokens expire in 24h, signed with `JWT_SECRET`

**Database Responsibilities**
- **PostgreSQL** — source of truth for member records (`members`, `sessions` tables)
- **Redis** — fast session lookup (`session:<id>` keys, 24h TTL), rate limiting counters
- **MongoDB** — append-only logs: `activity_logs`, `error_logs`, `analytics` collections

**API Route Conventions**
- Return `NextResponse.json({ success, message, data?, error? })` consistently
- Use proper HTTP status codes (201 for created, 409 for conflicts, 400 for validation errors)
- Log both success and failure paths to MongoDB

### Testing Strategy

- Unit tests: auth utilities, helper functions
- Component tests: React Testing Library for behavior (not implementation)
- Place test files adjacent to source: `component.test.tsx`
- Run `npm test` — Jest is configured in `jest.config.ts` with jsdom environment

## Database Schema

The PostgreSQL schema is initialized via `docker/postgres/init.sql`. MongoDB collections are created on first write. Redis keys follow the pattern `session:<uuid>` and `ratelimit:<key>`.

## Security Notes

- Passwords are hashed with bcrypt (never stored in plain text)
- JWT secret must be changed from the default before any real deployment
- Input sanitization strips `<>` and trims whitespace to prevent basic XSS
- Rate limiting helpers exist in `app/lib/db/redis.ts` (`rateLimit.check`)
- SQL queries use parameterized statements via `pg` — no string concatenation

## Important Notes

- This is a learning project — prefer clarity and simplicity over clever abstractions
- The chat page uses a local mock knowledge base, not the real Claude API
- `CLAUDE_API_KEY` is mentioned in `.env.example` for future use but not wired up yet
- Docker Compose is the easiest way to spin up all three databases locally
