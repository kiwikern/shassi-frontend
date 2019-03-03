import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TelegramService } from '../telegram.service';
import { IAppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectIsLoading, selectUser } from '../auth.reducer';
import { GetUserRequest, UpdateUserRequest } from '../auth.actions';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {

  user$: Observable<User>;
  hasLoaded$: Observable<boolean>;
  botUrl: string;

  constructor(private store: Store<IAppState>,
              private router: Router,
              private telegramService: TelegramService) {
  }

  ngOnInit() {
    this.store.dispatch(new GetUserRequest());
    this.user$ = this.store.pipe(
      select(selectUser),
      shareReplay(),
    );
    this.hasLoaded$ = this.store.pipe(
      select(selectIsLoading),
      map(isLoading => !isLoading),
    );
    this.botUrl = this.telegramService.getTelegramBotUrl();
  }

  updateUser(user: Partial<User>) {
    this.store.dispatch(new UpdateUserRequest({user}));
  }

  linkTelegram() {
    this.telegramService.openTelegramAuthUrl();
  }

}
