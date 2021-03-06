import { TestBed } from '@angular/core/testing';

import { ProductEffects } from './product.effects';

describe('ProductService', () => {
  // let actions$: Observable<any>;
  let effects: ProductEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        // provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ProductEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
