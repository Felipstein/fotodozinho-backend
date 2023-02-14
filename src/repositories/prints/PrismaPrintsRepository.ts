/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../database';
import { printMapper } from '../../domain/PrintMapper';
import { PrintCreateRequest } from '../../entities/print-order/print/dtos/PrintCreateRequest';
import { IPrint } from '../../entities/print-order/print/IPrint';
import { ImageStoragedService } from '../../services/image-storaged-type';
import { IPrintsRepository, PrintsListProperties } from './IPrintsRepository';

const include = {
  printPrice: true,
  color: true,
};

export class PrismaPrintsRepository implements IPrintsRepository {

  async listManyByProperties({ printOrderId, imageName, imageUrl, key, colorId, printPriceId }: PrintsListProperties): Promise<IPrint[]> {
    const prints = await prisma.print.findMany({
      where: { printOrderId, imageName, imageUrl, key, colorId, printPriceId },
      include,
    });

    return prints.map(printMapper.toDomain);
  }

  async listFirstByProperties({ printOrderId, imageName, imageUrl, key, colorId, printPriceId }: PrintsListProperties): Promise<IPrint> {
    const print = await prisma.print.findFirst({
      where: { printOrderId, imageName, imageUrl, key, colorId, printPriceId },
      include,
    });

    if(!print) {
      return null;
    }

    return printMapper.toDomain(print);
  }

  async create({ imageName, imageUrl, key, imageStoragedType, border, colorId, printPriceId, quantity, printOrderId }: PrintCreateRequest): Promise<IPrint> {
    const imageStoragedTypeConverted = ImageStoragedService.convertStorageTypePrismaFormat(imageStoragedType);

    const print = await prisma.print.create({
      data: { imageName, imageUrl, key, imageStoragedType: imageStoragedTypeConverted, border, colorId, printPriceId, quantity, printOrderId },
      include,
    });

    return printMapper.toDomain(print);
  }

}
