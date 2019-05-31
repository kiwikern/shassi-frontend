import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterComponent } from './product-filter.component';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAppState } from '../../reducers';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;
  let store: MockStore<IAppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFilterComponent],
      imports: [
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatDividerModule,
      ],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    // TODO: use overrideSelector instead when https://github.com/ngrx/platform/issues/1504
    store.setState({products: {}});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
