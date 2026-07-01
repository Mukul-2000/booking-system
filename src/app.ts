import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sessionRoutes from './router/sessionRoutes';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './router/userRoutes';
import teacherRoutes from './router/teacherRoutes';
import { connectDB } from './config/db';

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/teachers', teacherRoutes);
app.use('/sessions', sessionRoutes);

// Error Handler (must be last)
app.use(errorHandler);


connectDB().then(() => {
  app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
});