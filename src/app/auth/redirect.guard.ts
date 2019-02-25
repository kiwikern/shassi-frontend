import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { selectJwt } from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  private jwt: string;

  constructor(private store: Store<IAppState>,
              private router: Router) {
    store.pipe(select(selectJwt)).subscribe(jwt => this.jwt = jwt);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwt) {
      if (next.queryParamMap.has('redirectTo')) {
        this.router.navigateByUrl(next.queryParamMap.get('redirectTo'));
      } else {
        this.router.navigate(['products']);
      }
      return false;
    }
    return true;
  }

}
