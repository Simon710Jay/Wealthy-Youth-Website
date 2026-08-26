"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Product {
  _id: string;
  id?: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: { url: string; publicId: string }[];
  stockQuantity: number;
}

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const products = initialProducts;

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast.info('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      toast.success('Added to wishlist!');
    }
  };

  const categories = ['all', 'clothing', 't-shirts', 'polo shirts', 'hoodies', 'caps', 'wristbands', 'bags', 'books', 'accessories', 'other'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Wealthy Youth Shop</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Wear your faith. Live your purpose. Shop with kingdom excellence.
          </p>
        </motion.div>
      </section>



      {/* Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          {products.length > 0 ? (
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:text-white active:scale-95 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-primary/70 text-white hover:bg-primary/80'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          ) : (
             <div className="text-center py-20">
               <h2 className="text-3xl font-bold mb-4">Products coming soon.</h2>
               <p className="text-muted-foreground">Check back later for new arrivals.</p>
             </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all">
                  <div className="relative">
                    <Link href={`/shop/${product.slug}`}>
                      <div
                        className="h-72 bg-cover bg-center transition-transform group-hover:scale-105 cursor-pointer"
                        style={{ backgroundImage: `url(${product.images?.[0]?.url || 'https://via.placeholder.com/600'})` }}
                      >
                        {product.stockQuantity <= 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Badge variant="destructive" className="text-lg px-4 py-2">
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer"
                    >
                      <Heart
                        className={`w-5 h-5 ${wishlist.includes(product._id)
                            ? 'fill-white'
                            : 'text-white'
                          }`}
                      />
                    </button>
                  </div>

                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-muted text-foreground capitalize">
                      {product.category}
                    </Badge>
                    <Link href={`/shop/${product.slug}`}>
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 fill-accent text-accent`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        5.0
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      {product.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">
                            ₦{product.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-sm line-through text-muted-foreground">
                            ₦{product.price.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-primary">
                          ₦{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Link href={`/contact?subject=Order%20Inquiry:%20${encodeURIComponent(product.name)}`}>
                      <Button
                        className="w-full bg-primary text-white rounded-full shadow-md transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:text-white active:scale-95 cursor-pointer"
                      >
                        Order Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Free Shipping',
                description: 'On orders over $50',
              },
              {
                title: 'Secure Payment',
                description: 'Safe & encrypted checkout',
              },
              {
                title: 'Quality Guarantee',
                description: '30-day return policy',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
