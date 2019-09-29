import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorProductsComponent } from './error-products.component';

describe('ErrorProductsComponent', () => {
  let component: ErrorProductsComponent;
  let fixture: ComponentFixture<ErrorProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
