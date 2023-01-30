import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { CreatePrintOrderDTO } from './CreatePrintOrderDTO';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ userId, prints }: CreatePrintOrderDTO): Promise<IPrintOrder> {
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

    const printOrder = await this.printOrdersRepository.create({
      userId, prints,
    });

    return printOrder;
  }

}
