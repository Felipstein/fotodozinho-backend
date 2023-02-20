import { ValidatorToken } from '@prisma/client';
import { IValidatorToken } from '../entities/validator-token/IValidatorToken';

type ValidatorTokenDomain = IValidatorToken;
type ValidatorTokenPersistence = ValidatorToken;

class ValidatorTokenMapper {

  toDomain(validatorTokenPersistence: ValidatorTokenPersistence): ValidatorTokenDomain {
    return {
      id: validatorTokenPersistence.id,
      expiresIn: Number(validatorTokenPersistence.expiresIn),
      email: validatorTokenPersistence.email,
    };
  }

}

const validatorTokenMapper = new ValidatorTokenMapper();

export { validatorTokenMapper };
