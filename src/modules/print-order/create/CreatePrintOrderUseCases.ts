import { isEmpty } from 'lodash';
import { prisma } from '../../../database';
import { PrintOrderCreateRequest } from '../../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { PrintCreateRequest } from '../../../entities/print-order/print/dtos/PrintCreateRequest';
import { BadRequestError } from '../../../errors/BadRequestError';
import { DetailedError } from '../../../errors/DetailedError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IPrintsRepository } from '../../../repositories/prints/IPrintsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { RejectedPrintResponse } from './RejectedPrintResponse';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
    private printPricesRepository: IPrintPricesRepository,
    private printsRepository: IPrintsRepository,
    private colorsRepository: IColorsRepository,
  ) { }

  async execute({ userId, prints }: Omit<PrintOrderCreateRequest, 'number'>, isTest = false): Promise<{ printOrder: IPrintOrder, rejectedPrints: RejectedPrintResponse[] }> {
    if(someIsNullOrUndefined(userId, prints)) {
      throw new RequiredFieldsError('Usuário', 'Fotos para revelação');
    }

    if(prints.length === 0) {
      throw new BadRequestError('Nenhuma foto para revelação foi enviada');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const { acceptedPrints, rejectedPrints } = await this.validatePrints(prints);

    if(acceptedPrints.length === 0) {
      const reasons = rejectedPrints.map(({ print, reason }) => {
        let printName = print.imageName;

        if(!printName) {
          printName = print.key;
        }

        return { printName, reason };
      });

      if(isTest) {
        const correctReason = reasons.map(({ printName, reason }) => `${printName}: ${reason}`);
        throw new DetailedError(400, { reasons }, correctReason.join(', '));
      }

      throw new DetailedError(400, { reasons }, 'Nenhuma foto para revelação possui seus campos corretos ou preenchidos');
    }

    const number = user.totalPrintOrders + 1;

    const printOrder = await this.printOrdersRepository.create({
      number, userId, prints: acceptedPrints,
    });

    await this.usersRepository.update(userId, { totalPrintOrders: number }, false);

    return { printOrder, rejectedPrints: isEmpty(rejectedPrints) ? undefined : rejectedPrints };
  }

  private async validatePrints(prints: PrintCreateRequest[]): Promise<{ acceptedPrints: PrintCreateRequest[], rejectedPrints: RejectedPrintResponse[] }> {
    const acceptedPrints: PrintCreateRequest[] = [];
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

      const imageUrlAlreadyExists = await this.printsRepository.listPrintByImageUrl(print.imageUrl);
      if(imageUrlAlreadyExists) {
        rejectedPrints.push({ print, reason: 'O URL da foto já existe' });
        return;
      }

      const keyAlreadyExists = await this.printsRepository.listPrintByKey(print.key);
      if(keyAlreadyExists) {
        rejectedPrints.push({ print, reason: 'A chave da foto já existe' });
        return;
      }

      acceptedPrints.push(print);
    });

    await Promise.all(promises);

    return { acceptedPrints, rejectedPrints };
  }

}
