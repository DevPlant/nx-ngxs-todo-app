import { State } from '@ngxs/store';

@State({
  name: "login",
  defaults: {
    loginForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {}
    }
  }
})
export class LoginState {}
