#!/bin/bash

# API Test Script
# Tests the member registration and login endpoints

echo "======================================"
echo "Claude 101 - API Test Script"
echo "======================================"
echo ""

BASE_URL="http://localhost:3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Generate random user data
RANDOM_NUM=$RANDOM
TEST_EMAIL="testuser${RANDOM_NUM}@example.com"
TEST_USERNAME="testuser${RANDOM_NUM}"
TEST_PASSWORD="TestPassword123"

echo -e "${YELLOW}Test Data:${NC}"
echo "Email: $TEST_EMAIL"
echo "Username: $TEST_USERNAME"
echo "Password: $TEST_PASSWORD"
echo ""

# Test 1: Register new member
echo -e "${YELLOW}Test 1: Registering new member...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/members/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"username\": \"$TEST_USERNAME\",
    \"password\": \"$TEST_PASSWORD\",
    \"first_name\": \"Test\",
    \"last_name\": \"User\"
  }")

echo "$REGISTER_RESPONSE" | jq '.'

if echo "$REGISTER_RESPONSE" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ Registration successful${NC}"
else
    echo -e "${RED}✗ Registration failed${NC}"
    exit 1
fi
echo ""

# Wait a moment
sleep 1

# Test 2: Login with email
echo -e "${YELLOW}Test 2: Login with email...${NC}"
LOGIN_EMAIL_RESPONSE=$(curl -s -X POST "$BASE_URL/api/members/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"emailOrUsername\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "$LOGIN_EMAIL_RESPONSE" | jq '.'

if echo "$LOGIN_EMAIL_RESPONSE" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ Login with email successful${NC}"
    TOKEN=$(echo "$LOGIN_EMAIL_RESPONSE" | jq -r '.data.token')
    echo "Token: ${TOKEN:0:20}..."
else
    echo -e "${RED}✗ Login with email failed${NC}"
    exit 1
fi
echo ""

# Wait a moment
sleep 1

# Test 3: Login with username
echo -e "${YELLOW}Test 3: Login with username...${NC}"
LOGIN_USERNAME_RESPONSE=$(curl -s -X POST "$BASE_URL/api/members/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"emailOrUsername\": \"$TEST_USERNAME\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "$LOGIN_USERNAME_RESPONSE" | jq '.'

if echo "$LOGIN_USERNAME_RESPONSE" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ Login with username successful${NC}"
else
    echo -e "${RED}✗ Login with username failed${NC}"
    exit 1
fi
echo ""

# Test 4: Duplicate registration (should fail)
echo -e "${YELLOW}Test 4: Attempting duplicate registration (should fail)...${NC}"
DUPLICATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/members/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"username\": \"different_username\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "$DUPLICATE_RESPONSE" | jq '.'

if echo "$DUPLICATE_RESPONSE" | jq -e '.success == false' > /dev/null; then
    echo -e "${GREEN}✓ Duplicate email correctly rejected${NC}"
else
    echo -e "${RED}✗ Duplicate email should have been rejected${NC}"
    exit 1
fi
echo ""

# Test 5: Invalid password (should fail)
echo -e "${YELLOW}Test 5: Login with wrong password (should fail)...${NC}"
WRONG_PASSWORD_RESPONSE=$(curl -s -X POST "$BASE_URL/api/members/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"emailOrUsername\": \"$TEST_EMAIL\",
    \"password\": \"WrongPassword123\"
  }")

echo "$WRONG_PASSWORD_RESPONSE" | jq '.'

if echo "$WRONG_PASSWORD_RESPONSE" | jq -e '.success == false' > /dev/null; then
    echo -e "${GREEN}✓ Wrong password correctly rejected${NC}"
else
    echo -e "${RED}✗ Wrong password should have been rejected${NC}"
    exit 1
fi
echo ""

# Summary
echo "======================================"
echo -e "${GREEN}All tests passed! ✓${NC}"
echo "======================================"
echo ""
echo "Your authentication system is working correctly!"
echo ""
echo "Test user created:"
echo "  Email: $TEST_EMAIL"
echo "  Username: $TEST_USERNAME"
echo "  Password: $TEST_PASSWORD"
echo ""
echo "You can now:"
echo "1. Visit http://localhost:3000/auth to test the UI"
echo "2. Check PostgreSQL: docker exec -it claude101-postgres psql -U postgres -d claude101_db -c 'SELECT email, username, created_at FROM members;'"
echo "3. Check Redis sessions: docker exec -it claude101-redis redis-cli -a redis123 KEYS 'session:*'"
echo "4. Check MongoDB logs: docker exec -it claude101-mongodb mongosh -u mongo -p mongo123 --authenticationDatabase admin --eval 'use claude101_logs; db.activity_logs.find().sort({timestamp: -1}).limit(5)'"
echo ""
