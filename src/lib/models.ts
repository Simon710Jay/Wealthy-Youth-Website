import mongoose, { Schema, Document } from 'mongoose';

// ----------------------
// User Model
// ----------------------
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'super_admin' | 'events_admin' | 'media_admin' | 'sermons_admin' | 'shop_admin' | 'member';
  profileImage?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for OAuth users if added later
  role: { 
    type: String, 
    enum: ['super_admin', 'events_admin', 'media_admin', 'sermons_admin', 'shop_admin', 'member'],
    default: 'member'
  },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// ----------------------
// Event Model
// ----------------------
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  banner: string;
  date: Date;
  time: string;
  location: string;
  category?: string;
  registrationOpen?: Date;
  registrationClose?: Date;
  speakers: string[];
  gallery: string[];
  registrationRequired: boolean;
  featured: boolean;
  published: boolean;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  banner: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String },
  registrationOpen: { type: Date },
  registrationClose: { type: Date },
  speakers: [{ type: String }],
  gallery: [{ type: String }],
  registrationRequired: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const EventModel = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

// ----------------------
// Event Registration Model
// ----------------------
export interface IEventRegistration extends Document {
  eventId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  country: string;
  state: string;
  city: string;
  createdAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const EventRegistration = mongoose.models.EventRegistration || mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);

// ----------------------
// Media Model
// ----------------------
export interface IMedia extends Document {
  title: string;
  description?: string;
  mediaType: 'image' | 'video';
  cloudinaryUrl: string;
  thumbnail?: string;
  eventId?: mongoose.Types.ObjectId;
  featured: boolean;
  published: boolean;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  title: { type: String, required: true },
  description: { type: String },
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  cloudinaryUrl: { type: String, required: true },
  thumbnail: { type: String },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export const Media = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

// ----------------------
// Sermon Model
// ----------------------
export interface ISermon extends Document {
  title: string;
  speaker: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
}

const SermonSchema = new Schema<ISermon>({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Sermon = mongoose.models.Sermon || mongoose.model<ISermon>('Sermon', SermonSchema);

// ----------------------
// Shop Product Model
// ----------------------
export interface IShopProduct extends Document {
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  inventory: number;
  featured: boolean;
  createdAt: Date;
}

const ShopProductSchema = new Schema<IShopProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inventory: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const ShopProduct = mongoose.models.ShopProduct || mongoose.model<IShopProduct>('ShopProduct', ShopProductSchema);

// ----------------------
// Order Model
// ----------------------
export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    priceAtTime: number;
  }[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'ShopProduct', required: true },
    quantity: { type: Number, required: true },
    priceAtTime: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

// ----------------------
// Testimonial Model
// ----------------------
export interface ITestimonial extends Document {
  name: string;
  testimony: string;
  image?: string;
  approved: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  testimony: { type: String, required: true },
  image: { type: String },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

// ----------------------
// Membership Registration Model
// ----------------------
export interface IMembershipRegistration extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
}

const MembershipRegistrationSchema = new Schema<IMembershipRegistration>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const MembershipRegistration = mongoose.models.MembershipRegistration || mongoose.model<IMembershipRegistration>('MembershipRegistration', MembershipRegistrationSchema);

// ----------------------
// Support Inquiry Model
// ----------------------
export interface ISupportInquiry extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  organization?: string;
  sponsorshipType: string;
  message: string;
  contacted: boolean;
  createdAt: Date;
}

const SupportInquirySchema = new Schema<ISupportInquiry>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  organization: { type: String },
  sponsorshipType: { type: String, required: true },
  message: { type: String, required: true },
  contacted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const SupportInquiry = mongoose.models.SupportInquiry || mongoose.model<ISupportInquiry>('SupportInquiry', SupportInquirySchema);
