# Quick Start Guide

Get up and running with the Claude 101 full-stack application in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Git (to clone the repository)

## Installation Steps

### 1. Clone & Install

```bash
# Navigate to project directory
cd claude101

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy environment variables
cp .env.example .env

# Optional: Edit .env if you want to change database passwords
# The defaults are already configured for local development
```

### 3. Start Databases

```bash
# Start all databases (PostgreSQL, Redis, MongoDB)
docker-compose up -d

# Check if databases are running (should see 3 containers)
docker-compose ps

# Expected output:
# claude101-postgres   running   5432/tcp
# claude101-redis      running   6379/tcp
# claude101-mongodb    running   27017/tcp
```

### 4. Start Next.js

```bash
# Run development server
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api/*

## Testing the Application

### 1. Visit the Home Page

Open http://localhost:3000 in your browser.

### 2. Test Authentication

Navigate to http://localhost:3000/auth

**Register a new account:**
- Email: `test@example.com`
- Username: `testuser`
- Password: `Test123456` (must have uppercase, lowercase, number)
- Fill optional fields if desired
- Click "Create Account"

**Login:**
- Use email or username: `test@example.com` or `testuser`
- Password: `Test123456`
- Click "Sign In"

Upon successful login, you'll be redirected to the home page with your session stored!

### 3. Test API Endpoints Directly

Using curl or Postman:

**Register:**
```bash
curl -X POST http://localhost:3000/api/members/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "myusername",
    "password": "SecurePass123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/members/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "user@example.com",
    "password": "SecurePass123"
  }'
```

## Verify Database Data

### Check PostgreSQL (Members)

```bash
# Access PostgreSQL
docker exec -it claude101-postgres psql -U postgres -d claude101_db

# View all members
SELECT id, email, username, created_at FROM members;

# Exit
\q
```

### Check Redis (Sessions)

```bash
# Access Redis
docker exec -it claude101-redis redis-cli -a redis123

# View all session keys
KEYS session:*

# View specific session
GET session:your-session-id

# Exit
exit
```

### Check MongoDB (Logs)

```bash
# Access MongoDB
docker exec -it claude101-mongodb mongosh -u mongo -p mongo123 --authenticationDatabase admin

# Switch to logs database
use claude101_logs

# View activity logs
db.activity_logs.find().sort({timestamp: -1}).limit(5)

# Exit
exit
```

## Common Issues & Solutions

### Port Already in Use

If you see "port already in use" errors:

```bash
# Check what's using the ports
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
lsof -i :27017 # MongoDB
lsof -i :3000  # Next.js

# Kill the process if needed
kill -9 <PID>
```

### Databases Not Starting

```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: deletes all data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Connection Errors

Check that:
1. Docker containers are running: `docker-compose ps`
2. Environment variables match: `cat .env`
3. No firewall blocking ports

### Import/Module Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Explore the Code**
   - Check out `/src/app/api/members/` for backend API implementation
   - Look at `/src/lib/db/` for database utilities
   - Review `/src/components/AuthForms.tsx` for frontend forms

2. **Read Documentation**
   - [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Detailed database guide
   - [CLAUDE.md](./CLAUDE.md) - Project architecture and guidelines

3. **Extend the Application**
   - Add profile update functionality
   - Implement password reset
   - Add email verification
   - Create admin dashboard
   - Add more analytics

4. **Learn Full-Stack Next.js**
   - This project proves Next.js can be both frontend AND backend
   - No need for separate Express/Node.js server
   - API Routes handle all backend logic
   - Server Components can query databases directly

## Stopping the Application

```bash
# Stop Next.js (Ctrl+C in terminal)

# Stop databases
docker-compose down

# Stop and remove all data
docker-compose down -v
```

## Production Deployment

Before deploying to production:

1. Change all passwords in `.env`
2. Set strong `JWT_SECRET` and `SESSION_SECRET`
3. Enable SSL for database connections
4. Set up automated backups
5. Configure monitoring and logging
6. Review security settings
7. Set `NODE_ENV=production`

## Support

For questions or issues:
1. Check [DATABASE_SETUP.md](./DATABASE_SETUP.md)
2. Review error logs: `docker-compose logs`
3. Check Next.js console output

Happy coding!
