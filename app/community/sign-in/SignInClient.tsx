'use client';

// Wave 5, Task A2 — Sign-in page using Supabase Auth

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function SignInClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/community/dashboard';

  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      // Google OAuth redirects; no router.push needed here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2A1F14] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-widest text-[#2A1F14]/50 mb-3">Member Portal</p>
          <h1 className="font-serif text-4xl font-light">Welcome Back</h1>
          <p className="mt-3 text-sm text-[#2A1F14]/60">
            Sign in to the Barbets Duet community network.
          </p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={handleGoogleSignIn}
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

        {/* Email / password form */}
        <form onSubmit={handleEmailSignIn} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

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
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-[#2A1F14]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2A1F14] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2A1F14] text-[#F4EFE6] rounded-xl py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-[#1a2e25] transition-colors disabled:opacity-50"
          >
            {loading
              ? <Loader2 size={16} className="animate-spin" />
              : <LogIn size={16} />}
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#2A1F14]/60">
          No account yet?{' '}
          <Link
            href="/community/sign-up"
            className="underline underline-offset-2 text-[#2A1F14] hover:opacity-70"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
