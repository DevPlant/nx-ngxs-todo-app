import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {HttpClientModule} from '@angular/common/http';
import {TodoState} from './todo.state';
import {TodoService} from './todo.service';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([TodoState]),
    CommonModule,
    HttpClientModule,
  ],
  providers: [TodoService]
})
export class TodoModule {
}
