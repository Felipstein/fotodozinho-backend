import { prisma } from '../../database';
import { printMapper } from '../../domain/PrintMapper';
import { IPrint } from '../../entities/print-order/print/IPrint';
import { IPrintsRepository } from './IPrintsRepository';

const include = {
  color: true,
  printPrice: true,
};

export class PrismaPrintsRepository implements IPrintsRepository {

  async listPrintByImageUrl(imageUrl: string): Promise<IPrint> {
    const print = await prisma.print.findFirst({ where: { imageUrl } });

    if(!print) {
      return null;
    }

    return printMapper.toDomain(print);
  }

  async listPrintByKey(key: string): Promise<IPrint> {
    const print = await prisma.print.findFirst({ where: { key } });

    if(!print) {
      return null;
    }

    return printMapper.toDomain(print);
  }

  async listByPrintOrderId(printOrderId: string): Promise<IPrint[]> {
    const prints = await prisma.print.findMany({
      where: { printOrderId },
      include,
    });

    return prints.map(printMapper.toDomain);
  }

  async deleteByPrintOrderId(printOrderId: string): Promise<void> {
    await prisma.print.deleteMany({ where: { printOrderId } });
  }

  cleanRepository(): void {}

}
