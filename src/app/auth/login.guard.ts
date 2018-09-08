import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectJwt } from './auth.reducer';
import { IAppState } from '../reducers';

@Injectable()
export class LoginGuard implements CanLoad, CanActivate, CanActivateChild {
  private jwt;
  constructor(private store: Store<IAppState>,
              private router: Router) {
    store.select(selectJwt).subscribe(jwt => this.jwt = jwt);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.allowsRouteChange();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.allowsRouteChange();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.allowsRouteChange();
  }

  private allowsRouteChange() {
    let allowsRouteChange: boolean;
    if (this.jwt) {
      allowsRouteChange = true;
    } else {
      const hasAccount = localStorage.getItem('shassi.hasAccount');
      if (hasAccount) {
        this.router.navigate(['/auth']);
      } else {
        this.router.navigate(['/auth/register']);
      }
      allowsRouteChange = false;
    }
    return allowsRouteChange;
  }
}
