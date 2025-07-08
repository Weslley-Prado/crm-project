import mongoose from 'mongoose';

export async function connectToDatabase() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/crm';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}