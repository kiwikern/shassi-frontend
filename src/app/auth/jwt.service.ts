import { Inject, Injectable, InjectionToken } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../reducers';
import { selectJwt } from './auth.reducer';

export const JWT_DECODE = new InjectionToken('JWT_DECODE');

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwt;

  constructor(private store: Store<IAppState>,
              @Inject(JWT_DECODE) private jwtDecode: any) {
    store.pipe(select(selectJwt)).subscribe(jwt => this.jwt = jwt);
  }

  isJwtValid(): boolean {
    try {
      const decodedToken = this.jwtDecode(this.jwt);
      return decodedToken.exp > Date.now().valueOf() / 1000;
    } catch (e) {
      return false;
    }
  }

}
