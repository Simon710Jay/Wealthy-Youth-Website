"use client";
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Search } from 'lucide-react';

export default function MembersClient({ members }: { members: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(member => 
    member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-black mb-2">Members Management</h1>
          <p className="text-muted-foreground">View and manage platform members.</p>
        </div>
      </div>
      
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Total Members</h2>
          <p className="text-3xl font-bold text-black">{members.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border-gray shadow-sm overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-gray rounded-full focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-[#FAFAFA] border-b border-border-gray text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-bold">Photo</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Contact</th>
                <th className="px-6 py-4 font-bold">Demographics</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gray text-sm">
              {filteredMembers.map((member: any) => (
                <tr key={member._id} className="hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                      <img src={member.profileImage || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=random`} alt={member.firstName} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-black">
                    {member.firstName} {member.lastName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-muted-foreground">{member.email}</div>
                    <div className="text-xs text-muted-foreground mt-1">{member.whatsappNumber || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-muted-foreground capitalize">{member.gender || 'N/A'}</div>
                    <div className="text-xs text-muted-foreground mt-1">{member.state ? `${member.state}, ` : ''}{member.country || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    {member.accountStatus === 'suspended' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Suspended
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No members found.
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
