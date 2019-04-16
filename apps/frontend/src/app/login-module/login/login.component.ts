import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngxs/store';
import {LoginState} from './login.state';
import {Login} from '../../auth/auth.actions';

@Component({
  selector: 'todo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private store: Store) {
  }

  ngOnInit() {

  }


  onSubmit() {
    const formState = this.store.selectSnapshot(LoginState);
    this.store.dispatch(new Login(formState.loginForm.model.username, formState.loginForm.model.password));
  }

}
