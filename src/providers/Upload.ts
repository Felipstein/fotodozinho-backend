import multer from 'multer';
import multerConfig from '../config/multer.config';

class UploadProvider {

  uploadSingleFile(fieldName: string) {
    return multer(multerConfig).single(fieldName);
  }

  uploadMultiFiles(fieldName: string) {
    return multer(multerConfig).array(fieldName);
  }

}

const uploadProvider = new UploadProvider();

export { uploadProvider };
