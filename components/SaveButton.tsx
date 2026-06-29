'use client';

import { useAuth } from './AuthProvider';
import { supabase } from '@/lib/supabase/client';
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
        const { data } = await supabase
          .from('saved_events')
          .select('id')
          .eq('user_id', user.id)
          .eq('event_id', eventId)
          .maybeSingle();
        setIsSaved(!!data);
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
      if (isSaved) {
        const { error } = await supabase
          .from('saved_events')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId);
        if (error) throw error;
        setIsSaved(false);
      } else {
        const { error } = await supabase
          .from('saved_events')
          .insert({ user_id: user.id, event_id: eventId, title, event_date: date });
        if (error) throw error;
        setIsSaved(true);
      }
    } catch (error) {
      console.error('[SaveButton]', error);
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
          ? 'bg-white text-bark border-white'
          : 'bg-bark/30 text-white border-white/20 hover:bg-white/20'
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
