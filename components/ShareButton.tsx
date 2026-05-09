'use client';
import { Share2 } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton({ title, text }: { title?: string, text?: string }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing', error);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex-1 flex justify-center items-center gap-2 border border-[#2C3E35] rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-[#2C3E35] hover:text-white transition-colors py-3"
    >
      <Share2 className="w-4 h-4" />
      {shared ? 'Copied' : 'Share'}
    </button>
  );
}
