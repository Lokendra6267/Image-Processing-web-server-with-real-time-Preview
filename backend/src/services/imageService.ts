import sharp, { FormatEnum } from 'sharp';

// Allowed formats for the image conversion
const allowedFormats: Array<keyof FormatEnum> = ['jpeg', 'png', 'webp', 'tiff', 'gif'];

export const processImage = async (
  filePath: string,
  brightness: number = 1,
  contrast: number = 1,
  saturation: number = 1,
  rotation: number = 0,
  format: string = 'jpeg'
) => {
  try {
    // Validate the format before passing to sharp
    if (!allowedFormats.includes(format as keyof FormatEnum)) {
      format = 'jpeg'; // Default to 'jpeg' if the format is not valid
    }

    // Use sharp to process the image
    const processedImage = sharp(filePath)
      .modulate({ brightness, saturation })
      .rotate(rotation)
      .toFormat(format as keyof FormatEnum);

    // Resize the image for preview and return the buffer
    const previewBuffer = await processedImage.resize(300).toBuffer();
    return previewBuffer;
  } catch (error) {
    // Cast error to Error type
    const errorMessage = (error as Error).message;
    throw new Error(`Error processing image: ${errorMessage}`);
  }
};
