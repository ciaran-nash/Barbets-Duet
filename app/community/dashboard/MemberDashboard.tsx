'use client';

// ============================================================
// Member Dashboard Shell — Wave 5, Task A3
// ============================================================
// Features:
//   - Profile card with avatar, display name, role badge
//   - Inline bio edit
//   - Site affiliations list (from learning_site_memberships)
//   - Avatar upload to Supabase Storage (bucket: avatars)
//   - Pentangle group display
//   - Mock placeholders for Wave 6 forum / peer-review links
// ============================================================

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  LogOut,
  Edit2,
  Save,
  X,
  Upload,
  Home,
  MapPin,
  Users,
} from 'lucide-react';

import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase/client';
import {
  MEMBER_ROLE_LABELS,
  MEMBER_ROLE_COLOURS,
  PENTANGLE_GROUP_LABELS,
  type LearningSiteMembership,
} from '@/types/community';

// ── Placeholder avatar ──────────────────────────────────────
function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="w-24 h-24 rounded-full bg-[#2A1F14]/10 flex items-center justify-center text-[#2A1F14] font-serif text-2xl select-none">
      {initials || '?'}
    </div>
  );
}

// ── Role badge ──────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  const label = MEMBER_ROLE_LABELS[role as keyof typeof MEMBER_ROLE_LABELS] ?? role;
  const colour = MEMBER_ROLE_COLOURS[role as keyof typeof MEMBER_ROLE_COLOURS] ?? '#2A1F14';

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-white"
      style={{ backgroundColor: colour }}
    >
      {label}
    </span>
  );
}

// ── Main component ──────────────────────────────────────────
export default function MemberDashboard() {
  const router = useRouter();
  const { user, profile, loading, logOut, refreshProfile } = useAuth();

  // Profile edit state
  const [isEditing, setIsEditing]   = useState(false);
  const [editName, setEditName]     = useState('');
  const [editBio, setEditBio]       = useState('');
  const [saving, setSaving]         = useState(false);
  const [saveError, setSaveError]   = useState<string | null>(null);

  // Avatar upload state
  const fileInputRef                = useRef<HTMLInputElement>(null);
  const [uploading, setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Memberships loaded from Supabase
  const [memberships, setMemberships]     = useState<LearningSiteMembership[]>([]);
  const [membershipsLoaded, setMembershipsLoaded] = useState(false);

  // Load memberships once profile is available
  const loadMemberships = async (userId: string) => {
    if (membershipsLoaded) return;
    const { data } = await supabase
      .from('learning_site_memberships')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false });

    setMemberships((data ?? []) as LearningSiteMembership[]);
    setMembershipsLoaded(true);
  };

  // Run once when user is known
  if (user && !membershipsLoaded) {
    loadMemberships(user.id);
  }

  // Populate edit fields when entering edit mode
  const startEditing = () => {
    setEditName(profile?.display_name ?? '');
    setEditBio(profile?.bio ?? '');
    setSaveError(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setSaveError(null);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSaveError(null);

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: editName.trim(),
        bio: editBio.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      setSaveError(error.message);
    } else {
      await refreshProfile();
      setIsEditing(false);
    }

    setSaving(false);
  };

  // ── Avatar upload ──────────────────────────────────────
  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate
    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_SIZE) {
      setUploadError('Avatar must be under 2 MB.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Only JPEG, PNG, or WebP accepted.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const ext = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${ext}`;

    // Upload to Supabase Storage bucket 'avatars'
    const { error: uploadErr } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadErr) {
      setUploadError(uploadErr.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;

    // Persist to profiles
    const { error: updateErr } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (updateErr) {
      setUploadError(updateErr.message);
    } else {
      await refreshProfile();
    }

    setUploading(false);
    // Reset input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Guards ───────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EFE6]">
        <Loader2 size={32} className="animate-spin text-[#2A1F14]/40" />
      </div>
    );
  }

  if (!user) {
    // Middleware should have redirected — this is a fallback
    router.replace('/community/sign-in');
    return null;
  }

  // ── Render ───────────────────────────────────────────────

  const displayName = profile?.display_name ?? user.email ?? 'Member';

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2A1F14]">
      {/* Top nav strip */}
      <div className="border-b border-[#2A1F14]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#2A1F14]/60 hover:text-[#2A1F14] transition-colors">
            <Home size={14} /> Barbets Duet
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#2A1F14]/40 hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={async () => { await logOut(); router.push('/'); }}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#2A1F14]/60 hover:text-[#2A1F14] transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left column: Profile card ───────────────────── */}
          <div className="lg:col-span-1 space-y-6">

            {/* Avatar + name */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#2A1F14]/5 text-center">
              {/* Avatar */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={displayName}
                    fill
                    className="rounded-full object-cover"
                    sizes="96px"
                  />
                ) : (
                  <AvatarPlaceholder name={displayName} />
                )}

                {/* Upload overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  title="Change avatar"
                  className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white disabled:cursor-wait"
                >
                  {uploading
                    ? <Loader2 size={18} className="animate-spin" />
                    : <Upload size={18} />}
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />

              {uploadError && (
                <p className="text-xs text-red-600 mb-3">{uploadError}</p>
              )}

              {/* Name + role badge */}
              {isEditing ? (
                <form onSubmit={handleSave} className="text-left space-y-4 mt-4">
                  {saveError && (
                    <p className="text-xs text-red-600">{saveError}</p>
                  )}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1 opacity-60">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full bg-[#F4EFE6] border border-[#2A1F14]/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A1F14]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1 opacity-60">
                      Bio
                    </label>
                    <textarea
                      value={editBio}
                      onChange={e => setEditBio(e.target.value)}
                      rows={4}
                      maxLength={500}
                      className="w-full bg-[#F4EFE6] border border-[#2A1F14]/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2A1F14] resize-none"
                    />
                    <p className="text-[10px] text-[#2A1F14]/40 mt-1 text-right">
                      {editBio.length}/500
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-[#2A1F14] text-[#F4EFE6] rounded-lg py-2 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="flex-1 border border-[#2A1F14]/20 rounded-lg py-2 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h1 className="font-serif text-2xl font-light mt-2">{displayName}</h1>

                  {profile && (
                    <div className="mt-3">
                      <RoleBadge role={profile.role} />
                    </div>
                  )}

                  {profile?.bio && (
                    <p className="mt-4 text-sm text-[#2A1F14]/70 leading-relaxed text-left">
                      {profile.bio}
                    </p>
                  )}

                  <button
                    onClick={startEditing}
                    className="mt-5 flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#2A1F14]/50 hover:text-[#2A1F14] transition-colors mx-auto"
                  >
                    <Edit2 size={12} /> Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Site affiliations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#2A1F14]/5">
              <h2 className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 mb-5 text-[#2A1F14]/60">
                <MapPin size={14} /> Site Affiliations
              </h2>

              {!membershipsLoaded ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2].map(i => (
                    <div key={i} className="h-10 bg-[#2A1F14]/5 rounded-lg" />
                  ))}
                </div>
              ) : memberships.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm text-[#2A1F14]/50 italic">No site affiliations yet.</p>
                  <Link
                    href="/learning-sites"
                    className="mt-2 inline-block text-xs uppercase tracking-widest underline text-[#2A1F14]/60 hover:text-[#2A1F14]"
                  >
                    Browse learning sites
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {memberships.map(m => (
                    <li key={m.id} className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/learning-sites/${m.site_slug}`}
                          className="text-sm font-medium hover:underline"
                        >
                          {m.site_name}
                        </Link>
                        {m.pentangle_group && (
                          <p className="text-[10px] text-[#2A1F14]/50 mt-0.5">
                            {PENTANGLE_GROUP_LABELS[m.pentangle_group as keyof typeof PENTANGLE_GROUP_LABELS]}
                          </p>
                        )}
                      </div>
                      {m.is_primary && (
                        <span className="text-[9px] uppercase tracking-widest bg-[#2A1F14]/10 px-2 py-0.5 rounded-full mt-0.5 shrink-0">
                          Primary
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* ── Right column: Activity placeholders ─────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Network activity header */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#2A1F14]/50 mb-1">
                  Community
                </p>
                <h2 className="font-serif text-3xl font-light">Your Network</h2>
              </div>
            </div>

            {/* ── Placeholder: Forum (Wave 6) ──────────────── */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#2A1F14]/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2A1F14]/10 flex items-center justify-center">
                  <Users size={16} className="text-[#2A1F14]/60" />
                </div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#2A1F14]/60">
                  Site Forums
                </h3>
                <span className="ml-auto text-[9px] uppercase tracking-widest bg-[#2A1F14]/10 text-[#2A1F14]/50 px-2 py-0.5 rounded-full">
                  Coming in Wave 6
                </span>
              </div>
              <p className="text-sm text-[#2A1F14]/50 italic">
                Discussion threads for your affiliated learning sites will appear here.
                Peer-review and jumuiya governance forums are planned for Wave 6.
              </p>
            </section>

            {/* ── Placeholder: Peer-review chain (Wave 6) ──── */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#2A1F14]/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2A1F14]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2A1F14]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#2A1F14]/60">
                  Peer Review
                </h3>
                <span className="ml-auto text-[9px] uppercase tracking-widest bg-[#2A1F14]/10 text-[#2A1F14]/50 px-2 py-0.5 rounded-full">
                  Coming in Wave 6
                </span>
              </div>
              <p className="text-sm text-[#2A1F14]/50 italic">
                Circular peer-review submissions and responses from your site&apos;s
                pentangle group will be visible here.
              </p>
            </section>

            {/* ── Placeholder: Saved resources (Wave 6) ────── */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#2A1F14]/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#2A1F14]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2A1F14]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#2A1F14]/60">
                  Saved Resources
                </h3>
                <span className="ml-auto text-[9px] uppercase tracking-widest bg-[#2A1F14]/10 text-[#2A1F14]/50 px-2 py-0.5 rounded-full">
                  Coming in Wave 6
                </span>
              </div>
              <p className="text-sm text-[#2A1F14]/50 italic">
                Bookmarked case studies, reports and events will appear here.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
