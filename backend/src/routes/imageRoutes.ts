import { Router } from 'express';
import upload from '../middlewares/fileUpload';
import { uploadImage, processImage, downloadImage } from '../controllers/imageController';

const router = Router();

// Upload route
router.post('/upload', upload.single('image'), uploadImage);

// Processing routes
router.post('/process', processImage);

// Download route
router.post('/download', downloadImage);

export default router;
