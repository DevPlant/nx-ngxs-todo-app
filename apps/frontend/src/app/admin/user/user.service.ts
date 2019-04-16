import {Injectable} from '@angular/core';
import {User} from '@todo/common-api';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private readonly httpClient: HttpClient) {

  }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/user');
  }

  createUser(user: User): Observable<any> {
    return this.httpClient.post('/api/user', user);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete('/api/user/' + id);
  }
}
