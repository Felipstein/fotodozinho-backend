import { NotFoundError } from './../../../errors/NotFoundError';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IUserView } from '../../../entities/IUserView';

export class ListUserByIdUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IUserView> {
    if(!id) {
      throw new BadRequestError('ID não informado');
    }

    const user = await this.usersRepository.listById(id);
    if(!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
  }

}
