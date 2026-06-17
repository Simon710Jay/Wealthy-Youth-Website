"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Search, Download, Trash2, Eye, X } from 'lucide-react';
import { deleteRegistration } from '@/lib/actions';

export default function RegistrationsClient({ 
  initialRegistrations,
  userRole
}: { 
  initialRegistrations: any[],
  userRole: string
}) {
  const router = useRouter();
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventFilter, setEventFilter] = useState('All');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedReg, setSelectedReg] = useState<any | null>(null);

  const canDelete = userRole === 'super_admin';
  const canExport = userRole === 'super_admin';

  // Extract unique events for the filter dropdown
  const uniqueEvents = Array.from(new Set(initialRegistrations.map(r => r.eventId?.title || 'Unknown Event')));

  const filteredRegistrations = registrations.filter(reg => {
    const fullName = `${reg.firstName} ${reg.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) || 
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = eventFilter === 'All' || (reg.eventId?.title || 'Unknown Event') === eventFilter;
    return matchesSearch && matchesEvent;
  });

  const handleDelete = async (id: string) => {
    if (!canDelete) return alert('Unauthorized');
    if (!confirm('Are you sure you want to delete this registration?')) return;
    setIsDeleting(id);
    try {
      await deleteRegistration(id);
      setRegistrations(prev => prev.filter(r => r._id !== id));
      router.refresh();
    } catch (error) {
      console.error("Failed to delete", error);
      alert('Failed to delete registration');
    } finally {
      setIsDeleting(null);
    }
  };

  const exportToCSV = (isExcel: boolean = false) => {
    if (!canExport) return alert('Unauthorized');
    if (filteredRegistrations.length === 0) return;
    
    const headers = ['Event Name', 'First Name', 'Last Name', 'Email', 'WhatsApp Number', 'Date of Birth', 'Gender', 'Country', 'State', 'City', 'Date Registered'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(r => [
        `"${r.eventId?.title || 'Unknown'}"`,
        `"${r.firstName}"`,
        `"${r.lastName}"`,
        `"${r.email}"`,
        `"${r.phoneNumber}"`,
        `"${new Date(r.dateOfBirth).toLocaleDateString()}"`,
        `"${r.gender}"`,
        `"${r.country}"`,
        `"${r.state}"`,
        `"${r.city}"`,
        `"${new Date(r.createdAt).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `event_registrations_${new Date().toISOString().split('T')[0]}.${isExcel ? 'csv' : 'csv'}`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedReg(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <h2 className="text-2xl font-playfair font-bold text-black mb-6 border-b pb-4">Registration Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                <p className="font-medium text-black">{selectedReg.firstName} {selectedReg.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                <p className="font-medium text-black">{selectedReg.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">WhatsApp Number</p>
                <p className="font-medium text-black">{selectedReg.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                <p className="font-medium text-black">{new Date(selectedReg.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gender</p>
                <p className="font-medium text-black">{selectedReg.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                <p className="font-medium text-black">{new Date(selectedReg.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-medium text-black">{selectedReg.city}, {selectedReg.state}, {selectedReg.country}</p>
              </div>
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-muted-foreground mb-1">Event Registered For</p>
                <p className="font-bold text-primary">{selectedReg.eventId?.title || 'Unknown Event'}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setSelectedReg(null)} variant="outline" className="rounded-full">Close</Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-9 h-10 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="h-10 rounded-xl border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="All">All Events</option>
            {uniqueEvents.map(evt => (
              <option key={evt} value={evt}>{evt}</option>
            ))}
          </select>
        </div>
        {canExport && (
          <div className="flex gap-2">
            <Button onClick={() => exportToCSV(false)} className="rounded-full bg-black text-white hover:bg-black/80 flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button onClick={() => exportToCSV(true)} className="rounded-full bg-green-700 text-white hover:bg-green-800 flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Excel
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] border border-border-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FAFAFA] border-b border-border-gray">
              <tr>
                <th className="px-6 py-4 font-bold text-sm text-black">Event Name</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Full Name</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Contact</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Demographics</th>
                <th className="px-6 py-4 font-bold text-sm text-black">Registered</th>
                <th className="px-6 py-4 font-bold text-sm text-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray text-sm">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-black/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {reg.eventId?.title || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-black">{reg.firstName} {reg.lastName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-muted-foreground">{reg.email}</p>
                      <p className="text-xs text-muted-foreground">{reg.phoneNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-black">{reg.gender}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-primary/10 text-primary"
                          onClick={() => setSelectedReg(reg)}
                        >
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
