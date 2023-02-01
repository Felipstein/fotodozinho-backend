import { Color, Print, PrintOrder, PrintPrice } from '@prisma/client';
import { IPrintOrder } from '../entities/print-order/IPrintOrder';
import { printMapper } from './PrintMapper';

type PrintOrderDomain = IPrintOrder;
type PrintOrderPersistence = PrintOrder & {
  Print: (Print & {
    color: Color,
    printPrice: PrintPrice,
  })[],
};

class PrintOrderMapper {

  toDomain(persistencePrintOrder: PrintOrderPersistence): PrintOrderDomain {
    return {
      ...persistencePrintOrder,
      number: Number(persistencePrintOrder.number),
      prints: persistencePrintOrder.Print.map(printMapper.toDomain),
    };
  }

}

const printOrderMapper = new PrintOrderMapper();

export { printOrderMapper };
