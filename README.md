# Claude 101

A Next.js learning project focused on fundamentals with TypeScript. This project serves as a practice environment for learning Next.js App Router, modern React patterns, and preparing for technical interviews.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
npm run dev         # Run development server
npm run build       # Build for production
npm start           # Start production server
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run lint        # Run linting
npm run format      # Format code with Prettier
```

## Project Structure

```
claude101/
├── app/                  # Next.js App Router
│   ├── _components/      # Private components (not routable)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── jest.config.ts        # Jest configuration
├── jest.setup.ts         # Jest setup file
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Learning Focus

This project emphasizes:

- Next.js App Router fundamentals
- Server vs Client Components
- TypeScript best practices
- Testing React components
- SEO optimization
- Modern React patterns

## Documentation

For more details, see [CLAUDE.md](./CLAUDE.md) for project guidelines and architecture decisions.
