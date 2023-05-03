import { Router } from 'express';
import { upload } from '../middlewares/fileUpload';
import { uploadHandler } from '../controllers/upload';

const uploadRouter = Router();

uploadRouter.post('/', upload, uploadHandler);

export default uploadRouter;
