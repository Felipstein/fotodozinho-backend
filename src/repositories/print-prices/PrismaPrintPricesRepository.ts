import { prisma } from '../../database';
import { printPriceMapper } from '../../domain/PrintPriceMapper';
import { IPrintPrice } from '../../entities/print-price/IPrintPrice';
import { IPrintPriceCreation } from '../../entities/print-price/IPrintPriceCreation';
import { IPrintPriceUpdating } from '../../entities/print-price/IPrintPriceUpdating';
import { IPrintPricesRepository } from './IPrintPricesRepository';

export class PrismaPrintPricesRepository implements IPrintPricesRepository {

  async listAll(): Promise<IPrintPrice[]> {
    const printPrices = await prisma.printPrice.findMany();

    return printPrices.map(printPriceMapper.toDomain);
  }

  async listById(id: string): Promise<IPrintPrice> {
    const printPrice = await prisma.printPrice.findFirst({ where: { id } });

    if(!printPrice) {
      return null;
    }

    return printPriceMapper.toDomain(printPrice);
  }

  async listByLength(length: string): Promise<IPrintPrice> {
    const printPrice = await prisma.printPrice.findFirst({ where: { length } });

    if(!printPrice) {
      return null;
    }

    return printPriceMapper.toDomain(printPrice);
  }

  async create({ length, price }: IPrintPriceCreation): Promise<IPrintPrice> {
    const printPrice = await prisma.printPrice.create({
      data: { length, price },
    });

    return printPriceMapper.toDomain(printPrice);
  }

  async updatePrice(id: string, { price }: IPrintPriceUpdating): Promise<IPrintPrice> {
    const printPrice = await prisma.printPrice.update({
      where: { id },
      data: { price },
    });

    return printPriceMapper.toDomain(printPrice);
  }

  async delete(id: string): Promise<void> {
    prisma.printPrice.delete({ where: { id } });
  }

  cleanRepository(): void {}

}
