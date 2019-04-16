import {User} from '@todo/common-api';

export class FindAllUsers {
  static type = '[USer] FindAllUsers';
}

export class CreateUser {
  static type = '[User] CreateUser';

  constructor(public user: User) {
  }
}

export class DeleteUser {
  static type = '[User] DeleteUser';

  constructor(public id: string) {
  }
}
