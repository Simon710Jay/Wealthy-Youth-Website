"use client";
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Target, Eye, Heart, Award, Users, Globe, TrendingUp, Zap } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Faith First',
      description: 'Building our foundation on unwavering faith in Jesus Christ and His Word.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Pursuing excellence in all areas: spiritual, academic, career, and personal development.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Fostering authentic relationships and building a supportive kingdom family.',
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Empowering youth to make a difference locally and across nations.',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Committed to continuous learning, transformation, and spiritual maturity.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Embracing creativity and fresh approaches to ministry and leadership.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Years of Impact' },
    { number: '5,000+', label: 'Members Worldwide' },
    { number: '50+', label: 'Countries Reached' },
    { number: '200+', label: 'Annual Events' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Wealthy Youth</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Empowering the next generation to discover their divine purpose and make a lasting impact.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-primary transition-colors">
                <CardContent className="p-10">
                  <Target className="w-16 h-16 text-primary mb-6" />
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To raise and equip a generation of kingdom leaders who are rooted in faith,
                    committed to excellence, and empowered to transform their world through the
                    love of Christ. We exist to develop young people spiritually, intellectually,
                    and practically for global impact.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-accent transition-colors">
                <CardContent className="p-10">
                  <Eye className="w-16 h-16 text-accent mb-6" />
                  <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To see a generation of passionate, purpose-driven young leaders who walk in
                    spiritual authority, demonstrate kingdom excellence, and impact nations for
                    Christ. We envision thriving communities of youth who are spiritually mature,
                    culturally relevant, and globally influential.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape who we are.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-primary">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6">
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact by Numbers</h2>
            <p className="text-xl text-gray-200">
              See the transformation happening across the globe.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-3 text-accent">{stat.number}</div>
                <div className="text-xl text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Wealthy Youth was born out of a divine mandate to raise a generation of young leaders
                who would impact their world for Christ. Founded under the umbrella of Grace Nation
                International, we started as a small group of passionate youth seeking more of God
                and His purpose for their lives.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Over the years, we've grown into a thriving global movement spanning multiple
                continents. What began in one location has expanded to over 50 countries, touching
                thousands of lives and raising leaders who are making significant impacts in their
                communities, careers, and calling.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, Wealthy Youth continues to be at the forefront of youth ministry, combining
                timeless biblical principles with contemporary methods to reach and develop the next
                generation. Our commitment remains the same: to see every young person discover their
                divine identity, develop their God-given potential, and deploy into their purpose.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
