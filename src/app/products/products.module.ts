import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from './product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './product.effects';
import { IAppState } from '../reducers';
import { RequestLoadProducts } from './product.actions';

const productsRoutes: Routes = [
  {path: '', component: ProductsListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductEffects]),
    RouterModule.forChild(productsRoutes)
  ],
  declarations: [ProductsListComponent]
})
export class ProductsModule {

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new RequestLoadProducts());
  }


}
