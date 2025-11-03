# Database Setup Guide

This guide explains how to set up and use the multi-database architecture (PostgreSQL, Redis, MongoDB) for the Claude 101 project.

## Architecture Overview

The application uses three databases, each serving a specific purpose:

1. **PostgreSQL** - Primary database for member data
   - User registration and authentication
   - Session management (backup)
   - Relational data with strong consistency

2. **Redis** - In-memory cache and session store
   - Fast session lookup and management
   - Rate limiting
   - Caching frequently accessed data

3. **MongoDB** - Document store for logs and analytics
   - Activity logs (user actions)
   - Error logs (application errors)
   - Analytics events
   - Flexible schema for varied log types

## Quick Start

### 1. Copy Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and update the database credentials if needed (defaults are already configured for Docker).

### 2. Start Docker Containers

```bash
# Start all databases
docker-compose up -d

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

### 3. Verify Database Connections

The databases are initialized automatically with:
- PostgreSQL: `members` and `sessions` tables created
- MongoDB: Collections created with validation schemas
- Redis: Ready for key-value operations

### 4. Test Connections

You can test database connections using the provided utilities:

```typescript
import { testConnection } from '@/lib/db/postgres';
import { testRedisConnection } from '@/lib/db/redis';
import { testMongoConnection } from '@/lib/db/mongodb';

// In your API route or script
await testConnection(); // PostgreSQL
await testRedisConnection(); // Redis
await testMongoConnection(); // MongoDB
```

## Database Schema

### PostgreSQL - Members Table

```sql
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    status VARCHAR(20) DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);
```

### PostgreSQL - Sessions Table

```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES members(id),
    session_token VARCHAR(500) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB Collections

#### Activity Logs
```javascript
{
  memberId: "uuid",
  action: "register|login|logout|update_profile|password_change|delete_account",
  ipAddress: "IP address",
  userAgent: "Browser/device info",
  metadata: { /* action-specific data */ },
  timestamp: Date,
  success: boolean,
  errorMessage: "Error if failed"
}
```

#### Error Logs
```javascript
{
  level: "error|warn|info|debug",
  message: "Error message",
  stack: "Stack trace",
  context: { /* additional context */ },
  timestamp: Date
}
```

#### Analytics
```javascript
{
  eventType: "Event name",
  memberId: "uuid (optional)",
  data: { /* event-specific data */ },
  timestamp: Date
}
```

## API Endpoints

### Register New Member

**POST** `/api/members/register`

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "SecurePassword123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username"
  }
}
```

### Login

**POST** `/api/members/login`

```json
{
  "emailOrUsername": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "token": "jwt-token",
    "expiresAt": "2025-01-05T00:00:00.000Z"
  }
}
```

## Database Operations

### PostgreSQL Operations

```typescript
import { query, transaction, getClient } from '@/lib/db/postgres';

// Simple query
const result = await query('SELECT * FROM members WHERE email = $1', ['user@example.com']);

// Transaction
await transaction(async (client) => {
  await client.query('INSERT INTO members ...');
  await client.query('INSERT INTO sessions ...');
});
```

### Redis Operations

```typescript
import { cache, session, rateLimit } from '@/lib/db/redis';

// Cache operations
await cache.set('key', 'value', 3600); // Set with 1 hour expiration
const value = await cache.get('key');

// Session operations
await session.create('session-id', { userId: '123' }, 86400);
const sessionData = await session.get('session-id');

// Rate limiting
const isLimited = await rateLimit.check('user-ip', 100, 60); // 100 requests per minute
```

### MongoDB Operations

```typescript
import { activityLog, errorLog, analytics } from '@/lib/db/mongodb';

// Log activity
await activityLog.log({
  memberId: 'uuid',
  action: 'login',
  ipAddress: '127.0.0.1',
  success: true
});

// Log error
await errorLog.log({
  level: 'error',
  message: 'Something went wrong',
  stack: error.stack
});

// Track analytics
await analytics.track({
  eventType: 'page_view',
  memberId: 'uuid',
  data: { page: '/home' }
});
```

## Security Features

### Password Security
- Passwords hashed using bcrypt with 10 rounds
- Password strength validation (8+ chars, uppercase, lowercase, number)
- Passwords never stored in plain text

### Input Validation
- Email format validation
- Username format validation (3-20 chars, alphanumeric + underscore/hyphen)
- Input sanitization to prevent XSS
- SQL injection prevention using parameterized queries

### Session Management
- JWT tokens with 24-hour expiration
- Sessions stored in both Redis (fast) and PostgreSQL (backup)
- IP address and user agent tracking
- Session revocation support

### Rate Limiting
- Redis-based rate limiting
- Configurable limits per endpoint
- Protection against brute force attacks

## Monitoring and Logging

All user actions are automatically logged to MongoDB:

- **Registration attempts** (success/failure)
- **Login attempts** (success/failure with reasons)
- **Password changes**
- **Profile updates**
- **Account deletions**

Error logs capture:
- Application errors with stack traces
- Database connection issues
- API errors
- Security events

## Database Management

### Access Databases Directly

```bash
# PostgreSQL
docker exec -it claude101-postgres psql -U postgres -d claude101_db

# Redis
docker exec -it claude101-redis redis-cli -a redis123

# MongoDB
docker exec -it claude101-mongodb mongosh -u mongo -p mongo123 --authenticationDatabase admin
```

### Backup Databases

```bash
# PostgreSQL
docker exec claude101-postgres pg_dump -U postgres claude101_db > backup.sql

# MongoDB
docker exec claude101-mongodb mongodump -u mongo -p mongo123 --authenticationDatabase admin -d claude101_logs -o /backup
```

### Stop/Restart Databases

```bash
# Stop all databases
docker-compose down

# Stop and remove volumes (WARNING: deletes all data)
docker-compose down -v

# Restart databases
docker-compose restart

# Restart specific database
docker-compose restart postgres
```

## Troubleshooting

### Connection Issues

If you can't connect to databases:

1. Check if containers are running: `docker-compose ps`
2. Check logs: `docker-compose logs [postgres|redis|mongodb]`
3. Verify ports are not in use: `lsof -i :5432` (PostgreSQL), `:6379` (Redis), `:27017` (MongoDB)
4. Ensure `.env` file has correct credentials

### Data Initialization Issues

If tables/collections aren't created:

1. Stop containers: `docker-compose down -v`
2. Restart: `docker-compose up -d`
3. Check initialization logs: `docker-compose logs postgres mongodb`

## Production Considerations

When deploying to production:

1. **Change all passwords** in `.env` file
2. **Use strong JWT_SECRET** and SESSION_SECRET
3. **Enable SSL/TLS** for database connections
4. **Set up database backups** (automated daily backups)
5. **Configure connection pooling** limits based on load
6. **Enable MongoDB authentication** in production mode
7. **Use environment-specific configurations**
8. **Implement database monitoring** and alerting
9. **Review and adjust rate limits**
10. **Set up log rotation** for MongoDB collections

## Next.js as Full-Stack Framework

Yes! Next.js can be both frontend and backend. This project demonstrates:

1. **API Routes** (`/app/api/*`) - Backend REST endpoints
2. **Server Components** - Direct database access without API calls
3. **Client Components** - Interactive UI with React hooks
4. **Server Actions** - Alternative to API routes (can be added)

You don't need a separate Express/Node.js server - Next.js handles it all!
