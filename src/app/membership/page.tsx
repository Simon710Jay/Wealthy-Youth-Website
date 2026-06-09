"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import {
  UserPlus, LogIn, User, Mail, Phone, Calendar,
  MapPin, Check, Upload, Shield
} from 'lucide-react';
import { toast } from 'sonner';

export default function Membership() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    testimony: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      toast.success('Login successful! Welcome back.');
    } else {
      toast.success('Registration successful! Welcome to Wealthy Youth family!');
    }
  };

  const benefits = [
    {
      icon: Check,
      title: 'Exclusive Events Access',
      description: 'Priority registration for conferences, workshops, and special events',
    },
    {
      icon: Check,
      title: 'Leadership Training',
      description: 'Access to comprehensive leadership development programs',
    },
    {
      icon: Check,
      title: 'Mentorship Program',
      description: 'Connect with experienced mentors for personal and spiritual growth',
    },
    {
      icon: Check,
      title: 'Resource Library',
      description: 'Unlimited access to exclusive teaching materials and resources',
    },
    {
      icon: Check,
      title: 'Community Groups',
      description: 'Join specialized groups aligned with your interests and calling',
    },
    {
      icon: Check,
      title: 'Volunteer Opportunities',
      description: 'Serve in various ministries and make a meaningful impact',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Wealthy Youth</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Become part of a thriving community of passionate young leaders.
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Membership Benefits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience growth, community, and purpose through exclusive member benefits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-14">
                <TabsTrigger value="register" className="text-lg">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Register
                </TabsTrigger>
                <TabsTrigger value="login" className="text-lg">
                  <LogIn className="w-5 h-5 mr-2" />
                  Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-3xl">New Member Registration</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below to join the Wealthy Youth family
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          required
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <h3 className="text-xl font-bold mb-4">Address</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              placeholder="123 Main St"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                          </div>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="zipCode">Zip Code</Label>
                              <Input
                                id="zipCode"
                                placeholder="12345"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div>
                        <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="emergencyContact">Contact Name</Label>
                            <Input
                              id="emergencyContact"
                              placeholder="Emergency contact name"
                              value={formData.emergencyContact}
                              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="emergencyPhone">Contact Phone</Label>
                            <Input
                              id="emergencyPhone"
                              type="tel"
                              placeholder="+1 (234) 567-890"
                              value={formData.emergencyPhone}
                              onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Testimony */}
                      <div>
                        <Label htmlFor="testimony">Brief Testimony (Optional)</Label>
                        <Textarea
                          id="testimony"
                          placeholder="Share a bit about your faith journey..."
                          value={formData.testimony}
                          onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
                          className="min-h-32"
                        />
                      </div>

                      {/* Profile Picture */}
                      <div>
                        <Label htmlFor="profilePic">Profile Picture (Optional)</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <Button type="button" variant="outline" className="w-full justify-start">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photo
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg">
                        <UserPlus className="w-5 h-5 mr-2" />
                        Complete Registration
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="login">
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle className="text-3xl">Member Login</CardTitle>
                    <p className="text-muted-foreground">
                      Access your member dashboard and resources
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="loginEmail">Email</Label>
                        <Input
                          id="loginEmail"
                          type="email"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">Remember me</span>
                        </label>
                        <Button type="button" variant="link" className="text-primary">
                          Forgot password?
                        </Button>
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg">
                        <LogIn className="w-5 h-5 mr-2" />
                        Login to Dashboard
                      </Button>

                      <div className="text-center pt-4">
                        <p className="text-muted-foreground">
                          Don't have an account?{' '}
                          <Button
                            type="button"
                            variant="link"
                            className="text-primary p-0"
                            onClick={() => setIsLogin(false)}
                          >
                            Register here
                          </Button>
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-muted">
              <CardContent className="p-8 text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-4">Your Privacy Matters</h3>
                <p className="text-muted-foreground">
                  All information is securely stored and only used for ministry purposes.
                  We never share your personal data with third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
