import { NotFoundError } from './../../../errors/NotFoundError';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { IUserView } from '../../../entities/IUserView';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';

export class ListUserByIdUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IUserView> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const user = await this.usersRepository.listById(id);
    if(!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
  }

}
