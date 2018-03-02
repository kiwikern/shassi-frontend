import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdateTableComponent } from './product-update-table.component';

describe('ProductUpdateTableComponent', () => {
  let component: ProductUpdateTableComponent;
  let fixture: ComponentFixture<ProductUpdateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUpdateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
