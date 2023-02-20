import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentShoppingCartsRepository, currentUsersRepository } from '../../../repositories';
import { SignUpController } from './SignUpController';
import { SignUpUseCases } from './SignUpUseCases';

export function signUpFactory() {
  const useCases = new SignUpUseCases(currentUsersRepository, currentShoppingCartsRepository, new NodemailerEmailService());
  const controller = new SignUpController(useCases);

  return { useCases, controller };
}
