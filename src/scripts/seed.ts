import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, EventModel, Media, Sermon } from '../lib/models';
import mockDb from '../data/db.json';

// Load env vars
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');

    // 1. Create Super Admin User
    const adminEmail = 'admin@wealthyyouth.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('wealthyyouth2026', 10);
      await User.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'super_admin',
      });
      console.log(`✅ Created Super Admin (email: ${adminEmail}, password: wealthyyouth2026)`);
    } else {
      console.log('ℹ️ Super Admin already exists');
    }

    // 2. Migrate Events
    for (const event of mockDb.events) {
      const existingEvent = await EventModel.findOne({ slug: event.slug });
      if (!existingEvent) {
        await EventModel.create({
          title: event.title,
          slug: event.slug,
          description: event.description,
          banner: event.banner,
          date: new Date(event.date),
          time: event.time,
          location: event.location,
          speakers: event.speakers,
          gallery: event.gallery,
          published: true,
        });
        console.log(`✅ Migrated Event: ${event.title}`);
      }
    }

    // 3. Migrate Photos to Media
    for (const photo of mockDb.photos) {
      const existingMedia = await Media.findOne({ cloudinaryUrl: photo.url });
      if (!existingMedia) {
        await Media.create({
          title: photo.title,
          description: photo.category,
          mediaType: 'image',
          cloudinaryUrl: photo.url,
          published: true,
        });
        console.log(`✅ Migrated Photo: ${photo.title}`);
      }
    }

    // 4. Migrate Videos to Sermons
    for (const video of mockDb.videos) {
      const existingSermon = await Sermon.findOne({ videoUrl: video.url });
      if (!existingSermon) {
        await Sermon.create({
          title: video.title,
          speaker: 'Guest Speaker',
          description: video.title,
          thumbnail: video.thumbnail,
          videoUrl: video.url,
          category: video.category,
          published: true,
        });
        console.log(`✅ Migrated Video to Sermon: ${video.title}`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
