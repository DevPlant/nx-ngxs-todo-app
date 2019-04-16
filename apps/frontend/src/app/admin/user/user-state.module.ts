import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';
import {UserState} from './user.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([UserState]),
    CommonModule,
    HttpClientModule,
  ],
  providers: [UserService]
})
export class UserStateModule {
}
