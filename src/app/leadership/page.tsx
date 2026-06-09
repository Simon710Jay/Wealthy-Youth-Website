"use client";
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Briefcase, MessageCircle } from 'lucide-react';

export default function Leadership() {
  const pastor = {
    name: 'Pastor David Emmanuel',
    title: 'Lead Pastor, Wealthy Youth',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    bio: 'Pastor David Emmanuel is a dynamic leader with a passion for raising the next generation of kingdom influencers. With over 15 years of youth ministry experience, he has impacted thousands of lives across multiple continents. His vision is to see young people discover their divine purpose and walk in spiritual authority.',
    education: [
      'Master of Divinity, Grace Theological Seminary',
      'Bachelor of Arts in Leadership, Kingdom University',
    ],
    social: {
      email: 'pastor.david@wealthyyouth.org',
      twitter: '@pastordavid',
      linkedin: 'pastordavidemmanuel',
    },
  };

  const leadershipTeam = [
    {
      name: 'Sarah Johnson',
      title: 'Director of Worship',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      department: 'Worship & Creative Arts',
    },
    {
      name: 'Michael Chen',
      title: 'Director of Discipleship',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      department: 'Discipleship & Training',
    },
    {
      name: 'Grace Okonkwo',
      title: 'Director of Outreach',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
      department: 'Evangelism & Missions',
    },
    {
      name: 'James Williams',
      title: 'Director of Media',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      department: 'Media & Communications',
    },
    {
      name: 'Amanda Rodriguez',
      title: 'Director of Events',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      department: 'Events & Programs',
    },
    {
      name: 'Daniel Kim',
      title: 'Director of Operations',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
      department: 'Operations & Administration',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Leadership</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Dedicated leaders committed to raising the next generation.
          </p>
        </motion.div>
      </section>

      {/* Pastor Profile */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-5xl mx-auto overflow-hidden border-2 border-primary">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2">
                  <div
                    className="h-full min-h-[400px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${pastor.image})` }}
                  />
                </div>
                <CardContent className="md:col-span-3 p-10 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold mb-2">{pastor.name}</h2>
                  <p className="text-xl text-primary mb-6">{pastor.title}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {pastor.bio}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">Education</h3>
                    <ul className="space-y-2">
                      {pastor.education.map((edu, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={`mailto:${pastor.social.email}`}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white transition-colors"
                    >
                      <Briefcase className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate leaders serving in various departments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                  <div className="relative">
                    <div
                      className="h-80 bg-cover bg-center transition-transform group-hover:scale-105"
                      style={{ backgroundImage: `url(${leader.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{leader.name}</h3>
                        <p className="text-accent font-medium mb-2">{leader.title}</p>
                        <p className="text-sm text-gray-300">{leader.department}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Leadership Philosophy</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our leadership is built on biblical principles of servanthood, integrity, and excellence.
              We believe in leading by example and empowering others to discover and fulfill their divine calling.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Servant Leadership',
                description: 'Leading with humility and a heart to serve others',
              },
              {
                title: 'Kingdom Vision',
                description: 'Focused on eternal impact and divine purpose',
              },
              {
                title: 'Empowerment',
                description: 'Raising up the next generation of leaders',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center border-2 hover:border-primary transition-colors">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
