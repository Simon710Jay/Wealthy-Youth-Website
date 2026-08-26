import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { ShopProduct } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    
    // Check if id is ObjectId or slug
    const isObjectId = params.id.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: params.id } : { slug: params.id };
    
    const product = await ShopProduct.findOne(query);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'super_admin' && session.user.role !== 'shop_admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();
    const data = await request.json();
    
    const product = await ShopProduct.findByIdAndUpdate(params.id, data, { new: true, runValidators: true });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'super_admin' && session.user.role !== 'shop_admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongo();
    
    const product = await ShopProduct.findById(params.id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.publicId) {
          try {
             await cloudinary.uploader.destroy(img.publicId);
          } catch (cloudErr) {
             console.error('Failed to delete image from cloudinary:', img.publicId, cloudErr);
          }
        }
      }
    }
    
    await ShopProduct.findByIdAndDelete(params.id);
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
