import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { filter, map, take } from 'rxjs/operators';
import { InfoSnackBarService } from './info-snack-bar.service';
import { environment } from '../environments/environment';

@Injectable()
export class TelegramService {

  constructor(private http: HttpClient,
              private snackBar: InfoSnackBarService) {
  }

  openTelegramAuthUrl() {
    return this.http.get<string>('/api/user/telegram', {responseType: 'text' as 'json'})
      .pipe(
        take(1),
        filter(token => !!token),
        map(token => `https://telegram.me/${environment.telegramBotName}?start=${token}`)
      ).subscribe(
        url => window.open(url, '_blank'),
        err => this.handleError(err)
        );
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

}
