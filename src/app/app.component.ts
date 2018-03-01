import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './reducers';
import { Logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<IAppState>) {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
