import { currentRevokedTokensRepository, currentUsersRepository } from '../../../repositories';
import { SignOutController } from './SignOutController';
import { SignOutUseCases } from './SignOutUseCases';

export function signOutFactory() {
  const useCases = new SignOutUseCases(currentUsersRepository, currentRevokedTokensRepository);
  const controller = new SignOutController(useCases);

  return { useCases, controller };
}
