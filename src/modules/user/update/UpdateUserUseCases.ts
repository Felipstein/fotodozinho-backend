import { userViewMapper } from '../../../domain/UserViewMapper';
import { IUserPublic } from '../../../entities/user/IUserPublic';
import { IUserView } from '../../../entities/user/IUserView';
import { UserUpdateRequest } from '../../../entities/user/dtos/UserUpdateRequest';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { crypt } from '../../../providers/Crypt';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';

export class UpdateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string, {
    name,
    phone,
    password,
    admin,
    totalPrints,
    totalPrintOrders,
    totalPurchases,
    totalPurchaseOrders
  }: UserUpdateRequest, isTest = false, isAdmin = false): Promise<IUserView | IUserPublic> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(ValidateService.someIsNull(name, password)) {
      throw new BadRequestError('Nome e senha não podem ter valores em branco');
    }

    const userExists = await this.usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    let userUpdated;

    if(isAdmin) {
      const encryptedPassword = password && await crypt.hash(password);
      userUpdated = await this.usersRepository.update(id, {
        name,
        phone,
        password: encryptedPassword,
        admin: admin || false,
        totalPrints,
        totalPrintOrders,
        totalPurchases,
        totalPurchaseOrders,
      }, isTest);
    } else {
      userUpdated = await this.usersRepository.update(id, {
        name,
        phone,
      }, isTest);
    }


    return isAdmin ? userUpdated : userViewMapper.toPublic(userUpdated);
  }

}
