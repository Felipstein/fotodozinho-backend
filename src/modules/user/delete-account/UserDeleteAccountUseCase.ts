import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { crypt } from '../../../providers/Crypt';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { UserDeleteAccountRequest } from './UserDeleteAccountDTO';

export class UserDeleteAccountUseCase {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ userId, password }: UserDeleteAccountRequest): Promise<void> {
    if(ValidateService.someIsNullOrUndefined(userId, password)) {
      throw new RequiredFieldsError('Usuário', 'Senha');
    }

    const user = await this.usersRepository.listById(userId, true);
    if(!user) {
      throw new UserNotFoundError();
    }

    // @ts-ignore
    const correctPassword = await crypt.matchesPassword(password, user);
    if(!correctPassword) {
      throw new BadRequestError('Senha incorreta');
    }

    await this.usersRepository.delete(userId);
  }

}
