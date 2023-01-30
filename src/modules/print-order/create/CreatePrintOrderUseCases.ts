import { prisma } from '../../../database';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { IPrintCreation } from '../../../entities/print-order/print/IPrintCreation';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IColorsRepository } from '../../../repositories/colors/IColorsRepository';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IPrintPricesRepository } from '../../../repositories/print-prices/IPrintPricesRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { CreatePrintOrderDTO } from './CreatePrintOrderDTO';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
    private printPricesRepository: IPrintPricesRepository,
    private colorsRepository: IColorsRepository,
  ) { }

  async execute({ userId, prints }: CreatePrintOrderDTO): Promise<{ printOrder: IPrintOrder, rejectedPrints: IPrintCreation[] }> {
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
      throw new BadRequestError('Nenhuma foto para revelação possui seus campos corretos ou preenchidos');
    }

    const printOrder = await this.printOrdersRepository.create({
      userId, prints: acceptedPrints,
    });

    return { printOrder, rejectedPrints };
  }

  private async validatePrints(prints: IPrintCreation[]): Promise<{ acceptedPrints: IPrintCreation[], rejectedPrints: IPrintCreation[] }> {
    const acceptedPrints: IPrintCreation[] = [];
    const rejectedPrints: IPrintCreation[] = [];

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
        rejectedPrints.push(print);
        return;
      }

      if(isNaN(print.quantity)) {
        rejectedPrints.push(print);
        return;
      }

      const printPricesExists = await this.printPricesRepository.listById(print.printPriceId);
      if(!printPricesExists) {
        rejectedPrints.push(print);
        return;
      }

      const colorExists = await this.colorsRepository.listById(print.colorId);
      if(!colorExists) {
        rejectedPrints.push(print);
        return;
      }

      const imageUrlAlreadyExists = await this.listPrintByImageUrl(print.imageUrl);
      if(imageUrlAlreadyExists) {
        rejectedPrints.push(print);
        return;
      }

      const keyAlreadyExists = await this.listPrintByKey(print.key);
      if(keyAlreadyExists) {
        rejectedPrints.push(print);
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
