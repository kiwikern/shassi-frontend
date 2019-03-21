import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { LoadProductsRequest } from './products/product.actions';
import { selectJwt } from './auth/auth.reducer';
import { Observable } from 'rxjs';
import { SwUpdatesService } from './sw-updates.service';
import { NavigationService } from './navigation.service';
import { selectIsLoading } from './products/product.reducer';
import { share } from 'rxjs/operators';
import { JwtService } from './auth/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  showBackNavigation$: Observable<boolean>;
  jwt$: Observable<string>;
  isLoading$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<IAppState>,
              private navigationService: NavigationService,
              private jwtService: JwtService,
              private swUpdatesService: SwUpdatesService) {
  }

  ngOnInit() {
    this.jwt$ = this.store.pipe(select(selectJwt));
    this.isAdmin$ = this.jwtService.isAdmin$;
    this.isLoading$ = this.store.pipe(select(selectIsLoading), share());
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
