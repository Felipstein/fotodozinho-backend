import { BadRequestError } from '../../../errors/BadRequestError';
import { IFailedImageUploadedRepository } from '../../../repositories/failed-images-uploaded/IFailedImagesUploadedRepository';

export class DeleteFailedImagesUploadedUseCases {

  constructor(
    private failedImagesUploadedRepository: IFailedImageUploadedRepository,
  ) { }

  async execute(): Promise<void> {

    const failedImagesUploaded = await this.failedImagesUploadedRepository.listAll();
    if(failedImagesUploaded.length === 0) {
      throw new BadRequestError('Nenhuma imagem foi deletada');
    }

    await this.failedImagesUploadedRepository.deleteAll();
  }

}
