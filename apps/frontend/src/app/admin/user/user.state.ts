import {User} from '@todo/common-api';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {take} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
import {UserService} from './user.service';
import {CreateUser, DeleteUser, FindAllUsers} from './user.action';

export interface UserStateModel {
  users?: User[],
  userForm?: any
}


@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    userForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {}
    }
  }
})
export class UserState {

  constructor(private readonly userService: UserService) {

  }

  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }


  @Action(FindAllUsers)
  findAll(ctx: StateContext<UserStateModel>) {
    return this.userService.findAll().pipe(take(1),
      tap((users) => {
        ctx.patchState({users: users});
      }));
  }


  @Action(CreateUser)
  createUser(ctx: StateContext<UserStateModel>, createUser: CreateUser) {
    return this.userService.createUser(createUser.user).pipe(
      take(1),
      tap(() => {
        ctx.dispatch(new FindAllUsers());
      }));
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, deleteUser: DeleteUser) {
    return this.userService.deleteUser(deleteUser.id).pipe(
      take(1),
      tap((x) => {
        ctx.dispatch(new FindAllUsers());
      }));
  }


}
