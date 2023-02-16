import { PrintOrderCreateRequest } from '../../../entities/print-order/dtos/PrintOrderCreateRequest';
import { IPrintOrder } from '../../../entities/print-order/IPrintOrder';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPrintOrdersRepository } from '../../../repositories/print-orders/IPrintOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';

export class CreatePrintOrderUseCases {

  constructor(
    private printOrdersRepository: IPrintOrdersRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ totalPrintsExpected, userId }: Omit<PrintOrderCreateRequest, 'number'>, requestingUserId: string): Promise<IPrintOrder> {
    if(ValidateService.someIsNullOrUndefined(totalPrintsExpected)) {
      throw new RequiredFieldsError('Total de fotos esperado', 'Usuário');
    }

    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    if(isNaN(totalPrintsExpected)) {
      throw new NumberValidationError('Total de fotos esperado');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const requestingUser = await this.usersRepository.listById(requestingUserId);
    if(!requestingUser) {
      throw new UnauthorizedError();
    }

    if(!requestingUser.admin && requestingUserId !== userId) {
      throw new ForbiddenError();
    }

    const number = user.totalPrintOrders + 1;

    const printOrder = await this.printOrdersRepository.create({
      number, totalPrintsExpected, userId,
    });

    await this.usersRepository.update(userId, { totalPrintOrders: number }, false);

    return printOrder;
  }

}
