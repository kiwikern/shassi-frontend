import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private jwtService: JwtService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.jwtService.isJwtValid()) {
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
