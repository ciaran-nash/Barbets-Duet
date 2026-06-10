'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/admin'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    if (!supabase) {
      setError('Authentication service is not configured. Contact your administrator.')
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#06211A] mb-1.5 font-['DM_Sans']"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 text-sm bg-white border border-[#06211A]/20 rounded-md
                     text-[#06211A] placeholder:text-[#06211A]/30 font-['DM_Sans']
                     focus:outline-none focus:ring-2 focus:ring-[#DBFF66] focus:border-transparent
                     transition-shadow"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#06211A] mb-1.5 font-['DM_Sans']"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2.5 text-sm bg-white border border-[#06211A]/20 rounded-md
                     text-[#06211A] font-['DM_Sans']
                     focus:outline-none focus:ring-2 focus:ring-[#DBFF66] focus:border-transparent
                     transition-shadow"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 font-['DM_Sans']">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 bg-[#06211A] text-[#DBFF66] text-sm font-medium
                   rounded-md font-['DM_Sans'] transition-opacity
                   hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>

      {/* TODO: Google OAuth — add when Supabase OAuth provider is configured */}
    </form>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#F4F4F5]">
      <div className="w-full max-w-sm px-6">
        <div className="mb-8">
          <p className="text-xs font-medium tracking-widest text-[#06211A]/40 uppercase mb-2 font-['DM_Sans']">
            Admin portal
          </p>
          <h1 className="text-2xl font-semibold text-[#06211A] font-['DM_Sans']">
            Sign in
          </h1>
        </div>

        {/*
          Suspense boundary required because LoginForm uses useSearchParams().
          Without this, Next.js will error at build time for dynamic usage in
          a statically-rendered page segment.
        */}
        <Suspense fallback={<div className="h-48 animate-pulse bg-white/50 rounded-md" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  )
}
