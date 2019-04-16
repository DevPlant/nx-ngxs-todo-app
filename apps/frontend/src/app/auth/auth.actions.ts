// Actions
import {User} from '@todo/common-api';

export class CheckSession {
  static type = '[Auth] CheckSession';
}

export class Login {
  static type = '[Auth] Login';

  constructor(public username: string, public password: string) {
  }
}

export class Logout {
  static type = '[Auth] Logout';
}

export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}

// Events
export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';

  constructor(public user: User) {
  }
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';

  constructor(public error: any) {
  }
}

