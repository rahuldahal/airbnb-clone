import multer from 'multer';
import { DESTINATION, FIELD_NAME } from '../constants/upload';

// file upload setup with multer
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, DESTINATION);
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
}).single(FIELD_NAME);
