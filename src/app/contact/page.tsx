"use client";
import { motion } from 'motion/react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for reaching out! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Kingdom Street', 'City, State 12345', 'United States'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (234) 567-890', '+1 (234) 567-891', 'Mon - Fri, 9AM - 5PM'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@wealthyyouth.org', 'prayer@wealthyyouth.org', 'events@wealthyyouth.org'],
    },
    {
      icon: Clock,
      title: 'Service Times',
      details: ['Sunday: 10:00 AM', 'Wednesday: 7:00 PM', 'Friday: 6:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We'd love to hear from you. Reach out and let's connect!
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-6 flex items-center justify-center">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-primary">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-medium">Full Name *</label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">Email *</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-medium">Phone</label>
                        <Input
                          type="tel"
                          placeholder="+1 (234) 567-890"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium">Subject *</label>
                        <Input
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 font-medium">Message *</label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="min-h-40"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-xl">Interactive Map</p>
                    <p className="text-gray-300 mt-2">123 Kingdom Street, City, State</p>
                  </div>
                </div>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-lg h-12">
                      <Phone className="w-5 h-5 mr-3" />
                      Schedule a Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-lg h-12">
                      <Mail className="w-5 h-5 mr-3" />
                      Join Newsletter
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-lg h-12">
                      <MapPin className="w-5 h-5 mr-3" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'What are your service times?',
                a: 'We meet Sundays at 10:00 AM, Wednesdays at 7:00 PM, and Fridays at 6:00 PM.',
              },
              {
                q: 'How can I join Wealthy Youth?',
                a: 'Simply visit our Membership page and fill out the registration form. You can also visit us during any service!',
              },
              {
                q: 'Are there age requirements?',
                a: 'Wealthy Youth is designed for ages 18-35, but everyone is welcome to join our events and services.',
              },
              {
                q: 'Do you have online services?',
                a: 'Yes! We livestream all our services. Check our Media page for livestream details.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
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
