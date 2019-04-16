import {User} from '@todo/common-api';

export interface Todo {

  id?: string;
  title: string;
  description?: string;
  solved?: boolean;
  user?: User;
  userId?: string;

}
