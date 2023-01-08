import { IUser } from '../../../entities/IUser';
import { IUsersRepository } from './../../../repositories/IUsersRepository';
import { BadRequestError } from '../../../errors/BadRequestError';

export class ListUserByIdUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IUser> {
    if(!id) {
      throw new BadRequestError('ID não informado');
    }


  }

}
