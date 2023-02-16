import jwt from 'jsonwebtoken';
import { EnvProvider } from '../services/env-provider';

class TokenProvider {

  readonly expiresIn = '1d';

  generate(data: Record<string, any>): string {
    const token = jwt.sign(data, EnvProvider.secretKey, { expiresIn: this.expiresIn });

    return token;
  }

  verify(token: string) {
    jwt.verify(token, EnvProvider.secretKey);
  }

  decode(token: string) {
    const data = jwt.decode(token);

    return data;
  }

}

const tokenProvider = new TokenProvider();

export { tokenProvider };
