# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**claude101** is a learning project focused on Next.js fundamentals with TypeScript. The project serves as a practice environment for:

- Learning Next.js App Router and modern React patterns
- Practicing TypeScript in a real-world context
- Preparing for technical interviews
- Experimenting with Claude's full capabilities (conversation, code generation, debugging, architecture design, problem-solving)

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm

## Development Commands

```bash
# Install dependencies
npm install

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

# Run linting
npm run lint

# Format code
npm run format
```

## Architecture

### Next.js App Router Structure

The App Router uses a file-system based routing where folders define routes:

- `app/` - Main application directory (App Router)
  - `layout.tsx` - Root layout (wraps all pages)
  - `page.tsx` - Home page (/)
  - `[dynamic]/` - Dynamic route segments
  - `api/` - API routes (Route Handlers)
  - `_components/` - Private folder (not routable)

### Key Patterns

**Server vs Client Components**

- Components are Server Components by default (better for SEO)
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Server Components can fetch data directly, Client Components cannot

**Metadata API**

- Export `metadata` object or `generateMetadata()` function from page/layout files
- This is critical for SEO optimization

**Data Fetching**

- Server Components: Use async/await directly in component
- Client Components: Use hooks (useState, useEffect) or libraries (SWR, React Query)

### Testing Strategy

- **Unit Tests**: Individual functions and utilities
- **Component Tests**: React Testing Library for component behavior
- **Integration Tests**: Testing component interactions
- Place test files adjacent to source: `component.test.tsx`

## Important Notes

- This is a learning environment focused on fundamentals and interview preparation
- The project is designed for experimenting with Claude's capabilities including code generation, debugging, architecture discussions, and problem-solving
- Focus on understanding core concepts rather than adding complex dependencies
- Keep components simple and well-documented for learning purposes
- SEO optimization is a key consideration (using App Router features)
