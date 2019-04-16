import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {NgxsModule} from '@ngxs/store';
import {LoginState} from './login/login.state';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    NgxsModule.forFeature([LoginState]),
    CommonModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxsFormPluginModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
