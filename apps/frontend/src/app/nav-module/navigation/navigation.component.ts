import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Select, Store} from '@ngxs/store';
import {Logout} from '../../auth/auth.actions';
import {Navigate} from '@ngxs/router-plugin';
import {AuthState, AuthStateModel} from '../../auth/auth.state';
import {Role} from '@todo/common-api';

@Component({
  selector: 'todo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  readonly ROLE = Role;

  @Select(AuthState) auth$ : Observable<AuthStateModel>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private store : Store) {}


  logout(){
    this.store.dispatch(new Logout());
  }

  userDashboard(){
    this.store.dispatch(new Navigate(["/user-dashboard"]))
  }

  adminDashboard(){
    this.store.dispatch(new Navigate(["/admin-dashboard"]))
  }

}
