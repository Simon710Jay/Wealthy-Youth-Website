"use client";

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Trash2, CheckCircle, XCircle, Search, Mail, Eye } from 'lucide-react';
import { markInquiryContacted, deleteSupportInquiry } from '@/lib/actions';
import { Input } from '@/app/components/ui/input';

export default function SupportInquiriesClient({ initialInquiries }: { initialInquiries: any[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const filteredInquiries = inquiries.filter(i => 
    i.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.sponsorshipType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleContacted = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await markInquiryContacted(id, !currentStatus);
      setInquiries(inquiries.map(i => i._id === id ? { ...i, contacted: updated.contacted } : i));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry? This cannot be undone.')) return;
    
    try {
      await deleteSupportInquiry(id);
      setInquiries(inquiries.filter(i => i._id !== id));
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
      alert('Failed to delete inquiry. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-black">Support Inquiries</h1>
          <p className="text-muted-foreground mt-1">Manage sponsorship and support requests</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search inquiries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FAFAFA] text-black font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">Contact Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-[#FAFAFA]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{inquiry.fullName}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {inquiry.sponsorshipType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.contacted ? (
                        <span className="inline-flex items-center gap-1.5 text-green-600 text-xs font-medium bg-green-50 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" /> Contacted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-amber-600 text-xs font-medium bg-amber-50 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="h-8 border-border hover:bg-[#FAFAFA]"
                        >
                          <Eye className="w-4 h-4 mr-1.5" /> View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(inquiry._id)}
                          className="h-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl shadow-xl animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-border flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-black mb-1">Inquiry Details</h3>
                <p className="text-sm text-muted-foreground">Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedInquiry(null)}>✕</Button>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Contact Info</div>
                  <div className="font-medium text-black">{selectedInquiry.fullName}</div>
                  <div className="text-sm text-muted-foreground"><a href={`mailto:${selectedInquiry.email}`} className="text-primary hover:underline">{selectedInquiry.email}</a></div>
                  <div className="text-sm text-muted-foreground"><a href={`tel:${selectedInquiry.phoneNumber}`} className="text-primary hover:underline">{selectedInquiry.phoneNumber}</a></div>
                </div>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Sponsorship Details</div>
                  <div className="font-medium text-black">{selectedInquiry.sponsorshipType}</div>
                  <div className="text-sm text-muted-foreground">{selectedInquiry.organization || 'No organization provided'}</div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Message</div>
                <div className="bg-[#FAFAFA] p-4 rounded-xl border border-border text-sm leading-relaxed text-black whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border">
                <Button 
                  variant={selectedInquiry.contacted ? "outline" : "default"}
                  onClick={() => {
                    handleToggleContacted(selectedInquiry._id, selectedInquiry.contacted);
                    setSelectedInquiry({ ...selectedInquiry, contacted: !selectedInquiry.contacted });
                  }}
                  className={selectedInquiry.contacted ? "border-amber-200 text-amber-700 hover:bg-amber-50" : "bg-green-600 hover:bg-green-700 text-white"}
                >
                  {selectedInquiry.contacted ? "Mark as Pending" : "Mark as Contacted"}
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <a href={`mailto:${selectedInquiry.email}?subject=Re: Wealthy Youth Sponsorship Inquiry`}>
                      <Mail className="w-4 h-4 mr-2" /> Reply
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedInquiry(null)}>Close</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
