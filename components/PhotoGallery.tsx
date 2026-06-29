'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Loader2, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface PhotoGalleryProps {
  siteId: string;
  initialImages: string[];
}

interface GalleryImage {
  id: string;
  url: string;
  addedBy: string | null;
  storagePath: string;
  createdAt: string;
}

const BUCKET = 'site-gallery';

export default function PhotoGallery({ siteId, initialImages }: PhotoGalleryProps) {
  const { user } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('site_gallery')
          .select('id, url, added_by, storage_path, created_at')
          .eq('site_slug', siteId)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setImages(
          (data ?? []).map((row) => ({
            id: row.id,
            url: row.url,
            addedBy: row.added_by,
            storagePath: row.storage_path,
            createdAt: row.created_at,
          }))
        );
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [siteId]);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert('Must be logged in to add photos');
    if (!selectedFile) return;

    setSubmitting(true);
    try {
      const storagePath = `${siteId}/${Date.now()}_${selectedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, selectedFile);
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      const url = pub.publicUrl;

      const { data: row, error: insertError } = await supabase
        .from('site_gallery')
        .insert({ site_slug: siteId, storage_path: storagePath, url, added_by: user.id })
        .select('id, created_at')
        .single();
      if (insertError) throw insertError;

      setImages([
        { id: row.id, url, addedBy: user.id, storagePath, createdAt: row.created_at },
        ...images,
      ]);

      setSelectedFile(null);
      setIsAdding(false);
    } catch (error) {
      console.error('[PhotoGallery] upload error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    const target = images.find((img) => img.id === id);
    try {
      const { error } = await supabase.from('site_gallery').delete().eq('id', id);
      if (error) throw error;
      if (target?.storagePath) {
        await supabase.storage.from(BUCKET).remove([target.storagePath]);
      }
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error('[PhotoGallery] delete error:', error);
    }
  };

  if (loading) {
    return (
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-serif text-2xl animate-pulse bg-foreground/20 h-8 w-48 rounded"></h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-2xl bg-foreground/10 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-serif text-2xl">Photo Gallery</h3>
        {user && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-border px-4 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            <Plus size={16} /> Add Photo
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">Add New Photo</h4>
            <button onClick={() => setIsAdding(false)} className="text-foreground/50 hover:text-foreground">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleAddImage} className="flex flex-col sm:flex-row gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="flex-1 bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-foreground/10 file:text-foreground hover:file:bg-foreground/20 cursor-pointer"
              required
            />
            <div className="flex flex-col justify-center sm:w-32 flex-shrink-0">
              <button
                type="submit"
                disabled={submitting || !selectedFile}
                className="bg-foreground text-background px-6 py-3 rounded-xl font-semibold tracking-widest uppercase text-xs hover:bg-foreground/90 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Upload'}
              </button>
            </div>
          </form>
        </div>
      )}

      {images.length === 0 && initialImages.length === 0 ? (
        <div className="bg-card p-12 rounded-2xl shadow-sm border border-border text-center flex flex-col items-center">
          <ImageIcon size={48} className="text-foreground/20 mb-4" />
          <p className="font-serif text-xl text-foreground/60 mb-2">No photos yet</p>
          <p className="text-sm text-foreground/40 max-w-sm">Be the first to share a photo of this learning site to the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map(image => (
            <div key={image.id} className="relative group aspect-square rounded-2xl overflow-hidden bg-muted text-foreground">
              <Image
                src={image.url}
                alt="Gallery item"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-bark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 {user && user.id === image.addedBy && (
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-white/20 hover:bg-red-500/80 backdrop-blur-md p-3 rounded-full text-white transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 size={20} />
                    </button>
                 )}
              </div>
            </div>
          ))}

          {initialImages.map((url, i) => (
            <div key={`initial-${i}`} className="relative group aspect-square rounded-2xl overflow-hidden bg-muted text-foreground">
              <Image
                src={url}
                alt="Gallery item"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-bark/10 group-hover:bg-bark/30 transition-colors" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
