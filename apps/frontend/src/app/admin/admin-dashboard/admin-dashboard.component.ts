import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {TodoState} from '../../todo/todo.state';
import {Todo, User} from '@todo/common-api';
import {FormBuilder} from '@angular/forms';
import {AssignTodoToUser, CreateTodo, DeleteTodo, FindAllTodos} from '../../todo/todo.actions';
import {UserState} from '../user/user.state';
import {CreateUser, DeleteUser, FindAllUsers} from '../user/user.action';

@Component({
  selector: 'todo-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  todoForm = this.formBuilder.group({
    title: '',
    description: ''
  });

  userForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  @Select(TodoState.allTodos) todos$: Observable<Todo[]>;

  @Select(UserState.users) users$: Observable<User[]>;

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  createNewTodo() {
    const formState = this.store.selectSnapshot(TodoState);
    this.store.dispatch(new CreateTodo(formState.todoForm.model));
  }

  createNewUser() {
    const formState = this.store.selectSnapshot(UserState);
    this.store.dispatch(new CreateUser(formState.userForm.model));
  }

  deleteTodo(id) {
    this.store.dispatch(new DeleteTodo(id));
  }

  deleteUser(id){
    this.store.dispatch(new DeleteUser(id));
  }

  assign($event, todoId){
    this.store.dispatch(new AssignTodoToUser({todoId:todoId, userId: $event.value}));
  }

  ngOnInit(): void {
    this.store.dispatch(new FindAllTodos());
    this.store.dispatch(new FindAllUsers());
  }
}
