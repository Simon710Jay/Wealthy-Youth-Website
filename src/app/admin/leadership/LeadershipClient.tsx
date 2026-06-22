"use client";
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { createLeadershipMember, updateLeadershipMember, deleteLeadershipMember } from '@/lib/actions';

export default function LeadershipClient({ initialMembers }: { initialMembers: any[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>({
    fullName: '',
    position: '',
    biography: '',
    category: 'Leadership Team',
    displayOrder: 0,
    activeStatus: true,
    socialLinks: { facebook: '', instagram: '', youtube: '', twitter: '', linkedin: '' }
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEdit = (member: any) => {
    setCurrentMember(member);
    setIsEditing(true);
    setSelectedFile(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      await deleteLeadershipMember(id);
      setMembers(members.filter((m: any) => m._id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoData = currentMember.profilePhoto;

      if (selectedFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('folder', 'wealthy_youth/leadership');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (res.ok) {
          const data = await res.json();
          photoData = {
            imageUrl: data.secure_url,
            publicId: data.public_id,
          };
        }
        setUploading(false);
      }

      const memberToSave = {
        ...currentMember,
        profilePhoto: photoData,
      };

      if (currentMember._id) {
        const updated = await updateLeadershipMember(currentMember._id, memberToSave);
        setMembers(members.map((m: any) => m._id === updated._id ? updated : m));
      } else {
        const created = await createLeadershipMember(memberToSave);
        setMembers([created, ...members]);
      }

      setIsEditing(false);
      setCurrentMember({
        fullName: '',
        position: '',
        biography: '',
        category: 'Leadership Team',
        displayOrder: 0,
        activeStatus: true,
        socialLinks: { facebook: '', instagram: '', youtube: '', twitter: '', linkedin: '' }
      });
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      alert('Failed to save leadership member');
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-border-gray shadow-sm">
        <h2 className="text-2xl font-playfair font-bold text-black mb-6">
          {currentMember._id ? 'Edit Leadership Member' : 'Add Leadership Member'}
        </h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-black mb-2">Full Name</label>
              <input required type="text" value={currentMember.fullName} onChange={e => setCurrentMember({...currentMember, fullName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2">Position</label>
              <input required type="text" value={currentMember.position} onChange={e => setCurrentMember({...currentMember, position: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2">Category</label>
              <select value={currentMember.category} onChange={e => setCurrentMember({...currentMember, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary">
                <option value="Lead Pastor">Lead Pastor</option>
                <option value="Executive Leadership">Executive Leadership</option>
                <option value="Leadership Team">Leadership Team</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-2">Display Order (Lower is first)</label>
              <input type="number" value={currentMember.displayOrder} onChange={e => setCurrentMember({...currentMember, displayOrder: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Biography</label>
            <textarea required rows={4} value={currentMember.biography} onChange={e => setCurrentMember({...currentMember, biography: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-black mb-2">Profile Photo</label>
            <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
            {currentMember.profilePhoto?.imageUrl && !selectedFile && (
              <div className="mt-2 text-sm text-primary">Current image: <a href={currentMember.profilePhoto.imageUrl} target="_blank" rel="noreferrer">View</a></div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-black mb-4">Social Links (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Facebook URL" value={currentMember.socialLinks?.facebook || ''} onChange={e => setCurrentMember({...currentMember, socialLinks: {...currentMember.socialLinks, facebook: e.target.value}})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary text-sm" />
              <input placeholder="Instagram URL" value={currentMember.socialLinks?.instagram || ''} onChange={e => setCurrentMember({...currentMember, socialLinks: {...currentMember.socialLinks, instagram: e.target.value}})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary text-sm" />
              <input placeholder="YouTube URL" value={currentMember.socialLinks?.youtube || ''} onChange={e => setCurrentMember({...currentMember, socialLinks: {...currentMember.socialLinks, youtube: e.target.value}})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary text-sm" />
              <input placeholder="X (Twitter) URL" value={currentMember.socialLinks?.twitter || ''} onChange={e => setCurrentMember({...currentMember, socialLinks: {...currentMember.socialLinks, twitter: e.target.value}})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary text-sm" />
              <input placeholder="LinkedIn URL" value={currentMember.socialLinks?.linkedin || ''} onChange={e => setCurrentMember({...currentMember, socialLinks: {...currentMember.socialLinks, linkedin: e.target.value}})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary text-sm" />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border-gray">
            <Button type="submit" disabled={loading || uploading}>
              {(loading || uploading) ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {uploading ? 'Uploading...' : loading ? 'Saving...' : 'Save Member'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-black mb-2">Leadership Management</h1>
          <p className="text-muted-foreground">Manage Lead Pastor and Leadership Team profiles.</p>
        </div>
        <Button onClick={() => {
          setCurrentMember({
            fullName: '', position: '', biography: '', category: 'Leadership Team', displayOrder: 0, activeStatus: true, socialLinks: { facebook: '', instagram: '', youtube: '', twitter: '', linkedin: '' }
          });
          setIsEditing(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border-gray shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-[#FAFAFA] border-b border-border-gray text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Photo</th>
                <th className="px-6 py-4 font-bold">Name & Position</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Order</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray text-sm">
              {members.map((member: any) => (
                <tr key={member._id} className="hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                      {member.profilePhoto?.imageUrl ? (
                        <img src={member.profilePhoto.imageUrl} alt={member.fullName} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground m-3" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-black">{member.fullName}</div>
                    <div className="text-muted-foreground text-xs">{member.position}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-black">{member.category}</td>
                  <td className="px-6 py-4 text-muted-foreground">{member.displayOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.activeStatus ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {member.activeStatus ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(member)} className="w-8 h-8 rounded-full">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(member._id)} className="w-8 h-8 rounded-full text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No leadership members found. Click "Add Member" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
