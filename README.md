# Claude 101

A Next.js learning project focused on fundamentals with TypeScript. This project serves as a practice environment for learning Next.js App Router, modern React patterns, and preparing for technical interviews.

**NEW:** Now includes a complete full-stack authentication system with PostgreSQL, Redis, and MongoDB!

## Tech Stack

- **Framework**: Next.js (App Router) - Full-stack framework (frontend + backend)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Databases**:
  - PostgreSQL - Member data and authentication
  - Redis - Session management and caching
  - MongoDB - Activity logs and analytics
- **Security**: bcrypt, JWT, input validation
- **Package Manager**: npm

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Databases (Docker)

```bash
# Copy environment variables
cp .env.example .env

# Start all databases
docker-compose up -d

# Verify databases are running
docker-compose ps
```

### 3. Run Development Server

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

# Test the API endpoints
./test-api.sh       # Test registration and login APIs
```

## Project Structure

```
claude101/
├── app/                       # Next.js App Router
│   ├── _components/           # Private components (not routable)
│   ├── api/                   # API Routes (Backend)
│   │   ├── chat/              # Chat API
│   │   ├── facts/             # Facts API
│   │   └── members/           # Member authentication APIs
│   │       ├── register/      # POST /api/members/register
│   │       └── login/         # POST /api/members/login
│   ├── auth/                  # Authentication pages
│   │   └── page.tsx           # Login/Register page
│   ├── components/            # Reusable components
│   │   └── AuthForms.tsx      # Auth forms component
│   ├── lib/                   # Utilities and libraries
│   │   ├── db/                # Database connections
│   │   │   ├── postgres.ts    # PostgreSQL utilities
│   │   │   ├── redis.ts       # Redis utilities
│   │   │   └── mongodb.ts     # MongoDB utilities
│   │   ├── auth.ts            # Authentication utilities
│   │   └── utils.ts           # Helper utilities
│   ├── types/                 # TypeScript type definitions
│   │   └── member.ts          # Member types
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── docker/                    # Docker initialization scripts
│   ├── postgres/              # PostgreSQL init scripts
│   └── mongodb/               # MongoDB init scripts
├── docker-compose.yml         # Multi-database Docker setup
├── .env.example               # Environment variables template
├── DATABASE_SETUP.md          # Database documentation
└── CLAUDE.md                  # Project guidelines
```

## Features

### Authentication System
- User registration with validation
- Login with email or username
- Password hashing with bcrypt
- JWT token generation
- Session management (Redis + PostgreSQL)
- Input validation and sanitization
- XSS and SQL injection prevention

### Database Architecture
- **PostgreSQL**: Member profiles, sessions
- **Redis**: Fast session lookup, caching, rate limiting
- **MongoDB**: Activity logs, error logs, analytics

### API Routes (Backend in Next.js)
- `POST /api/members/register` - Create new account
- `POST /api/members/login` - Authenticate user

Visit `/auth` to test the authentication system!

## Learning Focus

This project emphasizes:

- Next.js as a **full-stack framework** (frontend + backend in one!)
- API Routes for backend functionality
- Server vs Client Components
- Multi-database architecture
- Authentication and security
- TypeScript best practices
- Testing React components
- SEO optimization
- Modern React patterns

## Documentation

- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Complete database setup and API documentation
- **[CLAUDE.md](./CLAUDE.md)** - Project guidelines and architecture decisions

## Can Next.js Be Frontend and Backend?

**YES!** This project demonstrates that Next.js is a full-stack framework:

1. **Frontend**: React components (Server + Client Components)
2. **Backend**: API Routes in `/app/api/*`
3. **Database Access**: Direct from Server Components or API Routes
4. **No separate server needed**: Next.js handles everything

You don't need Express, Nest.js, or any other backend framework!
