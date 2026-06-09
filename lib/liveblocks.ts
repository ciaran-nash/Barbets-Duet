// ============================================================
// Liveblocks Client Config — Wave 6, Task C2
// ============================================================
// Initialises the Liveblocks React client with the custom
// auth endpoint at /api/liveblocks-auth.
// Import { liveblocksClient } wherever useRoom / useStorage
// hooks are needed.
// ============================================================

import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';

// ── Types ─────────────────────────────────────────────────────

/** User metadata stored in Liveblocks presence */
export type UserInfo = {
  name: string;
  avatar: string;
  role: string;
  email: string;
};

/**
 * T&E draft storage shape — 4 prompt fields synced in real-time.
 * Stored in Liveblocks Storage (CRDT, last-write-wins per field).
 */
export type TeDraftStorage = {
  prompt1: string;
  prompt2: string;
  prompt3: string;
  prompt4: string;
  title: string;
  siteSlug: string;
};

/** Presence shape for T&E collaborative drafting rooms */
export type TeDraftPresence = {
  focusedField: keyof TeDraftStorage | null;
  cursor: { x: number; y: number } | null;
  lastSeen: number;
};

/** Presence shape for forum rooms */
export type ForumPresence = {
  typing: boolean;
  threadId: string | null;
  lastSeen: number;
};

// ── Client ────────────────────────────────────────────────────

export const liveblocksClient = createClient({
  authEndpoint: '/api/liveblocks-auth',
});

// ── T&E Draft room context ────────────────────────────────────

export const {
  RoomProvider: TeDraftRoomProvider,
  useRoom: useTeDraftRoom,
  useMyPresence: useTeDraftMyPresence,
  useOthers: useTeDraftOthers,
  useStorage: useTeDraftStorage,
  useMutation: useTeDraftMutation,
  useStatus: useTeDraftStatus,
} = createRoomContext<TeDraftPresence, TeDraftStorage>(liveblocksClient);

// ── Forum room context ────────────────────────────────────────

export const {
  RoomProvider: ForumRoomProvider,
  useMyPresence: useForumMyPresence,
  useOthers: useForumOthers,
  useStatus: useForumStatus,
} = createRoomContext<ForumPresence>(liveblocksClient);
