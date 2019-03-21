import { Inject, Injectable, InjectionToken } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { selectJwt } from './auth.reducer';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export const JWT_DECODE = new InjectionToken('JWT_DECODE');

export enum Role {
  ADMIN = 'admin'
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwt;
  public isAdmin$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private store: Store<IAppState>,
              @Inject(JWT_DECODE) private jwtDecode: any) {
    store.pipe(
      select(selectJwt),
      tap(jwt => this.jwt = jwt),
      tap(() => (this.isAdmin$ as BehaviorSubject<boolean>).next(this.hasOneRole([Role.ADMIN])))
    ).subscribe();

  }

  isJwtValid(): boolean {
    try {
      const decodedToken = this.jwtDecode(this.jwt);
      return decodedToken.exp > Date.now().valueOf() / 1000;
    } catch (e) {
      return false;
    }
  }

  hasOneRole(requiredRoles: Role[] = []): boolean {
    try {
      if (requiredRoles.length === 0) {
        return true;
      }
      const decodedToken = this.jwtDecode(this.jwt);
      const userRoles = decodedToken.roles;
      return userRoles.some(role => requiredRoles.includes(role));
    } catch (e) {
      return false;
    }
  }

}
