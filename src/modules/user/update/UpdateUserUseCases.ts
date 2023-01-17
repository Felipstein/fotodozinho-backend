import { IUserView } from '../../../entities/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { UpdateUserDTO } from './UpdateUserDTO';

export class UpdateUserUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string, userPayload: UpdateUserDTO): Promise<IUserView> {
    if(!id) {
      throw new BadRequestError('ID não informado');
    }
  }

}
