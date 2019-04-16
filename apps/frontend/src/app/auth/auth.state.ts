import {Action, NgxsOnInit, Selector, State, StateContext, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

import {catchError, take, tap} from 'rxjs/operators';

import {CheckSession, Login, LoginFailed, LoginRedirect, LoginSuccess, Logout, LogoutSuccess,} from './auth.actions';
import {Role, TokenResponse, User} from '@todo/common-api';
import {AuthService} from './auth.service';
import {of} from 'rxjs/internal/observable/of';

export interface AuthStateModel {
  initialized: boolean;
  user?: User;
}


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    user: null,
  }
})
export class AuthState implements NgxsOnInit {

  constructor(private store: Store, private authService: AuthService) {
  }

  /**
   * Selectors
   */
  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession());
  }

  /**
   * Commands
   */
  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    return this.authService.getCurrentUser().pipe(
      take(1),
      tap((user: User) => {
        ctx.patchState({initialized: true});
        if (user) {
          ctx.patchState({
            user: user
          });
          console.log(`CheckSession: ${user.username} is logged in`);
          ctx.dispatch(new LoginSuccess(user));
          return;
        }
        console.log('CheckSession: no user found');
      }),
      catchError((error) => {
        ctx.dispatch(new LoginFailed(error));
        return of(null);
      })
    );
  }

  @Action(Login)
  loginWithEmailAndPassword(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action).pipe(
      take(1),
      tap((token: TokenResponse) => {
        this.authService.saveToken(token);
        ctx.dispatch(new CheckSession());
      }),
      catchError((error) => {
        ctx.dispatch(new LoginFailed(error));
        return of(null);
      })
    );
  }


  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.authService.clearToken();
    ctx.dispatch(new LogoutSuccess());
  }

  /**
   * Events
   */

  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginSuccess, navigating to dashboard',ctx.getState());
    if (ctx.getState().user.roles.indexOf(Role.ADMIN) >= 0) {
      ctx.dispatch(new Navigate(['/admin-dashboard']));
    } else if (ctx.getState().user.roles.indexOf(Role.USER) >= 0) {
      ctx.dispatch(new Navigate(['/user-dashboard']));
    }
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginRedirect, navigating to /auth/login');
    ctx.dispatch(new Navigate(['/login']));
  }

  @Action([LoginFailed, LogoutSuccess])
  setUserStateOnFailure(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: undefined
    });
    ctx.dispatch(new LoginRedirect());
  }

}
