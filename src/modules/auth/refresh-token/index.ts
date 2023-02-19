import { RefreshTokenController } from './RefreshTokenController';
import { RefreshTokenUseCases } from './RefreshTokenUseCases';

export function refreshTokenFactory() {
  const useCases = new RefreshTokenUseCases();
  const controller = new RefreshTokenController(useCases);

  return { useCases, controller };
}
