import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from '../admin.service';
import { Product } from '../../products/product.model';

@Component({
  selector: 'app-error-products',
  templateUrl: './error-products.component.html',
  styleUrls: ['./error-products.component.css']
})
export class ErrorProductsComponent implements OnInit {

  errorProductsDataSource$: MatTableDataSource<Product>;
  columnsToDisplay = ['name', 'url', 'errors', 'isActive', 'menu'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.errorProductsDataSource$ = new MatTableDataSource();
    this.errorProductsDataSource$.sort = this.sort;
    this.adminService.getProductsWithErrors()
      .subscribe(data => this.errorProductsDataSource$.data = data);
  }

  async reactivate(productId: string) {
    await this.adminService.reactivateProduct(productId).toPromise();
    this.adminService.getProductsWithErrors()
      .subscribe(data => this.errorProductsDataSource$.data = data);
  }

  async delete(productId: string) {
    await this.adminService.deleteProduct(productId).toPromise();
    this.adminService.getProductsWithErrors()
      .subscribe(data => this.errorProductsDataSource$.data = data);
  }
}
