import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';

const productsRoutes: Routes = [
  {path: '', component: ProductsListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes)
  ],
  declarations: [ProductsListComponent]
})
export class ProductsModule { }
