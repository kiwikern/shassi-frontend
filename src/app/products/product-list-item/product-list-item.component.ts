import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent implements OnInit {

  @Input() product: Product;

  @HostListener('click') onClick() {
    this.router.navigate(['products', this.product._id]);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
