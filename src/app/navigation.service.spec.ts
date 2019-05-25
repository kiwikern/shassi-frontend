import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({template: '<router-outlet></router-outlet>'})
class MockComponent {
}

describe('NavigationService', () => {
  let router: Router;
  let location: Location;
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: MockComponent},
        {path: 'products', component: MockComponent},
        {path: 'products/:id', component: MockComponent},
      ])]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    service = TestBed.get(NavigationService);

    TestBed.createComponent(MockComponent);

  });

  describe('canNavigateBack', () => {

    it('should initially return false', fakeAsync(() => {
      expect(service.canNavigateBack$.getValue()).toBe(false);
    }));

    it('should return true on a product\'s page', fakeAsync(() => {
      router.navigate(['products/1234']);
      tick();
      expect(service.canNavigateBack$.getValue()).toBe(true);
    }));

    it('should return false on the products list', fakeAsync(() => {
      router.navigate(['products']);
      tick();
      expect(service.canNavigateBack$.getValue()).toBe(false);
    }));

  });

  describe('navigateBack()', () => {

    it('should navigate to products after initial navigation', fakeAsync(() => {
      router.initialNavigation();
      tick();
      service.navigateBack();
      tick();
      expect(location.path()).toEqual('/products');
    }));

    it('should use sfs history after second navigation', fakeAsync(() => {
      router.navigate(['products/1234']);
      tick();
      router.navigate(['products/5678']);
      tick();
      service.navigateBack();
      expect(location.path()).toEqual('/products/1234');
    }));

  });

});
