import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavModule} from './nav-module/nav.module';
import {LoginModule} from './login-module/login.module';
import {AdminModule} from './admin/admin.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {NgxsModule} from '@ngxs/store';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsFormPluginModule} from '@ngxs/form-plugin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabled'}),
    NgxsModule.forRoot([]),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    BrowserAnimationsModule,
    NavModule,
    LoginModule,
    AdminModule,
    UserModule,
    AuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
