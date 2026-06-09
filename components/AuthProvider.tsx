'use client';

// ============================================================
// AuthProvider — Wave 5, Task A2
// Migrated from Firebase Auth → Supabase Auth
// ============================================================
// Provides useAuth() hook with sign-up, sign-in, sign-out,
// Google OAuth, and a typed `profile` object (from profiles table).
// Shape is backward-compatible: components using useAuth()
// that only need `user` / `loading` / `logOut` continue to work.
// ============================================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/community';

// ── Auth context shape ──────────────────────────────────────

interface AuthContextType {
  /** Supabase Auth user object (null when unauthenticated). */
  user: User | null;

  /** Full profile row from `profiles` table (null until loaded). */
  profile: Profile | null;

  /** True while session / profile is being resolved. */
  loading: boolean;

  /** Sign in with email + password. Throws on error. */
  signIn: (email: string, password: string) => Promise<void>;

  /**
   * Sign up with email + password.
   * Supabase trigger auto-creates the profiles row.
   * Returns the created user or throws on error.
   */
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;

  /** Sign in via Google OAuth (popup redirect). */
  signInWithGoogle: () => Promise<void>;

  /** Sign out and clear local state. */
  logOut: () => Promise<void>;

  /** Refresh local profile from Supabase (call after profile edits). */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => { throw new Error('AuthProvider not mounted'); },
  signInWithGoogle: async () => {},
  logOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// ── Provider ────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]       = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // ── Fetch profile row ────────────────────────────────────
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('[AuthProvider] fetchProfile error:', error.message);
      setProfile(null);
      return;
    }
    setProfile(data as Profile);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  // ── Subscribe to Supabase Auth session ───────────────────
  useEffect(() => {
    let mounted = true;

    // Initialise from existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // Subscribe to future auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        if (!mounted) return;
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ── Auth actions ─────────────────────────────────────────

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, displayName?: string): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName ?? email.split('@')[0],
        },
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Sign-up succeeded but no user returned.');
    return data.user;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback`
          : undefined,
      },
    });
    if (error) throw error;
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
