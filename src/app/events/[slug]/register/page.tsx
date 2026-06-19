"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { getEventBySlug } from '@/lib/actions';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(5, 'WhatsApp number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { data: session, status } = useSession();
  const [eventTitle, setEventTitle] = useState('Loading...');
  const [eventDetails, setEventDetails] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/membership?login=true&callbackUrl=/events/${slug}/register`);
    }
  }, [status, router, slug]);

  useEffect(() => {
    getEventBySlug(slug).then(event => {
      if (event) {
        setEventDetails(event);
        setEventTitle(event.title);
      } else {
        setEventTitle(slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
      }
    });
  }, [slug]);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, eventId: slug }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.details) {
          const detailMsgs = result.details.map((d: any) => `${d.path.join('.')}: ${d.message}`).join(', ');
          throw new Error(`Validation failed: ${detailMsgs}`);
        }
        throw new Error(result.error || 'Failed to register');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-24 px-4">
        <div className="bg-white p-12 rounded-[32px] shadow-lg max-w-lg w-full text-center border border-border-gray">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-black mb-4">Registration Successful!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for registering for <span className="font-medium text-black">{eventTitle}</span>.
            We have sent a confirmation email to your inbox with further details.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="rounded-full bg-primary hover:bg-[#111111] text-white">
              <Link href={`/events/${slug}`}>Back to Event</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-border-gray text-black">
              <Link href="/events">View More Events</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link href={`/events/${slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Event
        </Link>

        <div className="bg-white rounded-[32px] shadow-sm border border-border-gray overflow-hidden">
          {eventDetails ? (
            <div className="relative h-64 md:h-80 w-full">
              <img 
                src={eventDetails.banner} 
                alt={eventDetails.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-8 md:p-12 text-white w-full">
                  <h1 className="text-4xl font-playfair font-bold mb-4">{eventDetails.title}</h1>
                  <div className="flex flex-wrap gap-6 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(eventDetails.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{eventDetails.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{eventDetails.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12 pb-0">
              <h1 className="text-4xl font-playfair font-bold text-black mb-2">Register</h1>
              <p className="text-muted-foreground">Secure your seat for {eventTitle}</p>
            </div>
          )}

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register('firstName')} placeholder="John" className="h-12 rounded-xl" />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register('lastName')} placeholder="Doe" className="h-12 rounded-xl" />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
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
                <p className="text-xs text-muted-foreground mt-1">We will use this WhatsApp number for event updates and important communications.</p>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} className="h-12 rounded-xl" />
                {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  {...register('gender')}
                  className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register('country')} placeholder="United States" className="h-12 rounded-xl" />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register('state')} placeholder="New York" className="h-12 rounded-xl" />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city')} placeholder="New York City" className="h-12 rounded-xl" />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-full bg-primary hover:bg-[#111111] text-white font-bold tracking-widest uppercase text-xs mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
