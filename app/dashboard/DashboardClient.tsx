'use client';

import { useAuth } from '@/components/AuthProvider';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Save, User as UserIcon, Calendar, Edit2, Loader2, Home } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';

interface UserProfile {
  displayName: string;
  bio?: string;
  createdAt: number;
  updatedAt: number;
}

interface SavedEvent {
  eventId: string;
  title: string;
  date: string;
  savedAt: number;
}

export default function DashboardClient() {
  const { user, loading, logOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setProfile(data);
          setEditName(data.displayName);
          setEditBio(data.bio || '');
        } else {
          // Create default profile
          const newProfile: UserProfile = {
            displayName: user.displayName || 'New User',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
          setEditName(newProfile.displayName);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      }
    };

    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'users', user.uid, 'saved_events');
        const qSnap = await getDocs(eventsRef);
        const events = qSnap.docs.map(d => d.data() as SavedEvent);
        setSavedEvents(events.sort((a,b) => b.savedAt - a.savedAt));
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/saved_events`);
      }
    };

    const loadData = async () => {
      setIsDataLoading(true);
      await Promise.all([fetchProfile(), fetchEvents()]);
      setIsDataLoading(false);
    };

    loadData();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    setSavingProfile(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      const updates = {
        displayName: editName,
        bio: editBio,
        updatedAt: Date.now()
      };
      await updateDoc(docRef, updates);
      setProfile({ ...profile, ...updates });
      setIsEditing(false);
    } catch (error) {
       handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'saved_events', eventId));
      setSavedEvents(savedEvents.filter(e => e.eventId !== eventId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/saved_events/${eventId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#2C3E35]">
        <div className="animate-spin text-[#2C3E35]/40"><Loader2 size={32} /></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#2C3E35]">
        <div className="text-center">
          <h2 className="font-serif text-3xl mb-4">Please log in to view your dashboard</h2>
          <Link href="/" className="text-xs uppercase tracking-widest font-semibold border-b border-[#2C3E35] pb-1">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C3E35] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16 border-b border-[#2C3E35]/10 pb-8">
          <div>
            <h1 className="font-serif text-4xl lg:text-6xl font-light mb-2">Welcome Back,</h1>
            <p className="text-xl italic font-serif text-[#2C3E35]/80">{profile?.displayName || user.displayName}</p>
          </div>
          <div className="flex items-center gap-6">
             <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#2C3E35]/60 hover:text-[#2C3E35] transition-colors">
               <Home size={16} /> Home
             </Link>
            <button 
              onClick={logOut}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#2C3E35]/60 hover:text-[#2C3E35] transition-colors"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#2C3E35]/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  <UserIcon size={16} /> Profile Information
                </h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="text-[#2C3E35]/50 hover:text-[#2C3E35]">
                    <Edit2 size={16} />
                  </button>
                )}
              </div>

              {isDataLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div>
                    <div className="h-4 w-24 bg-[#2C3E35]/10 rounded mb-2"></div>
                    <div className="h-6 w-48 bg-[#2C3E35]/10 rounded"></div>
                  </div>
                  <div>
                    <div className="h-4 w-12 bg-[#2C3E35]/10 rounded mb-2"></div>
                    <div className="h-16 w-full bg-[#2C3E35]/10 rounded"></div>
                  </div>
                </div>
              ) : isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1 opacity-60">Display Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#2C3E35]/20 rounded-lg px-4 py-2 outline-none focus:border-[#2C3E35]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest mb-1 opacity-60">Bio</label>
                    <textarea 
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      rows={4}
                      className="w-full bg-[#FAF9F6] border border-[#2C3E35]/20 rounded-lg px-4 py-2 outline-none focus:border-[#2C3E35] resize-none"
                    />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      className="bg-[#2C3E35] text-[#FAF9F6] px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold flex items-center gap-2 flex-1 justify-center disabled:opacity-50"
                    >
                      {savingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(profile?.displayName || '');
                        setEditBio(profile?.bio || '');
                      }}
                      className="border border-[#2C3E35]/20 px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Display Name</p>
                    <p className="font-medium">{profile?.displayName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Bio</p>
                    <p className="text-sm leading-relaxed text-[#2C3E35]/80">
                      {profile?.bio || <span className="italic opacity-50">No bio added yet.</span>}
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Saved Events Section */}
          <div className="lg:col-span-2 space-y-8">
            <section>
               <h2 className="text-xs uppercase tracking-widest font-semibold flex items-center gap-2 mb-6 text-[#2C3E35]/60">
                  <Calendar size={16} /> Saved Events & Studies
                </h2>
                
                {isDataLoading ? (
                  <div className="grid gap-4 animate-pulse">
                    {[1, 2].map(i => (
                      <div key={i} className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm border border-[#2C3E35]/5 group">
                        <div className="w-full">
                          <div className="h-6 w-64 bg-[#2C3E35]/10 rounded mb-2"></div>
                          <div className="h-4 w-32 bg-[#2C3E35]/10 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : savedEvents.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#2C3E35]/5">
                    <p className="italic font-serif text-xl text-[#2C3E35]/60 mb-4">No saved items yet.</p>
                    <p className="text-sm text-[#2C3E35]/50">Explore our case studies and network to save items here.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {savedEvents.map(event => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={event.eventId} 
                        className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm border border-[#2C3E35]/5 group"
                      >
                        <div>
                          <h3 className="font-serif text-xl mb-1">{event.title}</h3>
                          <p className="text-xs tracking-widest uppercase text-[#2C3E35]/50">{event.date}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteEvent(event.eventId)}
                          className="text-[#2C3E35]/40 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                           <LogOut size={16} className="rotate-180" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
