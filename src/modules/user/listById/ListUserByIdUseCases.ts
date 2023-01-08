import { IUser } from '../../../entities/IUser';
import { IUsersRepository } from './../../../repositories/IUsersRepository';

export class ListUserByIdUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<IUser> {
    if(!id) {

    }
  }

}
