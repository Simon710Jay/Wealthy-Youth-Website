"use client";

import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Plus, X, UploadCloud, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Video } from 'lucide-react';
import { createMedia, updateMedia, deleteMedia } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function MediaClient({ initialMedia, events }: { initialMedia: any[], events: any[] }) {
  const [mediaList, setMediaList] = useState(initialMedia);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Tabs: 'image' or 'video'
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventId, setEventId] = useState('');
  const [published, setPublished] = useState(true);
  
  // File Upload State
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const filteredMedia = mediaList.filter(m => m.mediaType === activeTab);

  const openModal = (media?: any) => {
    if (media) {
      setEditingMedia(media);
      setTitle(media.title || '');
      setDescription(media.description || '');
      setEventId(media.eventId?._id || media.eventId || '');
      setPublished(media.published !== false);
      setPreviewUrls([media.thumbnail || media.cloudinaryUrl]);
      setFiles([]);
    } else {
      setEditingMedia(null);
      setTitle('');
      setDescription('');
      setEventId('');
      setPublished(true);
      setPreviewUrls([]);
      setFiles([]);
    }
    setIsModalOpen(true);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...droppedFiles]);
      setPreviewUrls(prev => [
        ...prev, 
        ...droppedFiles.map(f => URL.createObjectURL(f))
      ]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
      setPreviewUrls(prev => [
        ...prev, 
        ...selectedFiles.map(f => URL.createObjectURL(f))
      ]);
    }
  };

  const removeFile = (index: number) => {
    if (editingMedia && index === 0 && files.length === 0) {
      setPreviewUrls([]);
      return;
    }
    setFiles(files.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleSaveMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingMedia) {
        let mediaUrl = editingMedia.cloudinaryUrl;

        if (files.length > 0) {
          const formData = new FormData();
          formData.append('file', files[0]);
          formData.append('folder', `wealthy_youth/media/${activeTab}`);
          
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          const uploadData = await uploadRes.json();
          if (uploadData.secure_url) {
            mediaUrl = uploadData.secure_url;
          }
        }

        const mediaData = {
          title,
          description,
          eventId: eventId || null,
          published,
          cloudinaryUrl: mediaUrl,
        };

        const updated = await updateMedia(editingMedia._id, mediaData);
        // Replace eventId object manually for UI consistency if needed
        const populatedEvent = events.find(ev => ev._id === updated.eventId);
        if (populatedEvent) updated.eventId = populatedEvent;
        
        setMediaList(mediaList.map((m: any) => m._id === updated._id ? updated : m));
      } else {
        if (files.length === 0) {
          alert('Please select at least one file to upload');
          setIsSubmitting(false);
          return;
        }

        // Upload multiple files sequentially or concurrently
        const uploadedItems = [];
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append('file', files[i]);
          formData.append('folder', `wealthy_youth/media/${activeTab}`);
          
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          const uploadData = await uploadRes.json();
          
          if (uploadData.secure_url) {
            const newMedia = await createMedia({
              title: files.length > 1 ? `${title} ${i + 1}` : title,
              description,
              mediaType: activeTab,
              eventId: eventId || null,
              published,
              cloudinaryUrl: uploadData.secure_url,
            });
            
            const populatedEvent = events.find(ev => ev._id === newMedia.eventId);
            if (populatedEvent) newMedia.eventId = populatedEvent;

            uploadedItems.push(newMedia);
          }
        }
        setMediaList([...uploadedItems, ...mediaList]);
      }
      
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to save media:', error);
      alert('Failed to save media');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia(id);
      setMediaList(mediaList.filter((m: any) => m._id !== id));
      setDeleteConfirm(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete media:', error);
      alert('Failed to delete media');
    }
  };

  const togglePublish = async (media: any) => {
    try {
      const updated = await updateMedia(media._id, { published: !media.published });
      const populatedEvent = events.find(ev => ev._id === updated.eventId);
      if (populatedEvent) updated.eventId = populatedEvent;
      
      setMediaList(mediaList.map((m: any) => m._id === updated._id ? updated : m));
      router.refresh();
    } catch (error) {
      console.error('Failed to update publish status:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-black mb-2">Media Gallery</h1>
          <p className="text-muted-foreground">Manage platform photos and videos.</p>
        </div>
        <Button 
          onClick={() => openModal()}
          className="rounded-full bg-primary hover:bg-[#111111] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Upload {activeTab === 'image' ? 'Photos' : 'Videos'}
        </Button>
      </div>

      <Tabs defaultValue="image" className="w-full" onValueChange={(val) => setActiveTab(val as 'image'|'video')}>
        <TabsList className="grid w-full max-w-sm grid-cols-2 mb-8 bg-white border border-border-gray p-1 rounded-full h-12 shadow-sm">
          <TabsTrigger value="image" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <ImageIcon className="w-4 h-4 mr-2" /> Photos
          </TabsTrigger>
          <TabsTrigger value="video" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
            <Video className="w-4 h-4 mr-2" /> Videos
          </TabsTrigger>
        </TabsList>

        <div className="bg-white rounded-3xl border border-border-gray shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] border-b border-border-gray text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Preview</th>
                <th className="px-6 py-4 font-bold">Title</th>
                <th className="px-6 py-4 font-bold">Linked Event</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray text-sm">
              {filteredMedia.map((media: any) => (
                <tr key={media._id} className="hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                      {media.mediaType === 'image' ? (
                        <img src={media.cloudinaryUrl} alt={media.title} className="w-full h-full object-cover" />
                      ) : (
                        <video src={media.cloudinaryUrl} className="w-full h-full object-cover" muted />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-black">{media.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {media.eventId ? media.eventId.title : 'None'}
                  </td>
                  <td className="px-6 py-4">
                    {media.published ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => togglePublish(media)} title={media.published ? "Unpublish" : "Publish"}>
                        {media.published ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openModal(media)}>
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(media._id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMedia.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No {activeTab}s found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Tabs>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to permanently delete this media? It will be removed from all public galleries.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-full">Cancel</Button>
              <Button onClick={() => handleDelete(deleteConfirm)} className="rounded-full bg-red-600 hover:bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MEDIA MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 py-12">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-border-gray">
              <h2 className="text-2xl font-playfair font-bold">{editingMedia ? 'Edit Media' : `Upload ${activeTab === 'image' ? 'Photos' : 'Videos'}`}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMedia} className="space-y-6">
              
              {/* FILE UPLOAD DRAG & DROP */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Media Files</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${previewUrls.length > 0 ? 'border-primary bg-primary/5' : 'border-border-gray hover:border-primary bg-[#FAFAFA]'}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple={!editingMedia} className="hidden" accept={activeTab === 'image' ? "image/*" : "video/*"} />
                  
                  {previewUrls.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {previewUrls.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                          {activeTab === 'image' ? (
                            <img src={url} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <video src={url} className="w-full h-full object-cover" />
                          )}
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); removeFile(i); }} 
                            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {!editingMedia && (
                        <div className="flex items-center justify-center border-2 border-dashed border-primary/50 rounded-xl hover:bg-primary/10">
                          <Plus className="w-8 h-8 text-primary" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="font-bold text-black mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">
                        {activeTab === 'image' ? 'JPG, PNG, WEBP. Supports multiple files.' : 'MP4, WEBM, MOV (Max size varies)'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Title *</label>
                  <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. Worship Session" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Link to Event (Optional)</label>
                  <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors">
                    <option value="">-- None --</option>
                    {events.map(ev => (
                      <option key={ev._id} value={ev._id}>{ev.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Description (Optional)</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="Media description or category..." />
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 bg-[#FAFAFA] rounded-xl border border-border-gray">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 rounded border-border-gray text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-black">Publish Immediately</span>
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-border-gray">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full px-8">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-full bg-primary hover:bg-[#111111] text-white px-8">
                  {isSubmitting ? 'Uploading...' : (editingMedia ? 'Save Changes' : 'Upload Media')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
