import {Component} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../../todo/todo.state';
import {Observable} from 'rxjs';
import {Todo} from '@todo/common-api';
import {FindMyTodos, MarkTodoSolved} from '../../todo/todo.actions';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'todo-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  @Select(TodoState.myTodos) todos$: Observable<Todo[]>;


  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new FindMyTodos());
  }

  solve(id){
    this.store.dispatch(new MarkTodoSolved(id));
  }
}
