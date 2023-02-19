import { Print, Prisma } from '@prisma/client';
import { PrintCreateRequest } from '../entities/print-order/print/dtos/PrintCreateRequest';
import { ImageStoragedService } from '../services/image-storaged-type';

type PrintCreationDomain = PrintCreateRequest;
type PrintCreationPersistence = Omit<Print, 'id' | 'printOrderId'>;

class PrintCreationMapper {

  toDomain(persistencePrintCreation: PrintCreationPersistence): PrintCreationDomain {
    return {
      ...persistencePrintCreation,
      imageStoragedType: ImageStoragedService.convertStorageTypeFormat(persistencePrintCreation.imageStoragedType),
      quantity: Number(persistencePrintCreation.quantity),
    };
  }

  toPersistence(domainPrintCreation: PrintCreationDomain): PrintCreationPersistence {
    return {
      ...domainPrintCreation,
      imageStoragedType: ImageStoragedService.convertStorageTypePrismaFormat(domainPrintCreation.imageStoragedType),
      quantity: new Prisma.Decimal(domainPrintCreation.quantity),
    };
  }

}

const printCreationMapper = new PrintCreationMapper();

export { printCreationMapper };
