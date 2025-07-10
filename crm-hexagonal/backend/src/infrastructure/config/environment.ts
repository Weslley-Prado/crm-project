import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGO_URI || 'mongodb://mongo:27017/crm',
  huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY || ''
};