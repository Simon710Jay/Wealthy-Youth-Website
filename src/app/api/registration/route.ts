import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { MembershipRegistration, User } from '@/lib/models';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = registrationSchema.parse(body);
    
    // Connect directly to the real database
    await connectMongo();

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create User record for auth
    const newUser = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
      role: 'member'
    });
    
    await newUser.save();
    
    // Save data to MongoDB Membership Registration
    const newRegistration = new MembershipRegistration({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber,
      dateOfBirth: new Date(validatedData.dateOfBirth),
      gender: validatedData.gender,
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      country: validatedData.country,
    });
    
    await newRegistration.save();
    
    // Return success response
    return NextResponse.json({ success: true, message: 'Registration saved successfully' }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Return validation errors when necessary
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 });
    }
    console.error('Membership registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
