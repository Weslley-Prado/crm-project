import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import { customerRoutes } from './adapters/controllers/customer.controller';
import { connectToDatabase } from './config/database';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

