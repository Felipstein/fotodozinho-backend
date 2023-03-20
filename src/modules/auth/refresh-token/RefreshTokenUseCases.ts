import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { accessTokenProvider } from '../../../providers/AccessToken';
import { refreshTokenProvider } from '../../../providers/RefreshToken';
import { RefreshTokenResponse } from './RefreshTokenDTO';

export class RefreshTokenUseCases {

  async execute(refreshToken: string): Promise<RefreshTokenResponse> {
    if(!refreshToken) {
      throw new RequiredFieldsError('Refresh Token');
    }

    const refreshTokenObj = await refreshTokenProvider.getRefreshTokenBy({ refreshTokenId: refreshToken });
    if(!refreshTokenObj) {
      throw new UnauthorizedError('Token de atualização é inválido, faça login novamente');
    }

    if(refreshTokenProvider.refreshTokenIsExpired(refreshTokenObj)) {
      await refreshTokenProvider.delete(refreshToken);
      throw new UnauthorizedError('Token de atualização expirou, faça login novamente');
    }

    const { userId } = refreshTokenObj;

    const token = accessTokenProvider.generate({ userId });
    const newRefreshToken = await refreshTokenProvider.regenerateRefreshToken(userId);

    return { token, refreshToken: newRefreshToken.id };
  }

}
