"use client";
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Briefcase, MessageCircle, Link as LinkIcon, Instagram, Youtube, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function LeadershipClient({ members }: { members: any[] }) {
  const leadPastors = members.filter(m => m.category === 'Lead Pastor');
  const executiveLeaders = members.filter(m => m.category === 'Executive Leadership');
  const teamLeaders = members.filter(m => m.category === 'Leadership Team');

  const renderSocialIcon = (platform: string, url: string) => {
    if (!url) return null;
    let Icon = LinkIcon;
    if (platform === 'facebook') Icon = Facebook;
    if (platform === 'instagram') Icon = Instagram;
    if (platform === 'youtube') Icon = Youtube;
    if (platform === 'twitter') Icon = Twitter;
    if (platform === 'linkedin') Icon = Linkedin;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white transition-all hover:-translate-y-0.5 shadow-md"
      >
        <Icon className="w-5 h-5" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-12 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <h1 className="font-playfair font-bold text-5xl md:text-7xl mb-6 uppercase tracking-widest drop-shadow-md">Our Leadership</h1>
          <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto drop-shadow-sm">
            Dedicated leaders committed to raising the next generation of kingdom influencers.
          </p>
        </motion.div>
      </section>

      {/* Lead Pastors */}
      {leadPastors.map((pastor, index) => (
        <section key={pastor._id} className="py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="max-w-5xl mx-auto overflow-hidden border-none shadow-xl rounded-3xl bg-white">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2">
                    <div
                      className="h-full min-h-[400px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${pastor.profilePhoto?.imageUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'})` }}
                    />
                  </div>
                  <CardContent className="md:col-span-3 p-10 flex flex-col justify-center">
                    <h2 className="font-playfair font-bold text-4xl mb-2 text-black">{pastor.fullName}</h2>
                    <p className="text-xl text-primary font-semibold mb-6">{pastor.position}</p>
                    <p className="text-muted-foreground font-light leading-relaxed mb-6 whitespace-pre-wrap">
                      {pastor.biography}
                    </p>

                    {pastor.socialLinks && (
                      <div className="flex gap-4">
                        {renderSocialIcon('facebook', pastor.socialLinks.facebook)}
                        {renderSocialIcon('instagram', pastor.socialLinks.instagram)}
                        {renderSocialIcon('youtube', pastor.socialLinks.youtube)}
                        {renderSocialIcon('twitter', pastor.socialLinks.twitter)}
                        {renderSocialIcon('linkedin', pastor.socialLinks.linkedin)}
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Executive Leadership */}
      {executiveLeaders.length > 0 && (
        <section className="py-24 bg-white border-t border-border/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4 text-black">Executive Leadership</h2>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                Guiding the vision and administration of Wealthy Youth.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {executiveLeaders.map((leader: any, index: number) => (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-white group h-full">
                    <div className="flex flex-col h-full">
                      <div
                        className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${leader.profilePhoto?.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'})` }}
                      />
                      <CardContent className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-playfair font-bold text-2xl mb-1 text-black">{leader.fullName}</h3>
                          <p className="text-primary font-bold mb-4">{leader.position}</p>
                          <p className="text-muted-foreground font-light text-sm line-clamp-4 mb-4">{leader.biography}</p>
                        </div>
                        {leader.socialLinks && (
                          <div className="flex gap-2">
                            {renderSocialIcon('facebook', leader.socialLinks.facebook)}
                            {renderSocialIcon('instagram', leader.socialLinks.instagram)}
                            {renderSocialIcon('linkedin', leader.socialLinks.linkedin)}
                            {renderSocialIcon('twitter', leader.socialLinks.twitter)}
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership Team */}
      {teamLeaders.length > 0 && (
        <section className="py-24 bg-[#FAFAFA] border-t border-border/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4 text-black">Leadership Team</h2>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                Meet the passionate leaders serving in various departments.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamLeaders.map((leader: any, index: number) => (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-white group">
                    <div className="relative">
                      <div
                        className="h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${leader.profilePhoto?.imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'})` }}
                      >
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                          <h3 className="font-playfair font-bold text-2xl mb-1">{leader.fullName}</h3>
                          <p className="text-primary font-bold mb-2">{leader.position}</p>
                          {leader.socialLinks && (
                            <div className="flex gap-2 mt-4 scale-75 origin-left">
                              {renderSocialIcon('linkedin', leader.socialLinks.linkedin)}
                              {renderSocialIcon('instagram', leader.socialLinks.instagram)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4 text-black">Leadership Philosophy</h2>
            <p className="text-xl text-muted-foreground font-light max-w-3xl mx-auto">
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
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-[#FAFAFA]">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="font-playfair font-bold text-2xl mb-4 text-black">{value.title}</h3>
                    <p className="text-muted-foreground font-light">{value.description}</p>
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
