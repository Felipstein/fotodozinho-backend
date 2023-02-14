import { StorageType } from '../../services/image-storaged-type';

export interface IFailedImageUploaded {
  id: string;
  key: string;
  storagedType: StorageType;
}
