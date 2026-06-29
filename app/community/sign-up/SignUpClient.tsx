'use client';

// Wave 5, Task A2 — Sign-up page with role assignment
// Default role: 'local_community' (lowest tier).
// Role assignment is handled by the Supabase trigger (handle_new_user)
// which auto-creates the profiles row with role='local_community'.

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { MEMBER_ROLE_LABELS } from '@/types/community';

export default function SignUpClient() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [emailSent, setEmailSent]     = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, displayName);
      // Supabase may require email confirmation depending on project settings.
      // Show confirmation message; redirect to sign-in.
      setEmailSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-up failed.');
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] text-[#2A1F14] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-[#2A1F14]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-[#2A1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-light mb-4">Check your email</h1>
          <p className="text-sm text-[#2A1F14]/60 mb-8">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <p className="text-xs text-[#2A1F14]/40">
            Already confirmed?{' '}
            <Link href="/community/sign-in" className="underline text-[#2A1F14]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2A1F14] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#2A1F14]/50 mb-3">Member Portal</p>
          <h1 className="font-serif text-4xl font-light">Join the Network</h1>
          <p className="mt-3 text-sm text-[#2A1F14]/60">
            Create an account to connect with learning sites and community members.
          </p>
        </div>

        {/* Starting role note */}
        <div className="bg-[#2A1F14]/5 rounded-xl px-4 py-3 mb-6 text-sm text-[#2A1F14]/70">
          New members join as{' '}
          <span className="font-semibold text-[#2A1F14]">
            {MEMBER_ROLE_LABELS['local_community']}
          </span>
          . Site coordinators can upgrade your role.
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 bg-white border border-[#2A1F14]/20 rounded-xl py-3 px-6 text-sm font-medium hover:border-[#2A1F14]/50 transition-colors mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#2A1F14]/10" />
          <span className="text-xs text-[#2A1F14]/40 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-[#2A1F14]/10" />
        </div>

        {/* Sign-up form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-[#2A1F14]/60">
              Display Name
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-white border border-[#2A1F14]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A1F14] transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-[#2A1F14]/60">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white border border-[#2A1F14]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A1F14] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest mb-1.5 text-[#2A1F14]/60">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-[#2A1F14]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A1F14] transition-colors"
              placeholder="Minimum 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2A1F14] text-[#F4EFE6] rounded-xl py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#1a2e25] transition-colors disabled:opacity-50"
          >
            {loading
              ? <Loader2 size={16} className="animate-spin" />
              : <UserPlus size={16} />}
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#2A1F14]/60">
          Already a member?{' '}
          <Link
            href="/community/sign-in"
            className="underline underline-offset-2 text-[#2A1F14] hover:opacity-70"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
