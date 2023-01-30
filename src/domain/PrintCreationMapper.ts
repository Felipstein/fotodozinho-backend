import { Print, Prisma } from '@prisma/client';
import { IPrintCreation } from '../entities/print-order/print/IPrintCreation';

type PrintCreationDomain = IPrintCreation;
type PrintCreationPersistence = Omit<Print, 'id' | 'printOrderId'>;

class PrintCreationMapper {

  toDomain(persistencePrintCreation: PrintCreationPersistence): PrintCreationDomain {
    return {
      ...persistencePrintCreation,
      quantity: Number(persistencePrintCreation.quantity),
    };
  }

  toPersistence(domainPrintCreation: PrintCreationDomain): PrintCreationPersistence {
    return {
      ...domainPrintCreation,
      quantity: new Prisma.Decimal(domainPrintCreation.quantity),
    };
  }

}

const printCreationMapper = new PrintCreationMapper();

export { printCreationMapper };
