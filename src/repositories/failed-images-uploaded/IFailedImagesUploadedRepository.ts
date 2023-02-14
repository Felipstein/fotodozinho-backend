import { IFailedImageUploaded } from '../../entities/failed-image-uploaded/IFailedImageUploaded';
import { FailedImageUploadedCreateRequest } from '../../entities/failed-image-uploaded/dtos/FailedImageUploadedCreateRequest';

export interface IFailedImageUploadedRepository {

  listAll(): Promise<IFailedImageUploaded[]>;

  listByKey(key: string): Promise<IFailedImageUploaded>;

  create({ key }: FailedImageUploadedCreateRequest): Promise<IFailedImageUploaded>;

  deleteByKey(key: string): Promise<void>;

  deleteAll(): Promise<void>;

}
