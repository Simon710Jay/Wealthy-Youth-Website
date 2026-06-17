import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Video, 
  ShoppingCart, 
  MessageSquare,
  Settings,
  LogOut,
  CreditCard
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  const role = session.user?.role;

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['super_admin', 'events_admin', 'media_admin', 'sermons_admin', 'shop_admin'] },
    { name: 'Events', href: '/admin/events', icon: Calendar, roles: ['super_admin', 'events_admin'] },
    { name: 'Registrations', href: '/admin/registrations', icon: Users, roles: ['super_admin', 'events_admin'] },
    { name: 'Media Gallery', href: '/admin/media', icon: ImageIcon, roles: ['super_admin', 'media_admin'] },
    { name: 'Sermons', href: '/admin/sermons', icon: Video, roles: ['super_admin', 'sermons_admin'] },
    { name: 'Shop Products', href: '/admin/shop', icon: ShoppingCart, roles: ['super_admin', 'shop_admin'] },
    { name: 'Orders', href: '/admin/orders', icon: CreditCard, roles: ['super_admin', 'shop_admin'] },
    { name: 'Users', href: '/admin/users', icon: Users, roles: ['super_admin'] },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare, roles: ['super_admin'] },
    { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['super_admin'] },
  ];

  const allowedNav = navigation.filter(item => item.roles.includes(role || ''));

  return (
    <div className="flex min-h-[calc(100vh-112px)] bg-[#F7F7F7]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-playfair font-bold text-black">CMS Portal</h2>
          <p className="text-sm text-muted-foreground capitalize">{role?.replace('_', ' ')}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {allowedNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
