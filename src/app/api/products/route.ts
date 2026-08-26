import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { ShopProduct } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    await connectMongo();
    
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    const limit = searchParams.get('limit');
    
    let query: any = {};
    if (publishedOnly) {
      query.published = true;
      query.status = 'Active';
    }
    
    let productsQuery = ShopProduct.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      productsQuery = productsQuery.limit(parseInt(limit));
    }
    
    const products = await productsQuery;
    
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'super_admin' && session.user.role !== 'shop_admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();
    const data = await request.json();
    
    const product = new ShopProduct(data);
    await product.save();
    
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
