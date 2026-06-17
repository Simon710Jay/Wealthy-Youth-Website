"use client";

import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Plus, X, UploadCloud, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { createEvent, updateEvent, deleteEvent } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function AdminEventsClient({ initialEvents, regCounts }: { initialEvents: any[], regCounts: any }) {
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [registrationOpen, setRegistrationOpen] = useState('');
  const [registrationClose, setRegistrationClose] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = (event?: any) => {
    if (event) {
      setEditingEvent(event);
      setTitle(event.title || '');
      setSlug(event.slug || '');
      setDate(event.date ? new Date(event.date).toISOString().split('T')[0] : '');
      setTime(event.time || '');
      setLocation(event.location || '');
      setDescription(event.description || '');
      setCategory(event.category || '');
      setRegistrationOpen(event.registrationOpen ? new Date(event.registrationOpen).toISOString().split('T')[0] : '');
      setRegistrationClose(event.registrationClose ? new Date(event.registrationClose).toISOString().split('T')[0] : '');
      setFeatured(event.featured || false);
      setPublished(event.published !== false);
      setPreviewUrl(event.banner || null);
      setFile(null);
    } else {
      setEditingEvent(null);
      setTitle('');
      setSlug('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
      setCategory('');
      setRegistrationOpen('');
      setRegistrationClose('');
      setFeatured(false);
      setPublished(true);
      setPreviewUrl(null);
      setFile(null);
    }
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editingEvent) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSaveEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let bannerUrl = editingEvent?.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'wealthy_youth/events');
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (uploadData.secure_url) {
          bannerUrl = uploadData.secure_url;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const eventData = {
        title,
        slug,
        date,
        time,
        location,
        description,
        category,
        registrationOpen: registrationOpen || undefined,
        registrationClose: registrationClose || undefined,
        featured,
        published,
        banner: bannerUrl
      };

      if (editingEvent) {
        const updated = await updateEvent(editingEvent._id, eventData);
        setEvents(events.map((ev: any) => ev._id === updated._id ? updated : ev));
      } else {
        const newEvent = await createEvent(eventData);
        setEvents([newEvent, ...events]);
      }
      
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to save event:', error);
      alert('Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((ev: any) => ev._id !== id));
      setDeleteConfirm(null);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event');
    }
  };

  const togglePublish = async (event: any) => {
    try {
      const updated = await updateEvent(event._id, { published: !event.published });
      setEvents(events.map((ev: any) => ev._id === updated._id ? updated : ev));
      router.refresh();
    } catch (error) {
      console.error('Failed to update publish status:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-black mb-2">Events Management</h1>
          <p className="text-muted-foreground">Create and manage platform events.</p>
        </div>
        <Button 
          onClick={() => openModal()}
          className="rounded-full bg-primary hover:bg-[#111111] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> New Event
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border-gray shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#FAFAFA] border-b border-border-gray text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-bold">Banner</th>
              <th className="px-6 py-4 font-bold">Event Name</th>
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold">Registrations</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray text-sm">
            {events.map((event: any) => (
              <tr key={event._id || event.id} className="hover:bg-black/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
                    <img src={event.banner || 'https://via.placeholder.com/150'} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-black">{event.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {regCounts[event._id] || 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {event.published ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => togglePublish(event)} title={event.published ? "Unpublish" : "Publish"}>
                      {event.published ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openModal(event)}>
                      <Edit className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteConfirm(event._id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to permanently delete this item?</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="rounded-full">Cancel</Button>
              <Button onClick={() => handleDelete(deleteConfirm)} className="rounded-full bg-red-600 hover:bg-red-700 text-white">Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT EVENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 py-12">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-border-gray">
              <h2 className="text-2xl font-playfair font-bold">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveEvent} className="space-y-6">
              
              {/* IMAGE UPLOAD DRAG & DROP */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Event Banner Upload</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${previewUrl ? 'border-primary bg-primary/5' : 'border-border-gray hover:border-primary bg-[#FAFAFA]'}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
                  
                  {previewUrl ? (
                    <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                        Click or Drag to change banner
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="font-bold text-black mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG, WEBP (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Event Title *</label>
                  <input required value={title} onChange={handleTitleChange} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. Global Leadership Summit" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">URL Slug *</label>
                  <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. global-leadership-summit" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Event Category</label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. Summit, Workshop, Worship" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Location *</label>
                  <input required value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="e.g. Main Auditorium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Event Date *</label>
                  <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Event Time *</label>
                  <input required type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Registration Open Date</label>
                  <input type="date" value={registrationOpen} onChange={(e) => setRegistrationOpen(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black">Registration Close Date</label>
                  <input type="date" value={registrationClose} onChange={(e) => setRegistrationClose(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-black">Event Description</label>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#FAFAFA] focus:bg-white transition-colors" placeholder="Event details..." />
              </div>

              <div className="flex items-center gap-6 p-4 bg-[#FAFAFA] rounded-xl border border-border-gray">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 rounded border-border-gray text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-black">Featured Event</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-5 h-5 rounded border-border-gray text-primary focus:ring-primary" />
                  <span className="text-sm font-bold text-black">Publish Event</span>
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-border-gray">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-full px-8">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-full bg-primary hover:bg-[#111111] text-white px-8">
                  {isSubmitting ? 'Saving...' : (editingEvent ? 'Save Changes' : 'Create Event')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
