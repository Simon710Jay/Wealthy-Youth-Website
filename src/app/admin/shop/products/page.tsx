import { getProducts } from '@/lib/actions';
import AdminProductsClient from './AdminProductsClient';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProducts(true); // Include unpublished products for admin view
  return <AdminProductsClient initialProducts={products} />;
}
