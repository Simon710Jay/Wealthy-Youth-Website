import { getProductBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product || !product.published || product.status !== 'Active') {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
