"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Play, Search, Calendar, User, Headphones, Download } from 'lucide-react';

export default function Sermons() {
  const [searchQuery, setSearchQuery] = useState('');

  const sermons = [
    {
      id: 1,
      title: 'Living in Divine Purpose',
      speaker: 'Pastor David Chen',
      date: '2026-06-01',
      category: 'Teaching',
      duration: '45:30',
      thumbnail: 'https://images.unsplash.com/photo-1507537362848-9c7e70b7b5c1?w=800&q=80',
      type: 'video',
      views: 2500,
    },
    {
      id: 2,
      title: 'The Power of Faith',
      speaker: 'Pastor Sarah Johnson',
      date: '2026-05-28',
      category: 'Worship',
      duration: '38:15',
      thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80',
      type: 'video',
      views: 3200,
    },
    {
      id: 3,
      title: 'Kingdom Leadership Principles',
      speaker: 'Pastor Michael Brown',
      date: '2026-05-25',
      category: 'Leadership',
      duration: '52:00',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
      type: 'video',
      views: 1800,
    },
    {
      id: 4,
      title: 'Walking in Victory',
      speaker: 'Pastor David Chen',
      date: '2026-05-21',
      category: 'Teaching',
      duration: '42:20',
      thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
      type: 'podcast',
      views: 1500,
    },
  ];

  const podcasts = [
    {
      id: 1,
      title: 'Youth Conversations: Career & Calling',
      episode: 'Episode 15',
      date: '2026-06-03',
      duration: '35:00',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    },
    {
      id: 2,
      title: 'Real Talk: Mental Health & Faith',
      episode: 'Episode 14',
      date: '2026-05-30',
      duration: '40:15',
      thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
    },
    {
      id: 3,
      title: 'Testimonies of Transformation',
      episode: 'Episode 13',
      date: '2026-05-27',
      duration: '28:45',
      thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    },
  ];

  const filteredSermons = sermons.filter(sermon =>
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Sermons & Teachings</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Powerful messages that transform lives and build faith.
          </p>
        </motion.div>
      </section>

      {/* Search */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search sermons by title or speaker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="videos" className="text-lg">Video Sermons</TabsTrigger>
              <TabsTrigger value="podcasts" className="text-lg">Podcasts</TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.map((sermon, index) => (
                  <motion.div
                    key={sermon.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="relative">
                        <div
                          className="h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url(${sermon.thumbnail})` }}
                        >
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Button size="lg" className="rounded-full w-16 h-16 bg-accent hover:bg-accent/90 text-secondary">
                              <Play className="w-8 h-8 ml-1" />
                            </Button>
                          </div>
                        </div>
                        <Badge className="absolute top-4 right-4 bg-accent text-secondary">
                          {sermon.category}
                        </Badge>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                          {sermon.duration}
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-2">{sermon.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{sermon.speaker}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(sermon.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                          <span className="text-sm text-muted-foreground">{sermon.views} views</span>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="podcasts">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {podcasts.map((podcast, index) => (
                  <motion.div
                    key={podcast.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="relative">
                        <div
                          className="h-48 bg-cover bg-center"
                          style={{ backgroundImage: `url(${podcast.thumbnail})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <Badge className="bg-primary text-white">
                              <Headphones className="w-3 h-3 mr-1" />
                              Podcast
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <CardHeader>
                        <p className="text-sm text-muted-foreground mb-2">{podcast.episode}</p>
                        <CardTitle className="text-xl">{podcast.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(podcast.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <span>{podcast.duration}</span>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Series */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Series</h2>
            <p className="text-xl text-muted-foreground">
              Deep dives into life-changing topics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden border-2 hover:border-primary transition-colors">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80)' }}
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">Kingdom Principles</h3>
                <p className="text-muted-foreground mb-6">A 6-week series on biblical principles for kingdom living and divine success.</p>
                <Button className="bg-primary hover:bg-primary/90">
                  Start Series
                  <Play className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-2 hover:border-accent transition-colors">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80)' }}
              />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">Next Gen Leaders</h3>
                <p className="text-muted-foreground mb-6">Essential teachings for young leaders stepping into their divine calling.</p>
                <Button className="bg-accent hover:bg-accent/90 text-secondary">
                  Start Series
                  <Play className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
