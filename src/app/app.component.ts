import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { LoadProductsRequest } from './products/product.actions';
import { selectJwt } from './auth/auth.reducer';
import { Observable } from 'rxjs';
import { SwUpdatesService } from './sw-updates.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  showBackNavigation$: Observable<boolean>;
  jwt$: Observable<string>;

  constructor(private store: Store<IAppState>,
              private navigationService: NavigationService,
              private swUpdatesService: SwUpdatesService) {
  }

  ngOnInit() {
    this.jwt$ = this.store.pipe(select(selectJwt));
    this.showBackNavigation$ = this.navigationService.canNavigateBack$;
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  reload() {
    this.store.dispatch(new LoadProductsRequest());
  }

  navigateBack() {
    this.navigationService.navigateBack();
  }

}
