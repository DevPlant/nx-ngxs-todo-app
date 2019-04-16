import {Role} from '@todo/common-api';

export interface JwtPayload {

  username: string;
  roles: Role[];
}
