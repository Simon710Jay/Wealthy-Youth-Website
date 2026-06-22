import { Card, CardContent } from '@/app/components/ui/card';
import { getDashboardStats, getRegistrations } from '@/lib/actions';
import { Calendar, Image as ImageIcon, Users, Video, ShoppingBag } from 'lucide-react';

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const registrations = await getRegistrations();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-black mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform's dynamic content.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Members</p>
              <p className="text-2xl font-bold text-black">{stats.totalMembers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Registrations</p>
              <p className="text-2xl font-bold text-black">{stats.totalEventRegistrations}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Events</p>
              <p className="text-2xl font-bold text-black">{stats.totalEvents}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#111111]/10 flex items-center justify-center flex-shrink-0 text-[#111111]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Media Uploads</p>
              <p className="text-2xl font-bold text-black">{stats.totalMedia}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D4A017]/10 flex items-center justify-center flex-shrink-0 text-[#D4A017]">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Sermons</p>
              <p className="text-2xl font-bold text-black">{stats.totalSermons}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Leadership</p>
              <p className="text-2xl font-bold text-black">{stats.totalLeadershipMembers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-orange-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Shop Orders</p>
              <p className="text-2xl font-bold text-black">{stats.totalOrders}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-border-gray shadow-sm">
        <h2 className="text-xl font-playfair font-bold text-black mb-6">Recent Registrations</h2>
        {registrations.length === 0 ? (
          <p className="text-muted-foreground text-sm">No registrations yet.</p>
        ) : (
          <div className="space-y-4">
            {registrations.slice(0, 5).map((reg: any) => (
              <div key={reg._id || reg.id} className="flex justify-between items-center py-4 border-b border-border-gray last:border-0">
                <div>
                  <p className="font-bold text-sm text-black">{reg.fullName}</p>
                  <p className="text-xs text-muted-foreground">{reg.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{reg.eventId}</p>
                  <p className="text-xs text-muted-foreground">{new Date(reg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
