import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { JwtService, Role } from './jwt.service';

@Injectable()
export class LoginGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private jwtService: JwtService,
              private location: Location,
              private router: Router) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = this.getRequiredRoles(route);
    return this.allowsRouteChange(requiredRoles);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = this.getRequiredRoles(route);
    return this.allowsRouteChange(requiredRoles);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = this.getRequiredRoles(childRoute);
    return this.allowsRouteChange(requiredRoles);
  }

  private allowsRouteChange(requiredRoles?: Role[]) {
    let allowsRouteChange: boolean;

    if (this.jwtService.isJwtValid()) {
      if (this.jwtService.hasOneRole(requiredRoles)) {
        allowsRouteChange = true;
      } else {
        allowsRouteChange = false;
        this.router.navigate(['products']);
      }
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

  private getRequiredRoles(route: Route | ActivatedRouteSnapshot) {
    if (route.data) {
      return route.data.roles;
    } else {
      return [];
    }
  }
}
