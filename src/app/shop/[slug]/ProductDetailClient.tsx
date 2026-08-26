"use client";
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ShoppingCart, Heart, Star, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.url || 'https://via.placeholder.com/600');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [isWishlist, setIsWishlist] = useState(false);

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast[isWishlist ? 'info' : 'success'](isWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-6xl mt-12">
        <div className="mb-8">
          <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
            ← Back to Shop
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-muted border border-border-gray"
            >
              <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
              {product.stockQuantity <= 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-xl px-6 py-3">Out of Stock</Badge>
                </div>
              )}
            </motion.div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img.url)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === img.url ? 'border-primary' : 'border-transparent hover:border-border-gray'}`}
                  >
                    <img src={img.url} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 capitalize">{product.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground">5.0 (Reviews)</span>
              </div>

              <div className="flex items-end gap-4 mb-6">
                {product.discountPrice ? (
                  <>
                    <span className="text-4xl font-bold text-primary">₦{product.discountPrice.toLocaleString()}</span>
                    <span className="text-2xl line-through text-muted-foreground mb-1">₦{product.price.toLocaleString()}</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                )}
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-border-gray">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-bold text-black mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl border-2 transition-all font-bold ${
                          selectedSize === size 
                            ? 'border-primary bg-primary text-white' 
                            : 'border-border-gray hover:border-black text-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-bold text-black mb-3">Select Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-xl border-2 transition-all font-bold ${
                          selectedColor === color 
                            ? 'border-primary bg-primary text-white' 
                            : 'border-border-gray hover:border-black text-black'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6">
               {product.stockQuantity > 0 ? (
                 <p className="text-green-600 font-bold mb-4 flex items-center gap-2">
                   <Check className="w-5 h-5" /> In Stock ({product.stockQuantity} available)
                 </p>
               ) : (
                 <p className="text-red-600 font-bold mb-4">Out of Stock</p>
               )}
              
              <div className="flex gap-4">
                <Link 
                  href={`/contact?subject=Order%20Inquiry:%20${encodeURIComponent(product.name)}`}
                  className="flex-1"
                >
                  <Button 
                    className="w-full h-full py-6 rounded-full text-lg bg-primary hover:bg-primary/90 text-white shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                  >
                    Order Now
                  </Button>
                </Link>
                <button
                  onClick={toggleWishlist}
                  className="w-16 h-14 rounded-full border-2 border-border-gray flex items-center justify-center text-muted-foreground hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>

            {product.sku && (
              <p className="text-sm text-muted-foreground pt-4">SKU: {product.sku}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
