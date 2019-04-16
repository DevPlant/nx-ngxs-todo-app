import {Todo} from './todo.model';
import {Role} from '@todo/common-api';

export interface User {

  id?: string;
  username: string;
  password?: string;
  passwordHash?: string;

  roles: Role[];
  assignedTodos?: Todo[];

}
