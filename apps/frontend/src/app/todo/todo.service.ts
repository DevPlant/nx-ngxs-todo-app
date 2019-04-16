import {Injectable} from '@angular/core';
import {AssignTodoRequest, Todo} from '@todo/common-api';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TodoService {

  constructor(private readonly httpClient: HttpClient) {

  }

  findAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/api/todo');
  }


  findMine(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/api/todo/mine');
  }

  assignToUser(assignRequest: AssignTodoRequest) {
    return this.httpClient.post<Todo>('/api/todo/assign', assignRequest);
  }

  markAsSolved(id: string): Observable<any> {
    return this.httpClient.post<Todo>('/api/todo/solve/' + id, {});
  }

  createTodo(todo: Todo): Observable<any> {
    return this.httpClient.post<Todo>('/api/todo', todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.httpClient.delete('/api/todo/' + id);
  }
}
