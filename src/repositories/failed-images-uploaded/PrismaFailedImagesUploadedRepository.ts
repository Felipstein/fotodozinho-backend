import { prisma } from '../../database';
import { IFailedImageUploaded } from '../../entities/failed-image-uploaded/IFailedImageUploaded';
import { FailedImageUploadedCreateRequest } from '../../entities/failed-image-uploaded/dtos/FailedImageUploadedCreateRequest';
import { IFailedImageUploadedRepository } from './IFailedImagesUploadedRepository';

export class PrismaFailedImagesUploadedRepository implements IFailedImageUploadedRepository {

  listAll(): Promise<IFailedImageUploaded[]> {
    return prisma.failedImageUploaded.findMany();
  }

  listByKey(key: string): Promise<IFailedImageUploaded> {
    return prisma.failedImageUploaded.findFirst({ where: { key } });
  }

  create({ key }: FailedImageUploadedCreateRequest): Promise<IFailedImageUploaded> {
    return prisma.failedImageUploaded.create({ data: { key} });
  }

  async deleteByKey(key: string): Promise<void> {
    await prisma.failedImageUploaded.delete({ where: { key } });
  }

}
