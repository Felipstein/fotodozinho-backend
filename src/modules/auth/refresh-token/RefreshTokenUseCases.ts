import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { refreshTokenProvider } from '../../../providers/RefreshToken';
import { tokenProvider } from '../../../providers/Token';
import { RefreshTokenResponse } from './RefreshTokenDTO';

export class RefreshTokenUseCases {

  async execute(refreshToken: string): Promise<RefreshTokenResponse> {
    if(!refreshToken) {
      throw new RequiredFieldsError('Refresh Token');
    }

    const refreshTokenObj = await refreshTokenProvider.getRefreshTokenBy({ refreshTokenId: refreshToken });
    if(!refreshTokenObj) {
      throw new BadRequestError('Refresh Token inválido');
    }

    const { userId } = refreshTokenObj;

    const token = tokenProvider.generate({ userId });

    return { token };
  }

}
