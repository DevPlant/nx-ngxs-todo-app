import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {MatButtonModule, MatCardModule, MatListModule} from '@angular/material';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {TodoModule} from '../todo/todo.module';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    TodoModule,
  ]
})
export class UserModule {
}
