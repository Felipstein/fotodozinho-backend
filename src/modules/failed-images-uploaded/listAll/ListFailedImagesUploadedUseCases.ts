import { IFailedImageUploaded } from '../../../entities/failed-image-uploaded/IFailedImageUploaded';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';

export class ListFailedImagesUploadedUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute(): Promise<IFailedImageUploaded[]> {
    const failedImagesUploaded = await this.failedImagesUploadedRepository.listAll();

    return failedImagesUploaded;
  }

}
