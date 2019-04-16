import {AssignTodoRequest, Todo} from '@todo/common-api';

export class FindAllTodos {
  static type = '[Todo] FindAllTodos';
}

export class CreateTodo {
  static type = '[Todo] CreateTodo';

  constructor(public todo: Todo) {
  }
}

export class FindMyTodos {
  static type = '[Todo] FindMyTodos';
}

export class AssignTodoToUser {
  static type = '[Todo] AssignTodoToUser';

  constructor(public request: AssignTodoRequest) {
  }
}

export class MarkTodoSolved {
  static type = '[Todo] MarkTodoSolved';

  constructor(public id: string) {
  }
}

export class DeleteTodo {
  static type = '[Todo] DeleteTodo';

  constructor(public id: string) {
  }
}

export class ReloadTodos{
  static type = '[Todo] ReloadTodos';
}
