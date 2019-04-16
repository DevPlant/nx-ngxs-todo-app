import {AssignTodoRequest, Todo} from '@todo/common-api';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AssignTodoToUser,
  CreateTodo,
  DeleteTodo,
  FindAllTodos,
  FindMyTodos,
  MarkTodoSolved,
  ReloadTodos
} from './todo.actions';
import {TodoService} from './todo.service';
import {take} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';

export interface TodoStateModel {
  myTodos?: Todo[];
  allTodos?: Todo[],
  todoForm?: any
}


@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    allTodos: [],
    myTodos: [],
    todoForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {}
    }
  }
})
export class TodoState {

  constructor(private readonly todoService: TodoService) {

  }

  @Selector()
  static myTodos(state: TodoStateModel) {
    return state.myTodos;
  }

  @Selector()
  static allTodos(state: TodoStateModel) {
    return state.allTodos;
  }

  @Action(FindAllTodos)
  findAll(ctx: StateContext<TodoStateModel>) {
    return this.todoService.findAll().pipe(take(1),
      tap((todos) => {
        ctx.patchState({allTodos: todos});
      }));
  }

  @Action(FindMyTodos)
  findMine(ctx: StateContext<TodoStateModel>) {
    return this.todoService.findMine().pipe(take(1),
      tap((todos) => {
        ctx.patchState({myTodos: todos});
      }));
  }

  @Action(AssignTodoToUser)
  assignToUser(ctx: StateContext<TodoStateModel>, assignTodoToUser: AssignTodoToUser) {
    return this.todoService.assignToUser(assignTodoToUser.request).pipe(
      take(1),
      tap(() => {
        ctx.dispatch(new ReloadTodos());
      }));
  }


  @Action(MarkTodoSolved)
  markAsSolved(ctx: StateContext<TodoStateModel>, markTodoSolved: MarkTodoSolved) {
    return this.todoService.markAsSolved(markTodoSolved.id).pipe(
      take(1),
      tap(() => {
        ctx.dispatch(new ReloadTodos());
      }));
  }

  @Action(CreateTodo)
  createTodo(ctx: StateContext<TodoStateModel>, createTodo: CreateTodo) {
    return this.todoService.createTodo(createTodo.todo).pipe(
      take(1),
      tap(() => {
        ctx.dispatch(new ReloadTodos());
      }));
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoStateModel>, deleteTodo: DeleteTodo) {
    return this.todoService.deleteTodo(deleteTodo.id).pipe(
      take(1),
      tap((x) => {
        ctx.dispatch(new ReloadTodos());
      }));
  }

  @Action(ReloadTodos)
  reloadTodos(ctx: StateContext<TodoStateModel>) {
    ctx.dispatch(new FindAllTodos());
    ctx.dispatch(new FindMyTodos());
  }

}
