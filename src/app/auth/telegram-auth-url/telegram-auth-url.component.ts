import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { TelegramService } from '../telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import { TelegramLoginRequest } from '../auth.actions';
import { TelegramLoginData } from '../telegram-login-data.interface';

@Component({
  selector: 'app-telegram-auth-url',
  templateUrl: './telegram-auth-url.component.html',
  styleUrls: ['./telegram-auth-url.component.css']
})
export class TelegramAuthUrlComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private jwtService: JwtService,
    private telegramService: TelegramService,
  ) {
  }

  ngOnInit() {
    const queryParams: TelegramLoginData = {
      username: null,
      photo_url: null,
      hash: null,
      id: null,
      auth_date: null,
      last_name: null,
      first_name: null,
    };

    if (this.jwtService.isJwtValid()) {
      this.router.navigate([''], {queryParams, queryParamsHandling: 'merge'});
      this.telegramService.openTelegramAuthUrl();
    } else {
      this.route.queryParams.pipe(
        map(params => new TelegramLoginRequest(params as TelegramLoginData)),
        take(1),
      ).subscribe(telegramLoginRequest => {
        this.router.navigate([], {queryParams, queryParamsHandling: 'merge'});
        return this.store.dispatch(telegramLoginRequest);
      });
    }
  }

  /*
you
  loginData: TelegramLoginData) {
    const loginRequest = new TelegramLoginRequest(loginData);
    this.ngZone.run(() => this.store.dispatch(loginRequest));
   */

}
