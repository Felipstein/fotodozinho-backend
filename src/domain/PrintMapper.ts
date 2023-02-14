import { Color, Print, PrintPrice, Prisma } from '@prisma/client';
import { IPrint } from '../entities/print-order/print/IPrint';
import { ImageStoragedService } from '../services/image-storaged-type';
import { printPriceMapper } from './PrintPriceMapper';

type PrintDomain = IPrint;
type PrintPersistence = Print & {
  printPrice: PrintPrice,
  color: Color,
};

class PrintMapper {

  toDomain(persistencePrint: PrintPersistence): PrintDomain {
    return {
      ...persistencePrint,
      printPrice: printPriceMapper.toDomain(persistencePrint.printPrice),
      quantity: Number(persistencePrint.quantity),
      imageStoragedType: ImageStoragedService.convertStorageTypeFormat(persistencePrint.imageStoragedType),
    };
  }

  toPersistence(domainPrint: PrintDomain): PrintPersistence {
    return {
      ...domainPrint,
      printPrice: printPriceMapper.toPersistence(domainPrint.printPrice),
      quantity: new Prisma.Decimal(domainPrint.quantity),
      imageStoragedType: ImageStoragedService.convertStorageTypePrismaFormat(domainPrint.imageStoragedType),
    };
  }

}

const printMapper = new PrintMapper();

export { printMapper };
