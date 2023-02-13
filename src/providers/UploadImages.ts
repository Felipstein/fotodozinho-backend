import multer from 'multer';
import multerConfig from '../config/multer.config';

class UploadImages {

  uploadMiddleware(fieldName: string) {
    return multer(multerConfig).single(fieldName);
  }

}

const uploadImages = new UploadImages();

export { uploadImages };
