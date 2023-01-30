import { Color, Print, PrintPrice, Prisma } from '@prisma/client';
import { IPrint } from '../entities/print-order/print/IPrint';
import { printPriceMapper } from './PrintPriceMapper';

type PrintDomain = IPrint;
type PrintPersistence = Print & {
  printPrice: PrintPrice,
  color: Color,
};

class PrintMapper {

  toDomain(persistencePrint: PrintPersistence): PrintDomain {
    return {
      id: persistencePrint.id,
      imageName: persistencePrint.imageName,
      imageUrl: persistencePrint.imageUrl,
      key: persistencePrint.key,
      printPrice: printPriceMapper.toDomain(persistencePrint.printPrice),
      printPriceId: persistencePrint.printPriceId,
      border: persistencePrint.border,
      color: persistencePrint.color,
      colorId: persistencePrint.colorId,
      quantity: Number(persistencePrint.quantity),
      printOrderId: persistencePrint.printOrderId,
    };
  }

  toPersistence(domainPrint: PrintDomain): PrintPersistence {
    return {
      id: domainPrint.id,
      imageName: domainPrint.imageName,
      imageUrl: domainPrint.imageUrl,
      key: domainPrint.key,
      printPrice: printPriceMapper.toPersistence(domainPrint.printPrice),
      printPriceId: domainPrint.printPriceId,
      border: domainPrint.border,
      color: domainPrint.color,
      colorId: domainPrint.colorId,
      quantity: new Prisma.Decimal(domainPrint.quantity),
      printOrderId: domainPrint.printOrderId,
    };
  }

}

const printMapper = new PrintMapper();

export { printMapper };
