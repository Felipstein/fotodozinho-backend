import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class ListDeletedUsersUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(when?: 'lastweek' | 'lastmonth'): Promise<IUserView[]> {
    let deletedUsers;

    if(when) {
      let before;
      if(when === 'lastmonth') {
        before = Date.now() - 30 * 24 * 60 * 60 * 1000;
      } else if(when === 'lastweek') {
        before = Date.now() - 7 * 24 * 60 * 60 * 1000;
      } else {
        throw new BadRequestError('Valor inválido para o parâmetro "when". Valores permitidos são "lastmonth" e "lastweek"');
      }

      deletedUsers = await this.usersRepository.listDeletedUsers(new Date(before));
    } else {
      deletedUsers = await this.usersRepository.listDeletedUsers();
    }

    return deletedUsers;
  }

}
