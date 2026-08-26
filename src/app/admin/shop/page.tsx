import { getDashboardStats } from '@/lib/actions';
import { Card, CardContent } from '@/app/components/ui/card';
import { ShoppingBag, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Shop Dashboard</h1>
          <p className="text-muted-foreground">Manage your store's performance and overview.</p>
        </div>
        <Link href="/admin/shop/products" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">
          Manage Products
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Products</p>
              <p className="text-2xl font-bold text-black">{stats.totalProducts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Published Products</p>
              <p className="text-2xl font-bold text-black">{stats.totalPublishedProducts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border-gray shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-black">{stats.outOfStockProducts}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
