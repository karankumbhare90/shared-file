import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from './db/config';
import fileRouter from './routes/file';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// Database connection
connectDB();

// Cloudinary Setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/files', fileRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`)
})