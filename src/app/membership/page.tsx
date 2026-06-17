"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import {
  UserPlus, LogIn, User, Mail, Phone, Calendar,
  MapPin, Check, Upload, Shield, Loader2
} from 'lucide-react';
import { toast } from 'sonner';

function MembershipContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    testimony: '',
    gender: '',
    country: 'United States',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Login successful! Welcome back.');
        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push('/'); // default redirect
        }
      }
    } catch (error) {
      toast.error('An error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      toast.success('Registration successful! Logging you in...');
      
      // Auto-login after registration
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      
      if (!res?.error) {
        const callbackUrl = searchParams.get('callbackUrl');
        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.push('/');
        }
      } else {
        toast.error('Registered successfully, but auto-login failed. Please login manually.');
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during registration.');
    } finally {
      setIsSubmitting(false);
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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-12 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <h1 className="font-playfair font-bold text-5xl md:text-7xl mb-6 uppercase tracking-widest drop-shadow-md">Join Wealthy Youth</h1>
          <p className="text-xl md:text-2xl font-light text-white/80 max-w-3xl mx-auto drop-shadow-sm">
            Become part of a thriving community of passionate young leaders.
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair font-bold text-4xl md:text-5xl mb-4 text-black">Membership Benefits</h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
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
                <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-white">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-playfair font-bold text-xl mb-3 text-black">{benefit.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-[#FAFAFA] border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-16 h-14 bg-white shadow-sm rounded-full p-1 border border-border/50">
                <TabsTrigger value="register" className="rounded-full uppercase tracking-widest text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </TabsTrigger>
                <TabsTrigger value="login" className="rounded-full uppercase tracking-widest text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="mt-0">
                <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden">
                  <CardHeader className="p-8 pb-4 bg-primary/5 text-center">
                    <CardTitle className="font-playfair font-bold text-3xl text-black">New Member Registration</CardTitle>
                    <p className="text-muted-foreground font-light mt-1">
                      Fill out the form below to join the Wealthy Youth family.
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="font-playfair font-bold text-xl mb-4 text-black">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">First Name *</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                              className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Last Name *</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                              className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="registerPassword" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Password *</Label>
                          <Input
                            id="registerPassword"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateOfBirth" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Date of Birth *</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            required
                            className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="gender" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Gender *</Label>
                          <select
                            id="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            required
                            className="w-full rounded-2xl h-12 border border-border/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4 text-sm"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <h3 className="font-playfair font-bold text-xl mb-4 text-black">Address</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="address" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Street Address</Label>
                            <Input
                              id="address"
                              placeholder="123 Main St"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                            />
                          </div>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="city" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">City</Label>
                              <Input
                                id="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                              />
                            </div>
                            <div>
                              <Label htmlFor="state" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">State</Label>
                              <Input
                                id="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                              />
                            </div>
                            <div>
                              <Label htmlFor="zipCode" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Zip Code</Label>
                              <Input
                                id="zipCode"
                                placeholder="12345"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div>
                        <h3 className="font-playfair font-bold text-xl mb-4 text-black">Emergency Contact</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="emergencyContact" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Contact Name</Label>
                            <Input
                              id="emergencyContact"
                              placeholder="Emergency contact name"
                              value={formData.emergencyContact}
                              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                              className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                            />
                          </div>
                          <div>
                            <Label htmlFor="emergencyPhone" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Contact Phone</Label>
                            <Input
                              id="emergencyPhone"
                              type="tel"
                              placeholder="+1 (234) 567-890"
                              value={formData.emergencyPhone}
                              onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                              className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Testimony */}
                      <div>
                        <Label htmlFor="testimony" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Brief Testimony (Optional)</Label>
                        <Textarea
                          id="testimony"
                          placeholder="Share a bit about your faith journey..."
                          value={formData.testimony}
                          onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
                          className="min-h-[120px] rounded-2xl border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] p-4"
                        />
                      </div>

                      {/* Profile Picture */}
                      <div>
                        <Label htmlFor="profilePic" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Profile Picture (Optional)</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <Button type="button" className="w-full justify-start rounded-2xl h-12 border border-border/50 bg-[#FAFAFA] hover:bg-secondary/30 text-black">
                            <Upload className="w-4 h-4 mr-2 text-primary" />
                            Upload Photo
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 uppercase tracking-widest text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 mt-8 disabled:opacity-50 disabled:cursor-not-allowed">
                        <UserPlus className="w-5 h-5 mr-2" />
                        {isSubmitting ? 'Processing...' : 'Complete Registration'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="login" className="mt-0">
                <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden max-w-xl mx-auto">
                  <CardHeader className="p-8 pb-4 bg-primary/5 text-center">
                    <CardTitle className="font-playfair font-bold text-3xl text-black">Member Login</CardTitle>
                    <p className="text-muted-foreground font-light mt-1">
                      Access your member dashboard and resources.
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="loginEmail" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Email</Label>
                        <Input
                          id="loginEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                          className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password" className="block mb-2 font-semibold uppercase tracking-widest text-xs text-black">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          className="rounded-2xl h-12 border-border/50 focus-visible:ring-1 focus-visible:ring-primary bg-[#FAFAFA] px-4"
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer font-light text-muted-foreground">
                          <input type="checkbox" className="rounded border-border/50 text-primary focus:ring-primary" />
                          <span>Remember me</span>
                        </label>
                        <Button type="button" variant="link" className="text-primary hover:text-primary/80 p-0 font-medium">
                          Forgot password?
                        </Button>
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 uppercase tracking-widest text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                        <LogIn className="w-5 h-5 mr-2" />
                        Login to Dashboard
                      </Button>

                      <div className="text-center pt-4">
                        <p className="text-muted-foreground font-light text-sm">
                          Don't have an account?{' '}
                          <Button
                            type="button"
                            variant="link"
                            className="text-primary hover:text-primary/80 p-0 font-medium"
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
      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-md rounded-3xl bg-[#FAFAFA] overflow-hidden">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair font-bold text-2xl mb-4 text-black">Your Privacy Matters</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
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

export default function Membership() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    }>
      <MembershipContent />
    </Suspense>
  );
}

