import { IPrintPrice } from './../entities/print-price/IPrintPrice';
import { PrintPrice, Prisma } from '.prisma/client';

type PrintPriceDomain = IPrintPrice;
type PrintPricePersistence = PrintPrice;

class PrintPriceMapper {

  toDomain(persistencePrintPrice: PrintPricePersistence): PrintPriceDomain {
    return {
      id: persistencePrintPrice.id,
      length: persistencePrintPrice.length,
      price: Number(persistencePrintPrice.price),
    };
  }

  toPersistence(domainPrintPrice: PrintPriceDomain): PrintPricePersistence {
    return {
      id: domainPrintPrice.id,
      length: domainPrintPrice.length,
      price: new Prisma.Decimal(domainPrintPrice.price),
    };
  }

}

const printPriceMapper = new PrintPriceMapper();

export { printPriceMapper };
