import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TelegramService } from '../telegram.service';
import { IAppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../auth.reducer';
import { GetUserRequest, UpdateUserRequest } from '../auth.actions';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {

  user$: Observable<User>;
  botUrl: string;

  constructor(private store: Store<IAppState>,
              private router: Router,
              private telegramService: TelegramService) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(selectUser),
      share()
    );
    this.botUrl = this.telegramService.getTelegramBotUrl();
    this.store.dispatch(new GetUserRequest());
  }

  updateUser(user: Partial<User>) {
    this.store.dispatch(new UpdateUserRequest({user}));
  }

  linkTelegram() {
    this.telegramService.openTelegramAuthUrl();
  }

}
