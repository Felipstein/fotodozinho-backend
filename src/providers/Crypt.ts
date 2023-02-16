import bcrypt from 'bcrypt';
import { IUser } from '../entities/user/IUser';

class Crypt {
  hash(value: string) {
    return bcrypt.hash(value, 8);
  }

  matches(plainValue: string, hashedValue: string) {
    return bcrypt.compare(plainValue, hashedValue);
  }

  matchesPassword(password: string, user: IUser) {
    return this.matches(password, user.password);
  }
}

const crypt = new Crypt();

export { crypt };
