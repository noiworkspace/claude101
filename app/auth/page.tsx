/**
 * Authentication Page
 *
 * Provides registration and login forms for members.
 * This is a Server Component that renders Client Components.
 */

import { Metadata } from 'next';
import AuthForms from '@/app/components/AuthForms';

export const metadata: Metadata = {
  title: 'Sign In | Claude 101',
  description: 'Register or login to your account',
};

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Create an account or sign in to continue</p>
        </div>

        <AuthForms />
      </div>
    </main>
  );
}
