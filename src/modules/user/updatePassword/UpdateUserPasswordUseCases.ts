import { userViewMapper } from '../../../domain/UserViewMapper';
import { IUserPublic } from '../../../entities/user/IUserPublic';
import { IUserView } from '../../../entities/user/IUserView';
import { BadRequestError } from '../../../errors/BadRequestError';
import { PasswordTooShortError } from '../../../errors/PasswordTooShortError';
import { PasswordsDoNotMatchError } from '../../../errors/PasswordsDoNotMatchError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { SamePasswordsError } from '../../../errors/SamePasswordsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { crypt } from '../../../providers/Crypt';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { ValidateService } from '../../../services/validate';
import { UpdateUserPasswordRequest } from './UpdateUserPasswordDTO';

export class UpdateUserPasswordUseCases {

  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ userId, currentPassword, newPassword, confirmNewPassword }: UpdateUserPasswordRequest, isAdmin = false): Promise<IUserView | IUserPublic> {
    if(ValidateService.someIsNullOrUndefined(currentPassword, newPassword, confirmNewPassword)) {
      throw new RequiredFieldsError('Senha atual', 'Nova senha', 'Confirmar senha');
    }

    if(newPassword.length < 3) {
      throw new PasswordTooShortError();
    }

    if(newPassword !== confirmNewPassword) {
      throw new PasswordsDoNotMatchError();
    }

    const user = await this.usersRepository.listById(userId, true);
    if(!user) {
      throw new UserNotFoundError();
    }

    // @ts-ignore
    const correctPassword = await crypt.matchesPassword(currentPassword, user);
    if(!correctPassword) {
      throw new BadRequestError('Senha atual incorreta');
    }

    const encryptedPassword = await crypt.hash(newPassword);

    if(user.password === encryptedPassword) {
      throw new SamePasswordsError();
    }

    const userUpdated = await this.usersRepository.update(userId, { password: encryptedPassword }, false);

    return isAdmin ? userUpdated : userViewMapper.toPublic(userUpdated);
  }

}
