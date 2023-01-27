import { IPrintPrice } from './../entities/print-price/IPrintPrice';
import { PrintPrice } from '.prisma/client';

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

}

const printPriceMapper = new PrintPriceMapper();

export { printPriceMapper };
