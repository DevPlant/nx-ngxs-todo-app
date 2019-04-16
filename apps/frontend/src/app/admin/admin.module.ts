import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule, MatTabsModule
} from '@angular/material';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {TodoModule} from '../todo/todo.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {UserStateModule} from './user/user-state.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxsFormPluginModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    UserStateModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    TodoModule
  ]
})
export class AdminModule {
}
