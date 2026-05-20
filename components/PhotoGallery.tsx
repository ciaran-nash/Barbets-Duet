'use client';

import { useState, useEffect } from 'react';
import { db, storage, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
  addedBy: string;
  createdAt: number;
}

export default function PhotoGallery({ siteId, initialImages }: PhotoGalleryProps) {
  const { user } = useAuth();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(
          collection(db, 'sites', siteId, 'gallery'),
          orderBy('createdAt', 'desc')
        );
        const qSnap = await getDocs(q);
        const fetchedImages = qSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as GalleryImage[];
        setImages(fetchedImages);
      } catch (error) {
        // Fallback to empty if collection doesn't exist or permissions error
        console.error("Error fetching gallery:", error);
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
    setUploadProgress(0);
    try {
      // Create a unique filename
      const filename = `${Date.now()}_${selectedFile.name}`;
      const storageRef = ref(storage, `sites/${siteId}/gallery/${filename}`);
      
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed", error);
          setSubmitting(false);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          const docRef = await addDoc(collection(db, 'sites', siteId, 'gallery'), {
            url: downloadURL,
            addedBy: user.uid,
            createdAt: Date.now()
          });
          
          setImages([{
            id: docRef.id,
            url: downloadURL,
            addedBy: user.uid,
            createdAt: Date.now()
          }, ...images]);
          
          setSelectedFile(null);
          setIsAdding(false);
          setSubmitting(false);
        }
      );
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `sites/${siteId}/gallery`);
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'sites', siteId, 'gallery', id));
      setImages(images.filter(img => img.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `sites/${siteId}/gallery/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-serif text-2xl animate-pulse bg-night-forest/20 h-8 w-48 rounded"></h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-2xl bg-night-forest/10 animate-pulse"></div>
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
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-night-forest px-4 py-2 rounded-full hover:bg-night-forest hover:text-platinum transition-colors"
          >
            <Plus size={16} /> Add Photo
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-night-forest/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-sm uppercase tracking-widest">Add New Photo</h4>
            <button onClick={() => setIsAdding(false)} className="text-night-forest/50 hover:text-night-forest">
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
              className="flex-1 bg-platinum border border-night-forest/20 rounded-xl px-4 py-3 outline-none focus:border-night-forest file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-night-forest/10 file:text-night-forest hover:file:bg-night-forest/20 cursor-pointer"
              required
            />
            <div className="flex flex-col justify-center sm:w-32 flex-shrink-0">
              <button 
                type="submit" 
                disabled={submitting || !selectedFile}
                className="bg-night-forest text-white px-6 py-3 rounded-xl font-semibold tracking-widest uppercase text-xs hover:bg-night-forest/90 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Upload'}
              </button>
              {submitting && uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div className="bg-night-forest h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      {images.length === 0 && initialImages.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-night-forest/10 text-center flex flex-col items-center">
          <ImageIcon size={48} className="text-night-forest/20 mb-4" />
          <p className="font-serif text-xl text-night-forest/60 mb-2">No photos yet</p>
          <p className="text-sm text-night-forest/40 max-w-sm">Be the first to share a photo of this learning site to the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map(image => (
            <div key={image.id} className="relative group aspect-square rounded-2xl overflow-hidden bg-night-forest text-platinum">
              <Image 
                src={image.url} 
                alt="Gallery item"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-night-forest/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 {user && user.uid === image.addedBy && (
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
            <div key={`initial-${i}`} className="relative group aspect-square rounded-2xl overflow-hidden bg-night-forest text-platinum">
              <Image 
                src={url} 
                alt="Gallery item"
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-night-forest/10 group-hover:bg-night-forest/30 transition-colors" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
