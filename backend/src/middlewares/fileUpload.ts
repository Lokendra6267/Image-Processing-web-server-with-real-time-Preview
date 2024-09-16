import multer from 'multer';
import path from 'path';

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    cb(null, true); // If valid, pass null for error and true to accept the file
  } else {
    cb(new Error('Invalid file type')); // If invalid, pass an Error object
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
