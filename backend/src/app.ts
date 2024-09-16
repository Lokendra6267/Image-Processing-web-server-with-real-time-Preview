import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import imageRoutes from './routes/imageRoutes';

dotenv.config();

const app = express();

// Ensure the uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// API Routes
app.use('/api/images', imageRoutes);

export default app;
