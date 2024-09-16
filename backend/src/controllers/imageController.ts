import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Upload and manipulate images
export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imagePath = req.file.path;
  res.json({ imagePath });
};

export const processImage = async (req: Request, res: Response) => {
  const { brightness = 1, contrast = 1, saturation = 1, rotation = 0, format } = req.body;
  const filePath = req.body.imagePath;

  try {
    const processedImage = sharp(filePath)
      .modulate({ brightness, saturation })
      .rotate(parseFloat(rotation))
      .toFormat(format || 'jpeg');

    const previewBuffer = await processedImage.resize(300).toBuffer();
    res.set('Content-Type', `image/${format || 'jpeg'}`).send(previewBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error processing image', error });
  }
};

export const downloadImage = async (req: Request, res: Response) => {
  const { imagePath, format = 'jpeg' } = req.body;
  const outputFilePath = `uploads/processed-${Date.now()}.${format}`;

  sharp(imagePath)
    .toFormat(format)
    .toFile(outputFilePath, (err, info) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving final image', err });
      }
      res.json({ finalImagePath: `/${outputFilePath}` });
    });
};
