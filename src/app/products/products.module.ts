import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';
import { IAppState } from '../reducers';
import { LoadProductsRequest } from './product.actions';
import { ProductFormComponent } from './product-form/product-form.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { ProductUpdateTableComponent } from './product-update-table/product-update-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductFilterPipe } from './product-filter/product-filter.pipe';

const productsRoutes: Routes = [
  {path: '', component: ProductsListComponent},
  {path: 'new', component: ProductFormComponent},
  {path: ':id', component: ProductDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductEffects]),
    RouterModule.forChild(productsRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductsListComponent,
    ProductFormComponent,
    ProductListItemComponent,
    ProductDetailComponent,
    FabButtonComponent,
    ProductUpdateTableComponent,
    ProductFilterComponent,
    ProductFilterPipe
  ]
})
export class ProductsModule {

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new LoadProductsRequest());
  }


}
