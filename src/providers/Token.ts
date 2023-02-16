import jwt from 'jsonwebtoken';
import { EnvProvider } from '../services/env-provider';

class TokenProvider {

  readonly expiresIn = '1d';

  generate(data: Record<string, any>): string {
    const token = jwt.sign(data, EnvProvider.secretKey, { expiresIn: this.expiresIn });

    return token;
  }

  verify(token: string) {
    try {
      jwt.verify(token, EnvProvider.secretKey);
    } catch (err: any) {
      throw new Error('Invalid token');
    }
  }

  decode(token: string) {
    const data = jwt.decode(token);

    return data;
  }

}

const tokenProvider = new TokenProvider();

export { tokenProvider };
