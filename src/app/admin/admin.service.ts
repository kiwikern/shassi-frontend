import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminOverview } from './admin-data.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAdminOverview(): Observable<AdminOverview[]> {
    return this.http.get<AdminOverview[]>('/api/admin');
  }

  getProductsWithErrors(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/admin/error-products');
  }

  reactivateProduct(productId: string): Observable<Product> {
    return this.http.patch<Product>(`/api/admin/reactivate-product/${productId}`, {});
  }

  deleteProduct(productId: string): Observable<unknown> {
    return this.http.delete<unknown>(`/api/admin/products/${productId}`);
  }
}
