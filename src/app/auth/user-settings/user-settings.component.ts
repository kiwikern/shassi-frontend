import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TelegramService } from '../telegram.service';
import { IAppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectUser } from '../auth.reducer';
import { GetUserRequest, UpdateUserRequest } from '../auth.actions';

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
    this.user$ = this.store.select(selectUser);
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
