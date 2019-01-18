import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class TelegramService {

  constructor(private http: HttpClient,
              private snackBar: InfoSnackBarService,
              private route: ActivatedRoute,
              private router: Router) {
    this.reactOnQueryParam();
  }
  openTelegramAuthUrl() {
    return this.http.post<{token: string}>('/api/telegram', null)
      .pipe(
        filter(token => !!token),
        map(tokenResponse => tokenResponse.token),
        map(token => `${this.getTelegramBotUrl()}?start=${token}`)
      ).subscribe(
        url => window.open(url, '_blank'),
        err => this.handleError(err)
      );
  }

  getTelegramBotUrl(): string {
    return `https://telegram.me/${environment.telegramBotName}`;
  }

  private handleError(err: HttpErrorResponse) {
    switch (err.status) {
      case 401:
        this.snackBar.open('SnackBar.Message.Error.LoginNeeded');
        break;
      case 0:
        this.snackBar.open('SnackBar.Message.Error.NoInternetConnection');
        break;
      case 500:
        this.snackBar.open('SnackBar.Message.Error.ServerError');
        break;
      case 504:
        this.snackBar.open('SnackBar.Message.Error.ServerNotReachable');
        break;
      default:
        this.snackBar.open('SnackBar.Message.Error.ClientError');
        console.error(err);
    }
  }


  private reactOnQueryParam() {
    this.route.queryParams.pipe(
      map(p => p.action === 'createTelegramToken'),
      filter(p => !!p)
    ).subscribe(() => {
      this.router.navigate([], {queryParams: {action: null}, queryParamsHandling: 'merge'});
      return this.openTelegramAuthUrl();
    });
  }

}
