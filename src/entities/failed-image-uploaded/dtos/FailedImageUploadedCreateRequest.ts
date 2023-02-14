import { StorageType } from '../../../services/image-storaged-type';

export interface FailedImageUploadedCreateRequest {
  key: string;
  storagedType: StorageType;
}
