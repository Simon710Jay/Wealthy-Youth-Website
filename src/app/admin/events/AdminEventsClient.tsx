"use client";

import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Plus, X, UploadCloud, Edit, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, User as UserIcon } from 'lucide-react';
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

  // Speakers State
  const [speakers, setSpeakers] = useState<any[]>([]);

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
      setSpeakers(event.speakers || []);
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
      setSpeakers([]);
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

  // Speakers handlers
  const addSpeaker = () => {
    setSpeakers([...speakers, { id: Date.now().toString(), name: '', role: 'Guest Pastor', bio: '', displayOrder: speakers.length, file: null, imageUrl: '', publicId: '' }]);
  };

  const updateSpeaker = (index: number, field: string, value: any) => {
    const newSpeakers = [...speakers];
    newSpeakers[index] = { ...newSpeakers[index], [field]: value };
    setSpeakers(newSpeakers);
  };

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index));
  };

  const moveSpeaker = (index: number, direction: 'up' | 'down') => {
    const newSpeakers = [...speakers];
    if (direction === 'up' && index > 0) {
      const temp = newSpeakers[index - 1];
      newSpeakers[index - 1] = newSpeakers[index];
      newSpeakers[index] = temp;
    } else if (direction === 'down' && index < newSpeakers.length - 1) {
      const temp = newSpeakers[index + 1];
      newSpeakers[index + 1] = newSpeakers[index];
      newSpeakers[index] = temp;
    }
    setSpeakers(newSpeakers);
  };

  const handleSpeakerImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      updateSpeaker(index, 'file', selectedFile);
      updateSpeaker(index, 'preview', URL.createObjectURL(selectedFile));
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
          console.error('Upload Error Data:', uploadData);
          throw new Error(uploadData.error || 'Image upload failed');
        }
      }

      const uploadedSpeakers = [];
      for (let i = 0; i < speakers.length; i++) {
        const speaker = speakers[i];
        let imgUrl = speaker.imageUrl;
        let pubId = speaker.publicId;

        if (speaker.file) {
          const formData = new FormData();
          formData.append('file', speaker.file);
          formData.append('folder', 'wealthy_youth/speakers');
          
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          const uploadData = await uploadRes.json();
          if (uploadData.secure_url) {
            imgUrl = uploadData.secure_url;
            pubId = uploadData.public_id;
          }
        }

        uploadedSpeakers.push({
          name: speaker.name,
          role: speaker.role,
          imageUrl: imgUrl,
          publicId: pubId,
          bio: speaker.bio,
          displayOrder: i
        });
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
        banner: bannerUrl,
        speakers: uploadedSpeakers
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
    } catch (error: any) {
      console.error('Failed to save event:', error);
      alert(`Failed to save event: ${error.message || 'Unknown error'}`);
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
          <h1 className="text-3xl font-bold text-black mb-2">Events Management</h1>
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
              <h2 className="text-2xl font-bold">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
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

              {/* SPEAKERS AND GUESTS */}
              <div className="space-y-4 pt-6 border-t border-border-gray">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-bold text-black">Speakers & Guests</label>
                  <Button type="button" onClick={addSpeaker} variant="outline" size="sm" className="rounded-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Speaker
                  </Button>
                </div>
                
                {speakers.length === 0 ? (
                   <p className="text-sm text-muted-foreground bg-[#FAFAFA] p-4 rounded-xl text-center border border-border-gray">No speakers added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {speakers.map((speaker, index) => (
                      <div key={speaker.id || index} className="p-4 border border-border-gray rounded-xl bg-[#FAFAFA] flex flex-col md:flex-row gap-4 relative">
                        <div className="flex-shrink-0 flex flex-col gap-2">
                          <label className="relative w-24 h-24 rounded-full overflow-hidden bg-white border border-border-gray flex items-center justify-center cursor-pointer hover:border-primary transition-colors group">
                             {speaker.preview || speaker.imageUrl ? (
                               <img src={speaker.preview || speaker.imageUrl} alt="Speaker" className="w-full h-full object-cover" />
                             ) : (
                               <UserIcon className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                             )}
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSpeakerImageChange(index, e)} />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white font-bold text-center">
                               Change Photo
                             </div>
                          </label>
                        </div>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                             <label className="text-xs font-bold text-muted-foreground mb-1 block">Name *</label>
                             <input required value={speaker.name} onChange={(e) => updateSpeaker(index, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-gray text-sm" placeholder="e.g. Dr. Christian Okafor" />
                          </div>
                          <div>
                             <label className="text-xs font-bold text-muted-foreground mb-1 block">Role *</label>
                             <input required value={speaker.role} onChange={(e) => updateSpeaker(index, 'role', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border-gray text-sm" placeholder="e.g. Guest Pastor, Anchor Speaker" />
                          </div>
                          <div className="sm:col-span-2">
                             <label className="text-xs font-bold text-muted-foreground mb-1 block">Biography (Optional)</label>
                             <textarea value={speaker.bio} onChange={(e) => updateSpeaker(index, 'bio', e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-border-gray text-sm" placeholder="Short bio..." />
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col gap-2 items-center justify-center border-t md:border-t-0 md:border-l border-border-gray pt-4 md:pt-0 md:pl-4">
                           <Button type="button" variant="ghost" size="icon" onClick={() => moveSpeaker(index, 'up')} disabled={index === 0} className="w-8 h-8">
                             <ChevronUp className="w-4 h-4 text-muted-foreground" />
                           </Button>
                           <Button type="button" variant="ghost" size="icon" onClick={() => moveSpeaker(index, 'down')} disabled={index === speakers.length - 1} className="w-8 h-8">
                             <ChevronDown className="w-4 h-4 text-muted-foreground" />
                           </Button>
                           <Button type="button" variant="ghost" size="icon" onClick={() => removeSpeaker(index)} className="w-8 h-8 hover:bg-red-100">
                             <Trash2 className="w-4 h-4 text-red-600" />
                           </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
