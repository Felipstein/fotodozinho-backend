import { PrintOrderCreateRequest } from '../../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ userId }: Omit<PrintOrderCreateRequest, 'number'>, requestingUserId: string): Promise<IPrintOrder> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    if(!requestingUserId) {
      throw new UnauthorizedError();
    }


    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    if(requestingUserId !== userId) {
      throw new ForbiddenError();
    }

    const number = user.totalPrintOrders + 1;

    const printOrder = await this.printOrdersRepository.create({
      number, userId,
    });

    await this.usersRepository.update(userId, { totalPrintOrders: number }, false);

    return printOrder;
  }

}
