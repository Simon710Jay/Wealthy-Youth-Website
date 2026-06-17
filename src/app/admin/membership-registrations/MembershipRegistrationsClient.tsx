"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Search, Download, Trash2, Eye } from 'lucide-react';
import { deleteMembershipRegistration } from '@/lib/actions';

export default function MembershipRegistrationsClient({ 
  initialRegistrations, 
  userRole 
}: { 
  initialRegistrations: any[],
  userRole: string 
}) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Determine permissions
  const canDelete = userRole === 'super_admin';
  const canExport = userRole === 'super_admin';

  const filteredRegistrations = registrations.filter(reg => {
    return reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           reg.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = async (id: string) => {
    if (!canDelete) return alert('Unauthorized');
    if (!confirm('Are you sure you want to delete this membership registration?')) return;
    
    setIsDeleting(id);
    try {
      await deleteMembershipRegistration(id);
      setRegistrations(prev => prev.filter(r => r._id !== id));
      router.refresh();
    } catch (error) {
      console.error("Failed to delete", error);
      alert('Failed to delete registration');
    } finally {
      setIsDeleting(null);
    }
  };

  const exportToCSV = () => {
    if (!canExport) return alert('Unauthorized');
    if (filteredRegistrations.length === 0) return;
    
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Date of Birth', 'Gender', 'City', 'State', 'Country', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(r => [
        `"${r.firstName}"`,
        `"${r.lastName}"`,
        `"${r.email}"`,
        `"${r.phoneNumber}"`,
        `"${new Date(r.dateOfBirth).toLocaleDateString()}"`,
        `"${r.gender}"`,
        `"${r.city}"`,
        `"${r.state}"`,
        `"${r.country}"`,
        `"${new Date(r.createdAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `membership_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-9 h-10 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {canExport && (
          <Button onClick={exportToCSV} className="rounded-full bg-black text-white hover:bg-black/80 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        )}
      </div>

      <div className="bg-white rounded-[24px] border border-border-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] border-b border-border-gray">
              <tr>
                <th className="px-6 py-4 font-bold text-sm text-black">Full Name & Contact</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Demographics</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Location</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Registered</th>
                <th className="px-6 py-4 font-bold text-sm text-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray text-sm">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-black/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-black">{reg.firstName} {reg.lastName}</p>
                      <p className="text-muted-foreground">{reg.email}</p>
                      <p className="text-xs text-muted-foreground">{reg.phoneNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-black">{reg.gender}</p>
                      <p className="text-muted-foreground">{new Date(reg.dateOfBirth).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-black">{reg.city}, {reg.state}</p>
                      <p className="text-muted-foreground text-xs">{reg.country}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 text-primary">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {canDelete && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(reg._id)}
                            disabled={isDeleting === reg._id}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
