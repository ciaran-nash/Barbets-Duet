# Task Brief: T27

**Title:** Admin dashboard
**PRD:** barbets-duet-full-build
**Priority:** could
**Complexity:** 4/10
**Wave:** 6

---

## Objective

Build an admin dashboard at `/admin` protected by Firebase Auth with role-based access. The dashboard allows Barbets Duet staff to view and manage volunteer applications (status updates), view donation records overview, and check content status.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Once volunteer applications (T14) and donations (T15) are live, staff need a way to manage them without accessing the Firestore console directly. The admin dashboard provides a simple table UI for:
1. **Volunteer applications** — view all submissions, update status (pending → accepted / rejected)
2. **Donation records** — summary view of completed donations
3. **Content status** — quick overview (how many sites, stories, etc. are published)

Access control: only users with `role: 'admin'` in their Firestore user document can access `/admin`. Firebase Auth provides authentication; a Firestore `users/{uid}` document with `role: 'admin'` provides authorisation.

This task is **Wave 6** — depends on T14 (volunteer_applications in Firestore), T15 (donation records), and T20 (Sanity content overview).

---

## Requirements

1. Create `app/admin/page.tsx` with Firebase Auth role check
2. Create `app/admin/layout.tsx` — admin layout with auth guard
3. Create `components/admin/ApplicationsTable.tsx` — volunteer applications list
4. Create `components/admin/DonationsOverview.tsx` — donations summary
5. Create `components/admin/ContentStatus.tsx` — site/story count from Sanity
6. Role check: redirect non-admin users to `/` or show 403 page

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/admin` redirects unauthenticated users to sign-in
- [ ] `/admin` shows 403 for authenticated users without `role: 'admin'`
- [ ] Volunteer applications table renders with all Firestore `volunteer_applications` docs
- [ ] Application status can be updated (pending → accepted / rejected)
- [ ] Donations overview renders
- [ ] Content status panel shows counts
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/admin/page.tsx` | create | Admin dashboard main page |
| `app/admin/layout.tsx` | create | Auth guard layout wrapper |
| `components/admin/ApplicationsTable.tsx` | create | Volunteer applications table |
| `components/admin/DonationsOverview.tsx` | create | Donations summary |
| `components/admin/ContentStatus.tsx` | create | Sanity content counts |

---

## Implementation Guidance

### Auth Guard (layout.tsx)

```tsx
// app/admin/layout.tsx
'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/');
      return;
    }

    // Check admin role in Firestore
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.data()?.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, [user, loading, router]);

  if (loading || isAdmin === null) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="font-mono text-accent text-sm">Checking access...</p>
    </div>;
  }

  if (!isAdmin) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-3xl mb-4">Access Denied</p>
        <p className="font-sans text-sm opacity-60">Admin access required</p>
      </div>
    </div>;
  }

  return <>{children}</>;
}
```

### Applications Table

```tsx
// components/admin/ApplicationsTable.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  preferredSiteSlug: string;
  submittedAt: { toDate: () => Date };
  status: 'pending' | 'accepted' | 'rejected';
}

export function ApplicationsTable() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'volunteer_applications'), orderBy('submittedAt', 'desc'));
    getDocs(q).then(snap => {
      setApplications(snap.docs.map(d => ({ id: d.id, ...d.data() } as Application)));
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: 'accepted' | 'rejected') => {
    await updateDoc(doc(db, 'volunteer_applications', id), { status });
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // ... render table
}
```

### Status Badge Colours

```
pending  → amber/yellow
accepted → Neon Lime / Viridian
rejected → muted red (acceptable in admin context only)
```

### Dashboard Layout

```
Header: "Admin Dashboard" + signed in user email
Tabs (or sections): Applications | Donations | Content
Each section uses simple table/card layout
Night Forest background, standard brand styling
```

### Firestore Security Note

The admin dashboard reads `volunteer_applications` collection and updates document status. Ensure `firestore.rules` allows:
- Read: authenticated users with `role: 'admin'` in their user doc
- Write (status update): same

**Do not modify `firestore.rules` in this task** — flag to the developer that rules may need updating for the admin write operations. Security rules changes require careful review.

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`
- `firestore.rules` — flag needed changes but do not modify
- `components/ui/`
- `lib/firebase.ts` — import from here only

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T14 | `volunteer_applications` Firestore collection | Confirm collection has documents |
| T15 | Donation records (may be Stripe records, not Firestore) | Confirm what data is available |
| T20 | Sanity content for content status panel | Verify Sanity queries work |

### Downstream Impact

None.

---

## Commit Guidelines

```
feat(admin): build admin dashboard with applications table and role-based access

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Non-admin user sees 403 on `/admin`
- [ ] Admin user sees applications table
- [ ] Status update persists in Firestore

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T27 | Wave: 6*
