import cuid from 'cuid';
import { v4 } from 'uuid';

export class UUID {

  generateUUID() {
    return v4();
  }

  generateCUID() {
    return cuid();
  }

}

const uuidProvider = new UUID();

export { uuidProvider };
