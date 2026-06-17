"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ShoppingCart, Heart, Star, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  inStock: boolean;
}

export default function Shop() {
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Wealthy Youth Premium T-Shirt',
      category: 'clothing',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: 'Kingdom Leaders Hoodie',
      category: 'clothing',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
      rating: 4.9,
      inStock: true,
    },
    {
      id: 3,
      name: 'Faith Cap - Navy Blue',
      category: 'accessories',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
      rating: 4.7,
      inStock: true,
    },
    {
      id: 4,
      name: 'Purpose Wristband Set',
      category: 'accessories',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      rating: 4.6,
      inStock: true,
    },
    {
      id: 5,
      name: 'Kingdom Principles Devotional',
      category: 'books',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
      rating: 5.0,
      inStock: true,
    },
    {
      id: 6,
      name: 'Leadership Journal',
      category: 'books',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80',
      rating: 4.8,
      inStock: true,
    },
    {
      id: 7,
      name: 'Grace Nation Water Bottle',
      category: 'accessories',
      price: 22.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
      rating: 4.5,
      inStock: false,
    },
    {
      id: 8,
      name: 'Worship Night Long Sleeve',
      category: 'clothing',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
      rating: 4.7,
      inStock: true,
    },
  ];

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success('Added to cart!');
  };

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast.info('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      toast.success('Added to wishlist!');
    }
  };

  const categories = ['all', 'clothing', 'accessories', 'books'];
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

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="sticky top-20 z-40 bg-accent text-secondary py-3 shadow-lg">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <span className="font-medium">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
            </span>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-black">
              <ShoppingCart className="w-4 h-4 mr-2" />
              View Cart
            </Button>
          </div>
        </div>
      )}

      {/* Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary' : ''}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all">
                  <div className="relative">
                    <div
                      className="h-72 bg-cover bg-center transition-transform group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.image})` }}
                    >
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg px-4 py-2">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <Heart
                        className={`w-5 h-5 ${wishlist.includes(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600'
                          }`}
                      />
                    </button>
                  </div>

                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-muted text-foreground capitalize">
                      {product.category}
                    </Badge>
                    <h3 className="font-bold text-lg mb-3 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? 'fill-accent text-accent'
                              : 'text-gray-300'
                            }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {product.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                    </div>

                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className="w-full bg-primary hover:opacity-90"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
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
