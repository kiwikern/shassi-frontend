import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { LoginRequest } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch(new LoginRequest({username: this.username, password: this.password}));
  }

}
