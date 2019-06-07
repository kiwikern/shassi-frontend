import { Injectable, NgZone } from '@angular/core';
import { IAppState } from '../reducers';
import { Store } from '@ngrx/store';
import { TelegramLoginRequest } from './auth.actions';
import { TelegramLoginData } from './telegram-login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TelegramLoginService {
  constructor(private store: Store<IAppState>, private ngZone: NgZone) {
  }

  init() {
    window['loginViaTelegram'] = loginData => this.loginViaTelegram(loginData);
  }

  private loginViaTelegram(loginData: TelegramLoginData) {
    const loginRequest = new TelegramLoginRequest(loginData);
    this.ngZone.run(() => this.store.dispatch(loginRequest));
  }
}
