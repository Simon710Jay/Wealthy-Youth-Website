"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, HeartHandshake, CalendarCheck, Gift, Building2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { createSupportInquiry } from '@/lib/actions';

const supportSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  organization: z.string().optional(),
  sponsorshipType: z.string().min(1, 'Please select a sponsorship type'),
  message: z.string().min(10, 'Please provide more details about your inquiry'),
});

type SupportFormValues = z.infer<typeof supportSchema>;

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
  });

  const onSubmit = async (data: SupportFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createSupportInquiry(data);
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportOptions = [
    {
      icon: HeartHandshake,
      title: 'Partnership Programs',
      description: 'Become a strategic partner in advancing youth development and kingdom impact through long-term collaboration.'
    },
    {
      icon: CalendarCheck,
      title: 'Sponsorship Opportunities',
      description: 'Support our transformational conferences, leadership summits, and community outreach programs.'
    },
    {
      icon: Gift,
      title: 'General Donations',
      description: 'Contribute financially to help sustain and expand Wealthy Youth programs and daily operations.'
    },
    {
      icon: Building2,
      title: 'Kingdom Investment',
      description: 'Invest in specific initiatives and infrastructure projects that build a lasting legacy for the next generation.'
    }
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-24 px-4">
        <div className="bg-white p-12 rounded-[32px] shadow-lg max-w-lg w-full text-center border border-border-gray">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-black mb-4">Inquiry Received!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest in supporting Wealthy Youth. Our leadership team will review your inquiry and get back to you shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="rounded-full bg-primary hover:bg-[#111111] text-white">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-full border-border-gray text-black">
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="relative h-[40vh] min-h-[400px] w-full bg-[#6B102E] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80" 
          alt="Support and Sponsor" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
            Sponsor & Support
          </h1>
          <p className="text-lg text-white/90 font-light max-w-2xl mx-auto">
            Your generous support helps us reach, disciple, equip, and empower young people to become leaders of influence, purpose, excellence, and kingdom impact.
          </p>
        </div>
      </div>

      <div className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column: Info */}
            <div>
              <h2 className="text-4xl font-playfair font-bold text-black mb-6">Partner With Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-12">
                Through your generous support, Wealthy Youth continues to organize transformational conferences, empower young leaders, support outreach programs, and build a thriving community of impact.
              </p>

              <div className="space-y-8">
                {supportOptions.map((option, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-playfair font-bold text-xl text-black mb-2">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-white p-8 rounded-3xl border border-border-gray shadow-sm">
                <h3 className="font-playfair font-bold text-2xl text-black mb-4">Contact Leadership</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Our leadership team would be delighted to discuss partnership opportunities, sponsorship packages, donations, and collaborative initiatives.
                </p>
                <div className="space-y-3 text-sm">
                  <p><strong className="text-black">Phone:</strong> +234 XXX XXX XXXX</p>
                  <p><strong className="text-black">Email:</strong> <a href="mailto:partnerships@wealthyyouth.org" className="text-primary hover:underline">partnerships@wealthyyouth.org</a></p>
                  <p><strong className="text-black">Support:</strong> <a href="mailto:support@wealthyyouth.org" className="text-primary hover:underline">support@wealthyyouth.org</a></p>
                  <p><strong className="text-black">Address:</strong> Grace Nation International, Office Address</p>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div>
              <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-border-gray">
                <h3 className="text-2xl font-playfair font-bold text-black mb-8">Submit An Inquiry</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register('fullName')} placeholder="John Doe" className="h-12 rounded-xl" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className="h-12 rounded-xl" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" type="tel" {...register('phoneNumber')} placeholder="+234 801 234 5678" className="h-12 rounded-xl" />
                      {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization / Company (Optional)</Label>
                    <Input id="organization" {...register('organization')} placeholder="Your Company Ltd." className="h-12 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sponsorshipType">Sponsorship / Support Type</Label>
                    <select
                      id="sponsorshipType"
                      {...register('sponsorshipType')}
                      className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select an option</option>
                      <option value="Event Sponsorship">Event Sponsorship</option>
                      <option value="Partnership Program">Partnership Program</option>
                      <option value="Kingdom Investment">Kingdom Investment / Project Support</option>
                      <option value="General Donation">General Donation</option>
                      <option value="Other">Other / Discuss Options</option>
                    </select>
                    {errors.sponsorshipType && <p className="text-red-500 text-xs mt-1">{errors.sponsorshipType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Details</Label>
                    <textarea
                      id="message"
                      {...register('message')}
                      placeholder="Please share how you would like to support or partner with us..."
                      className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-full bg-primary hover:bg-[#111111] text-white font-bold tracking-widest uppercase text-xs mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
