import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { crypt } from '../../../providers/Crypt';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { someIsNull } from '../../../utils/Validate';
import { UpdateUserDTO } from './UpdateUserDTO';

export class UpdateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string, { name, phone, password, admin, totalPrints, totalPrintOrders, totalPurchases }: UpdateUserDTO, isTest = false): Promise<IUserView> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(someIsNull(name, password)) {
      throw new BadRequestError('Nome e senha não podem ter valores em branco');
    }

    const userExists = await this.usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const encryptedPassword = password && await crypt.hash(password);
    const userUpdated = await this.usersRepository.update(id, {
      name,
      phone,
      password: encryptedPassword,
      admin: admin || false,
      totalPrints,
      totalPrintOrders,
      totalPurchases,
    }, isTest);

    return userUpdated;
  }

}
