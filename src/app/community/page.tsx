"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Heart, MessageCircle, Users, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Community() {
  const [prayerRequest, setPrayerRequest] = useState('');
  const [testimony, setTestimony] = useState('');

  const testimonies = [
    {
      id: 1,
      name: 'Sarah Johnson',
      date: '2 days ago',
      content: 'Joining Wealthy Youth transformed my life! I discovered my purpose and now I\'m leading a successful ministry in my university. The leadership training equipped me with skills I use daily.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      likes: 124,
    },
    {
      id: 2,
      name: 'Michael Chen',
      date: '1 week ago',
      content: 'From broken to blessed! The community here showed me unconditional love during my darkest times. Today, I\'m mentoring others and seeing God\'s purpose unfold in my career.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      likes: 89,
    },
    {
      id: 3,
      name: 'Grace Okonkwo',
      date: '2 weeks ago',
      content: 'God used Wealthy Youth to heal my heart and restore my faith. The mentorship program connected me with amazing leaders who invested in my growth. Forever grateful!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      likes: 156,
    },
  ];

  const youthGroups = [
    {
      name: 'Young Professionals',
      description: 'For career-driven youth balancing faith and ambition',
      members: 450,
      meetingTime: 'Fridays, 7:00 PM',
    },
    {
      name: 'Campus Crusaders',
      description: 'University students impacting their campuses for Christ',
      members: 320,
      meetingTime: 'Wednesdays, 6:00 PM',
    },
    {
      name: 'Creative Arts',
      description: 'Musicians, artists, and creatives expressing faith through art',
      members: 280,
      meetingTime: 'Saturdays, 4:00 PM',
    },
    {
      name: 'Entrepreneurs Hub',
      description: 'Young business owners building kingdom enterprises',
      members: 190,
      meetingTime: 'Tuesdays, 6:30 PM',
    },
  ];

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your prayer request has been submitted. Our team is praying for you!');
    setPrayerRequest('');
  };

  const handleTestimonySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for sharing your testimony! It will be reviewed and published soon.');
    setTestimony('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Community</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Building authentic relationships and supporting each other in faith.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="testimonies" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 mb-12 h-14">
              <TabsTrigger value="testimonies" className="text-sm md:text-base">
                <Sparkles className="w-4 h-4 mr-1 md:mr-2" />
                Testimonies
              </TabsTrigger>
              <TabsTrigger value="prayer" className="text-sm md:text-base">
                <Heart className="w-4 h-4 mr-1 md:mr-2" />
                Prayer
              </TabsTrigger>
              <TabsTrigger value="groups" className="text-sm md:text-base">
                <Users className="w-4 h-4 mr-1 md:mr-2" />
                Groups
              </TabsTrigger>
              <TabsTrigger value="mentorship" className="text-sm md:text-base">
                <MessageCircle className="w-4 h-4 mr-1 md:mr-2" />
                Mentorship
              </TabsTrigger>
            </TabsList>

            <TabsContent value="testimonies">
              <div className="max-w-4xl mx-auto">
                {/* Share Testimony Form */}
                <Card className="mb-12 border-2 border-primary">
                  <CardHeader>
                    <CardTitle>Share Your Testimony</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleTestimonySubmit}>
                      <Textarea
                        placeholder="How has God transformed your life through Wealthy Youth?"
                        value={testimony}
                        onChange={(e) => setTestimony(e.target.value)}
                        required
                        className="min-h-32 mb-4"
                      />
                      <Button type="submit" className="bg-accent hover:bg-accent/90 text-secondary">
                        <Send className="w-4 h-4 mr-2" />
                        Share Testimony
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Testimonies List */}
                <div className="space-y-6">
                  {testimonies.map((testimony, index) => (
                    <motion.div
                      key={testimony.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <img
                              src={testimony.image}
                              alt={testimony.name}
                              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="font-bold text-lg">{testimony.name}</h3>
                                  <p className="text-sm text-muted-foreground">{testimony.date}</p>
                                </div>
                              </div>
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {testimony.content}
                              </p>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="w-5 h-5" />
                                <span>{testimony.likes} people inspired</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prayer">
              <div className="max-w-3xl mx-auto">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl">Submit a Prayer Request</CardTitle>
                    <p className="text-muted-foreground">
                      Our prayer team is standing with you in faith
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePrayerSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-2">Your Name</label>
                        <Input placeholder="Enter your name" required />
                      </div>
                      <div>
                        <label className="block mb-2">Prayer Request</label>
                        <Textarea
                          placeholder="Share your prayer needs..."
                          value={prayerRequest}
                          onChange={(e) => setPrayerRequest(e.target.value)}
                          required
                          className="min-h-40"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                        <Heart className="w-5 h-5 mr-2" />
                        Submit Prayer Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {youthGroups.map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-primary">
                      <CardHeader>
                        <CardTitle className="text-2xl">{group.name}</CardTitle>
                        <p className="text-muted-foreground">{group.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-5 h-5 text-primary" />
                            <span>{group.members} members</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            <span>{group.meetingTime}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-secondary">
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mentorship">
              <div className="max-w-4xl mx-auto">
                <Card className="border-2 border-accent">
                  <CardHeader>
                    <CardTitle className="text-3xl">Mentorship Program</CardTitle>
                    <p className="text-lg text-muted-foreground">
                      Connect with experienced leaders who will guide your spiritual and personal growth
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground">
                        Our mentorship program pairs you with mature believers who have walked the path
                        you're on. Whether you need guidance in your career, spiritual life, relationships,
                        or ministry calling, we have mentors ready to invest in your journey.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {['Career', 'Spiritual Growth', 'Ministry'].map((area, index) => (
                        <div key={index} className="text-center p-6 bg-muted rounded-lg">
                          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
                          <h3 className="font-bold mb-2">{area}</h3>
                        </div>
                      ))}
                    </div>

                    <Button size="lg" className="w-full bg-primary hover:opacity-90">
                      Apply for Mentorship
                    </Button>
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
