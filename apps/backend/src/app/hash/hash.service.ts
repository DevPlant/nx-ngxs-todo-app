import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService{

  private readonly saltRounds = 10;

  async getHash(value: string | undefined): Promise<string> {
    return bcrypt.hash(value, this.saltRounds);
  }

  async compareHash(value: string | undefined, hash: string | undefined): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
