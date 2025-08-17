import * as bcrypt from 'bcrypt';

import { saltRounds } from '../constants';

export class BcryptClass {
  static async createHash(plainText: string) {
    return await bcrypt.hash(plainText, saltRounds);
  }

  static async compareHash(plainText: string, hash: string) {
    return await bcrypt.compare(plainText, hash);
  }
}
