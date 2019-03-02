import { TestBed } from '@angular/core/testing';

import { JWT_DECODE, JwtService } from './jwt.service';
import { provideMockStore } from '@ngrx/store/testing';
import createSpy = jasmine.createSpy;

describe('JwtService', () => {
  let jwtDecode;
  beforeEach(() => {
    jwtDecode = createSpy();
    return TestBed.configureTestingModule({
      providers: [
        {provide: JWT_DECODE, useValue: jwtDecode},
        provideMockStore({
          initialState: {
            auth: {
              jwt: 'myjwt'
            }
          }
        }),
      ],
    });
  });

  it('should return true for valid token', () => {
    const service: JwtService = TestBed.get(JwtService);
    jwtDecode.withArgs('myjwt').and.returnValue({exp: Date.now() / 1000 + 1000});
    expect(service.isJwtValid()).toBe(true);
    expect(jwtDecode).toHaveBeenCalledWith('myjwt');
  });

  it('should return false on expired token', () => {
    const service: JwtService = TestBed.get(JwtService);
    jwtDecode.withArgs('myjwt').and.returnValue({exp: Date.now() / 1000 - 1000});
    expect(service.isJwtValid()).toBe(false);
    expect(jwtDecode).toHaveBeenCalledWith('myjwt');
  });

  it('should return false on invalid token', () => {
    const service: JwtService = TestBed.get(JwtService);
    jwtDecode.withArgs('myjwt').and.throwError('invalid token');
    expect(service.isJwtValid()).toBe(false);
    expect(jwtDecode).toHaveBeenCalledWith('myjwt');
  });
});
