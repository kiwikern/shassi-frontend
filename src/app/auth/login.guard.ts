import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { JwtService } from './jwt.service';

@Injectable()
export class LoginGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private jwtService: JwtService,
              private location: Location,
              private router: Router) {
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

    if (this.jwtService.isJwtValid()) {
      allowsRouteChange = true;
    } else {
      const hasAccount = localStorage.getItem('shassi.hasAccount');
      if (hasAccount) {
        this.router.navigate(['/auth'],
          {queryParams: {redirectTo: this.location.path()}});
      } else {
        this.router.navigate(['/auth/register'],
          {queryParams: {redirectTo: this.location.path()}});
      }
      allowsRouteChange = false;
    }
    return allowsRouteChange;
  }

  parseJwt (token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+')
      .replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };
}
