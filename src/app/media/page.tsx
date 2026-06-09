"use client";
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Play, Image as ImageIcon, Video, Radio } from 'lucide-react';

export default function Media() {
  const gallery = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80',
  ];

  const videos = [
    {
      id: 1,
      title: 'Leadership Summit 2026 Highlights',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      duration: '12:30',
    },
    {
      id: 2,
      title: 'Worship Night Experience',
      thumbnail: 'https://images.unsplash.com/photo-1510832842230-87253f48d74f?w=600&q=80',
      duration: '8:45',
    },
    {
      id: 3,
      title: 'Community Outreach Day',
      thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
      duration: '15:20',
    },
    {
      id: 4,
      title: 'Youth Conference Recap',
      thumbnail: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&q=80',
      duration: '10:15',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Media Center</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Capturing moments of transformation and celebrating kingdom impact.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14">
              <TabsTrigger value="gallery" className="text-lg">
                <ImageIcon className="w-5 h-5 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-lg">
                <Video className="w-5 h-5 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="livestream" className="text-lg">
                <Radio className="w-5 h-5 mr-2" />
                Livestream
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform group-hover:scale-110"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className="relative">
                        <div
                          className="h-56 bg-cover bg-center"
                          style={{ backgroundImage: `url(${video.thumbnail})` }}
                        >
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="lg" className="rounded-full w-16 h-16 bg-accent hover:bg-accent/90 text-secondary">
                              <Play className="w-8 h-8 ml-1" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                            {video.duration}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg">{video.title}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="livestream">
              <div className="max-w-5xl mx-auto">
                <Card className="overflow-hidden border-2 border-primary">
                  <div className="aspect-video bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <div className="text-center text-white">
                      <Radio className="w-24 h-24 mx-auto mb-6 animate-pulse" />
                      <h3 className="text-3xl font-bold mb-4">No Live Stream Currently</h3>
                      <p className="text-xl mb-6 text-gray-200">
                        Join us every Sunday at 10:00 AM for our live worship service
                      </p>
                      <Button size="lg" className="bg-accent hover:bg-accent/90 text-secondary">
                        Get Notified
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Upcoming Livestreams</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-bold">Sunday Service</h4>
                          <p className="text-sm text-muted-foreground">Every Sunday at 10:00 AM</p>
                        </div>
                        <Button variant="outline">Set Reminder</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-bold">Wednesday Night Worship</h4>
                          <p className="text-sm text-muted-foreground">Every Wednesday at 7:00 PM</p>
                        </div>
                        <Button variant="outline">Set Reminder</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
