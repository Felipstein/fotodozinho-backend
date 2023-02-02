import { Print, Prisma } from '@prisma/client';
import { PrintCreateRequest } from '../entities/print-order/print/dtos/PrintCreateRequest';

type PrintCreationDomain = PrintCreateRequest;
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
