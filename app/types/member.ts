/**
 * Member Types and Interfaces
 *
 * Defines the structure of member data and related types.
 */

export interface Member {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
}

export interface MemberSession {
  id: string;
  member_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  expires_at: Date;
  created_at: Date;
}

// API Request/Response types
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    username: string;
  };
  error?: string;
}

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    username: string;
    token: string;
    expiresAt: string;
  };
  error?: string;
}

export interface LogoutRequest {
  sessionToken: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Public member data (without sensitive info)
export interface PublicMember {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  status: string;
  email_verified: boolean;
  created_at: Date;
  last_login_at?: Date;
}

// Helper type to omit password_hash
export type SafeMember = Omit<Member, 'password_hash'>;
