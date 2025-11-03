/**
 * Member Registration API Route
 *
 * POST /api/members/register
 * Handles new member registration with validation and logging.
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/db/postgres';
import { activityLog, errorLog } from '@/app/lib/db/mongodb';
import {
  hashPassword,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  sanitizeInput,
} from '@/app/lib/auth';
import { getClientIp, getUserAgent } from '@/app/lib/utils';
import { RegisterRequest, RegisterResponse } from '@/app/types/member';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let memberId: string | undefined;

  try {
    // Parse request body
    const body: RegisterRequest = await request.json();

    // Validate required fields
    if (!body.email || !body.username || !body.password) {
      return NextResponse.json<RegisterResponse>(
        {
          success: false,
          message: 'Missing required fields',
          error: 'Email, username, and password are required',
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const email = sanitizeInput(body.email.toLowerCase());
    const username = sanitizeInput(body.username);
    const firstName = body.first_name ? sanitizeInput(body.first_name) : undefined;
    const lastName = body.last_name ? sanitizeInput(body.last_name) : undefined;
    const phone = body.phone ? sanitizeInput(body.phone) : undefined;

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json<RegisterResponse>(
        {
          success: false,
          message: 'Invalid email format',
          error: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    // Validate username
    if (!isValidUsername(username)) {
      return NextResponse.json<RegisterResponse>(
        {
          success: false,
          message: 'Invalid username format',
          error: 'Username must be 3-20 characters, start with a letter, and contain only letters, numbers, underscore, or hyphen',
        },
        { status: 400 }
      );
    }

    // Validate password
    const passwordValidation = isValidPassword(body.password);
    if (!passwordValidation.valid) {
      return NextResponse.json<RegisterResponse>(
        {
          success: false,
          message: 'Invalid password',
          error: passwordValidation.message,
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await query(
      'SELECT id FROM members WHERE email = $1',
      [email]
    );

    if (existingEmail.rows.length > 0) {
      // Log failed attempt
      await activityLog.log({
        memberId: 'anonymous',
        action: 'register',
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
        metadata: { email, reason: 'email_exists' },
        success: false,
        errorMessage: 'Email already registered',
      });

      return NextResponse.json<RegisterResponse>(
        {
          success: false,
          message: 'Registration failed',
          error: 'Email already registered',
        },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUsername = await query(
      'SELECT id FROM members WHERE username = $1',
      [username]
    );

    if (existingUsername.rows.length > 0) {
      // Log failed attempt
      await activityLog.log({
        memberId: 'anonymous',
        action: 'register',
        ipAddress: getClientIp(request),
        userAgent: getUserAgent(request),
        metadata: { username, reason: 'username_exists' },
        success: false,
        errorMessage: 'Username already taken',
      });

      return NextResponse.json<RegisterResponse>(
        {
          success: false,
          message: 'Registration failed',
          error: 'Username already taken',
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(body.password);

    // Insert new member
    const result = await query(
      `INSERT INTO members (email, username, password_hash, first_name, last_name, phone, status, email_verified)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, email, username, created_at`,
      [email, username, passwordHash, firstName, lastName, phone, 'active', false]
    );

    const newMember = result.rows[0];
    memberId = newMember.id;

    // Log successful registration
    await activityLog.log({
      memberId: newMember.id,
      action: 'register',
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
      metadata: {
        email,
        username,
        registrationTime: Date.now() - startTime,
      },
      success: true,
    });

    // Return success response
    return NextResponse.json<RegisterResponse>(
      {
        success: true,
        message: 'Registration successful',
        data: {
          id: newMember.id,
          email: newMember.email,
          username: newMember.username,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    // Log error
    await errorLog.log({
      level: 'error',
      message: 'Registration error',
      stack: error instanceof Error ? error.stack : undefined,
      context: {
        memberId,
        endpoint: '/api/members/register',
        duration: Date.now() - startTime,
      },
    });

    console.error('Registration error:', error);

    return NextResponse.json<RegisterResponse>(
      {
        success: false,
        message: 'Internal server error',
        error: 'An error occurred during registration. Please try again later.',
      },
      { status: 500 }
    );
  }
}
