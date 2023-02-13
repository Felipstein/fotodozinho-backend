import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

class LocalFileManagerService {

  static async deleteImage(imageKey: string) {
    const image = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', imageKey);

    if(!fs.existsSync(image)) {
      throw new Error(`Image ${imageKey} not found to delete`);
    }

    const unlink = promisify(fs.unlink);
    await unlink(image);
  }

}

export { LocalFileManagerService };
