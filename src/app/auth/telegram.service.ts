import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { selectJwt } from './auth.reducer';
import { combineLatest } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material';
import { TelegramLinkDialogComponent } from './telegram-link-dialog/telegram-link-dialog.component';

@Injectable({providedIn: 'root'})
export class TelegramService {

  constructor(private http: HttpClient,
              private snackBar: InfoSnackBarService,
              private matDialog: MatDialog,
              private store: Store<IAppState>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  openTelegramAuthUrl() {
    return this.http.post<{ token: string }>('/api/telegram', null)
      .pipe(
        filter(token => !!token),
        map(tokenResponse => tokenResponse.token),
        map(token => `${this.getTelegramBotUrl()}?start=${token}`),
        map(url => {
          const popup = window.open(url, '_blank');
          if (!popup) {
            this.matDialog.open(TelegramLinkDialogComponent, {data: {telegramLink: url}});
          }
        }),
        catchError(err => this.handleError(err)),
      ).subscribe();
  }

  isConnectedToTelegram(): Observable<boolean> {
    return this.http.get<{ isConnectedToTelegram: boolean }>('/api/telegram')
      .pipe(
        map(tokenResponse => tokenResponse.isConnectedToTelegram)
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
    return null;
  }


  reactOnQueryParam() {
    const isLoggedIn$ = this.store.pipe(
      select(selectJwt),
      map(jwt => !!jwt)
    );
    const hasTokenActionParam$ = this.route.queryParams.pipe(
      map(p => p.action === 'createTelegramToken'),
    );
    combineLatest([isLoggedIn$, hasTokenActionParam$])
      .pipe(filter(([isLoggedIn, shouldCreateToken]) => isLoggedIn && shouldCreateToken))
      .subscribe(() => {
        this.router.navigate([], {queryParams: {action: null}, queryParamsHandling: 'merge'});
        return this.openTelegramAuthUrl();
      });
  }

}
