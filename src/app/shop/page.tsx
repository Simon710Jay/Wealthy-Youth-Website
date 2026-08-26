import { getProducts } from '@/lib/actions';
import ShopClient from './ShopClient';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await getProducts(false); // Fetch only published active products
  
  return <ShopClient initialProducts={products} />;
}
