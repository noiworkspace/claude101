/**
 * Member Login API Route
 *
 * POST /api/members/login
 * Handles member authentication with session creation.
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/db/postgres';
import { session } from '@/app/lib/db/redis';
import { activityLog, errorLog } from '@/app/lib/db/mongodb';
import {
  verifyPassword,
  generateToken,
  generateSessionToken,
  sanitizeInput,
} from '@/app/lib/auth';
import { getClientIp, getUserAgent } from '@/app/lib/utils';
import { LoginRequest, LoginResponse, Member } from '@/app/types/member';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let memberId: string | undefined;

  try {
    // Parse request body
    const body: LoginRequest = await request.json();

    // Validate required fields
    if (!body.emailOrUsername || !body.password) {
      return NextResponse.json<LoginResponse>(
        {
          success: false,
          message: 'Missing required fields',
          error: 'Email/username and password are required',
        },
        { status: 400 }
      );
    }

    // Sanitize input
    const emailOrUsername = sanitizeInput(body.emailOrUsername.toLowerCase());

    // Find member by email or username
    const result = await query<Member>(
      `SELECT * FROM members
       WHERE email = $1 OR username = $1
       LIMIT 1`,
      [emailOrUsername]
    );

    if (result.rows.length === 0) {
      // Log failed attempt (no user found)
      await activityLog.log({
        memberId: 'anonymous',
        action: 'login',
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
        metadata: { emailOrUsername, reason: 'user_not_found' },
        success: false,
        errorMessage: 'Invalid credentials',
      });

      return NextResponse.json<LoginResponse>(
        {
          success: false,
          message: 'Login failed',
          error: 'Invalid email/username or password',
        },
        { status: 401 }
      );
    }

    const member = result.rows[0];
    memberId = member.id;

    // Check if member is active
    if (member.status !== 'active') {
      await activityLog.log({
        memberId: member.id,
        action: 'login',
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
        metadata: { status: member.status },
        success: false,
        errorMessage: 'Account is not active',
      });

      return NextResponse.json<LoginResponse>(
        {
          success: false,
          message: 'Login failed',
          error: `Account is ${member.status}. Please contact support.`,
        },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(body.password, member.password_hash);

    if (!isPasswordValid) {
      // Log failed attempt (wrong password)
      await activityLog.log({
        memberId: member.id,
        action: 'login',
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
        metadata: { reason: 'invalid_password' },
        success: false,
        errorMessage: 'Invalid password',
      });

      return NextResponse.json<LoginResponse>(
        {
          success: false,
          message: 'Login failed',
          error: 'Invalid email/username or password',
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      memberId: member.id,
      email: member.email,
      username: member.username,
    });

    // Generate session token
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store session in Redis
    await session.create(
      sessionToken,
      {
        memberId: member.id,
        email: member.email,
        username: member.username,
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
        createdAt: new Date().toISOString(),
      },
      86400 // 24 hours in seconds
    );

    // Store session in PostgreSQL (backup)
    await query(
      `INSERT INTO sessions (member_id, session_token, ip_address, user_agent, expires_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        member.id,
        sessionToken,
        getClientIp(request),
        getUserAgent(request),
        expiresAt,
      ]
    );

    // Update last login time
    await query(
      'UPDATE members SET last_login_at = CURRENT_TIMESTAMP WHERE id = $1',
      [member.id]
    );

    // Log successful login
    await activityLog.log({
      memberId: member.id,
      action: 'login',
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      metadata: {
        loginTime: Date.now() - startTime,
        sessionToken,
      },
      success: true,
    });

    // Return success response
    return NextResponse.json<LoginResponse>(
      {
        success: true,
        message: 'Login successful',
        data: {
          id: member.id,
          email: member.email,
          username: member.username,
          token,
          expiresAt: expiresAt.toISOString(),
        },
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error
    await errorLog.log({
      level: 'error',
      message: 'Login error',
      stack: error instanceof Error ? error.stack : undefined,
      context: {
        memberId,
        endpoint: '/api/members/login',
        duration: Date.now() - startTime,
      },
    });

    console.error('Login error:', error);

    return NextResponse.json<LoginResponse>(
      {
        success: false,
        message: 'Internal server error',
        error: 'An error occurred during login. Please try again later.',
      },
      { status: 500 }
    );
  }
}
