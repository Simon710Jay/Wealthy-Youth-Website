"use client";
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { BookOpen, Download, FileText, Video, Search } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    {
      id: 1,
      title: 'Kingdom Principles Study Guide',
      type: 'PDF',
      category: 'Study Material',
      description: 'Comprehensive guide on biblical principles for victorious living',
      pages: 45,
      downloads: 2340,
      icon: FileText,
    },
    {
      id: 2,
      title: 'Leadership Development Manual',
      type: 'E-Book',
      category: 'Leadership',
      description: 'Essential training for emerging kingdom leaders',
      pages: 120,
      downloads: 1850,
      icon: BookOpen,
    },
    {
      id: 3,
      title: 'Prayer & Fasting Guide',
      type: 'PDF',
      category: 'Spiritual Growth',
      description: 'Biblical strategies for powerful prayer and fasting',
      pages: 32,
      downloads: 3200,
      icon: FileText,
    },
    {
      id: 4,
      title: 'Career Excellence Workshop Series',
      type: 'Video',
      category: 'Career',
      description: 'Complete video training on career development and marketplace success',
      pages: 0,
      downloads: 980,
      icon: Video,
    },
    {
      id: 5,
      title: 'Financial Stewardship Workbook',
      type: 'E-Book',
      category: 'Finance',
      description: 'Biblical principles for managing finances and building wealth',
      pages: 68,
      downloads: 1560,
      icon: BookOpen,
    },
    {
      id: 6,
      title: 'Evangelism Training Module',
      type: 'PDF',
      category: 'Ministry',
      description: 'Practical tools for effective evangelism and soul winning',
      pages: 28,
      downloads: 2100,
      icon: FileText,
    },
  ];

  const categories = ['All', 'Study Material', 'Leadership', 'Spiritual Growth', 'Career', 'Finance', 'Ministry'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Resource Library</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Equipping you with tools for spiritual growth and kingdom excellence.
          </p>
        </motion.div>
      </section>

      {/* Search */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                        <resource.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge className="bg-accent text-secondary">{resource.type}</Badge>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{resource.title}</CardTitle>
                    <Badge variant="outline" className="w-fit mt-2">{resource.category}</Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {resource.pages > 0 && (
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Pages</span>
                          <span className="font-medium">{resource.pages}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Downloads</span>
                        <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-20 h-20 mx-auto mb-6 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Something Specific?
            </h2>
            <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
              Can't find what you're looking for? Contact our resource team and we'll help you find the right materials for your journey.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-secondary px-10 py-6 text-lg">
              Contact Resource Team
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
