import mongoose from 'mongoose';
import { environment } from './environment';

export async function connectDB() {
  try {
    await mongoose.connect(environment.mongoUri, {
      retryWrites: true,
      w: 'majority',
      connectTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
}