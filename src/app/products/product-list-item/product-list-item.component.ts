import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Size, Update } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent implements OnInit {

  @Input() name: string;
  @Input() id: string;
  @Input() store: string;
  @Input() createdAt: Date;
  @Input() url: string;
  @Input() latestUpdate: Update;
  @Input() size: Size;

  @HostListener('click') onClick() {
    this.router.navigate(['products', this.id]);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
