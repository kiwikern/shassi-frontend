import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LoadProductsRequest } from './products/product.actions';
import { TelegramService } from './telegram.service';
import { selectJwt } from './auth/auth.reducer';
import { Observable } from 'rxjs/Observable';
import { SwUpdatesService } from './sw-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  showBackNavigation = false;
  jwt$: Observable<string>;

  constructor(private store: Store<IAppState>,
              private router: Router,
              private route: ActivatedRoute,
              private telegramService: TelegramService,
              private swUpdatesService: SwUpdatesService) {
  }

  ngOnInit() {
    this.jwt$ = this.store.select(selectJwt);

    this.route.queryParams.pipe(
      map(p => p.action === 'createTelegramToken'),
      filter(p => !!p)
    ).subscribe(() => {
      this.router.navigate([], {queryParams: {action: null}, queryParamsHandling: 'merge'});
      return this.getTelegramAuth();
    });

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => this.showBackNavigation = /.*(products\/).+/.test(event.url));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  reload() {
    this.store.dispatch(new LoadProductsRequest());
  }

  getTelegramAuth() {
    this.telegramService.openTelegramAuthUrl();
  }

}
