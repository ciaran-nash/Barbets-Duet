'use client';

import { useAuth } from './AuthProvider';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Bookmark, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SaveButtonProps {
  eventId: string;
  title: string;
  date?: string;
  className?: string;
}

export default function SaveButton({ eventId, title, date = 'Ongoing', className = '' }: SaveButtonProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    const checkSaved = async () => {
      try {
        const docRef = doc(db, 'users', user.uid, 'saved_events', eventId);
        const docSnap = await getDoc(docRef);
        setIsSaved(docSnap.exists());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkSaved();
  }, [user, eventId]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!user) {
      alert("Please sign in to save case studies.");
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(db, 'users', user.uid, 'saved_events', eventId);
      if (isSaved) {
        await deleteDoc(docRef);
        setIsSaved(false);
      } else {
        await setDoc(docRef, {
          eventId,
          title,
          date,
          savedAt: Date.now()
        });
        setIsSaved(true);
      }
    } catch (error) {
      handleFirestoreError(error, isSaved ? OperationType.DELETE : OperationType.CREATE, `users/${user.uid}/saved_events/${eventId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleSave}
      disabled={loading}
      className={`p-2 rounded-full backdrop-blur-md border transition-all ${
        isSaved 
          ? 'bg-white text-night-forest border-white' 
          : 'bg-night-forest/30 text-white border-white/20 hover:bg-white/20'
      } ${className}`}
      aria-label={isSaved ? "Remove from saved" : "Save case study"}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Bookmark size={16} className={isSaved ? 'fill-current' : ''} />
      )}
    </button>
  );
}
