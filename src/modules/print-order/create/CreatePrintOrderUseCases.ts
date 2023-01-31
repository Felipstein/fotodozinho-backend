import { prisma } from '../../../database';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';
import { BadRequestError } from '../../../errors/BadRequestError';
import { DetailedError } from '../../../errors/DetailedError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { CreatePrintOrderDTO } from './CreatePrintOrderDTO';
import { RejectedPrintResponse } from './RejectedPrintResponse';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
    private printPricesRepository: IPrintPricesRepository,
    private colorsRepository: IColorsRepository,
  ) { }

  async execute({ userId, prints }: CreatePrintOrderDTO, isTest = false): Promise<{ printOrder: IPrintOrder, rejectedPrints: RejectedPrintResponse[] }> {
    if(someIsNullOrUndefined(userId, prints)) {
      throw new RequiredFieldsError('Usuário', 'Fotos para revelação');
    }

    if(prints.length === 0) {
      throw new BadRequestError('Nenhuma foto para revelação foi enviada');
    }

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const { acceptedPrints, rejectedPrints } = await this.validatePrints(prints);

    if(acceptedPrints.length === 0) {
      const reasons = rejectedPrints.map(({ print, reason }) => ({ printName: print.imageName, reason }));

      if(isTest) {
        const correctReason = reasons.map(({ printName, reason }) => `${printName}: ${reason}`);
        throw new DetailedError(400, { reasons }, correctReason.join(', '));
      }

      throw new DetailedError(400, { reasons }, 'Nenhuma foto para revelação possui seus campos corretos ou preenchidos');
    }

    const printOrder = await this.printOrdersRepository.create({
      userId, prints: acceptedPrints,
    });

    return { printOrder, rejectedPrints };
  }

  private async validatePrints(prints: IPrintCreation[]): Promise<{ acceptedPrints: IPrintCreation[], rejectedPrints: RejectedPrintResponse[] }> {
    const acceptedPrints: IPrintCreation[] = [];
    const rejectedPrints: RejectedPrintResponse[] = [];

    const promises = prints.map(async print => {
      if(someIsNullOrUndefined(
        print.imageName,
        print.imageUrl,
        print.key,
        print.printPriceId,
        print.border,
        print.colorId,
        print.quantity,
      )) {
        rejectedPrints.push({ print, reason: RequiredFieldsError.buildStringMessage() });
        return;
      }

      if(isNaN(print.quantity)) {
        rejectedPrints.push({ print, reason: 'Quantidade deve ser um número' });
        return;
      }

      const printPricesExists = await this.printPricesRepository.listById(print.printPriceId);
      if(!printPricesExists) {
        rejectedPrints.push({ print, reason: 'Tamanho/tipo informado não existe' });
        return;
      }

      const colorExists = await this.colorsRepository.listById(print.colorId);
      if(!colorExists) {
        rejectedPrints.push({ print, reason: 'Cor/descrição informado não existe' });
        return;
      }

      const imageUrlAlreadyExists = await this.listPrintByImageUrl(print.imageUrl);
      if(imageUrlAlreadyExists) {
        rejectedPrints.push({ print, reason: 'O URL da foto já existe' });
        return;
      }

      const keyAlreadyExists = await this.listPrintByKey(print.key);
      if(keyAlreadyExists) {
        rejectedPrints.push({ print, reason: 'A chave da foto já existe' });
        return;
      }

      acceptedPrints.push(print);
    });

    await Promise.all(promises);

    return { acceptedPrints, rejectedPrints };
  }

  private listPrintByImageUrl(imageUrl: string) {
    return prisma.print.findFirst({ where: { imageUrl } });
  }

  private listPrintByKey(key: string) {
    return prisma.print.findFirst({ where: { key } });
  }

}
