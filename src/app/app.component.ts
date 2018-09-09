import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoadProductsRequest } from './products/product.actions';
import { selectJwt } from './auth/auth.reducer';
import { Observable } from 'rxjs';
import { SwUpdatesService } from './sw-updates.service';
import { Location } from '@angular/common';

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
              private location: Location,
              private swUpdatesService: SwUpdatesService) {
  }

  ngOnInit() {
    this.jwt$ = this.store.select(selectJwt);

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => this.showBackNavigation = /(.*(products\/).+)|auth\/user/.test(event.url));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  reload() {
    this.store.dispatch(new LoadProductsRequest());
  }

  navigateBack() {
    this.location.back();
  }

}
