import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { EventModel, EventRegistration } from '@/lib/models';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const registerSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized. Please log in to register.' }, { status: 401 });
    }

    const body = await req.json();
    
    // Validate request body
    const validatedData = registerSchema.parse(body);
    
    await connectMongo();
    
    // Ensure event exists
    const event = await EventModel.findOne({ slug: validatedData.eventId });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    // Create registration
    const newRegistration = new EventRegistration({
      eventId: event._id,
      userId: (session.user as any).id,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber,
      dateOfBirth: new Date(validatedData.dateOfBirth),
      gender: validatedData.gender,
      country: validatedData.country,
      state: validatedData.state,
      city: validatedData.city,
    });
    
    await newRegistration.save();
    
    return NextResponse.json({ success: true, registration: newRegistration }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
